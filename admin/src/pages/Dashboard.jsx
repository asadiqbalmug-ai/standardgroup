import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Package, FolderTree, ShoppingCart } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../lib/auth.jsx'

export default function Dashboard() {
  const { profile, can } = useAuth()
  const [counts, setCounts] = useState({ products: null, categories: null, orders: null })

  useEffect(() => {
    const head = (table) => supabase.from(table).select('*', { count: 'exact', head: true })
    ;(async () => {
      const [p, c, o] = await Promise.all([head('products'), head('categories'), head('orders')])
      setCounts({ products: p.count, categories: c.count, orders: o.count })
    })()
  }, [])

  const cards = [
    { label: 'Products', value: counts.products, icon: Package, to: '/products', show: can('products') },
    { label: 'Categories', value: counts.categories, icon: FolderTree, to: '/categories', show: can('categories') },
    { label: 'Orders', value: counts.orders, icon: ShoppingCart, to: '/orders', show: can('orders') },
  ].filter((c) => c.show)

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">Welcome, {profile?.full_name || profile?.email}</h1>
      <p className="text-gray-500 mb-6">Standard Group store admin.</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map(({ label, value, icon: Icon, to }) => (
          <Link key={label} to={to} className="card p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{label}</p>
                <p className="text-3xl font-bold">{value ?? '—'}</p>
              </div>
              <Icon className="text-brand" size={32} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
