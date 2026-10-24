---
artifact: qa-report
course: build-with-ai
gate: G5 (two critique rounds and a targeted round 3; human review required before publish)
date: 2026-10-24
---

# Verification report: build-with-ai (course 13)

## Structure
- 6 modules, 40 chapters, 1,080 minutes from chapter frontmatter (about 18 hours) plus about 4.5 hours of lab days 2 to 10 for the capstone: `estimatedHours: 22`. Category `tech`, difficulty `Beginner`.
- 22 Learn chapters, each with one registered canvas (agent-ip v0.4, interactive-first): 21 on the shared sequence, state-machine and factor renderers as data plus a spec, and one slider model (`six-month-hours-split`) with its own tests. Every Read, Learn and Build chapter has a Mermaid diagram; quiz chapters hold five MCQs and nothing else.
- Graded items: 93 (68 multiple-choice questions and 25 predicts). Open questions with a Met / Partly / Not yet rubric, a pass rule, a follow-up step and a mentor key in `modelAnswer`: six gates and the capstone. Three optional reflection prompts in set-the-scene chapters.
- `content:validate:source --course build-with-ai`: 40 of 40 OK.
- `content:audit --course build-with-ai`: 0 errors, 0 warnings across 6 module dirs (includes the option-length and the 70% position checks).
- `node agent-ip/scripts/audit-course.mjs courses/build-with-ai`: Needs work 0, 50,387 prose words. Every set-the-scene, Learn and capstone chapter has 1,200 or more paragraph words (the lowest is 1,242); every gate 700 or more (the lowest is 823).
- No em or en dashes in the 40 chapters, the 44 canvas files or this work folder; LF line endings; no links in chapters.

