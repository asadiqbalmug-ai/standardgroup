import React, { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, ArrowUpRight, ArrowLeft, Shield, Layers, Ruler, CheckCircle2, ChevronDown, Sparkles, Grid, Boxes, Wind } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/* ─── ACCENT COLOR: Emerald Green — earthy, natural, tiles/stone ─── */
const ACCENT       = '#16a34a'
const ACCENT_DARK  = '#15803d'
const ACCENT_LIGHT = '#4ade80'

/* ─── PRODUCT DATA ─── */
const products = [
  {
    id: 1,
    name: 'Concrete Series',
    type: 'Large Format Floor Tile',
    size: '600×600 mm',
    features: ['Matte Concrete Look', 'Anti-Slip R10', 'Indoor / Outdoor'],
    price: 'AED 28 / m²',
    description: 'Minimalist concrete-effect porcelain in warm grey tones. Ideal for open-plan living areas, lobbies, and terraces.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
  },
  {
    id: 2,
    name: 'Marble Luxe',
    type: 'Polished Floor & Wall Tile',
    size: '600×1200 mm',
    features: ['Polished Marble Look', 'High Gloss', 'Rectified Edge'],
    price: 'AED 55 / m²',
    description: 'Rectified large-format tile with a stunning white marble vein pattern. Transforms bathrooms and feature walls.',
    image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=600&q=80',
  },
  {
    id: 3,
    name: 'Mosaic Glass Mix',
    type: 'Decorative Wall Mosaic',
    size: '300×300 mm (sheet)',
    features: ['Glass & Stone Mix', 'Pool Safe', 'Vibrant Palette'],
    price: 'AED 42 / m²',
    description: 'Hand-set glass and stone mosaic sheets in rich jewel tones. Perfect for feature walls, pools, and wet-room accents.',
    image: 'https://images.unsplash.com/photo-1549187774-b4e9b0445b41?w=600&q=80',
  },
  {
    id: 4,
    name: 'Natural Stone',
    type: 'Textured Floor & Wall Tile',
    size: '450×450 mm',
    features: ['Stone Texture', 'Natural Variation', 'Matt Finish'],
    price: 'AED 38 / m²',
    description: 'Authentic stone-look porcelain with natural colour variation. Brings the warmth of quarried stone with zero maintenance.',
    image: 'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?w=600&q=80',
  },
  {
    id: 5,
    name: 'Wood-Look Plank',
    type: 'Wood-Effect Floor Tile',
    size: '200×1200 mm',
    features: ['Oak Wood Grain', 'Underfloor Heat Safe', 'Slip Resistant'],
    price: 'AED 45 / m²',
    description: 'Long-format wood-grain tile delivers the warmth of timber with the durability of ceramic. Safe over underfloor heating.',
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&q=80',
  },
  {
    id: 6,
    name: 'Geometric Interlock',
    type: 'Pattern Floor Tile',
    size: '200×200 mm',
    features: ['Encaustic Pattern', 'Heritage Design', 'Slip Resistant'],
    price: 'AED 48 / m²',
    description: 'Encaustic-inspired geometric patterns for entryways, kitchens, and statement floors. Timeless and bold.',
    image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600&q=80',
  },
  {
    id: 7,
    name: 'Roof Tile — Roman',
    type: 'Terracotta Roof Tile',
    size: 'Standard Roman Profile',
    features: ['Terracotta Fired', 'UV & Rain Proof', 'Natural Colour'],
    price: 'AED 12 / piece',
    description: 'Traditional Roman-profile roof tile in fire-baked terracotta. UV resistant and self-draining for UAE climate.',
    image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600&q=80',
  },
  {
    id: 8,
    name: 'Concrete Interlock',
    type: 'Driveway / Pathway Paver',
    size: '200×100×60 mm',
    features: ['High Compressive Strength', 'Interlocking Design', 'Multi-Colour Range'],
    price: 'AED 18 / m²',
    description: 'Precision-moulded interlocking concrete pavers for driveways, walkways, and landscaping. Available in 8 colours.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
  },
  {
    id: 9,
    name: 'Kitchen Wall Décor',
    type: 'Ceramic Wall Tile',
    size: '300×450 mm',
    features: ['Printed Décor Pattern', 'Easy-Clean Glaze', 'Backsplash Ready'],
    price: 'AED 22 / m²',
    description: 'Cheerful printed ceramic wall tiles for kitchen backsplashes. Glaze-sealed surface resists oil, moisture, and staining.',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80',
  },
]

