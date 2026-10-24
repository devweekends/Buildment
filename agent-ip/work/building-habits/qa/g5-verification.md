---
artifact: qa-report
course: building-habits
gate: G5 (two critique rounds done; human review required before publish)
date: 2026-10-24
---

# Verification report: building-habits

## Structure
- 7 modules, 40 chapters, 970 minutes from chapter frontmatter (about 16 hours, `estimatedHours: 16`).
- Graded items: 94 (68 multiple-choice questions and 26 predictions). Open questions: the seven gates and the capstone. Canvases: 19, one in every Learn chapter (agent-ip v0.4, interactive-first), all on the existing renderers as data plus a 14A spec: 6 state machines, 6 sequences, 5 sliders, 2 factor.
- `content:validate:source --course building-habits`: 40 of 40 OK.
- `content:audit --course building-habits`: 0 errors, 0 warnings.
- `node agent-ip/scripts/audit-course.mjs content/import/building-habits`: Needs work 0. Every set-the-scene, Learn and capstone chapter has at least 1,200 prose words and a diagram; every gate at least 700; every Learn chapter an interactive element; every practice check five questions. 51,897 prose words in all.
- No em or en dashes in the chapters, `course.yaml`, the 19 canvas files or the work area. No company, product or AI tool names, no links.

## Research (G1)
`research.md`: 70 sourced claim rows from 60 sources, 18 unverified claims kept out of learner-facing text, a credits table and "phrase it this way" lines. Its outline changes were applied before writing (shape before numbers, "restart at the next cue", "the smallest version", reminders are not cues, the willpower replication story, identity only as "repetitions are evidence", "focused work"). Critic B checked every research claim against the dossier in both rounds; round 2 found no claim from the unverified table and one new unsourced sentence, since removed.

## Critique (G5)
Two blind critics on a smaller review model, from the same model family as the drafters (risk R1).

| Round | Critic A (pedagogy, assessment) | Critic B (slop, continuity, accuracy, care) |
|---|---|---|
| 1 | 0 S1, 6 S2, 18 S3; average 3.6; revise | 0 S1, 4 S2, 32 S3; average 3.86; revise |
| 2 | 19 of 24 fixed, 4 partly, 1 not; new 0 S1, 0 S2, 4 S3; average 4.1 | 29 of 36 fixed, 5 partly, 2 not; new 0 S1, 0 S2, 4 S3; average 4.29, every scored dimension at 4 or above |

After round 2 one targeted editorial pass fixed the residual S3 items: option lengths rebalanced, the last three predicts moved before the text that answers them, two name collisions renamed, canvas copy split into four short blocks, explanation openers varied, a restart and card-reading case added to the mixed review, catalog wording aligned, and the longest chapters given more time (2.4, 5.3 and 7.2 at 30 minutes, the capstone at 100). agent-ip allows two critique rounds before a human decision (`agents/orchestrator.md`), so no third critic round was run: **the round 2 averages (4.1 and 4.29) are below the 4.3 pass line, and a human reviewer must decide whether the residual fixes meet it.** Critic A's one dimension at 3 in round 2 (cognitive load) is the reason the reading times were raised. Reports: `critique-a.md`, `critique-b.md`, `critique-a-r2.md`, `critique-b-r2.md`; the revision rules are in `revision-1-brief.md`.

## Option hygiene
Counted by script over all 94 items after the last edit: the correct option is strictly longest in 14 of 68 quiz items (none more than 10 percent longer than the longest wrong option) and strictly shortest in 16; answer positions 14, 20, 21 and 13; in 11 sets where exactly one option has a colon or semicolon, that option is correct in 2. In predicts the correct label is the longer one in 12 of 26, equal in 4, and first in 13.

## Blind answer-key review
`agent-ip/scripts/blind-keys.mjs`, keyless batches, a separate review agent that saw only questions and options.

| Run | Items | Matched |
|---|---|---|
| Draft | 92 | 91 (3.3 predict depended on the canvas's toy rule; reframed) |
| After revision round 1 | 94 | 94 |
| After the residual pass | 94 | 93 (5.1 predict asked what a character told himself; reframed to test the principle) |

Medium-confidence items were checked in their chapters: each is a predict or an item whose deciding fact sits in the chapter just above, or a case where the key follows from the course's stated rule (one habit at a time; restart without change when the cause has ended).

## Canvases
- Frontend canvas tests: 30 files, 373 tests passed, including the registry, label-fit and label-overlap checks for every state machine and sequence at phone and desktop widths, and model tests for the five slider canvases (`habit-strength-curve`, `motivation-wave-habit-size`, `steps-to-start`, `fewer-temptations`, `streak-or-done-count`). Frontend typecheck clean; eslint on `src/canvas` and `tests/unit/canvas` clean.
- Every canvas has a `spec.md` on template 14A with its teaching claim and limits; every slider says it is a simple illustration with a stated toy rule. Each Learn chapter puts a predict before its canvas and a transfer question after it.

## Import and click-through
- Imported into a scratch PostgreSQL 16 database on drive C: 7 modules, 40 chapters, 116 blocks. Re-imported after the last edit into a fresh database (the importer refuses to overwrite a course with enrolled learners).
- Signed in as mentee1@buildment.dev and enrolled from the catalog. All 40 chapter pages returned 200.
- At desktop width in the light theme: 1.4 practice question answered right ("Correct! Well done", +100%, every option explained) and wrong ("Wrong answer", every option explained); after a reload the chapter header and the curriculum both show 1 of 2 checkpoints, so progress is saved. The 1.2 sequence canvas steps forward (step 3 of 7). No console errors.
- At 375px in the dark theme: the 1.4 slider canvas (stats, bars, two sliders) recalculates when a slider moves ("Going from day 21 to day 61 raised strength from 61% to 94%"); the 3.4 state machine renders whole with no label overlap. No sideways scroll (scroll width 375).
- Harness limits, not course problems: clicks under the emulated phone viewport sometimes missed, so stepper clicks were checked at desktop width; the preview ran on 127.0.0.1 because `localhost` holds another app's session cookie.

## Open for humans
- G2B instructor sign-off of `curriculum-roadmap.md` (drafted before sign-off on the sponsor's standing instruction) and its ten open decisions, including whether Arabic answers are accepted (9) and whether mentors review a full 30-day review sent after the course (10).
- A human answer-key check (one model family drafted, critiqued and checked the keys).
- A decision on the round 2 averages against the 4.3 line after the residual fixes.
- A named wellbeing contact from programme staff for the referral sentence in 4.1 and 4.6 (critic B S3-30).
