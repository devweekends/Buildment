-- Drill 7: rank the markets by flour (I01) price on 2026-03-08, cheapest first.
-- RANK gives tied markets the same number and then skips ahead (1, 1, 3).
-- ROW_NUMBER never repeats a number, so it picks winners among equals. We add market_code to make that choice stable.
SELECT
    market_code,
    price,
    RANK() OVER (ORDER BY price) AS price_rank,
    ROW_NUMBER() OVER (ORDER BY price, market_code) AS row_number
FROM reports
WHERE item_code = 'I01'
  AND price > 0
  AND CAST(reported_at AS DATE) = DATE '2026-03-08'
ORDER BY price, market_code;
