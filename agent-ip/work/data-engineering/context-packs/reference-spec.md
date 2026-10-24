---
artifact: context-pack
course: data-engineering
for: reference-builder
version: 1
---

# Reference build spec: `mizan-prices`

This is the project every fellow builds in the general course, chapter by chapter. You build the complete reference implementation first, so every command, expected output and acceptance test in a build chapter comes from code that really runs. The reference is mentor material: chapters show interfaces and tests, never these implementations.

## Story (for names and comments)
Mizan is a small fictional NGO. Volunteers record the prices of 12 basic food items at 8 markets with a phone form. The form uploads a batch of reports when the phone has a connection, so reports can arrive late. Hala is the junior data engineer who builds the pipeline; Omar is the programme officer who reads the weekly report. Prices are in shekels (ILS). All data is synthetic.

## Pinned stack
`requirements.txt` exactly:
```
duckdb==2.0.0
dbt-core==1.12.6
dbt-duckdb==1.11.0
pytest==9.1.1
```
Python 3.11 or later (test on the local 3.12). Standard library only otherwise (`sqlite3`, `json`, `csv`, `hmac`, `hashlib`, `argparse`, `pathlib`, `datetime`, `random`, `shutil`, `time`). No pandas, Polars or pyarrow. Everything must run offline after the install: DuckDB's Parquet and JSON support are built in; do not use any DuckDB extension that downloads on first use (no `sqlite_scanner`, no `httpfs`). Read SQLite with Python's `sqlite3` and hand rows to DuckDB.

## Repository layout (exact)
```
mizan-prices/
  requirements.txt
  .gitignore                  # data/, lake/, state/, logs/, site/, *.duckdb, transform/target/, transform/logs/, .venv/
  make_source.py              # generator, given in full in chapter 1.4 (keep it under about 170 lines)
  scripts/check_setup.py      # given in full in 1.4
  tests/conftest.py           # shared fixtures, given in full where first needed
  sql/drills/                 # chapters 2.5 and 3.5: one .sql file per drill
  sql/schema.sql              # 4.5 star schema prototype
  sql/load_prototype.sql      # 4.5 loads dims and facts into prototype.duckdb
  pipeline/__init__.py
  pipeline/paths.py           # path constants, given in full in 5.5
  pipeline/land.py            # 5.5
  pipeline/contract.py        # 8.5 (land.py calls it from 8.5 on)
  pipeline/pseudonymise.py    # 6.5
  pipeline/extract_registry.py# 6.5
  pipeline/runlog.py          # 6.5
  pipeline/runner.py          # 9.4
  pipeline/checks.py          # 11.5
  pipeline/retention.py       # 11.5
  contracts/price_reports.yml # 8.5
  transform/                  # dbt project, 7.5 and 8.5
  report/build_report.py      # 9.4
  .github/workflows/ci.yml    # 11.5
  tests/test_*.py             # one test file per build chapter (names below)
```

## 1. Generator `make_source.py` (chapter 1.4)
CLI: `python make_source.py --days 28 --start 2026-03-01 --seed 7 --out data` (these are the defaults). Deterministic for a given seed on any OS (use `random.Random(seed)`, never iterate over sets, sort keys). Prints a short summary with the counts. It writes:

