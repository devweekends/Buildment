---
artifact: canvas-qa
course: founder-interviews
version: 1
validator: orchestrator (tests and reader checks)
date: 2026-10-25
---

# Canvas QA: founder-interviews (22 canvases)

One report for all 22 canvases, on template 14B's headings. Each canvas has a 14A spec in `packages/learning-ui/src/canvas/<slug>/spec.md`.

| Chapter | Slug | Renderer |
|---|---|---|
| 1.2 | `story-or-usually` | state machine |
| 1.3 | `my-part-team-part` | sequence |
| 1.4 | `samer-decision-weights` | factor |
| 2.2 | `percent-from-what` | slider |
| 2.3 | `find-your-numbers` | sequence |
| 2.4 | `how-much-was-yours` | slider |
| 3.2 | `resume-line-why-chain` | state machine |
| 3.3 | `tidy-reason-breaks` | sequence |
| 3.4 | `resume-line-audit` | state machine |
| 4.2 | `clarify-the-case` | sequence |
| 4.3 | `case-options-weights` | factor |
| 4.4 | `decide-and-measure` | slider |
| 5.2 | `choose-technical-story` | factor |
| 5.3 | `founder-version-first` | sequence |
| 5.4 | `engineer-depth-ladder` | state machine |
| 5.5 | `why-not-that-choice` | sequence |
| 5.6 | `fifty-times-test` | slider |
| 5.7 | `demo-they-can-open` | sequence |
| 6.2 | `broad-to-narrow-strength` | state machine |
| 6.3 | `weakness-answer-choice` | factor |
| 6.4 | `time-to-think` | sequence |
| 7.2 | `feedback-to-next-project` | state machine |

## Model

- **Slider canvases:** the four slider models (`percent-from-what`, `how-much-was-yours`, `decide-and-measure`, `fifty-times-test`) have unit tests in `frontend/tests/unit/canvas/<slug>.test.ts`. The tests cover:
  - the defaults;
  - the try-this values;
  - edges: zero, maximum, bad input, and for `decide-and-measure` a result exactly on the target and exactly at target minus the swing;
  - `describeChange`.
- **Factor canvases:** the totals and the flips the chapters state are tested in `founder-interviews-c-canvases.test.ts` (5.2, 6.3) and the course's factor checks (1.4, 4.3).
- **Registry test:** every canvas passes `frontend/tests/unit/canvas/registry.test.ts`, which checks:
  - inputs well formed and every corner of each slider model finite;
  - at most 3 summary cards;
  - input labels of 28 characters or fewer;
  - state machine grids of at most 3 by 2;
  - edge labels that fit and do not overlap on the phone and wide layouts.
- **Full suite:** 86 files, 2,947 tests passed on the final branch.

## Teaching

- **Claim and placement:** every canvas states one claim in its spec. A predict comes before it in the chapter, and a quiz item on a new case comes after.
- **Limits:** these are shown in the canvas, and slider models say they are toy models built on stated case numbers.
- **Step-through canvases:** every step note ends with a question that the next step answers. The renderers have no branching step, so these canvases cannot record a choice. This is recorded as a residual for human review (critique A, A-15).

## Visual and accessibility

- **Styling:** colours come from the shared tones, with no hex values in specs. There are no gradients or decoration.
- **Phone check, 375px:** the 1.2 state machine and the 5.6 slider were checked in the reader, in light and dark. There was no horizontal scroll, and labels were readable. The 5.6 slider moved by keyboard.
- **Desktop check:** the 2.4 slider was checked in dark mode.
- **Controls:** labelled HTML inputs with visible values and units. The shared focus ring and the reduced-motion rule come from the renderers.

## Technical

- **Registration:** all 22 slugs are in `server/src/shared/canvas/slugs.ts` (synced to the frontend and the package), `packages/learning-ui/src/canvas/registry.ts` and the package exports.
- **Behaviour:** no network calls, secrets or learner data in any canvas.
- **Fallback:** an unknown slug renders the platform's quiet note, and the chapter prose still teaches each claim without the canvas.
- **Errors:** no console errors on the pages visited.
