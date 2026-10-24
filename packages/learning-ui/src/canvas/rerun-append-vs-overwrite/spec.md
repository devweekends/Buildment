---
artifact: canvas-spec
course: data-engineering
chapter: 06.03-idempotent-jobs
slug: rerun-append-vs-overwrite
version: 1
owner: interaction-designer
renderer: slider (renderers/slider/)
---

# Canvas spec: Run the job again: append, replace or merge

## Teaching claim
A job that appends doubles its rows every time it reruns, and the day's total with them. A job that replaces the day's partition, or merges on a key, leaves the same table after one run or four. That is what idempotent means: running it twice gives the same result as running it once.

## Why a canvas
The harm of append is a multiplication, and the safe modes are a flat line. Raising the number of runs in each mode shows the difference more clearly than one doubled number in prose, and the three bars side by side show that the safe modes agree.

## Model
- Inputs: times the job ran (1 to 4, default 2), write mode (0 append, 1 replace the day's partition, 2 merge on report_id; default 0).
- Day (from the seed-7 data): the upload folder for 4 March has 100 lines, 100 different report_ids, no bad rows, and prices that add up to 1,241.0 shekels.
- Rule: append gives rows = 100 x runs, duplicates = 100 x (runs - 1), total = 1,241.0 x runs. Replace and merge give 100 rows, 0 duplicates, 1,241.0 for any number of runs.
- Defaults: 2 runs, append: 200 rows, 100 duplicates, 2,482.0 shekels.
- Stats: rows for 4 March, duplicate rows, the day's total price. Bars: rows after this many runs for append, replace and merge, on a scale of 400.
- Limitations: one unchanging day, no half-finished crash, no cost model for merge.

## Rendering
The shared slider renderer. Two sliders (the mode slider carries its meaning in its label), three stat cards, three bars. The append bar uses the bad tone only when it holds duplicates, with the number printed next to it.

## Controls
Two range inputs and Reset.

## Visualisation
Three bars on one fixed scale (400 rows), so a bar's length compares across slider moves.

## Copy
- What this shows: the table after a job has run several times, in three write modes.
- Try this: (1) 2 runs in append mode give 200 rows and 2,482.0 shekels, and replace gives 100 rows and 1,241.0; (2) 4 runs then switch to replace or merge returns 100 rows; (3) replace and merge agree here.
- What changed: `describeRerunChange` names the new rows, duplicates and total and the old rows and total.
- Limits of the model: as in `limits`.

## Edge cases
One run in append mode is correct (100 rows, no duplicates). Four runs in append mode is the largest case: 400 rows, 300 duplicates, 4,964.0 shekels.

## Accessibility
Native range inputs, a live summary sentence, labelled bars, and the duplicates stated in numbers, not only in colour.

## Acceptance criteria
- [x] The claim is testable: the 6.3 quiz and the 6.7 gate ask about rerun results on new cases.
- [x] The model is tested in `frontend/tests/unit/canvas/rerun-append-vs-overwrite.test.ts`: defaults, the three "try this" settings, the largest case and `describeRerunChange`.
- [x] Predict before (6.3 predict), transfer after (6.3 quiz, 6.6 quiz, build tests in 6.5).
- [x] Reader fallback in prose: chapter 6.3 shows the real DuckDB results for the same day (100 rows, then 200 rows after an append).

## Build plan
`packages/learning-ui/src/canvas/rerun-append-vs-overwrite/data.ts`, registered by the orchestrator in `registry.ts` and `server/src/shared/canvas/slugs.ts`.
