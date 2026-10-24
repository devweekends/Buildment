-- Grain: one market and one ISO week.
-- The basket is the 12 items. For each market and day we take the average price of each item
-- (repeats of a report are averaged), add the items up, and keep only days when all of them were priced.
-- The week value is the average of those full days. LAG gives the previous week of the same market.

with facts as (
    select f.reported_date, m.market_code, f.item_key, f.price
    from {{ ref('fct_price_report') }} as f
    join {{ ref('dim_market') }} as m on m.market_key = f.market_key
),

item_day as (
    select market_code, reported_date, item_key, avg(price) as item_price
    from facts
    group by market_code, reported_date, item_key
),

basket_day as (
    select market_code, reported_date, sum(item_price) as basket_cost
    from item_day
    group by market_code, reported_date
    having count(*) = {{ var('basket_items', 12) }}
),

basket_week as (
    select
        market_code,
        isoyear(reported_date) as iso_year,
        weekofyear(reported_date) as iso_week,
        cast(date_trunc('week', min(reported_date)) as date) as week_start,
        count(*) as full_days,
        cast(round(avg(basket_cost), 2) as decimal(10, 2)) as avg_basket_cost
    from basket_day
    group by market_code, isoyear(reported_date), weekofyear(reported_date)
)

select
    market_code,
    iso_year,
    iso_week,
    week_start,
    full_days,
    avg_basket_cost,
    lag(avg_basket_cost) over (partition by market_code order by iso_year, iso_week) as previous_week_cost,
    avg_basket_cost - lag(avg_basket_cost) over (partition by market_code order by iso_year, iso_week) as change,
    cast(round(
        100 * (avg_basket_cost - lag(avg_basket_cost) over (partition by market_code order by iso_year, iso_week))
        / lag(avg_basket_cost) over (partition by market_code order by iso_year, iso_week), 1
    ) as decimal(6, 1)) as change_pct
from basket_week
