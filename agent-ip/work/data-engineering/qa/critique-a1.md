---
artifact: critique
course: data-engineering
scope: modules 1 to 3
reviewer: critic-a1 (drafting model family, separate blind agent)
review_type: pedagogy + continuity + technical
round: 1
---
# Critique A1, round 1 (modules 1 to 3)

## Scope and method

Reviewed: the 19 chapters of `01-the-job-and-your-workspace`, `02-sql-joins-and-aggregation` and `03-sql-windows-and-plans`; the eight canvases they embed (`wrong-number-trace`, `batch-freshness`, `join-fan-out`, `null-average-trap`, `cte-steps`, `row-number-dedupe`, `moving-average-frame`, `index-or-scan`: `data.ts` and `spec.md`); the brief, the roadmap, `course.yaml` and the research dossier as the standard for facts. I did not open the context packs, the decision log, the run log or any other critique. The `qa/` folder listing showed a `blind-keys` entry; I did not open it.

What I ran (read-only, in a scratch folder outside the repository, with the pinned stack in `C:\de\venv`: Python 3.12.10, DuckDB 2.0.0, dbt-core 1.12.6, dbt-duckdb 1.11.0, SQLite 3.49.1):
- `node agent-ip/scripts/audit-course.mjs courses/data-engineering`: 0 chapters need work; modules 1 to 3 pass prose, component and diagram limits.
- I extracted every Python block from 01.04, 02.05 and 03.05 and compared it with the reference build: `make_source.py`, `check_setup.py`, `conftest.py`, `test_setup.py`, `test_drills_joins.py`, `index_experiment.py` and `test_drills_windows.py` are byte-identical to the reference files.
- I generated the seed-7 data from the chapter's own generator and ran the three chapter test files against the reference drills: 21 passed (9 + 5 + 7).
- I re-ran the SQL of every chapter in modules 1 to 3 against that data. Every quoted count and result reproduced (2,712 lines; 2,633 reports; 252 / 242 / 211 late counts; 3,053 join rows; 271.0 versus 135.5; 2,620 and 2,589; 38 weekly rows; 213 egg rows; the running totals; ROWS versus RANGE averages; the `market_history` result; the three warm-ups; the `price_log` match count of 1,983; the DuckDB plans including `Scanning Files: 1/28` and `Row Groups Scanned: 26 / 28`). I also ran `dbt --version` and `dbt parse` as in 01.04.
- I timed the 3.4 index experiment myself (see S2-1).
- I checked the dossier for the posting tallies, the install sizes, the version facts and the two real events.
- I scanned all 19 chapters and the 8 canvases for em dashes, en dashes and any non-ASCII character: none.
- I computed option length and correct-answer position for all 23 quiz questions: the correct option is longest in 3 of 23 (all by 0 to 1 characters), positions are 6/6/6/5 across the four slots. No answer-giveaway pattern.

Not done: I did not run anything on macOS or Linux or under Python 3.11, and I did not render the chapters or canvases in the reader (mobile width, keyboard, dark mode). Those points are marked below where they matter. The roadmap is still `g2b_signoff: pending`, so instructor alignment cannot be scored. No canvas QA report or course audit report exists in `qa/`.

## Scorecard

