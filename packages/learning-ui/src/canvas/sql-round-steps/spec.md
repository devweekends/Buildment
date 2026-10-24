---
artifact: canvas-spec
course: data-engineering
chapter: 12.02-the-sql-round
slug: sql-round-steps
version: 1
owner: chapter-writer-f
renderer: sequence (HTML controls, inline SVG lanes)
---

# Canvas spec: A strong SQL answer, step by step

## Teaching claim
A strong answer in a SQL round has a fixed order: clarify the grain, NULLs and ties; say the plan; write the query in named steps; test it on a tiny hand-made example that includes a tie, a NULL and an out-of-range row; explain the cost. Code comes third, not first.

## Why a canvas
The order is the lesson. Stepping through a short exchange between an interviewer and a candidate shows what each person says and when, and lets the learner predict the candidate's first move before it is revealed.

## Model
- Actors: Interviewer (Khalil) and Candidate (Mais).
- Case: a bakery chain's `sales(branch, product, sold_on, qty)`; the best-selling product per branch in March, ties shown, qty may be NULL. Eight rows: North (khobz 120 and 80, maamoul 200, zaatar roll NULL), Centre (khobz 150, maamoul 90, khobz 500 on 1 April), South (khobz 70 in February). Expected answer: North khobz 200 and maamoul 200, Centre khobz 150, South none (NULL with a left join from the branches table).
- Steps: question; clarify; rules; plan; query in steps; tiny test; cost; follow-up; answer to the follow-up. Nine steps, arrow labels at most 18 characters.
- The query and the eight rows are worked in chapter 12.2 and were run in DuckDB 2.0.0.
- Assumptions: a friendly interviewer who answers questions.
- Limitations: real rounds vary in pace and style.

## Rendering
Shared sequence renderer: two lanes, nine steps, good tone on the tiny test and on the edge answer, each with a text badge.

## Copy
- What this shows: the order of moves in a strong SQL answer, with who speaks at each step.
- Try this: predict the candidate's first move; change rank to row_number in your head; find which question leads to the missing-branch edge.
- What changed: each step note says what the candidate has secured by this point.
- Limits: as in `limits` in `data.ts`.

## Edge cases
Steps 4, 5 and 6 are loops on the candidate lane; the interviewer lane never loops.

## Accessibility
Shared stepper keyboard support and focus ring; the `summary` describes the whole exchange; tones always carry a text badge.

## Acceptance criteria
- [x] The claim is testable: the 12.5 drills ask for the result of a query on a small table and for the first clarifying question.
- [x] The data is checked by the registry test (lanes, label lengths).
- [x] Predict before (12.2), transfer after (12.2 quiz, 12.5 drills).

## Build plan
`packages/learning-ui/src/canvas/sql-round-steps/data.ts`, to be registered by the orchestrator in `registry.ts` and `slugs.ts`.
