import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { describe, expect, it } from "vitest";
import { collectStepErrors, parsePromptFrontmatter } from "../scripts/validate-step.mjs";

function write(root: string, path: string, content: string) {
  const absolutePath = join(root, path);
  mkdirSync(dirname(absolutePath), { recursive: true });
  writeFileSync(absolutePath, content);
}

describe("step evidence validator", () => {
  it("accepts three documented capabilities in step 1", () => {
    const root = mkdtempSync(join(tmpdir(), "copilot-workshop-"));
    write(
      root,
      "workshop/copilot-capabilities.md",
      `# Inventário de recursos do Copilot
Status: CONCLUIDO
| Recurso observado | Origem | Melhor uso | Limitação ou fallback |
| --- | --- | --- | --- |
| Prompt file | Workspace | Planejamento | Executar pelo editor |
| Referência | Chat | Contexto explícito | Anexar manualmente |
| Agent | VS Code | Implementação | Usar edição manual |
## Escolha por fase
| Fase | Interface escolhida | Justificativa |
| --- | --- | --- |
| Pesquisa | Ask | Não edita arquivos |
`,
    );

    expect(collectStepErrors(1, root)).toEqual([]);
  });

  it("requires at least three capabilities and detects fullwidth placeholders", () => {
    const root = mkdtempSync(join(tmpdir(), "copilot-workshop-"));
    write(
      root,
      "workshop/copilot-capabilities.md",
      `# Inventário de recursos do Copilot
Status: CONCLUIDO
| Recurso observado | Origem | Melhor uso | Limitação ou fallback |
| --- | --- | --- | --- |
| Prompt file | Workspace | Planejamento | ［PREENCHA］ |
## Escolha por fase
| Fase | Interface escolhida | Justificativa |
| --- | --- | --- |
| Pesquisa | Ask | Não edita arquivos |
`,
    );

    expect(collectStepErrors(1, root)).toEqual(
      expect.arrayContaining([
        expect.stringContaining("PREENCHA"),
        expect.stringContaining("at least three resources"),
      ]),
    );
  });

  it("accepts three distinct context executions with debug evidence", () => {
    const root = mkdtempSync(join(tmpdir(), "copilot-workshop-"));
    write(
      root,
      "workshop/context-experiment.md",
      `# Experimento de contexto
Status: CONCLUIDO
## Execução A: contexto insuficiente
- Prompt usado: autocomplete sem contexto
## Execução B: contexto excessivo
- Prompt usado: autocomplete com cinco anexos
## Execução C: contexto mínimo suficiente
- Prompt usado: autocomplete com critérios e duas fontes
## Conclusão
- Evidência do Chat Debug ou fallback observado: a execução C enviou somente duas fontes.
`,
    );

    expect(collectStepErrors(2, root)).toEqual([]);
  });

  it("rejects duplicated context experiment prompts", () => {
    const root = mkdtempSync(join(tmpdir(), "copilot-workshop-"));
    write(
      root,
      "workshop/context-experiment.md",
      `# Experimento de contexto
Status: CONCLUIDO
## Execução A: contexto insuficiente
- Prompt usado: mesmo prompt em todos
## Execução B: contexto excessivo
- Prompt usado: mesmo prompt em todos
## Execução C: contexto mínimo suficiente
- Prompt usado: mesmo prompt em todos
## Conclusão
- Evidência do Chat Debug ou fallback observado: referências exibidas pelo Chat.
`,
    );

    expect(collectStepErrors(2, root)).toContain(
      "the three context executions must use distinct prompt formulations",
    );
  });

  it("accepts a completed human review without Space evidence", () => {
    const root = mkdtempSync(join(tmpdir(), "copilot-workshop-"));
    write(
      root,
      "workshop/human-review.md",
      `# Revisão humana
Status: CONCLUIDO
    | Critério | Estado | Evidência |
    | --- | --- | --- |
| Diff e contrato de testes preservado | OK | git diff |
## Decisão final
Decisão: APPROVED
Justificativa: contratos e teste manual aprovados.
`,
    );

    expect(collectStepErrors(6, root)).toEqual([]);
  });

  it("rejects placeholders and missing approval", () => {
    const root = mkdtempSync(join(tmpdir(), "copilot-workshop-"));
    write(
      root,
      "workshop/human-review.md",
      `# Revisão humana
Status: CONCLUIDO
| Diff e contrato de testes preservado | [PREENCHA] | [PREENCHA] |
## Decisão final
Decisão: PENDENTE
`,
    );

    expect(collectStepErrors(6, root)).toEqual(
      expect.arrayContaining([
        expect.stringContaining("PREENCHA"),
        expect.stringContaining("APPROVED"),
      ]),
    );
  });

  it("rejects an empty required heading section", () => {
    const root = mkdtempSync(join(tmpdir(), "copilot-workshop-"));
    write(
      root,
      "workshop/human-review.md",
      `# Revisão humana
Status: CONCLUIDO
| Diff e contrato de testes preservado | OK | git diff |
## Decisão final
`,
    );

    expect(collectStepErrors(6, root)).toContain(
      "workshop/human-review.md section '## Decisão final' must not be empty",
    );
  });

  it("rejects evidence labels with empty values", () => {
    const root = mkdtempSync(join(tmpdir(), "copilot-workshop-"));
    write(
      root,
      "workshop/human-review.md",
      `# Revisão humana
Status: CONCLUIDO
| Diff e contrato de testes preservado | OK | git diff |
## Decisão final
Decisão: APPROVED
- Justificativa:
`,
    );

    expect(collectStepErrors(6, root)).toContain(
      "workshop/human-review.md contains an empty evidence field",
    );
  });

  it("requires an origin for both model responses", () => {
    const root = mkdtempSync(join(tmpdir(), "copilot-workshop-"));
    write(
      root,
      "workshop/model-decision.md",
      `# Decisão de modelo
Status: CONCLUIDO
## Modelo A: velocidade e custo
- Origem da resposta: execução própria
## Modelo B: raciocínio e codificação
- Modelo utilizado: modelo de referência
## Decisão
- Decisão humana: APROVADO
`,
    );
    write(root, "src/components/upload/TagAutocomplete.tsx", "export const TagAutocomplete = () => null;\n");
    write(root, "src/app/upload/page.tsx", "import { TagAutocomplete } from './TagAutocomplete';\n");

    expect(collectStepErrors(5, root)).toContain(
      "the model decision must identify the origin of both responses",
    );
  });

  it("accepts complete model evidence in both sections", () => {
    const root = mkdtempSync(join(tmpdir(), "copilot-workshop-"));
    const fields = (origin: string, model: string) => `- Origem da resposta: ${origin}
- Modelo utilizado: ${model}
- Aderência aos critérios: cobre o contrato
- Disciplina de escopo: sem mudanças extras
- Premissas sem evidência: nenhuma observada
- Validação proposta: testes e build
- Follow-ups necessários: nenhum
- Latência e créditos/requests: não disponível
`;
    write(
      root,
      "workshop/model-decision.md",
      `# Decisão de modelo
Status: CONCLUIDO
## Modelo A: velocidade e custo
${fields("execução própria", "modelo rápido")}
## Modelo B: raciocínio e codificação
${fields("amostra do facilitador", "modelo de raciocínio")}
## Decisão
- Modelo escolhido: modelo rápido
- Evidências: ambos cumpriram o contrato
- Trade-off aceito: menor profundidade para menor latência
- Decisão humana: APROVADO
`,
    );
    write(root, "src/components/upload/TagAutocomplete.tsx", "export const TagAutocomplete = () => null;\n");
    write(root, "src/app/upload/page.tsx", "import { TagAutocomplete } from './TagAutocomplete';\n");

    expect(collectStepErrors(5, root)).toEqual([]);
  });

  it("rejects undocumented model response origins", () => {
    const root = mkdtempSync(join(tmpdir(), "copilot-workshop-"));
    write(
      root,
      "workshop/model-decision.md",
      `# Decisão de modelo
Status: CONCLUIDO
## Modelo A: velocidade e custo
- Origem da resposta: execução própria
## Modelo B: raciocínio e codificação
- Origem da resposta: resposta copiada
## Decisão
- Decisão humana: APROVADO
`,
    );
    write(root, "src/components/upload/TagAutocomplete.tsx", "export const TagAutocomplete = () => null;\n");
    write(root, "src/app/upload/page.tsx", "import { TagAutocomplete } from './TagAutocomplete';\n");

    expect(collectStepErrors(5, root)).toContain(
      "model response origins must be 'execução própria' or 'amostra do facilitador'",
    );
  });

  it("requires repository instructions to be restored after step 3", () => {
    const root = mkdtempSync(join(tmpdir(), "copilot-workshop-"));
    write(
      root,
      "workshop/instruction-comparison.md",
      `# Comparação de instructions
Status: CONCLUIDO
## Decisão
- Evidência observada: limites reconhecidos.
`,
    );
    write(
      root,
      "workshop/context-packet.md",
      `# Pacote de contexto
Status: CONCLUIDO
## Fontes relevantes
- Fonte: página Upload.
## Fora do escopo
- Item: persistência.
## Critérios de aceite
- Critério: autocomplete pelo teclado.
`,
    );

    expect(collectStepErrors(3, root)).toContain(
      ".github/copilot-instructions.md must be restored before completing step 3",
    );
  });

  it("parses the required prompt frontmatter fields", () => {
    expect(
      parsePromptFrontmatter(`---
name: "tag-autocomplete"
description: "Plano verificável"
agent: "plan"
---
`),
    ).toMatchObject({
      name: "tag-autocomplete",
      description: "Plano verificável",
      agent: "plan",
    });
  });

  it("requires the prompt to remain in plan mode", () => {
    const root = mkdtempSync(join(tmpdir(), "copilot-workshop-"));
    write(
      root,
      "workshop/prompt-rubric.md",
      `# Rubrica de prompt
Status: CONCLUIDO
## Prompt escolhido
- Versão: com contexto
`,
    );
    write(
      root,
      "workshop/implementation-plan.md",
      `# Plano
Status: CONCLUIDO
## Riscos de regressão
Risco documentado.
## Critérios de aceite e comandos de validação
Testes documentados.
Plano aprovado para comparação de modelos: SIM
`,
    );
    write(
      root,
      ".github/prompts/tag-autocomplete.prompt.md",
      `---
name: tag-autocomplete
description: Plano verificável
agent: agent
---
Fontes e evidências
Riscos de regressão
Não edite arquivos
`,
    );

    expect(collectStepErrors(4, root)).toContain(
      "the prompt frontmatter agent must remain 'plan'",
    );
  });
});