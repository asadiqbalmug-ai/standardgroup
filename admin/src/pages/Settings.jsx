import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Settings() {
  const [whatsapp, setWhatsapp] = useState({ order_number: '', enabled: true })
  const [store, setStore] = useState({ name: '', currency: 'AED' })
  const [loading, setLoading] = useState(true)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    ;(async () => {
      const { data } = await supabase.from('settings').select('key,value')
      const map = Object.fromEntries((data ?? []).map((r) => [r.key, r.value]))
      if (map.whatsapp) setWhatsapp({ order_number: '', enabled: true, ...map.whatsapp })
      if (map.store) setStore({ name: '', currency: 'AED', ...map.store })
      setLoading(false)
    })()
  }, [])

  const save = async (e) => {
    e.preventDefault()
    setError(''); setSaved(false)
    const { error } = await supabase.from('settings').upsert([
      { key: 'whatsapp', value: { order_number: whatsapp.order_number.replace(/[^0-9]/g, ''), enabled: !!whatsapp.enabled } },
      { key: 'store', value: { name: store.name, currency: store.currency } },
    ])
    if (error) setError(error.message)
    else { setSaved(true); setTimeout(() => setSaved(false), 2500) }
  }

  if (loading) return <p className="text-gray-500">Loading…</p>

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold mb-5">Settings</h1>
      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
      {saved && <p className="mb-4 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2">Saved.</p>}
      <form onSubmit={save} className="card p-6 space-y-5">
        <div>
          <h2 className="font-bold mb-2">WhatsApp checkout</h2>
          <label className="label">Order recipient number (international, digits only)</label>
          <input className="input" value={whatsapp.order_number} onChange={(e) => setWhatsapp({ ...whatsapp, order_number: e.target.value })} placeholder="971504654613" />
          <label className="flex items-center gap-2 mt-3 text-sm">
            <input type="checkbox" checked={!!whatsapp.enabled} onChange={(e) => setWhatsapp({ ...whatsapp, enabled: e.target.checked })} /> WhatsApp checkout enabled
          </label>
        </div>
        <div className="border-t border-gray-100 pt-5">
          <h2 className="font-bold mb-2">Store</h2>
          <label className="label">Store name</label>
          <input className="input mb-3" value={store.name} onChange={(e) => setStore({ ...store, name: e.target.value })} />
          <label className="label">Currency</label>
          <input className="input w-28" value={store.currency} onChange={(e) => setStore({ ...store, currency: e.target.value })} />
        </div>
        <div className="flex justify-end">
          <button className="btn-primary">Save settings</button>
        </div>
      </form>
    </div>
  )
}
