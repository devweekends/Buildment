---
artifact: canvas-spec
course: data-engineering
chapter: 12.03-the-modelling-round
slug: modelling-round-steps
version: 1
owner: chapter-writer-f
renderer: state-machine (HTML controls, inline SVG states)
---

# Canvas spec: The four modelling steps, with a step back

## Teaching claim
A modelling answer follows four steps said aloud, in order: business process, grain, dimensions, facts. When a new question does not fit the model, the fix is to step back to the grain, not to patch the table.

## Why a canvas
The order and the loop back are the lesson. A lifecycle with a labelled "no" that returns to the grain shows the one move learners skip under pressure, which a numbered list cannot show.

## Model
- Six states in a 3 by 2 snake: Business process, Grain, Dimensions (row 0); Facts, Does it fit?, Say it aloud (row 1).
- Edges: then, described by, add, new question, no (back to Grain), yes.
- Case: Doaa's water delivery round, practised by Ibrahim with Rasha. Grain first: one row per delivery stop; dimensions customer, driver, date, product; facts bottles delivered, empties collected, amount charged. New question: which customers ordered but got no delivery. The grain changes to one row per order line with a status (delivered, failed, cancelled); the facts hold (bottles delivered and amount are 0 for a failed line).
- Nine steps. State names are at most 18 characters; edge labels at most 14, and 3 or fewer on the arrows between states in the same column ("add", "no").
- Assumptions: one new question; the process stays the same.
- Limitations: real models may need a second fact table instead of a changed grain.

## Rendering
Shared state-machine renderer, 3 columns by 2 rows. Warn tone on the question that does not fit, good tone on the fit and the final statement, each with a text badge.

## Copy
- What this shows: the four steps in order, and the step back to the grain.
- Try this: predict which step a failing question sends you back to; count the changes in the dimensions; invent a question that does not fit.
- What changed: each note says what Ibrahim has decided at that step.
- Limits: as in `limits` in `data.ts`.

## Edge cases
Steps 1 and 7 stay on a state without an arrow to it from the previous state (a re-check); step 8 reuses the "new question" edge.

## Accessibility
Shared stepper keyboard support and focus ring; the `summary` gives the whole round; tones carry a text badge.

## Acceptance criteria
- [x] The claim is testable: the 12.5 drill asks which step to return to when a question does not fit.
- [x] The data is checked by the registry test (states, edges, label fit and overlap on a phone and wide).
- [x] Predict before (12.3), transfer after (12.3 quiz, 12.5 drills).

## Build plan
`packages/learning-ui/src/canvas/modelling-round-steps/data.ts`, to be registered by the orchestrator in `registry.ts` and `slugs.ts`.
