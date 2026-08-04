import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react'

const CartCtx = createContext(null)
const KEY = 'sg_cart_v1'

function load() {
  try { return JSON.parse(localStorage.getItem(KEY)) || [] } catch { return [] }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(load)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(items)) } catch { /* ignore */ }
  }, [items])

  const addItem = useCallback((product, qty = 1) => {
    setItems((prev) => {
      const i = prev.findIndex((x) => x.id === product.id)
      if (i >= 0) {
        const next = [...prev]
        next[i] = { ...next[i], qty: next[i].qty + qty }
        return next
      }
      return [...prev, {
        id: product.id,
        name: product.name,
        model: product.model || null,
        price: product.price ?? null,
        currency: product.currency || 'AED',
        image: product.image || null,
        categoryName: product.categoryName || null,
        qty,
      }]
    })
    setOpen(true)
  }, [])

  const setQty = useCallback((id, qty) => {
    setItems((prev) => prev.flatMap((x) => (x.id === id ? (qty <= 0 ? [] : [{ ...x, qty }]) : [x])))
  }, [])
  const removeItem = useCallback((id) => setItems((prev) => prev.filter((x) => x.id !== id)), [])
  const clear = useCallback(() => setItems([]), [])

  const count = useMemo(() => items.reduce((s, x) => s + x.qty, 0), [items])
  const subtotal = useMemo(() => items.reduce((s, x) => s + (x.price ?? 0) * x.qty, 0), [items])
  const hasPrices = useMemo(() => items.some((x) => x.price != null), [items])

  const value = { items, count, subtotal, hasPrices, addItem, setQty, removeItem, clear, open, setOpen }
  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>
}

export const useCart = () => useContext(CartCtx)
