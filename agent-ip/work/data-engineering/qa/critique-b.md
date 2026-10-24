---
artifact: critique
course: data-engineering
reviewer: critic-b (second model family)
review_type: slop + plain English + assessment + accuracy + care + IP
round: 1
---
# Critique B, round 1

## Scope and method
I reviewed `rules.md`, `brief-and-roadmap.md`, `dossier.md`, all 84 lessons and `course.yaml` in `chapters.md`, and all 34 canvas specifications in `canvases.md` blind, without running any shell commands. Every factual claim about tools, versions, laws, incidents, and the job market was checked line by line against `dossier.md` and its "Phrase it this way", unverified-claims, and credits tables. Every SQL query, Python snippet, dbt configuration, and CLI output was inspected for syntax and cross-chapter numerical consistency across the 28-day and 16-day Mizan datasets. I also audited all MCQs, predictions, open-question rubrics, and interactive component tags against `03-authoring-standards.md`, `04-interactive-playbook.md`, and `06-quality-gates.md` for slop patterns, second-language readability, care for fellows in Gaza, and IP protection.

## Scorecard

| # | Dimension | Score | One-line note |
|---|---|---|---|
| 1 | Outcome alignment | 5 | Every chapter maps to outcomes O1 to O9 in the roadmap with build tests, quizzes, and mentor-reviewed gates as evidence. |
| 2 | Domain specificity | 5 | Mizan's 8 markets, 12 items, 2,712 upload lines, power-cut schedules, and phone-first constraints anchor every lesson. |
| 3 | Depth over coverage | 5 | Goes deep on SQL, dimensional modelling, Parquet, idempotent ingestion, and dbt Core on one laptop while keeping streaming and clusters conceptual. |
| 4 | Prose quality | 4 | Free of banned slop words, links, cloud vendor names, and em or en dashes, but repeats two `RealWorldEvent` incidents across modules and leaves the British idiom "dearer" unexplained. |
| 5 | Chapter structure | 5 | Read, Learn, Build, Check, and Gate chapters consistently follow hook, mechanism, worked example, failure mode, trade-off, practice, and bridge. |
| 6 | Interaction purpose | 4 | Every Learn chapter integrates a single purposeful canvas with a prediction and transfer check, though four `<LearningObjectives>` tags use `items` instead of `objectives`. |
| 7 | Assessment quality | 4 | MCQs and open-question rubrics test application with balanced option lengths and positions, but three `predict` items test immediate recall or lack an unambiguous key before the lesson. |
| 8 | Difficulty calibration | 4 | Scaffolding fades cleanly from guided SQL drills to the five capstone scenarios, though one capstone volume-check test in 13.3 is fragile when day 14 receives late uploads. |
| 9 | Cognitive load | 4 | Short paragraphs and small tables fit phone screens well, but four module openers define the same term twice and `Idempotent` is defined three separate times across modules. |
| 10 | Prerequisite integrity | 4 | Chapters 1.1 and 3.4 use "Parquet lake", folder partitions, and "Row Groups Scanned" before Module 5 defines data lakes, Parquet layout, and row groups. |
| 11 | Technical accuracy | 4 | SQL, Python, dbt, and dossier facts are accurate, except a false docstring claim in 5.5 that `duckdb.sql()` relations lack `fetchone()` in DuckDB 2.0 and the 16-day vs 28-day count drift on 12 March. |
| 12 | Production-grade coverage | 5 | Teaches contracts, quarantine, atomic file swaps, HMAC pseudonymisation, watermarks, retries with backoff, freshness/volume/schema checks, retention, runbooks, and CI. |
| 13 | Security and integrity | 5 | Uses strictly synthetic personal data, enforces environment-variable secrets via tests, and accurately states that unsalted SHA-256 phone hashes are reversible in seconds. |
| 14 | Accessibility | not scored: other lens | Requires live browser and DOM rendering to verify contrast, keyboard navigation, and focus rings; source text provides non-colour signals and text summaries. |
| 15 | IP protection | 4 | All SQL drills, Python pipeline modules, dbt models, and capstone code are withheld behind interfaces and tests, except `.github/workflows/ci.yml` in 11.5 which is both graded by a test and given in full to copy. |
| 16 | Variant distinctiveness | not scored: other lens | Single-track course with no separate variant files in this package. |
| 17 | Continuity | 3 | Upload counts for 12 March (`137` vs `134`) and M05's late batch (`37` vs `35`) contradict each other across chapters due to `make_source.py` RNG coupling, and pronouns flip for Bilal, Yahya, and Amal. |
| 18 | Learner agency and curiosity | 5 | Learners test failure modes with "Break it on purpose" exercises, weigh honest trade-offs, and choose one of five distinct capstone domains to build and defend. |
| 19 | Instructor alignment | not scored: other lens | `brief-and-roadmap.md` records `g2b_signoff: pending` and `instructors_reviewed: []`, so G2B instructor confirmation cannot yet be scored. |
| 20 | Interactive canvas quality | 5 | All 34 canvases in `canvases.md` teach one claim, state honest model limits, use no decorative elements, and match the numbers in their host chapters. |
| 21 | Explanatory depth | 5 | Prose teaches the mechanism, worked examples, failure modes, and trade-offs in full without relying on components to carry the lesson. |
| 22 | Visual explanation quality | 5 | Mermaid diagrams show concrete row counts, task dependencies, and trust boundaries rather than restating prose. |

