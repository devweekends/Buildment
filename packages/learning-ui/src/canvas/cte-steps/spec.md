---
artifact: canvas-spec
course: data-engineering
chapter: 02.04-ctes-and-readable-queries
slug: cte-steps
version: 1
owner: interaction-designer
renderer: table-steps (HTML tables, shared stepper controls)
---

# Canvas spec: A long query, read as named steps

## Teaching claim
A long query becomes readable when each step has a name: drop the bad rows, keep the basket items, add up per market and day. Each named step has a small result you can check, and the row count changes at every step (10, 8, 6, 3). When a total looks wrong, you find the first step whose count you cannot explain.

## Why a canvas
A reader cannot see the row count inside a nested query. Stepping through the same query as named steps, with the rows that leave each step struck through, lets the learner predict the next count and see where a trustworthy-looking total (25.5 for M04) is not a full basket.

## Model
- Inputs: the shared stepper controls only.
- Outputs: which tables are shown, which rows are dropped or marked, and the growing result table.
- Rule: `good` keeps rows with price above 0 and an item code (10 to 8: r6 has price 0, r7 has no item code). `basket` keeps items I01, I02 and I05 (8 to 6: the eggs rows r3 and r10 leave). `day_total` groups by market and day (6 to 3): M02 4 March 8.0 + 7.0 + 18.0 = 33.0 with 3 items; M04 4 March 7.5 + 18.0 = 25.5 with 2 items; M04 5 March 7.5 with 1 item.
- Assumptions: a toy basket of three items; one price per item per day in the toy data; two markets.
- Limitations: the real basket has 12 items and thousands of rows; the toy data has no repeated prices, which the drill in 2.5 does; a named step does not make a query faster.

## Rendering
- Primary: the shared `table-steps` renderer.
- At most two tables per step, at most 5 columns and 10 rows each; every step title is 60 characters or fewer.
- Static fallback: chapter 2.4 shows the same query and the same row counts in prose and in a result table.

## Controls
Back, Next, Play and the step chips from the shared stepper; arrow keys when focused.

## Visualisation
Dropped rows are struck through and labelled; the highlight shows the rows a step is about; warn tone marks the totals that are not full baskets; good tone marks the explained counts.

## Copy
- What this shows: a query read as named steps, each with a result and a row count.
- Try this: predict the rows that reach the last step; ask what a good rice price would change; find the step where a total stops being trustworthy.
- What changed: each step note says which rows left and why the count changed.
- Limits of the model: as in `limits`.

## Edge cases
The `day_total` table grows over steps 4 and 5 through `rows`. The `counts` table is a summary of the three steps.

## Accessibility
HTML table semantics with header cells; dropped and marked rows carry a text marker, never colour alone; the summary is read to screen readers and the step note is a live region.

## Acceptance criteria
- [x] The claim is testable: the 2.4 quiz asks for the row count after a filter on a new case, and drill d05 in 2.5 uses the same shape.
- [x] Every number checked: 10 - 2 = 8; 8 - 2 = 6; 3 groups; 8.0 + 7.0 + 18.0 = 33.0; 7.5 + 18.0 = 25.5.
- [x] The model is tested: `tableStepsProblems` in the registry test checks every view, row index and size limit.
- [x] Simple and legible at 375px.
- [x] Predict before (2.4 predict), transfer after (2.4 quiz, 2.5 drill d05).
- [x] Reader fallback in prose.

## Build plan
`packages/learning-ui/src/canvas/cte-steps/data.ts`, registered by the orchestrator in `registry.ts` and `server/src/shared/canvas/slugs.ts`; covered by `registry.test.ts`.
