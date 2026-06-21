import React, { useEffect, useState } from 'react'
import { Plus, X, Trash2 } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../lib/auth.jsx'
import { SECTIONS } from '../lib/auth.jsx'

const PERM_LABELS = {
  products: 'Products', categories: 'Categories', orders: 'Orders',
  staff: 'Staff', settings: 'Settings',
}
const blankNew = { email: '', password: '', full_name: '', role: 'staff', permissions: {} }

export default function Staff() {
  const { profile: me } = useAuth()
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [form, setForm] = useState(blankNew)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const load = async () => {
    setLoading(true)
    const { data } = await supabase.from('profiles')
      .select('id,email,full_name,role,is_active,permissions').order('created_at', { ascending: false })
    setRows(data ?? [])
    setLoading(false)
  }
  useEffect(() => { load() }, [])

  const create = async (e) => {
    e.preventDefault()
    setError(''); setBusy(true)
    const { data, error } = await supabase.functions.invoke('create-staff', { body: form })
    setBusy(false)
    if (error || data?.error) { setError(data?.error || error.message); return }
    setCreating(false); setForm(blankNew); load()
  }

  const togglePerm = async (row, section) => {
    const perms = { ...(row.permissions || {}), [section]: !row.permissions?.[section] }
    const { error } = await supabase.from('profiles').update({ permissions: perms }).eq('id', row.id)
    if (error) alert(error.message); else load()
  }

  const setRole = async (row, role) => {
    const { error } = await supabase.from('profiles').update({ role }).eq('id', row.id)
    if (error) alert(error.message); else load()
  }

  const toggleActive = async (row) => {
    const { error } = await supabase.from('profiles').update({ is_active: !row.is_active }).eq('id', row.id)
    if (error) alert(error.message); else load()
  }

  const remove = async (row) => {
    if (!confirm(`Remove ${row.email}? This deletes their profile (auth user removal is manual in Supabase).`)) return
    const { error } = await supabase.from('profiles').delete().eq('id', row.id)
    if (error) alert(error.message); else load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-bold">Staff &amp; permissions</h1>
        <button className="btn-primary" onClick={() => { setForm(blankNew); setError(''); setCreating(true) }}><Plus size={16} /> New user</button>
      </div>

      <div className="card overflow-x-auto">
        {loading ? <p className="p-6 text-gray-500">Loading…</p> : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-500 uppercase text-xs">
              <tr>
                <th className="px-4 py-3">User</th><th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Permissions</th><th className="px-4 py-3">Active</th><th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rows.map((r) => {
                const self = r.id === me?.id
                return (
                  <tr key={r.id} className="hover:bg-gray-50 align-top">
                    <td className="px-4 py-3">
                      <div className="font-medium">{r.full_name || '—'}</div>
                      <div className="text-xs text-gray-400">{r.email}</div>
                    </td>
                    <td className="px-4 py-3">
                      <select className="input py-1 text-xs w-24" value={r.role} disabled={self} onChange={(e) => setRole(r, e.target.value)}>
                        <option value="admin">admin</option>
                        <option value="staff">staff</option>
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      {r.role === 'admin' ? (
                        <span className="text-xs text-gray-400">Full access</span>
                      ) : (
                        <div className="flex flex-wrap gap-1.5">
                          {SECTIONS.map((s) => (
                            <label key={s} className={`text-xs px-2 py-1 rounded-full cursor-pointer border ${r.permissions?.[s] ? 'bg-brand text-white border-brand' : 'bg-white text-gray-500 border-gray-300'}`}>
                              <input type="checkbox" className="hidden" checked={!!r.permissions?.[s]} onChange={() => togglePerm(r, s)} />
                              {PERM_LABELS[s]}
                            </label>
                          ))}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <button disabled={self} onClick={() => toggleActive(r)} className={`text-xs font-semibold rounded-full px-2 py-1 ${r.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>
                        {r.is_active ? 'Active' : 'Disabled'}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-right">
                      {!self && <button className="p-1.5 text-gray-500 hover:text-red-600" onClick={() => remove(r)}><Trash2 size={16} /></button>}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>

      {creating && (
        <div className="fixed inset-0 z-50 bg-black/40 grid place-items-center p-4" onClick={() => setCreating(false)}>
          <form onClick={(e) => e.stopPropagation()} onSubmit={create} className="card w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-lg">New user</h2>
              <button type="button" onClick={() => setCreating(false)}><X size={18} /></button>
            </div>
            {error && <p className="mb-3 text-sm text-red-600">{error}</p>}
            <label className="label">Full name</label>
            <input className="input mb-3" value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} />
            <label className="label">Email</label>
            <input className="input mb-3" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            <label className="label">Password (min 8 chars)</label>
            <input className="input mb-3" type="text" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} minLength={8} required />
            <label className="label">Role</label>
            <select className="input mb-3" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
              <option value="staff">Staff</option>
              <option value="admin">Admin (full access)</option>
            </select>
            {form.role === 'staff' && (
              <div className="mb-4">
                <label className="label">Permissions</label>
                <div className="flex flex-wrap gap-1.5">
                  {SECTIONS.map((s) => (
                    <label key={s} className={`text-xs px-2 py-1 rounded-full cursor-pointer border ${form.permissions?.[s] ? 'bg-brand text-white border-brand' : 'bg-white text-gray-500 border-gray-300'}`}>
                      <input type="checkbox" className="hidden" checked={!!form.permissions?.[s]} onChange={() => setForm({ ...form, permissions: { ...form.permissions, [s]: !form.permissions?.[s] } })} />
                      {PERM_LABELS[s]}
                    </label>
                  ))}
                </div>
              </div>
            )}
            <div className="flex justify-end gap-2">
              <button type="button" className="btn-ghost" onClick={() => setCreating(false)}>Cancel</button>
              <button className="btn-primary" disabled={busy}>{busy ? 'Creating…' : 'Create user'}</button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
