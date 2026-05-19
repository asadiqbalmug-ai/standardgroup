import React, { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, ArrowUpRight, ArrowLeft, Shield, Layers, Ruler, CheckCircle2, ChevronDown, Droplets, Zap, Settings, Package, Gauge, Wind, Wrench } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/* ─── ACCENT: Steel Blue — valves, plumbing hardware ─── */
const ACCENT       = '#0f4c81'
const ACCENT_DARK  = '#0a3259'
const ACCENT_LIGHT = '#60a5fa'

/* ─── PRODUCT DATA ─── */
const products = [
  {
    id: 1,
    name: 'Ball Valves & Gate Valves',
    brand: 'Hardware',
    category: 'Valve / Connector / Bibcock',
    type: 'Brass & SS Ball Valves',
    size: '¼" – 4"',
    features: ['Full Bore', 'Brass & SS316', 'PN40 Rated'],
    price: 'From AED 8 / pc',
    description: 'Brass and stainless steel full-bore ball valves, gate valves, and globe valves in ¼"–4" BSP thread. PN40 rated for cold and hot water, gas, and HVAC isolation on UAE building projects.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=80',
  },
  {
    id: 2,
    name: 'Connectors & Bibcocks',
    brand: 'Hardware',
    category: 'Valve / Connector / Bibcock',
    type: 'Brass Bibcocks & Hose Union Connectors',
    size: '½" – 1"',
    features: ['Brass Chrome Plated', 'Garden & Wall Tap', 'Hose Union'],
    price: 'From AED 12 / pc',
    description: 'Chrome-plated brass bibcocks for garden and outdoor wall applications, plus hose union connectors and male/female BSP threaded fittings for domestic and commercial plumbing.',
    image: 'https://images.unsplash.com/photo-1609174156745-3c2d1c978543?w=700&q=80',
  },
  {
    id: 3,
    name: 'PPR Welding Machine',
    brand: 'Tools',
    category: 'PPR Welding Machine / Cutter',
    type: 'Socket Fusion Welding Iron',
    size: '20–63mm / 800–1200W',
    features: ['800–1200W', 'Digital Temperature', 'Anti-Stick Coating'],
    price: 'From AED 85',
    description: 'Professional PPR socket fusion welding machine with anti-stick PTFE-coated dies in 20, 25, 32, 40, 50, and 63mm sizes. Digital temperature display, 800–1200W, for Wefatherm and all PPR pipe systems.',
    image: 'https://images.unsplash.com/photo-1590736704728-f4730bb30770?w=700&q=80',
  },
  {
    id: 4,
    name: 'PPR Pipe Cutter',
    brand: 'Tools',
    category: 'PPR Welding Machine / Cutter',
    type: 'Ratchet Pipe Cutter',
    size: 'Up to 42mm / 63mm',
    features: ['Ratchet Action', 'Clean Square Cut', 'Stainless Blade'],
    price: 'From AED 28',
    description: 'Ratchet-action PPR and plastic pipe cutters with stainless steel blades for clean, square cuts on PPR, PEX, and PE pipes up to 42mm and 63mm. Essential for all heat-fusion plumbing work.',
    image: 'https://images.unsplash.com/photo-1590736704728-f4730bb30770?w=700&q=80',
  },
  {
    id: 5,
    name: 'Clear & Reinforced Water Hose',
    brand: 'Hardware',
    category: 'Water Hose Pipe / Flexible Pipe',
    type: 'PVC Clear & Braided Garden Hose',
    size: '½" / ¾" / 1" — Per Metre',
    features: ['UV Stabilised', 'Kink Resistant', 'Garden & Industry'],
    price: 'From AED 4 / m',
    description: 'Clear PVC and braided reinforced garden hoses in ½", ¾", and 1" for domestic watering, site water supply, and industrial fluid transfer. UV-stabilised, kink-resistant, and lightweight.',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=700&q=80',
  },
  {
    id: 6,
    name: 'Red & Blue Welding Hose',
    brand: 'Hardware',
    category: 'Water Hose Pipe / Flexible Pipe',
    type: 'Twin Welding Gas Hose',
    size: '5mm / 6.3mm — Per Metre',
    features: ['BS EN 559', 'Red Fuel / Blue Oxygen', 'High Pressure'],
    price: 'From AED 6 / m',
    description: 'BS EN 559 twin welding hose — red (fuel/LPG) and blue (oxygen) — for gas welding, cutting, and heating sets. High-pressure rated, oil-resistant lining, fitted or unfitted ends.',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=700&q=80',
  },
  {
    id: 7,
    name: 'Flexible Braided Hose & Magic Pipe',
    brand: 'Hardware',
    category: 'Water Hose Pipe / Flexible Pipe',
    type: 'SS Braided Flexible Connector & Expanding Hose',
    size: '300mm – 1000mm',
    features: ['SS304 Braided', 'Push-On Connectors', 'Expanding Magic Pipe'],
    price: 'From AED 10',
    description: 'Stainless steel braided flexible tap connectors 300–1000mm for basin, kitchen, and bath fitting connections. Also includes expanding "magic" garden hose pipe in colour options.',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=700&q=80',
  },
  {
    id: 8,
    name: 'Waste Pipe & Bottle Trap',
    brand: 'Hardware',
    category: 'Wastepipe / Bottle Trap',
    type: 'uPVC Waste Pipe & Bottle Trap',
    size: '32mm / 40mm / 50mm',
    features: ['P-Trap & Bottle Trap', 'Chrome & White', 'Adjustable Outlet'],
    price: 'From AED 8 / pc',
    description: 'uPVC and chrome bottle traps, P-traps, and U-bends for basins, vanity units, and bath waste outlets. Adjustable deep-seal, push-fit connection, available in white and chrome finishes.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80',
  },
  {
    id: 9,
    name: 'Kitchen Sink & Waste Fitting',
    brand: 'Hardware',
    category: 'Kitchen Sink / Waste',
    type: 'Stainless Steel Single & Double Bowl Sink',
    size: '450×360 to 800×450mm',
    features: ['SS304 Brushed', 'Single & Double Bowl', 'Waste Kit Included'],
    price: 'From AED 120',
    description: 'Stainless steel 304 single and double-bowl kitchen sinks for UAE residential and commercial kitchens. Brushed finish, includes waste strainer, overflow, and 90mm waste outlet kit.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80',
  },
  {
    id: 10,
    name: 'Water Storage Tank',
    brand: 'Polycon',
    category: 'Water Tank',
    type: 'Vertical HDPE Water Tank',
    size: '500L – 10,000L',
    features: ['Food Grade HDPE', 'UV Stabilised', 'Lid & Float Valve'],
    price: 'From AED 180',
    description: 'Polycon food-grade HDPE vertical water storage tanks 500L–10,000L for rooftop, underground, and ground-level UAE water storage. UV-stabilised black/white, with lid, outlet, and overflow connections.',
    image: 'https://images.unsplash.com/photo-1590736704728-f4730bb30770?w=700&q=80',
  },
  {
    id: 11,
    name: 'Water Filter System & Candles',
    brand: 'Hardware',
    category: 'Water Filter / Candles',
    type: '3-Stage Under-Sink Water Filter',
    size: '10" Cartridge Housing',
    features: ['Sediment + Carbon + CTO', 'Food Safe Housings', 'Replacement Candles'],
    price: 'From AED 95',
    description: '3-stage under-sink water filtration — sediment, carbon block, and CTO filter in 10" blue housings. Complete with fittings, manifold, and individual replacement candle cartridges for UAE tap water treatment.',
    image: 'https://images.unsplash.com/photo-1609174156745-3c2d1c978543?w=700&q=80',
  },
  {
    id: 12,
    name: 'PVC & Steel Floor Drain',
    brand: 'Hardware',
    category: 'PVC / Steel Floor Drain',
    type: 'Square & Round Floor Gully',
    size: '100×100 to 300×300mm',
    features: ['uPVC & SS304 Grade', 'Deep Seal Trap', 'Tile-In Grating'],
    price: 'From AED 18 / pc',
    description: 'Square and round floor drains in uPVC and stainless steel 304 with tile-in and fixed gratings, deep-seal trap, and 50mm–110mm outlet. For bathrooms, kitchens, car parks, and plant rooms.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80',
  },
  {
    id: 13,
    name: 'Auto Waste (Pop-Up Waste)',
    brand: 'Hardware',
    category: 'Auto Waste',
    type: 'Click-Clack Pop-Up Basin Waste',
    size: '32mm / 40mm',
    features: ['Chrome & Brushed', 'No Overflow & Overflow', 'Click-Clack Mechanism'],
    price: 'From AED 22 / pc',
    description: 'Click-clack pop-up basin wastes in chrome and brushed nickel finishes. Available in with-overflow and without-overflow versions for all basin types in UAE residential and hotel bathrooms.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80',
  },
]

