import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { ArrowLeft, Upload, Star, Trash2 } from 'lucide-react'
import { supabase } from '../lib/supabase'

const BUCKET = 'product-images'
const slugify = (s) => (s || '').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

const emptyProduct = {
  name: '', model: '', sku: '', brand: '', description: '', short_specs: '',
  price: '', currency: 'AED', unit: '', stock: '', category_id: '', partner_id: '',
  is_active: true, is_featured: false, is_bestseller: false, sort_order: 0,
}

export default function ProductForm() {
  const { id } = useParams()
  const isNew = !id
  const navigate = useNavigate()
  const fileRef = useRef(null)

  const [form, setForm] = useState(emptyProduct)
  const [cats, setCats] = useState([])
  const [partners, setPartners] = useState([])
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    supabase.from('categories').select('id,name,slug').order('name').then(({ data }) => setCats(data ?? []))
    supabase.from('partners').select('id,name').order('name').then(({ data }) => setPartners(data ?? []))
  }, [])

  const loadImages = async (pid) => {
    const { data } = await supabase.from('product_images').select('*').eq('product_id', pid).order('sort_order')
    setImages(data ?? [])
  }

  useEffect(() => {
    if (isNew) return
    ;(async () => {
      const { data, error } = await supabase.from('products').select('*').eq('id', id).single()
      if (error) { setError(error.message); setLoading(false); return }
      setForm({ ...emptyProduct, ...data, price: data.price ?? '', stock: data.stock ?? '' })
      await loadImages(id)
      setLoading(false)
    })()
  }, [id, isNew])

  const buildPayload = () => ({
    name: form.name,
    slug: form.slug ? slugify(form.slug) : slugify(form.name),
    model: form.model || null,
    sku: form.sku || null,
    brand: form.brand || null,
    description: form.description || null,
    short_specs: form.short_specs || null,
    price: form.price === '' ? null : Number(form.price),
    currency: form.currency || 'AED',
    unit: form.unit || null,
    stock: form.stock === '' ? null : Number(form.stock),
    category_id: form.category_id || null,
    partner_id: form.partner_id || null,
    is_active: !!form.is_active,
    is_featured: !!form.is_featured,
    is_bestseller: !!form.is_bestseller,
    sort_order: Number(form.sort_order) || 0,
  })

  const save = async (e) => {
    e.preventDefault()
    setError(''); setSaving(true)
    const payload = buildPayload()
    if (isNew) {
      const { data, error } = await supabase.from('products').insert(payload).select('id').single()
      setSaving(false)
      if (error) { setError(error.message); return }
      navigate(`/products/${data.id}`, { replace: true })
    } else {
      const { error } = await supabase.from('products').update(payload).eq('id', id)
      setSaving(false)
      if (error) { setError(error.message); return }
      navigate('/products')
    }
  }

  // Nested storage path: <category-slug>/<product-id>/<file>
  const onUpload = async (e) => {
    const files = Array.from(e.target.files || [])
    if (!files.length || isNew) return
    setUploading(true); setError('')
    const cat = cats.find((c) => c.id === form.category_id)
    const folder = `${cat?.slug || 'uncategorized'}/${id}`
    try {
      for (const file of files) {
        const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
        const path = `${folder}/${Date.now()}-${safe}`
        const up = await supabase.storage.from(BUCKET).upload(path, file, { upsert: false })
        if (up.error) throw up.error
        const { data: pub } = supabase.storage.from(BUCKET).getPublicUrl(path)
        const isFirst = images.length === 0
        const ins = await supabase.from('product_images').insert({
          product_id: id, storage_path: path, url: pub.publicUrl,
          alt: form.name, is_primary: isFirst, sort_order: images.length,
        })
        if (ins.error) throw ins.error
        await loadImages(id)
      }
    } catch (err) {
      setError(err.message || 'Upload failed')
    } finally {
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  const makePrimary = async (img) => {
    await supabase.from('product_images').update({ is_primary: false }).eq('product_id', id)
    await supabase.from('product_images').update({ is_primary: true }).eq('id', img.id)
    loadImages(id)
  }

  const deleteImage = async (img) => {
    if (!confirm('Delete this image?')) return
    await supabase.storage.from(BUCKET).remove([img.storage_path])
    await supabase.from('product_images').delete().eq('id', img.id)
    loadImages(id)
  }

  if (loading) return <p className="text-gray-500">Loading…</p>

  return (
    <div>
      <Link to="/products" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-brand mb-4"><ArrowLeft size={16} /> Products</Link>
      <h1 className="text-2xl font-bold mb-5">{isNew ? 'New product' : 'Edit product'}</h1>
      {error && <p className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>}

      <div className="grid lg:grid-cols-3 gap-6">
        <form onSubmit={save} className="lg:col-span-2 card p-6 space-y-4">
          <div>
            <label className="label">Name *</label>
            <input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="label">Category</label>
              <select className="input" value={form.category_id || ''} onChange={(e) => setForm({ ...form, category_id: e.target.value })}>
                <option value="">— none —</option>
                {cats.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div><label className="label">Model</label>
              <input className="input" value={form.model || ''} onChange={(e) => setForm({ ...form, model: e.target.value })} /></div>
            <div><label className="label">Brand</label>
              <input className="input" value={form.brand || ''} onChange={(e) => setForm({ ...form, brand: e.target.value })} /></div>
            <div><label className="label">Partner</label>
              <select className="input" value={form.partner_id || ''} onChange={(e) => setForm({ ...form, partner_id: e.target.value })}>
                <option value="">— none —</option>
                {partners.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>
            <div><label className="label">SKU</label>
              <input className="input" value={form.sku || ''} onChange={(e) => setForm({ ...form, sku: e.target.value })} /></div>
          </div>
          <div><label className="label">Short specs (one line shown on cards)</label>
            <input className="input" value={form.short_specs || ''} onChange={(e) => setForm({ ...form, short_specs: e.target.value })} /></div>
          <div><label className="label">Description</label>
            <textarea className="input" rows={4} value={form.description || ''} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
          <div className="grid sm:grid-cols-4 gap-4">
            <div><label className="label">Price (AED)</label>
              <input className="input" type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="—" /></div>
            <div><label className="label">Unit</label>
              <input className="input" value={form.unit || ''} onChange={(e) => setForm({ ...form, unit: e.target.value })} placeholder="piece, bag, ton" /></div>
            <div><label className="label">Stock</label>
              <input className="input" type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} placeholder="—" /></div>
            <div><label className="label">Sort order</label>
              <input className="input" type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: e.target.value })} /></div>
          </div>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={!!form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} /> Active (visible on site)</label>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={!!form.is_featured} onChange={(e) => setForm({ ...form, is_featured: e.target.checked })} /> Featured</label>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={!!form.is_bestseller} onChange={(e) => setForm({ ...form, is_bestseller: e.target.checked })} /> Best seller</label>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Link to="/products" className="btn-ghost">Cancel</Link>
            <button className="btn-primary" disabled={saving}>{saving ? 'Saving…' : 'Save product'}</button>
          </div>
        </form>

        <div className="card p-6">
          <h2 className="font-bold mb-1">Images</h2>
          {isNew ? (
            <p className="text-sm text-gray-500">Save the product first, then add images.</p>
          ) : (
            <>
              <p className="text-xs text-gray-400 mb-3">Stored under <code>{(cats.find((c) => c.id === form.category_id)?.slug) || 'uncategorized'}/{id}/</code></p>
              <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={onUpload} />
              <button type="button" className="btn-ghost w-full mb-4" onClick={() => fileRef.current?.click()} disabled={uploading}>
                <Upload size={16} /> {uploading ? 'Uploading…' : 'Upload images'}
              </button>
              <div className="grid grid-cols-3 gap-2">
                {images.map((img) => (
                  <div key={img.id} className="relative group">
                    <img src={img.url} alt={img.alt || ''} className="w-full aspect-square object-cover rounded-lg bg-gray-100" />
                    {img.is_primary && <span className="absolute top-1 left-1 bg-brand text-white text-[9px] px-1.5 py-0.5 rounded">Primary</span>}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-1">
                      {!img.is_primary && <button type="button" onClick={() => makePrimary(img)} title="Make primary" className="p-1.5 bg-white rounded text-gray-700"><Star size={14} /></button>}
                      <button type="button" onClick={() => deleteImage(img)} title="Delete" className="p-1.5 bg-white rounded text-red-600"><Trash2 size={14} /></button>
                    </div>
                  </div>
                ))}
                {images.length === 0 && <p className="col-span-3 text-sm text-gray-400">No images yet.</p>}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
