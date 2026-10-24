---
artifact: canvas-spec
course: data-engineering
chapter: 03.02-ranking-and-deduplication
slug: row-number-dedupe
version: 1
owner: chapter-writer
renderer: table-steps (HTML tables, shared stepper controls)
---

# Canvas spec: ROW_NUMBER keeps one line per report

## Teaching claim
`ROW_NUMBER() OVER (PARTITION BY report_id ORDER BY uploaded_at DESC)` numbers each send of a report from the newest; keeping `rn = 1` keeps exactly one line per report. `RANK` gives tied rows the same number, so keeping rank 1 can keep more than one row; `ROW_NUMBER` never repeats, so it keeps one.

## Why a canvas
Deduplication is a statement about which rows stay. Stepping from seven lines, to groups, to numbers, to the filter lets the learner predict which line wins before the filter runs, and the tie example lets them predict how many rows `rank = 1` keeps.

## Model
- Inputs: the shared stepper controls only.
- Outputs: which tables are shown, which rows are marked kept or dropped.
- Rule: within each report_id, number lines by uploaded_at from newest to oldest; keep number 1. Lines after = number of different report_id values (7 lines, 4 reports). For ties, RANK repeats a number and then skips; DENSE_RANK repeats and does not skip; ROW_NUMBER does neither.
- Data: real seed-7 rows. r-000019 (sent once), r-000020, r-000147, r-000174 (sent twice each). Flour (I01) prices of the eight markets on 8 March: 7.5, 7.5, 8.0, 8.0, 8.0, 8.5, 8.5, 9.0, matching drill d07.
- Assumptions: one clean sort column. In this data no report has two sends with the same uploaded_at.
- Limitations: eight rows and seven lines; real ties are less tidy.

## Rendering
- Primary: the shared `table-steps` renderer.
- At most two tables per step, at most 5 columns and 10 rows each.
- Static fallback: chapter 3.2 tells the same example in prose with the SQL and the result.

## Controls
Back, Next, Play and the step chips from the shared stepper; arrow keys when focused.

## Visualisation
Marked rows carry a text marker and a pale tone; dropped lines are struck through and labelled; warn tone for the tie that keeps two rows; good tone for the kept lines.

## Copy
- What this shows: numbering sends inside a group and keeping number 1 leaves one line per report; with ties, the choice of ranking function decides how many rows stay.
- Try this: predict the `rank = 1` row count before step 7; imagine three sends; find the step where lines disappear.
- What changed: each step note says which lines were numbered, kept or dropped.
- Limits of the model: as in `limits`.

## Accessibility
HTML table semantics; marked rows have a text marker, never colour alone; the summary is read to screen readers.

## Acceptance criteria
- [x] Numbers checked against the seed-7 data: 7 lines to 4 reports; 2,712 lines to 2,633 reports on 28 days; ranks 1, 1, 3, 3, 3, 6, 6, 8 and dense ranks 1, 1, 2, 2, 2, 3, 3, 4.
- [x] Predict before (3.2 predict), transfer after (3.2 quiz, 3.5 drills d06 and d07).
- [x] Fits 375px: at most 5 columns, 8 rows, step titles of 60 characters or fewer.

## Build plan
`packages/learning-ui/src/canvas/row-number-dedupe/data.ts`; the orchestrator registers it in `registry.ts` and `slugs.ts`.
