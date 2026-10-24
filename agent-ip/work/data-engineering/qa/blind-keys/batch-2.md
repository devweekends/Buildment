### 05.03-partitions-and-file-sizes#2 (mcq)
Osama runs a courier company with 25 depots. His lake keeps 365 days of parcel records, about 20,000 rows a day, partitioned by day and depot. The weekly report reads the last 7 days for all depots. How many files does it open, and what is the cost?
A. 7 files, because only the 7 days of the week are needed
B. 175 files, each holding about 800 rows, which is small
C. 365 files, because the report needs every depot's data
D. 9,125 files, because partitions only help with a filter on depot

### 05.03-partitions-and-file-sizes#3 (mcq)
Sana keeps school attendance for 12 classes. Her file holds 4,800 rows. She tests two codecs on it: Snappy gives 61,000 bytes and zstd gives 44,000 bytes. She did not time either read. A blog says 'zstd always reads fastest'. What do her facts support?
A. zstd gives the smaller file here, but her tests say nothing about speed
B. zstd is faster, because a smaller file always takes less time to read
C. Snappy is better, because it is the default and the default is chosen well
D. The two codecs are equal, because both files are small for a laptop

### 05.04-lakes-and-warehouses#1 (predict)
Mizan needs storage that is cheap and in open formats most, and safe updates least. Which design should come out ahead in the canvas?
A. A warehouse that owns the storage
B. A lake of files in folders

### 05.04-lakes-and-warehouses#2 (mcq)
Duaa freelances for an online shop. The shop's order files sit in one folder. Three jobs rewrite them every night, and a dashboard reads them at 06:00. Last week the dashboard showed Monday's orders from the new rule and Tuesday's from the old one. Which fix addresses the cause?
A. A faster laptop, so the jobs finish before 06:00
B. A table format, so a rewrite commits as one snapshot
C. Compressing the files with zstd to shorten the rewrite
D. More folders, one for each job, to keep the jobs apart

### 05.04-lakes-and-warehouses#3 (mcq)
Karim sets up storage for a clinic's reports. Facts: one person runs the pipeline on one laptop, the data is 40,000 rows, nobody else writes the files, and the budget is zero. He asks whether he needs a lakehouse. What do the facts support?
A. Yes, because a lakehouse is the modern design for all data
B. Yes, because Parquet files cannot be read without a table format
C. No, because a warehouse is needed first for any open files
D. No, because one writer and a small table do not need snapshots

### 05.06-quiz#1 (mcq)
Rana runs phone top-up kiosks in 4 towns. Her lake holds 365 days, about 2,000 rows a day. Her monthly report filters one town for 30 days. A power cut sometimes makes her nightly job run twice. From testing, she wants files of at least 1,000 rows. Which layout do the facts favour?
A. One folder per day and town: 1,460 files, so the report opens only 30 files
B. One file for the year, with each night's rows added at the end of that file
C. One folder per day: 365 files of 2,000 rows, replaced one folder each night
D. One folder per town: 4 files, so the report opens just the one for its town

### 05.06-quiz#2 (mcq)
Osama's courier file has four row groups. The footer lists the price range of each, in shekels: group 1 is 3 to 22, group 2 is 5 to 41, group 3 is 24 to 39 and group 4 is 4 to 18. His query filters on price > 30. How many row groups must the engine read?
A. Two, groups 2 and 3, because their largest prices are above 30
B. Four, because the prices in the file are not kept in sorted order
C. One, group 2, because it holds the highest price in the file, 41
D. Three, groups 1, 2 and 3, because each of them starts below 30

### 05.06-quiz#3 (mcq)
Karim's clinic app has a patient table with 30 columns of similar width and 2 million rows. A clerk types an id and the app shows the whole record. Each night a report adds up 2 columns for all rows. Which statement do the facts support?
A. A column layout suits both, because it always reads less data
B. A row layout suits both, because every query returns whole rows
C. Neither layout matters at 2 million rows, because engines are fast
D. A column layout suits the report; a row layout suits the lookup

