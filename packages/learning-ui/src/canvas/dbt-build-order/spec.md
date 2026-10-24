---
artifact: canvas-spec
course: data-engineering
chapter: 07.02-models-refs-and-layers
slug: dbt-build-order
version: 1
owner: interaction-designer
renderer: state-machine (3 columns by 2 rows)
---

# Canvas spec: How dbt builds models in order

## Teaching claim
`ref()` turns separate model files into a graph of arrows. dbt builds in an order that respects the arrows: sources, then staging, then the models that use them. When one model fails, the models that depend on it are skipped and keep stale tables, while a model on an independent branch still builds.

## Why a canvas
Order and failure are about sequence. Stepping through the build, and then through one failure, lets the learner predict which models are skipped before the picture shows it.

## Model
- Inputs: the shared stepper controls only.
- Outputs: the lit state, the lit edge, a note, chips and outcome badges (built in order, fails, skipped, still built).
- Rule: a model is built after all of its parents; a failed model makes every model below it on an arrow skip. A model with two parents (`fct_price_report`) waits for both.
- Assumptions: a slice of six of the 13 nodes (3 sources, 1 seed, 1 snapshot, 8 models); one thread.
- Limitations: tests also block dependants in `dbt build`; more threads build independent models at once.

## Rendering
- The shared state machine renderer, 3 columns by 2 rows. Row 0: Lake sources, stg_price_reports, fct_price_report. Row 1: stg_markets, dim_market, mart_weekly_basket.
- Labels: "src" and "ref" (3 characters), so the two arrows between states in one column also fit a phone. One diagonal arrow (dim_market to fct_price_report) has no parallel arrow beside it.
- Static fallback: chapter 7.2 describes the same build and the same failure in prose, and shows the real `SKIP` lines.

## Controls
Back, Next, Play and the step chips from the shared stepper; arrow keys when focused.

## Visualisation
The lit state shows the current model. Tone is always paired with an outcome badge: good for "built in order" and "still built", bad for "fails", warn for each "skipped".

## Copy
- What this shows: how arrows from `ref()` set the build order, and how a failure spreads.
- Try this: predict the skipped models before step 8; find the model with two parents; name the model that still builds.
- What changed: each step note says which model was built or skipped and why.
- Limits of the model: as in `limits`.

## Accessibility
Shared stepper keyboard support and focus ring; the `summary` is read to screen readers; outcome badges carry the meaning, not colour alone.

## Acceptance criteria
- [x] The claim is testable: the 7.2 quiz asks which models skip in a new project.
- [x] Names match the project: `stg_price_reports`, `stg_markets`, `dim_market`, `fct_price_report`, `mart_weekly_basket`.
- [x] Predict before (7.2 predict), transfer after (7.2 quiz, 7.5 build).
- [x] Layout and label tests in the registry test (columns 0 to 2, rows 0 to 1, no overlapping labels).

## Build plan
`packages/learning-ui/src/canvas/dbt-build-order/data.ts` (export `dbtBuildOrder`), registered by the orchestrator.
