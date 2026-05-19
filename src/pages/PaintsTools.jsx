import React, { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, ArrowUpRight, ArrowLeft, Shield, Layers, Ruler, CheckCircle2, ChevronDown, Paintbrush, Wrench, Zap, Package, Settings, Hammer } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/* ─── ACCENT: Bold Red — tools, energy, construction action ─── */
const ACCENT       = '#dc2626'
const ACCENT_DARK  = '#991b1b'
const ACCENT_LIGHT = '#fca5a5'

/* ─── BRANDS ─── */
const brands = [
  { name: 'National Paints', sub: 'Your World, Our Colours' },
  { name: 'Asian Paints',    sub: 'Har Ghar Kuch Kehta Hai' },
  { name: 'Jotun',           sub: 'Jotun Paints — Protect & Beautify' },
  { name: 'Terraco',         sub: 'Texture & Coating Systems' },
  { name: 'Makita',          sub: 'Power Tools & Accessories' },
]

/* ─── PRODUCT DATA ─── */
const paints = [
  {
    id: 1,
    name: 'National Paints Interior Emulsion',
    brand: 'National Paints',
    category: 'Interior Paint',
    type: 'Acrylic Emulsion',
    size: '4L / 18L',
    finish: 'Matt / Silk / Gloss',
    features: ['Washable', 'Low VOC', 'UAE Climate Formulated'],
    price: 'From AED 38 / 4L',
    description: 'National Paints interior acrylic emulsion for UAE walls and ceilings. Washable, low-VOC, excellent hiding power. Available in matt, silk, and gloss finishes with 1000+ colour options.',
    image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=700&q=80',
  },
  {
    id: 2,
    name: 'National Paints Exterior',
    brand: 'National Paints',
    category: 'Exterior Paint',
    type: 'Acrylic Exterior Emulsion',
    size: '4L / 18L',
    finish: 'Smooth / Texture',
    features: ['UV Resistant', 'Fungal Resistance', 'Weatherproof 10yr'],
    price: 'From AED 52 / 4L',
    description: 'National Paints exterior weather-resistant emulsion for UAE facades. UV stabilised, anti-fungal, and sandstorm resistant. Smooth and texture finishes in full colour range.',
    image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=700&q=80',
  },
  {
    id: 3,
    name: 'Asian Paints Royale Interior',
    brand: 'Asian Paints',
    category: 'Interior Paint',
    type: 'Luxury Emulsion — Silk',
    size: '4L / 18L',
    finish: 'Silk / Sheen',
    features: ['Anti-Bacterial', 'Stain Guard', '2000+ Shades'],
    price: 'From AED 65 / 4L',
    description: 'Asian Paints Royale luxury interior emulsion with anti-bacterial protection and Teflon Surface Guard technology. Effortless cleaning, deep colour depth, and a rich silk finish.',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=700&q=80',
  },
  {
    id: 4,
    name: 'Jotun Jotaplast Interior',
    brand: 'Jotun',
    category: 'Interior Paint',
    type: 'Premium Acrylic Emulsion',
    size: '4L / 18L',
    finish: 'Matt / Silk',
    features: ['Excellent Coverage', 'Scrub Resistant', 'Fast Dry'],
    price: 'From AED 72 / 4L',
    description: 'Jotun Jotaplast premium interior emulsion for walls and ceilings. Excellent opacity and coverage, fast-drying, scrub-resistant, and available in Jotun\'s extensive colour palette.',
    image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=700&q=80',
  },
  {
    id: 5,
    name: 'Jotun Jotashield Exterior',
    brand: 'Jotun',
    category: 'Exterior Paint',
    type: 'Elastomeric Exterior Coating',
    size: '4L / 18L',
    finish: 'Smooth / Fine Texture',
    features: ['Elastomeric', 'Crack Bridging', 'AlgaeShield'],
    price: 'From AED 88 / 4L',
    description: 'Jotun Jotashield Extreme exterior elastomeric coating for UAE facades. Bridges hairline cracks, AlgaeShield protection, certified fade-resistance in extreme UV and heat.',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=700&q=80',
  },
  {
    id: 6,
    name: 'Terraco Texture Coating',
    brand: 'Terraco',
    category: 'Texture & Specialty',
    type: 'Acrylic Texture Render',
    size: '5kg / 25kg',
    finish: 'Sand / Pebble / Scratch',
    features: ['Decorative Textures', 'Exterior Grade', 'Tintable'],
    price: 'From AED 95 / 25kg',
    description: 'Terraco acrylic texture coatings for decorative exterior and interior facades. Sand, pebble, and scratch-coat textures — highly tintable and UV-resistant for UAE climate.',
    image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=700&q=80',
  },
]

