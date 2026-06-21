// Loads out/catalog.json into Supabase (categories + products).
// Requires env: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
// Idempotent: upserts categories by slug; inserts products only for categories
// that currently have none (so re-runs won't duplicate or clobber admin edits).

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createClient } from '@supabase/supabase-js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const URL = process.env.SUPABASE_URL
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!URL || !KEY) { console.error('Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY'); process.exit(1) }

const db = createClient(URL, KEY, { auth: { persistSession: false } })
const catalog = JSON.parse(fs.readFileSync(path.join(__dirname, 'out', 'catalog.json'), 'utf8'))

const run = async () => {
  // 1) Upsert categories.
  const { error: catErr } = await db.from('categories').upsert(
    catalog.categories.map((c) => ({ name: c.name, slug: c.slug, sort_order: c.sort_order, is_active: true })),
    { onConflict: 'slug' },
  )
  if (catErr) throw catErr

  const { data: cats } = await db.from('categories').select('id, slug')
  const slugToId = Object.fromEntries(cats.map((c) => [c.slug, c.id]))

  // 2) Insert products per category (skip categories that already have products).
  let inserted = 0, skipped = 0
  for (const cat of catalog.categories) {
    const catId = slugToId[cat.slug]
    const { count } = await db.from('products').select('*', { count: 'exact', head: true }).eq('category_id', catId)
    if (count > 0) { skipped += count; console.log(`skip ${cat.slug} (${count} existing)`); continue }

    const rows = catalog.products
      .filter((p) => p.category_slug === cat.slug)
      .map((p) => ({
        category_id: catId,
        name: p.name, brand: p.brand, model: p.model, sku: p.sku,
        description: p.description, short_specs: p.short_specs,
        specs: p.specs ?? {}, price: p.price, currency: p.currency || 'AED',
        unit: p.unit, image_url: p.image_url, sort_order: p.sort_order, is_active: true,
      }))
    if (!rows.length) continue
    const { error } = await db.from('products').insert(rows)
    if (error) throw error
    inserted += rows.length
    console.log(`+ ${cat.slug}: ${rows.length} products`)
  }
  console.log(`\nDone. Inserted ${inserted}, skipped ${skipped}.`)
}

run().catch((e) => { console.error(e); process.exit(1) })
