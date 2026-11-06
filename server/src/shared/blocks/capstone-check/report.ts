import type { AutomatedCheckKind, CapstoneCheckConfig } from "./schema.js";

// Wire and storage shapes for a capstone check result. The learner and the mentor
// read the same report; the mentor view adds the cost, the model and the commit.

export type AutomatedCheckStatus = "pass" | "fail" | "pending" | "skipped";

export type AutomatedCheckResult = {
  id: string;
  check: AutomatedCheckKind;
  status: AutomatedCheckStatus;
  /** One plain sentence the learner can act on. */
  message: string;
  /** True when this check failing stops the run before the AI grade. Missing on older rows. */
  blocking?: boolean;
};

/** Older stored results have no `blocking`; fall back to the default for their kind. */
export function blocksGrade(result: AutomatedCheckResult): boolean {
  const blocking = result.blocking ?? (result.check === "repo_public" || result.check === "ci_green" || result.check === "files_match");
  return blocking && (result.status === "fail" || result.status === "pending");
}

export type CriterionResult = {
  id: string;
  title: string;
  required: boolean;
  weight: number;
  score: number;
  max: number;
  met: boolean;
  /** Set when an automated gate forced the score to 0. */
  gatedBy: string[];
  evidence: string[];
  missing: string[];
};

export type WhatIsLeftItem = {
  criterionId: string | null;
  title: string;
  steps: string[];
};

export type CapstoneReport = {
  completed: boolean;
  percent: number;
  passPercent: number;
  /** Two or three sentences for the top of the result card. */
  summary: string;
  criteria: CriterionResult[];
  whatIsLeft: WhatIsLeftItem[];
  qualityNotes: { strengths: string[]; improvements: string[] };
  confidence: "high" | "medium" | "low";
  /**
   * Integrity concerns the grader raised (text aimed at the grader, copied work, weakened
   * tests). Mentor only: stripped from the learner's view. Any flag sends the check to the mentor.
   */
  integrityFlags?: string[];
  /** False when a hard gate stopped the run before the AI grade. */
  graded: boolean;
};

export type CapstoneCheckStatusName = "QUEUED" | "RUNNING" | "DONE" | "FAILED";

export type CapstoneCheckView = {
  id: string;
  attempt: number;
  status: CapstoneCheckStatusName;
  repoUrl: string;
  liveUrl: string | null;
  commitSha: string | null;
  createdAt: string;
  finishedAt: string | null;
  automated: AutomatedCheckResult[];
  report: CapstoneReport | null;
  error: string | null;
  /** True once this check is in the mentor's queue. */
  sentToMentor: boolean;
  reused: boolean;
};

export type CapstoneMentorDecision = {
  verdict: "APPROVED" | "NEEDS_REVISION";
  feedback: string;
  score: number | null;
  reviewerName: string | null;
  createdAt: string;
};

export type CapstoneCheckState = {
  /** Newest first. */
  checks: CapstoneCheckView[];
  remainingToday: number;
  dailyLimit: number;
  available: boolean;
  /** The mentor's decision on the latest check they reviewed, if any. */
  decision: CapstoneMentorDecision | null;
};

export type CapstoneMentorView = CapstoneCheckView & {
  model: string | null;
  inputTokens: number;
  outputTokens: number;
  costUsd: number;
  packId: string;
  packVersion: number;
};

/** Report projector for docs/06-reports.mdx: no rubric text. */
export function reportCapstoneCheck(config: CapstoneCheckConfig) {
  return {
    type: "CAPSTONE_CHECK",
    title: config.title ?? config.rubric.title,
    summary: "",
    details: [] as unknown[],
    metric: "review" as const,
    pack: config.rubric.pack,
    packVersion: config.rubric.version,
    passPercent: config.rubric.passPercent,
  };
}
