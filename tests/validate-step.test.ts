import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, resolve } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { collectStepErrors, parsePromptFrontmatter } from "../scripts/validate-step.mjs";

const roots: string[] = [];
const paths = [
  ".devcontainer/devcontainer.json", "src/app/upload/page.tsx",
  "src/lib/mock-tag-data.ts", "src/components/upload/TagAutocomplete.tsx",
  ".github/prompts/test-tags.prompt.md", "tests/tag-autocomplete.test.tsx",
];

function fixture() {
  const root = mkdtempSync(resolve(tmpdir(), "copilot-step-"));
  roots.push(root);
  for (const path of paths) {
    mkdirSync(dirname(resolve(root, path)), { recursive: true });
    writeFileSync(resolve(root, path), path.endsWith(".prompt.md")
      ? "---\ndescription: Testar tags\nagent: agent\n---\nUse vitest para TagAutocomplete.tsx em tests/tag-autocomplete.test.tsx."
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
  it("requires an actionable test prompt", () => {
    const root = fixture();
    writeFileSync(resolve(root, ".github/prompts/test-tags.prompt.md"), "---\nagent: plan\n---\nGenerate tests.");
    expect(collectStepErrors(5, root).join(" ")).toContain("agent: agent");
    expect(collectStepErrors(5, root).join(" ")).toContain("description");
  });
  it("parses prompt metadata", () => {
    expect(parsePromptFrontmatter("no metadata")).toBeNull();
    expect(parsePromptFrontmatter('---\nname: "example"\n---\n')).toEqual({ name: "example" });
  });
  it("rejects unknown steps", () => expect(collectStepErrors(7)).toEqual(["Uso: node scripts/validate-step.mjs <1-6>"]));
});