### 05.06-quiz#4 (mcq)
Manar manages data for a youth centre. 8 staff run SQL on it. Each person needs a login, so trainers see attendance and only the manager sees phone numbers. The data is 300,000 rows, an overnight job changes some rows, and nobody has time to run extra services. Which design do the facts favour?
A. A lake of Parquet files in a shared folder, because files are cheap and open
B. A warehouse, because it gives each person a login and updates rows safely
C. A lakehouse, because it keeps open files and adds safe updates to them
D. CSV files in a shared folder, because every staff member can open them

### 05.06-quiz#5 (mcq)
Sana's school uploads attendance sheets each evening, and teachers sometimes upload up to 2 days late. The lake has one folder for each upload date. The head teacher asks how many pupils were absent on 12 May. Sana filters upload_date = 12 May and gets 31. A teacher counts 36. What explains the gap and fixes it?
A. The folder for 12 May is damaged, so rewrite it from the raw sheets
B. Partition skipping hides some rows, so switch it off for this query
C. Parquet drops some rows, so keep the attendance sheets as CSV files
D. Five sheets came in on 13 or 14 May, so filter by attendance date

### 06.01-set-the-scene#1 (predict)
Hala's script added the 137 lines of 12 March twice. Omar's report shows the average basket price for each market. After the second run, what happens to the average for M05?
A. It doubles, because there are twice as many rows
B. It stays the same, as the copies are exact

### 06.02-etl-elt-and-zones#1 (predict)
The restricted file has volunteer_name and volunteer_phone columns. Hala publishes a copy to the shared zone. What does the copy hold for the volunteer?
A. A keyed code, and no name or phone
B. The same name and phone, since the team is trusted

### 06.02-etl-elt-and-zones#2 (mcq)
A clinic's appointment list has the columns patient_name, patient_phone, doctor_id, slot_time and status. The clinic's analyst wants to chart appointments per doctor per hour. Which columns may go to the shared zone?
A. All five columns, because the analyst works for the clinic itself
B. Only slot_time, because every id counts as personal data too
C. Doctor, time and status, plus a keyed code; no name and no phone
D. All five columns, with the phone turned into a plain hash first

### 06.02-etl-elt-and-zones#3 (mcq)
Osama's courier company loaded its raw parcel files into storage first and transforms them with SQL. In April the rule for a 'late parcel' changed, and he must recompute last year's numbers. His facts: the raw files for 12 months are still stored, and the old results sit in a table. What do they support?
A. Ask the couriers to send last year's parcels again
B. Keep the old results and apply the new rule from April on
C. Transform before loading from now on, and drop the raw files
D. Run the SQL models again over the stored raw files

### 06.03-idempotent-jobs#1 (predict)
On 4 March the uploads hold 100 reports. A job that appends runs twice for that day, and so does a job that replaces the day's partition. How many rows does each table hold?
A. 200 rows and 200 rows
B. 200 rows and 100 rows

### 06.03-idempotent-jobs#2 (mcq)
Duaa's nightly job loads the day's orders for a shop. After a power cut she reruns it. Before the rerun the table for 9 May had 300 rows and an average order value of 21.50. Afterwards it has 600 rows and an average of 21.50. What do the facts show?
A. The job is fine, because the average order value did not change
B. The rerun appended the day again, so the job is not safe to rerun
C. The data is wrong at the source, because the average stayed the same
D. The job merged on a key, because every row appears with a copy

### 06.03-idempotent-jobs#3 (mcq)
Karim's pharmacy job writes stock levels to a folder named by the date it runs, using the computer's clock. On 14 June it fails halfway. He reruns it on 15 June to fix 14 June. What goes wrong, and what is the fix?
A. It writes to the 15 June folder; pass the date in as a parameter
B. It writes the 14 June rows twice; switch the job to append mode
C. It writes nothing; the clock stops a job from running after midnight
D. It overwrites 15 June by mistake; delete the folder before each run

### 06.04-incremental-loads-and-cdc#1 (predict)
On 22 March V11's row is deleted from the registry. The nightly extract reads rows whose updated_at is after the watermark. How many rows does the run on 23 March read?
A. 0 rows: a deleted row has no updated_at
B. 1 row: V11, flagged as deleted by the registry

