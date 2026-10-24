### 01.01-set-the-scene#1 (predict)
Omar's line for M02 rose from 135.65 to 203.50 shekels in one week. With no other information, which explanation is more likely?
A. A fault in the data steps
B. A real price rise at one market

### 01.02-what-a-data-engineer-does#1 (predict)
The query behind Omar's report is correct, and its checks pass. Does that mean 203.50 is the right number?
A. Yes, a correct query gives a right answer
B. No, the rows under it may be wrong

### 01.02-what-a-data-engineer-does#2 (mcq)
Nadia manages a clinic. Her monthly report says 1,200 appointments. The booking app's own count says 600. The report equals the table behind it at 1,200, and the pipeline stored 1,200 rows. Nobody has counted the app's export file. What is the best next check?
A. Divide the report total by 2, since the app says 600
B. Rewrite the report query, since the report is the last stage
C. Count the rows in the export file the app gave the pipeline
D. Ask the clinic to recount every appointment by hand

### 01.03-the-map-of-a-pipeline#1 (predict)
Hala runs the job every 6 hours and a run takes 30 minutes. At worst, how old can the data in Yasmin's table be?
A. Up to 6.5 hours: the gap plus the run
B. Up to 6 hours: the time between the runs

### 01.03-the-map-of-a-pipeline#2 (mcq)
Bilal runs a bakery and wants daily sales numbers. His sales sheet is copied into a report every 12 hours, and the copy takes 45 minutes. The shop owner says the numbers must never be more than 12 hours old. Which statement matches the facts?
A. The report misses the need, as its worst case is 12.75 hours
B. The report meets the need, because the gap is exactly 12 hours
C. The report meets the need, because a copy of 45 minutes is short
D. The report misses the need, because copies should run every hour

### 02.01-set-the-scene#1 (predict)
M02 sent 12 report lines on 4 March. The contacts file has 2 rows for M02. Hala joins the reports to the contacts on the market code. How many rows does the joined result have for M02?
A. 12 rows, one for each report
B. 24 rows, each report twice

### 02.02-joins-and-row-counts#1 (predict)
M02 has 3 price reports on 3 March. The contacts table has 2 rows for M02. How many rows does the inner join on the market code return for M02?
A. 6 rows: each report twice
B. 3 rows: one for each report

### 02.02-joins-and-row-counts#2 (mcq)
Tareq's online shop has 50 orders. The delivery zones table has 3 rows for zone N and 1 row for zone S. 20 orders are in zone N and 30 are in zone S. He joins orders to zones on the zone code with an inner join. How many rows does the result have?
A. 50 rows, as each order matches once
B. 60 rows, because only zone N repeats
C. 150 rows, because 50 orders x 3 rows
D. 90 rows, because 20 x 3 plus 30 x 1

### 02.02-joins-and-row-counts#3 (mcq)
Nadia lists every school class with its Monday absences. There are 10 classes. Her query is 'classes LEFT JOIN absences ON class_id WHERE absences.day = Monday', and it returns 7 rows. Three classes had no absences on Monday. What explains the 7 rows, and what is the fix?
A. The left join is wrong; use an inner join so classes without absences stay
B. The WHERE removes the classes with no Monday row; move the day test into ON
C. The classes table has duplicates; add DISTINCT to the select list
D. Three classes are missing from absences; add them to that table first

### 02.03-aggregation-traps#1 (predict)
A bakery's flour log has 20 reports. 15 say 8.00 shekels and 5 have no price. The missing prices are turned into 0 before averaging. What is the average?
A. 8.00: missing prices are skipped
B. 6.00: the zeros count as prices

### 02.03-aggregation-traps#2 (mcq)
Asma's pharmacy table has 8 rows of stock. The quantity column is 10 in 6 rows and NULL in 2 rows. Which result do the facts support for AVG(quantity) and COUNT(quantity)?
A. AVG is 10 and COUNT is 6, because NULL rows are skipped
B. AVG is 7.5 and COUNT is 8, because every row is counted
C. AVG is 10 and COUNT is 8, because AVG skips but COUNT does not
D. AVG is 7.5 and COUNT is 6, because NULL counts as zero in AVG

