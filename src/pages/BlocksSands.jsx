import React, { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, ArrowUpRight, ArrowLeft, Shield, Layers, Ruler, CheckCircle2, ChevronDown, Mountain, Boxes, Weight, Thermometer } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/* ─── ACCENT: Earthy Brown — concrete, sand, aggregate ─── */
const ACCENT       = '#92400e'
const ACCENT_DARK  = '#78350f'
const ACCENT_LIGHT = '#d97706'

/* ─── PRODUCT DATA ─── */
const products = [
  /* ── BLOCKS ── */
  {
    id: 1,
    name: 'Thermal Insulated Block',
    category: 'Blocks',
    type: 'EPS Core Block',
    size: '400×200×200 mm',
    features: ['EPS Insulation Core', 'Thermal Break', 'UAE Climate Ready'],
    price: 'AED 4.80 / pc',
    description: 'Sandwich block with expanded polystyrene insulation core. Dramatically reduces heat transfer through walls — ideal for UAE energy-efficiency standards.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=80',
  },
  {
    id: 2,
    name: 'Solid Block',
    category: 'Blocks',
    type: 'Dense Concrete Block',
    size: '400×200×200 mm',
    features: ['High Compressive Strength', 'Load Bearing', 'Uniform Density'],
    price: 'AED 2.20 / pc',
    description: 'Solid dense-aggregate concrete block for structural and load-bearing wall applications. Consistent compressive strength exceeding 7 N/mm².',
    image: 'https://images.unsplash.com/photo-1590736704728-f4730bb30770?w=700&q=80',
  },
  {
    id: 3,
    name: 'Hollow Block',
    category: 'Blocks',
    type: 'Cavity Concrete Block',
    size: '400×200×200 mm',
    features: ['Three-Core Cavity', 'Lightweight', 'Reduces Mortar Use'],
    price: 'AED 1.80 / pc',
    description: 'Three-core hollow concrete block. Lighter than solid, cost-effective in mortar and handling, and widely used for partition and non-load-bearing walls across UAE.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=80',
  },
  /* ── SANDS ── */
  {
    id: 4,
    name: 'Black Sand',
    category: 'Sands & Aggregates',
    type: 'Fine Aggregate',
    size: 'Zone II / III',
    features: ['Clean & Washed', 'Plastering Grade', 'Low Silt Content'],
    price: 'AED 38 / tonne',
    description: 'Dark-toned washed fine aggregate. Excellent binding properties for plastering, rendering, and masonry mortar. Low silt content ensures superior adhesion.',
    image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=700&q=80',
  },
  {
    id: 5,
    name: 'Red Sand',
    category: 'Sands & Aggregates',
    type: 'Desert Fine Aggregate',
    size: 'Zone III / IV',
    features: ['Red Dune Sand', 'Backfilling Grade', 'Bulk Supply'],
    price: 'AED 28 / tonne',
    description: 'Natural red dune sand for backfilling, sub-base levelling, and landscaping. Available in bulk tipper loads across UAE project sites.',
    image: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=700&q=80',
  },
  {
    id: 6,
    name: 'White Sand',
    category: 'Sands & Aggregates',
    type: 'Fine Aggregate / Decorative',
    size: 'Fine Grade',
    features: ['White Silica', 'Pool & Landscape', 'High Purity'],
    price: 'AED 55 / tonne',
    description: 'High-purity white silica sand for swimming pools, landscaping, glass manufacture, and specialist flooring. Bright white colour with consistent fine grading.',
    image: 'https://images.unsplash.com/photo-1526477756834-7aa0e6c8e716?w=700&q=80',
  },
  {
    id: 7,
    name: 'Black Mix Sand',
    category: 'Sands & Aggregates',
    type: 'Blended Fine Aggregate',
    size: 'Mixed Grade',
    features: ['Concrete Grade', 'Zone II Blend', 'Consistent Grading'],
    price: 'AED 32 / tonne',
    description: 'Blended dark fine aggregate with consistent zone II grading. Well-suited for concrete production, blockwork mortar, and general construction use.',
    image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=700&q=80',
  },
  /* ── AGGREGATES ── */
  {
    id: 8,
    name: 'Crushed Aggregate 3/8"',
    category: 'Sands & Aggregates',
    type: 'Fine Crushed Stone',
    size: '10 mm (3/8")',
    features: ['Concrete Mix Grade', 'Angular Particles', 'High Surface Bond'],
    price: 'AED 48 / tonne',
    description: '10 mm crushed limestone aggregate for fine concrete mixes, pipe bedding, and drainage layers. Angular particle shape enhances interlocking and compaction.',
    image: 'https://images.unsplash.com/photo-1609174156745-3c2d1c978543?w=700&q=80',
  },
  {
    id: 9,
    name: 'Crushed Aggregate 3/4"',
    category: 'Sands & Aggregates',
    type: 'Coarse Crushed Stone',
    size: '20 mm (3/4")',
    features: ['Structural Concrete', 'Road Sub-Base', 'High Strength'],
    price: 'AED 42 / tonne',
    description: 'Standard 20 mm coarse crushed aggregate for structural concrete, foundations, road sub-base, and drainage blankets. Meets BS EN 12620 specification.',
    image: 'https://images.unsplash.com/photo-1609174156745-3c2d1c978543?w=700&q=80',
  },
  {
    id: 10,
    name: 'White Crushed Aggregate 3/8"',
    category: 'Sands & Aggregates',
    type: 'Decorative Crushed Stone',
    size: '10 mm White',
    features: ['White Limestone', 'Landscaping', 'Drainage & Paths'],
    price: 'AED 65 / tonne',
    description: 'White crushed limestone aggregate for decorative landscaping, permeable driveways, garden paths, and drainage layers. High visual appeal with functional performance.',
    image: 'https://images.unsplash.com/photo-1609174156745-3c2d1c978543?w=700&q=80',
  },
]