const accessories = [
  {
    id: 7,
    name: 'Paint Rollers & Frames',
    brand: 'Accessories',
    category: 'Paint Accessories',
    type: 'Roller Sleeves & Frames',
    size: '7" / 9" / 12"',
    finish: '—',
    features: ['Smooth & Rough Pile', 'All Paint Types', 'Cage Frame'],
    price: 'From AED 8',
    description: 'Professional paint rollers in 7", 9", and 12" widths. Smooth, medium, and long pile sleeves for emulsions, textures, and specialist coatings on walls and ceilings.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=80',
  },
  {
    id: 8,
    name: 'Paint Brushes Set',
    brand: 'Accessories',
    category: 'Paint Accessories',
    type: 'Synthetic & Natural Bristle',
    size: '1" – 4"',
    finish: '—',
    features: ['Cut-In Precision', 'All Paint Types', 'Durable Ferrule'],
    price: 'From AED 5',
    description: 'Full range of paint brushes from 1" to 4" — flat, angled, and round profiles for cutting in, trim work, and detail painting in emulsions, glosses, and primers.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=80',
  },
  {
    id: 9,
    name: 'Scrapers, Putty Knives & Trays',
    brand: 'Accessories',
    category: 'Paint Accessories',
    type: 'Mixing & Application Tools',
    size: 'Various',
    finish: '—',
    features: ['Stainless Steel', 'Roller Trays', 'Masking Tape'],
    price: 'From AED 4',
    description: 'Complete paint accessory range — stainless scrapers, putty knives, roller trays, masking tape, drop sheets, and mixing sticks for professional paint application on UAE projects.',
    image: 'https://images.unsplash.com/photo-1590736704728-f4730bb30770?w=700&q=80',
  },
]

const tools = [
  {
    id: 10,
    name: 'Hand Tools Set',
    brand: 'General Tools',
    category: 'Hand Tools',
    type: 'Hammers, Spanners & Pliers',
    size: 'Full Range',
    finish: '—',
    features: ['CRV Steel', 'Ergonomic Grip', 'Metric & Imperial'],
    price: 'From AED 25',
    description: 'Professional hand tools — claw hammers, ball-peen hammers, combination spanners, adjustable wrenches, pliers sets, and screwdrivers for UAE construction and maintenance.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=80',
  },
  {
    id: 11,
    name: 'Measuring & Layout Tools',
    brand: 'General Tools',
    category: 'Hand Tools',
    type: 'Tape Measures, Levels & Squares',
    size: '3m – 10m',
    finish: '—',
    features: ['Steel Blade', 'Magnetic Tip', 'Spirit Level'],
    price: 'From AED 18',
    description: 'Measuring tapes 3–10m, spirit levels, try squares, chalk lines, and marking tools for precise layout on UAE construction and fit-out sites.',
    image: 'https://images.unsplash.com/photo-1590736704728-f4730bb30770?w=700&q=80',
  },
  {
    id: 12,
    name: 'Makita Drill Bits & Discs',
    brand: 'Makita',
    category: 'Discs & Power Tools Accessories',
    type: 'HSS Drill Bits, Cut-Off & Grinding Discs',
    size: '4" / 4.5" / 7" / 9"',
    finish: '—',
    features: ['HSS Drill Bits', 'Diamond Cut Discs', 'Grinding Wheels'],
    price: 'From AED 12',
    description: 'Makita-compatible HSS drill bits, cut-off discs, grinding wheels, flap discs, and diamond blades in 4"–9" sizes for angle grinders, drills, and power tools on site.',
    image: 'https://images.unsplash.com/photo-1609174156745-3c2d1c978543?w=700&q=80',
  },
  {
    id: 13,
    name: 'Hole Saw & Cup Brush Set',
    brand: 'Makita',
    category: 'Discs & Power Tools Accessories',
    type: 'Bi-Metal Hole Saws & Wire Brushes',
    size: '20mm – 120mm',
    finish: '—',
    features: ['Bi-Metal', 'Wire Cup Brushes', 'Arbor Included'],
    price: 'From AED 22',
    description: 'Bi-metal hole saw sets 20–120mm for drilling clean holes in steel, wood, and plasterboard. Twisted wire cup brushes for weld cleaning, rust removal, and surface prep.',
    image: 'https://images.unsplash.com/photo-1609174156745-3c2d1c978543?w=700&q=80',
  },
]

