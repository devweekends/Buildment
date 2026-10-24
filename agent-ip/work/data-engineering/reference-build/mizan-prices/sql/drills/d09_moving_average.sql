-- Drill 9: 7-row moving average of the egg (I09) price, one line of days per market.
-- ROWS BETWEEN 6 PRECEDING AND CURRENT ROW means "this row and the 6 rows before it".
-- It counts rows, not calendar days, so a missing day makes the window reach back one day further.
WITH daily AS (
    SELECT market_code, CAST(reported_at AS DATE) AS report_day, AVG(price) AS day_price
    FROM reports
    WHERE item_code = 'I09' AND price > 0
    GROUP BY market_code, CAST(reported_at AS DATE)
)
SELECT
    market_code,
    report_day,
    ROUND(day_price, 2) AS day_price,
    ROUND(AVG(day_price) OVER (
        PARTITION BY market_code
        ORDER BY report_day
        ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
    ), 3) AS moving_avg_7
FROM daily
ORDER BY market_code, report_day;
