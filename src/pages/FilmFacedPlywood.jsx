import React, { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, ArrowUpRight, ArrowLeft, Shield, Layers, Ruler, CheckCircle2, ChevronDown, Flame, Wind, Package, Maximize2 } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/* ─── ACCENT: Dark Mahogany — wood, timber, plywood ─── */
const ACCENT       = '#78350f'
const ACCENT_DARK  = '#451a03'
const ACCENT_LIGHT = '#d97706'

/* ─── PRODUCT DATA ─── */
const products = [
  {
    id: 1,
    name: 'Diamond Prestige',
    category: 'Film Faced Plywood',
    type: 'PVC Coated Film Faced',
    thickness: '18 mm',
    size: '1220×2440 mm',
    finish: 'Diamond Grid Film',
    features: ['Anti-Slip Diamond Pattern', 'Waterproof WBP Glue', 'High Reuse Cycles'],
    price: 'AED 95 / sheet',
    description: 'Premium diamond-pattern PVC film faced plywood with anti-slip embossed surface. WBP phenolic glue bond ensures resistance to delamination through repeated concrete pours.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80',
  },
  {
    id: 2,
    name: 'Marinee',
    category: 'Film Faced Plywood',
    type: 'PVC Coated Film Faced',
    thickness: '18 mm',
    size: '1220×2440 mm',
    finish: 'Smooth PVC Film',
    features: ['Smooth Concrete Finish', 'Moisture Resistant Core', '6–8 Reuse Cycles'],
    price: 'AED 88 / sheet',
    description: 'Marinee smooth-face PVC film faced plywood delivers clean concrete release surfaces. Moisture-resistant hardwood core with phenolic bonding for slab and wall formwork.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80',
  },
  {
    id: 3,
    name: 'Commercial Plywood',
    category: 'Commercial Plywood',
    type: 'MR / BWP Grade',
    thickness: '6 – 25 mm',
    size: '1220×2440 mm',
    finish: 'Sanded / Natural Veneer',
    features: ['Furniture & Fit-Out', 'MR & BWP Grades', 'Multiple Thicknesses'],
    price: 'From AED 45 / sheet',
    description: 'General-purpose commercial plywood in MR (moisture resistant) and BWP (boiling waterproof) grades. Available from 6 mm to 25 mm for furniture, fit-out, flooring, and shuttering.',
    image: 'https://images.unsplash.com/photo-1607400201515-c2c41c07d307?w=700&q=80',
  },
  {
    id: 4,
    name: 'Film Faced 12mm',
    category: 'Film Faced Plywood',
    type: 'Standard Film Faced',
    thickness: '12 mm',
    size: '1220×2440 mm',
    finish: 'Brown Film',
    features: ['Lightweight', 'Slab Formwork', 'Cost Effective'],
    price: 'AED 72 / sheet',
    description: '12mm film faced plywood for lightweight slab and beam formwork. Brown phenolic film surface, hardwood core, and edge sealing for extended service life.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80',
  },
  {
    id: 5,
    name: 'Film Faced 15mm',
    category: 'Film Faced Plywood',
    type: 'Standard Film Faced',
    thickness: '15 mm',
    size: '1220×2440 mm',
    finish: 'Brown / Black Film',
    features: ['Wall & Slab Use', 'Balanced Panel', 'Phenolic Bonded'],
    price: 'AED 82 / sheet',
    description: '15mm film faced plywood balancing weight and rigidity for wall and suspended slab formwork. Available in brown or black film with sealed edges for moisture protection.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80',
  },
  {
    id: 6,
    name: 'Film Faced 21mm',
    category: 'Film Faced Plywood',
    type: 'Heavy-Duty Film Faced',
    thickness: '21 mm',
    size: '1220×2440 mm',
    finish: 'Black Film',
    features: ['Heavy Slab & Column', 'Maximum Rigidity', '10+ Reuse Cycles'],
    price: 'AED 115 / sheet',
    description: 'Heavy-duty 21mm film faced plywood for columns, walls, and large slab pours demanding maximum panel stiffness. Black phenolic film, 10+ reuse cycles with proper release agent.',
    image: 'https://images.unsplash.com/photo-1607400201515-c2c41c07d307?w=700&q=80',
  },
]

