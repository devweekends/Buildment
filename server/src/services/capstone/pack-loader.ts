import fs from "node:fs";
import path from "node:path";
import { load as loadYaml } from "js-yaml";
import { z } from "zod";
import { AUTOMATED_CHECKS, CAPSTONE_PACK_PATH, RubricPackSchema, type RubricPack } from "../../shared/blocks/capstone-check/schema.js";
import type { AutomatedCheckResult } from "../../shared/blocks/capstone-check/report.js";

// Reads rubric packs and calibration examples from a course package folder:
//
//   courses/<slug>/capstone/<name>.yaml                  the pack (shipped with the course)
//   courses/<slug>/capstone/calibration/<example>.yaml   calibration examples (never shipped)
//   courses/<slug>/capstone/calibration/<example>/       optional frozen repo snapshot
//
// A course with several packs (capstone/capstone-1.yaml, capstone-2.yaml, ...) keeps each
// pack's examples in calibration/<pack name>/. A lone capstone/rubric.yaml uses calibration/.
//
// Used by the course importer (inline the pack into the block) and by the calibration
// runner. Every error names the file and the field.

function issues(error: z.ZodError): string {
  return error.issues.map((issue) => `${issue.path.join(".") || "(root)"}: ${issue.message}`).join("; ");
}

export function parseRubricPack(text: string, label: string): RubricPack {
  let raw: unknown;
  try {
    raw = loadYaml(text);
  } catch (error) {
    throw new Error(`${label}: the YAML could not be read (${(error as Error).message.split("\n")[0]}).`);
  }
  const result = RubricPackSchema.safeParse(raw);
  if (!result.success) throw new Error(`${label} is invalid: ${issues(result.error)}`);
  return result.data;
}

/** Load a pack named in a ```capstone fence, relative to the course folder. */
export function loadRubricPackFile(courseDir: string, relativePath: string): RubricPack {
  if (!CAPSTONE_PACK_PATH.test(relativePath)) throw new Error(`capstone pack "${relativePath}" must look like capstone/rubric.yaml`);
  const full = path.join(courseDir, relativePath);
  if (!fs.existsSync(full)) throw new Error(`capstone pack ${relativePath} was not found in the course folder`);
  return parseRubricPack(fs.readFileSync(full, "utf8"), relativePath);
}

const PINNED_REPO = /^https:\/\/github\.com\/[A-Za-z0-9-]{1,39}\/[A-Za-z0-9._-]{1,100}@[0-9a-f]{7,40}$/;

const AutomatedFixtureSchema = z.array(
  z.object({
    id: z.string(),
    check: z.enum(AUTOMATED_CHECKS),
    status: z.enum(["pass", "fail", "pending", "skipped"]),
    message: z.string(),
    blocking: z.boolean().optional(),
  })
);

export const CalibrationExampleSchema = z
  .object({
    /** A pinned commit, https://github.com/owner/repo@<sha>, graded through the GitHub API. */
    repo: z.string().regex(PINNED_REPO, "Pin the commit: https://github.com/owner/repo@<sha>").optional(),
    /** A frozen snapshot folder next to this file: repo files plus automated.json. */
    snapshot: z.string().regex(/^\.\/[a-z0-9-]+\/?$/, "Use ./<folder>").optional(),
    liveUrl: z.string().url().optional(),
    expected: z
      .object({
        completed: z.boolean(),
        percent: z.number().int().min(0).max(100),
        tolerance: z.number().int().min(0).max(50).default(10),
      })
      .strict(),
    note: z.string().max(1000).optional(),
  })
  .strict()
  .refine((value) => Boolean(value.repo) !== Boolean(value.snapshot), "Give exactly one of repo or snapshot");

export type CalibrationExample = z.infer<typeof CalibrationExampleSchema> & {
  name: string;
  file: string;
  /** Absolute snapshot folder, when the example uses one. */
  snapshotDir: string | null;
  /** Automated results to replay for a snapshot example (automated.json). */
  automated: AutomatedCheckResult[] | null;
  /** A recorded grader output (<example>.recorded.json) for free replays in CI. */
  recorded: unknown | null;
};

/** Where a pack's examples live: calibration/ for rubric.yaml, calibration/<name>/ otherwise. */
export function calibrationDir(packDir: string, packFile = "rubric.yaml"): string {
  const name = path.basename(packFile).replace(/.yaml$/, "");
  return name === "rubric" ? path.join(packDir, "calibration") : path.join(packDir, "calibration", name);
}

export function loadCalibrationExamples(packDir: string, packFile = "rubric.yaml"): CalibrationExample[] {
  const dir = calibrationDir(packDir, packFile);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((name) => name.endsWith(".yaml"))
    .sort()
    .map((name) => {
      const file = path.join(dir, name);
      const parsed = CalibrationExampleSchema.safeParse(loadYaml(fs.readFileSync(file, "utf8")));
      if (!parsed.success) throw new Error(`calibration/${name} is invalid: ${issues(parsed.error)}`);
      const base = name.replace(/\.yaml$/, "");
      const snapshotDir = parsed.data.snapshot ? path.join(dir, parsed.data.snapshot) : null;
      let automated: AutomatedCheckResult[] | null = null;
      if (snapshotDir) {
        if (!fs.existsSync(snapshotDir)) throw new Error(`calibration/${name}: snapshot folder ${parsed.data.snapshot} is missing`);
        const automatedFile = path.join(snapshotDir, "automated.json");
        if (fs.existsSync(automatedFile)) {
          const result = AutomatedFixtureSchema.safeParse(JSON.parse(fs.readFileSync(automatedFile, "utf8")));
          if (!result.success) throw new Error(`calibration/${base}/automated.json is invalid: ${issues(result.error)}`);
          automated = result.data;
        }
      }
      const recordedFile = path.join(dir, `${base}.recorded.json`);
      const recorded = fs.existsSync(recordedFile) ? (JSON.parse(fs.readFileSync(recordedFile, "utf8")) as unknown) : null;
      return { ...parsed.data, name: base, file, snapshotDir, automated, recorded };
    });
}

/** Every file under a snapshot folder except automated.json and live.html, as repo-relative paths. */
export function snapshotFiles(snapshotDir: string): Array<{ path: string; size: number }> {
  const out: Array<{ path: string; size: number }> = [];
  const visit = (current: string) => {
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) visit(full);
      else if (entry.isFile()) {
        const relative = path.relative(snapshotDir, full).split(path.sep).join("/");
        if (relative !== "automated.json" && relative !== "live.html") out.push({ path: relative, size: fs.statSync(full).size });
      }
    }
  };
  visit(snapshotDir);
  return out.sort((a, b) => a.path.localeCompare(b.path));
}