const allProducts = [...paints, ...accessories, ...tools]

const specs = [
  { icon: Paintbrush,   label: 'Paint Brands',    value: 'National · Asian Paints · Jotun · Terraco' },
  { icon: Layers,       label: 'Paint Systems',   value: 'Interior · Exterior · Texture · Specialty' },
  { icon: Wrench,       label: 'Tools Range',     value: 'Hand Tools · Power Accessories · Discs' },
  { icon: CheckCircle2, label: 'Certifications',  value: 'BS EN 1062 · ASTM D3960 · ISO 9001' },
]

const features = [
  {
    title: 'National Paints — UAE\'s Own',
    desc: 'Formulated in UAE for UAE climate — National Paints delivers interior and exterior coatings proven against extreme UV, heat, humidity, and sandstorms over 50+ years.',
    icon: Paintbrush,
  },
  {
    title: 'Asian Paints Royale Range',
    desc: 'Royale luxury interior emulsions with anti-bacterial Teflon Surface Guard, deep colour depth, and silk finish — the premium choice for high-end UAE residential and hospitality.',
    icon: Layers,
  },
  {
    title: 'Jotun Exterior Systems',
    desc: 'Jotashield Extreme elastomeric facade coatings with AlgaeShield, crack bridging, and certified fade resistance — engineered for UAE\'s harsh solar radiation and coastal environment.',
    icon: Shield,
  },
  {
    title: 'Terraco Decorative Textures',
    desc: 'Sand, pebble, and scratch-coat acrylic texture renders for feature facades, architectural elements, and decorative wall finishes in UAE residential and commercial projects.',
    icon: Settings,
  },
  {
    title: 'Complete Paint Accessories',
    desc: 'Rollers, brushes, trays, scrapers, putty knives, masking tape, and drop sheets — every accessory for professional paint application from first fix to final coat.',
    icon: Package,
  },
  {
    title: 'Makita Power Tool Accessories',
    desc: 'HSS drill bits, cut-off discs, grinding wheels, diamond blades, hole saws, and wire cup brushes — Makita-compatible accessories for every power tool application on site.',
    icon: Zap,
  },
]

const comparisons = [
  { product: 'National Interior',   brand: 'National',  cat: 'Interior',  finish: 'Matt/Silk/Gloss', size: '4L/18L', cert: 'BS EN 1062', use: 'Walls & Ceilings' },
  { product: 'National Exterior',   brand: 'National',  cat: 'Exterior',  finish: 'Smooth/Texture',  size: '4L/18L', cert: 'BS EN 1062', use: 'Facades / External' },
  { product: 'Asian Royale',        brand: 'Asian',     cat: 'Interior',  finish: 'Silk/Sheen',      size: '4L/18L', cert: 'ISO 9001',   use: 'Premium Interiors' },
  { product: 'Jotun Jotaplast',     brand: 'Jotun',     cat: 'Interior',  finish: 'Matt/Silk',       size: '4L/18L', cert: 'ISO 9001',   use: 'Walls & Ceilings' },
  { product: 'Jotun Jotashield',    brand: 'Jotun',     cat: 'Exterior',  finish: 'Smooth/Texture',  size: '4L/18L', cert: 'ISO 9001',   use: 'Facades / Exterior' },
  { product: 'Terraco Texture',     brand: 'Terraco',   cat: 'Texture',   finish: 'Sand/Pebble',     size: '5/25kg', cert: 'ISO 9001',   use: 'Decorative Facades' },
  { product: 'Paint Rollers',       brand: '—',         cat: 'Accessory', finish: '—',               size: '7"/9"/12"', cert: '—',       use: 'Emulsion Application' },
  { product: 'Paint Brushes',       brand: '—',         cat: 'Accessory', finish: '—',               size: '1"–4"',  cert: '—',         use: 'Cut-In / Trim' },
  { product: 'Hand Tools',          brand: 'General',   cat: 'Tools',     finish: 'CRV Steel',       size: 'Full',   cert: '—',         use: 'Site Construction' },
  { product: 'Drill Bits & Discs',  brand: 'Makita',    cat: 'Power Acc', finish: 'HSS / Diamond',   size: '4"–9"',  cert: 'CE',        use: 'Drilling / Cutting' },
  { product: 'Hole Saw Set',        brand: 'Makita',    cat: 'Power Acc', finish: 'Bi-Metal',        size: '20–120mm', cert: 'CE',      use: 'Hole Cutting' },
]

