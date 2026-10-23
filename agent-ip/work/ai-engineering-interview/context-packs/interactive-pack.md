---
artifact: context-pack
course: ai-engineering-interview
for: interactive-canvas-builder, chapter-writer
version: 1
---

# Interactive pass: canvases and a third check

The sponsor asked for more interactive elements in the course (2026-10-23). This pack adds 14 canvases (two per teaching module, the most `10-interactive-canvases.md` allows) and a third graded check in every teaching chapter. Read `writer-pack.md` in this folder first: its voice, hard rules (no em or en dashes, no company or model product names, no links), quiz and predict formats and option-length rules all still apply. Also read `agent-ip/10-interactive-canvases.md` (teaching contract, copy blocks, QA).

## Canvas list

| Slug | Chapter | Renderer | Claim |
|---|---|---|---|
| `llm-token-cost` | 2.2 | slider | Long context makes input tokens, not output tokens, the main cost. |
| `sampling-temperature` | 2.4 | slider | Temperature reshapes the next-word probabilities: low makes the top word almost certain, high spreads choice to unlikely words. |
| `rag-two-paths` | 3.2 | sequence | RAG has an offline indexing path and an online query path; quality problems usually start in the indexing path. |
| `chunk-size-overlap` | 3.3 | slider | Bigger chunks and more overlap keep facts whole but store more text; overlap only protects facts shorter than the overlap. |
| `adaptive-routing-cost` | 4.5 | slider | Routing easy questions away from retrieval saves most of the cost and latency when many questions are easy. |
| `judge-position-bias` | 5.4 | slider | A judge that favours the first answer inflates whichever answer goes first; scoring both orders and averaging cancels it. |
| `workflow-or-agent` | 6.4 | factor | Which design wins depends on how much you weight predictability, cost and latency against handling new cases. |
| `hitl-interrupt-resume` | 7.4 | sequence | An interrupt saves a checkpoint and waits; on resume the node runs again from its first line, so side effects before the pause repeat. |
| `mcp-tool-call` | 8.2 | sequence | MCP standardises how a host lists and calls a server's tools; it does not decide which calls are safe. |
| `indirect-injection-trace` | 8.3 | sequence | Text inside retrieved data can steer the model into a tool call; only a control outside the model stops it. |
| `async-concurrency-limit` | 9.2 | slider | A semaphore trades total time for staying under the provider's limit: time grows in waves of the limit. |
| `retry-backoff-jitter` | 9.4 | slider | Without jitter, every client retries at the same instant; jitter spreads the spike. |
| `trace-sampling` | 10.3 | slider | Head sampling drops most errors with everything else; tail sampling keeps every error for the same storage. |
| `serverless-vs-cluster-cost` | 10.4 | slider | Serverless is cheaper at low traffic and a fixed cluster at high traffic; the crossover depends on duration and memory. |

The slugs are already registered in `server/src/shared/canvas/slugs.ts` and `frontend/src/shared/canvas/slugs.ts`. Do not edit those, `frontend/src/canvas/registry.ts` or `frontend/tests/unit/canvas/registry.test.ts`: the orchestrator registers every canvas at the end. Until then the registry test reports a slug mismatch, which is expected.

## Building a canvas

Each canvas is a folder `frontend/src/canvas/<slug>/` with `data.ts` and `spec.md`. Name the export in camelCase (`llmTokenCost`) and state it in your report.

- **Sequence, factor:** follow `frontend/src/canvas/rag-hybrid-rerank/data.ts` and `weighted-matrix-two-offers/data.ts`. Four lanes at most; arrow labels at most 18 characters; lane names at most 8 characters and subtitles at most 10, so they fit a 375px phone. Factor: two or three options, three to five criteria.
- **Slider:** the new reusable renderer in `frontend/src/canvas/renderers/slider/` (read `types.ts` and `SliderCanvas.tsx`). `data.ts` exports a `SliderSpec` with one to four inputs (label at most 28 characters, a unit, min, max, step, default), a pure `compute(values)` returning one to three stats (formatted strings), up to four bars (non-negative, finite) and a one-sentence summary, and a pure `describeChange(before, after)` that says in words what moved and why. Keep the arithmetic in exported pure functions in the same `data.ts` (or a `model.ts` next to it) and test them in `frontend/tests/unit/canvas/<slug>.test.ts`: defaults, minimums, maximums, one edge case, and two `describeChange` sentences. Every corner of every input must give finite numbers (the registry test will also check this). Money and prices are the scenario's own example numbers, labelled as examples in `intro` and `limits`. No hex colours; tones only through `bar.tone` ("good", "warn", "bad") when the colour means something.
- **spec.md** for every canvas: slug, course and chapter, teaching claim, renderer, the model or formula with worked values at the default, the copy blocks, and QA notes (follow `frontend/src/canvas/retrieval-metrics-at-k/spec.md`).
- Run `npx vitest run tests/unit/canvas/<your test files>` and `npx tsc --noEmit` from `frontend/`.

## Placing a canvas in its chapter

In the chapter: a `predict` right before the canvas (move or replace the chapter's existing predict if it has one: at most one predict per chapter), then `<InteractiveCanvas slug="<slug>" />`, then four short labelled paragraphs in prose: **What this shows**, **Try this** (two experiments with the expected observation, matching the spec's `tryThis`), **What changed**, **Limits of the model**. Then a transfer `quiz` MCQ in a new context. The prose must still teach the claim without the canvas. Numbers in the chapter must match the canvas exactly.

## The third check

Every teaching chapter (stepType Learn) in your modules must end with two or three graded checks (quiz MCQ plus predict), and at most three assessments in total including any open question. Where a chapter has fewer than two graded checks after your canvas work, add a scenario MCQ that tests application of that chapter, placed after the concept it checks (not in "In the interview"). Follow the MCQ rules exactly: four options, one explanation per option, the correct option never more than about 10% longer than the longest wrong one, vary its position, facts not opinion. Answer each new key again from the options alone before you report.

## Validate and report

From `server/` with pnpm 10: `pnpm content:validate:source --course ai-engineering-interview` and `pnpm content:audit --course ai-engineering-interview` (0 errors, 0 warnings in your files). Grep your files for en and em dashes. Do not touch files outside your chapters and your canvas folders and tests. No git commands that change state.

Report: canvases built (slug, export name, renderer, test file and pass count), chapters changed, every new or changed graded item with its answer key, and anything you could not verify.
