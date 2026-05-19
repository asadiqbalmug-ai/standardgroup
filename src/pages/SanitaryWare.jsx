import React, { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, ArrowUpRight, ArrowLeft, Shield, Sparkles, Layers, CheckCircle2, ChevronDown, Droplets, Ruler, Wind, Settings, Star, Package } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/* ─── ACCENT: Deep Chrome Blue — premium, bathroom, metallic ─── */
const ACCENT       = '#1d4ed8'
const ACCENT_DARK  = '#1e3a8a'
const ACCENT_LIGHT = '#60a5fa'

/* ─── BRAND LOGOS (text-based, matching image) ─── */
const brands = [
  { name: 'Milano',           sub: 'Italian Elegance. Global Presence.' },
  { name: 'Kludi Rak',        sub: 'German Engineering' },
  { name: 'Italian Standards',sub: 'Premium Italian Design' },
  { name: 'Grohe',            sub: 'Pure Freude an Wasser' },
  { name: 'Jaquar',           sub: 'World of Wellness' },
]

/* ─── PRODUCT CATEGORIES ─── */
const products = [
  {
    id: 1,
    name: 'Overhead Shower Systems',
    type: 'Shower Columns & Thermostats',
    range: 'Full Range',
    features: ['Thermostatic Control', 'Rain & Handheld', 'Anti-Calc Nozzles'],
    price: 'From AED 380',
    description: 'Complete overhead shower columns with thermostatic mixers, rainfall heads, and slide-bar handsets. Available in chrome, brushed nickel, and matte black.',
    image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=700&q=80',
  },
  {
    id: 2,
    name: 'Basin Mixers',
    type: 'Single-Lever & Thermostatic',
    range: 'Multiple Brands',
    features: ['Single Lever', 'Ceramic Cartridge', 'Water-Save Aerator'],
    price: 'From AED 120',
    description: 'Basin mixer taps in slim, tall, and wall-mounted profiles. Ceramic disc cartridges for drip-free performance and water-save aerators as standard.',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=700&q=80',
  },
  {
    id: 3,
    name: 'Bath & Shower Mixers',
    type: 'Bath Fillers & Combo Sets',
    range: 'Chrome & Matte Black',
    features: ['Diverter Valve', 'Wall Mounted', 'Long-Reach Spout'],
    price: 'From AED 220',
    description: 'Bath-shower combination mixers with built-in diverter. Pairs a relaxing fill spout with a flexible handheld showerhead for complete versatility.',
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=700&q=80',
  },
  {
    id: 4,
    name: 'Freestanding Bathtubs',
    type: 'Acrylic & Stone Resin',
    range: 'Designer Collection',
    features: ['Stone Resin Shell', 'Double-Ended', 'Overflow Waste'],
    price: 'From AED 2,800',
    description: 'Sculptural freestanding bathtubs in stone-resin and high-gloss acrylic. Oval and rectangular profiles, white or matte finishes, for the ultimate bathroom centrepiece.',
    image: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=700&q=80',
  },
  {
    id: 5,
    name: 'Bathroom Vanity Units',
    type: 'Floating & Floor-Standing',
    range: 'Custom Sizes',
    features: ['Soft-Close Drawers', 'Countertop Basin', 'LED Under-Light'],
    price: 'From AED 950',
    description: 'Wall-hung and floor-standing vanity units with integrated or countertop basins. Soft-close drawers, push-to-open storage, and optional LED toe-kick lighting.',
    image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=700&q=80',
  },
  {
    id: 6,
    name: 'LED Bathroom Mirrors',
    type: 'Illuminated & Demister',
    range: 'Round & Rectangle',
    features: ['Front-Lit LED', 'Anti-Fog Demister', 'Touch Sensor Dimmer'],
    price: 'From AED 350',
    description: 'Front-illuminated LED mirrors with built-in anti-fog demister pads and touch sensor dimmer. Available in round and rectangular formats, multiple sizes.',
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=700&q=80',
  },
  {
    id: 7,
    name: 'Bathroom Accessories',
    type: 'Sets & Individual Pieces',
    range: 'Chrome & Matte Black',
    features: ['Towel Rails', 'Toilet Roll Holders', 'Robe Hooks & Shelves'],
    price: 'From AED 35',
    description: 'Coordinated bathroom accessory sets: towel rails, robe hooks, soap dispensers, toilet roll holders, and glass shelves. Match any tap finish.',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=700&q=80',
  },
  {
    id: 8,
    name: 'Counter-Top Basins',
    type: 'Vessel & Inset Basins',
    range: 'White, Black & Bespoke',
    features: ['Vitreous China', 'Round & Square', 'Overflow Included'],
    price: 'From AED 180',
    description: 'Designer vessel and semi-recessed basins in white and matte black vitreous china. Round, square, and organically shaped profiles for statement vanity tops.',
    image: 'https://images.unsplash.com/photo-1620626011761-996317702782?w=700&q=80',
  },
  {
    id: 9,
    name: 'Shower Enclosures',
    type: 'Frameless & Semi-Frame',
    range: 'Custom Fit',
    features: ['8 mm Tempered Glass', 'Easy-Clean Nano Coat', 'Soft-Close Door'],
    price: 'From AED 1,200',
    description: '8 mm tempered glass shower enclosures with nano easy-clean coating. Frameless sliding, pivot, and bi-fold doors to suit any bathroom layout.',
    image: 'https://images.unsplash.com/photo-1564540586988-aa4e53c3d799?w=700&q=80',
  },
]