### 06.04-incremental-loads-and-cdc#2 (mcq)
Sana's clinic app stamps updated_at on every insert and update of its appointments table. Her nightly extract uses a watermark. Last night four things happened. Which one will the next run miss?
A. A new booking for Thursday, added by the receptionist
B. A booking moved from 10:00 to 11:00 by the patient
C. A booking cancelled by setting its status to 'cancelled'
D. A booking removed from the table by a staff member

### 06.04-incremental-loads-and-cdc#3 (mcq)
Manar's job saves the new watermark first and then writes the extract file. One night the power fails after the watermark is saved and before the file is written. The next run asks for rows newer than the saved watermark. What happens?
A. The changes in that run are loaded twice, so a later step must remove copies
B. The job refuses to start, because the watermark and the files disagree
C. That run's changes are never loaded, as the watermark has passed them
D. Nothing is lost, because the next run starts again from the first watermark

### 06.06-quiz#1 (mcq)
Jamal's youth centre keeps its attendance files in a restricted folder. While debugging, his job prints each failed row in full to a log file. Those rows hold a child's name and a parent's phone number. The log folder can be read by every staff member. What do the facts support?
A. The log is safe, because it is a log and not a data file
B. The log holds personal data, so it needs the restricted rule
C. The log is safe, because only the failed rows are ever printed
D. The log is safe once the file is renamed to something plain

### 06.06-quiz#2 (mcq)
Manar's job loads the day's pharmacy orders and replaces the partition for the date it is given. Run for 3 May, it left 500 rows. Later that day the source file was corrected and now has 520 rows. She runs the job for 3 May again. What does the table hold?
A. 500 rows, because a rerun must never change the result
B. 1,020 rows, because the rerun adds to the 500 already there
C. 520 rows, because the output follows the corrected input
D. An error, because the folder for 3 May already exists

### 06.06-quiz#3 (mcq)
Sana's extract uses a watermark and asks for updated_at strictly later than the saved value, 2026-05-10 09:00. The source holds: R1 updated at 09:00, R2 updated at 09:05, R3 deleted at 09:10, and R4 edited by a script that leaves updated_at at 1 May. Which rows does the next run read?
A. R2 only, the one existing row with a later updated_at
B. R1 and R2, because the run also reads rows equal to the watermark
C. R2 and R3, because the run also reads rows that were deleted
D. R2 and R4, because the run reads every row that was edited

### 06.06-quiz#4 (mcq)
Rana keeps a table of 40 product prices for her bakery. She edits some rows by hand a few times a week and sometimes deletes a product. A job copies the table to the lake each night. Which design do the facts favour?
A. A watermark on updated_at, because only changed rows should move
B. Log-based capture, because every table needs a change log
C. A merge on the product id, because a merge never misses a change
D. A full copy each night: 40 rows are cheap, and deletes show

### 06.06-quiz#5 (mcq)
Duaa builds a statistics site and asks for the shared-zone files to publish on it. Those files hold volunteer_key, a code made from the phone number and a secret that the project keeps. Names and phones are dropped, and there are 12 volunteers. Can she publish them?
A. Yes, because the names are gone, so the data is anonymous
B. Yes, because the key is a hash, and hashes cannot be reversed
C. No: it is still data about people, and the key links reports
D. Yes, if she deletes only the volunteer_id column before publishing

### 07.01-set-the-scene#1 (predict)
The kitchens' page counts 6 full days for M02 in week 12, and the weekly report counts 5. Both read the same raw reports. What is the most likely reason?
A. A bad row stayed in, so an incomplete day looked complete
B. The first page lost one day of data while it was being copied

### 07.02-models-refs-and-layers#1 (predict)
stg_markets fails because its source files are missing. dim_market needs stg_markets. What does dbt build do with dim_market?
A. It builds dim_market from yesterday's table
B. It skips dim_market and does not build it

### 07.02-models-refs-and-layers#2 (mcq)
Layla's shop project has four models. stg_orders and stg_refunds read raw sources. daily_orders uses ref to read stg_orders. net_sales uses ref to read daily_orders and stg_refunds. In one dbt build, stg_orders fails. Which models does dbt skip?
A. daily_orders, net_sales and stg_refunds
B. daily_orders and net_sales, but not stg_refunds
C. Only daily_orders, because net_sales has a second parent
D. None, because dbt reuses yesterday's tables

