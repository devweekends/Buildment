---
artifact: proposal
status: open, for delivery lead and reviewer decision
date: 2026-10-26
exposed_by: course product-sense (course 18, devweekends/Buildment#72)
---

# Proposal: check answer cues beyond length and position

## Problem

`04-interactive-playbook.md` → Option-length hygiene guards against two cues: the correct option being the longest, and the correct option sitting in one position. `content:audit` checks both. Course 18 passed both checks in its first draft, yet critic A's G5 round 1 review found two other cues that let a learner who had not read the course score well:

1. **Reason clauses on wrong options only.** Across 82 MCQs, "because" or "since" appeared in 80 of 246 wrong options (33%) and in 3 of 82 keys (4%). Absolute words (never, always, any, only) followed the same pattern: 76 of 246 wrong options against 10 of 82 keys. Writers had made the keys short and plain to avoid the length cue, and loaded the wrong options with reasons and absolutes. Critic A built a no-knowledge strategy (reject options with a reason clause, an absolute word or the most length) that expected about 54% on the MCQs, against 25% for blind guessing.
2. **Predict stance.** After the first fix the correct predict label was never the longer one (25 of 25). After the second fix, nine of the ten yes/no predicts were keyed "No" or "Not yet", because each predict was written to show that the tempting answer is wrong. A learner who had noticed that habit picked "No" and scored nine of ten.

Neither cue is visible to the length and position checks, and both appeared while writers were following the length rule carefully.

## Evidence

| Measure (course 18) | First draft | After revision 1 | After round 3 fixes |
|---|---|---|---|
| "because" or "since": keys / wrong options | 4% / 33% | 16% / 17% | 16% / 17% |
| Absolute words: keys / wrong options | 12% / 31% | 4% / 5% | 4% / 5% |
| MCQ key strict longest | 2% | 24% | 24% |
| Predict: correct label longer | 0% | 52% | 48% |
| Yes/no predicts keyed No | not measured | 9 of 10 | 0 of 2 (the rest are two concrete outcomes) |
| Best no-knowledge strategy on MCQs | about 54% | about 20 to 22% | not re-run |

Sources: `agent-ip/work/product-sense/qa/critique-a.md`, `critique-a-r2.md`, `revision-1-brief.md` and `g5-verification.md` on the course branch. The blind answer-key check matched 107 of 107 in rounds 1 and 2, so the keys were right; the cues were in the form of the options, not in the answers.

## Proposed change (not applied)

1. **Option-length hygiene becomes option-form hygiene** in `04-interactive-playbook.md`, adding two rules beside the length and position rules:
   - In each MCQ every option has the same grammatical shape: either no option gives a reason, or every option does, with the flaw inside the reason. Absolute words appear in keys about as often as in wrong options.
   - Across a course, yes/no predicts are keyed Yes about as often as No, and a predict whose key is "the tempting answer is wrong" is balanced by predicts where the intuitive answer is right or where two concrete outcomes are compared.
2. **An audit check** in `content:audit` (platform code, separate PR): warn once per course when reason clauses or absolute words appear in wrong options at more than twice the rate in keys (with at least 20 MCQs), and when more than 70% of yes/no predicts share one key.
3. **Writer packs and critics:** add both checks to `agents/chapter-writer.md` (before handing back) and `agents/critic.md` (assessment lens), so a critic measures them instead of discovering them.

## Follow-ups logged, not proposed as rules

- **Shared sorter text size.** `primitives/sorter.tsx` draws card reasons at 12.5 units and bucket glosses at 11.5 units on a 420-unit viewBox, about 10px at 375px. The reasons are teaching content. Course 18 did not change the shared primitive; a separate canvas PR could raise them or move the reasons below the SVG as HTML.
- **Scratch copies for checks on Windows.** Four things cost time in course 18's build and are worth a line in `06-quality-gates.md` → Before a pull request or the technical validator's notes:
  - `pnpm --dir server sync-shared` on Windows rewrites the line endings of every generated file. Commit only files whose content changed (`git diff --ignore-cr-at-eol`).
  - A test copy synced with `git diff HEAD` misses files that were already committed. Sync against the merge base with `main` instead.
  - Installing the frontend with `--ignore-scripts` skips `scripts/copy-mermaid.mjs`, so every Mermaid diagram shows "Failed to load Mermaid script" until it is run by hand.
  - The frontend reads its installed snapshot of `packages/learning-ui`. A canvas changed in the package is not seen by tests or the dev server until it is copied into that snapshot or the package is reinstalled (also noted in course 14).

## Decision needed

Accept, change or reject points 1 to 3. If accepted, bump the IP version and update the affected files in one change, and open the audit check as its own platform PR.
