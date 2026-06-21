import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { supabase } from './supabase'

const AuthCtx = createContext(null)

// Sections gated by per-user permission flags. Admin implicitly has all.
export const SECTIONS = ['products', 'categories', 'orders', 'staff', 'settings']

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  const loadProfile = useCallback(async (userId) => {
    if (!userId) { setProfile(null); return }
    const { data } = await supabase
      .from('profiles')
      .select('id, email, full_name, role, is_active, permissions')
      .eq('id', userId)
      .single()
    setProfile(data ?? null)
  }, [])

  useEffect(() => {
    let active = true
    supabase.auth.getSession().then(async ({ data }) => {
      if (!active) return
      setSession(data.session)
      await loadProfile(data.session?.user?.id)
      setLoading(false)
    })
    const { data: sub } = supabase.auth.onAuthStateChange(async (_e, s) => {
      setSession(s)
      await loadProfile(s?.user?.id)
    })
    return () => { active = false; sub.subscription.unsubscribe() }
  }, [loadProfile])

  const isAdmin = profile?.role === 'admin' && profile?.is_active
  const can = useCallback(
    (section) => isAdmin || (profile?.is_active && !!profile?.permissions?.[section]),
    [isAdmin, profile],
  )

  const signIn = (email, password) =>
    supabase.auth.signInWithPassword({ email: email.trim().toLowerCase(), password })
  const signOut = () => supabase.auth.signOut()

  const value = { session, profile, loading, isAdmin, can, signIn, signOut, reloadProfile: () => loadProfile(session?.user?.id) }
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>
}

export const useAuth = () => useContext(AuthCtx)
