---
artifact: critique
course: data-engineering
scope: modules 4 to 6 (04-data-modelling, 05-files-and-storage, 06-batch-ingestion)
reviewer: critic-a2 (drafting model family, separate blind agent)
review_type: pedagogy + continuity + technical
round: 1
---
# Critique A2, round 1 (modules 4 to 6)

## Scope and method

I read all 21 chapters of modules 4, 5 and 6, `course.yaml`, the brief, the roadmap, the dossier, `REFERENCE.md` and the reference source and tests, the nine canvases these modules embed (`data.ts` and `spec.md`), and the standards in `agent-ip` (03, 04, 06, 10). I did not read context packs, the decision log, the run log, any other critique, or the contents of `qa/blind-keys`.

What I ran. All of it in scratch copies outside the repository; nothing in the repository was edited.

- `node agent-ip/scripts/audit-course.mjs courses/data-engineering`: "Needs work: 0". Prose in modules 4 to 6 is 1,328 to 1,782 words per chapter (855 to 913 per gate, 0 in the quiz chapters); assessment interactions are at most 3.
- Rebuilt the reference with seed 7 and 28 days (DuckDB 2.0.0) and re-ran every number the chapters quote that I could reach: 3,271 and 2,491 rows (4.1), the flour-by-area table (4.2), the 30-row week-by-area result and week 11 (4.3), the 20/9/22 and 11/22 flour counts and 128/199 M03 split (4.4), the canvas report ids and prices (4.3, 4.4), `parquet_metadata()` bytes, plan lines, row groups 2,048 and 664 (5.2), the 28/222/8/1 file counts, `Scanning Files` lines and codec sizes (5.3), 692, 668 and 829 lines (6.1), the 4 March totals and the three DuckDB write modes (6.3), the HMAC example key (6.2), the watermarks (6.4, 6.5), and the daily row counts (5.5). All matched, except where a defect below says otherwise.
- Extracted the test file of 4.5, 5.5 and 6.5 from each chapter and diffed it against the reference. 4.5 and 6.5 are identical; 5.5 differs only by the documented pre-8.5 assertion. I ran 4.5 (8 passed), 5.5 against my own plain implementation (8 passed) and 6.5 (18 passed). I also mutated the reference to test what the tests can see (see S3-2 and S3-3).
- Re-derived the arithmetic of all three factor canvases and the slider and table-step data by hand. Totals in `data.ts`, `spec.md` and the chapters agree.
- Counted quiz option lengths and positions for all 33 quiz questions of the three modules.
- Counted sentence lengths in the prose (mean 14.7 words, 6.4 percent over 25 words, none over 40) and searched for em dashes, en dashes, forbidden phrases, placeholders and attribution (none found).

Not reviewed: how the reader renders MDX (`node_modules` is not installed, so `content:validate` could not run), accessibility of components, answer-key storage, and instructor alignment (G2B is still pending and no confirmation record exists).

## Scorecard

