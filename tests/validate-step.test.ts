import { mkdtempSync, mkdirSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, resolve } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { collectStepErrors, parseSkillFrontmatter } from "../scripts/validate-step.mjs";

const roots: string[] = [];
const skillPath = ".github/skills/test-tags/SKILL.md";
const paths = [
  ".devcontainer/devcontainer.json", "src/app/upload/page.tsx",
  "src/lib/mock-tag-data.ts", "src/components/upload/TagAutocomplete.tsx",
  skillPath, "tests/tag-autocomplete.test.tsx",
];

function fixture() {
  const root = mkdtempSync(resolve(tmpdir(), "copilot-step-"));
  roots.push(root);
  for (const path of paths) {
    mkdirSync(dirname(resolve(root, path)), { recursive: true });
    writeFileSync(resolve(root, path), path === skillPath
      ? "---\nname: test-tags\ndescription: Gerar regressões quando o autocomplete de tags mudar\n---\nUse vitest para TagAutocomplete.tsx em tests/tag-autocomplete.test.tsx."
      : "TagAutocomplete");
  }
  return root;
}

afterEach(() => roots.splice(0).forEach((root) => rmSync(root, { recursive: true, force: true })));

describe("exercise artifact gates", () => {
  for (const step of [1, 2, 3, 4, 5, 6]) {
    it(`accepts step ${step} artifacts without worksheets`, () => {
      expect(collectStepErrors(step, fixture())).toEqual([]);
    });
    it(`rejects missing step ${step} artifacts`, () => {
      const root = fixture();
      for (const path of paths) rmSync(resolve(root, path));
      expect(collectStepErrors(step, root).join(" ")).toContain("ausente");
    });
  }
  it("rejects an empty artifact", () => {
    const root = fixture();
    writeFileSync(resolve(root, "src/lib/mock-tag-data.ts"), "");
    expect(collectStepErrors(2, root).join(" ")).toContain("vazio");
  });
  for (const step of [3, 4, 6]) {
    it(`accepts integration through a client wrapper in step ${step}`, () => {
      const root = fixture();
      writeFileSync(resolve(root, "src/app/upload/page.tsx"), "export default function Page() { return <UploadTagField />; }");
      expect(collectStepErrors(step, root)).toEqual([]);
    });
  }
  it("requires an actionable test skill", () => {
    const root = fixture();
    writeFileSync(resolve(root, skillPath), "---\nagent: agent\n---\nGenerate tests.");
    const errors = collectStepErrors(5, root).join(" ");
    for (const requirement of ["name: test-tags", "description", "TagAutocomplete.tsx", "vitest", "tests/tag-autocomplete.test.tsx"]) expect(errors).toContain(requirement);
  });
  for (const step of [5, 6]) {
    it(`does not accept a legacy prompt instead of the skill in step ${step}`, () => {
      const root = fixture();
      const legacyPath = resolve(root, ".github/prompts/test-tags.prompt.md");
      mkdirSync(dirname(legacyPath), { recursive: true });
      writeFileSync(legacyPath, readFileSync(resolve(root, skillPath), "utf8"));
      rmSync(resolve(root, skillPath));
      expect(collectStepErrors(step, root)).toContain(`Arquivo ausente: ${skillPath}`);
    });
    it(`rejects a skill whose name does not match its directory in step ${step}`, () => {
      const root = fixture();
      const skill = readFileSync(resolve(root, skillPath), "utf8");
      writeFileSync(resolve(root, skillPath), skill.replace("name: test-tags", "name: other-tests"));
      expect(collectStepErrors(step, root).join(" ")).toContain("name: test-tags");
    });
  }
  it("accepts the lesson skill and resolves its source links from the skill directory", () => {
    const root = fixture();
    const lesson = readFileSync(resolve(import.meta.dirname, "../.github/steps/5-step.md"), "utf8");
    const example = lesson.match(/   ```markdown\n([\s\S]*?)\n   ```/)?.[1].replace(/^   /gm, "");
    if (!example) throw new Error("A lição precisa fornecer um exemplo de SKILL.md.");
    const skillFile = resolve(root, skillPath);
    writeFileSync(skillFile, example);
    expect(collectStepErrors(5, root)).toEqual([]);
    expect(collectStepErrors(6, root)).toEqual([]);
    const sourcePaths = [...example.matchAll(/\]\(([^)]+)\)/g)].map((match) => resolve(dirname(skillFile), match[1]));
    expect(sourcePaths).toEqual([
      resolve(root, "src/components/upload/TagAutocomplete.tsx"),
      resolve(root, "tests/setup.ts"),
    ]);
  });
  it("parses skill metadata", () => {
    expect(parseSkillFrontmatter("no metadata")).toBeNull();
    expect(parseSkillFrontmatter('---\nname: "example"\n---\n')).toEqual({ name: "example" });
  });
  it("rejects unknown steps", () => expect(collectStepErrors(7)).toEqual(["Uso: node scripts/validate-step.mjs <1-6>"]));
});