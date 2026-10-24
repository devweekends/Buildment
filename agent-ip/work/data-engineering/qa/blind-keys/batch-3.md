### 08.06-quiz#5 (mcq)
Layla's fact table reads a lookback of 2 days. A bug in a model is fixed, and she must rebuild the facts for the upload dates 10 to 12 March. A report uploaded on 10 March can be dated up to 2 days earlier. From which report date should dbt start its range?
A. 10 March, because that is the first upload date
B. 8 March, because a report from 10 March can be 2 days older
C. 12 March, because the range must end on the last upload date
D. 1 March, because a backfill always starts at the beginning

### 09.01-set-the-scene#1 (predict)
Hala's pipeline code is correct and all her tests pass. Omar's report still shows nothing newer than 15 March on Monday 23 March. What is the most likely cause?
A. Nothing started the pipeline, and nothing told Hala
B. A hidden bug in the code stopped new rows from loading

### 09.02-dags-and-schedules#1 (predict)
In one run, publish fails for good. After publish come three more tasks: dbt_build, checks and report. Which of those three should still run in this run?
A. All three, using the older data in the warehouse
B. None of them: all three are skipped

### 09.02-dags-and-schedules#2 (mcq)
Noor, who manages a clinic, has a nightly job with five tasks. export_visits and export_doctors have no upstream task. clean waits for export_visits. join waits for clean and export_doctors. report waits for join. How many different orders can a runner use without breaking a dependency?
A. Two, because the two export tasks can swap places with each other
B. Three, because export_doctors fits in three places among the others
C. Six, because the first three tasks can run in any order at all
D. One, because join waits for two tasks, so the whole order is fixed

### 09.02-dags-and-schedules#3 (mcq)
Ammar built a daily job for his freelance client's online shop. The shop exports the day's orders as one file between 23:00 and 23:50. His job runs at 23:30 and reads the file for today. On most days it misses the last orders, and it never fails. What fits the facts?
A. Retry the job three times at 23:30, so it reads the file again
B. Run the job twice, at 23:30 and again at 23:40
C. Start the job at 00:30 and have it read the file for yesterday
D. Make the job wait for itself, so no second run can start

### 09.03-retries-and-failures#1 (predict)
A task fails at minute 0 because a drive is down for 20 minutes. It may retry 3 times. The first wait is 5 minutes and each wait is double the one before. Does the task get through?
A. Yes, a retry starts after the drive is back
B. No, 3 waits of 5 minutes reach only minute 15

### 09.03-retries-and-failures#2 (mcq)
Rawan, who looks after a pharmacy's stock sheet, runs a job that reads a price list from a shared folder. Another program sometimes locks the file for up to 12 minutes. She sets 3 retries with a first wait of 2 minutes, doubling each time. The lock lasts 12 minutes. What happens?
A. It works on attempt 3 at minute 6, after waits of 2 and 4
B. It fails all four attempts, because 2 minutes four times is 8
C. It gives up at minute 6 after three attempts and never tries again
D. It works on attempt 4 at minute 14, after waits of 2, 4 and 8

### 09.03-retries-and-failures#3 (mcq)
Ammar's job reads the order file of his freelance client's shop. On Thursday it stops with 'column total_price not found'. His runner retries 3 times, and each try gives the same message. The shop's developer renamed the column on Wednesday. What should Ammar do?
A. Raise the retries to 10 and the first wait to 5 minutes
B. Treat it as permanent: stop, tell a person and fix the column name
C. Add a timeout of 10 minutes so the job cannot run for long
D. Run the job every hour instead of every day, so it has more chances

### 09.05-quiz#1 (mcq)
Zaid's bakery job has five tasks. Upstream tasks: read_sales none, read_prices none, join (read_sales, read_prices), report (join), email (report). Tonight read_prices fails for good with a plain error. Which tasks does the runner mark skipped?
A. join, report and email, since each one is downstream of read_prices
B. Only join, because it is the one task that lists read_prices
C. All four other tasks, because a failure anywhere stops the whole run
D. Only report and email, because join already has read_sales