### 02.03-aggregation-traps#3 (mcq)
Reem runs a water delivery round. The log has 120 lines. 20 deliveries were logged twice with the same delivery id, and the other 80 once, so there are 100 distinct delivery ids. The owner asks how many deliveries were made. Which query answers that?
A. COUNT(*) over the log lines, which gives 120
B. COUNT(*) minus 40 lines, which gives 80
C. COUNT(DISTINCT delivery_id), which gives 100
D. COUNT of the 20 repeated ids only, which gives 20

### 02.04-ctes-and-readable-queries#1 (predict)
Ten price reports go in. Two rows are bad, and two rows are eggs, which are outside the basket. How many rows reach the last step, the sum per market and day?
A. 6 rows: bad rows and eggs gone
B. 8 rows: only the bad rows are gone

### 02.04-ctes-and-readable-queries#2 (mcq)
Reem's query has four named steps. Step 2 cleans the reports and takes 3 minutes. Steps 3 and 4 take seconds. She will run three more queries today, and each one needs the cleaned rows from step 2. What should she do?
A. Keep one long query and rerun all four steps for each question
B. Write step 2 as a subquery inside each of the three queries
C. Remove step 2 and let each query read the raw table
D. Save step 2 once as a temporary table, then read it

### 02.06-quiz#1 (mcq)
Bilal's bakery has 300 sales rows for today. The price list has one row for each product code. 3 of the sales have a product code that is not in the price list. He needs one table with all 300 sales, showing a price where one exists. Which join does that?
A. An inner join of sales and the price list, which returns 297 rows
B. A left join from sales to the price list, which returns 300 rows
C. A left join from the price list to sales, which returns every product
D. An inner join, then adding the 3 missing sales by hand afterwards

### 02.06-quiz#2 (mcq)
Asma's school collects fees. A class has 40 students who each paid 100 shekels, so the fee book says 4,000. The parents table has 2 rows for 10 students and 1 row for 30 students. Her report joins students to parents and adds up the fees, and it shows 5,000. Which cause and fix do the facts support?
A. Fees were entered twice, so delete the older half of the fee rows
B. The join type is wrong, so change the inner join to a left join
C. Students are counted twice, so use COUNT(DISTINCT student_id)
D. 10 students are repeated, which adds 1,000; add up fees first

### 02.06-quiz#3 (mcq)
Reem keeps a pharmacy table named doses with 5 rows. The values are 2, 4, NULL, 6 and NULL. She runs COUNT(*), COUNT(doses), AVG(doses) and SUM(doses). Which results do the facts support?
A. 5, 3, 4 and 12
B. 5, 5, 2.4 and 12
C. 3, 3, 4 and 12
D. 5, 3, 2.4 and 12

### 02.06-quiz#4 (mcq)
Tareq's online shop has three orders: A101 for 20 shekels from customer 7, A102 for 20 from customer 8, and A103 for 35 from customer 9. Customer 7 has two addresses. After joining orders to addresses, the total shows 95 and the true total is 75. An AI assistant answers: 'Use SUM(DISTINCT amount) and the total will be right.' What does that query return?
A. 75, because DISTINCT removes the repeated row of order A101
B. 95, because DISTINCT has no effect on a sum after a join
C. 55, because equal amounts such as A102's 20 are dropped too
D. 55, which is right, because A102 repeats order A101

### 02.06-quiz#5 (mcq)
Nadia's canteen query has three named steps. The row counts are: raw 200, good 200, snacks 150 and day_total 10. The raw table has 5 rows with a price of 0, and good is meant to remove rows with a price of 0 or below. 50 rows are not snacks, and 10 is the expected number of shop-days. Which step should she check first?
A. snacks, because it drops 50 rows from the table
B. good, because the 5 zero prices are still there
C. day_total, because it ends with only 10 rows left
D. raw, because it should have fewer than 200 rows

