import { supabase, hasSupabase } from './supabase'
import { fetchWhatsappNumber } from './catalog'

function buildMessage({ items, customer, orderNumber, subtotal, hasPrices }) {
  const lines = []
  lines.push('*New Order — Standard Group*')
  if (orderNumber) lines.push(`Order: ${orderNumber}`)
  lines.push('')
  items.forEach((it, i) => {
    const price = it.price != null ? ` — AED ${(it.price * it.qty).toFixed(2)}` : ''
    lines.push(`${i + 1}. ${it.name}${it.model ? ` (${it.model})` : ''} ×${it.qty}${price}`)
  })
  if (hasPrices) { lines.push(''); lines.push(`*Subtotal: AED ${subtotal.toFixed(2)}*`) }
  lines.push('')
  if (customer.name) lines.push(`Name: ${customer.name}`)
  if (customer.phone) lines.push(`Phone: ${customer.phone}`)
  if (customer.company) lines.push(`Company: ${customer.company}`)
  if (customer.notes) lines.push(`Notes: ${customer.notes}`)
  return lines.join('\n')
}

// Persists the order (best-effort) and returns a WhatsApp deep link.
export async function submitOrder({ items, customer }) {
  const subtotal = items.reduce((s, x) => s + (x.price ?? 0) * x.qty, 0)
  const hasPrices = items.some((x) => x.price != null)
  let orderNumber = null

  if (hasSupabase) {
    try {
      // place_order is a SECURITY DEFINER RPC: anon can atomically create the
      // order + items and get the order number, without any SELECT on orders.
      const { data, error } = await supabase.rpc('place_order', {
        p_customer: {
          name: customer.name || null,
          phone: customer.phone || null,
          email: customer.email || null,
          company: customer.company || null,
          notes: customer.notes || null,
        },
        p_items: items.map((it) => ({
          product_id: typeof it.id === 'string' && it.id.startsWith('static:') ? null : it.id,
          name: it.name,
          model: it.model,
          unit_price: it.price ?? null,
          quantity: it.qty,
        })),
      })
      if (!error && data) orderNumber = data
    } catch { /* fall through to WhatsApp-only */ }
  }

  const number = await fetchWhatsappNumber()
  const text = buildMessage({ items, customer, orderNumber, subtotal, hasPrices })
  const waUrl = `https://wa.me/${number || '971504654613'}?text=${encodeURIComponent(text)}`
  return { waUrl, orderNumber }
}