### 09.05-quiz#2 (mcq)
Dalia's job builds a water delivery list from a tank file on a shared drive. The drive goes down for 50 minutes. Her runner allows 4 retries, a first wait of 3 minutes and waits that double. The first attempt fails at minute 0. What is the result?
A. It works on attempt 5 at minute 45, because the retries cover 45 of the 50 minutes
B. It gives up at minute 12, because every wait is 3 minutes and 4 retries make 12
C. It works on attempt 4 at minute 21, because the fourth wait is 12 minutes
D. It gives up at minute 45 after five attempts, because the outage ends at minute 50

### 09.05-quiz#3 (mcq)
Rawan's laptop was off on 18 and 19 March because of a power cut. Her tasks are idempotent, and the daily command runs yesterday in UTC. On 20 March she wants both missing days in the report. Which command fits best?
A. Run daily twice, because daily fills in the missing days one by one
B. Run run --date 2026-03-20 once, because the report is built today
C. Run backfill --start 2026-03-18 --end 2026-03-19, one run per date
D. Delete the lake and the warehouse, then land every date from the start

### 09.05-quiz#4 (mcq)
Ammar asks an AI chat tool whether it is safe to add 3 retries to his daily job, which appends the day's orders to a table. It answers: 'Yes. Retries run only after a failure, so rows cannot be doubled, and appending is fine because the job only runs once a day.' What is wrong with the answer?
A. Nothing is wrong: a failed job writes nothing at all, so a retry cannot repeat rows
B. A job that fails halfway may leave rows behind, so a retry can write them twice
C. Three retries are too few for a daily job, so it would still fail on bad days
D. A daily job should never be retried, because one day cannot be run twice

### 09.05-quiz#5 (mcq)
Rawan reads the log for 12 March. extract_registry: ok. land: retry, then ok with 135 rows. publish: ok. dbt_build: retry, retry, failed, with the detail 'dbt failed: could not set lock'. checks: skipped. report: skipped. Exit code 1. What should she do first?
A. Close the program holding the warehouse file, then rerun the date
B. Run land again, because it needed a retry before it finally worked
C. Rewrite the checks, because checks did not run on 12 March at all
D. Raise the retries of report, because report did not finish its run

### 10.01-set-the-scene#1 (predict)
Saeed's technician needs to hear about a low battery within 30 minutes. A batch run every 15 minutes takes about 1 minute, so the newest data a person sees is at most 16 minutes old. Does this case need a streaming system?
A. Yes, anything that is called live needs streaming
B. No, a batch every 15 minutes is fresh enough

### 10.02-logs-partitions-and-offsets#1 (predict)
A consumer reads offsets 0, 1 and 2, writes the first two to a database, and crashes before it saves its position. Its saved position is still 0. Where does it start reading after the restart?
A. At offset 2, after the last event it wrote
B. At offset 0, its saved position

### 10.02-logs-partitions-and-offsets#2 (mcq)
Dalia's water tanker round has 40 tank sensors. Each sends a level every 10 minutes into a topic with 3 partitions. The key is the tank id. A group of 3 consumers reads the topic. Which statement is guaranteed?
A. All 40 sensors' readings are read in the order they were sent
B. Each consumer in the group reads every partition of the topic
C. The readings of one tank are read in the order they were sent
D. A reading is removed from its partition once a consumer reads it

### 10.03-delivery-guarantees#1 (predict)
A consumer saves its position first, then writes the batch of 10 readings to a table. It crashes after the save and before the write, and then restarts. What happens to the batch?
A. It is lost: the log thinks it was handled
B. It is written twice, once before and once after

### 10.03-delivery-guarantees#2 (mcq)
Ammar's consumer reads a batch of 20 order events for his client's shop. It saves its position first and then writes the orders to a table. The program crashes after the save and before the write, and then restarts. What is the final state of the table?
A. All 20 orders are in the table once, because the restart reads the batch again
B. The 20 orders are written twice, so the table has 40 rows
C. The table has 10 orders, because the crash happens halfway through the batch
D. None of the 20 orders is in the table, and no error is reported

