---
artifact: canvas-spec
course: data-engineering
chapter: 10.03-delivery-guarantees
slug: delivery-guarantees
version: 1
owner: interaction-designer
renderer: slider (HTML controls, bars)
---

# Canvas spec: What a crash does to a batch of readings

## Teaching claim
Saving the position before the work loses a batch when the consumer crashes (at most once). Doing the work before saving the position repeats the batch after a crash (at least once). A sink that keeps one row per reading makes the repeat harmless (effectively once), but it cannot bring back what was lost.

## Why a canvas
The three guarantees are easy to confuse in prose. Switching the order, the crash point and the sink, with a count of lost and doubled rows, lets the learner predict the result of each combination and find the one combination that loses nothing and doubles nothing.

## Model
- Inputs (all whole numbers): work first (0 no, 1 yes, default 0), crash (0 none, 1 before the work, 2 after the work, default 1), safe to repeat (0 no, 1 yes, default 0).
- Rule (`deliver` in `data.ts`): a batch of 10 readings. Position saved first and crash before the work: the batch is worked 0 times, so 10 readings are lost. Work first and crash after the work: the batch is worked twice, so a sink that adds a row every time holds 20 rows (10 duplicates) and a sink that keeps one row per reading holds 10. Every other combination works the batch once.
- Stats: readings lost, duplicate rows, rows in the table (with the name of the guarantee). Bars: readings sent, rows in the table, lost, duplicates.
- Worked values: defaults give 10 lost, 0 duplicates, 0 rows (at most once). Work first with a late crash and an unsafe sink gives 0 lost, 10 duplicates, 20 rows (at least once). The same with a safe sink gives 10 rows (effectively once).
- Assumptions: one batch, one crash, the consumer restarts and reads from its saved position.
- Limitations: stated in `limits`. Not a model of Kafka transactions.

## Rendering
- Primary: the shared slider renderer. Four bars; bad tone only on lost and duplicate bars when they are above zero.
- Phone: sliders stack; labels are 28 characters or fewer and carry the meaning of 0, 1 and 2.
- Static fallback: chapter 10.3 works the three cases in prose and in a table.

## Controls
Three sliders and Reset.

## Visualisation
Three stat cards and four bars on a scale of 0 to 20.

## Copy
- What this shows: the effect of the order of two steps, a crash and a safe sink on a batch of 10 readings.
- Try this: predict the default; switch to work first and move the crash; make the sink safe, and then show that a safe sink does not bring back lost readings.
- What changed: `describeDeliveryChange` gives the old and new lost, duplicate and total counts and the reason.
- Limits of the model: as in `limits`.

## Edge cases
No crash gives 10 rows in every combination. A safe sink with save first and an early crash still loses 10. No NaN at any corner (registry test).

## Accessibility
Native range inputs with labels and values; the summary is read to screen readers; bad tone always has a number next to it.

## Acceptance criteria
- [x] The claim is testable: the 10.3 quizzes and 10.5 ask for lost and doubled rows on a new case.
- [x] The model is tested in `frontend/tests/unit/canvas/delivery-guarantees.test.ts`.
- [x] Predict before (10.3 predict), transfer after (10.3 quizzes, 10.5).
- [x] Reader fallback in prose.

## Build plan
`packages/learning-ui/src/canvas/delivery-guarantees/data.ts`, registered by the orchestrator in `registry.ts` and `server/src/shared/canvas/slugs.ts`.
