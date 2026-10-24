---
artifact: canvas-spec
course: data-engineering
chapter: 02.02-joins-and-row-counts
slug: join-fan-out
version: 1
owner: interaction-designer
renderer: table-steps (HTML tables, shared stepper controls)
---

# Canvas spec: Why did market M02's total double?

## Teaching claim
A join returns one row for every pair of matching rows, so when the other table has two rows for one key, every fact row for that key appears twice and a sum after the join doubles. Reduce the other side to one row per key (or add up before joining) to fix it.

## Why a canvas
The bug is invisible in any single row. Stepping from three reports, to the duplicate key, to one report matching twice, to six rows and a doubled sum lets the learner predict the row count before seeing it, which a static diagram or one paragraph cannot make them do.

## Model
- Inputs: the shared stepper controls only.
- Outputs: which tables are shown, which rows are marked, the growing joined table and the totals table.
- Rule: rows after a join = sum over keys of (left rows with the key x right rows with the key). Here 3 reports x 2 contacts = 6 rows; 4.5 + 8.0 + 12.0 = 24.5, doubled to 49.0.
- Assumptions: an inner join on `market_code`; one market and one day shown.
- Limitations: real fan-out hides in thousands of rows; aggregating before the join is an equally valid fix.

## Rendering
- Primary: the shared `table-steps` renderer (new in this course; HTML tables).
- At most two tables per step, at most 5 columns and 10 rows each, so it fits 375px stacked.
- Static fallback: chapter 2.2 tells the same example in prose and shows the SQL.

## Controls
Back, Next, Play and the step chips from the shared stepper; arrow keys when focused.

## Visualisation
Marked rows carry a text marker and a pale tone; warning tone for the duplicate key and the fan-out, bad tone with an outcome badge for the doubled sum, good tone for the fix.

## Copy
- What this shows: a join to a table with a repeated key multiplies the rows that a sum then adds.
- Try this: predict the joined row count before step 3; work out three contacts; find the step where the problem starts.
- What changed: each step note says which rows matched and why the count changed.
- Limits of the model: as in `limits`.

## Edge cases
The totals table grows over steps through `rows`; step 4 shows a single table.

## Accessibility
HTML table semantics with header cells; marked rows have a text marker ("this step", "out"), never colour alone; the summary is read to screen readers; the step note is a live region.

## Acceptance criteria
- [x] The claim is testable: the 2.2 quiz asks for a joined row count and a corrected total on a new case.
- [x] The model is tested: `tableStepsProblems` in the registry test checks every view, row index and size limit.
- [x] Simple and legible at 375px.
- [x] Predict before (2.2 predict), transfer after (2.2 quiz, 2.5 drill d03).
- [x] Reader fallback in prose.

## Build plan
`packages/learning-ui/src/canvas/join-fan-out/data.ts`, registered in `registry.ts` and `server/src/shared/canvas/slugs.ts`; covered by `frontend/tests/unit/canvas/registry.test.ts`.