### 07.02-models-refs-and-layers#3 (mcq)
Fares writes net_sales.sql with the line 'from main.daily_orders' instead of using ref. On day one the numbers are right. Three weeks later they are wrong, with no error. What is the most likely cause?
A. dbt refuses to build any file that names the schema main
B. ref adds a filter to the query, and without it extra rows are read
C. A hard-coded name is only a style choice and cannot change any number in a report
D. With no arrow, dbt may build net_sales first and read an old daily_orders

### 07.03-tests-contracts-and-docs#1 (predict)
In this example the fact table has three tests: report_id is unique, every market exists, and the price is above 0. It holds 10 duplicated report_ids, 4 rows with no market and 6 wrong prices that look normal. How many of these 20 bad rows do the tests point at?
A. 14, and the 6 wrong prices pass every test
B. All 20, because every bad row breaks a test

### 07.03-tests-contracts-and-docs#2 (mcq)
Aya's school table fct_attendance has three tests: attendance_id is unique, student_key is not null, and class_key exists in dim_class. A teacher records 48 pupils present in a class of 30. The class key is valid and the id is new. What does dbt build show?
A. All three pass, because the keys exist and the id is unique
B. relationships fails, because 48 is more than the class holds
C. unique fails, because two rows now describe the same class
D. not_null fails, because the number is too large to be stored

### 07.03-tests-contracts-and-docs#3 (mcq)
Nabil's clinic model dim_doctor promises visit_minutes as an integer. A change turns the column into text. He wants the build to stop before any report reads the table. Which tool does that?
A. A not_null test on visit_minutes, because text is never empty
B. The docs site, because it lists every column and its type
C. An enforced model contract, because it compares types at build time
D. A unique test on visit_minutes, because text repeats more often

### 07.04-snapshots-and-incremental-models#1 (predict)
M03 is Harbour at the 11 March run. It changes to Hill on 12 March and to Old Town on 13 March. The next run is on 14 March. How many history rows does the snapshot hold for M03 after that run?
A. Three rows: Harbour, Hill and Old Town, one for each
B. Two rows: Hill is lost between the two runs

### 07.04-snapshots-and-incremental-models#2 (mcq)
Fares's clinic has an incremental model fct_bookings with no unique_key. It reads the last 2 days of bookings. The first run loads 500 rows, and the last 2 days hold 40 of them. No new bookings arrive. How many rows are in fct_bookings after a second run?
A. 500, because dbt remembers which rows it already loaded
B. 460, because the old window is deleted and not replaced
C. 540, because the 40 bookings in the window are added again
D. 1,000, because dbt rebuilds the table and appends all of it

### 07.04-snapshots-and-incremental-models#3 (mcq)
Ola's gym snapshots its trainer table every Sunday. A trainer's studio changes from A to B on Monday, and from B to C on Wednesday. How many history rows hold this trainer's studio after the next Sunday run?
A. Three rows: studio A, studio B and studio C
B. Two rows: A and C, and studio B is never recorded
C. One row: only studio C, because a snapshot keeps the latest
D. Two rows: B and C, because the oldest version is dropped

### 07.06-quiz#1 (mcq)
Mustafa's pharmacy project has stg_stock and stg_sales, which read sources. dim_drug uses ref to read stg_stock. fct_sales uses ref to read stg_sales and dim_drug. mart_weekly uses ref to read fct_sales. The nightly dbt build shows: stg_stock OK, stg_sales OK, dim_drug ERROR, fct_sales SKIP, mart_weekly SKIP. Where should he start?
A. With dim_drug, because the two skipped models only wait for it
B. With fct_sales, because it is the first model that was skipped
C. With stg_sales, because fct_sales reads it and was skipped
D. With mart_weekly, because the readers see that model first

### 07.06-quiz#2 (mcq)
Layla's table fct_orders has three tests: order_id is unique, customer_key is not null, and every customer_key exists in dim_customer. dim_customer holds c1, c2 and c3. The table holds these rows: (o1, c1, 40.00), (o2, c9, 25.00), (o3, c2, 250.00) and (o3, c2, 250.00). The amount 250.00 should have been 25.00. What does dbt build report?
A. Only relationships fails, because c9 is not in dim_customer
B. All three fail, and the amount 250.00 is flagged as well
C. unique and relationships fail; no test flags the amount 250.00
D. unique and not_null fail, because o3 repeats the same customer, c2

