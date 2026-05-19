import React, { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, ArrowUpRight, Droplets, Thermometer, Zap, Shield, ChevronDown, ArrowLeft } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/* ─── PRODUCT DATA ─── */
const products = [
  {
    id: 1,
    name: '30 Liter Horizontal',
    capacity: '30L',
    orientation: 'Horizontal',
    features: ['Fast Heating', 'Wall Mounted', 'Energy Efficient'],
    price: 'AED 450',
    description: 'Compact horizontal design perfect for tight spaces. Advanced heating element delivers hot water in minutes.',
    image: '/Product1/p1i1.JPG',
  },
  {
    id: 2,
    name: '30 Liter Vertical',
    capacity: '30L',
    orientation: 'Vertical',
    features: ['Space Saving', 'Quick Recovery', 'Anti-Corrosion'],
    price: 'AED 420',
    description: 'Sleek vertical profile maximizes wall space while providing reliable hot water for smaller households.',
    image: '/Product1/p130v.JPG',
  },
  {
    id: 3,
    name: '50 Liter Vertical',
    capacity: '50L',
    orientation: 'Vertical',
    features: ['Medium Capacity', 'Dual Safety', 'Low Noise'],
    price: 'AED 580',
    description: 'The perfect balance of capacity and efficiency. Ideal for families of 2-3 with consistent hot water needs.',
    image: '/Product1/p150v.JPG',
  },
  {
    id: 4,
    name: '50 Liter Horizontal',
    capacity: '50L',
    orientation: 'Horizontal',
    features: ['Ceiling Mount', 'Wide Coverage', 'Smart Thermostat'],
    price: 'AED 620',
    description: 'Horizontal mounting option for ceiling or elevated installation. Broad coverage for medium-sized homes.',
    image: '/Product1/p150h.JPG',
  },
  {
    id: 5,
    name: '80 Liter Horizontal',
    capacity: '80L',
    orientation: 'Horizontal',
    features: ['High Capacity', 'Multi-Point', 'Premium Insulation'],
    price: 'AED 850',
    description: 'Large capacity horizontal unit for households requiring sustained hot water across multiple outlets.',
    image: '/Product1/p1i1.JPG',
  },
  {
    id: 6,
    name: '80 Liter Vertical',
    capacity: '80L',
    orientation: 'Vertical',
    features: ['Family Size', 'Rapid Reheat', 'Glass Lined Tank'],
    price: 'AED 820',
    description: 'Our flagship vertical unit. Glass-lined tank with rapid reheat technology for large families.',
    image: '/Product1/p180lv.JPG',
  },
  {
    id: 7,
    name: '15 Liter Round',
    capacity: '15L',
    orientation: 'Round',
    features: ['Ultra Compact', 'Point of Use', 'Instant Heat'],
    price: 'AED 320',
    description: 'Compact round design for point-of-use applications. Perfect under sinks or in small bathrooms.',
    image: '/Product1/p150lr.JPG',
  },
]

const specs = [
  { icon: Thermometer, label: 'Max Temperature', value: '75°C' },
  { icon: Zap, label: 'Power Rating', value: '1.5-3 kW' },
  { icon: Shield, label: 'Tank Material', value: 'Glass-Lined Steel' },
  { icon: Droplets, label: 'Pressure Rating', value: '8 Bar' },
]

