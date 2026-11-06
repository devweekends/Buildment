// GENERATED from server/src/shared — do not edit here. Run `pnpm sync-shared` in server/.
import { z } from "zod";
import { isSafeSubmissionUrl } from "../../lib/safe-submission-url";

// CAPSTONE_CHECK: the learner submits a GitHub repo (and a live URL when the pack asks),
// the server runs automated checks, then grades against the rubric pack with the
// platform's Anthropic key. See docs/16-capstone-checker-and-certificates.mdx.
//
// The rubric pack is authored as capstone/<name>.yaml in the course package and
// inlined into Block.config.rubric by the importer. `rubric` is a SECRET_KEY, so the
// pack never reaches the browser; the reader gets the projection built in
// services/blocks/state.ts (title, live URL rule, criterion titles).

const kebab = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use kebab-case");
/** Check ids default to the check name (live_ok), so underscores are allowed here. */
const checkId = z.string().regex(/^[a-z0-9]+(?:[-_][a-z0-9]+)*$/, "Use lower-case words joined by - or _");

export const AUTOMATED_CHECKS = [
  "repo_public",
  "ci_green",
  "tag",
  "files",
  "files_match",
  "file_contains",
  "check_run",
  "live_ok",
  "live_contains",
] as const;
export type AutomatedCheckKind = (typeof AUTOMATED_CHECKS)[number];

/**
 * Checks that stop the run before the model is called by default: nothing to grade, the build
 * is broken, or a course-owned file was changed. A spec can override this with `stop`.
 */
export const HARD_STOP_CHECKS: ReadonlySet<AutomatedCheckKind> = new Set(["repo_public", "ci_green", "files_match"]);

const sitePath = z.string().regex(/^\/[^\s]*$/, "Start the path with /").max(200);
const repoPath = z.string().min(1).max(200).regex(/^(?!\/)(?!.*\.\.)[^\s*?]+$/, "Use a plain repo path like .github/workflows/ci.yml");
/** A template repo at a tag or commit: https://github.com/owner/repo@v1.0.0 */
export const TEMPLATE_REF = /^https:\/\/github\.com\/[A-Za-z0-9-]{1,39}\/[A-Za-z0-9._-]{1,100}@[A-Za-z0-9._/-]{1,100}$/;
const stop = z.boolean().optional();

const AutomatedCheckSpecSchema = z.discriminatedUnion("check", [
  z.object({ check: z.literal("repo_public"), id: checkId.optional() }).strict(),
  z.object({ check: z.literal("ci_green"), id: checkId.optional(), stop }).strict(),
  z.object({ check: z.literal("tag"), id: checkId.optional(), pattern: z.string().min(1).max(80), stop }).strict(),
  z.object({ check: z.literal("files"), id: checkId.optional(), paths: z.array(z.string().min(1).max(200)).min(1).max(30), stop }).strict(),
  /** Course-owned files (workflow, supplied tests) must be byte-identical to the template at a tag. */
  z.object({ check: z.literal("files_match"), id: checkId.optional(), paths: z.array(repoPath).min(1).max(20), against: z.string().regex(TEMPLATE_REF, "Use https://github.com/owner/repo@<tag or commit>"), stop }).strict(),
  /** A repo file contains a line, for example a pinned `uses:` of a reusable workflow. */
  z.object({ check: z.literal("file_contains"), id: checkId.optional(), path: repoPath, text: z.string().min(1).max(300), stop }).strict(),
  /** One named GitHub check run on the commit concluded with success. */
  z.object({ check: z.literal("check_run"), id: checkId.optional(), name: z.string().trim().min(1).max(100), stop }).strict(),
  z.object({ check: z.literal("live_ok"), id: checkId.optional(), path: sitePath.optional(), stop }).strict(),
  z.object({ check: z.literal("live_contains"), id: checkId.optional(), text: z.string().min(1).max(200), path: sitePath.optional(), stop }).strict(),
]);

export type AutomatedCheckSpec = z.infer<typeof AutomatedCheckSpecSchema> & { id: string };