### 10.03-delivery-guarantees#3 (mcq)
Rawan's consumer writes 15 stock events to a table and then saves its position. After a crash and a restart, the table has 30 rows for 15 events. She must not lose events. Which change fixes the table?
A. Key the table on each event's own id, so a repeat replaces the row
B. Save the position first, so the batch is not written twice
C. Add DISTINCT to the stock report so each event is counted once
D. Restart the consumer more slowly, so the crash cannot repeat

### 10.04-one-machine-or-a-cluster#1 (predict)
In the canvas's toy model, a table of 200 GB is read by a query that needs 20 percent of the columns. One machine reads 0.5 GB per second. A cluster of 4 machines needs 60 seconds to start and adds 2 seconds per machine. Which finishes first?
A. The cluster, because 4 machines read 4 times faster
B. One machine, because the query reads only 40 GB

### 10.04-one-machine-or-a-cluster#2 (mcq)
Zaid's bakery chain keeps 400 GB of sales files. A report reads 10 percent of the columns, so 40 GB. In the canvas's toy rule, one machine reads 0.5 GB per second, and a cluster of 8 machines needs 60 seconds to start, adds 2 seconds per machine and reads 8 times faster. Which finishes first?
A. The cluster, because the table is 400 GB and that is a large table
B. The cluster, because 8 machines read 8 times faster than one
C. One machine, which takes 80 seconds; the cluster takes 86 seconds
D. They tie, because both need to read the same 40 GB

### 10.05-quiz#1 (mcq)
Zaid's three ovens send a temperature every minute, with the oven letter as the key, into a topic with 3 partitions. Oven A goes to partition 0, B to partition 1 and C to partition 2. They are sent in this order: A 180, B 200, A 190, C 170, B 210. Which statement is guaranteed for a reader?
A. Oven A's 180 is read before oven C's 170, because it was sent first
B. Oven B's 200 is read before oven B's 210, because they share a partition
C. All five readings are read in the order they were sent, from A 180 to B 210
D. Oven C's 170 is read before A's 190, because its offset is 0 and A's is 1

### 10.05-quiz#2 (mcq)
Saeed's consumer reads one partition in batches of 5 events and saves its position after each batch. It wrote offsets 0 to 4 and saved position 5. It then wrote offsets 5, 6 and 7 and crashed before the next save. The table has no key. After the restart, the consumer finishes offsets 5 to 9. How many duplicate rows does the table hold?
A. None, because the saved position of 5 shows that offsets 0 to 4 are safe
B. Five, because the whole second batch of five events is written again
C. Eight, because every offset from 0 to 7 is read again after the crash
D. Three, because offsets 5, 6 and 7 were written before the crash and again

### 10.05-quiz#3 (mcq)
Ammar asks an AI chat tool how to receive sensor events from a Kafka topic into his database. It answers: 'Use the exactly-once setting. Exactly-once is guaranteed from the producer all the way into your database, so your table does not need a key.' What is wrong with this answer?
A. Exactly-once covers work between Kafka topics, so the table still needs a key
B. Kafka cannot repeat a message, so a database never sees one event twice
C. Exactly-once only works when the table has no primary key, so the key must go
D. The answer is right, but it should also add DISTINCT to every report on it

### 10.05-quiz#4 (mcq)
Dalia's driver plans the water round once a day at 05:00 from the tank levels. 40 sensors each send a level every 10 minutes, so 5,760 readings a day, and a gateway stores them in files. Dalia's laptop is on only from 04:00 to 06:00 because of power cuts. Which design fits?
A. A streaming service that runs all day and shows every tank level live
B. A batch every 15 minutes through the day, with a page for each tank
C. One batch at 04:30 that reads the overnight files and writes the list
D. A cluster of 4 machines, because 40 sensors send a lot of readings

### 10.05-quiz#5 (mcq)
A team's job on a 64-core cluster takes 120 seconds. A colleague runs a simple one-thread script on a laptop, on the same data, and gets the same answer in 90 seconds. What does the COST idea from the paper say?
A. The cluster wins, because 64 cores is more than the laptop's one thread
B. The cluster has not beaten one thread, so its COST is above 64 cores
C. The laptop script is not a fair test, because laptops are not for production
D. Any job that takes under 100 seconds on one thread needs no cluster