### 03.01-set-the-scene#1 (predict)
Report r-000020 was uploaded at 09:56 and again at 12:39, with the same report_id and the same price. Which copy should Hala keep?
A. The copy uploaded last
B. The copy uploaded first

### 03.02-ranking-and-deduplication#1 (predict)
On 8 March, markets M04 and M07 both reported flour at 7.5 shekels, the cheapest price. You rank the eight markets by price with RANK() and keep the rows where the rank is 1. How many rows do you keep?
A. Two rows, M04 and M07
B. One row, the first market

### 03.02-ranking-and-deduplication#2 (mcq)
Iyad freelances for an online soap shop. Its export keeps one line for every edit of an order: o-31 paid at 09:10, o-31 packed at 11:40, o-31 shipped at 15:05, and o-32 paid at 10:20. He wants one line per order with its latest status, so o-31 shipped and o-32 paid. Which window gives that?
A. ROW_NUMBER() by order, newest edit first, keep number 1
B. ROW_NUMBER() over the whole table, newest first, keep number 1
C. ROW_NUMBER() by order, oldest edit first, keep number 1
D. ROW_NUMBER() by status, newest edit first, keep number 1

### 03.02-ranking-and-deduplication#3 (mcq)
Ruba's bakery sold this many loaves: Sun 150, Mon 150, Tue 150, Wed 140, Thu 140, Fri 130. She wants every day in the top two sales levels, where days with equal sales share one level. Which filter keeps the 5 days from Sunday to Thursday?
A. RANK() highest first, keep rank 2 or better
B. ROW_NUMBER() highest first, keep number 2 or better
C. DENSE_RANK() highest first, keep rank 2 or better
D. Sort highest first and use LIMIT 2

### 03.03-running-totals-and-frames#1 (predict)
Egg prices in M03 rise by 0.5 shekels every day for seven days. Which moving average is closer to the price on day 7: the average of the last 3 rows or the average of the last 7 rows?
A. The 7-row average
B. The 3-row average

### 03.03-running-totals-and-frames#2 (mcq)
Tamer logs the battery charge (percent) of a shop's solar system: Mon 80, Tue 70, Thu 60, Fri 90. There is no reading on Wednesday. He computes charge minus LAG(charge) OVER (ORDER BY day). What does the Thursday row show?
A. NULL, because there is no Wednesday row
B. -20, because LAG uses the Monday row
C. -30, because LAG uses the Friday row
D. -10, because LAG uses the Tuesday row

### 03.03-running-totals-and-frames#3 (mcq)
Sara has daily sales for two shops, sorted by shop and then day. Shop A: 10, 20, 30. Shop B: 100, 110, 120. Her window has ORDER BY shop, day and ROWS BETWEEN 2 PRECEDING AND CURRENT ROW, with no PARTITION BY. What is the 3-row average on shop B's first day?
A. 100, because shop B starts a new window
B. 50, because the frame includes two rows of shop A
C. 65, because the frame holds only two rows
D. 110, because the frame covers all three days of shop B

### 03.04-query-plans-and-indexes#1 (predict)
A table has 200,000 rows, so a full scan reads 2,000 pages. Under the toy rule, an index costs 17.6 pages plus 3 pages for each matching row. A query picks 12.5 percent of the rows, one market in eight. Which plan reads fewer pages?
A. The index plan
B. The full scan

### 03.04-query-plans-and-indexes#2 (mcq)
Mazen keeps a clinic's appointments in SQLite: 120,000 rows and one index on (patient_id, visit_date). Which query can use that index for a SEARCH?
A. Rows in March, for any patient at the clinic
B. Rows for patient P-204, in any month of the year
C. Rows for doctor D-7, in any month of the year
D. All the rows, listed by clinic room, for every month

### 03.04-query-plans-and-indexes#3 (mcq)
Lama's table has 400,000 rows. The toy rule from this chapter says an index reads log2(rows), about 18.6 pages, plus 3 pages per matching row, and a full scan reads rows divided by 100 pages. Her query matches 2 percent of the rows. Which plan is cheaper?
A. The full scan, 4,000 pages against about 24,019 with the index
B. The index, about 24,019 pages against 40,000 pages for the scan
C. The index, because 2 percent of the rows is a small share
D. Neither, because both plans read 4,000 pages here

