# Standard Group — Supabase backend

Schema, RLS, storage, the `create-staff` edge function, and migration tooling for
the admin panel (`/admin`) and the storefront.

## Layout
- `migrations/20260621000000_init.sql` — full schema, roles/permissions, RLS, the
  `product-images` storage bucket + storage policies, and seed `settings`.
- `functions/create-staff/` — admin-only edge function that creates auth users
  (staff/admin) with the service role and sets their role + permissions.
- `migrate/` — Node scripts:
  - `provision.mjs` — applies the schema, promotes the admin, reveals API keys.
  - `extract.mjs` — parses `src/pages/*.jsx` into `out/catalog.json` (168 products).
  - `loader.mjs` — loads `catalog.json` into `categories` + `products`.

## One-time setup
```bash
# 0) pre-create the admin in Supabase Auth: admin@standardgroup.ae
cd supabase/migrate
npm install

# 1) provision (schema + admin promotion + keys)
export SUPABASE_ACCESS_TOKEN=...           # personal access token
node provision.mjs                         # writes migrate/.env, prints VITE_ vars

# 2) migrate the existing catalog
node extract.mjs
node loader.mjs                            # uses migrate/.env

# 3) deploy the edge function
npm i -g supabase
supabase functions deploy create-staff --project-ref <ref>
```

## Vercel env vars (set in BOTH the storefront and admin projects)
```
VITE_SUPABASE_URL=https://<ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<anon key>
```
The service-role key is never exposed to the browser — it only lives inside the
edge function (auto-injected by Supabase as `SUPABASE_SERVICE_ROLE_KEY`).

## Roles & permissions
- `admin` — full access to everything.
- `staff` — access only to the sections an admin enables via per-user permission
  flags: `products`, `categories`, `orders`, `staff`, `settings`.

RLS enforces this at the database level (see `is_admin()` / `has_permission()`),
so restrictions hold regardless of the client.
