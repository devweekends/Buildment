---
artifact: canvas-spec
course: data-engineering
chapter: 09.02-dags-and-schedules
slug: pipeline-dag-retry
version: 1
owner: interaction-designer
renderer: state-machine (HTML controls, inline SVG states)
---

# Canvas spec: One run of the pipeline as a graph

## Teaching claim
A pipeline is a graph of tasks. A task starts only when every upstream task has succeeded; a temporary failure such as a timeout is retried after a wait; a permanent error is not retried, and every task after it is skipped.

## Why a canvas
The chapter draws the six tasks in a diagram. Stepping through one run, with a failed attempt, a retry and then a permanent failure, lets the learner predict which tasks still run before the picture shows it, which a static graph cannot do.

## Model
- Inputs: the shared stepper controls only (Back, Next, Play, step chips).
- Outputs: the highlighted task, the active arrow, the step note and chips.
- Rule: tasks and upstream tasks as in the 9.4 runner: `extract_registry` [], `land` [], `publish` [land], `dbt_build` [extract_registry, publish], `checks` [dbt_build], `report` [dbt_build, checks]. The arrow from dbt_build to report is left out because checks already waits for dbt_build. Retries 2 (three attempts), first wait 1 second.
- Numbers: run date 12 March, `land` returns 135 rows and 2 rows go to quarantine (REFERENCE.md, section 5, rows per upload date).
- Assumptions: one run for one date; one timeout on `land`; a plain error in `publish` for the second story.
- Limitations: no parallel runs, no timeouts, no alerts; the retry settings are the small runner's defaults.

## Rendering
- Primary: the shared state-machine renderer.
- Grid: 3 columns by 2 rows. Top row: extract_registry, dbt_build, checks. Bottom row: land, publish, report. No diagonal arrows. The two edges between rows carry two-character labels ("ok"), because they turn sideways on phones.
- The retry is a loop on `land`, in the bottom row, so its label sits to the right of the pill on phones.
- Static fallback: chapter 9.2 writes the graph, the order and the failure case in prose and in a diagram.

## Controls
Shared stepper controls only. No numeric input: the claim is about order and dependency, not quantity.

## Visualisation
Six labelled pills and six arrows. Tone: warn on the timeout and on the skipped tasks, good on the retry that works and on the finished run, bad on the permanent failure, each with a text outcome badge.

## Copy
- What this shows: one run of six dependent tasks, with a retry and a permanent failure.
- Try this: predict which tasks run after a permanent error in `publish`; count the log lines of `land`; find the task with two arrows pointing at it.
- What changed: each step note says which task ran, why it could start and what it wrote to the log.
- Limits of the model: as in `limits`.

## Edge cases
Steps 8 and 9 revisit earlier states. Step 9 lights the arrow from publish to dbt_build to show the blocked dependency.

## Accessibility
Shared stepper keyboard support and focus ring; `summary` gives the whole run for screen readers; tone always has a text badge.

## Acceptance criteria
- [x] The claim is testable: the 9.2 quizzes and 9.5 ask which tasks run or are skipped on a new case.
- [x] The model is tested by the registry consistency and label-fit tests.
- [x] Simple and legible at 375px.
- [x] Predict before (9.2 predict), transfer after (9.2 quiz, 9.4 tests).
- [x] Reader fallback in prose.

## Build plan
`packages/learning-ui/src/canvas/pipeline-dag-retry/data.ts`, registered by the orchestrator in `registry.ts` and `server/src/shared/canvas/slugs.ts`.
