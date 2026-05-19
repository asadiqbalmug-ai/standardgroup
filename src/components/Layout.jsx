import React, { useEffect, useRef, useState } from 'react'
import { useLocation, Outlet } from 'react-router-dom'
import { ArrowRight, MapPin, Phone, Mail, Linkedin, Facebook, Instagram, Youtube, X, MessageCircle, ChevronRight } from 'lucide-react'

/* ─── SHARED CATEGORY NAV DATA ─── */
const categoryNav = [
  { label: 'Water Heaters',   href: '/milano-water-heaters',   accent: '#2563eb' },
  { label: 'Water Closets',   href: '/water-closets',          accent: '#7C3AED' },
  { label: 'Wash Basins',     href: '/wash-basins',            accent: '#0D9488' },
  { label: 'Wall Hung WC',    href: '/wall-hung',              accent: '#B45309' },
  { label: 'Tiles & Interlock', href: '/tiles-roof-interlock', accent: '#059669' },
  { label: 'Sanitary Ware',   href: '/sanitary-ware',          accent: '#1D4ED8' },
  { label: 'Blocks & Sands',  href: '/blocks-sands',           accent: '#92400E' },
  { label: 'Cement',          href: '/cement',                 accent: '#6B7280' },
  { label: 'Steel',           href: '/steel',                  accent: '#475569' },
  { label: 'Film Plywood',    href: '/film-faced-plywood',     accent: '#78350F' },
  { label: 'Waterproofing',   href: '/water-proofing',         accent: '#0369A1' },
  { label: 'Gypsum Board',    href: '/gypsum-board',           accent: '#64748B' },
  { label: 'Paints & Tools',  href: '/paints-tools',           accent: '#BE123C' },
  { label: 'General Tools',   href: '/general-tools-plumbing', accent: '#0F766E' },
  { label: 'Plumbing 16',     href: '/plumbing-sanitary',      accent: '#0C4A6E' },
  { label: 'Plumbing 17',     href: '/plumbing-sanitary-2',    accent: '#1E3A5F' },
  { label: 'Electric Lights', href: '/electric-lights',        accent: '#CA8A04' },
  { label: 'Our Story',       href: '/#about', bold: true,     accent: '#A58B62' },
]

const footerLinks = [
  { label: 'Water Heaters',            href: '/milano-water-heaters' },
  { label: 'Water Closets',            href: '/water-closets' },
  { label: 'Wash Basins',              href: '/wash-basins' },
  { label: 'Wall Hung WC',             href: '/wall-hung' },
  { label: 'Tiles & Interlock',        href: '/tiles-roof-interlock' },
  { label: 'Sanitary Ware',            href: '/sanitary-ware' },
  { label: 'Blocks & Sands',           href: '/blocks-sands' },
  { label: 'Cement',                   href: '/cement' },
  { label: 'Steel',                    href: '/steel' },
  { label: 'Film Plywood',             href: '/film-faced-plywood' },
  { label: 'Waterproofing',            href: '/water-proofing' },
  { label: 'Gypsum Board',             href: '/gypsum-board' },
  { label: 'Paints & Tools',           href: '/paints-tools' },
  { label: 'General Tools',            href: '/general-tools-plumbing' },
  { label: 'Plumbing & Sanitary (16)', href: '/plumbing-sanitary' },
  { label: 'Plumbing & Sanitary (17)', href: '/plumbing-sanitary-2' },
  { label: 'Electric Lights',          href: '/electric-lights' },
]

