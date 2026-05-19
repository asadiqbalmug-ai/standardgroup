import React, { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, ArrowUpRight, ArrowLeft, Shield, Sparkles, Layers, CheckCircle2, ChevronDown, Droplets, Ruler, Wind, Settings } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/* ─── ACCENT COLOR: Obsidian / Charcoal — fits matte black wall-hung WCs ─── */
const ACCENT      = '#b45309'   /* warm amber — premium contrast on dark & light */
const ACCENT_DARK  = '#92400e'
const ACCENT_LIGHT = '#d97706'

/* ─── PRODUCT DATA ─── */
const products = [
  {
    id: 1,
    name: 'Model 18433',
    finish: 'Gloss White',
    style: 'Square',
    features: ['Rimless Bowl', 'Soft-Close UF Seat', 'Concealed Cistern Ready'],
    price: 'AED 2,450',
    description: 'Clean-lined square wall-hung WC in gloss white. Rimless interior bowl for superior hygiene and effortless cleaning.',
  },
  {
    id: 2,
    name: 'Model 11268',
    finish: 'Gloss White',
    style: 'D-Shape',
    features: ['Streamlined D-Shape', 'Nano Anti-Bacterial Glaze', 'Dual Flush'],
    price: 'AED 2,280',
    description: 'Classic D-shape wall-hung toilet in gloss white ceramic. Nano-glaze coating resists bacteria and limescale buildup.',
  },
  {
    id: 3,
    name: 'Model 18433-B',
    finish: 'Matte Black',
    style: 'Square',
    features: ['Matte Black Ceramic', 'Rimless Bowl', 'Statement Design'],
    price: 'AED 3,150',
    description: 'Bold matte-black square wall-hung WC. A striking statement piece that defines luxury in contemporary bathrooms.',
  },
  {
    id: 4,
    name: 'Model 11268-B',
    finish: 'Matte Black',
    style: 'D-Shape',
    features: ['Full Matte Black Finish', 'D-Shape Bowl', 'Dual Flush'],
    price: 'AED 2,980',
    description: 'D-shape wall-hung toilet in deep matte black. Pairs with chrome or brass flush plates for a curated designer look.',
  },
]

const specs = [
  { icon: Layers,    label: 'Material',        value: 'Vitreous China' },
  { icon: Settings,  label: 'Installation',    value: 'Wall-Hung / Concealed' },
  { icon: Droplets,  label: 'Flush System',    value: 'Dual Flush 3/6 L' },
  { icon: Ruler,     label: 'Projection',      value: '490 – 520 mm' },
]

const features = [
  {
    title: 'Rimless Hygiene Bowl',
    desc: 'No rim ledge means zero hidden waste zones. A powerful full-bowl flush reaches every surface — no scrubbing required.',
    icon: Sparkles,
  },
  {
    title: 'Concealed Cistern Compatible',
    desc: 'Engineered for all major in-wall concealed cistern frames (Geberit, Tece, Viega). Installation is seamless and service-friendly.',
    icon: Settings,
  },
  {
    title: 'Nano Anti-Bacterial Glaze',
    desc: 'A microscopic nano-coating bonds to the ceramic surface, repelling bacteria, limescale, and staining at the molecular level.',
    icon: Shield,
  },
  {
    title: 'Dual-Flush Water Saving',
    desc: 'Smart 3 / 6 litre flush selector reduces water consumption by up to 67% versus conventional single-flush systems.',
    icon: Droplets,
  },
  {
    title: 'Soft-Close UF Seat',
    desc: 'Premium urea-formaldehyde seat with hydraulic hinge. Closes silently every time, resists yellowing and household chemicals.',
    icon: Wind,
  },
  {
    title: 'Bold Matte Black Finish',
    desc: 'High-temperature matte black glaze offers scratch, fade, and UV resistance — retaining its deep luxurious tone for decades.',
    icon: Layers,
  },
]