### 07.06-quiz#3 (mcq)
Shahd asks an AI tool whether she can publish the weekly report. She tells it: 'dbt build shows PASS=39 WARN=0 ERROR=0.' The tool answers: 'Then every number in the report is correct and you can publish.' She knows the tests are unique, not_null and relationships on keys, and a price above 0 check. She also knows that one flour price was typed as 80 instead of 8. What is wrong with the answer?
A. Nothing is wrong, because a build with no errors means correct data
B. dbt tests compare each price with last week's price, and the tool skipped that
C. PASS=39 counts only the models, so none of the tests were part of it
D. Tests only show that the written rules held, not that the price is right

### 07.06-quiz#4 (mcq)
Nabil's shop has an incremental model fct_sales with unique_key sale_id and the delete+insert strategy. Each run reads only sales from the last 2 days. Today the source corrects the price of a sale that is 5 days old. What happens to that row in fct_sales on the next run?
A. It is updated, because the unique_key finds the row wherever it sits in the table
B. It is not read, so the old price stays until a backfill or full refresh
C. It is added as a second row that holds the new price
D. The build stops with an error, because an old row has changed

### 07.06-quiz#5 (mcq)
Layla's reports use a list of 6 product categories. The list has 6 lines, changes about once a year, holds no personal data, and two models need it. Where should the list live in dbt?
A. As a snapshot, because a list can change over time
B. Copied into each model, so every model stands alone
C. As a seed: a small CSV file that dbt loads as a table
D. As an incremental model, because a list only gets longer

### 08.01-set-the-scene#1 (predict)
The 12 March upload holds 37 lines from M05, dated 9 to 11 March. Hala's first pipeline reads only reports dated on the newest day, 12 March. How many of M05's late reports reach the fact table?
A. None, since none is dated 12 March
B. All of them, because they come in a new upload

### 08.02-event-time-and-late-data#1 (predict)
In the seed-7 data, 211 reports are late: 76 by 1 day, 69 by 2 days and 66 by 3 days. About how many of the 211 does a lookback of 1 day catch?
A. About two thirds, because most late reports are only a day late
B. About a third, because the delay is spread over 1 to 3 days

### 08.02-event-time-and-late-data#2 (mcq)
Majd's school exports attendance rows each night. Counting from the class day to the day a row first arrives, the school has 1,000 rows: 880 arrive after 0 days, 90 after 1 day, 25 after 2 days and 5 after 3 days. Each run re-reads the last N days. Which lookback misses no row while reading the fewest days?
A. 0 days: reads 1 day per run and misses 120 rows
B. 1 day: reads 2 days per run and misses 30 rows
C. 2 days: reads 3 days per run and misses 5 rows
D. 3 days: reads 4 days per run and misses no row

### 08.02-event-time-and-late-data#3 (mcq)
Fares's clinic table has visit_date (the day the patient came) and entered_at (when the desk typed the visit). The model reads rows with visit_date on or after the newest visit_date minus 1 day. On Thursday, the desk types a visit from Monday. What happens on Thursday's run?
A. The visit is missed, because the window starts on Wednesday
B. The visit is read, because entered_at is Thursday, the newest day
C. The visit is read, because a unique_key finds it wherever it is
D. The visit is missed only when the clinic is closed on Thursday

### 08.03-duplicates-and-keys#1 (predict)
Hala runs SELECT DISTINCT * on the 2,699 good lines. Each of the 79 resends is a copy of an earlier line. How many lines does DISTINCT remove?
A. None, because each resend has its own sent time
B. All 79, because a resend repeats every other value

### 08.03-duplicates-and-keys#2 (mcq)
Layla's client sells soap online. Her payment tool sometimes sends an order twice, with the same order_id and a different sent time. Customers also sometimes place a second order for the same product on the same day, and each order gets its own order_id. Which key removes the duplicates and keeps the real orders?
A. Customer, product and day, because a resend falls on the same day
B. order_id, because each order has one and a resend keeps it
C. Every column, because two identical orders are duplicates
D. Sent time, because the newest send is the real one

