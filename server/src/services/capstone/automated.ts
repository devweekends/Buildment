import { automatedSpecs, HARD_STOP_CHECKS, type AutomatedCheckSpec, type RubricPack } from "../../shared/blocks/capstone-check/schema.js";
import type { AutomatedCheckResult } from "../../shared/blocks/capstone-check/report.js";
import type { CapstoneRepoSource, RepoRef, RepoTreeEntry } from "./github.js";
import type { PublicPage } from "./safe-fetch.js";

// Deterministic checks that run before (and instead of, when a hard gate fails) the
// model. Every message is one sentence the learner can act on.

/** Glob with `**`, `*` and `?`, matched against a full repo path. */
export function globToRegExp(glob: string): RegExp {
  let out = "";
  for (let i = 0; i < glob.length; i++) {
    const char = glob[i]!;
    if (char === "*") {
      if (glob[i + 1] === "*") {
        const slash = glob[i + 2] === "/";
        out += slash ? "(?:.*/)?" : ".*";
        i += slash ? 2 : 1;
      } else out += "[^/]*";
    } else if (char === "?") out += "[^/]";
    else out += char.replace(/[.+^${}()|[\]\\]/g, "\\$&");
  }
  return new RegExp(`^${out}$`);
}

export function matchesAny(path: string, globs: string[]): boolean {
  return globs.some((glob) => globToRegExp(glob).test(path));
}

export type RepoFacts = {
  ref: RepoRef;
  defaultBranch: string;
  commitSha: string;
  tree: RepoTreeEntry[];
  treeTruncated: boolean;
};

export type AutomatedRun = {
  results: AutomatedCheckResult[];
  repo: RepoFacts | null;
  /** Live page text for the grader, when the pack asked for a live URL and it answered. */
  livePage: { url: string; text: string } | null;
  /** True when a hard gate failed, so the model must not be called. */
  stopped: boolean;
};

export type AutomatedDeps = {
  source: CapstoneRepoSource;
  fetchPage: (url: string) => Promise<PublicPage>;
};

function siteUrl(base: string, path: string | undefined): string {
  if (!path) return base;
  return new URL(path, base.endsWith("/") ? base : `${base}/`).toString();
}

function pageText(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 8_000);
}

function tagMatches(tags: string[], pattern: string): string | null {
  const regex = globToRegExp(pattern);
  return tags.find((tag) => regex.test(tag)) ?? null;
}

export async function runAutomatedChecks(
  pack: RubricPack,
  submission: { ref: RepoRef; liveUrl: string | null },
  deps: AutomatedDeps
): Promise<AutomatedRun> {
  const specs = automatedSpecs(pack);
  const results = new Map<string, AutomatedCheckResult>();
  const skip = (spec: AutomatedCheckSpec, message: string) =>
    results.set(spec.id, { id: spec.id, check: spec.check, status: "skipped", message });
  const set = (spec: AutomatedCheckSpec, status: AutomatedCheckResult["status"], message: string) =>
    results.set(spec.id, { id: spec.id, check: spec.check, status, message });

  // 1. The repo itself. Nothing else can run without it.
  const repoSpec = specs.find((spec) => spec.check === "repo_public")!;
  const repo = await deps.source.repo(submission.ref);
  let facts: RepoFacts | null = null;
  if (!repo || repo.isPrivate) {
    set(repoSpec, "fail", "We could not open this repo. Check the link and make the repo public.");
  } else {
    const tree = await deps.source.tree(submission.ref, repo.headSha);
    facts = { ref: submission.ref, defaultBranch: repo.defaultBranch, commitSha: repo.headSha, tree: tree.entries, treeTruncated: tree.truncated };
    set(repoSpec, "pass", `Found the repo. Checking the latest commit on ${repo.defaultBranch}.`);
  }

  // 2. Live site, fetched once and shared by every live check.
  const liveSpecs = specs.filter((spec) => spec.check === "live_ok" || spec.check === "live_contains");
  const pages = new Map<string, PublicPage>();
  const page = async (path: string | undefined) => {
    const url = siteUrl(submission.liveUrl!, path);
    if (!pages.has(url)) pages.set(url, await deps.fetchPage(url));
    return pages.get(url)!;
  };

  for (const spec of specs) {
    if (spec.check === "repo_public") continue;
    if (spec.check === "live_ok" || spec.check === "live_contains") {
      if (!submission.liveUrl) {
        if (pack.submission.liveUrl === "required") set(spec, "fail", "Add the live link to your submission.");
        else skip(spec, "No live link was given.");
        continue;
      }
      const result = await page(spec.path);
      if (!result.ok) {
        set(spec, "fail", result.error ? `The live site did not load: ${result.error}` : `The live site answered with status ${result.status}.`);
        continue;
      }
      if (spec.check === "live_ok") set(spec, "pass", `The live site loads (status ${result.status}).`);
      else if (result.body.includes(spec.text)) set(spec, "pass", `The live page contains "${spec.text}".`);
      else set(spec, "fail", `The live page does not contain "${spec.text}" yet.`);
      continue;
    }
    if (!facts) {
      skip(spec, "Skipped because the repo could not be opened.");
      continue;
    }
    if (spec.check === "ci_green") {
      const ci = await deps.source.ci(facts.ref, facts.commitSha);
      if (ci.state === "success") set(spec, "pass", `GitHub Actions passed on the latest commit (${ci.runs} workflow${ci.runs === 1 ? "" : "s"}).`);
      else if (ci.state === "pending") set(spec, "pending", `GitHub Actions is still running (${ci.running.join(", ")}). Check again when it finishes.`);
      else if (ci.state === "failure") set(spec, "fail", `GitHub Actions failed on the latest commit: ${ci.failed.join(", ")}. Fix the build and tests, push, then check again.`);
      else set(spec, "fail", "No GitHub Actions run was found for the latest commit. Add the CI workflow from the template and push.");
    } else if (spec.check === "tag") {
      const tags = await deps.source.tags(facts.ref);
      const found = tagMatches(tags, spec.pattern);
      if (found) set(spec, "pass", `Found the tag ${found}.`);
      else set(spec, "fail", `No tag matches ${spec.pattern}. Create one with git tag and push it with git push --tags.`);
    } else if (spec.check === "files") {
      const missing = spec.paths.filter((pattern) => !facts!.tree.some((entry) => globToRegExp(pattern).test(entry.path)));
      if (missing.length === 0) set(spec, "pass", "All the required files are in the repo.");
      else set(spec, "fail", `Missing from the repo: ${missing.join(", ")}.`);
    }
  }

  const ordered = specs.map((spec) => results.get(spec.id)!);
  const stopped = ordered.some((result) => HARD_STOP_CHECKS.has(result.check) && result.status !== "pass");
  const live = liveSpecs.length ? [...pages.values()].find((result) => result.ok) : undefined;
  return {
    results: ordered,
    repo: facts,
    livePage: live?.ok ? { url: live.finalUrl, text: pageText(live.body) } : null,
    stopped,
  };
}
