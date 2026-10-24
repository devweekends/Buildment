---
artifact: canvas-spec
course: data-engineering
chapter: 10.04-one-machine-or-a-cluster
slug: one-machine-or-cluster
version: 1
owner: interaction-designer
renderer: slider (HTML controls, bars)
---

# Canvas spec: One machine or a cluster: a toy time model

## Teaching claim
Skipping the columns a query does not need shrinks what one machine must read, and a cluster adds start-up and coordination time, so the cluster is worth its cost only when what the query reads is large enough. The break-even depends on the speeds you measure; the toy model gives no real size threshold.

## Why a canvas
The chapter argues "measure first". Moving the share of columns and the cluster size shows that the table size alone does not decide, and that more machines can make the answer slower. The learner predicts first and then finds the point where the faster choice flips.

## Model
- Inputs: data size (10 to 1,000 GB, step 10, default 200), share of columns read (5 to 100 percent, step 5, default 20), machines in the cluster (2 to 16, step 1, default 4).
- Rule (`scaleTimes` in `data.ts`): needed GB = size x share / 100. One machine = needed / 0.5 seconds. Cluster = 60 + 2 x machines + needed / (0.5 x machines) seconds. A tie goes to one machine.
- Illustrative speeds, stated in the intro and in `limits`: 0.5 GB per second per machine, 60 seconds start-up, 2 seconds of coordination per machine. They are not measurements.
- Worked values: defaults give needed 40 GB, one machine 80 s, cluster 88 s (one machine is faster). At 100 percent: needed 200 GB, one machine 400 s (6.7 min), cluster 168 s (2.8 min). At 20 percent with 8 machines: 86 s; with 16 machines: 97 s.
- Stats: one machine, cluster, faster choice. Bars: one machine, cluster total, cluster start-up and coordination.
- Assumptions: columns can be skipped (a column layout such as Parquet), reading speed is the same on every machine.
- Limitations: stated in `limits`. No compression ratio is used, because none is sourced.

## Rendering
- Primary: the shared slider renderer. Three bars on one scale; good tone on the faster of the two totals.
- Phone: sliders stack; labels are 28 characters or fewer.
- Static fallback: chapter 10.4 works the default example and the 100 percent example in prose.

## Controls
Three sliders and Reset, each with a visible value and unit.

## Visualisation
Three stat cards and three bars.

## Copy
- What this shows: a toy time model for one machine against a cluster.
- Try this: predict the default; raise the share of columns to 100 percent; go back and raise the machines to 16.
- What changed: `describeScaleChange` says how many GB the query now reads, both times and whether the faster choice changed.
- Limits of the model: as in `limits`.

## Edge cases
Minimum (10 GB, 5 percent, 2 machines): needed 0.5 GB, one machine 1 s, cluster 65 s. Maximum (1,000 GB, 100 percent, 16 machines): one machine 2,000 s (33.3 min), cluster 60 + 32 + 125 = 217 s. No NaN at any corner (registry test).

## Accessibility
Native range inputs with labels and values; the summary is read to screen readers; good tone has a text value next to it.

## Acceptance criteria
- [x] The claim is testable: the 10.4 quizzes and 10.5 ask which choice is faster on a new case.
- [x] The model is tested in `frontend/tests/unit/canvas/one-machine-or-cluster.test.ts`.
- [x] Predict before (10.4 predict), transfer after (10.4 quiz).
- [x] Reader fallback in prose.

## Build plan
`packages/learning-ui/src/canvas/one-machine-or-cluster/data.ts`, registered by the orchestrator in `registry.ts` and `server/src/shared/canvas/slugs.ts`.