| # | Dimension | Score | Note |
|---|---|---|---|
| 1 | Outcome alignment | 4 | O3, O4 (rerun, incremental) and O5 each have a build, a quiz and a gate; the date dimension claim in 4.3 has no evidence (S3-5). |
| 2 | Domain specificity | 5 | Every concept runs on Mizan's real counts; all numbers I re-ran were right. |
| 3 | Depth over coverage | 4 | Small scope, taught with measurements; conformed dimensions and snowflakes in 4.3 are extra but flagged "only the idea". |
| 4 | Prose quality | not scored: other lens | Readability data in the method; no slop patterns found by search. |
| 5 | Chapter structure | 4 | Hook, mechanism, near miss, trade-off, build, verify and a bridge are present in every chapter. |
| 6 | Interaction purpose | 3 | Six of the 12 predicts restate the paragraph above them, and two factor canvases teach "it depends" by construction (S3-1, S3-10). |
| 7 | Assessment quality | 4 | All 33 quiz keys re-answered and correct, every option explained; one wrong predict key (S2-1); "never the longest" pattern (S4-5). |
| 8 | Difficulty calibration | 4 | Support fades well from 4.5 to 6.5; 6.5 is under-timed (S3-9) and 4.5 lacks two syntax hints (S3-4). |
| 9 | Cognitive load | 4 | One idea per chapter; 6.5 asks for three new modules at once. |
| 10 | Prerequisite integrity | 4 | `REFERENCES`, date generation and `os.replace` are used before they are taught (S3-4); everything else secure. |
| 11 | Technical accuracy | 4 | Commands, DuckDB 2.0 behaviour and numbers verified; the averages claim in 6.1 is wrong (S2-1). |
| 12 | Production-grade coverage | 4 | Idempotent landing, secrets kept out of files, watermark ordering, run log, documented limit tests. |
| 13 | Security and integrity | 4 | The secret never reaches disk or SQL and a test scans for it; HMAC choice explained; reviewed only the content, not the platform. |
| 14 | Accessibility | not scored: other lens | Not reviewed. |
| 15 | IP protection | 4 | Builds give interface, constraints, full tests and real output but no implementation; 6.5 pins the HMAC recipe because the tests need it. |
| 16 | Variant distinctiveness | not scored: not applicable | No variants in scope. |
| 17 | Continuity | 4 | Cross-references (1900-01-01, try_ folders, `land_day`, zones, quarantine) are accurate; one stale test across modules (S2-2). |
| 18 | Learner agency and curiosity | 4 | Gates ask the learner to defend a choice with numbers; strong and weak model answers are shown. |
| 19 | Instructor alignment | not scored: G2B pending | No roadmap confirmation record exists. |
| 20 | Interactive canvas quality | not scored: no canvas QA report | Specs, data and arithmetic are sound (provisional 4), but `qa/` holds no canvas QA report (S3-14). |
| 21 | Explanatory depth | 5 | Mechanism, worked example with real numbers, failure and near miss, and trade-off in every Learn chapter; audit clean. |
| 22 | Visual explanation quality | 4 | About ten of 14 diagrams argue (4.1, 4.4, 4.5, 5.2, 5.3, 6.2, 6.4); four restate the prose (S3-11). |

Average of the 17 scored dimensions: 69 / 17 = **4.06**. One dimension is at 3 (interaction purpose), so a revision and re-score is required; the average is below the 4.3 threshold.

## Defects

### S1

None. I found nothing wrong, unsafe, broken or leaking at blocker level. The build tests pass against a plain learner implementation, the secret handling is correct, and the commands I ran work on Windows.

### S2

**S2-1. A predict key and its explanation say that duplicate rows leave an average unchanged. For Hala's table that is false.**
File: `courses/data-engineering/06-batch-ingestion/06.01-set-the-scene.md`.
Quoted: "Omar's numbers look normal, because every extra line is an exact copy of a line that was already there, and an average of the same number twice is that number." The predict asks "After the second run, what happens to the average for M05?" with `correctOptionId: same` and the explanation "Adding every value twice also doubles the count, so the average does not change."
What is wrong: that is true only when every value in the average is doubled. Hala's table repeats only the lines of one day (12 March) inside a week. I recomputed the mean price per market for upload dates 9 to 15 March on the seed-7 data, with and without repeating the 135 good lines of 12 March. M08 moves from 12.566 to 13.125 (+4.5 percent), M03 from 12.388 to 12.025, M05 from 12.186 to 12.239. The reference itself records this: `REFERENCE.md` section 3, "the naive version without [dedupe] gives different weekly numbers for some markets, because a repeated send ... skews the average".
Why it matters: the key is auto-graded, and a learner who answers correctly in the real world ("it changes a little") is marked wrong. The chapter then teaches that duplicates are invisible to averages, and 6.3 builds on that idea. The true lesson is stronger: averages move by an amount small enough to look plausible, so only counts and totals are a reliable alarm.
Fix: change the predict to something that is exactly true (for example "After the second run, what happens to the number of rows for 12 March?" or "which check would have caught it: the average, or the count?"). Rewrite the sentence to "the averages shift by a few percent, in either direction, which still looks normal; the row count for the day jumps from 137 to 274". Keep 6.3's whole-day example (300 to 600 rows, average 21.50) as it is; there the table really is doubled.

