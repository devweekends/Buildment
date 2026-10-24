01.01-set-the-scene#1 | A | medium | A sudden 50 percent jump suggests a pipeline bug, though without story context a real shock is possible.
01.02-what-a-data-engineer-does#1 | B | high | Valid SQL syntax and passing checks do not guarantee upstream input data is accurate or free of duplicates.
01.02-what-a-data-engineer-does#2 | C | high | Checking the boundary export file isolates whether duplication happened in the source app or during pipeline ingestion.
01.03-the-map-of-a-pipeline#1 | A | high | Worst-case staleness equals the 6-hour scheduling interval plus the 30-minute execution duration, totaling 6.5 hours.
01.03-the-map-of-a-pipeline#2 | A | high | A 12-hour schedule plus a 45-minute copy runtime yields a maximum data age of 12.75 hours.
02.01-set-the-scene#1 | B | high | Joining 12 report rows to 2 matching contact rows for M02 duplicates each report, producing 24 rows.
02.02-joins-and-row-counts#1 | A | high | Each of the 3 reports matches both contact rows for M02, yielding 3 times 2 equals 6 rows.
02.02-joins-and-row-counts#2 | D | high | Zone N produces 20 times 3 equals 60 rows and zone S produces 30 times 1, totaling 90.
02.02-joins-and-row-counts#3 | B | high | Filtering the right table in WHERE turns a LEFT JOIN into an inner join; move the condition to ON.
02.03-aggregation-traps#1 | B | high | Replacing NULL with 0 includes those 5 rows in the denominator, giving 120 divided by 20 equals 6.00.
02.03-aggregation-traps#2 | A | high | Both AVG(column) and COUNT(column) ignore NULL values, averaging and counting only the 6 non-null rows.
02.03-aggregation-traps#3 | C | high | COUNT(DISTINCT delivery_id) deduplicates the repeated log entries and returns the 100 unique deliveries.
02.04-ctes-and-readable-queries#1 | A | high | Filtering out 2 invalid rows and 2 out-of-basket egg rows from 10 leaves 6 rows.
02.04-ctes-and-readable-queries#2 | D | high | Materializing the slow cleaned step once in a temporary table avoids recomputing it across multiple downstream queries.
02.06-quiz#1 | B | high | A left join from sales to price list preserves all 300 sales rows with NULL for missing prices.
02.06-quiz#2 | D | high | Ten students match two parent rows, adding 1,000 shekels; aggregating fees before joining prevents fan-out inflation.
02.06-quiz#3 | A | high | COUNT(*) is 5, while column aggregates ignore NULLs: 3 non-null rows, average 4, and sum 12.
02.06-quiz#4 | C | high | SUM(DISTINCT amount) deduplicates legitimate orders that share the same amount of 20, returning 20 plus 35 equals 55.
02.06-quiz#5 | B | high | The good step still has 200 rows instead of 195, showing it failed to filter out zero prices.
03.01-set-the-scene#1 | A | medium | Deduplication usually keeps the latest upload, though without business rules either identical-price record could be kept.
03.02-ranking-and-deduplication#1 | A | high | RANK() assigns rank 1 to all tied cheapest rows, so both M04 and M07 are kept.
03.02-ranking-and-deduplication#2 | A | high | Partitioning by order and ordering by edit timestamp descending gives row number 1 to each order's latest status.
03.02-ranking-and-deduplication#3 | C | high | DENSE_RANK() assigns rank 1 to 150 and rank 2 to 140 without skipping ranks after ties.
03.03-running-totals-and-frames#1 | B | high | In a steady upward trend, a shorter 3-row window lags less behind the current day than 7 rows.
03.03-running-totals-and-frames#2 | D | high | LAG steps back one physical row in the ordering, which is Tuesday (70), giving 60 minus 70 equals -10.
03.03-running-totals-and-frames#3 | B | high | Without PARTITION BY, the frame crosses shops and averages 20, 30, and 100 to get 50.
03.04-query-plans-and-indexes#1 | B | high | Matching 25,000 rows via index costs about 75,018 pages, far more than the 2,000-page full scan.
03.04-query-plans-and-indexes#2 | B | high | A composite index on (patient_id, visit_date) supports lookups filtering on its leading column, patient_id.
03.04-query-plans-and-indexes#3 | A | high | Full scan reads 4,000 pages while the index reads about 18.6 plus 3 times 8,000 equals 24,019 pages.
03.06-quiz#1 | C | high | RANK() keeps the 16:00 paracetamol row and both tied 08:00 ibuprofen rows at rank 1, giving 3 rows.
03.06-quiz#2 | A | high | DISTINCT checks all selected columns, and since status or edited_at differs per edit, all 50,000 rows remain.
03.06-quiz#3 | D | high | The query filters only on student_id, which is not the leading column of (class_id, student_id).
03.06-quiz#4 | B | high | A 2-day RANGE frame on Friday covers Wednesday to Friday, averaging Thursday (15) and Friday (13) to 14.0.
03.06-quiz#5 | C | high | Full scan costs 5,000 pages; 1,700 matches via index cost 19 plus 5,100 equals 5,119 pages.
04.01-set-the-scene#1 | A | high | Joining historical reports to an overwritten current registry assigns M03's current area, Hill, to past reports.
04.02-oltp-and-olap#1 | B | medium | Star schemas excel at simple report queries, though exact widget point weights are not shown in the prompt.
04.02-oltp-and-olap#2 | D | high | Use normalized OLTP tables for daily writes and build an analytical star schema preserving historical class for reporting.
04.02-oltp-and-olap#3 | A | high | Denormalized data caused an update anomaly after power loss, leaving inconsistent phone numbers for the same supplier.
04.03-grain-facts-and-dimensions#1 | A | high | A daily market total across three items loses item-level grain, making individual item prices unrecoverable.
04.03-grain-facts-and-dimensions#2 | C | high | Storing a daily total on every delivery row mixes grains and causes summation to triple-count the 180 litres.
04.03-grain-facts-and-dimensions#3 | B | high | Storing atomic 15-minute readings supports current daily averages as well as future daily minimum and hourly drop queries.
04.04-slowly-changing-dimensions#1 | B | high | SCD Type 1 overwrites Harbour with Hill in place, so all four historical and new reports show Hill.
04.04-slowly-changing-dimensions#2 | A | high | Use SCD Type 1 (overwrite) for correcting typos and SCD Type 2 (new row) to preserve district history.
04.04-slowly-changing-dimensions#3 | D | high | With half-open intervals where valid_to is exclusive, 2026-03-12 falls into key 4 starting on 2026-03-12.
04.06-quiz#1 | B | high | Having 12,400 rows for 12,100 distinct appointments violates the declared grain and double-counts 300 appointments.
04.06-quiz#2 | D | high | Joining only on natural key shop_code matches each sale to all 3 SCD versions, tripling 50,000 to 150,000.
04.06-quiz#3 | A | high | Separating OLAP reporting from live OLTP tables via scheduled copies prevents heavy analytical queries from locking cashiers.
04.06-quiz#4 | C | high | District history requires Type 2, name typo correction requires Type 1, and current-only language preference requires Type 1.
04.06-quiz#5 | D | high | Because valid_to 2026-02-09 is exclusive, R1 gets 3 February (1) and R2 gets 9 and 10 February (2).
05.01-set-the-scene#1 | A | high | Opening and reading metadata across 1,000 tiny files incurs high filesystem overhead compared to reading one file.
05.02-rows-columns-and-parquet#1 | B | high | Columnar storage reads only the 3 requested columns out of 10 equal-width columns, or 3 tenths.
05.02-rows-columns-and-parquet#2 | C | high | Reading 4 of 20 equal-width columns allows a columnar format to skip the other 16 columns, or 80 percent.
05.02-rows-columns-and-parquet#3 | A | high | Unsorted data has min-max range A to C in every row group; sorting by branch enables min-max pruning.
05.03-partitions-and-file-sizes#1 | A | high | Filtering on 7 days across all 8 markets without a market filter opens 7 times 8 equals 56 partitions.
