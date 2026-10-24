---
artifact: research-dossier
course: data-engineering
version: 1
status: draft
owner: research
sources_checked: 2026-10-24
hard_constraints:
  - One-time install of about 40 MB (download) on a Windows, macOS or Linux laptop with about 4 GB of memory, then fully offline; tools that need a JVM, a broker, a web scheduler or Linux-only support cannot be in the core path
  - The stack is brand new and moving: DuckDB 2.0.0 LTS shipped 2026-10-21, dbt v2 became the default dbt install on 2026-09-14 and was renamed on 2026-09-15, pandas is at 3.1 and Polars at 2.0; every command, version and expected output must be pinned and re-checked at G5
  - The platform runner is JavaScript only, so all Python, SQL and dbt work is taught as build-it-locally steps; keys, quizzes and acceptance tests must use deterministic outputs (row counts, schemas, file lists) and never timings or byte sizes
  - Personal data in aid, health and school contexts: every dataset is synthetic, PII is minimised by design, and the course must teach that a hash of a phone number or ID is pseudonymised, not anonymous
  - About 55 to 60 hours must cover a field that job postings describe with 15 or more tools: depth goes to SQL, modelling and pipeline correctness (idempotency, late and duplicate data, backfills), and the heavy engines (Spark, Kafka, Airflow) are explained, not installed
out_of_scope:
  - Installing or operating Spark, Kafka, Flink, Airflow or a Kubernetes or Docker based stack in the core path
  - Any cloud warehouse, managed service, Terraform or infrastructure as code
  - Machine learning, feature stores, LLM pipelines, vector databases and BI tool tutorials
  - Lakehouse table formats (Iceberg, Delta) as hands-on work; concept level only
  - Database internals beyond B-tree indexes, query plans, columnar layout and row-group statistics
  - dbt Cloud or dbt platform features, the dbt VS Code extension, semantic layer and metrics
  - Python packaging, async and web scraping beyond a small file or API reader
  - Salary claims, job-market promises and certification preparation
open_questions:
  - Which dbt line does the sponsor want pinned for learners: dbt Core 1.12.x with dbt-duckdb (stable, Python, tested here) or dbt OSS v2 (Apache 2.0, newer, tested here with the same project)?
  - Is a hosted CI service (a GitHub Actions workflow) acceptable under the "no commercial vendor names unless needed" rule, since the brief requires a CI workflow and fellows already use Git hosting?
  - Which Python versions must the install check accept: 3.11 only, or 3.11 to 3.13? Only 3.12.10 was tested here.
  - May chapters name authors and projects (Kimball, Akidau, Reis and Housley, McSherry) with a short credit line, and how many per chapter?
  - Should the Windows long-path trap be solved by telling learners to create the virtual environment at a short path such as C:\de, or by asking them to enable long paths (needs admin rights)?
  - Is the SQL interview rehearsal allowed to use window functions in SQLite (Python ships SQLite 3.49.1 here) or must everything be taught in DuckDB only?
  - Who can review the privacy chapter against local law and NGO practice (a data protection officer or lawyer)?
---

# Research dossier: data-engineering

This is a decision aid for the curriculum architect and the chapter writers of course 15, "Data Engineering: Build Reliable Data Pipelines on Your Laptop". Findings are numbered so writers can cite "finding 7". Claims carry a source ID in square brackets, for example [S12]. The source table near the end gives the source, its type, the date checked and a confidence level. All sources were checked on 2026-10-24. Items marked **UNVERIFIED** must not appear in learner-facing text as fact; the unverified table says how to phrase them instead.

Three kinds of evidence appear. "Researcher test" means I ran the thing on a Windows 11 laptop with Python 3.12.10 on 2026-10-24 and recorded what happened (sources S18, S25, S51, S52, S53, S62, S86, S106). Those are facts about the versions named, not general claims, and they must be re-run at G5. "Researcher scan" (S6, S7) is my own read of public job postings pulled from the public job-board interfaces of 51 company boards; it is a sample, not a market survey. Everything else is a document I read.

Names: no employer or recruiter is named in findings or phrasing notes. Open-source projects, foundations and public bodies are named. The source table holds URLs, and some URLs contain a company name; that is the only place it appears.

## Learner and context

**Who.** Gaza fellowship fellows aiming at remote work, freelance clients and NGOs. Arabic first, English second. Prerequisites in the brief: basic Python, basic SQL, basic Git.

**Connection and device.** Phones for reading, a laptop with about 4 GB of memory for building, expensive data, power cuts. Every install must be a one-time download with a stated size. Measured sizes are in finding 6 and the tool table.

**Time.** About 55 to 60 hours. The market evidence (findings 3 and 4) says the highest-value hours go to SQL, modelling and correct pipelines. Streaming, distributed engines and orchestration need understanding, not installation.

**What the work looks like.** The learner's "product" is a pipeline repository. The research below is organised so each chapter can cite a finding and a tested command.

## Domain model

**Actors.** Source system owners (apps, forms, sensors, spreadsheets), the data engineer, analysts and analytics engineers who consume the data, data subjects (the people in the rows), the data protection owner, and the person who is paged when the pipeline fails.

**Spine (the lifecycle).** Reis and Housley describe a data engineering lifecycle of generation, storage, ingestion, transformation and serving, with cross-cutting concerns they call undercurrents: security, data management, DataOps, data architecture and software engineering [S1]. The course can use the five stages as its map and the five undercurrents as its recurring checks. I read a review of the book, not the book (see Credits).

**Invariants worth teaching as rules.**
- Declare the grain before choosing columns [S88].
- A rerun must produce the same result as one run (idempotency) [S57].
- Event time is not processing time; data arrives late and out of order [S68, S69].
- A test checks an assumption; it does not prove the data is right [S45].
- Pseudonymised data is still personal data [S103, S104].

**Vocabulary for chapters.**

| Term | Plain English for chapters | Source |
|---|---|---|
| Grain | What exactly one row of a table stands for. | [S88] |
| Fact table | Rows that record measurements of events (a sale, a visit, a reading). | [S97] |
| Dimension | The descriptive context for facts: who, what, where, when. | [S90] |
| Surrogate key | A made-up integer key owned by the warehouse, not the source's own id. | [S96] |
| Slowly changing dimension (SCD) | A dimension whose attributes change over time, with a rule for keeping or overwriting history. | [S93, S94] |
| Idempotent | Running the job twice leaves the same result as running it once. | [S57] |
| Backfill | Re-running a past period on purpose. | [S58] |
| Incremental load | Processing only new or changed data since the last run. | [S42] |
| Late data | A record whose event time is older than the data already processed. | [S68, S69] |
| Partition | A slice of a dataset kept apart, here by folder (hive style) or by key. | [S16, S64] |
| Row group, column chunk, page | The pieces inside a Parquet file. | [S26] |
| Pseudonymisation | Replacing identifiers so a person cannot be named without extra information kept apart. | [S102] |
| Anonymous information | Information that no longer relates to an identifiable person. | [S103] |
| Data contract | A written, versioned agreement about a dataset's schema, quality and ownership. | [S98, S99] |

## Hard constraints

1. **Offline after one small install, on Windows too.** The tested core (DuckDB 2.0.0, dbt-core 1.12.6, dbt-duckdb 1.11.0, pytest 9.1.1) downloads about 41 MB in 64 files and takes about 121 MB installed [S53]. Parquet, JSON and the time-zone extension are built into the DuckDB wheel; other extensions download on first use [S18]. Airflow does not run natively on Windows [S55], Kafka needs Java 17 or later [S67], PySpark is a 450 MB download plus Java [S72, S73]. Architecture consequence: core path is Python, DuckDB, SQLite, pytest and dbt; Spark, Kafka and Airflow are explained with diagrams and small Python models. A Windows trap exists: with a deep virtual-environment path, `pip install` of the dbt stack failed with a file-not-found error (finding 17).

2. **A stack that is days old.** DuckDB 2.0.0 LTS was released 2026-10-21; databases written by 2.0 cannot be opened by older DuckDB versions [S13, S14]. dbt v2 reached general availability on 2026-09-14, is now the default install, and the old "dbt Fusion" and "dbt Core v2" names were retired on 2026-09-15 [S37, S38, S39]. Architecture consequence: pin exact versions in a requirements file, state them on the first page, and make "re-check versions" a G5 task.

3. **No Python in the platform runner.** The runner is JavaScript only, so Python and dbt work is taught as local steps. Architecture consequence: every practical needs exact commands, an expected-output block and an acceptance test. Graded keys may use row counts, column lists, file names and `EXPLAIN` operator names, not timings. Observed example: asking DuckDB for 100,000-row groups produced groups of 100,351 rows [S25], so even "file layout" answers need tolerances.

4. **Personal data in aid and health settings.** The brief demands synthetic data and PII handled by design. The ICRC handbook states purpose limitation, data minimisation, data quality and retention as basic principles [S105]. A hash of a phone number is easy to reverse for a small input space (finding 35). Architecture consequence: the running dataset has a raw zone with synthetic PII and a pseudonymised layer; seeds never hold sensitive data [S48]; a short responsibility spine runs through every module, not one chapter.

5. **Breadth versus depth.** Job postings name many tools, but the skills that appear in most postings are SQL, Python, modelling and testing (finding 3). Architecture consequence: depth on the first four, a single hands-on example for transformation as code, and concept-level treatment of orchestration engines, streaming and distributed processing, with a decision rule for when each is warranted (findings 24 and 32).

## Findings by topic

### A. The role and the market

**1. What a data engineer does, as a lifecycle.**
Reis and Housley frame data engineering as the lifecycle of generation, storage, ingestion, transformation and serving, with undercurrents of security, data management, DataOps, architecture and software engineering [S1]. A 2017 practitioner essay says the role grew out of business intelligence and data warehousing, borrows heavily from software engineering, moved from drag-and-drop ETL tools to code, and needs strong SQL, modelling and resilient pipeline design [S5]. That essay is old; its claim that star schemas matter less is a position, not a fact (see unverified table).
*Phrase it this way:* "Data engineers build and look after the systems that move data from where it is created to where people use it, and keep it correct on the way. One useful map of the work is: where data is created, where it is stored, how it is brought in, how it is changed, and how it is served."

**2. How the role differs from its neighbours.**
The US Bureau of Labor Statistics describes data scientists as people who collect and analyse data, build and test models, and turn findings into recommendations; it lists no data engineer page [S3, S4]. dbt Labs defines analytics engineers as people who model data so others can answer their own questions, who spend their time transforming, testing, deploying and documenting data (versus analysts, who analyse), and who apply version control and continuous integration to analytics code; it places the role between data engineering and analysis [S2]. The 2017 essay places data engineers closer to software engineers than to data scientists [S5]. Boundaries are blurry: postings for "analytics engineer" and "data engineer" in my scan both ask for SQL, modelling, testing, an orchestrator and a warehouse (finding 3) [S6].
*Phrase it this way:* "An analyst answers questions with data. A data scientist builds models from data. An analytics engineer shapes clean, tested tables for others to use. A data engineer builds the pipelines and systems that deliver the data. A backend engineer builds the application that creates it. In small teams one person does several of these."

**3. What current postings ask for (tally; anonymised).**
I read 25 hand-picked data engineer and analytics engineer postings (18 mid-level, 1 entry level, 4 senior, 2 internships; 10 stated remote) and scanned 90 unique roles from 51 company boards (34 without a senior-type word in the title) [S6, S7]. Full tables are in "Job posting tally" below. Headline: SQL and Python appear in about 85 percent of the 25 and about 70 percent of the 90; data modelling in 64 and 58 percent; testing or data-quality language in 68 percent of the 25; a cloud warehouse in 60 and 54 percent; dbt in 48 and 32 percent; a named orchestrator in 48 and 36 percent; Spark in 32 and 42 percent; a streaming engine in 20 and 36 percent. Streaming and table-format words rise sharply in senior titles (Kafka named in 4 of 34 non-senior roles, 24 of 90 overall). Pandas was named in 1 of 90 postings, Polars in 0, DuckDB in 1.
*Phrase it this way:* "In the postings we read in October 2026, SQL and Python were named in most, then data modelling, testing, a cloud data warehouse, dbt and an orchestrator such as Airflow. Spark and streaming tools were named less often in roles without a senior title. This is a sample of public postings, not a census."

**4. Level and location of postings.**
In the 90-role scan, 34 titles carry no senior word, and most of those ask for about 3 or more years (years in the 25-sample: 1 for one entry role, 2 to 4 for most mid-level roles) [S6, S7]. Only 10 of the 25 say remote in the location field, and several of those restrict to a country or region. Two of the 25 are internships. Three postings state that the interview includes an AI-use exercise or discussion [S7].
*Phrase it this way:* "Many data engineering postings ask for around three years of experience, and some are limited to certain countries. A portfolio project and clear explanations help, but we cannot promise a job."

