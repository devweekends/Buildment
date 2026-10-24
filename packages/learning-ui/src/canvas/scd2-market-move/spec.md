---
artifact: canvas-spec
course: data-engineering
chapter: 04.04-slowly-changing-dimensions
slug: scd2-market-move
version: 1
owner: chapter-writer
renderer: table-steps (HTML tables, shared stepper controls)
---

# Canvas spec: M03 moves to Hill: type 1 and type 2

## Teaching claim
When a market moves from Harbour to Hill on 12 March, type 1 overwrites the area and rewrites history (old reports now say Hill). Type 2 adds a new row with `valid_from` and `valid_to`, and each report joins to the version valid on its date. Joining on the market code alone, without the dates, matches both versions and multiplies the rows.

## Why a canvas
The loss under type 1 is invisible until someone asks a question about the past. Counting the same four reports by area under both types, side by side, shows the difference in one number.

## Model
- Inputs: the shared stepper controls only.
- Data (seed-7, 28 days): four accepted flour (I01) reports of M03, price 8.5 each: r-000895 (10 March), r-000958 (11 March), r-001073 (12 March), r-001138 (13 March). Registry history: Harbour from 2026-03-01 to 2026-03-12 (excluded), Hill from 2026-03-12. Keys 3 and 4 as in the chapter 4.5 prototype.
- Rule: type 1 counts 4 reports for Hill and 0 for Harbour. Type 2 gives each report the row where `valid_from <= day < valid_to` (or `valid_to` is empty): 2 for Harbour, 2 for Hill. A join on the code alone gives 4 x 2 = 8 rows.
- Assumptions: dates in whole days.
- Limitations: one market, four reports; the first row of a market needs a start date from somewhere.

## Rendering
Shared `table-steps` renderer. At most two tables per step, at most 5 columns and 8 rows.

## Copy
- What this shows: the same market move stored with type 1 and type 2, and what each does to old reports.
- Try this: predict the Harbour count under type 1; move the date to 13 March in your head; find where history is lost and where it is kept.
- What changed: each step note says which rows were overwritten, added or matched.
- Limits of the model: as in `limits`.

## Accessibility
HTML table semantics; marked rows have a text marker; the summary is read to screen readers.

## Acceptance criteria
- [x] Numbers checked against the seed-7 data and the prototype: M03 has two versions; facts follow Harbour to 11 March and Hill from 12 March.
- [x] Predict before (4.4 predict), transfer after (4.4 quiz, 4.5 tests, 4.6 quiz).
- [x] Fits 375px: at most 5 columns, 8 rows, step titles of 60 characters or fewer.

## Build plan
`packages/learning-ui/src/canvas/scd2-market-move/data.ts`; the orchestrator registers it in `registry.ts` and `slugs.ts`.
