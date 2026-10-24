08.06-quiz#5 | B | high | A report uploaded on 10 March can be dated 2 days earlier, requiring a start date of 8 March.
09.01-set-the-scene#1 | A | high | Passing tests with stale data points to a missing schedule or alert rather than a code bug.
09.02-dags-and-schedules#1 | B | high | Downstream tasks depend on publish succeeding, so the runner skips all three when publish fails.
09.02-dags-and-schedules#2 | B | high | Clean must follow export_visits, while export_doctors can run in three positions before join.
09.02-dags-and-schedules#3 | C | high | Running at 00:30 for yesterday waits until the 23:50 export window finishes completely.
09.03-retries-and-failures#1 | A | high | Waits of 5, 10, and 20 minutes reach minute 35, which is after the 20-minute outage ends.
09.03-retries-and-failures#2 | D | high | Waits of 2, 4, and 8 minutes total 14 minutes, succeeding on attempt 4 after the 12-minute lock.
09.03-retries-and-failures#3 | B | high | A missing column from a schema change is a permanent failure requiring human intervention, not retries.
09.05-quiz#1 | A | high | Tasks join, report, and email all depend on read_prices directly or transitively, so all three are skipped.
09.05-quiz#2 | D | high | Four retries with waits of 3, 6, 12, and 24 minutes end at minute 45 before the 50-minute outage finishes.
09.05-quiz#3 | C | high | Backfilling from 18 March to 19 March processes each missed date cleanly with idempotent tasks.
09.05-quiz#4 | B | high | An append job that fails mid-run can leave partial rows that get duplicated on retry.
09.05-quiz#5 | A | high | The dbt lock error indicates another process holds the warehouse file; close it and rerun.
10.01-set-the-scene#1 | B | high | A 15-minute batch with 1-minute runtime gives 16-minute latency, well within the 30-minute target.
10.02-logs-partitions-and-offsets#1 | B | high | After a crash, a consumer resumes from its last committed offset, which is still 0.
10.02-logs-partitions-and-offsets#2 | C | high | Messages with the same key go to the same partition, preserving order per tank.
10.03-delivery-guarantees#1 | A | high | Saving the offset before writing causes data loss if the process crashes before the write finishes.
10.03-delivery-guarantees#2 | D | high | Committing the offset before writing means the restart moves past the batch, leaving zero rows written.
10.03-delivery-guarantees#3 | A | high | Keying the target table on event id makes writes idempotent so replayed events overwrite instead of duplicating.
10.04-one-machine-or-a-cluster#1 | B | high | Reading 40 GB takes 80 seconds on one machine versus 88 seconds with cluster startup overhead.
10.04-one-machine-or-a-cluster#2 | C | high | One machine reads 40 GB in 80 seconds, while the 8-node cluster takes 60 plus 16 plus 10 seconds.
10.05-quiz#1 | B | high | Partition ordering guarantees that events sharing a partition are read in send order.
10.05-quiz#2 | D | high | Offsets 5, 6, and 7 were written before the crash and written again when replaying from offset 5.
10.05-quiz#3 | A | high | Kafka exactly-once applies within Kafka streams and topics, not automatically to external database sinks.
10.05-quiz#4 | C | high | A single batch at 04:30 fits the 04:00 to 06:00 power window and 05:00 deadline.
10.05-quiz#5 | B | high | Because 64 cores takes longer than one laptop thread, the system COST exceeds 64 cores.
11.01-set-the-scene#1 | A | high | Recording failures in logs is ineffective without an alert that notifies a person.
11.02-checks-and-monitoring#1 | A | high | With zero percent tolerance, normal daily fluctuations below the rolling average trigger false alarms.
11.02-checks-and-monitoring#2 | C | high | A 25 percent tolerance sets the threshold at 216 rows, ignoring 250 on dust days but catching 144.
11.02-checks-and-monitoring#3 | D | high | A 100-fold jump in average sale value is detected by checking the value distribution.
11.03-personal-data#1 | B | high | Ten million 7-digit combinations take only 11.3 seconds to hash on a single laptop core.
11.03-personal-data#2 | A | high | One billion 9-digit IDs take 100 times 11.3 seconds, or about 19 minutes, to brute-force.
11.03-personal-data#3 | B | high | Data retention compliance requires deleting personal data from exports and backups as well as the lake.
11.04-cost-governance-and-ci#1 | B | high | The dbt build fails in CI because the test still references the old column name price.
11.04-cost-governance-and-ci#2 | A | high | Partitioning by date scans 1 of 156 weeks, saving more than selecting 2 of 20 columns.
11.04-cost-governance-and-ci#3 | C | high | CI only verifies existing tests; dividing positive prices by 100 still passes not-null and greater-than-zero checks.
11.06-quiz#1 | B | high | A 60 percent tolerance allows down to 163 rows, so 205 rows passes without raising an alarm.
11.06-quiz#2 | D | high | Seven unknown digits have only 10 million possibilities, allowing fast brute-force recovery of unsalted hashes.
11.06-quiz#3 | A | high | Quarantine files contain raw personal data like names and phones, so the 30-day rule applies equally.
11.06-quiz#4 | C | high | Filtering on the partition column upload_date lets the engine prune 27 of the 28 daily files.
11.06-quiz#5 | B | high | A 16-day sample never reaches the 30-day or 90-day cutoff, so the test passes for both.
12.01-set-the-scene#1 | A | high | Interview guides consistently describe the SQL screening round as the gate to later rounds.
12.02-the-sql-round#1 | B | high | Clarifying grain, ties, and NULL behavior before coding avoids solving the wrong problem.
12.02-the-sql-round#2 | D | high | The rank function assigns rank 2 to both tied doctors, returning Amal, Basil, and Chadi.
12.03-the-modelling-round#1 | A | high | A delivery-stop grain cannot represent orders without stops, so the table grain must be revisited.
12.03-the-modelling-round#2 | C | high | Repeating the 30.00 order total across three line rows causes a sum to triple to 90.00.
12.04-the-design-round-and-your-story#1 | B | high | End-of-day file exports read once at 08:00 only require a daily batch finishing before 08:00.
12.04-the-design-round-and-your-story#2 | A | high | Specific counts of total, duplicate, and quarantined rows provide concrete evidence of pipeline behavior.
12.05-quiz#1 | B | high | Filtering on the right table's status in WHERE drops NULL matches, removing Chadi from the result.
12.05-quiz#2 | D | high | A NULL inside a NOT IN list causes comparisons to evaluate to unknown, returning zero rows.
12.05-quiz#3 | B | high | Slowly changing dimension type 2 adds a date-ranged row so both May and June reports stay accurate.
12.05-quiz#4 | A | high | A 1-minute scheduled job meets the 1-minute freshness target simply for low volume and one maintainer.
12.05-quiz#5 | C | high | It clearly states the cost of re-reading three days against the benefit of capturing 6 percent late data.
13.01-set-the-scene#1 | A | high | Counting raw lines includes bad rows, whereas the generator knows the expected number of valid records.
