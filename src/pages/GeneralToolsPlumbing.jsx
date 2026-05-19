import React, { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, ArrowUpRight, ArrowLeft, Shield, Layers, Ruler, CheckCircle2, ChevronDown, Wrench, Droplets, Package, Settings, Wind, Hammer } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/* ─── ACCENT: Teal — plumbing, pipes, practical tools ─── */
const ACCENT       = '#0f766e'
const ACCENT_DARK  = '#0f4c47'
const ACCENT_LIGHT = '#5eead4'

/* ─── BRANDS ─── */
const brands = [
  { name: 'Wefatherm', sub: 'PPR Plumbing Systems' },
  { name: 'Atlas',     sub: 'PVC Pipe & Fitting' },
  { name: 'General',   sub: 'Hand Tools & Accessories' },
]

/* ─── GENERAL TOOLS PRODUCTS ─── */
const generalTools = [
  {
    id: 1,
    name: 'Ladders — Step & Multi-Position',
    brand: 'General Tools',
    category: 'Ladder / Brush / Wiper / Rake',
    type: 'Aluminium Step & Extension Ladders',
    size: '3 ft – 20 ft',
    features: ['Aluminium Frame', 'Non-Slip Steps', 'Foldable & Telescopic'],
    price: 'From AED 65',
    description: 'Aluminium step ladders, A-frame, multi-position, and telescopic extension ladders for UAE construction, painting, maintenance, and fit-out. Non-slip rubber feet and anti-spread safety lock.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=80',
  },
  {
    id: 2,
    name: 'Brushes, Wipers & Rakes',
    brand: 'General Tools',
    category: 'Ladder / Brush / Wiper / Rake',
    type: 'Floor Brushes, Squeegees & Garden Rakes',
    size: 'Various',
    features: ['Hard & Soft Bristle', 'Long Handle', 'Indoor & Outdoor'],
    price: 'From AED 12',
    description: 'Full range of floor brushes, hand brushes, squeegee wipers, and garden/site rakes for construction cleaning, floor maintenance, and site clearance across UAE projects.',
    image: 'https://images.unsplash.com/photo-1590736704728-f4730bb30770?w=700&q=80',
  },
  {
    id: 3,
    name: 'Shade Net',
    brand: 'General Tools',
    category: 'Shade Net',
    type: 'HDPE Shade Netting',
    size: '3m / 6m Wide — Any Length',
    features: ['30–90% Shade', 'UV Stabilised', 'Green / Black'],
    price: 'From AED 3.50 / m²',
    description: 'HDPE UV-stabilised shade netting in 30%, 50%, 70%, and 90% shade factors. Available in green and black, standard widths 3m and 6m for scaffolding, agriculture, and site enclosures.',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=700&q=80',
  },
  {
    id: 4,
    name: 'Silicon Gun & Sealants',
    brand: 'General Tools',
    category: 'Silicon Gun',
    type: 'Manual & Pneumatic Caulking Gun',
    size: '310ml / 600ml',
    features: ['Skeleton Frame', 'Smooth Rod', 'Anti-Drip'],
    price: 'From AED 15',
    description: 'Manual skeleton-frame and heavy-duty sausage caulking guns for 310ml cartridges and 600ml sausage packs. Smooth rod, anti-drip mechanism, balanced trigger for silicone and sealant application.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=80',
  },
  {
    id: 5,
    name: 'Site Accessories Pack',
    brand: 'General Tools',
    category: 'Accessories',
    type: 'Sanding, Masking & Safety Accessories',
    size: 'Various',
    features: ['Sanding Sheets', 'Gloves & PPE', 'Markers & Tape'],
    price: 'From AED 5',
    description: 'General site accessories — abrasive sanding sheets, safety gloves, cable ties, permanent markers, masking tape, and miscellaneous consumables for UAE construction and maintenance sites.',
    image: 'https://images.unsplash.com/photo-1590736704728-f4730bb30770?w=700&q=80',
  },
]

