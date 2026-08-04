// Applies a single SQL migration file to the live project via the Management API.
// Usage: SUPABASE_ACCESS_TOKEN=... node apply.mjs ../migrations/<file>.sql
// Optional env: SUPABASE_PROJECT_REF (else auto-pick if exactly one project)

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PAT = process.env.SUPABASE_ACCESS_TOKEN
if (!PAT) { console.error('Set SUPABASE_ACCESS_TOKEN'); process.exit(1) }
const API = 'https://api.supabase.com/v1'
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
  const file = process.argv[2]
  if (!file) { console.error('Pass a migration file path'); process.exit(1) }

  let ref = process.env.SUPABASE_PROJECT_REF
  if (!ref) {
    const projects = await api('/projects')
    if (projects.length === 1) ref = projects[0].id
    else { console.error('Set SUPABASE_PROJECT_REF'); process.exit(1) }
  }
  console.log('Project ref:', ref)

  const sql = fs.readFileSync(path.resolve(__dirname, file), 'utf8')
  console.log(`Applying ${file}…`)
  await runSql(ref, sql)
  console.log('  applied.')
}

main().catch((e) => { console.error(e); process.exit(1) })
