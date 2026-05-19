import React, { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, ArrowUpRight, ArrowLeft, Shield, Layers, Ruler, CheckCircle2, ChevronDown, Flame, Weight, Boxes, Mountain } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/* ─── ACCENT: Industrial Red — cement, strength, construction ─── */
const ACCENT       = '#b91c1c'
const ACCENT_DARK  = '#991b1b'
const ACCENT_LIGHT = '#f87171'

/* ─── BRANDS ─── */
const brands = [
  { name: 'RAKCC',       sub: 'Ras Al Khaimah Cement Company' },
  { name: 'RAK White',   sub: 'White Portland Cement' },
  { name: 'Abu Dhabi',   sub: 'Portland Limestone Cement' },
  { name: 'UltraTech',   sub: "The Engineer's Choice" },
]

/* ─── PRODUCT DATA ─── */
const products = [
  {
    id: 1,
    name: 'RAKCC OPC',
    brand: 'RAKCC',
    type: 'Ordinary Portland Cement',
    grade: '52.5 N',
    bag: '50 kg',
    features: ['ISO 9001 Certified', 'High Early Strength', 'UAE Made'],
    price: 'AED 18.50 / bag',
    description: 'RAKCC Ordinary Portland Cement (OPC 52.5N) — the UAE\'s benchmark structural cement. Consistent fineness, rapid early strength gain, and full BS EN 197-1 compliance.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=80',
  },
  {
    id: 2,
    name: 'RAKCC MC-II',
    brand: 'RAKCC',
    type: 'Moderate Sulphate Resistance',
    grade: '42.5 N',
    bag: '50 kg',
    features: ['Sulphate Resistant', 'Low Heat', 'Foundation Grade'],
    price: 'AED 19.00 / bag',
    description: 'RAKCC MC-II moderate sulphate-resisting cement for foundations, piling, and below-grade concrete in UAE\'s sulphate-rich soil and groundwater conditions.',
    image: 'https://images.unsplash.com/photo-1590736704728-f4730bb30770?w=700&q=80',
  },
  {
    id: 3,
    name: 'RAK White Cement',
    brand: 'RAK White',
    type: 'White Portland Cement',
    grade: '52.5 R',
    bag: '50 kg',
    features: ['Brilliant White', 'Architectural Finish', 'Low Iron Content'],
    price: 'AED 32.00 / bag',
    description: 'RAK White Portland Cement 52.5R for architectural concrete, white-render finishes, terrazzo, and ornamental work. Ultra-low iron oxide content for pure, brilliant white.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=80',
  },
  {
    id: 4,
    name: 'Abu Dhabi PLC',
    brand: 'Abu Dhabi',
    type: 'Portland Limestone Cement',
    grade: '42.5 N',
    bag: '50 kg',
    features: ['Lower Carbon Footprint', 'Workability', 'BS EN 197-1 CEM II'],
    price: 'AED 17.50 / bag',
    description: 'Abu Dhabi Portland Limestone Cement (CEM II/B-L 42.5N) — reduced carbon, excellent workability, and durability for general construction, blockwork, and rendering.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=80',
  },
  {
    id: 5,
    name: 'UltraTech PLC',
    brand: 'UltraTech',
    type: 'Ordinary Portland Cement',
    grade: '53 Grade',
    bag: '50 kg',
    features: ['53 Grade OPC', 'High Strength', 'ISO 9001'],
    price: 'AED 19.50 / bag',
    description: 'UltraTech 53 Grade OPC — India\'s largest cement brand, trusted on landmark UAE projects. Delivers superior compressive strength and consistent quality batch-to-batch.',
    image: 'https://images.unsplash.com/photo-1590736704728-f4730bb30770?w=700&q=80',
  },
  {
    id: 6,
    name: 'UltraTech SRC',
    brand: 'UltraTech',
    type: 'Sulphate Resisting Cement',
    grade: '42.5 SR',
    bag: '50 kg',
    features: ['Full Sulphate Resistance', 'Piling & Foundations', 'Coastal Projects'],
    price: 'AED 22.00 / bag',
    description: 'UltraTech Sulphate Resisting Cement (SRC) for aggressive soil, coastal, and marine environments. Significantly reduces risk of sulphate attack in UAE groundwater conditions.',
    image: 'https://images.unsplash.com/photo-1609174156745-3c2d1c978543?w=700&q=80',
  },
]