const specs = [
  { icon: Shield,       label: 'Brands Stocked',    value: 'Milano · Grohe · Jaquar · Kludi Rak · Italian Standards' },
  { icon: Layers,       label: 'Product Categories', value: '9 Core Categories' },
  { icon: CheckCircle2, label: 'Certifications',     value: 'WRAS · CE · ISO 9001' },
  { icon: Ruler,        label: 'Finishes Available', value: 'Chrome · Matte Black · Brushed Nickel' },
]

const features = [
  {
    title: 'World-Class Brands',
    desc: 'Grohe German engineering, Milano Italian elegance, Jaquar wellness, Kludi Rak precision, and Italian Standards — all under one roof.',
    icon: Star,
  },
  {
    title: 'Complete Bathroom Solutions',
    desc: 'From shower columns to vanity mirrors — every element to complete a luxury bathroom is available through Standard Group.',
    icon: Package,
  },
  {
    title: 'Thermostatic Precision',
    desc: 'Thermostatic shower and bath mixers lock temperature to ±1 °C, eliminating scalding risk and delivering consistent comfort.',
    icon: Settings,
  },
  {
    title: 'Water-Saving Technology',
    desc: 'All taps and shower heads incorporate flow regulators and aerators that reduce water use by up to 40% without loss of feel.',
    icon: Droplets,
  },
  {
    title: 'Anti-Scale & Easy Clean',
    desc: 'Nano-coated shower heads with anti-calc silicone nozzles and chrome-plated brass bodies resist limescale and wipe clean instantly.',
    icon: Sparkles,
  },
  {
    title: 'UAE After-Sales Support',
    desc: 'Dedicated UAE-based technical support, spare parts availability, and installation guidance across all five emirates.',
    icon: Shield,
  },
]

const comparisons = [
  { category: 'Shower Systems',     brands: 'Milano · Grohe · Jaquar',    finish: 'Chrome / Matte Black',   price: 'From AED 380',   use: 'Residential & Hotel' },
  { category: 'Basin Mixers',       brands: 'Kludi Rak · Italian Std.',   finish: 'Chrome / Brushed Nickel', price: 'From AED 120',   use: 'All Bathrooms' },
  { category: 'Bath Mixers',        brands: 'Grohe · Milano',             finish: 'Chrome / Matte Black',   price: 'From AED 220',   use: 'Master Bath' },
  { category: 'Freestanding Tubs',  brands: 'Italian Standards',          finish: 'White / Matte',          price: 'From AED 2,800', use: 'Luxury / Spa' },
  { category: 'Vanity Units',       brands: 'Multiple',                   finish: 'White Oak / Grey',       price: 'From AED 950',   use: 'All Bathrooms' },
  { category: 'LED Mirrors',        brands: 'Multiple',                   finish: 'Silver Frame',           price: 'From AED 350',   use: 'All Bathrooms' },
  { category: 'Accessories',        brands: 'Kludi Rak · Italian Std.',   finish: 'Chrome / Matte Black',   price: 'From AED 35',    use: 'All Bathrooms' },
  { category: 'Counter-Top Basins', brands: 'Milano · Jaquar',            finish: 'White / Matte Black',    price: 'From AED 180',   use: 'Vanity Tops' },
  { category: 'Shower Enclosures',  brands: 'Multiple',                   finish: 'Chrome / Matte Black',   price: 'From AED 1,200', use: 'Wet Rooms' },
]

