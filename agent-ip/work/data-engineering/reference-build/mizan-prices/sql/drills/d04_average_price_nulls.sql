-- Drill 4: average price per item, ignoring bad prices.
-- A price of 0 or less is a mistake, so we turn it into NULL. AVG and COUNT(column) skip NULLs,
-- but COUNT(*) counts every row. The gap between the two counts shows how many prices were thrown away.
WITH cleaned AS (
    SELECT
        item_code,
        CASE WHEN price > 0 THEN price END AS clean_price
    FROM reports
)
SELECT
    item_code,
    COUNT(*) AS report_lines,
    COUNT(clean_price) AS usable_prices,
    ROUND(AVG(clean_price), 2) AS average_price
FROM cleaned
GROUP BY item_code
ORDER BY item_code NULLS LAST;
