import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Trash2, Pencil, Building2 } from 'lucide-react'
import { supabase } from '../lib/supabase'

const BUCKET = 'partners'

export default function Partners() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    const { data } = await supabase.from('partners').select('*').order('sort_order').order('name')
    setRows(data ?? [])
    setLoading(false)
  }
  useEffect(() => { load() }, [])

  const remove = async (r) => {
    if (!confirm(`Delete partner "${r.name}"? Products keep existing but lose this partner link.`)) return
    if (r.logo_path) await supabase.storage.from(BUCKET).remove([r.logo_path])
    const { error } = await supabase.from('partners').delete().eq('id', r.id)
    if (error) alert(error.message); else load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-bold">Partners &amp; brands</h1>
        <Link className="btn-primary" to="/partners/new"><Plus size={16} /> New partner</Link>
      </div>

      <div className="card overflow-hidden">
        {loading ? (
          <p className="p-6 text-gray-500">Loading…</p>
        ) : rows.length === 0 ? (
          <p className="p-6 text-gray-500">No partners yet. Add your first brand.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-500 uppercase text-xs">
              <tr>
                <th className="px-4 py-3">Logo</th><th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Order</th><th className="px-4 py-3">Featured</th>
                <th className="px-4 py-3">Active</th><th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rows.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    {r.logo_url
                      ? <img src={r.logo_url} alt={r.name} className="h-9 w-16 object-contain bg-gray-50 rounded" />
                      : <div className="h-9 w-16 grid place-items-center bg-gray-100 rounded text-gray-300"><Building2 size={16} /></div>}
                  </td>
                  <td className="px-4 py-3 font-medium">{r.name}</td>
                  <td className="px-4 py-3">{r.sort_order}</td>
                  <td className="px-4 py-3">{r.is_featured ? 'Yes' : 'No'}</td>
                  <td className="px-4 py-3">{r.is_active ? 'Yes' : 'No'}</td>
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <Link className="p-1.5 inline-block text-gray-500 hover:text-brand" to={`/partners/${r.id}`}><Pencil size={16} /></Link>
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
