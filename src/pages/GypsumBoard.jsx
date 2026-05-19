import React, { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, ArrowUpRight, ArrowLeft, Shield, Layers, Ruler, CheckCircle2, ChevronDown, Maximize2, Package, Settings, Wind } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/* ─── ACCENT: Cool Architectural Grey — drywall, gypsum, interior ─── */
const ACCENT       = '#374151'
const ACCENT_DARK  = '#1f2937'
const ACCENT_LIGHT = '#9ca3af'

/* ─── BRANDS ─── */
const brands = [
  { name: 'Knauf',   sub: 'Global Gypsum Leader' },
  { name: 'Al Atti', sub: 'Gypsum Powder Specialist' },
  { name: 'UniCem',  sub: 'United Fibre Cement Boards' },
]

/* ─── PRODUCT DATA ─── */
const products = [
  {
    id: 1,
    name: 'Knauf Standard Gypsum Board',
    brand: 'Knauf',
    category: 'Gypsum Board',
    type: 'Standard Wallboard',
    size: '1200×2400 mm',
    thickness: '9.5 / 12.5 mm',
    features: ['Fire Resistant Core', 'Easy Score & Snap', 'EN 520 Type A'],
    price: 'AED 22 / sheet',
    description: 'Knauf Standard Gypsum Board for interior walls and ceilings. Ivory paper-faced, EN 520 Type A certified. Available in 9.5mm and 12.5mm for all partition and lining systems.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80',
  },
  {
    id: 2,
    name: 'Knauf Moisture Resistant Board',
    brand: 'Knauf',
    category: 'Gypsum Board',
    type: 'Moisture Resistant (MR)',
    size: '1200×2400 mm',
    thickness: '12.5 mm',
    features: ['Green Face Paper', 'Wet Area Rated', 'EN 520 Type H'],
    price: 'AED 32 / sheet',
    description: 'Knauf Moisture Resistant (MR) gypsum board with green face paper for kitchens, bathrooms, and humid UAE environments. EN 520 Type H2 rated for tile backing.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80',
  },
  {
    id: 3,
    name: 'Knauf Fire Board',
    brand: 'Knauf',
    category: 'Gypsum Board',
    type: 'Fire Resistant (FR)',
    size: '1200×2400 mm',
    thickness: '12.5 / 15 mm',
    features: ['Pink Face Paper', 'Up to 120 min FR', 'EN 520 Type F'],
    price: 'AED 38 / sheet',
    description: 'Knauf Fire Resistant gypsum board with enhanced glass-fibre core for rated fire partitions and shaft liners. Pink face paper, EN 520 Type F, up to 120-minute fire rating.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80',
  },
  {
    id: 4,
    name: 'Gypsum Powder',
    brand: 'Al Atti',
    category: 'Gypsum Powder',
    type: 'Construction & Decorative Grade',
    size: '40 kg bag',
    thickness: '—',
    features: ['Fast Setting', 'Smooth Finish', 'Plaster Grade'],
    price: 'AED 14 / bag',
    description: 'Al Atti premium gypsum powder for hand and machine plastering, skim-coating, and ornamental work. Fast setting, smooth final finish, available in 40kg bags.',
    image: 'https://images.unsplash.com/photo-1590736704728-f4730bb30770?w=700&q=80',
  },
  {
    id: 5,
    name: 'Metal Accessories — Profiles',
    brand: 'Knauf',
    category: 'Accessories',
    type: 'Steel Studs, Tracks & Channels',
    size: 'Full Range',
    thickness: '0.5 / 0.6 mm',
    features: ['C & U Studs', 'Floor & Ceiling Track', 'Galvanised Steel'],
    price: 'AED 8 / m',
    description: 'Complete Knauf metal framing system: galvanised C-studs, U-tracks, furring channels, and resilient bars. All profiles for wall, ceiling, and shaft liner systems.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=80',
  },
  {
    id: 6,
    name: 'Jointing Accessories',
    brand: 'Knauf',
    category: 'Accessories',
    type: 'Tape, Compound & Fixings',
    size: 'Various',
    thickness: '—',
    features: ['Paper & Mesh Tape', 'Joint Compound', 'Drywall Screws'],
    price: 'From AED 5',
    description: 'Full range of gypsum board jointing accessories: paper and fibreglass mesh tape, ready-mixed and powder joint compounds, drywall screws, and corner beads.',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=700&q=80',
  },
  {
    id: 7,
    name: 'Gypsum Ceiling Tiles',
    brand: 'Knauf',
    category: 'Gypsum & Aluminium Tiles',
    type: 'Decorative Ceiling Tile',
    size: '600×600 mm',
    thickness: '8 / 10 mm',
    features: ['Patterned Surface', 'Acoustic Options', 'Easy Install'],
    price: 'AED 12 / tile',
    description: 'Decorative gypsum ceiling tiles in plain and embossed patterns for suspended grid systems. Available in standard and acoustic grades for commercial and residential fit-out.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80',
  },
  {
    id: 8,
    name: 'Aluminium Ceiling Tiles',
    brand: 'Knauf',
    category: 'Gypsum & Aluminium Tiles',
    type: 'Aluminium Lay-In Tile',
    size: '600×600 mm',
    thickness: '0.4 mm',
    features: ['Perforated Options', 'Powder Coated', 'Lightweight'],
    price: 'AED 18 / tile',
    description: 'Aluminium lay-in ceiling tiles in solid and perforated patterns. Powder-coated white finish, lightweight, and compatible with standard 15mm and 24mm T-bar grid systems.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80',
  },
  {
    id: 9,
    name: 'Gypsum Access Panel',
    brand: 'Knauf',
    category: 'Gypsum Panel',
    type: 'Flush Access Door / Panel',
    size: '300×300 to 600×600 mm',
    thickness: '12.5 mm board',
    features: ['Hidden Frame', 'Paintable Surface', 'M&E Access'],
    price: 'AED 65 / unit',
    description: 'Gypsum-faced access panels for flush ceiling and wall installations. Concealed frame, paintable face, spring-loaded or lock mechanism for MEP maintenance access.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80',
  },
  {
    id: 10,
    name: 'Gypsum Tile Grid Channels',
    brand: 'Knauf',
    category: 'Gypsum Tile Channels',
    type: 'T-Bar Suspension System',
    size: '600 mm / 1200 mm',
    thickness: '15 / 24 mm',
    features: ['15mm & 24mm T-Bar', 'Main & Cross Tee', 'Powder Coated White'],
    price: 'AED 6 / m',
    description: 'Complete T-bar suspended ceiling grid system: main runners, cross tees, wall angles, and suspension wires. 15mm fine-line and 24mm standard profiles, powder-coated white.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=80',
  },
  {
    id: 11,
    name: 'UniCem Cement Board',
    brand: 'UniCem',
    category: 'Cement Board',
    type: 'Fibre Cement Board',
    size: '1200×2400 mm',
    thickness: '6 / 9 / 12 mm',
    features: ['100% Waterproof', 'Tile Backing', 'Non-Combustible'],
    price: 'AED 48 / sheet',
    description: 'UniCem United Fibre Cement Board — 100% waterproof, non-combustible tile backer for wet rooms, external cladding, and high-humidity UAE applications. EN 12467 certified.',
    image: 'https://images.unsplash.com/photo-1607400201515-c2c41c07d307?w=700&q=80',
  },
  {
    id: 12,
    name: 'Gypsum Plasterboard Compound',
    brand: 'Knauf',
    category: 'Accessories',
    type: 'Ready-Mixed Joint Compound',
    size: '5 kg / 20 kg tub',
    thickness: '—',
    features: ['Smooth Application', 'Low Shrinkage', 'Sandable'],
    price: 'AED 28 / 5kg',
    description: 'Knauf ready-mixed joint compound for filling, taping, and finishing gypsum board joints. Low shrinkage formula, easy sanding, and excellent feather-edging for seamless walls.',
    image: 'https://images.unsplash.com/photo-1590736704728-f4730bb30770?w=700&q=80',
  },
]

