---
artifact: canvas-spec
course: data-engineering
chapter: 01.03-the-map-of-a-pipeline
slug: batch-freshness
version: 1
owner: interaction-designer
renderer: slider (three inputs, three stats, two bars)
---

# Canvas spec: How old can batch data get?

## Teaching claim
In a batch pipeline the data can be as old as the gap between runs plus the time one run takes. If the decision only needs data by a deadline, a slower schedule is enough, and running more often only costs time and power.

## Why a canvas
The sum is small, but learners guess it wrong: most say "as old as the gap" and forget the run time. Moving the three inputs and watching the verdict flip at the edge (24.5 hours against a need of 24) makes the run time visible, and moving the need shows that a slower schedule can be enough.

## Model
- Inputs:

  | Name | Unit | Min | Max | Step | Default |
  |---|---|---|---|---|---|
  | Run every | hours | 1 | 24 | 1 | 6 |
  | A run takes | minutes | 5 | 120 | 5 | 30 |
  | Data needed within | hours | 1 | 48 | 1 | 24 |

- Outputs:

  | Name | Unit | Format |
  |---|---|---|
  | Worst-case age | hours | "6.5 h", detail "6 h gap + 30 min run", or "runs wait for each other" |
  | Meets the need | yes or no | "Yes" or "No", detail "needs 24 h or less" |
  | Runs per day | runs | 24 divided by the gap, up to 2 decimals |
  | Bars | hours | worst-case age (good or bad) and the need; scale = the larger of the two |

- Rule (`freshness` in `data.ts`): run time = minutes / 60. Gap = the larger of the interval and the run time, because the next run cannot start before the last one ends. Worst-case age = gap + run time. Meets the need when the age is no more than the need. Runs per day = 24 / gap.
- Worked values:

  | Run every | Run takes | Need | Worst-case age | Meets | Runs per day |
  |---|---|---|---|---|---|
  | 6 h (default) | 30 min | 24 h | 6.5 h | yes | 4 |
  | 24 h | 30 min | 24 h | 24.5 h | no | 1 |
  | 24 h | 30 min | 36 h | 24.5 h | yes | 1 |
  | 1 h | 120 min | 24 h | 4 h | yes | 12 |
  | 1 h | 5 min | 24 h | 1.08 h | yes | 24 |

- Assumptions: every run succeeds; a run takes the same time each day; the data is taken when a run starts; runs never overlap.
- Limitations: a simple illustration, not a measurement. It ignores late reports (a fresh table can still be incomplete), failures and retries, and the cost of running more often on a laptop.

## Rendering
- Primary: the shared `slider` renderer.
- Bars share one scale in hours.

## Controls
Three sliders with visible values and units; a reset button; the "What changed" sentence updates on every move.

## Visualisation
Two bars: the worst-case age (green when it meets the need, red when it misses) and the need. The verdict is always written as "Yes" or "No", never colour alone.

## Copy
- What this shows: the age of batch data is the gap plus the run time, and a slower schedule is enough when the need is a deadline.
- Try this: once a day misses a 24 hour need by half an hour; a 36 hour need makes once a day enough; a run longer than its gap makes runs wait.
- What changed: `describeFreshnessChange` says how the worst-case age moved and whether the plan now meets the need.
- Limits of the model: as in `limits`.

## Edge cases
Minimum (1 h, 5 min): 1.08 h and 24 runs a day. Maximum (24 h, 120 min): gap 24 h, age 26 h, 1 run a day. A run longer than the interval sets the gap to the run time. No NaN at any corner.

## Accessibility
The slider summary sentence is read to screen readers; every control has a visible label, value and unit.

## Acceptance criteria
- [x] The claim is testable: the 1.3 quiz asks for a worst-case age and a verdict on a new case.
- [x] The model is tested in `frontend/tests/unit/canvas/batch-freshness.test.ts` (defaults, the try-this values, edges, `describeChange`).
- [x] Simple and legible at 375px: three sliders, three stats, two bars.
- [x] Predict before (1.3 predict), transfer after (1.3 quiz).
- [x] Reader fallback in prose and a worked table in chapter 1.3.

## Build plan
`packages/learning-ui/src/canvas/batch-freshness/data.ts`, registered by the orchestrator in `registry.ts` and `server/src/shared/canvas/slugs.ts`; covered by `registry.test.ts` and `batch-freshness.test.ts`.
