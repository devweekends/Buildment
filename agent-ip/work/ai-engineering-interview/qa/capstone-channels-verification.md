---
artifact: qa-report
course: ai-engineering-interview
scope: capstone channels, learner-built UI and variant picker
date: 2026-10-24
---

# Verification: multi-channel capstones and the variant picker

## Acceptance tests in chapter 12.2

A scratch reference implementation (a Nakhla Systems corpus: 6 documents, 24 chunks, 31 golden items, 7 of them raw emails) was built from chapters 3.5, 5.5, 7.6, 9.6 and 12.2 in a Python 3.12 virtual environment (pytest 9.1.1, FastAPI 0.162.0, httpx 0.28.1, LangGraph 1.2.17). The reference code is not in the course or the repository. The test files were copied exactly from the chapter; only the two constants marked as the learner's were set.

| Run | Result |
|---|---|
| The four earlier capstone test files | 6 passed |
| `test_capstone_channels.py` and `test_capstone_ui.py` | 13 passed |
| All six capstone test files | 19 passed |
| Full `pytest -q` | 79 passed |
| `pytest -q -m eval` | 5 passed, 74 deselected |
| Quote rules removed from `FakeEmail.receive` | 2 failed, 6 passed (both quote cases) |
| Chunk size 60 to 120 | 1 failed, 1 passed (missing golden chunk) |

The first review of the tests found gaps that were fixed in the chapter before this run: the reply test did not check the source list, a bare `>` quote was not tested, `question` and `raw` could disagree (now one `question_text` helper), and the 404 route, the log rule for decisions, the inbox rule and the per-message approval id were unstated. `Message` gained a `message_id` field. Out-of-scope golden items (an empty `relevant` list) are still not allowed by `test_capstone_data.py`; that is a pre-existing limit, not changed here.

Not checked: the UI checklist against a real page (the reference page only proved the HTTP contract), and a reference risky-tool approval through `/approvals`.

## Platform

- Server unit and script tests: 339 passed. Frontend unit tests: 519 passed. Typecheck and lint clean for both apps (one existing warning in an untouched file).
- `content:validate:source`: 79 of 79 chapters OK. `content:audit`: 0 errors, 0 warnings. `audit-course.mjs`: capstone flags left are the existing prose lengths of 12.4 and 12.5; 12.1 now has a diagram.
- Scratch database (portable PostgreSQL 16, port 5441): migrations, seed and `content:import` gave 12 modules, 79 chapters and 218 blocks.
- Variant picker click-through as a seeded learner: all eight cards at 375px and desktop, light and dark; no sideways scroll at 375px; lowest text contrast measured on the cards 4.77:1 in light and 6.06:1 in dark (small text needs 4.5:1). Choosing Nakhla Ops saved the pick, and the course home showed it.
- The capstone chapters were not opened in the reader, because a fresh learner reaches them only after the earlier chapters; their MDX compiled in validation and import.
