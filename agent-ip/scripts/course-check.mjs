#!/usr/bin/env node
/**
 * One command for every check a course needs before its pull request
 * (06-quality-gates.md, Before a pull request). The checks are picked from
 * what the course contains, so a text-only course runs the core set and a
 * hands-on course also runs its code exercises.
 *
 * Usage (from the repository root, with the server's dependencies installed):
 *   node agent-ip/scripts/course-check.mjs <slug>
 *   node agent-ip/scripts/course-check.mjs <slug> --only core
 *
 * Core, for every course:
 *   - the course audit (agent-ip/scripts/audit-course.mjs);
 *   - the server's source validation, the same import and MDX compile the release runs;
 *   - the server's strict structure audit (set-the-scene, gate checklists, two-option predicts);
 *   - a warning (not a failure) for fence fields holding a double quote or backslash: the release
 *     stores them as blocks and is fine, but raw-Markdown previews write them as attr="..." and break.
 * Code, when a chapter has a codeexercise fence:
 *   - every solution passes its tests in the same sandbox the app grades with, and every starter fails.
 *
 * Exit code 1 when any check fails.
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { createRequire } from "node:module";

const root = process.cwd();
const slug = process.argv[2];
const onlyIndex = process.argv.indexOf("--only");
const only = onlyIndex > 0 ? process.argv[onlyIndex + 1] : "";
if (!slug) {
  console.error("Usage: node agent-ip/scripts/course-check.mjs <slug> [--only core|code]");
  process.exit(2);
}
const courseDir = path.join(root, "courses", slug);
if (!fs.existsSync(path.join(courseDir, "course.yaml"))) {
  console.error(`No course at ${courseDir}`);
  process.exit(2);
}
const yaml = createRequire(path.join(root, "server", "package.json"))("js-yaml");

const chapters = fs.readdirSync(courseDir, { withFileTypes: true })
  .filter((d) => d.isDirectory() && /^\d+-/.test(d.name))
  .flatMap((d) => fs.readdirSync(path.join(courseDir, d.name))
    .filter((f) => f.endsWith(".md"))
    .map((f) => ({ file: `${d.name}/${f}`, text: fs.readFileSync(path.join(courseDir, d.name, f), "utf8") })));

const FENCE = /(?:^|[\r\n])[ \t]*```(video|walkthrough|diagram|roadmap|quiz|openquestion|predict|codeexercise)[ \t]*\r?\n([\s\S]*?)\r?\n[ \t]*```/g;
const fences = (type) => chapters.flatMap((c) =>
  [...c.text.matchAll(FENCE)].filter((m) => m[1] === type).map((m) => ({ file: c.file, data: yaml.load(m[2]) })));

const results = [];
const record = (name, ok, detail = "", warnOnly = false) => {
  results.push({ name, ok: ok || warnOnly });
  console.log(`${ok ? "PASS" : warnOnly ? "WARN" : "FAIL"} ${name}${detail ? `: ${detail}` : ""}`);
};
// Runs a command and records it; its own output is shown only when it fails.
const run = (name, file, args, cwd) => {
  try {
    execFileSync(process.execPath, [...file, ...args], {
      cwd, stdio: "pipe", encoding: "utf8", timeout: 600000,
      env: { DATABASE_URL: "postgresql://check:check@127.0.0.1:1/check", ...process.env },
    });
    record(name, true);
  } catch (err) {
    record(name, false);
    console.log(String(err.stdout ?? "").split("\n").filter((l) => /FAIL|ERROR|failed|Needs work/.test(l)).slice(0, 25).join("\n"));
  }
};

const hasCode = chapters.some((c) => /```codeexercise/.test(c.text));
const profile = ["core", ...(hasCode ? ["code"] : [])].filter((p) => !only || p === only);
console.log(`Course ${slug}: ${chapters.length} chapters, checks: ${profile.join(", ")}\n`);

if (profile.includes("core")) {
  run("course audit", ["agent-ip/scripts/audit-course.mjs"], [path.join("courses", slug)], root);
  const server = path.join(root, "server");
  run("server source validation", ["--import", "tsx", "scripts/validate-course-source.ts"], ["--course", slug], server);
  run("server strict structure audit", ["--import", "tsx", "scripts/audit-course-structure.ts"], ["--course", slug, "--strict"], server);

  // Raw-Markdown previews turn these fields into attr="..." with JSON.stringify, so a quote or backslash breaks them.
  const ATTR = { video: ["title", "caption"], walkthrough: ["title"], diagram: ["title", "alt", "caption"], roadmap: ["title"],
    quiz: ["prompt", "explanation"], openquestion: ["prompt", "sampleAnswer", "urlLabel"], predict: ["prompt", "explanation"],
    codeexercise: ["prompt", "language", "starterCode", "filename"] };
  const bad = [];
  for (const type of Object.keys(ATTR)) for (const { file, data } of fences(type)) {
    for (const key of ATTR[type]) {
      const v = data?.[key];
      if (typeof v === "string" && /["\\]/.test(v)) bad.push(`${file} ${type}.${key}`);
    }
  }
  record("fence fields hold no double quote or backslash (raw previews only)", bad.length === 0, bad.slice(0, 10).join("; "), true);
}

if (profile.includes("code")) {
  // Same contract as server/src/shared/blocks/code/run-tests.ts.
  const grade = (source, tests) => {
    // The grading sandbox is a bare context: no URL, fetch, setTimeout or require. A solution that needs them fails here, as it does in the app.
    const exports = {};
    const sandbox = { module: { exports }, exports, console: { log() {}, error() {}, warn() {} } };
    try { vm.runInNewContext(source, sandbox, { timeout: 3000 }); } catch { return 0; }
    let passed = 0;
    for (const t of tests) {
      try { vm.runInNewContext(`(function() {\n${t.code}\n})();`, sandbox, { timeout: 3000 }); passed += 1; } catch { /* counted as failed */ }
    }
    return passed;
  };
  const problems = [];
  for (const { file, data } of fences("codeexercise")) {
    const tests = data?.tests ?? [];
    if (!data?.solution || !tests.length) { problems.push(`${file}: needs a solution and tests`); continue; }
    if (grade(data.solution, tests) !== tests.length) problems.push(`${file}: the solution fails a test`);
    if (data.starterCode && grade(data.starterCode, tests) === tests.length) problems.push(`${file}: the starter already passes`);
  }
  record("code exercises: solutions pass, starters fail", problems.length === 0, problems.join("; "));
}

const failed = results.filter((r) => !r.ok).length;
console.log(`\n${results.length - failed} of ${results.length} checks passed.`);
if (failed) process.exitCode = 1;
