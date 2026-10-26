---
artifact: technical-validation
course: build-with-ai (v2 amendment)
date: 2026-10-26
owner: orchestrator (scripts and tests)
status: done; human review and G2B pending
---

# G5 verification, v2 amendment

All checks ran on the final package in `courses/build-with-ai/` (85 chapters, 11 modules), from a copy on C: because D: is nearly full.

## Commands and results

| Check | Result |
|---|---|
| `content:validate:source --course build-with-ai` | 85 of 85 OK |
| `content:audit --course build-with-ai` (structure) | 0 errors, 0 warnings |
| `node agent-ip/scripts/audit-course.mjs courses/build-with-ai` | Needs work 0 (85 chapters, 104,689 prose words) |
| Canvas tests `frontend/tests/unit/canvas` | 85 files, 2,955 tests pass (registry label fit included) |
| Server course script tests `server/tests/scripts` | 8 files, 55 tests pass |
| Frontend typecheck | clean |
| `server/scripts/sync-shared.mjs --check` | in sync |
| Em and en dashes in chapters, canvases, specs and work files | none |
| Scratch import (`content:import` into a fresh PostgreSQL 16 on port 5470, data on C:) | 11 modules, 85 chapters, 237 blocks |

## Assessment checks

| Check | Result |
|---|---|
| Option length (all 146 MCQs) | key strictly longest 25%, strictly shortest 21%; no key 10% or more longer than the longest wrong option; no quiz chapter with the key longest or shortest more than once |
| Key positions (MCQs) | 35 / 37 / 39 / 35 (largest share 27%) |
| Predicts (49) | correct first in 25; correct label longer in 14 |
| Form cues (`cue-check.mjs`) | reason clause in 38% of keys and 40% of wrong options; absolute words 7% and 11%; the key is never the odd one out on reason clauses, 5 of 29 on absolute words, 10 of 30 on "check" words (at or under chance) |
| Punctuation cue (`punct-check.mjs`) | the lone punctuated option is the key in 3 of 12 items |
| Blind answer keys, second model family | all 195 graded items: 194 of 195 matched; the one mismatch (2.3 predict, v1) needs the canvas it precedes, as in v1. After round 3, the 28 changed items were re-answered blind: 27 of 28 matched (the same v1 predict) |

## Canvases

- Four new shared primitives (context picker, flip deck, commit story, word sampler) with model tests; 45 v2 canvases registered, plus one more scene added in round 1 (46 v2 slugs).
- `agent-ip/scripts/canvas-text-qa.mjs` at phone width, light and dark: every v2 canvas clean after fixing five (short labels in two scenes, a relayout of `short-lesson-loop`, tick labels in `first-or-researched-answer-dates`). Four v1 canvases on the shared sequence and state machine renderers (`commits-to-article`, `disclose-ai-help`, `reuse-open-source-safely`, `week-plan-check-resources`) report label collisions that predate v2; not changed here.

## Click-through

- Scripted click-through as `mentee1@buildment.dev`: all 85 chapters at 375px and 1280px, light and dark (340 page loads). No canvas fallback, no missing title. Six transient horizontal-overflow readings at 375px did not reproduce on a settled page (re-probed twice per theme). One hydration warning on 7.2 (v1 slider chapter) in dark desktop, dev server only, not reproduced.
- Grading as `mentee2@buildment.dev` at 375px on quiz 1.9: question 1 answered right, question 2 wrong; the reader showed "Wrong answer", one explanation per option, a score of 2 of 5 and 3 to retry; after a reload the score and the retry state were saved.
- Platform notes (not course defects): on quiz pages at 375px the mobile curriculum panel was open on load and covered the quiz until closed; outline buttons under beat pictures (Replay, Ask once) have low contrast in dark mode. Both belong to shared reader components.
- Mentor keys in `modelAnswer` are stored as `sampleAnswer`, which the block sanitizer strips from the client (`server/src/shared/blocks/open-question/schema.ts`).

## Not verified here

- A person's answer-key check (the blind check used a second model family).
- The AI interviewer in 11.7 with a real OpenRouter key (the written defence path was checked).
- Desktop app: new canvas slugs need an updated desktop build before lessons that use them are published there (`agent-ip/10-interactive-canvases.md`, step 5).