const specs = [
  { icon: Flame,        label: 'Max Compressive Strength', value: '52.5 N/mm² (28-day)' },
  { icon: Shield,       label: 'Sulphate Resistance',      value: 'SRC & MC-II Grades' },
  { icon: Weight,       label: 'Standard Bag Size',        value: '50 kg' },
  { icon: CheckCircle2, label: 'Certifications',           value: 'BS EN 197-1 · ISO 9001' },
]

const features = [
  {
    title: 'OPC 52.5N — Structural Grade',
    desc: 'Ordinary Portland Cement 52.5N delivers the highest early and long-term compressive strengths for columns, beams, slabs, and high-rise structures.',
    icon: Boxes,
  },
  {
    title: 'Sulphate Resisting (SRC & MC-II)',
    desc: 'UAE soils and groundwater contain aggressive sulphates. Our SRC and MC-II grades provide essential protection for foundations, piles, and buried concrete.',
    icon: Shield,
  },
  {
    title: 'White Portland Cement',
    desc: 'Low iron-oxide formulation produces a pure white finish for architectural concrete, terrazzo, decorative renders, and feature facades.',
    icon: Mountain,
  },
  {
    title: 'Portland Limestone Cement (PLC)',
    desc: 'CEM II Portland Limestone Cement reduces CO₂ by up to 15% versus CEM I, without compromising strength or durability for general construction.',
    icon: Layers,
  },
  {
    title: 'UAE-Compliant Specifications',
    desc: 'All cements meet UAE Municipality, Trakhees, ADDA, and ADSSC specification requirements. Full test certificates and third-party reports available.',
    icon: CheckCircle2,
  },
  {
    title: 'Bulk & Bag Supply',
    desc: 'Available in 50 kg bags on pallets or bulk loose by tanker. Standard Group delivers to UAE construction sites with short lead times and consistent stock.',
    icon: Ruler,
  },
]

const comparisons = [
  { product: 'RAKCC OPC',      brand: 'RAKCC',     type: 'CEM I 52.5N',        bag: '50 kg', resistance: 'Standard',  use: 'Structural / General' },
  { product: 'RAKCC MC-II',    brand: 'RAKCC',     type: 'CEM I 42.5N SR',     bag: '50 kg', resistance: 'Moderate SR', use: 'Foundations / Piling' },
  { product: 'RAK White',      brand: 'RAK White', type: 'CEM I 52.5R White',  bag: '50 kg', resistance: 'Standard',  use: 'Architectural / Décor' },
  { product: 'Abu Dhabi PLC',  brand: 'Abu Dhabi', type: 'CEM II/B-L 42.5N',  bag: '50 kg', resistance: 'Standard',  use: 'General / Blockwork' },
  { product: 'UltraTech PLC',  brand: 'UltraTech', type: 'OPC 53 Grade',       bag: '50 kg', resistance: 'Standard',  use: 'High-Strength Concrete' },
  { product: 'UltraTech SRC',  brand: 'UltraTech', type: 'SRC 42.5',           bag: '50 kg', resistance: 'Full SR',   use: 'Coastal / Marine / Piling' },
]