const specs = [
  { icon: Layers,       label: 'Material',         value: 'Porcelain / Ceramic / Terracotta' },
  { icon: Ruler,        label: 'Formats Available', value: '200mm → 1200mm' },
  { icon: Shield,       label: 'Surface Rating',    value: 'R9 – R11 Anti-Slip' },
  { icon: CheckCircle2, label: 'Certifications',    value: 'ISO 13006 / BS EN' },
]

const features = [
  {
    title: 'Porcelain & Ceramic Range',
    desc: 'Full portfolio from standard ceramic to ultra-compact porcelain — covering walls, floors, wet rooms, and outdoor areas.',
    icon: Grid,
  },
  {
    title: 'Large Format Options',
    desc: 'Formats up to 600×1200 mm with rectified edges for near-seamless grout joints, ideal for modern minimalist interiors.',
    icon: Layers,
  },
  {
    title: 'Anti-Slip Ratings R9–R11',
    desc: 'All floor tiles carry certified DIN 51130 anti-slip ratings. R10/R11 options available for wet rooms, pool decks, and ramps.',
    icon: Shield,
  },
  {
    title: 'Terracotta Roof Tiles',
    desc: 'Traditional fire-baked Roman and flat-profile roof tiles. UV-stable, rain-proof, and engineered for the UAE heat cycle.',
    icon: Wind,
  },
  {
    title: 'Interlocking Pavers',
    desc: 'High-strength concrete interlocking pavers for driveways, plazas, and landscaping. Load-rated for heavy vehicles.',
    icon: Boxes,
  },
  {
    title: 'Mosaic & Décor Collections',
    desc: 'Glass mosaics, encaustic patterns, and printed decorative tiles for pools, feature walls, kitchens, and feature floors.',
    icon: Sparkles,
  },
]

const comparisons = [
  { name: 'Concrete Series',      type: 'Porcelain Floor',   size: '600×600',  finish: 'Matte',    rating: 'R10', use: 'Indoor / Outdoor' },
  { name: 'Marble Luxe',          type: 'Porcelain Floor/Wall', size: '600×1200', finish: 'Polished', rating: 'R9',  use: 'Indoor' },
  { name: 'Mosaic Glass Mix',     type: 'Decorative Wall',   size: '300×300',  finish: 'Gloss',    rating: '—',   use: 'Wall / Pool' },
  { name: 'Natural Stone',        type: 'Porcelain Floor',   size: '450×450',  finish: 'Matt',     rating: 'R10', use: 'Indoor / Outdoor' },
  { name: 'Wood-Look Plank',      type: 'Ceramic Floor',     size: '200×1200', finish: 'Satin',    rating: 'R10', use: 'Indoor' },
  { name: 'Geometric Interlock',  type: 'Ceramic Floor',     size: '200×200',  finish: 'Matt',     rating: 'R10', use: 'Indoor' },
  { name: 'Roof Tile — Roman',    type: 'Terracotta Roof',   size: 'Roman',    finish: 'Natural',  rating: '—',   use: 'Exterior Roof' },
  { name: 'Concrete Interlock',   type: 'Concrete Paver',    size: '200×100',  finish: 'Textured', rating: 'R11', use: 'Driveway / Pathway' },
  { name: 'Kitchen Wall Décor',   type: 'Ceramic Wall',      size: '300×450',  finish: 'Gloss',    rating: '—',   use: 'Kitchen Wall' },
]

const reasons = [
  { title: 'UAE Experts',       desc: '20+ years supplying tiles, roof tiles, and pavers across UAE projects.',       num: '20+',  unit: 'Years' },
  { title: 'Massive Range',     desc: '9 collections covering floors, walls, roofs, driveways, and decorative uses.', num: '9+',   unit: 'Collections' },
  { title: 'Certified Quality', desc: 'ISO 13006 and BS EN certified tiles. Every batch tested before dispatch.',     num: 'ISO',  unit: 'Certified' },
  { title: 'We Set Standards',  desc: 'Expert specification advice and bulk pricing for contractors & developers.',    num: '100%', unit: 'Quality' },
]