**S2-2. A test handed over in 5.5 fails later, and no chapter says so.**
File: `courses/data-engineering/05-files-and-storage/05.05-build-land-as-parquet.md`, test `test_whole_lake_reads_back_with_hive_partitioning`: `assert total == 2712  # every line the generator wrote, bad rows included (chapter 8.5 sends 13 of them to quarantine)`.
What is wrong: chapter 8.5 changes `land_uploads` to return and write only good rows (`08.05-build-survive-the-mess.md`, "Keep `land_uploads(upload_date) -> int`, which now returns only the good rows"). After that change the lake holds 2,699 rows, so the 5.5 assertion fails. 8.5 never tells the learner to edit `tests/test_land.py`, and `11.05` step 1 says "Run `pytest -q -m "not slow"` ... Everything from earlier chapters should pass before you add anything". The reference test was already changed to `total == 2699 and quarantined == 13` and `REFERENCE.md` section 5 documents this exact break.
Why it matters: a previously green test turns red three modules later with no instruction, in the chapter that is about trusting tests. CI in 11.5 would be red from its first run.
Fix: in 8.5, add a step "edit the last assertion of `test_whole_lake_reads_back_with_hive_partitioning` to expect 2,699 landed and 13 quarantined" and print the two replacement lines (they are in the reference). In 5.5, add one sentence after the test file: "You will change the last assertion in chapter 8.5." The code comment already hints at it; the instruction is what is missing.

### S3

**S3-1. Predicts often restate the paragraph above them, so the learner confirms instead of predicting.**
Files and quotes:
- `04.01`: the section "What goes wrong in the joins" says "a report made on 5 March, when M03 was still in Harbour, is counted in Hill". The predict then asks "Which area does a report of M03 made on 5 March get?" (answer Hill).
- `04.03`: the text says "you can never split a total back apart"; the predict asks whether flour can be read back from a daily total.
- `05.02`: "To get three columns, the engine reads three blocks and ignores the other seven"; the predict asks how much a column layout reads for 3 of 10 columns.
- `06.02`: the text says the second copy is built "with the personal columns replaced"; the predict asks what the shared copy holds, and the distractor "since the team is trusted" is not plausible.
- `06.03`: "Only the first one doubles the data on a rerun." is the sentence immediately before the predict "200 rows and 100 rows".
- `06.04`: "The run reads no rows." is in the paragraph directly above the predict "How many rows does the run on 23 March read?"
- `05.04`: the predict offers warehouse or lake. The real contest (lake leads lakehouse by 1 point) is not an option, so a learner who reads "cheap, open formats" gets it right with no thinking.
Why it matters: the playbook says Predict is for "a committed prediction before an explanation" and warns against obvious answers. Moving the explanation above the question removes the productive failure the block exists for.
Fix: for each, put the predict before the revealing paragraph, or ask for a number the learner must work out (for 4.1, "how many of M03's reports from 1 to 11 March will Harbour show: 0, 128 or 327?"; for 6.3, "how many rows after three runs of each mode?"; for 5.4, include the lakehouse and ask which design leads). Keep 4.2, 5.3 and 4.4, which do ask the learner to work something out.

**S3-2. The 4.5 "If you are stuck" hint names a cause that does not produce its symptom.**
File: `04.05-build-star-schema.md`: "If the count is 2,620 and `test_m03_facts_follow_the_market_when_it_moved` fails, the dates are right but the end of the range is wrong by one day."
What is wrong: I mutated the reference loader two ways. An off-by-one end (`<= valid_to`) makes some reports match both versions and the load stops with a primary key error, so the count is never 2,620 and all eight tests error. Choosing the market version from `uploaded_at` instead of `reported_at` (a likely beginner mistake, since the folder name is the upload date) gives exactly the quoted symptom: 2,620 rows, 7 tests pass, only the M03 test fails.
Why it matters: the learner is sent to the wrong line of SQL at the point where support is meant to help most.
Fix: replace the sentence with the cases that really give it: "check that you take the date from `reported_at`, not `uploaded_at` or the folder name, and that you converted with `timezone('UTC', ...)` first". Move the end-of-range hint to the "above 2,620" case, where it belongs.