### 11.01-set-the-scene#1 (predict)
The pipeline's log recorded 'failed' on each of the 14 mornings, and the old report stayed online. What was missing?
A. An alarm that reaches a person
B. More tests on the numbers in the report

### 11.02-checks-and-monitoring#1 (predict)
The volume check uses a tolerance of 0%, so any day below the average of the 7 days before it raises an alarm. In the 14-day series on the canvas, one batch is missing on 24 March. How many alarms does the check raise?
A. More than one, including normal days
B. One: only the day with the missing batch

### 11.02-checks-and-monitoring#2 (mcq)
Hatem's solar shop receives battery readings every day. The 7 days before today brought 288, 288, 284, 288, 290, 288 and 286 rows (average 287.4). On a dust-storm day, rows normally fall to about 250. Today the logger restarted halfway and only 144 rows arrived. Which tolerance raises an alarm today but not on a dust-storm day?
A. 0%, a line of 287 rows
B. 5%, a line of 273 rows
C. 25%, a line of 216 rows
D. 60%, a line of 115 rows

### 11.02-checks-and-monitoring#3 (mcq)
Rasha's bakery sends a sales file every day. Today it arrived at 06:00 as usual. It has 311 rows, and 300 to 320 is normal. The columns and types are the same as always. But the average sale is 1,850, while it is normally about 18.5, because the till began to send prices in cents. Which check catches it?
A. A freshness check on the arrival time
B. A volume check on the row count
C. A schema check on columns and types
D. A distribution check on the values

### 11.03-personal-data#1 (predict)
An attacker has a plain SHA-256 hash of each volunteer's phone number. Each number is a known prefix plus 7 unknown digits. Using the test rate of 10 million hashes in 11.3 seconds, how long does it take to try every number?
A. More than a day on a laptop
B. Under a minute on a laptop

### 11.03-personal-data#2 (mcq)
Khalil's clinic replaces each patient's 9-digit ID number with its plain SHA-256 hash and shares the file with a researcher. There is no secret key. On one laptop core, 10 million hashes take about 11.3 seconds. What does that arithmetic say about the file?
A. About 19 minutes to try every ID, so they can be recovered
B. About 19 days to try every ID, so sharing is reasonably safe
C. About 19 minutes, but a hash is one-way, so IDs stay hidden
D. About 11 seconds to try every ID, so a key adds little

### 11.03-personal-data#3 (mcq)
Doaa's delivery app keeps customer phone numbers for 30 days. A job deleted the lake partitions older than 30 days. But a driver's laptop still holds an export of the same period, and a backup disk holds a copy of the whole lake. What is the position after 30 days?
A. The rule is met, because the job reported every old partition as deleted
B. The rule is not met until the export and the backup copy are deleted too
C. The rule is met, because exports and backups are not part of the lake
D. The rule is met if the backup disk is locked away so nobody can read it

### 11.04-cost-governance-and-ci#1 (predict)
Hala renames the column price to price_ils in the staging model stg_price_reports and opens a pull request. The staging.yml file still has a not_null test on price. Is the CI run green or red?
A. Green: the model still builds and runs
B. Red: a test still names price

### 11.04-cost-governance-and-ci#2 (mcq)
Yahya's orders table has 20 columns, all about the same size, and 36 months of data (about 156 weeks) in one block. His dashboard query reads every column and sums two of them for the latest week. The warehouse charges by data scanned. He can make one change. Which change reads less?
A. Partition by order date, then filter to the latest week
B. Select only the 2 columns that the dashboard sums
C. Add LIMIT 10 so the query stops after 10 rows
D. Run the dashboard query at night, when fewer people are online

### 11.04-cost-governance-and-ci#3 (mcq)
Mais's team has CI that runs pytest and dbt build on a 10-day sample. A change divides every price by 100 by mistake. All checks stay green: the tests are unique keys, no empty prices and price above 0. The report now shows prices 100 times too low. What does this show?
A. CI is broken and a manual review should replace it
B. CI should run on all the production data instead
C. CI runs only the tests written, so add a price range test
D. The dbt build step is not needed in CI, since it already passed

