import React, { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, ArrowUpRight, ArrowLeft, Shield, Layers, Ruler, CheckCircle2, ChevronDown, Zap, Weight, Grid, Settings } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/* ─── ACCENT: Steel Grey-Blue — industrial, metallic, structural ─── */
const ACCENT       = '#334155'
const ACCENT_DARK  = '#1e293b'
const ACCENT_LIGHT = '#94a3b8'

/* ─── BRANDS ─── */
const brands = [
  { name: 'Union Iron & Steel', sub: 'UAE Structural Steel' },
  { name: 'Gulf Steel Industries', sub: 'GSI — Premium Rebar' },
  { name: 'Emirates Steel', sub: 'حديد الإمارات' },
]

/* ─── PRODUCT DATA ─── */
const products = [
  {
    id: 1,
    name: 'Rebar 8mm',
    category: 'Rebar',
    type: 'Deformed High Yield Bar',
    grade: 'Grade 60 / B500B',
    size: '8 mm Ø',
    features: ['B500B Grade', 'Ribbed Surface', 'BS 4449 Compliant'],
    price: 'AED 2,450 / tonne',
    description: 'High-yield deformed steel rebar 8mm for light structural slabs, columns, and tie bars. Full BS 4449 / ASTM A615 Grade 60 compliance with mill certificates.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=80',
  },
  {
    id: 2,
    name: 'Rebar 10–16mm',
    category: 'Rebar',
    type: 'Deformed High Yield Bar',
    grade: 'Grade 60 / B500B',
    size: '10 – 16 mm Ø',
    features: ['High Tensile Yield', 'Ribbed Profile', 'Standard Lengths 12m'],
    price: 'AED 2,380 / tonne',
    description: 'Medium-diameter deformed rebar for beams, slabs, columns, and foundation cages. Available in 10 mm, 12 mm, and 16 mm diameters in standard 12 m bars.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=80',
  },
  {
    id: 3,
    name: 'Rebar 20–40mm',
    category: 'Rebar',
    type: 'Heavy Deformed Bar',
    grade: 'Grade 60 / B500B',
    size: '20 – 40 mm Ø',
    features: ['Heavy Section', 'Pile Cages & Columns', 'High Compressive Load'],
    price: 'AED 2,320 / tonne',
    description: 'Large-diameter high-yield rebar 20–40 mm for pile cages, transfer beams, raft foundations, and columns carrying heavy structural loads across UAE mega-projects.',
    image: 'https://images.unsplash.com/photo-1590736704728-f4730bb30770?w=700&q=80',
  },
  {
    id: 4,
    name: 'MS Square Tube',
    category: 'MS Pipe & Tube',
    type: 'Mild Steel Square Hollow Section',
    grade: 'S235 / S355',
    size: '20×20 – 200×200 mm',
    features: ['SHS Profile', 'Hot Rolled', 'Fabrication Ready'],
    price: 'AED 2,800 / tonne',
    description: 'Mild steel square hollow sections (SHS) for structural frames, gates, fencing, mezzanines, and architectural steelwork. Full range from 20×20 to 200×200 mm.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=80',
  },
  {
    id: 5,
    name: 'MS Rectangular Tube',
    category: 'MS Pipe & Tube',
    type: 'Mild Steel Rectangular Hollow Section',
    grade: 'S235 / S355',
    size: '40×20 – 300×150 mm',
    features: ['RHS Profile', 'Weldable', 'Paintable Surface'],
    price: 'AED 2,750 / tonne',
    description: 'Rectangular hollow sections (RHS) for purlins, lintels, handrails, and structural platforms. Consistent wall thickness, square cut ends, and weldable surface.',
    image: 'https://images.unsplash.com/photo-1590736704728-f4730bb30770?w=700&q=80',
  },
  {
    id: 6,
    name: 'MS Round Pipe',
    category: 'MS Pipe & Tube',
    type: 'Mild Steel Circular Hollow Section',
    grade: 'S235 / EN 10219',
    size: '½" – 12" NB',
    features: ['CHS Profile', 'ERW & Seamless', 'Structural & Mechanical'],
    price: 'AED 2,900 / tonne',
    description: 'Mild steel round pipes and circular hollow sections for structural columns, handrails, scaffolding supports, and mechanical conveyance. ERW and seamless options.',
    image: 'https://images.unsplash.com/photo-1609174156745-3c2d1c978543?w=700&q=80',
  },
  {
    id: 7,
    name: 'Welded Wire Mesh A142',
    category: 'Welded Wire Mesh',
    type: 'Structural Mesh — Light',
    grade: 'A142 · 6mm @ 200mm',
    size: '4.8 m × 2.4 m sheet',
    features: ['6mm Wire', '200mm Grid', 'Floor Slabs & Screeds'],
    price: 'AED 85 / sheet',
    description: 'A142 structural welded wire mesh: 6mm wires at 200mm centres. Standard sheet size 4.8×2.4m. Ideal for ground floor slabs, screeds, and lightly loaded concrete.',
    image: 'https://images.unsplash.com/photo-1609174156745-3c2d1c978543?w=700&q=80',
  },
  {
    id: 8,
    name: 'Welded Wire Mesh A252',
    category: 'Welded Wire Mesh',
    type: 'Structural Mesh — Medium',
    grade: 'A252 · 8mm @ 200mm',
    size: '4.8 m × 2.4 m sheet',
    features: ['8mm Wire', '200mm Grid', 'Suspended Slabs'],
    price: 'AED 130 / sheet',
    description: 'A252 structural mesh: 8mm high-yield wires at 200mm centres. Used for suspended slabs, transfer decks, and medium-duty slab reinforcement in UAE buildings.',
    image: 'https://images.unsplash.com/photo-1609174156745-3c2d1c978543?w=700&q=80',
  },
  {
    id: 9,
    name: 'Welded Wire Mesh A393',
    category: 'Welded Wire Mesh',
    type: 'Structural Mesh — Heavy',
    grade: 'A393 · 10mm @ 200mm',
    size: '4.8 m × 2.4 m sheet',
    features: ['10mm Wire', '200mm Grid', 'Heavy Slabs & Rafts'],
    price: 'AED 195 / sheet',
    description: 'A393 heavy structural mesh: 10mm wires at 200mm centres. Highest-strength mesh sheet for raft foundations, transfer slabs, and heavy industrial floors.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=80',
  },
]

