05.03-partitions-and-file-sizes#2 | B | high | 7 days times 25 depots equals 175 files, with about 800 rows per file, causing high small-file overhead.
05.03-partitions-and-file-sizes#3 | A | high | Her test only measured compressed byte size, not read time, so speed claims are unsupported by her evidence.
05.04-lakes-and-warehouses#1 | B | high | A file lake prioritizes low cost and open formats while offering the weakest built-in update safety.
05.04-lakes-and-warehouses#2 | B | high | A table format provides atomic snapshot commits so readers do not see partial multi-file rewrites.
05.04-lakes-and-warehouses#3 | D | high | A single writer with 40,000 rows and zero budget does not need lakehouse snapshot complexity.
05.06-quiz#1 | C | high | Daily folders give 2,000 rows per file above the 1,000 minimum and allow idempotent daily partition replacement.
05.06-quiz#2 | A | high | Min-max stats let the engine skip groups 1 and 4 whose maximum prices are at most 30.
05.06-quiz#3 | D | high | Columnar storage minimizes I/O for 2-column aggregations, while row storage suits full-row point lookups.
05.06-quiz#4 | B | high | A managed warehouse provides per-user access control, safe row updates, and minimal operational overhead.
05.06-quiz#5 | D | high | Late uploads mean ingestion date differs from event date; filtering by attendance date includes late arrivals.
06.01-set-the-scene#1 | B | medium | Exact duplicate sets keep unweighted averages identical, though lesson context on M05's prior rows is unseen.
06.02-etl-elt-and-zones#1 | A | high | Shared zones strip direct identifiers like name and phone, replacing them with a keyed pseudonym.
06.02-etl-elt-and-zones#2 | C | high | Shared zone data should omit direct PII (name, phone) and use a keyed code instead of plain hashes.
06.02-etl-elt-and-zones#3 | D | high | Retaining raw files in ELT allows re-running updated SQL transformations over historical data to recompute results.
06.03-idempotent-jobs#1 | B | high | Appending twice doubles the 100 rows to 200, while partition replacement is idempotent and leaves 100 rows.
06.03-idempotent-jobs#2 | B | high | Doubling the row count with an unchanged average indicates the rerun appended duplicate rows instead of replacing.
06.03-idempotent-jobs#3 | A | high | Using the system clock writes to the rerun date's folder; passing execution date as a parameter fixes it.
06.04-incremental-loads-and-cdc#1 | A | high | Hard deletes remove the row from the source table, so a timestamp watermark query cannot detect it.
06.04-incremental-loads-and-cdc#2 | D | high | Hard-deleted rows disappear from the table and cannot be captured by an updated_at watermark query.
06.04-incremental-loads-and-cdc#3 | C | high | Advancing the watermark before writing data causes a failed run's records to be skipped on the next run.
06.06-quiz#1 | B | high | Logs containing names and phone numbers hold personal data and require the same access restrictions.
06.06-quiz#2 | C | high | Partition replacement overwrites the 3 May partition with the 520 rows from the corrected source file.
06.06-quiz#3 | A | high | Strictly greater than 09:00 matches only R2; R1 is equal, R3 is deleted, and R4 has an older timestamp.
06.06-quiz#4 | D | high | For a tiny 40-row table with hard deletes, a full nightly overwrite is simplest and captures deletions.
06.06-quiz#5 | C | high | Pseudonymized data with a linkable key for 12 people is still personal data and not safe to publish publicly.
07.01-set-the-scene#1 | A | medium | Unfiltered bad rows in raw data often inflate counts, though the specific M02 scenario context is not shown.
07.02-models-refs-and-layers#1 | B | high | When an upstream model fails in dbt build, downstream dependent models are skipped to prevent stale data.
07.02-models-refs-and-layers#2 | B | high | dbt skips downstream dependents of failed stg_orders (daily_orders and net_sales), while independent stg_refunds still runs.
07.02-models-refs-and-layers#3 | D | high | Without ref, dbt lacks the dependency edge and may build net_sales before daily_orders is updated.
07.03-tests-contracts-and-docs#1 | A | high | Uniqueness and relationship tests catch 14 rows, while plausible but inaccurate positive prices pass positive-value tests.
07.03-tests-contracts-and-docs#2 | A | high | The configured tests only check uniqueness, non-null student_key, and valid class_key, not class capacity limits.
07.03-tests-contracts-and-docs#3 | C | high | An enforced dbt model contract validates column data types at build time and halts on mismatches.
07.04-snapshots-and-incremental-models#1 | B | high | Snapshots only capture state at run time, so intermediate changes between the 11 March and 14 March runs are missed.
07.04-snapshots-and-incremental-models#2 | C | high | Without a unique_key, an incremental model appends the 40 rows from the 2-day lookback window again.
07.04-snapshots-and-incremental-models#3 | B | high | Weekly Sunday snapshots miss Monday's intermediate change to B and only record the transition from A to C.
07.06-quiz#1 | A | high | dim_drug is the root failure in the DAG that caused downstream fct_sales and mart_weekly to be skipped.
07.06-quiz#2 | C | high | Duplicate o3 fails unique and missing c9 fails relationships, while no test checks the 250.00 amount.
07.06-quiz#3 | D | high | Passing tests only confirms defined constraints hold; 80 is positive and passes even though it is factually wrong.
07.06-quiz#4 | B | high | The incremental filter only reads the last 2 days, so a 5-day-old change is not fetched without a backfill.
07.06-quiz#5 | C | high | A small, static, non-sensitive lookup table shared by models is best managed as a dbt seed CSV.
08.01-set-the-scene#1 | A | high | Filtering strictly for reports dated 12 March excludes all 37 late reports dated 9 to 11 March.
08.02-event-time-and-late-data#1 | B | high | 76 of 211 late reports is about one third, as delays are spread evenly across 1, 2, and 3 days.
08.02-event-time-and-late-data#2 | D | high | Since the maximum arrival delay is 3 days, a 3-day lookback catches all 1,000 rows with minimal reading.
08.02-event-time-and-late-data#3 | A | high | A 1-day lookback from Thursday covers Wednesday and Thursday visit_dates, missing Monday's late-entered visit.
08.03-duplicates-and-keys#1 | A | high | SELECT DISTINCT compares all columns, so differing sent_time timestamps keep all 79 resends distinct.
08.03-duplicates-and-keys#2 | B | high | Deduplicating on order_id removes resends with different sent times while preserving separate same-day customer orders.
08.03-duplicates-and-keys#3 | C | high | Comparing all columns except sent_time treats null pack_size and pack_size 10 as distinct rows.
08.04-backfills-and-schema-evolution#1 | B | high | Adding an optional field satisfies the schema contract, whereas missing a required field stops Batch B.
08.04-backfills-and-schema-evolution#2 | A | high | Extra fields are permitted by the contract, so only Batch B is stopped for missing required class_code.
08.04-backfills-and-schema-evolution#3 | D | high | Replacing by order_id is idempotent, so rerunning the 3-day backfill leaves row counts and totals unchanged.
08.06-quiz#1 | B | high | Catching at least 95 percent of 60 late rows requires at least 57 rows, which needs a 3-day lookback.
08.06-quiz#2 | D | high | Deduplicating by delivery_id collapses the repeated w-1 send while keeping both real deliveries for H4.
08.06-quiz#3 | C | high | Rerunning an append-only job for already loaded dates duplicates those rows and doubles their totals.
08.06-quiz#4 | A | high | Extra fields are allowed in A, row-level failure in B quarantines the bad row, and missing required column stops C.
