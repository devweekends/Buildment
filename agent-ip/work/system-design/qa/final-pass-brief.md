# System design course: final fix pass

Worktree `D:\Projects - Community\buildment-sysdesign`, branch content/system-design. Do not commit, stash or switch branches. Never kill processes by name. Web app at http://localhost:3530 (restarted with a clean cache; first page loads are slow while it compiles).

Fix these, in order, and reply briefly with what you changed and the check results:

1. **Duplicate React keys.** The browser console on `/workspace/canvases` shows duplicate key errors for "west" and "eu", plus one hydration-mismatch warning. Find the canvases (search `frontend/src/canvas` for keys built from region names, and render the gallery in Playwright via `agent-ip/scripts/canvas-text-qa.mjs` style login to read the console). Fix them so the console is clean of key and hydration errors.
2. **Link fix.** `content/import/system-design/26-web-crawler/26.04-*.md` links Bloom filters only to 7.3; add a link to 23.4 (`content/import/system-design/23-search-typeahead-and-probabilistic-data-structures/23.04-*.md`).
3. **Challenge layout consistency.** The house rule for challenge repos is `challenges/challenge-N-name/` with `part-N` subfolders, and each part has its own README that teaches the 101, plus a script, results, a chart where it fits, and a test. Read the Build chapters (1.5, 2.8, 3.8, 4.8, 5.9, 6.9, 7.8, 8.9, 9.8, 10.9, 11.9, 12.11, 13.9, 14.7, 15.9, 16.8, 17.8, 18.8, and the capstone 29.3 to 29.5). Make every one describe the same layout. Where a chapter uses one README per challenge with a 101 section per part, change the instructions so each part folder gets its own short README (move the existing 101 text there; do not rewrite the teaching). Keep code blocks and outputs unchanged except paths. Also check that challenge numbers run 0 to 18 without gaps or duplicates and that each chapter's "you added X in challenge N" references are right.
4. **Checks.** From `frontend/`: `node C:/Users/Zeeshan/AppData/Local/pnpm/.tools/pnpm/12.11.2/node_modules/pnpm/bin/pnpm.mjs exec vitest run tests/unit/canvas` (raise a test's timeout only if it flakes under load), `... exec tsc --noEmit -p .`, `... exec eslint src/canvas`. From the worktree root: `node agent-ip/scripts/audit-course.mjs content/import/system-design`. All clean, or list what is left.

No em dashes anywhere.
