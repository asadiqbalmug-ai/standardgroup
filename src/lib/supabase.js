import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY

// When env vars aren't set yet (e.g. before provisioning), the storefront
// gracefully falls back to the bundled static catalog and a default WhatsApp
// number, so the live site keeps working.
export const supabase = url && anon
  ? createClient(url, anon, { auth: { persistSession: false } })
  : null

export const hasSupabase = !!supabase