/* Sub-categories for filter display */
const blockProducts    = products.filter(p => p.category === 'Blocks')
const sandAggProducts  = products.filter(p => p.category === 'Sands & Aggregates')

const specs = [
  { icon: Boxes,       label: 'Block Strength',    value: 'Up to 10 N/mm²' },
  { icon: Thermometer, label: 'Thermal Block U-Value', value: '0.57 W/m²K' },
  { icon: Mountain,    label: 'Aggregate Grades',  value: '10 mm & 20 mm' },
  { icon: CheckCircle2,label: 'Certifications',    value: 'BS EN 771 · BS EN 12620' },
]

const features = [
  {
    title: 'Thermal Insulated Blocks',
    desc: 'EPS-core sandwich blocks meet UAE Energy Rationalisation Programme (ERP) wall U-value requirements, cutting cooling loads by up to 30%.',
    icon: Thermometer,
  },
  {
    title: 'Structural Grade Solid Blocks',
    desc: 'Dense aggregate solid blocks exceed 7 N/mm² compressive strength — fully compliant with UAE structural engineering specifications.',
    icon: Weight,
  },
  {
    title: 'Lightweight Hollow Blocks',
    desc: 'Three-core cavity design reduces dead load on structures, speeds construction, and cuts material costs without compromising wall performance.',
    icon: Layers,
  },
  {
    title: 'Graded Sands for Every Use',
    desc: 'Black, red, white, and blended sands in Zone II–IV grading. Plastering, backfilling, concrete production, and landscaping — all covered.',
    icon: Mountain,
  },
  {
    title: 'Crushed Aggregate 10 & 20 mm',
    desc: 'Angular crushed limestone in 10 mm and 20 mm sizes. Meets BS EN 12620 for structural concrete, road sub-base, and drainage applications.',
    icon: Ruler,
  },
  {
    title: 'UAE Bulk Supply',
    desc: 'Blocks by pallet, sands and aggregates by tonne or bulk tipper load. Standard Group supplies construction sites across all five emirates.',
    icon: Shield,
  },
]

