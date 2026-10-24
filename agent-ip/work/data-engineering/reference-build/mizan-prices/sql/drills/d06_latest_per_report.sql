-- Drill 6: keep one row per report_id, the one that was uploaded last.
-- ROW_NUMBER numbers the sends of each report_id from newest to oldest. Number 1 is the one we keep.
WITH numbered AS (
    SELECT
        report_id, market_code, item_code, price, uploaded_at,
        ROW_NUMBER() OVER (PARTITION BY report_id ORDER BY uploaded_at DESC) AS send_number
    FROM reports
)
SELECT report_id, market_code, item_code, price, uploaded_at
FROM numbered
WHERE send_number = 1
ORDER BY report_id;
