-- One row per item. The item list is a small seed file (no personal data in seeds).
-- The surrogate key is a hash of the item code, so it never changes when items are added.
select
    md5(item_code) as item_key,
    item_code,
    item_name,
    category,
    unit
from {{ ref('items') }}
