import React, { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, ArrowUpRight, ArrowLeft, Shield, Layers, CheckCircle2, ChevronDown, Zap, Sun, Wind, Package, Settings, Star } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/* ─── ACCENT: Warm Amber — light, energy, illumination ─── */
const ACCENT       = '#b45309'
const ACCENT_DARK  = '#78350f'
const ACCENT_LIGHT = '#fbbf24'

/* ─── PRODUCT DATA — every label from the image ─── */
const products = [
  {
    id: 1,
    name: 'LED Spot Light & Downlights',
    category: 'LED Spot Light / Lamp / Bulb & Candles',
    type: 'GU10 · MR16 · COB Downlight',
    size: '5W – 20W',
    wattage: '5–20W',
    features: ['GU10 & MR16', 'Warm / Cool White', 'Dimmable Option'],
    price: 'From AED 8 / pc',
    description: 'GU10, MR16, and COB recessed LED spotlights and downlights in 5W–20W. Warm white, cool white, and neutral options. Dimmable variants available for residential and commercial UAE fit-out.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80',
  },
  {
    id: 2,
    name: 'LED Bulbs, Lamps & Candles',
    category: 'LED Spot Light / Lamp / Bulb & Candles',
    type: 'E27 · B22 · E14 LED Bulbs',
    size: '7W – 30W',
    wattage: '7–30W',
    features: ['E27 / B22 / E14', '80% Energy Saving', 'Long Life 25,000hr'],
    price: 'From AED 5 / pc',
    description: 'E27, B22, and E14 LED retrofit bulbs, globe lamps, and candle lamps 7W–30W. 80% more efficient than halogen, 25,000hr lifespan, instant-on, warm and cool white for UAE homes and offices.',
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a35a10b24?w=700&q=80',
  },
  {
    id: 3,
    name: 'Focus Light — LED Spotlight',
    category: 'Focus Light',
    type: 'LED Track & Spike Spotlight',
    size: '10W – 50W',
    wattage: '10–50W',
    features: ['Adjustable Beam', 'Track & Ground Spike', 'IP65 Rated'],
    price: 'From AED 35',
    description: 'LED adjustable focus spotlights for garden landscaping, display lighting, and track installations. IP65 waterproof, 10W–50W, beam angle 15°–60°, powder-coated black and silver finish.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=80',
  },
  {
    id: 4,
    name: 'Wall Lamp — Decorative',
    category: 'Wall Lamp',
    type: 'Decorative Indoor & Outdoor Wall Lantern',
    size: 'E27 Base — Various',
    wattage: 'E27 Lamp',
    features: ['Arabic & Classic Style', 'Antique Brass & Black', 'Indoor / Outdoor'],
    price: 'From AED 55',
    description: 'Decorative Arabic-style and classic wall lanterns in antique brass and matt black finishes for UAE villas, hotel lobbies, and courtyard entrances. E27 base, suitable for LED or traditional lamps.',
    image: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=700&q=80',
  },
  {
    id: 5,
    name: 'Flower Lamp & Solar Light',
    category: 'Flower Lamp Solar',
    type: 'Foldable Flower Solar LED Panel',
    size: '45W – 120W Solar',
    wattage: '45–120W Solar',
    features: ['Foldable Petals', 'Built-In Solar Panel', 'Remote Control'],
    price: 'From AED 95',
    description: 'Foldable flower-design solar LED work and area lights with built-in solar panel, rechargeable battery, and remote control. 45W–120W for outdoor areas, campsites, and off-grid UAE locations.',
    image: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=700&q=80',
  },
  {
    id: 6,
    name: 'Magnetic Flood Light',
    category: 'Magnetic Flood Light',
    type: 'Magnetic Base LED Flood Light',
    size: '30W – 100W',
    wattage: '30–100W',
    features: ['Strong Magnet Base', 'Portable & Fixed', 'IP65 Waterproof'],
    price: 'From AED 45',
    description: 'LED flood lights with powerful magnetic base for instant attachment to steel structures, scaffolding, plant machinery, and site equipment. IP65 rated, 30W–100W, warm and cool white.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=80',
  },
  {
    id: 7,
    name: 'LED Strip Light',
    category: 'LED Strip Light',
    type: 'SMD 2835 / 5050 LED Strip Roll',
    size: '5m / 10m Roll — 12V / 24V',
    wattage: '4.8–14.4W/m',
    features: ['SMD 2835 / 5050', 'RGB & Single Colour', 'IP20 / IP65'],
    price: 'From AED 18 / 5m',
    description: 'SMD 2835 and 5050 LED strip lights in 5m and 10m rolls, 12V and 24V. Single colour and RGB. IP20 for indoor coves and IP65 for bathroom and outdoor use. Adhesive backing, cuttable at 50mm intervals.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80',
  },
  {
    id: 8,
    name: 'LED Wall Light',
    category: 'LED Wall Light',
    type: 'Recessed & Surface LED Wall Washer',
    size: '3W – 18W',
    wattage: '3–18W',
    features: ['Warm / Cool White', 'Recessed & Surface', 'Aluminium Body'],
    price: 'From AED 22',
    description: 'Modern recessed and surface-mount LED wall lights in 3W–18W for corridor, staircase, and feature-wall illumination in UAE apartments, hotels, and commercial fit-out. Aluminium die-cast body.',
    image: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=700&q=80',
  },
  {
    id: 9,
    name: 'LED Flood Light — Standard',
    category: 'Flood Light / LED Solar / Rechargeable',
    type: 'High-Power LED Flood Light',
    size: '50W – 2000W',
    wattage: '50–2000W',
    features: ['IP65 Rated', 'Die-Cast Aluminium', '50W–2000W Range'],
    price: 'From AED 38',
    description: 'High-power LED flood lights 50W–2000W for UAE sports courts, construction sites, car parks, and building facades. Die-cast aluminium housing, IP65, 120° beam, 50,000hr lifespan.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=80',
  },
  {
    id: 10,
    name: 'Solar LED Flood Light',
    category: 'Flood Light / LED Solar / Rechargeable',
    type: 'All-in-One Solar Flood Light',
    size: '50W – 400W Solar Equivalent',
    wattage: '50–400W Solar',
    features: ['Motion Sensor', 'Remote Control', 'Auto Dusk-to-Dawn'],
    price: 'From AED 75',
    description: 'All-in-one solar LED flood lights with motion sensor, remote control, and dusk-to-dawn auto function. 50W–400W solar equivalent for UAE villa perimeters, parking, and off-grid outdoor areas.',
    image: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=700&q=80',
  },
  {
    id: 11,
    name: 'Rechargeable Portable LED Light',
    category: 'Flood Light / LED Solar / Rechargeable',
    type: 'Rechargeable Work Light',
    size: '20W – 100W',
    wattage: '20–100W',
    features: ['Li-Ion Battery', 'USB-C Charging', 'Site & Emergency Use'],
    price: 'From AED 65',
    description: 'Rechargeable lithium-ion LED work lights 20W–100W for construction sites, power outages, and outdoor events. USB-C fast charging, folding stand, and carry handle for portable UAE site use.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=80',
  },
  {
    id: 12,
    name: 'LED Linear Light',
    category: 'LED Linear Light',
    type: 'Surface & Suspended Linear LED',
    size: '600mm / 1200mm / 1500mm',
    wattage: '18W / 36W / 48W',
    features: ['Surface & Suspended', 'Linkable', 'Office & Retail'],
    price: 'From AED 42',
    description: 'Surface-mount and suspended LED linear lights in 600mm, 1200mm, and 1500mm. 18W, 36W, and 48W. Linkable end-to-end for continuous runs in offices, showrooms, and retail fit-out.',
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a35a10b24?w=700&q=80',
  },
  {
    id: 13,
    name: 'Surface Panel Light',
    category: 'Surface Panel Light',
    type: 'Round & Square LED Surface Panel',
    size: '6W – 48W',
    wattage: '6–48W',
    features: ['Round & Square', 'Neutral & Warm White', 'Ultra-Slim'],
    price: 'From AED 25',
    description: 'Ultra-slim round and square surface-mount LED panel lights 6W–48W for UAE offices, clinics, and retail. Even light distribution, long life 50,000hr, and easy clip or screw mount installation.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80',
  },
  {
    id: 14,
    name: 'T5 & T8 LED Bracket',
    category: 'T5 & T8 LED Bracket',
    type: 'T5 & T8 Fluorescent LED Replacement',
    size: '600mm / 1200mm / 1500mm',
    wattage: '9W / 18W / 22W',
    features: ['Direct Wire / Plug-In', 'T5 & T8 Compatible', 'Cool & Warm White'],
    price: 'From AED 15',
    description: 'LED T5 and T8 tube replacements with bracket in 600mm, 1200mm, and 1500mm. Direct wire and plug-in options. Drop-in replacement for fluorescent tubes in UAE factories, warehouses, and workshops.',
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a35a10b24?w=700&q=80',
  },
  {
    id: 15,
    name: 'Pest Killer — UV Electric Trap',
    category: 'Pest Killer',
    type: 'UV Electric Insect Killer',
    size: '10W / 20W / 40W',
    wattage: '10–40W UV',
    features: ['UV Attraction Lamp', 'Electric Grid Kill', 'Wall & Hanging Mount'],
    price: 'From AED 55',
    description: 'UV electric insect killer traps 10W–40W for UAE restaurants, hotels, food stores, and homes. UV fluorescent attraction lamp, high-voltage grid, removable collection tray, wall and hanging mount.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=80',
  },
]