const comparisons = [
  { model: 'Model 18433',   finish: 'Gloss White', style: 'Square',   projection: '490 mm', flush: '3 / 6 L', seat: 'Soft-Close UF',  suitable: 'Modern / Minimalist' },
  { model: 'Model 11268',   finish: 'Gloss White', style: 'D-Shape',  projection: '500 mm', flush: '3 / 6 L', seat: 'Soft-Close UF',  suitable: 'Contemporary' },
  { model: 'Model 18433-B', finish: 'Matte Black', style: 'Square',   projection: '490 mm', flush: '3 / 6 L', seat: 'Black UF Seat',  suitable: 'Luxury / Designer' },
  { model: 'Model 11268-B', finish: 'Matte Black', style: 'D-Shape',  projection: '500 mm', flush: '3 / 6 L', seat: 'Black UF Seat',  suitable: 'Boutique / Hotel' },
]

const reasons = [
  { title: 'UAE Experts',      desc: 'Over 20 years supplying premium sanitary ware across the Emirates.',      num: '20+',  unit: 'Years' },
  { title: 'Space Efficiency', desc: 'Wall-hung installation frees up to 30% more floor space versus floor-mounted WCs.', num: '30%',  unit: 'More Space' },
  { title: 'Design Range',     desc: '4 distinct models in gloss white and matte black to match any interior.',   num: '4',    unit: 'Models' },
  { title: 'We Set Standards', desc: 'Industry-leading quality assurance with full after-sales support in UAE.',  num: '100%', unit: 'Quality' },
]

/* ─────────────────────────────────────────
   HERO SECTION
───────────────────────────────────────── */
function HeroSection() {
  const sectionRef  = useRef(null)
  const line1Ref    = useRef(null)
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
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1920&q=80"
          alt="Premium bathroom interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#F9F6F0]/85" />
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-8 lg:px-16 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left content */}
          <div>
            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 bg-white/70 rounded-full border border-black/5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: ACCENT }} />
              <span className="text-[#555] text-[10px] tracking-[0.2em] uppercase font-medium">Standard Group — Category 04</span>
            </div>

            <h1 className="mb-6">
              <span
                ref={line1Ref}
                className="hero-title-line block font-major text-3xl sm:text-4xl lg:text-5xl text-[#1a1a1a] leading-[1.1] tracking-[0.02em] mb-2 inline-block text-3d-shadow"
              >
                Wall Hung
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
                Gravity-Defying Luxury
              </span>
            </h1>

            <p className="hero-subtitle text-[#444] text-lg max-w-md leading-relaxed mb-10">
              Four wall-hung WCs in gloss white and deep matte black — engineered for UAE homes and hotels that refuse to compromise on design or hygiene.
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

          {/* Right visual */}
          <div className="relative flex items-center justify-center">
            <div className="relative w-[520px] h-80 lg:w-[620px] lg:h-[420px] bg-white rounded-3xl shadow-xl border border-black/5 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=900&q=80"
                alt="Wall hung toilet hero"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent" />
            </div>
            {/* Decorative rings */}
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full" style={{ border: `1px solid ${ACCENT}22` }} />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full border border-black/5" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5">
        <span className="text-[#999] text-[9px] tracking-[0.3em] uppercase">Scroll</span>
        <ChevronDown size={14} className="text-[#999]" />
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────
   PRODUCT SHOWCASE