### 11.06-quiz#1 (mcq)
Ibrahim's pharmacy chain sends a stock file every night. It arrives at 03:00 with the same columns as always. The last 7 nights brought 410, 405, 415, 400, 412, 408 and 409 rows (average 408.4). Tonight only 205 rows arrived, because one branch's till was off. His volume check uses a tolerance of 60%, so the alarm line is 163 rows. What do the facts support?
A. The check alarms, because 205 is below the average of 408
B. The check passes, because 205 is above the line of 163 rows
C. The check passes, because the file arrived on time at 03:00
D. The check alarms, because a short file means the schema changed

### 11.06-quiz#2 (mcq)
Hatem asks an AI tool how to share volunteer data safely. It answers: 'Replace each phone number with its SHA-256 hash. A hash cannot be reversed, so the data becomes anonymous and you can share it freely.' Each phone number is a known prefix plus 7 unknown digits. What is the mistake?
A. SHA-256 is outdated, so a hash such as MD5 would be safer
B. The answer is right, because a one-way hash cannot be run backwards
C. A hash is safe only if the key is stored in the same file as the data
D. Only 7 digits are unknown, so each hash can be found by trying them all

### 11.06-quiz#3 (mcq)
Hala's retention job deletes restricted partitions after 30 days. A colleague says quarantine can stay for a year, because it holds only bad rows. The quarantine files are full raw rows: they include volunteer_name and volunteer_phone, kept so that the rows can be fixed. What do the facts support?
A. Quarantine keeps the same period as restricted: it holds names and phones
B. Quarantine can stay a year, because bad rows are of no use to anyone
C. Quarantine can stay once the price is fixed, because fixed rows are clean
D. Quarantine should go at once, because bad rows can never be corrected

### 11.06-quiz#4 (mcq)
Mais compares two plans for the average price on a lake partitioned by upload_date, with 28 daily folders. Plan 1 shows: Projections: price; File Filters: upload_date = '2026-03-05'; Scanning Files: 1/28. Plan 2 shows: Projections: price; Filters: market_code = 'M05'; and no Scanning Files line. What do the facts support?
A. Plan 2 opens fewer files, because it filters on market_code
B. Plan 1 reads only the price column, but plan 2 reads every column
C. Plan 1 opens 1 of 28 files, as it filters on the partition column
D. Both plans open only one file, since both show a filter line

### 11.06-quiz#5 (mcq)
A pull request in Ibrahim's team changes the default keep_days of the retention job from 30 to 90. CI is green. The test of the default lands 16 days of data and expects that nothing is deleted. What do the facts support?
A. Nothing is wrong, because every test in CI passed
B. The test cannot tell 30 from 90: 16 days delete nothing either way
C. CI is broken, because a green run should fail on a changed default
D. The sample is too small, so CI needs all of the production data

### 12.01-set-the-scene#1 (predict)
Two interview guides, one from a practitioner and one from a staffing company, both call one round 'the gate'. Which round do you think it is?
A. The SQL round
B. The pipeline design round

### 12.02-the-sql-round#1 (predict)
Khalil asks his one-sentence question about the best-selling product per branch. What should a strong candidate do first?
A. Start writing the query, to save time
B. Ask about the grain, NULLs and ties

### 12.02-the-sql-round#2 (mcq)
In a practice round, Doaa counts appointments per doctor in one clinic: Amal 12, Basil 10, Chadi 10, Dana 9. Her query ranks doctors by this count, highest first, with rank(), and keeps rows where the rank is 2 or less. Which doctors does it return?
A. Amal and Basil only, because the filter keeps two rows
B. Amal only, because he is the only doctor with rank 1
C. All four doctors, because rank counts every doctor once
D. Amal, Basil and Chadi, as the tied pair share rank 2

### 12.03-the-modelling-round#1 (predict)
Ibrahim's fact table has one row per delivery stop. Rasha asks which customers ordered water but got no delivery. A stop that did not happen has no row. What should Ibrahim do first?
A. Go back to the grain and check it still fits
B. Add a column to the fact table that answers it

### 12.03-the-modelling-round#2 (mcq)
In a practice round, Ibrahim's fact table has one row per order line, and every line also carries the order total. Order 301 has three lines of 12.00, 8.50 and 9.50, and an order total of 30.00 on each line. A report sums the order total by day. What does the report show for order 301?
A. 30.00, because the order has only one total
B. 10.00, because the report averages the lines
C. 90.00, because the 30.00 repeats on 3 lines
D. 3.00, because the report counts the order lines

