#!/usr/bin/env node
/**
 * Blind answer-key check: extract every graded item without its key, then
 * compare a reviewer's answers with the keys (05-assessment-and-motivation.md
 * → Answer-key check).
 *
 * Usage:
 *   node agent-ip/scripts/blind-keys.mjs extract courses/<slug> <out-dir> [--batches 2]
 *   node agent-ip/scripts/blind-keys.mjs compare <out-dir>
 *
 * extract writes batch-1.md, batch-2.md, ... (questions and lettered options,
 * no keys, no explanations) and keys.json. Give the reviewer only the batch
 * files. The reviewer writes answers-1.md, answers-2.md, ... with one line per
 * item: `<item id> | <letter> | <high/medium/low> | <note>`.
 *
 * compare prints mismatches, missing answers and every item the reviewer did
 * not mark high, and exits 1 on any mismatch or missing answer. Open each
 * flagged item in its chapter: a low mark often means the context sits in the
 * prose above the question, which the reviewer did not see.
 */
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(path.resolve("server/package.json"));
const yaml = require("js-yaml");

const [mode, target, outArg] = process.argv.slice(2);
const LETTERS = "ABCDEFGH";

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

function extract(courseDir, outDir) {
  const batchArg = process.argv.indexOf("--batches");
  const batchCount = batchArg > 0 ? Number(process.argv[batchArg + 1]) : 2;
  const items = [];
  for (const file of walk(courseDir).filter((f) => f.endsWith(".md")).sort()) {
    const body = fs.readFileSync(file, "utf8").replace(/\r\n/g, "\n");
    const fence = /```(quiz|predict)\n([\s\S]*?)```/g;
    let match;
    let n = 0;
    while ((match = fence.exec(body))) {
      n += 1;
      const config = yaml.load(match[2]);
      const id = `${path.basename(file, ".md")}#${n}`;
      if (match[1] === "quiz") {
        if (config.type !== "mcq") continue;
        items.push({ id, kind: "mcq", question: config.question, options: config.options.map(String), key: config.correct });
      } else {
        items.push({
          id,
          kind: "predict",
          question: config.prompt,
          options: config.options.map((o) => o.label),
          key: config.options.findIndex((o) => o.id === config.correctOptionId),
        });
      }
    }
  }
  fs.mkdirSync(outDir, { recursive: true });
  const size = Math.ceil(items.length / batchCount);
  for (let b = 0; b < batchCount; b++) {
    const batch = items.slice(b * size, (b + 1) * size);
    const text = batch
      .map((i) => `### ${i.id} (${i.kind})\n${i.question}\n${i.options.map((o, k) => `${LETTERS[k]}. ${o}`).join("\n")}\n`)
      .join("\n");
    fs.writeFileSync(path.join(outDir, `batch-${b + 1}.md`), text);
  }
  fs.writeFileSync(path.join(outDir, "keys.json"), JSON.stringify(Object.fromEntries(items.map((i) => [i.id, LETTERS[i.key]])), null, 1));
  console.log(`${items.length} graded items in ${batchCount} batches written to ${outDir}. Keep keys.json away from the reviewer.`);
}

function compare(outDir) {
  const keys = JSON.parse(fs.readFileSync(path.join(outDir, "keys.json"), "utf8"));
  const answers = {};
  for (const file of fs.readdirSync(outDir).filter((f) => /^answers-\d+\.md$/.test(f))) {
    for (const line of fs.readFileSync(path.join(outDir, file), "utf8").split(/\r?\n/)) {
      const parts = line.split("|").map((p) => p.trim());
      if (parts.length >= 3 && parts[0].includes("#")) answers[parts[0]] = { letter: parts[1], confidence: parts[2], note: parts[3] ?? "" };
    }
  }
  let failed = 0;
  for (const [id, key] of Object.entries(keys)) {
    const answer = answers[id];
    if (!answer) {
      console.log(`MISSING   ${id}`);
      failed += 1;
    } else if (answer.letter !== key) {
      console.log(`MISMATCH  ${id}: key ${key}, reviewer ${answer.letter} (${answer.confidence}) ${answer.note}`);
      failed += 1;
    } else if (answer.confidence !== "high") {
      console.log(`CHECK     ${id}: matched at ${answer.confidence} confidence. ${answer.note}`);
    }
  }
  const total = Object.keys(keys).length;
  console.log(`\n${total - failed} of ${total} keys matched.`);
  process.exit(failed > 0 ? 1 : 0);
}

if (mode === "extract" && target && outArg) extract(target, outArg);
else if (mode === "compare" && target) compare(target);
else {
  console.error("Usage: blind-keys.mjs extract <course-dir> <out-dir> [--batches n] | compare <out-dir>");
  process.exit(2);
}
