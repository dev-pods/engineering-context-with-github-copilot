import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";

const checks = [];

function record(name, passed, detail) {
  checks.push({ name, passed, detail });
}

function commandVersion(command, args = ["--version"]) {
  const result = spawnSync("/usr/bin/env", [command, ...args], {
    encoding: "utf8",
    env: {
      ...process.env,
      GIT_CONFIG_GLOBAL: "/dev/null",
    },
  });
  return result.status === 0
    ? (result.stdout || result.stderr).trim().split("\n")[0]
    : null;
}

const nodeMajor = Number(process.versions.node.split(".")[0]);
record("Node.js 22+", nodeMajor >= 22, `v${process.versions.node}`);

const npmVersion = commandVersion("npm");
record("npm", Boolean(npmVersion), npmVersion ?? "não encontrado");

const gitVersion = commandVersion("git");
record("Git", Boolean(gitVersion), gitVersion ?? "não encontrado");

const ghVersion = commandVersion("gh");
record("GitHub CLI", Boolean(ghVersion), ghVersion ?? "não encontrado");

record(
  "Dependências",
  existsSync("node_modules") && existsSync("package-lock.json"),
  existsSync("node_modules") ? "instaladas" : "execute npm ci",
);

console.table(
  checks.map(({ name, passed, detail }) => ({
    Status: passed ? "OK" : "FALHA",
    Verificação: name,
    Detalhe: detail,
  })),
);

if (checks.some(({ passed }) => !passed)) {
  process.exitCode = 1;
} else {
  console.log("\nAmbiente local pronto. Confirme o login do Copilot Chat na interface do VS Code.");
}