const categoryGroups = [
  { key: 'bulbs',   label: 'LED Spot Light / Lamp / Bulb & Candles',  heading: 'Brilliant LED.',      sub: 'Every Base. Every Shape.',      ids: [1, 2],       cols: 2 },
  { key: 'focus',   label: 'Focus Light · Wall Lamp · Flower Solar',  heading: 'Accent & Ambience.',  sub: 'Focus, Wall & Solar.',          ids: [3, 4, 5],    cols: 3 },
  { key: 'strip',   label: 'Magnetic Flood · Strip · Wall Light',     heading: 'Define the Space.',   sub: 'Strip, Wall & Magnetic.',       ids: [6, 7, 8],    cols: 3 },
  { key: 'flood',   label: 'Flood Light / LED Solar / Rechargeable',  heading: 'Light the Night.',    sub: 'Flood, Solar & Rechargeable.',  ids: [9, 10, 11],  cols: 3 },
  { key: 'linear',  label: 'LED Linear · Surface Panel · T5/T8 · Pest Killer', heading: 'Complete the Space.', sub: 'Linear, Panel, Tube & More.',  ids: [12, 13, 14, 15], cols: 4 },
]

const specs = [
  { icon: Zap,          label: 'Power Range',         value: '5W LED Bulb — 2000W Flood' },
  { icon: Sun,          label: 'Solar Range',         value: '45W – 400W Solar Equivalent' },
  { icon: Layers,       label: 'Tube Sizes',          value: '600mm · 1200mm · 1500mm' },
  { icon: CheckCircle2, label: 'Certifications',      value: 'CE · RoHS · IP65 · LM80' },
]