/* Category groups */
const rebarProducts = products.filter(p => p.category === 'Rebar')
const pipeProducts  = products.filter(p => p.category === 'MS Pipe & Tube')
const meshProducts  = products.filter(p => p.category === 'Welded Wire Mesh')

const specs = [
  { icon: Weight,       label: 'Rebar Grade',         value: 'B500B / Grade 60' },
  { icon: Layers,       label: 'Rebar Sizes',          value: '8 mm – 40 mm Ø' },
  { icon: Grid,         label: 'Mesh Grades',          value: 'A142 · A252 · A393' },
  { icon: CheckCircle2, label: 'Standards',            value: 'BS 4449 · BS 4483 · EN 10219' },
]

const features = [
  {
    title: 'Rebar 8–40mm Full Range',
    desc: 'High-yield deformed rebar in all diameters from 8mm to 40mm. B500B grade, 12m standard lengths, with full mill certificates and third-party test reports for UAE authorities.',
    icon: Ruler,
  },
  {
    title: 'MS Square & Rectangular Hollow Sections',
    desc: 'Hot-rolled SHS and RHS in S235 and S355 grades for structural frames, architectural steelwork, gates, mezzanine floors, and industrial platforms.',
    icon: Layers,
  },
  {
    title: 'MS Round Pipe & CHS',
    desc: 'Circular hollow sections and ERW/seamless round pipes from ½" to 12" NB for structural columns, handrails, scaffolding, and mechanical applications.',
    icon: Settings,
  },
  {
    title: 'A142 Structural Mesh',
    desc: '6mm wire at 200mm centres. The workhorse mesh for ground-floor slabs, screeds, and lightly loaded concrete — cost-effective and fast to place.',
    icon: Grid,
  },
  {
    title: 'A252 & A393 Heavy Mesh',
    desc: 'A252 (8mm) and A393 (10mm) for suspended slabs, transfer decks, raft foundations, and heavy industrial floors where bar-by-bar placement is impractical.',
    icon: Zap,
  },
  {
    title: 'UAE Authority Compliant',
    desc: 'All steel products meet Trakhees, ADDA, DM, and ADSSC specification requirements. Full mill certificates, EN/BS test reports, and origin documentation available.',
    icon: Shield,
  },
]