const specs = [
  { icon: Layers,       label: 'Board Range',        value: 'Standard · MR · Fire Resistant' },
  { icon: Maximize2,    label: 'Standard Sheet Size', value: '1200×2400 mm' },
  { icon: Shield,       label: 'Fire Rating',         value: 'Up to 120 Minutes' },
  { icon: CheckCircle2, label: 'Certifications',      value: 'EN 520 · EN 12467 · BS 1230' },
]

const features = [
  {
    title: 'Knauf Standard, MR & Fire Boards',
    desc: 'Full Knauf gypsum board range — Type A standard, Type H moisture-resistant (green), and Type F fire-resistant (pink) — all EN 520 certified for UAE fit-out specifications.',
    icon: Layers,
  },
  {
    title: 'Metal Framing System',
    desc: 'Galvanised C-studs, U-tracks, furring channels, and resilient bars. Complete Knauf metal framing for loadbearing and non-loadbearing partitions, ceiling linings, and shaft walls.',
    icon: Settings,
  },
  {
    title: 'Gypsum & Aluminium Ceiling Tiles',
    desc: 'Decorative gypsum tiles in embossed patterns and lightweight aluminium lay-in tiles — both in 600×600mm for suspended grid systems in offices, hotels, and retail.',
    icon: Wind,
  },
  {
    title: 'T-Bar Grid Systems',
    desc: 'Complete 15mm fine-line and 24mm standard T-bar suspended ceiling grid — main runners, cross tees, wall angles, and hangers for gypsum and aluminium tile installations.',
    icon: Ruler,
  },
  {
    title: 'UniCem Fibre Cement Board',
    desc: '100% waterproof, non-combustible UniCem fibre cement board for wet areas, external cladding, tile backing, and high-humidity UAE bathroom and kitchen applications.',
    icon: Shield,
  },
  {
    title: 'Complete Accessories Range',
    desc: 'Gypsum powder, joint compound, paper/mesh tape, corner beads, drywall screws, access panels — every accessory to complete a Knauf drywall system from stud to finish.',
    icon: Package,
  },
]

