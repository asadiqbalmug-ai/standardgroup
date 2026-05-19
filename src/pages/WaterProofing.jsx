import React, { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, ArrowUpRight, ArrowLeft, Shield, Layers, Ruler, CheckCircle2, ChevronDown, Droplets, Wind, Flame, Package } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/* ─── ACCENT: Deep Navy — waterproofing, protection, engineering ─── */
const ACCENT       = '#1e3a5f'
const ACCENT_DARK  = '#0f2340'
const ACCENT_LIGHT = '#60a5fa'

/* ─── BRANDS ─── */
const brands = [
  { name: 'Awazel',    sub: 'Bituminous & Liquid Waterproofing' },
  { name: 'Polybit',   sub: 'The Waterproofing Specialists' },
  { name: 'Saudicoat', sub: 'Cementitious & Bitumen Systems' },
  { name: 'DWI',       sub: 'Dermabit Waterproofing Ind.' },
]

/* ─── PRODUCT DATA ─── */
const products = [
  {
    id: 1,
    name: 'Bituminous Torch-On Membrane',
    brand: 'Awazel',
    category: 'Sheet Membrane',
    type: 'SBS / APP Modified Bitumen',
    coverage: '10 m² / roll',
    features: ['Torch Applied', 'SBS / APP Modified', 'Root Resistant'],
    price: 'AED 85 / roll',
    description: 'SBS and APP modified bituminous torch-on membrane for roofs, basements, and podiums. Self-adhesive or torch-applied variants available for all substrate conditions.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=80',
  },
  {
    id: 2,
    name: 'Bitumen Primer',
    brand: 'Awazel',
    category: 'Primers & Adhesives',
    type: 'Solvent-Based Bitumen Primer',
    coverage: '5–7 m² / litre',
    features: ['Surface Primer', 'Bitumen Compatible', 'Fast Drying'],
    price: 'AED 38 / litre',
    description: 'Solvent-based bitumen primer for concrete and masonry substrates prior to torch-on membrane application. Seals surface pores and improves membrane adhesion.',
    image: 'https://images.unsplash.com/photo-1590736704728-f4730bb30770?w=700&q=80',
  },
  {
    id: 3,
    name: 'Polybit Torch-On Sheet',
    brand: 'Polybit',
    category: 'Sheet Membrane',
    type: 'APP Modified Bitumen',
    coverage: '10 m² / roll',
    features: ['High Tensile Strength', 'UV Stable Cap Sheet', 'ASTM D6163'],
    price: 'AED 92 / roll',
    description: 'Polybit APP modified bitumen torch-on waterproofing sheet with mineral cap surface. High tensile strength, UV-stable for exposed roof applications, ASTM D6163 certified.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=80',
  },
  {
    id: 4,
    name: 'Bituplus Liquid Membrane',
    brand: 'Polybit',
    category: 'Liquid Membrane',
    type: 'Polymer Modified Bitumen Emulsion',
    coverage: '1–1.5 kg / m²',
    features: ['Brush / Roller Applied', 'Crack Bridging', 'Wet Surface Use'],
    price: 'AED 28 / kg',
    description: 'Polybit Bituplus polymer-modified bitumen liquid waterproofing for foundations, retaining walls, and balconies. Crack-bridging at 1.5mm DFT, applies to damp substrates.',
    image: 'https://images.unsplash.com/photo-1590736704728-f4730bb30770?w=700&q=80',
  },
  {
    id: 5,
    name: 'Saudicoat Cementitious',
    brand: 'Saudicoat',
    category: 'Cementitious Coating',
    type: 'Two-Component Flexible Coating',
    coverage: '1.5 kg / m² / coat',
    features: ['Two-Component', 'Potable Water Safe', 'Flexible Grade'],
    price: 'AED 32 / kg',
    description: 'Two-component flexible cementitious waterproofing for water tanks, swimming pools, wet rooms, and below-grade structures. NSF / potable water approved where required.',
    image: 'https://images.unsplash.com/photo-1609174156745-3c2d1c978543?w=700&q=80',
  },
  {
    id: 6,
    name: 'Saudicoat Bitumen Emulsion',
    brand: 'Saudicoat',
    category: 'Liquid Membrane',
    type: 'Water-Based Bitumen Emulsion',
    coverage: '0.8–1 kg / m²',
    features: ['Water-Based', 'Basement Tanking', 'Low VOC'],
    price: 'AED 22 / kg',
    description: 'Water-based bitumen emulsion tanking for below-ground concrete. Low VOC for confined basement and underground car park applications. Compatible with drainage board protection.',
    image: 'https://images.unsplash.com/photo-1609174156745-3c2d1c978543?w=700&q=80',
  },
  {
    id: 7,
    name: 'Dermabit Torch-On Sheet',
    brand: 'DWI',
    category: 'Sheet Membrane',
    type: 'SBS Modified Bitumen',
    coverage: '10 m² / roll',
    features: ['SBS Elastomeric', 'Cold Regions Rated', 'High Elongation'],
    price: 'AED 88 / roll',
    description: 'DWI Dermabit SBS elastomeric modified bitumen sheet membrane. Superior elongation and flexibility for roof decks and podiums subject to thermal movement.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=80',
  },
  {
    id: 8,
    name: 'Crystalised Waterproofing',
    brand: 'DWI',
    category: 'Crystalline',
    type: 'Cementitious Crystalline',
    coverage: '0.8 kg / m²',
    features: ['Self-Healing Crystals', 'Negative Pressure', 'Permanent Protection'],
    price: 'AED 55 / kg',
    description: 'Cementitious crystalline waterproofing for structural concrete. Penetrates the concrete matrix forming insoluble crystals that self-seal cracks and capillary tracts permanently.',
    image: 'https://images.unsplash.com/photo-1590736704728-f4730bb30770?w=700&q=80',
  },
  {
    id: 9,
    name: 'Polyurethane Liquid Roof',
    brand: 'Polybit',
    category: 'Liquid Membrane',
    type: 'Single-Component PU',
    coverage: '1.5 kg / m²',
    features: ['UV Resistant', 'Trafficable Grade', 'Seamless Finish'],
    price: 'AED 65 / kg',
    description: 'Single-component polyurethane liquid waterproofing for trafficable roof terraces and balconies. UV-stable top coat, seamless finish, and excellent elongation at 300%.',
    image: 'https://images.unsplash.com/photo-1609174156745-3c2d1c978543?w=700&q=80',
  },
]