const specs = [
  { icon: Layers,    label: 'Core Construction',  value: 'Hardwood / Poplar Veneer Core' },
  { icon: Flame,     label: 'Glue Bond',           value: 'WBP Phenolic (Boil-Proof)' },
  { icon: Ruler,     label: 'Thickness Range',     value: '12 mm – 21 mm' },
  { icon: CheckCircle2, label: 'Standard',         value: 'EN 314-2 · BS 1088 · GB/T' },
]

const features = [
  {
    title: 'WBP Phenolic Glue Bond',
    desc: 'Water-boil-proof phenolic adhesive between every veneer layer. No delamination under UAE site conditions — repeated wet-dry cycles, rain, and direct concrete contact.',
    icon: Flame,
  },
  {
    title: 'Anti-Slip Diamond Surface',
    desc: 'Diamond Prestige\'s embossed PVC film prevents workers and materials from sliding on formwork decks — a critical safety feature for elevated slab work.',
    icon: Shield,
  },
  {
    title: 'Clean Concrete Release',
    desc: 'Marinee\'s smooth PVC film releases cleanly from concrete, minimising surface defects and reducing remedial work. Reusable 6–8 times with release agent.',
    icon: Wind,
  },
  {
    title: 'Multiple Thickness Range',
    desc: 'From lightweight 12mm for slabs to rigid 21mm for column boxes — the full thickness range for every formwork application is available from Standard Group.',
    icon: Maximize2,
  },
  {
    title: 'Sealed Edges Standard',
    desc: 'All sheets are edge-sealed with waterproof paint or tape at the factory, preventing moisture ingress into the core and maximising panel reuse on site.',
    icon: Package,
  },
  {
    title: 'Commercial Plywood Range',
    desc: 'MR and BWP grade commercial plywood in 6–25mm for furniture, fit-out, flooring, and general shuttering. Consistent thickness, sanded faces, and reliable bond.',
    icon: Layers,
  },
]

const comparisons = [
  { product: 'Diamond Prestige', cat: 'Film Faced',   thickness: '18 mm', finish: 'Diamond PVC', bond: 'WBP Phenolic', reuse: '8–10×', use: 'Elevated Slabs / Safety' },
  { product: 'Marinee',          cat: 'Film Faced',   thickness: '18 mm', finish: 'Smooth PVC',  bond: 'WBP Phenolic', reuse: '6–8×',  use: 'Wall / Slab Formwork' },
  { product: 'Film Faced 12mm',  cat: 'Film Faced',   thickness: '12 mm', finish: 'Brown Film',  bond: 'WBP Phenolic', reuse: '5–7×',  use: 'Light Slab / Beam' },
  { product: 'Film Faced 15mm',  cat: 'Film Faced',   thickness: '15 mm', finish: 'Brown/Black', bond: 'WBP Phenolic', reuse: '6–8×',  use: 'Wall & Slab' },
  { product: 'Film Faced 21mm',  cat: 'Film Faced',   thickness: '21 mm', finish: 'Black Film',  bond: 'WBP Phenolic', reuse: '10×+',  use: 'Column / Heavy Slab' },
  { product: 'Commercial Plywood', cat: 'Commercial', thickness: '6–25mm', finish: 'Sanded',     bond: 'MR / BWP',     reuse: 'N/A',   use: 'Furniture / Fit-Out' },
]