const specs = [
  { icon: Gauge,        label: 'Valve Pressure Rating',  value: 'Up to PN40' },
  { icon: Droplets,     label: 'Water Tank Range',       value: '500L – 10,000L HDPE' },
  { icon: Layers,       label: 'PPR Welder Sizes',       value: '20mm – 63mm Fusion Dies' },
  { icon: CheckCircle2, label: 'Standards',              value: 'BS EN 559 · BS EN 1401 · NSF' },
]

const features = [
  {
    title: 'Valves, Connectors & Bibcocks',
    desc: 'Brass and SS316 full-bore ball valves, gate valves, bibcocks, and hose union connectors in ¼"–4" BSP — PN40 rated for water, gas, and HVAC isolation in UAE buildings.',
    icon: Settings,
  },
  {
    title: 'PPR Welding Tools',
    desc: 'Professional 800–1200W PPR socket fusion welding machines with PTFE-coated dies and ratchet pipe cutters — essential tools for all Wefatherm and PPR plumbing installations.',
    icon: Zap,
  },
  {
    title: 'Hose Pipes & Flexible Connectors',
    desc: 'Clear PVC garden hose, BS EN 559 welding hose, SS304 braided flex connectors 300–1000mm, and expanding magic hose — all hose requirements for UAE domestic and site use.',
    icon: Wind,
  },
  {
    title: 'Waste Fittings & Kitchen Sinks',
    desc: 'Chrome and uPVC bottle traps, P-traps, SS304 single and double kitchen sinks with waste kits — the complete waste outlet package for UAE kitchens and bathrooms.',
    icon: Droplets,
  },
  {
    title: 'Water Tanks & Filtration',
    desc: 'Food-grade HDPE water storage tanks 500L–10,000L and 3-stage under-sink water filter systems with sediment, carbon, and CTO cartridges for UAE potable water.',
    icon: Shield,
  },
  {
    title: 'Floor Drains & Auto Wastes',
    desc: 'uPVC and SS304 square/round floor drains with tile-in gratings and deep-seal traps, plus chrome click-clack pop-up basin wastes for UAE bathrooms and wet areas.',
    icon: Package,
  },
]