const specs = [
  { icon: Droplets,     label: 'Systems Available',  value: 'Torch-On · Liquid · Cementitious · Crystalline' },
  { icon: Layers,       label: 'Brands Stocked',     value: 'Awazel · Polybit · Saudicoat · DWI' },
  { icon: Shield,       label: 'Certifications',     value: 'BS 8102 · ASTM D6163 · EN 13707' },
  { icon: CheckCircle2, label: 'Applications',       value: 'Roofs · Basements · Pools · Podiums' },
]

const features = [
  {
    title: 'Torch-On Bitumen Sheet',
    desc: 'SBS and APP modified bitumen torch-on membranes from Awazel, Polybit, and DWI — for roofs, podiums, basements, and below-grade slabs across UAE projects.',
    icon: Flame,
  },
  {
    title: 'Liquid Applied Membranes',
    desc: 'Polyurethane, bitumen emulsion, and polymer-modified liquid systems for trafficable terraces, balconies, retaining walls, and complex geometry substrates.',
    icon: Droplets,
  },
  {
    title: 'Cementitious Systems',
    desc: 'Two-component flexible cementitious coatings from Saudicoat for water tanks, pools, wet rooms, and basement tanking — potable water approved grades available.',
    icon: Layers,
  },
  {
    title: 'Crystalline Technology',
    desc: 'DWI crystalline waterproofing penetrates concrete and forms insoluble crystals — self-sealing protection that strengthens over time and resists negative water pressure.',
    icon: Shield,
  },
  {
    title: 'Primers & Ancillaries',
    desc: 'Full range of bitumen primers, bond coats, protection boards, and drainage composites to complete waterproofing systems to BS 8102 and local authority standards.',
    icon: Package,
  },
  {
    title: 'UAE Project Experience',
    desc: 'Standard Group supplies waterproofing systems to UAE residential towers, hotels, infrastructure, and underground car parks — with complete system documentation.',
    icon: Wind,
  },
]