/* ─── PLUMBING PRODUCTS ─── */
const plumbingProducts = [
  {
    id: 6,
    name: 'Wefatherm PPR Pipes',
    brand: 'Wefatherm',
    category: 'Plumbing & Sanitary',
    type: 'PPR Hot & Cold Pipes',
    size: '20mm – 110mm',
    features: ['PN20 Pressure Rating', 'Hot & Cold Water', 'Corrosion Free'],
    price: 'From AED 8 / m',
    description: 'Wefatherm polypropylene random (PPR) pipes for hot and cold water supply in UAE residential and commercial buildings. PN20 pressure rating, heat fusion jointed, fully corrosion-free.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80',
  },
  {
    id: 7,
    name: 'Wefatherm PPR Fittings',
    brand: 'Wefatherm',
    category: 'Plumbing & Sanitary',
    type: 'PPR Elbows, Tees & Couplings',
    size: '20mm – 110mm',
    features: ['Socket Fusion', 'Brass Insert Fittings', 'Full Range'],
    price: 'From AED 3 / pc',
    description: 'Complete Wefatherm PPR fitting range — elbows, tees, reducers, couplings, end caps, and brass insert fittings. Socket fusion welded for leak-free, durable joints in all plumbing systems.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80',
  },
  {
    id: 8,
    name: 'Wefatherm PPR Valves',
    brand: 'Wefatherm',
    category: 'Plumbing & Sanitary',
    type: 'Ball Valves & Gate Valves',
    size: '20mm – 110mm',
    features: ['PPR Ball Valve', 'Brass Gate Valve', 'Full Bore'],
    price: 'From AED 18 / pc',
    description: 'Wefatherm PPR ball valves and brass gate valves for isolation and flow control in hot and cold water systems. Full-bore design, easy quarter-turn operation, and heat-fusion socket ends.',
    image: 'https://images.unsplash.com/photo-1609174156745-3c2d1c978543?w=700&q=80',
  },
  {
    id: 9,
    name: 'Atlas PVC White Pipe & Fitting',
    brand: 'Atlas',
    category: 'PVC White Pipe & Fitting',
    type: 'uPVC Pressure Pipe — White',
    size: '½" – 6" (15–160mm)',
    features: ['Class C & E', 'BS 3505 Rated', 'Solvent Weld'],
    price: 'From AED 12 / length',
    description: 'Atlas white uPVC pressure pipes in Class C and Class E for cold water supply, irrigation, and general utilities. Solvent-welded joints, full range of fittings, BS 3505 certified.',
    image: 'https://images.unsplash.com/photo-1609174156745-3c2d1c978543?w=700&q=80',
  },
  {
    id: 10,
    name: 'Atlas PVC Grey Pipe & Fitting',
    brand: 'Atlas',
    category: 'PVC Grey Pipe & Fitting',
    type: 'uPVC Drainage & Conduit — Grey',
    size: '½" – 6" (15–160mm)',
    features: ['Drainage Grade', 'Ring Seal & Solvent', 'Conduit Use'],
    price: 'From AED 10 / length',
    description: 'Atlas grey uPVC pipes and fittings for drainage, waste, soil, and electrical conduit applications. Ring seal and solvent-weld jointing, wide fitting range, UAE site approved.',
    image: 'https://images.unsplash.com/photo-1609174156745-3c2d1c978543?w=700&q=80',
  },
]

const allProducts = [...generalTools, ...plumbingProducts]

const specs = [
  { icon: Droplets,     label: 'PPR Pressure Rating', value: 'PN20 — Hot & Cold Water' },
  { icon: Layers,       label: 'PPR Pipe Sizes',      value: '20mm – 110mm (Wefatherm)' },
  { icon: Ruler,        label: 'PVC Pipe Sizes',      value: '½" – 6" (15–160mm) Atlas' },
  { icon: CheckCircle2, label: 'Standards',           value: 'BS 3505 · DIN 8077 · ISO 15874' },
]