### 03.06-quiz#1 (mcq)
Anas runs the stock sheet of a pharmacy with 6 shelves. It has 4 lines (item, counted at, boxes): paracetamol 08:00 40; paracetamol 16:00 32; ibuprofen 08:00 25; ibuprofen 08:00 25, the same count typed twice. He keeps the rows where RANK() OVER (PARTITION BY item ORDER BY counted_at DESC) = 1. Which result do the facts support?
A. 2 rows, one for each item, because RANK works like ROW_NUMBER
B. 4 rows, because RANK removes nothing from the sheet
C. 3 rows, because the two ibuprofen lines tie at rank 1
D. 1 row, because only the latest line of all gets rank 1

### 03.06-quiz#2 (mcq)
Lama's table has 50,000 order edit lines. Every order was edited 2 to 4 times, and each edit has its own status and edited_at. She asks an AI tool how to keep only the latest edit of each order. It answers: 'Run SELECT DISTINCT order_id, status, edited_at FROM edits. DISTINCT removes the old edits, so the latest line stays for each order.' What will the query return?
A. All 50,000 lines, because every edit differs in status or edited_at
B. One line per order, chosen by DISTINCT as the latest edit
C. One line per order, but only if the table is sorted by edited_at first
D. An error, because DISTINCT cannot compare three columns at once

### 03.06-quiz#3 (mcq)
Hiba's school keeps attendance in SQLite: 80,000 rows and one index on (class_id, student_id). The screen for one student runs WHERE student_id = 4412, and the plan says SCAN attendance. The screen does not know the student's class. What do the facts support?
A. SCAN is fine: reading all 80,000 rows is the fastest way to find one student
B. Drop the index on (class_id, student_id), because it slows this query
C. Run EXPLAIN ANALYZE, which builds the missing index while it runs
D. Create an index that starts with student_id, then read the plan again

### 03.06-quiz#4 (mcq)
Tamer's solar shop has daily output readings (kWh): Mon 12, Tue 18, Thu 15, Fri 13. There is no reading on Wednesday. He changes his frame from ROWS BETWEEN 2 PRECEDING AND CURRENT ROW to RANGE BETWEEN INTERVAL 2 DAYS PRECEDING AND CURRENT ROW, ordered by day. What is the average on Friday with the RANGE frame?
A. 15.33, because RANGE still takes the last three rows
B. 14.0, because the frame reaches Wednesday, which has no row
C. 9.33, because the missing Wednesday counts as a reading of 0
D. 13.0, because the frame holds only the Friday row and nothing else

### 03.06-quiz#5 (mcq)
A table has 500,000 rows. The toy rule of chapter 3.4 says a full scan reads rows / 100 pages, and an index reads log2(rows), about 19 pages, plus 3 pages for each matching row. For exactly one of these four queries, the full scan reads fewer pages than the index. Which one?
A. A query that matches 100 rows
B. A query that matches 1,000 rows
C. A query that matches 1,700 rows
D. A query that matches 1,600 rows

### 04.01-set-the-scene#1 (predict)
M03 moved from Harbour to Hill on 12 March. Hala joins every report to today's registry table. Which area does a report of M03 made on 5 March get?
A. Hill, the area today
B. Harbour, the area that day

### 04.02-oltp-and-olap#1 (predict)
At the start the normalised app schema leads, 19 points to 16. You raise the weight of 'Simple report queries' to Very important and leave the other weights as they are. Which design leads now?
A. The normalised app schema
B. The star schema

### 04.02-oltp-and-olap#2 (mcq)
Anas keeps a school's attendance. Teachers record attendance one student at a time, about 300 times a day. The head teacher reads one report each term, adding up 90,000 rows by class. A student can change class mid-term, and the head wants each day counted in the class the student had that day. Which design do the facts support?
A. Normalised tables only, since one report a term is not worth a second design
B. A star schema only, with teachers typing each record straight into its fact table
C. One wide table for both jobs, since it has no joins to check or to get wrong
D. Normalised tables to record, and a star schema built from them for the report