const comparisons = [
  { product: 'Standard Board',      brand: 'Knauf',   cat: 'Gypsum Board',   size: '1200×2400', thick: '9.5/12.5mm', cert: 'EN 520 A',   use: 'Walls & Ceilings' },
  { product: 'MR Board',            brand: 'Knauf',   cat: 'Gypsum Board',   size: '1200×2400', thick: '12.5mm',      cert: 'EN 520 H2',  use: 'Wet Areas / Tile' },
  { product: 'Fire Board',          brand: 'Knauf',   cat: 'Gypsum Board',   size: '1200×2400', thick: '12.5/15mm',   cert: 'EN 520 F',   use: 'Fire Partitions' },
  { product: 'Gypsum Powder',       brand: 'Al Atti', cat: 'Powder',         size: '40 kg bag', thick: '—',           cert: '—',          use: 'Plastering / Skim' },
  { product: 'Metal Profiles',      brand: 'Knauf',   cat: 'Accessories',    size: 'Full Range',thick: '0.5/0.6mm',   cert: 'EN 14195',   use: 'Framing System' },
  { product: 'Jointing Accessories', brand: 'Knauf',  cat: 'Accessories',    size: 'Various',   thick: '—',           cert: '—',          use: 'Board Finishing' },
  { product: 'Gypsum Tiles',        brand: 'Knauf',   cat: 'Ceiling Tiles',  size: '600×600',   thick: '8/10mm',      cert: 'EN 14246',   use: 'Decorative Ceiling' },
  { product: 'Aluminium Tiles',     brand: 'Knauf',   cat: 'Ceiling Tiles',  size: '600×600',   thick: '0.4mm',       cert: '—',          use: 'Commercial Ceiling' },
  { product: 'Access Panel',        brand: 'Knauf',   cat: 'Gypsum Panel',   size: '300–600mm', thick: '12.5mm',      cert: '—',          use: 'MEP Access' },
  { product: 'T-Bar Grid',          brand: 'Knauf',   cat: 'Grid System',    size: '600/1200mm',thick: '15/24mm',     cert: 'EN 13964',   use: 'Suspended Ceiling' },
  { product: 'UniCem Board',        brand: 'UniCem',  cat: 'Cement Board',   size: '1200×2400', thick: '6/9/12mm',    cert: 'EN 12467',   use: 'Wet / External' },
  { product: 'Joint Compound',      brand: 'Knauf',   cat: 'Accessories',    size: '5/20 kg',   thick: '—',           cert: '—',          use: 'Joint Finishing' },
]

