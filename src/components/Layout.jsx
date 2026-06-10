import React, { useState } from 'react'
import { useLocation, Outlet, Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Search, X, ChevronRight } from 'lucide-react'

const NAV_CATS = [
  { label: 'Water Heaters',    href: '/milano-water-heaters' },
  { label: 'Water Closets',    href: '/water-closets' },
  { label: 'Wash Basins',      href: '/wash-basins' },
  { label: 'Wall Hung WC',     href: '/wall-hung' },
  { label: 'Tiles & Interlock',href: '/tiles-roof-interlock' },
  { label: 'Sanitary Ware',    href: '/sanitary-ware' },
  { label: 'Blocks & Sands',   href: '/blocks-sands' },
  { label: 'Cement',           href: '/cement' },
  { label: 'Steel',            href: '/steel' },
  { label: 'Plywood',          href: '/film-faced-plywood' },
  { label: 'Waterproofing',    href: '/water-proofing' },
  { label: 'Gypsum Board',     href: '/gypsum-board' },
  { label: 'Paints & Tools',   href: '/paints-tools' },
  { label: 'General Tools',    href: '/general-tools-plumbing' },
  { label: 'Plumbing',         href: '/plumbing-sanitary' },
  { label: 'Electric Lights',  href: '/electric-lights' },
]

/* ── Navbar ── */
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] bg-white border-b border-gray-200 shadow-sm">
      {/* Top bar */}
      <div className="bg-[#0F766E] text-white text-xs py-1.5 px-4 hidden md:block">
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
            <img src="/sglogocion.png" alt="Standard Group" className="w-8 h-8 object-contain" />
            <div className="hidden sm:block leading-tight">
              <span className="font-montserrat font-bold text-[#0c0c0b] text-xs block">Standard Group</span>
              <span className="font-montserrat text-[#0F766E] text-[9px] font-semibold">Building Materials, UAE</span>
            </div>
          </Link>

          {/* Center search */}
          <div className="flex-1 max-w-lg mx-auto hidden md:flex items-center border border-gray-300 rounded overflow-hidden h-9">
            <Search size={13} className="ml-3 text-gray-400 flex-shrink-0" />
            <input type="text" placeholder="Search tiles, cement, steel, gypsum..."
              className="flex-1 px-3 py-1.5 text-sm outline-none font-onest" />
            <Link to="/products"
              className="bg-[#0F766E] px-4 h-full text-white font-montserrat font-bold text-xs flex items-center hover:bg-[#0D6B64] transition-colors">
              Search
            </Link>
          </div>

          {/* Right nav */}
          <nav className="hidden lg:flex items-center gap-4 flex-shrink-0 ml-auto">
            <Link to="/products" className={`font-poppins text-xs hover:text-[#0F766E] transition-colors ${pathname === '/products' ? 'text-[#0F766E] font-bold' : 'text-[#555]'}`}>Products</Link>
            <Link to="/about"    className={`font-poppins text-xs hover:text-[#0F766E] transition-colors ${pathname === '/about'    ? 'text-[#0F766E] font-bold' : 'text-[#555]'}`}>About</Link>
            <Link to="/contact"  className={`font-poppins text-xs hover:text-[#0F766E] transition-colors ${pathname === '/contact'  ? 'text-[#0F766E] font-bold' : 'text-[#555]'}`}>Contact</Link>
            <a href="https://wa.me/971504654613" target="_blank" rel="noreferrer"
              className="bg-[#0F766E] text-white px-3 py-1.5 text-xs font-montserrat font-bold rounded hover:bg-[#0D6B64] transition-colors">
              Quick Enquiry
            </a>
          </nav>

          <button className="lg:hidden ml-auto p-1.5 text-[#444]" onClick={() => setMenuOpen(v => !v)}>
            {menuOpen
              ? <X size={20} />
              : <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
            }
          </button>
        </div>

        {/* Category nav row */}
        <div className="hidden lg:flex items-center border-t border-gray-100 overflow-x-auto scrollbar-hide">
          {NAV_CATS.map((cat, i) => (
            <Link key={i} to={cat.href}
              className={`whitespace-nowrap px-3 py-2 text-[11px] font-poppins hover:text-[#0F766E] hover:bg-gray-50 transition-colors border-b-2 ${
                pathname === cat.href ? 'text-[#0F766E] border-[#0F766E] font-bold' : 'text-[#555] border-transparent'
              }`}>
              {cat.label}
            </Link>
          ))}
          <Link to="/products" className="whitespace-nowrap px-3 py-2 text-[11px] font-poppins text-[#0F766E] font-bold hover:bg-gray-50 border-b-2 border-transparent">
            All →
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 px-4 py-4 max-h-[75vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-1 mb-4">
            {NAV_CATS.map((cat, i) => (
              <Link key={i} to={cat.href} onClick={() => setMenuOpen(false)}
                className="font-onest text-xs text-[#555] py-2 px-2 hover:text-[#0F766E] hover:bg-gray-50 rounded transition-colors">
                {cat.label}
              </Link>
            ))}
          </div>
          <div className="border-t border-gray-200 pt-3 flex flex-col gap-2">
            <Link to="/products" onClick={() => setMenuOpen(false)} className="font-poppins text-sm text-[#444] py-1">Products</Link>
            <Link to="/about"    onClick={() => setMenuOpen(false)} className="font-poppins text-sm text-[#444] py-1">About</Link>
            <Link to="/contact"  onClick={() => setMenuOpen(false)} className="font-poppins text-sm text-[#444] py-1">Contact</Link>
          </div>
          <a href="tel:+971555599508" className="mt-3 flex items-center gap-2 text-[#0F766E] font-montserrat font-bold text-sm">
            <Phone size={14} /> +971 55 559 9508
          </a>
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
      <div className="pt-[6.5rem] md:pt-[7.5rem]">
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
