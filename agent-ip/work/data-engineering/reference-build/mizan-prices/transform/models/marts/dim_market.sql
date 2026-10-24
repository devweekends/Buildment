-- Type 2 dimension: one row per version of a market, built from the snapshot.
-- valid_from is included, valid_to is excluded, and valid_to is NULL on the current row.
-- The first version we ever saw is valid "since the beginning" (1900-01-01), because the snapshot
-- cannot know how long the market had been like that before we started watching.

with versions as (
    select
        *,
        row_number() over (partition by market_code order by dbt_valid_from) as version_number
    from {{ ref('snap_markets') }}
)

select
    dbt_scd_id as market_key,
    market_code,
    name,
    area,
    opens,
    case when version_number = 1 then date '1900-01-01' else cast(dbt_valid_from as date) end as valid_from,
    cast(dbt_valid_to as date) as valid_to,
    dbt_valid_to is null as is_current
from versions
