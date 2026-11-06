import fs from "node:fs";
import path from "node:path";
import type { CapstoneCheckConfig, RubricPack } from "../../shared/blocks/capstone-check/schema.js";
import { blocksGrade, type CapstoneReport } from "../../shared/blocks/capstone-check/report.js";
import { runAutomatedChecks, type AutomatedRun } from "./automated.js";
import { githubRepoSource, parseRepoUrl, type CapstoneRepoSource } from "./github.js";
import { costMicroUsd, recomputeReport, type GraderCall, type GraderModel } from "./grade.js";
import { loadCalibrationExamples, snapshotFiles, type CalibrationExample } from "./pack-loader.js";
import { fetchPublicPage, type PublicPage } from "./safe-fetch.js";
import { gradeWithModel } from "./run-grade.js";

// Runs a pack's calibration examples through the real grading pipeline and checks that
// each score lands within the example's tolerance. Two modes:
//   replay: each example's recorded grader output (<example>.recorded.json), free, runs in CI
//   live:   the real model; costs money, run by hand with `pnpm capstone:calibrate --live`

export type CalibrationOutcome = {
  name: string;
  expected: CalibrationExample["expected"];
  report: CapstoneReport | null;
  withinTolerance: boolean;
  skipped: string | null;
  costUsd: number;
  /** The raw grader output, for --record. */
  output: unknown;
};

/** A repo source backed by a frozen snapshot folder. */
export function snapshotRepoSource(snapshotDir: string): CapstoneRepoSource {
  const entries = snapshotFiles(snapshotDir);
  return {
    async repo() {
      return { defaultBranch: "main", headSha: "snapshot", isPrivate: false };
    },
    async tags() {
      return [];
    },
    async tree() {
      return { entries, truncated: false };
    },
    async file(_ref, _sha, filePath, maxBytes) {
      const full = path.join(snapshotDir, ...filePath.split("/"));
      if (!full.startsWith(snapshotDir) || !fs.existsSync(full)) return null;
      return fs.readFileSync(full).subarray(0, maxBytes).toString("utf8");
    },
    async ci() {
      return { state: "success", runs: 1 };
    },
    async checkRun() {
      return { state: "success" };
    },
  };
}

/** A snapshot's frozen live page: live.html in the folder, or a failed load when there is none. */
export function snapshotLivePage(snapshotDir: string): (url: string) => Promise<PublicPage> {
  const file = path.join(snapshotDir, "live.html");
  return async (url) =>
    fs.existsSync(file)
      ? { ok: true, status: 200, finalUrl: url, body: fs.readFileSync(file, "utf8") }
      : { ok: false, status: null, finalUrl: url, body: "", error: "the snapshot has no live.html" };
}

/** Grader that returns a fixed output, used to replay recorded runs. */
export function recordedGrader(output: unknown, model = "recorded"): GraderModel {
  return {
    async grade(): Promise<GraderCall> {
      return { output, model, inputTokens: 0, outputTokens: 0 };
    },
  };
}

function pinnedSource(base: CapstoneRepoSource, sha: string): CapstoneRepoSource {
  return {
    ...base,
    async repo(ref) {
      const repo = await base.repo(ref);
      return repo ? { ...repo, headSha: sha } : null;
    },
  };
}

async function automatedFor(pack: RubricPack, example: CalibrationExample, source: CapstoneRepoSource): Promise<AutomatedRun> {
  const repoUrl = example.repo?.split("@")[0] ?? "https://github.com/calibration/snapshot";
  const ref = parseRepoUrl(repoUrl)!;
  const fetchPage = example.snapshotDir ? snapshotLivePage(example.snapshotDir) : (url: string) => fetchPublicPage(url);
  const run = await runAutomatedChecks(pack, { ref, liveUrl: example.liveUrl ?? null }, { source, fetchPage });
  if (example.automated) {
    // A snapshot example states its automated results; the repo facts still come from the folder.
    return { ...run, results: example.automated, stopped: example.automated.some(blocksGrade) };
  }
  return run;
}

export async function runCalibration(input: {
  pack: RubricPack;
  packDir: string;
  /** The pack's file name; decides the calibration folder (see calibrationDir). */
  packFile?: string;
  mode: "replay" | "live";
  liveGrader?: GraderModel;
  githubToken?: string;
  maxInputTokens: number;
}): Promise<CalibrationOutcome[]> {
  const config: CapstoneCheckConfig = { pack: "capstone/rubric.yaml", rubric: input.pack };
  const outcomes: CalibrationOutcome[] = [];
  for (const example of loadCalibrationExamples(input.packDir, input.packFile)) {
    const base: Omit<CalibrationOutcome, "report" | "withinTolerance" | "skipped" | "costUsd" | "output"> = { name: example.name, expected: example.expected };
    const replayWithoutRecording = input.mode === "replay" && example.recorded === null;
    // A replay never touches the network: a pinned-repo example without a recording is skipped.
    if (replayWithoutRecording && !example.snapshotDir) {
      outcomes.push({ ...base, report: null, withinTolerance: true, skipped: "no recorded output; run with --live --record", costUsd: 0, output: null });
      continue;
    }
    const source = example.snapshotDir
      ? snapshotRepoSource(example.snapshotDir)
      : pinnedSource(githubRepoSource({ token: input.githubToken }), example.repo!.split("@")[1]!);
    const run = await automatedFor(input.pack, example, source);
    let report: CapstoneReport;
    let output: unknown = null;
    let cost = 0;
    if (run.stopped || !run.repo) {
      // Stopped by a hard gate: no model call, so nothing to record or replay.
      report = recomputeReport(input.pack, run.results, null);
    } else if (replayWithoutRecording) {
      outcomes.push({ ...base, report: null, withinTolerance: true, skipped: "no recorded output; run with --live --record", costUsd: 0, output: null });
      continue;
    } else {
      const grader: GraderModel = input.mode === "replay" ? recordedGrader(example.recorded) : input.liveGrader!;
      const repoUrl = example.repo?.split("@")[0] ?? "https://github.com/calibration/snapshot";
      const graded = await gradeWithModel({ config, repoUrl, liveUrl: example.liveUrl ?? null, automatedRun: run, source, grader, maxInputTokens: input.maxInputTokens });
      report = graded.report;
      output = graded.call.output;
      cost = costMicroUsd(graded.call.model, graded.call.inputTokens, graded.call.outputTokens) / 1_000_000;
    }
    const withinTolerance =
      report.completed === example.expected.completed && Math.abs(report.percent - example.expected.percent) <= example.expected.tolerance;
    outcomes.push({ ...base, report, withinTolerance, skipped: null, costUsd: input.mode === "live" ? cost : 0, output });
  }
  return outcomes;
}

export function formatCalibration(outcomes: CalibrationOutcome[]): string {
  const rows = outcomes.map((outcome) => {
    if (outcome.skipped) return `  SKIP  ${outcome.name}: ${outcome.skipped}`;
    const got = `${outcome.report!.percent}% ${outcome.report!.completed ? "complete" : "not complete"}`;
    const want = `${outcome.expected.percent}% +/-${outcome.expected.tolerance} ${outcome.expected.completed ? "complete" : "not complete"}`;
    return `  ${outcome.withinTolerance ? "PASS" : "FAIL"}  ${outcome.name}: got ${got}, expected ${want}${outcome.costUsd ? `, $${outcome.costUsd.toFixed(4)}` : ""}`;
  });
  const total = outcomes.reduce((sum, outcome) => sum + outcome.costUsd, 0);
  return [...rows, total ? `  Total cost: $${total.toFixed(4)}` : ""].filter(Boolean).join("\n");
}