### 12.04-the-design-round-and-your-story#1 (predict)
Hatem reads his stock report once, at 08:00, and decides what to order. Each till exports one file at closing time. Which way of running the pipeline fits best?
A. Streaming, so every sale updates the report at once
B. A daily batch that finishes before 08:00

### 12.04-the-design-round-and-your-story#2 (mcq)
Ibrahim practises the numbers part of his story about a clinic booking pipeline. From his run on 28 days of data: 3,150 booking lines were uploaded, 99 were repeated sends, and 12 of the remaining rows were quarantined. Which sentence is the strongest to say?
A. 3,150 lines became 3,039 bookings, after 99 repeats and 12 bad rows
B. The pipeline handles a large amount of data very quickly and safely
C. It processed all 3,150 lines without any errors, so nothing was lost
D. It reached 100 percent accuracy on all of the bookings in the run

### 12.05-quiz#1 (mcq)
In a SQL round, Yahya is given three doctors (Amal, Basil, Chadi) and three appointments: Amal done, Amal cancelled, Basil done. Chadi has none. Her query left joins appointments to doctors on doctor_id, keeps only the rows where the appointment status is done, and counts rows per doctor name with count(*). What does it return?
A. Amal 1, Basil 1, Chadi 0, because a left join keeps every doctor
B. Amal 1 and Basil 1 only, because the filter removes Chadi's empty row
C. Amal 2, Basil 1, Chadi 1, because count(*) counts every row of the join
D. Amal 1, Basil 1, Chadi 1, because count(*) counts his empty row

### 12.05-quiz#2 (mcq)
Hatem's practice query lists doctors who have no appointments. It selects the doctors whose doctor_id is NOT IN the doctor_id column of appointments. The doctors are Amal (D1), Basil (D2) and Chadi (D3). The appointments table has three rows, with doctor_id D1, D2 and NULL, because one booking was saved without a doctor. What does it return?
A. Chadi, who is the only doctor with no appointments at all
B. Amal and Basil, who are the doctors with appointments
C. All three doctors, because a NULL in the list matches none of the doctors
D. No rows, because the NULL makes the test unknown for every doctor

### 12.05-quiz#3 (mcq)
Rasha models a pharmacy. The product dimension has one row per product, with a supplier name. In June, product P12 changes supplier from Supplier A to Supplier B. Reports for May must still show Supplier A, and reports for June must show Supplier B. The fact table has one row per sale. Which change to the dimension fits?
A. Overwrite the supplier name, so May sales then show Supplier B
B. Add a second row for P12 with valid dates, and join sales by date
C. Add a column for the previous supplier, which keeps only one past value
D. Delete the old row for P12, so no sale points at the old supplier

### 12.05-quiz#4 (mcq)
Khalil owns a bakery and wants sales by branch on a screen in the kitchen, updated within a minute. Each till sends a sale as it happens. There are 3 branches with about 400 sales a day each, and the team is one person. Which design does the stated need support?
A. A small job that runs every minute and reads the new sales
B. A nightly batch that rebuilds the whole screen after closing
C. A hosted streaming platform with a cluster to process every sale
D. An hourly micro-batch that refreshes the screen at the top of the hour

### 12.05-quiz#5 (mcq)
Mais's clinic pipeline gets bookings that arrive up to 2 days late, about 6 percent of them. She re-reads the last 3 days on every run, instead of only today. Which sentence best states the trade-off in her project story?
A. I chose a three-day lookback because it is simply the best way to handle late data
B. Late data is a hard problem, and every pipeline has to handle it somehow
C. A three-day lookback reads 3 days, not 1, to catch the 6 percent that arrive late
D. I used a lookback because it was taught in the course I followed

### 13.01-set-the-scene#1 (predict)
Hala wants a test that checks her fact table has the right number of rows. Her raw files hold 2,712 lines, but only 2,620 are accepted reports. Where should the test get the right number from?
A. The generator prints how many good records it made
B. The test counts the lines in the raw files by itself
