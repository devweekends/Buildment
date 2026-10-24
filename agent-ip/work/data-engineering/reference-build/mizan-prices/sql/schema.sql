-- Star schema prototype for the price reports.
-- Grain of the fact table: ONE ACCEPTED PRICE REPORT (one report_id).

-- Type 2 dimension: a market gets a new row every time its area or opening days change.
-- valid_from is included, valid_to is excluded, and valid_to is NULL on the current row.
CREATE TABLE dim_market (
    market_key  INTEGER PRIMARY KEY,
    market_code VARCHAR NOT NULL,
    name        VARCHAR,
    area        VARCHAR,
    opens       VARCHAR,
    valid_from  DATE NOT NULL,
    valid_to    DATE,
    is_current  BOOLEAN NOT NULL
);

CREATE TABLE dim_item (
    item_key  INTEGER PRIMARY KEY,
    item_code VARCHAR NOT NULL UNIQUE,
    item_name VARCHAR,
    category  VARCHAR,
    unit      VARCHAR
);

CREATE TABLE dim_date (
    date_key  INTEGER PRIMARY KEY,   -- 20260301 style, easy to read
    date      DATE NOT NULL UNIQUE,
    iso_year  INTEGER,
    iso_week  INTEGER,
    weekday   VARCHAR
);

CREATE TABLE fct_price_report (
    report_id    VARCHAR PRIMARY KEY,
    date_key     INTEGER NOT NULL REFERENCES dim_date (date_key),
    market_key   INTEGER NOT NULL REFERENCES dim_market (market_key),
    item_key     INTEGER NOT NULL REFERENCES dim_item (item_key),
    volunteer_id VARCHAR,
    price        DECIMAL(8, 2) NOT NULL,
    reported_at  TIMESTAMP,
    uploaded_at  TIMESTAMP
);