const reasons = [
  { title: 'Full Range',        desc: 'Film faced 12–21mm, Diamond Prestige, Marinee, and commercial grades — all stocked.',   num: '6+',   unit: 'Products' },
  { title: 'WBP Certified',     desc: 'All film faced plywood uses boil-proof WBP phenolic glue, BS / EN certified.',          num: 'WBP',  unit: 'Certified' },
  { title: 'UAE Experts',       desc: '20+ years supplying formwork plywood to UAE contractors and fit-out companies.',         num: '20+',  unit: 'Years' },
  { title: 'We Set Standards',  desc: 'Consistent sheet quality, correct dimensions, and full documentation on every order.',  num: '100%', unit: 'Quality' },
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
          src="https://images.unsplash.com/photo-1607400201515-c2c41c07d307?w=1920&q=80"
          alt="Film faced plywood formwork"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#F9F6F0]/85" />
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-8 lg:px-16 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <div>
            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 bg-white/70 rounded-full border border-black/5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: ACCENT }} />
              <span className="text-[#555] text-[10px] tracking-[0.2em] uppercase font-medium">Standard Group — Category 11</span>
            </div>

            <h1 className="mb-6">
              <span
                ref={line1Ref}
                className="hero-title-line block font-major text-3xl sm:text-4xl lg:text-5xl text-[#1a1a1a] leading-[1.1] tracking-[0.02em] mb-2 inline-block text-3d-shadow"
              >
                Film Faced Plywood
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
                Built for the Pour
              </span>
            </h1>

            <p className="hero-subtitle text-[#444] text-lg max-w-md leading-relaxed mb-10">
              Diamond Prestige, Marinee PVC coated, and commercial plywood — WBP phenolic bonded, edge-sealed, and ready for UAE formwork in 12mm through 21mm thicknesses.
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
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80"
                alt="Film faced plywood sheets"
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

  /* Category colour accent */
  const catBadgeStyle = (cat) =>
    cat === 'Commercial Plywood'
      ? { background: '#44403c' }
      : { background: ACCENT }

  return (
    <section id="products" ref={sectionRef} className="relative py-24 lg:py-32 bg-[#F9F6F0]">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">

        <div className="mb-16">
          <p className="text-[11px] tracking-[0.3em] uppercase font-medium mb-3" style={{ color: ACCENT }}>The Range</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#1a1a1a] font-light leading-[1.1] mb-4 text-3d-shadow">
            <span ref={headerLine1Ref} className="block font-major tracking-[0.02em]">Six Products.</span>
            <span className="magnetic-text block font-serif italic text-[#555]">Every Formwork Need.</span>
          </h2>
          <p className="text-[#666] text-base max-w-lg leading-relaxed">
            Diamond Prestige anti-slip film, Marinee smooth-release PVC, and film faced sheets from 12–21mm — plus commercial plywood for fit-out and furniture. All WBP phenolic bonded.
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    {/* Category badge */}
                    <div
                      className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-white text-[10px] font-semibold"
                      style={catBadgeStyle(product.category)}
                    >
                      {product.category}
                    </div>
                    {/* Thickness badge */}
                    <div className="absolute top-3 right-3 px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-full border border-black/5 shadow-sm">
                      <span className="text-[#1a1a1a] text-[10px] font-semibold">{product.thickness}</span>
                    </div>
                    {/* Finish on image */}
                    <div className="absolute bottom-3 left-4">
                      <span className="text-white/80 text-[9px] uppercase tracking-widest">{product.finish}</span>
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
                      <span className="text-[#bbb] text-[9px] uppercase tracking-wider">{product.size}</span>
                    </div>
                  </div>
                </div>

                {/* Back */}
                <div
                  className="absolute inset-0 rounded-2xl overflow-hidden backface-hidden rotate-y-180 p-6 flex flex-col items-center justify-center text-white"
                  style={{ background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DARK})` }}
                >
                  <h3 className="font-poppins text-lg font-medium mb-1 text-center">{product.name}</h3>
                  <p className="text-white/70 text-[11px] mb-5 text-center tracking-wider uppercase">{product.thickness} — {product.type}</p>
                  <div className="grid grid-cols-2 gap-3 w-full">
                    {product.features.map((f) => (
                      <div key={f} className="flex flex-col items-center gap-1.5 p-3 bg-white/10 rounded-xl">
                        <CheckCircle2 size={18} className="text-white" />
                        <span className="text-[10px] uppercase tracking-wider text-center leading-tight">{f}</span>
                      </div>
                    ))}
                    <div className="flex flex-col items-center gap-1.5 p-3 bg-white/10 rounded-xl">
                      <Flame size={18} className="text-white" />
                      <span className="text-[10px] uppercase tracking-wider text-center">WBP Glue Bond</span>
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
              <span ref={headerLine1Ref} className="block font-major tracking-[0.02em]">Engineered</span>
              <span className="magnetic-text block font-serif italic text-[#94a3b8]">to Outlast the Pour.</span>
            </h2>
            <p className="text-[#94a3b8] text-base leading-relaxed mb-10 max-w-md">
              WBP phenolic adhesive, hardwood veneer cores, and factory-sealed edges combine to deliver film faced plywood that withstands UAE site conditions — heat, moisture, and repeated concrete pours.
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
                src="https://images.unsplash.com/photo-1607400201515-c2c41c07d307?w=800&q=80"
                alt="Plywood layers"
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
            <span ref={headerLine1Ref} className="block font-major tracking-[0.02em]">Why Our Plywood</span>
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
            <span ref={headerLine1Ref} className="block font-major tracking-[0.02em]">Select Your</span>
            <span className="magnetic-text block font-serif italic text-[#94a3b8]">Sheet Grade.</span>
          </h2>
        </div>

        <div className="overflow-x-auto bg-[#334155] rounded-2xl border border-white/10 shadow-lg shadow-black/20">
          <table className="w-full min-w-[780px]">
            <thead>
              <tr className="border-b border-white/10">
                {['Product', 'Type', 'Thickness', 'Film / Finish', 'Bond', 'Reuse Cycles', 'Best Use'].map(h => (
                  <th key={h} className="text-left text-[#94a3b8] text-[10px] tracking-[0.15em] uppercase py-4 px-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisons.map((row, idx) => (
                <tr key={idx} className="border-b border-white/[0.03] hover:bg-[#1e293b]/50 transition-colors">
                  <td className="py-4 px-4 text-white text-sm font-medium">{row.product}</td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                      row.cat === 'Film Faced' ? 'bg-amber-900/40 text-amber-300' : 'bg-stone-700/40 text-stone-300'
                    }`}>
                      {row.cat}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm font-medium" style={{ color: ACCENT_LIGHT }}>{row.thickness}</td>
                  <td className="py-4 px-4 text-[#94a3b8] text-sm">{row.finish}</td>
                  <td className="py-4 px-4 text-[#94a3b8] text-sm">{row.bond}</td>
                  <td className="py-4 px-4 text-[#94a3b8] text-sm">{row.reuse}</td>
                  <td className="py-4 px-4 text-[#94a3b8] text-sm">{row.use}</td>
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
            Your trusted partner for film faced and commercial plywood supply across the UAE
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
          <span ref={headerLine1Ref} className="block font-major tracking-[0.02em]">Ready to Form?</span>
          <span className="magnetic-text block font-serif italic text-[#94a3b8]">We Supply the Sheet</span>
        </h2>
        <p className="text-[#94a3b8] text-base max-w-lg mx-auto leading-relaxed mb-10">
          Contact Standard Group for bulk pricing on film faced plywood, Diamond Prestige, Marinee, and commercial grades. Fast UAE site delivery with full product documentation.
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
export default function FilmFacedPlywood() {
  return (
    <div className="bg-[#F9F6F0] min-h-screen selection:bg-amber-900/20 selection:text-[#1a1a1a]">

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