/** Whether a failed or pending check stops the run before the AI grade. */
export function stopsRun(spec: { check: AutomatedCheckKind; stop?: boolean }): boolean {
  return spec.check === "repo_public" || (spec.stop ?? HARD_STOP_CHECKS.has(spec.check));
}

const CriterionSchema = z
  .object({
    id: kebab,
    title: z.string().trim().min(1).max(120),
    weight: z.number().int().min(1).max(100),
    required: z.boolean().default(false),
    /** Automated check ids; the criterion scores 0 if any of them did not pass. */
    gate: z.array(checkId).max(6).default([]),
    /** What the grader should look for, in one or two sentences. */
    lookFor: z.string().trim().min(1).max(1200),
    /** Score levels: "0" is required, the highest key is full marks. */
    levels: z.record(z.string().regex(/^\d$/, "Levels are 0 to 9"), z.string().trim().min(1).max(600)),
    /** Lowest level that counts as met; defaults to full marks. */
    passLevel: z.number().int().min(0).max(9).optional(),
  })
  .strict()
  .superRefine((criterion, ctx) => {
    const levels = Object.keys(criterion.levels).map(Number);
    if (!levels.includes(0)) ctx.addIssue({ code: "custom", path: ["levels"], message: "Describe level 0" });
    const max = Math.max(...levels);
    if (max < 1) ctx.addIssue({ code: "custom", path: ["levels"], message: "Describe at least one level above 0" });
    if (criterion.passLevel !== undefined && criterion.passLevel > max) {
      ctx.addIssue({ code: "custom", path: ["passLevel"], message: "passLevel is above the highest level" });
    }
  });

export const RubricPackSchema = z
  .object({
    pack: kebab.max(80),
    version: z.number().int().min(1),
    title: z.string().trim().min(1).max(160),
    passPercent: z.number().int().min(0).max(100).default(70),
    submission: z
      .object({
        repo: z.literal("required").default("required"),
        liveUrl: z.enum(["required", "optional", "none"]).default("none"),
      })
      .strict()
      .default({ repo: "required", liveUrl: "none" }),
    automated: z.array(AutomatedCheckSpecSchema).max(20).default([{ check: "repo_public" }]),
    snapshot: z
      .object({
        include: z.array(z.string().min(1).max(200)).max(40).default(["README.md", "**/*"]),
        exclude: z.array(z.string().min(1).max(200)).max(40).default([]),
        maxFiles: z.number().int().min(1).max(200).default(60),
        maxBytesPerFile: z.number().int().min(1000).max(200_000).default(40_000),
      })
      .strict()
      .default({ include: ["README.md", "**/*"], exclude: [], maxFiles: 60, maxBytesPerFile: 40_000 }),
    /** Extra instructions for the grader, for example the stack the template uses. */
    guidance: z.string().trim().max(4000).optional(),
    criteria: z.array(CriterionSchema).min(1).max(20),
    /** Level 3 hook: a passed oral exam stage before a mentor can confirm. Not built yet. */
    oralExam: z.object({ enabled: z.boolean().default(false) }).strict().default({ enabled: false }),
  })
  .strict()
  .superRefine((pack, ctx) => {
    const ids = new Set<string>();
    pack.automated.forEach((spec, index) => {
      const id = spec.id ?? spec.check;
      if (ids.has(id)) ctx.addIssue({ code: "custom", path: ["automated", index], message: `Duplicate check id "${id}"; give each one an id` });
      ids.add(id);
      if ((spec.check === "live_ok" || spec.check === "live_contains") && pack.submission.liveUrl === "none") {
        ctx.addIssue({ code: "custom", path: ["automated", index], message: "Live checks need submission.liveUrl" });
      }
    });
    if (!pack.automated.some((spec) => spec.check === "repo_public")) {
      ctx.addIssue({ code: "custom", path: ["automated"], message: "Include a repo_public check" });
    }
    const criterionIds = new Set<string>();
    pack.criteria.forEach((criterion, index) => {
      if (criterionIds.has(criterion.id)) ctx.addIssue({ code: "custom", path: ["criteria", index, "id"], message: "Duplicate criterion id" });
      criterionIds.add(criterion.id);
      for (const gate of criterion.gate) {
        if (!ids.has(gate)) ctx.addIssue({ code: "custom", path: ["criteria", index, "gate"], message: `Unknown check id "${gate}"` });
      }
    });
    if (pack.oralExam.enabled) {
      ctx.addIssue({ code: "custom", path: ["oralExam"], message: "The oral exam stage is not available yet; set enabled: false" });
    }
  });

