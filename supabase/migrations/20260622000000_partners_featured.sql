-- ============================================================================
-- Standard Group — Partners (brands), featured/bestseller flags, featured nav
-- ============================================================================
-- Adds:
--   * partners table (name + logo in the `partners` storage bucket)
--   * products.partner_id  (attach a product to a partner/brand)
--   * products.is_bestseller (homepage "Best Sellers" rail)
--   * categories.is_featured (which categories show in the trimmed top nav)
--   * RLS + storage policies for partners, gated by a new 'partners' permission
-- All existing RLS conventions are preserved.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- partners
-- ----------------------------------------------------------------------------
create table if not exists public.partners (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  slug        text unique,
  logo_url    text,
  logo_path   text,                       -- storage path inside the partners bucket
  website     text,
  description text,
  sort_order  int not null default 0,
  is_active   boolean not null default true,
  is_featured boolean not null default true,
  created_by  uuid references auth.users(id),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

drop trigger if exists trg_partners_updated on public.partners;
create trigger trg_partners_updated
  before update on public.partners
  for each row execute function public.set_updated_at();

-- ----------------------------------------------------------------------------
-- products: link to a partner + best-seller flag
-- ----------------------------------------------------------------------------
alter table public.products
  add column if not exists partner_id uuid references public.partners(id) on delete set null;
alter table public.products
  add column if not exists is_bestseller boolean not null default false;
create index if not exists idx_products_partner on public.products(partner_id);

-- ----------------------------------------------------------------------------
-- categories: control which appear in the trimmed top nav
-- ----------------------------------------------------------------------------
alter table public.categories
  add column if not exists is_featured boolean not null default false;

-- ============================================================================
-- RLS — partners
-- ============================================================================
alter table public.partners enable row level security;

drop policy if exists "partners public read active" on public.partners;
create policy "partners public read active" on public.partners
  for select to anon, authenticated
  using (is_active);

drop policy if exists "partners staff read all" on public.partners;
create policy "partners staff read all" on public.partners
  for select to authenticated
  using (public.has_permission(auth.uid(),'partners'));

drop policy if exists "partners staff write" on public.partners;
create policy "partners staff write" on public.partners
  for all to authenticated
  using (public.has_permission(auth.uid(),'partners'))
  with check (public.has_permission(auth.uid(),'partners'));

-- ============================================================================
-- Storage: partners bucket (public read, staff-with-'partners' write)
-- ============================================================================
insert into storage.buckets (id, name, public)
values ('partners','partners', true)
on conflict (id) do nothing;

drop policy if exists "partner logos public read" on storage.objects;
create policy "partner logos public read" on storage.objects
  for select to anon, authenticated
  using (bucket_id = 'partners');

drop policy if exists "partner logos staff insert" on storage.objects;
create policy "partner logos staff insert" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'partners' and public.has_permission(auth.uid(),'partners'));

drop policy if exists "partner logos staff update" on storage.objects;
create policy "partner logos staff update" on storage.objects
  for update to authenticated
  using (bucket_id = 'partners' and public.has_permission(auth.uid(),'partners'))
  with check (bucket_id = 'partners' and public.has_permission(auth.uid(),'partners'));

drop policy if exists "partner logos staff delete" on storage.objects;
create policy "partner logos staff delete" on storage.objects
  for delete to authenticated
  using (bucket_id = 'partners' and public.has_permission(auth.uid(),'partners'));
