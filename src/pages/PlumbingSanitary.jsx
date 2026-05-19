import React, { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, ArrowUpRight, ArrowLeft, Shield, Layers, Ruler, CheckCircle2, ChevronDown, Droplets, Zap, Settings, Package, Gauge, Wind } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/* ─── ACCENT: Deep Ocean Blue — pumps, water, sanitary engineering ─── */
const ACCENT       = '#0369a1'
const ACCENT_DARK  = '#0c4a6e'
const ACCENT_LIGHT = '#38bdf8'

/* ─── BRANDS ─── */
const brands = [
  { name: 'Davey',    sub: 'Water Pumps & Systems' },
  { name: 'Prakash',  sub: 'Plumbing Fittings Specialist' },
  { name: 'Buraq',    sub: 'Pump & Sanitary Supplies' },
  { name: 'Calpeda',  sub: 'Italian Pump Engineering' },
]

/* ─── PIPE CLIPS & FITTINGS ─── */
const fittings = [
  {
    id: 1,
    name: 'Pipe Clips — Saddle & P-Clips',
    brand: 'Prakash',
    category: 'Pipe Clips & Fittings',
    type: 'GI & Stainless Steel Pipe Clips',
    size: '½" – 4" (15–110mm)',
    features: ['GI & SS316 Options', 'Saddle & P-Clip', 'Wall & Ceiling Mount'],
    price: 'From AED 1.20 / pc',
    description: 'Galvanised iron and stainless steel 316 pipe clips — saddle clips, P-clips, and two-piece pipe clamps for securing water, drainage, and gas pipes to walls and ceilings across UAE sites.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=80',
  },
  {
    id: 2,
    name: 'SS Pipe Fittings — Elbows & Tees',
    brand: 'Prakash',
    category: 'Pipe Clips & Fittings',
    type: 'Stainless Steel Press & Threaded Fittings',
    size: '½" – 4"',
    features: ['SS304 & SS316', 'Elbow / Tee / Coupler', 'Threaded & Press'],
    price: 'From AED 8 / pc',
    description: 'Stainless steel 304 and 316 elbows, tees, reducers, and couplings in threaded and press-fit ends. Corrosion-free for potable water, chilled water, and sanitary drainage in UAE buildings.',
    image: 'https://images.unsplash.com/photo-1609174156745-3c2d1c978543?w=700&q=80',
  },
  {
    id: 3,
    name: 'PVC & uPVC Drainage Fittings',
    brand: 'Prakash',
    category: 'Pipe Clips & Fittings',
    type: 'uPVC Push-Fit & Solvent Weld',
    size: '40mm – 160mm',
    features: ['Push-Fit & Solvent Weld', 'Grey Drainage Grade', 'BS EN 1401'],
    price: 'From AED 3.50 / pc',
    description: 'Grey uPVC drainage fittings — elbows, junctions, reducers, traps, and access fittings in push-fit and solvent weld. BS EN 1401 certified for soil, waste, and rainwater drainage.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80',
  },
]