**S3-3. `test_every_fact_matches_exactly_one_market_version` can never fail, and the chapter says it guards against two things it cannot see.**
File: `04.05`, the test and its paragraph in "Why each test exists": "It looks for facts that match more than one row, and it must find none. ... This guards against a dimension with a repeated key and against a load that multiplies or loses reports."
What is wrong: the test joins on `m.market_key`, which is the primary key of `dim_market`, so a fact can match at most one row; a fact that matches none disappears from the `GROUP BY`, so `HAVING count(*) <> 1` is empty by construction. I confirmed it: with every fact pointed at the current market version, this test still passes and only the M03 test fails. The primary key and the final `== 2620` assertion do the real work. The chapter admits the "wrong version" blind spot but not that the `HAVING` clause is vacuous.
Why it matters: it teaches a test shape that looks protective and is not, in the module about trusting counts.
Fix: use a `LEFT JOIN` from the fact to the dated condition and count facts where `count(m.market_key) <> 1`, so a fact whose key points at a version not valid on its date is caught; or replace the test with that check and drop the "repeated key" claim. Then the gate question 4 ("one test cannot see a fact that points at the wrong market version") becomes a real question about M06 only.

**S3-4. 4.5 uses SQL it never taught, in a chapter whose learners work offline.**
File: `04.05`, "The task" and "The constraints". The schema must declare "the primary key and the foreign keys"; `dim_date` must have "one row for every calendar day from the first to the last report date" with a weekday name.
What is wrong: `REFERENCES` (foreign keys), a date series (`generate_series` or `range`) and a weekday function (`dayname`) do not appear in modules 1 to 3 (I searched). `PRIMARY KEY` and `strftime` do. The three-step hint ladder mentions a window function and a temporary table but none of these.
Why it matters: the brief promises "every practical step runs offline". A learner without a connection cannot look the syntax up, and in a 100-minute build this is where people stall.
Fix: add one hint: a two-line example of a column with `REFERENCES dim_date (date_key)`, and the names `generate_series` and `dayname` (or tell the learner they can run `SELECT function_name FROM duckdb_functions() WHERE function_name ILIKE '%series%'` offline). Both fit without handing over the loader.

**S3-5. The promised benefit of the date dimension is never exercised.**
Files: `03.03` ("Chapter 4.3 introduces a date table ... a missing day becomes a row with a NULL price"), `04.03` ("a missing day is a row with no facts and not a missing row"), `04.05` (28 rows).
What is wrong: every one of the 28 days has reports, so a loader that takes `SELECT DISTINCT CAST(reported_at AS DATE)` passes all eight tests and builds no gap-filling calendar. Nothing in 4.3 shows the join that fixes the 3.3 gap problem either.
Why it matters: the learner is told the date table solves the missing-day problem and never sees it do so.
Fix: add one short worked query in 4.3 (a `LEFT JOIN` from `dim_date` to the facts of one market, showing a day with 0 reports) and one test in 4.5 that deletes a day's facts in a temporary copy, or checks a market-day with no facts (M05 on 11 March has none), and still finds a `dim_date` row.

**S3-6. Code blocks in 5.2, 5.3, 5.4 and 6.3 are not runnable as written, and the order of cleanup conflicts with the next chapter.**
Files and quotes:
- `05.03`: four blocks use `con`, `source` and `pathlib` that only the first block defines, and nothing says to keep one Python session or one file. Run separately, the later blocks raise `NameError`.
- `05.03`: "It writes into folders that start with `try_`, so delete them when you finish." (and again in "Try it on your data"). `05.04`: "She uses the folder `try_by_day` that she wrote in chapter 5.3", and its query reads `try_by_day/*/*.parquet`. A learner who deleted the folder as told gets "No files found".
- `06.03`: the script's first `COPY ... PARTITION_BY` fails with `IO Error: Directory "try_rerun" is not empty` on any second run, because it does not clear the folder. That is the same error the chapter later shows as a lesson, so a learner who simply reruns after a typo will think the demo is broken.
- None of these chapters says how to run a block (a file, `python -i workbench.py` from 2.2, or the REPL).
Why it matters: the module's own method is "every claim comes with a command you can run".
Fix: say once at the start of each such chapter "paste the blocks into `tmp/try_it.py` and run them in order", make the 5.3 script delete its `try_` folders at the top (`shutil.rmtree(..., ignore_errors=True)`), make 5.4 rebuild what it needs or tell the learner to keep `try_by_day` until the end of 5.4, and add the same `rmtree` to the 6.3 script.