const comparisons = [
  { product: 'Ball Valves',          cat: 'Valve',        size: '¼"–4"',      std: 'PN40',        use: 'Water / HVAC Isolation' },
  { product: 'Bibcocks',             cat: 'Bibcock',      size: '½"–1"',      std: 'BS 1010',     use: 'Garden / Wall Tap' },
  { product: 'PPR Welder',           cat: 'Tool',         size: '20–63mm',    std: 'CE',          use: 'PPR Fusion Welding' },
  { product: 'PPR Cutter',           cat: 'Tool',         size: 'Up to 63mm', std: '—',           use: 'PPR Pipe Cutting' },
  { product: 'Water Hose',           cat: 'Hose',         size: '½"–1"',      std: '—',           use: 'Garden / Site Water' },
  { product: 'Welding Hose',         cat: 'Hose',         size: '5–6.3mm',    std: 'BS EN 559',   use: 'Gas Welding / Cutting' },
  { product: 'Flex SS Connector',    cat: 'Hose',         size: '300–1000mm', std: '—',           use: 'Tap / Basin Connection' },
  { product: 'Bottle Trap / Waste',  cat: 'Waste',        size: '32–50mm',    std: 'BS EN 274',   use: 'Basin / Bath Waste' },
  { product: 'Kitchen Sink',         cat: 'Sink',         size: '450–800mm',  std: '—',           use: 'Kitchen Drainage' },
  { product: 'Water Tank',           cat: 'Storage',      size: '500–10000L', std: 'Food Grade',  use: 'Water Storage' },
  { product: 'Water Filter',         cat: 'Filtration',   size: '10" Housing',std: 'NSF',         use: 'Drinking Water' },
  { product: 'Floor Drain',          cat: 'Drainage',     size: '100–300mm',  std: 'BS EN 1253',  use: 'Bathroom / Car Park' },
  { product: 'Auto Waste',           cat: 'Waste',        size: '32–40mm',    std: '—',           use: 'Basin Pop-Up Waste' },
]

