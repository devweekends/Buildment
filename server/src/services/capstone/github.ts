// Read-only GitHub access for capstone checks, through the REST API only.
// We never clone, build or run learner code: "builds and tests pass" is the
// learner's own GitHub Actions result on the submitted commit.

export type RepoRef = { owner: string; repo: string };

export type RepoTreeEntry = { path: string; size: number };

export type CiStatus =
  | { state: "success"; runs: number }
  | { state: "failure"; failed: string[] }
  | { state: "pending"; running: string[] }
  | { state: "none" };

export interface CapstoneRepoSource {
  /** Null when the repo does not exist, is private, or is unreachable. */
  repo(ref: RepoRef): Promise<{ defaultBranch: string; headSha: string; isPrivate: boolean } | null>;
  tags(ref: RepoRef): Promise<string[]>;
  tree(ref: RepoRef, sha: string): Promise<{ entries: RepoTreeEntry[]; truncated: boolean }>;
  /** Raw file text, or null when missing or binary. Reads at most maxBytes. */
  file(ref: RepoRef, sha: string, path: string, maxBytes: number): Promise<string | null>;
  ci(ref: RepoRef, sha: string): Promise<CiStatus>;
  /** The latest run of one named check on a commit. */
  checkRun(ref: RepoRef, sha: string, name: string): Promise<CheckRunStatus>;
}

export type CheckRunStatus =
  | { state: "success" }
  | { state: "failure"; conclusion: string }
  | { state: "pending" }
  | { state: "none" };

export function parseRepoUrl(url: string): RepoRef | null {
  const match = /^https:\/\/github\.com\/([A-Za-z0-9-]{1,39})\/([A-Za-z0-9._-]{1,100})\/?$/.exec(url.replace(/\.git$/, ""));
  if (!match) return null;
  return { owner: match[1]!, repo: match[2]! };
}

const API = "https://api.github.com";
const RAW = "https://raw.githubusercontent.com";
const TIMEOUT_MS = 10_000;

type FetchLike = typeof fetch;

export class GitHubApiError extends Error {
  constructor(message: string, readonly status: number) {
    super(message);
  }
}

/** The live implementation. A token raises the limit from 60 to 5,000 requests an hour. */
export function githubRepoSource(options: { token?: string; fetchImpl?: FetchLike } = {}): CapstoneRepoSource {
  const doFetch = options.fetchImpl ?? fetch;
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "edorax-capstone-checker",
  };
  if (options.token) headers.Authorization = `Bearer ${options.token}`;

  async function get(path: string, accept?: string): Promise<Response> {
    const response = await doFetch(`${API}${path}`, {
      headers: accept ? { ...headers, Accept: accept } : headers,
      signal: AbortSignal.timeout(TIMEOUT_MS),
      redirect: "follow",
    });
    if (response.status === 403 || response.status === 429) {
      throw new GitHubApiError("GitHub is rate limiting the checker. Try again in a few minutes.", response.status);
    }
    return response;
  }

  async function json<T>(path: string): Promise<T | null> {
    const response = await get(path);
    if (response.status === 404) return null;
    if (!response.ok) throw new GitHubApiError(`GitHub returned ${response.status}`, response.status);
    return (await response.json()) as T;
  }

  const base = (ref: RepoRef) => `/repos/${encodeURIComponent(ref.owner)}/${encodeURIComponent(ref.repo)}`;

  return {
    async repo(ref) {
      const repo = await json<{ default_branch: string; private: boolean }>(base(ref));
      if (!repo) return null;
      const commit = await json<{ sha: string }>(`${base(ref)}/commits/${encodeURIComponent(repo.default_branch)}`);
      if (!commit) return null;
      return { defaultBranch: repo.default_branch, headSha: commit.sha, isPrivate: repo.private };
    },
    async tags(ref) {
      const tags = await json<Array<{ name: string }>>(`${base(ref)}/tags?per_page=100`);
      return (tags ?? []).map((tag) => tag.name);
    },
    async tree(ref, sha) {
      const tree = await json<{ tree: Array<{ path: string; type: string; size?: number }>; truncated: boolean }>(
        `${base(ref)}/git/trees/${encodeURIComponent(sha)}?recursive=1`
      );
      if (!tree) return { entries: [], truncated: false };
      return {
        entries: tree.tree.filter((entry) => entry.type === "blob").map((entry) => ({ path: entry.path, size: entry.size ?? 0 })),
        truncated: tree.truncated,
      };
    },
    // Files come from GitHub's raw file host, which does not count against the REST API's hourly
    // limit (60 an hour without a token). A check then uses about five API calls in total.
    async file(ref, sha, path, maxBytes) {
      const encoded = path.split("/").map(encodeURIComponent).join("/");
      const response = await doFetch(
        `${RAW}/${encodeURIComponent(ref.owner)}/${encodeURIComponent(ref.repo)}/${encodeURIComponent(sha)}/${encoded}`,
        { headers: { "User-Agent": headers["User-Agent"]! }, signal: AbortSignal.timeout(TIMEOUT_MS), redirect: "follow" }
      );
      if (!response.ok) return null;
      const bytes = new Uint8Array(await response.arrayBuffer()).subarray(0, maxBytes);
      if (bytes.includes(0)) return null;
      return new TextDecoder("utf-8", { fatal: false }).decode(bytes);
    },
    async ci(ref, sha) {
      const runs = await json<{ workflow_runs: Array<{ name: string; workflow_id: number; status: string; conclusion: string | null; created_at: string }> }>(
        `${base(ref)}/actions/runs?head_sha=${encodeURIComponent(sha)}&per_page=50`
      );
      return summariseRuns(runs?.workflow_runs ?? []);
    },
    async checkRun(ref, sha, name) {
      const result = await json<{ check_runs: Array<{ status: string; conclusion: string | null; started_at: string | null }> }>(
        `${base(ref)}/commits/${encodeURIComponent(sha)}/check-runs?check_name=${encodeURIComponent(name)}&per_page=20`
      );
      return summariseCheckRun(result?.check_runs ?? []);
    },
  };
}

/** The latest run with that name decides; skipped and neutral count as not passing here. */
export function summariseCheckRun(runs: Array<{ status: string; conclusion: string | null; started_at: string | null }>): CheckRunStatus {
  if (runs.length === 0) return { state: "none" };
  const latest = [...runs].sort((a, b) => (b.started_at ?? "").localeCompare(a.started_at ?? ""))[0]!;
  if (latest.status !== "completed") return { state: "pending" };
  return latest.conclusion === "success" ? { state: "success" } : { state: "failure", conclusion: latest.conclusion ?? "unknown" };
}

/** The latest run of each workflow decides. Skipped and neutral runs do not fail the build. */
export function summariseRuns(
  runs: Array<{ name: string; workflow_id: number; status: string; conclusion: string | null; created_at: string }>
): CiStatus {
  if (runs.length === 0) return { state: "none" };
  const latest = new Map<number, (typeof runs)[number]>();
  for (const run of runs) {
    const seen = latest.get(run.workflow_id);
    if (!seen || seen.created_at < run.created_at) latest.set(run.workflow_id, run);
  }
  const all = [...latest.values()];
  const running = all.filter((run) => run.status !== "completed").map((run) => run.name);
  if (running.length) return { state: "pending", running };
  const failed = all.filter((run) => !["success", "skipped", "neutral"].includes(run.conclusion ?? "")).map((run) => run.name);
  if (failed.length) return { state: "failure", failed };
  return { state: "success", runs: all.length };
}
