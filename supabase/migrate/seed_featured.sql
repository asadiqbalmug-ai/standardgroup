update categories set is_featured = (sort_order < 7);

with ranked as (
  select id, row_number() over (order by (price is null), sort_order, name) rn
  from products where is_active
)
update products p set is_featured = true
from ranked r where p.id = r.id and r.rn <= 8;

with ranked as (
  select id, row_number() over (order by (price is null), sort_order desc, name) rn
  from products where is_active
)
update products p set is_bestseller = true
from ranked r where p.id = r.id and r.rn <= 8;
