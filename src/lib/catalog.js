import { supabase, hasSupabase } from './supabase'
import { productCategories } from '../data/products'

// Unified shapes used across the storefront:
//   category: { slug, name, icon, isFeatured, products: Product[] }
//   product:  { id, slug, name, model, brand, description, shortSpecs, price,
//               currency, unit, image, isFeatured, isBestseller, partner,
//               categorySlug, categoryName }
//   partner:  { id, name, slug, logo, website }

function fromStatic() {
  return productCategories.map((c, ci) => ({
    slug: c.slug,
    name: c.name,
    icon: c.icon || null,
    brands: c.brands || null,
    isFeatured: ci < 7,
    products: (c.products || []).map((p) => ({
      id: `static:${p.id}`,
      slug: null,
      name: p.name,
      model: p.model || null,
      brand: null,
      description: null,
      shortSpecs: p.specs || null,
      price: null,
      currency: 'AED',
      unit: null,
      image: null,
      isFeatured: false,
      isBestseller: false,
      partner: null,
      categorySlug: c.slug,
      categoryName: c.name,
    })),
  }))
}

function primaryImage(p) {
  const imgs = p.product_images || []
  const primary = imgs.find((i) => i.is_primary) || imgs[0]
  return primary?.url || p.image_url || null
}

function mapProduct(p, cat) {
  const partner = p.partner
    ? { id: p.partner.id, name: p.partner.name, slug: p.partner.slug, logo: p.partner.logo_url, website: p.partner.website }
    : null
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    model: p.model,
    brand: p.brand,
    description: p.description,
    shortSpecs: p.short_specs,
    price: p.price,
    currency: p.currency || 'AED',
    unit: p.unit,
    image: primaryImage(p),
    images: (p.product_images || []).map((i) => i.url),
    isFeatured: !!p.is_featured,
    isBestseller: !!p.is_bestseller,
    partner,
    categorySlug: cat?.slug || null,
    categoryName: cat?.name || null,
  }
}

const PRODUCT_SELECT =
  'id,name,slug,model,brand,description,short_specs,price,currency,unit,image_url,category_id,sort_order,is_featured,is_bestseller,partner:partners(id,name,slug,logo_url,website),product_images(url,is_primary)'

export async function fetchCatalog() {
  if (!hasSupabase) return { source: 'static', categories: fromStatic() }

  const [{ data: cats, error: e1 }, { data: prods, error: e2 }] = await Promise.all([
    supabase.from('categories').select('id,slug,name,icon,sort_order,is_featured').eq('is_active', true).order('sort_order'),
    supabase.from('products').select(PRODUCT_SELECT).eq('is_active', true).order('sort_order'),
  ])
  if (e1 || e2 || !cats?.length) return { source: 'static', categories: fromStatic() }

  const byCat = new Map(cats.map((c) => [c.id, { slug: c.slug, name: c.name, icon: c.icon, isFeatured: !!c.is_featured, products: [] }]))
  for (const p of prods || []) {
    const cat = byCat.get(p.category_id)
    if (!cat) continue
    cat.products.push(mapProduct(p, cat))
  }
  return { source: 'supabase', categories: Array.from(byCat.values()) }
}

// Flatten all products across categories into a single list.
export function flattenProducts(categories) {
  return categories.flatMap((c) => c.products)
}

// Fetch a single product by id (uuid). Returns null if not found / static mode.
export async function fetchProduct(id) {
  if (!hasSupabase || !id) return null
  const { data, error } = await supabase.from('products').select(PRODUCT_SELECT).eq('id', id).eq('is_active', true).single()
  if (error || !data) return null
  let cat = null
  if (data.category_id) {
    const { data: c } = await supabase.from('categories').select('slug,name').eq('id', data.category_id).single()
    cat = c
  }
  return mapProduct(data, cat)
}

export async function fetchPartners() {
  if (!hasSupabase) return []
  const { data } = await supabase.from('partners').select('id,name,slug,logo_url,website').eq('is_active', true).order('sort_order').order('name')
  return (data || []).map((p) => ({ id: p.id, name: p.name, slug: p.slug, logo: p.logo_url, website: p.website }))
}

const DEFAULT_WHATSAPP = '971504654613'

export async function fetchWhatsappNumber() {
  if (!hasSupabase) return DEFAULT_WHATSAPP
  const { data } = await supabase.from('settings').select('value').eq('key', 'whatsapp').single()
  const num = data?.value?.order_number
  return data?.value?.enabled === false ? null : (num || DEFAULT_WHATSAPP)
}