**Scored dimensions:** 19 of 22 (3 marked `not scored: other lens`).
**Average of scored dimensions:** **4.47 / 5.00** (85 / 19).

## Defects

### S1
None found.

### S2

#### S2-1: Contradictory running-example row counts for 12 March (`137` vs `134`) and M05's late batch (`37` vs `35`) across chapters
- **Files and quoted text:**
  - `courses/data-engineering/05-files-and-storage/05.05-build-land-as-parquet.md` (`## Expected output`), `courses/data-engineering/06-batch-ingestion/06.01-set-the-scene.md` (`## Two runs, twice the rows`), and `courses/data-engineering/08-late-data-and-backfills/08.05-build-survive-the-mess.md` (`## Expected output`):
    > `2026-03-12: 135 rows landed, 2 quarantined`
  - `courses/data-engineering/11-quality-and-responsibility/11.02-checks-and-monitoring.md` (`## How the three checks work`):
    > `On 12 March, 137 rows arrived against an average of 93.1, because the reports of M05 for 9 to 11 March arrived together after its connection came back.`
  - `courses/data-engineering/11-quality-and-responsibility/11.05-build-checks-retention-ci.md` (`## The acceptance tests`):
    > `The third test fixes a design choice: quarantined rows count as received, so 12 March has 134 rows, 130 landed and 4 quarantined.`
    > `assert checks.landed_rows("2026-03-12") == 134  # 130 landed + 4 quarantined`
  - `courses/data-engineering/13-capstone/13.03-quality-privacy-report.md` (`## Step 1: add the three checks`):
    > `In Mizan the spike on 12 March had 134 rows against an average near 91 and passed.`
  - `courses/data-engineering/08-late-data-and-backfills/08.02-event-time-and-late-data.md` (`## Two times on every row`):
    > `On 12 March, M05 uploaded 37 lines for 9, 10 and 11 March. Two were duplicate sends and one was a bad row, so 34 good reports arrived late.`
  - `courses/data-engineering/08-late-data-and-backfills/08.05-build-survive-the-mess.md` (`## The acceptance tests` and `## Expected output`):
    > `# 37 lines arrived on the 12th: 34 different good reports, the rest are repeated sends or bad rows`
    > `A comment in the test mentions 37 lines, which is the count for the full 28 days. In the 16 days used here, those dates have 35 lines, 35 different reports and 34 good ones, which is the number the test checks.`
  - `courses/data-engineering/08-late-data-and-backfills/08.07-checklist.md` (`## Your task: the incident note for a late batch` and `modelAnswer`):
    > `She says that on 12 March, 35 reports dated 9 to 11 March reached the lake, and that the fact table did not take them in.`