const features = [
  {
    title: 'Wefatherm PPR System',
    desc: 'Polypropylene PPR pipes and fittings PN20 for hot and cold water — heat fusion socket welded, fully corrosion-free, and rated for 70°C continuous service in UAE buildings.',
    icon: Droplets,
  },
  {
    title: 'Atlas PVC White & Grey',
    desc: 'Class C and E white uPVC pressure pipes and grey drainage/conduit pipes — BS 3505 certified, solvent and ring-seal jointing for water supply, drainage, and electrical conduit.',
    icon: Layers,
  },
  {
    title: 'Ladders & Access',
    desc: 'Aluminium step, A-frame, and telescopic extension ladders 3ft–20ft for construction, painting, and maintenance across UAE sites. Non-slip feet, certified load ratings.',
    icon: Hammer,
  },
  {
    title: 'Brushes, Wipers & Rakes',
    desc: 'Hard and soft bristle floor brushes, squeegee wipers, and garden rakes for site cleaning and maintenance — long handle, durable bristle, and indoor/outdoor rated.',
    icon: Wind,
  },
  {
    title: 'Shade Net — HDPE UV',
    desc: 'HDPE UV-stabilised shade netting in 30–90% shade for scaffolding enclosures, construction site barriers, agriculture, and sun shading across UAE projects.',
    icon: Shield,
  },
  {
    title: 'Site Accessories & Silicon Guns',
    desc: 'Manual and sausage-pack caulking guns, sanding accessories, gloves, masking tape, cable ties, and site consumables — everything to keep UAE site work moving.',
    icon: Package,
  },
]

const comparisons = [
  { product: 'Ladders',              brand: 'General', cat: 'Access',        size: '3–20 ft',     std: '—',        use: 'Construction / FM' },
  { product: 'Brushes / Wipers',     brand: 'General', cat: 'Cleaning',      size: 'Various',     std: '—',        use: 'Site Cleaning' },
  { product: 'Shade Net',            brand: 'General', cat: 'Site Enclosure',size: '3m/6m Wide',  std: 'UV Stab.', use: 'Scaffolding / Agri.' },
  { product: 'Silicon Gun',          brand: 'General', cat: 'Sealant Tool',  size: '310/600ml',   std: '—',        use: 'Sealing / Jointing' },
  { product: 'Site Accessories',     brand: 'General', cat: 'Consumables',   size: 'Various',     std: '—',        use: 'General Site Use' },
  { product: 'Wefatherm PPR Pipes',  brand: 'Wefatherm',cat: 'PPR Plumbing', size: '20–110mm',    std: 'DIN 8077', use: 'Hot & Cold Water' },
  { product: 'Wefatherm PPR Fittings',brand:'Wefatherm',cat: 'PPR Plumbing', size: '20–110mm',    std: 'DIN 8077', use: 'Elbows / Tees' },
  { product: 'Wefatherm PPR Valves', brand: 'Wefatherm',cat: 'PPR Valves',   size: '20–110mm',    std: '—',        use: 'Isolation / Flow' },
  { product: 'Atlas PVC White',      brand: 'Atlas',   cat: 'PVC White',     size: '½"–6"',       std: 'BS 3505',  use: 'Cold Water / Irrigation' },
  { product: 'Atlas PVC Grey',       brand: 'Atlas',   cat: 'PVC Grey',      size: '½"–6"',       std: 'BS EN 1401',use: 'Drainage / Conduit' },
]

const reasons = [
  { title: '3 Trusted Brands',  desc: 'Wefatherm PPR, Atlas PVC, and General Tools — quality supply for UAE plumbing and site work.',      num: '3',    unit: 'Brands' },
  { title: 'Full Range',        desc: '10 product lines covering PPR plumbing, PVC pipes, hand tools, shade net and accessories.',          num: '10+',  unit: 'Products' },
  { title: 'UAE Experts',       desc: '20+ years supplying plumbing materials and tools to UAE contractors and FM companies.',              num: '20+',  unit: 'Years' },
  { title: 'We Set Standards',  desc: 'BS 3505, DIN 8077, and ISO 15874 certified products with full documentation and site delivery.',    num: '100%', unit: 'Certified' },
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
          alt="Tools and plumbing"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#F9F6F0]/85" />
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-8 lg:px-16 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 bg-white/70 rounded-full border border-black/5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: ACCENT }} />
              <span className="text-[#555] text-[10px] tracking-[0.2em] uppercase font-medium">Standard Group — Category 15</span>
            </div>

            <h1 className="mb-6">
              <span
                ref={line1Ref}
                className="hero-title-line block font-major text-3xl sm:text-4xl lg:text-5xl text-[#1a1a1a] leading-[1.1] tracking-[0.02em] mb-2 inline-block text-3d-shadow"
              >
                General Tools
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
                & Plumbing Systems
              </span>
            </h1>

            <p className="hero-subtitle text-[#444] text-lg max-w-md leading-relaxed mb-10">
              Ladders, brushes, shade nets, silicon guns, site accessories — plus Wefatherm PPR plumbing and Atlas PVC pipe & fittings for complete UAE site and building supply.
            </p>

            <div className="hero-cta flex items-center gap-4">
              <a
                href="#tools"
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
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80"
                alt="Plumbing pipes and fittings"
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
   GENERAL TOOLS SECTION
