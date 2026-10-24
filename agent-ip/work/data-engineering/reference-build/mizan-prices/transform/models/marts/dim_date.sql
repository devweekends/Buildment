-- One row per calendar day from the first to the last report.
with bounds as (
    select min(reported_date) as first_day, max(reported_date) as last_day
    from {{ ref('stg_price_reports') }}
),

days as (
    select cast(unnest(generate_series(first_day, last_day, interval 1 day)) as date) as day
    from bounds
)

select
    cast(strftime(day, '%Y%m%d') as integer) as date_key,
    day as date,
    isoyear(day) as iso_year,
    weekofyear(day) as iso_week,
    dayname(day) as weekday
from days
