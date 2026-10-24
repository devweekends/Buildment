---
artifact: canvas-spec
course: data-engineering
chapter: 07.03-tests-contracts-and-docs
slug: what-tests-catch
version: 1
owner: interaction-designer
renderer: slider (renderers/slider/)
---

# Canvas spec: What the tests on the fact table catch

## Teaching claim
Each test checks one rule that someone wrote down. Duplicates break `unique`, rows with no market break `relationships`, and a wrong price that looks normal breaks no test. A passing build means the written rules held, not that the data is right.

## Why a canvas
The learner sees the same table with three kinds of fault and changes how many of each there are. The wrong prices stay in the "missed" column however many tests pass, which prose says but a slider shows.

## Model
`testOutcome` in `data.ts`:

- failing tests = (duplicates > 0 ? 1 : 0) + (orphans > 0 ? 1 : 0), out of 3 tests (`unique` on report_id, `relationships` to dim_market, price above 0);
- bad rows flagged = duplicates + orphans;
- bad rows missed = wrong prices that look normal (above 0, so no test fails for them).

Inputs: duplicate report_id rows (0 to 40, step 2, default 10), rows with no market (0 to 40, step 2, default 4), wrong but normal prices (0 to 40, step 2, default 6).

Worked values:

| Duplicates | No market | Wrong prices | Tests failing | Flagged | Missed |
|---|---|---|---|---|---|
| 10 (default) | 4 | 6 | 2 of 3 | 14 | 6 |
| 10 | 4 | 0 | 2 of 3 | 14 | 0 |
| 0 | 0 | 6 | 0 of 3 | 0 | 6 |
| 40 | 40 | 40 | 2 of 3 | 80 | 40 |

Stats: tests failing, bad rows flagged, bad rows missed. Bars (scale 0 to 40): duplicates, no market, wrong prices (bad while above 0).

## Copy
- What this shows: which kinds of fault a test points at, and the kind that no test sees.
- Try this: defaults flag 14 of 20; wrong prices to 0 flags all 14; only wrong prices left makes all tests pass with 6 bad rows.
- What changed: `describeTestsChange` names which input moved, how many tests fail now, and whether wrong prices still pass.
- Limits: a simple illustration, one bad row per fault, a test points at every row of its kind, other faults and range tests exist.

## QA
Tests in `frontend/tests/unit/canvas/what-tests-catch.test.ts`: defaults, the try-this values, the all-zero and all-maximum corners, and the `describeChange` sentences. The registry test also checks that every corner of the model is finite.