const reasons = [
  { title: 'Full Range',        desc: '13 product lines covering every plumbing and sanitary fitting for UAE MEP and fit-out.',             num: '13+',  unit: 'Products' },
  { title: 'All Grades',        desc: 'Brass, SS304, SS316, uPVC, HDPE, and chrome — every material grade for every application.',          num: '6+',   unit: 'Materials' },
  { title: 'UAE Experts',       desc: '20+ years supplying plumbing hardware and sanitary fittings to UAE contractors and fit-out firms.',   num: '20+',  unit: 'Years' },
  { title: 'We Set Standards',  desc: 'BS EN, NSF, PN40, and CE certified products with full documentation on request.',                    num: '100%', unit: 'Certified' },
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
        <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80" alt="Plumbing fittings" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#F9F6F0]/85" />
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-8 lg:px-16 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 bg-white/70 rounded-full border border-black/5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: ACCENT }} />
              <span className="text-[#555] text-[10px] tracking-[0.2em] uppercase font-medium">Standard Group — Category 17</span>
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
                Every Fitting. Every Flow.
              </span>
            </h1>

            <p className="hero-subtitle text-[#444] text-lg max-w-md leading-relaxed mb-10">
              Valves, bibcocks, PPR welders, hose pipes, waste fittings, kitchen sinks, water tanks, floor drains, and auto wastes — the complete plumbing hardware range for UAE projects.
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
              <a href="#specs" className="text-[#666] text-sm font-medium hover:text-[#1a1a1a] transition-colors">Technical Specs</a>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="relative w-[520px] h-80 lg:w-[620px] lg:h-[420px] bg-white rounded-3xl shadow-xl border border-black/5 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1609174156745-3c2d1c978543?w=900&q=80" alt="Brass valves and fittings" className="w-full h-full object-cover" />
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
   PRODUCT SHOWCASE — GROUPED BY CATEGORY
══════════════════════════════════════ */
const categoryGroups = [
  {
    key: 'valves',
    label: 'Valve / Connector / Bibcock',
    heading: 'Control Every Flow.',
    sub: 'Valves & Connectors.',
    desc: 'Brass and SS316 ball valves, gate valves, bibcocks, and hose connectors — PN40 rated for all water, gas, and HVAC isolation in UAE buildings.',
    ids: [1, 2],
  },
  {
    key: 'ppr',
    label: 'PPR Welding Machine / Cutter',
    heading: 'Fuse With Precision.',
    sub: 'PPR Welding Tools.',
    desc: 'Professional 800–1200W socket fusion welding machines and ratchet pipe cutters for clean, reliable PPR hot and cold water plumbing installations.',
    ids: [3, 4],
  },
  {
    key: 'hose',
    label: 'Hose Pipe / Flexible Pipe',
    heading: 'Connect Everything.',
    sub: 'Hose & Flexible Pipe.',
    desc: 'PVC garden hose, welding gas hose, SS304 braided flex connectors, and expanding magic pipe — every hose connection for UAE domestic and site use.',
    ids: [5, 6, 7],
  },
  {
    key: 'waste',
    label: 'Waste Pipe / Bottle Trap / Kitchen Sink',
    heading: 'Drain Without Compromise.',
    sub: 'Waste & Sink Systems.',
    desc: 'uPVC and chrome bottle traps, P-traps, and stainless steel kitchen sinks with full waste kits — complete waste outlet solutions.',
    ids: [8, 9],
  },
  {
    key: 'storage',
    label: 'Water Tank / Filter / Floor Drain / Auto Waste',
    heading: 'Store. Filter. Drain.',
    sub: 'Complete System.',
    desc: 'HDPE water tanks 500L–10,000L, 3-stage water filters, uPVC and SS floor drains, and click-clack pop-up basin wastes.',
    ids: [10, 11, 12, 13],
  },
]

