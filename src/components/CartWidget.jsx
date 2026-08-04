import React, { useState } from 'react'
import { ShoppingCart, X, Plus, Minus, Trash2, MessageCircle, Package } from 'lucide-react'
import { useCart } from '../context/cart'
import { submitOrder } from '../lib/order'

function Thumb({ src, alt }) {
  if (src) return <img src={src} alt={alt} className="w-14 h-14 rounded object-cover bg-gray-100 flex-shrink-0" />
  return (
    <div className="w-14 h-14 rounded bg-gray-100 grid place-items-center text-gray-300 flex-shrink-0">
      <Package size={20} />
    </div>
  )
}

export default function CartWidget() {
  const { items, count, subtotal, hasPrices, setQty, removeItem, clear, open, setOpen } = useCart()
  const [customer, setCustomer] = useState({ name: '', phone: '', company: '', notes: '' })
  const [busy, setBusy] = useState(false)

  const checkout = async () => {
    if (!items.length) return
    setBusy(true)
    try {
      const { waUrl } = await submitOrder({ items, customer })
      window.open(waUrl, '_blank', 'noopener')
      clear()
      setOpen(false)
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open cart"
        className="fixed z-[60] bottom-5 right-5 bg-[#0F766E] text-white rounded-full shadow-lg w-14 h-14 grid place-items-center hover:bg-[#0D6B64] transition-colors"
      >
        <ShoppingCart size={22} />
        {count > 0 && (
          <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-[11px] font-bold rounded-full min-w-[20px] h-5 px-1 grid place-items-center">
            {count}
          </span>
        )}
      </button>

      {/* Overlay */}
      {open && <div className="fixed inset-0 z-[70] bg-black/40" onClick={() => setOpen(false)} />}

      {/* Drawer */}
      <aside
        className={`fixed z-[80] top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <header className="h-16 flex items-center justify-between px-5 border-b border-gray-200">
          <div className="flex items-center gap-2 font-montserrat font-bold">
            <ShoppingCart size={18} /> Your Cart {count > 0 && <span className="text-gray-400 font-normal">({count})</span>}
          </div>
          <button onClick={() => setOpen(false)} className="p-2 text-gray-500 hover:text-gray-800"><X size={20} /></button>
        </header>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="text-center text-gray-400 py-16">
              <ShoppingCart size={40} className="mx-auto mb-3 opacity-40" />
              <p className="font-onest">Your cart is empty.</p>
            </div>
          ) : (
            items.map((it) => (
              <div key={it.id} className="flex gap-3 items-center">
                <Thumb src={it.image} alt={it.name} />
                <div className="flex-1 min-w-0">
                  <p className="font-montserrat font-bold text-sm leading-tight truncate">{it.name}</p>
                  {it.model && <p className="text-[11px] text-gray-400">Model #{it.model}</p>}
                  <p className="text-xs text-gray-500 mt-0.5">{it.price != null ? `AED ${it.price}` : 'Price on request'}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <button onClick={() => setQty(it.id, it.qty - 1)} className="w-6 h-6 grid place-items-center border border-gray-300 rounded hover:bg-gray-50"><Minus size={12} /></button>
                    <span className="text-sm font-semibold w-6 text-center">{it.qty}</span>
                    <button onClick={() => setQty(it.id, it.qty + 1)} className="w-6 h-6 grid place-items-center border border-gray-300 rounded hover:bg-gray-50"><Plus size={12} /></button>
                    <button onClick={() => removeItem(it.id)} className="ml-auto text-gray-400 hover:text-red-600"><Trash2 size={15} /></button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <footer className="border-t border-gray-200 p-5 space-y-3">
            {hasPrices && (
              <div className="flex justify-between font-montserrat font-bold">
                <span>Subtotal</span><span>AED {subtotal.toFixed(2)}</span>
              </div>
            )}
            <div className="grid grid-cols-2 gap-2">
              <input className="border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#0F766E]" placeholder="Your name" value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} />
              <input className="border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#0F766E]" placeholder="Phone" value={customer.phone} onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} />
            </div>
            <input className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#0F766E]" placeholder="Company (optional)" value={customer.company} onChange={(e) => setCustomer({ ...customer, company: e.target.value })} />
            <textarea className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#0F766E]" rows={2} placeholder="Notes (optional)" value={customer.notes} onChange={(e) => setCustomer({ ...customer, notes: e.target.value })} />
            <button onClick={checkout} disabled={busy} className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-montserrat font-bold py-3 rounded hover:bg-[#1eb858] transition-colors disabled:opacity-60">
              <MessageCircle size={18} /> {busy ? 'Preparing…' : 'Checkout via WhatsApp'}
            </button>
            <p className="text-[11px] text-gray-400 text-center">Your full order is sent to our WhatsApp for confirmation.</p>
          </footer>
        )}
      </aside>
    </>
  )
}