### 04.02-oltp-and-olap#3 (mcq)
Ruba's pharmacy sheet repeats the supplier's phone number on each of its 5,000 stock lines. A supplier changes number. Ruba wants all 5,000 lines to show the new number, and she updates 4,800 of them before the power goes off. What do the facts show?
A. The sheet holds two numbers for one supplier, and a report cannot tell which is right
B. Nothing is wrong, because the 200 old lines record what was true in the past
C. The fix is an index on the phone column, so the old lines are found quickly
D. Only the 4,800 changed lines are at risk, because the other lines did not change at all

### 04.03-grain-facts-and-dimensions#1 (predict)
The daily table says that flour, rice and oil together cost 33.0 shekels in M02 on 4 March. Can you read the price of flour on that day from this table?
A. No, many sets of prices give 33.0
B. Yes, subtract the other two items

### 04.03-grain-facts-and-dimensions#2 (mcq)
Hiba's water delivery round keeps these columns: delivery_id, household_id, delivered_at, litres and day_total_litres, which is that household's total for the day. A household got 3 deliveries of 60 litres on 5 March, so day_total_litres is 180 on each of its 3 rows. What is wrong with the table?
A. Nothing is wrong: the sum of day_total_litres for that day is 180
B. The deliveries should be dropped, because 60 litres is too small to keep
C. The table mixes two grains, so the sum for that day is 540 and not 180
D. The household column needs its own dimension before any sum can be right

### 04.03-grain-facts-and-dimensions#3 (mcq)
Mazen's solar shop records the battery charge every 15 minutes. The owner asks for the daily average now. Later he may ask for the lowest reading of each day, or for the hour with the biggest drop. Which grain should the fact table have?
A. One row for each day, holding the average charge of that day
B. One row for each reading, which means one row every 15 minutes
C. One row for each hour, holding the average charge of that hour
D. One row for each week, because the owner reads one report a week

### 04.04-slowly-changing-dimensions#1 (predict)
M03 moves from Harbour to Hill on 12 March. Four flour reports were made on 10, 11, 12 and 13 March. The dimension uses type 1, which overwrites the area. How many of the four reports are counted in Harbour?
A. Two, the ones made before the move
B. None of the four

### 04.04-slowly-changing-dimensions#2 (mcq)
Lama's bakery chain keeps shops in a dimension. In March two things happen. A typo is found: shop 7 was entered as 'Hayy Alzahra' but its sign says 'Hayy Al Zahra'. And shop 4 moves from the north district to the south district. The owner wants district sales by month to show where each sale really happened. Which handling fits?
A. Overwrite the typo, and add a new row for shop 4's district
B. Add a new row for the typo, and overwrite shop 4's district
C. Overwrite both, because the owner only reads the current names
D. Add a new row for both, because every change must be kept

### 04.04-slowly-changing-dimensions#3 (mcq)
A market dimension has two rows for M03. Key 3: Harbour, valid_from 2026-03-01, valid_to 2026-03-12. Key 4: Hill, valid_from 2026-03-12, valid_to empty. The valid_to date is not part of the range. A report is dated 2026-03-12. Which key does it get?
A. Key 3, because 12 March is the last day of the Harbour version
B. Both keys, so the report appears twice in the fact table
C. No key, because 12 March falls in a gap between the versions
D. Key 4, because the end date of key 3 is not part of its range

### 04.06-quiz#1 (mcq)
Sara designs a fact table with the grain sentence 'one row is one appointment' for a clinic. The table has 12,400 rows, but only 12,100 distinct appointment_id values. What do the facts show?
A. The grain is fine, because 12,400 is simply the true number of appointments
B. The sentence is false: 300 appointments appear twice and are counted twice
C. A date dimension is missing, and it would hold the extra 300 rows
D. The table has a coarser grain than the sentence, so some detail was lost

