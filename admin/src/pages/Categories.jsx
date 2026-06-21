import React, { useEffect, useState } from 'react'
import { Plus, Trash2, Pencil, X } from 'lucide-react'
import { supabase } from '../lib/supabase'

const slugify = (s) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

const empty = { name: '', slug: '', description: '', icon: '', sort_order: 0, is_active: true }

export default function Categories() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null) // null | {} (new) | row
  const [form, setForm] = useState(empty)
  const [error, setError] = useState('')

  const load = async () => {
    setLoading(true)
    const { data } = await supabase.from('categories').select('*').order('sort_order').order('name')
    setRows(data ?? [])
    setLoading(false)
  }
  useEffect(() => { load() }, [])

  const openNew = () => { setForm(empty); setEditing({}); setError('') }
  const openEdit = (r) => { setForm({ ...r }); setEditing(r); setError('') }

  const save = async (e) => {
    e.preventDefault()
    setError('')
    const payload = {
      name: form.name,
      slug: form.slug ? slugify(form.slug) : slugify(form.name),
      description: form.description || null,
      icon: form.icon || null,
      sort_order: Number(form.sort_order) || 0,
      is_active: !!form.is_active,
    }
    const res = editing?.id
      ? await supabase.from('categories').update(payload).eq('id', editing.id)
      : await supabase.from('categories').insert(payload)
    if (res.error) { setError(res.error.message); return }
    setEditing(null)
    load()
  }

  const remove = async (r) => {
    if (!confirm(`Delete category "${r.name}"? Products keep existing but lose this category.`)) return
    const { error } = await supabase.from('categories').delete().eq('id', r.id)
    if (error) alert(error.message); else load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-bold">Categories</h1>
        <button className="btn-primary" onClick={openNew}><Plus size={16} /> New category</button>
      </div>

      <div className="card overflow-hidden">
        {loading ? (
          <p className="p-6 text-gray-500">Loading…</p>
        ) : rows.length === 0 ? (
          <p className="p-6 text-gray-500">No categories yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-500 uppercase text-xs">
              <tr><th className="px-4 py-3">Name</th><th className="px-4 py-3">Slug</th><th className="px-4 py-3">Order</th><th className="px-4 py-3">Active</th><th className="px-4 py-3"></th></tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rows.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{r.icon} {r.name}</td>
                  <td className="px-4 py-3 text-gray-500">{r.slug}</td>
                  <td className="px-4 py-3">{r.sort_order}</td>
                  <td className="px-4 py-3">{r.is_active ? 'Yes' : 'No'}</td>
                  <td className="px-4 py-3 text-right">
                    <button className="p-1.5 text-gray-500 hover:text-brand" onClick={() => openEdit(r)}><Pencil size={16} /></button>
                    <button className="p-1.5 text-gray-500 hover:text-red-600" onClick={() => remove(r)}><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 bg-black/40 grid place-items-center p-4" onClick={() => setEditing(null)}>
          <form onClick={(e) => e.stopPropagation()} onSubmit={save} className="card w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-lg">{editing.id ? 'Edit' : 'New'} category</h2>
              <button type="button" onClick={() => setEditing(null)}><X size={18} /></button>
            </div>
            {error && <p className="mb-3 text-sm text-red-600">{error}</p>}
            <label className="label">Name</label>
            <input className="input mb-3" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            <label className="label">Slug (optional)</label>
            <input className="input mb-3" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="auto from name" />
            <label className="label">Icon (emoji, optional)</label>
            <input className="input mb-3" value={form.icon || ''} onChange={(e) => setForm({ ...form, icon: e.target.value })} />
            <label className="label">Description</label>
            <textarea className="input mb-3" rows={2} value={form.description || ''} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <div className="flex gap-3 mb-4">
              <div className="flex-1">
                <label className="label">Sort order</label>
                <input className="input" type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: e.target.value })} />
              </div>
              <label className="flex items-center gap-2 mt-6 text-sm">
                <input type="checkbox" checked={!!form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} /> Active
              </label>
            </div>
            <div className="flex justify-end gap-2">
              <button type="button" className="btn-ghost" onClick={() => setEditing(null)}>Cancel</button>
              <button className="btn-primary">Save</button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
