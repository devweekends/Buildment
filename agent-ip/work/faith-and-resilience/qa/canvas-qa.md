---
artifact: canvas-qa
course: faith-and-resilience
chapter: all Learn chapters (19 canvases)
version: 1
validator: technical-validator (orchestrator session, scripts and click-through)
---

# Canvas QA: the 19 faith-and-resilience canvases

One report for all 19 canvases (template 14B), because they share four registered renderers and the same checks. Each canvas has its own `spec.md` (template 14A) next to its `data.ts`; the writers left the acceptance boxes unticked so this report records the result.

## Inventory

| Chapter | Slug | Renderer | Teaching claim (short) |
|---|---|---|---|
| 1.2 | `worry-or-next-step` | state machine | Sorting what only Allah knows from your part gives one step today |
| 1.3 | `a-hard-week-two-readings` | state machine | A hard week read as anger leads to giving up; read as a test with a purpose, to patience and work |
| 1.4 | `act-not-if-only` | sequence | "If only" loops back to regret; "Allah decreed" plus one lesson leads forward |
| 2.2 | `birds-go-out` | state machine | Trust without means and means without trust both fail; the birds trust and go out |
| 2.3 | `interview-power-plan` | slider | A plan with a backup covers the interview; trust does not replace counting the hours |
| 2.4 | `hijra-planned-steps` | sequence | Every step in Bukhari 3905 was planned, and the trust in the cave came with the plan |
| 3.2 | `sabr-keeps-moving` | state machine | Sabr is steadiness at the first shock that keeps acting; grief and asking for help are part of it |
| 3.3 | `words-for-the-day` | sequence | Different hard moments have different words in the Sunnah |
| 3.4 | `yusuf-waiting-well` | state machine | What was done in each place of waiting, and what Yusuf spoke of at the end |
| 4.2 | `gratitude-three-ways` | sequence | Gratitude in heart, tongue and action, including thanking people |
| 4.3 | `two-wings-balance` | state machine | Fear alone leads to despair, hope alone to carelessness; both keep a believer steady |
| 5.2 | `rania-two-offers` | factor | The better permissible option depends on what matters most; the canvas does not decide |
| 5.3 | `rania-asks-the-right-people` | sequence | Ask each person what they know |
| 5.4 | `istikhara-in-order` | state machine | Facts and shura first, then istikhara, then decide and act; no dream is needed |
| 6.2 | `same-work-two-intentions` | sequence | The same day of work with a good intention becomes worship |
| 6.3 | `little-and-often` | slider | Small daily work kept up through bad days adds up; with no bad days the long plan can win |
| 6.4 | `starting-again-steps` | state machine | Name it, learn, leave "if only", turn back to Allah where you did wrong, try again |
| 7.2 | `help-passes-on` | sequence | Help passes on; the return is with Allah |
| 7.3 | `who-to-tell` | state machine | When overwhelmed, the next step is a real person |

Renderers: 9 state machine, 7 sequence, 2 slider, 1 factor. No custom component; no new dependency.

## Model

| Case | Input | Expected | Actual | Pass |
|---|---|---|---|---|
| `interview-power-plan` default | 40 % charge, no power bank | needs 75 min, has 72, short by 3, backup is the uncle's shop | same (unit test and click-through) | yes |
| `interview-power-plan` change | power bank to 60 min | covered, 57 min to spare | same at 375px, dark theme | yes |
| `interview-power-plan` edges | minimum, maximum, exact cover, bad input | per `interview-power-plan.test.ts` | 7 of 7 tests | yes |
| `little-and-often` | default, no bad days, minimum, maximum, all Fridays lost, bad input | small plan ahead by default; long plan ahead with no bad days | 9 of 9 tests in `little-and-often.test.ts` | yes |
| `rania-two-offers` | default weights and the try-this settings | 34 against 34 tie by default, then 39 against 36, 36 against 38, 39 against 29 | rechecked by critic A against the shared factor model | yes |
| Every stepper canvas | step order, lanes, labels | steps point at real states and lanes; labels fit at phone and desktop widths; no overlapping edge labels | `registry.test.ts` (186 tests) | yes |

Frontend canvas suite: 27 files, 358 tests passed; `tsc --noEmit` clean; eslint on `src/canvas` and `tests/unit/canvas` clean.

## Teaching

- **Claim stated:** in every spec and in the chapter prose around the canvas.
- **Prediction present:** a predict directly before every canvas (moved there in revision 1); the first `tryThis` line refers to it.
- **Transfer check present:** an embedded MCQ on a different case later in each Learn chapter, testing a different claim from the predict.
- **Limitations visible:** every canvas has a `limits` text (the registry test requires more than 20 characters).
- **Faith not measured:** no canvas attaches a number to reward, sin, decree or faith. The two sliders model the learner's own minutes; the factor canvas models the learner's own priorities and says it does not choose.

## Visual

- **Palette:** theme tokens from `primitives/tones.ts` only; good, warn and bad only next to a text label.
- **Labels and units:** minutes and percent on the slider controls; plain-English step titles.
- **Mobile:** checked at 375px: `interview-power-plan` (dark), `yusuf-waiting-well` (light). No sideways scroll. One sub-label in `yusuf-waiting-well` ("mindful and patient") spilled past its pill and was shortened to "Quran 12:90".

## Accessibility

- **Keyboard:** slider moved with the arrow keys in the click-through; steppers use the shared step controls (Back, Next, Play, Start over, numbered chips).
- **Text alternative:** every spec has a `summary` for screen readers, and the chapter prose teaches the same claim if the canvas does not load.
- **Reduced motion:** shared stepper behaviour (no autoplay; the flow pulse hides under reduced motion).

## Technical

- **Reader integration:** 19 slugs registered in `frontend/src/canvas/registry.ts` and `server/src/shared/canvas/slugs.ts`, synced to `frontend/src/shared`; the registry test confirms the two lists match.
- **Fallback:** prose teaches each claim.
- **Console errors:** none on the checked pages after sign-in.
- **Interaction performance:** immediate on the slider at phone width.

## SVG

Rendered by the shared renderers as React SVG components with `viewBox` and theme tokens; no raw author SVG, no scripts, no external references. Visual regression: not automated; manual check at 375px and desktop.

## Defects

| Severity | Location | Observation | Required fix |
|---|---|---|---|
| S3, fixed | `yusuf-waiting-well` state "Recognised" | Sub-label overflowed its pill at 375px | Shortened the sub-label |
| S4, open | 16 of 19 canvases | Click-through steppers with no learner choice (meets v0.4 "steps through"; critic A suggests a choice step in two or three later) | Track for a later version |
