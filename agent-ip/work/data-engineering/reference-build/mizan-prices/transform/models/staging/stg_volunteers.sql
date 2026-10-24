-- One row per volunteer: the most recently updated row we have extracted.
-- A volunteer who was deleted from the registry stays here with their last known values,
-- because the extraction cannot see deletes (see chapter 6).
with ranked as (
    select
        *,
        row_number() over (partition by volunteer_id order by updated_at desc, extracted_at desc) as row_rank
    from {{ source('lake', 'volunteers') }}
)

select
    volunteer_id,
    market_code,
    volunteer_key,
    cast(updated_at as timestamp) as updated_at
from ranked
where row_rank = 1