/* ════════════════════════════════
   NAVBAR
════════════════════════════════ */
function Navbar() {
  const [scrolled,    setScrolled]    = useState(false)
  const [mobileOpen,  setMobileOpen]  = useState(false)
  const [searchOpen,  setSearchOpen]  = useState(false)
  const [searchQ,     setSearchQ]     = useState('')
  const location = useLocation()
  const navScrollRef = useRef(null)

  const scrollNav = (dir) => {
    if (navScrollRef.current) navScrollRef.current.scrollBy({ left: dir * 200, behavior: 'smooth' })
  }

  const isActive = (href) => {
    if (href.startsWith('#') || href.startsWith('/#')) return false
    return location.pathname === href || location.pathname.startsWith(href + '/')
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const filtered = searchQ.trim()
    ? categoryNav.filter(n => n.label.toLowerCase().includes(searchQ.toLowerCase()))
    : categoryNav

  return (
    <header className={`fixed top-0 left-0 right-0 z-[100] bg-white transition-all duration-300 ${scrolled ? 'shadow-md' : ''}`}>

      {/* ── TOP BAR ── */}
      <div className="bg-white border-b border-black/[0.06] px-6 lg:px-12 h-12 flex items-center relative">
        {/* Left */}
        <div className="flex-1 flex items-center gap-2">
          <MapPin size={13} className="text-[#888]" />
          <a href="/#contactus" className="text-[#666] text-[11px] tracking-[0.08em] hover:text-[#1a1a1a] transition-colors">Showrooms</a>
        </div>

        {/* Centre — Logo */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full border border-[#A58B62]/60 flex items-center justify-center">
            <span className="font-serif italic text-[#A58B62] text-base font-bold leading-none">S</span>
          </div>
          <a href="/" className="flex flex-col leading-none">
            <span className="font-quicksand text-[13px] tracking-[0.18em] text-[#1a1a1a] uppercase">Standard Group</span>
            <span className="text-[8px] tracking-[0.25em] text-[#A58B62] uppercase font-medium">We Set Standards</span>
          </a>
        </div>

        {/* Right */}
        <div className="flex-1 flex items-center justify-end gap-4">
          <div className="flex items-center gap-2">
            {searchOpen && (
              <input
                autoFocus
                value={searchQ}
                onChange={e => setSearchQ(e.target.value)}
                placeholder="Search products…"
                className="text-[11px] border-b border-[#ccc] bg-transparent outline-none px-1 py-0.5 w-36 text-[#333] placeholder-[#aaa]"
                onBlur={() => { if (!searchQ) setSearchOpen(false) }}
              />
            )}
            <button onClick={() => setSearchOpen(v => !v)} className="text-[#666] hover:text-[#1a1a1a] transition-colors">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            </button>
          </div>
          <a href="https://wa.me/971000000000" target="_blank" rel="noreferrer" className="text-[#666] hover:text-[#25D366] transition-colors" title="WhatsApp">
            <MessageCircle size={15} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-[#666] hover:text-[#E1306C] transition-colors" title="Instagram">
            <Instagram size={15} />
          </a>
          <a href="/#contactus" className="hidden sm:inline-flex items-center gap-1.5 bg-[#A58B62] text-white text-[10px] tracking-[0.1em] uppercase px-3.5 py-1.5 rounded-full hover:bg-[#8B7355] transition-colors">
            Contact <ArrowRight size={10} />
          </a>
          <button onClick={() => setMobileOpen(v => !v)} className="lg:hidden text-[#666] ml-1">
            {mobileOpen ? <X size={18} /> : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>}
          </button>
        </div>
      </div>

      {/* ── CATEGORY NAV ── */}
      <div className="hidden lg:block bg-white border-b border-black/[0.06]">
      <div className="max-w-[1100px] mx-auto flex items-stretch h-[38px]">
        {/* Scroll Left */}
        <button
          onClick={() => scrollNav(-1)}
          className="flex-shrink-0 w-8 flex items-center justify-center text-[#999] hover:text-[#1a1a1a] hover:bg-black/[0.04] transition-colors border-r border-black/[0.08]"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
        </button>

        {/* Scrollable tabs */}
        <div ref={navScrollRef} className="flex-1 overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-0 whitespace-nowrap">
            {filtered.map((item) => {
              const active = isActive(item.href)
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`inline-flex items-center px-4 py-2.5 text-[11.5px] tracking-[0.04em] transition-all duration-200 whitespace-nowrap font-medium
                    ${active ? 'text-white' : item.bold ? 'text-[#1a1a1a]' : 'text-[#555]'}`}
                  style={active ? { backgroundColor: item.accent } : {}}
                  onMouseEnter={e => { if (!active) e.currentTarget.style.backgroundColor = item.accent + '18' }}
                  onMouseLeave={e => { if (!active) e.currentTarget.style.backgroundColor = '' }}
                >
                  {item.label}
                </a>
              )
            })}
          </div>
        </div>

        {/* Scroll Right */}
        <button
          onClick={() => scrollNav(1)}
          className="flex-shrink-0 w-8 flex items-center justify-center text-[#999] hover:text-[#1a1a1a] hover:bg-black/[0.04] transition-colors border-l border-black/[0.08]"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>
      </div>

      {/* ── MOBILE MENU ── */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-black/5 shadow-lg max-h-[70vh] overflow-y-auto">
          <div className="px-6 py-3 border-b border-black/5">
            <input
              value={searchQ}
              onChange={e => setSearchQ(e.target.value)}
              placeholder="Search products…"
              className="w-full text-[12px] border border-[#ddd] rounded-lg px-3 py-2 outline-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-0">
            {filtered.map((item) => {
              const active = isActive(item.href)
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`px-5 py-3 text-[11px] tracking-[0.06em] border-b border-r border-black/[0.04] transition-colors
                    ${active
                      ? 'bg-[#A58B62] text-white font-semibold'
                      : item.bold
                        ? 'font-semibold text-[#1a1a1a] hover:bg-[#F9F6F0] hover:text-[#A58B62]'
                        : 'text-[#555] hover:bg-[#F9F6F0] hover:text-[#A58B62]'
                    }`}
                >
                  {item.label}
                </a>
              )
            })}
          </div>
        </div>
      )}
    </header>
  )
}