| # | Dimension | Score | Note |
|---|---|---|---|
| 1 | Outcome alignment | 4 | Every chapter serves an outcome and every outcome has a build, quiz and gate. The "explain why a query is slow" outcome is assessed only by plan text (S3-11). |
| 2 | Domain specificity | 5 | Mizan, its markets, its 2,712 lines and its numbers run through every chapter; nothing is generic. |
| 3 | Depth over coverage | 4 | Two SQL modules go deep on three traps and three window ideas. Chapter 3.4 tries to carry too much (S3-13). |
| 4 | Prose quality | 4 | Sentences average 13 to 15 words, no sentence over 40. Very readable for a second-language reader. Small repetition of intros (S4-2). |
| 5 | Chapter structure | 4 | Hook, mechanism, worked example, near miss, trade-off, build, verify are all present. The Learn chapters share one skeleton, which is consistent but predictable. |
| 6 | Interaction purpose | 4 | Predict, canvas and quiz are tied to one claim each. Two quizzes in a row at the end of five chapters break the "one quiz per checkpoint" rule (S3-7). |
| 7 | Assessment quality | 4 | Scenario questions with plausible distractors, balanced lengths and positions, useful per-option feedback. Two items test the arithmetic of a flawed toy rule (S2-1). |
| 8 | Difficulty calibration | 3 | Build time estimates look too low, tests are never written by the learner so support does not fade, and the entry repair path is empty (S3-8, S3-9, S3-10). |
| 9 | Cognitive load | 4 | One idea per section in most places. A 150-line fixture file pasted "without understanding" and the overloaded 3.4 add load (S3-9, S3-13). |
| 10 | Prerequisite integrity | 4 | Almost nothing is used before it is taught. Small gaps: how to run the SQL blocks, `HAVING`, `VALUES`, `UNION ALL` (S3-6, S4-8). |
| 11 | Technical accuracy | 4 | Every command, count and plan I ran was right. The only inaccuracy is the toy cost rule's magnitude (scored under 20) and two version-sensitive claims (S4-1). |
| 12 | Production-grade coverage | 4 | Seeded data, tests at fixture and drill level, boundary counts, time-zone handling. Right slice for SQL modules. |
| 13 | Security and integrity | not scored: other lens | Answer-key storage is the assessment lens. No secrets or real personal data in these modules. |
| 14 | Accessibility | not scored: other lens | I read canvas specs only; I did not test keyboard, contrast or phone width. |
| 15 | IP protection | 4 | No solution SQL is shown. The step list for d08 plus per-step row counts comes close to a full recipe (S4-9 notes the related diagram issue). |
| 16 | Variant distinctiveness | not scored: other lens | Not applicable to modules 1 to 3; the capstone scenarios are not variants. |
| 17 | Continuity | 4 | Numbers agree across chapters and with the reference. Story-level slips: "no tests" versus "checks pass", whole-day doubling versus a single market (S3-3, S3-4). |
| 18 | Learner agency and curiosity | 4 | Open loops (which number is right, which copy to keep) and predictions before reveals. Drills prescribe most decisions. |
| 19 | Instructor alignment | not scored: other lens | `roadmap-confirmation.md` does not exist; G2B is pending. |
| 20 | Interactive canvas quality | 3 | Seven of eight canvases are correct, small and tied to one claim. `index-or-scan` models the wrong magnitude and contradicts the chapter's own case (S2-1). No canvas QA report (S3-14). |
| 21 | Explanatory depth | 4 | Audit passes (1,293 to 1,739 prose words). Mechanism, worked example, failure mode and debugging path are present. |
| 22 | Visual explanation quality | 4 | Most diagrams argue (evaluation order, decision trees, the missing-day frame). 01.04 and 02.05 mostly restate steps; 03.05 contradicts its own text (S4-9). |

Average of the 18 scored dimensions: **3.94** (71 / 18). Below the 4.3 threshold, and two dimensions are at 3.

## Defects

### S1

None found. No command, count or plan in modules 1 to 3 is wrong, unsafe or broken in the environment I ran, and no solution is leaked.

### S2

