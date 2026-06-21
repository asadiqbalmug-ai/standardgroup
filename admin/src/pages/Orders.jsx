import React, { useEffect, useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { supabase } from '../lib/supabase'

const STATUSES = ['new', 'contacted', 'confirmed', 'fulfilled', 'cancelled']
const statusColor = {
  new: 'bg-blue-100 text-blue-700',
  contacted: 'bg-amber-100 text-amber-700',
  confirmed: 'bg-indigo-100 text-indigo-700',
  fulfilled: 'bg-green-100 text-green-700',
  cancelled: 'bg-gray-200 text-gray-600',
}

export default function Orders() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(null)

  const load = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('orders')
      .select('*, order_items(*)')
      .order('created_at', { ascending: false })
    setRows(data ?? [])
    setLoading(false)
  }
  useEffect(() => { load() }, [])

  const setStatus = async (order, status) => {
    const { error } = await supabase.from('orders').update({ status }).eq('id', order.id)
    if (error) alert(error.message)
    else setRows((rs) => rs.map((r) => (r.id === order.id ? { ...r, status } : r)))
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">Orders</h1>
      <div className="card overflow-hidden">
        {loading ? (
          <p className="p-6 text-gray-500">Loading…</p>
        ) : rows.length === 0 ? (
          <p className="p-6 text-gray-500">No orders yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-500 uppercase text-xs">
              <tr>
                <th className="px-4 py-3"></th><th className="px-4 py-3">Order</th>
                <th className="px-4 py-3">Customer</th><th className="px-4 py-3">Items</th>
                <th className="px-4 py-3">Total</th><th className="px-4 py-3">Date</th><th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rows.map((o) => (
                <React.Fragment key={o.id}>
                  <tr className="hover:bg-gray-50 cursor-pointer" onClick={() => setOpen(open === o.id ? null : o.id)}>
                    <td className="px-4 py-3 text-gray-400">{open === o.id ? <ChevronDown size={16} /> : <ChevronRight size={16} />}</td>
                    <td className="px-4 py-3 font-medium">{o.order_number}</td>
                    <td className="px-4 py-3">{o.customer_name || '—'}<div className="text-xs text-gray-400">{o.customer_phone}</div></td>
                    <td className="px-4 py-3">{o.order_items?.length ?? 0}</td>
                    <td className="px-4 py-3">{o.total != null ? `${o.currency} ${o.total}` : '—'}</td>
                    <td className="px-4 py-3 text-gray-500">{new Date(o.created_at).toLocaleDateString()}</td>
                    <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                      <select className={`text-xs font-semibold rounded-full px-2 py-1 ${statusColor[o.status]}`} value={o.status} onChange={(e) => setStatus(o, e.target.value)}>
                        {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                  </tr>
                  {open === o.id && (
                    <tr className="bg-gray-50/60">
                      <td></td>
                      <td colSpan={6} className="px-4 py-3">
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs font-semibold uppercase text-gray-400 mb-1">Customer</p>
                            <p>{o.customer_name}</p>
                            <p className="text-gray-500">{o.customer_phone}</p>
                            <p className="text-gray-500">{o.customer_email}</p>
                            <p className="text-gray-500">{o.customer_company}</p>
                            {o.notes && <p className="mt-2 text-gray-600">“{o.notes}”</p>}
                          </div>
                          <div>
                            <p className="text-xs font-semibold uppercase text-gray-400 mb-1">Items</p>
                            <ul className="space-y-1">
                              {o.order_items?.map((it) => (
                                <li key={it.id} className="flex justify-between">
                                  <span>{it.quantity}× {it.name} {it.model ? `(${it.model})` : ''}</span>
                                  <span className="text-gray-500">{it.unit_price != null ? `${o.currency} ${it.line_total ?? it.unit_price}` : ''}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
