---
artifact: critique
course: data-engineering
scope: modules 7 to 9
reviewer: critic-a3 (drafting model family, separate blind agent)
review_type: pedagogy + continuity + technical
round: 1
---
# Critique A3, round 1 (modules 7 to 9)

## Scope and method

Modules reviewed: `07-transformation-as-code` (7.1 to 7.7), `08-late-data-and-backfills` (8.1 to 8.7), `09-orchestration` (9.1 to 9.6). That is 19 chapters, the 8 canvases they embed (`dbt-build-order`, `what-tests-catch`, `snapshot-sees-runs`, `late-data-lookback`, `dedupe-key-choice`, `schema-change-path`, `pipeline-dag-retry`, `retry-backoff-outage`: spec.md and data.ts each), and the 3 gates. I read the brief, the roadmap, `course.yaml`, the standards in `agent-ip/` and the research dossier. I did not open the context packs, the decision log, the run log or any other critique.

What I ran (read-only, in a scratch folder outside the repo):
- I copied the reference `make_source.py` (standard library only), generated seed 7 data for 28 days and for 16 days, and recomputed the numbers the chapters quote. All of these match: 7.1 (682.00 over 5 days = 136.40, 810.00 over 6 days = 135.00, bad row `r-001618`, 128 reports for M03 before 12 March); 8.1 and 8.2 (2,412 facts and 208 missing with a window of one day, 7 of 38 mart rows gone, 29 changed, 2 unchanged; 2,422/76/69/66 days late; 12/12/11 for M05); 8.3 (2,699, 2,623, 2,620, 2,589); 8.5 (35 lines, 35 distinct, 34 good in the 16-day data); 8.7 (M05 week 11 shows 1 full day instead of 3 with lookback 0); 9.1 (679 lines, 677 good, 2 bad).
- I diffed the test files printed in 7.5, 8.5 and 9.4 against the reference build (`test_dbt_project.py`, `test_late_and_backfill.py`, `day_by_day.py`, `test_runner.py`): identical.
- I ran `node agent-ip/scripts/audit-course.mjs courses/data-engineering`: 0 chapters need work; all 19 chapters in scope meet the prose minimums. I searched all module 7 to 9 chapters and canvas files for em and en dashes: none.
- I checked the model arithmetic of the slider canvases by hand and in `data.ts` (attempt times, lookback counts, test outcomes). The three `table-steps` and two `state-machine` canvases were read against their chapters.

What I could not run: dbt and DuckDB are not installed here and installing them is a download I was not asked to make. The dbt console blocks in 7.2, 7.3, 7.5 and 8.5 were therefore checked for internal consistency (for example `PASS=4 ERROR=1 SKIP=15 TOTAL=20` in 7.3 adds up and matches the node count of `stg_price_reports+`) and against REFERENCE.md, not executed. No canvas QA report exists in `qa/`, so canvas scoring rests on the specs, the data files and the registry entries. Instructor alignment is not scored: `curriculum-roadmap.md` says `g2b_signoff: pending` and no confirmation record exists. I note only that the chapter titles, outcomes and hours in modules 7 to 9 match the drafted roadmap line for line.

## Scorecard

