---
artifact: critique
course: data-engineering
scope: modules 10 to 13
reviewer: critic-a4 (drafting model family, separate blind agent)
review_type: pedagogy + continuity + technical
round: 1
---
# Critique A4, round 1 (modules 10 to 13)

## Scope and method

Read in full: the 24 chapters of `10-streaming-and-scale`, `11-quality-and-responsibility`, `12-interview-preparation` and `13-capstone`, the nine canvases they embed (`partition-offsets`, `delivery-guarantees`, `one-machine-or-cluster`, `volume-check-threshold`, `hash-is-not-anonymous`, `ci-blocks-bad-change`, `sql-round-steps`, `modelling-round-steps`, `design-round-choice`: `spec.md` and `data.ts`), the brief, roadmap, `course.yaml`, the dossier, and the reference build `mizan-prices` (`REFERENCE.md`, source, tests). I did not read context packs, the decision log, the run log or other critiques.

Checks I ran (all read-only on the repository; scratch work was done in `C:\de-critic`, outside the repo):
- `node agent-ip/scripts/audit-course.mjs courses/data-engineering`: modules 10 to 13 show no flags (prose 806 to 2,571 words, components at most 4, diagram in every concept chapter).
- Dash scan (U+2013, U+2014) over the 24 chapters and 9 canvas folders: none. No attribution, no TODO text.
- Option-length and position audit of every quiz and predict in modules 10 to 13: no 10 percent warning, correct positions spread (quiz 0 to 3 all used; predicts 7 of 13 in slot 1). No defect.
- Installed DuckDB 2.0.0, dbt-core 1.12.6, dbt-duckdb 1.11.0 and pytest 9.1.1 in a venv at a short path. Re-ran: the 10.2 toy log script (output identical to the chapter), the 10.3 plain and keyed sink SQL and the transaction (5 rows / 3 rows, rollback keeps 3, as stated), the 10.4 `EXPLAIN ANALYZE` (83.7 kB, 9 / 9 row groups, 32 MB file, `1.8 GiB` limit: all as stated), the 11.2 daily counts (12 March 137 against 93.1, 24 March 94 against 97.6, 28 March 111 against 96.6: as stated), the 11.3 V07 query (V07, 2 codes), the 11.4 plans (`Scanning Files: 1/28`, no such line for `market_code`), the 12.2 query on the eight hand-made rows (output and the left join with `South` as stated), and the whole 11.5 run (`run_all`, retention dry runs, the 24 March break and restore: outputs match). The 11.5 and 13.x test code blocks match the reference `test_checks_retention.py`, `ci.yml` and `conftest.py` line for line.
- There is no capstone reference build in the repository. To test the 13.2 and 13.3 acceptance tests I adapted the Mizan reference (a `capstone.yml`, a 12-line `scripts/demo.py`, README and RUNBOOK headings, two renamed generator labels) and ran the extracted `conftest.py`, `test_capstone_pipeline.py` and `test_capstone_quality.py`: 15 passed in 181 s. The test design is sound. I also repeated the 13.2 "Break it on purpose" edit (see S3-7).

Not scored here: dimensions that belong to the slop or assessment lenses, and Instructor alignment (no `roadmap-confirmation.md` exists, so it cannot be scored; the deviations I found against the unconfirmed roadmap are in S2-3).

## Scorecard

