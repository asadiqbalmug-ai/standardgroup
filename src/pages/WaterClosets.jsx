import React, { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, ArrowUpRight, Droplets, Shield, Sparkles, Waves, ChevronDown, ArrowLeft, Square, CheckCircle2, Ruler } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/* ─── PRODUCT DATA ─── */
const products = [
  {
    id: 1,
    name: 'Model 16316',
    type: 'One-Piece',
    features: ['Rimless Design', 'Soft Close', 'Dual Flush'],
    price: 'AED 1,450',
    description: 'Premium one-piece water closet with rimless technology and soft-close seat. Elegant design with superior hygiene.',
    image: '/WC/16316.jpg',
  },
  {
    id: 2,
    name: 'Model 16831',
    type: 'One-Piece',
    features: ['Elongated Bowl', 'Nano Glaze', 'Water Saving'],
    price: 'AED 1,680',
    description: 'Modern elongated one-piece WC with nano anti-bacterial glaze. Water-saving dual flush system.',
    image: '/WC/16831.jpg',
  },
  {
    id: 3,
    name: 'Model 10862',
    type: 'Wall-Hung',
    features: ['Space Saving', 'Concealed Tank', 'Easy Clean'],
    price: 'AED 2,100',
    description: 'Compact wall-hung toilet with concealed tank. Perfect for modern bathrooms with limited space.',
    image: '/WC/10862.jpg',
  },
  {
    id: 4,
    name: 'Model 11271',
    type: 'Two-Piece',
    features: ['Classic Design', 'S-Trap', 'Durable Ceramic'],
    price: 'AED 980',
    description: 'Traditional two-piece water closet with S-trap configuration. Reliable performance with classic styling.',
    image: '/WC/11271.jpg',
  },
  {
    id: 5,
    name: 'Model 10947',
    type: 'One-Piece',
    features: ['Smart Flush', 'Premium Ceramic', 'Luxury Design'],
    price: 'AED 2,350',
    description: 'Luxury one-piece toilet with smart flush technology. Premium ceramic construction with modern aesthetics.',
    image: '/WC/10947.jpg',
  },
  {
    id: 6,
    name: 'Model 14472',
    type: 'One-Piece',
    features: ['Round Front', 'Compact Size', 'Soft Close'],
    price: 'AED 1,250',
    description: 'Round front one-piece WC with compact dimensions. Ideal for smaller bathrooms without compromising comfort.',
    image: '/WC/14472.jpg',
  },
  {
    id: 7,
    name: 'Model 16550',
    type: 'Wall-Hung',
    features: ['Floating Design', 'Quick Release', 'Rimless'],
    price: 'AED 1,890',
    description: 'Wall-mounted water closet with floating design. Quick-release seat and rimless bowl for easy maintenance.',
    image: '/WC/16550.jpg',
  },
  {
    id: 8,
    name: 'Model 16833',
    type: 'Close-Coupled',
    features: ['Standard Fit', 'Dual Flush', 'Ceramic Build'],
    price: 'AED 850',
    description: 'Standard close-coupled WC with reliable dual flush. Durable ceramic construction for everyday use.',
    image: '/WC/16833.jpg',
  },
  {
    id: 9,
    name: 'Model 10866',
    type: 'Close-Coupled',
    features: ['Compact Form', 'Easy Install', 'Efficient Flush'],
    price: 'AED 920',
    description: 'Compact close-coupled toilet with efficient flush mechanism. Easy installation with space-saving design.',
    image: '/WC/10866.jpg',
  },
]

const specs = [
  { icon: Shield, label: 'Material', value: 'Vitreous China' },
  { icon: Droplets, label: 'Flush Type', value: 'Dual (3/6L)' },
  { icon: CheckCircle2, label: 'Seat Type', value: 'Soft Close UF' },
  { icon: Ruler, label: 'Trap Type', value: 'S-Trap / P-Trap' },
]

