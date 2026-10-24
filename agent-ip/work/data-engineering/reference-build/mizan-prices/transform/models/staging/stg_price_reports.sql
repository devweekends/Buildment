-- One row per report_id: when a report was sent more than once, keep the latest send.
-- Grain: one price report.
-- Bad rows (price 0 or less, missing item code) never get here: the landing step quarantines them
-- (before chapter 8.5 this model had its own "where price > 0 and item_code is not null" line).

with source as (
    -- The empty first part guarantees a unit column even when no file has one yet (before 15 March).
    -- "union all by name" lines the columns up by name and fills the gaps with NULL.
    select * from (select cast(null as varchar) as unit where false)
    union all by name
    select * from {{ source('lake', 'price_reports') }}
),

latest_send as (
    select
        *,
        row_number() over (partition by report_id order by uploaded_at desc) as send_number
    from source
)

select
    report_id,
    market_code,
    item_code,
    cast(price as decimal(8, 2)) as price,
    cast(reported_at as timestamp) as reported_at,
    cast(reported_at as date) as reported_date,
    cast(uploaded_at as timestamp) as uploaded_at,
    volunteer_id,
    volunteer_key,
    unit
from latest_send
where send_number = 1
