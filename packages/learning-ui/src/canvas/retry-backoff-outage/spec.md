---
artifact: canvas-spec
course: data-engineering
chapter: 09.03-retries-and-failures
slug: retry-backoff-outage
version: 1
owner: interaction-designer
renderer: slider (HTML controls, bars)
---

# Canvas spec: Will the retries outlast the outage?

## Teaching claim
Waits that double cover a longer outage than the same number of equal waits, so a few retries reach a long way. A retry only helps when the thing that failed comes back by itself; it never fixes a bad input.

## Why a canvas
The chapter explains backoff in prose. Moving the outage length and the number of retries lets the learner predict whether a task gets through and see that doubling the wait, not adding more retries, is what reaches a long outage.

## Model
- Inputs: outage length (0 to 120 min, step 5, default 20), retries allowed (0 to 5, step 1, default 3), first wait (1 to 15 min, step 1, default 5).
- Rule (`attemptTimes`, `retryOutcome` in `data.ts`): attempt k starts at minute w x (2^k - 1), for k = 0 to retries. An attempt works when its start minute is at least the outage length. Attempts made = the attempt that worked, or all of them. Finish time = the start minute of that attempt, or of the last attempt when the task gives up.
- Worked values: defaults give attempt times 0, 5, 15 and 35; the task works on attempt 4 at minute 35. Outage 40 with 3 retries: all 4 attempts fail, finish 35. Outage 40 with 4 retries: works on attempt 5 at minute 75. Constant waits of 5 minutes reach minute 15 with 3 retries.
- Stats: attempts made, task succeeded (yes or no), finish time. Bars: outage end, last retry with doubling waits, last retry with equal waits.
- Assumptions: the outage starts at the first attempt and ends at a known minute; no random part in the waits.
- Limitations: stated in `limits`. The canvas does not model bad input; that is in the chapter text.

## Rendering
- Primary: the shared slider renderer. Three bars, a good or bad tone only while the bar does or does not reach the end of the outage.
- Phone: sliders stack above the text; labels are 28 characters or fewer.
- Static fallback: chapter 9.3 works the default example in prose.

## Controls
Three sliders and Reset, each with a visible value and unit.

## Visualisation
Three stat cards and three bars on one scale.

## Copy
- What this shows: how far a task with doubling waits reaches into an outage.
- Try this: predict the default; raise the outage to 40 and then add a retry; set the outage to 0.
- What changed: `describeOutageChange` says when the last retry now starts and whether the task works or gives up.
- Limits of the model: as in `limits`.

## Edge cases
Outage 0 and retries 0: one attempt, finish 0 min, no NaN. Maximum: first wait 15 and 5 retries gives a last retry at minute 465; the bar scale follows the largest bar.

## Accessibility
Native range inputs with labels and values; the summary is read to screen readers; bar tone has a text value next to it.

## Acceptance criteria
- [x] The claim is testable: the 9.3 quizzes and 9.5 ask for a finish time or a yes or no on a new case.
- [x] The model is tested in `frontend/tests/unit/canvas/retry-backoff-outage.test.ts`.
- [x] No NaN at any slider corner (registry test).
- [x] Predict before (9.3 predict), transfer after (9.3 quiz).
- [x] Reader fallback in prose.

## Build plan
`packages/learning-ui/src/canvas/retry-backoff-outage/data.ts`, registered by the orchestrator in `registry.ts` and `server/src/shared/canvas/slugs.ts`.