export type RubricPack = z.infer<typeof RubricPackSchema>;
export type RubricCriterion = RubricPack["criteria"][number];

/** Every automated spec with its effective id (the check name unless the pack gives one). */
export function automatedSpecs(pack: RubricPack): AutomatedCheckSpec[] {
  return pack.automated.map((spec) => ({ ...spec, id: spec.id ?? spec.check }));
}

export function maxLevel(criterion: RubricCriterion): number {
  return Math.max(...Object.keys(criterion.levels).map(Number));
}

export function passLevel(criterion: RubricCriterion): number {
  return criterion.passLevel ?? maxLevel(criterion);
}

export const CapstoneCheckConfigSchema = z.object({
  title: z.string().trim().min(1).max(160).optional(),
  /** Short learner-facing line above the form. */
  intro: z.string().trim().max(600).optional(),
  /** Path of the pack inside the course package, as authored. */
  pack: z.string().min(1).max(200),
  /** The parsed pack, inlined by the importer. Server-only. */
  rubric: RubricPackSchema,
});

export type CapstoneCheckConfig = z.infer<typeof CapstoneCheckConfigSchema>;

/** What the reader receives: never the rubric levels, weights or grader guidance. */
export type SanitizedCapstoneCheckConfig = {
  title: string;
  intro: string | null;
  liveUrl: "required" | "optional" | "none";
  checklist: Array<{ id: string; title: string; required: boolean }>;
};

export function capstoneClientConfig(config: CapstoneCheckConfig): SanitizedCapstoneCheckConfig {
  return {
    title: config.title ?? config.rubric.title,
    intro: config.intro ?? null,
    liveUrl: config.rubric.submission.liveUrl,
    checklist: config.rubric.criteria.map((criterion) => ({ id: criterion.id, title: criterion.title, required: criterion.required })),
  };
}

const GITHUB_REPO_URL = /^https:\/\/github\.com\/[A-Za-z0-9-]{1,39}\/[A-Za-z0-9._-]{1,100}\/?$/;

export const CapstoneSubmitSchema = z.object({
  repoUrl: z
    .string()
    .trim()
    .transform((value) => value.replace(/\.git$/, "").replace(/\/$/, ""))
    .refine((value) => GITHUB_REPO_URL.test(value), "Paste the repo link, for example https://github.com/you/your-project"),
  liveUrl: z
    .string()
    .trim()
    .max(500)
    .optional()
    .transform((value) => (value ? value : undefined))
    .refine((value) => value === undefined || (isSafeSubmissionUrl(value) && value.startsWith("https://")), "Use a secure https:// link"),
});

export type CapstoneSubmit = z.infer<typeof CapstoneSubmitSchema>;

/** Stored on the Response a mentor reviews. */
export type CapstoneCheckPayload = {
  checkId: string;
  repoUrl: string;
  liveUrl: string | null;
  commitSha: string | null;
  percent: number;
  completed: boolean;
};

/** Path rule for a rubric pack inside a course package. */
export const CAPSTONE_PACK_PATH = /^capstone\/[a-z0-9]+(?:-[a-z0-9]+)*\.yaml$/;

/**
 * The ```capstone fence an author writes in a chapter:
 *
 *     ```capstone
 *     title: Ship your personal site
 *     intro: Paste your repo and your live site. The check takes about a minute.
 *     pack: capstone/rubric.yaml
 *     ```
 *
 * The importer reads the pack file and stores it in Block.config.rubric.
 */
export const CapstoneFenceSchema = z
  .object({
    title: z.string().trim().min(1).max(160).optional(),
    intro: z.string().trim().max(600).optional(),
    pack: z.string().regex(CAPSTONE_PACK_PATH, "Point pack at a file like capstone/rubric.yaml"),
    required: z.boolean().optional(),
  })
  .strict();
