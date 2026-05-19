import React, { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, ArrowUpRight, ArrowLeft, Droplets, Shield, Sparkles, Ruler, CheckCircle2, ChevronDown, Wind, Layers } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/* ─── ACCENT COLOR: Teal #0d9488 ─── */
const ACCENT = '#0d9488'
const ACCENT_DARK = '#0f766e'
const ACCENT_LIGHT = '#14b8a6'

/* ─── PRODUCT DATA ─── */
const products = [
  {
    id: 1,
    name: 'Model 11061',
    type: 'Pedestal Basin',
    size: 'Standard',
    features: ['Full Pedestal', 'Single Tap Hole', 'Anti-Chip Glaze'],
    price: 'AED 320',
    description: 'Classic full-pedestal wash basin with crisp white vitreous china. Ideal for residential bathrooms seeking timeless elegance.',
  },
  {
    id: 2,
    name: 'Model 16632',
    type: 'Pedestal Basin',
    size: 'Medium',
    features: ['Full Pedestal', 'Center Tap Hole', 'Overflow Included'],
    price: 'AED 340',
    description: 'Mid-size pedestal basin with refined curves and a sleek center tap hole for single-lever mixers.',
  },
  {
    id: 3,
    name: 'Model 10598',
    type: 'Pedestal Basin',
    size: 'Compact',
    features: ['Full Pedestal', 'Space Saving', 'Smooth Finish'],
    price: 'AED 295',
    description: 'Compact design for smaller bathrooms. Full pedestal conceals plumbing while maintaining a clean look.',
  },
  {
    id: 4,
    name: 'Model 11249',
    type: 'Semi-Pedestal Basin',
    size: 'Standard',
    features: ['Round Bowl', 'Semi Pedestal', 'Wide Rim'],
    price: 'AED 310',
    description: 'Gently rounded bowl with semi-pedestal support. Soft contours bring warmth to any bathroom design.',
  },
  {
    id: 5,
    name: 'Model 14921',
    type: 'Counter-Top Basin',
    size: 'Large',
    features: ['Square Design', 'Counter Mount', 'Dual Tap Holes'],
    price: 'AED 450',
    description: 'Contemporary square basin for countertop installation. Wide platform and dual tap holes suit couples\' bathrooms.',
  },
  {
    id: 6,
    name: 'Model 18546',
    type: 'Semi-Pedestal Basin',
    size: 'Standard',
    features: ['Beige Finish', 'Semi Pedestal', 'Ergonomic Depth'],
    price: 'AED 360',
    description: 'Warm beige finish adds character to neutral bathrooms. Ergonomically deep bowl reduces splashing.',
  },
  {
    id: 7,
    name: 'Model 16834',
    type: 'Wall-Hung Basin',
    size: 'Compact',
    features: ['Wall Hung', 'Easy Clean', 'Single Tap Hole'],
    price: 'AED 285',
    description: 'Wall-mounted design for easy floor cleaning. Minimalist profile suits modern and compact bathroom spaces.',
  },
  {
    id: 8,
    name: 'Model 14473',
    type: 'Pedestal Basin',
    size: 'Slim',
    features: ['Tall Pedestal', 'Slim Profile', 'Anti-Stain Coat'],
    price: 'AED 330',
    description: 'Slim tall-pedestal basin with an anti-stain coating for easy maintenance. Perfect for high-traffic bathrooms.',
  },
]

const specs = [
  { icon: Layers, label: 'Material', value: 'Vitreous China' },
  { icon: Shield, label: 'Glaze Finish', value: 'Anti-Chip & Anti-Stain' },
  { icon: Ruler, label: 'Bowl Depth', value: '140 – 180 mm' },
  { icon: Droplets, label: 'Overflow', value: 'Integrated Standard' },
]

const features = [
  {
    title: 'Vitreous China Construction',
    desc: 'High-fired vitreous china for unmatched durability, resisting chips, cracks, and stains over decades of use.',
    icon: Shield,
  },
  {
    title: 'Anti-Stain Glaze Coating',
    desc: 'Proprietary glaze formulation repels limescale, soap residue, and bacterial growth — keeping basins pristine with minimal effort.',
    icon: Sparkles,
  },
  {
    title: 'Integrated Overflow System',
    desc: 'Every basin features a concealed overflow channel to prevent flooding while maintaining a clean, uninterrupted aesthetic.',
    icon: Droplets,
  },
  {
    title: 'Ergonomic Bowl Geometry',
    desc: 'Carefully engineered bowl depth and curvature minimise splashing, maximise usable water volume, and ensure effortless rinsing.',
    icon: Wind,
  },
  {
    title: 'Universal Tap Compatibility',
    desc: 'Standard 3.5" tap hole diameter supports all leading UK and European monobloc mixers, pillar taps, and sensor faucets.',
    icon: CheckCircle2,
  },
  {
    title: 'Complete Pedestal Range',
    desc: 'From full-pedestal to wall-hung, every model is designed to conceal pipework neatly, ensuring a show-room finish.',
    icon: Layers,
  },
]