const comparisons = [
  { product: 'Rebar 8mm',           cat: 'Rebar',  grade: 'B500B',     size: '8 mm',          std: 'BS 4449',   use: 'Light Slabs / Ties' },
  { product: 'Rebar 10–16mm',       cat: 'Rebar',  grade: 'B500B',     size: '10–16 mm',       std: 'BS 4449',   use: 'Beams / Columns / Slabs' },
  { product: 'Rebar 20–40mm',       cat: 'Rebar',  grade: 'B500B',     size: '20–40 mm',       std: 'BS 4449',   use: 'Piles / Raft / Heavy' },
  { product: 'MS Square Tube',      cat: 'MS Pipe', grade: 'S235/S355', size: '20×20–200×200',  std: 'EN 10219',  use: 'Frames / Gates / Arch.' },
  { product: 'MS Rectangular Tube', cat: 'MS Pipe', grade: 'S235/S355', size: '40×20–300×150',  std: 'EN 10219',  use: 'Purlins / Handrails' },
  { product: 'MS Round Pipe',       cat: 'MS Pipe', grade: 'S235',      size: '½"–12" NB',      std: 'EN 10219',  use: 'Columns / Scaffolding' },
  { product: 'Mesh A142',           cat: 'Mesh',   grade: '6mm@200',   size: '4.8×2.4 m',      std: 'BS 4483',   use: 'Floor Slabs / Screeds' },
  { product: 'Mesh A252',           cat: 'Mesh',   grade: '8mm@200',   size: '4.8×2.4 m',      std: 'BS 4483',   use: 'Suspended Slabs' },
  { product: 'Mesh A393',           cat: 'Mesh',   grade: '10mm@200',  size: '4.8×2.4 m',      std: 'BS 4483',   use: 'Raft / Transfer Slabs' },
]

const reasons = [
  { title: 'Top 3 Steel Brands',  desc: 'Union Iron & Steel, Gulf Steel Industries, and Emirates Steel — all stocked in UAE.',  num: '3',    unit: 'Brands' },
  { title: 'Full Section Range',  desc: 'Rebar, SHS, RHS, CHS, and mesh A142/A252/A393 — complete structural steel supply.',    num: '9+',   unit: 'Products' },
  { title: 'UAE Experts',         desc: '20+ years supplying certified steel to UAE infrastructure and building projects.',      num: '20+',  unit: 'Years' },
  { title: 'We Set Standards',    desc: 'BS 4449, BS 4483, and EN 10219 certified. Full mill cert documentation on every order.', num: '100%', unit: 'Certified' },
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
          alt="Steel construction"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#F9F6F0]/85" />
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-8 lg:px-16 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <div>
            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 bg-white/70 rounded-full border border-black/5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: ACCENT }} />
              <span className="text-[#555] text-[10px] tracking-[0.2em] uppercase font-medium">Standard Group — Category 10</span>
            </div>

            <h1 className="mb-6">
              <span
                ref={line1Ref}
                className="hero-title-line block font-major text-3xl sm:text-4xl lg:text-5xl text-[#1a1a1a] leading-[1.1] tracking-[0.02em] mb-2 inline-block text-3d-shadow"
              >
                Steel
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
                The Backbone of Build
              </span>
            </h1>

            <p className="hero-subtitle text-[#444] text-lg max-w-md leading-relaxed mb-10">
              Rebar 8–40mm, MS pipe & tube, and welded wire mesh A142–A393 — from Union Iron & Steel, Gulf Steel Industries, and Emirates Steel, certified for UAE construction.
            </p>

            <div className="hero-cta flex items-center gap-4">
              <a
                href="#rebar"
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
                alt="Steel rebar"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent" />
            </div>
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full" style={{ border: `1px solid ${ACCENT}33` }} />
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
        <p className="text-center text-[#999] text-[10px] tracking-[0.3em] uppercase mb-8">Our Steel Partners</p>
        <div className="flex flex-wrap items-center justify-center gap-12 lg:gap-24">
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
   REUSABLE PRODUCT CARD GRID
