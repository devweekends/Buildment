---
artifact: canvas-spec
course: data-engineering
chapter: 10.02-logs-partitions-and-offsets
slug: partition-offsets
version: 1
owner: interaction-designer
renderer: sequence (HTML controls, inline SVG lanes)
---

# Canvas spec: Readings in a partition, and a crash before the save

## Teaching claim
Events with the same key go to the same partition, so their order holds there. A consumer's position in a partition is one number, the offset, and reading does not remove events. A consumer that crashes before it saves its position starts from the old position and reads the last events again.

## Why a canvas
The chapter explains the log in prose and a diagram. Stepping through three readings and a crash lets the learner predict where the consumer restarts before the picture shows it, and see exactly which step added the two extra rows.

## Model
- Inputs: the shared stepper controls only.
- Outputs: the active arrow, the step note and chips.
- Rule: three readings for site S2 at offsets 0, 1 and 2 in partition 0. The consumer's saved position is 0. It reads offsets 0 to 2, writes offsets 0 and 1, crashes, restarts from position 0, reads offsets 0 to 2 again and writes them all: 2 + 3 = 5 rows for 3 readings. It then saves position 3.
- Assumptions: one partition shown, one consumer, a sink that adds a row each time.
- Limitations: stated in `limits`. Other partitions, consumer groups and replication are not drawn.

## Rendering
- Primary: the shared sequence renderer with four lanes: Producer, Partition 0, Consumer, Database. Arrow labels are 18 characters or fewer.
- Static fallback: chapter 10.2 describes the same events in a table and in prose.

## Controls
Shared stepper controls only (Back, Next, Play, step chips).

## Visualisation
Eleven arrows. Tone: bad on the crash and on the repeated writes, warn on the restart steps, good on the saved position, each with a text outcome badge where it matters.

## Copy
- What this shows: three readings in one partition and a crash before the position is saved.
- Try this: predict where the consumer restarts; count the rows against the readings; find the step where the position changes.
- What changed: each step note says what the log, the consumer and the database hold.
- Limits of the model: as in `limits`.

## Edge cases
The crash is a loop on the Consumer lane (from equals to), with a label that fits on both layouts.

## Accessibility
Shared stepper keyboard support and focus ring; `summary` describes the whole flow for screen readers; tone always has a text badge or chip.

## Acceptance criteria
- [x] The claim is testable: the 10.2 quiz and 10.5 ask about order and restart position on a new case.
- [x] The model is tested by the registry consistency and label-fit tests.
- [x] Predict before (10.2 predict), transfer after (10.2 quiz, 10.3).
- [x] Reader fallback in prose.

## Build plan
`packages/learning-ui/src/canvas/partition-offsets/data.ts`, registered by the orchestrator in `registry.ts` and `server/src/shared/canvas/slugs.ts`.