### 04.06-quiz#2 (mcq)
Mazen's fact table has 1,000 sales rows for shop S4, adding up to 50,000 shekels. The shop dimension has 3 rows for S4, one for each version of the shop. He joins the sales to the dimension on shop_code only and sums the amount for S4. What does the sum return?
A. 50,000, because each sale still has one amount
B. 16,667, because the total is shared between the 3 versions
C. 100,000, because each sale matches two of the older versions
D. 150,000, because each sale matches all 3 versions

### 04.06-quiz#3 (mcq)
Tamer's pharmacy app records about 1,200 stock changes a day, typed one at a time by cashiers. Once a month the owner runs a report that adds up a year of stock lines. It runs on the live tables, takes minutes, and the cashiers' screens freeze while it runs. What fits these facts?
A. Copy the data into report tables on a schedule, and run the report there
B. Add the report's columns to the app tables, so that the report needs no joins
C. Run the monthly report every hour, so that each run adds up a smaller part
D. Ask the cashiers to stop typing for the minutes while the report runs

### 04.06-quiz#4 (mcq)
Iyad keeps a customer dimension for an online shop. (a) The delivery district changes when a customer moves, and the owner wants sales by the district where each order was shipped. (b) One customer's name had a typing mistake. (c) The preferred language changes, and the owner only ever mails customers in their current language. Which mapping fits?
A. (a) type 1, (b) type 2, (c) type 1
B. (a) type 2, (b) type 2, (c) type 2
C. (a) type 2, (b) type 1, (c) type 1
D. (a) type 1, (b) type 1, (c) type 1

### 04.06-quiz#5 (mcq)
Mazen's water round has a route dimension for household H9. Key 1: route R1, valid_from 2026-01-01, valid_to 2026-02-09. Key 2: route R2, valid_from 2026-02-09, valid_to empty. The valid_to date is not part of the range. H9 had deliveries on 3 February, 9 February and 10 February, and each is joined to the version valid on its date. How many deliveries does each route get?
A. R1 gets 2 and R2 gets 1, because the end date counts for R1
B. R1 gets 0 and R2 gets 3, because only the household's current route is used
C. R1 gets 3 and R2 gets 3, because each delivery matches both rows
D. R1 gets 1 and R2 gets 2, because the end date is not part of R1's range

### 05.01-set-the-scene#1 (predict)
The partner folder is only 254 kilobytes in total. Hala runs the same query on the folder and on one file that holds the same 1,000 lines. Which one is slower, and why?
A. The folder: it opens 1,000 files
B. Neither: both hold the same 254 kilobytes

### 05.02-rows-columns-and-parquet#1 (predict)
A table has 10 columns of the same width, and a query uses 3 of them. A row layout reads whole rows. About how much of the table does a column layout have to read?
A. About all of it, because the rows are the same
B. About 3 tenths of it

### 05.02-rows-columns-and-parquet#2 (mcq)
Manar runs a water delivery round for a village. Her delivery table has 20 columns of equal width and 5 million rows. The weekly report reads 4 of the columns. In the equal-width toy rule from the canvas, what can a column layout skip?
A. About 20 percent, because the report reads 4 of 20 columns
B. None at all, because a file must be read whole to find its footer
C. About 80 percent, because 16 of the 20 columns go unread
D. It depends on the rows, so 5 million rows skip more than 1 million

### 05.02-rows-columns-and-parquet#3 (mcq)
Jamal owns three bakeries, A, B and C. His sales file has 6 row groups, in the order the sales happened. The footer shows branch from A to C in every group. He filters on branch C and the plan reads all 6 groups. What explains it, and what would help?
A. Every group's range includes C, so none is ruled out; sorting by branch would help
B. The footer lists only the file's size, so each group must be opened to be checked
C. A text column such as branch has no statistics, so groups can never be skipped on it
D. The plan reads 6 groups because the engine always reads one more than it needs

### 05.03-partitions-and-file-sizes#1 (predict)
Mizan's lake holds 28 days and 8 markets. Hala partitions by upload date and market. How many files does a query for the week 2 to 8 March open?
A. 56 files: 7 days of 8 markets
B. 7 files: one for each day of the week
