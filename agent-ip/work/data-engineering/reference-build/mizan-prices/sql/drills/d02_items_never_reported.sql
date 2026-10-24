-- Drill 2: which items did market M02 NOT report on 2026-03-02?
-- Left join from items, then keep the rows where nothing matched (the anti-join pattern).
SELECT
    i.item_code,
    i.item_name
FROM items AS i
LEFT JOIN (
    SELECT DISTINCT item_code
    FROM reports
    WHERE market_code = 'M02'
      AND CAST(reported_at AS DATE) = DATE '2026-03-02'
) AS seen ON seen.item_code = i.item_code
WHERE seen.item_code IS NULL
ORDER BY i.item_code;