**S2-1. The toy index cost rule contradicts the lesson's own case and real SQLite behaviour.**
- Files: `03.04-query-plans-and-indexes.md` ("Under the toy rule, an index costs 17.6 pages plus 3 pages for each matching row", predict explanation, the `index-or-scan` block, "the flip happens near 0.33 percent for 200 thousand rows"); `packages/learning-ui/src/canvas/index-or-scan/data.ts` (`PAGES_PER_MATCH = 3`, `percent` default 0.1, which is also the slider minimum); quiz in 03.04 ("Lama's table has 400,000 rows"); `03.06-quiz.md` last question ("A table has 500,000 rows ... exactly one of these four queries").
- What is wrong: the story case in 3.1 and 3.4 is 1,983 matches in 200,000 rows, which is 0.99 percent. Under the toy rule the index reads 17.6 + 3 x 1,983 = about 5,967 pages and the scan reads 2,000, so the rule says the full scan is cheaper for the very query that the chapter then fixes with an index. I measured it on the exact `price_log` that `scripts/index_experiment.py` builds (SQLite 3.49.1, best of 20 runs): the plain scan takes 8.3 ms and the indexed query 0.5 ms, about 16 times faster. For one market in eight (12.5 percent) I measured 8.9 ms without and 8.3 ms with the index, which is the real break-even zone. The toy break-even of 0.33 percent is therefore roughly 100 times too low, and the canvas default (0.1 percent, the slider floor) is neither the story case nor interesting.
- Why it matters: a fellow who tries 1 percent in the canvas learns that Yasmin's index is a mistake, then sees `SEARCH` in 3.5 and cannot reconcile the two. The "Limits of the model" sentence says the break-even must be measured, but the chapter never measures it, and two graded items (3.4 quiz 2, 3.6 question 5) grade arithmetic on the flawed rule.
- Fix: (a) add a timing step to `index_experiment.py` that prints best-of-5 milliseconds for the story query at 1 percent, for a market-only query at 12.5 percent and for a no-filter query, before and after the index, and quote those results in 3.4; (b) rebuild the cost rule so the 1 percent case sits on the index side and break-even lands near 10 to 20 percent (for example about 0.1 page per matching row plus a fixed cost), or drive the canvas from the measured shares; (c) set the canvas default to 1 percent; (d) rewrite the predict, the "Try this" items, the 3.4 quiz and 3.6 question 5 so that they ask for a decision (index or scan for this share) and not for a page count; (e) update `spec.md` and `index-or-scan.test.ts` with the new break-even.

### S3

**S3-1. Drills d07, d08 and d09 do not say which date they use.**
- File: `03.05-build-window-drills.md`, "Drill d07 ... on 2026-03-08", "Drill d08 ... For each market and ISO week", "Drill d09 ... each market's average price for each day". `02.05` d02 says "Use the report date"; d05 says "market and report date"; these three do not.
- Wrong: the `reports` view exposes both `reported_at` and `upload_date`. For d07, filtering on `upload_date = 2026-03-08` returns 7 rows (M08 missing) instead of the 8 the test expects; the learner sees a failing diff for a reason the spec never mentions.
- Fix: add "by report date (`reported_at`)" to each of the three drill paragraphs, and one sentence in the constraints section: "All dates in these drills are report dates, not upload dates."

**S3-2. Chapter 2.4 claims row counts find the wrong total, but its own example shows they do not.**
- Files: `02.04-ctes-and-readable-queries.md` ("The wrong total in Hala's table was visible in the row counts of the middle steps, and it was invisible in the final rows"; summary "a row count at every step finds a wrong total"); canvas `cte-steps` (summary: "Checking the row count at every step finds this"; step 7: "In this example every count has a reason").
- Wrong: the counts 10, 8, 6, 3 all have an explanation, yet the totals 25.5 and 7.5 are not baskets. What exposes the problem is the `items` column (2 and 1 instead of 3), which is a completeness check against an expected number, a different tool.
- Why: the chapter's central justification for named steps is stated one way and demonstrated another, so a learner may think that a clean count chain means a correct total.
- Fix: state two checks: counts between steps explain what was dropped; a per-group count against the expected number (3 here, 12 in the real basket) tells you whether a total is complete. Change the canvas summary and the sentence in "Where people go wrong" to match, and add the expected-items column to the final `SELECT`.

