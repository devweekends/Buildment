-- A singular test: it passes when this query returns no rows.
-- Bad prices are stopped at landing, so none should ever reach the fact table.
select report_id, price
from {{ ref('fct_price_report') }}
where price <= 0
