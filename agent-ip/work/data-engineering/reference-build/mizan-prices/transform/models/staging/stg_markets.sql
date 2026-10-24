-- One row per market: the most recently updated row we have extracted.
with ranked as (
    select
        *,
        row_number() over (partition by market_code order by updated_at desc, extracted_at desc) as row_rank
    from {{ source('lake', 'markets') }}
)

select
    market_code,
    name,
    area,
    opens,
    cast(updated_at as timestamp) as updated_at
from ranked
where row_rank = 1