/* ─── PUMPS ─── */
const pumps = [
  {
    id: 4,
    name: 'Davey Water Pump',
    brand: 'Davey',
    category: 'Water Pump',
    type: 'Centrifugal Surface Pump',
    size: '0.37 – 2.2 kW',
    features: ['Self-Priming', 'Cast Iron / SS', 'Single Phase'],
    price: 'From AED 380',
    description: 'Davey centrifugal surface pumps for domestic water supply, irrigation, and pressure boosting. Self-priming, cast iron body, single-phase and three-phase options from 0.37kW to 2.2kW.',
    image: 'https://images.unsplash.com/photo-1590736704728-f4730bb30770?w=700&q=80',
  },
  {
    id: 5,
    name: 'Calpeda Centrifugal Pump',
    brand: 'Calpeda',
    category: 'Water Pump',
    type: 'End-Suction Centrifugal Pump',
    size: '0.55 – 15 kW',
    features: ['Italian Engineering', 'IE3 Motor', 'HVAC & Water Supply'],
    price: 'From AED 850',
    description: 'Calpeda Italian-engineered end-suction centrifugal pumps for HVAC, building water supply, and industrial circulation. IE3 premium-efficiency motors, stainless impeller, full range of flow rates.',
    image: 'https://images.unsplash.com/photo-1590736704728-f4730bb30770?w=700&q=80',
  },
  {
    id: 6,
    name: 'Sewage & Submersible Pump',
    brand: 'Buraq',
    category: 'Sewage Pump',
    type: 'Submersible Sewage Pump',
    size: '0.75 – 7.5 kW',
    features: ['Submersible Motor', 'Sewage & Drainage', 'Vortex Impeller'],
    price: 'From AED 620',
    description: 'Heavy-duty submersible sewage and drainage pumps with vortex impeller for solids handling. For basement sumps, sewage lift stations, and stormwater drainage in UAE buildings and infrastructure.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80',
  },
  {
    id: 7,
    name: 'Booster Pump Set',
    brand: 'Davey',
    category: 'Booster Pump',
    type: 'Twin-Pump Pressure Booster Set',
    size: '2 × 1.1 kW',
    features: ['Twin Pumps', 'Pressure Vessel', 'Variable Speed Option'],
    price: 'From AED 3,200',
    description: 'Davey twin-pump pressure booster set with pressure vessel, pressure switches, and manifold. Delivers consistent water pressure to high-rise UAE residential and commercial buildings.',
    image: 'https://images.unsplash.com/photo-1590736704728-f4730bb30770?w=700&q=80',
  },
  {
    id: 8,
    name: 'Transfer Pump',
    brand: 'Buraq',
    category: 'Transfer Pump',
    type: 'Peripheral & Monoblock Transfer Pump',
    size: '0.25 – 1.5 kW',
    features: ['Monoblock Design', 'Quiet Operation', 'Water Transfer'],
    price: 'From AED 210',
    description: 'Monoblock peripheral transfer pumps for water tank filling, garden irrigation, and general water transfer. Quiet, compact, and easy to install for domestic UAE applications.',
    image: 'https://images.unsplash.com/photo-1590736704728-f4730bb30770?w=700&q=80',
  },
  {
    id: 9,
    name: 'Float Switch',
    brand: 'Buraq',
    category: 'Pump Accessories',
    type: 'Mechanical Float Switch',
    size: '10A / 250V',
    features: ['Auto On/Off', 'Tank Level Control', 'Universal Fit'],
    price: 'From AED 22',
    description: 'Mechanical float switches for automatic pump on/off control in water tanks, sumps, and wet wells. 10A 250V rating, universal cable length, compatible with all pump brands and control panels.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=80',
  },
  {
    id: 10,
    name: 'Pressure Control Kit',
    brand: 'Davey',
    category: 'Pump Accessories',
    type: 'Electronic Pressure Controller',
    size: '1–10 bar',
    features: ['Dry-Run Protection', 'Auto Restart', 'Digital Display'],
    price: 'From AED 95',
    description: 'Electronic pressure control kit with dry-run protection, auto restart, and digital pressure display. Replaces conventional pressure switch and tank for compact UAE domestic pump installations.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=80',
  },
]

const allProducts = [...fittings, ...pumps]

const specs = [
  { icon: Zap,          label: 'Pump Power Range',    value: '0.25 kW – 15 kW' },
  { icon: Gauge,        label: 'Pressure Kit Range',  value: '1 – 10 Bar' },
  { icon: Layers,       label: 'Fitting Materials',   value: 'GI · SS304 · SS316 · uPVC' },
  { icon: CheckCircle2, label: 'Standards',           value: 'BS EN 1401 · ISO 9908 · CE' },
]

const features = [
  {
    title: 'Davey & Calpeda Water Pumps',
    desc: 'Davey self-priming centrifugal and Calpeda Italian end-suction pumps for water supply, irrigation, and HVAC circulation — single-phase to 15kW, IE3 motor efficiency.',
    icon: Droplets,
  },
  {
    title: 'Sewage & Submersible Pumps',
    desc: 'Buraq heavy-duty submersible sewage pumps with vortex impeller for solids handling — basement sumps, sewage lift stations, and stormwater drainage for UAE buildings.',
    icon: Wind,
  },
  {
    title: 'Twin-Pump Booster Sets',
    desc: 'Davey twin-pump pressure booster stations with pressure vessels, manifold, and controls for consistent water pressure in UAE high-rise residential and hotel buildings.',
    icon: Settings,
  },
  {
    title: 'Pipe Clips & SS Fittings',
    desc: 'GI and SS316 pipe clips, saddle clips, and P-clips plus SS304/316 elbows, tees, and couplings for corrosion-free pipe support and jointing on all UAE MEP projects.',
    icon: Layers,
  },
  {
    title: 'Float Switch & Pressure Kit',
    desc: 'Mechanical float switches for automatic tank level control and electronic pressure controller kits with dry-run protection and digital display — compact and reliable.',
    icon: Gauge,
  },
  {
    title: 'uPVC Drainage Fittings',
    desc: 'BS EN 1401 grey uPVC drainage fittings — push-fit and solvent weld elbows, junctions, traps, and access fittings for soil, waste, and rainwater drainage in UAE buildings.',
    icon: Shield,
  },
]

