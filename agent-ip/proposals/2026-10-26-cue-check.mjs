// Form-cue check for quiz MCQs and predicts: can the key be guessed without reading the case?
// Counts, per option, a reason clause (because, since, so, as), an absolute word, and a
// "check the source" word, and reports how often the key is the odd one out.
// Usage (from server/, so js-yaml resolves): node ../agent-ip/proposals/2026-10-26-cue-check.mjs <course dir> [...]
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
const require = createRequire(path.resolve("package.json"));
const yaml = require("js-yaml");

const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : e.name.endsWith(".md") ? [path.join(d, e.name)] : []));
const REASON = /\b(because|since|so that|so|as)\b/i;
const ABSOLUTE = /\b(never|always|every|any|all|only|nothing|certain|proves?|guarantees?|everyone|no one)\b/i;
const CHECK = /\b(check|read|test|verify|open the|primary page|source|docs?|documentation)\b/i;
const tally = { n: 0, oddReason: 0, oddReasonKey: 0, oddAbs: 0, oddAbsKey: 0, oddCheck: 0, oddCheckKey: 0, keyReason: 0, wrongReason: 0, keyAbs: 0, wrongAbs: 0, wrongs: 0 };
const flagged = [];
for (const dir of process.argv.slice(2)) {
  for (const file of walk(dir).sort()) {
    const src = fs.readFileSync(file, "utf8").replace(/\r\n/g, "\n");
    for (const [, body] of src.matchAll(/^```quiz\n([\s\S]*?)\n```$/gm)) {
      let d;
      try { d = yaml.load(body); } catch { continue; }
      if (d.type !== "mcq") continue;
      const opts = d.options.map(String);
      const k = d.correct;
      tally.n++;
      const feat = (re) => opts.map((o) => re.test(o));
      for (const [name, re] of [["Reason", REASON], ["Abs", ABSOLUTE], ["Check", CHECK]]) {
        const f = feat(re);
        const count = f.filter(Boolean).length;
        // odd one out: exactly one option differs from the other three
        const oddIdx = count === 1 ? f.indexOf(true) : count === opts.length - 1 ? f.indexOf(false) : -1;
        if (oddIdx >= 0) {
          tally[`odd${name}`]++;
          if (oddIdx === k) { tally[`odd${name}Key`]++; flagged.push(`${path.basename(file)} [${name}] ${String(d.question).slice(0, 60)}`); }
        }
      }
      opts.forEach((o, i) => {
        if (i === k) { tally.keyReason += REASON.test(o); tally.keyAbs += ABSOLUTE.test(o); }
        else { tally.wrongs++; tally.wrongReason += REASON.test(o); tally.wrongAbs += ABSOLUTE.test(o); }
      });
    }
  }
}
const pct = (a, b) => (b ? Math.round((a / b) * 100) : 0) + "%";
console.log(`MCQ ${tally.n}`);
console.log(`reason clause: key ${pct(tally.keyReason, tally.n)}, wrong ${pct(tally.wrongReason, tally.wrongs)}; odd-one-out ${tally.oddReason}, of which key ${tally.oddReasonKey}`);
console.log(`absolute word: key ${pct(tally.keyAbs, tally.n)}, wrong ${pct(tally.wrongAbs, tally.wrongs)}; odd-one-out ${tally.oddAbs}, of which key ${tally.oddAbsKey}`);
console.log(`check word: odd-one-out ${tally.oddCheck}, of which key ${tally.oddCheckKey}`);
for (const f of flagged) console.log("ODD-KEY", f);