- `data/raw/items.csv`: `item_code,item_name,category,unit` for 12 items (for example I01 flour, I02 rice, I03 lentils, I04 sugar, I05 cooking oil, I06 tomatoes, I07 potatoes, I08 onions, I09 eggs, I10 milk powder, I11 tea, I12 bread). Units such as kg, litre, tray of 30, pack.
- `data/raw/registry.db` (SQLite), the volunteer registry app's database, written as of the last day:
  - `markets(market_code TEXT PRIMARY KEY, name TEXT, area TEXT, opens TEXT, updated_at TEXT)`: 8 markets M01 to M08 with fictional names and generic areas (Central, Harbour, Hill, Old Town, North, South). M03 moved from Harbour to Hill on 2026-03-12 (row shows Hill, updated_at that day). M06 changed `opens` from "daily" to "Sat to Thu" on 2026-03-20.
  - `volunteers(volunteer_id TEXT PRIMARY KEY, full_name TEXT, phone TEXT, market_code TEXT, updated_at TEXT)`: about 12 volunteers, synthetic names and phone numbers in a clearly fake format (for example `+970-59-000-0101`). V07 changed phone on 2026-03-15. V11 left on 2026-03-22 and was **hard-deleted** (its row is gone; query-based change capture cannot see this).
  - `--as-of YYYY-MM-DD` writes the registry as it was at the end of that day instead (so chapters can simulate the registry changing between runs). `--registry-only` skips the other files.
- `data/raw/market_history.csv`: `market_code,name,area,opens,valid_from,valid_to` (the full change history, used by the 4.5 prototype before snapshots are taught; `valid_to` empty for current rows).
- `data/raw/uploads/upload_date=YYYY-MM-DD/batch-NN.jsonl`: JSON lines, one report per line. Fields: `report_id` (string such as `r-000123`), `market_code`, `item_code`, `price` (number, ILS, rounded to 0.5), `reported_at` (UTC ISO 8601 with `Z`), `uploaded_at` (UTC, at or after reported_at), `volunteer_id`, `volunteer_name`, `volunteer_phone`.
  - Each market reports each item about once a day, with a few true repeats (same market, item and day, a different `report_id`, a different price later that day: real repeats to keep).
  - About 8 percent arrive late: uploaded 1 to 3 days after `reported_at`, so they sit in a later `upload_date` folder. One named incident: M05's volunteer had no connection on 2026-03-09 to 2026-03-11, so all M05 reports for those days arrive in `upload_date=2026-03-12`.
  - About 3 percent duplicates: the same `report_id` sent again in a later batch (same or later upload date) with a later `uploaded_at` and identical content.
  - A few bad rows (about 0.5 percent): `price` 0 or negative, or `item_code` missing. Make the exact number deterministic.
  - **Schema change:** from upload_date 2026-03-15 the form adds a field `unit` (string, same values as items.csv). Earlier files do not have the key at all.
  - Prices: a base price per item, a market factor, a slow drift over the month and small noise. Keep weekly averages plausible.
- The summary prints, for example: markets, volunteers, items, upload folders, reports written, late reports, duplicate sends, bad rows, true repeats. Record the exact numbers for seed 7 in REFERENCE.md: chapters will state them.

## 2. Setup check `scripts/check_setup.py` (1.4)
Prints Python, DuckDB and dbt versions and `OK` lines, fails with a plain message if Python is below 3.11 or a package is missing or at the wrong version. Also checks the data folder exists after generation.
Test file: `tests/test_setup.py` (generator counts, files exist, determinism: running twice gives identical files).

## 3. SQL drills (2.5 and 3.5)
`tests/conftest.py` provides a fixture `con` (a DuckDB in-memory connection) with three views: `reports` (all raw JSON lines, read with `read_json` and `union_by_name`, plus a column `upload_date` from the folder name), `items` (items.csv) and `markets` (loaded from registry.db through `sqlite3`). A helper `run_sql(con, path)` runs one drill file and returns rows.
- 2.5 drills (`tests/test_drills_joins.py`), learners write the SQL, tests hold the expected results computed from seed 7:
  - `d01_reports_per_market.sql`: reports per market (inner join to markets), ordered by market_code.
  - `d02_items_never_reported.sql`: items with no report at one market on one day (a LEFT JOIN with NULL check, or anti-join). Pick a market and day that has missing items.
  - `d03_fan_out.sql`: provide `data/raw/market_contacts.csv` from the generator (two contacts for one market) and show the trap: the drill asks for the correct total price of reports for that market on one day, which a naive join to contacts doubles.
  - `d04_average_price_nulls.sql`: average price ignoring bad rows, with counts of rows versus prices (COUNT(*) vs COUNT(price) after turning bad prices into NULL with NULLIF or CASE).
  - `d05_basket_by_market_day.sql`: a CTE chain: dedupe nothing yet, filter bad rows, sum the 12-item basket per market and day where all 12 items were reported.
