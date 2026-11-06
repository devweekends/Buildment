import type { RubricPack } from "../../shared/blocks/capstone-check/schema.js";
import { matchesAny } from "./automated.js";
import type { CapstoneRepoSource, RepoRef, RepoTreeEntry } from "./github.js";

// The bounded view of a repo the grader reads: the file tree plus the files the pack
// names, in pack order, until the character budget runs out. Lock files, build output
// and binaries never count against the budget.

export type SnapshotFile = { path: string; content: string; truncated: boolean };

export type RepoSnapshot = {
  tree: string[];
  treeOmitted: number;
  files: SnapshotFile[];
  skippedForBudget: string[];
  chars: number;
};

const ALWAYS_EXCLUDE = [
  "**/node_modules/**",
  "**/.git/**",
  "**/dist/**",
  "**/build/**",
  "**/.next/**",
  "**/coverage/**",
  "**/vendor/**",
  "**/*.lock",
  "**/package-lock.json",
  "**/pnpm-lock.yaml",
  "**/yarn.lock",
  "**/*.min.js",
  "**/*.map",
];

const BINARY = /\.(png|jpe?g|gif|webp|ico|svg|pdf|zip|gz|tar|woff2?|ttf|otf|mp[34]|mov|wav|db|sqlite|exe|dll|so|dylib|bin|pyc|class|jar)$/i;
const TREE_LIMIT = 400;

/** Order candidates by the first include glob they match, then by path, so the pack decides priority. */
export function selectSnapshotPaths(entries: RepoTreeEntry[], snapshot: RubricPack["snapshot"]): RepoTreeEntry[] {
  const excluded = [...ALWAYS_EXCLUDE, ...snapshot.exclude];
  const rank = (path: string) => snapshot.include.findIndex((glob) => matchesAny(path, [glob]));
  return entries
    .filter((entry) => !BINARY.test(entry.path) && !matchesAny(entry.path, excluded) && rank(entry.path) >= 0)
    .sort((a, b) => rank(a.path) - rank(b.path) || a.path.split("/").length - b.path.split("/").length || a.path.localeCompare(b.path))
    .slice(0, snapshot.maxFiles);
}

export async function buildSnapshot(
  source: CapstoneRepoSource,
  ref: RepoRef,
  sha: string,
  entries: RepoTreeEntry[],
  snapshot: RubricPack["snapshot"],
  budgetChars: number
): Promise<RepoSnapshot> {
  const visible = entries.filter((entry) => !matchesAny(entry.path, ALWAYS_EXCLUDE)).map((entry) => entry.path).sort();
  const tree = visible.slice(0, TREE_LIMIT);
  let chars = tree.join("\n").length;
  const files: SnapshotFile[] = [];
  const skippedForBudget: string[] = [];

  for (const entry of selectSnapshotPaths(entries, snapshot)) {
    const remaining = budgetChars - chars;
    if (remaining < 400) {
      skippedForBudget.push(entry.path);
      continue;
    }
    const limit = Math.min(snapshot.maxBytesPerFile, remaining);
    const content = await source.file(ref, sha, entry.path, limit);
    if (content === null) continue;
    const truncated = entry.size > limit || content.length >= limit;
    files.push({ path: entry.path, content, truncated });
    chars += content.length + entry.path.length + 40;
  }

  return { tree, treeOmitted: visible.length - tree.length, files, skippedForBudget, chars };
}
