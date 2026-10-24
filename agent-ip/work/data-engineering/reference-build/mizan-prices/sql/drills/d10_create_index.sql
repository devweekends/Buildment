-- Drill 10: one index so that "market M05, item I01" no longer reads the whole table.
CREATE INDEX idx_price_log_market_item ON price_log (market_code, item_code);
