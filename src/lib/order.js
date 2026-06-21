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
      const { data: order, error } = await supabase.from('orders').insert({
        customer_name: customer.name || null,
        customer_phone: customer.phone || null,
        customer_email: customer.email || null,
        customer_company: customer.company || null,
        notes: customer.notes || null,
        channel: 'whatsapp',
        subtotal: hasPrices ? subtotal : null,
        total: hasPrices ? subtotal : null,
        currency: 'AED',
      }).select('id, order_number').single()
      if (!error && order) {
        orderNumber = order.order_number
        const rows = items.map((it) => ({
          order_id: order.id,
          product_id: typeof it.id === 'string' && it.id.startsWith('static:') ? null : it.id,
          name: it.name, model: it.model,
          unit_price: it.price ?? null, quantity: it.qty,
          line_total: it.price != null ? it.price * it.qty : null,
        }))
        await supabase.from('order_items').insert(rows)
      }
    } catch { /* fall through to WhatsApp-only */ }
  }

  const number = await fetchWhatsappNumber()
  const text = buildMessage({ items, customer, orderNumber, subtotal, hasPrices })
  const waUrl = `https://wa.me/${number || '971504654613'}?text=${encodeURIComponent(text)}`
  return { waUrl, orderNumber }
}