**5. What interview loops contain.**
Practitioner and vendor guides describe five kinds of round: SQL, Python, data modelling, pipeline or system design, and behavioural with a project story [S9, S10]. Both guides say SQL is the gate. Typical SQL content: window functions, left joins with null handling, deduplication, tie handling in ranking [S9, S10]. Modelling: state the grain first, choose a star schema, choose SCD types, justify denormalisation [S9, S10]. Design: batch versus streaming, orchestration, late data, backfill, idempotency, failure modes, ask clarifying questions first [S9, S10]. Python: practical data wrangling, an idempotent ingestion job for a paginated API, malformed input [S9, S10]. One guide says the junior bar is a working answer to a scoped problem, a SQL-heavy loop with light modelling and no design round [S9]. Three first-party posting statements show real loops: recruiter call then technical sessions; a take-home then recruiter call then a technical interview then a behavioural and technical interview; recruiter, manager, behavioural, technical case study and reference check [S8]. The guides are vendor or staffing content; treat as indicative.
*Phrase it this way:* "Interview guides and a few employers describe a loop of a SQL round, a Python round, a data modelling round, a pipeline design round and a conversation about a project you built. For early-career roles the loop usually leans on SQL and Python. Rounds and order vary by employer."

### B. Tools: DuckDB and file formats

**6. DuckDB 2.0.0: version, licence, size.**
DuckDB 2.0.0 was released 2026-10-21 as an LTS release supported to 2027-10-22; the 1.4 LTS line ends 2026-11-17 and 1.5 is extended to March 2027 [S13, S14]. Python wheels for Windows (cp311, and abi3 for 3.12 and later) are 15.4 MB; the package requires Python 3.11 or later; the licence is MIT [S12, S24]. It runs inside the Python process, with no server [S24]. 2.0 databases cannot be read by older versions; the single-arrow lambda syntax is off by default; a new PEG parser is the default [S14].
*Phrase it this way:* "DuckDB is a free database (MIT licence) that runs inside your Python program. Version 2.0.0 is a long-term-support release. A database file written by 2.0 cannot be opened by older versions, so everyone in the course uses the same version."

**7. DuckDB offline behaviour: what is built in.**
In the 2.0.0 Windows wheel, `core_functions`, `icu`, `json` and `parquet` report `STATICALLY_LINKED`; `httpfs`, `sqlite_scanner`, `postgres_scanner`, `fts`, `iceberg`, `delta`, `spatial` and others report `NOT_INSTALLED` [S18]. DuckDB documents that `INSTALL` downloads from the core repository and caches under `~/.duckdb/extensions/<version>/<platform>` [S21], and that known extensions are auto-installed and auto-loaded by default [S20]. Reading and writing Parquet, CSV and JSON needs no download (tested with auto-install switched off) [S25]. Installing a downloaded extension from a local file was not covered in the pages I read: UNVERIFIED.
*Phrase it this way:* "Reading and writing CSV, JSON and Parquet works with what the DuckDB package already contains, so those steps run offline. Extensions that connect to other systems are downloaded the first time you use them; the course does not need them in the core path."

**8. Reading and writing Parquet, CSV, JSON and partitions.**
`COPY (...) TO 'file.parquet' (FORMAT parquet, ...)` supports `COMPRESSION` (default Snappy; also zstd, lz4, brotli, uncompressed), `COMPRESSION_LEVEL` and `ROW_GROUP_SIZE` [S15]. `PARTITION_BY (col)` writes hive-style folders such as `d=2026-01-01/`; it does not accept expressions, so derive partition columns in a subquery [S16]. Reading with `hive_partitioning` recovers the key from folder names; it is detected automatically for `key=value` folders [S16]. Researcher test: writing again into a non-empty partitioned folder fails with a "directory is not empty" error; `OVERWRITE_OR_IGNORE` replaces files and keeps the row count at 30; `APPEND` adds a second file and the row count becomes 60 [S25]. That is the idempotency lesson in one command. CSV and JSON were read by direct file name, including a JSON list column [S25].
*Phrase it this way:* "A partitioned write creates one folder per value. Writing twice into the same folder either fails, replaces the old files, or adds new files, depending on the option you choose. Replacing makes the job safe to rerun; appending can double your rows."

**9. Reading a DuckDB query plan.**
`EXPLAIN` shows the plan; `EXPLAIN ANALYZE` runs the query and adds the real row count and time per operator, plus files and row groups scanned [S22]. Researcher test: filtering a 10-folder hive dataset on the partition key showed "Scanning Files: 1/10", and a filter on a Parquet column showed the filter pushed into the scan with "Projections" listing only needed columns [S25]. PostgreSQL's `EXPLAIN ANALYZE` also executes the statement, so side effects happen unless wrapped in a transaction that is rolled back [S87]. SQLite's `EXPLAIN QUERY PLAN` distinguishes `SCAN` (visits all rows) from `SEARCH ... USING INDEX`, and its output format can change between releases [S84].
*Phrase it this way:* "A query plan tells you how the engine will read the data. Look for how many files and row groups it scans and which filters it pushed down. EXPLAIN ANALYZE really runs the query. Timings change from run to run, so compare plans and row counts, not exact milliseconds."

**10. Memory and out-of-core on a 4 GB laptop.**
DuckDB's `memory_limit` default is 80 percent of RAM, `threads` defaults to the number of CPU cores, and temporary files go to `<database>.tmp` (or `.tmp` for in-memory) [S20]. Joins, group-bys, sorts and window functions can spill to disk; a query with several blocking operators can still run out of memory; `string_agg` cannot spill; `SET preserve_insertion_order = false` can lower memory use on large imports [S19]. On a 4 GB machine the default limit is roughly 3.2 GB, which leaves little for the operating system: a documented setting, `SET memory_limit = '2GB'`, is the safe teaching default (the value is a course choice, not a documented recommendation).
*Phrase it this way:* "DuckDB can use disk when a query is too big for memory, but it is not magic. On a small laptop, set a memory limit so the computer stays usable."

**11. Parquet: row groups, column chunks, pages, statistics.**
A Parquet file holds N columns split into M row groups; each row group has one column chunk per column; metadata sits in a footer after the data, so a reader reads the footer first and then only the chunks it needs [S26]. Pages inside chunks carry values; the optional page index stores per-page min and max values so a reader can skip pages for a filter, and it was added because reading statistics from every page header forced readers to read most of a column [S29]. DuckDB's reader uses zonemaps to skip data when the file has them [S15]. Researcher test: `parquet_metadata()` showed per-row-group `stats_min` and `stats_max` for an id column (for example 0 to 100351, then 100352 to 200703) and dictionary encoding for a five-value string column [S25].
*Phrase it this way:* "A Parquet file stores each column separately and records the smallest and largest value in each block. When your filter cannot match a block, the reader skips it. This helps most when the data is sorted or grouped by the column you filter on."

**12. Encodings and compression.**
Dictionary encoding stores each distinct value once and the data pages store small integer references; it suits columns with many repeated values and falls back to plain when the dictionary grows too big [S27]. Run-length and bit-packing hybrid encoding stores repeats compactly and is used for levels, dictionary indices and booleans [S27]. Delta encodings suit integers with small differences and strings with shared prefixes [S27]. Parquet lists codecs UNCOMPRESSED, SNAPPY, GZIP, LZO, BROTLI, LZ4 (deprecated), ZSTD and LZ4_RAW and gives no speed or ratio figures [S28]. DuckDB defaults to Snappy and also offers zstd with a level setting [S15].
*Phrase it this way:* "Parquet shrinks repeated values with encodings and then applies a compression codec. How much smaller a file gets, and how fast it reads, depends on your data. Measure on your own files; do not trust a fixed ratio."

**13. File sizes and the small-files problem.**
DuckDB's guidance says row groups of 100,000 to 1,000,000 rows work best, its own benchmark found groups under 5,000 rows ran 5 to 10 times slower than well-sized groups, files of about 100 MB to 10 GB are ideal, and the total number of row groups across files should be at least the number of threads [S23]. The docs' benchmark is theirs, on their hardware. A managed warehouse's docs say partitioning can reduce cost by reducing the bytes a query reads [S101]; the course should say "engines that charge by data scanned" generically. Researcher test: an unpartitioned 10-folder write produced many tiny files for tiny data, which is expected and harmless at this scale [S25].
*Phrase it this way:* "Many tiny files make every read slower, because each file has its own footer and the reader has to open them all. For analytical files, aim for large files with many thousands of rows per row group, and test on your own data."

**14. pandas and Polars.**
pandas 3.1.0 (BSD-3-Clause, Python 3.11 or later) and Polars 2.0.0 (MIT, Python 3.10 or later) are current; Polars ships a 54 MB runtime wheel for Windows plus a small front package, pandas needs NumPy; pyarrow 26.0.0 (Apache-2.0) is 28.5 MB [S30, S33, S34, S53]. Polars has a lazy API: `scan_csv`, `scan_parquet` and others build a query that runs end to end, so the optimiser can apply predicate pushdown and projection pushdown and the streaming engine can handle data larger than memory [S31, S32]. In my postings scan, pandas was named in 1 of 90 roles and Polars in 0; both are usually covered by the word "Python" [S6]. The 2025 Stack Overflow survey lists Polars at 3.8 percent of all respondents (as a tag section) and DuckDB at 3.3 percent; I could not see pandas there [S11].
*Phrase it this way:* "pandas is the long-standing Python table library; Polars is a newer one with a lazy mode that plans the whole query before running it. Job postings mostly say 'Python', not which table library. In this course SQL in DuckDB does the heavy work and a dataframe library is optional."

### C. Transformation, orchestration and testing

**15. dbt versions, licences and the September 2026 renaming. (Fast moving; verify before publish.)**
- **dbt Core v1.x** is Python, Apache-2.0. v1.12 was released 2026-07-16 and has active support to 2027-07-15; v1.11 critical support ends 2026-12-18; v1.13 will be the last 1.x minor and get critical fixes for "several (3 to 5) years" [S37, S38]. Latest on PyPI: dbt-core 1.12.6 (2026-10-14), requires Python 3.10 or later [S35]. The DuckDB adapter `dbt-duckdb` 1.11.0 (2026-08-07, Apache-2, Python 3.10 or later) requires dbt-core 1.8 or later and DuckDB 1.0 or later [S36].
- **dbt v2** reached general availability 2026-09-14. `pip install dbt` is the default install; `pip install dbt-oss` is the Apache-2.0 subset. The names "dbt Fusion engine" and "dbt Core v2" were renamed "dbt" and "dbt OSS" on 2026-09-15 [S37, S38, S39]. The full "dbt" distribution is governed by a Product Licensing Agreement, free to run locally with no user cap; the restriction is on offering it as a hosted service to others [S38]. dbt OSS is Apache-2.0 [S38]. On Windows the wheels are 130.4 MB (dbt) and 75.9 MB (dbt-oss) and the PyPI package is a small stub that downloads them at install time [S40]. v2 has the DuckDB adapter built in, marked Beta; the bundled driver does not load DuckDB extensions; and static analysis may warn on models that read local files [S41].
*Phrase it this way:* "dbt has two generations. Version 1 (dbt Core) is Python and Apache-2.0. Version 2, released in September 2026, is a new engine with a free full edition and an Apache-2.0 open-source edition. This course pins version 1.12 and notes what changes in version 2."

**16. dbt features the course would teach (all confirmed in docs).**
- Models and `ref`/`source`, `seeds` (small static CSVs; not for large files, not for sensitive data such as PII) [S48].
- Incremental materialization with `is_incremental()` and `unique_key`; without a key most adapters append, so duplicates accumulate; filtering with `>=` includes records arriving later on the same day; `on_schema_change` has `ignore` (default), `fail`, `append_new_columns`, `sync_all_columns`, and none of them backfill old rows [S42].
- Microbatch incremental strategy: `event_time`, `batch_size` (hour, day, month, year), `begin`, `lookback` (default 1) to reprocess prior batches for late records; each batch is an independent unit that can be retried or backfilled; all times assumed UTC; `dbt retry` reruns failed batches; adapter support is required [S43].
- Data tests: built-in `unique`, `not_null`, `accepted_values`, `relationships`; singular tests; `severity`; `store_failures`; the YAML key `data_tests` [S45].
- Unit tests (since v1.8): mock `given` inputs and `expect` outputs for SQL models; recommended in development and CI, not production; incremental behaviour can be tested with overrides [S44].
- Model contracts: `contract: {enforced: true}` with declared names, types and constraints for `table`, `view` and `incremental` models; contracts check shape at build time, tests check content afterwards [S46].
- Snapshots implement type-2 slowly changing dimensions with `dbt_valid_from` and `dbt_valid_to`; strategies `timestamp` (recommended) and `check`; YAML-defined from v1.9; `hard_deletes` options `ignore`, `invalidate`, `new_record`; snapshots cannot be rebuilt, so keep them in their own schema [S47].
- Docs: `dbt docs generate` and `dbt docs serve` build and preview a documentation site from YAML descriptions and doc blocks [S49]. Source freshness: `loaded_at_field`, `warn_after`, `error_after`, `dbt source freshness` [S50].
Researcher test: one small project using a seed, a view, a microbatch model, two data tests, one unit test and a snapshot passed 7 of 7 on dbt-core 1.12.6 + dbt-duckdb 1.11.0 + DuckDB 2.0.0 on Windows [S51]. The same project folder passed 7 of 7 on dbt OSS 2.0.8 [S52].
*Phrase it this way:* "A dbt model is a SELECT statement saved as a file. dbt runs the files in dependency order and builds tables. Tests and unit tests check your assumptions. A test passing means the checks you wrote passed, not that the data is correct."