const comparisons = [
  { model: 'Model 11061', type: 'Full Pedestal',     size: '560×460 mm', depth: '160 mm', tapHoles: '1',   suitable: 'Residential' },
  { model: 'Model 16632', type: 'Full Pedestal',     size: '530×430 mm', depth: '155 mm', tapHoles: '1',   suitable: 'Residential' },
  { model: 'Model 10598', type: 'Full Pedestal',     size: '500×400 mm', depth: '148 mm', tapHoles: '1',   suitable: 'Compact Bathrooms' },
  { model: 'Model 11249', type: 'Semi-Pedestal',     size: '560×450 mm', depth: '170 mm', tapHoles: '1',   suitable: 'Residential' },
  { model: 'Model 14921', type: 'Counter-Top',       size: '580×480 mm', depth: '180 mm', tapHoles: '2',   suitable: 'Master Bathrooms' },
  { model: 'Model 18546', type: 'Semi-Pedestal',     size: '550×440 mm', depth: '158 mm', tapHoles: '1',   suitable: 'Residential / Hotels' },
  { model: 'Model 16834', type: 'Wall-Hung',         size: '500×360 mm', depth: '140 mm', tapHoles: '1',   suitable: 'Modern / Compact' },
  { model: 'Model 14473', type: 'Tall Pedestal',     size: '510×420 mm', depth: '152 mm', tapHoles: '1',   suitable: 'Commercial' },
]

const reasons = [
  { title: 'UAE Experts',    desc: 'Over 2 decades of trusted supply across the Emirates.',            num: '20+',  unit: 'Years' },
  { title: 'Certified Quality', desc: 'Every basin meets BS and ISO sanitary ware standards.',         num: 'BS EN', unit: 'Certified' },
  { title: 'Full Range',     desc: 'Eight models covering every installation type and budget.',         num: '8',    unit: 'Models' },
  { title: 'We Set Standards', desc: 'Industry-leading after-sales support and product warranty.',      num: '100%', unit: 'Quality' },
]

/* ─── HERO SECTION ─── */
function HeroSection() {
  const sectionRef = useRef(null)
  const line1Ref = useRef(null)
  const line2Ref = useRef(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-title-line', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out', delay: 0.2 })
      gsap.fromTo('.hero-subtitle', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.6 })
      gsap.fromTo('.hero-cta', { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', delay: 0.8 })

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
          src="https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1920&q=80"
          alt="Premium bathroom wash basin"
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
              <span className="text-[#555] text-[10px] tracking-[0.2em] uppercase font-medium">Standard Group — Category 03</span>
            </div>

            <h1 className="mb-6">
              <span
                ref={line1Ref}
                className="hero-title-line block font-major text-3xl sm:text-4xl lg:text-5xl text-[#1a1a1a] leading-[1.1] tracking-[0.02em] mb-2 inline-block text-3d-shadow"
              >
                Wash Basins
              </span>
              <span
                ref={line2Ref}
                className="hero-title-line magnetic-text block font-serif italic text-4xl sm:text-5xl lg:text-6xl text-[#555] leading-[1.05] inline-block text-3d-shadow"
                style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect()
                  const centerX = rect.left + rect.width / 2
                  const centerY = rect.top + rect.height / 2
                  setMousePos({ x: (e.clientX - centerX) * 0.15, y: (e.clientY - centerY) * 0.15 })
                }}
                onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
              >
                Purity in Every Form
              </span>
            </h1>

            <p className="hero-subtitle text-[#444] text-lg max-w-md leading-relaxed mb-10">
              Eight precision-crafted vitreous china basins — from classic full pedestals to sleek wall-hung designs — built for UAE homes, hotels, and commercial spaces.
            </p>

            <div className="hero-cta flex items-center gap-4">
              <a
                href="#products"
                className="magnetic-btn group flex items-center gap-3 bg-[#1a1a1a] text-white px-7 py-3.5 rounded-full text-sm font-medium transition-all duration-300"
                style={{}}
                onMouseEnter={e => e.currentTarget.style.background = ACCENT}
                onMouseLeave={e => e.currentTarget.style.background = '#1a1a1a'}
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
            <div className="relative w-[520px] h-80 lg:w-[620px] lg:h-96 bg-white rounded-3xl shadow-xl border border-black/5 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1620626011761-996317702782?w=900&q=80"
                alt="Wash basin hero"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent" />
            </div>
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full border border-teal-400/20" />
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