/* ═══════════════════════════════════════
   HERO SECTION
═══════════════════════════════════════ */
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
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80"
          alt="Premium tiles interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#F9F6F0]/85" />
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-8 lg:px-16 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 bg-white/70 rounded-full border border-black/5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: ACCENT }} />
              <span className="text-[#555] text-[10px] tracking-[0.2em] uppercase font-medium">Standard Group — Category 05</span>
            </div>

            <h1 className="mb-6">
              <span
                ref={line1Ref}
                className="hero-title-line block font-major text-3xl sm:text-4xl lg:text-5xl text-[#1a1a1a] leading-[1.1] tracking-[0.02em] mb-2 inline-block text-3d-shadow"
              >
                Tiles, Roof Tile
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
                & Interlock
              </span>
            </h1>

            <p className="hero-subtitle text-[#444] text-lg max-w-md leading-relaxed mb-10">
              Nine premium collections — porcelain floors, marble-look tiles, glass mosaics, terracotta roof tiles, and interlocking pavers — built for UAE homes, hotels, and commercial projects.
            </p>

            <div className="hero-cta flex items-center gap-4">
              <a
                href="#products"
                className="magnetic-btn group flex items-center gap-3 bg-[#1a1a1a] text-white px-7 py-3.5 rounded-full text-sm font-medium transition-all duration-300"
                onMouseEnter={e => { e.currentTarget.style.background = ACCENT }}
                onMouseLeave={e => { e.currentTarget.style.background = '#1a1a1a' }}
              >
                Explore Collections
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
                src="https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=900&q=80"
                alt="Premium tile collection"
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

/* ═══════════════════════════════════════
   PRODUCT SHOWCASE
═══════════════════════════════════════ */
function ProductShowcase() {
  const sectionRef    = useRef(null)
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
          <p className="text-[11px] tracking-[0.3em] uppercase font-medium mb-3" style={{ color: ACCENT }}>The Collections</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#1a1a1a] font-light leading-[1.1] mb-4 text-3d-shadow">
            <span ref={headerLine1Ref} className="block font-major tracking-[0.02em]">Nine Collections.</span>
            <span className="magnetic-text block font-serif italic text-[#555]">Every Surface Covered.</span>
          </h2>
          <p className="text-[#666] text-base max-w-lg leading-relaxed">
            From sweeping 1200 mm polished slabs to hand-set glass mosaics, terracotta roof tiles, and heavy-duty interlocking pavers — Standard Group's tile range covers every surface of your project.
          </p>
        </div>

        <div className="product-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map((product) => (
            <div key={product.id} className="product-card group relative h-[400px] cursor-pointer perspective-1000">
              <div className="relative w-full h-full transition-transform duration-500 transform-style-preserve-3d group-hover:rotate-y-180">

                {/* Front Side */}
                <div className="absolute inset-0 bg-white border border-black/[0.04] rounded-2xl overflow-hidden backface-hidden shadow-lg shadow-black/10">
                  <div className="relative h-52 overflow-hidden">
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

                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-poppins text-[#1a1a1a] text-base tracking-[0.02em]">{product.name}</h3>
                      <ArrowUpRight size={13} className="text-[#ccc] transition-colors duration-300" />
                    </div>
                    <p className="text-[#888] text-xs leading-relaxed mb-3">{product.description}</p>
                    <div className="flex items-center justify-between pt-3 border-t border-black/5">
                      <span className="font-poppins text-sm tracking-[0.02em]" style={{ color: ACCENT }}>{product.price}</span>
                      <span className="text-[#bbb] text-[9px] uppercase tracking-wider">Category 05</span>
                    </div>
                  </div>
                </div>

                {/* Back Side */}
                <div
                  className="absolute inset-0 rounded-2xl overflow-hidden backface-hidden rotate-y-180 p-6 flex flex-col items-center justify-center text-white"
                  style={{ background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DARK})` }}
                >
                  <h3 className="font-poppins text-lg font-medium mb-2 text-center">{product.name}</h3>
                  <p className="text-white/70 text-[11px] mb-6 text-center tracking-wider uppercase">{product.size} — {product.type}</p>
                  <div className="grid grid-cols-2 gap-3 w-full">
                    <div className="flex flex-col items-center gap-2 p-3 bg-white/10 rounded-xl">
                      <Shield size={20} className="text-white" />
                      <span className="text-[10px] uppercase tracking-wider text-center">ISO Certified</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 p-3 bg-white/10 rounded-xl">
                      <Layers size={20} className="text-white" />
                      <span className="text-[10px] uppercase tracking-wider text-center">Premium Grade</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 p-3 bg-white/10 rounded-xl">
                      <CheckCircle2 size={20} className="text-white" />
                      <span className="text-[10px] uppercase tracking-wider text-center">Anti-Slip Rated</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 p-3 bg-white/10 rounded-xl">
                      <Sparkles size={20} className="text-white" />
                      <span className="text-[10px] uppercase tracking-wider text-center">Stain Resistant</span>
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

/* ═══════════════════════════════════════
   SPECS SECTION
═══════════════════════════════════════ */
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

          <div>
            <p className="text-[11px] tracking-[0.3em] uppercase font-medium mb-3" style={{ color: ACCENT_LIGHT }}>Technical Excellence</p>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl text-white font-light leading-[1.1] mb-6"
              style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.3), 2px 2px 0 rgba(0,0,0,0.2), 3px 3px 0 rgba(0,0,0,0.1), 4px 4px 8px rgba(0,0,0,0.4)' }}
            >
              <span ref={headerLine1Ref} className="block font-major tracking-[0.02em]">Surface Science</span>
              <span className="magnetic-text block font-serif italic text-[#94a3b8]">Precision.</span>
            </h2>
            <p className="text-[#94a3b8] text-base leading-relaxed mb-10 max-w-md">
              Every tile in our catalogue is fired to ISO 13006 standards, dimensionally rectified for tight grout joints, and tested for slip resistance, water absorption, and breaking strength before it reaches your project.
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
                  <p className="text-white text-lg font-light">{spec.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="relative w-96 h-96 bg-[#334155] rounded-3xl border border-white/10 shadow-xl shadow-black/20 overflow-hidden">
              <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${ACCENT}1a, transparent)` }} />
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
                alt="Tile engineering"
                className="relative w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════
   FEATURES SECTION
