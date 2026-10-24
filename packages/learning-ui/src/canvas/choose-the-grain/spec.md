---
artifact: canvas-spec
course: data-engineering
chapter: 04.03-grain-facts-and-dimensions
slug: choose-the-grain
version: 1
owner: chapter-writer
renderer: table-steps (HTML tables, shared stepper controls)
---

# Canvas spec: The same data at three grains

## Teaching claim
The same Mizan data can be stored at different grains: one report, one market and day, one market and week. Each grain answers some questions and loses others, and once the rows are added up, the detail cannot be rebuilt. So the fact table keeps the finest grain you will need, and coarser tables are built from it.

## Why a canvas
Learners say "grain" easily and misjudge what adding up costs. Stepping through two add-ups and asking, at each step, which question has just become impossible makes the loss visible.

## Model
- Inputs: the shared stepper controls only.
- Data (seed-7, 28 days): nine accepted reports of market M02 for flour (I01), rice (I02) and cooking oil (I05) on 3, 4 and 5 March. Prices: 3 March 7.5, 7.0, 17.5; 4 March 8.0, 7.0, 18.0; 5 March 8.0, 7.0, 18.0.
- Rule: day cost = sum of the three prices (32.0, 33.0, 33.0); week average = (32.0 + 33.0 + 33.0) / 3 = 32.67, ISO week 10, 3 days.
- Questions table: flour price on 4 March (report only); cost on 4 March (report, day); cheapest day, 3 March at 32.0 (report, day); week 10 average (all three).
- Assumptions: only three of the twelve items are shown.
- Limitations: coarser tables are still useful; many teams keep both.

## Rendering
Shared `table-steps` renderer. At most two tables per step, at most 5 columns and 9 rows.

## Copy
- What this shows: three grains of the same data and what each one can still answer.
- Try this: predict whether the daily table gives the flour price; name two sets of daily costs with the same average; find the first step where a question becomes impossible.
- What changed: each step note says which rows were added up and which question was lost.
- Limits of the model: as in `limits`.

## Accessibility
HTML table semantics; marked rows have a text marker; the summary is read to screen readers.

## Acceptance criteria
- [x] Numbers checked against the seed-7 data: nine report ids and prices, three daily sums, one weekly average.
- [x] Predict before (4.3 predict), transfer after (4.3 quiz, 4.6 quiz).
- [x] Fits 375px: at most 4 columns, 9 rows, step titles of 60 characters or fewer.

## Build plan
`packages/learning-ui/src/canvas/choose-the-grain/data.ts`; the orchestrator registers it in `registry.ts` and `slugs.ts`.