const features = [
  {
    title: 'LED Bulbs — 80% Energy Saving',
    desc: 'E27, B22, and E14 LED retrofit bulbs 7W–30W replace traditional halogen and incandescent lamps at 80% lower energy consumption — 25,000hr lifespan for UAE homes and offices.',
    icon: Zap,
  },
  {
    title: 'Solar LED Flood & Flower Lights',
    desc: 'All-in-one solar flood lights with motion sensor and remote control, plus foldable flower solar work lights — zero running cost, ideal for UAE villas, gardens, and off-grid areas.',
    icon: Sun,
  },
  {
    title: 'High-Power LED Flood Lights',
    desc: 'Die-cast aluminium LED flood lights 50W–2000W with IP65 protection for UAE sports courts, construction sites, car parks, and building facade illumination at 50,000hr lifespan.',
    icon: Star,
  },
  {
    title: 'LED Strip & Wall Lights',
    desc: 'SMD 2835/5050 RGB and single-colour strips in IP20/IP65 for coves, bathrooms, and outdoor use, plus modern recessed and surface LED wall lights for UAE interior fit-out.',
    icon: Wind,
  },
  {
    title: 'Linear, Panel & T5/T8 Tubes',
    desc: 'Linkable LED linear lights, ultra-slim surface panels, and direct-wire T5/T8 LED tube replacements — the complete overhead lighting solution for UAE offices, clinics, and retail.',
    icon: Layers,
  },
  {
    title: 'UV Pest Killer & Rechargeable Lights',
    desc: 'UV electric insect killer traps for UAE restaurants and hotels, plus rechargeable Li-Ion LED work lights for construction sites, power outages, and outdoor events.',
    icon: Package,
  },
]