| # | Dimension | Score | Note |
|---|---|---|---|
| 1 | Outcome alignment | 4 | Every chapter serves O7 to O9; evidence exists for each. O7 has no hands-on (acceptable per roadmap). No Python round, stated honestly in 12.1. |
| 2 | Domain specificity | 4 | Numbers are Mizan's and verified. Water delivery is reused in five chapters under four names (S3-12). |
| 3 | Depth over coverage | 4 | Streaming is kept to three ideas plus a decision. Good restraint. |
| 4 | Prose quality | not scored: other lens | Observation: average sentence about 14 words, longest 40; plain English throughout. |
| 5 | Chapter structure | 4 | Hook, mechanism, trade-off, where people go wrong, try it, check, bridge in every Learn chapter. |
| 6 | Interaction purpose | 3 | Five predict blocks restate what the paragraph above just said (S3-1); several canvases are good, but see S3-2 to S3-6. |
| 7 | Assessment quality | not scored: other lens | Observation: S2-4 (untaught item) and S3-18 (weak items). |
| 8 | Difficulty calibration | 3 | Capstone is a cliff in time and scaffolding (S2-2), the aid scenario needs untaught skills (S3-11). Modules 10 to 12 are well calibrated. |
| 9 | Cognitive load | 4 | One hard idea per chapter. Name churn adds load for second-language readers (S3-12). |
| 10 | Prerequisite integrity | 3 | `NOT IN` with NULL graded but never taught (S2-4); SQL snippets with no way to run them (S3-9). |
| 11 | Technical accuracy | 3 | Almost everything I re-ran is exact. The 13.3 dry-run output is wrong (S2-1); several quoted numbers are not tied to a dataset size (S3-7). |
| 12 | Production-grade coverage | 4 | Checks, retention, CI, owners, cost, runbook, privacy review are all present and tested. |
| 13 | Security and integrity | 4 | Privacy advice is correct and matches the dossier (HMAC, key apart, quarantine is personal data, all copies). Gap: raw uploads have a stated period and no mechanism (S3-8). |
| 14 | Accessibility | not scored: other lens | |
| 15 | IP protection | not scored: other lens | |
| 16 | Variant distinctiveness | not scored: no variant courses exist | |
| 17 | Continuity | 3 | Numbers across 11.x and 12.x agree with the reference. 13.3 contradicts 11.5 (S2-1); cast reuse (S3-12). |
| 18 | Learner agency and curiosity | 4 | Decision notes, choose a scenario, mark your own project, find the flaws in Ziad's. |
| 19 | Instructor alignment | not scored: no confirmation record | See S2-3. |
| 20 | Interactive canvas quality | 3 | Nine canvases, all with predict, "what changed", limits and a later transfer. Model-level problems in four of them (S3-2 to S3-6). No canvas QA report was found, which `critic.md` requires for a full score (S3-17). |
| 21 | Explanatory depth | 5 | Audit passes. Each Learn chapter carries mechanism, worked example, trade-off, failure modes and debugging path in prose. |
| 22 | Visual explanation quality | 4 | 11.1, 11.3, 12.2 and 12.4 diagrams argue. Four restate or mislead (S3-15). |

Scored dimensions: 16. Sum 59. **Average of scored dimensions: 3.69** (threshold 4.3). Dimensions at 3: 6, 8, 10, 11, 17, 20 (each triggers revision).

## Defects

### S1
None. I found nothing wrong, unsafe, broken or leaking at S1 level. Every command I ran in modules 10 to 12 behaved as the chapter says, and the capstone tests pass against a faithful adaptation.

### S2

**S2-1. `13-capstone/13.03-quality-privacy-report.md`, "Then add retention" block: `would delete 13 partition(s); kept everything newer than 14 days before 2026-03-28`.**
What is wrong: the same command in 11.5 (and in `REFERENCE.md` section 10, and when I ran it) prints 17 partitions: 13 restricted (1 to 13 March) plus 4 quarantine (8, 10, 12, 13 March). 13.3 shows only "13 lines, 03-01 to 03-13" and a total of 13, while the text two lines above says quarantine must be covered.
Why it matters: expected output was not copied from a real run (06 technical checklist); a learner whose retention job correctly covers quarantine sees 17 and may "fix" it to 13, i.e. stop deleting quarantine, which is the exact leak 11.1 opens with.
Fix: replace with the 11.5 output (17 partitions, 4 quarantine lines shown) or say "13 restricted partitions plus 4 quarantine partitions".

