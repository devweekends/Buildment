import type { CapstoneCheckConfig } from "../../shared/blocks/capstone-check/schema.js";
import type { runAutomatedChecks } from "./automated.js";
import type { CapstoneRepoSource } from "./github.js";
import { buildGradePrompt, GraderError, ModelGradeSchema, recomputeReport, type GraderModel } from "./grade.js";
import { buildSnapshot } from "./snapshot.js";

// One AI grade: snapshot the repo inside the token budget, call the grader once, recompute
// the report. Shared by the live pipeline (service.ts) and the calibration runner, and kept
// free of database access so calibration runs anywhere.

/** Conservative for code and prose; the real count is usually lower, so the budget holds. */
const PROMPT_CHARS_PER_TOKEN = 3;

type GradeInput = {
  config: CapstoneCheckConfig;
  repoUrl: string;
  liveUrl: string | null;
  automatedRun: Awaited<ReturnType<typeof runAutomatedChecks>>;
  source: CapstoneRepoSource;
  grader: GraderModel;
  maxInputTokens: number;
};

export async function gradeWithModel(input: GradeInput) {
  const { config, automatedRun } = input;
  const repo = automatedRun.repo!;
  const empty = { tree: [], treeOmitted: 0, files: [], skippedForBudget: [], chars: 0 };
  const overhead = buildGradePrompt({
    pack: config.rubric,
    automated: automatedRun.results,
    repoUrl: input.repoUrl,
    commitSha: repo.commitSha,
    liveUrl: input.liveUrl,
    snapshot: empty,
    livePage: automatedRun.livePage,
  });
  const budget = input.maxInputTokens * PROMPT_CHARS_PER_TOKEN - overhead.system.length - overhead.user.length;
  if (budget < 2_000) throw new GraderError("The rubric is too long for the input budget.", "UNAVAILABLE");
  const snapshot = await buildSnapshot(input.source, repo.ref, repo.commitSha, repo.tree, config.rubric.snapshot, budget);
  const prompt = buildGradePrompt({
    pack: config.rubric,
    automated: automatedRun.results,
    repoUrl: input.repoUrl,
    commitSha: repo.commitSha,
    liveUrl: input.liveUrl,
    snapshot,
    livePage: automatedRun.livePage,
  });
  const call = await input.grader.grade(prompt);
  const parsed = ModelGradeSchema.safeParse(call.output);
  if (!parsed.success) {
    throw new GraderError("The grader returned something we could not read.", "BAD_OUTPUT", { inputTokens: call.inputTokens, outputTokens: call.outputTokens });
  }
  return { call, report: recomputeReport(config.rubric, automatedRun.results, parsed.data), snapshot };
}

