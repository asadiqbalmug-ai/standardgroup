import React, { useState } from 'react'
import { MessageCircle, ChevronDown, ChevronUp } from 'lucide-react'

/**
 * ProductGrid — reusable product card grid used across all product sub-pages.
 *
 * Props:
 *   products   — Array of product objects
 *   catName    — Category name (for WhatsApp enquiry text)
 *   renderCard — Optional custom card renderer: (product) => JSX
 *                If not provided, uses the default card below.
 */
export default function ProductGrid({ products = [], catName = '', renderCard }) {
  if (products.length === 0) return null

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
      {products.map((product, i) =>
        renderCard
          ? renderCard(product, i)
          : <DefaultProductCard key={product.id || i} product={product} catName={catName} />
      )}
    </div>
  )
}

/* ── Default product card — clean, compact, B2B style ── */
export function DefaultProductCard({ product, catName = '' }) {
  const [expanded, setExpanded] = useState(false)
  const waText = `Hi, I'm interested in ${product.name}${catName ? ` (${catName})` : ''}`

  return (
    <div className="bg-white border border-gray-200 rounded overflow-hidden hover:border-[#0F766E] hover:shadow-md transition-all duration-200 group flex flex-col">
      {/* Image */}
      {product.image && (
        <div className="aspect-[4/3] bg-gray-100 overflow-hidden flex-shrink-0">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={e => { e.target.parentElement.style.display = 'none' }}
          />
        </div>
      )}

      {/* Body */}
      <div className="p-3 flex flex-col flex-1">
        {/* Category badge */}
        {product.type && (
          <span className="font-onest text-[9px] uppercase tracking-wider text-[#0F766E] font-bold mb-1">{product.type}</span>
        )}

        <h3 className="font-montserrat font-bold text-sm text-[#0c0c0b] leading-tight mb-1">{product.name}</h3>

        {/* Model */}
        {product.model && (
          <p className="font-onest text-[10px] text-gray-400 mb-1">Model #{product.model}</p>
        )}

        {/* Specs row */}
        {product.specs && (
          <p className="font-onest text-[10px] text-gray-500 leading-snug mb-2 line-clamp-2">{product.specs}</p>
        )}

        {/* Features chips */}
        {product.features && product.features.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {product.features.slice(0, 3).map((f, i) => (
              <span key={i} className="font-onest text-[9px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">{f}</span>
            ))}
          </div>
        )}

        {/* Price */}
        {product.price && (
          <p className="font-montserrat font-bold text-[#0F766E] text-sm mb-2">{product.price}</p>
        )}

        {/* Description expandable */}
        {product.description && (
          <>
            <div className={`font-onest text-[11px] text-gray-500 leading-relaxed overflow-hidden transition-all ${expanded ? 'max-h-40' : 'max-h-0'}`}>
              {product.description}
            </div>
            <button onClick={() => setExpanded(v => !v)}
              className="flex items-center gap-0.5 text-[10px] font-montserrat font-bold text-gray-400 hover:text-[#0F766E] transition-colors mt-1 mb-2">
              {expanded ? <><ChevronUp size={11} /> Less</> : <><ChevronDown size={11} /> Details</>}
            </button>
          </>
        )}

        {/* Enquire button */}
        <div className="mt-auto">
          <a
            href={`https://wa.me/971504654613?text=${encodeURIComponent(waText)}`}
            target="_blank" rel="noreferrer"
            className="flex items-center justify-center gap-1.5 w-full bg-[#0F766E] text-white py-2 text-[11px] font-montserrat font-bold rounded hover:bg-[#0D6B64] transition-colors opacity-0 group-hover:opacity-100"
          >
            <MessageCircle size={11} /> Enquire
          </a>
          <a
            href={`https://wa.me/971504654613?text=${encodeURIComponent(waText)}`}
            target="_blank" rel="noreferrer"
            className="flex items-center justify-center gap-1.5 w-full border border-gray-200 text-[#0F766E] py-2 text-[11px] font-montserrat font-bold rounded hover:border-[#0F766E] transition-colors group-hover:hidden"
          >
            <MessageCircle size={11} /> Enquire
          </a>
        </div>
      </div>
    </div>
  )
}