const comparisons = [
  { product: 'Thermal Insulated Block', cat: 'Blocks',          size: '400×200×200', strength: '5 N/mm²',   use: 'External Walls / UAE ERP' },
  { product: 'Solid Block',             cat: 'Blocks',          size: '400×200×200', strength: '7 N/mm²',   use: 'Load-Bearing Walls' },
  { product: 'Hollow Block',            cat: 'Blocks',          size: '400×200×200', strength: '4 N/mm²',   use: 'Partitions / Non-Load' },
  { product: 'Black Sand',              cat: 'Fine Aggregate',  size: 'Zone II–III', strength: '—',          use: 'Plaster / Mortar' },
  { product: 'Red Sand',                cat: 'Fine Aggregate',  size: 'Zone III–IV', strength: '—',          use: 'Backfill / Sub-Base' },
  { product: 'White Sand',              cat: 'Fine Aggregate',  size: 'Fine Grade',  strength: '—',          use: 'Pools / Landscaping' },
  { product: 'Black Mix Sand',          cat: 'Fine Aggregate',  size: 'Zone II',     strength: '—',          use: 'Concrete / Blockwork' },
  { product: 'Crushed Agg. 3/8"',       cat: 'Coarse Agg.',     size: '10 mm',       strength: 'BS EN 12620', use: 'Fine Concrete / Drainage' },
  { product: 'Crushed Agg. 3/4"',       cat: 'Coarse Agg.',     size: '20 mm',       strength: 'BS EN 12620', use: 'Structural Concrete' },
  { product: 'White Crushed 3/8"',      cat: 'Decorative Agg.', size: '10 mm',       strength: '—',          use: 'Landscaping / Paths' },
]

const reasons = [
  { title: 'UAE Experts',       desc: 'Over 20 years supplying blocks, sands, and aggregates to UAE construction projects.',  num: '20+',  unit: 'Years' },
  { title: 'Full Range',        desc: '3 block types and 7 sands & aggregate grades — all under one supplier.',               num: '10+',  unit: 'Products' },
  { title: 'Bulk Supply',       desc: 'Blocks by pallet, aggregates by tonne or tipper. Fast UAE-wide delivery.',             num: 'UAE',  unit: 'Wide Delivery' },
  { title: 'We Set Standards',  desc: 'BS EN certified products and consistent quality control on every batch.',              num: '100%', unit: 'Quality' },
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
          alt="Construction materials"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#F9F6F0]/85" />
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-8 lg:px-16 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <div>
            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 bg-white/70 rounded-full border border-black/5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: ACCENT }} />
              <span className="text-[#555] text-[10px] tracking-[0.2em] uppercase font-medium">Standard Group — Category 07</span>
            </div>

            <h1 className="mb-6">
              <span
                ref={line1Ref}
                className="hero-title-line block font-major text-3xl sm:text-4xl lg:text-5xl text-[#1a1a1a] leading-[1.1] tracking-[0.02em] mb-2 inline-block text-3d-shadow"
              >
                Blocks, Sands
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
                & Aggregates
              </span>
            </h1>

            <p className="hero-subtitle text-[#444] text-lg max-w-md leading-relaxed mb-10">
              From thermally insulated blocks engineered for UAE's Energy Rationalisation Programme to graded sands, crushed aggregates, and decorative stone — the complete structural supply.
            </p>

            <div className="hero-cta flex items-center gap-4">
              <a
                href="#blocks"
                className="magnetic-btn group flex items-center gap-3 bg-[#1a1a1a] text-white px-7 py-3.5 rounded-full text-sm font-medium transition-all duration-300"
                onMouseEnter={e => { e.currentTarget.style.background = ACCENT }}
                onMouseLeave={e => { e.currentTarget.style.background = '#1a1a1a' }}
              >
                View Products
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
                alt="Concrete blocks"
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
   BLOCKS SECTION