══════════════════════════════════════ */
function ProductCardGrid({ items, className = '' }) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ${className}`}>
      {items.map((product) => (
        <div key={product.id} className="product-card group relative h-[400px] cursor-pointer perspective-1000">
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
                <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-full border border-black/5 shadow-sm">
                  <span className="text-[#1a1a1a] text-[10px] font-semibold">{product.grade}</span>
                </div>
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-white text-[10px] font-semibold" style={{ background: ACCENT }}>
                  {product.size}
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
                  <span className="text-[#bbb] text-[9px] uppercase tracking-wider">{product.category}</span>
                </div>
              </div>
            </div>

            {/* Back */}
            <div
              className="absolute inset-0 rounded-2xl overflow-hidden backface-hidden rotate-y-180 p-6 flex flex-col items-center justify-center text-white"
              style={{ background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DARK})` }}
            >
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
                  <span className="text-[10px] uppercase tracking-wider text-center">UAE Certified</span>
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
  )
}

/* ══════════════════════════════════════
   REBAR SECTION
══════════════════════════════════════ */
function RebarSection() {
  const sectionRef     = useRef(null)
  const headerLine1Ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.product-card',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: '#rebar', start: 'top 85%' } }
      )
      if (headerLine1Ref.current) {
        gsap.to(headerLine1Ref.current, { y: -15, duration: 2, ease: 'sine.inOut', yoyo: true, repeat: -1 })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="rebar" ref={sectionRef} className="relative py-24 lg:py-32 bg-[#F9F6F0]">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
        <div className="mb-14">
          <p className="text-[11px] tracking-[0.3em] uppercase font-medium mb-3" style={{ color: ACCENT }}>Reinforcement</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#1a1a1a] font-light leading-[1.1] mb-4 text-3d-shadow">
            <span ref={headerLine1Ref} className="block font-major tracking-[0.02em]">8mm – 40mm Rebar.</span>
            <span className="magnetic-text block font-serif italic text-[#555]">Every Diameter Stocked.</span>
          </h2>
          <p className="text-[#666] text-base max-w-lg leading-relaxed">
            B500B grade high-yield deformed rebar from 8mm to 40mm — light ties through to heavy pile cages. All with full mill certificates for UAE authority submissions.
          </p>
        </div>
        <ProductCardGrid items={rebarProducts} />
      </div>
    </section>
  )
}