const comparisons = [
  { product: 'LED Spot / Downlight',  cat: 'Downlight',   watts: '5–20W',     ip: 'IP20',    cert: 'CE / RoHS',  use: 'Residential / Office' },
  { product: 'LED Bulbs & Candles',   cat: 'Retrofit',    watts: '7–30W',     ip: '—',       cert: 'CE / RoHS',  use: 'General Lighting' },
  { product: 'Focus / Spotlight',     cat: 'Spotlight',   watts: '10–50W',    ip: 'IP65',    cert: 'CE',         use: 'Garden / Track' },
  { product: 'Decorative Wall Lamp',  cat: 'Wall Lantern',watts: 'E27 Base',  ip: 'IP44',    cert: '—',          use: 'Villa / Hotel' },
  { product: 'Flower Solar Light',    cat: 'Solar',       watts: '45–120W',   ip: 'IP65',    cert: 'CE',         use: 'Outdoor / Off-Grid' },
  { product: 'Magnetic Flood Light',  cat: 'Flood',       watts: '30–100W',   ip: 'IP65',    cert: 'CE',         use: 'Site / Machinery' },
  { product: 'LED Strip Light',       cat: 'Strip',       watts: '4.8–14W/m', ip: 'IP20/65', cert: 'CE / RoHS',  use: 'Cove / Bathroom' },
  { product: 'LED Wall Light',        cat: 'Wall',        watts: '3–18W',     ip: 'IP20',    cert: 'CE',         use: 'Corridor / Feature' },
  { product: 'LED Flood Light',       cat: 'Flood',       watts: '50–2000W',  ip: 'IP65',    cert: 'CE / LM80',  use: 'Sports / Facades' },
  { product: 'Solar Flood Light',     cat: 'Solar',       watts: '50–400W',   ip: 'IP65',    cert: 'CE',         use: 'Perimeter / Parking' },
  { product: 'Rechargeable Light',    cat: 'Portable',    watts: '20–100W',   ip: '—',       cert: 'CE',         use: 'Site / Emergency' },
  { product: 'LED Linear Light',      cat: 'Linear',      watts: '18–48W',    ip: 'IP20',    cert: 'CE',         use: 'Office / Retail' },
  { product: 'Surface Panel Light',   cat: 'Panel',       watts: '6–48W',     ip: 'IP20',    cert: 'CE / RoHS',  use: 'Clinics / Office' },
  { product: 'T5 & T8 LED Bracket',  cat: 'Tube',        watts: '9–22W',     ip: 'IP20',    cert: 'CE',         use: 'Factory / Warehouse' },
  { product: 'Pest Killer UV',        cat: 'Pest Control',watts: '10–40W UV', ip: '—',       cert: 'CE',         use: 'Restaurant / Hotel' },
]

const reasons = [
  { title: 'Complete Range',    desc: '15 product lines — from 5W LED bulbs to 2000W flood lights, solar, and pest control.',          num: '15+',  unit: 'Products' },
  { title: 'Energy Saving',     desc: 'LED technology saves 70–80% energy versus traditional lamps — lower bills on every UAE project.', num: '80%',  unit: 'Energy Save' },
  { title: 'UAE Experts',       desc: '20+ years supplying LED and lighting solutions to UAE construction, hospitality, and FM.',        num: '20+',  unit: 'Years' },
  { title: 'We Set Standards',  desc: 'CE, RoHS, IP65, and LM80 certified products — accepted by UAE municipality and DEWA.',          num: '100%', unit: 'Certified' },
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
        <img src="https://images.unsplash.com/photo-1513506003901-1e6a35a10b24?w=1920&q=80" alt="Electric lights" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#F9F6F0]/85" />
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-8 lg:px-16 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 bg-white/70 rounded-full border border-black/5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: ACCENT }} />
              <span className="text-[#555] text-[10px] tracking-[0.2em] uppercase font-medium">Standard Group — Category 18</span>
            </div>

            <h1 className="mb-6">
              <span
                ref={line1Ref}
                className="hero-title-line block font-major text-3xl sm:text-4xl lg:text-5xl text-[#1a1a1a] leading-[1.1] tracking-[0.02em] mb-2 inline-block text-3d-shadow"
              >
                Electric Lights & Bulbs
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
                Illuminate Every Space.
              </span>
            </h1>

            <p className="hero-subtitle text-[#444] text-lg max-w-md leading-relaxed mb-10">
              LED bulbs, spotlights, flood lights, solar lights, strip lights, wall lamps, linear panels, T5/T8 brackets, and pest killers — the complete lighting range for UAE residential, commercial, and industrial projects.
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
              <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80" alt="LED lighting" className="w-full h-full object-cover" />
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
   PRODUCT CARD
