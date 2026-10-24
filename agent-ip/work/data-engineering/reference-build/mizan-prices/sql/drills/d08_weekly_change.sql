-- Drill 8: average basket cost per market and ISO week, and the change from the week before.
-- Step 0 keeps one send per report (drill 6), because a repeated send would skew the averages of drill 5.
-- Then the same steps as drill 5, then we average by week. LAG looks at the previous row of the same market.
WITH numbered AS (
    SELECT
        market_code, item_code, price, reported_at,
        ROW_NUMBER() OVER (PARTITION BY report_id ORDER BY uploaded_at DESC) AS send_number
    FROM reports
),
good AS (
    SELECT market_code, item_code, price, CAST(reported_at AS DATE) AS report_day
    FROM numbered
    WHERE send_number = 1 AND price > 0 AND item_code IS NOT NULL
),
item_day AS (
    SELECT market_code, report_day, item_code, AVG(price) AS item_price
    FROM good
    GROUP BY market_code, report_day, item_code
),
basket_day AS (
    SELECT market_code, report_day, SUM(item_price) AS basket_cost
    FROM item_day
    GROUP BY market_code, report_day
    HAVING COUNT(*) = 12
),
basket_week AS (
    SELECT
        market_code,
        ISOYEAR(report_day) AS iso_year,
        WEEKOFYEAR(report_day) AS iso_week,
        COUNT(*) AS full_days,
        ROUND(AVG(basket_cost), 2) AS avg_basket_cost
    FROM basket_day
    GROUP BY market_code, ISOYEAR(report_day), WEEKOFYEAR(report_day)
)
SELECT
    market_code,
    iso_year,
    iso_week,
    full_days,
    avg_basket_cost,
    LAG(avg_basket_cost) OVER (PARTITION BY market_code ORDER BY iso_year, iso_week) AS previous_week,
    ROUND(avg_basket_cost - LAG(avg_basket_cost) OVER (PARTITION BY market_code ORDER BY iso_year, iso_week), 2) AS change
FROM basket_week
ORDER BY market_code, iso_year, iso_week;