const reasons = [
  { title: 'Top 4 Brands',      desc: 'RAKCC, RAK White, Abu Dhabi, and UltraTech — leading cement brands stocked in UAE.',  num: '4',    unit: 'Brands' },
  { title: 'Full Grade Range',  desc: 'OPC, PLC, SRC, White, and MC-II — every cement type for every UAE specification.',    num: '6',    unit: 'Products' },
  { title: 'UAE Experts',       desc: '20+ years supplying cement to UAE civil, infrastructure, and building contractors.',  num: '20+',  unit: 'Years' },
  { title: 'We Set Standards',  desc: 'BS EN 197-1 certified, full test documentation, site delivery across UAE.',          num: '100%', unit: 'Quality' },
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
          alt="Cement construction"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#F9F6F0]/85" />
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-8 lg:px-16 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <div>
            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 bg-white/70 rounded-full border border-black/5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: ACCENT }} />
              <span className="text-[#555] text-[10px] tracking-[0.2em] uppercase font-medium">Standard Group — Category 08</span>
            </div>

            <h1 className="mb-6">
              <span
                ref={line1Ref}
                className="hero-title-line block font-major text-3xl sm:text-4xl lg:text-5xl text-[#1a1a1a] leading-[1.1] tracking-[0.02em] mb-2 inline-block text-3d-shadow"
              >
                Cement
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
                PLC · OPC · White
              </span>
            </h1>

            <p className="hero-subtitle text-[#444] text-lg max-w-md leading-relaxed mb-10">
              Six cement grades from four trusted UAE brands — RAKCC, RAK White, Abu Dhabi, and UltraTech. OPC, PLC, SRC, MC-II, and White Portland Cement, all BS EN 197-1 certified.
            </p>

            <div className="hero-cta flex items-center gap-4">
              <a
                href="#products"
                className="magnetic-btn group flex items-center gap-3 bg-[#1a1a1a] text-white px-7 py-3.5 rounded-full text-sm font-medium transition-all duration-300"
                onMouseEnter={e => { e.currentTarget.style.background = ACCENT }}
                onMouseLeave={e => { e.currentTarget.style.background = '#1a1a1a' }}
              >
                View Full Range
                <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a href="#specs" className="text-[#666] text-sm font-medium hover:text-[#1a1a1a] transition-colors">
                View Specs
              </a>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="relative w-[520px] h-80 lg:w-[620px] lg:h-[420px] bg-white rounded-3xl shadow-xl border border-black/5 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1590736704728-f4730bb30770?w=900&q=80"
                alt="Cement bags"
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
    <section className="py-12 bg-white border-b border-black/5">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
        <p className="text-center text-[#999] text-[10px] tracking-[0.3em] uppercase mb-8">Our Cement Partners</p>
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

  /* Brand colour accent per bag */
  const brandColor = (brand) => {
    if (brand === 'RAKCC')     return '#1d4ed8'
    if (brand === 'RAK White') return '#6b7280'
    if (brand === 'Abu Dhabi') return '#15803d'
    return ACCENT
  }

  return (
    <section id="products" ref={sectionRef} className="relative py-24 lg:py-32 bg-[#F9F6F0]">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">

        <div className="mb-16">
          <p className="text-[11px] tracking-[0.3em] uppercase font-medium mb-3" style={{ color: ACCENT }}>The Range</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#1a1a1a] font-light leading-[1.1] mb-4 text-3d-shadow">
            <span ref={headerLine1Ref} className="block font-major tracking-[0.02em]">Six Grades.</span>
            <span className="magnetic-text block font-serif italic text-[#555]">Every Specification.</span>
          </h2>
          <p className="text-[#666] text-base max-w-lg leading-relaxed">
            From standard OPC 52.5N for structural concrete to sulphate-resisting SRC for UAE foundations, and architectural white cement — Standard Group stocks every grade your project requires.
          </p>
        </div>

        <div className="product-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map((product) => (
            <div key={product.id} className="product-card group relative h-[410px] cursor-pointer perspective-1000">
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
                    {/* Grade badge */}
                    <div className="absolute top-3 right-3 px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-full border border-black/5 shadow-sm">
                      <span className="text-[#1a1a1a] text-[10px] font-semibold">{product.grade}</span>
                    </div>
                    {/* Name on image bottom */}
                    <div className="absolute bottom-3 left-4">
                      <span className="text-white font-major text-lg tracking-wide drop-shadow-lg">{product.bag}</span>
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
                      <span className="text-[#bbb] text-[9px] uppercase tracking-wider">{product.type.split(' ').slice(0,2).join(' ')}</span>
                    </div>
                  </div>
                </div>

                {/* Back */}
                <div
                  className="absolute inset-0 rounded-2xl overflow-hidden backface-hidden rotate-y-180 p-6 flex flex-col items-center justify-center text-white"
                  style={{ background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DARK})` }}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-4 font-major text-lg"
                    style={{ background: brandColor(product.brand) }}
                  >
                    {product.grade.split(' ')[0]}
                  </div>
                  <h3 className="font-poppins text-lg font-medium mb-1 text-center">{product.name}</h3>
                  <p className="text-white/70 text-[11px] mb-5 text-center tracking-wider uppercase">{product.type}</p>
                  <div className="grid grid-cols-2 gap-3 w-full">
                    {product.features.map((f) => (
                      <div key={f} className="flex flex-col items-center gap-1.5 p-3 bg-white/10 rounded-xl">
                        <CheckCircle2 size={18} className="text-white" />
                        <span className="text-[10px] uppercase tracking-wider text-center leading-tight">{f}</span>
                      </div>
                    ))}
                    <div className="flex flex-col items-center gap-1.5 p-3 bg-white/10 rounded-xl">
                      <Shield size={18} className="text-white" />
                      <span className="text-[10px] uppercase tracking-wider text-center">BS EN 197-1</span>
                    </div>
                  </div>
                  <div className="mt-5 text-center">
                    <span className="text-2xl font-poppins font-light">{product.price}</span>
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
              <span ref={headerLine1Ref} className="block font-major tracking-[0.02em]">Certified.</span>
              <span className="magnetic-text block font-serif italic text-[#94a3b8]">Tested. Trusted.</span>
            </h2>
            <p className="text-[#94a3b8] text-base leading-relaxed mb-10 max-w-md">
              Every cement grade stocked by Standard Group carries BS EN 197-1 certification, ISO 9001 quality management approval, and full third-party test documentation for UAE authority submissions.
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
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"
                alt="Cement construction"
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
            <span ref={headerLine1Ref} className="block font-major tracking-[0.02em]">Why Our Cement</span>
            <span className="magnetic-text block font-serif italic text-[#555]">Stands Apart</span>
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
    if (brand === 'RAKCC')     return 'bg-blue-900/40 text-blue-300'
    if (brand === 'RAK White') return 'bg-slate-700/40 text-slate-300'
    if (brand === 'Abu Dhabi') return 'bg-green-900/40 text-green-300'
    return 'bg-red-900/40 text-red-300'
  }

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-[#1e293b]">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
        <div className="mb-12">
          <p className="text-[11px] tracking-[0.3em] uppercase font-medium mb-3" style={{ color: ACCENT_LIGHT }}>Compare Grades</p>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl text-white font-light leading-[1.1]"
            style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.3), 2px 2px 0 rgba(0,0,0,0.2), 3px 3px 0 rgba(0,0,0,0.1), 4px 4px 8px rgba(0,0,0,0.4)' }}
          >
            <span ref={headerLine1Ref} className="block font-major tracking-[0.02em]">Find Your</span>
            <span className="magnetic-text block font-serif italic text-[#94a3b8]">Correct Grade.</span>
          </h2>
        </div>

        <div className="overflow-x-auto bg-[#334155] rounded-2xl border border-white/10 shadow-lg shadow-black/20">
          <table className="w-full min-w-[760px]">
            <thead>
              <tr className="border-b border-white/10">
                {['Product', 'Brand', 'Cement Type', 'Bag Size', 'Sulphate Resistance', 'Best Use'].map(h => (
                  <th key={h} className="text-left text-[#94a3b8] text-[10px] tracking-[0.15em] uppercase py-4 px-5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisons.map((row, idx) => (
                <tr key={idx} className="border-b border-white/[0.03] hover:bg-[#1e293b]/50 transition-colors">
                  <td className="py-4 px-5 text-white text-sm font-medium">{row.product}</td>
                  <td className="py-4 px-5">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${brandColor(row.brand)}`}>
                      {row.brand}
                    </span>
                  </td>
                  <td className="py-4 px-5 text-sm font-medium" style={{ color: ACCENT_LIGHT }}>{row.type}</td>
                  <td className="py-4 px-5 text-[#94a3b8] text-sm">{row.bag}</td>
                  <td className="py-4 px-5 text-[#94a3b8] text-sm">{row.resistance}</td>
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
            Your trusted partner for premium cement supply across the UAE
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
          <span ref={headerLine1Ref} className="block font-major tracking-[0.02em]">Ready to Pour?</span>
          <span className="magnetic-text block font-serif italic text-[#94a3b8]">We Supply the Strength</span>
        </h2>
        <p className="text-[#94a3b8] text-base max-w-lg mx-auto leading-relaxed mb-10">
          Contact Standard Group for competitive bulk pricing on RAKCC, RAK White, Abu Dhabi, and UltraTech cement. Fast UAE-wide site delivery with full BS EN certification documentation.
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
export default function Cement() {
  return (
    <div className="bg-[#F9F6F0] min-h-screen selection:bg-red-800/20 selection:text-[#1a1a1a]">
      {/* Navigation */}

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
