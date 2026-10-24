---
artifact: canvas-spec
course: data-engineering
chapter: 02.03-aggregation-traps
slug: null-average-trap
version: 1
owner: interaction-designer
renderer: slider (three inputs, three stats, three bars)
---

# Canvas spec: What a missing price does to an average

## Teaching claim
Aggregate functions skip NULL, so a missing price does not move an average, but it does make `COUNT(price)` smaller than `COUNT(*)`. Turning missing prices into 0 puts false values into the average and drags it down. `COUNT(*)` counts rows; `COUNT(price)` counts values.

## Why a canvas
Learners read "AVG ignores NULL" and still write `COALESCE(price, 0)` to be safe. Flipping one switch and watching the average fall from 8.00 to 6.00 with no real price changed, while the two counts move together, shows what the fix does to the answer.

## Model
- Fixed true price: every report that has a price says 8.00 shekels (a bakery's flour log, a side case).
- Inputs:

  | Name | Unit | Min | Max | Step | Default |
  |---|---|---|---|---|---|
  | Price reports | reports | 10 | 40 | 5 | 20 |
  | Reports with no price | reports | 0 | 10 | 1 | 5 |
  | Missing as 0 (0 no, 1 yes) | flag | 0 | 1 | 1 | 0 |

- Outputs:

  | Name | Unit | Format |
  |---|---|---|
  | AVG(price) | shekels | two decimals, or "NULL" when no row has a price |
  | COUNT(*) | rows | every row |
  | COUNT(price) | values | reports with a price, or all rows when missing becomes 0 |
  | Bars | shekels | true price, average left as NULL, average with missing as 0; scale 0 to 8 |

- Rule (`nullCounts` in `data.ts`): rows with a price = reports minus missing (missing cannot exceed reports). Left as NULL: AVG = 8.00 when at least one row has a price, else NULL; COUNT(price) = rows with a price. Turned into 0: AVG = 8.00 x rows with a price / reports; COUNT(price) = reports.
- Worked values:

  | Reports | Missing | As 0 | AVG | COUNT(*) | COUNT(price) |
  |---|---|---|---|---|---|
  | 20 | 5 | 0 (default) | 8.00 | 20 | 15 |
  | 20 | 5 | 1 | 6.00 | 20 | 20 |
  | 20 | 10 | 1 | 4.00 | 20 | 20 |
  | 20 | 10 | 0 | 8.00 | 20 | 10 |
  | 10 | 10 | 0 | NULL | 10 | 0 |
  | 10 | 10 | 1 | 0.00 | 10 | 10 |

- Assumptions: one true price, no spread of real prices, only the missing rows differ.
- Limitations: a simple illustration. It does not say how many missing prices a real table has or whether to skip, fill in or return them; that depends on why they are missing.

## Rendering
- Primary: the shared `slider` renderer. Bars share one scale in shekels.

## Controls
Three sliders with visible values; the third is a 0 or 1 switch written as a slider, as in the streak canvas. Reset restores the defaults.

## Visualisation
Three bars. The average with missing as 0 is red when it is below the true price. NULL is written as a word on its bar, never as an empty bar alone.

## Copy
- What this shows: AVG and COUNT skip NULL, a 0 is a value, and COUNT(*) counts rows.
- Try this: switch missing to 0 at the default; raise the missing rows to 10 with the switch on and off; set everything to missing.
- What changed: `describeNullChange` names the new AVG, COUNT(*) and COUNT(price) and says why the average moved or stayed.
- Limits of the model: as in `limits`.

## Edge cases
Everything missing with NULL left alone gives AVG NULL (not 0, not NaN); with the switch on it gives 0.00. Missing is capped at the number of reports.

## Accessibility
The summary sentence is read to screen readers. Tone is paired with the written value on every bar.

## Acceptance criteria
- [x] The claim is testable: the 2.3 quiz asks for AVG and counts on a new case.
- [x] The model is tested in `frontend/tests/unit/canvas/null-average-trap.test.ts`.
- [x] Simple and legible at 375px.
- [x] Predict before (2.3 predict), transfer after (2.3 quiz, 2.5 drill d04).
- [x] Reader fallback in prose with a worked table.

## Build plan
`packages/learning-ui/src/canvas/null-average-trap/data.ts`, registered by the orchestrator in `registry.ts` and `server/src/shared/canvas/slugs.ts`; covered by `registry.test.ts` and `null-average-trap.test.ts`.
