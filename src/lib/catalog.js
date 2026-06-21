import { supabase, hasSupabase } from './supabase'
import { productCategories } from '../data/products'

// Unified shapes used across the storefront:
//   category: { slug, name, icon, products: Product[] }
//   product:  { id, name, model, brand, description, shortSpecs, price,
//               currency, unit, image, categorySlug, categoryName }

function fromStatic() {
  return productCategories.map((c) => ({
    slug: c.slug,
    name: c.name,
    icon: c.icon || null,
    brands: c.brands || null,
    products: (c.products || []).map((p) => ({
      id: `static:${p.id}`,
      name: p.name,
      model: p.model || null,
      brand: null,
      description: null,
      shortSpecs: p.specs || null,
      price: null,
      currency: 'AED',
      unit: null,
      image: null,
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

export async function fetchCatalog() {
  if (!hasSupabase) return { source: 'static', categories: fromStatic() }

  const [{ data: cats, error: e1 }, { data: prods, error: e2 }] = await Promise.all([
    supabase.from('categories').select('id,slug,name,icon,sort_order').eq('is_active', true).order('sort_order'),
    supabase.from('products')
      .select('id,name,model,brand,description,short_specs,price,currency,unit,image_url,category_id,sort_order,product_images(url,is_primary)')
      .eq('is_active', true).order('sort_order'),
  ])
  if (e1 || e2 || !cats?.length) return { source: 'static', categories: fromStatic() }

  const byCat = new Map(cats.map((c) => [c.id, { slug: c.slug, name: c.name, icon: c.icon, products: [] }]))
  for (const p of prods || []) {
    const cat = byCat.get(p.category_id)
    if (!cat) continue
    cat.products.push({
      id: p.id,
      name: p.name,
      model: p.model,
      brand: p.brand,
      description: p.description,
      shortSpecs: p.short_specs,
      price: p.price,
      currency: p.currency || 'AED',
      unit: p.unit,
      image: primaryImage(p),
      categorySlug: cat.slug,
      categoryName: cat.name,
    })
  }
  return { source: 'supabase', categories: Array.from(byCat.values()) }
}

const DEFAULT_WHATSAPP = '971504654613'

export async function fetchWhatsappNumber() {
  if (!hasSupabase) return DEFAULT_WHATSAPP
  const { data } = await supabase.from('settings').select('value').eq('key', 'whatsapp').single()
  const num = data?.value?.order_number
  return data?.value?.enabled === false ? null : (num || DEFAULT_WHATSAPP)
}
