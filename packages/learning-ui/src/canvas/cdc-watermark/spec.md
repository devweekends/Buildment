---
artifact: canvas-spec
course: data-engineering
chapter: 06.04-incremental-loads-and-cdc
slug: cdc-watermark
version: 1
owner: interaction-designer
renderer: table-steps (HTML tables, shared stepper controls)
---

# Canvas spec: A watermark sees a change, and misses a delete

## Teaching claim
Watermark extraction reads the rows whose updated_at is after the last run and then moves the watermark. It catches V07's phone change. It cannot see V11's hard delete, because a row that is gone has no updated_at to compare. Log-based change capture records the delete as an event of its own.

## Why a canvas
Whether a change is found depends on a comparison between two timestamps, which is hard to follow in prose. Stepping through three runs with the registry rows, the saved watermark and the lake copy side by side lets the learner predict run 3 and see the empty result and the stale copy together.

## Model
- Source facts (seed 7): 12 volunteers on 14 March; V07 changes phone on 15 March at 08:30 (updated_at 2026-03-15 08:30); V11 is deleted on 22 March; unchanged rows have updated_at 2026-03-01 00:00.
- Run 1 (as of 14 March): no watermark, reads all 12 rows, then saves the watermark 2026-03-01 00:00.
- Run 2 (as of 16 March): rows with updated_at after the watermark: V07 only, 1 row; watermark becomes 2026-03-15 08:30.
- Run 3 (as of 23 March): V11 is gone from the registry (11 rows left), nothing is newer than the watermark, 0 rows; the lake still holds V11.
- Rule: rows read = rows in the source with updated_at after the watermark (all rows when there is none).
- Order rule: write the file first, save the watermark second.
- Limitations: three of twelve volunteers shown; a clock that runs behind and equal timestamps are not shown.

## Rendering
The shared `table-steps` renderer. Six small tables (at most 4 columns and 4 rows), two per step at most, so each step fits 375px stacked. Step titles are 60 characters or fewer.

## Controls
Back, Next, Play and the step chips from the shared stepper; arrow keys when focused.

## Visualisation
Highlighted rows carry a text marker, never colour alone. Warn tone for the changed row and the delete, good for the row read and the change log, bad for the missed delete, with outcome badges ("1 row", "missed", "seen"). The deleted row is drawn struck through with a caption.

## Copy
- What this shows: three runs of a watermark extract, one that finds a change and one that cannot find a delete.
- Try this: predict run 3's row count; find the step where the delete happens; explain why the watermark is saved after the file.
- What changed: each step note says which rows matched and why.
- Limits of the model: as in `limits`.

## Edge cases
The lake table grows through `rows`. Step 5 shows the source table with one row dropped.

## Accessibility
HTML table semantics with header cells; marked rows have a text marker; the summary is read to screen readers; the step note is a live region.

## Acceptance criteria
- [x] The claim is testable: the 6.4 quiz and the 6.6 quiz ask which change a watermark finds on new cases.
- [x] The model is tested: `tableStepsProblems` in the registry test checks every view, row index and size limit.
- [x] Predict before (6.4 predict), transfer after (6.4 quiz, 6.6 quiz, test `test_limit_a_hard_delete_is_invisible_to_watermark_extraction` in 6.5).
- [x] Reader fallback in prose: chapter 6.4 tells the same three runs.

## Build plan
`packages/learning-ui/src/canvas/cdc-watermark/data.ts`, registered by the orchestrator in `registry.ts` and `server/src/shared/canvas/slugs.ts`.
