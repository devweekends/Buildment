---
artifact: qa-report
course: ai-engineering-interview
gate: G5 (partial; human review still required)
date: 2026-10-22
---

# Verification report: ai-engineering-interview

## Structure
- 12 modules, 79 chapters, 3,135 minutes (52 hours) from chapter frontmatter, matching the roadmap and `estimatedHours: 52`.
- Graded items: 84 multiple-choice questions and 35 predictions. Open questions: 24 (gates, build repo links, capstone). Canvases: 4.
- `content:validate:source --course ai-engineering-interview`: 79 chapters, 79 OK, 0 failed.
- `content:audit --course ai-engineering-interview`: 0 errors, 0 warnings.
- No em or en dashes in the course, the work area or the canvas code. No company, cloud vendor or model product names. The only URLs in chapters are localhost addresses in build steps.

## Blind answer-key review
All 119 graded items were extracted without their keys into three batches and re-answered by a separate review agent (routing.yaml). The reviewer saw only the question and options, not the chapter. It is a smaller model but from the same model family as the drafters, so its agreement is not a fully independent check: a human should still re-answer the keys, or a sample of them, before publishing.

| Batch | Modules | Items | Matches with the key |
|---|---|---|---|
| A | 1 to 5 | 48 | 48 |
| B | 6, 7, 8, 11, 12 | 44 | 44 |
| C | 9, 10 | 27 | 27 |

Items the reviewer marked medium confidence or ambiguous, and what was done:

| Item | Issue | Action |
|---|---|---|
| 5.3 quiz | The chunk said "opens at 8 am on weekdays", so a Friday claim could read as contradicted, not unsupported | Chunk changed to "opens at 8 am" with no days; explanation updated |
| 9.1 predict | The answer assumed one shared worker pool without saying so | Prompt now says the service shares one pool of 8 workers across all pages |
| 9.7 quiz 5 | "Which is right?" did not state the question the options answer | Now asks whether the request is within budget and about what it costs |
| 10.5 predict | Option labels started "B, ..." and "A, ...", which clashed with the reader's own lettering | Labels and prompt rewritten without letters |
| 6.2, 7.1, 7.4, 8.1 predicts | The reviewer lacked the chapter context (code or story right above the question) | Checked in the chapter: the context is present; no change |
| 4.6 quiz 5 | Medium confidence only; one distractor mildly tempting | No change |

## Build chapters
Each build chapter was run by its writer against a reference implementation in a scratch Python 3.12 environment (pytest 9.1, FastAPI 0.159, Pydantic 2.14, httpx 0.28, LangGraph 1.2.16). The reference code is not in the course or the repository.

| Chapter | Passing run | Failure mode shown |
|---|---|---|
| 1.4 | 3 passed | Removing `pythonpath` gives ModuleNotFoundError |
| 3.5 | 20 passed | Removing the `min_score` check fails 1 test |
| 5.5 | 15 metric tests passed; `pytest -m eval` 3 passed | `HashingEmbedder(dim=16)` fails 2 eval tests |
| 7.6 | 9 passed | Calling `issue_refund` above `interrupt()` fails 5 tests (refund paid twice) |
| 9.6 | 13 passed | Removing the semaphore fails the concurrency test (6 in flight, limit 2) |
| 12.2 | 6 passed on a capstone reference | Changing the chunk size breaks a golden label |

The 10.2 MLflow snippet was run with MLflow 3.17.2 and the 10.3 OpenTelemetry snippet with opentelemetry-sdk 1.45.1. An instructor still needs to run the build chapters on a clean laptop (roadmap open decision 2).

## Canvases
- `frontend` canvas tests: 7 files, 81 tests passed, including the label-fit checks at phone and desktop widths and new model tests for `retrieval-metrics-at-k`. Typecheck and lint clean.
- `agent-react-loop` was first built on the state machine renderer. In the reader at 375px its six states made edge labels overlap the states, so it was rebuilt on the sequence renderer (Model, App, Tools, Lead lanes) and the chapter copy updated.
- Lane subtitles on the three sequence canvases were shortened after they overflowed their lanes at 375px.

## Import and click-through
- Docker Desktop would not start on this machine (Docker Desktop 4.95.0, "sailor-ingest.sock" bind error on every launch), so the scratch import used a throwaway PostgreSQL 16 (portable binaries in the session scratchpad, port 5440) with the database `buildment_aicourse`: `db:ready`, `db:seed`, then `content:import --course ai-engineering-interview` imported 12 modules, 79 chapters and 155 blocks.
- API and web ran on ports 4510 and 3510. Signed in as mentee1@buildment.dev and enrolled from the catalog page.
- Answered the 1.2 knowledge check correctly at 375px (graded, with every option's explanation shown) and the 2.5 quiz with question 1 wrong on purpose at desktop width (score 4 of 5, the wrong option marked with its explanation). The proctored quiz notice appeared as expected.
- Checked 375px light and dark, and desktop light and dark: chapter text, tables (scroll inside their own box, no page-level sideways scroll), Mermaid diagrams, predicts, the k slider canvas (keyboard: k 3 to 5 gives recall 0.50, precision 0.40, and the matching "What changed" sentence), the three sequence canvases, and the question banks.
- All 79 chapter pages returned 200 with no render error text.
- Coordinate clicks inside the proctored quiz at an emulated phone size opened the curriculum drawer instead of selecting an option. This looks like a test-harness effect of the emulated viewport, not a course problem, but it is worth a check on a real phone.
