import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const root = resolve(import.meta.dirname, "..");

describe("self-contained Skills lessons", () => {
  for (const step of [1, 2, 3, 4, 5, 6]) {
    it(`provides actionable step ${step} without worksheets`, () => {
      const lesson = readFileSync(resolve(root, `.github/steps/${step}-step.md`), "utf8");
      for (const section of ["## Teoria", "## Atividade", "## Resultado esperado"]) expect(lesson).toContain(section);
      expect(lesson).not.toContain("workshop/");
      expect(lesson).toContain("```bash");
      expect(lesson).toContain("improve-upload");
    });
  }
  it("includes final review and a non-graded demonstration", () => {
    expect(existsSync(resolve(root, ".github/steps/x-review.md"))).toBe(true);
    expect(readFileSync(resolve(root, ".github/steps/x-extension.md"), "utf8")).toContain("não participa da validação");
  });
  it("keeps activities to 50 minutes, leaving a 10-minute Actions buffer", () => {
    const durations = [1, 2, 3, 4, 5, 6].map((step) => {
      const lesson = readFileSync(resolve(root, `.github/steps/${step}-step.md`), "utf8");
      const match = lesson.match(/^## Atividade:.*\((\d+) minutos\)$/m);
      expect(match, `step ${step} should declare its duration`).not.toBeNull();
      return Number(match?.[1]);
    });
    expect(durations.reduce((total, duration) => total + duration, 0)).toBe(50);
  });
});