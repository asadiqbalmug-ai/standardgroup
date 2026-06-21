// Provisions Supabase via the Management API using a Personal Access Token.
// Requires env: SUPABASE_ACCESS_TOKEN
// Optional env: SUPABASE_PROJECT_REF (else auto-pick if exactly one project)
//
// Steps: pick project -> run schema migration -> promote the pre-created admin
// user -> reveal anon/service keys -> write migrate/.env for the loader.

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PAT = process.env.SUPABASE_ACCESS_TOKEN
if (!PAT) { console.error('Set SUPABASE_ACCESS_TOKEN'); process.exit(1) }
const API = 'https://api.supabase.com/v1'
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@standardgroup.ae'

const h = { Authorization: `Bearer ${PAT}`, 'Content-Type': 'application/json' }

async function api(p, opts = {}) {
  const res = await fetch(`${API}${p}`, { ...opts, headers: { ...h, ...(opts.headers || {}) } })
  const text = await res.text()
  if (!res.ok) throw new Error(`${opts.method || 'GET'} ${p} -> ${res.status}: ${text}`)
  return text ? JSON.parse(text) : null
}

const runSql = (ref, query) =>
  api(`/projects/${ref}/database/query`, { method: 'POST', body: JSON.stringify({ query }) })

async function main() {
  const projects = await api('/projects')
  console.log('Projects:', projects.map((p) => `${p.name} (${p.id}, ${p.region}, ${p.status})`).join('\n          '))

  let ref = process.env.SUPABASE_PROJECT_REF
  if (!ref) {
    if (projects.length === 1) ref = projects[0].id
    else { console.error('\nMultiple/zero projects. Set SUPABASE_PROJECT_REF to one of the ids above.'); process.exit(1) }
  }
  const project = projects.find((p) => p.id === ref) || { id: ref }
  console.log(`\nUsing project: ${project.name || ''} ${ref}`)

  // 1) Apply schema.
  const sql = fs.readFileSync(path.resolve(__dirname, '../migrations/20260621000000_init.sql'), 'utf8')
  console.log('Applying schema migration…')
  await runSql(ref, sql)
  console.log('  schema applied.')

  // 2) Promote the pre-created admin (if present).
  console.log(`Promoting ${ADMIN_EMAIL} to admin…`)
  await runSql(ref, `
    update public.profiles p set role='admin', is_active=true, permissions='{}'::jsonb
    from auth.users u where u.id=p.id and lower(u.email)=lower('${ADMIN_EMAIL}');
    insert into public.profiles (id,email,full_name,role,is_active)
    select u.id,u.email,'Administrator','admin',true from auth.users u
    where lower(u.email)=lower('${ADMIN_EMAIL}')
      and not exists (select 1 from public.profiles p where p.id=u.id);
  `)
  const check = await runSql(ref, `select email,role from public.profiles where lower(email)=lower('${ADMIN_EMAIL}')`)
  console.log('  admin profile:', JSON.stringify(check))

  // 3) Reveal API keys.
  const keys = await api(`/projects/${ref}/api-keys?reveal=true`)
  const anon = keys.find((k) => k.name === 'anon')?.api_key
  const service = keys.find((k) => k.name === 'service_role')?.api_key
  const url = `https://${ref}.supabase.co`

  // 4) Write .env for the loader (gitignored).
  fs.writeFileSync(path.join(__dirname, '.env'),
    `SUPABASE_URL=${url}\nSUPABASE_SERVICE_ROLE_KEY=${service}\n`)

  console.log('\n=== DONE ===')
  console.log('Project ref :', ref)
  console.log('Set these in BOTH Vercel projects (storefront + admin):')
  console.log('  VITE_SUPABASE_URL      =', url)
  console.log('  VITE_SUPABASE_ANON_KEY =', anon)
  console.log('\nWrote migrate/.env (service role) for loader.mjs. Next:')
  console.log('  node loader.mjs            # migrate products')
  console.log(`  supabase functions deploy create-staff --project-ref ${ref}`)
}

main().catch((e) => { console.error(e); process.exit(1) })