const comparisons = [
  { product: 'Pipe Clips',           brand: 'Prakash',  cat: 'Fittings',    size: '½"–4"',       std: '—',          use: 'Pipe Support' },
  { product: 'SS Fittings',          brand: 'Prakash',  cat: 'Fittings',    size: '½"–4"',       std: 'ISO 4144',   use: 'Water / Sanitary' },
  { product: 'uPVC Drainage',        brand: 'Prakash',  cat: 'Fittings',    size: '40–160mm',    std: 'BS EN 1401', use: 'Soil / Waste Drain' },
  { product: 'Davey Water Pump',     brand: 'Davey',    cat: 'Water Pump',  size: '0.37–2.2kW',  std: 'CE',         use: 'Water Supply / Irrigation' },
  { product: 'Calpeda Pump',         brand: 'Calpeda',  cat: 'Water Pump',  size: '0.55–15kW',   std: 'CE / IE3',   use: 'HVAC / Building Supply' },
  { product: 'Sewage Pump',          brand: 'Buraq',    cat: 'Sewage Pump', size: '0.75–7.5kW',  std: 'CE',         use: 'Basement / Lift Station' },
  { product: 'Booster Set',          brand: 'Davey',    cat: 'Booster',     size: '2×1.1kW',     std: 'CE',         use: 'High-Rise Pressure' },
  { product: 'Transfer Pump',        brand: 'Buraq',    cat: 'Transfer',    size: '0.25–1.5kW',  std: 'CE',         use: 'Tank Fill / Irrigation' },
  { product: 'Float Switch',         brand: 'Buraq',    cat: 'Accessory',   size: '10A / 250V',  std: '—',          use: 'Tank Level Control' },
  { product: 'Pressure Kit',         brand: 'Davey',    cat: 'Accessory',   size: '1–10 bar',    std: 'CE',         use: 'Domestic Pump Control' },
]

const reasons = [
  { title: '4 Trusted Brands',  desc: 'Davey, Prakash, Buraq & Calpeda — plumbing and pump brands trusted on UAE projects.',         num: '4',    unit: 'Brands' },
  { title: 'Full System',       desc: 'Pipe clips, SS fittings, uPVC drainage, pumps, booster sets, float switches & pressure kits.', num: '10+',  unit: 'Products' },
  { title: 'UAE Experts',       desc: '20+ years supplying plumbing and pump systems to UAE MEP contractors and buildings.',           num: '20+',  unit: 'Years' },
  { title: 'We Set Standards',  desc: 'CE, ISO 9908, BS EN 1401 certified products with full documentation and delivery.',            num: '100%', unit: 'Certified' },
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
        <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80" alt="Plumbing sanitary" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#F9F6F0]/85" />
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-8 lg:px-16 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 bg-white/70 rounded-full border border-black/5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: ACCENT }} />
              <span className="text-[#555] text-[10px] tracking-[0.2em] uppercase font-medium">Standard Group — Category 16</span>
            </div>

            <h1 className="mb-6">
              <span
                ref={line1Ref}
                className="hero-title-line block font-major text-3xl sm:text-4xl lg:text-5xl text-[#1a1a1a] leading-[1.1] tracking-[0.02em] mb-2 inline-block text-3d-shadow"
              >
                Plumbing & Sanitary
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
                Pipes. Pumps. Perfection.
              </span>
            </h1>

            <p className="hero-subtitle text-[#444] text-lg max-w-md leading-relaxed mb-10">
              Pipe clips, SS fittings, uPVC drainage — plus Davey, Calpeda, and Buraq water, sewage, booster, and transfer pumps with float switches and pressure control kits.
            </p>

            <div className="hero-cta flex items-center gap-4">
              <a
                href="#fittings"
                className="magnetic-btn group flex items-center gap-3 bg-[#1a1a1a] text-white px-7 py-3.5 rounded-full text-sm font-medium transition-all duration-300"
                onMouseEnter={e => { e.currentTarget.style.background = ACCENT }}
                onMouseLeave={e => { e.currentTarget.style.background = '#1a1a1a' }}
              >
                Explore Products
                <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a href="#brands" className="text-[#666] text-sm font-medium hover:text-[#1a1a1a] transition-colors">Our Brands</a>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="relative w-[520px] h-80 lg:w-[620px] lg:h-[420px] bg-white rounded-3xl shadow-xl border border-black/5 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1590736704728-f4730bb30770?w=900&q=80" alt="Water pump system" className="w-full h-full object-cover" />
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
        <div className="flex flex-wrap items-center justify-center gap-10 lg:gap-20">
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
   REUSABLE CARD
