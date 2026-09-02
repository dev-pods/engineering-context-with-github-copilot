import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const requirements = {
  1: [{
    path: "workshop/copilot-capabilities.md",
    markers: ["# Inventário de recursos do Copilot", "## Escolha por fase"],
  }],
  2: [{
    path: "workshop/context-experiment.md",
    markers: [
      "## Execução A: contexto insuficiente",
      "## Execução B: contexto excessivo",
      "## Execução C: contexto mínimo suficiente",
      "Evidência do Chat Debug ou fallback observado:",
    ],
  }],
  3: [
    {
      path: "workshop/instruction-comparison.md",
      markers: ["# Comparação de instructions", "## Decisão"],
    },
    {
      path: "workshop/context-packet.md",
      markers: ["## Fontes relevantes", "## Fora do escopo", "## Critérios de aceite"],
    },
  ],
  4: [
    {
      path: "workshop/prompt-rubric.md",
      markers: ["# Rubrica de prompt", "## Prompt escolhido"],
    },
    {
      path: "workshop/implementation-plan.md",
      markers: ["## Riscos de regressão", "## Critérios de aceite e comandos de validação"],
    },
    {
      path: ".github/prompts/tag-autocomplete.prompt.md",
      markers: ["Fontes e evidências", "Riscos de regressão", "Não edite arquivos"],
    },
  ],
  5: [
    {
      path: "workshop/model-decision.md",
      markers: ["## Modelo A: velocidade e custo", "## Modelo B: raciocínio e codificação"],
    },
    { path: "src/components/upload/TagAutocomplete.tsx", markers: [] },
    { path: "src/app/upload/page.tsx", markers: ["TagAutocomplete"] },
  ],
  6: [{
    path: "workshop/human-review.md",
    markers: ["Diff e contrato de testes preservado", "## Decisão final"],
  }],
};

