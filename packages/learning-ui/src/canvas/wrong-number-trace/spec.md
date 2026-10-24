---
artifact: canvas-spec
course: data-engineering
chapter: 01.02-what-a-data-engineer-does
slug: wrong-number-trace
version: 1
owner: interaction-designer
renderer: sequence (four lanes, shared stepper controls)
---

# Canvas spec: Trace a wrong number back to the stage that broke

## Teaching claim
A wrong number in a report is traced back stage by stage (the report, the tested tables, the pipeline, the source app) to the stage where it first went wrong. Each role owns one stage, so the trace also shows who fixes what. In this trace the cause is a rerun that added a day's rows a second time.

## Why a canvas
The claim is about order and ownership: who checks what, and what each check rules out. A paragraph lists the roles; stepping through the trace lets the learner predict the next check and see that a correct query can still show a wrong number.

## Model
- Inputs: the shared stepper controls only.
- Outputs: which actors talk, the arrow label, the note and the chips for the current step.
- Rule: the trace moves upstream until a stage fails its own check, then downstream again with the fix. A stage is cleared when its count or its log matches the stage before it.
- Numbers: last week's M02 line is 135.65 (the finished course data gives 135.65 for ISO week 11). This week's report shows 203.50. The early query adds up each day's prices and divides by the number of days with data. Monday 135.00 and Tuesday 136.00, with Tuesday stored twice: (135.00 + 136.00 + 136.00) / 2 = 203.50. Without the repeat: (135.00 + 136.00) / 2 = 135.50. Tuesday's upload (17 March) holds 99 reports; stored twice it is 198 rows (the finished course data lands 99 rows for 17 March).
- Assumptions: one market, two days of the week so far, one cause.
- Limitations: real causes can be several; how far a repeated day moves a figure depends on the query.

## Rendering
- Primary: the shared `sequence` renderer, four lanes: Report (analyst), Models (analytics engineer), Pipeline (data engineer), Phone form (backend developer).
- Arrow labels are 18 characters or fewer.
- Static fallback: chapter 1.2 tells the same trace in prose and shows the sum.

## Controls
Back, Next, Play and the step chips from the shared stepper; arrow keys when focused.

## Visualisation
The active arrow carries the step tone: warn where a stage shows the problem, good where a stage is cleared, bad for the cause, good again for the fix. The outcome badge says in two words what the step found.

## Copy
- What this shows: a wrong number traced back through four stages, with one role checking each stage.
- Try this: predict the table at step 2; find the first step where the data, not the code, is wrong; imagine the form had sent the day twice.
- What changed: each step note says what the stage found and what it ruled out.
- Limits of the model: as in `limits`.

## Edge cases
Loops (the models and the pipeline checking their own data) are drawn beside the lane. The last arrow returns to the report.

## Accessibility
The summary is read to screen readers and the step note is a live region. Tone is always paired with an outcome badge or a note, never colour alone.

## Acceptance criteria
- [x] The claim is testable: the 1.2 quiz asks which stage to check next on a new case.
- [x] Every number is checked: 135.00 + 136.00 + 136.00 = 407.00 and 407.00 / 2 = 203.50; 135.00 + 136.00 = 271.00 and 271.00 / 2 = 135.50; 2 x 99 = 198.
- [x] Simple and legible at 375px: four lanes, labels of 17 characters or fewer.
- [x] Predict before (1.2 predict), transfer after (1.2 quiz, gate 1.5).
- [x] Reader fallback in prose.

## Build plan
`packages/learning-ui/src/canvas/wrong-number-trace/data.ts`, registered by the orchestrator in `registry.ts` and `server/src/shared/canvas/slugs.ts`; covered by `frontend/tests/unit/canvas/registry.test.ts`.
