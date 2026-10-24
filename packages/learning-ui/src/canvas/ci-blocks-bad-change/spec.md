---
artifact: canvas-spec
course: data-engineering
chapter: 11.04-cost-governance-and-ci
slug: ci-blocks-bad-change
version: 1
owner: chapter-writer-f
renderer: sequence (HTML controls, inline SVG lanes)
---

# Canvas spec: CI stops a renamed column before main

## Teaching claim
Continuous integration runs the same steps on a clean machine for every change, on a small fixed sample of data. A change that breaks a test makes the run fail, and the pull request cannot reach main. A green run only shows that the tests you wrote still hold.

## Why a canvas
The idea is a sequence of hand-offs between four places: the branch, a clean machine, the tests and main. The learner sees where the failure appears, what is skipped after it and why main is never touched, which a list of workflow steps does not show.

## Model
- Actors: Branch (Hala's change), CI runner (clean machine), dbt tests (inside the run), Main (what is live).
- Steps: open the pull request; install packages; make sample data (10 days, seed 7: 933 distinct reports, 961 lines); run the pipeline for the first date; one test errors (PASS=23, ERROR=1, SKIP=15 of 39); exit code 1 and later steps skipped; check failed and merge blocked; push the fix; green and merged (PASS=39).
- All numbers and messages come from running the reference build with `price` renamed to `price_ils` in `stg_price_reports.sql` (dbt 1.12.6, dbt-duckdb 1.11.0): `not_null_stg_price_reports_price` errors with a Binder Error, the runner prints `dbt_build=failed, checks=skipped, report=skipped` for 2026-03-01 and exits with 1.
- Assumptions: the check is required before merge; the sample data is the same on every run.
- Limitations: one change on synthetic data; service-specific settings are not shown.

## Rendering
Shared sequence renderer: four lanes, nine steps, bad tone on the error and the failed exit, good tone on the block and the merge, each with a text badge.

## Copy
- What this shows: the path of one change through an automatic run, and the point where it stops.
- Try this: predict whether the run is green or red when a test still names a renamed column (matches the chapter's predict); count the steps that never ran; ask what a green run cannot tell you.
- What changed: each step note says what the run has done and what comes next.
- Limits: as in `limits` in `data.ts`.

## Edge cases
Steps 2, 3 and 5 are loops on one lane; steps 7 and 9 cross a lane to reach Main.

## Accessibility
Shared stepper keyboard support and focus ring; the `summary` describes the whole flow; tones always carry a text badge.

## Acceptance criteria
- [x] The claim is testable: the 11.4 quiz asks which step of a workflow catches a given change, on a new case.
- [x] The data is checked by the registry test (lanes, label lengths).
- [x] Predict before (11.4), transfer after (11.4 quiz, 11.5 build, 11.6 quiz).

## Build plan
`packages/learning-ui/src/canvas/ci-blocks-bad-change/data.ts`, to be registered by the orchestrator in `registry.ts` and `slugs.ts`.
