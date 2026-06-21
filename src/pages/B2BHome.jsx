import React, { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Phone, Mail, MapPin, ArrowRight, Truck, ShieldCheck, PackageCheck, Clock, ChevronRight, Search, Menu, X } from 'lucide-react'
import { fetchCatalog, flattenProducts, fetchPartners } from '../lib/catalog'
import ProductCard from '../components/ProductCard'
import CategoryNav from '../components/CategoryNav'
import { accentByIndex } from '../config/colors'

const trustBadges = [
  { icon: <Truck size={20} />,        title: 'Fast Delivery',      desc: 'Across the UAE' },
  { icon: <ShieldCheck size={20} />,  title: 'Certified Products', desc: 'UAE & intl. standards' },
  { icon: <PackageCheck size={20} />, title: 'Bulk & On-Demand',   desc: 'Project quantities' },
  { icon: <Clock size={20} />,        title: 'Fast Support',       desc: 'Reply within hours' },
]

const stats = [
  { n: '20+',  label: 'Years in UAE' },
  { n: '31+',  label: 'Brands' },
  { n: '500+', label: 'Products' },
  { n: '2',    label: 'Showrooms' },
]

export default function B2BHome() {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [categories, setCategories] = useState([])
  const [partners, setPartners] = useState([])

  useEffect(() => {
    fetchCatalog().then(({ categories }) => setCategories(categories))
    fetchPartners().then(setPartners)
  }, [])

  const allProducts = useMemo(() => flattenProducts(categories), [categories])
  const featured = useMemo(() => allProducts.filter((p) => p.isFeatured).slice(0, 8), [allProducts])
  const bestsellers = useMemo(() => allProducts.filter((p) => p.isBestseller).slice(0, 8), [allProducts])
  // Fallbacks so the page never looks empty before flags are set.
  const featuredOrAny = featured.length ? featured : allProducts.slice(0, 8)
  const bestOrAny = bestsellers.length ? bestsellers : allProducts.slice(8, 16)
  const shopCats = useMemo(() => categories.filter((c) => c.products.length).slice(0, 8), [categories])

  const onSearch = (e) => { e.preventDefault(); navigate(`/products${search ? `?q=${encodeURIComponent(search)}` : ''}`) }

  return (
    <div className="min-h-screen bg-white font-onest">

      {/* ── TOP BAR ── */}
      <div className="bg-[#0F766E] text-white text-xs py-2 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span>🇦🇪 Abu Dhabi, UAE — National &amp; International Fulfillment Available</span>
          <div className="flex items-center gap-6">
            <a href="tel:+971555599508" className="flex items-center gap-1.5 hover:text-white/80"><Phone size={12} /> +971 55 559 9508</a>
            <a href="mailto:info@standardgroup.ae" className="flex items-center gap-1.5 hover:text-white/80"><Mail size={12} /> info@standardgroup.ae</a>
          </div>
        </div>
      </div>

      {/* ── HEADER ── */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">
            <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
              <img src="/sglogocion.png" alt="Standard Group" className="w-9 h-9 object-contain" />
              <div className="hidden sm:block leading-tight">
                <span className="font-montserrat font-bold text-[#0c0c0b] text-sm block">Standard Group</span>
                <span className="font-montserrat text-[#0F766E] text-[10px] font-semibold">Building Materials, UAE</span>
              </div>
            </Link>

            <form onSubmit={onSearch} className="flex-1 max-w-xl mx-auto hidden md:flex items-center border border-gray-300 rounded overflow-hidden">
              <input value={search} onChange={(e) => setSearch(e.target.value)} type="text"
                placeholder="Search products — tiles, cement, steel, gypsum..."
                className="flex-1 px-4 py-2.5 text-sm outline-none font-onest" />
              <button className="bg-[#0F766E] px-5 py-2.5 text-white flex items-center gap-1.5 text-sm font-montserrat font-bold hover:bg-[#0D6B64]">
                <Search size={14} /> Search
              </button>
            </form>

            <nav className="hidden lg:flex items-center gap-5 flex-shrink-0 ml-auto">
              <Link to="/products" className="font-poppins text-[#444] text-sm hover:text-[#0F766E]">Products</Link>
              <Link to="/about" className="font-poppins text-[#444] text-sm hover:text-[#0F766E]">About</Link>
              <Link to="/contact" className="font-poppins text-[#444] text-sm hover:text-[#0F766E]">Contact</Link>
              <a href="https://wa.me/971504654613" target="_blank" rel="noreferrer"
                className="bg-[#0F766E] text-white px-4 py-2 text-sm font-montserrat font-bold rounded hover:bg-[#0D6B64]">Quick Enquiry</a>
            </nav>

            <button className="lg:hidden ml-auto p-2 text-[#444]" onClick={() => setMenuOpen((v) => !v)}>
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          {/* Backend-driven, trimmed category nav with "More" dropdown */}
          <CategoryNav categories={categories} />
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 px-4 py-4">
            <form onSubmit={onSearch} className="flex items-center border border-gray-300 rounded overflow-hidden mb-4">
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..." className="flex-1 px-3 py-2 text-sm outline-none" />
              <button className="bg-[#0F766E] px-4 py-2 text-white text-sm font-bold">Go</button>
            </form>
            <div className="flex flex-col gap-3 mb-4">
              <Link to="/products" onClick={() => setMenuOpen(false)} className="font-poppins text-[#444] py-1">Products</Link>
              <Link to="/about" onClick={() => setMenuOpen(false)} className="font-poppins text-[#444] py-1">About</Link>
              <Link to="/contact" onClick={() => setMenuOpen(false)} className="font-poppins text-[#444] py-1">Contact</Link>
            </div>
            <div className="grid grid-cols-2 gap-1">
              {categories.map((c) => (
                <Link key={c.slug} to={`/products?cat=${c.slug}`} onClick={() => setMenuOpen(false)}
                  className="text-xs font-onest text-[#444] py-2 px-2 rounded hover:bg-gray-100">{c.icon} {c.name}</Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section className="relative bg-[#0c0c0b] overflow-hidden">
        <div className="absolute inset-0">
          <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-40" poster="/pics/1rebar.JPG">
            <source src="/standardgrouphero.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0c0c0b] via-[#0c0c0b]/75 to-[#0c0c0b]/30" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          <span className="inline-block bg-[#0F766E] text-white text-xs font-montserrat font-bold uppercase tracking-widest px-3 py-1.5 mb-4">
            Abu Dhabi's Building Materials Supplier
          </span>
          <h1 className="font-montserrat font-bold text-white text-3xl md:text-5xl leading-[1.1] mb-4 max-w-2xl">
            Everything Your Project Needs — <span className="text-[#FCD34D]">In One Place.</span>
          </h1>
          <div className="flex flex-wrap gap-3 mb-8">
            <Link to="/products" className="inline-flex items-center gap-2 bg-[#0F766E] text-white px-6 py-3 font-montserrat font-bold text-sm uppercase tracking-wide hover:bg-[#14B8A6] transition-colors">
              Shop All Products <ArrowRight size={16} />
            </Link>
            <a href="https://wa.me/971504654613?text=Hi, I need a price list." target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 border-2 border-white/40 text-white px-6 py-3 font-montserrat font-bold text-sm uppercase tracking-wide hover:border-white hover:bg-white/10 transition-colors">
              Request Price List
            </a>
          </div>
          <div className="flex flex-wrap gap-8">
            {stats.map((s, i) => (
              <div key={i} className="text-white">
                <span className="font-montserrat font-bold text-2xl md:text-3xl" style={{ color: accentByIndex(i).ring }}>{s.n}</span>
                <p className="font-onest text-xs md:text-sm text-white/70">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST BADGES ── */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-200">
          {trustBadges.map((b, i) => {
            const a = accentByIndex(i)
            return (
              <div key={i} className="flex items-center gap-3 px-4 md:px-6 py-5">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: a.soft, color: a.solid }}>{b.icon}</div>
                <div>
                  <p className="font-montserrat font-bold text-[#0c0c0b] text-sm">{b.title}</p>
                  <p className="font-onest text-[#888] text-xs">{b.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <Section title="Featured Products" subtitle="Hand-picked picks from our range" accent={accentByIndex(0)}>
        <ProductGrid products={featuredOrAny} />
      </Section>

      {/* ── SHOP BY CATEGORY ── */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHead title="Shop by Category" subtitle="Browse our full catalog" accent={accentByIndex(4)} />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {shopCats.map((c, i) => {
              const a = accentByIndex(i + 1)
              return (
                <Link key={c.slug} to={`/products?cat=${c.slug}`}
                  className="group relative overflow-hidden rounded-xl p-5 h-32 flex flex-col justify-between transition-transform hover:-translate-y-1"
                  style={{ background: a.soft }}>
                  <span className="text-3xl">{c.icon || '📦'}</span>
                  <div>
                    <span className="font-montserrat font-bold text-sm block" style={{ color: a.text }}>{c.name}</span>
                    <span className="font-onest text-xs text-gray-500">{c.products.length} products</span>
                  </div>
                  <ChevronRight size={16} className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: a.solid }} />
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── BEST SELLERS ── */}
      <Section title="Best Sellers" subtitle="Most ordered by contractors" accent={accentByIndex(2)}>
        <ProductGrid products={bestOrAny} />
      </Section>

      {/* ── PARTNERS ── */}
      {partners.length > 0 && (
        <section className="py-12 bg-white border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHead title="Our Partners & Brands" subtitle={`Authorized dealer for ${partners.length}+ trusted brands`} accent={accentByIndex(5)} />
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {partners.map((p, i) => {
                const a = accentByIndex(i)
                return (
                  <div key={p.id} className="aspect-[3/2] rounded-lg border border-gray-200 bg-white grid place-items-center p-3 hover:shadow-md transition-shadow">
                    {p.logo
                      ? <img src={p.logo} alt={p.name} className="max-h-full max-w-full object-contain" />
                      : <span className="font-montserrat font-bold text-sm text-center" style={{ color: a.text }}>{p.name}</span>}
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="bg-[#0F766E] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-montserrat font-bold text-white text-2xl">Need a quote for your project?</h3>
            <p className="font-onest text-white/80 text-sm mt-1">Message us on WhatsApp for fast, competitive pricing.</p>
          </div>
          <div className="flex flex-wrap gap-3 flex-shrink-0">
            <a href="https://wa.me/971504654613?text=Hi, I'd like a quote." target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 bg-white text-[#0F766E] px-6 py-3 font-montserrat font-bold text-sm rounded hover:bg-gray-100">WhatsApp Now</a>
            <a href="tel:+971555599508" className="inline-flex items-center gap-2 border-2 border-white text-white px-6 py-3 font-montserrat font-bold text-sm rounded hover:bg-white/10"><Phone size={16} /> Call Us</a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#111] text-white pt-12 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src="/sglogocion.png" alt="Standard Group" className="w-8 h-8 object-contain" />
                <span className="font-montserrat font-bold text-white">Standard Group</span>
              </div>
              <p className="font-onest text-white/50 text-sm">UAE's trusted B2B building materials supplier. Serving contractors &amp; builders since 2003.</p>
            </div>
            <div>
              <h4 className="font-montserrat font-bold text-white text-sm uppercase tracking-wider mb-4">Shop</h4>
              <ul className="space-y-2">
                {shopCats.slice(0, 7).map((c) => (
                  <li key={c.slug}><Link to={`/products?cat=${c.slug}`} className="font-onest text-white/50 text-sm hover:text-[#14B8A6]">{c.name}</Link></li>
                ))}
                <li><Link to="/products" className="font-onest text-[#14B8A6] text-sm font-semibold">View All →</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-montserrat font-bold text-white text-sm uppercase tracking-wider mb-4">Company</h4>
              <ul className="space-y-2">
                {[['About Us', '/about'], ['Contact', '/contact'], ['Products', '/products']].map(([l, h]) => (
                  <li key={l}><Link to={h} className="font-onest text-white/50 text-sm hover:text-[#14B8A6]">{l}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-montserrat font-bold text-white text-sm uppercase tracking-wider mb-4">Contact</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-2"><Phone size={14} className="text-[#14B8A6] mt-0.5" />
                  <div>
                    <a href="tel:+971555599508" className="font-onest text-white/60 text-sm hover:text-white block">+971 55 559 9508</a>
                    <a href="tel:+971504654613" className="font-onest text-white/60 text-sm hover:text-white block">+971 50 465 4613</a>
                  </div>
                </li>
                <li className="flex items-center gap-2"><Mail size={14} className="text-[#14B8A6]" />
                  <a href="mailto:info@standardgroup.ae" className="font-onest text-white/60 text-sm hover:text-white">info@standardgroup.ae</a></li>
                <li className="flex items-start gap-2"><MapPin size={14} className="text-[#14B8A6] mt-0.5" />
                  <span className="font-onest text-white/50 text-sm">Baniyas West &amp; Mafraq, Abu Dhabi</span></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-5 flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="font-onest text-white/30 text-xs">© {new Date().getFullYear()} Standard Group LLC. All rights reserved.</p>
            <p className="font-montserrat text-white/20 text-[10px] uppercase tracking-[0.2em]">We Set Standards</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

/* ── helpers ── */
function SectionHead({ title, subtitle, accent }) {
  return (
    <div className="flex items-end justify-between mb-6">
      <div className="border-l-4 pl-3" style={{ borderColor: accent.solid }}>
        <h2 className="font-montserrat font-bold text-2xl md:text-3xl text-[#0c0c0b]">{title}</h2>
        {subtitle && <p className="font-onest text-[#666] text-sm mt-0.5">{subtitle}</p>}
      </div>
      <Link to="/products" className="hidden md:inline-flex items-center gap-1 font-montserrat font-bold text-sm hover:gap-2 transition-all" style={{ color: accent.text }}>
        View all <ChevronRight size={16} />
      </Link>
    </div>
  )
}

function Section({ title, subtitle, accent, children }) {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHead title={title} subtitle={subtitle} accent={accent} />
        {children}
      </div>
    </section>
  )
}

function ProductGrid({ products }) {
  if (!products.length) return <p className="font-onest text-gray-400 py-10 text-center">Loading products…</p>
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
      {products.map((p) => <ProductCard key={p.id} product={p} />)}
    </div>
  )
}