**S3-7. A Windows console crash in 5.2 is not covered, and the fix has no syntax.**
File: `05.02-rows-columns-and-parquet.md`. The note "If your console cannot print the table, set `PYTHONUTF8=1` first" sits before the `parquet_metadata()` block. The next block, `print(con.execute("EXPLAIN SELECT ...").fetchone()[1])`, also prints box-drawing characters. With `PYTHONUTF8` unset I reproduced `UnicodeEncodeError: 'charmap' codec can't encode characters`. 5.5 repeats the note without syntax; the PowerShell and bash forms are only given in 3.5.
Why it matters: most learners are on Windows, and this stops the first Parquet experiment.
Fix: set the variable once in 1.4 for the whole course (`PYTHONUTF8=1` in the venv activate script or the setup check), or repeat both shell forms in 5.2 and mention that both blocks need it.

**S3-8. Gate time estimates contradict the gates' own text.**
Files: `05.07` ("Plan about forty minutes for the note, and write it in two passes") with `estimatedMinutes: 30`; `06.07` ("Do the two runs before you write a word", at least 150 words, four log answers, five checklist items); `04.07` (at least 120 words and four log answers).
Why it matters: 30 minutes must cover the checklist, the learning log, the note and the mentor follow-up. A learner on a phone with power cuts will see the estimate as wrong and the course as behind schedule.
Fix: set each gate to 45 or 60 minutes and adjust the roadmap hours (they sum to 59 hours now), or shorten the log to two questions and keep 30.

**S3-9. The 6.5 build is under-timed for its scope.**
File: `06.05-build-incremental-ingestion.md`, `estimatedMinutes: 120`.
What is wrong: three new modules (about 200 lines in the reference), 18 tests, a failure-injection test that needs the writer replaced and a Windows-safe folder name, in the same time as 5.5, which is one 40-line job and 8 tests (100 minutes). The chapter gives interfaces and an order, which is good, but no code.
Why it matters: learners who fall behind here carry the gap into module 7.
Fix: either raise it to about 180 minutes and say "do the log and `publish_reports` in one sitting, `extract` in a second", or give `runlog.py` in full (31 lines in the reference, pure plumbing) and keep 120.

**S3-10. Two factor canvases teach "it depends" by construction, and one conflates two separate decisions.**
Files: `packages/learning-ui/src/canvas/oltp-or-star/data.ts` and `lake-warehouse-lakehouse/data.ts`; `04.02`.
What is wrong: the scores (for example "Keeping history: normalised 2, star 5") are the author's judgment, so the flip when a weight changes is guaranteed, and the learner learns the arithmetic, not why a lake scores 1 for safe updates. In 4.2 the "history" score and the table "star schema with history" make history look like a property of the star shape; 4.4 itself shows that a star with a type 1 dimension forgets, and a normalised design can keep history with dated rows. A learner may repeat "star schemas keep history" in an interview.
Why it matters: "Could a learner spend ten minutes moving controls and still fail to state the claim?" Here they can state it and still not own the mechanism.
Fix: give each score a one-line reason that appears in the canvas (why the warehouse scores 1 on open formats), and in 4.2 state plainly that history comes from a type 2 dimension, which is a separate choice, so the star score for history is "5 only if you build type 2". Keep the weights.

**S3-11. Four diagrams restate the paragraph next to them.**
Files: `05.01` (two linear rows that repeat the story), `05.05` (a five-box flow "input, land_uploads, temporary file, swap, lake", introduced with "The diagram shows the order of the job"), `06.01` (a chain that retells the incident, introduced with "Read it as a chain"), `06.05` (two arrows into the shared zone that the previous paragraph states). The standard says "If it only restates the paragraph above it, cut it."
Fix: cut them, or make each argue: for 5.5 show the two failure points (before and after the swap) and what each leaves on disk; for 6.1 mark where a check on counts would have caught it; for 5.1 put the file count and open cost on the arrows.

