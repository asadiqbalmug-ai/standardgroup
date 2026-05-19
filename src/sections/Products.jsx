import React, { useState, useEffect, useRef } from 'react'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { productCategories } from '../data/products'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const allProducts = productCategories.flatMap((cat) =>
  cat.products.map((p) => ({ ...p, category: cat.name, categoryIcon: cat.icon, categoryId: cat.id, brands: cat.brands }))
)

function ProductCard({ product }) {
  const specs = product.specs ? product.specs.split('|').map((s) => s.trim()).filter(Boolean) : []
  const specLabels = ['Type', 'Size', 'Material', 'Finish']

  return (
    <div className="group flex flex-col bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 hover:border-[var(--mahenti-accent)]/40 transition-all duration-300 hover:-translate-y-1">
      {/* Top badge */}
      <div className="flex justify-center pt-5">
        <span className="bg-[var(--mahenti-accent)] text-zinc-900 text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full">
          {product.category}
        </span>
      </div>

      {/* Hero area */}
      <div className="flex flex-col items-center px-5 pt-5 pb-4">
        <p className="text-zinc-400 text-xs uppercase tracking-widest font-medium mb-2">Product</p>
        <div className="text-5xl mb-1 group-hover:scale-110 transition-transform duration-500">{product.categoryIcon}</div>
        <h3 className="text-[var(--mahenti-accent)] font-black text-xl text-center leading-tight font-display mt-2">
          {product.name}
        </h3>
        {product.model && (
          <p className="text-zinc-400 text-sm mt-1">Model <span className="text-white font-bold">#{product.model}</span></p>
        )}
      </div>

      {/* Spec line items */}
      <div className="flex flex-col gap-0 px-5 pb-4">
        {specs.map((spec, i) => (
          <div key={i} className="flex items-center justify-between py-3 border-t border-zinc-800 first:border-t-0">
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[var(--mahenti-accent)]/20 flex items-center justify-center flex-shrink-0">
                <span className="w-2 h-2 rounded-full bg-[var(--mahenti-accent)]" />
              </span>
              <span className="text-zinc-400 text-sm">{specLabels[i] || `Spec ${i + 1}`}</span>
            </div>
            <span className="text-white font-bold text-sm text-right">{spec}</span>
          </div>
        ))}
      </div>

      {/* CTA buttons */}
      <div className="flex flex-col gap-2.5 px-5 pb-6 mt-auto">
        <a href="#contact"
          className="w-full bg-[var(--mahenti-accent)] text-zinc-900 font-bold text-sm text-center py-3.5 rounded-2xl hover:brightness-110 transition-all duration-200 tracking-wide font-display">
          Get a Quote — Free
        </a>
        <button
          className="w-full bg-transparent border border-zinc-700 text-white font-bold text-sm text-center py-3.5 rounded-2xl hover:border-zinc-500 hover:bg-zinc-800 transition-all duration-200 tracking-wide font-display">
          View Details
        </button>
      </div>
    </div>
  )
}

