import React, { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, ChevronRight, Phone, MessageCircle, X, SlidersHorizontal } from 'lucide-react'
import { fetchCatalog } from '../lib/catalog'
import ProductCard from '../components/ProductCard'
import { accentForKey } from '../config/colors'

export default function ProductsPage() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchParams, setSearchParams] = useSearchParams()
  const activeCategory = searchParams.get('cat') || 'all'
  const setActiveCategory = (cat) => setSearchParams(cat && cat !== 'all' ? { cat } : {})
  const [search, setSearch] = useState(searchParams.get('q') || '')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    fetchCatalog().then(({ categories }) => { setCategories(categories); setLoading(false) })
  }, [])

  const totalProducts = categories.reduce((s, c) => s + c.products.length, 0)

  const filteredCategories = useMemo(() => {
    let cats = activeCategory === 'all' ? categories : categories.filter(c => c.slug === activeCategory)
    if (search.trim()) {
      const q = search.toLowerCase()
      cats = cats.map(cat => ({
        ...cat,
        products: cat.products.filter(p =>
          p.name.toLowerCase().includes(q) ||
          (p.shortSpecs && p.shortSpecs.toLowerCase().includes(q)) ||
          (p.model && p.model.toLowerCase().includes(q))
        )
      })).filter(cat => cat.products.length > 0 || cat.name.toLowerCase().includes(q))
    }
    return cats
  }, [categories, activeCategory, search])

  const activeCat = categories.find(c => c.slug === activeCategory)

  return (
    <div className="min-h-screen bg-white">
      {/* ── Page header ── */}
      <div className="bg-[#0c0c0b] pt-28 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-montserrat text-[11px] tracking-[0.25em] uppercase text-[#0F766E] mb-2">Standard Group</p>
          <h1 className="font-montserrat font-bold text-3xl md:text-4xl text-white mb-3">All Products</h1>
          <p className="font-onest text-white/50 text-sm">
            {categories.length} categories · {totalProducts}+ products · Abu Dhabi, UAE
          </p>
        </div>
      </div>

      {/* ── Mobile filter bar ── */}
      <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3">
        <button onClick={() => setSidebarOpen(true)}
          className="flex items-center gap-2 border border-gray-300 rounded px-3 py-2 text-sm font-montserrat font-bold text-[#444] hover:border-[#0F766E] hover:text-[#0F766E] transition-colors">
          <SlidersHorizontal size={14} />
          {activeCategory === 'all' ? 'All Categories' : activeCat?.name}
        </button>
        <div className="flex-1 flex items-center border border-gray-300 rounded overflow-hidden">
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..."
            className="flex-1 px-3 py-2 text-sm outline-none font-onest" />
          {search && <button onClick={() => setSearch('')} className="px-2 text-gray-400"><X size={14} /></button>}
        </div>
      </div>

      {/* ── Mobile sidebar overlay ── */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="relative bg-white w-72 h-full overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <span className="font-montserrat font-bold text-sm">Categories</span>
              <button onClick={() => setSidebarOpen(false)}><X size={18} /></button>
            </div>
            <SidebarContent categories={categories} activeCategory={activeCategory}
              setActiveCategory={cat => { setActiveCategory(cat); setSidebarOpen(false) }} />
          </div>
        </div>
      )}

      {/* ── Main layout ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="sticky top-[7rem]">
              <SidebarContent categories={categories} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
            </div>
          </aside>

          <main className="flex-1 min-w-0">
            <div className="hidden lg:flex items-center gap-4 mb-6">
              <div className="flex-1 flex items-center border border-gray-300 rounded overflow-hidden max-w-md">
                <Search size={14} className="ml-3 text-gray-400 flex-shrink-0" />
                <input value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="Search by product name, specs, model..."
                  className="flex-1 px-3 py-2.5 text-sm outline-none font-onest" />
                {search && <button onClick={() => setSearch('')} className="px-2 text-gray-400 hover:text-gray-600"><X size={14} /></button>}
              </div>
              <p className="font-onest text-sm text-gray-500 flex-shrink-0">
                {filteredCategories.reduce((s, c) => s + c.products.length, 0)} items
                {activeCategory !== 'all' && <span className="text-[#0F766E] font-semibold"> in {activeCat?.name}</span>}
              </p>
            </div>

            <div className="space-y-10">
              {loading && <p className="font-onest text-gray-400 py-20 text-center">Loading products…</p>}
              {!loading && filteredCategories.map(cat => <CategorySection key={cat.slug} cat={cat} />)}
              {!loading && filteredCategories.length === 0 && (
                <div className="py-20 text-center">
                  <p className="font-montserrat font-bold text-lg text-gray-400">No products found</p>
                  <p className="font-onest text-sm text-gray-400 mt-1">Try a different search term</p>
                  <button onClick={() => { setSearch(''); setActiveCategory('all') }}
                    className="mt-4 text-[#0F766E] font-montserrat font-bold text-sm underline">Clear filters</button>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      {/* ── Bottom CTA ── */}
      <div className="bg-[#0F766E] py-10 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-5">
          <div>
            <h3 className="font-montserrat font-bold text-white text-xl">Can't find what you need?</h3>
            <p className="font-onest text-white/75 text-sm mt-1">We source on demand. Contact us and we'll get back within 24 hours.</p>
          </div>
          <div className="flex gap-3">
            <a href="https://wa.me/971504654613?text=Hi, I need help finding a product." target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 bg-white text-[#0F766E] px-5 py-2.5 font-montserrat font-bold text-sm rounded hover:bg-gray-100 transition-colors">
              <MessageCircle size={15} /> WhatsApp
            </a>
            <a href="tel:+971555599508"
              className="inline-flex items-center gap-2 border-2 border-white text-white px-5 py-2.5 font-montserrat font-bold text-sm rounded hover:bg-white/10 transition-colors">
              <Phone size={15} /> Call Us
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Sidebar content ── */
function SidebarContent({ categories, activeCategory, setActiveCategory }) {
  return (
    <div className="py-2">
      <p className="font-montserrat font-bold text-[11px] uppercase tracking-widest text-gray-400 px-3 mb-3">Categories</p>
      <button onClick={() => setActiveCategory('all')}
        className={`w-full text-left flex items-center justify-between px-3 py-2.5 rounded text-sm transition-colors mb-0.5 ${
          activeCategory === 'all' ? 'bg-[#0F766E] text-white font-montserrat font-bold' : 'font-onest text-gray-600 hover:bg-gray-100 hover:text-[#0F766E]'
        }`}>
        <span className="flex items-center gap-2"><span className="text-base">🏗️</span> All Products</span>
        {activeCategory === 'all' && <ChevronRight size={14} />}
      </button>
      {categories.map(cat => (
        <button key={cat.slug} onClick={() => setActiveCategory(cat.slug)}
          className={`w-full text-left flex items-center justify-between px-3 py-2.5 rounded text-sm transition-colors mb-0.5 ${
            activeCategory === cat.slug ? 'bg-[#0F766E] text-white font-montserrat font-bold' : 'font-onest text-gray-600 hover:bg-gray-100 hover:text-[#0F766E]'
          }`}>
          <span className="flex items-center gap-2">
            <span className="text-sm">{cat.icon}</span>
            <span className="text-xs leading-tight">{cat.name}</span>
          </span>
          <span className={`text-[10px] font-montserrat font-bold flex-shrink-0 ${activeCategory === cat.slug ? 'text-white/70' : 'text-gray-400'}`}>
            {cat.products.length}
          </span>
        </button>
      ))}
    </div>
  )
}

/* ── Category section ── */
function CategorySection({ cat }) {
  const a = accentForKey(cat.slug)
  return (
    <section>
      <div className="flex items-center gap-3 mb-4 pb-3 border-b-2" style={{ borderColor: a.solid }}>
        <span className="text-2xl">{cat.icon}</span>
        <div>
          <h2 className="font-montserrat font-bold text-base text-[#0c0c0b]">{cat.name}</h2>
          <p className="font-onest text-xs text-gray-500">{cat.products.length} products</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {cat.products.map(product => <ProductCard key={product.id} product={product} accent={a} />)}
      </div>
    </section>
  )
}