**S3-12. The module 5 hook claim cannot be reproduced, against the module's own promise.**
File: `05.01-set-the-scene.md`. The central claim is a 1,000-file partner folder (254,399 bytes, 252 to 257 bytes each) that is slower than one file with the same lines, and "The folder is slowest the first time she reads it, and a little quicker after that." The same chapter says "every claim comes with a command you can run on Mizan's data".
What is wrong: no command is given. I rebuilt it from the first 1,000 lines of the uploads; the byte counts reproduce exactly (254,399; 255,398 with LF) and the first folder read took 2.7 s against 0.2 s for later reads and 0.01 to 0.17 s for the single file. So the claim is true, but the learner cannot see it, and the "first read is slower" is never explained (operating system file cache), which leaves an open question.
Fix: add a 10-line optional script (split the lines into `try_tiny/`, time both reads, and note that timings vary), and one sentence on the first-read effect. Keep timings out of any graded key, as the dossier requires.

**S3-13. External claims have no pointer or date.**
Files: `04.03` ("Kimball advises avoiding snowflakes"), `05.03` ("DuckDB's documentation gives guidance ... row groups of 100,000 to 1,000,000 rows ... under 5,000 rows ran 5 to 10 times slower"), `05.02` (Parquet gives no ratios), `06.02` (Recital 26), `05.04` (Iceberg, Delta), `06.04` (Debezium).
What is wrong: the dossier has the sources (S23, S88 to S97, S103 and others) but the chapters name none, give no link and no "checked on" date. `03-authoring-standards` asks for a version and where to check current docs for tools, and "Note the access date for fast-moving documentation". No chapter in modules 4 to 6 has a `MustRead` or `InterestingRead`.
Why it matters: fellows and mentors cannot check the one statement a client or interviewer will challenge. The DuckDB benchmark in particular is "theirs, on their hardware" and is version-bound.
Fix: add one "Where to check" line per Learn chapter (name of the page, DuckDB 2.0 docs, checked 24 October 2026); a link is fine because it is optional reading.

**S3-14. No canvas QA report exists for the nine canvases.**
Location: `agent-ip/work/data-engineering/qa/` holds only `blind-keys`. `critic.md` and `06-quality-gates.md` (Canvas QA checklist) require a spec and a QA report before dimension 20 can be scored. The specs are present and their acceptance boxes are ticked, and I confirmed the model arithmetic, but mobile, keyboard and console checks are not evidenced.
Fix: write `qa/canvas-qa.md` with the checklist result per slug before G5.

### S4

**S4-1. Names.** "Karam" (owner of the registry app) and "Karim" (a quiz and gate persona in 5.4, 5.6, 6.3, 6.7, and the volunteer V10 Karim Odeh) differ by one letter, which is hard for second-language readers. "Hiba" is both the school teacher in the 4.7 gate and volunteer V07 Hiba Tamimi, the person whose phone changes in 6.4. Rename the personas.

**S4-2. `04.01` "Two of the five arrows are the dangerous ones."** The section above lists three problems, on arrows 2 (registry markets), 3 (history) and 4 (volunteers). Say "three" or explain why arrow 2 is excluded.

**S4-3. `04.03` "Each dimension row has a surrogate key, which is an anonymous integer".** In 7.5 the keys are text hashes (4.5 and 7.5 say so). Write "an anonymous key (integers in the prototype)".

**S4-4. `04.06` Q1.** "300 appointments appear twice" is stronger than the facts: 300 extra rows could be 100 appointments appearing four times. Say "300 extra rows, so some appointments are counted more than once".

**S4-5. Quiz keys.** Across the 33 quiz questions of modules 4 to 6 the correct option is never the longest (chance of that is about 0.01 percent), while it is the shortest in 10. The length rule is met, but "drop the longest" is now a free elimination. Let one or two keys be the longest by a few characters.