## Research (G1)
`research.md`: 119 sourced claim rows (S118 and S119, Docker Compose v1 and the obsolete `version:` line, added at G5 by the orchestrator after reading Docker's docs on 2026-10-24) and 23 unverified claims kept out of learner text. All 16 recommended outline changes were applied before the roadmap. Two findings changed the course: NotebookLM was renamed Gemini Notebook on 2026-07-16 (confirmed independently by the orchestrator), and no source supports the sponsor's "40 to 60 minute" audio overviews or "six months" for a strong project (taught as the sponsor's planning rule).

## Critique (G5)
Two blind critics on a review model from the same model family as the drafters (risk R1), with no access to the writers' rationale.

| Round | Critic A (pedagogy, assessment) | Critic B (slop, continuity, accuracy) |
|---|---|---|
| 1 | 0 S1, 9 S2, 13 S3; average 3.82; revise | 0 S1, 4 S2, 19 S3; average 4.29; revise |
| 2 | 14 fixed, 9 partly, 0 not fixed; new 0 S1, 0 S2, 3 S3; average 4.14, every dimension at 4 or more; narrow revise | 26 fixed, 4 partly, 0 not fixed; new 0 S1, 0 S2, 3 S3; average 4.43; approve |

Round 3 (targeted, no third critic round, as `agents/orchestrator.md` allows two rounds before a human decision) fixed every new S3 from both critics and most residuals: one lab-log start week across 4.1, 5.2, 5.5 and 6.5; the first slice described as a rough start; five predicts rewritten so a naive guess can be wrong; gates 4 and 5 lighter on purpose (fading); module 3's second worked topic moved from networking to an everyday library rule; an ambiguous page in 3.7 item 3; a gap in the gate 2 rubric; six long sentences; the "Where it goes wrong" frame varied in 9 of 17 chapters. Brief: `context-packs/revision-r3.md`.

**Critic A's round 2 average (4.14) is below the 4.3 pass line; critic B's (4.43) is above it. A human reviewer must decide whether the round 3 fixes meet the bar.** Reports: `critique-a.md`, `critique-b.md`, `critique-a-r2.md`, `critique-b-r2.md`.

Left for human decision, not fixed:
- Eighteen of the 22 canvases are step-throughs the learner cannot change (the shared renderers' design). Critic A suggests a choice step in four of them; that is a renderer change for the platform owner.
- Chapter and gate times were raised at G5 but have not been timed with fellows on a phone (roadmap open decision 8).
- Dimension 19 (instructor alignment) cannot be scored until two instructors sign `roadmap-confirmation.md` (G2B pending).

## Blind answer-key review
`agent-ip/scripts/blind-keys.mjs`, keyless batches, a separate review agent each run that saw only questions and options.

| Run | Items | Matched | Mismatches |
|---|---|---|---|
| Draft | 94 | 94 | none |
| After round 1 | 93 | 91 | two predicts (1.3, 2.3) |
| After round 3 (final) | 93 | 90 | three predicts (1.3, 1.5, 2.3) |

Every multiple-choice question matched in all three runs. Every mismatch is a predict placed before a canvas: a guess about what the canvas will show, whose facts sit in the chapter, not in the stem the blind reviewer saw. Each was checked in its chapter: the key is the outcome the canvas and the text then show. No person has re-answered the keys; the PR asks for a human key check.

## Key bias (length and position)
Script over all graded items in the final package:
- MCQ (68): correct position 0, 1, 2, 3 = 24%, 26%, 28%, 22%; the longest run of one position in course order is 2. The correct option is the longest option in 34%, the shortest in 32% and in the middle in 34%; it is never 10% or more longer than the longest wrong option.
- Predict (25): correct option first in 44% and second in 56%; longer label in 44%, shorter in 44%, equal length in 12%.
- Critic A's content-blind cue test ("drop options with a reason clause, then the longest") scored 48% in round 1 and 24% in round 2 (chance is 25%).

## Canvases
`qa/canvas-qa.md`. Frontend canvas tests: 26 files, 358 tests passed (registry phone-fit and overlap checks for every sequence and state machine, factor scales, slider corners, and the 10 `six-month-hours-split` model tests). Frontend typecheck clean; eslint on `src/canvas` and `tests/unit/canvas` clean.

## Import and click-through
- Imported into a scratch PostgreSQL 16 database: 6 modules, 40 chapters, 115 blocks. The final package was imported into a fresh database, because the importer refuses a course that already has learner work (`This course has a release or active learner work`), which the round 1 click-through had created.
- Signed in as mentee1@buildment.dev with the dev-login link and enrolled from the catalog (the page shows "Beginner", "~22 hours", 6 modules, 40 lessons).
- All 40 chapter pages returned 200 for the enrolled learner on the final import.
- Desktop width, light theme, chapter 1.2 (inline knowledge checks): one answer right ("Correct! Well done", +100%, every option explained) and one wrong ("Wrong answer. Select the correct option.", every option explained); after a reload the chapter and the curriculum both show 1 of 2 checkpoints.
- Desktop width, quiz chapter 5.6 (quiz mode, final import): the proctored-quiz notice, five questions, four right and one wrong on purpose, then submit: "Multiple-choice score 4/5, 1 to retry", with the wrong item explained option by option. After a reload: 4 of 5 checkpoints in the top bar and the curriculum.
- 375px, dark theme: chapter 5.2 with the `six-month-hours-split` slider (Months moved to 1 with the keyboard: 32 hours, 2 of 12 areas ready, the "What changed" sentence) and chapter 4.4 with the `url-shortener-stop-a-part` sequence (phone layout, Step 1 of 8). No sideways scroll (page width 375).
- 375px, light theme: chapter 3.4 with the rewritten `ai-quiz-partner` sequence (Step 1 of 8, controls and step chips) and the phone curriculum drawer. No sideways scroll.
- Found and fixed during the click-through: the slider said "1 months"; it now says "1 month" (test updated).
- Harness limits, not course problems: clicks by element reference sometimes landed off target, so some answers were clicked by position; the browser pane was often hidden, so pages were read with scripts as well as screenshots.

## Found on the way (for the IP and platform owners)
- `audit-course.mjs` checks only that the correct option is not too long; a key that is never the longest is not caught. A key-bias script (length rank and position) is in this run's scratch work; the course passes it. Worth adding to `content:audit` as a proposal.
- The importer's refusal to re-import a course with learner work means a local click-through needs a fresh database for each re-import.
- The dev server allows at most five preview servers per folder; with other sessions running, the API ran as a plain background process and only the web app used a preview slot.