- **What is wrong:** In `make_source.py` (`courses/data-engineering/01-the-job-and-your-workspace/01.04-set-up-your-workspace.md`), `make_reports(rng, start, n_days)` uses a single `random.Random(seed)` instance across `for k in range(n_days):` and then draws `n_repeat`, bad rows, duplicate sends, and late upload dates from that same `rng` after the day loop finishes. Consequently, running `make_source.py --days 16` (used in the test fixtures of `08.05` and `11.05`) changes the random draws for days 1 to 16 compared to running `make_source.py --days 28` (used in the learner's workspace). On `2026-03-12`, the 28-day dataset has **137 rows (135 landed + 2 quarantined, 7-day average 93.1)** and **37 M05 late lines (34 good, 2 duplicate sends, 1 bad)**, whereas the 16-day dataset has **134 rows (130 landed + 4 quarantined, 7-day average ~91)** and **35 M05 late lines (34 good, 0 duplicate sends, 1 bad)**. Chapters `11.05` and `13.03` state `134 rows` as the Mizan fact for 12 March without noting it is from the 16-day test subset, directly contradicting `11.02`, `05.05`, `06.01`, `08.05`, and `canvases.md` (`dag-scheduler.json`: `"135 rows -> lake/restricted/reports/upload_date=2026-03-12/part-0.parquet (2 quarantined)"`). Meanwhile `08.07` says `"35 reports ... reached the lake"`, which matches neither the 28-day count (`37` lines, `36` in `lake/restricted`) nor the 16-day `lake/restricted` count (`34`, since 1 bad row went to `lake/quarantine`).
- **Why it matters:** A learner who runs `checks.landed_rows("2026-03-12")` on their own 28-day Mizan lake gets `137`, not `134`, and sees conflicting numbers for the same date across `05.05`, `08.02`, `08.05`, `08.07`, `11.02`, `11.05`, and `13.03`.
- **Specific fix:** Either make `make_source.py` draw per-day randomness independently of `n_days` (so days 1 to 16 are identical whether `--days` is 16 or 28) and update the 16-day test assertions to match the 28-day counts, or explicitly label the 16-day test-fixture numbers in `11.05` (`## The acceptance tests`), `13.03` (`## Step 1: add the three checks`), `08.05` (test comment in `test_m05_late_reports_are_in_the_fact_table_after_day_12`), and `08.07` (`34 good reports from 37 lines in the 28-day run, or 35 lines in the 16-day test run`).

#### S2-2: `<LearningObjectives>` component prop mismatch (`items` instead of `objectives`) in four module openers
- **Files and quoted text:**
  - `courses/data-engineering/01-the-job-and-your-workspace/01.01-set-the-scene.md`:
    > `<LearningObjectives items={["Explain what a data engineer does and how the job differs from the roles around it", "Trace a wrong number back to the stage that broke, and say who owns that stage", "Place each part of a pipeline on the data lifecycle", "Ask how fresh data must be, and decide whether a daily batch is enough", "Set up a workspace that runs offline after one small download, and make Mizan's raw data"]} />`
  - `courses/data-engineering/02-sql-joins-and-aggregation/02.01-set-the-scene.md`:
    > `<LearningObjectives items={["Join two tables with INNER JOIN and LEFT JOIN, and predict the row count before running the query", "Spot a join that multiplied rows, and fix it before aggregating", "Use COUNT(*), COUNT(column), COUNT(DISTINCT column), SUM, AVG and COALESCE without losing or inventing rows", "Write a multi-step analytical query with named CTEs and check each step on its own"]} />`
  - `courses/data-engineering/05-files-and-storage/05.01-set-the-scene.md`:
    > `<LearningObjectives items={["Explain why a thousand tiny files are slow, and why column layout and file statistics let an engine skip data", "Choose a partition key and a file size for the queries you expect, and show the choice in a query plan", "Tell a data lake, a data warehouse and a lakehouse apart, and say when plain Parquet files are enough", "Write a landing job that turns one upload day of JSON into partitioned Parquet and is safe to run twice"]} />`
  - `courses/data-engineering/06-batch-ingestion/06.01-set-the-scene.md`:
    > `<LearningObjectives items={["Place each step of a pipeline in the right part of ETL or ELT and in the right data zone", "Make a batch job idempotent by replacing a partition or merging on a key, and prove it by running twice", "Load only new or changed rows with a watermark, and name the changes a watermark cannot see", "Pseudonymise personal fields with a secret key before data leaves the restricted zone, and keep the secret out of every file"]} />`
- **What is wrong:** `04-interactive-playbook.md` specifies `<LearningObjectives objectives={["First", "Second", "Third"]} />`. Nine module openers (`03.01`, `04.01`, `07.01`, `08.01`, `09.01`, `10.01`, `11.01`, `12.01`, `13.01`) pass `objectives={[...]}`, but `01.01`, `02.01`, `05.01`, and `06.01` pass `items={[...]}`.
- **Why it matters:** Under `06-quality-gates.md` and `04-interactive-playbook.md`, passing the wrong prop name to a registered MDX component causes validation failure or renders an empty learning-objectives box in Modules 1, 2, 5, and 6.
- **Specific fix:** Change `items={` to `objectives={` on `<LearningObjectives>` in `01.01-set-the-scene.md`, `02.01-set-the-scene.md`, `05.01-set-the-scene.md`, and `06.01-set-the-scene.md`.

#### S2-3: Unverified and factually false claim about DuckDB 2.0's Python API in `05.05-build-land-as-parquet.md`
- **File and quoted text:**
  - `courses/data-engineering/05-files-and-storage/05.05-build-land-as-parquet.md` (`## The acceptance tests`):
    > ```python
    > def query(sql):
    >     """Run one SQL statement in a fresh DuckDB and return the rows. (In DuckDB 2.0 duckdb.sql() relations have no fetchone.)"""
    >     con = duckdb.connect()
    >     try:
    >         return con.execute(sql).fetchall()
    >     finally:
    >         con.close()
    > ```
- **What is wrong:** The parenthetical claim `(In DuckDB 2.0 duckdb.sql() relations have no fetchone.)` does not appear in `dossier.md` and is technically false: `DuckDBPyRelation` objects returned by `duckdb.sql()` in DuckDB 2.0.0 have both `.fetchone()` and `.fetchall()`. Furthermore, `query(sql)` calls `.fetchall()`, not `.fetchone()`.
- **Why it matters:** It teaches a false limitation about DuckDB 2.0's Python API and violates the rule that every factual claim about a tool must come from `dossier.md`.
- **Specific fix:** Delete `(In DuckDB 2.0 duckdb.sql() relations have no fetchone.)` from the docstring of `query(sql)` in `05.05-build-land-as-parquet.md`.

#### S2-4: Graded deliverable `.github/workflows/ci.yml` in `11.05-build-checks-retention-ci.md` is handed to the learner in full to copy
- **Files and quoted text:**
  - `courses/data-engineering/11-quality-and-responsibility/11.04-cost-governance-and-ci.md` (`## Change it safely`):
    > `Mizan's CI file, which you write in chapter 11.5, does six things in order.`
  - `courses/data-engineering/11-quality-and-responsibility/11.05-build-checks-retention-ci.md` (`## The task`, `## The acceptance tests`, and `## The CI workflow`):
    > `5. Create .github/workflows/ci.yml with the text given below, and run the workflow test.`
    > `def test_ci_workflow_is_valid_yaml_with_the_expected_steps():`
    > `This is the one file in the chapter that you copy as it is. Put it at .github/workflows/ci.yml.`
- **What is wrong:** Chapter `11.04` tells the learner that they will write Mizan's CI file in `11.05`, and `11.05` includes an acceptance test (`test_ci_workflow_is_valid_yaml_with_the_expected_steps`) that grades `.github/workflows/ci.yml`, but immediately below that test `11.05` provides the entire `.github/workflows/ci.yml` file verbatim for the learner to copy.
- **Why it matters:** `06-quality-gates.md` (`Assessment validation` and `IP protection`) requires that learners cannot pass an acceptance test by copying a complete solution provided in the chapter.
- **Specific fix:** In `11.05-build-checks-retention-ci.md`, replace the verbatim `.github/workflows/ci.yml` block with a concise specification list (triggers `push` and `pull_request`, job `pipeline` on `ubuntu-latest`, env `MIZAN_KEY: ci-test-key-not-a-secret`, `actions/checkout@v4`, `actions/setup-python@v5` with Python `"3.12"`, and the five `run` commands) and, if a syntax example is needed, show a small workflow for Salma's clinic in `11.04-cost-governance-and-ci.md`.

#### S2-5: Duplicate `<RealWorldEvent>` incidents repeated across four and two chapters
- **Files and quoted text:**
  - England September to October 2020 spreadsheet limit (~16,000 missed cases) appears in four chapters:
    1. `courses/data-engineering/01-the-job-and-your-workspace/01.03-the-map-of-a-pipeline.md` (`## Count at every boundary`):
       > `<RealWorldEvent title="Test results lost to a spreadsheet limit" when="September and October 2020" summary="In England, lab test results were passed as text files into spreadsheet templates that used an older file format. Each template held about 65,000 rows. Once a template was full, further cases were left out. About 16,000 confirmed cases were missing from the daily figures between 25 September and 2 October 2020. They were added later." lesson="A file format has limits. A pipeline should count rows between each stage, so that a missing batch shows up on the day it happens." />`
    2. `courses/data-engineering/05-files-and-storage/05.01-set-the-scene.md` (`## Why this matters beyond Mizan`):
       > `<RealWorldEvent title="Cases lost to a file format limit" when="25 September to 2 October 2020, England" ... />`
    3. `courses/data-engineering/07-transformation-as-code/07.03-tests-contracts-and-docs.md` (`## Where people go wrong`):
       > `<RealWorldEvent title="Lost test results in a spreadsheet limit" when="September and October 2020" ... />`
    4. `courses/data-engineering/11-quality-and-responsibility/11.02-checks-and-monitoring.md` (`## Where people go wrong`):
       > `<RealWorldEvent title="Lost cases in a spreadsheet format" when="September to October 2020" ... />`
  - The 2026 US federal audit duplicate resubmissions incident appears in two chapters:
    1. `courses/data-engineering/06-batch-ingestion/06.03-idempotent-jobs.md` (`## Two ways to make a write idempotent`):
       > `<RealWorldEvent title="One audit, several records" when="2026" summary="A 2026 US federal audit of a grant system found that when a submission was sent again to correct an error, the system created a new record instead of updating the existing one, leaving duplicate records with no link between them." lesson="If a source can send the same thing twice, an append-only load creates duplicates. The pipeline needs a key and a rule that updates or replaces the existing record." />`
    2. `courses/data-engineering/08-late-data-and-backfills/08.03-duplicates-and-keys.md` (`## Resends and real repeats`):
       > `<RealWorldEvent title="One audit, several records" when="2026" ... />`
- **What is wrong:** Two real-world events from `dossier.md` Finding 37 are embedded as `<RealWorldEvent>` components in four and two chapters respectively, with near-identical text.
- **Why it matters:** `06-quality-gates.md` (`Anti-slop checklist`: `"The same RealWorldEvent in more than one chapter"`) and `critic.md` (`"Is the same example or RealWorldEvent repeated?"`) explicitly forbid repeating a `RealWorldEvent` across chapters.
- **Specific fix:** Keep the England 2020 spreadsheet `<RealWorldEvent>` in `05.01-set-the-scene.md` only (remove the `<RealWorldEvent>` tags from `01.03`, `07.03`, and `11.02`, replacing them with a one-sentence callback to `05.01` where needed), and keep `"One audit, several records"` in `08.03-duplicates-and-keys.md` only (removing the duplicate tag from `06.03-idempotent-jobs.md`).

#### S2-6: Three `predict` blocks test immediate recall of the preceding paragraph or have a defensible distractor (`01.01`, `12.01`, `12.02`)
- **Files and quoted text:**
  - `courses/data-engineering/01-the-job-and-your-workspace/01.01-set-the-scene.md` (`## Three suspects and no way to choose`):
    > ```predict
    > prompt: "Omar's line for M02 rose from 135.65 to 203.50 shekels in one week. With no other information, which explanation is more likely?"
    > options:
    >   - id: fault
    >     label: "A fault in the data steps"
    >   - id: real
    >     label: "A real price rise at one market"
    > correctOptionId: fault
    > explanation: "A fault is not certain, but it is the first thing to check. In the clean version of this data, which you will build in this course, no market's basket changes by more than 2.7 percent from one week to the next..."
    > ```
  - `courses/data-engineering/12-interview-preparation/12.01-set-the-scene.md` (`## What a loop looks like`):
    > ```predict
    > prompt: "Two interview guides, one from a practitioner and one from a staffing company, both call one round 'the gate'. Which round do you think it is?"
    > options:
    >   - id: sql
    >     label: "The SQL round"
    >   - id: design
    >     label: "The pipeline design round"
    > correctOptionId: sql
    > ```
  - `courses/data-engineering/12-interview-preparation/12.02-the-sql-round.md` (`## Four moves`):
    > `A strong answer has four moves, in this order. First, clarify. Ask what one row of the table is, whether any column can be NULL, and what to do on a tie.`
    > ...
    > ```predict
    > prompt: "Khalil asks his one-sentence question about the best-selling product per branch. What should a strong candidate do first?"
    > options:
    >   - id: type
    >     label: "Start writing the query, to save time"
    >   - id: ask
    >     label: "Ask about the grain, NULLs and ties"
    > correctOptionId: ask
    > ```
- **What is wrong:** In `01.01`, the stem says `"With no other information"`, making `"A real price rise at one market"` a defensible choice for a learner in Gaza who has not yet seen the clean dataset mentioned in the explanation. In `12.01`, the prompt asks a trivia question about what two unnamed guides call `"the gate"` immediately after the prose says the loop leans on SQL and Python. In `12.02`, the prompt asks what a candidate should do first four lines after the prose explicitly states `"First, clarify. Ask what one row of the table is, whether any column can be NULL, and what to do on a tie."`
- **Why it matters:** `06-quality-gates.md` forbids predictions or checks that test recall of the paragraph immediately above or where the distractor is also defensible from the stated facts.
- **Specific fix:** In `01.01`, add `"The other seven markets changed by less than 3 percent that week"` to the prompt. In `12.01`, replace the trivia prompt with a scenario where a junior candidate has four hours left before a first technical screen and must choose whether to practise window functions or distributed streaming. In `12.02`, move the `predict` block above `## Four moves` (at the end of `## A query that looks right`) before the four moves are stated.

### S3

#### S3-1: Terms defined twice within the same chapter and across chapters (`Window function`, `Grain`, `Hardest constraint`, `Hero output`, `Idempotent`, `Parquet`, `Dependency`)
- **Files and quoted text:**
  - `courses/data-engineering/03-sql-windows-and-plans/03.01-set-the-scene.md`:
    > `<BigWordAlert term="Window function" plainEnglish="A SQL function that calculates a value across a group of related rows while keeping every row in the result." ... />`
    > and in `## Key words`: `| **Window function** | A calculation across related rows that keeps every row |`
  - `courses/data-engineering/04-data-modelling/04.01-set-the-scene.md`:
    > `<BigWordAlert term="Grain" plainEnglish="What one row of a table stands for. If the grain is 'one price report', the table has one row for each report and nothing else." ... />`
    > and in `## Key words`: `| **Grain** | What one row of a table stands for |`
  - `courses/data-engineering/13-capstone/13.01-set-the-scene.md`:
    > `<BigWordAlert term="Hardest constraint" plainEnglish="The one rule in a scenario that a simple pipeline is most likely to break, such as duplicate people, health data or records that change after they are saved." ... />`
    > `The <GlossaryTerm term="hero output" definition="The one report or table that the person in the brief will actually read to make a decision." /> is what your report page shows.`
    > and in `## Key words`:
    > `| **Hardest constraint** | The one rule that a simple pipeline is most likely to break |`
    > `| **Hero output** | The report or table the person reads to decide |`
  - `courses/data-engineering/06-batch-ingestion/06.01-set-the-scene.md`:
    > `<BigWordAlert term="Idempotent" plainEnglish="Running the same job again for the same date leaves the same final data as running it once." ... />` (after `Idempotent` was already defined in `06.03` and introduced in `01.02`/`01.03`, and `Parquet` in `05.01-set-the-scene.md` `<BigWordAlert term="Parquet" ... />` after being defined in `01.01-set-the-scene.md`, and `Dependency` in both `07.01-set-the-scene.md` and `09.01-set-the-scene.md` `## Key words`).
- **What is wrong:** Three module openers (`03.01`, `04.01`, `13.01`) define the exact same term in a `<BigWordAlert>` or `<GlossaryTerm>` and again in the `## Key words` table at the bottom of the same file, and `Dependency` is defined as a new key word in both `07.01` and `09.01`.
- **Why it matters:** `06-quality-gates.md` flags defining a term the learner already knows as slop, and duplicate definitions within a 15-minute phone lesson waste screen space.
- **Specific fix:** Remove `Window function`, `Grain`, `Hardest constraint`, and `Hero output` from the `## Key words` tables in `03.01`, `04.01`, and `13.01`; replace `Dependency` in `09.01`'s `## Key words` table with a reference to chapter 7.1 in prose.

#### S3-2: Terms used before they are defined (`Parquet lake` in `01.01`, and `Parquet lake`, folder partitions, and `Row Groups Scanned` in `03.04`)
- **Files and quoted text:**
  - `courses/data-engineering/01-the-job-and-your-workspace/01.01-set-the-scene.md` (`## What this course builds`):
    > `B --> C["Parquet lake"]`
    > `The lake stores them again as Parquet, a file format that engines read column by column.`
  - `courses/data-engineering/03-sql-windows-and-plans/03.04-query-plans-and-indexes.md` (`## Plans in DuckDB`):
    > `DuckDB is built for queries that read large parts of a table, so a Parquet lake is read in a different way. Instead of an index, it uses two kinds of information. Folders named like upload_date=2026-03-05 let it skip whole files. And each Parquet file stores the smallest and largest value of each column in each block of rows, so it can skip blocks that cannot match. Chapter 5.2 explains these statistics.`
    > `With EXPLAIN ANALYZE on the second query, the output also shows Row Groups Scanned: 26 / 28: in this run the reader skipped 2 of 28 blocks without reading them.`
- **What is wrong:** `01.01` uses `"lake"` without defining what a data lake is, and `03.04` walks through a DuckDB query plan over a partitioned `"Parquet lake"` with `"Row Groups Scanned: 26 / 28"` two modules before Module 5 defines Parquet, row groups, folder partitions, and data lakes (and duplicates the exact same `EXPLAIN` plan that appears in `11.04-cost-governance-and-ci.md`).
- **Why it matters:** Second-language learners reading Module 1 and Module 3 meet storage jargon two modules before it is defined.
- **Specific fix:** In `01.01-set-the-scene.md`, gloss `"lake"` inline as `"a folder of organised files, called a data lake"`. In `03.04-query-plans-and-indexes.md`, replace the Parquet lake plan (already covered in `05.03` and `11.04`) with a DuckDB `EXPLAIN` and `EXPLAIN ANALYZE` plan on the `price_log` table or `data/raw/uploads/*/*.jsonl` that the learner already has in Module 3.

#### S3-3: Sentences over 30 words in `<ChapterRecap>` bullets (`06.07`, `12.06`) and in `openquestion` `modelAnswer` blocks across gate chapters
- **Files and quoted text:**
  - `courses/data-engineering/06-batch-ingestion/06.07-checklist.md`:
    > `"Append doubles a day on a rerun; replacing the day's partition or merging on a key leaves the same table, and a test that runs the job twice is the proof"` (31 words)
  - `courses/data-engineering/12-interview-preparation/12.06-checklist.md`:
    > `"A project story has five parts and numbers that say what they count, compared with something; say what is your own part, and be honest about what an AI tool did"` (31 words)
  - `courses/data-engineering/05-files-and-storage/05.07-checklist.md` (`modelAnswer`):
    > `"Layouts: a folder per day is 365 files of 576 rows, and a customer's 7-day query opens 7 files and reads 4,032 rows, 6 sites' worth; a folder per day and site is 2,190 files of 96 rows, which is too many small files; a folder per month is 12 files of about 17,520 rows, and a 7-day query opens 1 file, or 2 across a month end; a folder per site is 6 files of 35,040 rows, which makes the nightly job rewrite a site's whole file."` (88 words)
  - `courses/data-engineering/13-capstone/13.04-record-your-defence.md` (`modelAnswer`):
    > `"Aid distribution: grain is one parcel handout with handout_id; two registrations of one family become one household key made from the normalised phone with a secret; coverage counts distinct households served over distinct households registered; probe the risk that two families sharing a phone are merged and one is wrongly seen as served, and that a changed phone splits one family in two; names and phones stay restricted; the point's area is type 2."` (74 words)
- **What is wrong:** Two learner-facing `<ChapterRecap>` items (`06.07` and `12.06`) are 31 words long, and the `modelAnswer` strings in `01.05`, `02.07`, `05.07`, `06.07`, `08.07`, `11.07`, `12.06`, `13.04`, and `13.05` chain three to six clauses with semicolons into sentences of 45 to 108 words.
- **Why it matters:** The course rule caps sentences at 30 words for second-language readers on phones.
- **Specific fix:** Replace the semicolon in the two 31-word `<ChapterRecap>` items in `06.07-checklist.md` and `12.06-checklist.md` with a period, and split all semicolon-chained clauses in the `modelAnswer` blocks of the gate chapters into separate sentences under 30 words.

#### S3-4: Pronoun inconsistencies for recurring characters (`Bilal`, `Yahya`, `Amal`)
- **Files and quoted text:**
  - `courses/data-engineering/02-sql-joins-and-aggregation/02.07-checklist.md` (`## Your task`):
    > `Here is what a strong answer looks like, told about a fictional student, Bilal, who wrote about Salma's case. She starts with the table that caused the trouble: one row of the doctors table is a doctor at a site, not a doctor. She notes that five doctors across two sites make 10 rows, so each appointment matches two rows and the join turns 80 appointments into 160 rows. Bilal then gives a fix and a reason: build a small step with one row for each doctor before the join, so that the join keeps one row for each appointment. She checks both numbers: 80 rows before and after, and a fee total of 4,000 shekels instead of 8,000. Last, she writes a test that fails if the joined table ever has more rows than the appointments table.`
  - `courses/data-engineering/12-interview-preparation/12.05-quiz.md` (Question 1):
    > `In a SQL round, Yahya is given three doctors (Amal, Basil, Chadi) and three appointments: Amal done, Amal cancelled, Basil done. Chadi has none. Her query left joins appointments to doctors on doctor_id, keeps only the rows where the appointment status is done, and counts rows per doctor name with count(*). What does it return?`
  - `courses/data-engineering/12-interview-preparation/12.02-the-sql-round.md` (`## Check your understanding`):
    > `- "Amal only, because he is the only doctor with rank 1"`
- **What is wrong:** Bilal is male in `01.03-the-map-of-a-pipeline.md` (`"His sales sheet"`) and `02.06-quiz.md` (`"Bilal's bakery... He needs"`), but `02.07-checklist.md` refers to Bilal as `"She"` four times. Yahya is a male Arabic name and is male in `11.04-cost-governance-and-ci.md` (`"He pays"`) and `12.06-checklist.md` (`"his billing program"`), but `12.05-quiz.md` says `"Her query"`. Amal is female in `01.04` (`"Amal Haddad"`), `07.06`, and `08.06`, but `12.02` says `"he is"`.
- **Why it matters:** Pronoun swaps on familiar Arabic names break character continuity and look like machine-generated drift to readers in Gaza.
- **Specific fix:** Change `"She"` to `"He"` (four occurrences) for Bilal in `02.07-checklist.md`, change `"Her query"` to `"His query"` for Yahya in `12.05-quiz.md`, and change `"he is"` to `"she is"` for Amal in `12.02-the-sql-round.md`.

#### S3-5: Unexplained British idiom `"dearer"` (and `"sticky note"`) for second-language readers
- **Files and quoted text:**
  - `courses/data-engineering/01-the-job-and-your-workspace/01.01-set-the-scene.md` (`## Three suspects and no way to choose`):
    > `If the report says M02 became 50 percent dearer, that kitchen may drive to a market that is further away and pay for the fuel.`
  - `courses/data-engineering/03-sql-windows-and-plans/03.03-running-totals-and-frames.md` (`## Is the basket getting dearer?`):
    > `## Is the basket getting dearer?`
    > `He asks one plain question: is the basket in market M05 dearer than last week, and by how much?`
  - `courses/data-engineering/07-transformation-as-code/07.01-set-the-scene.md`:
    > `## Six scripts on a sticky note`
- **What is wrong:** `"Dearer"` (British colloquialism for `"more expensive"`) is used three times without explanation, and `"sticky note"` is used in a heading in `07.01`.
- **Why it matters:** Second-language readers who know `"dear"` only as `"loved"` or a letter greeting can misread `"dearer"` in a lesson about food prices.
- **Specific fix:** Replace `"dearer"` with `"more expensive"` in `01.01-set-the-scene.md` and `03.03-running-totals-and-frames.md` (both the heading and the sentence), and replace `"sticky note"` with `"paper note"` in `07.01-set-the-scene.md`.

#### S3-6: Capstone test `test_a_half_empty_day_makes_the_run_fail_and_is_logged` in `13.03-quality-privacy-report.md` can fail on a compliant 60/40 batch split
- **Files and quoted text:**
  - `courses/data-engineering/13-capstone/13.02-build-the-pipeline.md` (`## Step 2: write the generator`):
    > `Writes DIR/raw/uploads/upload_date=D/batch-01.jsonl and batch-02.jsonl (about 60 and 40 percent of the day's lines)`
  - `courses/data-engineering/13-capstone/13.03-quality-privacy-report.md` (`## The acceptance tests`):
    > ```python
    > def test_a_half_empty_day_makes_the_run_fail_and_is_logged(built, tmp_path):
    >     copy = Project(tmp_path / "copy")
    >     shutil.copytree(built.root, copy.root)
    >     (copy.root / "data" / "raw" / "uploads" / f"upload_date={LAST_DAY}" / "batch-01.jsonl").unlink()
    >     done = copy.python("-m", "pipeline.runner", "run", "--date", LAST_DAY, check=False)
    >     assert done.returncode == 1, "a volume check should fail when most of a day is missing"
    > ```
- **What is wrong:** `check_volume` uses `tolerance: float = 0.5`, which fails only when the day's received rows fall below `0.5 * 7-day average`. Because the generator plants ~8 percent late records and ~3 percent duplicate sends, `LAST_DAY` (day 14) can legitimately have 1.25 times the previous 7-day average when late batches arrive on day 14. In that case, unlinking `batch-01.jsonl` (60 percent) leaves `batch-02.jsonl` (40 percent of `1.25 * avg` = `0.50 * avg`), so `check_volume` passes and `test_a_half_empty_day_makes_the_run_fail_and_is_logged` fails even though the learner followed every instruction.
- **Why it matters:** Since every fellow writes their own seeded generator in `13.02`, a 60/40 split is too close to the 50 percent failure threshold when daily upload counts vary with late data.
- **Specific fix:** Change the batch split in `13.01-set-the-scene.md` (`## Rules every generator follows`), `13.02-build-the-pipeline.md` (`## Step 2: write the generator`), and `13.03-quality-privacy-report.md` (`## What each test protects`) from `"about 60 and 40 percent"` to `"about 70 and 30 percent"` so that deleting `batch-01.jsonl` always leaves well below half of the 7-day average.

### S4

#### S4-1: `11.02-checks-and-monitoring.md` states two slightly different 7-day averages for 12 March (`93.1` vs `90.4` in `canvases.md`)
- **Files and quoted text:**
  - `courses/data-engineering/11-quality-and-responsibility/11.02-checks-and-monitoring.md` (`## How the three checks work`):
    > `On 12 March, 137 rows arrived against an average of 93.1, because the reports of M05 for 9 to 11 March arrived together after its connection came back.`
  - `canvases.md` (`courses/data-engineering/interactive/data/11.04-cost-governance-and-ci.json` / `volume-anomaly.json` or `11.02` data):
    > `12 March: 137 rows` (and in `13.03-quality-privacy-report.md`: `"against an average near 91"`).
- **What is wrong:** `11.02` gives `93.1` as the 7-day average before 12 March, while `13.03` says `near 91`.
- **Why it matters:** Minor numerical polish across chapters that refer to the same 12 March volume check.
- **Specific fix:** Align the stated 7-day average before 12 March in `11.02` and `13.03` to the exact value from the 28-day dataset (`93.1`).

## What works
- **Respectful, grounded care for fellows in Gaza:** Power cuts, shared laptops, short folder paths on Windows (`C:\de\venv`), 41 MB one-time offline installs, and sub-10 KB single-file HTML reports for phones are treated as ordinary engineering constraints with zero drama, politics, or war.
- **Rigorous factual discipline against the dossier:** Tool versions (`DuckDB 2.0.0`, `dbt-core 1.12.6`, `dbt-duckdb 1.11.0`, `pytest 9.1.1`), the September 2026 dbt v2 / dbt OSS rename, the October 2026 job-posting sample caveats, GDPR Article 4(5) and Recital 26, and the 11.3-second SHA-256 phone-number brute-force timing are stated with the exact caveats from `dossier.md`.
- **Strong IP protection across the core build and capstone:** Across Modules 1 to 9 and 13, build lessons provide exact function signatures, CLI contracts, and realistic pytest suites (including `conftest.py` and `day_by_day.py`) while withholding the SQL and Python implementations the learner must write.
- **Interactive canvases that earn their place:** All 34 canvases in `canvases.md` test one concrete claim, pair with a pre-canvas prediction and post-canvas transfer check, use numbers that match the prose, and explicitly state the limits of their toy models.
- **Anti-AI-slop assessment design:** Quiz chapters include realistic scenarios where an AI assistant suggests a plausible-sounding trap (`SUM(DISTINCT amount)`, `NOT IN` with NULLs, plain SHA-256 for anonymity, or Kafka `exactly-once` into an unkeyed database table) and ask the learner to diagnose why it fails.
- **Thoughtful capstone architecture:** Having each learner write a seeded generator that prints its own five summary counts lets the shared acceptance tests (`test_capstone_pipeline.py` and `test_capstone_quality.py`) verify five different domains without leaking any scenario's solution.

## Recommendation
**revise**

The course is thoughtfully engineered for its audience, technically sound in its SQL, Python, and dbt Core 1.12 design, and free of AI slop phrases, external links, cloud-vendor lock-in, and em or en dashes. It should be revised rather than passed in round 1 because Dimension 17 (Continuity) scores 3 (`06-quality-gates.md` requires every scored dimension to be at least 4 and zero S2 defects) due to six S2 defects that are straightforward to fix: reconciling the 16-day (`134` rows on 12 March; `35` M05 lines) and 28-day (`137` rows on 12 March; `37` M05 lines) counts across `08.05`, `08.07`, `11.02`, `11.05`, and `13.03` (S2-1); fixing `<LearningObjectives items=...>` to `objectives=...` in four module openers (S2-2); removing the false DuckDB 2.0 `fetchone` docstring claim in `05.05` (S2-3); withholding the graded `.github/workflows/ci.yml` file in `11.05` (S2-4); deduplicating the repeated `<RealWorldEvent>` cards in `01.03`, `06.03`, `07.03`, and `11.02` (S2-5); and tightening the three recall/ambiguous `predict` blocks in `01.01`, `12.01`, and `12.02` (S2-6), alongside the six S3 plain-English and continuity fixes.