const comparisons = [
  { product: 'Torch-On Membrane',     brand: 'Awazel',    system: 'Sheet Membrane',    coverage: '10 m²/roll', cert: 'EN 13707', use: 'Roofs / Basements' },
  { product: 'Bitumen Primer',        brand: 'Awazel',    system: 'Primer',            coverage: '5–7 m²/L',   cert: '—',        use: 'Pre-Membrane Prep' },
  { product: 'Polybit Torch-On',      brand: 'Polybit',   system: 'Sheet Membrane',    coverage: '10 m²/roll', cert: 'ASTM D6163', use: 'Exposed Roofs' },
  { product: 'Bituplus Liquid',       brand: 'Polybit',   system: 'Liquid Membrane',   coverage: '1–1.5 kg/m²', cert: '—',        use: 'Walls / Balconies' },
  { product: 'PU Liquid Roof',        brand: 'Polybit',   system: 'Liquid PU',         coverage: '1.5 kg/m²',  cert: 'EN 14695', use: 'Trafficable Terraces' },
  { product: 'Saudicoat Cementitious', brand: 'Saudicoat', system: 'Cementitious',     coverage: '1.5 kg/m²',  cert: 'NSF',      use: 'Tanks / Pools' },
  { product: 'Saudicoat Bitumen Em.',  brand: 'Saudicoat', system: 'Liquid Bitumen',   coverage: '0.8–1 kg/m²', cert: '—',       use: 'Basement Tanking' },
  { product: 'Dermabit Torch-On',     brand: 'DWI',       system: 'Sheet Membrane',    coverage: '10 m²/roll', cert: 'EN 13707', use: 'Podiums / Roofs' },
  { product: 'Crystalline WP',        brand: 'DWI',       system: 'Crystalline',       coverage: '0.8 kg/m²',  cert: 'BS 8102',  use: 'Structural Concrete' },
]