const reasons = [
  { title: 'Knauf Systems',     desc: 'Complete Knauf gypsum board, metal framing, and accessory systems — the world\'s no.1 drywall brand.',  num: '#1',   unit: 'Drywall Brand' },
  { title: 'Full Range',        desc: '12 product lines covering every element of a complete drywall and ceiling system.',                       num: '12+',  unit: 'Products' },
  { title: 'UAE Experts',       desc: '20+ years supplying gypsum systems to UAE fit-out, construction, and hospitality projects.',              num: '20+',  unit: 'Years' },
  { title: 'We Set Standards',  desc: 'EN 520, EN 12467, EN 13964 certified products with full system documentation and technical support.',    num: '100%', unit: 'Certified' },
]

/* ══════════════════════════════════════
   HERO
══════════════════════════════════════ */
function HeroSection() {
  const sectionRef = useRef(null)
  const line1Ref   = useRef(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-title-line',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out', delay: 0.2 }
      )
      gsap.fromTo('.hero-subtitle', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.6 })
      gsap.fromTo('.hero-cta',      { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', delay: 0.8 })
      if (line1Ref.current) {
        gsap.to(line1Ref.current, { y: -15, duration: 2, ease: 'sine.inOut', yoyo: true, repeat: -1 })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80"
          alt="Gypsum board interior fit-out"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#F9F6F0]/85" />
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-8 lg:px-16 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 bg-white/70 rounded-full border border-black/5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: ACCENT }} />
              <span className="text-[#555] text-[10px] tracking-[0.2em] uppercase font-medium">Standard Group — Category 13</span>
            </div>

            <h1 className="mb-6">
              <span
                ref={line1Ref}
                className="hero-title-line block font-major text-3xl sm:text-4xl lg:text-5xl text-[#1a1a1a] leading-[1.1] tracking-[0.02em] mb-2 inline-block text-3d-shadow"
              >
                Gypsum Board
              </span>
              <span
                className="hero-title-line magnetic-text block font-serif italic text-4xl sm:text-5xl lg:text-6xl text-[#555] leading-[1.05] inline-block text-3d-shadow"
                style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)`, transition: 'transform 0.3s ease-out' }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect()
                  setMousePos({
                    x: (e.clientX - (rect.left + rect.width  / 2)) * 0.15,
                    y: (e.clientY - (rect.top  + rect.height / 2)) * 0.15,
                  })
                }}
                onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
              >
                & Accessories
              </span>
            </h1>

            <p className="hero-subtitle text-[#444] text-lg max-w-md leading-relaxed mb-10">
              Knauf gypsum boards, metal framing, ceiling tiles, T-bar grids, and UniCem fibre cement — the complete drywall and ceiling system for UAE fit-out and construction.
            </p>

            <div className="hero-cta flex items-center gap-4">
              <a
                href="#products"
                className="magnetic-btn group flex items-center gap-3 bg-[#1a1a1a] text-white px-7 py-3.5 rounded-full text-sm font-medium transition-all duration-300"
                onMouseEnter={e => { e.currentTarget.style.background = ACCENT }}
                onMouseLeave={e => { e.currentTarget.style.background = '#1a1a1a' }}
              >
                Explore Full Range
                <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a href="#brands" className="text-[#666] text-sm font-medium hover:text-[#1a1a1a] transition-colors">Our Brands</a>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="relative w-[520px] h-80 lg:w-[620px] lg:h-[420px] bg-white rounded-3xl shadow-xl border border-black/5 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1607400201515-c2c41c07d307?w=900&q=80"
                alt="Gypsum board installation"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent" />
            </div>
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full" style={{ border: `1px solid ${ACCENT}22` }} />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full border border-black/5" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5">
        <span className="text-[#999] text-[9px] tracking-[0.3em] uppercase">Scroll</span>
        <ChevronDown size={14} className="text-[#999]" />
      </div>
    </section>
  )
}

/* ══════════════════════════════════════
   BRANDS STRIP
══════════════════════════════════════ */
function BrandsStrip() {
  return (
    <section id="brands" className="py-12 bg-white border-b border-black/5">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
        <p className="text-center text-[#999] text-[10px] tracking-[0.3em] uppercase mb-8">Our Partners</p>
        <div className="flex flex-wrap items-center justify-center gap-12 lg:gap-24">
          {brands.map((brand) => (
            <div key={brand.name} className="flex flex-col items-center gap-1 group cursor-default">
              <span
                className="font-major text-2xl lg:text-3xl tracking-[0.02em] transition-colors duration-300"
                style={{ color: '#1a1a1a' }}
                onMouseEnter={e => { e.currentTarget.style.color = ACCENT }}
                onMouseLeave={e => { e.currentTarget.style.color = '#1a1a1a' }}
              >
                {brand.name}
              </span>
              <span className="text-[#aaa] text-[9px] tracking-[0.12em] uppercase">{brand.sub}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════
   PRODUCT SHOWCASE
══════════════════════════════════════ */
function ProductShowcase() {
  const sectionRef     = useRef(null)
  const headerLine1Ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.product-card',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.06, ease: 'power3.out',
          scrollTrigger: { trigger: '.product-grid', start: 'top 85%' } }
      )
      if (headerLine1Ref.current) {
        gsap.to(headerLine1Ref.current, { y: -15, duration: 2, ease: 'sine.inOut', yoyo: true, repeat: -1 })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const brandColor = (brand) => {
    if (brand === 'Knauf')   return '#1d4ed8'
    if (brand === 'Al Atti') return '#b45309'
    return '#15803d'
  }

  const catColor = (cat) => {
    const map = {
      'Gypsum Board':            'bg-blue-100 text-blue-700',
      'Gypsum Powder':           'bg-amber-100 text-amber-700',
      'Accessories':             'bg-slate-100 text-slate-600',
      'Gypsum & Aluminium Tiles':'bg-purple-100 text-purple-700',
      'Gypsum Panel':            'bg-teal-100 text-teal-700',
      'Gypsum Tile Channels':    'bg-orange-100 text-orange-700',
      'Cement Board':            'bg-green-100 text-green-700',
    }
    return map[cat] || 'bg-gray-100 text-gray-600'
  }

  return (
    <section id="products" ref={sectionRef} className="relative py-24 lg:py-32 bg-[#F9F6F0]">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
        <div className="mb-16">
          <p className="text-[11px] tracking-[0.3em] uppercase font-medium mb-3" style={{ color: ACCENT }}>The Range</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#1a1a1a] font-light leading-[1.1] mb-4 text-3d-shadow">
            <span ref={headerLine1Ref} className="block font-major tracking-[0.02em]">Twelve Products.</span>
            <span className="magnetic-text block font-serif italic text-[#555]">One Complete System.</span>
          </h2>
          <p className="text-[#666] text-base max-w-lg leading-relaxed">
            From Knauf gypsum board and metal framing to ceiling tiles, T-bar grids, access panels, and UniCem cement boards — everything for a complete UAE drywall and suspended ceiling specification.
          </p>
        </div>

        <div className="product-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map((product) => (
            <div key={product.id} className="product-card group relative h-[420px] cursor-pointer perspective-1000">
              <div className="relative w-full h-full transition-transform duration-500 transform-style-preserve-3d group-hover:rotate-y-180">

                {/* Front */}
                <div className="absolute inset-0 bg-white border border-black/[0.04] rounded-2xl overflow-hidden backface-hidden shadow-lg shadow-black/10">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <div
                      className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-white text-[10px] font-semibold"
                      style={{ background: brandColor(product.brand) }}
                    >
                      {product.brand}
                    </div>
                    <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-semibold border border-black/5" style={{ background: 'rgba(255,255,255,0.92)' }}>
                      <span className={`rounded-full text-[9px] font-semibold`}>{product.thickness !== '—' ? product.thickness : product.size}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-1.5">
                      <h3 className="font-poppins text-[#1a1a1a] text-sm tracking-[0.02em] font-medium leading-tight">{product.name}</h3>
                      <ArrowUpRight size={13} className="text-[#ccc] flex-shrink-0 ml-1" />
                    </div>
                    <div className="mb-2">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-[9px] font-medium ${catColor(product.category)}`}>
                        {product.category}
                      </span>
                    </div>
                    <p className="text-[#888] text-xs leading-relaxed mb-2.5 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between pt-2.5 border-t border-black/5">
                      <span className="font-poppins text-sm tracking-[0.02em]" style={{ color: ACCENT }}>{product.price}</span>
                      <span className="text-[#bbb] text-[9px] uppercase tracking-wider">{product.size}</span>
                    </div>
                  </div>
                </div>

                {/* Back */}
                <div
                  className="absolute inset-0 rounded-2xl overflow-hidden backface-hidden rotate-y-180 p-6 flex flex-col items-center justify-center text-white"
                  style={{ background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DARK})` }}
                >
                  <div
                    className="px-3 py-1 rounded-full text-white text-[10px] font-semibold mb-3"
                    style={{ background: brandColor(product.brand) }}
                  >
                    {product.brand}
                  </div>
                  <h3 className="font-poppins text-base font-medium mb-1 text-center leading-tight">{product.name}</h3>
                  <p className="text-white/70 text-[11px] mb-5 text-center tracking-wider uppercase">{product.type}</p>
                  <div className="grid grid-cols-2 gap-3 w-full">
                    {product.features.map((f) => (
                      <div key={f} className="flex flex-col items-center gap-1.5 p-2.5 bg-white/10 rounded-xl">
                        <CheckCircle2 size={16} className="text-white" />
                        <span className="text-[9px] uppercase tracking-wider text-center leading-tight">{f}</span>
                      </div>
                    ))}
                    <div className="flex flex-col items-center gap-1.5 p-2.5 bg-white/10 rounded-xl">
                      <Shield size={16} className="text-white" />
                      <span className="text-[9px] uppercase tracking-wider text-center">EN Certified</span>
                    </div>
                  </div>
                  <div className="mt-5 text-center">
                    <span className="text-xl font-poppins font-light">{product.price}</span>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════
   SPECS SECTION
══════════════════════════════════════ */
function SpecsSection() {
  const sectionRef     = useRef(null)
  const headerLine1Ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.spec-item',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.specs-grid', start: 'top 85%' } }
      )
      if (headerLine1Ref.current) {
        gsap.to(headerLine1Ref.current, { y: -15, duration: 2, ease: 'sine.inOut', yoyo: true, repeat: -1 })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="specs" ref={sectionRef} className="relative py-24 lg:py-32 bg-[#1e293b]">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <div>
            <p className="text-[11px] tracking-[0.3em] uppercase font-medium mb-3" style={{ color: ACCENT_LIGHT }}>Technical Standards</p>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl text-white font-light leading-[1.1] mb-6"
              style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.3), 2px 2px 0 rgba(0,0,0,0.2), 3px 3px 0 rgba(0,0,0,0.1), 4px 4px 8px rgba(0,0,0,0.4)' }}
            >
              <span ref={headerLine1Ref} className="block font-major tracking-[0.02em]">Specified.</span>
              <span className="magnetic-text block font-serif italic text-[#94a3b8]">EN Certified. Site Ready.</span>
            </h2>
            <p className="text-[#94a3b8] text-base leading-relaxed mb-10 max-w-md">
              Every Knauf gypsum board and accessory system meets EN 520, EN 13964, and BS 1230 specifications — accepted by UAE municipality, Trakhees, ADDA, and all major fit-out consultants.
            </p>

            <div className="specs-grid grid grid-cols-1 sm:grid-cols-2 gap-4">
              {specs.map((spec) => (
                <div
                  key={spec.label}
                  className="spec-item p-5 bg-[#334155] rounded-xl border border-white/10 shadow-lg shadow-black/20 transition-all duration-300 cursor-default"
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = `${ACCENT}55`
                    e.currentTarget.style.boxShadow   = `0 20px 40px ${ACCENT}30`
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                    e.currentTarget.style.boxShadow   = ''
                  }}
                >
                  <spec.icon size={18} className="mb-2.5" style={{ color: ACCENT_LIGHT }} />
                  <h3 className="text-[#94a3b8] text-[10px] tracking-[0.15em] uppercase mb-1">{spec.label}</h3>
                  <p className="text-white text-base font-light leading-snug">{spec.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="relative w-96 h-96 bg-[#334155] rounded-3xl border border-white/10 shadow-xl shadow-black/20 overflow-hidden">
              <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${ACCENT}1a, transparent)` }} />
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
                alt="Gypsum board layers"
                className="relative w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════
   FEATURES SECTION