/* ─── PRODUCT SHOWCASE ─── */
function ProductShowcase() {
  const sectionRef = useRef(null)
  const headerLine1Ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.product-card',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger: '.product-grid', start: 'top 85%' } }
      )
      if (headerLine1Ref.current) {
        gsap.to(headerLine1Ref.current, { y: -15, duration: 2, ease: 'sine.inOut', yoyo: true, repeat: -1 })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="products" ref={sectionRef} className="relative py-24 lg:py-32 bg-[#F9F6F0]">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
        {/* Header */}
        <div className="mb-16">
          <p className="text-[11px] tracking-[0.3em] uppercase font-medium mb-3" style={{ color: ACCENT }}>The Collection</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#1a1a1a] font-light leading-[1.1] mb-4 text-3d-shadow">
            <span ref={headerLine1Ref} className="block font-major tracking-[0.02em]">Eight Models.</span>
            <span className="magnetic-text block font-serif italic text-[#555]">Every Space Covered.</span>
          </h2>
          <p className="text-[#666] text-base max-w-lg leading-relaxed">
            From compact wall-hung units to generous counter-tops — Standard Group's wash basin range delivers vitreous china craftsmanship for every UAE bathroom.
          </p>
        </div>

        {/* Product Grid */}
        <div className="product-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {products.map((product) => (
            <div key={product.id} className="product-card group relative h-[380px] cursor-pointer perspective-1000">
              <div className="relative w-full h-full transition-transform duration-500 transform-style-preserve-3d group-hover:rotate-y-180">
                {/* Front Side */}
                <div className="absolute inset-0 bg-white border border-black/[0.04] rounded-2xl overflow-hidden backface-hidden shadow-lg shadow-black/10">
                  <div className="relative h-48 flex items-center justify-center bg-gradient-to-b from-[#fafafa] to-white overflow-hidden">
                    {/* Placeholder icon — replace with real images when available */}
                    <div className="flex flex-col items-center gap-2 opacity-20">
                      <Droplets size={64} className="text-[#334155]" strokeWidth={1} />
                    </div>
                    <div className="absolute top-3 left-3 px-2.5 py-1 bg-white rounded-full border border-black/5 shadow-sm">
                      <span className="text-[#1a1a1a] text-[10px] font-semibold">{product.type}</span>
                    </div>
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-white text-[10px] font-semibold" style={{ background: ACCENT }}>
                      {product.size}
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-poppins text-[#1a1a1a] text-base tracking-[0.02em]">{product.name}</h3>
                      <ArrowUpRight size={13} className="text-[#ccc] transition-colors duration-300" style={{}} />
                    </div>
                    <p className="text-[#888] text-xs leading-relaxed mb-3">{product.description}</p>
                    <div className="flex items-center justify-between pt-3 border-t border-black/5">
                      <span className="font-poppins text-sm tracking-[0.02em]" style={{ color: ACCENT }}>{product.price}</span>
                      <span className="text-[#bbb] text-[9px] uppercase tracking-wider">{product.type}</span>
                    </div>
                  </div>
                </div>

                {/* Back Side */}
                <div
                  className="absolute inset-0 rounded-2xl overflow-hidden backface-hidden rotate-y-180 p-6 flex flex-col items-center justify-center text-white"
                  style={{ background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DARK})` }}
                >
                  <h3 className="font-poppins text-lg font-medium mb-6 text-center">{product.name}</h3>
                  <div className="grid grid-cols-2 gap-4 w-full">
                    <div className="flex flex-col items-center gap-2 p-3 bg-white/10 rounded-xl">
                      <Shield size={22} className="text-white" />
                      <span className="text-[10px] uppercase tracking-wider text-center">Anti-Stain Glaze</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 p-3 bg-white/10 rounded-xl">
                      <Layers size={22} className="text-white" />
                      <span className="text-[10px] uppercase tracking-wider text-center">Vitreous China</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 p-3 bg-white/10 rounded-xl">
                      <Droplets size={22} className="text-white" />
                      <span className="text-[10px] uppercase tracking-wider text-center">Overflow Built-In</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 p-3 bg-white/10 rounded-xl">
                      <CheckCircle2 size={22} className="text-white" />
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

/* ─── SPECS SECTION ─── */
function SpecsSection() {
  const sectionRef = useRef(null)
  const headerLine1Ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.spec-item',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: '.specs-grid', start: 'top 85%' } }
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
              <span ref={headerLine1Ref} className="block font-major tracking-[0.02em]">Crafted</span>
              <span className="magnetic-text block font-serif italic text-[#94a3b8]">to Perfection.</span>
            </h2>
            <p className="text-[#94a3b8] text-base leading-relaxed mb-10 max-w-md">
              Each wash basin is high-fired at 1200 °C, producing dense vitreous china that resists chips, cracks, and stains — setting the benchmark for UAE sanitary ware.
            </p>
            <div className="specs-grid grid grid-cols-1 sm:grid-cols-2 gap-4">
              {specs.map((spec) => (
                <div
                  key={spec.label}
                  className="spec-item p-5 bg-[#334155] rounded-xl border border-white/10 shadow-lg shadow-black/20 transition-all duration-300"
                  style={{ cursor: 'default' }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = `${ACCENT}4d`
                    e.currentTarget.style.boxShadow = `0 20px 40px ${ACCENT}33`
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
              <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${ACCENT}1a, transparent)` }} />
              <img
                src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80"
                alt="Wash basin engineering"
                className="relative w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── FEATURES SECTION ─── */