export default function Products() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [showMobileFilter, setShowMobileFilter] = useState(false)
  const headerRef = useRef(null)
  const gridRef = useRef(null)

  const filtered = allProducts.filter((p) => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory
    const matchSearch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()) || (p.specs && p.specs.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchCat && matchSearch
  })

  const activeCount = productCategories.reduce((acc, cat) => {
    acc[cat.name] = cat.products.length
    return acc
  }, {})

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current.children,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 80%' }
        }
      )
    })
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!gridRef.current) return
    gsap.fromTo(gridRef.current.children,
      { opacity: 0, y: 30, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.02, ease: 'power3.out', overwrite: true }
    )
  }, [filtered.length, activeCategory, searchQuery])

  return (
    <section id="products" className="py-28 bg-[#F9F6F0]">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[var(--mahenti-accent)] mb-3">
            <span className="w-6 h-px bg-[var(--mahenti-accent)]" /> Our Offerings
          </div>
          <h2 className="text-4xl md:text-5xl text-zinc-900 mb-4 font-black font-display">
            Product <span className="text-gradient">Catalogue</span>
          </h2>
          <p className="text-zinc-500 max-w-2xl mx-auto text-sm leading-relaxed">
            Browse our complete range of building materials — from structural essentials to finishing products.
          </p>
        </div>

        <div className="flex gap-8">
          {/* Sidebar — desktop only */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 bg-white rounded-2xl border border-zinc-200 overflow-hidden" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
              {/* Search */}
              <div className="p-4 border-b border-zinc-100">
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl pl-9 pr-3 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-[var(--mahenti-accent)] transition-colors"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="p-2">
                <p className="px-3 pt-2 pb-1 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Categories</p>
                <button onClick={() => setActiveCategory('All')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                    activeCategory === 'All' ? 'bg-zinc-900 text-white font-bold' : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'
                  }`}>
                  <span>All Products</span>
                  <span className={`text-[11px] font-bold ${activeCategory === 'All' ? 'text-zinc-400' : 'text-zinc-400'}`}>{allProducts.length}</span>
                </button>
                {productCategories.map((cat) => (
                  <button key={cat.id} onClick={() => setActiveCategory(cat.name)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                      activeCategory === cat.name ? 'bg-zinc-900 text-white font-bold' : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'
                    }`}>
                    <span className="flex items-center gap-2 truncate">
                      <span className="text-base flex-shrink-0">{cat.icon}</span>
                      <span className="truncate">{cat.name}</span>
                    </span>
                    <span className={`text-[11px] font-bold ml-2 flex-shrink-0 ${activeCategory === cat.name ? 'text-zinc-400' : 'text-zinc-400'}`}>{cat.products.length}</span>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Mobile filter bar */}
            <div className="lg:hidden flex gap-2 mb-6">
              <div className="flex-1 relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input type="text" placeholder="Search products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-zinc-200 rounded-xl pl-9 pr-3 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-[var(--mahenti-accent)]" />
              </div>
              <button onClick={() => setShowMobileFilter(!showMobileFilter)}
                className="flex items-center gap-2 bg-white border border-zinc-200 rounded-xl px-4 py-2.5 text-sm font-bold text-zinc-700">
                <SlidersHorizontal size={14} /> Filter
              </button>
            </div>

            {/* Mobile filter dropdown */}
            {showMobileFilter && (
              <div className="lg:hidden flex flex-wrap gap-2 mb-6 p-4 bg-white rounded-2xl border border-zinc-200">
                <button onClick={() => { setActiveCategory('All'); setShowMobileFilter(false) }}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${activeCategory === 'All' ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-600'}`}>
                  All ({allProducts.length})
                </button>
                {productCategories.map((cat) => (
                  <button key={cat.id} onClick={() => { setActiveCategory(cat.name); setShowMobileFilter(false) }}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${activeCategory === cat.name ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-600'}`}>
                    {cat.icon} {cat.name} ({cat.products.length})
                  </button>
                ))}
              </div>
            )}

            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <p className="text-zinc-500 text-sm">
                  <span className="text-zinc-900 font-bold">{filtered.length}</span> product{filtered.length !== 1 ? 's' : ''}
                  {activeCategory !== 'All' && <span className="hidden sm:inline"> in <span className="text-[var(--mahenti-accent)] font-bold">{activeCategory}</span></span>}
                </p>
                {(activeCategory !== 'All' || searchQuery) && (
                  <button onClick={() => { setActiveCategory('All'); setSearchQuery('') }}
                    className="flex items-center gap-1 text-xs font-bold text-zinc-400 hover:text-zinc-900 transition-colors">
                    <X size={12} /> Clear
                  </button>
                )}
              </div>
            </div>

            {/* Product grid */}
            <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-20">
                <div className="text-5xl mb-4">🔍</div>
                <p className="text-zinc-900 font-bold text-lg font-display mb-1">No products found</p>
                <p className="text-zinc-500 text-sm">Try adjusting your search or filter</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