| # | Dimension | Score | Note |
|---|---|---|---|
| 1 | Outcome alignment | 4 | Every chapter maps to O4 or O6. The runner backfill in 9.4 does not deliver the "repair a past range" part of O4 (S2-4). |
| 2 | Domain specificity | 5 | Every number I recomputed from the generator is right. Hala, Omar, M02, M05 and M03 carry real decisions in every chapter. |
| 3 | Depth over coverage | 4 | Mechanism, trade-off and failure case in each Learn chapter. 7.5 asks for too many new dbt features at once. |
| 4 | Prose quality | not scored: other lens | Sentences are short (average 13 to 15 words) and there are no dashes, but this is the slop critic's call. |
| 5 | Chapter structure | 4 | Hook, concept, decision, build, verify, reflect, bridge are all present. The same template repeats in all 8 Learn chapters (S4-7). |
| 6 | Interaction purpose | 4 | Predict before, canvas, quiz after in every Learn chapter. Several predicts give the answer away and one canvas is trivial (S3-9, S3-10). |
| 7 | Assessment quality | not scored: other lens | I note low transfer in some checks (S3-8) but did not run the assessment lens. |
| 8 | Difficulty calibration | 3 | First hands-on dbt contact is a 150-minute build, a hidden helper requirement in 8.5, and 9.4 needs Python beyond the entry prerequisites (S2-1, S2-2, S3-3). |
| 9 | Cognitive load | 4 | One hard idea per Learn chapter. 7.5 loads contract, unit test, macro, snapshot, incremental model and `var()` together. |
| 10 | Prerequisite integrity | 3 | Unit test YAML, contract YAML, `var()` and a macro are required before they are taught; 7.4 cites a "materialization" that 7.2 never introduces (S2-1, S3-1). |
| 11 | Technical accuracy | 3 | Dbt, DuckDB and SQL facts are right. Three commands the chapters tell the learner to run give a wrong or empty result (S2-3, S2-4, S2-5). |
| 12 | Production-grade coverage | 4 | Idempotent reruns, contract, quarantine, lookback, retries with backoff, run log, exit code, backfill and a schedule are all covered. |
| 13 | Security and integrity | 4 | Technical security advice only: secret kept out of SQL and files, quarantine kept in the restricted zone, `setx` not a repo file. Answer keys are out of my lens. |
| 14 | Accessibility | not scored: other lens | |
| 15 | IP protection | 4 | Build chapters give interfaces, constraints and full tests but not the implementations. |
| 16 | Variant distinctiveness | not scored: no variants in scope | |
| 17 | Continuity | 3 | Names, paths and numbers are very consistent with the reference. Two breaks in the chain of builds (S2-2, S2-3), repeated real-world events (S3-6) and small count mismatches (S3-5). |
| 18 | Learner agency and curiosity | 4 | The learner chooses a lookback, a key, a retry policy, and breaks things on purpose. |
| 19 | Instructor alignment | not scored: no confirmation record | `g2b_signoff: pending`. |
| 20 | Interactive canvas quality | 4 | Eight canvases, each with a stated claim, predict before, "what changed" and a transfer. Registered. Models for the sliders have unit tests. No QA report found; one canvas teaches almost nothing (S3-10). |
| 21 | Explanatory depth | 5 | Audit passes. Each Learn chapter has problem, mechanism, worked case, failure and "when to choose differently". |
| 22 | Visual explanation quality | 4 | Most diagrams argue (7.1 three copies, 7.3 gaps, 8.3 counts, 8.4 wider range, 9.3 decision flow). 9.1 and 7.2 mostly restate prose (S3-11). |

Average of the 17 scored dimensions: 66 / 17 = **3.88**. Four dimensions are at 3 (8, 10, 11, 17), so the 4.3 threshold and the "every dimension at least 4" rule both fail.

## Defects

### S1

None. I found nothing wrong in a way that is unsafe or that leaks a solution. The three problems closest to a blocker (S2-1, S2-2, S2-3) each have a short fix.

### S2