function FeaturesSection() {
  const sectionRef = useRef(null)
  const headerLine1Ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.feature-card',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger: '.features-grid', start: 'top 85%' } }
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
            <span ref={headerLine1Ref} className="block font-major tracking-[0.02em]">Why Our Basins</span>
            <span className="magnetic-text block font-serif italic text-[#555]">Stand Apart</span>
          </h2>
        </div>

        <div className="features-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, idx) => (
            <div key={idx} className="feature-card p-7 bg-[#F9F6F0] rounded-2xl border border-black/[0.03] shadow-lg shadow-black/10 hover:shadow-xl transition-shadow duration-300 group">
              <div className="mb-4">
                <feature.icon size={28} style={{ color: ACCENT }} strokeWidth={1.5} />
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

/* ─── COMPARISON TABLE ─── */
function ComparisonSection() {
  const sectionRef = useRef(null)
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
            <span className="magnetic-text block font-serif italic text-[#94a3b8]">Perfect Basin.</span>
          </h2>
        </div>

        <div className="overflow-x-auto bg-[#334155] rounded-2xl border border-white/10 shadow-lg shadow-black/20">
          <table className="w-full min-w-[720px]">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left text-[#94a3b8] text-[10px] tracking-[0.15em] uppercase py-4 px-5">Model</th>
                <th className="text-left text-[#94a3b8] text-[10px] tracking-[0.15em] uppercase py-4 px-5">Type</th>
                <th className="text-left text-[#94a3b8] text-[10px] tracking-[0.15em] uppercase py-4 px-5">Dimensions</th>
                <th className="text-left text-[#94a3b8] text-[10px] tracking-[0.15em] uppercase py-4 px-5">Bowl Depth</th>
                <th className="text-left text-[#94a3b8] text-[10px] tracking-[0.15em] uppercase py-4 px-5">Tap Holes</th>
                <th className="text-left text-[#94a3b8] text-[10px] tracking-[0.15em] uppercase py-4 px-5">Suitable For</th>
              </tr>
            </thead>
            <tbody>
              {comparisons.map((row, idx) => (
                <tr key={idx} className="border-b border-white/[0.03] hover:bg-[#1e293b]/50 transition-colors">
                  <td className="py-4 px-5 text-white text-sm font-medium">{row.model}</td>
                  <td className="py-4 px-5 text-[#94a3b8] text-sm">{row.type}</td>
                  <td className="py-4 px-5 text-[#94a3b8] text-sm">{row.size}</td>
                  <td className="py-4 px-5 text-sm font-medium" style={{ color: ACCENT_LIGHT }}>{row.depth}</td>
                  <td className="py-4 px-5 text-[#94a3b8] text-sm">{row.tapHoles}</td>
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

/* ─── WHY STANDARD GROUP ─── */
function WhyStandardGroup() {
  const sectionRef = useRef(null)
  const headerLine1Ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.why-card',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: '.why-grid', start: 'top 85%' } }
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
          <p className="text-[#666] text-base mt-3 max-w-md mx-auto">Your trusted partner for premium sanitary ware in the UAE</p>
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

/* ─── CTA SECTION ─── */
function CTASection() {
  const sectionRef = useRef(null)
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
          <span ref={headerLine1Ref} className="block font-major tracking-[0.02em]">Ready to Specify?</span>
          <span className="magnetic-text block font-serif italic text-[#94a3b8]">Premium Quality Awaits</span>
        </h2>
        <p className="text-[#94a3b8] text-base max-w-lg mx-auto leading-relaxed mb-10">
          Contact Standard Group today for competitive pricing, bulk orders, and expert advice on the perfect wash basin for your project.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="mailto:sales@standardgroup.ae"
            className="magnetic-btn group flex items-center gap-3 text-white px-8 py-4 rounded-full text-sm font-medium transition-all duration-300 shadow-lg"
            style={{ background: ACCENT, boxShadow: `0 15px 35px ${ACCENT}33` }}
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

/* ─── FOOTER ─── */

/* ─── MAIN PAGE COMPONENT ─── */
export default function WashBasins() {
  return (
    <div className="bg-[#F9F6F0] min-h-screen selection:bg-teal-600/20 selection:text-[#1a1a1a]">
      {/* Navigation */}

      {/* Sections */}
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
