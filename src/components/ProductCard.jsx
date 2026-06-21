import React from 'react'
import { Link } from 'react-router-dom'
import { Package, Plus, Star, Flame } from 'lucide-react'
import { useCart } from '../context/cart'
import { accentForKey } from '../config/colors'

// A large, shoppable product card used on the homepage and product listings.
// Links to the dedicated product page when the product has a real (DB) id.
export default function ProductCard({ product, accent }) {
  const { addItem } = useCart()
  const a = accent || accentForKey(product.categorySlug || product.name)
  const hasDetail = product.id && !String(product.id).startsWith('static:')
  const to = hasDetail ? `/product/${product.id}` : (product.categorySlug ? `/products` : '/products')

  const Media = (
    <div className="aspect-square bg-gray-50 relative overflow-hidden">
      {product.image ? (
        <img src={product.image} alt={product.name} loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      ) : (
        <div className="w-full h-full grid place-items-center" style={{ background: a.soft }}>
          <Package size={40} style={{ color: a.solid, opacity: 0.5 }} />
        </div>
      )}
      <div className="absolute top-2 left-2 flex flex-col gap-1">
        {product.isBestseller && (
          <span className="inline-flex items-center gap-1 text-[10px] font-montserrat font-bold text-white px-2 py-0.5 rounded-full" style={{ background: '#C2410C' }}>
            <Flame size={10} /> Best Seller
          </span>
        )}
        {product.isFeatured && (
          <span className="inline-flex items-center gap-1 text-[10px] font-montserrat font-bold text-white px-2 py-0.5 rounded-full" style={{ background: a.solid }}>
            <Star size={10} /> Featured
          </span>
        )}
      </div>
      {product.partner?.logo && (
        <span className="absolute top-2 right-2 bg-white/90 rounded px-1.5 py-1 shadow-sm">
          <img src={product.partner.logo} alt={product.partner.name} className="h-4 w-auto max-w-[48px] object-contain" />
        </span>
      )}
    </div>
  )

  return (
    <div className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-200 flex flex-col"
      style={{ borderTopColor: a.solid, borderTopWidth: 3 }}>
      {hasDetail ? <Link to={to}>{Media}</Link> : Media}
      <div className="p-3 flex flex-col flex-1">
        {(product.partner?.name || product.brand) && (
          <div className="font-montserrat text-[10px] uppercase tracking-wide mb-1" style={{ color: a.text }}>
            {product.partner?.name || product.brand}
          </div>
        )}
        {hasDetail ? (
          <Link to={to} className="font-montserrat font-bold text-sm text-[#0c0c0b] mb-1 leading-tight line-clamp-2 hover:underline">{product.name}</Link>
        ) : (
          <div className="font-montserrat font-bold text-sm text-[#0c0c0b] mb-1 leading-tight line-clamp-2">{product.name}</div>
        )}
        {product.shortSpecs && <div className="font-onest text-[11px] text-gray-500 leading-snug line-clamp-2">{product.shortSpecs}</div>}
        <div className="mt-2 font-montserrat font-bold text-sm" style={{ color: a.text }}>
          {product.price != null ? `AED ${Number(product.price).toLocaleString()}` : 'Price on request'}
        </div>
        <button onClick={() => addItem(product, 1)}
          className="mt-2.5 inline-flex items-center justify-center gap-1 text-white font-montserrat font-bold text-[11px] py-2 rounded-md hover:opacity-90 transition-opacity"
          style={{ background: a.solid }}>
          <Plus size={12} /> Add to Cart
        </button>
      </div>
    </div>
  )
}
