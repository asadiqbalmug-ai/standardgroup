import React, { useEffect, useState } from 'react'
import { useLocation, Outlet, Link, useNavigate } from 'react-router-dom'
import { Phone, Mail, MapPin, Search, X, ChevronRight, Home, Grid, MessageCircle } from 'lucide-react'
import CategoryNav from './CategoryNav'
import { fetchCatalog } from '../lib/catalog'

/* ── Navbar ── */
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [cats, setCats] = useState([])
  const { pathname } = useLocation()
  const navigate = useNavigate()

  useEffect(() => { fetchCatalog().then(({ categories }) => setCats(categories)) }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    navigate(`/products${search ? `?q=${encodeURIComponent(search)}` : ''}`)
    setMenuOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] bg-white border-b border-gray-200 shadow-sm">
      {/* Top bar — desktop only */}
      <div className="bg-[#0F766E] text-white text-[11px] py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="font-onest">🇦🇪 Abu Dhabi, UAE — National &amp; International Fulfillment</span>
          <div className="flex items-center gap-5">
            <a href="tel:+971555599508" className="flex items-center gap-1 hover:text-white/80 transition-colors">
              <Phone size={11} /> +971 55 559 9508
            </a>
            <a href="mailto:info@standardgroup.ae" className="flex items-center gap-1 hover:text-white/80 transition-colors">
              <Mail size={11} /> info@standardgroup.ae
            </a>
          </div>
        </div>
      </div>

      {/* Main header row */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 h-13 sm:h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <img src="/sglogocion.png" alt="Standard Group" className="w-7 h-7 sm:w-8 sm:h-8 object-contain" />
            <div className="leading-tight">
              <span className="font-montserrat font-bold text-[#0c0c0b] text-[11px] sm:text-xs block">Standard Group</span>
              <span className="font-montserrat text-[#0F766E] text-[8px] sm:text-[9px] font-semibold hidden sm:block">Building Materials, UAE</span>
            </div>
          </Link>

          {/* Center search — desktop */}
          <form onSubmit={handleSearch} className="flex-1 max-w-lg mx-auto hidden md:flex items-center border border-gray-300 rounded overflow-hidden h-9">
            <Search size={13} className="ml-3 text-gray-400 flex-shrink-0" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search tiles, cement, steel, gypsum..."
              className="flex-1 px-3 py-1.5 text-sm outline-none font-onest"
            />
            <button type="submit"
              className="bg-[#0F766E] px-4 h-full text-white font-montserrat font-bold text-xs hover:bg-[#0D6B64] transition-colors">
              Search
            </button>
          </form>

          {/* Right nav — desktop */}
          <nav className="hidden lg:flex items-center gap-4 flex-shrink-0 ml-auto">
            <Link to="/products" className={`font-poppins text-xs hover:text-[#0F766E] transition-colors ${pathname === '/products' ? 'text-[#0F766E] font-bold' : 'text-[#555]'}`}>Products</Link>
            <Link to="/about"    className={`font-poppins text-xs hover:text-[#0F766E] transition-colors ${pathname === '/about'    ? 'text-[#0F766E] font-bold' : 'text-[#555]'}`}>About</Link>
            <Link to="/contact"  className={`font-poppins text-xs hover:text-[#0F766E] transition-colors ${pathname === '/contact'  ? 'text-[#0F766E] font-bold' : 'text-[#555]'}`}>Contact</Link>
            <a href="https://wa.me/971504654613" target="_blank" rel="noreferrer"
              className="bg-[#0F766E] text-white px-3 py-1.5 text-xs font-montserrat font-bold rounded hover:bg-[#0D6B64] transition-colors">
              Quick Enquiry
            </a>
          </nav>

          {/* Mobile right — search icon + hamburger */}
          <div className="lg:hidden ml-auto flex items-center gap-2">
            <a href="https://wa.me/971504654613" target="_blank" rel="noreferrer"
              className="flex items-center gap-1 bg-[#0F766E] text-white px-2.5 py-1.5 rounded text-[11px] font-montserrat font-bold">
              <MessageCircle size={13} /> Enquire
            </a>
            <button className="p-1.5 text-[#444] touch-manipulation" onClick={() => setMenuOpen(v => !v)} aria-label="Menu">
              {menuOpen
                ? <X size={22} />
                : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
              }
            </button>
          </div>
        </div>

        {/* Category nav row — desktop only, backend-driven + trimmed */}
        <CategoryNav />
      </div>

      {/* Mobile full-screen menu */}
      {menuOpen && (
        <div className="lg:hidden fixed inset-0 top-[52px] bg-white z-50 overflow-y-auto pb-20">
          {/* Mobile search */}
          <form onSubmit={handleSearch} className="flex items-center border-b border-gray-200 px-4 py-3 gap-2 bg-gray-50">
            <Search size={16} className="text-gray-400 flex-shrink-0" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search products..."
              className="flex-1 text-sm outline-none bg-transparent font-onest"
            />
            <button type="submit" className="bg-[#0F766E] text-white px-3 py-1.5 rounded text-xs font-montserrat font-bold">
              Go
            </button>
          </form>

          {/* Quick links */}
          <div className="flex border-b border-gray-100">
            {[['Home','/',<Home size={15}/>],['Products','/products',<Grid size={15}/>],['Contact','/contact',<Phone size={15}/>]].map(([l,h,icon]) => (
              <Link key={l} to={h} onClick={() => setMenuOpen(false)}
                className="flex-1 flex flex-col items-center gap-1 py-3 text-[#555] hover:text-[#0F766E] hover:bg-gray-50 transition-colors">
                {icon}
                <span className="font-poppins text-[10px]">{l}</span>
              </Link>
            ))}
          </div>

          {/* Categories grid */}
          <div className="px-4 pt-4 pb-2">
            <p className="font-montserrat font-bold text-[10px] uppercase tracking-widest text-gray-400 mb-3">All Categories</p>
            <div className="grid grid-cols-2 gap-1">
              {cats.map((cat) => (
                <Link key={cat.slug} to={`/products?cat=${cat.slug}`} onClick={() => setMenuOpen(false)}
                  className="font-onest text-sm py-3 px-3 rounded-lg transition-colors flex items-center gap-2 text-[#444] hover:bg-gray-100 hover:text-[#0F766E]">
                  <span className="flex-shrink-0">{cat.icon || <ChevronRight size={12} />}</span>
                  <span className="text-xs leading-tight">{cat.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Contact strip */}
          <div className="mx-4 mt-4 bg-[#0F766E] rounded-xl p-4">
            <p className="font-montserrat font-bold text-white text-sm mb-3">Get a Quote</p>
            <div className="flex flex-col gap-2">
              <a href="https://wa.me/971504654613" target="_blank" rel="noreferrer"
                className="flex items-center gap-2 bg-white text-[#0F766E] px-4 py-2.5 rounded-lg font-montserrat font-bold text-sm">
                <MessageCircle size={16} /> WhatsApp Us
              </a>
              <a href="tel:+971555599508"
                className="flex items-center gap-2 border border-white/40 text-white px-4 py-2.5 rounded-lg font-montserrat font-bold text-sm">
                <Phone size={16} /> Call: +971 55 559 9508
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

/* ── Footer ── */
function Footer() {
  const productLinks = [
    ['Water Heaters',     '/milano-water-heaters'],
    ['Water Closets',     '/water-closets'],
    ['Wash Basins',       '/wash-basins'],
    ['Tiles & Interlock', '/tiles-roof-interlock'],
    ['Cement',            '/cement'],
    ['Steel',             '/steel'],
    ['Waterproofing',     '/water-proofing'],
    ['Gypsum Board',      '/gypsum-board'],
    ['Paints & Tools',    '/paints-tools'],
    ['Plumbing',          '/plumbing-sanitary'],
    ['Electric Lights',   '/electric-lights'],
    ['View All →',        '/products'],
  ]

  return (
    <footer className="bg-[#111] text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/sglogocion.png" alt="Standard Group" className="w-8 h-8 object-contain" />
              <span className="font-montserrat font-bold text-white text-sm">Standard Group</span>
            </div>
            <p className="font-onest text-white/40 text-sm mb-4 leading-relaxed">
              UAE's trusted B2B building materials supplier. National &amp; international fulfillment since 2003.
            </p>
            <a href="https://wa.me/971504654613" target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 bg-[#0F766E] text-white px-4 py-2 text-xs font-montserrat font-bold rounded hover:bg-[#14B8A6] transition-colors">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.13 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp Us
            </a>
          </div>

          {/* Products */}
          <div className="md:col-span-2">
            <h4 className="font-montserrat font-bold text-white text-xs uppercase tracking-wider mb-4">Products</h4>
            <div className="grid grid-cols-2 gap-y-2 gap-x-4">
              {productLinks.map(([l, h]) => (
                <Link key={l} to={h} className="font-onest text-white/45 text-sm hover:text-[#14B8A6] transition-colors">{l}</Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-montserrat font-bold text-white text-xs uppercase tracking-wider mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Phone size={13} className="text-[#14B8A6] mt-0.5 flex-shrink-0" />
                <div>
                  <a href="tel:+971555599508" className="font-onest text-white/50 text-sm hover:text-white block">+971 55 559 9508</a>
                  <a href="tel:+971504654613" className="font-onest text-white/50 text-sm hover:text-white block">+971 50 465 4613</a>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={13} className="text-[#14B8A6] flex-shrink-0" />
                <a href="mailto:info@standardgroup.ae" className="font-onest text-white/50 text-sm hover:text-white">info@standardgroup.ae</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={13} className="text-[#14B8A6] mt-0.5 flex-shrink-0" />
                <div className="font-onest text-white/40 text-sm">
                  <p>Baniyas West, Abu Dhabi</p>
                  <p>Mafraq, Abu Dhabi</p>
                </div>
              </li>
            </ul>

            <div className="mt-4">
              <h4 className="font-montserrat font-bold text-white text-xs uppercase tracking-wider mb-2">Company</h4>
              <div className="flex flex-col gap-1">
                {[['About Us', '/about'], ['Contact', '/contact'], ['All Products', '/products']].map(([l, h]) => (
                  <Link key={l} to={h} className="font-onest text-white/45 text-sm hover:text-[#14B8A6] transition-colors">{l}</Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-5 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="font-onest text-white/25 text-xs">© {new Date().getFullYear()} Standard Group LLC. All rights reserved.</p>
          <p className="font-montserrat text-white/15 text-[10px] uppercase tracking-[0.2em]">We Set Standards</p>
        </div>
      </div>
    </footer>
  )
}

/* ── Layout wrapper ── */
export default function Layout() {
  return (
    <>
      <Navbar />
      {/* pt: mobile=52px header only | md=top-bar(28px)+header(56px) | lg=+category-row(36px) */}
      <div className="pt-[52px] md:pt-[84px] lg:pt-[120px]">
        <Outlet />
      </div>
      <Footer />
      {/* Floating WhatsApp */}
      <a href="https://wa.me/971504654613" target="_blank" rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 w-13 h-13 bg-[#25D366] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#128C7E] transition-colors"
        style={{width:'52px',height:'52px'}}
        aria-label="WhatsApp">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.13 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>
    </>
  )
}