**S4-6. `06.02` "We found no source that says so."** This is the dossier's voice leaking into the lesson. Write "No primary source ranks them, and the choice is a trade-off."

**S4-7. `06.05`.** (a) "The commands print these lines" lists four lines but five commands print (the `land` line is missing). (b) `test_second_extract_picks_up_exactly_the_v07_phone_change` orders the V07 rows with `sorted(...)`, which sorts by the hash value first; it passes only because the fixed test key puts the old key first (the plain SHA-256 sabotage in "A failure to try on purpose" fails it for that reason, as well as for the two reasons shown). Sort by `updated_at`.

**S4-8. `05.05`.** "Search the DuckDB documentation for the function that converts a timestamp with a time zone" conflicts with the offline promise; `timezone('UTC', ...)` is already used in 2.2, 2.5 and 4.5, so name it. The narrative "no connection from 9 to 11 [March]" also differs slightly from 5.3 and the data: M05 has no upload on 9 and 11 March but one late line from 7 March arrives on 10 March.

**S4-9. Placement.** In 4.1, 5.1 and 6.1 the `BigWordAlert` is the first thing on the page, before the story that gives the word a reason, and the same terms are then repeated in a "Key words" table. Put the card where the word first matters.

**S4-10. Phone width.** The `parquet_metadata()` table in 5.2 is 79 characters wide and several `text` result blocks exceed 70. They will scroll sideways on a phone. Print fewer columns.

**S4-11. Budget.** The per-module budget lists one `RealWorldEvent` and one `MustRead` or `InterestingRead`. Module 4 has no real-world event, and no module has a reading. If this was deliberate for weak connections, log it.

**S4-12. `05.03` "At Mizan's size, the best layout for speed is no partitions at all".** It is an unmeasured speed claim in a chapter that, like 4.2, says not to claim speed without measuring. Say "probably the fastest; time it".

## What works

- Every number I could re-run was right: the 3,271 and 2,491 fan-out and loss, the 35 versus 24 Harbour flour reports, 128 and 199 for M03, the 3,637-byte file, the 28/222/8/1 file counts, the 692 and 829 weekly lines, the 6.3 write-mode results, the HMAC example key. Chapters were written from real runs.
- The build tests match the reference, and the 5.5 and 6.5 tests accept a natural learner implementation. The deliberate sabotage sections (primary key refuses the fan-out; snappy instead of zstd; plain hash instead of HMAC) show real failing output, which teaches what each test watches.
- Support fades sensibly: 4.5 gives a runner and tests, 5.5 gives paths and an interface, 6.5 gives interfaces and an order with fewer hints.
- Each Learn chapter has a near miss tied to a real decision: join on the code alone, a fuzzy grain, statistics that skip nothing in unsorted data, a partition by arrival date that answers the wrong question, a watermark that cannot see a delete. The documented limit test for V11 is the best example of honest teaching in the three modules.
- Gate chapters give a strong and a weak model answer, a table of Met, Partly and Not yet per part, a pass rule, a worked case with checkable arithmetic (43,200; 576 and 210,240; 360 lines and 8,641.00) and a stated follow-up step.
- Canvases follow the contract: one claim, a prediction before, a "what changed" sentence, and a transfer quiz. The factor and slider arithmetic is correct.
- Plain English: mean sentence length 14.7 words, no dashes, no forbidden phrases, and terms defined at first use. Cross-chapter references (1900-01-01, quarantine in 8.5, zones, `land_day`) are accurate.
- The 6.4 chapter separates what is cited from what is reasoned (clock skew), as the dossier requires.

## Recommendation

**Revise.** There is no S1. Two S2 defects must be fixed before publish: the averages claim in 6.1 (a wrong key that teaches the wrong lesson) and the 5.5 test that goes red in 8.5. One dimension (interaction purpose) is at 3 and the average is 4.06 against 4.3. Most S3 items are cheap: the predict reorderings (S3-1), the 4.5 hint and test (S3-2 to S3-4), the runnable-snippet fixes (S3-6, S3-7) and the gate and build timings (S3-8, S3-9). After they are fixed, a re-review of 4.5, 6.1, 6.3, 6.5 and the predicts should reach the thresholds.
