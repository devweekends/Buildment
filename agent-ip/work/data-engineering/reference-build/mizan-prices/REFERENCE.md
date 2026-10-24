# REFERENCE.md: mizan-prices reference build

Mentor material for the chapter writers. Every command and output below was run on Windows 11, Python 3.12.10, with the pinned stack (`duckdb==2.0.0`, `dbt-core==1.12.6`, `dbt-duckdb==1.11.0`, `pytest==9.1.1`). Chapters show interfaces and tests, never these implementations. All data is synthetic.

Run everything from the project folder (`mizan-prices/`). Paths in the code are relative to it. Set a key first: `export MIZAN_KEY=some-long-random-text` (Git Bash) or `$env:MIZAN_KEY="..."` (PowerShell). The tests set their own fake key.

## 0. Whole-project facts

### Final test result (clean copy, nothing generated beforehand)

```
$ pytest -q
107 passed in 269.27s (0:04:29)
$ pytest -q -m "not slow"          (the CI subset, no dbt-heavy tests)
80 passed, 27 deselected in 49.68s
$ cd transform && dbt build --profiles-dir .
Done. PASS=39 WARN=0 ERROR=0 SKIP=0 NO-OP=0 REUSED=0 TOTAL=39
```

`dbt build` is 1 seed + 1 snapshot + 7 table models + 1 incremental model (total 8 models, 1 seed, 1 snapshot) + 28 data tests + 1 unit test = 39 nodes.

### Seed-7 generator counts (`python make_source.py`, defaults: 28 days from 2026-03-01)

| count | value |
|---|---|
| markets | 8 |
| volunteers in registry | 11 (12 ever existed; V11 hard-deleted on 22 March) |
| items | 12 |
| upload folders | 28 |
| distinct reports (distinct report_id) | 2633 |
| lines written (includes duplicate sends) | 2712 |
| late reports (uploaded after the day reported) | 211 (8.0 percent) |
| duplicate sends | 79 (3.0 percent) |
| bad rows | 13 (9 with price 0 or below, 4 with a missing item_code) |
| true repeats (same market, item, day, different report_id) | 31 |
| accepted reports (distinct, good) | 2620 = 2633 - 13 |

Derived: good lines landed 2699 + quarantined 13 = 2712 lines. 140 market-days have all 12 items (of 224). M05 outage: 37 lines arrive on 2026-03-12 for reports dated 9 to 11 March; 34 are distinct good reports.

The counts depend on `--days`, because one random stream builds the whole month. Other values with seed 7, start 2026-03-01 (distinct / lines / late / dups / bad / repeats):

| --days | distinct | lines | late | dups | bad | repeats |
|---|---|---|---|---|---|---|
| 1 | 95 | 98 | 0 | 3 | 0 | 1 |
| 3 | 280 | 288 | 22 | 8 | 1 | 3 |
| 10 (CI) | 933 | 961 | 75 | 28 | 5 | 11 |
| 14 | 1318 | 1358 | 105 | 40 | 7 | 16 |
| 16 | 1507 | 1552 | 121 | 45 | 8 | 18 |

Chapters that quote numbers must say which `--days` they used. Numbers in the SQL drills and in the dbt tests assume the default 28 days. The late-data tests use 16 days.

### Files

```
requirements.txt  pytest.ini  .gitignore  REFERENCE.md  make_source.py
scripts/    check_setup.py  build_prototype.py  index_experiment.py  backfill.py
sql/        schema.sql  load_prototype.sql  drills/d01 ... d10
pipeline/   __init__.py paths.py land.py contract.py pseudonymise.py extract_registry.py runlog.py runner.py checks.py retention.py
contracts/  price_reports.yml
report/     build_report.py
transform/  dbt_project.yml profiles.yml macros/generate_schema_name.sql seeds/items.csv
            models/sources.yml  models/staging/{stg_price_reports,stg_markets,stg_volunteers}.sql + staging.yml
            models/marts/{dim_market,dim_item,dim_date,fct_price_report,mart_weekly_basket}.sql + marts.yml
            snapshots/snap_markets.yml  tests/assert_prices_are_positive.sql
.github/workflows/ci.yml
tests/      conftest.py day_by_day.py test_setup.py test_drills_joins.py test_drills_windows.py test_star_schema.py
            test_land.py test_ingestion.py test_dbt_project.py test_late_and_backfill.py test_runner.py test_checks_retention.py
```

### Deviations from the spec

