import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Pencil, Trash2, Search } from 'lucide-react'
import { supabase } from '../lib/supabase'

export default function Products() {
  const [rows, setRows] = useState([])
  const [cats, setCats] = useState({})
  const [loading, setLoading] = useState(true)
  const [q, setQ] = useState('')
  const [catFilter, setCatFilter] = useState('')

  const load = async () => {
    setLoading(true)
    const [{ data: products }, { data: categories }] = await Promise.all([
      supabase.from('products').select('id,name,model,price,currency,is_active,category_id,product_images(url,is_primary)').order('created_at', { ascending: false }),
      supabase.from('categories').select('id,name'),
    ])
    setRows(products ?? [])
    setCats(Object.fromEntries((categories ?? []).map((c) => [c.id, c.name])))
    setLoading(false)
  }
  useEffect(() => { load() }, [])

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      if (catFilter && r.category_id !== catFilter) return false
      if (q && !`${r.name} ${r.model ?? ''}`.toLowerCase().includes(q.toLowerCase())) return false
      return true
    })
  }, [rows, q, catFilter])

  const remove = async (r) => {
    if (!confirm(`Delete product "${r.name}"? This also removes its images.`)) return
    const { error } = await supabase.from('products').delete().eq('id', r.id)
    if (error) alert(error.message); else load()
  }

  const thumb = (r) => {
    const imgs = r.product_images || []
    return (imgs.find((i) => i.is_primary) || imgs[0])?.url
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link to="/products/new" className="btn-primary"><Plus size={16} /> New product</Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="flex items-center gap-2 card px-3 flex-1">
          <Search size={16} className="text-gray-400" />
          <input className="py-2 outline-none w-full text-sm bg-transparent" placeholder="Search name or model…" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <select className="input sm:w-56" value={catFilter} onChange={(e) => setCatFilter(e.target.value)}>
          <option value="">All categories</option>
          {Object.entries(cats).map(([id, name]) => <option key={id} value={id}>{name}</option>)}
        </select>
      </div>

      <div className="card overflow-x-auto">
        {loading ? (
          <p className="p-6 text-gray-500">Loading…</p>
        ) : filtered.length === 0 ? (
          <p className="p-6 text-gray-500">No products.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-500 uppercase text-xs">
              <tr>
                <th className="px-4 py-3"></th><th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Category</th><th className="px-4 py-3">Model</th>
                <th className="px-4 py-3">Price</th><th className="px-4 py-3">Active</th><th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">
                    {thumb(r)
                      ? <img src={thumb(r)} alt="" className="w-10 h-10 rounded object-cover bg-gray-100" />
                      : <div className="w-10 h-10 rounded bg-gray-100 grid place-items-center text-gray-300 text-xs">—</div>}
                  </td>
                  <td className="px-4 py-3 font-medium">{r.name}</td>
                  <td className="px-4 py-3 text-gray-500">{cats[r.category_id] ?? '—'}</td>
                  <td className="px-4 py-3 text-gray-500">{r.model ?? '—'}</td>
                  <td className="px-4 py-3">{r.price != null ? `${r.currency} ${r.price}` : <span className="text-gray-400">—</span>}</td>
                  <td className="px-4 py-3">{r.is_active ? 'Yes' : 'No'}</td>
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <Link to={`/products/${r.id}`} className="p-1.5 inline-block text-gray-500 hover:text-brand"><Pencil size={16} /></Link>
                    <button className="p-1.5 text-gray-500 hover:text-red-600" onClick={() => remove(r)}><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