**17. Installing the stack on Windows: the long-path trap.**
Windows paths are limited to 260 characters (MAX_PATH) unless an application opts in and a registry setting is enabled with administrator rights [S54]. Researcher observation: `pip install dbt-duckdb` into a virtual environment created under a deep folder failed with a "no such file or directory" error on a file nested inside the metricflow package; the same install succeeded when the virtual environment was created at `C:\tmp-de\v1` [S54]. Python's own path length and the dbt packaging depth interact; the exact threshold was not measured.
*Phrase it this way:* "On Windows, create your virtual environment in a short folder such as C:\de\venv. Long folder names can make the install fail with a confusing 'file not found' message."

**18. Orchestration: Apache Airflow.**
Airflow 3.3.2 (Apache-2.0) supports Python 3.10 to 3.14. The official docs say Airflow runs on POSIX-compliant systems; "on Windows you can run it via WSL2 or via Linux containers"; native Windows support is tracked but "not a high priority"; production should use Linux [S55]. Resolving its dependencies on Windows pulled 129 packages and about 44 MB of downloads, which shows it installs files, not that it is supported [S53, S56]. Best practices: tasks should produce the same outcome on every rerun; avoid heavy top-level code in DAG files; read and write a specific partition using `data_interval_start`, not the latest data; prefer upsert to insert [S57]. Catchup creates runs for missed intervals; a backfill re-runs a past period (CLI `airflow backfill create` with `--from-date` and `--to-date`); the logical date marks the start of an interval, not the execution time [S58].
*Phrase it this way:* "Airflow is a widely used scheduler where you describe tasks and their order. It is built for Linux; on Windows people use WSL2 or containers. We study it by reading a small example and building the same ideas ourselves."

**19. Orchestration: Dagster and Prefect.**
Dagster 1.13.26 (Apache-2.0, Python 3.10 to 3.14): installed from wheels on Windows, two assets with a retry policy materialised successfully; the install took 71 packages, about 39 MB to download and about 91 MB installed [S53, S59, S62]. Dagster partitions come in time-based, static, two-dimensional and dynamic kinds; the docs recommend limiting partitions per asset (the limit figure was cut off in my read: UNVERIFIED) [S61]. Dagster's installation page says Python 3.10 or higher with 3.13 recommended and lists Windows steps but no support statement [S60]. Prefect 3.9.0 (Apache-2.0, Python 3.11 or later) supports Windows in its install docs, but running it needs an API server (Prefect Cloud or a self-hosted server) and it has more than 40 direct dependencies [S63].
*Phrase it this way:* "Dagster and Prefect are open-source alternatives to Airflow that also run on Windows. They are not needed to learn the ideas of dependencies, retries, schedules and backfills; the course builds those ideas with a short Python script and shows how the tools express them."

### D. Streaming and distributed processing

**20. Kafka: the log, topics, partitions, ordering, consumer groups, offsets.**
An event has a key, value, timestamp and optional headers; topics store events durably and reading does not remove them; a topic is split into partitions; events with the same key go to the same partition; ordering is guaranteed within a partition, not across the topic; retention is configured per topic; a common production replication factor is 3 [S64]. A consumer's position in a partition is a single integer, the offset; within a consumer group each partition is consumed by exactly one consumer at a time; a consumer can deliberately rewind to an old offset and re-consume [S65]. Log compaction keeps at least the last value per key and uses a null value as a delete marker (tombstone) [S65].
*Phrase it this way:* "Kafka is a log: new events are added to the end and readers keep their own bookmark (the offset). Order is kept inside one partition, not across a whole topic. Use the same key for events that must stay in order."

**21. Delivery semantics: what exactly-once does and does not cover.**
Kafka's docs define at most once (may lose, never redeliver), at least once (never lose, may redeliver; the default) and exactly once (each message processed once and only once) [S65]. The idempotent producer, on by default in current clients (`enable.idempotence` default true, `acks` default all), stops duplicates caused by producer retries; setting a `transactional.id` allows atomic writes to several partitions and offset commits in the same transaction; consumers need `isolation.level=read_committed` [S65, S66]. The docs say exactly-once for other destination systems "generally requires cooperation with such systems" and that the practical method is to store the offset with the output [S65]. Kafka Streams supports exactly-once on Kafka topics [S65].
*Phrase it this way:* "Kafka can avoid duplicates when it reads from Kafka and writes back to Kafka using transactions. When the data goes to a database or a file, the result is only as exact as that system's design, so you still need keys that make a write safe to repeat."

**22. Event time, processing time, late data, watermarks.**
Event time is when something happened; processing time is when the system sees it; the gap varies and arrival order need not match occurrence order [S68]. Event-time windows give correct groupings but cost buffering and force the question of when a window is complete; Akidau argues completeness is often unknowable, so results may need updating [S68]. A watermark with timestamp t says event time has reached t, so no further events at or before t are expected; late events arrive after the watermark passed their timestamp, and systems may accept some with allowed lateness [S69]. In batch dbt the same idea appears as `lookback` in microbatch [S43].
*Phrase it this way:* "An event has a time when it happened and a time when we received it. They differ. Late records are normal, so a pipeline needs a rule for how long it waits and what it does when something arrives after that."

**23. Spark basics and when one machine is enough.**
Spark has a driver (runs `main()`, coordinates), a cluster manager, executors (run tasks, store data) and tasks sent from driver to executors [S70]. A shuffle redistributes data so it is grouped differently across partitions, and costs disk I/O, serialisation and network I/O; it is triggered by repartitioning, "ByKey" operations and joins [S71]. Spark 4.2.0 runs on Windows and Unix-like systems, needs Java 17, 21 or 25, and has a single-machine `local` mode [S72]. The PySpark download is 450 MB [S73]. McSherry, Isard and Murray (2015) propose COST, the configuration that outperforms a single thread, and report that many published distributed systems had a surprisingly large COST, often hundreds of cores, or underperformed one thread [S74]. DuckDB documents larger-than-memory processing for joins, aggregates, sorts and windows with stated limits [S19]. I found no source that gives a rule like "use Spark above N gigabytes": UNVERIFIED, and any such number is a rule of thumb.
*Phrase it this way:* "Spark splits work across many machines, and moving data between them (a shuffle) is expensive. A modern laptop with DuckDB or Polars handles much larger data than people expect. Reach for a cluster when the data or the work really does not fit one machine, and measure first."

**24. Lakes, warehouses, lakehouses and open table formats.**
A table format adds a metadata layer over data files. Iceberg tracks the files of each snapshot in a metadata tree, commits by an atomic swap of the table metadata file, readers use the snapshot that was current when they loaded the metadata, and writers commit optimistically [S75, S76]. Iceberg tracks columns by unique IDs, so adding a column never revives old data, and partition layout can change on an existing table [S77]. Delta Lake's transaction-log protocol targets serializable ACID writes and snapshot isolation for reads on files in an object store [S78, S79]. DuckDB 2.0 lists Iceberg and Delta among core extension improvements; not needed in core [S14]. Plain Parquet files have no snapshots, atomic multi-file commits or schema history of their own: that is an inference from the contrast and should be phrased as "a table format adds".
*Phrase it this way:* "A folder of Parquet files is simple but has no safe way to change many files at once. Table formats such as Iceberg and Delta keep a log of snapshots, so a change either happens fully or not at all, and you can see earlier versions."

**25. Change data capture (CDC): query-based versus log-based.**
Query-based: a connector polls with a `WHERE` on an increasing id or a timestamp column. A commercial connector's docs say deleted records are not captured, incrementing mode will not detect modifications or deletions, and timestamp mode needs a non-null timestamp column [S82]; another connector's docs say timestamp mode misses changes whose timestamp is not newer than the recorded maximum [S83]. Log-based: Debezium reads PostgreSQL logical decoding, records each change with its log position (LSN) as the offset, takes a consistent initial snapshot, and emits create, update, delete and read events with `before` and `after` values; deletes include old values depending on `REPLICA IDENTITY`; DDL is not reported; connectors may add load to the source [S80, S81]. Clock issues for query-based CDC (skewed or non-monotonic `updated_at`) are a logical consequence, not stated in the pages read: UNVERIFIED as a sourced statement.
*Phrase it this way:* "Polling for rows changed since the last run is simple, but it cannot see deleted rows and trusts a timestamp column. Reading the database's own change log catches deletes and every intermediate change, at the cost of more setup and load on the source."

### E. SQL engines and data modelling

**26. SQLite and PostgreSQL as OLTP stand-ins; indexes and plans.**
SQLite ships with Python; Python 3.12.10 here bundles SQLite 3.49.1 [S86]. Window functions arrived in SQLite 3.25.0 (2018-09-15) and the built-ins include `row_number`, `rank`, `dense_rank`, `lag`, `lead` and `ntile` [S85]. `EXPLAIN QUERY PLAN` in SQLite shows `SCAN t1` before an index and `SEARCH t1 USING INDEX i1 (a=?)` after `CREATE INDEX`, and `USING COVERING INDEX` when the index holds every needed column [S84]. PostgreSQL 18.6 `EXPLAIN` shows Seq Scan versus Index Scan with estimated cost, and compare estimated rows with actual rows after `EXPLAIN ANALYZE` to spot bad statistics [S87]. The B-tree structure itself is not explained in the pages read; teach the idea (sorted structure that avoids reading everything) without detail.
*Phrase it this way:* "An index lets the database find rows without reading the whole table. Use the query plan to check whether your index is used: a SCAN reads everything; a SEARCH using an index reads only part."

**27. Kimball dimensional modelling: grain, facts, dimensions, star versus snowflake, conformed dimensions.**
Declaring the grain is the pivotal step; it establishes exactly what one fact table row represents, and every dimension and fact must be consistent with it; atomic grain (the lowest level captured) is recommended; each grain gets its own fact table [S88]. The four-step process is: select the business process, declare the grain, identify the dimensions, identify the facts [S89]. A fact table holds numeric measures of a measurement event plus foreign keys to its dimensions; a transaction fact table row is one measurement event at a point in space and time [S97]. A star schema is fact tables linked to dimension tables by keys [S90]. A snowflaked dimension normalises a dimension's hierarchies into secondary tables, which Kimball says to avoid because it is harder for users and can hurt performance [S92]. Conformed dimensions share the same column names and domain contents across fact tables, which lets reports combine them [S91]. Surrogate keys are anonymous integers assigned by the warehouse because natural keys can repeat when history is tracked [S96].
*Phrase it this way:* "Start with one sentence: one row in this table is one ... (for example, one distribution of one parcel to one household). Everything else must fit that sentence. If it does not, you have two tables."

**28. Slowly changing dimensions, types 1, 2 and 3.**
Type 1 overwrites the old value and destroys history; aggregates built on it must be recomputed [S93]. Type 2 adds a new row with a new surrogate key for each change, plus at least row-effective date, row-expiration date and a current-row indicator [S94]. Type 3 adds a new attribute to hold the prior value and is used relatively infrequently [S95]. dbt snapshots implement type 2 [S47].
*Phrase it this way:* "Type 1 forgets the old value. Type 2 keeps every version as its own row with dates. Type 3 keeps just one earlier value in an extra column. Choose by what question the business needs to ask about the past."

**29. Normalisation, OLTP versus OLAP.**
DuckDB describes itself as built for analytical workloads (long-running queries over large parts of a dataset, bulk loads), contrasting this with engines that handle rows one at a time, and uses a columnar, vectorised execution engine [S24]. Kimball describes dimensional models as measurements plus descriptive context, distinct from the normalised snowflake shape [S90, S92]. I did not read a primary source on normal forms (Codd or a textbook), so the definitions of first to third normal form should be written from a cited textbook before publish: UNVERIFIED in this dossier.
*Phrase it this way:* "A transaction system (OLTP) is built for many small reads and writes of single records. An analytics system (OLAP) is built to scan and total many records. They are shaped differently on purpose."

### F. Pipelines, quality and responsibility