1. **Virtual environment path.** The orchestrator named `.../scratchpad/ref/venv` (about 128 characters). `uv pip install` succeeded there, but `dbt` then crashed on the first parse with `No module named 'metricflow_semantic_interfaces.transformations.measure_to_metric_transformation_pieces.measure_features_to_metric_name'`. The file exists on disk, but its full path is over 260 characters and Windows long paths are off (`LongPathsEnabled = 0`), so Python cannot open it. A venv at `C:\de\venv` works. This is the research dossier's long-path trap, with a twist: uv installs without error, and the failure only appears at `dbt` run time (pip fails at install time). Chapters must say "create the venv at a short path such as `C:\de\venv`" and the install check should run `dbt parse`, not only `dbt --version` (the version command works even when the install is broken).
2. **`pytest.ini` added** (not in the layout): it registers the `slow` marker and sets `testpaths`. The CI file runs `pytest -m "not slow"`.
3. **`tests/day_by_day.py` added**: a helper script run by the late-data tests (see 8.5 and "dbt-duckdb keeps the file open").
4. **PyYAML** is imported by `pipeline/contract.py` and two tests. It is not in `requirements.txt` (the spec says standard library only otherwise) because dbt-core already installs it (`pyyaml==6.0.3`). If a writer wants the course to survive a dbt change, add `pyyaml` to requirements.
5. **`make_source.py` is 211 lines** (spec: about 170). About 45 lines are the item, market and volunteer tables. A writer who must show it in full can move the tables to a second file or show them as a collapsed block.
6. **`pipeline/runner.py` is 157 lines** with docstrings and blank lines (about 105 lines of code). It also holds `run_dbt()`, which `scripts/backfill.py` imports.
7. **Surrogate keys in dbt are hashes, not integers.** `dim_market.market_key` is the snapshot's `dbt_scd_id` (a text hash) and `dim_item.item_key` is `md5(item_code)`. Integer keys numbered with `row_number()` would renumber when a new market version appears and would break an incremental fact table. The 4.5 prototype uses integers.
8. **`dim_market.valid_from` of the first version is `1900-01-01`**, not the date of the first update. A snapshot cannot know how long a market had been like that before we started watching, and facts older than the first snapshot would otherwise find no market. The prototype (which has full history in `market_history.csv`) uses the true dates.
9. **`stg_price_reports` has no bad-row filter in the final build**, because landing quarantines bad rows (chapter 8.5). The chapter 7.5 version has one extra line: `where price > 0 and item_code is not null`. The singular test `assert_prices_are_positive` guards the fact table.
10. **Contract check lives in SQL** (`contract.check_rows(con, table, contract)` makes `good_rows` and `bad_rows` temp tables) instead of `check_rows(rows, contract) -> (good, bad)`. The spec allowed this.
11. **Weekly mart definition.** The week value is the average of the daily 12-item baskets of days when all 12 items were priced (not the sum of weekly item averages). It matches drill d08 row for row (tested), so chapters 3.5 and 7.5 agree.
12. **Hive column name check.** `check_schema` ignores `upload_date` because DuckDB adds it from the folder name.

## 1. Chapter 1.4: setup and generator

Files: `make_source.py`, `scripts/check_setup.py`, `tests/conftest.py`, `tests/test_setup.py`.

```
$ python scripts/check_setup.py
Python 3.12.10
OK python version
OK duckdb 2.0.0
OK dbt-core 1.12.6
OK dbt-duckdb 1.11.0
OK pytest 9.1.1
NOTE data folder not found yet. Run: python make_source.py

$ python make_source.py --days 28 --start 2026-03-01 --seed 7 --out data
markets: 8
volunteers in registry: 11
items: 12
upload folders: 28
distinct reports: 2633
lines written: 2712
late reports: 211
duplicate sends: 79
bad rows: 13
true repeats: 31

$ python scripts/check_setup.py        (last line now)
OK data folder found: data/raw
```

`--require-data` makes the check fail when `data/raw/items.csv` is missing. A wrong version prints `FAIL: duckdb is X but this course needs 2.0.0. Run: pip install -r requirements.txt` and exits 1.

