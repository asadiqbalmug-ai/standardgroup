import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { ArrowLeft, Upload, Building2, Trash2 } from 'lucide-react'
import { supabase } from '../lib/supabase'

const BUCKET = 'partners'
const slugify = (s) => (s || '').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

const empty = {
  name: '', slug: '', website: '', description: '',
  sort_order: 0, is_active: true, is_featured: true,
  logo_url: '', logo_path: '',
}

export default function PartnerForm() {
  const { id } = useParams()
  const isNew = !id
  const navigate = useNavigate()
  const fileRef = useRef(null)

  const [form, setForm] = useState(empty)
  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (isNew) return
    ;(async () => {
      const { data, error } = await supabase.from('partners').select('*').eq('id', id).single()
      if (error) { setError(error.message); setLoading(false); return }
      setForm({ ...empty, ...data })
      setLoading(false)
    })()
  }, [id, isNew])

  const payload = () => ({
    name: form.name,
    slug: form.slug ? slugify(form.slug) : slugify(form.name),
    website: form.website || null,
    description: form.description || null,
    sort_order: Number(form.sort_order) || 0,
    is_active: !!form.is_active,
    is_featured: !!form.is_featured,
  })

  // Upload a logo to partners/<partnerId>/<file> and persist its public URL.
  const uploadLogo = async (partnerId, file) => {
    const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
    const path = `${partnerId}/${Date.now()}-${safe}`
    const up = await supabase.storage.from(BUCKET).upload(path, file, { upsert: false })
    if (up.error) throw up.error
    const { data: pub } = supabase.storage.from(BUCKET).getPublicUrl(path)
    return { logo_url: pub.publicUrl, logo_path: path }
  }

  const save = async (e) => {
    e.preventDefault()
    setError(''); setSaving(true)
    try {
      const file = fileRef.current?.files?.[0]
      let partnerId = id
      if (isNew) {
        const { data, error } = await supabase.from('partners').insert(payload()).select('id').single()
        if (error) throw error
        partnerId = data.id
      } else {
        const { error } = await supabase.from('partners').update(payload()).eq('id', id)
        if (error) throw error
      }
      if (file) {
        if (!isNew && form.logo_path) await supabase.storage.from(BUCKET).remove([form.logo_path])
        const logo = await uploadLogo(partnerId, file)
        const { error } = await supabase.from('partners').update(logo).eq('id', partnerId)
        if (error) throw error
      }
      navigate('/partners')
    } catch (err) {
      setError(err.message || 'Save failed')
      setSaving(false)
    }
  }

  const removeLogo = async () => {
    if (!form.logo_path) { setForm({ ...form, logo_url: '', logo_path: '' }); return }
    if (!confirm('Remove this logo?')) return
    await supabase.storage.from(BUCKET).remove([form.logo_path])
    await supabase.from('partners').update({ logo_url: null, logo_path: null }).eq('id', id)
    setForm({ ...form, logo_url: '', logo_path: '' })
  }

  if (loading) return <p className="text-gray-500">Loading…</p>

  return (
    <div>
      <Link to="/partners" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-brand mb-4"><ArrowLeft size={16} /> Partners</Link>
      <h1 className="text-2xl font-bold mb-5">{isNew ? 'New partner' : 'Edit partner'}</h1>
      {error && <p className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>}

      <form onSubmit={save} className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card p-6 space-y-4">
          <div><label className="label">Name *</label>
            <input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="label">Slug (optional)</label>
              <input className="input" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="auto from name" /></div>
            <div><label className="label">Website</label>
              <input className="input" value={form.website || ''} onChange={(e) => setForm({ ...form, website: e.target.value })} placeholder="https://…" /></div>
          </div>
          <div><label className="label">Description</label>
            <textarea className="input" rows={3} value={form.description || ''} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
          <div className="grid sm:grid-cols-3 gap-4 items-end">
            <div><label className="label">Sort order</label>
              <input className="input" type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: e.target.value })} /></div>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={!!form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} /> Active</label>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={!!form.is_featured} onChange={(e) => setForm({ ...form, is_featured: e.target.checked })} /> Featured</label>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Link to="/partners" className="btn-ghost">Cancel</Link>
            <button className="btn-primary" disabled={saving}>{saving ? 'Saving…' : 'Save partner'}</button>
          </div>
        </div>

        <div className="card p-6">
          <h2 className="font-bold mb-3">Logo</h2>
          <div className="aspect-video w-full grid place-items-center bg-gray-50 rounded-lg mb-3 overflow-hidden border border-gray-100">
            {form.logo_url
              ? <img src={form.logo_url} alt={form.name} className="max-h-full max-w-full object-contain p-2" />
              : <Building2 size={32} className="text-gray-300" />}
          </div>
          <input ref={fileRef} type="file" accept="image/*" className="block w-full text-xs text-gray-500 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-gray-100 file:text-gray-700 file:font-medium" onChange={() => setForm({ ...form })} />
          <p className="text-[11px] text-gray-400 mt-2">PNG/SVG with transparent background works best. Stored in the <code>partners</code> bucket. Saved when you press Save.</p>
          {form.logo_url && !isNew && (
            <button type="button" onClick={removeLogo} className="mt-3 inline-flex items-center gap-1 text-xs text-red-600 hover:underline"><Trash2 size={14} /> Remove logo</button>
          )}
        </div>
      </form>
    </div>
  )
}