const reasons = [
  { title: '5 Top Brands',       desc: 'National, Asian Paints, Jotun, Terraco & Makita — UAE\'s most trusted paint and tool brands.',   num: '5',    unit: 'Brands' },
  { title: 'Full Range',         desc: '6 paint products, 3 accessory lines, 4 tool categories — complete site supply from one source.', num: '13+',  unit: 'Products' },
  { title: 'UAE Experts',        desc: '20+ years supplying paints and tools to UAE construction, fit-out, and FM contractors.',          num: '20+',  unit: 'Years' },
  { title: 'We Set Standards',   desc: 'BS EN 1062, ASTM D3960, and ISO 9001 certified paint systems with full product data sheets.',    num: '100%', unit: 'Certified' },
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
          src="https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=1920&q=80"
          alt="Paints and tools"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#F9F6F0]/85" />
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-8 lg:px-16 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 bg-white/70 rounded-full border border-black/5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: ACCENT }} />
              <span className="text-[#555] text-[10px] tracking-[0.2em] uppercase font-medium">Standard Group — Category 14</span>
            </div>

            <h1 className="mb-6">
              <span
                ref={line1Ref}
                className="hero-title-line block font-major text-3xl sm:text-4xl lg:text-5xl text-[#1a1a1a] leading-[1.1] tracking-[0.02em] mb-2 inline-block text-3d-shadow"
              >
                Paints & Accessories
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
                & Tools
              </span>
            </h1>

            <p className="hero-subtitle text-[#444] text-lg max-w-md leading-relaxed mb-10">
              National Paints, Asian Paints, Jotun, and Terraco — interior, exterior, and texture coatings. Plus Makita power tool accessories, hand tools, and complete paint application accessories.
            </p>

            <div className="hero-cta flex items-center gap-4">
              <a
                href="#paints"
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
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=900&q=80"
                alt="Paint cans and tools"
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
        <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16">
          {brands.map((brand) => (
            <div key={brand.name} className="flex flex-col items-center gap-1 group cursor-default">
              <span
                className="font-major text-lg lg:text-xl tracking-[0.02em] transition-colors duration-300"
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
   REUSABLE PRODUCT CARD
══════════════════════════════════════ */
function ProductCard({ product, brandColorFn }) {
  return (
    <div className="product-card group relative h-[410px] cursor-pointer perspective-1000">
      <div className="relative w-full h-full transition-transform duration-500 transform-style-preserve-3d group-hover:rotate-y-180">
        {/* Front */}
        <div className="absolute inset-0 bg-white border border-black/[0.04] rounded-2xl overflow-hidden backface-hidden shadow-lg shadow-black/10">
          <div className="relative h-44 overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-white text-[10px] font-semibold" style={{ background: brandColorFn(product.brand) }}>
              {product.brand}
            </div>
            <div className="absolute top-3 right-3 px-2 py-0.5 bg-white/90 backdrop-blur-sm rounded-full border border-black/5 shadow-sm">
              <span className="text-[#1a1a1a] text-[9px] font-semibold">{product.size}</span>
            </div>
          </div>
          <div className="p-5">
            <div className="flex items-center justify-between mb-1.5">
              <h3 className="font-poppins text-[#1a1a1a] text-sm font-medium leading-tight tracking-[0.01em]">{product.name}</h3>
              <ArrowUpRight size={13} className="text-[#ccc] flex-shrink-0 ml-1" />
            </div>
            <span className="inline-block px-2 py-0.5 rounded-full text-[9px] font-medium bg-red-50 text-red-600 mb-2">{product.category}</span>
            <p className="text-[#888] text-xs leading-relaxed mb-2.5 line-clamp-2">{product.description}</p>
            <div className="flex items-center justify-between pt-2.5 border-t border-black/5">
              <span className="font-poppins text-sm" style={{ color: ACCENT }}>{product.price}</span>
              <span className="text-[#bbb] text-[9px] uppercase tracking-wider">{product.finish !== '—' ? product.finish : product.type.split(' ')[0]}</span>
            </div>
          </div>
        </div>
        {/* Back */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden backface-hidden rotate-y-180 p-6 flex flex-col items-center justify-center text-white" style={{ background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DARK})` }}>
          <div className="px-3 py-1 rounded-full text-white text-[10px] font-semibold mb-3" style={{ background: brandColorFn(product.brand) }}>
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
              <span className="text-[9px] uppercase tracking-wider text-center">Certified</span>
            </div>
          </div>
          <div className="mt-5 text-center">
            <span className="text-xl font-poppins font-light">{product.price}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════
   PAINTS SECTION
══════════════════════════════════════ */
function PaintsSection() {
  const sectionRef     = useRef(null)
  const headerLine1Ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.product-card',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.07, ease: 'power3.out',
          scrollTrigger: { trigger: '#paints', start: 'top 85%' } }
      )
      if (headerLine1Ref.current) {
        gsap.to(headerLine1Ref.current, { y: -15, duration: 2, ease: 'sine.inOut', yoyo: true, repeat: -1 })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const brandColor = (brand) => {
    if (brand === 'National Paints') return '#dc2626'
    if (brand === 'Asian Paints')    return '#7c3aed'
    if (brand === 'Jotun')           return '#1d4ed8'
    if (brand === 'Terraco')         return '#15803d'
    return '#374151'
  }

  return (
    <section id="paints" ref={sectionRef} className="relative py-24 lg:py-32 bg-[#F9F6F0]">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
        <div className="mb-14">
          <p className="text-[11px] tracking-[0.3em] uppercase font-medium mb-3" style={{ color: ACCENT }}>Premium Paints</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#1a1a1a] font-light leading-[1.1] mb-4 text-3d-shadow">
            <span ref={headerLine1Ref} className="block font-major tracking-[0.02em]">Six Paint Systems.</span>
            <span className="magnetic-text block font-serif italic text-[#555]">Every Surface Covered.</span>
          </h2>
          <p className="text-[#666] text-base max-w-lg leading-relaxed">
            Interior emulsions, exterior weather coatings, and decorative textures from National Paints, Asian Paints, Jotun, and Terraco — all formulated for UAE climate and authority compliance.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {paints.map((p) => <ProductCard key={p.id} product={p} brandColorFn={brandColor} />)}
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════
   ACCESSORIES SECTION
══════════════════════════════════════ */
function AccessoriesSection() {
  const sectionRef     = useRef(null)
  const headerLine1Ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.acc-card',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '#accessories', start: 'top 85%' } }
      )
      if (headerLine1Ref.current) {
        gsap.to(headerLine1Ref.current, { y: -15, duration: 2, ease: 'sine.inOut', yoyo: true, repeat: -1 })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="accessories" ref={sectionRef} className="relative py-24 lg:py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
        <div className="mb-14">
          <p className="text-[11px] tracking-[0.3em] uppercase font-medium mb-3" style={{ color: ACCENT }}>Application Tools</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#1a1a1a] font-light leading-[1.1] mb-4 text-3d-shadow">
            <span ref={headerLine1Ref} className="block font-major tracking-[0.02em]">Paint Accessories.</span>
            <span className="magnetic-text block font-serif italic text-[#555]">Professional Finish.</span>
          </h2>
          <p className="text-[#666] text-base max-w-lg leading-relaxed">
            Rollers, brushes, trays, scrapers, masking tape, and putty knives — every paint accessory for professional application on UAE walls, ceilings, and facades.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {accessories.map((product) => (
            <div key={product.id} className="acc-card group relative h-[390px] cursor-pointer perspective-1000">
              <div className="relative w-full h-full transition-transform duration-500 transform-style-preserve-3d group-hover:rotate-y-180">
                <div className="absolute inset-0 bg-white border border-black/[0.04] rounded-2xl overflow-hidden backface-hidden shadow-lg shadow-black/10">
                  <div className="relative h-44 overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-full border border-black/5 shadow-sm">
                      <span className="text-[10px] font-semibold" style={{ color: ACCENT }}>Accessory</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-1.5">
                      <h3 className="font-poppins text-[#1a1a1a] text-sm font-medium leading-tight">{product.name}</h3>
                      <ArrowUpRight size={13} className="text-[#ccc] flex-shrink-0 ml-1" />
                    </div>
                    <p className="text-[#888] text-xs leading-relaxed mb-3 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between pt-2.5 border-t border-black/5">
                      <span className="font-poppins text-sm" style={{ color: ACCENT }}>{product.price}</span>
                      <span className="text-[#bbb] text-[9px] uppercase tracking-wider">{product.size}</span>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 rounded-2xl overflow-hidden backface-hidden rotate-y-180 p-6 flex flex-col items-center justify-center text-white" style={{ background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DARK})` }}>
                  <Paintbrush size={32} className="text-white mb-4" />
                  <h3 className="font-poppins text-base font-medium mb-1 text-center">{product.name}</h3>
                  <p className="text-white/70 text-[11px] mb-5 text-center tracking-wider uppercase">{product.type}</p>
                  <div className="grid grid-cols-2 gap-3 w-full">
                    {product.features.map((f) => (
                      <div key={f} className="flex flex-col items-center gap-1.5 p-2.5 bg-white/10 rounded-xl">
                        <CheckCircle2 size={16} className="text-white" />
                        <span className="text-[9px] uppercase tracking-wider text-center leading-tight">{f}</span>
                      </div>
                    ))}
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
   TOOLS SECTION
══════════════════════════════════════ */
function ToolsSection() {
  const sectionRef     = useRef(null)
  const headerLine1Ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.tool-card',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '#tools', start: 'top 85%' } }
      )
      if (headerLine1Ref.current) {
        gsap.to(headerLine1Ref.current, { y: -15, duration: 2, ease: 'sine.inOut', yoyo: true, repeat: -1 })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const toolBrandColor = (brand) => {
    if (brand === 'Makita')         return '#15803d'
    if (brand === 'General Tools')  return '#374151'
    return '#374151'
  }

  return (
    <section id="tools" ref={sectionRef} className="relative py-24 lg:py-32 bg-[#F9F6F0]">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
        <div className="mb-14">
          <p className="text-[11px] tracking-[0.3em] uppercase font-medium mb-3" style={{ color: ACCENT }}>General Tools</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#1a1a1a] font-light leading-[1.1] mb-4 text-3d-shadow">
            <span ref={headerLine1Ref} className="block font-major tracking-[0.02em]">Hand Tools & Discs.</span>
            <span className="magnetic-text block font-serif italic text-[#555]">Power. Precision. Performance.</span>
          </h2>
          <p className="text-[#666] text-base max-w-lg leading-relaxed">
            CRV hand tools, measuring equipment, Makita drill bits, cut-off discs, grinding wheels, hole saws, and wire cup brushes — everything on a UAE construction site.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {tools.map((product) => (
            <div key={product.id} className="tool-card group relative h-[420px] cursor-pointer perspective-1000">
              <div className="relative w-full h-full transition-transform duration-500 transform-style-preserve-3d group-hover:rotate-y-180">
                <div className="absolute inset-0 bg-white border border-black/[0.04] rounded-2xl overflow-hidden backface-hidden shadow-lg shadow-black/10">
                  <div className="relative h-44 overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-white text-[10px] font-semibold" style={{ background: toolBrandColor(product.brand) }}>
                      {product.brand}
                    </div>
                    <div className="absolute top-3 right-3 px-2 py-0.5 bg-white/90 rounded-full border border-black/5 shadow-sm">
                      <span className="text-[9px] font-semibold text-[#1a1a1a]">{product.category === 'Hand Tools' ? 'Hand' : 'Power'}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-1.5">
                      <h3 className="font-poppins text-[#1a1a1a] text-xs font-medium leading-tight">{product.name}</h3>
                      <ArrowUpRight size={12} className="text-[#ccc] flex-shrink-0 ml-1" />
                    </div>
                    <p className="text-[#888] text-[11px] leading-relaxed mb-2.5 line-clamp-3">{product.description}</p>
                    <div className="flex items-center justify-between pt-2.5 border-t border-black/5">
                      <span className="font-poppins text-sm" style={{ color: ACCENT }}>{product.price}</span>
                      <span className="text-[#bbb] text-[9px] uppercase tracking-wider">{product.size}</span>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 rounded-2xl overflow-hidden backface-hidden rotate-y-180 p-5 flex flex-col items-center justify-center text-white" style={{ background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DARK})` }}>
                  <Hammer size={28} className="text-white mb-3" />
                  <h3 className="font-poppins text-sm font-medium mb-1 text-center leading-tight">{product.name}</h3>
                  <p className="text-white/70 text-[10px] mb-4 text-center tracking-wider uppercase">{product.type}</p>
                  <div className="grid grid-cols-2 gap-2 w-full">
                    {product.features.map((f) => (
                      <div key={f} className="flex flex-col items-center gap-1 p-2 bg-white/10 rounded-xl">
                        <CheckCircle2 size={14} className="text-white" />
                        <span className="text-[9px] uppercase tracking-wider text-center leading-tight">{f}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-center"><span className="text-lg font-poppins font-light">{product.price}</span></div>
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
              <span className="magnetic-text block font-serif italic text-[#94a3b8]">UAE Ready. Authority Approved.</span>
            </h2>
            <p className="text-[#94a3b8] text-base leading-relaxed mb-10 max-w-md">
              All paints meet BS EN 1062, ASTM D3960, and ISO 9001 certification. Makita power tool accessories carry CE and EN certification. Full product data sheets and safety data sheets available on request.
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
              <img src="https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800&q=80" alt="Paint cans" className="relative w-full h-full object-cover" />
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
    if (brand === 'National')  return 'bg-red-900/40 text-red-300'
    if (brand === 'Asian')     return 'bg-purple-900/40 text-purple-300'
    if (brand === 'Jotun')     return 'bg-blue-900/40 text-blue-300'
    if (brand === 'Terraco')   return 'bg-green-900/40 text-green-300'
    if (brand === 'Makita')    return 'bg-emerald-900/40 text-emerald-300'
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
            <span className="magnetic-text block font-serif italic text-[#94a3b8]">Paint & Tool System.</span>
          </h2>
        </div>
        <div className="overflow-x-auto bg-[#334155] rounded-2xl border border-white/10 shadow-lg shadow-black/20">
          <table className="w-full min-w-[840px]">
            <thead>
              <tr className="border-b border-white/10">
                {['Product', 'Brand', 'Category', 'Finish / Type', 'Size', 'Standard', 'Best Use'].map(h => (
                  <th key={h} className="text-left text-[#94a3b8] text-[10px] tracking-[0.15em] uppercase py-4 px-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisons.map((row, idx) => (
                <tr key={idx} className="border-b border-white/[0.03] hover:bg-[#1e293b]/50 transition-colors">
                  <td className="py-3.5 px-4 text-white text-sm font-medium">{row.product}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${brandBadge(row.brand)}`}>{row.brand}</span>
                  </td>
                  <td className="py-3.5 px-4 text-[#94a3b8] text-sm">{row.cat}</td>
                  <td className="py-3.5 px-4 text-sm font-medium" style={{ color: ACCENT_LIGHT }}>{row.finish}</td>
                  <td className="py-3.5 px-4 text-[#94a3b8] text-sm">{row.size}</td>
                  <td className="py-3.5 px-4 text-[#94a3b8] text-sm">{row.cert}</td>
                  <td className="py-3.5 px-4 text-[#94a3b8] text-sm">{row.use}</td>
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
          <p className="text-[#666] text-base mt-3 max-w-md mx-auto">Your one-stop supplier for paints, accessories, and tools across the UAE</p>
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
          <span ref={headerLine1Ref} className="block font-major tracking-[0.02em]">Ready to Paint & Build?</span>
          <span className="magnetic-text block font-serif italic text-[#94a3b8]">We Supply Everything</span>
        </h2>
        <p className="text-[#94a3b8] text-base max-w-lg mx-auto leading-relaxed mb-10">
          Contact Standard Group for bulk pricing on National Paints, Asian Paints, Jotun, Terraco, and Makita accessories. Site delivery and technical support across UAE.
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
export default function PaintsTools() {
  return (
    <div className="bg-[#F9F6F0] min-h-screen selection:bg-red-800/20 selection:text-[#1a1a1a]">

      <HeroSection />
      <BrandsStrip />
      <PaintsSection />
      <AccessoriesSection />
      <ToolsSection />
      <SpecsSection />
      <FeaturesSection />
      <ComparisonSection />
      <WhyStandardGroup />
      <CTASection />
    </div>
  )
}
