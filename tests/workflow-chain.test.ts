import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const root = resolve(import.meta.dirname, "..");
const read = (path: string) => readFileSync(resolve(root, path), "utf8");

describe("Skills delivery workflow chain", () => {
  for (const step of [1, 2, 3, 4, 5]) {
    it(`publishes lesson ${step + 1} only after delivery ${step}`, () => {
      const workflow = read(`.github/workflows/${step}-step.yml`);
      expect(workflow).toContain("uses: ./.github/workflows/check-step.yml");
      expect(workflow).toContain(`step: ${step}`);
      expect(workflow).toContain(`next-step: ${step + 1}`);
      expect(workflow).toContain("branches: [improve-upload]");
      expect(workflow).not.toContain("workshop/");
      expect(existsSync(resolve(root, `.github/steps/${step + 1}-step.md`))).toBe(true);
    });
  }
  it("checks behaviors and keeps feedback separate from advancement", () => {
    const shared = read(".github/workflows/check-step.yml");
    for (const command of ["npm test", "npm run test:solution", "npm run test:learner", "npm run lint", "npm run build", "git diff --exit-code origin/main -- tests/solution/", 'node scripts/validate-step.mjs "$STEP"']) expect(shared).toContain(command);
    expect(shared).toContain("checking-work.md");
    expect(read(".github/translations/checking-work.md")).toContain("passo {{ step_number }}");
    expect(shared).toContain("needs: [find_exercise, check_delivery]");
    expect(shared).toContain('gh workflow enable "Passo $NEXT_STEP"');
    expect(shared).toContain('gh workflow disable "Passo $STEP"');
    expect(shared).toContain('test "$ALL_PASSED" = true');
  });
  it("finishes only after validating a same-repository delivery PR", () => {
    const final = read(".github/workflows/6-last-step.yml");
    expect(final).toContain("pull_request:");
    expect(final).toContain("branches: [main]");
    expect(final).toContain("head.ref == 'improve-upload'");
    expect(final).toContain("head.repo.full_name == github.repository");
    expect(final).toContain("needs: [delivery]");
    expect(final).toContain("finish-exercise.yml@v0.9.3");
    expect(final).toContain("step: 6");
  });
  it("watches actual deliveries rather than evidence sheets", () => {
    expect(read(".github/workflows/2-step.yml")).toContain("src/lib/mock-tag-data.ts");
    expect(read(".github/workflows/3-step.yml")).toContain("src/app/upload/page.tsx");
    expect(read(".github/workflows/4-step.yml")).toContain("src/components/upload/**");
    expect(read(".github/workflows/5-step.yml")).toContain(".github/skills/test-tags/**");
    expect(read(".github/workflows/5-step.yml")).toContain("src/components/upload/**");
    expect(read(".github/workflows/5-step.yml")).toContain("tests/tag-autocomplete.test.tsx");
  });
  it("keeps starter CI green and checks the solution once implemented", () => {
    const ci = read(".github/workflows/ci.yml");
    expect(ci).toContain("hashFiles('src/components/upload/TagAutocomplete.tsx') != ''");
    expect(ci).toContain("npm run test:solution");
    expect(ci).toContain("hashFiles('tests/tag-autocomplete.test.tsx') != ''");
    expect(ci).toContain("npm run test:learner");
  });
});