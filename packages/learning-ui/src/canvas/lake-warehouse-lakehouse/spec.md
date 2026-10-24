---
artifact: canvas-spec
course: data-engineering
chapter: 05.04-lakes-and-warehouses
slug: lake-warehouse-lakehouse
version: 1
owner: interaction-designer
renderer: factor (renderers/factor/)
---

# Canvas spec: Lake, warehouse or lakehouse: what matters to you?

## Teaching claim
There is no single best storage design. A lake wins on cheap raw storage and open files, a warehouse on fast governed SQL and safe updates, and a lakehouse on open files together with safe updates. Which one comes out ahead depends on how much each need matters to the team.

## Why a canvas
The claim is about a decision that flips when a weight changes. Moving one weight and watching the leader change shows that the question "which is best?" has no answer until the team says what matters. A static table would hide that the answer is sensitive to one weight.

## Model
- Options: lake, warehouse, lakehouse. Criteria: cheap raw storage, fast SQL and access control, open file formats, safe updates and schema changes. Weight levels 1 (nice to have), 2 (important), 3 (very important). Score scale 1 to 5.
- Scores (lake, warehouse, lakehouse): cheap storage 5, 2, 4; fast SQL 2, 5, 3; open formats 5, 1, 4; safe updates 1, 5, 4.
- Default weights (Mizan today): cheap storage 3, fast SQL 2, open formats 3, safe updates 1.
- Totals: lake 35, warehouse 24, lakehouse 34. Lake leads by 1.
- Safe updates at 2: lake 36, warehouse 29, lakehouse 38. At 3: lake 37, warehouse 34, lakehouse 42.
- Weights cheap 1, SQL 3, open 1, safe 3: lake 19, warehouse 33, lakehouse 29.
- Rule: total(option) = sum over criteria of weight x score.
- Limitations: judgement scores, no operating effort, no skills, no money.

## Rendering
The shared factor renderer with its totals bars and weight buttons.

## Controls
Weight buttons per criterion (three levels) and Reset.

## Visualisation
Bars of weighted totals with the leader marked in words, as the renderer does.

## Copy
- What this shows: three storage designs scored on four needs, with weights the learner can change.
- Try this: (1) default: lake leads by 1; (2) safe updates to 3: lakehouse leads on 42; (3) cheap 1, SQL 3, open 1, safe 3: warehouse leads on 33.
- What changed: the renderer's `describeChange` says which weight moved, how many points each design gained or lost, and whether the leader changed.
- Limits of the model: as in `limits`.

## Edge cases
A tie is possible for some weights and is shown as a tie by the renderer.

## Accessibility
The shared factor renderer: real buttons for weights, text for the leader, no colour-only meaning.

## Acceptance criteria
- [x] The claim is testable: the 5.4 quiz and the 5.6 quiz ask which design fits a stated case.
- [x] The winner changes when the weight the chapter asks about changes: Safe updates 1 to 2 moves the lead from the lake to the lakehouse.
- [x] Predict before (5.4 predict), transfer after (5.4 quiz).
- [x] Reader fallback in prose: chapter 5.4 describes the three designs and Mizan's choice.

## Build plan
`packages/learning-ui/src/canvas/lake-warehouse-lakehouse/data.ts`, registered by the orchestrator in `registry.ts` and `server/src/shared/canvas/slugs.ts`.