**30. ETL versus ELT, idempotency, backfills, incremental loads, deduplication, late data, schema evolution.**
- Idempotency: tasks should give the same outcome on every rerun; use partition-addressed reads and upserts, not "latest" or `datetime.now()` [S57].
- Backfill: re-run past intervals on purpose; Airflow's catchup and backfill commands and dbt's `--event-time-start/--event-time-end` do this [S43, S58].
- Incremental: dbt's `unique_key` turns append into replace-by-key; without it late data for an old period is appended as extra rows [S42].
- Late data: microbatch `lookback` reprocesses prior batches [S43]; DuckDB tested: `APPEND` doubled rows, `OVERWRITE_OR_IGNORE` did not [S25].
- Schema evolution: dbt `on_schema_change` options [S42]; Iceberg column IDs [S77]; DuckDB reads Parquet with `union_by_name` [S15].
- ETL versus ELT: I found no primary source defining or ranking them. The 2017 essay notes the move from drag-and-drop ETL tools to code [S5]. Teach "transform before loading or after loading" as a trade-off, with this course loading raw files first and transforming in the warehouse.
*Phrase it this way:* "A good pipeline can be run again for any day and give the same answer. To make this true, write each day's result to its own place and replace it, instead of adding to it."

**31. Data quality: tests, contracts, freshness, observability.**
dbt data tests return failing rows; zero rows means pass; unique and not_null belong on every primary key [S45]. Model contracts check a model's shape at build time [S46]. Source freshness compares a timestamp column with the clock using `warn_after` and `error_after`; run checks at least twice as often as the shortest SLA [S50]. The Open Data Contract Standard (ODCS, v3.2.0, Apache-2.0, maintained by Bitol) is a YAML structure with sections including schema, data quality, team, roles, service-level agreement and support [S98, S99]. OpenLineage is an open framework for lineage metadata with datasets, jobs and runs, an LF AI & Data project [S100]. "Data observability" as a practice has no primary standard I could read; the course can describe it as monitoring freshness, volume, schema and distribution, which map to tests above.
*Phrase it this way:* "Check the things you rely on: the key is unique, nothing important is empty, the data is fresh, and the columns still look like last week's. Write down who owns the data and what it promises, then test that promise."

**32. Privacy: minimisation, purpose limitation, pseudonymisation, anonymisation.**
The ICRC handbook (3rd edition, 2024) treats fairness and lawfulness, purpose limitation (define specific, legitimate purposes at collection; reuse only if compatible), data minimisation (process the minimum personal data needed; delete when no longer needed), data quality (correct inaccurate data; harm example: wrongly excluding someone from aid) and retention (a defined retention period per category; delete all copies) as basic principles [S105]. GDPR Article 4(5) defines pseudonymisation as processing so personal data cannot be attributed to a person without additional information kept separately under technical and organisational measures [S102]. Recital 26 says pseudonymised data is information on an identifiable person, identifiability is judged by all means reasonably likely to be used, with objective factors such as cost and time and available technology, and that data protection principles do not apply to anonymous information [S103]. The UK regulator says pseudonymised data stays personal data for anyone holding the extra information [S104].
*Phrase it this way:* "Keep only the personal data you need, for the purpose you stated, for as long as you need it. Replacing a name with a code is pseudonymisation: it lowers risk but the data is still about a person. Anonymous means the person can no longer be identified by any means reasonably likely to be used."

**33. Why an unsalted hash of a phone number or ID is not anonymous.**
The UK regulator advises against unsalted hashing and against outdated algorithms such as MD5 and SHA-1, which are vulnerable to brute force; peppers (secret, stored apart) or salts make attack harder; tokenisation with random tokens has no mathematical link to the original; a mapping table must be stored separately [S104]. Researcher test: SHA-256 of 10 million synthetic eight-digit phone-style numbers took 11.3 seconds in plain Python on one core, so a full eight-digit range would take about two minutes [S106]. The joint EDPS and AEPD paper on hashing exists but returned an access error (403) and was not read [S107]. Do not describe its contents.
*Phrase it this way:* "A hash is a one-way scramble, but phone numbers and ID numbers come from a small set, so an attacker can hash every possible value and compare. A hash of such a value is pseudonymised data at best. Use a secret key (a pepper) kept apart from the data, or random tokens."

**34. Access control, retention, governance.**
Retention: define a period per data category, reassess, delete all copies and ask third parties to delete theirs [S105]. Seeds are not for sensitive data [S48]. Contracts name ownership and roles [S99]; lineage records which jobs produced which datasets [S100]. A governance "catalogue" has no primary source in this dossier: describe it as the documentation site (dbt docs) and the contract file, and mark any wider claim as the course's opinion.
*Phrase it this way:* "Decide who is allowed to read raw personal data and give everyone else a version with codes instead of identities. Decide how long each kind of data is kept, and delete it on time."

**35. Cost awareness.**
A managed warehouse's docs state that partitioning can reduce cost by reducing bytes a query reads, and that pruning applies when a filter uses the partition column [S101]. DuckDB shows the same pruning locally ("Scanning Files: 1/10") [S25]. File-size guidance is in finding 13 [S23].
*Phrase it this way:* "Some services charge by how much data a query reads. Storing data in partitions and filtering on the partition column means less data is read. You can see this in the plan on your own laptop."

**36. Version control and continuous integration for data projects.**
dbt recommends running unit tests in development and CI, not production [S44]. A hosted CI service is free for public repositories on standard runners and the free plan includes 2,000 minutes a month for private ones [S108]. pytest 9.1.1 (MIT, Python 3.10 or later) is the test runner candidate [S109]. A CI workflow can install the pinned stack and run `pytest` and `dbt build` on a small sample; the dbt 7-step build ran in under two seconds on a toy project [S51].
*Phrase it this way:* "Every change is saved in Git and checked by an automatic run on a small sample of data before it is accepted."

### G. Existing courses

**37. What free courses teach and assume.**
- The DataTalksClub Data Engineering Zoomcamp (free; next live cohort January 2027; self-paced possible) covers containers and infrastructure as code with a cloud provider and Terraform, workflow orchestration with Kestra, data ingestion, a cloud warehouse, analytics engineering with dbt (DuckDB and a cloud warehouse), a data platform tool, batch processing with Spark, streaming with Kafka, and a final project with peer review. Docker, Terraform and a cloud provider are taught in module 1; the page does not name a required cloud account or cloud costs: UNVERIFIED how much a learner must spend [S117].
- dbt Fundamentals is free, about 5 hours, requires basic SQL; the post I could read is from December 2021 and describes starting with dbt Cloud and a free two-week trial, so it may be out of date: verify [S118].
- Dagster University lists Dagster Essentials, AI Driven Data Engineering and Dagster & ETL; its page does not mention DuckDB, cloud accounts, prerequisites or price [S119].
Gaps for a local-first course: the Zoomcamp assumes cloud and container setup and downloads for most modules; dbt courses assume a warehouse; none, from what I read, combines SQL interview rehearsal, idempotency and late-data labs, privacy by design and a portfolio defence in one offline path. That is an observation from three pages, not a survey.
*Phrase it this way (if a course is mentioned):* "Free courses exist that use cloud accounts and containers. This course runs entirely on your laptop after one download so that weak internet and power cuts do not stop you."

## Tool table

All rows checked 2026-10-24. Windows column: "tested" means a researcher test on Windows 11, Python 3.12.10.

| Tool | Version | Licence | Windows support | Install notes (download size) | Source | Date |
|---|---|---|---|---|---|---|
| DuckDB (Python package) | 2.0.0 (LTS, released 2026-10-21, supported to 2027-10-22) | MIT | Tested; wheels cp311 and abi3 for 3.12+ | `pip install duckdb==2.0.0`; wheel 15.4 MB; Python 3.11+; Parquet, JSON, ICU built in; other extensions download on first use | S12, S13, S18 | 2026-10-24 |
| Apache Parquet (format) | Format docs, no version pinned | Apache-2.0 (project) | Not applicable (file format) | Read and written by DuckDB, pyarrow, Polars | S26 to S29 | 2026-10-24 |
| pyarrow | 26.0.0 | Apache-2.0 | Wheels for 3.11 to 3.15 | 28.5 MB wheel; optional | S34 | 2026-10-24 |
| pandas | 3.1.0 (2026-10-22) | BSD-3-Clause | Wheels (about 10.7 MB) | Python 3.11+; needs NumPy; optional | S33 | 2026-10-24 |
| Polars | 2.0.0 (2026-10-06) | MIT | Wheels; runtime wheel 54.2 MB | Python 3.10+; front package plus `polars-runtime-32`; optional | S30 | 2026-10-24 |
| dbt Core + dbt-duckdb | dbt-core 1.12.6 (2026-10-14) + dbt-duckdb 1.11.0 (2026-08-07) | Apache-2.0 (both) | Tested 7 of 7 | `pip install dbt-core==1.12.6 dbt-duckdb==1.11.0`; with DuckDB and pytest about 41 MB download, about 121 MB installed; v1.12 active support to 2027-07-15 | S35, S36, S37, S51, S53 | 2026-10-24 |
| dbt OSS (v2) | 2.0.8 | Apache-2.0 | Tested 7 of 7 on the same project | `pip install dbt-oss`; stub downloads a 75.9 MB wheel from a project release; about 165 MB installed with pip; DuckDB adapter built in, Beta, no extensions in bundled driver | S38, S40, S41, S52 | 2026-10-24 |
| dbt (v2 full distribution, formerly "dbt Fusion engine") | 2.0.9 | Product Licensing Agreement for the binary; Apache-2.0 for the OSS code; free to run locally | Wheel for win_amd64 (130.4 MB); winget and PowerShell installers | `pip install dbt` is the default install; formerly ELv2 before 2026-06-01 | S38, S39, S40 | 2026-10-24 |
| Apache Airflow | 3.3.2 | Apache-2.0 | Not native: WSL2 or Linux containers only (official docs) | Python 3.10 to 3.14 except 3.15; 129 packages when resolved on Windows (about 44 MB download); do not install in core | S55, S56, S53 | 2026-10-24 |
| Dagster | 1.13.26 | Apache-2.0 | Tested: two assets with retry policy materialised | 71 packages, about 39 MB download, about 91 MB installed; Python 3.10 to 3.14; optional stretch | S59, S60, S62 | 2026-10-24 |
| Prefect | 3.9.0 | Apache-2.0 | Supported per docs | Python 3.11+; many dependencies; needs a server or cloud; not recommended | S63 | 2026-10-24 |
| Apache Kafka | 4.3.1 (docs 4.3) | Apache-2.0 (project; not re-verified on a page) | Quickstart gives Linux and macOS commands with one Windows line for a file step; broker on Windows not stated: UNVERIFIED | Needs Java 17+; explain only | S64, S67 | 2026-10-24 |
| Apache Spark / PySpark | 4.2.0 | Apache-2.0 | Runs on Windows and Unix-like systems per docs | Needs Java 17, 21 or 25; PySpark download 450 MB; explain only | S72, S73 | 2026-10-24 |
| Apache Iceberg | docs 1.12.0 | Apache-2.0 (project; not re-verified on a page) | Not applicable | Concept only | S75 to S77 | 2026-10-24 |
| Delta Lake | not shown on pages read | Not stated on pages read: UNVERIFIED | Not applicable | Concept only | S78, S79 | 2026-10-24 |
| Debezium | docs 3.7 | Not stated on pages read: UNVERIFIED | Not applicable | Concept only | S80, S81 | 2026-10-24 |
| PostgreSQL | 18.6 documented; 19 RC1 released 2026-10-15 | Not re-verified on a page | Not installed in core | Read plan docs only | S87 | 2026-10-24 |
| SQLite (Python stdlib) | 3.49.1 bundled with Python 3.12.10 | Public domain (not re-verified on a page) | Tested via Python | No install; window functions since 3.25.0 | S85, S86 | 2026-10-24 |
| pytest | 9.1.1 | MIT | Tested | Python 3.10+ | S109 | 2026-10-24 |
| Great Expectations | 1.24.1 (PyPI only) | Apache-2.0 (PyPI) | Not tested | Not recommended; dbt tests cover the need | S120 note in unverified table | 2026-10-24 |

## Job posting tally (anonymised)

Method: public job-board interfaces of company boards, queried on 2026-10-24 for titles containing "data engineer", "analytics engineer", "BI engineer", "ETL" or "data platform engineer"; one aggregator that republished roles from hidden employers was excluded. 90 unique roles remained from 51 boards (de-duplicated by board and title); 34 had no senior-type word (senior, staff, principal, lead, director, manager) in the title [S6]. The 25-posting sample was hand-picked from these for mid-level and entry roles plus four senior and two internship listings for contrast, and read in full [S7]. Counting is by keyword in the posting text; it is crude (a posting that says "tests" may not mean the same as another) and the "privacy or governance" count is probably inflated by boilerplate, so do not use it for weighting.

**Hand-read sample of 25 (J1 to J25).**

