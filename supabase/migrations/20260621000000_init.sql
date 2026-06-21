-- ============================================================================
-- Standard Group — backend schema, roles, permissions, RLS, storage
-- ============================================================================
-- Conventions:
--   * Every table has RLS ENABLED.
--   * Public (anon) can READ active catalog data + settings, and INSERT orders.
--   * Staff access is gated by per-user permission flags set by an admin.
--   * Admin (role='admin') implicitly has every permission.
-- ============================================================================

create extension if not exists pgcrypto;

-- ----------------------------------------------------------------------------
-- Helper: updated_at trigger
-- ----------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ============================================================================
-- profiles  (1:1 with auth.users)
-- ============================================================================
create table if not exists public.profiles (
  id           uuid primary key references auth.users(id) on delete cascade,
  email        text,
  full_name    text,
  role         text not null default 'staff' check (role in ('admin','staff')),
  is_active    boolean not null default true,
  -- granular section permissions an admin can toggle per staff member.
  -- keys: products, categories, orders, staff, settings  (bool)
  permissions  jsonb not null default '{}'::jsonb,
  created_by   uuid references auth.users(id),
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create trigger trg_profiles_updated
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- ----------------------------------------------------------------------------
-- Permission helpers (SECURITY DEFINER so they bypass RLS and avoid recursion)
-- ----------------------------------------------------------------------------
create or replace function public.is_admin(uid uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = uid and role = 'admin' and is_active
  );
$$;

create or replace function public.has_permission(uid uuid, perm text)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select public.is_admin(uid)
      or exists (
           select 1 from public.profiles
           where id = uid
             and is_active
             and coalesce((permissions ->> perm)::boolean, false)
         );
$$;

-- Auto-create a profile row whenever an auth user is created.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    coalesce(new.raw_user_meta_data ->> 'role', 'staff')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================================
-- categories
-- ============================================================================
create table if not exists public.categories (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  slug        text not null unique,
  description text,
  icon        text,
  image_url   text,
  sort_order  int not null default 0,
  is_active   boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create trigger trg_categories_updated
  before update on public.categories
  for each row execute function public.set_updated_at();

-- ============================================================================
-- products
-- ============================================================================
create table if not exists public.products (
  id           uuid primary key default gen_random_uuid(),
  category_id  uuid references public.categories(id) on delete set null,
  name         text not null,
  slug         text,
  sku          text,
  model        text,
  brand        text,
  description  text,
  short_specs  text,
  specs        jsonb not null default '{}'::jsonb,
  price        numeric(12,2),
  currency     text not null default 'AED',
  unit         text,
  stock        int,
  -- fallback/external image (e.g. migrated stock image); uploaded images live
  -- in product_images and take visual precedence on the storefront.
  image_url    text,
  is_active    boolean not null default true,
  is_featured  boolean not null default false,
  sort_order   int not null default 0,
  created_by   uuid references auth.users(id),
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);
create index if not exists idx_products_category on public.products(category_id);
create index if not exists idx_products_active   on public.products(is_active);
create trigger trg_products_updated
  before update on public.products
  for each row execute function public.set_updated_at();

-- ============================================================================
-- product_images  (nested per-product storage; metadata here)
-- ============================================================================
create table if not exists public.product_images (
  id           uuid primary key default gen_random_uuid(),
  product_id   uuid not null references public.products(id) on delete cascade,
  storage_path text not null,                 -- e.g. <category-slug>/<product-id>/<file>
  url          text not null,
  alt          text,
  is_primary   boolean not null default false,
  sort_order   int not null default 0,
  created_at   timestamptz not null default now()
);
create index if not exists idx_product_images_product on public.product_images(product_id);

-- ============================================================================
-- settings  (dynamic config: whatsapp number, store name, etc.)
-- ============================================================================
create table if not exists public.settings (
  key        text primary key,
  value      jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
create trigger trg_settings_updated
  before update on public.settings
  for each row execute function public.set_updated_at();

insert into public.settings (key, value) values
  ('whatsapp', jsonb_build_object('order_number','971504654613','enabled',true)),
  ('store',    jsonb_build_object('name','Standard Group','currency','AED'))
on conflict (key) do nothing;

-- ============================================================================
-- orders + order_items
-- ============================================================================
create sequence if not exists public.order_seq start 1000;

create table if not exists public.orders (
  id               uuid primary key default gen_random_uuid(),
  order_number     text not null unique default ('SG-' || nextval('public.order_seq')),
  customer_name    text,
  customer_phone   text,
  customer_email   text,
  customer_company text,
  notes            text,
  status           text not null default 'new'
                     check (status in ('new','contacted','confirmed','fulfilled','cancelled')),
  channel          text not null default 'whatsapp',
  subtotal         numeric(12,2),
  total            numeric(12,2),
  currency         text not null default 'AED',
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);
create trigger trg_orders_updated
  before update on public.orders
  for each row execute function public.set_updated_at();

create table if not exists public.order_items (
  id         uuid primary key default gen_random_uuid(),
  order_id   uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  name       text not null,
  model      text,
  unit_price numeric(12,2),
  quantity   int not null default 1 check (quantity > 0),
  line_total numeric(12,2)
);
create index if not exists idx_order_items_order on public.order_items(order_id);

-- ============================================================================
-- RLS
-- ============================================================================
alter table public.profiles       enable row level security;
alter table public.categories     enable row level security;
alter table public.products       enable row level security;
alter table public.product_images enable row level security;
alter table public.settings       enable row level security;
alter table public.orders         enable row level security;
alter table public.order_items    enable row level security;

-- ---- profiles -------------------------------------------------------------
create policy "profiles self or admin read" on public.profiles
  for select to authenticated
  using (id = auth.uid() or public.is_admin(auth.uid()));

create policy "profiles admin insert" on public.profiles
  for insert to authenticated
  with check (public.is_admin(auth.uid()));

create policy "profiles admin update" on public.profiles
  for update to authenticated
  using (public.is_admin(auth.uid()))
  with check (public.is_admin(auth.uid()));

create policy "profiles admin delete" on public.profiles
  for delete to authenticated
  using (public.is_admin(auth.uid()) and id <> auth.uid());

-- ---- categories -----------------------------------------------------------
create policy "categories public read active" on public.categories
  for select to anon, authenticated
  using (is_active);

create policy "categories staff read all" on public.categories
  for select to authenticated
  using (public.has_permission(auth.uid(),'categories'));

create policy "categories staff write" on public.categories
  for all to authenticated
  using (public.has_permission(auth.uid(),'categories'))
  with check (public.has_permission(auth.uid(),'categories'));

-- ---- products -------------------------------------------------------------
create policy "products public read active" on public.products
  for select to anon, authenticated
  using (is_active);

create policy "products staff read all" on public.products
  for select to authenticated
  using (public.has_permission(auth.uid(),'products'));

create policy "products staff write" on public.products
  for all to authenticated
  using (public.has_permission(auth.uid(),'products'))
  with check (public.has_permission(auth.uid(),'products'));

-- ---- product_images -------------------------------------------------------
create policy "product_images public read" on public.product_images
  for select to anon, authenticated
  using (true);

create policy "product_images staff write" on public.product_images
  for all to authenticated
  using (public.has_permission(auth.uid(),'products'))
  with check (public.has_permission(auth.uid(),'products'));

-- ---- settings -------------------------------------------------------------
create policy "settings public read" on public.settings
  for select to anon, authenticated
  using (true);

create policy "settings admin write" on public.settings
  for all to authenticated
  using (public.has_permission(auth.uid(),'settings'))
  with check (public.has_permission(auth.uid(),'settings'));

-- ---- orders ---------------------------------------------------------------
-- Storefront (anon) may create orders; only staff with 'orders' can read/manage.
create policy "orders public insert" on public.orders
  for insert to anon, authenticated
  with check (true);

create policy "orders staff read" on public.orders
  for select to authenticated
  using (public.has_permission(auth.uid(),'orders'));

create policy "orders staff update" on public.orders
  for update to authenticated
  using (public.has_permission(auth.uid(),'orders'))
  with check (public.has_permission(auth.uid(),'orders'));

create policy "orders staff delete" on public.orders
  for delete to authenticated
  using (public.has_permission(auth.uid(),'orders'));

-- ---- order_items ----------------------------------------------------------
create policy "order_items public insert" on public.order_items
  for insert to anon, authenticated
  with check (true);

create policy "order_items staff read" on public.order_items
  for select to authenticated
  using (public.has_permission(auth.uid(),'orders'));

create policy "order_items staff delete" on public.order_items
  for delete to authenticated
  using (public.has_permission(auth.uid(),'orders'));

-- ============================================================================
-- Storage: product-images bucket (public read, staff write)
-- ============================================================================
insert into storage.buckets (id, name, public)
values ('product-images','product-images', true)
on conflict (id) do nothing;

create policy "product images public read" on storage.objects
  for select to anon, authenticated
  using (bucket_id = 'product-images');

create policy "product images staff insert" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'product-images' and public.has_permission(auth.uid(),'products'));

create policy "product images staff update" on storage.objects
  for update to authenticated
  using (bucket_id = 'product-images' and public.has_permission(auth.uid(),'products'))
  with check (bucket_id = 'product-images' and public.has_permission(auth.uid(),'products'));

create policy "product images staff delete" on storage.objects
  for delete to authenticated
  using (bucket_id = 'product-images' and public.has_permission(auth.uid(),'products'));

-- ============================================================================
-- place_order(): storefront checkout. SECURITY DEFINER so anonymous shoppers
-- can atomically create an order + items and get the order number back, without
-- being granted any SELECT on orders (RLS stays tight — staff still gate reads).
-- ============================================================================
create or replace function public.place_order(p_customer jsonb, p_items jsonb)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  v_order_id     uuid;
  v_order_number text;
  v_subtotal     numeric(12,2);
  v_has_price    boolean;
begin
  if p_items is null or jsonb_array_length(p_items) = 0 then
    raise exception 'order has no items';
  end if;

  select coalesce(sum((i->>'unit_price')::numeric * coalesce((i->>'quantity')::int,1)), 0),
         bool_or((i->>'unit_price') is not null)
    into v_subtotal, v_has_price
    from jsonb_array_elements(p_items) i;

  insert into public.orders
    (customer_name, customer_phone, customer_email, customer_company, notes,
     channel, status, currency, subtotal, total)
  values
    (nullif(p_customer->>'name',''), nullif(p_customer->>'phone',''),
     nullif(p_customer->>'email',''), nullif(p_customer->>'company',''),
     nullif(p_customer->>'notes',''),
     'whatsapp', 'new', 'AED',
     case when v_has_price then v_subtotal end,
     case when v_has_price then v_subtotal end)
  returning id, order_number into v_order_id, v_order_number;

  insert into public.order_items
    (order_id, product_id, name, model, unit_price, quantity, line_total)
  select v_order_id,
         case when (i->>'product_id') ~ '^[0-9a-fA-F-]{36}$' then (i->>'product_id')::uuid end,
         coalesce(nullif(i->>'name',''), 'Item'),
         i->>'model',
         (i->>'unit_price')::numeric,
         coalesce((i->>'quantity')::int, 1),
         case when (i->>'unit_price') is not null
              then (i->>'unit_price')::numeric * coalesce((i->>'quantity')::int,1) end
    from jsonb_array_elements(p_items) i;

  return v_order_number;
end;
$$;

revoke all on function public.place_order(jsonb, jsonb) from public;
grant execute on function public.place_order(jsonb, jsonb) to anon, authenticated;
