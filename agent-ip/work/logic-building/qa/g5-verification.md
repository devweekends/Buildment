---
artifact: qa-report
course: logic-building
gate: G5 (partial; human review still required)
date: 2026-10-23
---

# Verification report: logic-building

## Structure
- 8 modules, 50 chapters, 806 minutes (about 13.4 hours) from chapter frontmatter, matching the roadmap and `estimatedHours: 13`.
- Graded items: 89 multiple-choice questions and 34 predictions. Open questions: 8 (warm-up prompts, gates 2 to 7 and the capstone). Canvases: 3.
- `content:validate:source --course logic-building`: 50 chapters, 50 OK, 0 failed.
- `content:audit --course logic-building`: 0 errors, 0 warnings.
- No em or en dashes in the course, the work area or the canvas code. No AI product or company names, no links.
- Modules 4 to 7 each have at least one "check the AI's answer" quiz question; the capstone gives three scenarios, each with a captured AI answer that holds one checkable problem.

## Blind answer-key review
All 123 graded items were extracted without their keys into two batches and re-answered by a separate review agent on a smaller model. The reviewer saw only the question and options, not the chapter or the keys. It is from the same model family as the drafters, so its agreement is not a fully independent check: a person should still re-answer the keys, or a sample of them, before publishing.

| Batch | Modules | Items | Matches with the key |
|---|---|---|---|
| A | 1 to 4 | 62 | 62 |
| B | 5 to 8 | 61 | 61 |

Items the reviewer marked medium or low confidence, and what was done:

| Item | Issue | Action |
|---|---|---|
| 3.1, 3.4, 3.5 predicts; 2.5 quiz 2; 5.2, 6.4, 8.2 predicts | The reviewer lacked the chapter context (the rule, grid, chart or story right above the question) | Checked in each chapter: the context is present; no change |
| 6.3 predict 2 | "Twisting words" against "only two choices" | Key matches; the chapter's example makes the twist explicit; no change |
| 6.6 quiz 3 | Depends on the five scam signs taught in 6.4 | Key matches; the wrong options are each ruled out in their explanations; no change |
| 3.3 predict 2, 3.6 quiz 4 | Answerable, but test the "reading a rule backwards" trap on purpose | Intended difficulty; no change |

## Canvases
- `frontend` canvas tests: 7 files, 87 tests passed, including the label-fit checks at phone and desktop widths. Frontend typecheck clean.
- The first drafts of `freelance-job-flowchart` and `job-application-status` used a 4-column grid; the registry test allows 3, so both were reshaped to 3 columns by 2 rows before the chapters were written.
- At 375px, the `freelance-job-flowchart` labels "yes" and "more time" sat side by side and read as one phrase, and in `job-application-status` the diagonal label "not invited" covered "send". The arrows were relabelled "agreed" and "no", and chapters 2.5 and 3.5 updated to match.

## Import and click-through
- D: had about 100 MB free and the Docker Postgres disk lives there, so the import used a throwaway PostgreSQL 16 on drive C (port 5441, database `buildment_logic`): migrations, seed, then `content:import --course logic-building` imported 8 modules, 50 chapters and 175 blocks.
- The web app ran from a copy of `frontend/` on drive C with its own dependencies (Turbopack refuses a `node_modules` junction that points outside the project).
- Signed in as mentee1@buildment.dev and enrolled from the catalog page. All 50 chapter pages returned 200 with no error text.
- Checked at 375px: the three canvases, chapter text, predicts and quizzes. Answered the 1.2 knowledge check correctly: graded, with every option's explanation shown.
- Two harness effects, not course problems: on `localhost` the shared browser held another app's `__Secure-` session cookie, which the API prefers, so client calls were unauthenticated (the test moved to 127.0.0.1); and coordinate clicks under the emulated phone viewport often missed, so the quiz answer was clicked at desktop width.
