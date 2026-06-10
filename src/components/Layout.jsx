import React, { useEffect, useRef, useState } from 'react'
import { useLocation, Outlet, Link } from 'react-router-dom'
import { ArrowRight, MapPin, Phone, Mail, Linkedin, Facebook, Instagram, Youtube, X, MessageCircle, ChevronRight } from 'lucide-react'
import WhatsAppButton from './WhatsAppButton'
import ChatbotButton from './ChatbotButton'

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
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  const isActive = (href) => {
    if (href.startsWith('#') || href.startsWith('/#')) return false
    return location.pathname === href || location.pathname.startsWith(href + '/')
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-[100] bg-white transition-all duration-300 ${scrolled ? 'shadow-md' : ''}`}>
      {/* ── Top row: logo + nav ── */}
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src="/sglogocion.png" alt="" className="w-10 h-10 object-contain" />
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="font-montserrat text-[#1a1a1a] text-sm tracking-[0.12em] uppercase font-bold">Standard Group</span>
            <span className="font-montserrat text-[11px] text-[#666] font-bold not-italic">We Set Standards</span>
          </div>
        </Link>
        <nav className="hidden lg:flex items-center gap-6">
          <Link to="/products" className="font-poppins text-[#555] text-xs tracking-[0.1em] uppercase font-medium hover:text-[#A58B62] transition-colors">Products</Link>
          <Link to="/about" className="font-poppins text-[#555] text-xs tracking-[0.1em] uppercase font-medium hover:text-[#A58B62] transition-colors">About Us</Link>
          <Link to="/contact" className="font-poppins text-[#555] text-xs tracking-[0.1em] uppercase font-medium hover:text-[#A58B62] transition-colors">Contact</Link>
          <a href="/#contact" className="ml-2 inline-flex items-center px-5 py-2.5 text-white text-xs tracking-[0.1em] uppercase font-poppins font-bold rounded-sm" style={{background:'#A58B62'}}>Get a Quote</a>
        </nav>
        <button onClick={() => setMobileOpen(v => !v)} className="lg:hidden text-[#1a1a1a]">
          {mobileOpen ? <X size={22} /> : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>}
        </button>
      </div>

      {/* ── Bottom row: category tabs ── */}
      <div className="hidden lg:block border-t border-black/[0.08]">
        <div className="max-w-7xl mx-auto overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-0 whitespace-nowrap px-6">
            {categoryNav.map((item, i) => {
              const active = isActive(item.href)
              return (
                <a
                  key={i}
                  href={item.href}
                  className={`font-onest text-[11.5px] tracking-[0.04em] px-4 py-2.5 hover:bg-black/[0.04] transition-all duration-200 whitespace-nowrap ${active ? 'font-semibold' : 'text-[#555] hover:text-[#A58B62]'}`}
                  style={active ? { color: item.accent, backgroundColor: item.accent + '10' } : undefined}
                >
                  {item.label}
                </a>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-black/5 shadow-lg max-h-[70vh] overflow-y-auto">
          <div className="max-w-7xl mx-auto px-6 py-4 grid grid-cols-2 gap-1.5">
            {categoryNav.map((item, i) => {
              const active = isActive(item.href)
              return (
                <a key={i} href={item.href} onClick={() => setMobileOpen(false)} className={`font-onest text-[13px] py-1.5 transition-colors ${active ? 'font-semibold' : 'text-[#555] hover:text-[#A58B62]'}`}
                  style={active ? { color: item.accent } : undefined}
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
  const navLinks = [
    {l:'Water Heaters',h:'/milano-water-heaters'},{l:'Water Closets',h:'/water-closets'},{l:'Wash Basins',h:'/wash-basins'},
    {l:'Sanitary Ware',h:'/sanitary-ware'},{l:'Tiles & Interlock',h:'/tiles-roof-interlock'},{l:'Blocks & Sands',h:'/blocks-sands'},
    {l:'Cement',h:'/cement'},{l:'Steel',h:'/steel'},{l:'Plywood',h:'/film-faced-plywood'},
    {l:'Waterproofing',h:'/water-proofing'},{l:'Gypsum',h:'/gypsum-board'},{l:'Paints',h:'/paints-tools'},
    {l:'Plumbing',h:'/plumbing-sanitary'},{l:'Electric',h:'/electric-lights'},
  ]
  const socials = [
    {href:'https://wa.me/971504654613',label:'WhatsApp',svg:<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.13 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>},
    {href:'https://instagram.com/standarduae',label:'Instagram',svg:<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>},
    {href:'https://facebook.com/standarduae',label:'Facebook',svg:<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>},
    {href:'https://linkedin.com',label:'LinkedIn',svg:<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>},
  ]
  return (
    <footer className="bg-[#0c0c0b] text-white">
      <div className="h-px" style={{background:'linear-gradient(90deg,transparent,#0F766E,transparent)'}} />
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full border flex items-center justify-center" style={{borderColor:'#0F766E88'}}>
                <span className="font-montserrat text-lg font-bold not-italic" style={{color:'#14B8A6'}}>S</span>
              </div>
              <div className="leading-none">
                <span className="font-montserrat text-white text-sm tracking-[0.12em] uppercase block font-bold">Standard Group</span>
                <span className="font-montserrat text-[11px] font-bold not-italic" style={{color:'#14B8A6'}}>we set standards</span>
              </div>
            </div>
            <p className="font-onest text-white/30 text-[13px] leading-relaxed max-w-xs mb-5">
              UAE's premier building materials supplier. 20+ years, 31+ global brands, 500+ products.
            </p>
            <div className="flex items-center gap-2.5">
              {socials.map((s,i) => (
                <a key={i} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}
                  className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:text-[#14B8A6] hover:border-[#14B8A6]/30 transition-all duration-300">
                  {s.svg}
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div className="lg:col-span-2">
            <h4 className="font-montserrat text-base uppercase mb-5" style={{color:'#14B8A6'}}>products</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-2 gap-x-4">
              {navLinks.map((lnk,i) => (
                <Link key={i} to={lnk.h} className="font-onest text-white/30 text-[13px] hover:text-[#14B8A6] transition-colors duration-200">{lnk.l}</Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-montserrat text-base uppercase mb-5" style={{color:'#14B8A6'}}>contact</h4>
            <div className="space-y-2.5 font-onest text-white/30 text-[13px]">
              <a href="mailto:info@standardgroup.ae" className="block hover:text-[#14B8A6] transition-colors duration-200">info@standardgroup.ae</a>
              <a href="tel:+971555599508" className="block hover:text-[#14B8A6] transition-colors duration-200">+971 555599508</a>
              <a href="https://wa.me/971504654613" target="_blank" rel="noreferrer" className="block hover:text-[#14B8A6] transition-colors duration-200">WhatsApp: +971 504654613</a>
              <p className="text-white/20 text-[12px] pt-1">Baniyas West, Abu Dhabi-U.A.E.</p>
              <p className="text-white/20 text-[12px]">Mafraq, Abu Dhabi-U.A.E.</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-montserrat text-white/25 text-[11px] uppercase tracking-wider">© {new Date().getFullYear()} Standard Group. All rights reserved.</p>
          <p className="font-montserrat text-white/15 text-[10px] uppercase tracking-[0.2em]">We Set Standards</p>
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
      <WhatsAppButton />
      <ChatbotButton />
    </>
  )
}
