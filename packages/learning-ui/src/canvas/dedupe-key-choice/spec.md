---
artifact: canvas-spec
course: data-engineering
chapter: 08.03-duplicates-and-keys
slug: dedupe-key-choice
version: 1
owner: interaction-designer
renderer: table-steps (HTML tables, shared stepper controls)
---

# Canvas spec: Which key removes the resend and keeps the repeat?

## Teaching claim
Deduplicating on the whole row misses a resend whose sent time differs. Deduplicating on market, item and day deletes real repeats. Deduplicating on report_id, the id the source gives to each real event, removes only true duplicates.

## Why a canvas
The same five lines give three different answers. Stepping through each key, with the removed lines struck through and the running totals beside them, lets the learner predict the result and see the lost report.

## Model
- Inputs: the shared stepper controls only.
- Rule: keep the newest line (by sent time) for each value of the key. Lines: r-000501 flour 8.0 at 09:10 and 11:40; r-000502 rice 7.0 at 09:10; r-000503 oil 18.0 at 09:10; r-000504 oil 19.0 at 12:30.
- Results: whole row keeps 5 lines, sum 8 + 8 + 7 + 18 + 19 = 60. Market, item and day keeps 3 lines (flour 8.0, rice 7.0, oil 19.0), sum 34. report_id keeps 4 lines, sum 8 + 7 + 18 + 19 = 52, the right answer.
- Assumptions: one market and one day; the lines are an example, not seed-7 rows.
- Limitations: real resends can differ in more than the sent time; keeping the newest line is a chosen rule.

## Rendering
- The shared `table-steps` renderer. Two tables: the five lines (4 columns) and a totals table (4 columns, 3 rows) that grows by `rows`. Dropped lines use `dropped`.
- Step titles of 60 characters or fewer. Tone is paired with a text marker and an outcome badge.
- Static fallback: chapter 8.3 gives the same counts for the real data (2,699 good lines, 2,620 reports, 2,589 slots) in prose.

## Copy
- What this shows: three keys, three results, one right answer.
- Try this: predict the whole-row count; find the line key 2 drops by mistake; think about a resend with a new id.
- What changed: each step note says which lines stay, which go, and what the sum shows.
- Limits: as in `limits`.

## Accessibility
HTML table semantics; dropped rows have a text label; outcome badges repeat the tone.

## Acceptance criteria
- [x] The claim is testable: the 8.3 quiz asks which key to use on a new case.
- [x] Sums checked twice: 60, 34 and 52.
- [x] `tableStepsProblems` passes (at most 5 columns and 10 rows, step titles of 60 characters or fewer).
- [x] Predict before (8.3 predict), transfer after (8.3 quiz, 8.5 build).

## Build plan
`packages/learning-ui/src/canvas/dedupe-key-choice/data.ts` (export `dedupeKeyChoice`), registered by the orchestrator.