const reasons = [
  { title: 'Top 5 Brands',     desc: 'Milano, Grohe, Jaquar, Kludi Rak & Italian Standards — world leaders available in UAE.',  num: '5',    unit: 'Premium Brands' },
  { title: 'Complete Range',   desc: '9 product categories covering every fixture in a luxury bathroom specification.',          num: '9+',   unit: 'Categories' },
  { title: 'UAE Experts',      desc: 'Over 20 years supplying premium sanitary ware to UAE homes, hotels, and developments.',  num: '20+',  unit: 'Years' },
  { title: 'We Set Standards', desc: 'Certified products, expert advice, and full after-sales support across the UAE.',         num: '100%', unit: 'Quality' },
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
          src="https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1920&q=80"
          alt="Premium sanitary ware showroom"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#F9F6F0]/85" />
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-8 lg:px-16 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <div>
            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 bg-white/70 rounded-full border border-black/5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: ACCENT }} />
              <span className="text-[#555] text-[10px] tracking-[0.2em] uppercase font-medium">Standard Group — Category 06</span>
            </div>

            <h1 className="mb-6">
              <span
                ref={line1Ref}
                className="hero-title-line block font-major text-3xl sm:text-4xl lg:text-5xl text-[#1a1a1a] leading-[1.1] tracking-[0.02em] mb-2 inline-block text-3d-shadow"
              >
                Sanitary Ware
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
                The Complete Bathroom
              </span>
            </h1>

            <p className="hero-subtitle text-[#444] text-lg max-w-md leading-relaxed mb-10">
              World-class brands — Milano, Grohe, Jaquar, Kludi Rak & Italian Standards — covering every fixture from shower columns to vanity mirrors, for UAE homes and hotels.
            </p>

            <div className="hero-cta flex items-center gap-4">
              <a
                href="#products"
                className="magnetic-btn group flex items-center gap-3 bg-[#1a1a1a] text-white px-7 py-3.5 rounded-full text-sm font-medium transition-all duration-300"
                onMouseEnter={e => { e.currentTarget.style.background = ACCENT }}
                onMouseLeave={e => { e.currentTarget.style.background = '#1a1a1a' }}
              >
                Explore Range
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
                src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=900&q=80"
                alt="Luxury bathroom"
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
    <section id="brands" className="py-14 bg-white border-b border-black/5">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
        <p className="text-center text-[#999] text-[10px] tracking-[0.3em] uppercase mb-8">Our Premium Partners</p>
        <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16">
          {brands.map((brand) => (
            <div key={brand.name} className="flex flex-col items-center gap-1 group cursor-default">
              <span
                className="font-major text-xl lg:text-2xl text-[#1a1a1a] tracking-[0.02em] group-hover:transition-colors duration-300"
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
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.07, ease: 'power3.out',
          scrollTrigger: { trigger: '.product-grid', start: 'top 85%' } }
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

        <div className="mb-16">
          <p className="text-[11px] tracking-[0.3em] uppercase font-medium mb-3" style={{ color: ACCENT }}>The Range</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#1a1a1a] font-light leading-[1.1] mb-4 text-3d-shadow">
            <span ref={headerLine1Ref} className="block font-major tracking-[0.02em]">Nine Categories.</span>
            <span className="magnetic-text block font-serif italic text-[#555]">One Complete Bathroom.</span>
          </h2>
          <p className="text-[#666] text-base max-w-lg leading-relaxed">
            Every fixture, fitting, and accessory needed to design and complete a world-class bathroom — from the shower column above your head to the accessory rail on your wall.
          </p>
        </div>

        <div className="product-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map((product) => (
            <div key={product.id} className="product-card group relative h-[420px] cursor-pointer perspective-1000">
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
                      {product.range}
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-poppins text-[#1a1a1a] text-base tracking-[0.02em]">{product.name}</h3>
                      <ArrowUpRight size={13} className="text-[#ccc] transition-colors duration-300" />
                    </div>
                    <p className="text-[#888] text-xs leading-relaxed mb-3">{product.description}</p>
                    <div className="flex items-center justify-between pt-3 border-t border-black/5">
                      <span className="font-poppins text-sm tracking-[0.02em]" style={{ color: ACCENT }}>{product.price}</span>
                      <span className="text-[#bbb] text-[9px] uppercase tracking-wider">Sanitary Ware</span>
                    </div>
                  </div>
                </div>

                {/* Back */}
                <div
                  className="absolute inset-0 rounded-2xl overflow-hidden backface-hidden rotate-y-180 p-6 flex flex-col items-center justify-center text-white"
                  style={{ background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DARK})` }}
                >
                  <h3 className="font-poppins text-lg font-medium mb-2 text-center">{product.name}</h3>
                  <p className="text-white/70 text-[11px] mb-6 text-center tracking-wider uppercase">{product.type}</p>
                  <div className="grid grid-cols-2 gap-3 w-full">
                    {[
                      { icon: Star,         label: 'Premium Brand' },
                      { icon: Shield,       label: 'WRAS Certified' },
                      { icon: Droplets,     label: 'Water Saving' },
                      { icon: CheckCircle2, label: 'UAE Stocked' },
                    ].map(({ icon: Icon, label }) => (
                      <div key={label} className="flex flex-col items-center gap-2 p-3 bg-white/10 rounded-xl">
                        <Icon size={20} className="text-white" />
                        <span className="text-[10px] uppercase tracking-wider text-center">{label}</span>
                      </div>
                    ))}
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
            <p className="text-[11px] tracking-[0.3em] uppercase font-medium mb-3" style={{ color: ACCENT_LIGHT }}>Technical Excellence</p>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl text-white font-light leading-[1.1] mb-6"
              style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.3), 2px 2px 0 rgba(0,0,0,0.2), 3px 3px 0 rgba(0,0,0,0.1), 4px 4px 8px rgba(0,0,0,0.4)' }}
            >
              <span ref={headerLine1Ref} className="block font-major tracking-[0.02em]">World Standards</span>
              <span className="magnetic-text block font-serif italic text-[#94a3b8]">In Every Detail.</span>
            </h2>
            <p className="text-[#94a3b8] text-base leading-relaxed mb-10 max-w-md">
              Every product in our sanitary ware catalogue meets WRAS, CE, and ISO 9001 certification. From German-engineered Grohe cartridges to Italian-fired Milano ceramics — quality is non-negotiable.
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
                src="https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=800&q=80"
                alt="Luxury bathroom"
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
            <span ref={headerLine1Ref} className="block font-major tracking-[0.02em]">Why Our Sanitary Ware</span>
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
            <span className="magnetic-text block font-serif italic text-[#94a3b8]">Perfect Bathroom.</span>
          </h2>
        </div>

        <div className="overflow-x-auto bg-[#334155] rounded-2xl border border-white/10 shadow-lg shadow-black/20">
          <table className="w-full min-w-[820px]">
            <thead>
              <tr className="border-b border-white/10">
                {['Category', 'Brands', 'Finishes', 'Starting Price', 'Suitable For'].map(h => (
                  <th key={h} className="text-left text-[#94a3b8] text-[10px] tracking-[0.15em] uppercase py-4 px-5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisons.map((row, idx) => (
                <tr key={idx} className="border-b border-white/[0.03] hover:bg-[#1e293b]/50 transition-colors">
                  <td className="py-4 px-5 text-white text-sm font-medium">{row.category}</td>
                  <td className="py-4 px-5 text-[#94a3b8] text-sm">{row.brands}</td>
                  <td className="py-4 px-5 text-[#94a3b8] text-sm">{row.finish}</td>
                  <td className="py-4 px-5 text-sm font-medium" style={{ color: ACCENT_LIGHT }}>{row.price}</td>
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
            Your trusted partner for world-class sanitary ware in the UAE
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
          <span ref={headerLine1Ref} className="block font-major tracking-[0.02em]">Design Your Bathroom.</span>
          <span className="magnetic-text block font-serif italic text-[#94a3b8]">We'll Specify It</span>
        </h2>
        <p className="text-[#94a3b8] text-base max-w-lg mx-auto leading-relaxed mb-10">
          Contact Standard Group today for expert specification advice, showroom visits, competitive pricing, and bulk supply for UAE residential, hotel, and commercial projects.
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
export default function SanitaryWare() {
  return (
    <div className="bg-[#F9F6F0] min-h-screen selection:bg-blue-700/20 selection:text-[#1a1a1a]">
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