- 3.5 drills (`tests/test_drills_windows.py`):
  - `d06_latest_per_report.sql`: one row per report_id, latest `uploaded_at` (ROW_NUMBER). Expected count.
  - `d07_rank_items_by_price.sql`: rank markets by flour price on one day with ties (RANK versus ROW_NUMBER: pick a day with a tie and test that the tie is kept).
  - `d08_weekly_change.sql`: average basket per market per ISO week and the change from the previous week with LAG, ordered.
  - `d09_moving_average.sql`: 7-day moving average of one item at one market with `ROWS BETWEEN 6 PRECEDING AND CURRENT ROW`, partitioned by market.
  - Index experiment: `scripts/index_experiment.py` (given in the chapter) builds a SQLite table of 200,000 synthetic rows and prints `EXPLAIN QUERY PLAN` before and after the learner's `sql/drills/d10_create_index.sql`; the test asserts the plan changes from a `SCAN` to a `SEARCH ... USING INDEX`. Also a DuckDB `EXPLAIN` check that a filter on a Parquet column appears in the scan (filter pushdown), if it fits.
Record the expected results in REFERENCE.md and in the test files.

## 4. Star schema prototype (4.5)
`sql/schema.sql` creates in `prototype.duckdb`: `dim_market(market_key INTEGER, market_code, name, area, opens, valid_from DATE, valid_to DATE, is_current BOOLEAN)` (type 2), `dim_item(item_key, item_code, item_name, category, unit)`, `dim_date(date_key INTEGER yyyymmdd, date, iso_year, iso_week, weekday)`, `fct_price_report(report_id, date_key, market_key, item_key, volunteer_id, price, reported_at, uploaded_at)` with grain "one accepted price report (one report_id)". `sql/load_prototype.sql` loads from the raw files and `market_history.csv`, deduplicating by report_id and dropping bad rows, and joins each fact to the market version valid on its reported date. `scripts/build_prototype.py` runs both files.
Tests `tests/test_star_schema.py`: one current row per market; no overlapping validity ranges; every fact matches exactly one market version; fact report_id unique; M03 facts before 2026-03-12 point to the Harbour version and after to Hill; fact count equals distinct good report_ids.

## 5. Landing (5.5)
`pipeline/paths.py`: constants for `DATA`, `RAW_UPLOADS`, `LAKE`, `RESTRICTED`, `SHARED`, `QUARANTINE`, `STATE`, `LOGS`, `WAREHOUSE`, `SITE`, relative to the project root.
`pipeline/land.py`: `land_uploads(upload_date: str) -> int` reads every `batch-*.jsonl` in that upload folder with DuckDB and writes one Parquet file `lake/restricted/reports/upload_date=<date>/part-0.parquet` (Zstd compression), replacing that partition only. Returns rows written. CLI: `python -m pipeline.land --date 2026-03-01` and `--all`. Rerunning must give the same rows and leave no extra files.
Tests `tests/test_land.py`: rows equal JSON lines for a date; rerun is idempotent (same row count, one file); partition folder name; early files have no `unit` column and later files do; reading the whole lake with hive partitioning returns all rows.