| ID | Description (no employer names) | Level | Years stated | Location scope | Listing date |
|---|---|---|---|---|---|
| J1 | Consumer social software company, analytics engineer | Mid | 3+ | Remote, US | updated 2026-10-23 |
| J2 | Fintech lender, analytics engineer II | Mid | 3+ | Remote, Poland | 2026-10-16 |
| J3 | Networking software company, analytics engineer | Mid | not stated | Remote, Canada and US | 2026-09-29 |
| J4 | Workplace software company, analytics engineer | Mid | 4+ (text also mentions 8) | Remote, North America | 2026-08-11 |
| J5 | Fleet and IoT software company, data engineer | Mid | 4+ | Remote, US | 2026-10-22 |
| J6 | Search software company, analytics engineer (HR analytics) | Mid | 2+ | US (not stated remote) | 2026-10-12 |
| J7 | Fintech spend management company, data engineer | Mid | 3+ | US and Brazil listings | 2026-10-13 |
| J8 | Work management software company, data engineer | Mid | 3+ | Poland office | 2026-09-15 |
| J9 | Mobility company, data engineer | Mid | 4+ | Canada, hybrid | 2026-10-19 |
| J10 | Online meal-kit company, data engineer | Mid | 3+ | Poland office | 2026-10-15 |
| J11 | Caller-ID software company, data engineer | Mid | 3+ | Sweden office | 2026-09-17 |
| J12 | Payments company, data engineer | Mid | not stated | Latvia or Portugal | 2026-10-23 |
| J13 | Payments company, data platform engineer (mid-level) | Mid | 3 to 4+ | Germany office | 2026-10-19 |
| J14 | Food-delivery company, analytics engineer (BI platform) | Mid | 3+ | UK office | 2026-10-16 |
| J15 | Biotech software company, data engineer | Mid | 3+ | US office | 2026-08-28 |
| J16 | AI research company, data engineer | Mid | 3+ | US office | 2026-10-06 |
| J17 | Developer platform company, FinOps data engineer | Mid | not stated | Remote, global | 2026-10-14 |
| J18 | AI startup, analytics engineer (business operations) | Mid | 3+ | US office | 2026-09-14 |
| J19 | Digital-asset exchange, senior market data engineer | Senior | 3+ | Remote, US | 2026-10-21 |
| J20 | Analytics software company, data engineer (internal operations) | Entry | 1+ | US office | not shown |
| J21 | Payments company, senior data engineer | Senior | 5+ | Remote, Africa | 2026-10-21 |
| J22 | Compliance software company, senior analytics engineer | Senior | not stated | Remote, US | 2026-10-01 |
| J23 | Communications platform company, senior analytics engineer | Senior | 4 to 5+ | Remote, US | 2026-10-20 |
| J24 | Digital-asset exchange, data engineer internship | Intern | none | US, hybrid | 2026-10-13 |
| J25 | Digital-asset platform, data engineer internship | Intern | none | Spain office | 2026-10-13 |

Level counts: 18 mid, 1 entry, 4 senior, 2 internships. Stated remote: J1 to J5, J17, J19, J21, J22, J23 (10 of 25). Access date for all: 2026-10-24.

**Skill counts.**

| Skill (keyword family) | Of 25 sample | Of 90 roles | Of 34 non-senior titles |
|---|---|---|---|
| SQL | 22 (88%) | 62 (69%) | 27 (79%) |
| Python | 21 (84%) | 64 (71%) | 27 (79%) |
| Testing or data-quality language | 17 (68%) | not counted | not counted |
| Data modelling (dimensional, star, schema design) | 16 (64%) | 52 (58%) | 21 (62%) |
| A named cloud data warehouse | 15 (60%) | 49 (54%) | 20 (59%) |
| A named cloud platform | 13 (52%) | not counted | not counted |
| dbt | 12 (48%) | 29 (32%) | 12 (35%) |
| A named orchestrator (Airflow, Dagster, Prefect) | 12 (48%) | 32 (36%) | 14 (41%) |
| Airflow specifically | 12 (48%) | 31 (34%) | 14 (41%) |
| Git or version control | 10 (40%) | not counted | not counted |
| A BI tool | 10 (40%) | not counted | not counted |
| Monitoring or observability language | 10 (40%) | not counted | not counted |
| Spark | 8 (32%) | 38 (42%) | 11 (32%) |
| CI/CD | 8 (32%) | 18 (20%) | 8 (24%) |
| A streaming engine (Kafka, Kinesis, Flink, Pub/Sub) | 5 (20%) | 32 (36%) | 9 (26%) |
| Kafka specifically | 5 (20%) | 24 (27%) | 4 (12%) |
| Docker or Kubernetes | 3 (12%) | 20 (22%) | 5 (15%) |
| Infrastructure as code (Terraform) | 4 (16%) | 10 (11%) | 4 (12%) |
| Lakehouse table format (Iceberg or Delta) | 1 (4%) | 12 (13%) | 2 (6%) |
| pandas | 1 | 1 | 1 |
| Polars | 0 | 0 | 0 |
| DuckDB | 0 | 1 | 0 |

Caveats: three boards' public interfaces, boards chosen by me, mostly larger software and fintech companies in North America and Europe, English language, one day. It cannot say anything about freelance or NGO work, which does not use these boards.

**What the tally says for roadmap weight.** SQL, Python, modelling and tests deserve the most hours. dbt and an orchestrator are each in roughly a third to a half of roles, worth one hands-on tool (dbt) and one explained tool (Airflow). Spark and streaming are named in a third or more of all roles but less in non-senior roles for Kafka (4 of 34); treat them as concepts a junior can discuss. Docker, Terraform and Iceberg are rare in non-senior roles.

## Interview loop summary

| Round | What it usually contains | What a junior is expected to do | Course topics that prepare for it | Source |
|---|---|---|---|---|
| Recruiter or manager screen | Motivation, a project you built, stack fit | Explain your portfolio pipeline in plain words | Capstone README and runbook | S8, S10 |
| SQL | Window functions, left joins and nulls, deduplication, ties in ranking, conditional aggregation, speed | Write a correct query, explain it, avoid double counting | SQL module with drills; `EXPLAIN` | S9, S10 |
| Python | Practical wrangling: group, merge, parse messy input, an idempotent ingestion job | Handle bad input, write a small tested function | Ingestion chapter; pytest | S9, S10 |
| Data modelling | State the grain, star schema, SCD choices, justify denormalisation | Draw a small star schema and state the grain first | Modelling module | S9, S10 |
| Pipeline or system design | Batch versus streaming, orchestration, late data, backfill, idempotency, failure modes, ask questions first | Often not asked at junior level; if asked, name failure modes unprompted | Pipelines and quality modules | S9, S10 |
| Take-home or case study | A small pipeline build, often dbt or notebook-based, 3 to 6 hours | Deliver a runnable repo with tests and a README | Capstone | S8, S10 |
| Behavioural | Past project in structure, trade-offs, separating your part from the team's | Tell the story of your capstone with numbers | Interview module | S9 |

Practitioner guides say rejections often come from speed and clarity in coding rounds and missing trade-offs in design rounds [S9]; that is a vendor claim from community data and unverified. Two postings state that interviews include AI-use discussion or exercises [S7].

## Production failure modes (sourced)

These can appear as short real-world events in chapters. Wording must stay inside what the sources say.

1. **Lost cases in a spreadsheet format (England, 2020).** Lab results were passed as text files and loaded into spreadsheet templates; developers used the older XLS format, so each template held about 65,000 rows, which the author calculates as about 1,400 cases because each test produced several rows; once a template filled, further cases were left out. About 16,000 confirmed cases were missed from the daily figures between 25 September and 2 October 2020; the cases were added later, but contacts were not traced promptly; the fix was to split data across smaller spreadsheets, which the author calls a stopgap. Lesson: a format has limits, and a pipeline needs a row-count check between each stage. Source: S112 (secondary, a university professor's article; the 1,400 figure is the author's calculation).

2. **Spreadsheet software changed gene names into dates.** A 2016 Genome Biology paper by Ziemann, Eren and El-Osta reported that, with default settings, a spreadsheet program converts some gene symbols (examples: SEPT2, MARCH1) into dates or numbers, and that roughly one fifth of papers with supplementary gene lists contained such errors, from 35,175 files screened. Lesson: type inference corrupts identifiers; declare types and keep leading zeros and codes as text. Source: S113 (abstract-level only, via a search summary; full text not read; verify before publish).

3. **A unit mismatch lost a spacecraft (1999).** The NASA Mishap Investigation Board found the small-forces velocity-change data delivered in the AMD file was in pound-force seconds instead of the specified newton-seconds, so values were low by a factor of 4.45. Lesson: units belong in column names or a contract and are checked at interfaces. Source: S111 (primary report; read with a PDF text tool).

4. **Backups that had never been tested (2017).** GitLab's postmortem: an engineer deleted the data directory on the primary database instead of the secondary while rebuilding replication, removing about 300 GB; the regular dump had been failing silently because the tool version did not match the database and the failure emails were rejected; data created between 17:20 and about 23:30 UTC was lost, with an estimated 5,000 projects, 5,000 comments and 700 user accounts; recovery took about 18 hours from a 6-hour-old snapshot. Stated lesson: nobody owned or regularly tested recovery; automate restore tests and monitor backups. Source: S110 (first-party postmortem; the post gives two end times, 23:30 and 00:00).

5. **Duplicate versions counted as separate records (public audit data, 2026).** A US federal audit data site reported that, before a formal resubmission process existed, corrections were new full records, so one audit can appear several times as independent records; analysts who total award amounts or finding counts can double count; the interim advice is to match on identifiers and keep the most recently accepted record; the fix will add version numbers and mark old versions deprecated, not delete them. Lesson: a dataset needs a rule for which version is current; deduplicate on a business key. Source: S114 (public body, discovered 2026-04-10).

6. **A clock that went backwards (2017).** A DNS service computed response time by subtracting two wall-clock readings; a leap second made some differences negative; the negative value reached a function that panics on negative input; about 0.2 percent of DNS queries were affected at peak and the patch reached all data centres by 06:45 UTC. Lesson: never assume time moves forward; check for negative durations before using them. Source: S115 (first-party postmortem).

7. **Local times that repeat or do not exist (concept, not an incident).** At the end of daylight saving time some local times occur twice and at the start some do not exist; Python's `datetime` stores only the wall-clock reading, so PEP 495 added a `fold` attribute to say which occurrence is meant. Lesson: store timestamps in UTC with an offset and convert only for display. I could not find a formal published postmortem of a data pipeline daylight-saving incident; do not present one as real. Source: S116.

## What not to teach

Given 55 to 60 hours and the learners' bandwidth:

- **Installing Spark, Kafka, Flink, Airflow or Kubernetes.** Reason: installs of 450 MB plus Java, Java 17 plus a broker, and Linux-only support [S55, S67, S73]. Explain with diagrams, a COST-style "do I need it" memo, and small Python models.
- **Cloud warehouses, Terraform, Docker stacks.** Reason: brief non-goal; Docker/Terraform appear in 3 and 4 of 25 postings, and in the Zoomcamp's first module they are the first barrier [S7, S117].
- **Iceberg and Delta hands-on.** Reason: 1 of 25 and 2 of 34 non-senior postings; concept only (finding 24).
- **dbt platform, the VS Code extension, semantic layer, packages beyond a single mention.** Reason: scope; not needed for the capstone.
- **Normal forms beyond what explains a star schema and OLTP versus OLAP.** Reason: no primary source read and brief non-goal on database internals.
- **B-tree internals, query optimiser theory.** Reason: brief; teach plans and indexes by symptoms.
- **Great Expectations or other quality frameworks.** Reason: dbt tests plus Python asserts cover the learning goal; adds a dependency [S120 note].
- **Salary and hiring-rate statistics.** Reason: no data engineer page in the labour statistics source read and no verified salary source [S4].
- **A pandas versus Polars debate.** Reason: postings do not separate them (1 and 0 of 90); SQL in DuckDB is the core.
- **Real personal data in any example.** Reason: care rules and finding 32.

## Source table

Type: P = primary (spec, official docs, public body, first-party report), F = first-party engineering or vendor documentation for its own product, S = secondary, R = researcher test or scan (own evidence). Confidence: H, M, L.