/* ══════════════════════════════════════
   MS PIPE & TUBE SECTION
══════════════════════════════════════ */
function PipeSection() {
  const sectionRef     = useRef(null)
  const headerLine1Ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.pipe-card',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: '#pipe', start: 'top 85%' } }
      )
      if (headerLine1Ref.current) {
        gsap.to(headerLine1Ref.current, { y: -15, duration: 2, ease: 'sine.inOut', yoyo: true, repeat: -1 })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="pipe" ref={sectionRef} className="relative py-24 lg:py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
        <div className="mb-14">
          <p className="text-[11px] tracking-[0.3em] uppercase font-medium mb-3" style={{ color: ACCENT }}>Hollow Sections</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#1a1a1a] font-light leading-[1.1] mb-4 text-3d-shadow">
            <span ref={headerLine1Ref} className="block font-major tracking-[0.02em]">MS Pipe & Tube.</span>
            <span className="magnetic-text block font-serif italic text-[#555]">SHS · RHS · CHS.</span>
          </h2>
          <p className="text-[#666] text-base max-w-lg leading-relaxed">
            Square, rectangular, and circular hollow sections in S235 and S355 grades — fabrication-ready for structural frames, architectural features, handrails, and platforms.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {pipeProducts.map((product) => (
            <div key={product.id} className="pipe-card group relative h-[400px] cursor-pointer perspective-1000">
              <div className="relative w-full h-full transition-transform duration-500 transform-style-preserve-3d group-hover:rotate-y-180">
                <div className="absolute inset-0 bg-white border border-black/[0.04] rounded-2xl overflow-hidden backface-hidden shadow-lg shadow-black/10">
                  <div className="relative h-48 overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-full border border-black/5 shadow-sm">
                      <span className="text-[#1a1a1a] text-[10px] font-semibold">{product.grade}</span>
                    </div>
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-white text-[10px] font-semibold" style={{ background: ACCENT }}>
                      {product.type.split(' ').slice(-1)[0]}
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-poppins text-[#1a1a1a] text-base tracking-[0.02em]">{product.name}</h3>
                      <ArrowUpRight size={13} className="text-[#ccc]" />
                    </div>
                    <p className="text-[#888] text-xs leading-relaxed mb-3 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between pt-3 border-t border-black/5">
                      <span className="font-poppins text-sm" style={{ color: ACCENT }}>{product.price}</span>
                      <span className="text-[#bbb] text-[9px] uppercase tracking-wider">{product.size}</span>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 rounded-2xl overflow-hidden backface-hidden rotate-y-180 p-6 flex flex-col items-center justify-center text-white" style={{ background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DARK})` }}>
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
                      <span className="text-[10px] uppercase tracking-wider text-center">EN 10219</span>
                    </div>
                  </div>
                  <div className="mt-5 text-center"><span className="text-xl font-poppins font-light">{product.price}</span></div>
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
   WELDED WIRE MESH SECTION
══════════════════════════════════════ */
function MeshSection() {
  const sectionRef     = useRef(null)
  const headerLine1Ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.mesh-card',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '#mesh', start: 'top 85%' } }
      )
      if (headerLine1Ref.current) {
        gsap.to(headerLine1Ref.current, { y: -15, duration: 2, ease: 'sine.inOut', yoyo: true, repeat: -1 })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="mesh" ref={sectionRef} className="relative py-24 lg:py-32 bg-[#F9F6F0]">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
        <div className="mb-14">
          <p className="text-[11px] tracking-[0.3em] uppercase font-medium mb-3" style={{ color: ACCENT }}>Structural Mesh</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#1a1a1a] font-light leading-[1.1] mb-4 text-3d-shadow">
            <span ref={headerLine1Ref} className="block font-major tracking-[0.02em]">Welded Wire Mesh.</span>
            <span className="magnetic-text block font-serif italic text-[#555]">A142 · A252 · A393.</span>
          </h2>
          <p className="text-[#666] text-base max-w-lg leading-relaxed">
            BS 4483 structural welded mesh in three grades — 6mm, 8mm, and 10mm wire at 200mm centres — for ground slabs, suspended decks, and raft foundations.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {meshProducts.map((product) => (
            <div key={product.id} className="mesh-card group relative h-[400px] cursor-pointer perspective-1000">
              <div className="relative w-full h-full transition-transform duration-500 transform-style-preserve-3d group-hover:rotate-y-180">
                <div className="absolute inset-0 bg-white border border-black/[0.04] rounded-2xl overflow-hidden backface-hidden shadow-lg shadow-black/10">
                  <div className="relative h-48 overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-full border border-black/5 shadow-sm">
                      <span className="text-[#1a1a1a] text-[10px] font-semibold">{product.grade}</span>
                    </div>
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-white text-[10px] font-semibold" style={{ background: ACCENT }}>
                      {product.size.split('×')[0].trim()} m
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-poppins text-[#1a1a1a] text-base tracking-[0.02em]">{product.name}</h3>
                      <ArrowUpRight size={13} className="text-[#ccc]" />
                    </div>
                    <p className="text-[#888] text-xs leading-relaxed mb-3 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between pt-3 border-t border-black/5">
                      <span className="font-poppins text-sm" style={{ color: ACCENT }}>{product.price}</span>
                      <span className="text-[#bbb] text-[9px] uppercase tracking-wider">BS 4483</span>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 rounded-2xl overflow-hidden backface-hidden rotate-y-180 p-6 flex flex-col items-center justify-center text-white" style={{ background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DARK})` }}>
                  <h3 className="font-poppins text-lg font-medium mb-1 text-center">{product.name}</h3>
                  <p className="text-white/70 text-[11px] mb-5 text-center tracking-wider uppercase">{product.type}</p>
                  <div className="grid grid-cols-2 gap-3 w-full">
                    {product.features.map((f) => (
                      <div key={f} className="flex flex-col items-center gap-1.5 p-3 bg-white/10 rounded-xl">
                        <Grid size={18} className="text-white" />
                        <span className="text-[10px] uppercase tracking-wider text-center leading-tight">{f}</span>
                      </div>
                    ))}
                    <div className="flex flex-col items-center gap-1.5 p-3 bg-white/10 rounded-xl">
                      <Shield size={18} className="text-white" />
                      <span className="text-[10px] uppercase tracking-wider text-center">BS 4483</span>
                    </div>
                  </div>
                  <div className="mt-5 text-center"><span className="text-xl font-poppins font-light">{product.price}</span></div>
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
              <span className="magnetic-text block font-serif italic text-[#94a3b8]">Mill Tested. Site Ready.</span>
            </h2>
            <p className="text-[#94a3b8] text-base leading-relaxed mb-10 max-w-md">
              Every steel product arrives with full mill certificates, EN/BS test reports, and country of origin documentation — meeting Trakhees, DM, ADDA, and ADSSC project specifications across UAE.
            </p>

            <div className="specs-grid grid grid-cols-1 sm:grid-cols-2 gap-4">
              {specs.map((spec) => (
                <div
                  key={spec.label}
                  className="spec-item p-5 bg-[#334155] rounded-xl border border-white/10 shadow-lg shadow-black/20 transition-all duration-300 cursor-default"
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = `${ACCENT}88`
                    e.currentTarget.style.boxShadow   = `0 20px 40px ${ACCENT}40`
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
              <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${ACCENT}22, transparent)` }} />
              <img
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"
                alt="Steel construction"
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
            <span ref={headerLine1Ref} className="block font-major tracking-[0.02em]">Why Our Steel</span>
            <span className="magnetic-text block font-serif italic text-[#555]">Stands Apart</span>
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

  const catColor = (cat) => {
    if (cat === 'Rebar')   return 'bg-blue-900/40 text-blue-300'
    if (cat === 'MS Pipe') return 'bg-slate-700/40 text-slate-300'
    return 'bg-emerald-900/40 text-emerald-300'
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
            <span className="magnetic-text block font-serif italic text-[#94a3b8]">Steel Section.</span>
          </h2>
        </div>

        <div className="overflow-x-auto bg-[#334155] rounded-2xl border border-white/10 shadow-lg shadow-black/20">
          <table className="w-full min-w-[780px]">
            <thead>
              <tr className="border-b border-white/10">
                {['Product', 'Category', 'Grade', 'Size', 'Standard', 'Best Use'].map(h => (
                  <th key={h} className="text-left text-[#94a3b8] text-[10px] tracking-[0.15em] uppercase py-4 px-5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisons.map((row, idx) => (
                <tr key={idx} className="border-b border-white/[0.03] hover:bg-[#1e293b]/50 transition-colors">
                  <td className="py-4 px-5 text-white text-sm font-medium">{row.product}</td>
                  <td className="py-4 px-5">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${catColor(row.cat)}`}>{row.cat}</span>
                  </td>
                  <td className="py-4 px-5 text-sm font-medium" style={{ color: ACCENT_LIGHT }}>{row.grade}</td>
                  <td className="py-4 px-5 text-[#94a3b8] text-sm">{row.size}</td>
                  <td className="py-4 px-5 text-[#94a3b8] text-sm">{row.std}</td>
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
          <p className="text-[#666] text-base mt-3 max-w-md mx-auto">Your trusted partner for structural steel supply across the UAE</p>
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
          <span ref={headerLine1Ref} className="block font-major tracking-[0.02em]">Ready to Build?</span>
          <span className="magnetic-text block font-serif italic text-[#94a3b8]">We Supply the Steel</span>
        </h2>
        <p className="text-[#94a3b8] text-base max-w-lg mx-auto leading-relaxed mb-10">
          Contact Standard Group for bulk pricing on rebar, MS pipe & tube, and welded wire mesh. Fast site delivery across UAE with full mill certificates and authority-compliant documentation.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="mailto:sales@standardgroup.ae"
            className="magnetic-btn group flex items-center gap-3 text-white px-8 py-4 rounded-full text-sm font-medium transition-all duration-300 shadow-lg"
            style={{ background: ACCENT, boxShadow: `0 15px 35px ${ACCENT}55` }}
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
export default function Steel() {
  return (
    <div className="bg-[#F9F6F0] min-h-screen selection:bg-slate-700/20 selection:text-[#1a1a1a]">

      <HeroSection />
      <BrandsStrip />
      <RebarSection />
      <PipeSection />
      <MeshSection />
      <SpecsSection />
      <FeaturesSection />
      <ComparisonSection />
      <WhyStandardGroup />
      <CTASection />
    </div>
  )
}
