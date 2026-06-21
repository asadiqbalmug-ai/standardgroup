import React, { useState } from 'react'
import { useAuth } from '../lib/auth.jsx'

export default function Login() {
  const { signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setBusy(true)
    const { error } = await signIn(email, password)
    setBusy(false)
    if (error) setError(error.message)
  }

  return (
    <div className="h-full grid place-items-center p-4">
      <form onSubmit={submit} className="card w-full max-w-sm p-8">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-9 h-9 rounded-full bg-brand grid place-items-center text-white font-bold">S</div>
          <div className="leading-tight">
            <p className="font-bold">Standard Group</p>
            <p className="text-[10px] uppercase tracking-wider text-gray-400">Admin Panel</p>
          </div>
        </div>
        <h1 className="text-lg font-bold mb-4">Sign in</h1>
        {error && <p className="mb-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>}
        <label className="label">Email</label>
        <input className="input mb-3" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoFocus />
        <label className="label">Password</label>
        <input className="input mb-5" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button className="btn-primary w-full" disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</button>
      </form>
    </div>
  )
}