═══════════════════════════════════════ */
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
            <span ref={headerLine1Ref} className="block font-major tracking-[0.02em]">Why Our Tiles</span>
            <span className="magnetic-text block font-serif italic text-[#555]">Stand Apart</span>
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

/* ═══════════════════════════════════════
   COMPARISON TABLE
═══════════════════════════════════════ */
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
          <p className="text-[11px] tracking-[0.3em] uppercase font-medium mb-3" style={{ color: ACCENT_LIGHT }}>Compare Collections</p>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl text-white font-light leading-[1.1]"
            style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.3), 2px 2px 0 rgba(0,0,0,0.2), 3px 3px 0 rgba(0,0,0,0.1), 4px 4px 8px rgba(0,0,0,0.4)' }}
          >
            <span ref={headerLine1Ref} className="block font-major tracking-[0.02em]">Find Your</span>
            <span className="magnetic-text block font-serif italic text-[#94a3b8]">Perfect Surface.</span>
          </h2>
        </div>

        <div className="overflow-x-auto bg-[#334155] rounded-2xl border border-white/10 shadow-lg shadow-black/20">
          <table className="w-full min-w-[780px]">
            <thead>
              <tr className="border-b border-white/10">
                {['Collection', 'Type', 'Size (mm)', 'Finish', 'Slip Rating', 'Best Use'].map(h => (
                  <th key={h} className="text-left text-[#94a3b8] text-[10px] tracking-[0.15em] uppercase py-4 px-5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisons.map((row, idx) => (
                <tr key={idx} className="border-b border-white/[0.03] hover:bg-[#1e293b]/50 transition-colors">
                  <td className="py-4 px-5 text-white text-sm font-medium">{row.name}</td>
                  <td className="py-4 px-5 text-[#94a3b8] text-sm">{row.type}</td>
                  <td className="py-4 px-5 text-sm font-medium" style={{ color: ACCENT_LIGHT }}>{row.size}</td>
                  <td className="py-4 px-5 text-[#94a3b8] text-sm">{row.finish}</td>
                  <td className="py-4 px-5 text-[#94a3b8] text-sm">{row.rating}</td>
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

/* ═══════════════════════════════════════
   WHY STANDARD GROUP
═══════════════════════════════════════ */
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
            Your trusted partner for premium tiles, roof tiles, and interlocking pavers across the UAE
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

/* ═══════════════════════════════════════
   CTA SECTION
═══════════════════════════════════════ */
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
          <span ref={headerLine1Ref} className="block font-major tracking-[0.02em]">Ready to Specify?</span>
          <span className="magnetic-text block font-serif italic text-[#94a3b8]">Premium Surfaces Await</span>
        </h2>
        <p className="text-[#94a3b8] text-base max-w-lg mx-auto leading-relaxed mb-10">
          Contact Standard Group today for competitive bulk pricing, sample requests, and expert specification guidance on our full tiles, roof tile, and interlock range.
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

/* ═══════════════════════════════════════
   FOOTER
═══════════════════════════════════════ */

/* ═══════════════════════════════════════
   MAIN PAGE COMPONENT
═══════════════════════════════════════ */
export default function TilesRoofInterlock() {
  return (
    <div className="bg-[#F9F6F0] min-h-screen selection:bg-emerald-600/20 selection:text-[#1a1a1a]">
      {/* Navigation */}

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
