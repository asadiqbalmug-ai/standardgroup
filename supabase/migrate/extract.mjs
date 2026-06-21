// Extracts product data from the 17 per-page product arrays in src/pages/*.jsx
// and the category list, producing out/catalog.json for the loader.
//
// The per-page files contain the richest data (descriptions, prices, images),
// so we parse each file's top-level `const products = [...]` literal via Babel
// and normalise it into a unified shape. Unknown fields are preserved in `specs`.

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { parse } from '@babel/parser'
import _traverse from '@babel/traverse'
const traverse = _traverse.default

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PAGES = path.resolve(__dirname, '../../src/pages')
const OUT = path.resolve(__dirname, 'out')

// page file -> category {slug (matches storefront route), name}
const CATEGORIES = [
  ['MilanoWaterHeaters.jsx', 'milano-water-heaters', 'Water Heaters'],
  ['WaterClosets.jsx', 'water-closets', 'Water Closets'],
  ['WashBasins.jsx', 'wash-basins', 'Wash Basins'],
  ['WallHung.jsx', 'wall-hung', 'Wall Hung WC'],
  ['TilesRoofInterlock.jsx', 'tiles-roof-interlock', 'Tiles, Roof Tile & Interlock'],
  ['SanitaryWare.jsx', 'sanitary-ware', 'Sanitary Ware'],
  ['BlocksSands.jsx', 'blocks-sands', 'Blocks & Sands'],
  ['Cement.jsx', 'cement', 'Cement'],
  ['Steel.jsx', 'steel', 'Steel'],
  ['FilmFacedPlywood.jsx', 'film-faced-plywood', 'Film Faced Plywood'],
  ['WaterProofing.jsx', 'water-proofing', 'Water Proofing'],
  ['GypsumBoard.jsx', 'gypsum-board', 'Gypsum Board & Accessories'],
  ['PaintsTools.jsx', 'paints-tools', 'Paints & Tools'],
  ['GeneralToolsPlumbing.jsx', 'general-tools-plumbing', 'General Tools & Plumbing'],
  ['PlumbingSanitary.jsx', 'plumbing-sanitary', 'Plumbing & Sanitary'],
  ['PlumbingSanitary2.jsx', 'plumbing-sanitary-2', 'Plumbing & Sanitary II'],
  ['ElectricLights.jsx', 'electric-lights', 'Electric Lights & Bulbs'],
]

// Evaluate a Babel literal node (object/array/string/number/bool/null/template).
function evalNode(node) {
  switch (node.type) {
    case 'StringLiteral':
    case 'NumericLiteral':
    case 'BooleanLiteral':
      return node.value
    case 'NullLiteral':
      return null
    case 'TemplateLiteral':
      // only static templates (no ${})
      return node.expressions.length === 0
        ? node.quasis.map((q) => q.value.cooked).join('')
        : null
    case 'UnaryExpression':
      if (node.operator === '-') return -evalNode(node.argument)
      return null
    case 'ArrayExpression':
      return node.elements.filter(Boolean).map(evalNode)
    case 'ObjectExpression': {
      const o = {}
      for (const p of node.properties) {
        if (p.type !== 'ObjectProperty') continue
        const key = p.key.name ?? p.key.value
        o[key] = evalNode(p.value)
      }
      return o
    }
    default:
      return null // identifiers / member exprs (e.g. icon: SomeIcon) dropped
  }
}

const SKIP_ARRAYS = new Set(['brands', 'specs', 'features', 'faqs', 'stats', 'nav', 'links', 'steps', 'benefits', 'tabs'])
const PRODUCT_HINT = ['price', 'description', 'image', 'model', 'type', 'grade', 'bag', 'size', 'specs', 'features']

function looksLikeProduct(o) {
  if (!o || typeof o !== 'object' || Array.isArray(o)) return false
  if (!o.name) return false
  if (o.sub && !PRODUCT_HINT.some((k) => o[k] != null)) return false // brand entries
  return PRODUCT_HINT.some((k) => o[k] != null)
}

// Collect ALL top-level const array declarations that look like product lists.
function extractProducts(code) {
  const ast = parse(code, { sourceType: 'module', plugins: ['jsx'] })
  const out = []
  traverse(ast, {
    VariableDeclarator(p) {
      if (p.node.init?.type !== 'ArrayExpression') return
      const name = p.node.id?.name
      if (!name || SKIP_ARRAYS.has(name)) return
      if (p.getFunctionParent()) return // top-level only
      const arr = evalNode(p.node.init)
      if (Array.isArray(arr) && arr.length && arr.filter(looksLikeProduct).length >= Math.ceil(arr.length / 2)) {
        for (const item of arr) if (looksLikeProduct(item)) out.push(item)
      }
    },
  })
  return out
}

// "AED 18.50 / bag" -> { price: 18.5, unit: 'bag' }
function parsePrice(raw) {
  if (raw == null) return { price: null, unit: null }
  if (typeof raw === 'number') return { price: raw, unit: null }
  const s = String(raw)
  const num = s.replace(/,/g, '').match(/(\d+(?:\.\d+)?)/)
  const unit = s.split('/')[1]?.trim() || null
  return { price: num ? Number(num[1]) : null, unit }
}

const KNOWN = new Set(['id', 'name', 'brand', 'model', 'price', 'description', 'image', 'sku', 'unit', 'features', 'specs'])

function normalize(raw, idx) {
  const { price, unit } = parsePrice(raw.price)
  const specs = {}
  for (const [k, v] of Object.entries(raw)) {
    if (!KNOWN.has(k) && v != null) specs[k] = v
  }
  if (raw.features) specs.features = raw.features
  if (typeof raw.price === 'string') specs.price_text = raw.price

  // short_specs: prefer a string `specs` field, else compose from common attrs.
  let short = typeof raw.specs === 'string' ? raw.specs : null
  if (!short) {
    short = [raw.type, raw.grade, raw.bag, raw.size].filter(Boolean).join(' · ') || null
  }

  return {
    name: raw.name || `Item ${idx + 1}`,
    brand: raw.brand || null,
    model: raw.model || null,
    sku: raw.sku || null,
    description: raw.description || null,
    short_specs: short,
    price,
    unit: unit || raw.unit || null,
    currency: 'AED',
    image_url: typeof raw.image === 'string' ? raw.image : null,
    specs,
    sort_order: idx,
  }
}

const catalog = { categories: [], products: [] }
let total = 0
CATEGORIES.forEach(([file, slug, name], ci) => {
  const fp = path.join(PAGES, file)
  if (!fs.existsSync(fp)) { console.warn('MISSING', file); return }
  const raws = extractProducts(fs.readFileSync(fp, 'utf8'))
  catalog.categories.push({ slug, name, sort_order: ci })
  raws.forEach((r, i) => {
    catalog.products.push({ category_slug: slug, ...normalize(r, i) })
  })
  console.log(`${file.padEnd(28)} ${slug.padEnd(24)} ${raws.length} products`)
  total += raws.length
})

fs.mkdirSync(OUT, { recursive: true })
fs.writeFileSync(path.join(OUT, 'catalog.json'), JSON.stringify(catalog, null, 2))
console.log(`\nTotal: ${catalog.categories.length} categories, ${total} products -> out/catalog.json`)