**S3-3. "No tests" in 1.1, "checks pass" in 1.2 and the canvas.**
- Files: `01.01-set-the-scene.md` ("There are no tests. Nothing counts the rows at each stage."); `01.02-what-a-data-engineer-does.md` ("the tested tables behind it", "She finds that the query is correct and its checks pass", the predict explanation "a passing test cannot clear a problem nobody thought to test"); canvas `wrong-number-trace` step 2 ("The query is right and its checks pass").
- Fix: either say in 1.1 that there are a few checks that do not count rows per day, or change 1.2 and the canvas to "its logic is right" and drop "tested" and "checks pass".

**S3-4. The doubling story affects all eight markets but the narrative follows only M02.**
- Files: `01.01` ("The line for M02, Sea Gate Market, now says 203.50 shekels"); canvas `wrong-number-trace` step 4 ("Tuesday's upload folder holds 198 rows ... 99 reports were uploaded that day") and `spec.md`.
- Wrong: the 17 March upload folder holds 99 lines for all eight markets (M02 contributes 12). If the whole day is stored twice, every market's weekly line rises by about half, and Omar's question about M02 alone becomes odd; the 1.1 predict ("a rise of about 50 percent at one market") also points to one market.
- Fix: either make the cause local to M02 (M02's batch resent: 24 stored lines against 12 uploaded) and change the numbers in the canvas, or say in 1.1 that all eight lines rose and Omar asked about M02 because he phoned it that week. The second option is the stronger lesson, because it makes the learner ask why every market moved together.

**S3-5. The model answer for module 1 uses a need of 36 hours that is never derived.**
- File: `01.05-checklist.md`, Salma paragraph: "The owner reads it at 08:00 and needs yesterday's sales complete. The files arrive by 22:00 ... a worst case of 24 hours plus 20 minutes ... that is enough for a need of 36 hours." The `modelAnswer` repeats it, and the school case says "so the need is 72 hours".
- Wrong: nothing in the facts gives 36 or 72, and the gap-plus-run rule from 1.3 measures from the start of a run, while the story has a file-arrival delay before the run. A learner copying the shape will invent a number.
- Fix: derive the need from the decision: "read at 08:00, files complete at 22:00, so data may be 10 hours old at reading; the nightly job gives at most 24.33 hours at its worst, which does not meet a 12 hour need, so the job must run after the files arrive". Make the school case derive its 72 hours the same way.

**S3-6. The chapters never say how to run the long SQL blocks.**
- Files: `02.02` (`show("SELECT count(*) ...")` for one-liners only), `02.03` (first `WITH sales ...` block), `02.04` ("You can paste it into your workbench, and `show` will print the three rows"), `03.03`, `03.04`.
- Wrong: the blocks are plain `sql` fences whose outputs are printed in `show` format. A multi-line paste into `python -i` fails on blank lines and indentation. The only working method (`show(open("...").read())`) appears for the first time in 2.5, "If you are stuck".
- Fix: in 2.2 add one short callout: save a query as `try.sql` and run `show(open("try.sql").read())`, or add a `run_file(path)` helper to `workbench.py`, and point to it from 2.3 and 2.4.

**S3-7. Two quizzes back to back at the end of five Learn chapters.**
- Files: 02.02, 02.03, 03.02, 03.03, 03.04 ("Check your understanding" holds two `quiz` blocks each, after an earlier `predict`).
- Rule: `03-authoring-standards.md` says at most one quiz at a checkpoint, and the anti-slop list names two high-effort interactions back to back. The audit allows three assessment interactions, so it does not catch it.
- Fix: keep the better question in each chapter and move the other to the module quiz (02.06 and 03.06 already cover the same ideas), or put the second question as a transfer item inside the chapter, away from the first.

**S3-8. Build time estimates look too low.**
- Files: `01.04` (`estimatedMinutes: 40`), `02.05` (75), `03.05` (75); `course.yaml` and the roadmap total (59 hours).
- Basis: 01.04 asks for a 41 MB install on a weak connection, a venv, three files (one of 211 lines), `dbt parse`, a first commit and three warm-ups. 02.05 asks for a 160-line fixture file, a 9-test file, a 5-test file and five drills, two of them multi-step CTE queries (d05, then d08 in 3.5 with d09, an optional plan script and the index experiment). For a beginner reading in a second language, on a laptop with power cuts, these are likely to take 60 to 100 percent longer. This is my judgement, not a timed trial.
- Fix: run a timed pass with a real beginner, then either raise the estimates (and the course total) or split 2.5 and 3.5 into two builds each (setup and tests, then drills), with a named safe stopping point after each drill.

**S3-9. Chapter 2.5 hands the learner a 160-line fixture file full of later-module code, and the learner never writes a test.**
- File: `02.05`, step 2 ("You do not have to understand every line yet"): `Project`, `built`, `load_everything`, `dbt`, `query`, and `CODE = [... "pipeline", "transform", "contracts" ...]` belong to modules 5 to 9. The chapter says "write the question down, write the check, then write the code" and "This is how you will work for the rest of the course", but in modules 1 to 3 every test is given in full and the learner writes only SQL.
- Why: it adds extraneous load now and removes the support-fading step that would let the learner author a check by module 3.
- Fix: ship a trimmed `conftest.py` in 2.5 (`REPO`, `run_cmd`, `source_data`, `con`, `run_sql`, `project` for the tests that use it) and add the rest in the chapters that need it. In 3.5, ask the learner to write one of the seven checks (for example the d07 tie test or the "plan stays a SCAN" test) from a stated rule.

**S3-10. The entry check has no repair path and the install has no offline or weak-connection fallback.**
- File: `01.04`: "Ask your mentor which refresher they recommend." and "If the connection drops, run the same command again."
- Wrong: the brief and roadmap promise "an entry check ... points anyone missing a prerequisite to a short repair path" and a fallback for fellows who cannot download (roadmap open decisions 3 and 4, both still open). For this audience the 41 MB install is the single point of failure for the whole course.
- Fix: name the repair path (for example three specific lesson links or a one-page list) and add a short box: "No internet window? Ask your mentor for the wheels folder and run `python -m pip install --no-index --find-links <folder> -r requirements.txt`", as the dossier says was tested. Resolve open decisions 3 and 4 with the instructors before G3.

**S3-11. The 3.5 build never measures time, although 3.4, the gate and the brief ask for it.**
- Files: `03.04` ("Time the query before and after, on your own machine"); `03.07` (Ruba "times the query three times"); `00-course-brief.md` production bar ("a query plan and a before and after timing"); `03.05` (`index_experiment.py` prints plans only).
- Wrong: the learner is told that `SEARCH` does not mean fast, then given no way to see whether it is. This is also the missing evidence for S2-1.
- Fix: as in S2-1(a). Keep timing out of the asserted tests (timings vary) and print it as information, with a sentence on what to expect (a clear drop for the story query, little change for the market-only query).

**S3-12. The tie-break decision is taught but never exercised on the data.**
- Files: `03.02` (BigWordAlert "Tie-breaker": "a test that passed today can fail tomorrow"; "Add a last sort column ... or accept that either copy is fine because the copies are identical"); `course.yaml` goal "choose how to break ties"; `03.05` d07 ("breaks ties by `market_code`").
- Wrong: no two sends of one report share `uploaded_at` in this data (0 of 79), so the dedupe tie never occurs, and d07 dictates the tie rule instead of asking for it.
- Fix: in d07 ask the learner to choose and write the tie-breaker and a one-line reason, and change the test to accept any tie order but require that the result is the same on two runs. Keep the dedupe tie as a short "what if" in the text.

**S3-13. Chapter 3.4 carries too many ideas for 35 minutes.**
- File: `03.04`: SQLite `SCAN` and `SEARCH`, how an index works, a toy page-cost rule and canvas, covering indexes and column order, DuckDB `EXPLAIN` and `EXPLAIN ANALYZE`, Parquet partition pruning and row-group statistics (a preview of module 5), a decision loop and a summary-table alternative. The DuckDB half cannot be run until the optional script in 3.5.
- Fix: move the DuckDB and Parquet plan reading into 5.2 or 5.3 where partitions and statistics are taught, and use the freed time for the measurement in S2-1 and S3-11.

**S3-14. No canvas QA report or audit report exists for these modules.**
- Folder: `agent-ip/work/data-engineering/qa/` holds only `blind-keys`. The scorecard rules require a spec and QA report to score canvas quality, and the gates require the audit report. I ran the audit myself (clean).
- Not verified by anyone: reader rendering, 375 px layout, keyboard use, dark mode, reduced motion for the eight canvases.
- Fix: add `canvas-qa.md` and `course-audit.md` to `qa/` before round 2.

### S4

**S4-1.** `03.05`: "The words are from SQLite 3.49.1, which is the version in Python 3.12" is true of the Windows 3.12.10 build the dossier used, not of every 3.12. And `03.04` says "The tests in chapter 3.5 look only for `SCAN` and `SEARCH ... USING INDEX`", while the test asserts `"SCAN price_log"` and `"SEARCH price_log USING INDEX idx_price_log_market_item"`, which fail on SQLite older than 3.36 that prints `SCAN TABLE`. Say "the version in the author's Windows Python" and make the test look for `SCAN` and `USING INDEX idx_price_log_market_item`.

**S4-2.** `01.01` and `03.01` both re-introduce "Hala is 26. She works part time". The roles of the example students and quiz people change: Salma is the student in 1.5 and the clinic worker in 2.7; Bilal runs a bakery in 1.3 and 2.6 and is the student in 2.7; Tamer is a battery logger (3.3), a solar shop (3.6) and an attendance freelancer (3.7); Reem is three different jobs. Introduce Hala once and give each recurring name one role.

**S4-3.** `LearningObjectives` uses `items=` in 01.01, 02.01 and `objectives=` in 03.01 and most later chapters. The web component accepts both; use `objectives` everywhere.

**S4-4.** `03-authoring-standards.md` asks for one `RealWorldEvent` and one `MustRead` or `InterestingRead` per module. Module 3 has no `RealWorldEvent`, and modules 1 to 3 have no `MustRead` or `InterestingRead`.

**S4-5.** `reference-build/mizan-prices/REFERENCE.md` says d09 returns "216 rows over all markets". The real drill, and the chapter, give 213. Fix the reference note.

**S4-6.** `02.05`: the file is `d02_items_never_reported.sql` but the question is items M02 did not report on one day. Rename to `d02_items_not_reported.sql` in the chapter and the reference.

**S4-7.** `null-average-trap` and `moving-average-frame` use a 0 to 1 range slider for a yes/no choice ("Missing as 0: 0 no, 1 yes", "PARTITION BY market: 0 or 1", unit empty), while 2.3 calls it "a switch". The canvas contract wants a visible label, value and unit for every control; use a toggle in the slider renderer if it has one.

**S4-8.** Words used without a line of explanation: `HAVING` (2.2 diagram text), `VALUES`, `UNION ALL` (2.3, 2.4), and `union_by_name`, `hive_partitioning` in `workbench.py` (2.2). One sentence each, or a "paste this, you meet it again in module 5" note.

**S4-9.** `03.05` says "Each drill reads the raw upload lines and does its own work. That is on purpose", then the diagram draws d06 into d08 and the text says "A mistake in d06 can therefore show up in d08". The drills are independent files; correct the diagram and the sentence. The diagram also draws only d08 into the seven tests.

**S4-10.** `03.04` says Parquet min and max statistics let a reader skip blocks and shows `Row Groups Scanned: 26 / 28`, while `05.02` shows an all-in-one file that skips nothing. The 2 skipped files are most likely those with no M05 rows (outage days), skipped by bloom filters or dictionary checks, not by min and max (all files span M01 to M08). Say which mechanism applied, or drop the figure.

**S4-11.** `03.03` predict ("3-row or 7-row average closer to the price on day 7") is answerable without the lesson. Replace it with a prediction about the first row of the second market without `PARTITION BY`, which is the real trap.

**S4-12.** `02.02` quiz 2, option 1 ("use an inner join so classes without absences stay") and `03.06` question 3, option 1 ("SCAN is fine: reading all 80,000 rows is the fastest way to find one student") are eliminated by anyone who read the paragraph above. Make them plausible (for example a left join with the condition still in `WHERE`).

**S4-13.** `01.04`: only Python 3.12.10 was tested (dossier open question), yet the text says "3.11 or later" and that numbers match "on any computer". On Ubuntu and Debian `python3 -m venv` needs the `python3-venv` package; add one line.

**S4-14.** `join-fan-out` uses ids `r-000141` to `r-000143`, prices 4.5, 8.0 and 12.0, and contact names Rana, Fadi and Salem, none of which exist in the data. The chapter admits it, but real-looking ids invite a lookup. Use `r-demo-1` style ids.

**S4-15.** `03.05` d09 names the column `moving_avg_7` and fixes a 6-row frame, which is the choice 3.3 warns about ("If the gap matters, fill the missing days first, or use a `RANGE` frame"). The gate asks about it, so it is deliberate; say so in the drill ("a rows frame on purpose, compare with `RANGE` in the gate"). Also `01.01` lists "A few have a price of 0 or no item code" and leaves out negative prices.

## What works

- **Reproducible numbers.** Every count I re-ran matched, including the awkward ones (211 / 242 / 252, 2,589 after the wrong partition, 3,053 join rows, the ROWS versus RANGE averages). The boundary-count habit (2,712 = 2,699 + 13) is taught early and reused.
- **Near misses that teach.** `LEFT JOIN ... WHERE` silently becoming an inner join (6 of 8 markets), `COUNT(DISTINCT)` and `SUM(DISTINCT)` as false repairs, `WHERE` before the window, a missing day under `LAG`, the default frame giving every tied line the same total. Each is shown with real output.
- **Decisions, not definitions.** Freshness as a number you ask for, "what does one row stand for", which copy to keep, ROWS versus RANGE by the question, scan versus search by share of rows picked. Each chapter ends with a trade-off and an alternative.
- **Build design.** Tests are the specification, written with real expected output, a "see it fail first" step and a "break it on purpose" step. The fixtures give each test its own copy of the data, so a learner's experiments cannot corrupt a test. Time-zone and Windows traps (short venv path, UTF-8 console, ASCII SQL files) are handled before they bite.
- **Honest limits.** The postings tally is labelled a sample, the toy index rule is labelled a toy, the job promise is hedged, and the real public incidents are short and sourced.
- **Gates.** Strong, weak and middle answers are modelled for a specific case, with a rubric a second reviewer can apply and a mentor follow-up question.
- **Language.** Short sentences, jargon defined at first use, a plain-English key-words table in each opener, and several mentions of working in short sessions between power cuts.

## Recommendation

**Revise.** There is no S1, but one S2 (the index cost rule, which teaches the wrong magnitude and contradicts the chapter's own measured case) and fourteen S3 defects, two dimensions at 3 and an average of 3.94 against the 4.3 threshold. The fixes are contained: correct the model and add a timing step (S2-1, S3-11), tighten four story and spec details (S3-1 to S3-5), add the missing "how to run this" and repair-path text (S3-6, S3-10), and trim the 2.5 fixture file and chapter 3.4 (S3-9, S3-13). Re-review the changed sections, the `index-or-scan` canvas, 02.04, 03.04, 03.05 and the three gates.