const features = [
  { title: 'Rimless Technology', desc: 'Hygienic rimless bowl design prevents bacteria buildup and ensures thorough cleaning with every flush.' },
  { title: 'Soft Close Seat', desc: 'UF soft-close seat prevents slamming and extends seat life with gentle closing mechanism.' },
  { title: 'Dual Flush System', desc: 'Water-saving dual flush with 3L/6L options reduces water consumption by up to 40%.' },
  { title: 'Nano Glaze', desc: 'Anti-bacterial nano coating prevents staining and keeps the bowl cleaner for longer.' },
  { title: 'Premium Ceramic', desc: 'High-grade vitreous china fired at 1280°C for exceptional durability and gloss finish.' },
  { title: 'Easy Clean Design', desc: 'Smooth contours and quick-release seat allow for effortless cleaning and maintenance.' },
]

/* ─── HERO SECTION ─── */
function HeroSection() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-title-line', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out', delay: 0.2 })
      gsap.fromTo('.hero-subtitle', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.6 })
      gsap.fromTo('.hero-cta', { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', delay: 0.8 })

      const titleEl = titleRef.current
      if (titleEl) {
        gsap.to(titleEl, {
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
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1584622050111-993a426fbf0a?w=1920&q=80" 
          alt="Luxury bathroom" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#F9F6F0]/85" />
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-8 lg:px-16 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h1 className="mb-6">
              <span ref={titleRef} className="hero-title-line block font-major text-3xl sm:text-4xl lg:text-5xl text-[#1a1a1a] leading-[1.1] tracking-[0.02em] mb-2 inline-block text-3d-shadow">
                Water Closets
              </span>
              <span 
                ref={subtitleRef}
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
                Premium Sanitary
              </span>
            </h1>

            <p className="hero-subtitle text-[#444] text-lg max-w-md leading-relaxed mb-10">
              European design meets Middle Eastern standards. Premium water closets engineered for comfort, hygiene, and lasting performance.
            </p>

            <div className="hero-cta flex items-center gap-4">
              <a href="#products" className="magnetic-btn group flex items-center gap-3 bg-[#1a1a1a] text-white px-7 py-3.5 rounded-full text-sm font-medium hover:bg-[#7C3AED] transition-all duration-300">
                View Collection
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a href="#specs" className="magnetic-btn text-[#666] text-sm font-medium hover:text-[#1a1a1a] transition-colors flex items-center gap-1.5">
                View Specs
                <ChevronDown size={14} />
              </a>
            </div>
          </div>

          <div className="relative hidden lg:flex items-center justify-center">
            <div className="relative w-96 h-96 bg-[#334155] rounded-3xl border border-white/10 shadow-xl shadow-black/20 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-[#7C3AED]/10 via-transparent to-transparent" />
              <Square size={120} className="text-[#7C3AED] relative" strokeWidth={1} />
            </div>
          </div>
        </div>
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
    <section id="products" ref={sectionRef} className="relative py-24 lg:py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
        <div className="mb-14">
          <p className="text-[#7C3AED] text-[11px] tracking-[0.3em] uppercase font-medium mb-3">Collection</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#1a1a1a] font-light leading-[1.1] text-3d-shadow">
            <span ref={headerLine1Ref} className="block font-major tracking-[0.02em]">Our Range</span>
            <span className="magnetic-text block font-serif italic text-[#555]">Water Closets</span>
          </h2>
          <p className="text-[#666] text-base max-w-lg leading-relaxed mt-4">
            From wall-hung to close-coupled, one-piece to two-piece — find the perfect water closet for every bathroom style.
          </p>
        </div>

        <div className="product-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map((product) => (
            <div
              key={product.id}
              className="product-card group relative h-[380px] cursor-pointer perspective-1000"
            >
              <div className="relative w-full h-full transition-transform duration-500 transform-style-preserve-3d group-hover:rotate-y-180">
                <div className="absolute inset-0 bg-white border border-black/[0.04] rounded-2xl overflow-hidden backface-hidden shadow-lg shadow-black/10">
                  <div className="relative h-48 flex items-center justify-center bg-gradient-to-b from-[#fafafa] to-white overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-[#f0f0f0] to-white">
                      <Square size={80} className="text-[#7C3AED]/30" strokeWidth={1} />
                    </div>
                    <div className="absolute top-3 left-3 px-2.5 py-1 bg-white rounded-full border border-black/5 shadow-sm">
                      <span className="text-[#1a1a1a] text-[10px] font-semibold">{product.type}</span>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-poppins text-[#1a1a1a] text-base tracking-[0.02em]">{product.name}</h3>
                      <ArrowUpRight size={13} className="text-[#ccc] group-hover:text-[#7C3AED] transition-colors duration-300" />
                    </div>
                    <p className="text-[#888] text-xs leading-relaxed mb-3">{product.description}</p>
                    <div className="flex items-center justify-between pt-3 border-t border-black/5">
                      <span className="font-poppins text-[#7C3AED] text-sm tracking-[0.02em]">{product.price}</span>
                      <span className="text-[#bbb] text-[9px] uppercase tracking-wider">{product.type}</span>
                    </div>
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-br from-[#7C3AED] to-[#6D28D9] rounded-2xl overflow-hidden backface-hidden rotate-y-180 p-6 flex flex-col items-center justify-center text-white">
                  <h3 className="font-poppins text-lg font-medium mb-6 text-center">{product.name}</h3>
                  <div className="grid grid-cols-2 gap-4 w-full">
                    <div className="flex flex-col items-center gap-2 p-3 bg-white/10 rounded-xl">
                      <Droplets size={24} className="text-white" />
                      <span className="text-[10px] uppercase tracking-wider">Water Efficient</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 p-3 bg-white/10 rounded-xl">
                      <Sparkles size={24} className="text-white" />
                      <span className="text-[10px] uppercase tracking-wider">Easy Clean</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 p-3 bg-white/10 rounded-xl">
                      <Shield size={24} className="text-white" />
                      <span className="text-[10px] uppercase tracking-wider">Durable</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 p-3 bg-white/10 rounded-xl">
                      <Droplets size={24} className="text-white" />
                      <span className="text-[10px] uppercase tracking-wider">Hygienic</span>
                    </div>
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
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: '.specs-grid', start: 'top 85%' } }
      )

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
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white font-light leading-[1.1] mb-4 text-3d-shadow">
              <span ref={headerLine1Ref} className="block font-major tracking-[0.02em]">Engineering</span>
              <span className="magnetic-text block font-serif italic text-[#94a3b8]">Excellence.</span>
            </h2>
            <p className="text-[#94a3b8] text-base leading-relaxed mb-10 max-w-md">
              Every water closet is crafted with precision engineering, featuring advanced hygiene systems and premium vitreous china for decades of reliable service.
            </p>

            <div className="specs-grid grid grid-cols-1 sm:grid-cols-2 gap-4">
              {specs.map((spec) => (
                <div key={spec.label} className="spec-item p-5 bg-[#334155] rounded-xl border border-white/10 shadow-lg shadow-black/20 hover:border-[#7C3AED]/30 hover:shadow-xl hover:shadow-[#7C3AED]/20 transition-all duration-300">
                  <spec.icon size={18} className="text-[#7C3AED] mb-2.5" />
                  <h3 className="text-[#94a3b8] text-[10px] tracking-[0.15em] uppercase mb-1">{spec.label}</h3>
                  <p className="text-white text-lg font-light">{spec.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="relative w-96 h-96 bg-[#334155] rounded-3xl border border-white/10 shadow-xl shadow-black/20 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-[#7C3AED]/10 via-transparent to-transparent" />
              <Square size={140} className="text-[#7C3AED]/40 relative" strokeWidth={0.5} />
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
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: '.features-grid', start: 'top 85%' } }
      )

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
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-[#F9F6F0]">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
        <div className="mb-14">
          <p className="text-[#7C3AED] text-[11px] tracking-[0.3em] uppercase font-medium mb-3">Key Features</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#1a1a1a] font-light leading-[1.1] text-3d-shadow">
            <span ref={headerLine1Ref} className="block font-major tracking-[0.02em]">Why Our</span>
            <span className="magnetic-text block font-serif italic text-[#555]">WCs Stand Apart</span>
          </h2>
        </div>

        <div className="features-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, idx) => (
            <div key={idx} className="feature-card p-7 bg-[#F9F6F0] rounded-2xl border border-black/[0.03] shadow-lg shadow-black/10 hover:shadow-xl transition-shadow duration-300 group">
              <div className="mb-4">
                <span className="text-3xl lg:text-4xl font-light text-[#7C3AED]">{feature.title}</span>
              </div>
              <h4 className="font-poppins text-[#1a1a1a] text-xs font-medium mb-1.5">{feature.title}</h4>
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
      gsap.fromTo('.comparison-row',
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.06, ease: 'power3.out', scrollTrigger: { trigger: '.comparison-table', start: 'top 85%' } }
      )

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

  const models = products.slice(0, 4)

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
        <div className="mb-14 text-center">
          <p className="text-[#7C3AED] text-[11px] tracking-[0.3em] uppercase font-medium mb-3">Compare</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#1a1a1a] font-light leading-[1.1] text-3d-shadow">
            <span ref={headerLine1Ref} className="block font-major tracking-[0.02em]">Model</span>
            <span className="magnetic-text block font-serif italic text-[#555]">Comparison</span>
          </h2>
        </div>

        <div className="comparison-table overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-black/5">
                <th className="text-left py-4 px-4 text-[#999] text-[10px] uppercase tracking-wider font-medium">Feature</th>
                {models.map((m) => (
                  <th key={m.id} className="text-center py-4 px-4 text-[#1a1a1a] font-medium text-sm">{m.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {['Type', 'Flush', 'Seat', 'Glaze'].map((feat, i) => (
                <tr key={feat} className="comparison-row border-b border-black/[0.03] hover:bg-[#F9F6F0]/50 transition-colors">
                  <td className="py-4 px-4 text-[#666] text-sm">{feat}</td>
                  {models.map((m) => (
                    <td key={m.id} className="text-center py-4 px-4 text-[#888] text-xs">
                      {feat === 'Type' ? m.type : feat === 'Flush' ? 'Dual 3/6L' : feat === 'Seat' ? 'Soft Close' : 'Nano'}
                    </td>
                  ))}
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

  const reasons = [
    { title: 'UAE Experts', desc: 'Over 2 decades of trusted service across the Emirates.', num: '20+', unit: 'Years' },
    { title: 'Top Brands', desc: 'Partnered with world-leading sanitary manufacturers.', num: '31+', unit: 'Brands' },
    { title: 'Full Range', desc: 'Complete bathroom solutions from fixtures to fittings.', num: '500+', unit: 'Products' },
    { title: 'We Set Standards', desc: 'Industry-leading quality assurance and after-sales support.', num: '100%', unit: 'Quality' },
  ]

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
        <div className="mb-14 text-center">
          <p className="text-[#7C3AED] text-[11px] tracking-[0.3em] uppercase font-medium mb-3">Why Choose Us</p>
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
                <span className="text-3xl lg:text-4xl font-light text-[#7C3AED]">{reason.num}</span>
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
        <p className="text-[#7C3AED] text-[11px] tracking-[0.3em] uppercase font-medium mb-4">Get In Touch</p>
        <h2 className="text-3xl sm:text-4xl lg:text-6xl text-white font-light leading-[1.1] mb-4" style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.3), 2px 2px 0 rgba(0,0,0,0.2), 3px 3px 0 rgba(0,0,0,0.1), 4px 4px 8px rgba(0,0,0,0.4)' }}>
          <span ref={headerLine1Ref} className="block font-major tracking-[0.02em]">Ready to Upgrade?</span>
          <span className="magnetic-text block font-serif italic text-[#94a3b8]">Premium Sanitary</span>
        </h2>
        <p className="text-[#94a3b8] text-base max-w-lg mx-auto leading-relaxed mb-10">
          Contact Standard Group today for competitive pricing, bulk orders, and expert consultation on the perfect water closets for your project.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="mailto:sales@standardgroup.ae" className="magnetic-btn group flex items-center gap-3 bg-[#7C3AED] text-white px-8 py-4 rounded-full text-sm font-medium hover:bg-[#6D28D9] transition-all duration-300 shadow-lg shadow-[#7C3AED]/20">
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
export default function WaterClosets() {
  return (
    <div className="bg-[#F9F6F0] min-h-screen selection:bg-[#7C3AED]/20 selection:text-[#1a1a1a]">

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
