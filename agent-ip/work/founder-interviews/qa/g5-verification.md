---
artifact: verification
course: founder-interviews
gate: G5
date: 2026-10-25
validator: orchestrator (scripts and tests)
---

# G5 verification: founder-interviews

## Branch state

`content/founder-interviews`, merged with `origin/main` after PR #62 and PR #68 (the `AI_INTERVIEW` block and its update) were merged. The course uses `context: resume-and-project` in the capstone's first drill and the feedback card's "Things to watch" flags.

## Checks (all run on the final package)

| Check | Command | Result |
|---|---|---|
| Source validation | `server/`: `node node_modules/tsx/dist/cli.mjs scripts/validate-course-source.ts --course founder-interviews` | 44 chapters, 44 OK, 0 failed |
| Structure audit (`content:audit`) | `server/`: `node node_modules/tsx/dist/cli.mjs scripts/audit-course-structure.ts --course founder-interviews` | 0 errors, 0 warnings |
| agent-ip course audit | `node agent-ip/scripts/audit-course.mjs courses/founder-interviews` | 44 chapters, about 52,500 prose words, Needs work 0 |
| Frontend tests (all canvases, registry, label fit, slider models) | `frontend/`: `node node_modules/vitest/vitest.mjs run tests/unit/canvas/` | 86 files, 2,947 tests passed |
| Dashes | scan of the course, its 22 canvas folders and the work area | 0 files with U+2013 or U+2014 |
| Import | `server/`: `node node_modules/tsx/dist/cli.mjs scripts/import-course.ts --course founder-interviews` into a throwaway PostgreSQL 16 | 7 modules, 44 chapters, 134 blocks |

## Answer keys

- Blind key checks by a second model family on keyless batches (`blind-keys.mjs`): round 1 93 of 95, round 2 91 of 95, round 3 (all 104 items after the module 5 extension) 100 of 104.
- Round 3 mismatches: 3.3 predict (stem rewritten so the key follows from it), 4.4 Q2 (stem now says the keep and change lines were set before she looked; the key applies the course's target plus swing rule), 4.3 predict (needs the scores in the paragraph just above it: 38 against 36), 6.5 Q3 (the key follows 4.2: state the assumption when the answer would not change the plan). Round 2's 2.3 Q2 mismatch was a reviewer letter slip (its note describes the key).
- No person has re-answered the keys. The PR asks a reviewer for a human key check.

## Position and length balance (final 104 items)

| Items | Correct position | Correct is the strict longest | Correct is the strict shortest | Correct 10 percent or more longer than every other |
|---|---|---|---|---|
| 75 MCQs | A 16, B 20, C 19, D 20 | 20 (27 percent) | 9 | 0 |
| 29 predicts | A 15, B 14 | 16 | 10 | 0 |

Critic A's form-only guesser scored 24 percent on the MCQs in round 2 (chance is 25 percent).

## Click-through (mentee1@buildment.dev, local scratch database)

| Width and theme | Chapter | What was checked | Result |
|---|---|---|---|
| 375px, light | 1.2 One time, not "usually" | Rendering, no horizontal scroll, state machine canvas, two quiz items: one answered right (+100 percent, every option's explanation shown), one wrong ("Wrong answer. Select the correct option." with explanations) | Pass; after a reload the chapter shows 1 of 2 checkpoints, so the right answer was saved and the wrong one was not counted |
| 375px, dark | 5.6 Check your work area by area | Slider canvas moved by keyboard (End key), no horizontal scroll, no console errors | Pass; the 13-row, three-column checklist table overflowed by 28px inside its scroll box, so it was turned into a list (re-validated; not re-imported) |
| 375px, dark | 5.9 Checklist and learning log | AI drill card with no key saved ("Add your own OpenRouter key to practise", link to settings), written task and answer box below it | Pass |
| Desktop, light | 7.4 Capstone | Two drills ("Your stories", "Thinking aloud") with key cards, the capstone answer box, sidebar and outline | Pass |
| Desktop, dark | 2.4 How much was yours | Slider canvas, contrast, outline | Pass |

No console errors on any page visited.

## Not verified

- A live AI interview with a real key: the scratch environment has no learner key, so the drill was checked only up to its no-key card. PR #62 and #68 carry the platform tests for the interview itself.
- A human answer-key check and a second instructor's sign-off.
