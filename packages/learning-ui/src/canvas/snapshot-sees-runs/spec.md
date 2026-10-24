---
artifact: canvas-spec
course: data-engineering
chapter: 07.04-snapshots-and-incremental-models
slug: snapshot-sees-runs
version: 1
owner: interaction-designer
renderer: table-steps (HTML tables, shared stepper controls)
---

# Canvas spec: Why does the history skip a state?

## Teaching claim
A snapshot records the state it finds at each run. When a row changes twice between two runs, the history gets one new row and the middle state is lost for good. Facts of the lost period then join to the wrong version, so the schedule of the snapshot sets how exact the history can be.

## Why a canvas
The loss is about timing, which a final table does not show. Stepping through the days, with the registry changing while no run happens, lets the learner predict the number of history rows before seeing it.

## Model
- Inputs: the shared stepper controls only.
- Rule (timestamp strategy): at a run, if the source `updated_at` is newer than the saved row, close the saved row at the new `updated_at` and add the new row. A change between two runs that is overwritten by a later change is never seen.
- Numbers: M03 Harbour (from 1 March), Hill (12 March 09:00, true in the seed-7 data), Old Town (13 March 10:00, an example added for this walkthrough). Runs on 11 March and 14 March give 2 rows; runs on all three days give 3.
- Limitations: one market, the timestamp strategy only.

## Rendering
- The shared `table-steps` renderer. At most two tables per step, at most 3 columns and 3 rows per table, so it fits 375px.
- Rows are marked with `highlight`; warn for the unseen change, bad for the lost state and the wrong join, good for the daily history.
- Static fallback: chapter 7.4 tells the same example in prose.

## Copy
- What this shows: a snapshot sees states at its runs, not between them.
- Try this: predict the rows after run 2; find where Hill is lost; think about a weekly snapshot.
- What changed: each step note says what the registry, the history or a join holds now.
- Limits: as in `limits`.

## Accessibility
HTML table semantics; marked rows carry a text marker; outcome badges repeat the meaning of the tone.

## Acceptance criteria
- [x] The claim is testable: the 7.4 quiz asks about a new case with two changes between two runs.
- [x] `tableStepsProblems` in the registry test passes (rows, columns, step titles of 60 characters or fewer).
- [x] The Hill row matches the seed-7 data (12 March 09:00); the Old Town change is labelled as an example.
- [x] Predict before (7.4 predict), transfer after (7.4 quiz, 7.5 snapshot test).

## Build plan
`packages/learning-ui/src/canvas/snapshot-sees-runs/data.ts` (export `snapshotSeesRuns`), registered by the orchestrator.