══════════════════════════════════════ */
function BlocksSection() {
  const sectionRef     = useRef(null)
  const headerLine1Ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.block-card',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.blocks-grid', start: 'top 85%' } }
      )
      if (headerLine1Ref.current) {
        gsap.to(headerLine1Ref.current, { y: -15, duration: 2, ease: 'sine.inOut', yoyo: true, repeat: -1 })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="blocks" ref={sectionRef} className="relative py-24 lg:py-32 bg-[#F9F6F0]">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
        <div className="mb-16">
          <p className="text-[11px] tracking-[0.3em] uppercase font-medium mb-3" style={{ color: ACCENT }}>Masonry</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#1a1a1a] font-light leading-[1.1] mb-4 text-3d-shadow">
            <span ref={headerLine1Ref} className="block font-major tracking-[0.02em]">Three Block Types.</span>
            <span className="magnetic-text block font-serif italic text-[#555]">Every Wall Requirement.</span>
          </h2>
          <p className="text-[#666] text-base max-w-lg leading-relaxed">
            Thermal insulated, solid, and hollow concrete blocks — all 400×200×200 mm, UAE construction standard. Available in pallet and bulk quantities, delivered site-direct.
          </p>
        </div>

        <div className="blocks-grid grid grid-cols-1 md:grid-cols-3 gap-6">
          {blockProducts.map((product) => (
            <div key={product.id} className="block-card group relative h-[400px] cursor-pointer perspective-1000">
              <div className="relative w-full h-full transition-transform duration-500 transform-style-preserve-3d group-hover:rotate-y-180">

                {/* Front */}
                <div className="absolute inset-0 bg-white border border-black/[0.04] rounded-2xl overflow-hidden backface-hidden shadow-lg shadow-black/10">
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
                    <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-full border border-black/5 shadow-sm">
                      <span className="text-[#1a1a1a] text-[10px] font-semibold">{product.type}</span>
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
                    <p className="text-[#888] text-xs leading-relaxed mb-3">{product.description}</p>
                    <div className="flex items-center justify-between pt-3 border-t border-black/5">
                      <span className="font-poppins text-sm tracking-[0.02em]" style={{ color: ACCENT }}>{product.price}</span>
                      <span className="text-[#bbb] text-[9px] uppercase tracking-wider">Masonry</span>
                    </div>
                  </div>
                </div>

                {/* Back */}
                <div
                  className="absolute inset-0 rounded-2xl overflow-hidden backface-hidden rotate-y-180 p-6 flex flex-col items-center justify-center text-white"
                  style={{ background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DARK})` }}
                >
                  <h3 className="font-poppins text-lg font-medium mb-2 text-center">{product.name}</h3>
                  <p className="text-white/70 text-[11px] mb-6 text-center tracking-wider uppercase">{product.size} — {product.type}</p>
                  <div className="grid grid-cols-2 gap-3 w-full">
                    {product.features.map((f) => (
                      <div key={f} className="flex flex-col items-center gap-2 p-3 bg-white/10 rounded-xl col-span-1">
                        <CheckCircle2 size={18} className="text-white" />
                        <span className="text-[10px] uppercase tracking-wider text-center leading-tight">{f}</span>
                      </div>
                    ))}
                    <div className="flex flex-col items-center gap-2 p-3 bg-white/10 rounded-xl">
                      <Shield size={18} className="text-white" />
                      <span className="text-[10px] uppercase tracking-wider text-center">BS EN 771</span>
                    </div>
                  </div>
                  <div className="mt-6 text-center">
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
   SANDS & AGGREGATES SECTION
══════════════════════════════════════ */
function SandsSection() {
  const sectionRef     = useRef(null)
  const headerLine1Ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.sand-card',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.07, ease: 'power3.out',
          scrollTrigger: { trigger: '.sands-grid', start: 'top 85%' } }
      )
      if (headerLine1Ref.current) {
        gsap.to(headerLine1Ref.current, { y: -15, duration: 2, ease: 'sine.inOut', yoyo: true, repeat: -1 })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="sands" ref={sectionRef} className="relative py-24 lg:py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
        <div className="mb-16">
          <p className="text-[11px] tracking-[0.3em] uppercase font-medium mb-3" style={{ color: ACCENT }}>Aggregates</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#1a1a1a] font-light leading-[1.1] mb-4 text-3d-shadow">
            <span ref={headerLine1Ref} className="block font-major tracking-[0.02em]">Seven Grades.</span>
            <span className="magnetic-text block font-serif italic text-[#555]">Every Application.</span>
          </h2>
          <p className="text-[#666] text-base max-w-lg leading-relaxed">
            From plastering-grade black sand to structural 20 mm crushed aggregate and decorative white limestone — Standard Group supplies every sand and aggregate grade for UAE construction and landscaping.
          </p>
        </div>

        <div className="sands-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {sandAggProducts.map((product) => (
            <div key={product.id} className="sand-card group relative h-[380px] cursor-pointer perspective-1000">
              <div className="relative w-full h-full transition-transform duration-500 transform-style-preserve-3d group-hover:rotate-y-180">

                {/* Front */}
                <div className="absolute inset-0 bg-[#F9F6F0] border border-black/[0.04] rounded-2xl overflow-hidden backface-hidden shadow-lg shadow-black/10">
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-full border border-black/5 shadow-sm">
                      <span className="text-[#1a1a1a] text-[10px] font-semibold">{product.type}</span>
                    </div>
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-white text-[10px] font-semibold" style={{ background: ACCENT }}>
                      {product.size}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-1.5">
                      <h3 className="font-poppins text-[#1a1a1a] text-sm tracking-[0.02em] font-medium">{product.name}</h3>
                      <ArrowUpRight size={13} className="text-[#ccc]" />
                    </div>
                    <p className="text-[#888] text-xs leading-relaxed mb-3 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between pt-2.5 border-t border-black/5">
                      <span className="font-poppins text-sm tracking-[0.02em]" style={{ color: ACCENT }}>{product.price}</span>
                      <span className="text-[#bbb] text-[9px] uppercase tracking-wider">Aggregate</span>
                    </div>
                  </div>
                </div>

                {/* Back */}
                <div
                  className="absolute inset-0 rounded-2xl overflow-hidden backface-hidden rotate-y-180 p-5 flex flex-col items-center justify-center text-white"
                  style={{ background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DARK})` }}
                >
                  <h3 className="font-poppins text-base font-medium mb-1.5 text-center">{product.name}</h3>
                  <p className="text-white/70 text-[11px] mb-5 text-center tracking-wider uppercase">{product.size} — {product.type}</p>
                  <div className="grid grid-cols-2 gap-2.5 w-full">
                    {product.features.map((f) => (
                      <div key={f} className="flex flex-col items-center gap-1.5 p-2.5 bg-white/10 rounded-xl">
                        <CheckCircle2 size={16} className="text-white" />
                        <span className="text-[9px] uppercase tracking-wider text-center leading-tight">{f}</span>
                      </div>
                    ))}
                    <div className="flex flex-col items-center gap-1.5 p-2.5 bg-white/10 rounded-xl">
                      <Mountain size={16} className="text-white" />
                      <span className="text-[9px] uppercase tracking-wider text-center">Bulk Supply</span>
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
              <span ref={headerLine1Ref} className="block font-major tracking-[0.02em]">Built to Spec.</span>
              <span className="magnetic-text block font-serif italic text-[#94a3b8]">Tested & Certified.</span>
            </h2>
            <p className="text-[#94a3b8] text-base leading-relaxed mb-10 max-w-md">
              Every block, sand, and aggregate supplied by Standard Group meets UAE construction authority requirements. BS EN 771 for masonry units, BS EN 12620 for aggregates, and full compliance with Trakhees, Dubal, and ADDA project specifications.
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
                alt="Aggregate materials"
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
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-[#F9F6F0]">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
        <div className="mb-14">
          <p className="text-[11px] tracking-[0.3em] uppercase font-medium mb-3" style={{ color: ACCENT }}>Key Features</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#1a1a1a] font-light leading-[1.1] text-3d-shadow">
            <span ref={headerLine1Ref} className="block font-major tracking-[0.02em]">Why Our Materials</span>
            <span className="magnetic-text block font-serif italic text-[#555]">Stand Apart</span>
          </h2>
        </div>

        <div className="features-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="feature-card p-7 bg-white rounded-2xl border border-black/[0.03] shadow-lg shadow-black/10 hover:shadow-xl transition-shadow duration-300"
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

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-[#1e293b]">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
        <div className="mb-12">
          <p className="text-[11px] tracking-[0.3em] uppercase font-medium mb-3" style={{ color: ACCENT_LIGHT }}>Full Product Overview</p>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl text-white font-light leading-[1.1]"
            style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.3), 2px 2px 0 rgba(0,0,0,0.2), 3px 3px 0 rgba(0,0,0,0.1), 4px 4px 8px rgba(0,0,0,0.4)' }}
          >
            <span ref={headerLine1Ref} className="block font-major tracking-[0.02em]">Specify Your</span>
            <span className="magnetic-text block font-serif italic text-[#94a3b8]">Material Grade.</span>
          </h2>
        </div>

        <div className="overflow-x-auto bg-[#334155] rounded-2xl border border-white/10 shadow-lg shadow-black/20">
          <table className="w-full min-w-[760px]">
            <thead>
              <tr className="border-b border-white/10">
                {['Product', 'Category', 'Size / Grade', 'Standard / Strength', 'Best Use'].map(h => (
                  <th key={h} className="text-left text-[#94a3b8] text-[10px] tracking-[0.15em] uppercase py-4 px-5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisons.map((row, idx) => (
                <tr key={idx} className="border-b border-white/[0.03] hover:bg-[#1e293b]/50 transition-colors">
                  <td className="py-4 px-5 text-white text-sm font-medium">{row.product}</td>
                  <td className="py-4 px-5">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                      row.cat === 'Blocks' ? 'bg-amber-900/40 text-amber-300' : 'bg-white/10 text-[#94a3b8]'
                    }`}>
                      {row.cat}
                    </span>
                  </td>
                  <td className="py-4 px-5 text-sm font-medium" style={{ color: ACCENT_LIGHT }}>{row.size}</td>
                  <td className="py-4 px-5 text-[#94a3b8] text-sm">{row.strength}</td>
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
            Your trusted partner for blocks, sands, and aggregates across the UAE
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
          <span ref={headerLine1Ref} className="block font-major tracking-[0.02em]">Ready to Build?</span>
          <span className="magnetic-text block font-serif italic text-[#94a3b8]">We Supply the Foundation</span>
        </h2>
        <p className="text-[#94a3b8] text-base max-w-lg mx-auto leading-relaxed mb-10">
          Contact Standard Group for bulk pricing on blocks, sands, and aggregates. Fast delivery across UAE construction sites, with Trakhees, ADDA, and Dubal-compliant product documentation.
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
export default function BlocksSands() {
  return (
    <div className="bg-[#F9F6F0] min-h-screen selection:bg-amber-800/20 selection:text-[#1a1a1a]">
      {/* Navigation */}

      <HeroSection />
      <BlocksSection />
      <SandsSection />
      <SpecsSection />
      <FeaturesSection />
      <ComparisonSection />
      <WhyStandardGroup />
      <CTASection />
    </div>
  )
}