/* ─── HERO SECTION ─── */
function HeroSection() {
  const sectionRef = useRef(null)
  const milanoRef = useRef(null)
  const ewhRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-title-line', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out', delay: 0.2 })
      gsap.fromTo('.hero-subtitle', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.6 })
      gsap.fromTo('.hero-cta', { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', delay: 0.8 })

      // Simple up and down float for Milano
      const milanoEl = milanoRef.current
      if (milanoEl) {
        gsap.to(milanoEl, {
          y: -15,
          duration: 2,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Water background image */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1920&q=80" 
          alt="Water background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#F9F6F0]/85" />
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-8 lg:px-16 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div>
            <h1 className="mb-6">
              <span ref={milanoRef} className="hero-title-line block font-major text-3xl sm:text-4xl lg:text-5xl text-[#1a1a1a] leading-[1.1] tracking-[0.02em] mb-2 inline-block text-3d-shadow">
                Milano
              </span>
              <span 
                ref={ewhRef}
                className="hero-title-line magnetic-text block font-serif italic text-4xl sm:text-5xl lg:text-6xl text-[#555] leading-[1.05] inline-block text-3d-shadow"
                style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect()
                  const centerX = rect.left + rect.width / 2
                  const centerY = rect.top + rect.height / 2
                  setMousePos({
                    x: (e.clientX - centerX) * 0.15,
                    y: (e.clientY - centerY) * 0.15
                  })
                }}
                onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
              >
                Electric Water Heaters
              </span>
            </h1>

            <p className="hero-subtitle text-[#444] text-lg max-w-md leading-relaxed mb-10">
              Italian engineering meets UAE reliability. Premium water heating solutions for every space, every need.
            </p>

            <div className="hero-cta flex items-center gap-4">
              <a href="#products" className="magnetic-btn group flex items-center gap-3 bg-[#1a1a1a] text-white px-7 py-3.5 rounded-full text-sm font-medium hover:bg-[#2563eb] transition-all duration-300">
                View Full Range
                <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a href="#specs" className="text-[#666] text-sm font-medium hover:text-[#1a1a1a] transition-colors">
                View Specs
              </a>
            </div>
          </div>

          {/* Right visual - Product Image */}
          <div className="relative flex items-center justify-center">
            <div className="relative w-[520px] h-80 lg:w-[640px] lg:h-96 bg-white rounded-lg shadow-xl border border-black/5 overflow-hidden">
              <img 
                src="/Product1/p1hi.JPG" 
                alt="Milano Water Heater" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative circles */}
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full border border-[#2563eb]/10" />
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
        {
          y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: '.product-grid', start: 'top 85%' }
        }
      )
      
      // Float animation for header line 1
      if (headerLine1Ref.current) {
        gsap.to(headerLine1Ref.current, {
          y: -15,
          duration: 2,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="products" ref={sectionRef} className="relative py-24 lg:py-32 bg-[#F9F6F0]">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
        {/* Header */}
        <div className="mb-16">
          <p className="text-[#2563eb] text-[11px] tracking-[0.3em] uppercase font-medium mb-3">The Collection</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#1a1a1a] font-light leading-[1.1] mb-4 text-3d-shadow">
            <span ref={headerLine1Ref} className="block font-major tracking-[0.02em]">Seven Models.</span>
            <span className="magnetic-text block font-serif italic text-[#555]">Every Need Covered.</span>
          </h2>
          <p className="text-[#666] text-base max-w-lg leading-relaxed">
            From compact 15L point-of-use units to large 80L family systems — Milano delivers precision-engineered comfort.
          </p>
        </div>

        {/* Product Grid */}
        <div className="product-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {products.map((product) => (
            <div
              key={product.id}
              className="product-card group relative h-[380px] cursor-pointer perspective-1000"
            >
              <div className="relative w-full h-full transition-transform duration-500 transform-style-preserve-3d group-hover:rotate-y-180">
                {/* Front Side */}
                <div className="absolute inset-0 bg-white border border-black/[0.04] rounded-2xl overflow-hidden backface-hidden shadow-lg shadow-black/10">
                  {/* Product image area */}
                  <div className="relative h-48 flex items-center justify-center bg-gradient-to-b from-[#fafafa] to-white overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-contain p-4"
                    />
                    {/* Capacity badge */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 bg-white rounded-full border border-black/5 shadow-sm">
                      <span className="text-[#1a1a1a] text-[10px] font-semibold">{product.capacity}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-poppins text-[#1a1a1a] text-base tracking-[0.02em]">{product.name}</h3>
                      <ArrowUpRight size={13} className="text-[#ccc] group-hover:text-[#2563eb] transition-colors duration-300" />
                    </div>
                    <p className="text-[#888] text-xs leading-relaxed mb-3">{product.description}</p>
                    <div className="flex items-center justify-between pt-3 border-t border-black/5">
                      <span className="font-poppins text-[#2563eb] text-sm tracking-[0.02em]">{product.price}</span>
                      <span className="text-[#bbb] text-[9px] uppercase tracking-wider">{product.orientation}</span>
                    </div>
                  </div>
                </div>

                {/* Back Side - Icons */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] rounded-2xl overflow-hidden backface-hidden rotate-y-180 p-6 flex flex-col items-center justify-center text-white">
                  <h3 className="font-poppins text-lg font-medium mb-6 text-center">{product.name}</h3>
                  <div className="grid grid-cols-2 gap-4 w-full">
                    <div className="flex flex-col items-center gap-2 p-3 bg-white/10 rounded-xl">
                      <Droplets size={24} className="text-white" />
                      <span className="text-[10px] uppercase tracking-wider">Water Efficient</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 p-3 bg-white/10 rounded-xl">
                      <Zap size={24} className="text-white" />
                      <span className="text-[10px] uppercase tracking-wider">Energy Saving</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 p-3 bg-white/10 rounded-xl">
                      <Shield size={24} className="text-white" />
                      <span className="text-[10px] uppercase tracking-wider">5 Year Warranty</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 p-3 bg-white/10 rounded-xl">
                      <Thermometer size={24} className="text-white" />
                      <span className="text-[10px] uppercase tracking-wider">Temp Control</span>
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
        {
          y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.specs-grid', start: 'top 85%' }
        }
      )
      
      // Float animation for header line 1
      if (headerLine1Ref.current) {
        gsap.to(headerLine1Ref.current, {
          y: -15,
          duration: 2,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1
        })
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
            <p className="text-[#60a5fa] text-[11px] tracking-[0.3em] uppercase font-medium mb-3">Technical Excellence</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white font-light leading-[1.1] mb-6" style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.3), 2px 2px 0 rgba(0,0,0,0.2), 3px 3px 0 rgba(0,0,0,0.1), 4px 4px 8px rgba(0,0,0,0.4)' }}>
              <span ref={headerLine1Ref} className="block font-major tracking-[0.02em]">Engineering</span>
              <span className="magnetic-text block font-serif italic text-[#94a3b8]">Precision.</span>
            </h2>
            <p className="text-[#94a3b8] text-base leading-relaxed mb-10 max-w-md">
              Every Milano unit is built with Italian precision engineering, featuring advanced safety systems
              and premium materials for decades of reliable service.
            </p>

            <div className="specs-grid grid grid-cols-1 sm:grid-cols-2 gap-4">
              {specs.map((spec) => (
                <div key={spec.label} className="spec-item p-5 bg-[#334155] rounded-xl border border-white/10 shadow-lg shadow-black/20 hover:border-[#60a5fa]/30 hover:shadow-xl hover:shadow-[#2563eb]/20 transition-all duration-300">
                  <spec.icon size={18} className="text-[#60a5fa] mb-2.5" />
                  <h3 className="text-[#94a3b8] text-[10px] tracking-[0.15em] uppercase mb-1">{spec.label}</h3>
                  <p className="text-white text-lg font-light">{spec.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Visual */}
          <div className="relative flex items-center justify-center">
            <div className="relative w-96 h-96 bg-[#334155] rounded-3xl border border-white/10 shadow-xl shadow-black/20 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-[#2563eb]/10 via-transparent to-transparent" />
              <img 
                src="/Product1/p1es.png" 
                alt="Milano Water Heater" 
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



  const features = [
    { title: 'Glass-Lined Tank', desc: 'Porcelain enamel coating prevents corrosion and extends tank life to 15+ years.', icon: Shield },
    { title: 'Dual Safety Valves', desc: 'Pressure relief and temperature cut-off valves for complete peace of mind.', icon: Shield },
    { title: 'Rapid Heat Technology', desc: 'Advanced copper heating elements deliver hot water 40% faster than conventional units.', icon: Zap },
    { title: 'Smart Thermostat', desc: 'Precision temperature control with external adjustment dial.', icon: Thermometer },
    { title: 'Energy Rating A+', desc: 'High-density PUF insulation minimizes heat loss, reducing electricity consumption by 30%.', icon: Zap },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.feature-card',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: '.features-grid', start: 'top 85%' }
        }
      )
      
      // Float animation for header line 1
      if (headerLine1Ref.current) {
        gsap.to(headerLine1Ref.current, {
          y: -15,
          duration: 2,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
        <div className="mb-14">
          <p className="text-[#2563eb] text-[11px] tracking-[0.3em] uppercase font-medium mb-3">Key Features</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#1a1a1a] font-light leading-[1.1] text-3d-shadow">
            <span ref={headerLine1Ref} className="block font-major tracking-[0.02em]">Why Milano</span>
            <span className="magnetic-text block font-serif italic text-[#555]">Stands Apart</span>
          </h2>
        </div>

        <div className="features-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, idx) => (
            <div key={idx} className="feature-card p-7 bg-[#F9F6F0] rounded-2xl border border-black/[0.03] shadow-lg shadow-black/10 hover:shadow-xl transition-shadow duration-300 group">
              <div className="mb-4">
                <span className="text-3xl lg:text-4xl font-light text-[#2563eb]">{feature.title}</span>
              </div>
              <h4 className="text-[#1a1a1a] text-sm font-medium mb-1.5">{feature.title}</h4>
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
      // Float animation for header line 1
      if (headerLine1Ref.current) {
        gsap.to(headerLine1Ref.current, {
          y: -15,
          duration: 2,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const comparisons = [
    { model: '15L Round', heating: '15 min', recovery: '20 min', power: '1.5 kW', suitable: '1 Person' },
    { model: '30L Vertical', heating: '25 min', recovery: '30 min', power: '2.0 kW', suitable: '1-2 Persons' },
    { model: '30L Horizontal', heating: '25 min', recovery: '30 min', power: '2.0 kW', suitable: '1-2 Persons' },
    { model: '50L Vertical', heating: '40 min', recovery: '45 min', power: '2.5 kW', suitable: '2-3 Persons' },
    { model: '50L Horizontal', heating: '40 min', recovery: '45 min', power: '2.5 kW', suitable: '2-3 Persons' },
    { model: '80L Vertical', heating: '55 min', recovery: '60 min', power: '3.0 kW', suitable: '4-5 Persons' },
    { model: '80L Horizontal', heating: '55 min', recovery: '60 min', power: '3.0 kW', suitable: '4-5 Persons' },
  ]

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-[#1e293b]">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
        <div className="mb-12">
          <p className="text-[#60a5fa] text-[11px] tracking-[0.3em] uppercase font-medium mb-3">Compare Models</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white font-light leading-[1.1]" style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.3), 2px 2px 0 rgba(0,0,0,0.2), 3px 3px 0 rgba(0,0,0,0.1), 4px 4px 8px rgba(0,0,0,0.4)' }}>
            <span ref={headerLine1Ref} className="block font-major tracking-[0.02em]">Find Your</span>
            <span className="magnetic-text block font-serif italic text-[#94a3b8]">Perfect Fit.</span>
          </h2>
        </div>

        <div className="overflow-x-auto bg-[#334155] rounded-2xl border border-white/10 shadow-lg shadow-black/20">
          <table className="w-full min-w-[650px]">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left text-[#94a3b8] text-[10px] tracking-[0.15em] uppercase py-4 px-5">Model</th>
                <th className="text-left text-[#94a3b8] text-[10px] tracking-[0.15em] uppercase py-4 px-5">Heating Time</th>
                <th className="text-left text-[#94a3b8] text-[10px] tracking-[0.15em] uppercase py-4 px-5">Recovery</th>
                <th className="text-left text-[#94a3b8] text-[10px] tracking-[0.15em] uppercase py-4 px-5">Power</th>
                <th className="text-left text-[#94a3b8] text-[10px] tracking-[0.15em] uppercase py-4 px-5">Suitable For</th>
              </tr>
            </thead>
            <tbody>
              {comparisons.map((row, idx) => (
                <tr key={idx} className="border-b border-white/[0.03] hover:bg-[#1e293b]/50 transition-colors">
                  <td className="py-4 px-5 text-white text-sm font-medium text-3d-shadow">{row.model}</td>
                  <td className="py-4 px-5 text-[#94a3b8] text-sm">{row.heating}</td>
                  <td className="py-4 px-5 text-[#94a3b8] text-sm">{row.recovery}</td>
                  <td className="py-4 px-5 text-[#60a5fa] text-sm font-medium">{row.power}</td>
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



  const reasons = [
    { title: 'UAE Experts', desc: 'Over 2 decades of trusted service across the Emirates.', num: '20+', unit: 'Years' },
    { title: 'Top Brands', desc: 'Partnered with world-leading manufacturers including Milano.', num: '31+', unit: 'Brands' },
    { title: 'Full Range', desc: 'Building materials, hardware, plumbing, sanitary, electrical & safety.', num: '500+', unit: 'Products' },
    { title: 'We Set Standards', desc: 'Industry-leading quality assurance and after-sales support.', num: '100%', unit: 'Quality' },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.why-card',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.why-grid', start: 'top 85%' }
        }
      )
      
      // Float animation for header line 1
      if (headerLine1Ref.current) {
        gsap.to(headerLine1Ref.current, {
          y: -15,
          duration: 2,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
        <div className="text-center mb-16">
          <p className="text-[#2563eb] text-[11px] tracking-[0.3em] uppercase font-medium mb-3">Why Choose Us</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#1a1a1a] font-light leading-[1.1] text-3d-shadow">
            <span ref={headerLine1Ref} className="block font-major tracking-[0.02em]">Standard Group</span>
            <span className="magnetic-text block font-serif italic text-[#555]">Your Trusted Partner</span>
          </h2>
          <p className="text-[#666] text-base mt-3 max-w-md mx-auto">Your trusted partner for premium building materials in the UAE</p>
        </div>

        <div className="why-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reasons.map((reason, idx) => (
            <div key={idx} className="why-card p-7 bg-[#F9F6F0] rounded-2xl border border-black/[0.03] shadow-lg shadow-black/10 hover:shadow-xl transition-shadow duration-300">
              <div className="mb-4">
                <span className="text-3xl lg:text-4xl font-light text-[#2563eb]">{reason.num}</span>
                <span className="text-[#999] text-xs ml-1.5 uppercase tracking-wider">{reason.unit}</span>
              </div>
              <h4 className="text-[#1a1a1a] text-sm font-medium mb-1.5">{reason.title}</h4>
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
      // Float animation for header line 1
      if (headerLine1Ref.current) {
        gsap.to(headerLine1Ref.current, {
          y: -15,
          duration: 2,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="contact" ref={sectionRef} className="relative py-24 lg:py-32 bg-[#1e293b]">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16 text-center">
        <p className="text-[#60a5fa] text-[11px] tracking-[0.3em] uppercase font-medium mb-4">Get In Touch</p>
        <h2 className="text-3xl sm:text-4xl lg:text-6xl text-white font-light leading-[1.1] mb-4" style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.3), 2px 2px 0 rgba(0,0,0,0.2), 3px 3px 0 rgba(0,0,0,0.1), 4px 4px 8px rgba(0,0,0,0.4)' }}>
          <span ref={headerLine1Ref} className="block font-major tracking-[0.02em]">Ready for Hot Water?</span>
          <span className="magnetic-text block font-serif italic text-[#94a3b8]">Premium Quality</span>
        </h2>
        <p className="text-[#94a3b8] text-base max-w-lg mx-auto leading-relaxed mb-10">
          Contact Standard Group today for competitive pricing, bulk orders, and expert consultation on the perfect Milano water heater for your project.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="mailto:sales@standardgroup.ae" className="magnetic-btn group flex items-center gap-3 bg-[#2563eb] text-white px-8 py-4 rounded-full text-sm font-medium hover:bg-[#1d4ed8] transition-all duration-300 shadow-lg shadow-[#2563eb]/20">
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

/* ─── FOOTER ─── */

/* ─── MAIN PAGE COMPONENT ─── */
export default function MilanoWaterHeaters() {
  return (
    <div className="bg-[#F9F6F0] min-h-screen selection:bg-[#2563eb]/20 selection:text-[#1a1a1a]">
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
