import React, { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Package, FolderTree, Handshake, ShoppingCart, Users, Settings as Cog,
  LogOut, Menu, X,
} from 'lucide-react'
import { useAuth } from '../lib/auth.jsx'

const NAV = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, section: null, end: true },
  { to: '/products', label: 'Products', icon: Package, section: 'products' },
  { to: '/categories', label: 'Categories', icon: FolderTree, section: 'categories' },
  { to: '/partners', label: 'Partners', icon: Handshake, section: 'partners' },
  { to: '/orders', label: 'Orders', icon: ShoppingCart, section: 'orders' },
  { to: '/staff', label: 'Staff', icon: Users, section: 'staff', adminOnly: true },
  { to: '/settings', label: 'Settings', icon: Cog, section: 'settings' },
]

export default function Layout() {
  const { profile, isAdmin, can, signOut } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const items = NAV.filter((n) => {
    if (!n.section) return true
    if (n.adminOnly) return isAdmin
    return can(n.section)
  })

  const handleSignOut = async () => { await signOut(); navigate('/login') }

  return (
    <div className="h-full flex">
      {/* Sidebar */}
      <aside className={`fixed lg:static z-40 inset-y-0 left-0 w-64 bg-[#0c1f1d] text-white flex flex-col transition-transform ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="h-16 flex items-center gap-2 px-5 border-b border-white/10">
          <div className="w-8 h-8 rounded-full bg-brand grid place-items-center font-bold">S</div>
          <div className="leading-tight">
            <p className="font-bold text-sm">Standard Group</p>
            <p className="text-[10px] text-white/50 uppercase tracking-wider">Admin</p>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {items.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? 'bg-brand text-white' : 'text-white/60 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              <Icon size={18} /> {label}
            </NavLink>
          ))}
        </nav>
        <div className="p-3 border-t border-white/10">
          <div className="px-3 py-2 mb-1">
            <p className="text-sm font-medium truncate">{profile?.full_name || profile?.email}</p>
            <p className="text-[10px] uppercase tracking-wider text-white/40">{profile?.role}</p>
          </div>
          <button onClick={handleSignOut} className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/60 hover:bg-white/10 hover:text-white">
            <LogOut size={18} /> Sign out
          </button>
        </div>
      </aside>

      {open && <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setOpen(false)} />}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-4 gap-3 lg:hidden">
          <button onClick={() => setOpen(true)} className="p-2"><Menu size={22} /></button>
          <span className="font-bold">Standard Group Admin</span>
        </header>
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 max-w-6xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
