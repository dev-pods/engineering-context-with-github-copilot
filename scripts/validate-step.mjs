import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

export function parseSkillFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!match) return null;
  return Object.fromEntries(match[1].split(/\r?\n/).flatMap((line) => {
    const field = line.match(/^([\w-]+):\s*(.+)$/);
    return field ? [[field[1], field[2].replace(/^["']|["']$/g, "")]] : [];
  }));
}

const testSkillPath = ".github/skills/test-tags/SKILL.md";

const artifacts = {
  1: [".devcontainer/devcontainer.json", "src/app/upload/page.tsx"],
  2: ["src/lib/mock-tag-data.ts"],
  3: ["src/components/upload/TagAutocomplete.tsx", "src/app/upload/page.tsx"],
  4: ["src/components/upload/TagAutocomplete.tsx", "src/app/upload/page.tsx"],
  5: [testSkillPath, "tests/tag-autocomplete.test.tsx"],
  6: ["src/components/upload/TagAutocomplete.tsx", "src/app/upload/page.tsx", "tests/tag-autocomplete.test.tsx", testSkillPath],
};

export function collectStepErrors(step, root = process.cwd()) {
  if (!artifacts[step]) return ["Uso: node scripts/validate-step.mjs <1-6>"];
  const errors = [];
  for (const path of artifacts[step]) {
    if (!existsSync(resolve(root, path))) errors.push(`Arquivo ausente: ${path}`);
    else if (!readFileSync(resolve(root, path), "utf8").trim()) errors.push(`Arquivo vazio: ${path}`);
  }
  if ((step === 5 || step === 6) && existsSync(resolve(root, testSkillPath))) {
    const skill = readFileSync(resolve(root, testSkillPath), "utf8");
    const metadata = parseSkillFrontmatter(skill);
    if (metadata?.name !== "test-tags") errors.push("Use name: test-tags no frontmatter da skill, igual ao nome da pasta.");
    if (!metadata?.description?.trim()) errors.push("A skill precisa de description no frontmatter.");
    for (const source of ["TagAutocomplete.tsx", "vitest", "tests/tag-autocomplete.test.tsx"]) {
      if (!skill.toLowerCase().includes(source.toLowerCase())) errors.push(`Inclua ${source} na skill de testes.`);
    }
  }
  return errors;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const errors = collectStepErrors(Number(process.argv[2]));
  for (const error of errors) console.error(error);
  if (errors.length) process.exitCode = 1;
  else console.log("Artefatos encontrados. Execute também os testes de comportamento indicados na lição.");
}