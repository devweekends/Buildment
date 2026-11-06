// Calibration for a capstone rubric pack (docs/16-capstone-checker-and-certificates.mdx).
//
//   pnpm capstone:calibrate --pack ../../Edorax-core/courses/dw-level-2/capstone/rubric.yaml
//       Replays each example's recorded grader output. Free; this is what CI runs.
//
//   pnpm capstone:calibrate --pack <rubric.yaml> --live [--record]
//       Calls the real model (ANTHROPIC_API_KEY, CAPSTONE_MODEL) for every example and prints
//       the cost. --record saves each output as calibration/<example>.recorded.json so CI can
//       replay it. Exits 1 when any example lands outside its tolerance.
import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { anthropicGrader } from "../src/services/capstone/grade.js";
import { formatCalibration, runCalibration } from "../src/services/capstone/calibration.js";
import { calibrationDir, loadCalibrationExamples, parseRubricPack } from "../src/services/capstone/pack-loader.js";

function arg(name: string): string | undefined {
  const index = process.argv.indexOf(`--${name}`);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

async function main() {
  const packArg = arg("pack");
  if (!packArg) throw new Error("Pass --pack <path to capstone/rubric.yaml>");
  const full = path.resolve(packArg);
  const packDir = path.dirname(full);
  const pack = parseRubricPack(fs.readFileSync(full, "utf8"), path.basename(full));
  const live = process.argv.includes("--live");
  const record = process.argv.includes("--record");
  const packFile = path.basename(full);
  const examples = loadCalibrationExamples(packDir, packFile);
  if (examples.length === 0) throw new Error(`No examples in ${calibrationDir(packDir, packFile)}`);

  const model = process.env.CAPSTONE_MODEL || "claude-sonnet-5-5";
  const maxOutputTokens = Number(process.env.CAPSTONE_MAX_OUTPUT_TOKENS || 8000);
  const maxInputTokens = Number(process.env.CAPSTONE_MAX_INPUT_TOKENS || 40000);
  if (live) {
    if (!process.env.ANTHROPIC_API_KEY) throw new Error("--live needs ANTHROPIC_API_KEY");
    const worst = ((maxInputTokens * 2 + maxOutputTokens * 10) / 1_000_000) * examples.length;
    console.log(`${pack.pack} v${pack.version}: ${examples.length} examples on ${model}. Worst case about $${worst.toFixed(2)}.`);
  } else {
    console.log(`${pack.pack} v${pack.version}: replaying ${examples.length} examples.`);
  }

  const outcomes = await runCalibration({
    pack,
    packDir,
    packFile,
    mode: live ? "live" : "replay",
    liveGrader: live
      ? anthropicGrader({ apiKey: process.env.ANTHROPIC_API_KEY!, model, maxOutputTokens, effort: (process.env.CAPSTONE_EFFORT as "low" | "medium" | "high") || "medium" })
      : undefined,
    githubToken: process.env.GITHUB_TOKEN,
    maxInputTokens,
  });
  console.log(formatCalibration(outcomes));

  if (live && record) {
    for (const outcome of outcomes) {
      if (outcome.output === null) continue;
      const file = path.join(calibrationDir(packDir, packFile), `${outcome.name}.recorded.json`);
      fs.writeFileSync(file, `${JSON.stringify(outcome.output, null, 2)}\n`);
      console.log(`  recorded ${path.relative(process.cwd(), file)}`);
    }
  }
  if (outcomes.some((outcome) => !outcome.withinTolerance)) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
