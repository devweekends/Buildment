-- Drill 1: how many report lines did each market send?
-- Inner join to markets, so a report with an unknown market would be dropped.
SELECT
    m.market_code,
    m.name,
    count(*) AS report_lines
FROM reports AS r
JOIN markets AS m ON m.market_code = r.market_code
GROUP BY m.market_code, m.name
ORDER BY m.market_code;
