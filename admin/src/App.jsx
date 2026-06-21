import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './lib/auth.jsx'
import Layout from './components/Layout.jsx'
import RequirePerm from './components/RequirePerm.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Products from './pages/Products.jsx'
import ProductForm from './pages/ProductForm.jsx'
import Categories from './pages/Categories.jsx'
import Orders from './pages/Orders.jsx'
import Staff from './pages/Staff.jsx'
import Settings from './pages/Settings.jsx'

export default function App() {
  const { session, loading } = useAuth()

  if (loading) {
    return <div className="h-full grid place-items-center text-gray-500">Loading…</div>
  }

  if (!session) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    )
  }

  return (
    <Routes>
      <Route path="/login" element={<Navigate to="/" replace />} />
      <Route element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="products" element={<RequirePerm section="products"><Products /></RequirePerm>} />
        <Route path="products/new" element={<RequirePerm section="products"><ProductForm /></RequirePerm>} />
        <Route path="products/:id" element={<RequirePerm section="products"><ProductForm /></RequirePerm>} />
        <Route path="categories" element={<RequirePerm section="categories"><Categories /></RequirePerm>} />
        <Route path="orders" element={<RequirePerm section="orders"><Orders /></RequirePerm>} />
        <Route path="staff" element={<RequirePerm section="staff" adminOnly><Staff /></RequirePerm>} />
        <Route path="settings" element={<RequirePerm section="settings"><Settings /></RequirePerm>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
