-- Grain: one accepted price report (one report_id).
--
-- Incremental: after the first build we only re-read recent days and replace those rows by report_id.
--   * Normal run: reported_date from (newest reported_date minus lookback_days) onwards.
--     A report that arrives up to lookback_days late falls inside this window and is merged in.
--   * Backfill run: dbt build --vars "{start_date: 2026-03-02, end_date: 2026-03-07}" re-reads exactly that range.
{{
    config(
        materialized='incremental',
        unique_key='report_id',
        incremental_strategy='delete+insert',
        on_schema_change='fail'
    )
}}

with reports as (
    select * from {{ ref('stg_price_reports') }}
    {% if is_incremental() %}
        {% if var('start_date', none) is not none %}
    where reported_date between date '{{ var("start_date") }}' and date '{{ var("end_date") }}'
        {% else %}
    where reported_date >= (select max(reported_date) from {{ ref('stg_price_reports') }}) - interval '{{ var("lookback_days") }} days'
        {% endif %}
    {% endif %}
)

select
    r.report_id,
    r.reported_date,
    cast(strftime(r.reported_date, '%Y%m%d') as integer) as date_key,
    m.market_key,
    i.item_key,
    r.volunteer_id,
    r.volunteer_key,
    r.price,
    r.unit,
    r.reported_at,
    r.uploaded_at
from reports as r
-- each report points at the version of the market that was valid on the day it was reported
left join {{ ref('dim_market') }} as m
    on m.market_code = r.market_code
    and r.reported_date >= m.valid_from
    and (m.valid_to is null or r.reported_date < m.valid_to)
left join {{ ref('dim_item') }} as i
    on i.item_code = r.item_code