**S2-2. `13.02-build-the-pipeline.md`, "Plan your four hours" and `estimatedMinutes: 240`.**
What is wrong: in four hours the learner must write a seeded generator with planted late rows, duplicates, bad rows, a schema change on day 11 and a registry change on day 8 (5 tables in some scenarios); a landing job with a contract and quarantine; an HMAC publish step; a watermark registry extractor; a dbt project with staging, snapshot, type 2 dimension, incremental fact, tests; a runner; and `demo.py`. The chapter's own plan adds to 230 minutes with "little room for the first failures". In the course, the Mizan versions of these pieces take 100 + 120 + 150 + 150 + 135 = 655 guided minutes (chapters 5.5, 6.5, 7.5, 8.5, 9.4), and the generator alone is 211 lines in the reference. Support also drops from "full interfaces and code to type" to "follow the pattern of `make_source.py`" in one step.
Why it matters: difficulty calibration and time realism. Learners with power cuts and a second language will either miss the week or copy Mizan wholesale, which defeats the "portfolios differ" aim.
Fix: choose one: (a) split 13.2 into two builds (generator and landing; modelling and runner) and raise the module to about 800 minutes, adjusting the week plan and `estimatedHours`; or (b) give a generator skeleton (fixed tables, seeded loop, summary printer) so the learner writes only the scenario's rows and problems; or (c) state that copying and renaming Mizan files is the expected route, and re-estimate on that basis with the copy list given.

**S2-3. `13-capstone/13.01-set-the-scene.md` ("You write your own generator", "Why you write the generator") against `curriculum-roadmap.md` (Capstone: "synthetic data from a provided generator configuration") and `00-course-brief.md` ("seed data from a provided generator").**
What is wrong: the chapters ask the learner to write the generator; the roadmap and brief say it is provided. The roadmap is not instructor-confirmed (G2B pending), so this change has gone into the chapters without being put in front of the instructors, and it is the largest cost item in S2-2.
Why it matters: instructor alignment; the capstone is what instructors recognise as "their" course.
Fix: either revert to a provided generator configuration with the learner adding planted problems, or amend the roadmap (capstone row, hours, open decision list) and have the instructors confirm the changed capstone.

**S2-4. `12-interview-preparation/12.05-quiz.md`, question 2 ("Hatem's practice query lists doctors who have no appointments... NOT IN").**
What is wrong: the item grades the rule that `x NOT IN (list containing NULL)` is never true. Nothing in modules 1 to 12 teaches it. 2.3 teaches `NULL = NULL` is unknown, and 2.2 mentions `NOT EXISTS` as a rival to the anti-join, but never `NOT IN`; 12.2 does not mention it either. The first quiz item (left join plus `WHERE`) is covered in 2.2, so only this one is orphaned.
Why it matters: prerequisite integrity and assessment alignment: a graded item that tests a concept the course never taught, in the chapter that is meant to certify readiness.
Fix: add the `NOT IN` plus NULL trap with a three-row example to 12.2 "Where people go wrong" (the dossier lists "left joins with null handling" as a typical round topic), or to 2.3, then keep the item. Alternatively replace it with an item on a taught trap.

### S3