**S2-1. Chapter 7.5 requires dbt syntax that no chapter has shown.**
File: `07-transformation-as-code/07.05-build-dbt-project.md`. Quoted: "Now the unit test. It is named `weekly_basket_with_change_from_previous_week`...", "The contract on the fact table needs one list: `report_id` is varchar and not null...", "Read the basket size from the variable `basket_items`, with 12 as the default", "The macro is `macros/generate_schema_name.sql`. It overrides the macro of the same name in dbt...".
What is wrong: four pieces of syntax are needed and none is shown in 7.2 to 7.4 or anywhere else in the course: (a) the `unit_tests:` YAML (`model`, `overrides: vars`, `given: input/rows`, `expect: rows`); (b) the contract configuration (`config: contract: enforced: true`, `data_type`, `constraints: not_null`), which 7.3 describes in words and shows only as an error message; (c) `var('name', default)` in a model (7.4's incremental example uses a literal `2 days`); (d) a Jinja `{% macro %}` with `{%- if -%}` whitespace control. The unit test and the contract are both inside the 39 nodes of `PASS=39`, the macro decides whether `snapshots.snap_markets` exists at all (last acceptance test), and the learner is offline after the install.
Why it matters: the learner cannot reach `PASS=39` or pass the 13th test without outside documentation they do not have. It is a prerequisite that is used before it is taught.
Fix: in 7.3 add a 10-line contract YAML and a 14-line unit test YAML for Layla's shop (a different domain, as 7.3 already does for generic tests); in 7.4 change the incremental example to read the lookback with `var('lookback_days', 2)`; in 7.5 give `generate_schema_name.sql` in full, as boilerplate, next to `profiles.yml` (it is 7 lines and has no teaching value as an exercise). Optionally add one `InterestingRead` to the dbt documentation pages for later.

**S2-2. The helper in 8.5 needs `extract_registry.TABLES`, which no interface defines.**
File: `08-late-data-and-backfills/08.05-build-survive-the-mess.md`, code block `tests/day_by_day.py`: "for table in extract_registry.TABLES:". The helper is to be copied "as it is". The 6.5 interface (`06-batch-ingestion/06.05-build-incremental-ingestion.md`, section "The interface") defines `extract`, `read_watermarks` and `write_parquet` only. The reference module has `TABLES = ["markets", "volunteers"]`; a learner's own module will not, unless they happened to choose that name.
Why it matters: the `daily` fixture fails with an `AttributeError` for most learners, which errors the four tests that use it (the first four of the 12: the two comparisons with the big run, the M05 test and the duplicate-sends test), and they are the tests that carry the module's main claim. The traceback points into a file the chapter calls test code to copy unchanged. A beginner will lose time looking at their own code.
Fix: add `TABLES = ["markets", "volunteers"]` to the 6.5 interface text with one sentence ("the runner in 9.4 loops over it"), or make the helper loop over a list it defines itself.

**S2-3. After 8.5 the earlier landing test fails, and later chapters tell the learner to run the whole suite.**
Files: `05-files-and-storage/05.05-build-land-as-parquet.md` (`assert total == 2712  # every line the generator wrote, bad rows included (chapter 8.5 sends 13 of them to quarantine)`), `08-late-data-and-backfills/08.05-build-survive-the-mess.md` (no step edits it), `09-orchestration/09.04-build-scheduler-and-report.md` ("Run `pytest -q -m "not slow"` once for the whole project"), `11-quality-and-responsibility/11.05-build-checks-retention-ci.md` ("Run `pytest -q -m "not slow"` in your project. Everything from earlier chapters should pass before you add anything").
What is wrong: once landing quarantines, the restricted zone holds 2,699 rows, so `test_whole_lake_reads_back_with_hive_partitioning` fails. It is not marked slow. The reference build already changed this assertion (`assert total == 2699 and quarantined == 13`), but the course text never tells the learner.
Why it matters: the learner reaches the end of 9.4 and 11.5 with a red suite that the chapters say should be green, and CI in 11.5 would be red from its first run.
Fix: add a step in 8.5 ("Update `tests/test_land.py`") with the replacement assertion for restricted and quarantine counts, and add the line "the whole suite still passes" to the 8.5 expected output.

**S2-4. The runner's `backfill` and `run --date` cannot repair a past range, but 9.1, 9.3 and 9.6 present them as the backfill of 8.4.**
Files: `09-orchestration/09.04-build-scheduler-and-report.md` ("The task `dbt_build` calls `run_dbt("build")`", "To catch up on a range of dates, run the backfill command"), `09.03-retries-and-failures.md` (section "Backfills in an orchestrator": "Because every task is idempotent, running a date again is safe"), `09.01-set-the-scene.md` ("The backfill you met in chapter 8.4 becomes a command with a start date and an end date"), `09.06-checklist.md` (model answer: "Rerun: python -m pipeline.runner run --date 2026-03-12").
What is wrong: the runner's `dbt_build` runs a plain `dbt build`. The fact model reads reports from the newest staged report date minus `lookback_days` (7.5, 8.2). When the date being rerun is more than 3 days behind the newest data, the runner re-lands and republishes that day, but the fact table does not read it again, so nothing changes and nothing reports it. `scripts/backfill.py` from 8.5 passes `start_date` and `end_date` to avoid exactly this, and the reference `runner.py` has no equivalent. The two commands share a name and the course never says they differ. The scenario "a failure someone fixed later" in 9.3 and the "model bug", "stopped batch" and "dimension changed late" cases of 8.4 all need the second behaviour. The 9.4 example `backfill --start 2026-03-01 --end 2026-03-10` on the learner's finished 28-day warehouse is such a no-op.
Why it matters: this is the silent wrong-number failure that module 8 is built to prevent, and 9.6 asks the learner to write a runbook that sends a stranger to this command.
Fix, either: pass `--vars` with `start_date = run_date minus lookback` and `end_date = run_date` from the runner's `dbt_build` task (the task is idempotent, so a daily run is unchanged), and add a runner test that reruns an old date; or state the limit in 9.3 and 9.4 ("`runner backfill` catches up forward; to repair a date older than 3 days use `scripts/backfill.py`") and fix the 9.6 key and one quiz case accordingly.

**S2-5. The scheduled `daily` run at the end of 9.4 cannot succeed on the course data, and the chapter does not say so.**
File: `09-orchestration/09.04-build-scheduler-and-report.md`, sections "What you will have at the end" ("You will also have a scheduled task that starts the daily run") and "Schedule the daily run" ("The last line starts the task now, so you can see that it works before 06:00", "Check the log the next morning").
What is wrong: `daily` runs for yesterday in UTC (the learner's real calendar date). The generated data covers 1 to 28 March 2026, so `land` fails every morning with `FileNotFoundError: no batch files found...`, a permanent error, exit code 1. The only failures the chapter lists are `MissingKeyError` and a laptop that was off.
Why it matters: the module's final deliverable shows a red log line on the first manual run, and a learner will think the scheduler is broken.
Fix: say that `daily` is for a live feed; give the rehearsal: generate three days ending yesterday (`python make_source.py --days 3 --start <date> --out data`, option already in 1.4) and run `daily`, or schedule `run --date 2026-03-28` to prove the launcher starts. Show the expected `logs/runs.jsonl` lines for the chosen path.

### S3

**S3-1. 7.4 cites things 7.2 does not contain, and its incremental example anchors the window differently from Mizan.**
File: `07-transformation-as-code/07.04-snapshots-and-incremental-models.md`: "You turn it on with the `incremental` materialization from chapter 7.2". Chapter 7.2 says "Each model can be built as a view or as a table" and "A third choice, the incremental model, is the subject of chapter 7.4"; the word "materialization" and `config(materialized=...)` appear first in 7.4 with no definition. In the same chapter the example filter reads "`select max(ordered_date) from {{ this }}`" (the target table), but 7.5 and 8.2 anchor on the newest date in staging ("from the newest day in the data"). The two anchors give different results: with a lookback of 0 the target-anchored filter still re-reads the last loaded day, so the "window of one day" numbers in 8.1 and 8.2 (2,412 facts, 76 caught) would not reproduce for a learner who copies the 7.4 pattern.
Fix: define "materialization" in 7.2 in one sentence, show `config(materialized='table')` there, and use `(select max(...) from {{ ref('stg_orders') }})` in the 7.4 example with a sentence on why.

**S3-2. The problem of module 8 is solved before it is posed.**
Files: `07.05-build-dbt-project.md` ("The window is set by the variable `lookback_days`, which is already in your `dbt_project.yml`. Its value is 3"; `on_schema_change` set to `fail`; the `UNION ALL BY NAME` hint) and `08.01-set-the-scene.md` ("In its first version, the fact table reads only the reports dated on the newest day"). The learner's own pipeline already has a 3-day window, so the 8.1 prediction ("none of the 35 reaches the fact table") is false for their project, and the module introduction ("A lookback window re-reads the last few days on every run" under "What you build in this module") is something they built a chapter earlier.
Fix: in 8.1, say plainly that the project from 7.5 already carries the window and that the story is the version without it; let the "Break it on purpose" step in 8.5 be the learner's own discovery, and tell the reader that this is why. Or remove the window from 7.5 (the 7.5 tests do not need it) and add it in 8.5.

**S3-3. Time and support for the three builds are not validated against a beginner.**
Files: 7.5 (150 min), 8.5 (150 min), 9.4 (135 min). In 7.5 the first dbt command the learner ever runs is the 150-minute build; no chapter before it has a dbt run, only paper tasks ("Try it on your data" in 7.2). The full test file takes about 1.5 to 2.5 minutes on the reference laptop and the reference notes an out-of-memory flake with 2 GB free, while learners have about 4 GB and phones for reading. 9.4 asks for custom exceptions, `try/except/else`, `subprocess`, `argparse` sub-commands and an HTML generator; none of these is in the entry prerequisites, and support drops from complete files (7.5) to interfaces only (9.4).
Fix: add a 20-minute first run at the end of 7.2 (Majd's two bakery models, a three-row seed, `dbt build`, break a `unique` test), tell the learner to use `-k` and `-x` while debugging in 8.5 and 9.4, add one worked 12-line skeleton of `run_task` showing the `try`/`except` shape (not the retry logic), and restate the three estimates after a pilot run.

**S3-4. Two different things are both called "the contract".**
Files: `07.03-tests-contracts-and-docs.md` (dbt model contract: names and types of one model's output) and `08.04-backfills-and-schema-evolution.md`, `08.05-...` (data contract: a YAML agreement with the producer, checked at landing, and `contract.py`). 8.4 even mentions the dbt contract ("The fact table keeps an enforced contract...") a few lines after introducing the data contract. Nowhere does the course say they are different tools at different points in the pipeline.
Fix: one paragraph in 8.4 with a small table: where it sits (input of landing versus output of one model), who owns it, what it stops.

**S3-5. Counts in module 8 do not reconcile for a careful reader.**
Files: `08.01-set-the-scene.md` ("In all, they hold 35 different reports"; "208 missing reports"), `08.02-event-time-and-late-data.md` (canvas: "35 of 35" outage reports caught, "211" late), `08.05-build-survive-the-mess.md` (34 good). In the data, 3 of the 211 late reports and 1 of the 35 outage reports are bad rows that go to quarantine, which is why 208 reach the fact table and why 34 is the test value. 8.5 explains the 35 versus 34 only after the test file.
Fix: one sentence in 8.2 after the lateness table ("3 of the 211, and 1 of the 35, are bad rows; landing quarantines them in 8.5, so 208 and 34 are the numbers that reach the fact table").

**S3-6. The same real-world events are reused across chapters.**
Files: `07.03-tests-contracts-and-docs.md` (England lost test results, spreadsheet limit) also appears in 1.3, 5.1 and 11.2; `08.03-duplicates-and-keys.md` (audit data site, several records) also appears in 2.3 and 6.3. The 7.3 and 8.3 slots could carry other events. The dossier lists seven sourced failure modes; the gene-name conversion, the unit mismatch and the clock that went backwards are unused.
Fix: 7.3 could use the unit mismatch (a contract checks types, and units are the thing a type check misses; it also supports the 8.4 warning about prices in agorot), and 8.2 could use the clock that went backwards in place of the 8.3 audit event, with 8.3 pointing back to 2.3.

**S3-7. The transient errors in 9.3 and the 9.2 canvas are not ones the learner's runner can produce.**
Files: `09.03-retries-and-failures.md` (table row "A read of the upload folder times out because the disk is busy | Transient"; text "The runner raises TransientError in one place") and canvas `pipeline-dag-retry` (step "land fails once with a timeout... waits 1 second"). The runner classifies one case only (`could not set lock` from dbt); `land` never raises `TransientError`. The canvas summary says the settings "come from the small runner built in chapter 9.4".
Fix: add one sentence to the table and the canvas note: "the runner as built classifies only the dbt lock; to retry a disk timeout, wrap `land_uploads` and raise `TransientError`". Or rename the canvas event to the lock.

**S3-8. Some checks have low transfer.**
Files: `09.05-quiz.md` Q1 reuses Zaid's five-task graph from 9.2, Q5 reuses the 12 March log with `135 rows` from 9.3; `08.06-quiz.md` Q1 is the same computation as the quiz in 8.2; retry arithmetic (attempt times) is a predict, a canvas, 9.3 Q1 and 9.5 Q2. A learner who read the chapter can answer by recall.
Fix: new graph in 9.5 Q1, a different date and failure in Q5, and drop one of the repeated arithmetic items.

**S3-9. Several predicts reveal the answer, and `allowRetry: true` makes two-option predicts self-solving.**
Files: `07.03` ("a wrong price that looks normal" is in the prompt), `08.04` (optional versus required field is stated), `09.01` ("her pipeline code is correct and all her tests pass"), `09.02` ("publish fails for good"). The predict is meant to expose a model; here the prompt contains it.
Fix: use three plausible options, or ask for a number the learner must compute.

**S3-10. The `what-tests-catch` canvas teaches nothing the prompt does not already say.**
File: `packages/learning-ui/src/canvas/what-tests-catch/data.ts`. `missed` equals the `wrongPrices` input and `failing` is the number of non-zero kinds, so two of three sliders never change the outcome that matters. The learner cannot discover a relationship; they can only watch a number repeat the predict. The 7.3 quiz and the gate then repeat the claim a third time.
Fix: change the inputs to toggles for which tests exist (unique, relationships, price above 0, a range check, a row-count check) and let the three fault kinds be fixed; the learner sees which added test would catch which fault. This also teaches the 7.3 "four places" decision, which is currently only prose.

**S3-11. Two diagrams restate the prose.**
Files: `09.01-set-the-scene.md` (the chain "Mon 16 Mar: deadline, no run" to "Wrong order once, lock error once" repeats the story above it) and `07.02-models-refs-and-layers.md` (the five-box layer chain). Fix: for 9.1 draw the manual routine (five commands with the wrong order and the lock) against the scheduled one; for 7.2 show `ref()` arrows with one two-parent model so it does not duplicate the canvas.

**S3-12. A constraint the last acceptance test enforces is hidden.**
File: `07.05-build-dbt-project.md`. The spec for `stg_price_reports` lists `unit` but not that the model must build when no file has a `unit` column. `test_snapshot_keeps_two_rows_for_m03...` generates 14 days, where no file has one, and fails at the end of a long run with a dbt error. The `UNION ALL BY NAME` hint is in "If you are stuck", after the fact.
Fix: state the constraint in the model notes.

**S3-13. 9.4 report test checks strings the spec does not state.**
File: `09.04-build-scheduler-and-report.md`. `assert page.count("Week 13") == 8 and "Week 9<" not in page` and `"http" not in page`. The spec says "Each row shows the week" and "no outside file". A learner who writes "Wk 13" or `<html xmlns="http://...">` fails.
Fix: state the label (`Week 13`) and that the text "http" must not appear anywhere in the page.

**S3-14. The provided case in the 8.7 gate is ambiguous.**
File: `08.07-checklist.md`: "Fares's pipeline runs every night and reads the last 1 day of visit dates". In this module "window of one day" means the newest day only (lookback 0, 8.1 and 8.2), but the mentor key assumes a lookback of 1 ("Tuesday is one day late and fits"). Two mentors would mark the same answer differently.
Fix: write "reads the visit dates from one day before the newest visit date (a lookback of 1 day)".

### S4

- S4-1. `07.04`: "about 1.7 seconds" for the whole build; `07.05` expected output shows `1.22 seconds` (1.7 s is the REFERENCE figure for an in-process `dbtRunner`). Use 1.22.
- S4-2. `07.02`: "six of the project's 13 nodes" is not explained (3 sources + 8 models + 1 snapshot + 1 seed); the console block in the same chapter says "of 39". One sentence.
- S4-3. Names serve different roles across chapters: Layla (online shop in 7.x, student in 8.7), Nabil (clinic in 7.3, student in 7.7, shop in 8.4), Majd (bakery in 7.2, school in 8.2), Fares (clinic manager in 7.x and 8.x), Mustafa (pharmacy in 7.6, 8.3 and 8.6), Rawan, Ammar. Fine as a pool, but a reader building a mental cast will be confused.
- S4-4. `07.05` says "The `pytest` run is marked `slow` in `pytest.ini`", but no chapter before 9.4 creates `pytest.ini` (11.5 creates the `[pytest]` block). Say "create `pytest.ini` with a `[pytest]` section" at the first use.
- S4-5. `08.05`: "keep these names and messages exactly, because the tests depend on them", but the tests import only `ContractError` (and match one message). Say which names are enforced.
- S4-6. `07.03` recommends unit tests for development and CI, not production, yet the runner's daily `dbt build` (9.4) runs the unit test every morning. Mention `--exclude-resource-type unit_test` for the runner.
- S4-7. All eight Learn chapters in scope use one template (opening story, concept, predict, canvas, event or example, "Where people go wrong", "When to choose differently", "Try it on your data", two quizzes, "Next"). It is predictable for second-language readers, which is good; vary the last two sections in a couple of chapters to avoid a template feel.
- S4-8. `09.02` and `09.03` say Airflow's "logical date" marks the start of an interval. For Airflow 3 the default cron timetable may not use data intervals; verify against the version in the dossier at G5.
- S4-9. PyYAML is used in 8.5 and the tests but only arrives as a dbt dependency (not pinned in 1.4's four-line `requirements.txt`).
- S4-10. `09.02` and `09.03` call Dagster an "optional stretch"; no stretch content exists. Either add a short optional task or drop the phrase. The modules also have no `InterestingRead`, which the standard asks for once per module.
- S4-11. The Mermaid blocks in all three modules have no text alternative.

## What works

- Every number I could recompute is correct, including some that look like invented illustration (the 2,412 facts, 7/29/2 mart rows, 682.00 and 810.00, the 128 M03 reports). This is why the stories land: Hala's wrong 135.00, M05's three silent days and the 679 lines in 9.1 are real counts from the build. Keep the practice of writing the story from the build.
- The Learn chapters teach decisions: when a CTE becomes a model (7.2), which place a rule goes (7.3), how often a snapshot must run (7.4), how long to wait for late data and what it costs (8.2), which key (8.3), accept or stop a batch (8.4), retry or stop and when to schedule (9.2, 9.3). Each has a near miss (the `DISTINCT * EXCLUDE (uploaded_at)` that leaves 2,623, the two changes between two snapshot runs, the UTC schedule that gives the report a day too old).
- The test-driven build chapters give complete acceptance tests with a reason for each test, real expected output, a "break it on purpose" step that makes a silent failure loud, and a committed-message suggestion. The 8.5 test that compares day-by-day runs with one big run is an excellent way to teach correctness under reruns.
- Canvases are narrow, honest and tied to a number in the chapter. `snapshot-sees-runs`, `late-data-lookback` and `retry-backoff-outage` each isolate one claim and state their limits.
- The gates are concrete. Each gives a strong and a weak model answer, a provided case for learners without a pipeline, and a rubric with a pass rule.
- Language is plain and short, jargon is defined at first use, and no dashes or tool attributions appear.

## Recommendation

**Revise.** There is no S1, but five S2 defects (S2-1 to S2-5) break the learner's path through the builds (a red suite after 8.5, a helper that fails on a missing name, unshown dbt syntax in 7.5, a backfill command that does not repair, a schedule that cannot succeed on the course data), and four dimensions are at 3. The fixes are small and mostly additive; none needs a new component. Re-review the changed sections of 7.3, 7.4, 7.5, 8.5, 9.1, 9.3, 9.4 and 9.6, the 6.5 interface and the 5.5 test, plus the `what-tests-catch` canvas if it is redesigned.
