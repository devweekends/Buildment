-- Drill 5: the cost of the 12-item basket per market and day, a chain of CTEs.
-- Step 1: keep only good rows. Step 2: one average price per market, day and item
-- (repeats and duplicate sends get averaged, so nothing is counted twice).
-- Step 3: add up the 12 items, but only on days when all 12 were reported.
WITH good AS (
    SELECT market_code, item_code, price, CAST(reported_at AS DATE) AS report_day
    FROM reports
    WHERE price > 0 AND item_code IS NOT NULL
),
item_day AS (
    SELECT market_code, report_day, item_code, AVG(price) AS item_price
    FROM good
    GROUP BY market_code, report_day, item_code
)
SELECT
    market_code,
    report_day,
    ROUND(SUM(item_price), 2) AS basket_cost
FROM item_day
GROUP BY market_code, report_day
HAVING COUNT(*) = 12
ORDER BY market_code, report_day;