## 6. Ingestion (6.5)
- `pipeline/pseudonymise.py`: `volunteer_key(phone: str, secret: bytes) -> str` = HMAC-SHA256 hex digest, first 16 characters. `publish_reports(upload_date: str) -> int` reads the restricted partition, drops `volunteer_name` and `volunteer_phone`, adds `volunteer_key`, writes `lake/shared/reports/upload_date=<date>/part-0.parquet`. The secret comes from the environment variable `MIZAN_KEY`; with no key it stops with a clear error. Pass the secret into DuckDB as data (for example compute keys in Python for the distinct phones and join), never write it to a file.
- `pipeline/extract_registry.py`: `extract(table: str) -> int` for `markets` and `volunteers`: reads rows with `updated_at` greater than the saved watermark in `state/registry_watermarks.json`, writes them to `lake/shared/registry/<table>/extracted_at=<timestamp>/part-0.parquet` (volunteers pseudonymised the same way, no name or phone), and saves the new watermark only after the file is written. Rerun with no changes extracts 0 rows.
- `pipeline/runlog.py`: `log_run(task, run_date, status, rows=None, detail="")` appends one JSON line to `logs/runs.jsonl` with start and end times in UTC.
Tests `tests/test_ingestion.py`: same phone gives the same key; another secret gives another key; shared files have no name or phone columns; no key raises the clear error; first extract gets all rows, the second 0; with `make_source.py --registry-only --as-of 2026-03-14` then `--as-of 2026-03-16`, the second extract picks up exactly V07's change; a failure before writing does not move the watermark; and one test that documents the limit: V11's hard delete is not seen by watermark extraction.

## 7. dbt project (7.5)
`transform/` with `dbt_project.yml` (name `mizan`), `profiles.yml` in the same folder (profile `mizan`, DuckDB at `../warehouse.duckdb`, `threads: 1`), run with `dbt build --profiles-dir .` from `transform/`. Sources point at the shared Parquet with the dbt-duckdb `external_location` meta (hive partitioning, `union_by_name`). Models:
- `models/staging/stg_price_reports.sql`: one row per report_id (latest uploaded_at), types cast, `reported_date`, bad rows excluded (until 8.5 moves this to the contract), `unit` kept (NULL before the change).
- `models/staging/stg_markets.sql` and `stg_volunteers.sql`: latest extracted row per key.
- seed `seeds/items.csv` (a copy of the item list; no personal data in seeds).
- `snapshots/snap_markets.yml` or `.sql` (use the current recommended snapshot config for dbt 1.12; check the docs and test it): history of markets by `updated_at`.
- `models/marts/dim_market.sql` (from the snapshot, with valid_from, valid_to, is_current), `dim_item.sql`, `dim_date.sql`, `fct_price_report.sql` (incremental, `unique_key: report_id`, delete+insert, contract enforced on columns and types), `mart_weekly_basket.sql` (grain: market and ISO week; basket cost and change from the previous week with LAG).
- Tests in YAML: unique and not_null keys, relationships fact to dims, accepted_values for categories, a singular test that price is positive, and one dbt unit test on `mart_weekly_basket` with a tiny input. `dbt docs generate` should work offline.
Tests `tests/test_dbt_project.py`: run `dbt build` through `subprocess` and assert success; fact count equals distinct good report_ids; weekly mart has 8 markets and the expected weeks; snapshot has two rows for M03 after the registry changes are extracted across two runs (simulate with `--as-of`).

## 8. Late data, duplicates, schema change, backfill (8.5)
- `contracts/price_reports.yml`: a small contract in the spirit of the Open Data Contract Standard (name, version, owner, required fields with types, optional field `unit`, rules: price > 0, item_code present). Keep it short and readable.
- `pipeline/contract.py`: `check_rows(rows, contract) -> (good, bad)` or a DuckDB-SQL equivalent; `land_uploads` now writes bad rows to `lake/quarantine/upload_date=<date>/part-0.parquet` with a `reason` column, and good rows to restricted. Unknown new fields are allowed and kept (additive change); a missing required field fails the batch with a clear message.
- `fct_price_report` reprocesses a lookback of 3 days of `reported_date` (a dbt var `lookback_days`, default 3) so late reports up to 3 days old are merged; a var-driven range (`start_date`, `end_date`) supports a backfill.
- `scripts/backfill.py --start 2026-03-05 --end 2026-03-07`: relands and republishes those upload dates, then runs dbt with the range vars.
Tests `tests/test_late_and_backfill.py`: processing upload days one at a time (with dbt after each) gives the same `mart_weekly_basket` as processing everything at once; M05's late reports for 2026-03-09 to 2026-03-11 are in the fact table after day 12; duplicates do not raise the fact count; quarantine has the expected bad rows and reasons; the `unit` column is NULL before 2026-03-15 and filled after; a backfill of 3 days leaves every total unchanged; with `lookback_days: 0`, the late M05 reports are missed (documents the cost of no lookback).