───────────────────────────────────────── */
function ProductShowcase() {
  const sectionRef    = useRef(null)
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

  /* Card background colour based on finish */
  const cardBg = (finish) => finish === 'Matte Black'
    ? 'bg-gradient-to-b from-[#1a1a1a] to-[#111111]'
    : 'bg-gradient-to-b from-[#fafafa] to-white'

  return (
    <section id="products" ref={sectionRef} className="relative py-24 lg:py-32 bg-[#F9F6F0]">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">

        {/* Header */}
        <div className="mb-16">
          <p className="text-[11px] tracking-[0.3em] uppercase font-medium mb-3" style={{ color: ACCENT }}>The Collection</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#1a1a1a] font-light leading-[1.1] mb-4 text-3d-shadow">
            <span ref={headerLine1Ref} className="block font-major tracking-[0.02em]">Four Statements.</span>
            <span className="magnetic-text block font-serif italic text-[#555]">Two Worlds of Finish.</span>
          </h2>
          <p className="text-[#666] text-base max-w-lg leading-relaxed">
            Gloss white purity or dramatic matte black — each wall-hung model is precision-cast in vitreous china, rimless inside, and designed to disappear into the wall.
          </p>
        </div>

        {/* Product Grid */}
        <div className="product-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-5">
          {products.map((product) => (
            <div key={product.id} className="product-card group relative h-[400px] cursor-pointer perspective-1000">
              <div className="relative w-full h-full transition-transform duration-500 transform-style-preserve-3d group-hover:rotate-y-180">

                {/* Front Side */}
                <div className={`absolute inset-0 border rounded-2xl overflow-hidden backface-hidden shadow-lg shadow-black/10 ${
                  product.finish === 'Matte Black'
                    ? 'bg-[#111111] border-white/[0.06]'
                    : 'bg-white border-black/[0.04]'
                }`}>
                  {/* Product image area */}
                  <div className={`relative h-52 flex items-center justify-center overflow-hidden ${
                    product.finish === 'Matte Black'
                      ? 'bg-gradient-to-b from-[#1c1c1c] to-[#111111]'
                      : 'bg-gradient-to-b from-[#f5f5f5] to-white'
                  }`}>
                    {/* Placeholder silhouette */}
                    <div className={`flex flex-col items-center gap-3 ${product.finish === 'Matte Black' ? 'opacity-30' : 'opacity-15'}`}>
                      <div className={`w-28 h-16 rounded-xl ${product.finish === 'Matte Black' ? 'bg-white' : 'bg-[#334155]'}`} />
                      <div className={`w-36 h-20 rounded-2xl ${product.finish === 'Matte Black' ? 'bg-white' : 'bg-[#334155]'}`} />
                    </div>

                    {/* Finish badge */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full border shadow-sm"
                      style={{
                        background: product.finish === 'Matte Black' ? '#1a1a1a' : 'white',
                        borderColor: product.finish === 'Matte Black' ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.06)',
                      }}
                    >
                      <span className={`text-[10px] font-semibold ${product.finish === 'Matte Black' ? 'text-white' : 'text-[#1a1a1a]'}`}>
                        {product.finish}
                      </span>
                    </div>
                    {/* Style badge */}
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-white text-[10px] font-semibold"
                      style={{ background: ACCENT }}
                    >
                      {product.style}
                    </div>
                  </div>

                  {/* Card content */}
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`font-poppins text-base tracking-[0.02em] ${product.finish === 'Matte Black' ? 'text-white' : 'text-[#1a1a1a]'}`}>
                        {product.name}
                      </h3>
                      <ArrowUpRight size={13} className="text-[#ccc] transition-colors duration-300" />
                    </div>
                    <p className={`text-xs leading-relaxed mb-3 ${product.finish === 'Matte Black' ? 'text-white/50' : 'text-[#888]'}`}>
                      {product.description}
                    </p>
                    <div className={`flex items-center justify-between pt-3 ${product.finish === 'Matte Black' ? 'border-t border-white/10' : 'border-t border-black/5'}`}>
                      <span className="font-poppins text-sm tracking-[0.02em]" style={{ color: ACCENT }}>{product.price}</span>
                      <span className={`text-[9px] uppercase tracking-wider ${product.finish === 'Matte Black' ? 'text-white/30' : 'text-[#bbb]'}`}>
                        Wall-Hung
                      </span>
                    </div>
                  </div>
                </div>

                {/* Back Side */}
                <div
                  className="absolute inset-0 rounded-2xl overflow-hidden backface-hidden rotate-y-180 p-6 flex flex-col items-center justify-center text-white"
                  style={{ background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DARK})` }}
                >
                  <h3 className="font-poppins text-lg font-medium mb-2 text-center">{product.name}</h3>
                  <p className="text-white/70 text-[11px] mb-6 text-center tracking-wider uppercase">{product.finish} — {product.style}</p>
                  <div className="grid grid-cols-2 gap-3 w-full">
                    <div className="flex flex-col items-center gap-2 p-3 bg-white/10 rounded-xl">
                      <Sparkles size={20} className="text-white" />
                      <span className="text-[10px] uppercase tracking-wider text-center">Rimless Bowl</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 p-3 bg-white/10 rounded-xl">
                      <Shield size={20} className="text-white" />
                      <span className="text-[10px] uppercase tracking-wider text-center">Nano Glaze</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 p-3 bg-white/10 rounded-xl">
                      <Droplets size={20} className="text-white" />
                      <span className="text-[10px] uppercase tracking-wider text-center">Dual Flush</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 p-3 bg-white/10 rounded-xl">
                      <CheckCircle2 size={20} className="text-white" />
                      <span className="text-[10px] uppercase tracking-wider text-center">BS EN Certified</span>
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

/* ─────────────────────────────────────────
   SPECS SECTION — Engineering Precision
───────────────────────────────────────── */
function SpecsSection() {
  const sectionRef    = useRef(null)
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

          {/* Left: Specs */}
          <div>
            <p className="text-[11px] tracking-[0.3em] uppercase font-medium mb-3" style={{ color: ACCENT_LIGHT }}>Technical Excellence</p>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl text-white font-light leading-[1.1] mb-6"
              style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.3), 2px 2px 0 rgba(0,0,0,0.2), 3px 3px 0 rgba(0,0,0,0.1), 4px 4px 8px rgba(0,0,0,0.4)' }}
            >
              <span ref={headerLine1Ref} className="block font-major tracking-[0.02em]">Engineered</span>
              <span className="magnetic-text block font-serif italic text-[#94a3b8]">to Last.</span>
            </h2>
            <p className="text-[#94a3b8] text-base leading-relaxed mb-10 max-w-md">
              High-fired vitreous china at 1,200 °C. Every wall-hung unit ships fully tested, cistern-frame compatible, and backed by Standard Group's UAE after-sales network.
            </p>

            <div className="specs-grid grid grid-cols-1 sm:grid-cols-2 gap-4">
              {specs.map((spec) => (
                <div
                  key={spec.label}
                  className="spec-item p-5 bg-[#334155] rounded-xl border border-white/10 shadow-lg shadow-black/20 transition-all duration-300 cursor-default"
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = `${ACCENT}55`
                    e.currentTarget.style.boxShadow = `0 20px 40px ${ACCENT}30`
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                    e.currentTarget.style.boxShadow = ''
                  }}
                >
                  <spec.icon size={18} className="mb-2.5" style={{ color: ACCENT_LIGHT }} />
                  <h3 className="text-[#94a3b8] text-[10px] tracking-[0.15em] uppercase mb-1">{spec.label}</h3>
                  <p className="text-white text-lg font-light">{spec.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Visual Frame */}
          <div className="relative flex items-center justify-center">
            <div className="relative w-96 h-96 bg-[#334155] rounded-3xl border border-white/10 shadow-xl shadow-black/20 overflow-hidden flex items-center justify-center">
              <div
                className="absolute inset-0"
                style={{ background: `linear-gradient(to bottom, ${ACCENT}1a, transparent)` }}
              />
              <img
                src="https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80"
                alt="Wall hung toilet precision"
                className="relative w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────
   FEATURES SECTION
───────────────────────────────────────── */
function FeaturesSection() {
  const sectionRef    = useRef(null)
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
            <span ref={headerLine1Ref} className="block font-major tracking-[0.02em]">Why Wall-Hung</span>
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

/* ─────────────────────────────────────────
   COMPARISON TABLE
───────────────────────────────────────── */
function ComparisonSection() {
  const sectionRef    = useRef(null)
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
          <p className="text-[11px] tracking-[0.3em] uppercase font-medium mb-3" style={{ color: ACCENT_LIGHT }}>Compare Models</p>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl text-white font-light leading-[1.1]"
            style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.3), 2px 2px 0 rgba(0,0,0,0.2), 3px 3px 0 rgba(0,0,0,0.1), 4px 4px 8px rgba(0,0,0,0.4)' }}
          >
            <span ref={headerLine1Ref} className="block font-major tracking-[0.02em]">Find Your</span>
            <span className="magnetic-text block font-serif italic text-[#94a3b8]">Perfect Statement.</span>
          </h2>
        </div>

        <div className="overflow-x-auto bg-[#334155] rounded-2xl border border-white/10 shadow-lg shadow-black/20">
          <table className="w-full min-w-[760px]">
            <thead>
              <tr className="border-b border-white/10">
                {['Model', 'Finish', 'Style', 'Projection', 'Flush', 'Seat', 'Suitable For'].map(h => (
                  <th key={h} className="text-left text-[#94a3b8] text-[10px] tracking-[0.15em] uppercase py-4 px-5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisons.map((row, idx) => (
                <tr key={idx} className="border-b border-white/[0.03] hover:bg-[#1e293b]/50 transition-colors">
                  <td className="py-4 px-5 text-white text-sm font-medium">{row.model}</td>
                  <td className="py-4 px-5 text-sm">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                      row.finish === 'Matte Black'
                        ? 'bg-white/10 text-white'
                        : 'bg-white/20 text-[#94a3b8]'
                    }`}>
                      {row.finish}
                    </span>
                  </td>
                  <td className="py-4 px-5 text-[#94a3b8] text-sm">{row.style}</td>
                  <td className="py-4 px-5 text-sm font-medium" style={{ color: ACCENT_LIGHT }}>{row.projection}</td>
                  <td className="py-4 px-5 text-[#94a3b8] text-sm">{row.flush}</td>
                  <td className="py-4 px-5 text-[#94a3b8] text-sm">{row.seat}</td>
                  <td className="py-4 px-5 text-[#94a3b8] text-sm">{row.suitable}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────
   WHY STANDARD GROUP
───────────────────────────────────────── */
function WhyStandardGroup() {
  const sectionRef    = useRef(null)
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
            Your trusted partner for premium wall-hung sanitary ware across the UAE
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

/* ─────────────────────────────────────────
   CTA SECTION
───────────────────────────────────────── */
function CTASection() {
  const sectionRef    = useRef(null)
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
          <span ref={headerLine1Ref} className="block font-major tracking-[0.02em]">Ready to Elevate?</span>
          <span className="magnetic-text block font-serif italic text-[#94a3b8]">Premium Awaits</span>
        </h2>
        <p className="text-[#94a3b8] text-base max-w-lg mx-auto leading-relaxed mb-10">
          Contact Standard Group today for competitive pricing, bulk orders, and expert specification advice on our wall-hung range for your project.
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

/* ─────────────────────────────────────────
   FOOTER
───────────────────────────────────────── */

/* ─────────────────────────────────────────
   MAIN PAGE COMPONENT
───────────────────────────────────────── */
export default function WallHung() {
  return (
    <div className="bg-[#F9F6F0] min-h-screen selection:bg-amber-700/20 selection:text-[#1a1a1a]">
      {/* Navigation */}

      {/* Page Sections */}
      <HeroSection />
      <ProductShowcase />
      <SpecsSection />
      <FeaturesSection />
      <ComparisonSection />
      <WhyStandardGroup />
      <CTASection />
    </div>
  )
}
