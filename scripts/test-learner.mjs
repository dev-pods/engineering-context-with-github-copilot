import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const directory = mkdtempSync(join(tmpdir(), "luma-tests-"));
const report = join(directory, "report.json");
try {
  const result = spawnSync("npm", ["exec", "--", "vitest", "run", "tests/tag-autocomplete.test.tsx", "--reporter=json", `--outputFile=${report}`], { stdio: "inherit" });
  if (result.status !== 0) throw new Error("Os testes do aluno precisam executar e passar.");
  const results = JSON.parse(readFileSync(report, "utf8"));
  const assertions = results.testResults.flatMap((suite) => suite.assertionResults);
  if (assertions.length < 2 || assertions.some((test) => test.status !== "passed")) {
    throw new Error("Entregue pelo menos dois testes aprovados, sem skip ou todo. Revise também a relevância das asserções.");
  }
  console.log(`${assertions.length} testes do aluno executados e aprovados.`);
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
} finally {
  rmSync(directory, { recursive: true, force: true });
}