| ID | Claim | Source URL | Type | Date checked | Confidence |
|---|---|---|---|---|---|
| S1 | Reis and Housley lifecycle (generation, storage, ingestion, transformation, serving) and five undercurrents; book published June 2022 | https://xebia.com/blog/fundamentals-of-data-engineering/ | S (review; book not read) | 2026-10-24 | M |
| S2 | dbt Labs definition of analytics engineers vs analysts and data engineers | https://www.getdbt.com/analytics-engineering/ | F | 2026-10-24 | H |
| S3 | Data scientist role description, education, 2025 pay and growth; page modified 2026-08-27 | https://www.bls.gov/ooh/math/data-scientists.htm | P | 2026-10-24 | H |
| S4 | Database architect role; page does not mention data engineers (O*NET link to data warehousing specialists) | https://www.bls.gov/ooh/computer-and-information-technology/database-administrators.htm | P | 2026-10-24 | H |
| S5 | 2017 essay: data engineering, relation to BI, software engineering, code-based ETL | https://www.freecodecamp.org/news/the-rise-of-the-data-engineer-91be18f1e603/ | S (practitioner, 2017) | 2026-10-24 | M |
| S6 | Researcher scan: 90 unique roles from 51 boards, keyword tallies | https://boards-api.greenhouse.io/v1/boards/ (also api.lever.co/v0/postings and api.ashbyhq.com/posting-api/job-board) | R | 2026-10-24 | M |
| S7 | The 25 hand-read postings (see Appendix) | See Appendix, URLs J1 to J25 | R | 2026-10-24 | M |
| S8 | Three first-party interview-process statements in postings | https://job-boards.greenhouse.io/monzo/jobs/8013699 ; https://job-boards.eu.greenhouse.io/moniepoint/jobs/5012754101 ; https://job-boards.greenhouse.io/doctolib/jobs/7795798003 | P (postings) | 2026-10-24 | M |
| S9 | Five-round loop, junior expectations, common traps (vendor page) | https://datadriven.io/data-engineer-interview-prep | S | 2026-10-24 | L |
| S10 | Loop timings, SQL as gate, idempotent ingestion question, take-home 3 to 6 hours (staffing firm) | https://www.kore1.com/data-engineer-interview-questions/ | S | 2026-10-24 | L |
| S11 | 2025 survey: DuckDB 3.3 percent, Polars 3.8 percent of all respondents; pandas not seen | https://survey.stackoverflow.co/2025/technology | S | 2026-10-24 | M |
| S12 | DuckDB 2.0.0 on PyPI: MIT classifier, Python 3.11+, win_amd64 wheel 15.4 MB, upload 2026-10-21 | https://pypi.org/project/duckdb/ | F | 2026-10-24 | H |
| S13 | DuckDB 2.0.0 LTS to 2027-10-22; 1.4 LTS to 2026-11-17 | https://duckdb.org/release_calendar | F | 2026-10-24 | H |
| S14 | DuckDB 2.0 announcement: storage format, lambda syntax, PEG parser, Iceberg and Delta updates | https://duckdb.org/2026/10/21/announcing-duckdb-200 | F | 2026-10-24 | H |
| S15 | Parquet read and write options, Snappy default, zstd, row_group_size, pushdown, zonemaps | https://duckdb.org/docs/2.0/data/parquet/overview.html | F | 2026-10-24 | H |
| S16 | Hive partitioning: PARTITION_BY, auto-detection, pruning, no expressions | https://duckdb.org/docs/2.0/data/partitioning/hive_partitioning.html | F | 2026-10-24 | H |
| S17 | Core extensions table and backup repository (no built-in detail) | https://duckdb.org/docs/2.0/core_extensions/overview.html | F | 2026-10-24 | M |
| S18 | Researcher test: `duckdb_extensions()` shows parquet, json, icu, core_functions statically linked | local test, duckdb 2.0.0 Windows | R | 2026-10-24 | H |
| S19 | Spilling, blocking operators, preserve_insertion_order, row-group parallelism | https://duckdb.org/docs/2.0/guides/performance/how_to_tune_workloads.html | F | 2026-10-24 | H |
| S20 | memory_limit 80 percent of RAM, threads, temp_directory, autoinstall and autoload defaults true | https://duckdb.org/docs/2.0/configuration/overview.html | F | 2026-10-24 | H |
| S21 | INSTALL from core repo, cache location, extension_directories | https://duckdb.org/docs/2.0/extensions/installing_extensions.html | F | 2026-10-24 | M |
| S22 | EXPLAIN ANALYZE runs the query; shows rows, time, row groups | https://duckdb.org/docs/2.0/guides/meta/explain_analyze.html | F | 2026-10-24 | H |
| S23 | Row group and file-size guidance and benchmark | https://duckdb.org/docs/2.0/guides/performance/file_formats.html | F | 2026-10-24 | M |
| S24 | MIT licence, OLAP focus, in-process, columnar-vectorised | https://duckdb.org/why_duckdb | F | 2026-10-24 | H |
| S25 | Researcher test: partitioned write, pruning "1/10", stats, row-group sizes, OVERWRITE_OR_IGNORE and APPEND, CSV and JSON reads | local test, duckdb 2.0.0 Windows | R | 2026-10-24 | H |
| S26 | Parquet file layout: row groups, column chunks, footer | https://parquet.apache.org/docs/file-format/ | P | 2026-10-24 | H |
| S27 | Dictionary, RLE, delta encodings | https://parquet.apache.org/docs/file-format/data-pages/encodings/ | P | 2026-10-24 | H |
| S28 | Codec list; no ratios given | https://parquet.apache.org/docs/file-format/data-pages/compression/ | P | 2026-10-24 | H |
| S29 | Page index and min/max skipping | https://parquet.apache.org/docs/file-format/pageindex/ | P | 2026-10-24 | H |
| S30 | Polars 2.0.0, MIT, Python 3.10+, runtime wheel 54.2 MB | https://pypi.org/project/polars/ | F | 2026-10-24 | H |
| S31 | Polars lazy API, scan_* functions | https://docs.pola.rs/user-guide/lazy/using/ | F | 2026-10-24 | H |
| S32 | Polars optimisations: predicate, projection, slice pushdown | https://docs.pola.rs/user-guide/lazy/optimizations/ | F | 2026-10-24 | H |
| S33 | pandas 3.1.0 BSD-3-Clause, Python 3.11+; pyarrow 26.0.0 Apache-2.0, 28.5 MB | https://pypi.org/project/pandas/ ; https://pypi.org/project/pyarrow/ | F | 2026-10-24 | H |
| S34 | (merged into S33; kept for numbering) | see S33 | F | 2026-10-24 | H |
| S35 | dbt-core 1.12.6, Apache-2.0, Python 3.10+, uploaded 2026-10-14 | https://pypi.org/project/dbt-core/ | F | 2026-10-24 | H |
| S36 | dbt-duckdb 1.11.0, Apache-2, requires dbt-core 1.8+, duckdb 1.0+ | https://pypi.org/project/dbt-duckdb/ | F | 2026-10-24 | H |
| S37 | dbt version support table: v1.12 to 2027-07-15; v2.0 released 2026-09-14 | https://docs.getdbt.com/docs/dbt-versions/core | F | 2026-10-24 | H |
| S38 | Licensing FAQ: Apache-2.0 for v1 and OSS, Product Licensing Agreement, renaming 2026-09-15, v1.13 final minor | https://www.getdbt.com/licenses-faq | F | 2026-10-24 | H |
| S39 | v2 install: `pip install dbt`, winget, PowerShell, default is v2, dbt-oss option | https://docs.getdbt.com/docs/local/install-dbt | F | 2026-10-24 | H |
| S40 | PyPI stubs dbt 2.0.9 and dbt-oss 2.0.8; Windows wheels 130.4 MB and 75.9 MB | https://pypi.org/project/dbt/ ; https://pypi.org/project/dbt-oss/ | F, R (sizes via HTTP headers) | 2026-10-24 | H |
| S41 | v2 DuckDB adapter: Beta, bundled driver no extensions, static analysis caveat | https://docs.getdbt.com/docs/local/connect-data-platform/duckdb-setup.md | F | 2026-10-24 | H |
| S42 | Incremental models: is_incremental, unique_key, strategies, late data, on_schema_change | https://docs.getdbt.com/docs/build/incremental-models | F | 2026-10-24 | H |
| S43 | Microbatch: event_time, batch_size, begin, lookback, retry, UTC | https://docs.getdbt.com/docs/build/incremental-microbatch | F | 2026-10-24 | H |
| S44 | Unit tests: since 1.8, given/expect, limits, dev and CI | https://docs.getdbt.com/docs/build/unit-tests | F | 2026-10-24 | H |
| S45 | Data tests: generic and singular, severity, store_failures, data_tests key | https://docs.getdbt.com/docs/build/data-tests | F | 2026-10-24 | H |
| S46 | Model contracts: enforced, data types, materializations, shape vs content | https://docs.getdbt.com/docs/mesh/govern/model-contracts | F | 2026-10-24 | H |
| S47 | Snapshots: SCD2, strategies, YAML from 1.9, hard_deletes | https://docs.getdbt.com/docs/build/snapshots | F | 2026-10-24 | H |
| S48 | Seeds: small static CSVs, not large files, not sensitive data | https://docs.getdbt.com/docs/build/seeds | F | 2026-10-24 | H |
| S49 | dbt docs generate and serve; YAML descriptions and doc blocks | https://docs.getdbt.com/docs/build/documentation | F | 2026-10-24 | M |
| S50 | Source freshness config and command | https://docs.getdbt.com/docs/deploy/source-freshness | F | 2026-10-24 | H |
| S51 | Researcher test: dbt-core 1.12.6 + dbt-duckdb 1.11.0 + duckdb 2.0.0, 7 of 7 passed | local test | R | 2026-10-24 | H |
| S52 | Researcher test: same project on dbt-oss 2.0.8, 7 of 7; read_parquet and read_csv models built | local test | R | 2026-10-24 | H |
| S53 | Researcher measurements: pip download sizes and installed sizes | local measurement (`pip download`, `du`) | R | 2026-10-24 | H |
| S54 | MAX_PATH 260 and long-path opt-in; researcher observation of pip failure under a deep path | https://learn.microsoft.com/en-us/windows/win32/fileio/maximum-file-path-limitation | P, R | 2026-10-24 | M |
| S55 | Airflow runs on POSIX; Windows via WSL2 or containers; Python 3.10 to 3.14 | https://airflow.apache.org/docs/apache-airflow/stable/installation/prerequisites.html | F | 2026-10-24 | H |
| S56 | apache-airflow 3.3.2, Apache-2.0 on PyPI | https://pypi.org/project/apache-airflow/ | F | 2026-10-24 | H |
| S57 | Airflow best practices: idempotency, data_interval_start partitions, upsert | https://airflow.apache.org/docs/apache-airflow/stable/best-practices.html | F | 2026-10-24 | H |
| S58 | Airflow catchup, backfill, logical date | https://airflow.apache.org/docs/apache-airflow/stable/core-concepts/dag-run.html | F | 2026-10-24 | H |
| S59 | dagster 1.13.26, Apache-2.0, Python 3.10 to 3.14 | https://pypi.org/project/dagster/ | F | 2026-10-24 | H |
| S60 | Dagster install: Python 3.10+, 3.13 recommended; Windows activation steps | https://dagster.io/docs/getting-started/installation | F | 2026-10-24 | M |
| S61 | Dagster partition kinds | https://dagster.io/docs/guides/build/partitions-and-backfills/partitioning-assets | F | 2026-10-24 | M |
| S62 | Researcher test: Dagster materialize of two assets with RetryPolicy, success on Windows | local test | R | 2026-10-24 | H |
| S63 | Prefect 3.9.0, Apache-2.0, Python 3.11+; Windows supported; needs API server or cloud | https://docs.prefect.io/v3/get-started/install ; https://pypi.org/project/prefect/ | F | 2026-10-24 | H |
| S64 | Kafka events, topics, partitions, per-partition order, retention, replication | https://kafka.apache.org/intro | F | 2026-10-24 | H |
| S65 | Kafka delivery semantics, idempotence, transactions, offsets, compaction | https://kafka.apache.org/43/design/design/ | F | 2026-10-24 | H |
| S66 | enable.idempotence default true; acks default all; transactional.id | https://kafka.apache.org/43/configuration/producer-configs/ | F | 2026-10-24 | H |
| S67 | Kafka quickstart: Java 17+, version 4.3.1 | https://kafka.apache.org/quickstart | F | 2026-10-24 | H |
| S68 | Event time, processing time, windows, completeness, late data | https://www.oreilly.com/radar/the-world-beyond-batch-streaming-101/ | P (author's essay) | 2026-10-24 | H |
| S69 | Flink: watermark definition, late events | https://nightlies.apache.org/flink/flink-docs-stable/docs/concepts/time/ | F | 2026-10-24 | H |
| S70 | Spark driver, executors, cluster manager, tasks | https://spark.apache.org/docs/latest/cluster-overview.html | F | 2026-10-24 | H |
| S71 | Spark shuffle: what, why expensive, which operations | https://spark.apache.org/docs/latest/rdd-programming-guide.html | F | 2026-10-24 | H |
| S72 | Spark 4.2.0 runs on Windows; Java 17/21/25; local mode | https://spark.apache.org/docs/latest/ | F | 2026-10-24 | H |
| S73 | pyspark 4.2.0 download 450 MB, Apache-2.0 | https://pypi.org/project/pyspark/ | F | 2026-10-24 | H |
| S74 | COST paper (McSherry, Isard, Murray, 2015) | https://www.usenix.org/system/files/conference/hotos15/hotos15-paper-mcsherry.pdf | P | 2026-10-24 | H |
| S75 | Iceberg: snapshots, atomic commit, serializable isolation | https://iceberg.apache.org/docs/latest/reliability/ | F | 2026-10-24 | H |
| S76 | Iceberg spec: metadata file swap, manifests, optimistic concurrency | https://iceberg.apache.org/spec/ | P | 2026-10-24 | H |
| S77 | Iceberg evolution: column IDs, partition evolution | https://iceberg.apache.org/docs/latest/evolution/ | F | 2026-10-24 | H |
| S78 | Delta transaction log protocol goals: serializable writes, snapshot reads | https://raw.githubusercontent.com/delta-io/delta/master/PROTOCOL.md | P | 2026-10-24 | H |
| S79 | Delta Lake intro: ACID, schema enforcement, time travel | https://docs.delta.io/latest/delta-intro.html | F | 2026-10-24 | M |
| S80 | Debezium PostgreSQL: logical decoding, LSN offset, snapshot, event ops, caveats | https://debezium.io/documentation/reference/stable/connectors/postgresql.html | F | 2026-10-24 | H |
| S81 | Debezium FAQ: source load; cascade deletes not in MySQL binlog | https://debezium.io/documentation/faq/ | F | 2026-10-24 | M |
| S82 | A commercial JDBC source connector: deletes not captured, incrementing mode limits, timestamp not nullable | https://docs.confluent.io/cloud/current/connectors/cc-oracle-db-source.html | F | 2026-10-24 | M |
| S83 | JDBC source modes: timestamp and incrementing limits | https://aiven.io/docs/products/kafka/kafka-connect/concepts/jdbc-source-modes | F | 2026-10-24 | M |
| S84 | SQLite EXPLAIN QUERY PLAN: SCAN, SEARCH, covering index | https://www.sqlite.org/eqp.html | P | 2026-10-24 | H |
| S85 | SQLite window functions since 3.25.0 | https://www.sqlite.org/windowfunctions.html | P | 2026-10-24 | H |
| S86 | Researcher: Python 3.12.10 bundles SQLite 3.49.1 | local test | R | 2026-10-24 | H |
| S87 | PostgreSQL 18.6 EXPLAIN and EXPLAIN ANALYZE; ANALYZE executes the query | https://www.postgresql.org/docs/current/using-explain.html | P | 2026-10-24 | H |
| S88 | Kimball: grain is the pivotal step, binding contract, atomic grain | https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/kimball-techniques/dimensional-modeling-techniques/grain/ | P | 2026-10-24 | H |
| S89 | Kimball four-step process | https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/kimball-techniques/dimensional-modeling-techniques/four-4-step-design-process/ | P | 2026-10-24 | H |
| S90 | Kimball: star schemas and OLAP cubes | https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/kimball-techniques/dimensional-modeling-techniques/star-schema-olap-cube/ | P | 2026-10-24 | H |
| S91 | Kimball: conformed dimensions | https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/kimball-techniques/dimensional-modeling-techniques/conformed-dimension/ | P | 2026-10-24 | H |
| S92 | Kimball: snowflaked dimensions, avoid | https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/kimball-techniques/dimensional-modeling-techniques/snowflake-dimension/ | P | 2026-10-24 | H |
| S93 | Kimball SCD type 1 overwrite | https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/kimball-techniques/dimensional-modeling-techniques/type-1/ | P | 2026-10-24 | H |
| S94 | Kimball SCD type 2 add new row, three columns | https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/kimball-techniques/dimensional-modeling-techniques/type-2/ | P | 2026-10-24 | H |
| S95 | Kimball SCD type 3 add new attribute | https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/kimball-techniques/dimensional-modeling-techniques/type-3/ | P | 2026-10-24 | H |
| S96 | Kimball surrogate keys | https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/kimball-techniques/dimensional-modeling-techniques/dimension-surrogate-key/ | P | 2026-10-24 | H |
| S97 | Kimball fact table structure and transaction fact tables | https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/kimball-techniques/dimensional-modeling-techniques/fact-table-structure/ | P | 2026-10-24 | H |
| S98 | Open Data Contract Standard v3.2.0, Apache-2.0, Bitol | https://github.com/bitol-io/open-data-contract-standard | P | 2026-10-24 | H |
| S99 | ODCS sections: schema, quality, team, roles, SLA, support | https://bitol-io.github.io/open-data-contract-standard/latest/ | P | 2026-10-24 | H |
| S100 | OpenLineage: datasets, jobs, runs, facets; LF AI & Data project | https://openlineage.io/docs/ | F | 2026-10-24 | M |
| S101 | A managed warehouse's docs: partitioning reduces bytes read and cost | https://docs.cloud.google.com/bigquery/docs/partitioned-tables | F | 2026-10-24 | H |
| S102 | GDPR Article 4(5) pseudonymisation definition (unofficial reproduction of the Regulation) | https://gdpr-info.eu/art-4-gdpr/ | S (text of P; official copy on EUR-Lex) | 2026-10-24 | H |
| S103 | GDPR Recital 26: pseudonymised data identifiable; anonymous information | https://gdpr-info.eu/recitals/no-26/ | S (text of P) | 2026-10-24 | H |
| S104 | ICO: pseudonymised data stays personal; avoid unsalted hashing, MD5, SHA-1; salts, peppers, tokens | https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/data-sharing/anonymisation/pseudonymisation/ | P | 2026-10-24 | H |
| S105 | ICRC Handbook chapter 2: purpose limitation, minimisation, quality, retention | https://www.cambridge.org/core/product/identifier/9781009414630%23CN-bp-2/type/book_part | P | 2026-10-24 | H |
| S106 | Researcher test: SHA-256 of 10^7 synthetic numbers in 11.3 s in Python | local test | R | 2026-10-24 | H |
| S107 | EDPS and AEPD hash paper (2019): not read; access returned 403 | https://edps.europa.eu/data-protection/our-work/publications/papers/introduction-hash-function-personal-data_en | P (UNREAD) | 2026-10-24 | none |
| S108 | CI hosting: free for public repos on standard runners; 2,000 minutes on free plan | https://docs.github.com/en/billing/concepts/product-billing/github-actions | F | 2026-10-24 | H |
| S109 | pytest 9.1.1 MIT, Python 3.10+ | https://pypi.org/project/pytest/ | F | 2026-10-24 | H |
| S110 | GitLab January 2017 database outage postmortem | https://about.gitlab.com/blog/postmortem-of-database-outage-of-january-31/ | F | 2026-10-24 | H |
| S111 | NASA MCO Phase I report: lb-sec instead of N-sec, factor 4.45 | https://discovery.larc.nasa.gov/PDF_FILES/MCO_report_2.pdf | P | 2026-10-24 | H |
| S112 | England case data lost to XLS limit, about 16,000 cases, 25 Sept to 2 Oct 2020 | https://theconversation.com/why-you-should-never-use-excel-to-count-coronavirus-cases-147681 | S (academic author) | 2026-10-24 | M |
| S113 | Ziemann, Eren, El-Osta 2016: gene names converted by spreadsheet defaults (abstract level) | https://genomebiology.biomedcentral.com/articles/10.1186/s13059-016-1044-7 | P (not fully read) | 2026-10-24 | M |
| S114 | Federal audit data: duplicate submissions, double counting risk | https://www.fac.gov/data/reliability/concerns/2026-07-01-duplicate-submissions/ | P | 2026-10-24 | H |
| S115 | Leap second and negative time difference in a DNS service | https://blog.cloudflare.com/how-and-why-the-leap-second-affected-cloudflare-dns/ | F | 2026-10-24 | H |
| S116 | PEP 495: ambiguous and missing local times, fold attribute | https://peps.python.org/pep-0495/ | P | 2026-10-24 | H |
| S117 | DataTalksClub Data Engineering Zoomcamp modules and prerequisites | https://github.com/DataTalksClub/data-engineering-zoomcamp | S | 2026-10-24 | M |
| S118 | dbt Fundamentals: about 5 hours, requires SQL, dbt Cloud trial (2021 post) | https://www.getdbt.com/blog/new-learn-courses | F (dated) | 2026-10-24 | L |
| S119 | Dagster University course list | https://courses.dagster.io/ | F | 2026-10-24 | M |
| S120 | Great Expectations 1.24.1 on PyPI, Apache-2.0, Python 3.10 to 3.14 (not otherwise read) | https://pypi.org/project/great-expectations/ | F | 2026-10-24 | M |

