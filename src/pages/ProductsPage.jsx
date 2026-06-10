import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Search, ChevronRight, Phone, MessageCircle, X, SlidersHorizontal } from 'lucide-react'
import { productCategories } from '../data/products'

/* ── Route map: data slug → page path ── */
const ROUTE = {
  'electric-water-heaters': '/milano-water-heaters',
  'water-closet':           '/water-closets',
  'wash-basin':             '/wash-basins',
  'wall-hung':              '/wall-hung',
  'tiles':                  '/tiles-roof-interlock',
  'sanitary-ware':          '/sanitary-ware',
  'blocks-aggregates':      '/blocks-sands',
  'cement':                 '/cement',
  'tile-glue-grout':        '/tiles-roof-interlock',
  'steel':                  '/steel',
  'plywood':                '/film-faced-plywood',
  'waterproofing':          '/water-proofing',
  'gypsum-board':           '/gypsum-board',
  'paints':                 '/paints-tools',
  'general-tools':          '/general-tools-plumbing',
  'plumbing-sanitary':      '/plumbing-sanitary',
  'electric-lights':        '/electric-lights',
}

/* ── Category thumbnail images ── */
const CAT_IMG = {
  'electric-water-heaters': null,
  'water-closet':           '/pics/1wc.JPG',
  'wash-basin':             '/pics/1sink.JPG',
  'wall-hung':              '/pics/2wc.JPG',
  'tiles':                  '/pics/1tile.JPG',
  'sanitary-ware':          '/pics/1sanitary.JPG',
  'blocks-aggregates':      '/pics/1cinderblock.JPG',
  'cement':                 '/pics/1whiterocks.JPG',
  'tile-glue-grout':        '/pics/4tile.JPG',
  'steel':                  '/pics/1rebar.JPG',
  'plywood':                '/pics/1bricks.JPG',
  'waterproofing':          '/pics/1crackedgravel.JPG',
  'gypsum-board':           '/pics/1interior.JPG',
  'paints':                 '/pics/2interior.JPG',
  'general-tools':          '/pics/3interior.JPG',
  'plumbing-sanitary':      '/pics/1brownsand.JPG',
  'electric-lights':        '/pics/1interlock.JPG',
}

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [search, setSearch] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const totalProducts = productCategories.reduce((s, c) => s + c.products.length, 0)

  const filteredCategories = useMemo(() => {
    let cats = activeCategory === 'all'
      ? productCategories
      : productCategories.filter(c => c.slug === activeCategory)

    if (search.trim()) {
      const q = search.toLowerCase()
      cats = cats.map(cat => ({
        ...cat,
        products: cat.products.filter(p =>
          p.name.toLowerCase().includes(q) ||
          (p.specs && p.specs.toLowerCase().includes(q)) ||
          (p.model && p.model.toLowerCase().includes(q))
        )
      })).filter(cat => cat.products.length > 0 || cat.name.toLowerCase().includes(q))
    }
    return cats
  }, [activeCategory, search])

  const activeCat = productCategories.find(c => c.slug === activeCategory)

  return (
    <div className="min-h-screen bg-white">
      {/* ── Page header ── */}
      <div className="bg-[#0c0c0b] pt-28 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-montserrat text-[11px] tracking-[0.25em] uppercase text-[#0F766E] mb-2">
            Standard Group
          </p>
          <h1 className="font-montserrat font-bold text-3xl md:text-4xl text-white mb-3">
            All Products
          </h1>
          <p className="font-onest text-white/50 text-sm">
            {productCategories.length} categories · {totalProducts}+ products · Abu Dhabi, UAE
          </p>
        </div>
      </div>

      {/* ── Mobile filter bar ── */}
      <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => setSidebarOpen(true)}
          className="flex items-center gap-2 border border-gray-300 rounded px-3 py-2 text-sm font-montserrat font-bold text-[#444] hover:border-[#0F766E] hover:text-[#0F766E] transition-colors"
        >
          <SlidersHorizontal size={14} />
          {activeCategory === 'all' ? 'All Categories' : activeCat?.name}
        </button>
        <div className="flex-1 flex items-center border border-gray-300 rounded overflow-hidden">
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search products..."
            className="flex-1 px-3 py-2 text-sm outline-none font-onest"
          />
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
            <SidebarContent
              activeCategory={activeCategory}
              setActiveCategory={cat => { setActiveCategory(cat); setSidebarOpen(false) }}
            />
          </div>
        </div>
      )}

      {/* ── Main layout ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">

          {/* ── Sidebar (desktop) ── */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="sticky top-[7rem]">
              <SidebarContent
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
              />
            </div>
          </aside>

          {/* ── Product grid ── */}
          <main className="flex-1 min-w-0">
            {/* Search + count bar */}
            <div className="hidden lg:flex items-center gap-4 mb-6">
              <div className="flex-1 flex items-center border border-gray-300 rounded overflow-hidden max-w-md">
                <Search size={14} className="ml-3 text-gray-400 flex-shrink-0" />
                <input
                  value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="Search by product name, specs, model..."
                  className="flex-1 px-3 py-2.5 text-sm outline-none font-onest"
                />
                {search && <button onClick={() => setSearch('')} className="px-2 text-gray-400 hover:text-gray-600"><X size={14} /></button>}
              </div>
              <p className="font-onest text-sm text-gray-500 flex-shrink-0">
                {filteredCategories.reduce((s, c) => s + c.products.length, 0)} items
                {activeCategory !== 'all' && <span className="text-[#0F766E] font-semibold"> in {activeCat?.name}</span>}
              </p>
            </div>

            {/* Category sections */}
            <div className="space-y-10">
              {filteredCategories.map(cat => (
                <CategorySection key={cat.id} cat={cat} />
              ))}
              {filteredCategories.length === 0 && (
                <div className="py-20 text-center">
                  <p className="font-montserrat font-bold text-lg text-gray-400">No products found</p>
                  <p className="font-onest text-sm text-gray-400 mt-1">Try a different search term</p>
                  <button onClick={() => { setSearch(''); setActiveCategory('all') }}
                    className="mt-4 text-[#0F766E] font-montserrat font-bold text-sm underline">
                    Clear filters
                  </button>
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
            <a href="https://wa.me/971504654613?text=Hi, I need help finding a product."
              target="_blank" rel="noreferrer"
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

/* ── Sidebar content (shared between desktop + mobile) ── */
function SidebarContent({ activeCategory, setActiveCategory }) {
  return (
    <div className="py-2">
      <p className="font-montserrat font-bold text-[11px] uppercase tracking-widest text-gray-400 px-3 mb-3">
        Categories
      </p>
      <button
        onClick={() => setActiveCategory('all')}
        className={`w-full text-left flex items-center justify-between px-3 py-2.5 rounded text-sm transition-colors mb-0.5 ${
          activeCategory === 'all'
            ? 'bg-[#0F766E] text-white font-montserrat font-bold'
            : 'font-onest text-gray-600 hover:bg-gray-100 hover:text-[#0F766E]'
        }`}
      >
        <span className="flex items-center gap-2">
          <span className="text-base">🏗️</span> All Products
        </span>
        {activeCategory === 'all' && <ChevronRight size={14} />}
      </button>
      {productCategories.map(cat => (
        <button
          key={cat.id}
          onClick={() => setActiveCategory(cat.slug)}
          className={`w-full text-left flex items-center justify-between px-3 py-2.5 rounded text-sm transition-colors mb-0.5 ${
            activeCategory === cat.slug
              ? 'bg-[#0F766E] text-white font-montserrat font-bold'
              : 'font-onest text-gray-600 hover:bg-gray-100 hover:text-[#0F766E]'
          }`}
        >
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

/* ── Category section with product cards ── */
function CategorySection({ cat }) {
  const route = ROUTE[cat.slug] || '/products'
  const img = CAT_IMG[cat.slug]

  return (
    <section>
      {/* Section header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{cat.icon}</span>
          <div>
            <h2 className="font-montserrat font-bold text-base text-[#0c0c0b]">{cat.name}</h2>
            <p className="font-onest text-xs text-gray-500">{cat.products.length} products</p>
          </div>
        </div>
        <Link to={route}
          className="inline-flex items-center gap-1 text-[#0F766E] font-montserrat font-bold text-xs hover:gap-2 transition-all">
          View Category <ChevronRight size={13} />
        </Link>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {/* Category image card */}
        {img && (
          <Link to={route} className="group relative overflow-hidden rounded bg-gray-100 aspect-square block col-span-1">
            <img src={img} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-2 left-2 right-2">
              <span className="font-montserrat font-bold text-white text-xs block">{cat.name}</span>
            </div>
          </Link>
        )}
        {/* Product cards */}
        {cat.products.map(product => (
          <a key={product.id}
            href={`https://wa.me/971504654613?text=Hi, I'm interested in ${product.name} from ${cat.name}`}
            target="_blank" rel="noreferrer"
            className="group bg-gray-50 border border-gray-200 rounded p-3 hover:border-[#0F766E] hover:bg-white hover:shadow-md transition-all duration-200 cursor-pointer"
          >
            <div className="font-montserrat font-bold text-xs text-[#0c0c0b] mb-1 leading-tight">{product.name}</div>
            {product.model && (
              <div className="font-onest text-[10px] text-gray-400 mb-1.5">Model #{product.model}</div>
            )}
            {product.specs && (
              <div className="font-onest text-[10px] text-gray-500 leading-snug line-clamp-2">{product.specs}</div>
            )}
            <div className="mt-2.5 flex items-center gap-1 text-[#0F766E] opacity-0 group-hover:opacity-100 transition-opacity">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.13 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              <span className="font-montserrat font-bold text-[10px]">Enquire</span>
            </div>
          </a>
        ))}
      </div>

      {cat.brands && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {cat.brands.map(b => (
            <span key={b} className="font-onest text-[10px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{b}</span>
          ))}
        </div>
      )}
    </section>
  )
}
