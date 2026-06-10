import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronRight, Phone, MessageCircle } from 'lucide-react'

const ALL_CATS = [
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

/**
 * ProductPageShell
 * Consistent wrapper for every product sub-page.
 *
 * Props:
 *   title        — Page heading
 *   subtitle     — Small label above heading (optional)
 *   description  — Short paragraph below heading (optional)
 *   heroImg      — Background image URL (optional)
 *   brands       — Array of brand name strings (optional)
 *   currentPath  — pathname of this page (to highlight in sidebar)
 *   children     — Main content (product grids, tables, etc.)
 */
export default function ProductPageShell({
  title,
  subtitle,
  description,
  heroImg,
  brands = [],
  currentPath = '',
  children,
}) {
  const { pathname } = useLocation()
  const activePath = currentPath || pathname

  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero banner ── */}
      <div className="relative bg-[#0c0c0b] overflow-hidden">
        {heroImg && (
          <img src={heroImg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c0c0b] via-[#0c0c0b]/90 to-[#0c0c0b]/60" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-white/40 text-[11px] font-onest mb-3 flex-wrap">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={11} />
            <Link to="/products" className="hover:text-white transition-colors">Products</Link>
            <ChevronRight size={11} />
            <span className="text-white/70 truncate max-w-[160px]">{title}</span>
          </nav>
          {subtitle && (
            <p className="font-montserrat text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-[#14B8A6] mb-1.5">{subtitle}</p>
          )}
          <h1 className="font-montserrat font-bold text-xl sm:text-2xl md:text-3xl text-white mb-2 leading-tight">{title}</h1>
          {description && (
            <p className="font-onest text-white/55 text-xs sm:text-sm max-w-xl leading-relaxed mb-3 line-clamp-3 sm:line-clamp-none">{description}</p>
          )}
          {brands.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {brands.map(b => (
                <span key={b} className="font-onest text-[10px] text-white/50 bg-white/10 px-2 py-0.5 rounded-full border border-white/10">{b}</span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Mobile horizontal category strip ── */}
      <div className="lg:hidden bg-white border-b border-gray-200 overflow-x-auto scrollbar-hide">
        <div className="flex items-center gap-0 px-3 py-0">
          {ALL_CATS.map((cat, i) => (
            <Link key={i} to={cat.href}
              className={`whitespace-nowrap px-3 py-2.5 text-[11px] font-poppins transition-colors flex-shrink-0 border-b-2 ${
                activePath === cat.href
                  ? 'text-[#0F766E] border-[#0F766E] font-bold'
                  : 'text-[#555] border-transparent'
              }`}>
              {cat.label}
            </Link>
          ))}
        </div>
      </div>

      {/* ── Layout: sidebar + content ── */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8">
        <div className="flex gap-6 lg:gap-8">

          {/* Sidebar — desktop only */}
          <aside className="hidden lg:block w-52 flex-shrink-0">
            <div className="sticky top-[8.5rem]">
              <p className="font-montserrat font-bold text-[10px] uppercase tracking-widest text-gray-400 px-3 mb-2">
                All Categories
              </p>
              {ALL_CATS.map((cat, i) => (
                <Link key={i} to={cat.href}
                  className={`flex items-center justify-between px-3 py-2 rounded text-xs transition-colors mb-0.5 ${
                    activePath === cat.href
                      ? 'bg-[#0F766E] text-white font-montserrat font-bold'
                      : 'font-onest text-gray-600 hover:bg-gray-100 hover:text-[#0F766E]'
                  }`}>
                  <span>{cat.label}</span>
                  {activePath === cat.href && <ChevronRight size={12} />}
                </Link>
              ))}
              <Link to="/products"
                className="flex items-center gap-1 mt-2 px-3 py-2 text-xs text-[#0F766E] font-montserrat font-bold hover:bg-gray-100 rounded transition-colors">
                View All <ChevronRight size={12} />
              </Link>
              <div className="mt-5 bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="font-montserrat font-bold text-xs text-[#0c0c0b] mb-3">Need a quote?</p>
                <a href="https://wa.me/971504654613" target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 bg-[#0F766E] text-white px-3 py-2 rounded text-xs font-montserrat font-bold hover:bg-[#0D6B64] transition-colors mb-2">
                  <MessageCircle size={12} /> WhatsApp
                </a>
                <a href="tel:+971555599508"
                  className="flex items-center gap-2 border border-gray-300 text-[#444] px-3 py-2 rounded text-xs font-montserrat font-bold hover:border-[#0F766E] hover:text-[#0F766E] transition-colors">
                  <Phone size={12} /> Call Us
                </a>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 min-w-0 overflow-hidden">
            {children}
          </main>
        </div>
      </div>

      {/* ── Bottom CTA banner ── */}
      <div className="bg-[#0F766E] py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h3 className="font-montserrat font-bold text-white text-base sm:text-lg">Request a quote for {title}</h3>
            <p className="font-onest text-white/70 text-xs sm:text-sm mt-1">Bulk pricing available — fast WhatsApp or call response.</p>
          </div>
          <div className="flex gap-2 sm:gap-3 flex-wrap justify-center">
            <a href={`https://wa.me/971504654613?text=Hi, I need a quote for ${encodeURIComponent(title)}`}
              target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 bg-white text-[#0F766E] px-4 sm:px-5 py-2.5 font-montserrat font-bold text-xs sm:text-sm rounded-lg hover:bg-gray-100 transition-colors">
              <MessageCircle size={14} /> WhatsApp
            </a>
            <a href="tel:+971555599508"
              className="inline-flex items-center gap-2 border-2 border-white text-white px-4 sm:px-5 py-2.5 font-montserrat font-bold text-xs sm:text-sm rounded-lg hover:bg-white/10 transition-colors">
              <Phone size={14} /> Call Us
            </a>
          </div>
        </div>
      </div>

      {/* ── Mobile sticky bottom bar ── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 flex shadow-lg"
           style={{paddingBottom: 'env(safe-area-inset-bottom)'}}>
        <a href={`https://wa.me/971504654613?text=Hi, I need a quote for ${encodeURIComponent(title)}`}
          target="_blank" rel="noreferrer"
          className="flex-1 flex items-center justify-center gap-2 bg-[#0F766E] text-white py-3.5 font-montserrat font-bold text-sm">
          <MessageCircle size={16} /> WhatsApp Enquiry
        </a>
        <a href="tel:+971555599508"
          className="flex items-center justify-center gap-2 bg-white text-[#0F766E] border-l border-gray-200 px-5 py-3.5 font-montserrat font-bold text-sm">
          <Phone size={16} /> Call
        </a>
      </div>
      {/* Bottom padding for mobile sticky bar */}
      <div className="lg:hidden h-14" />
    </div>
  )
}
