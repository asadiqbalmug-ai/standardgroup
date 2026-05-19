import React from 'react'
import { Globe, Phone, Mail } from 'lucide-react'
import { productCategories } from '../data/products'

export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-2xl border-2 border-[var(--mahenti-accent)] flex items-center justify-center">
              <span className="text-[var(--mahenti-accent)] font-black text-xl font-display">S</span>
            </div>
            <div>
              <div className="text-white font-bold text-base tracking-widest leading-none font-display">STANDARD GROUP</div>
              <div className="text-[var(--mahenti-accent)] text-[10px] tracking-[0.3em] uppercase">We Set Standards</div>
            </div>
          </div>
          <p className="text-zinc-600 text-xs leading-relaxed mt-4">
            Premier building materials supplier in the UAE, providing quality construction and finishing products from globally trusted brands.
          </p>
          <a href="https://www.standardgroup.ae" target="_blank" rel="noreferrer"
            className="flex items-center gap-2 mt-4 text-zinc-500 hover:text-[var(--mahenti-accent)] text-xs transition-colors">
            <Globe size={12} /> www.standardgroup.ae
          </a>
        </div>

        <div className="lg:col-span-2">
          <h4 className="text-white text-[11px] font-bold tracking-widest uppercase mb-4 border-b border-zinc-800 pb-3 font-display">
            Product Categories
          </h4>
          <div className="grid grid-cols-2 gap-y-2.5 gap-x-4">
            {productCategories.map((cat) => (
              <a key={cat.id} href="#products"
                className="flex items-center gap-2 text-zinc-600 hover:text-[var(--mahenti-accent)] text-xs transition-colors">
                <span className="w-1 h-1 rounded-full bg-[var(--mahenti-accent)]/30 flex-shrink-0" />
                {cat.name}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white text-[11px] font-bold tracking-widest uppercase mb-4 border-b border-zinc-800 pb-3 font-display">
            Contact
          </h4>
          <div className="flex flex-col gap-3">
            <a href="tel:+971XXXXXXXX" className="flex items-center gap-2 text-zinc-600 hover:text-[var(--mahenti-accent)] transition-colors text-xs">
              <Phone size={12} className="text-[var(--mahenti-accent)]/50" /> +971 XXXX XXXX
            </a>
            <a href="mailto:info@standardgroup.ae" className="flex items-center gap-2 text-zinc-600 hover:text-[var(--mahenti-accent)] transition-colors text-xs">
              <Mail size={12} className="text-[var(--mahenti-accent)]/50" /> info@standardgroup.ae
            </a>
          </div>
          <div className="mt-6 flex flex-col gap-2">
            {['Home','Products','Brands','About','Contact'].map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} className="text-zinc-600 hover:text-[var(--mahenti-accent)] transition-colors text-xs">{l}</a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-zinc-800/50 py-4 px-6 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-zinc-700 text-xs">© {new Date().getFullYear()} Standard Group. All rights reserved.</p>
        <p className="text-zinc-800 text-[11px] font-bold tracking-widest uppercase">We Set Standards</p>
      </div>
    </footer>
  )
}