/* ════════════════════════════════
   FOOTER
════════════════════════════════ */
function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-full border border-[#A58B62]/70 flex items-center justify-center flex-shrink-0">
              <span className="font-serif italic text-[#A58B62] text-base font-bold leading-none">S</span>
            </div>
            <div>
              <p className="font-quicksand text-white text-[13px] tracking-[0.15em] uppercase leading-none">Standard Group</p>
              <p className="text-[#A58B62] text-[9px] tracking-[0.25em] uppercase mt-0.5">We Set Standards</p>
            </div>
          </div>
          <p className="text-[#888] text-xs leading-relaxed mb-6">
            Premier building materials supplier in the UAE. Quality construction and finishing products from globally trusted brands — serving residential, commercial, and industrial projects for over 20 years.
          </p>
          <div className="flex items-center gap-3">
            {[
              { href: 'https://wa.me/971000000000',  icon: <MessageCircle size={13} />, hover: '#25D366' },
              { href: 'https://instagram.com',        icon: <Instagram size={13} />,     hover: '#E1306C' },
              { href: 'https://facebook.com',         icon: <Facebook size={13} />,      hover: '#1877F2' },
              { href: 'https://linkedin.com',         icon: <Linkedin size={13} />,      hover: '#0A66C2' },
              { href: 'https://youtube.com',          icon: <Youtube size={13} />,       hover: '#FF0000' },
            ].map(({ href, icon }) => (
              <a key={href} href={href} target="_blank" rel="noreferrer"
                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-[#888] hover:text-white hover:border-white/30 transition-all">
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Product Categories */}
        <div className="lg:col-span-2">
          <h4 className="text-[10px] tracking-[0.25em] uppercase text-[#A58B62] font-semibold mb-5 pb-3 border-b border-white/[0.06]">Product Categories</h4>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2.5">
            {footerLinks.map((item) => (
              <a key={item.href} href={item.href}
                className="flex items-center gap-2 text-[#888] hover:text-white transition-colors text-[11px] group">
                <span className="w-1 h-1 rounded-full bg-[#A58B62]/40 group-hover:bg-[#A58B62] transition-colors flex-shrink-0" />
                {item.label}
              </a>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-[10px] tracking-[0.25em] uppercase text-[#A58B62] font-semibold mb-5 pb-3 border-b border-white/[0.06]">Get In Touch</h4>
          <div className="flex flex-col gap-4 mb-8">
            <a href="tel:+97142220000" className="flex items-start gap-3 text-[#888] hover:text-white transition-colors">
              <Phone size={13} className="text-[#A58B62] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-[10px] text-[#555] uppercase tracking-wider mb-0.5">Phone</p>
                <p className="text-[11px]">+971 4 222 0000</p>
              </div>
            </a>
            <a href="mailto:sales@standardgroup.ae" className="flex items-start gap-3 text-[#888] hover:text-white transition-colors">
              <Mail size={13} className="text-[#A58B62] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-[10px] text-[#555] uppercase tracking-wider mb-0.5">Email</p>
                <p className="text-[11px]">sales@standardgroup.ae</p>
              </div>
            </a>
            <div className="flex items-start gap-3 text-[#888]">
              <MapPin size={13} className="text-[#A58B62] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-[10px] text-[#555] uppercase tracking-wider mb-0.5">Showroom</p>
                <p className="text-[11px] leading-relaxed">Dubai, United Arab Emirates</p>
              </div>
            </div>
          </div>
          <h4 className="text-[10px] tracking-[0.25em] uppercase text-[#A58B62] font-semibold mb-3">Quick Links</h4>
          <div className="flex flex-col gap-2">
            {[['Home', '/'], ['Products', '/#products'], ['About Us', '/#about'], ['Contact Us', '/#contactus']].map(([l, h]) => (
              <a key={l} href={h}
                className="text-[#888] hover:text-white transition-colors text-[11px] flex items-center gap-2 group">
                <ChevronRight size={10} className="text-[#A58B62]/50 group-hover:text-[#A58B62] transition-colors" />
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[#555] text-[11px]">© {new Date().getFullYear()} Standard Group LLC. All rights reserved.</p>
          <p className="text-[#444] text-[10px] tracking-[0.25em] uppercase font-semibold">We Set Standards</p>
          <p className="text-[#555] text-[11px]">Dubai, United Arab Emirates</p>
        </div>
      </div>
    </footer>
  )
}

/* ════════════════════════════════
   LAYOUT WRAPPER
════════════════════════════════ */
export default function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}