══════════════════════════════════════ */
function GeneralToolsSection() {
  const sectionRef     = useRef(null)
  const headerLine1Ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.tool-card',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: '#tools', start: 'top 85%' } }
      )
      if (headerLine1Ref.current) {
        gsap.to(headerLine1Ref.current, { y: -15, duration: 2, ease: 'sine.inOut', yoyo: true, repeat: -1 })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const catBadge = (cat) => {
    if (cat === 'Shade Net')    return 'bg-green-100 text-green-700'
    if (cat === 'Silicon Gun')  return 'bg-orange-100 text-orange-700'
    if (cat === 'Accessories')  return 'bg-slate-100 text-slate-600'
    return 'bg-teal-50 text-teal-700'
  }

  return (
    <section id="tools" ref={sectionRef} className="relative py-24 lg:py-32 bg-[#F9F6F0]">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
        <div className="mb-14">
          <p className="text-[11px] tracking-[0.3em] uppercase font-medium mb-3" style={{ color: ACCENT }}>General Tools</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#1a1a1a] font-light leading-[1.1] mb-4 text-3d-shadow">
            <span ref={headerLine1Ref} className="block font-major tracking-[0.02em]">Ladder. Brush. Shade.</span>
            <span className="magnetic-text block font-serif italic text-[#555]">Site Ready. Every Time.</span>
          </h2>
          <p className="text-[#666] text-base max-w-lg leading-relaxed">
            Aluminium ladders, floor brushes, squeegee wipers, HDPE shade nets, silicon guns, and site consumables — everything to keep UAE construction and maintenance sites running.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {generalTools.map((product) => (
            <div key={product.id} className="tool-card group relative h-[410px] cursor-pointer perspective-1000">
              <div className="relative w-full h-full transition-transform duration-500 transform-style-preserve-3d group-hover:rotate-y-180">
                {/* Front */}
                <div className="absolute inset-0 bg-white border border-black/[0.04] rounded-2xl overflow-hidden backface-hidden shadow-lg shadow-black/10">
                  <div className="relative h-48 overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-full border border-black/5 shadow-sm">
                      <span className={`text-[10px] font-semibold ${catBadge(product.category).split(' ')[1]}`}>{product.category}</span>
                    </div>
                    <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-white text-[10px] font-semibold" style={{ background: ACCENT }}>
                      {product.size.split('–')[0].trim()}
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-1.5">
                      <h3 className="font-poppins text-[#1a1a1a] text-sm font-medium leading-tight">{product.name}</h3>
                      <ArrowUpRight size={13} className="text-[#ccc] flex-shrink-0 ml-1" />
                    </div>
                    <p className="text-[#888] text-xs leading-relaxed mb-3 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between pt-3 border-t border-black/5">
                      <span className="font-poppins text-sm" style={{ color: ACCENT }}>{product.price}</span>
                      <span className="text-[#bbb] text-[9px] uppercase tracking-wider">{product.type.split(' ')[0]}</span>
                    </div>
                  </div>
                </div>
                {/* Back */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden backface-hidden rotate-y-180 p-6 flex flex-col items-center justify-center text-white" style={{ background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DARK})` }}>
                  <Wrench size={28} className="text-white mb-3" />
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
                      <span className="text-[9px] uppercase tracking-wider text-center">UAE Stocked</span>
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
   PLUMBING SECTION
══════════════════════════════════════ */
function PlumbingSection() {
  const sectionRef     = useRef(null)
  const headerLine1Ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.plumb-card',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: '#plumbing', start: 'top 85%' } }
      )
      if (headerLine1Ref.current) {
        gsap.to(headerLine1Ref.current, { y: -15, duration: 2, ease: 'sine.inOut', yoyo: true, repeat: -1 })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const brandColor = (brand) => {
    if (brand === 'Wefatherm') return ACCENT
    return '#374151'
  }

  const catBadge = (cat) => {
    if (cat === 'PVC White Pipe & Fitting') return 'bg-blue-100 text-blue-700'
    if (cat === 'PVC Grey Pipe & Fitting')  return 'bg-slate-100 text-slate-600'
    return 'bg-teal-50 text-teal-700'
  }

  return (
    <section id="plumbing" ref={sectionRef} className="relative py-24 lg:py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
        <div className="mb-14">
          <p className="text-[11px] tracking-[0.3em] uppercase font-medium mb-3" style={{ color: ACCENT }}>Plumbing & Sanitary</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#1a1a1a] font-light leading-[1.1] mb-4 text-3d-shadow">
            <span ref={headerLine1Ref} className="block font-major tracking-[0.02em]">Wefatherm PPR.</span>
            <span className="magnetic-text block font-serif italic text-[#555]">Atlas PVC. Full Systems.</span>
          </h2>
          <p className="text-[#666] text-base max-w-lg leading-relaxed">
            Wefatherm PPR pipes, fittings, and valves for hot and cold water — Atlas PVC white and grey pipes and fittings for pressure, drainage, and conduit. Complete plumbing supply for UAE buildings.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {plumbingProducts.map((product) => (
            <div key={product.id} className="plumb-card group relative h-[420px] cursor-pointer perspective-1000">
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
                    <span className={`inline-block px-2 py-0.5 rounded-full text-[9px] font-medium mb-2 ${catBadge(product.category)}`}>{product.category}</span>
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
                        <Droplets size={16} className="text-white" />
                        <span className="text-[9px] uppercase tracking-wider text-center leading-tight">{f}</span>
                      </div>
                    ))}
                    <div className="flex flex-col items-center gap-1.5 p-2.5 bg-white/10 rounded-xl">
                      <Shield size={16} className="text-white" />
                      <span className="text-[9px] uppercase tracking-wider text-center">BS/DIN Cert.</span>
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
              <span className="magnetic-text block font-serif italic text-[#94a3b8]">BS. DIN. ISO. Site Ready.</span>
            </h2>
            <p className="text-[#94a3b8] text-base leading-relaxed mb-10 max-w-md">
              Wefatherm PPR pipes meet DIN 8077 and ISO 15874 for hot and cold water. Atlas PVC pipes are BS 3505 and BS EN 1401 certified. All products UAE municipality and authority compliant.
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
              <img src="https://images.unsplash.com/photo-1609174156745-3c2d1c978543?w=800&q=80" alt="PPR plumbing pipes" className="relative w-full h-full object-cover" />
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
    if (brand === 'Wefatherm') return 'bg-teal-900/40 text-teal-300'
    if (brand === 'Atlas')     return 'bg-blue-900/40 text-blue-300'
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
            <span className="magnetic-text block font-serif italic text-[#94a3b8]">Tools & Pipe System.</span>
          </h2>
        </div>
        <div className="overflow-x-auto bg-[#334155] rounded-2xl border border-white/10 shadow-lg shadow-black/20">
          <table className="w-full min-w-[820px]">
            <thead>
              <tr className="border-b border-white/10">
                {['Product', 'Brand', 'Category', 'Size', 'Standard', 'Best Use'].map(h => (
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
          <p className="text-[#666] text-base mt-3 max-w-md mx-auto">Your trusted partner for tools and plumbing materials across the UAE</p>
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
          <span ref={headerLine1Ref} className="block font-major tracking-[0.02em]">Ready to Supply Your Site?</span>
          <span className="magnetic-text block font-serif italic text-[#94a3b8]">We Have Everything</span>
        </h2>
        <p className="text-[#94a3b8] text-base max-w-lg mx-auto leading-relaxed mb-10">
          Contact Standard Group for bulk pricing on Wefatherm PPR, Atlas PVC pipes, ladders, shade netting, silicon guns, and all site accessories. Fast delivery across UAE.
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
export default function GeneralToolsPlumbing() {
  return (
    <div className="bg-[#F9F6F0] min-h-screen selection:bg-teal-800/20 selection:text-[#1a1a1a]">

      <HeroSection />
      <BrandsStrip />
      <GeneralToolsSection />
      <PlumbingSection />
      <SpecsSection />
      <FeaturesSection />
      <ComparisonSection />
      <WhyStandardGroup />
      <CTASection />
    </div>
  )
}
