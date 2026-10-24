-- Load the prototype from the raw files. Run from the project folder (paths are relative).

-- Every version of every market. An empty valid_to becomes NULL.
INSERT INTO dim_market
SELECT
    ROW_NUMBER() OVER (ORDER BY market_code, valid_from) AS market_key,
    market_code, name, area, opens, valid_from, valid_to,
    valid_to IS NULL AS is_current
FROM read_csv('data/raw/market_history.csv', header = true, types = {'valid_from': 'DATE', 'valid_to': 'DATE'});

INSERT INTO dim_item
SELECT ROW_NUMBER() OVER (ORDER BY item_code), item_code, item_name, category, unit
FROM read_csv('data/raw/items.csv', header = true);

-- Accepted reports only: no bad prices, no missing item code, and one row per report_id (the latest send).
-- timezone('UTC', ...) turns the JSON timestamps into plain UTC timestamps, so the computer's time zone cannot move a date.
CREATE TEMP TABLE accepted AS
SELECT * EXCLUDE (send_number)
FROM (
    SELECT
        report_id, market_code, item_code, volunteer_id, price,
        timezone('UTC', reported_at) AS reported_at,
        timezone('UTC', uploaded_at) AS uploaded_at,
        ROW_NUMBER() OVER (PARTITION BY report_id ORDER BY uploaded_at DESC) AS send_number
    FROM read_json('data/raw/uploads/*/*.jsonl', union_by_name = true)
    WHERE price > 0 AND item_code IS NOT NULL
)
WHERE send_number = 1;

-- One row for every calendar day between the first and the last report.
INSERT INTO dim_date
SELECT
    CAST(STRFTIME(d, '%Y%m%d') AS INTEGER),
    CAST(d AS DATE),
    ISOYEAR(d),
    WEEKOFYEAR(d),
    DAYNAME(d)
FROM (
    SELECT UNNEST(GENERATE_SERIES(MIN(CAST(reported_at AS DATE)), MAX(CAST(reported_at AS DATE)), INTERVAL 1 DAY)) AS d
    FROM accepted
);

-- Each fact points at the market version that was valid on the day of the report.
INSERT INTO fct_price_report
SELECT
    a.report_id,
    CAST(STRFTIME(a.reported_at, '%Y%m%d') AS INTEGER) AS date_key,
    m.market_key,
    i.item_key,
    a.volunteer_id,
    a.price,
    a.reported_at,
    a.uploaded_at
FROM accepted AS a
JOIN dim_market AS m
  ON m.market_code = a.market_code
 AND CAST(a.reported_at AS DATE) >= m.valid_from
 AND (m.valid_to IS NULL OR CAST(a.reported_at AS DATE) < m.valid_to)
JOIN dim_item AS i ON i.item_code = a.item_code;