**S3-1. Predict blocks placed after the answer: `10.01-set-the-scene.md` ("Before you read on, make your own choice for Saeed's case"), `10.03-delivery-guarantees.md` (predict about save-then-crash), `11.01-set-the-scene.md` ("What was missing?"), `12.02-the-sql-round.md` ("What should a strong candidate do first?"), `12.04-the-design-round-and-your-story.md` (daily batch for Hatem).**
What is wrong: in each, the paragraph directly above has already narrated or stated the answer (10.1 works the 16-minute arithmetic and Hala's decision; 12.2 says "First, clarify"; 11.1 says the pipeline was not silent and the lesson is an alarm that reaches a person). In 10.3 the predict repeats the opening scenario word for word ("saves first... 0 rows"), and then the canvas default and quiz item 1 show the same case a third and fourth time; only quiz item 2 is a real transfer.
Why it matters: a prediction the learner can read off the page is recognition, not commitment (04 playbook: "enough context to make a real guess" before the explanation).
Fix: move each predict before the paragraph that gives the answer, or ask about a variant the text has not shown (10.1: change the need to "alarm within 10 seconds, readings every 10 seconds"; 10.3: predict the work-first, late-crash case and keep save-first for the canvas default; 11.1: ask which of three listed checks would have caught the moved folder).

**S3-2. `packages/learning-ui/src/canvas/delivery-guarantees/data.ts`, inputs "Work first: 0 no, 1 yes", "Crash: 0 no, 1 early, 2 late", "Safe to repeat: 0 no, 1 yes".**
What is wrong: three 0/1/2 sliders with the meaning in the label. Binary and three-state choices are toggles or segmented controls (10-interactive-canvases, "Interaction patterns"). On a phone, for a second-language reader, "Crash: 2" is hard to read; the value unit is empty.
Fix: stay on the slider renderer but make the label carry only the name and the stat card or "what changed" line say the chosen word ("crash after the work"); or walk the six meaningful combinations with the stepper.

**S3-3. `one-machine-or-cluster` canvas, and quiz item in `10.04` ("Zaid's bakery chain").**
What is wrong: "past a point more machines made the cluster slower" is true only because the model adds a flat 2 seconds per machine by construction (4 to 16 machines: 88 s to 97 s). The 10.4 quiz then asks the learner to re-run the same toy formula with new numbers, so it grades arithmetic on invented constants, not the decision. The true, measurable claim (bytes read, not size on disk) is carried by the real `EXPLAIN ANALYZE`, which is good.
Fix: state in "What changed" that the slowdown is an assumption of the model; make the quiz a decision item (given a measured single-machine time, a deadline and a memory figure, say what to do and what to measure next), as the gate memo already does.

**S3-4. `volume-check-threshold` canvas, `11.02` ("Where people go wrong", "Try it on your own data") and `11.05` (default `tolerance=0.5`).**
What is wrong: (a) The canvas lists 10 to 60 percent as all fine, and models only a whole-batch loss. The chapter then says 0.5 is too loose because losing only the small batch (57 rows) passes, and recommends 0.25; but 11.5 builds, tests and shows output with 0.5 and never tells the learner to change it. (b) The canvas averages only the days inside 15 to 28 March, so "20 March, 90 against 96.4" differs from the real check (97.0, using 13 and 14 March), and "10 percent sits just above that dip" fails on the 28-day data: 9 March is 82 against 95.4, 14 percent below, so 10 percent would false-alarm on the learner's own lake. The "Try it on your own data" query will show the learner this without comment.
Fix: add one sentence in 11.5 that the build uses 0.5 so its tests are stable and that 0.25 is the improvement to try (with the half-batch test described); state "within this 14-day window" in the canvas copy; and ask the learner in "Try it" to find the 9 March dip and say what tolerance it implies.

**S3-5. `design-round-choice` canvas and its copy in `12.04`.**
What is wrong: a weighted sum with fixed 1 to 5 scores makes freshness a tradable preference: even "very important" freshness gives hourly, and streaming wins "only when speed is everything and cost and skills hardly matter". In 10.1 and 10.3 the course teaches the opposite structure: the need is a constraint (a person must act within N seconds), and cost is secondary once the constraint binds. The scores are the course's own judgment, labelled as such, but the lesson drawn can mislead an interview answer.
Fix: keep the renderer but reword the claim to "weights show how a preference tips between options; a hard freshness requirement removes options first", or replace with the slider renderer: freshness need in minutes against batch interval plus run time (the 1.3 rule), showing when only streaming meets the need.

**S3-6. `modelling-round-steps` canvas (step 7, "Check the facts at the new grain") and `12.03`.**
What is wrong: the canvas lists "empties collected" as a fact at the stop grain, then at the order-line grain says "Every fact is still true at the new grain" while silently dropping it. Empties are collected per stop, not per order line, so keeping them would break the rule 12.3 teaches (a number belongs only if true at the grain). The chapter's spoken answer also drops them without saying why.
Fix: add one line in step 7 and in the chapter: "empties collected is true per stop, not per order line, so it moves to a separate stop-level fact table or is dropped", which also teaches the "second fact table" case the limits mention.

**S3-7. Quoted numbers and labels not tied to a dataset size: `13.03` ("In Mizan the spike on 12 March had 134 rows against an average near 91"), `13.02` (Expected output labels), `13.02` "Break it on purpose", `13.03` "15 passed".**
What is wrong: (a) 134 / 91 is the 16-day sample; the learner's 28-day lake gives 137 / 93.1, as 11.2 correctly says. `REFERENCE.md` requires chapters to say which `--days` they used. (b) 13.2 says "the Mizan generator, run with 14 days, prints" `distinct records` and `late records`; the real Mizan generator prints `distinct reports` and `late reports` (I ran it; the numbers 1318, 1358, 105, 40, 7 are correct for 14 days). (c) 13.2 shows the break-it failure on `2026-03-01`; with the 14-day data the first failing date is `2026-03-02` (I ran it; the error text and "Got 1 result" are right). (d) 13.3 "Run it" ends with `15 passed`, but after step 3 the learner has their own test, so the suite shows 16 (13.5 says 16 for Ziad).
Fix: add the day count to each quoted figure, rename the labels in the 13.2 sample or say "labels renamed", correct the date, and show 16.

**S3-8. `11.04-cost-governance-and-ci.md`, owners table row "Raw uploads | ... | 30 days".**
What is wrong: 11.3 states, correctly, that the retention job does not delete `data/raw` uploads, and 11.5 relies on them to restore the lake. The table promises 30 days for a copy that nothing deletes.
Fix: write "30 days, deleted by hand, no job" or add the mechanism; make the table's last column say "enforced by".

**S3-9. Running snippets: `11.02` ("Run this in DuckDB from your project folder"), `11.03` (V07 query, `DESCRIBE`), `11.04` (`EXPLAIN`), `12.04` ("This query gives the first three numbers"), `10.04` (prints an `EXPLAIN ANALYZE` plan).**
What is wrong: the course installs DuckDB only as a Python package; there is no SQL prompt. Module 1.4 shows the wrapper once. These chapters give bare SQL. Separately, printing a DuckDB plan uses box characters and raises `UnicodeEncodeError` when stdout is not a UTF-8 console (cp1252 pipes, Git Bash; noted in `REFERENCE.md` section 3, and 3.5 tells Windows learners to set `PYTHONUTF8=1`). 10.4 prints a plan with no such note.
Fix: add a three-line `python -c` or script pattern once in 11.2 and refer to it; add "On Windows set `PYTHONUTF8=1` first" beside the 10.4 script and the 11.4 `EXPLAIN`.

**S3-10. `10.03-delivery-guarantees.md`, second SQL block (`BEGIN TRANSACTION; INSERT INTO readings ...; UPDATE offsets ...; COMMIT;`).**
What is wrong: `readings` and `offsets` are never created (the previous block made `plain_readings` and `safe_readings`), the block is not labelled partial, and the rollback test described in the next paragraph has no code. It runs in DuckDB once the two tables exist (I checked), but the learner cannot see that.
Fix: add the two `CREATE TABLE` lines and the rollback statements, or label the block as partial.

**S3-11. `13.01` scenario table and `13.02` design sheet, aid distribution and school attendance.**
What is wrong: the aid scenario requires normalising a phone written two ways and resolving two registrations into one household; the course teaches deduplication by a business key (8.3) but never entity resolution or phone normalisation. The school scenario needs a calendar dimension whose closed days leave the denominator, also not taught. 13.1 says school is "gentlest" but gives no pointer for the others.
Fix: for each scenario add a "where the course taught the skill" line, and for aid and school add a short hint (a normalisation rule; the denominator rule), or mark aid as the stretch scenario.

**S3-12. Cast reuse across unrelated roles (continuity and load).**
What is wrong: Yahya is a shop client (11.4), a weak-answer student (11.7), a SQL candidate called "her" (12.5 item 1) and a print-shop owner "his" (12.6). Hatem is a solar shop owner (11.2), an AI-tool user (11.6) and a pharmacy owner (12.4). Mais is a CI team (11.4), a plan reader (11.6), a strong student (11.7), Hala's friend (12.1 to 12.4), a clinic developer (12.5) and the strong answerer in 12.6. Ibrahim, Doaa, Khalil, Rasha also change role; Zaid (9, 10) against Ziad (13); Dalia, Doaa, Ziad and Basel all run water rounds in five chapters; Lubna is a coordinator (11.7) and also a volunteer in the generator (V11 Lubna Rantisi).
Why it matters: second-language readers track names as anchors; the same name meaning different people inside one module is avoidable load.
Fix: one role per name inside a module; keep Hala, Omar, Yasmin, Karam for Mizan; use distinct names and one domain per scenario; fix the pronoun in 12.5.

**S3-13. `11.05-build-checks-retention-ci.md`, `estimatedMinutes: 120`, "Plan about two hours".**
What is wrong: the learner types or pastes a 170-line test file, writes two modules, copies a workflow, breaks and restores data, then makes a clean clone and runs a 76-second backfill, 50-second tests and a dbt build. The reference suite alone takes a minute per run. Two hours is possible only if little goes wrong.
Fix: 150 minutes, or move "Run the CI steps by hand" to an optional stretch.

**S3-14. `11.07-checklist.md` rubric row "When it goes wrong" and the open-question prompt, part five.**
What is wrong: the learner is graded on "the first three steps after a file with personal data reaches the wrong folder", and the key expects remove, find who opened it, tell the owner the same day, ask an adviser. 11.1 narrates what Hala did, but no chapter teaches the response as a procedure, and "ask an adviser" is not in the narrative.
Fix: add a short "if it happens" paragraph with the steps to 11.3 (it fits next to retention and copies).

**S3-15. Diagrams that restate or mislead: `11.04` (levers), `12.01`, `11.05`, `13.04`.**
What is wrong: 11.4 says "each step keeps the answer the same", but filtering to one date changes the question, and a mart is a different table, not a narrower read of one file. 12.1's flowchart is a linear list the text calls "a list of different skills". 11.5's diagram is three unconnected chains that restate the introduction. 13.4's path repeats the timing table above it.
Fix: 11.4: show the three levers as bytes read for one question (columns, partition, pre-aggregated table); 12.1: replace with the "which round tests what, and what you prepare" mapping or cut it; 11.5 and 13.4: cut, or draw what the prose cannot (which file each test reads).

**S3-16. `12.06-checklist.md` and `13.04-record-your-defence.md`, link-based submission.**
What is wrong: both gates require a link that "opens without signing in" to an audio or five-minute screen recording, for learners on weak, expensive data. No chapter says where to put the file or the target size (13.4 only says "low resolution is much smaller"). 12.6's fallback also asks for a README link, which needs a public repository.
Fix: state the accepted way to share (the platform's upload or the coordinator's channel), a size target (for example under 30 MB), and accept screenshots plus a voice note or text as equal for both gates.

**S3-17. Missing process evidence.**
What is wrong: no canvas QA report for the nine canvases and no `reference-consistency.md` for modules 10 to 13 were found under `agent-ip/work/data-engineering/qa/` (only `blind-keys`). The capstone tests have no reference build behind them; I showed they pass on an adapted Mizan build, but that adaptation is not recorded.
Fix: add the Canvas QA checklist results for the nine slugs; add the adapted capstone reference (the `capstone.yml`, `demo.py`, two renamed labels) under `reference-build/` and cite its run in the chapters.

**S3-18. Weak graded items.**
What is wrong: `11.06` item 3 states the deciding fact in the stem ("they include volunteer_name and volunteer_phone"), so the item rereads the stem; `12.05` item 5 offers three straw options ("because it was taught in the course I followed") around a restated fact; `10.03` quiz item 1 is the predict again (S3-1).
Fix: for 11.6 item 3, leave the stem as "the quarantine files are the rows that failed validation" and make the learner recall what they hold; for 12.5 item 5, give four trade-off sentences that each name a cost and ask which is complete.

### S4

**S4-1.** `13.01` says Hala "has run the Mizan pipeline every morning for four weeks"; 11.1 has it failing for two of the weeks. Say "for six weeks, apart from one outage" or "since the fix".
**S4-2.** `12.01` predict asks which round two guides call "the gate"; this is recall of a source claim the learner cannot reason to. Use it as plain text.
**S4-3.** `13.02` `conftest.py` `SKIP` ignores any folder named `tests`, `data` or `site` at every depth, so `transform/tests` (singular dbt tests) is dropped from the temporary copy. The suite still passed, but the copy no longer matches the project. Use an explicit code list as the Mizan conftest does.
**S4-4.** `11.07` open question has `minWords: 150` while the prompt asks for 250 to 400 words.
**S4-5.** `12.02` canvas replays the Khalil and Mais story the prose has just told; it adds no input. Let the learner choose `rank` or `row_number` at step 6 and see North lose a row.
**S4-6.** `partition-offsets` canvas shows one key only, so "other keys may go to other partitions" is told in a note; the chapter script shows it. Add a second key to two steps.
**S4-7.** `11.03` predict: "More than a day on a laptop" is not a plausible distractor given the rate in the stem.
**S4-8.** `11.04` the plan lines are shown as one line each; real output breaks `File Filters` over two lines. Say "the important lines".

## What works

- Streaming is taught as a decision, not a tool tour. 10.1 starts from "how soon must a person act", does the arithmetic (16 minutes against 30), and refuses to install Kafka or Spark. The COST memo in 10.4 and the five-line decision note in the 10.6 gate are real interview skills.
- The save-first and work-first crash is the right one scenario to teach delivery guarantees, and 10.3 runs it as prose, a canvas, SQL I confirmed (5 rows against 3, rollback keeps 3) and a second transfer item with a key as the fix.
- The real `EXPLAIN ANALYZE` in 10.4 (83.7 kB read from a 32 MB file) and the `Scanning Files: 1/28` plan in 11.4 are exact and show the mechanism the toy canvas only gestures at.
- Module 11 is built around a failure the learner can see: 14 failed mornings, a spreadsheet of phone numbers. The quarantine-is-personal-data link between 11.1, 11.3, 11.5 and the retention tests is consistent and correct, and the V07 two-codes example is a genuine near miss.
- 11.5 gives the interface, constraints, all 17 tests, the workflow, expected output and a break-it step, and every number I re-ran matches. The tests are copied from a build that runs.
- Module 12 teaches habits with checkable examples (eight hand-made rows, row counts falling at named steps, the `BETWEEN` on a timestamp trap, the fan-out of an order total) rather than a list of tips. The project-story numbers (2,712, 2,633, 79, 211, 13, 2,620, 34) all agree with the reference.
- The capstone acceptance suite is well designed: a fingerprint of the whole fact table catches the `loaded_at` near miss, the privacy test searches the values not only the column names, the half-empty-day test deletes the first (60 percent) batch on purpose. It passed 15 of 15 on an adapted reference.
- Gates are honest and consistent: rubric tables shown before the task, strong and weak sample answers, and a "mark Ziad's project" option with planted flaws.

## Recommendation

**Revise.** No S1. Four S2 defects and six dimensions at 3 mean the gate is not met (average 3.69, minimum 4 not reached). Priorities for the writers: S2-1 and S3-7 (wrong or unlabelled expected output in module 13), S2-2 and S2-3 (capstone scope, time and roadmap alignment, which need a human decision), S2-4 (teach or drop the `NOT IN` item), then the predict placement (S3-1) and the canvas model notes (S3-2 to S3-6). Modules 10 to 12 are close to publishable after these fixes; module 13 needs the scope decision first.

Handoff:
```yaml
artifact: critique
course: data-engineering
artifact_under_review: courses/data-engineering/10-streaming-and-scale, 11-quality-and-responsibility, 12-interview-preparation, 13-capstone
lens: pedagogy | continuity | technical
scorecard_average: 3.69
blocking_defects: 4   # S2 count; S1 count is 0
recommendation: revise
```