const reasons = [
  { title: '4 Leading Brands',   desc: 'Awazel, Polybit, Saudicoat & DWI — the UAE\'s most trusted waterproofing systems, all stocked.',  num: '4',    unit: 'Brands' },
  { title: 'All Systems',        desc: 'Torch-on sheet, liquid PU, cementitious, crystalline, and primer systems — fully covered.',         num: '4+',   unit: 'Systems' },
  { title: 'UAE Experts',        desc: '20+ years supplying waterproofing to UAE towers, hotels, infrastructure, and car parks.',           num: '20+',  unit: 'Years' },
  { title: 'We Set Standards',   desc: 'BS 8102, ASTM, and EN certified systems with full product data sheets and method statements.',     num: '100%', unit: 'Certified' },
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
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80"
          alt="Waterproofing application"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#F9F6F0]/85" />
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-8 lg:px-16 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <div>
            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 bg-white/70 rounded-full border border-black/5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: ACCENT }} />
              <span className="text-[#555] text-[10px] tracking-[0.2em] uppercase font-medium">Standard Group — Category 12</span>
            </div>

            <h1 className="mb-6">
              <span
                ref={line1Ref}
                className="hero-title-line block font-major text-3xl sm:text-4xl lg:text-5xl text-[#1a1a1a] leading-[1.1] tracking-[0.02em] mb-2 inline-block text-3d-shadow"
              >
                Water Proofing
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
                Sealed. Protected. Proven.
              </span>
            </h1>

            <p className="hero-subtitle text-[#444] text-lg max-w-md leading-relaxed mb-10">
              Awazel, Polybit, Saudicoat, and DWI Dermabit — torch-on sheets, liquid membranes, cementitious coatings, and crystalline systems for every UAE waterproofing specification.
            </p>

            <div className="hero-cta flex items-center gap-4">
              <a
                href="#products"
                className="magnetic-btn group flex items-center gap-3 bg-[#1a1a1a] text-white px-7 py-3.5 rounded-full text-sm font-medium transition-all duration-300"
                onMouseEnter={e => { e.currentTarget.style.background = ACCENT }}
                onMouseLeave={e => { e.currentTarget.style.background = '#1a1a1a' }}
              >
                Explore Systems
                <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a href="#brands" className="text-[#666] text-sm font-medium hover:text-[#1a1a1a] transition-colors">
                Our Brands
              </a>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="relative w-[520px] h-80 lg:w-[620px] lg:h-[420px] bg-white rounded-3xl shadow-xl border border-black/5 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1590736704728-f4730bb30770?w=900&q=80"
                alt="Waterproofing materials"
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
        <p className="text-center text-[#999] text-[10px] tracking-[0.3em] uppercase mb-8">Our Waterproofing Partners</p>
        <div className="flex flex-wrap items-center justify-center gap-10 lg:gap-20">
          {brands.map((brand) => (
            <div key={brand.name} className="flex flex-col items-center gap-1 group cursor-default">
              <span
                className="font-major text-xl lg:text-2xl tracking-[0.02em] transition-colors duration-300"
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
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: '.product-grid', start: 'top 85%' } }
      )
      if (headerLine1Ref.current) {
        gsap.to(headerLine1Ref.current, { y: -15, duration: 2, ease: 'sine.inOut', yoyo: true, repeat: -1 })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  /* Per-brand accent colour for badge */
  const brandColor = (brand) => {
    if (brand === 'Awazel')    return '#1d4ed8'
    if (brand === 'Polybit')   return '#b45309'
    if (brand === 'Saudicoat') return '#15803d'
    return ACCENT
  }

  /* Per-category system badge label */
  const systemBadge = (cat) => {
    const map = {
      'Sheet Membrane': 'Sheet',
      'Liquid Membrane': 'Liquid',
      'Cementitious Coating': 'Cement',
      'Crystalline': 'Crystal',
      'Primers & Adhesives': 'Primer',
    }
    return map[cat] || cat
  }

  return (
    <section id="products" ref={sectionRef} className="relative py-24 lg:py-32 bg-[#F9F6F0]">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">

        <div className="mb-16">
          <p className="text-[11px] tracking-[0.3em] uppercase font-medium mb-3" style={{ color: ACCENT }}>The Systems</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#1a1a1a] font-light leading-[1.1] mb-4 text-3d-shadow">
            <span ref={headerLine1Ref} className="block font-major tracking-[0.02em]">Four Systems.</span>
            <span className="magnetic-text block font-serif italic text-[#555]">Every Surface Protected.</span>
          </h2>
          <p className="text-[#666] text-base max-w-lg leading-relaxed">
            Torch-on bitumen sheets, polymer liquid membranes, cementitious coatings, and crystalline systems — Standard Group stocks every waterproofing technology for UAE roofs, basements, pools, and podiums.
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
                    {/* Brand badge */}
                    <div
                      className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-white text-[10px] font-semibold"
                      style={{ background: brandColor(product.brand) }}
                    >
                      {product.brand}
                    </div>
                    {/* System badge */}
                    <div className="absolute top-3 right-3 px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-full border border-black/5 shadow-sm">
                      <span className="text-[#1a1a1a] text-[10px] font-semibold">{systemBadge(product.category)}</span>
                    </div>
                    {/* Coverage on bottom */}
                    <div className="absolute bottom-3 left-4">
                      <span className="text-white/80 text-[9px] uppercase tracking-widest">{product.coverage}</span>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-poppins text-[#1a1a1a] text-base tracking-[0.02em]">{product.name}</h3>
                      <ArrowUpRight size={13} className="text-[#ccc]" />
                    </div>
                    <p className="text-[#888] text-xs leading-relaxed mb-3 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between pt-3 border-t border-black/5">
                      <span className="font-poppins text-sm tracking-[0.02em]" style={{ color: ACCENT }}>{product.price}</span>
                      <span className="text-[#bbb] text-[9px] uppercase tracking-wider">{product.type.split(' ').slice(0, 2).join(' ')}</span>
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
                  <h3 className="font-poppins text-base font-medium mb-1 text-center">{product.name}</h3>
                  <p className="text-white/70 text-[11px] mb-5 text-center tracking-wider uppercase">{product.type}</p>
                  <div className="grid grid-cols-2 gap-3 w-full">
                    {product.features.map((f) => (
                      <div key={f} className="flex flex-col items-center gap-1.5 p-3 bg-white/10 rounded-xl">
                        <CheckCircle2 size={17} className="text-white" />
                        <span className="text-[10px] uppercase tracking-wider text-center leading-tight">{f}</span>
                      </div>
                    ))}
                    <div className="flex flex-col items-center gap-1.5 p-3 bg-white/10 rounded-xl">
                      <Shield size={17} className="text-white" />
                      <span className="text-[10px] uppercase tracking-wider text-center">BS / EN Cert.</span>
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
              <span className="magnetic-text block font-serif italic text-[#94a3b8]">Certified. Guaranteed.</span>
            </h2>
            <p className="text-[#94a3b8] text-base leading-relaxed mb-10 max-w-md">
              Every waterproofing system we supply meets BS 8102 for basement waterproofing, EN 13707 for bituminous sheets, and ASTM D6163 for modified bitumen membranes — with full product data sheets and project method statements on request.
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
                src="https://images.unsplash.com/photo-1609174156745-3c2d1c978543?w=800&q=80"
                alt="Waterproofing application"
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
            <div
              key={idx}
              className="feature-card p-7 bg-[#F9F6F0] rounded-2xl border border-black/[0.03] shadow-lg shadow-black/10 hover:shadow-xl transition-shadow duration-300"
            >
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
    if (brand === 'Awazel')    return 'bg-blue-900/40 text-blue-300'
    if (brand === 'Polybit')   return 'bg-amber-900/40 text-amber-300'
    if (brand === 'Saudicoat') return 'bg-green-900/40 text-green-300'
    return 'bg-slate-700/40 text-slate-300'
  }

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-[#1e293b]">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
        <div className="mb-12">
          <p className="text-[11px] tracking-[0.3em] uppercase font-medium mb-3" style={{ color: ACCENT_LIGHT }}>Compare Systems</p>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl text-white font-light leading-[1.1]"
            style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.3), 2px 2px 0 rgba(0,0,0,0.2), 3px 3px 0 rgba(0,0,0,0.1), 4px 4px 8px rgba(0,0,0,0.4)' }}
          >
            <span ref={headerLine1Ref} className="block font-major tracking-[0.02em]">Specify Your</span>
            <span className="magnetic-text block font-serif italic text-[#94a3b8]">Waterproofing System.</span>
          </h2>
        </div>

        <div className="overflow-x-auto bg-[#334155] rounded-2xl border border-white/10 shadow-lg shadow-black/20">
          <table className="w-full min-w-[820px]">
            <thead>
              <tr className="border-b border-white/10">
                {['Product', 'Brand', 'System Type', 'Coverage', 'Certification', 'Best Use'].map(h => (
                  <th key={h} className="text-left text-[#94a3b8] text-[10px] tracking-[0.15em] uppercase py-4 px-5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisons.map((row, idx) => (
                <tr key={idx} className="border-b border-white/[0.03] hover:bg-[#1e293b]/50 transition-colors">
                  <td className="py-4 px-5 text-white text-sm font-medium">{row.product}</td>
                  <td className="py-4 px-5">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${brandColor(row.brand)}`}>{row.brand}</span>
                  </td>
                  <td className="py-4 px-5 text-sm font-medium" style={{ color: ACCENT_LIGHT }}>{row.system}</td>
                  <td className="py-4 px-5 text-[#94a3b8] text-sm">{row.coverage}</td>
                  <td className="py-4 px-5 text-[#94a3b8] text-sm">{row.cert}</td>
                  <td className="py-4 px-5 text-[#94a3b8] text-sm">{row.use}</td>
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
          <p className="text-[#666] text-base mt-3 max-w-md mx-auto">
            Your trusted partner for premium waterproofing systems across the UAE
          </p>
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
          <span ref={headerLine1Ref} className="block font-major tracking-[0.02em]">Ready to Waterproof?</span>
          <span className="magnetic-text block font-serif italic text-[#94a3b8]">We Seal the Deal</span>
        </h2>
        <p className="text-[#94a3b8] text-base max-w-lg mx-auto leading-relaxed mb-10">
          Contact Standard Group for waterproofing system selection, bulk pricing, and complete project documentation. UAE-wide delivery with technical support from Awazel, Polybit, Saudicoat, and DWI.
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
          <a
            href="/"
            className="magnetic-btn group flex items-center gap-3 border border-white/20 text-white px-8 py-4 rounded-full text-sm font-medium hover:bg-white/10 transition-all duration-300"
          >
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
export default function WaterProofing() {
  return (
    <div className="bg-[#F9F6F0] min-h-screen selection:bg-blue-900/20 selection:text-[#1a1a1a]">

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