What the generator writes (all under `data/raw/`): `items.csv` (12 items; units kg, litre, tray of 30, pack; categories grains, pulses, pantry, vegetables, dairy_eggs, bakery), `registry.db` (SQLite, tables `markets` and `volunteers`), `market_history.csv` (10 rows: M03 and M06 have two versions; `valid_from` inclusive, `valid_to` exclusive and empty for the current row), `market_contacts.csv` (9 rows, M02 has two contacts, for drill d03), `uploads/upload_date=YYYY-MM-DD/batch-01.jsonl` and `batch-02.jsonl` (about 60 percent of the day's lines in batch-01, 40 percent in batch-02).

Facts a chapter can use:
- One JSON line (before 2026-03-15 upload date): `{"report_id": "r-000097", "market_code": "M08", "item_code": "I07", "price": 3.5, "reported_at": "2026-03-02T05:08:00Z", "uploaded_at": "2026-03-02T05:28:00Z", "volunteer_id": "V08", "volunteer_name": "Imad Zaid", "volunteer_phone": "+970-59-000-0108"}`. From upload date 2026-03-15 each line also has `"unit"`.
- The form change is by **upload date**, not report date. A report made on 14 March but uploaded on 16 March already has a `unit`. A duplicate sent after 15 March carries `unit` even if the first send did not.
- Bad rows: price `0.0`, a negative price, or `"item_code": null`. A missing item code is JSON `null`, not a missing key.
- Registry: M03 area Harbour to Hill on 2026-03-12 (`updated_at` `2026-03-12T09:00:00Z`), M06 opens `daily` to `Sat to Thu` on 2026-03-20, V07 phone `+970-59-000-0107` to `+970-59-000-0207` on 2026-03-15 (`2026-03-15T08:30:00Z`), V11 deleted (row gone) from `--as-of 2026-03-22`. Unchanged rows have `updated_at` `2026-03-01T00:00:00Z`.
- `--registry-only --as-of 2026-03-14` writes only `registry.db` as of that day; `--as-of` defaults to the last day.
- The volunteer phone in a report is the phone on the report date, so V07's reports before 15 March carry the old number. Because the pseudonym is made from the phone, V07 has two `volunteer_key` values (see 6.5).
- Output is byte-identical for the same seed, even the SQLite file (tested by hashing the whole folder).

Tests (`tests/test_setup.py`): `test_generator_counts_for_seed_7`, `test_expected_files_exist`, `test_same_seed_gives_identical_files`, `test_different_seed_gives_different_prices`, `test_unit_field_appears_from_15_march`, `test_m05_outage_arrives_on_12_march`, `test_registry_as_of_last_day`, `test_registry_only_as_of_an_earlier_day`, `test_check_setup_script`.

`tests/conftest.py` shows the pattern for every other test: a copy of the code goes into a temp folder, the test runs there, and `MIZAN_KEY` is a fake key. Fixtures: `source_data` (seed 7, 28 days, session scope), `con` (DuckDB with views `reports`, `items`, `market_contacts` and table `markets`), `project` (temp copy, we `chdir` into it), `built` (module scope, 28 days fully loaded and dbt built once).

## 2. Chapter 2.5: join drills

Files: `sql/drills/d01` to `d05`, `tests/test_drills_joins.py`. The `con` fixture creates `reports` with `reported_at` and `uploaded_at` converted by `timezone('UTC', ...)` (see "time zone trap" below).

Expected results (seed 7, 28 days):

| drill | result |
|---|---|
| d01 reports per market | M01 335, M02 341, M03 341, M04 341, M05 341, M06 338, M07 333, M08 342 (sum 2712, all lines, duplicates included) |
| d02 items not reported (M02, 2026-03-02) | I08 onions, I09 eggs |
| d03 fan-out (M02, 2026-03-04) | `('M02', 12, 135.5, 2)`: 12 lines, correct total 135.5, 2 contacts. The naive join gives 271.0 |
| d04 average price per item | 13 rows (12 items plus a group with no item code). I01: 225 lines, 224 usable prices, average 8.33. I11: 219, 217, 14.24. NULL item: 4, 4, 18.75. Total lines 2712, 9 prices thrown away |
| d05 basket per market-day | 140 rows; first `('M01', 2026-03-03, 139.0)`, last `('M08', 2026-03-28, 145.0)`; sum of all 19794.58; min 130.5, max 155.5. Rows per market: M04 21, M08 20, M07 19, M03 18, M02 17, M01 15, M05 15, M06 15 |

Tests: `test_d01_reports_per_market`, `test_d02_items_never_reported`, `test_d03_fan_out_total_is_not_doubled`, `test_d04_average_price_with_nulls`, `test_d05_basket_by_market_day`.

Notes: d05 averages the price per market, day and item (that is how repeats and duplicate sends stay out of the sum) and does not use a window function. Pick days for d02 and d03 with this care: d03 must be a day with no repeat and no duplicate (M02 on 4 March has 12 lines and 12 items).

## 3. Chapter 3.5: window drills, the index experiment, query plans

Files: `sql/drills/d06` to `d10`, `scripts/index_experiment.py`, `tests/test_drills_windows.py`.

| drill | result |
|---|---|
| d06 latest per report | 2633 rows, one per report_id. `r-000020` was sent at 09:56 and 12:39, the row kept has `uploaded_at` 2026-03-01 12:39 |
| d07 rank flour (I01) on 2026-03-08 | `(M04, 7.5, rank 1, row 1) (M07, 7.5, 1, 2) (M01, 8.0, 3, 3) (M02, 8.0, 3, 4) (M08, 8.0, 3, 5) (M03, 8.5, 6, 6) (M06, 8.5, 6, 7) (M05, 9.0, 8, 8)`. RANK skips (1, 1, 3, 3, 3, 6, 6, 8). ROW_NUMBER needs the `market_code` tie-breaker to be stable |
| d08 weekly change | 38 rows, ISO weeks 9 to 13. Week 9 is only Sunday 1 March, so only 6 markets have a full basket then (M01 and M06 do not). Example `('M08', 2026, 10, 4, 142.75, 139.0, 3.75)`, `('M05', 2026, 13, 3, 154.58, 154.2, 0.38)`; the first week of each market has `LAG` NULL; M01 week 10 has no previous week (week 9 missing) |
| d09 7-row moving average, eggs I09 | 216 rows over all markets, 27 for M02 (it reported no eggs on 2 March). First M02 row `(2026-03-01, 23.75, 23.75)`, second `(2026-03-03, 24.0, 23.875)` (the window is rows, not days), last `(2026-03-28, 23.5, 23.857)` |

d08 deduplicates first (the d06 pattern). The naive version without it gives different weekly numbers for some markets, because a repeated send of one of two true repeats skews the average (found when the dbt mart did not match the drill). This is a good "why dedupe first" example.

Index experiment:

```
$ python scripts/index_experiment.py sql/drills/d10_create_index.sql
Plan before the index:
  SCAN price_log
Plan after the index:
  SEARCH price_log USING INDEX idx_price_log_market_item (market_code=? AND item_code=?)
```

The query is `SELECT avg(price) FROM price_log WHERE market_code = 'M05' AND item_code = 'I01'`. With `SELECT count(*)` the plan says `USING COVERING INDEX`, because the index alone holds everything needed. Plan text is SQLite 3.49.1; the format can change between SQLite versions, so tests look for `SCAN` and `SEARCH ... USING INDEX`.

DuckDB `EXPLAIN` on Parquet written with `PARTITION_BY (upload_date)` (28 folders):
- `WHERE upload_date = DATE '2026-03-05'` shows `File Filters: upload_date = '2026-03-05'::DATE` and `Scanning Files: 1/28`.
- `WHERE market_code = 'M05'` shows `Filters: market_code = 'M05'` inside the `Read Parquet` box.
- `EXPLAIN ANALYZE` adds `Total Files Read`, `Row Groups Scanned: 1 / 1` and real row counts.

**Windows console quirk:** printing an `EXPLAIN` plan crashes with `UnicodeEncodeError: 'charmap' codec can't encode characters` because the plan uses box-drawing characters and the console code page is cp1252. Set `PYTHONUTF8=1` (or `PYTHONIOENCODING=utf-8`). Tests never print plans.

Tests: `test_d06_latest_per_report`, `test_d07_rank_keeps_ties_and_row_number_does_not`, `test_d08_weekly_change`, `test_d09_moving_average`, `test_d10_index_changes_the_plan_from_scan_to_search`, `test_without_an_index_the_plan_stays_a_scan`, `test_duckdb_explain_shows_partition_pruning_and_filter_pushdown`.

## 4. Chapter 4.5: star schema prototype

Files: `sql/schema.sql`, `sql/load_prototype.sql`, `scripts/build_prototype.py`, `tests/test_star_schema.py`.

```
$ python scripts/build_prototype.py
dim_market: 10 rows
dim_item: 12 rows
dim_date: 28 rows
fct_price_report: 2620 rows
```

Grain: one accepted price report (one report_id). Integer surrogate keys (`row_number() over (order by ...)`). `fct_price_report` has a primary key and foreign keys to the three dimensions, so DuckDB itself refuses an orphan fact. `price` is `DECIMAL(8,2)`. The fact joins to the market version where `reported_date >= valid_from and (valid_to is null or reported_date < valid_to)`. `dim_market` has 10 rows in total because M03 and M06 have two versions each.

M03 facts: Harbour version for report dates 2026-03-01 to 2026-03-11, Hill from 2026-03-12.

Tests: `test_row_counts`, `test_one_current_row_per_market`, `test_no_overlapping_validity_ranges`, `test_every_fact_matches_exactly_one_market_version`, `test_fact_report_id_is_unique`, `test_m03_facts_follow_the_market_when_it_moved`, `test_fact_count_equals_distinct_good_report_ids`, `test_running_the_build_twice_gives_the_same_counts`.

## 5. Chapter 5.5: landing

Files: `pipeline/paths.py`, `pipeline/land.py`, `tests/test_land.py` (the final `land.py` also calls `pipeline/contract.py`, chapter 8.5).

```
$ python -m pipeline.land --date 2026-03-01
2026-03-01: 90 rows landed, 0 quarantined
$ python -m pipeline.land --date 2026-03-01        (same output; still one file)
$ python -m pipeline.land --all
2026-03-01: 90 rows landed, 0 quarantined
... (28 lines)
2026-03-28: 110 rows landed, 1 quarantined
```

Rows per upload date (landed / quarantined), seed 7, 28 days: 03-01 90/0, 03-02 89/0, 03-03 88/0, 03-04 100/0, 03-05 101/0, 03-06 96/0, 03-07 99/0, 03-08 93/2, 03-09 82/0, 03-10 85/3, 03-11 91/0, 03-12 135/2, 03-13 92/1, 03-14 104/0, 03-15 97/0, 03-16 92/1, 03-17 99/0, 03-18 95/1, 03-19 97/0, 03-20 90/0, 03-21 105/0, 03-22 99/0, 03-23 97/0, 03-24 92/2, 03-25 92/0, 03-26 92/0, 03-27 97/0, 03-28 110/1. Total 2699 landed + 13 quarantined = 2712. 03-12 is big because of the M05 outage.

**Chapter 5.5 versus 8.5.** In 5.5 `land_uploads` has no contract and returns every line (so 03-08 would return 95). The final code returns only good rows. Tests use dates with no bad rows (03-02: 89, 03-14: 104, 03-15: 97) so they pass in both versions, except `test_whole_lake_reads_back_with_hive_partitioning`, whose total is 2712 before 8.5 and 2699 plus 13 quarantined after.

Behaviour: the file is written to `part-0.parquet.tmp` and swapped in with `os.replace`, so a rerun replaces the partition and leaves exactly one file, and a crash never leaves a half-written `.parquet`. Compression is ZSTD (`parquet_metadata()` shows `ZSTD`). Early partitions have no `unit` column; `read_parquet(..., union_by_name = true)` fills NULL. Landed types: `price` DOUBLE, `reported_at` and `uploaded_at` TIMESTAMP (naive UTC).

**Time zone trap (surprising, important).** `read_json` turns `2026-03-01T23:30:00Z` into `TIMESTAMP WITH TIME ZONE`, and `CAST(x AS DATE)` then uses the **session** time zone (here `Asia/Karachi`; in Gaza it would be UTC+2 or +3). A report at 22:00Z would move to the next day. `land.py` converts with `timezone('UTC', col)` once, so the Parquet holds plain UTC timestamps and no later step depends on the machine. `test_timestamps_do_not_depend_on_the_computer_time_zone` proves it with `SET TimeZone = 'Pacific/Auckland'`. The drills' `reports` view does the same conversion. The dbt profile also sets `TimeZone: UTC`.

**DuckDB 2.0 quirk:** relations from `duckdb.sql(...)` have no `fetchone()` (`AttributeError: Relations no longer have fetchone()`); use `duckdb.connect().execute(sql).fetchone()`.

**DuckDB 2.0 quirk:** `read_parquet(file, hive_partitioning = false)` still adds the `upload_date` column when the path contains `upload_date=...`. Use a path without the `key=value` folder or drop the column.

Tests: `test_rows_written_equal_json_lines`, `test_partition_folder_and_file_name`, `test_file_uses_zstd_compression`, `test_rerun_is_idempotent`, `test_early_files_have_no_unit_column_and_later_files_do`, `test_whole_lake_reads_back_with_hive_partitioning`, `test_timestamps_do_not_depend_on_the_computer_time_zone`, `test_missing_folder_gives_a_clear_error`.

## 6. Chapter 6.5: pseudonymised ingestion

Files: `pipeline/pseudonymise.py`, `pipeline/extract_registry.py`, `pipeline/runlog.py`, `tests/test_ingestion.py`. (Extra CLI: `python -m pipeline.pseudonymise --date D | --all`.)

```
$ python -m pipeline.pseudonymise --date 2026-03-01
2026-03-01: 90 rows published
$ python -m pipeline.extract_registry --table markets
markets: 8 rows extracted
$ python -m pipeline.extract_registry --table volunteers
volunteers: 11 rows extracted
$ python -m pipeline.extract_registry --table markets
markets: 0 rows extracted
```

- `volunteer_key(phone, secret)` is `hmac.new(secret, phone.encode(), sha256).hexdigest()[:16]`. Without `MIZAN_KEY`: `MissingKeyError: MIZAN_KEY is not set. Set it in your shell before publishing, for example: export MIZAN_KEY=some-long-random-text` (raised before anything is read or written; the test checks no `lake/shared` folder exists).
- The secret never reaches SQL or disk: Python makes `(phone, key)` pairs and hands DuckDB only those (`test_the_secret_is_never_written_to_disk` scans lake, state and logs).
- Shared report columns: `report_id, market_code, item_code, price, reported_at, uploaded_at, volunteer_id, unit (later files), volunteer_key`. `volunteer_id` stays (an internal id).
- Registry extraction writes `lake/shared/registry/<table>/extracted_at=20260324T101112123456Z/part-0.parquet` (all columns text; microseconds in the folder name so two extractions in one second do not collide; no colons, which Windows forbids). Volunteer files hold `volunteer_id, market_code, updated_at, volunteer_key`; the name and phone are dropped in Python before any file exists. `state/registry_watermarks.json` after the second `--as-of` scenario: `{"markets": "2026-03-12T09:00:00Z", "volunteers": "2026-03-15T08:30:00Z"}`.
- Rule: write the file first, save the watermark second. If the process dies in between, the next run extracts the same rows again (at least once), which is harmless because staging keeps the latest row per key. If writing fails, the folder is removed and the watermark does not move (`test_a_failure_before_writing_does_not_move_the_watermark`).
- With `--registry-only --as-of 2026-03-14` then `--as-of 2026-03-16`: first extract 8 markets and 12 volunteers (V11 still exists); the second extracts 0 markets and exactly 1 volunteer (V07). M03's move is already in the data when the first extraction is as of 14 March. To see the market change arrive on its own, extract as of 11 March (8 rows), then as of 12 March (1 row, M03), then as of 20 March (1 row, M06).
- **Surprise for the privacy chapter:** the pseudonym is made from the phone. When V07 changed phone, V07 got a **new** `volunteer_key` (the test asserts the two differ). A pseudonym built from a changing attribute breaks continuity of the person; a stable id (`volunteer_id`) or a random token table would not. Good teaching point on pseudonymisation versus tokenisation. Also: the same volunteer's reports before and after 15 March carry two different keys.
- **Limit documented by a test:** V11's hard delete is not seen. `--as-of 2026-03-21` extracts 12 volunteers; `--as-of 2026-03-23` (V11 gone) extracts 0, and V11 is still in the shared registry.
- Quarantine (chapter 8.5) keeps full rows **including name and phone**, so it is restricted data. The retention task (11.5) deletes old quarantine partitions with the same rule as restricted ones (orchestrator change after review).

Run log (`logs/runs.jsonl`), one line per attempt, for example:

```
{"task": "land", "run_date": "2026-03-02", "status": "ok", "rows": 89, "detail": "", "started_at": "2026-10-24T12:27:20.411000Z", "ended_at": "2026-10-24T12:27:20.598000Z"}
```

Tests: `test_same_phone_gives_the_same_key`, `test_different_secret_gives_a_different_key`, `test_different_phones_give_different_keys`, `test_key_is_a_truncated_hmac_sha256`, `test_shared_files_have_no_name_or_phone`, `test_keys_in_shared_files_are_the_hmac_of_the_phone`, `test_publishing_twice_leaves_one_file_and_the_same_rows`, `test_no_key_stops_with_a_clear_error`, `test_the_secret_is_never_written_to_disk`, `test_first_extract_gets_all_rows_and_the_second_gets_none`, `test_registry_files_have_no_name_or_phone`, `test_second_extract_picks_up_exactly_the_v07_phone_change`, `test_market_changes_are_picked_up_when_they_happen`, `test_a_failure_before_writing_does_not_move_the_watermark`, `test_watermark_file_holds_the_biggest_updated_at`, `test_limit_a_hard_delete_is_invisible_to_watermark_extraction`, `test_unknown_table_is_refused`, `test_log_run_appends_one_json_line_with_utc_times`.

## 7. Chapter 7.5: the dbt project

Files: everything under `transform/`, `tests/test_dbt_project.py`.

```
$ cd transform
$ dbt build --profiles-dir .
Found 8 models, 28 data tests, 1 seed, 1 snapshot, 3 sources, 501 macros, 1 unit test
...
Finished running 1 incremental model, 1 seed, 1 snapshot, 7 table models, 28 data tests, 1 unit test in 0 hours 0 minutes and 1.22 seconds (1.22s).
Completed successfully
Done. PASS=39 WARN=0 ERROR=0 SKIP=0 NO-OP=0 REUSED=0 TOTAL=39
$ dbt docs generate --profiles-dir .
Catalog written to ...\transform\target\catalog.json
```

Wall time is about 12 seconds per `dbt build` command (the model run is about 1 to 2 seconds; the rest is Python start and parse). The first `dbt` command in a fresh venv can take 30 seconds.

Prerequisites: `dbt build` needs the lake to exist: `python -m pipeline.land --all`, `python -m pipeline.pseudonymise --all` and both registry extractions first. If the registry was never extracted, the source glob matches no files and the build fails.

Warehouse contents after the 28-day build: `stg_price_reports` 2620 rows, `fct_price_report` 2620, `dim_item` 12, `dim_date` 28 (keys 20260301 to 20260328), `dim_market` 8 (one version each, since the registry was extracted once, after both changes; M03 is Hill, M06 is `Sat to Thu`, `valid_from` 1900-01-01), `mart_weekly_basket` 38 rows. Schemas: `main` and `snapshots` (a `generate_schema_name` macro override makes `schema: snapshots` mean exactly `snapshots`, not `main_snapshots`).

Weekly mart (28 days; market, ISO week, full days, average basket in ILS, change, change percent), complete:

```
M01: w10 3 139.08 -    | w11 5 139.10 +0.02 0.0 | w12 2 142.00 +2.90 2.1 | w13 5 140.70 -1.30 -0.9
M02: w9 1 134.25 -     | w10 3 135.92 +1.67 1.2 | w11 5 135.65 -0.27 -0.2 | w12 5 136.40 +0.75 0.6 | w13 3 137.50 +1.10 0.8
M03: w9 1 145.50 -     | w10 5 145.40 -0.10 -0.1 | w11 5 146.30 +0.90 0.6 | w12 5 147.40 +1.10 0.8 | w13 2 149.50 +2.10 1.4
M04: w9 1 134.00 -     | w10 5 131.80 -2.20 -1.6 | w11 6 132.25 +0.45 0.3 | w12 5 133.55 +1.30 1.0 | w13 4 134.19 +0.64 0.5
M05: w9 1 154.50 -     | w10 3 153.17 -1.33 -0.9 | w11 3 154.75 +1.58 1.0 | w12 5 154.20 -0.55 -0.4 | w13 3 154.58 +0.38 0.2
M06: w10 3 141.42 -    | w11 4 143.13 +1.71 1.2 | w12 4 143.88 +0.75 0.5 | w13 4 144.31 +0.43 0.3
M07: w9 1 137.50 -     | w10 6 136.25 -1.25 -0.9 | w11 6 137.33 +1.08 0.8 | w12 1 137.00 -0.33 -0.2 | w13 5 138.00 +1.00 0.7
M08: w9 1 139.00 -     | w10 4 142.75 +3.75 2.7 | w11 5 143.70 +0.95 0.7 | w12 6 144.58 +0.88 0.6 | w13 4 146.00 +1.42 1.0
```

Notes on the dbt choices a writer needs:
- **Snapshot syntax for dbt 1.12 (YAML, tested):** `snapshots/snap_markets.yml` with `relation: ref('stg_markets')` and `config: {schema: snapshots, unique_key: market_code, strategy: timestamp, updated_at: updated_at, hard_deletes: ignore}`. Snapshots of a `ref()` are fine. The snapshot is a node between staging and the marts in the DAG.
- **Sources** use `meta: external_location: "read_parquet('../lake/shared/reports/*/*.parquet', hive_partitioning = true, union_by_name = true)"`. The paths are relative to the folder dbt is run from (`transform/`), and so is `path: ../warehouse.duckdb` in `profiles.yml`. Staging models are materialised as tables so the warehouse does not depend on those relative paths later.
- **`unit` before 15 March:** if no Parquet file has `unit` yet (for example the 10-day CI run), `select unit` fails. `stg_price_reports` starts from `select * from (select cast(null as varchar) as unit where false) union all by name select * from source`, which guarantees the column (DuckDB's `UNION ALL BY NAME`).
- **Contract + incremental:** with `contract: {enforced: true}` dbt refuses `on_schema_change: ignore` and says `Models materialized as incremental with contracts enabled must set on_schema_change to 'append_new_columns' or 'fail'`. The model uses `fail`. Changing `price` to `double` in the SQL makes the build fail with a contract error naming the column and both types (tested).
- `avg()` of a `DECIMAL(8,2)` column returns `DOUBLE` in DuckDB 2.0.0, so the mart rounds once, at the end (`round(avg(basket_cost), 2)` cast to `decimal(10,2)`). Rounding the same way is what makes it equal to drill d08.
- **Test syntax:** generic tests with arguments use the new `arguments:` key (`accepted_values: {arguments: {values: [...]}}`, `relationships: {arguments: {to:, field:}}`); no deprecation warnings appeared with dbt 1.12.6.
- **Unit test** `weekly_basket_with_change_from_previous_week` mocks `fct_price_report` and `dim_market`, uses `overrides: vars: basket_items: 2`, and expects week 10 = 30.00 and week 11 = 33.00 (change 3.00, 10.0 percent). The repeated item on 9 March is averaged (11 and 13 give 12) and 10 March is dropped because it has only one item.
- **dbt-duckdb keeps the warehouse file open for the life of the Python process.** Two things follow: (1) calling `dbtRunner` in the same process as DuckDB code works only if you reuse the same connection settings (a `read_only=True` connect fails with `Can't open a connection to same database file with a different configuration`); (2) one process cannot drive two projects. `tests/day_by_day.py` therefore runs the whole day loop in its own process. Running dbt through `subprocess` has no such issue, and that is what the runner does.
- `dbt` start-up dominates short runs: `dbt run --select ...` as a subprocess takes about 8 seconds; in-process `dbtRunner` takes about 1.7 seconds after the first call.

Snapshot scenario (`test_snapshot_keeps_two_rows_for_m03_after_the_registry_change`): 14 days of data; registry as of 11 March; full build; registry as of 14 March; extract markets; build again.

```
snapshots.snap_markets for M03:  Harbour 2026-03-01 -> 2026-03-12 ; Hill 2026-03-12 -> NULL
dim_market for M03:              Harbour 1900-01-01 -> 2026-03-12, is_current false ; Hill 2026-03-12 -> NULL, is_current true
facts for M03:                   Harbour for reported_date 2026-03-01 .. 2026-03-11 ; Hill for 2026-03-12 .. 2026-03-14
```

Tests: `test_first_dbt_build_succeeds`, `test_a_second_build_is_incremental_and_still_succeeds`, `test_fact_count_equals_distinct_good_report_ids`, `test_weekly_mart_has_8_markets_and_the_expected_weeks`, `test_weekly_mart_gives_the_same_numbers_as_the_sql_drill`, `test_weekly_mart_values_for_one_market`, `test_dimensions`, `test_every_fact_has_a_market_item_and_date`, `test_staging_keeps_the_latest_send_and_unit_is_null_before_the_form_change`, `test_the_dbt_unit_test_passes_on_its_own`, `test_docs_generate_works_offline`, `test_the_contract_stops_a_column_type_change`, `test_snapshot_keeps_two_rows_for_m03_after_the_registry_change`. All marked `slow`.

## 8. Chapter 8.5: contract, quarantine, late data, backfill

Files: `contracts/price_reports.yml`, `pipeline/contract.py`, `scripts/backfill.py`, the `lookback_days` logic in `models/marts/fct_price_report.sql`, `tests/test_late_and_backfill.py`, `tests/day_by_day.py`.

Contract (`contracts/price_reports.yml`): name, version 1.0.0, owner, consumers, description; `fields` (9 required, `unit` optional with `since: "2026-03-15"`); `rules` with a SQL `fails_when` and a `reason`: `price_is_positive` (reason `price must be above 0`) and `item_code_is_present` (reason `item_code is missing`). Two levels: a batch missing a required field raises `ContractError: contract price_reports v1.0.0: required field(s) missing from the batch: price` and writes nothing; unknown extra fields (for example `note`) are kept; a row breaking a rule goes to `lake/quarantine/reports/upload_date=D/part-0.parquet` with a `reason` column.

Quarantine for the full month: 13 rows, `price must be above 0` 9 and `item_code is missing` 4; their report_ids equal the bad lines in the JSON files.

Incremental fact:

```sql
{{ config(materialized='incremental', unique_key='report_id', incremental_strategy='delete+insert', on_schema_change='fail') }}
... where reported_date >= (select max(reported_date) from stg_price_reports) - interval '3 days'     -- var lookback_days, default 3
... or, when start_date is given:  where reported_date between date '<start_date>' and date '<end_date>'
```

The window is measured from the newest report date in staging. Up to 3 days late fits exactly: after the 12 March upload, max is 12 March, the window starts 9 March, and the M05 reports for 9 March are on its first day. The generator never makes a report arrive more than 3 days after it was made, and duplicate sends are placed so the second send is also at most 3 days after the report. That is why one-day-at-a-time equals one big run exactly.

```
$ python scripts/backfill.py --start 2026-03-05 --end 2026-03-07
2026-03-05: relanded and republished 101 rows
2026-03-06: relanded and republished 96 rows
2026-03-07: relanded and republished 99 rows
dbt build finished for reported dates 2026-03-02 to 2026-03-07
```

The dbt range starts 3 days before `--start`, because a report uploaded on 5 March can be dated 2 March. Manual form: `dbt build --profiles-dir . --vars '{start_date: "2026-03-02", end_date: "2026-03-07"}'`.

Findings the tests document (16 days of data, upload days 1 to 16 March):
- Day by day (land, publish, dbt after each day) gives exactly the same `mart_weekly_basket` and the same fact rows (all columns, including `uploaded_at`) as one big run. 27 mart rows.
- Outage: after the 11 March run, M05 has 0 facts for 9 to 11 March; after the 12 March run it has 34, and still 34 on the 16th.
- After every day the fact count equals the number of distinct good report ids uploaded so far (duplicates never inflate it).
- `unit` is NULL for every fact whose latest send was uploaded before 2026-03-15 and set for all later ones; 4 distinct units overall.
- A 3-day backfill leaves the count, the price total, the min and max `uploaded_at` and the mart unchanged.
- **Cost of no lookback:** with `lookback_days: 0` and 13 days of data, M05's 34 late reports for 9 to 11 March never reach the fact table, and other late reports are lost too, because every late report is outside a one-day window.
- **A dimension change found late needs a backfill** (surprising): registry extracted as of 11 March, facts built; then the M03 move to Hill is extracted on 16 March. The normal run only re-reads 13 to 16 March, so facts of 12 March keep the Harbour key until `scripts/backfill.py --start 2026-03-12 --end 2026-03-16` re-reads them. Incremental facts keep old foreign keys; lookback is for late facts, not late dimensions.

Tests: `test_daily_runs_give_the_same_weekly_mart_as_one_big_run`, `test_daily_runs_give_the_same_facts_as_one_big_run`, `test_m05_late_reports_are_in_the_fact_table_after_day_12`, `test_duplicate_sends_never_raise_the_fact_count`, `test_unit_is_null_before_15_march_and_filled_after`, `test_a_backfill_of_three_days_leaves_every_total_unchanged`, `test_without_a_lookback_the_late_m05_reports_are_missed`, `test_a_dimension_change_found_late_needs_a_backfill`, `test_quarantine_has_the_bad_rows_with_their_reasons`, `test_a_day_with_bad_rows_lands_the_good_ones_and_is_still_idempotent`, `test_a_new_unknown_field_is_allowed_and_kept`, `test_a_batch_missing_a_required_field_fails_with_a_clear_message`. The whole file is marked `slow` because it runs dbt many times (about 2.5 minutes).

## 9. Chapter 9.4: runner and report

Files: `pipeline/runner.py`, `report/build_report.py`, `tests/test_runner.py`.

```
$ python -m pipeline.runner run --date 2026-03-28
2026-03-28 extract_registry=ok, land=ok, publish=ok, dbt_build=ok, checks=ok, report=ok
$ python -m pipeline.runner backfill --start 2026-03-01 --end 2026-03-10      (CI command; about 75 seconds, one dbt build per date)
2026-03-01 extract_registry=ok, land=ok, publish=ok, dbt_build=ok, checks=ok, report=ok
...
$ python -m report.build_report
wrote site/index.html
```

Tasks and upstreams: `extract_registry` [], `land` [], `publish` [land], `dbt_build` [extract_registry, publish], `checks` [dbt_build], `report` [dbt_build, checks]. Order: extract_registry, land, publish, dbt_build, checks, report. `TransientError` is retried (`retries=2` means 3 attempts) with waits `base_delay * 2**attempt` (0.5 then 1.0 in the test). Any other exception fails the task at once and marks every task that depends on it `skipped`. Every attempt, retry and skip is a log line with status `ok`, `retry`, `failed` or `skipped`; the checks task also logs one line per check (`check:freshness`, `check:volume`, `check:schema`). Exit code is 1 when any task failed. `backfill` runs each date once, oldest first, and **stops at the first failing date** (design choice: later dates would otherwise be built on top of a gap). `daily` runs yesterday in UTC. A dbt failure whose output contains `could not set lock` (warehouse open in another program) is raised as `TransientError`; everything else from dbt is a permanent `RuntimeError`.

Report: `site/index.html`, 9.5 KB, one section per market (code and current name) with a table of the latest four ISO weeks (10 to 13 for the 28-day data): week, basket in ILS, change with an up or down word (not colour alone), CSS bar. No JavaScript, no external file, `viewport` meta, light and dark colours through `prefers-color-scheme`. Partial weeks are shown honestly with the number of full days ("from 23 Mar, 4 full day(s)").

Scheduling is for the chapter text only, not tested: Windows `schtasks /create /tn "mizan-daily" /sc daily /st 06:00 /tr "cmd /c cd /d C:\path\mizan-prices && venv\Scripts\python -m pipeline.runner daily"`; cron `0 6 * * * cd /path/mizan-prices && .venv/bin/python -m pipeline.runner daily`. `MIZAN_KEY` must be set in the scheduled environment.

Tests: `test_tasks_run_after_their_upstream_tasks`, `test_a_circle_of_dependencies_is_refused`, `test_a_transient_error_is_retried_and_the_run_succeeds`, `test_the_wait_grows_and_retries_stop_after_two`, `test_a_permanent_error_skips_everything_downstream_and_the_exit_code_is_1`, `test_a_clean_run_has_exit_code_0`, `test_every_attempt_is_logged_with_times`, `test_backfill_runs_each_date_once_in_order`, `test_backfill_stops_at_the_first_failing_date`, `test_the_report_exists_has_all_markets_and_is_small`, `test_a_real_three_day_backfill_from_the_command_line` (slow; 3 days gives 279 facts).

## 10. Chapter 11.5: checks, retention, CI

Files: `pipeline/checks.py`, `pipeline/retention.py`, `.github/workflows/ci.yml`, `tests/test_checks_retention.py`.

```
CheckResult(name='freshness', ok=True, value=0, threshold=2, message='newest partition is 2026-03-28, 0 day(s) old (limit 2)')
CheckResult(name='volume', ok=True, value=111, threshold=48.3, message='111 rows on 2026-03-28; the 7 days before average 96.6, so at least 48.3 is expected')
CheckResult(name='schema', ok=True, value=0, threshold=0, message='partition 2026-03-28 matches contract v1.0.0')
$ python -m pipeline.retention --keep-days 14 --as-of 2026-03-28 --dry-run
would delete lake/restricted/reports/upload_date=2026-03-01
... (13 lines, 03-01 to 03-13)
would delete 13 partition(s); kept everything newer than 14 days before 2026-03-28
```

- Freshness: age in days of the newest restricted partition against a given "today" (the runner passes the run date; it allows 2 days).
- Volume: rows received (restricted plus quarantine) for the date against the average of the partitions in the 7 days before it; fails when below `(1 - tolerance)` of the average, so `tolerance=0.5` means "at least half". Only a drop fails; the 12 March spike (134 rows against about 91) passes. No earlier days means ok.
- Half-day test, 16-day data: 14 March has 101 rows (average 97.1, threshold 48.6, ok). Deleting `batch-01.jsonl` of that day (about 60 percent of its lines) and relanding leaves 40 rows, which fails. Deleting `batch-02` would leave about 60 and pass, so the test deletes batch-01 on purpose; the generator splits each day 60/40.
- Schema: newest partition against the contract. Missing `price` gives `price is missing`; `price` as text gives `price is VARCHAR, the contract says DOUBLE`; extra fields are allowed and listed.
- Retention: restricted and quarantine partitions with `upload_date < as_of - keep_days` (so with `--keep-days 14 --as-of 2026-03-28` the cutoff is 03-14 and 03-01 to 03-13 go, plus quarantine 03-08, 03-10, 03-12 and 03-13). Dry run changes nothing. Shared (pseudonymised) is never touched; the default is 30 days, so with 28 days of data nothing is deleted by default.
- CI (`ci.yml`, not run here but its steps were run by hand in a clean copy): ubuntu, Python 3.12, `pip install -r requirements.txt`, `check_setup.py`, `make_source.py --days 10 --start 2026-03-01 --seed 7 --out data`, `python -m pipeline.runner backfill --start 2026-03-01 --end 2026-03-10`, `pytest -q -m "not slow"`, then `dbt build --profiles-dir .` in `transform/`, with `MIZAN_KEY: ci-test-key-not-a-secret`. In a clean copy those steps all passed (backfill 76 s; `dbt build` PASS=39). The 10-day run has no `unit` column anywhere, which is why staging forces one.

Tests: `test_volume_passes_on_a_normal_day`, `test_volume_fails_on_a_day_with_half_the_rows`, `test_volume_counts_quarantined_rows_as_received`, `test_volume_with_no_earlier_days_passes`, `test_volume_for_a_day_that_never_landed_fails`, `test_freshness_fails_when_the_newest_partition_is_too_old`, `test_freshness_fails_when_nothing_has_landed`, `test_schema_passes_and_allows_extra_fields`, `test_schema_fails_when_a_required_field_disappears`, `test_schema_fails_when_a_type_changes`, `test_the_runner_checks_task_fails_when_a_check_fails`, `test_dry_run_lists_the_right_partitions_and_deletes_nothing`, `test_a_real_run_deletes_old_restricted_partitions_and_keeps_shared`, `test_old_quarantine_partitions_go_too_because_they_hold_names_and_phones`, `test_nothing_is_old_enough_with_the_default_30_days`, `test_retention_command_line`, `test_ci_workflow_is_valid_yaml_with_the_expected_steps`.

## 11. Timing and environment notes

- Whole suite (clean copy, 107 tests): about 4.5 minutes on this laptop; the CI subset (`-m "not slow"`, 80 tests) takes about 50 seconds. Slowest items: the 16-day day-by-day fixture (about 47 seconds), the late dimension test (28 s), the no-lookback test (28 s), the real 3-day runner backfill (27 s).
- Install: `uv pip install -r requirements.txt` into a fresh venv installs 60 or so packages quickly; the course must say it is a one-time download.
- The machine had only about 2 GB of free RAM once during a run, and one test failed with `Out of Memory Error: Allocation failure` from DuckDB (an environment flake, passed when run again). A 4 GB learner laptop may see the same; the dossier's teaching default `SET memory_limit = '2GB'` is worth showing in chapter 4.5 or 11.5.
- `dbt` prints `dbt v2 is available, and is the default for new installations. This is dbt Core v1.` on `dbt --version`. It does not appear during builds.
- Git Bash: `/tmp` is not the same folder for Windows Python and for the shell; use relative paths in examples.