S34 is merged into S33 and kept as a placeholder so IDs stay stable. That gives 119 distinct rows, which is above the 70 to 110 target: S17, S34, S79, S100, S107 and S120 can be dropped by the writers if they want a shorter table.

## Unverified or overstated claims

| Popular claim | Status | Correct framing |
|---|---|---|
| "Parquet is N times smaller or faster than CSV" | No fixed ratio is sourced. Parquet docs give none [S28]; DuckDB's own benchmark found Parquet queries 1.1 to 5.0 times slower than its native database format [S23] | "Parquet usually stores analytical data in less space and lets engines skip columns and blocks. Measure on your own files." |
| "Columnar storage is always faster" | Overstated: it helps scans of a few columns over many rows; no source covers point lookups | "Columnar layouts suit reports that read a few columns of many rows. Row layouts suit looking up one record." |
| "Snappy is fast, zstd is small" | Docs do not compare them [S23, S28] | "Codecs trade file size against speed. Try two on your data." |
| "Spark is always needed for big data" | Unsupported. Spark docs offer a local mode [S72]; McSherry et al. show single-thread baselines can beat distributed systems [S74]; DuckDB documents larger-than-memory processing [S19] | "Measure first. A single machine with an efficient engine often suffices; use a cluster when it does not." No size threshold is sourced: UNVERIFIED. |
| "Exactly once is guaranteed end to end" | False as stated: external systems must cooperate [S65] | "Kafka supports exactly-once for read-process-write between Kafka topics. For other destinations, make the write safe to repeat." |
| "Kafka keeps global order" | False: order is per partition [S64] | "Order holds within a partition. Use a key to keep related events together." |
| "ELT has replaced ETL" | No primary source; the 2017 essay says tools moved from drag-and-drop to code, not ELT versus ETL [S5] | "Two orders of work with different trade-offs. This course loads first, then transforms." |
| "Star schemas are dead" | A 2017 opinion [S5]; Kimball techniques are still documented [S88 to S97]; job postings in 52 of 90 roles mention modelling [S6] | "Dimensional modelling is a widely used way to organise analytical tables. Other designs exist." |
| "Hashing a phone number or ID anonymises it" | False for small input spaces. Regulator advises against unsalted hashing [S104]; test showed a ten-million range hashed in 11.3 seconds [S106] | "A hash of a phone number is pseudonymised at best. Use a secret key or random tokens, and keep the mapping apart." |
| "Pseudonymised data is not personal data" | False under Recital 26 [S103, S104] | "Pseudonymised data is still about a person." |
| "dbt Fusion is source-available under the Elastic licence" | Outdated since 2026-06-01; the engine code is Apache-2.0 and the full binary is under a Product Licensing Agreement [S38] | "Version 2 has a full edition (free to run locally, Product Licensing Agreement) and an open-source Apache-2.0 edition." |
| "dbt Core is deprecated" | False: v1.12 has active support to 2027-07-15; v1.13 will be the last 1.x minor with several years of critical fixes [S37, S38] | "Version 1 is supported; version 2 is the new default install." |
| "Airflow runs on Windows" | Only through WSL2 or containers per docs; resolving packages on Windows does not equal support [S55] | "Airflow is built for Linux." |
| "Every data engineer needs Spark and Kafka" | Not borne out: Spark in 11 of 34, Kafka in 4 of 34 non-senior postings [S6] | "Spark and Kafka are common in larger or senior roles; know the ideas." |
| "Polars has replaced pandas in job postings" | Not borne out: pandas 1 of 90, Polars 0 of 90 [S6]; Polars 3.8 percent in a survey tag section [S11] | "Postings ask for Python and SQL. Pick one dataframe library and learn the idea." |
| "Data engineer salaries are X" or "entry-level jobs are plentiful" | No salary source read; 1 of 25 sampled postings was entry level (1 year) [S7] | "Many postings ask for about three years; we cannot promise a job." |
| "The data engineering lifecycle comes from X" | Credited through a review, not the book [S1] | Credit Reis and Housley, say the five stages without quoting. |
| "DuckDB extensions need internet" | Partly false: parquet, json, icu are built in [S18]; others download | "Core reading and writing works offline; some extensions download on first use." |
| "Idempotent means it runs only once" | Misstatement of [S57] | "Running it twice gives the same result as running it once." |
| "A passing test means the data is correct" | Overstated [S45] | "Tests check the assumptions you wrote." |
| "dbt-duckdb works with all DuckDB extensions under dbt v2" | False for the bundled driver [S41] | "Under dbt v2 the bundled DuckDB driver does not load extensions." |
| "Default DuckDB memory use is safe on small laptops" | The default is 80 percent of RAM [S20], which is risky at 4 GB | "Set a memory limit on small machines." |
| Offline install of extensions from a file | Not covered in the pages read | UNVERIFIED; avoid in the core path. |
| Exact row-group size equals the requested size | Observed 100,351 rows for a request of 100,000 [S25] | "Row-group size is approximate." |
| Dagster partition limit figure | Text cut off during reading [S61] | UNVERIFIED; do not quote a number. |
| Delta Lake, Debezium and Iceberg licences | Not stated on the pages read | State "open source" only after checking the project repositories at G5. |
| Kafka runs on Windows | Quickstart does not say [S67] | UNVERIFIED; not in core. |
| Clock skew breaks timestamp-based CDC | Logical consequence, not stated in pages read [S82, S83] | Present as reasoning, not as a cited fact. |
| Normal forms (1NF to 3NF) definitions | No primary source read | Source a textbook before writing. |
| ETL tools and data observability "five pillars" | Vendor content only; not used | Describe observability as monitoring freshness, volume, schema and distribution, and label it as practice. |

