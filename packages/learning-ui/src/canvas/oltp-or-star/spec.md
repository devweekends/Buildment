---
artifact: canvas-spec
course: data-engineering
chapter: 04.02-oltp-and-olap
slug: oltp-or-star
version: 1
owner: chapter-writer
renderer: factor (weighted sum, shared weight controls)
---

# Canvas spec: Which design fits which job?

## Teaching claim
The app's normalised tables win for fast single-record changes and no repeated data; a star schema wins for simple, fast reporting and history. Which one comes out ahead depends on the weight you give each need, and the winner flips when the weight on report queries goes up.

## Why a canvas
"It depends on the job" is easy to say and hard to feel. Changing one weight and watching the leader flip shows that the answer comes from the need, not from the design.

## Model
- Options: normalised app schema; star schema.
- Criteria (score 1 to 5): quick single-row updates (normalised 5, star 2); no repeated values (5, 2); simple report queries (2, 5); keeping history (2, 5).
- Weight levels: 1 nice to have, 2 important, 3 very important. Start weights: updates 2, no repeated values 1, report queries 1, history 1.
- Rule: total = sum of weight x score. Start totals: normalised 19, star 16.
- Worked values: report queries 3 gives normalised 23, star 26 (flip); report queries 2 gives 21 and 21 (tie); report queries 1 and updates 3 gives normalised 24, star 18; all weights 1 gives 14 and 14 (tie).
- Assumptions: scores are teaching judgments for Mizan's tables.
- Limitations: real projects often keep both designs; a small gap means both are reasonable.

## Rendering
Shared `factor` renderer: two options, four criteria, three weight levels.

## Copy
- What this shows: two designs scored on four needs; each weight multiplies the scores.
- Try this: raise report queries to very important; set it to important and read the tie; raise updates and lower reports.
- What changed: the factor renderer's sentence names the weight changed, the points that moved and whether the leader changed.
- Limits of the model: as in `limits`.

## Accessibility
Shared factor renderer: weight buttons at least 44px tall, totals shown as text.

## Acceptance criteria
- [x] The winner flips when the weight of report queries goes from 1 to 3.
- [x] Predict before (4.2 predict), transfer after (4.2 quiz, 4.6 quiz).
- [x] Totals checked by hand: 19 and 16; 23 and 26; 21 and 21; 24 and 18.

## Build plan
`packages/learning-ui/src/canvas/oltp-or-star/data.ts`; the orchestrator registers it in `registry.ts` and `slugs.ts`.
