import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Package, Plus, Minus, ChevronRight, MessageCircle, ShieldCheck, Truck, ArrowLeft } from 'lucide-react'
import { fetchProduct, fetchCatalog } from '../lib/catalog'
import { useCart } from '../context/cart'
import { accentForKey } from '../config/colors'
import ProductCard from '../components/ProductCard'

export default function ProductDetail() {
  const { id } = useParams()
  const { addItem } = useCart()
  const [product, setProduct] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [qty, setQty] = useState(1)
  const [activeImg, setActiveImg] = useState(0)

  useEffect(() => {
    setLoading(true); setNotFound(false); setQty(1); setActiveImg(0)
    window.scrollTo(0, 0)
    ;(async () => {
      const [p, { categories }] = await Promise.all([fetchProduct(id), fetchCatalog()])
      if (!p) { setNotFound(true); setLoading(false); return }
      setProduct(p)
      const cat = categories.find((c) => c.slug === p.categorySlug)
      setRelated((cat?.products || []).filter((x) => x.id !== p.id).slice(0, 4))
      setLoading(false)
    })()
  }, [id])

  if (loading) return <div className="min-h-screen pt-32 text-center font-onest text-gray-400">Loading product…</div>
  if (notFound) return (
    <div className="min-h-screen pt-32 text-center px-4">
      <p className="font-montserrat font-bold text-xl text-gray-700">Product not found</p>
      <Link to="/products" className="mt-4 inline-flex items-center gap-1 text-[#0F766E] font-montserrat font-bold text-sm"><ArrowLeft size={15} /> Back to all products</Link>
    </div>
  )

  const a = accentForKey(product.categorySlug || product.name)
  const gallery = product.images && product.images.length ? product.images : (product.image ? [product.image] : [])

  return (
    <div className="min-h-screen bg-white pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs font-onest text-gray-400 mb-6">
          <Link to="/" className="hover:text-gray-700">Home</Link><ChevronRight size={12} />
          <Link to="/products" className="hover:text-gray-700">Products</Link>
          {product.categoryName && <><ChevronRight size={12} /><span className="text-gray-600">{product.categoryName}</span></>}
        </nav>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Gallery */}
          <div>
            <div className="aspect-square rounded-xl overflow-hidden grid place-items-center" style={{ background: a.soft }}>
              {gallery.length ? (
                <img src={gallery[activeImg]} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <Package size={72} style={{ color: a.solid, opacity: 0.4 }} />
              )}
            </div>
            {gallery.length > 1 && (
              <div className="flex gap-2 mt-3">
                {gallery.map((src, i) => (
                  <button key={i} onClick={() => setActiveImg(i)}
                    className={`h-16 w-16 rounded-lg overflow-hidden border-2 ${i === activeImg ? '' : 'border-transparent opacity-70'}`}
                    style={{ borderColor: i === activeImg ? a.solid : 'transparent' }}>
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            {(product.partner?.name || product.brand) && (
              <div className="flex items-center gap-2 mb-2">
                {product.partner?.logo && <img src={product.partner.logo} alt={product.partner.name} className="h-6 w-auto object-contain" />}
                <span className="font-montserrat text-xs uppercase tracking-wide" style={{ color: a.text }}>{product.partner?.name || product.brand}</span>
              </div>
            )}
            <h1 className="font-montserrat font-bold text-2xl md:text-3xl text-[#0c0c0b] leading-tight">{product.name}</h1>
            {product.model && <p className="font-onest text-sm text-gray-400 mt-1">Model #{product.model}</p>}

            <div className="mt-4 flex items-baseline gap-2">
              <span className="font-montserrat font-bold text-3xl" style={{ color: a.text }}>
                {product.price != null ? `AED ${Number(product.price).toLocaleString()}` : 'Price on request'}
              </span>
              {product.unit && <span className="font-onest text-sm text-gray-400">/ {product.unit}</span>}
            </div>

            {product.description && <p className="font-onest text-sm text-gray-600 leading-relaxed mt-4">{product.description}</p>}
            {product.shortSpecs && (
              <div className="mt-4 rounded-lg p-4" style={{ background: a.soft }}>
                <p className="font-montserrat font-bold text-xs uppercase tracking-wide mb-1" style={{ color: a.text }}>Specifications</p>
                <p className="font-onest text-sm text-gray-700 whitespace-pre-line">{product.shortSpecs}</p>
              </div>
            )}

            {/* Qty + actions */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-3 py-3 text-gray-500 hover:bg-gray-100"><Minus size={14} /></button>
                <span className="px-4 font-montserrat font-bold text-sm w-12 text-center">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="px-3 py-3 text-gray-500 hover:bg-gray-100"><Plus size={14} /></button>
              </div>
              <button onClick={() => addItem(product, qty)}
                className="flex-1 min-w-[180px] inline-flex items-center justify-center gap-2 text-white font-montserrat font-bold text-sm py-3.5 rounded-lg hover:opacity-90 transition-opacity"
                style={{ background: a.solid }}>
                <Plus size={16} /> Add to Cart
              </button>
            </div>
            <a href={`https://wa.me/971504654613?text=${encodeURIComponent('Hi, I am interested in: ' + product.name)}`}
              target="_blank" rel="noreferrer"
              className="mt-3 w-full inline-flex items-center justify-center gap-2 border border-gray-300 text-[#444] font-montserrat font-bold text-sm py-3 rounded-lg hover:border-[#0F766E] hover:text-[#0F766E] transition-colors">
              <MessageCircle size={16} /> Enquire on WhatsApp
            </a>

            <div className="mt-6 grid grid-cols-2 gap-3 text-xs font-onest text-gray-500">
              <span className="flex items-center gap-2"><Truck size={15} style={{ color: a.solid }} /> Delivery across UAE</span>
              <span className="flex items-center gap-2"><ShieldCheck size={15} style={{ color: a.solid }} /> Certified products</span>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="font-montserrat font-bold text-xl text-[#0c0c0b] mb-5">More in {product.categoryName}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