function section(content, heading) {
  const headingStart = content.indexOf(`${heading}\n`);
  if (headingStart === -1) return "";

  const body = content.slice(headingStart + heading.length + 1);
  const nextHeading = body.search(/^## /m);
  return nextHeading === -1 ? body : body.slice(0, nextHeading);
}

function fieldValue(content, label) {
  const escapedLabel = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return content.match(new RegExp(`^- ${escapedLabel}:\\s*(.+)$`, "m"))?.[1].trim() ?? "";
}

export function parsePromptFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---(?:\n|$)/);
  if (!match) return null;

  return Object.fromEntries(
    match[1]
      .split("\n")
      .map((line) => line.match(/^([a-z][\w-]*):\s*(.+)$/i))
      .filter(Boolean)
      .map((entry) => [entry[1], entry[2].replace(/^['"]|['"]$/g, "").trim()]),
  );
}

export function collectStepErrors(step, root = process.cwd()) {
  const files = requirements[step];
  if (!files) return ["Usage: node scripts/validate-step.mjs <1-6>"];

  const errors = [];
  const contents = new Map();

  for (const requirement of files) {
    const absolutePath = resolve(root, requirement.path);
    if (!existsSync(absolutePath)) {
      errors.push(`${requirement.path} does not exist`);
      continue;
    }

    const content = readFileSync(absolutePath, "utf8");
    contents.set(requirement.path, content);

    if (requirement.path.startsWith("workshop/") && !/^Status: CONCLUIDO$/m.test(content)) {
      errors.push(`${requirement.path} must contain 'Status: CONCLUIDO'`);
    }
    const normalizedContent = content.replaceAll("［", "[").replaceAll("］", "]");
    if (/\[PREENCHA(?::[^\]]*)?\]/i.test(normalizedContent)) {
      errors.push(`${requirement.path} still contains fields marked PREENCHA`);
    }
    if (/^-\s+[^:\n]+:\s*$/m.test(content) || /^-\s*$/m.test(content)) {
      errors.push(`${requirement.path} contains an empty evidence field`);
    }
    if (/\|[ \t]*\|/.test(content)) {
      errors.push(`${requirement.path} contains an empty table cell`);
    }
    for (const marker of requirement.markers) {
      if (!content.includes(marker)) {
        errors.push(`${requirement.path} must preserve '${marker}'`);
      } else if (marker.startsWith("## ") && section(content, marker).trim().length === 0) {
        errors.push(`${requirement.path} section '${marker}' must not be empty`);
      }
    }
  }

  if (step === 1) {
    const inventory = contents.get("workshop/copilot-capabilities.md");
    const inventorySection = inventory?.split("## Escolha por fase")[0] ?? "";
    const dataRows = inventorySection
      .split("\n")
      .filter((line) => /^\|.+\|$/.test(line) && !/^\|\s*(?:---|Recurso observado)/.test(line));
    if (dataRows.length < 3) {
      errors.push("the capability inventory must contain at least three resources");
    }
  }

  if (step === 2) {
    const experiment = contents.get("workshop/context-experiment.md");
    const prompts = [
      fieldValue(section(experiment ?? "", "## Execução A: contexto insuficiente"), "Prompt usado"),
      fieldValue(section(experiment ?? "", "## Execução B: contexto excessivo"), "Prompt usado"),
      fieldValue(section(experiment ?? "", "## Execução C: contexto mínimo suficiente"), "Prompt usado"),
    ];
    if (prompts.some((prompt) => prompt.length < 5)) {
      errors.push("each context execution must preserve the prompt used");
    }
    if (new Set(prompts).size !== 3) {
      errors.push("the three context executions must use distinct prompt formulations");
    }
    const conclusion = section(experiment ?? "", "## Conclusão");
    if (fieldValue(conclusion, "Evidência do Chat Debug ou fallback observado").length < 5) {
      errors.push("the conclusion must document Chat Debug evidence or its fallback");
    }
  }

  if (step === 3) {
    if (!existsSync(resolve(root, ".github/copilot-instructions.md"))) {
      errors.push(".github/copilot-instructions.md must be restored before completing step 3");
    }
    if (existsSync(resolve(root, ".github/copilot-instructions.md.off"))) {
      errors.push(".github/copilot-instructions.md.off must be removed before completing step 3");
    }
  }

  if (step === 4) {
    const prompt = contents.get(".github/prompts/tag-autocomplete.prompt.md");
    if (prompt) {
      const frontmatter = parsePromptFrontmatter(prompt);
      for (const field of ["name", "description", "agent"]) {
        if (!frontmatter?.[field]) errors.push(`the prompt frontmatter needs '${field}'`);
      }
      if (frontmatter?.agent && frontmatter.agent !== "plan") {
        errors.push("the prompt frontmatter agent must remain 'plan'");
      }
    }

    const plan = contents.get("workshop/implementation-plan.md");
    if (plan && !/^Plano aprovado para comparação de modelos: SIM$/m.test(plan)) {
      errors.push("the implementation plan needs explicit human approval");
    }
  }

  if (step === 5) {
    const decision = contents.get("workshop/model-decision.md");
    if (decision && !/^- Decisão humana: APROVADO$/m.test(decision)) {
      errors.push("the model decision needs explicit human approval");
    }
    const origins = decision
      ? [...decision.matchAll(/^- Origem da resposta:\s*(.+)$/gm)].map((match) => match[1].trim())
      : [];
    if (origins.length !== 2) {
      errors.push("the model decision must identify the origin of both responses");
    }
    if (origins.some((origin) => !["execução própria", "amostra do facilitador"].includes(origin))) {
      errors.push("model response origins must be 'execução própria' or 'amostra do facilitador'");
    }
    for (const heading of ["## Modelo A: velocidade e custo", "## Modelo B: raciocínio e codificação"]) {
      const modelSection = section(decision ?? "", heading);
      for (const label of [
        "Origem da resposta",
        "Modelo utilizado",
        "Aderência aos critérios",
        "Disciplina de escopo",
        "Premissas sem evidência",
        "Validação proposta",
        "Follow-ups necessários",
        "Latência e créditos/requests",
      ]) {
        if (fieldValue(modelSection, label).length < 2) {
          errors.push(`${heading} must document '${label}'`);
        }
      }
    }
  }

  if (step === 6) {
    const review = contents.get("workshop/human-review.md");
    if (review && !/^Decisão: APPROVED$/m.test(review)) {
      errors.push("the final human decision must be APPROVED");
    }
  }

  return errors;
}

function run() {
  const step = Number(process.argv[2]);
  const errors = collectStepErrors(step);

  for (const message of errors) console.error(`Validation failed: ${message}`);
  if (errors.length > 0) {
    process.exitCode = 1;
  } else {
    console.log(`Step ${step} evidence is complete.`);
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  run();
}