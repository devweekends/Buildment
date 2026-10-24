-- Drill 3: the fan-out trap.
-- Market M02 has TWO contacts. Joining reports straight to contacts would repeat every report twice,
-- and the total price would be doubled. So we add up the prices FIRST (one row per market and day),
-- and only then join the contacts, collapsing them to a count.
WITH day_total AS (
    SELECT market_code, SUM(price) AS total_price, COUNT(*) AS report_lines
    FROM reports
    WHERE market_code = 'M02'
      AND CAST(reported_at AS DATE) = DATE '2026-03-04'
    GROUP BY market_code
),
contact_count AS (
    SELECT market_code, COUNT(*) AS contacts
    FROM market_contacts
    GROUP BY market_code
)
SELECT d.market_code, d.report_lines, ROUND(d.total_price, 2) AS total_price, c.contacts
FROM day_total AS d
JOIN contact_count AS c ON c.market_code = d.market_code;