## 9. Runner and report (9.4)
- `pipeline/runner.py`: a small scheduler (aim for under about 120 lines). Tasks: `extract_registry`, `land`, `publish`, `dbt_build`, `checks` (added in 11.5), `report`, with explicit upstream lists. `TransientError` is retried with exponential backoff (`retries=2`, `base_delay` seconds, injectable `sleep` for tests); any other exception fails the task and marks downstream tasks `skipped`. Every attempt goes to the run log. CLI: `python -m pipeline.runner run --date 2026-03-12`, `python -m pipeline.runner backfill --start ... --end ...` (runs each date once, in order), `python -m pipeline.runner daily` (yesterday in UTC). Exit code non-zero when any task failed.
- `report/build_report.py`: writes `site/index.html`: the latest four weeks of basket cost per market with the weekly change, as a plain HTML table and CSS bars, no JavaScript, no external files, readable at 375px; under about 50 KB.
- Chapters show scheduling with Windows Task Scheduler (`schtasks /create ...`) and a cron line, not run by tests.
Tests `tests/test_runner.py`: topological order respects upstreams; a task raising `TransientError` once then succeeding is retried and the run succeeds; a permanent error marks downstream tasks skipped and the exit code is 1; backfill runs each date once; the report exists, contains all 8 market codes and is under 50 KB.

## 10. Checks, retention, CI (11.5)
- `pipeline/checks.py`: `check_freshness(max_age_days)`, `check_volume(upload_date, tolerance=0.5)` against the trailing 7-day average of landed rows, `check_schema()` against the contract; each returns a result with `ok`, `value`, `threshold`, `message`; the runner's `checks` task fails on any not-ok result and logs all.
- `pipeline/retention.py`: deletes restricted partitions older than `--keep-days` (default 30) relative to a given date, with `--dry-run`; never touches shared or quarantine.
- `.github/workflows/ci.yml`: on push and pull request, Python 3.12, install `requirements.txt`, generate 10 days with seed 7, run the pipeline backfill on them with a test `MIZAN_KEY`, run pytest (fast tests) and `dbt build`. Validate it parses as YAML; it is not run here.
Tests `tests/test_checks_retention.py`: volume check fails on a day with half the rows (simulate by deleting a batch file in a temp copy) and passes on a normal day; freshness fails when the latest partition is too old; retention dry run lists the right partitions and deletes nothing; a real run deletes only old restricted partitions.

## Working rules
- Work in `<scratch>/ref/mizan-prices` (the orchestrator names the real folder). Create a virtual environment in a short path (for example `<scratch>/ref/venv`), install `requirements.txt`, and run everything there. Use `uv` if available for speed.
- Tests must run fast (the whole suite in a few minutes) and be deterministic. Tests that need generated data use a session fixture that generates into a temp folder and changes the working directory, so they never touch the learner's real data.
- Code style for learners: plain names, short functions, comments in plain English explaining why. No em dashes or en dashes anywhere (U+2014, U+2013), including comments and output text. No clever one-liners.
- Write `REFERENCE.md` at the repository root: for each chapter (1.4, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.4, 11.5) the exact commands, the real expected output (copied from your runs, trimmed), the test file name and its test names, the generator's seed-7 counts, row counts, and anything surprising (version quirks, Windows notes). Writers will build the chapters from this file and the test files.
- Do not run git commands. Do not edit anything outside your folder.