function ProductCard({ product }) {
  const catColor = (cat) => {
    if (cat.includes('Valve') || cat.includes('Bibcock'))  return 'bg-blue-50 text-blue-700'
    if (cat.includes('PPR'))   return 'bg-orange-50 text-orange-700'
    if (cat.includes('Hose') || cat.includes('Flexible'))  return 'bg-green-50 text-green-700'
    if (cat.includes('Waste') || cat.includes('Sink'))     return 'bg-slate-100 text-slate-600'
    if (cat.includes('Tank'))  return 'bg-cyan-50 text-cyan-700'
    if (cat.includes('Filter'))return 'bg-sky-50 text-sky-700'
    if (cat.includes('Drain')) return 'bg-teal-50 text-teal-700'
    return 'bg-gray-100 text-gray-600'
  }

  return (
    <div className="group relative h-[420px] cursor-pointer perspective-1000">
      <div className="relative w-full h-full transition-transform duration-500 transform-style-preserve-3d group-hover:rotate-y-180">
        {/* Front */}
        <div className="absolute inset-0 bg-white border border-black/[0.04] rounded-2xl overflow-hidden backface-hidden shadow-lg shadow-black/10">
          <div className="relative h-48 overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            <div className="absolute top-3 right-3 px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-full border border-black/5 shadow-sm">
              <span className="text-[#1a1a1a] text-[10px] font-semibold">{product.size}</span>
            </div>
          </div>
          <div className="p-5">
            <div className="flex items-center justify-between mb-1.5">
              <h3 className="font-poppins text-[#1a1a1a] text-sm font-medium leading-tight">{product.name}</h3>
              <ArrowUpRight size={13} className="text-[#ccc] flex-shrink-0 ml-1" />
            </div>
            <span className={`inline-block px-2 py-0.5 rounded-full text-[9px] font-medium mb-2 ${catColor(product.category)}`}>{product.category}</span>
            <p className="text-[#888] text-xs leading-relaxed mb-2.5 line-clamp-2">{product.description}</p>
            <div className="flex items-center justify-between pt-2.5 border-t border-black/5">
              <span className="font-poppins text-sm" style={{ color: ACCENT }}>{product.price}</span>
              <span className="text-[#bbb] text-[9px] uppercase tracking-wider">{product.type.split(' ')[0]}</span>
            </div>
          </div>
        </div>
        {/* Back */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden backface-hidden rotate-y-180 p-6 flex flex-col items-center justify-center text-white" style={{ background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DARK})` }}>
          <Wrench size={26} className="text-white mb-3" />
          <h3 className="font-poppins text-base font-medium mb-1 text-center leading-tight">{product.name}</h3>
          <p className="text-white/70 text-[11px] mb-5 text-center tracking-wider uppercase">{product.type}</p>
          <div className="grid grid-cols-2 gap-3 w-full">
            {product.features.map((f) => (
              <div key={f} className="flex flex-col items-center gap-1.5 p-2.5 bg-white/10 rounded-xl">
                <CheckCircle2 size={15} className="text-white" />
                <span className="text-[9px] uppercase tracking-wider text-center leading-tight">{f}</span>
              </div>
            ))}
            <div className="flex flex-col items-center gap-1.5 p-2.5 bg-white/10 rounded-xl">
              <Shield size={15} className="text-white" />
              <span className="text-[9px] uppercase tracking-wider text-center">BS / CE Cert.</span>
            </div>
          </div>
          <div className="mt-5 text-center"><span className="text-xl font-poppins font-light">{product.price}</span></div>
        </div>
      </div>
    </div>
  )
}

function ProductShowcase() {
  const sectionRef     = useRef(null)
  const headerLine1Ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.prod-card',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.06, ease: 'power3.out',
          scrollTrigger: { trigger: '#products', start: 'top 85%' } }
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
          <p className="text-[11px] tracking-[0.3em] uppercase font-medium mb-3" style={{ color: ACCENT }}>The Full Range</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#1a1a1a] font-light leading-[1.1] mb-4 text-3d-shadow">
            <span ref={headerLine1Ref} className="block font-major tracking-[0.02em]">Thirteen Products.</span>
            <span className="magnetic-text block font-serif italic text-[#555]">One Source. Zero Gaps.</span>
          </h2>
          <p className="text-[#666] text-base max-w-xl leading-relaxed">
            Valves, PPR tools, hose pipes, waste fittings, kitchen sinks, water tanks, water filters, floor drains, and auto pop-up wastes — everything for a complete UAE plumbing and sanitary installation.
          </p>
        </div>

        <div className="space-y-20">
          {categoryGroups.map((grp) => {
            const grpProducts = products.filter(p => grp.ids.includes(p.id))
            return (
              <div key={grp.key}>
                <div className="mb-8 flex items-end gap-4">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full text-[9px] font-semibold tracking-[0.15em] uppercase text-white mb-2" style={{ background: ACCENT }}>{grp.label}</span>
                    <h3 className="text-xl sm:text-2xl font-major text-[#1a1a1a] tracking-[0.02em]">{grp.heading} <span className="font-serif italic font-normal text-[#777]">{grp.sub}</span></h3>
                    <p className="text-[#888] text-xs mt-1 max-w-lg">{grp.desc}</p>
                  </div>
                </div>
                <div className={`grid gap-5 ${grpProducts.length === 2 ? 'grid-cols-1 md:grid-cols-2' : grpProducts.length === 3 ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'}`}>
                  {grpProducts.map((p) => (
                    <div key={p.id} className="prod-card">
                      <ProductCard product={p} />
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
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
              <span className="magnetic-text block font-serif italic text-[#94a3b8]">BS. EN. NSF. UAE Ready.</span>
            </h2>
            <p className="text-[#94a3b8] text-base leading-relaxed mb-10 max-w-md">
              All plumbing hardware meets UAE authority requirements — BS EN 1253 for floor drains, BS 1010 for bibcocks, BS EN 559 for welding hose, NSF for water filters. Full product data sheets available on request.
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
              <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80" alt="Plumbing fittings" className="relative w-full h-full object-cover" />
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

  const catBadge = (cat) => {
    if (cat === 'Valve' || cat === 'Bibcock') return 'bg-blue-900/40 text-blue-300'
    if (cat === 'Tool')     return 'bg-orange-900/40 text-orange-300'
    if (cat === 'Hose')     return 'bg-green-900/40 text-green-300'
    if (cat === 'Waste' || cat === 'Sink') return 'bg-slate-700/40 text-slate-300'
    if (cat === 'Storage')  return 'bg-cyan-900/40 text-cyan-300'
    if (cat === 'Filtration') return 'bg-sky-900/40 text-sky-300'
    return 'bg-teal-900/40 text-teal-300'
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
            <span className="magnetic-text block font-serif italic text-[#94a3b8]">Plumbing Hardware.</span>
          </h2>
        </div>
        <div className="overflow-x-auto bg-[#334155] rounded-2xl border border-white/10 shadow-lg shadow-black/20">
          <table className="w-full min-w-[820px]">
            <thead>
              <tr className="border-b border-white/10">
                {['Product', 'Category', 'Size', 'Standard', 'Best Use'].map(h => (
                  <th key={h} className="text-left text-[#94a3b8] text-[10px] tracking-[0.15em] uppercase py-4 px-5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisons.map((row, idx) => (
                <tr key={idx} className="border-b border-white/[0.03] hover:bg-[#1e293b]/50 transition-colors">
                  <td className="py-4 px-5 text-white text-sm font-medium">{row.product}</td>
                  <td className="py-4 px-5">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${catBadge(row.cat)}`}>{row.cat}</span>
                  </td>
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
          <p className="text-[#666] text-base mt-3 max-w-md mx-auto">Your complete plumbing hardware supplier across the UAE</p>
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
          <span ref={headerLine1Ref} className="block font-major tracking-[0.02em]">Ready to Install?</span>
          <span className="magnetic-text block font-serif italic text-[#94a3b8]">We Have Every Fitting</span>
        </h2>
        <p className="text-[#94a3b8] text-base max-w-lg mx-auto leading-relaxed mb-10">
          Contact Standard Group for bulk pricing on valves, bibcocks, PPR welding machines, hose pipes, kitchen sinks, water tanks, water filters, floor drains, and auto wastes. UAE-wide delivery.
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
export default function PlumbingSanitary2() {
  return (
    <div className="bg-[#F9F6F0] min-h-screen selection:bg-blue-900/20 selection:text-[#1a1a1a]">

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