## Credits

| Idea or term | Credit to | How chapters should credit it |
|---|---|---|
| Dimensional modelling, grain, fact and dimension tables, conformed dimensions, surrogate keys, SCD types 1 to 3, four-step design process | Ralph Kimball and the Kimball Group [S88 to S97] | "Kimball's dimensional modelling" on first use; then plain words. |
| The data engineering lifecycle (generation, storage, ingestion, transformation, serving) and undercurrents | Joe Reis and Matt Housley, "Fundamentals of Data Engineering" (O'Reilly, 2022) [S1] | One credit line when the map is shown; the book was not read, only a review, so do not paraphrase beyond the five stage names. |
| Event time, processing time, unbounded data, windows, completeness | Tyler Akidau, "The world beyond batch: Streaming 101" [S68] | Credit the vocabulary; explain in the course's words. |
| "Scalability! But at what COST?" | Frank McSherry, Michael Isard, Derek G. Murray (2015) [S74] | Name the paper in the "do I need a cluster" chapter. |
| "Analytics engineer" as a role, models, tests, snapshots, microbatch | dbt Labs and the dbt documentation [S2, S42 to S47] | Credit dbt for tool terms; keep the role definition attributed. |
| The "rise of the data engineer" essay | Maxime Beauchemin [S5] | Credit if quoted; also known for the "functional data engineering" idea on idempotent partitioned tasks, which I could not read (page returned 403): do not attribute details. |
| Open Data Contract Standard | Bitol project [S98, S99] | Credit by name when the sample contract is shown. |
| OpenLineage | LF AI & Data project [S100] | Name only when lineage is described. |
| Data protection principles in humanitarian action | ICRC Handbook on Data Protection in Humanitarian Action, edited by Massimo Marelli [S105] | Credit by title; paraphrase, no long quotes. |
| Pseudonymisation and anonymisation definitions | GDPR Article 4(5) and Recital 26 [S102, S103] | Cite article and recital numbers. |
| Hashing guidance | UK regulator guidance [S104]; EDPS and AEPD joint paper (unread) [S107] | Cite the regulator page only. |
| Change data capture tooling vocabulary (LSN, snapshot, REPLICA IDENTITY) | Debezium project [S80] | Credit the project when its names are used. |

## Outline changes recommended for the roadmap

Evidence base: findings 3, 4, 5 and the tool facts above. These are recommendations for the curriculum architect, not a roadmap.

**Weights (suggested share of the 55 to 60 hours, as a proposal).** SQL in depth and query plans, about 15 percent; data modelling, about 12; pipelines (idempotency, incremental, late and duplicate data, backfills, CDC concepts), about 20; file formats and storage, about 7; processing (DuckDB, a dataframe library, when Spark), about 6; transformation as code (dbt), about 12; orchestration, about 6; streaming basics, about 5; data quality, about 5; responsibility (privacy, cost, version control and CI), about 8; role and interview prep woven in, about 4 on top of the capstone. These numbers are my proposal from posting frequency and interview rounds, not sourced figures.

**Top changes, in priority order.**
1. **Make SQL and modelling the front half and the longest.** SQL is named in 88 percent of the sample and 79 percent of non-senior roles and is the gate in every interview guide read [S6, S9, S10]. Include window functions, deduplication, double-counting traps, `EXPLAIN` and an index demonstration in SQLite or DuckDB. Put grain and a star schema before any tool.
2. **Make pipeline correctness the spine, taught on DuckDB.** The tested `COPY ... PARTITION_BY` behaviour (error, overwrite, append) and dbt microbatch (`lookback`, backfill by date range) give exact, deterministic demonstrations of idempotency, late data and backfills [S25, S43, S51]. Use the 25 postings' emphasis on testing and modelling.
3. **Teach dbt hands-on, orchestration by building a small scheduler.** dbt appears in 48 percent of the sample and 35 percent of non-senior roles and runs offline [S6, S51]. Write a 50 to 80 line Python runner with dependencies, retries, a run log and a date-range backfill, then show how Airflow and Dagster express the same ideas. Dagster installed and ran on Windows (about 91 MB) and can be an optional stretch; Airflow stays diagrams only [S55, S62].
4. **Cut and shrink.** Cut Spark installs, Kafka installs, Terraform, Docker, cloud accounts and table-format hands-on. Teach streaming with a file-based log and offsets in Python, plus the Kafka delivery-semantics reading, and a one-page memo "do I need a cluster" built on the COST paper and measured DuckDB runs [S65, S74].
5. **Weave responsibility through the whole course.** Synthetic PII in the raw zone from module 1, a pseudonymised layer, a hashing break demonstration, retention rules, a sample data contract in YAML, and a CI run on a sample [S98, S104, S105, S106, S108]. Seeds must never hold personal data [S48].

**Also recommended.**
- Put a "role and lifecycle" chapter first (findings 1 and 2), with the honest note that postings ask for about three years of experience (finding 4).
- Add a short Windows setup chapter: short-path virtual environment, pinned requirements file, install check script, expected sizes (finding 17).
- Keep Parquet as a measured chapter: use `parquet_metadata()` to show row groups, statistics and encodings, and the plan to show pruning [S25]. Avoid ratios.
- Interview prep: drills for the SQL round, a modelling round script that starts "one row is...", and a pipeline-design script that names failure modes unprompted [S9]. Add a practice on explaining AI-assisted work, since some postings mention it [S7].
- Reorder: role, setup, SQL, modelling, files and storage, pipelines (batch), transformation with dbt, orchestration, data quality, streaming, distributed processing and table formats (concepts), responsibility, interview and capstone. Responsibility checks run through all of them.

**Specific tool choices for a laptop-only, low-bandwidth, Windows-friendly course.**

| Need | Choice | Reason |
|---|---|---|
| Analytical engine | DuckDB 2.0.x LTS pinned (`==2.0.0` unless 2.0.1 is released by publish) | One 15 MB wheel; MIT; Parquet and JSON built in; supported to 2027-10-22 [S12, S13, S18] |
| Small OLTP source | SQLite through Python's `sqlite3` | No install; window functions available; `EXPLAIN QUERY PLAN` [S85, S86, S84] |
| File format | Parquet via DuckDB | Offline; shows row groups and statistics [S25] |
| Transformation | dbt Core 1.12.x + dbt-duckdb 1.11.x as the primary, with the project written so it also runs on dbt OSS v2 (tested) | About 41 MB download; supported to 2027-07-15; same project passed on v2 [S51, S52, S37] |
| Dataframe library | One optional: pandas 3.1 or Polars 2.0 | Postings do not separate them; both optional [S6] |
| Test runner | pytest | MIT; small [S109] |
| Orchestration | Course-built mini scheduler, Airflow explained, Dagster optional | Airflow not native on Windows; Dagster ran here [S55, S62] |
| Streaming | Python file-based log model; Kafka explained | Kafka needs Java 17+ and a broker [S67] |
| Distributed | Spark explained with a COST-style memo | 450 MB and Java [S73] |
| CI | A workflow that installs the pinned stack and runs tests on a sample | Free for public repos [S108]; log the vendor-name decision |

## Open questions for a human or subject-matter expert

1. Pin dbt Core 1.12 (stable) or dbt OSS v2 for learners? The dbt v1 line is supported to 2027-07-15; the v2 line is new, the default install, and its DuckDB adapter is Beta with a driver that does not load extensions [S37, S41].
2. Hosted CI service name: allowed by the brief's "no commercial names unless needed" rule?
3. Windows long-path guidance: short virtual-environment folder, or enabling long paths with administrator rights [S54]?
4. Is 3.11 the minimum, and should install checks accept 3.11 to 3.13? Only 3.12.10 was tested; DuckDB ships cp311 and abi3 wheels for 3.12+.
5. How should the privacy chapter handle local law? A data protection practitioner should review it, and the dossier relies on EU and UK texts and an international humanitarian handbook [S102 to S105].
6. May chapters use real published incidents (findings 36 to 42 of failure modes: lost cases, unit mismatch, backup failure, duplicate versions, clock going backwards)? None involve politics or war, but the lost-case incident concerns health data; an instructor should decide tone.
7. Are Ziemann et al. (S113) and Beauchemin's "functional data engineering" worth a second read by a human with journal and Medium access before they are cited?
8. Is an "AI-assisted work" discussion round appropriate in interview prep, given that some postings mention AI exercises [S7]?
9. Should the course name Reis and Housley at all, given the book was not read? A human with the book should check the lifecycle wording [S1].
10. What should a mentor do when a fellow's laptop cannot run the 41 MB stack (disk full, 32-bit Python, locked-down machine)? A fallback path (a pre-built USB bundle, an instructor-provided wheelhouse folder, or a lab) is a delivery decision. The wheelhouse approach works offline: `pip install --no-index --find-links` installed the stack here from downloaded wheels [S53].

## Appendix: the 25 sampled postings (URLs for the source column only)

| ID | URL |
|---|---|
| J1 | https://job-boards.greenhouse.io/reddit/jobs/8282760 |
| J2 | https://job-boards.greenhouse.io/affirm/jobs/7813362003 |
| J3 | https://job-boards.greenhouse.io/tailscale/jobs/4721252005 |
| J4 | https://jobs.ashbyhq.com/linear/f272fc4a-91a7-4dcf-9cb5-3600ebaf14e1 |
| J5 | https://www.samsara.com/company/careers/roles/8141959?gh_jid=8141959 |
| J6 | https://jobs.elastic.co/jobs?gh_jid=8244449&gh_jid=8244449 |
| J7 | https://www.brex.com/careers/8366850002?gh_jid=8366850002 |
| J8 | https://www.asana.com/jobs/apply/8131896?gh_jid=8131896 |
| J9 | https://app.careerpuck.com/job-board/lyft/job/8662205002?gh_jid=8662205002 |
| J10 | https://careers.hellofresh.com/global/en/job/8170849?gh_jid=8170849 |
| J11 | https://job-boards.greenhouse.io/truecaller/jobs/8045044 |
| J12 | https://job-boards.greenhouse.io/gocardless/jobs/8230417 |
| J13 | https://sumup.com/careers/positions/8364212002?gh_jid=8364212002 |
| J14 | https://job-boards.greenhouse.io/deliveroo/jobs/8206461 |
| J15 | https://jobs.ashbyhq.com/benchling/c1ad7288-ad78-4a0f-8f19-1fcc3f6cf85b |
| J16 | https://jobs.ashbyhq.com/openai/2796d32a-9f7c-4008-a2c5-50dd53b0f2fe |
| J17 | https://jobs.ashbyhq.com/supabase/73ddf93b-fe0c-455d-ba27-cdde0d3fb94f |
| J18 | https://jobs.ashbyhq.com/decagon/d5af97d3-e615-4387-8636-8a461e8677f2 |
| J19 | https://www.coinbase.com/careers/positions/8180833?gh_jid=8180833 |
| J20 | https://jobs.lever.co/palantir/1b690123-1766-4e75-a0ef-0f58afa864b4 |
| J21 | https://job-boards.eu.greenhouse.io/moniepoint/jobs/5012754101 |
| J22 | https://jobs.ashbyhq.com/vanta/795ab93b-57d9-4387-9cc1-ea7615721ec6 |
| J23 | https://job-boards.greenhouse.io/twilio/jobs/8044650 |
| J24 | https://www.coinbase.com/careers/positions/8175459?gh_jid=8175459 |
| J25 | https://job-boards.eu.greenhouse.io/bitpanda/jobs/4999438101 |

## Handoff

```yaml
artifact: research-dossier
course: data-engineering
version: 1
sources_checked: 2026-10-24
hard_constraints: [offline-after-small-install-windows-ok, brand-new-moving-stack-pin-and-recheck, js-only-runner-deterministic-keys, synthetic-pii-and-hash-is-not-anonymous, depth-over-breadth-heavy-engines-explained]
out_of_scope: [installing-spark-kafka-airflow, cloud-and-iac, ml-and-bi, table-format-hands-on, db-internals, dbt-platform, salary-claims]
open_questions: [dbt-1.12-vs-oss-v2, hosted-ci-name, windows-long-path-guidance, python-version-range, privacy-reviewer, incident-tone, unread-sources-second-read, ai-in-interview-prep, offline-fallback-bundle]
```