══════════════════════════════════════ */
function ProductCard({ product }) {
  const catColor = (cat) => {
    if (cat.includes('Bulb') || cat.includes('Spot') || cat.includes('Lamp')) return 'bg-amber-50 text-amber-700'
    if (cat.includes('Solar') || cat.includes('Flower'))  return 'bg-yellow-50 text-yellow-700'
    if (cat.includes('Flood'))   return 'bg-orange-50 text-orange-700'
    if (cat.includes('Strip'))   return 'bg-purple-50 text-purple-700'
    if (cat.includes('Linear') || cat.includes('Panel') || cat.includes('T5') || cat.includes('T8')) return 'bg-blue-50 text-blue-700'
    if (cat.includes('Pest'))    return 'bg-green-50 text-green-700'
    return 'bg-slate-100 text-slate-600'
  }

  return (
    <div className="group relative h-[420px] cursor-pointer perspective-1000">
      <div className="relative w-full h-full transition-transform duration-500 transform-style-preserve-3d group-hover:rotate-y-180">
        {/* Front */}
        <div className="absolute inset-0 bg-white border border-black/[0.04] rounded-2xl overflow-hidden backface-hidden shadow-lg shadow-black/10">
          <div className="relative h-48 overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-white text-[10px] font-semibold" style={{ background: ACCENT }}>
              {product.wattage}
            </div>
            <div className="absolute top-3 right-3 px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-full border border-black/5 shadow-sm">
              <span className="text-[9px] font-semibold text-[#1a1a1a]">{product.size}</span>
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
          <Zap size={26} className="text-white mb-3" />
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
              <span className="text-[9px] uppercase tracking-wider text-center">CE / RoHS</span>
            </div>
          </div>
          <div className="mt-5 text-center"><span className="text-xl font-poppins font-light">{product.price}</span></div>
        </div>
      </div>
    </div>
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
      gsap.fromTo('.prod-card',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: 'power3.out',
          scrollTrigger: { trigger: '#products', start: 'top 85%' } }
      )
      if (headerLine1Ref.current) {
        gsap.to(headerLine1Ref.current, { y: -15, duration: 2, ease: 'sine.inOut', yoyo: true, repeat: -1 })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const colClass = (n) => {
    if (n === 2) return 'grid-cols-1 md:grid-cols-2'
    if (n === 3) return 'grid-cols-1 md:grid-cols-3'
    return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  }

  return (
    <section id="products" ref={sectionRef} className="relative py-24 lg:py-32 bg-[#F9F6F0]">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
        <div className="mb-16">
          <p className="text-[11px] tracking-[0.3em] uppercase font-medium mb-3" style={{ color: ACCENT }}>The Full Range</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#1a1a1a] font-light leading-[1.1] mb-4 text-3d-shadow">
            <span ref={headerLine1Ref} className="block font-major tracking-[0.02em]">Fifteen Lighting Products.</span>
            <span className="magnetic-text block font-serif italic text-[#555]">One Complete Solution.</span>
          </h2>
          <p className="text-[#666] text-base max-w-xl leading-relaxed">
            LED bulbs to 2000W flood lights, solar panels, strip lights, wall lamps, linear panels, tube brackets, and UV pest killers — everything to light any UAE space.
          </p>
        </div>

        <div className="space-y-20">
          {categoryGroups.map((grp) => {
            const grpProducts = products.filter(p => grp.ids.includes(p.id))
            return (
              <div key={grp.key}>
                <div className="mb-8">
                  <span className="inline-block px-3 py-1 rounded-full text-[9px] font-semibold tracking-[0.15em] uppercase text-white mb-2" style={{ background: ACCENT }}>{grp.label}</span>
                  <h3 className="text-xl sm:text-2xl font-major text-[#1a1a1a] tracking-[0.02em]">
                    {grp.heading} <span className="font-serif italic font-normal text-[#777]">{grp.sub}</span>
                  </h3>
                </div>
                <div className={`grid gap-5 ${colClass(grp.cols)}`}>
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
              <span ref={headerLine1Ref} className="block font-major tracking-[0.02em]">CE Certified.</span>
              <span className="magnetic-text block font-serif italic text-[#94a3b8]">RoHS. IP65. LM80. UAE Ready.</span>
            </h2>
            <p className="text-[#94a3b8] text-base leading-relaxed mb-10 max-w-md">
              All LED products carry CE and RoHS certification. Outdoor and flood lights are IP65 rated. High-power LEDs meet LM80 lumen maintenance testing. Full product data sheets and photometric reports available.
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
              <img src="https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=800&q=80" alt="LED lighting array" className="relative w-full h-full object-cover" />
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
            <span ref={headerLine1Ref} className="block font-major tracking-[0.02em]">Why Our Lighting</span>
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
    if (cat === 'Downlight' || cat === 'Retrofit' || cat === 'Spotlight') return 'bg-amber-900/40 text-amber-300'
    if (cat === 'Solar') return 'bg-yellow-900/40 text-yellow-300'
    if (cat === 'Flood') return 'bg-orange-900/40 text-orange-300'
    if (cat === 'Strip') return 'bg-purple-900/40 text-purple-300'
    if (cat === 'Wall' || cat === 'Wall Lantern') return 'bg-pink-900/40 text-pink-300'
    if (cat === 'Linear' || cat === 'Panel' || cat === 'Tube') return 'bg-blue-900/40 text-blue-300'
    if (cat === 'Portable') return 'bg-teal-900/40 text-teal-300'
    return 'bg-green-900/40 text-green-300'
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
            <span className="magnetic-text block font-serif italic text-[#94a3b8]">Lighting Solution.</span>
          </h2>
        </div>
        <div className="overflow-x-auto bg-[#334155] rounded-2xl border border-white/10 shadow-lg shadow-black/20">
          <table className="w-full min-w-[820px]">
            <thead>
              <tr className="border-b border-white/10">
                {['Product', 'Category', 'Wattage', 'IP Rating', 'Certification', 'Best Use'].map(h => (
                  <th key={h} className="text-left text-[#94a3b8] text-[10px] tracking-[0.15em] uppercase py-4 px-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisons.map((row, idx) => (
                <tr key={idx} className="border-b border-white/[0.03] hover:bg-[#1e293b]/50 transition-colors">
                  <td className="py-3.5 px-4 text-white text-sm font-medium">{row.product}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${catBadge(row.cat)}`}>{row.cat}</span>
                  </td>
                  <td className="py-3.5 px-4 text-sm font-medium" style={{ color: ACCENT_LIGHT }}>{row.watts}</td>
                  <td className="py-3.5 px-4 text-[#94a3b8] text-sm">{row.ip}</td>
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
          <p className="text-[#666] text-base mt-3 max-w-md mx-auto">Your complete LED and lighting supply partner across the UAE</p>
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
          <span ref={headerLine1Ref} className="block font-major tracking-[0.02em]">Ready to Light Up?</span>
          <span className="magnetic-text block font-serif italic text-[#94a3b8]">We Supply the Glow</span>
        </h2>
        <p className="text-[#94a3b8] text-base max-w-lg mx-auto leading-relaxed mb-10">
          Contact Standard Group for bulk pricing on LED bulbs, flood lights, solar lights, strip lights, panels, T5/T8 tubes, and all lighting accessories. Fast delivery across UAE.
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
export default function ElectricLights() {
  return (
    <div className="bg-[#F9F6F0] min-h-screen selection:bg-amber-800/20 selection:text-[#1a1a1a]">

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