══════════════════════════════════════ */
function FeaturesSection() {
  const sectionRef     = useRef(null)
  const headerLine1Ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.feature-card',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: '.features-grid', start: 'top 85%' } }
      )
      if (headerLine1Ref.current) {
        gsap.to(headerLine1Ref.current, { y: -15, duration: 2, ease: 'sine.inOut', yoyo: true, repeat: -1 })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
        <div className="mb-14">
          <p className="text-[11px] tracking-[0.3em] uppercase font-medium mb-3" style={{ color: ACCENT }}>Key Features</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#1a1a1a] font-light leading-[1.1] text-3d-shadow">
            <span ref={headerLine1Ref} className="block font-major tracking-[0.02em]">Why Our Systems</span>
            <span className="magnetic-text block font-serif italic text-[#555]">Stand Apart</span>
          </h2>
        </div>
        <div className="features-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, idx) => (
            <div key={idx} className="feature-card p-7 bg-[#F9F6F0] rounded-2xl border border-black/[0.03] shadow-lg shadow-black/10 hover:shadow-xl transition-shadow duration-300">
              <div className="mb-4">
                <feature.icon size={28} strokeWidth={1.5} style={{ color: ACCENT }} />
              </div>
              <h4 className="font-poppins text-[#1a1a1a] text-sm font-medium mb-1.5">{feature.title}</h4>
              <p className="text-[#888] text-xs leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════
   COMPARISON TABLE
══════════════════════════════════════ */
function ComparisonSection() {
  const sectionRef     = useRef(null)
  const headerLine1Ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerLine1Ref.current) {
        gsap.to(headerLine1Ref.current, { y: -15, duration: 2, ease: 'sine.inOut', yoyo: true, repeat: -1 })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const brandColor = (brand) => {
    if (brand === 'Knauf')   return 'bg-blue-900/40 text-blue-300'
    if (brand === 'Al Atti') return 'bg-amber-900/40 text-amber-300'
    return 'bg-green-900/40 text-green-300'
  }

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-[#1e293b]">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
        <div className="mb-12">
          <p className="text-[11px] tracking-[0.3em] uppercase font-medium mb-3" style={{ color: ACCENT_LIGHT }}>Full Range Overview</p>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl text-white font-light leading-[1.1]"
            style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.3), 2px 2px 0 rgba(0,0,0,0.2), 3px 3px 0 rgba(0,0,0,0.1), 4px 4px 8px rgba(0,0,0,0.4)' }}
          >
            <span ref={headerLine1Ref} className="block font-major tracking-[0.02em]">Specify Your</span>
            <span className="magnetic-text block font-serif italic text-[#94a3b8]">System Components.</span>
          </h2>
        </div>

        <div className="overflow-x-auto bg-[#334155] rounded-2xl border border-white/10 shadow-lg shadow-black/20">
          <table className="w-full min-w-[860px]">
            <thead>
              <tr className="border-b border-white/10">
                {['Product', 'Brand', 'Category', 'Size', 'Thickness', 'Standard', 'Best Use'].map(h => (
                  <th key={h} className="text-left text-[#94a3b8] text-[10px] tracking-[0.15em] uppercase py-4 px-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisons.map((row, idx) => (
                <tr key={idx} className="border-b border-white/[0.03] hover:bg-[#1e293b]/50 transition-colors">
                  <td className="py-3.5 px-4 text-white text-sm font-medium">{row.product}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${brandColor(row.brand)}`}>{row.brand}</span>
                  </td>
                  <td className="py-3.5 px-4 text-[#94a3b8] text-sm">{row.cat}</td>
                  <td className="py-3.5 px-4 text-sm font-medium" style={{ color: ACCENT_LIGHT }}>{row.size}</td>
                  <td className="py-3.5 px-4 text-[#94a3b8] text-sm">{row.thick}</td>
                  <td className="py-3.5 px-4 text-[#94a3b8] text-sm">{row.cert}</td>
                  <td className="py-3.5 px-4 text-[#94a3b8] text-sm">{row.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════
   WHY STANDARD GROUP
══════════════════════════════════════ */
function WhyStandardGroup() {
  const sectionRef     = useRef(null)
  const headerLine1Ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.why-card',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.why-grid', start: 'top 85%' } }
      )
      if (headerLine1Ref.current) {
        gsap.to(headerLine1Ref.current, { y: -15, duration: 2, ease: 'sine.inOut', yoyo: true, repeat: -1 })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
        <div className="text-center mb-16">
          <p className="text-[11px] tracking-[0.3em] uppercase font-medium mb-3" style={{ color: ACCENT }}>Why Choose Us</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#1a1a1a] font-light leading-[1.1] text-3d-shadow">
            <span ref={headerLine1Ref} className="block font-major tracking-[0.02em]">Standard Group</span>
            <span className="magnetic-text block font-serif italic text-[#555]">Your Trusted Partner</span>
          </h2>
          <p className="text-[#666] text-base mt-3 max-w-md mx-auto">Your trusted partner for gypsum systems and fit-out materials across the UAE</p>
        </div>
        <div className="why-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reasons.map((reason, idx) => (
            <div key={idx} className="why-card p-7 bg-[#F9F6F0] rounded-2xl border border-black/[0.03] shadow-lg shadow-black/10 hover:shadow-xl transition-shadow duration-300">
              <div className="mb-4">
                <span className="text-3xl lg:text-4xl font-light" style={{ color: ACCENT }}>{reason.num}</span>
                <span className="text-[#999] text-xs ml-1.5 uppercase tracking-wider">{reason.unit}</span>
              </div>
              <h4 className="font-poppins text-[#1a1a1a] text-sm font-medium mb-1.5">{reason.title}</h4>
              <p className="text-[#888] text-xs leading-relaxed">{reason.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════
   CTA SECTION
══════════════════════════════════════ */
function CTASection() {
  const sectionRef     = useRef(null)
  const headerLine1Ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerLine1Ref.current) {
        gsap.to(headerLine1Ref.current, { y: -15, duration: 2, ease: 'sine.inOut', yoyo: true, repeat: -1 })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="contact" ref={sectionRef} className="relative py-24 lg:py-32 bg-[#1e293b]">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16 text-center">
        <p className="text-[11px] tracking-[0.3em] uppercase font-medium mb-4" style={{ color: ACCENT_LIGHT }}>Get In Touch</p>
        <h2
          className="text-3xl sm:text-4xl lg:text-6xl text-white font-light leading-[1.1] mb-4"
          style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.3), 2px 2px 0 rgba(0,0,0,0.2), 3px 3px 0 rgba(0,0,0,0.1), 4px 4px 8px rgba(0,0,0,0.4)' }}
        >
          <span ref={headerLine1Ref} className="block font-major tracking-[0.02em]">Ready to Fit Out?</span>
          <span className="magnetic-text block font-serif italic text-[#94a3b8]">We Supply the System</span>
        </h2>
        <p className="text-[#94a3b8] text-base max-w-lg mx-auto leading-relaxed mb-10">
          Contact Standard Group for complete Knauf gypsum system quotations, bulk board and accessories pricing, and UniCem cement board supply across UAE construction and fit-out projects.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="mailto:sales@standardgroup.ae"
            className="magnetic-btn group flex items-center gap-3 text-white px-8 py-4 rounded-full text-sm font-medium transition-all duration-300 shadow-lg"
            style={{ background: ACCENT, boxShadow: `0 15px 35px ${ACCENT}44` }}
            onMouseEnter={e => { e.currentTarget.style.background = ACCENT_DARK }}
            onMouseLeave={e => { e.currentTarget.style.background = ACCENT }}
          >
            Request Quote
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </a>
          <a href="/" className="magnetic-btn group flex items-center gap-3 border border-white/20 text-white px-8 py-4 rounded-full text-sm font-medium hover:bg-white/10 transition-all duration-300">
            <ArrowLeft size={16} />
            Back to Home
          </a>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════
   FOOTER
══════════════════════════════════════ */

/* ══════════════════════════════════════
   MAIN PAGE COMPONENT
══════════════════════════════════════ */
export default function GypsumBoard() {
  return (
    <div className="bg-[#F9F6F0] min-h-screen selection:bg-slate-700/20 selection:text-[#1a1a1a]">

      <HeroSection />
      <BrandsStrip />
      <ProductShowcase />
      <SpecsSection />
      <FeaturesSection />
      <ComparisonSection />
      <WhyStandardGroup />
      <CTASection />
    </div>
  )
}
