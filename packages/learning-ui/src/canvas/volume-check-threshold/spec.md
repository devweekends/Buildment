---
artifact: canvas-spec
course: data-engineering
chapter: 11.02-checks-and-monitoring
slug: volume-check-threshold
version: 1
owner: chapter-writer-f
renderer: slider (HTML controls, shared bars)
---

# Canvas spec: Where should the volume alarm sit?

## Teaching claim
A volume check with a tolerance catches a missing batch, but a tolerance that is too tight raises alarms on normal days, and one that is too loose lets the missing batch through. The right setting depends on how much the normal days vary.

## Why a canvas
The chapter explains the rule in prose and works one day by hand. Moving the tolerance and watching the false alarms appear and the missing batch slip through is what makes "alert fatigue" and "a check nobody notices" two sides of the same dial, which one worked example cannot show.

## Model
- Input: tolerance below the average, 0 to 90 percent, step 5, default 50 (the default of `check_volume` in the reference build).
- Fixed data: rows received per upload day for 15 to 28 March from the seed-7, 28-day data (good plus quarantined rows): 97, 93, 99, 96, 97, 90, 105, 99, 97, 94, 92, 92, 97, 111. On 24 March the first batch of the day is missing, so the 94 becomes 37 (the second batch of 24 March really holds 37 lines).
- Rule: for each day after the first, the alarm line is round1(average of the up to 7 earlier days in the series x (1 - tolerance)); the day raises an alarm when its rows are below the line. The first day has nothing to compare with and passes.
- Outputs: missing batch caught (yes or no), false alarms (count and dates), the alarm line on 24 March; bars for the usual rows (97.6), the alarm line and the rows that arrived (37).
- Worked values: tolerance 0 gives false alarms on 16, 18 and 20 March and catches 24 March (line 97.6); 5 gives one false alarm (20 March; the line on 24 March is 92.7); 10 to 60 give none and catch it (line 87.8 at 10, 48.8 at 50, 39 at 60); 65 and above miss it (line 34.2 at 65).
- Assumptions: one real problem in the series; every other alarm counts as false.
- Limitations: one dataset, drops only, no weekly pattern.

## Rendering
Shared slider renderer: one slider, three stat cards, three bars on a common scale (0 to 120).

## Copy
- What this shows: the alarm line of a volume check on the day a batch went missing, and how many normal days cross a line set at the same tolerance.
- Try this: (1) tolerance 0 gives three false alarms and catches the problem (matches the chapter's predict). (2) tolerance 10 gives none and still catches it. (3) tolerance 65 misses it.
- What changed: `describeVolumeChange` says how the alarm line moved, how false alarms changed and whether the missing batch is still caught.
- Limits: as in `limits` in `data.ts`.

## Edge cases
Tolerance 0 (alarm on any dip) and 90 (line 9.8 rows) are both finite; the first day of the series never alarms.

## Accessibility
Native range input with a visible value and unit; the summary sentence is read to screen readers; the bar tone is always next to a text label.

## Acceptance criteria
- [x] The claim is testable: the 11.2 quiz asks for a tolerance that catches a half-day problem and passes normal swings, on a new case.
- [x] The model is tested in `frontend/tests/unit/canvas/volume-check-threshold.test.ts`, including a cross-check of every tolerance against the reference check logic written out by hand.
- [x] Predict before (11.2), transfer after (11.2 quiz, 11.5 build).

## Build plan
`packages/learning-ui/src/canvas/volume-check-threshold/data.ts`, to be registered by the orchestrator in `registry.ts` and `slugs.ts`.