══════════════════════════════════════ */
function ProductCard({ product, className = '' }) {
  const brandColor = (brand) => {
    if (brand === 'Davey')   return '#0369a1'
    if (brand === 'Calpeda') return '#7c3aed'
    if (brand === 'Buraq')   return '#15803d'
    return '#374151'
  }

  return (
    <div className={`group relative h-[420px] cursor-pointer perspective-1000 ${className}`}>
      <div className="relative w-full h-full transition-transform duration-500 transform-style-preserve-3d group-hover:rotate-y-180">
        {/* Front */}
        <div className="absolute inset-0 bg-white border border-black/[0.04] rounded-2xl overflow-hidden backface-hidden shadow-lg shadow-black/10">
          <div className="relative h-48 overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-white text-[10px] font-semibold" style={{ background: brandColor(product.brand) }}>
              {product.brand}
            </div>
            <div className="absolute top-3 right-3 px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-full border border-black/5 shadow-sm">
              <span className="text-[#1a1a1a] text-[10px] font-semibold">{product.size}</span>
            </div>
          </div>
          <div className="p-5">
            <div className="flex items-center justify-between mb-1.5">
              <h3 className="font-poppins text-[#1a1a1a] text-sm font-medium leading-tight">{product.name}</h3>
              <ArrowUpRight size={13} className="text-[#ccc] flex-shrink-0 ml-1" />
            </div>
            <span className="inline-block px-2 py-0.5 rounded-full text-[9px] font-medium bg-sky-50 text-sky-700 mb-2">{product.category}</span>
            <p className="text-[#888] text-xs leading-relaxed mb-2.5 line-clamp-2">{product.description}</p>
            <div className="flex items-center justify-between pt-2.5 border-t border-black/5">
              <span className="font-poppins text-sm" style={{ color: ACCENT }}>{product.price}</span>
              <span className="text-[#bbb] text-[9px] uppercase tracking-wider">{product.type.split(' ')[0]}</span>
            </div>
          </div>
        </div>
        {/* Back */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden backface-hidden rotate-y-180 p-6 flex flex-col items-center justify-center text-white" style={{ background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DARK})` }}>
          <div className="px-3 py-1 rounded-full text-white text-[10px] font-semibold mb-3" style={{ background: brandColor(product.brand) }}>
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
              <span className="text-[9px] uppercase tracking-wider text-center">CE / BS Cert.</span>
            </div>
          </div>
          <div className="mt-5 text-center"><span className="text-xl font-poppins font-light">{product.price}</span></div>
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════
   FITTINGS SECTION
══════════════════════════════════════ */
function FittingsSection() {
  const sectionRef     = useRef(null)
  const headerLine1Ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.fit-card',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '#fittings', start: 'top 85%' } }
      )
      if (headerLine1Ref.current) {
        gsap.to(headerLine1Ref.current, { y: -15, duration: 2, ease: 'sine.inOut', yoyo: true, repeat: -1 })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="fittings" ref={sectionRef} className="relative py-24 lg:py-32 bg-[#F9F6F0]">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
        <div className="mb-14">
          <p className="text-[11px] tracking-[0.3em] uppercase font-medium mb-3" style={{ color: ACCENT }}>Pipe Clips & Fittings</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#1a1a1a] font-light leading-[1.1] mb-4 text-3d-shadow">
            <span ref={headerLine1Ref} className="block font-major tracking-[0.02em]">Clips. Fittings. Drainage.</span>
            <span className="magnetic-text block font-serif italic text-[#555]">Every Connection Secure.</span>
          </h2>
          <p className="text-[#666] text-base max-w-lg leading-relaxed">
            GI and SS316 pipe clips, stainless steel elbows and tees, and uPVC drainage fittings — everything to support and connect piping systems on UAE MEP and fit-out projects.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {fittings.map((p) => <ProductCard key={p.id} product={p} className="fit-card" />)}
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════
   PUMPS SECTION
══════════════════════════════════════ */
function PumpsSection() {
  const sectionRef     = useRef(null)
  const headerLine1Ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.pump-card',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.07, ease: 'power3.out',
          scrollTrigger: { trigger: '#pumps', start: 'top 85%' } }
      )
      if (headerLine1Ref.current) {
        gsap.to(headerLine1Ref.current, { y: -15, duration: 2, ease: 'sine.inOut', yoyo: true, repeat: -1 })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="pumps" ref={sectionRef} className="relative py-24 lg:py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
        <div className="mb-14">
          <p className="text-[11px] tracking-[0.3em] uppercase font-medium mb-3" style={{ color: ACCENT }}>Water / Sewage / Booster & Transfer Pumps</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#1a1a1a] font-light leading-[1.1] mb-4 text-3d-shadow">
            <span ref={headerLine1Ref} className="block font-major tracking-[0.02em]">Seven Pump Systems.</span>
            <span className="magnetic-text block font-serif italic text-[#555]">Every Application Covered.</span>
          </h2>
          <p className="text-[#666] text-base max-w-lg leading-relaxed">
            Davey, Calpeda, and Buraq — water pumps, sewage submersibles, twin-pump booster sets, transfer pumps, float switches, and pressure control kits for all UAE building applications.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {pumps.map((p) => <ProductCard key={p.id} product={p} className="pump-card" />)}
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
              <span ref={headerLine1Ref} className="block font-major tracking-[0.02em]">Engineered.</span>
              <span className="magnetic-text block font-serif italic text-[#94a3b8]">CE Certified. UAE Approved.</span>
            </h2>
            <p className="text-[#94a3b8] text-base leading-relaxed mb-10 max-w-md">
              All pump systems carry CE certification and meet ISO 9908 hydraulic performance standards. Pipe fittings comply with BS EN 1401 and ISO 4144. Full documentation for UAE municipality and authority submissions.
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
              <img src="https://images.unsplash.com/photo-1609174156745-3c2d1c978543?w=800&q=80" alt="Pump engineering" className="relative w-full h-full object-cover" />
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
            <span ref={headerLine1Ref} className="block font-major tracking-[0.02em]">Why Our Range</span>
            <span className="magnetic-text block font-serif italic text-[#555]">Stands Apart</span>
          </h2>
        </div>
        <div className="features-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, idx) => (
            <div key={idx} className="feature-card p-7 bg-[#F9F6F0] rounded-2xl border border-black/[0.03] shadow-lg shadow-black/10 hover:shadow-xl transition-shadow duration-300">
              <div className="mb-4"><feature.icon size={28} strokeWidth={1.5} style={{ color: ACCENT }} /></div>
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

  const brandBadge = (brand) => {
    if (brand === 'Davey')   return 'bg-blue-900/40 text-blue-300'
    if (brand === 'Calpeda') return 'bg-purple-900/40 text-purple-300'
    if (brand === 'Buraq')   return 'bg-green-900/40 text-green-300'
    return 'bg-slate-700/40 text-slate-300'
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
            <span className="magnetic-text block font-serif italic text-[#94a3b8]">Pump & Fittings System.</span>
          </h2>
        </div>
        <div className="overflow-x-auto bg-[#334155] rounded-2xl border border-white/10 shadow-lg shadow-black/20">
          <table className="w-full min-w-[820px]">
            <thead>
              <tr className="border-b border-white/10">
                {['Product', 'Brand', 'Category', 'Size / Power', 'Standard', 'Best Use'].map(h => (
                  <th key={h} className="text-left text-[#94a3b8] text-[10px] tracking-[0.15em] uppercase py-4 px-5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisons.map((row, idx) => (
                <tr key={idx} className="border-b border-white/[0.03] hover:bg-[#1e293b]/50 transition-colors">
                  <td className="py-4 px-5 text-white text-sm font-medium">{row.product}</td>
                  <td className="py-4 px-5">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${brandBadge(row.brand)}`}>{row.brand}</span>
                  </td>
                  <td className="py-4 px-5 text-[#94a3b8] text-sm">{row.cat}</td>
                  <td className="py-4 px-5 text-sm font-medium" style={{ color: ACCENT_LIGHT }}>{row.size}</td>
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
          <p className="text-[#666] text-base mt-3 max-w-md mx-auto">Your trusted plumbing and pump supply partner across the UAE</p>
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
          <span ref={headerLine1Ref} className="block font-major tracking-[0.02em]">Ready to Flow?</span>
          <span className="magnetic-text block font-serif italic text-[#94a3b8]">We Supply the System</span>
        </h2>
        <p className="text-[#94a3b8] text-base max-w-lg mx-auto leading-relaxed mb-10">
          Contact Standard Group for bulk pricing on Davey, Calpeda, and Buraq pumps, plus pipe clips, SS fittings, and uPVC drainage. UAE-wide delivery with full technical documentation.
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
export default function PlumbingSanitary() {
  return (
    <div className="bg-[#F9F6F0] min-h-screen selection:bg-sky-800/20 selection:text-[#1a1a1a]">

      <HeroSection />
      <BrandsStrip />
      <FittingsSection />
      <PumpsSection />
      <SpecsSection />
      <FeaturesSection />
      <ComparisonSection />
      <WhyStandardGroup />
      <CTASection />
    </div>
  )
}