### 08.03-duplicates-and-keys#3 (mcq)
Mustafa's pharmacy removes duplicate deliveries by comparing every column except sent_time. On 15 March the form adds a pack_size field. A delivery first sent on 14 March has no pack_size. On 16 March the phone sends it again, and the copy has pack_size = 10. What happens to the resend?
A. It is removed, because delivery_id is the same in both of the copies
B. It is removed, because sent_time is ignored when the rows are compared
C. It stays as a second row, because pack_size differs in the copies
D. It replaces the first send, because the newer copy always wins

### 08.04-backfills-and-schema-evolution#1 (predict)
Batch A adds the optional field unit. Batch B has lost the required field price. What does the contract check do?
A. Both are stopped, because both differ from the old batches
B. A is accepted, B is stopped: price is required

### 08.04-backfills-and-schema-evolution#2 (mcq)
Aya's school contract requires student_code, class_code and day. It says that extra fields are allowed and kept. Three batches arrive. Batch A adds a field called note. Batch B has no class_code. Batch C adds late_minutes and keeps every required field. Which batches are stopped?
A. Only B, because its required field class_code is missing
B. A, B and C, because every batch differs from the contract
C. A and C, because new fields are not in the contract
D. None, because a contract checks only the first batch

### 08.04-backfills-and-schema-evolution#3 (mcq)
Nabil's shop fact table holds 1,200 rows. The table is built by replacing rows by order_id. The last 3 days hold 180 of those rows. By mistake, he runs a backfill of those 3 days twice, and no new orders arrive. What does the table hold after both runs?
A. 1,560 rows, because the 180 rows are added again on each run
B. 1,200 rows, but the totals are added twice and are doubled
C. An error, because the second run finds the rows already in the table
D. 1,200 rows, same totals, because each run replaces the same rows

### 08.06-quiz#1 (mcq)
Ola's gym loads check-ins every night. Of 700 check-ins, 640 arrive on the day, 40 arrive 1 day late, 15 arrive 2 days late and 5 arrive 3 days late. Each run re-reads the last N days. The gym wants a lookback that catches at least 95 percent of the 60 late check-ins and reads as few days as it can. Which N fits?
A. 1 day, which catches 40 of the 60 late check-ins
B. 3 days, which catches all 60 late check-ins
C. 2 days, which catches 55 of the 60, about 92 percent
D. 0 days, which catches the 640 on-time check-ins

### 08.06-quiz#2 (mcq)
Shahd's water delivery round sends these lines. Each line is delivery_id, house, litres, sent time: (w-1, H4, 200, 07:00), (w-1, H4, 200, 07:40), (w-2, H4, 200, 15:00), (w-3, H9, 100, 07:05). The w-1 line was sent twice by the phone. H4 really had two deliveries that day. The right total is 500 litres. Which key to remove duplicates gives 500?
A. The whole row, because two identical lines are duplicates
B. House and day, because each house gets one delivery a day
C. Sent time, because each delivery is sent at its own time
D. delivery_id, which stays the same when a line is sent twice

### 08.06-quiz#3 (mcq)
Mustafa appends each day's file to his fact table. He fixes a bug in the source and wants to reload 3, 4 and 5 March, which are already in the table. An AI tool says: 'Go ahead and rerun those days. Appending is fine here, because each day is loaded only once.' What is wrong with the answer?
A. Nothing is wrong, because a rerun loads each day one time
B. Appending fails when a day already exists, so the rerun stops
C. The three days are added again, so their totals are doubled
D. Appending is only a problem when the files get a new field

### 08.06-quiz#4 (mcq)
Fares's contract requires booking_id, patient_code and visit_date, allows extra fields, and has one row rule: visit_date must not be empty. Three batches arrive. Batch A has all the required fields and an extra field called notes. Batch B has all the required fields, and one row has an empty visit_date. Batch C has no booking_id. What happens?
A. A lands; B lands, the bad row quarantined; C is stopped
B. A and B are stopped because they differ from the contract
C. All three land, and the row with the empty date is dropped
D. A lands, and B is stopped because one bad row spoils it
