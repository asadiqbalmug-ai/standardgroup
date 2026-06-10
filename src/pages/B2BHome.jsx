import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Phone, Mail, MapPin, ArrowRight, Truck, ShieldCheck, PackageCheck, Clock, ChevronRight, Search } from 'lucide-react'
import { productCategories, brands } from '../data/products'

/* ─── DATA ─────────────────────────────────────────────── */

const featuredCategories = [
  { name: 'Tiles & Interlock', slug: '/tiles-roof-interlock', img: '/pics/1tile.JPG',       count: 10 },
  { name: 'Blocks & Aggregates', slug: '/blocks-sands',       img: '/pics/1cinderblock.JPG', count: 10 },
  { name: 'Steel & Rebar',       slug: '/steel',              img: '/pics/1rebar.JPG',       count: 10 },
  { name: 'Sanitary Ware',       slug: '/sanitary-ware',      img: '/pics/1sanitary.JPG',    count: 10 },
  { name: 'Water Closets',       slug: '/water-closets',      img: '/pics/1wc.JPG',          count: 9  },
  { name: 'Wash Basins & Sinks', slug: '/wash-basins',        img: '/pics/1sink.JPG',        count: 8  },
  { name: 'Interlock Pavers',    slug: '/tiles-roof-interlock', img: '/pics/1interlock.JPG', count: 6  },
  { name: 'Interior Finishes',   slug: '/paints-tools',       img: '/pics/1interior.JPG',    count: 12 },
]

const trustBadges = [
  { icon: <Truck size={20} />,        title: 'Fast Delivery',         desc: 'Abu Dhabi same-day' },
  { icon: <ShieldCheck size={20} />,  title: 'Certified Products',    desc: 'UAE & international std.' },
  { icon: <PackageCheck size={20} />, title: 'Order on Demand',       desc: 'Bulk & custom quantities' },
  { icon: <Clock size={20} />,        title: 'Support Team',          desc: 'Respond within hours' },
]

const testimonials = [
  { name: 'Ahmed Al-Rashid',   company: 'Al-Rashid Construction LLC', role: 'Project Manager',  text: 'Standard Group has been our go-to supplier for 3 years. Competitive prices and always on time. The quality is consistent across every order.',        rating: 5 },
  { name: 'Mohammed Hassan',   company: 'Hassan Builders',            role: 'Owner',             text: 'We switched for our Abu Dhabi villa projects. Their team understands what contractors need — no delays, no excuses, just results.',                   rating: 5 },
  { name: 'Saeed Al-Mansouri', company: 'Mansouri Contracting',       role: 'Procurement Head',  text: 'Bulk order discounts cut our material costs by 15%. They stock everything from cement to sanitary ware. One supplier for the entire project.',       rating: 5 },
]

const whyUs = [
  { n: '20+',  label: 'Years in UAE',     sub: 'Established 2003' },
  { n: '31+',  label: 'Global Brands',    sub: 'Authorized dealer' },
  { n: '500+', label: 'Products',         sub: 'Always in stock' },
  { n: '2',    label: 'Locations',        sub: 'Abu Dhabi' },
]

/* ─── COMPONENT ────────────────────────────────────────── */

export default function B2BHome() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      // Hero text stagger
      gsap.fromTo(['.h-tag', '.h-title', '.h-body', '.h-btns', '.h-stats'],
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65, stagger: 0.12, ease: 'power3.out', delay: 0.15 }
      )
      // Section fade-ups
      gsap.utils.toArray('.fade-up').forEach(el => {
        gsap.fromTo(el, { y: 30, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true }
        })
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div className="min-h-screen bg-white font-onest">

      {/* ── TOP BAR ── */}
      <div className="bg-[#0F766E] text-white text-xs py-2 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span>🇦🇪 Abu Dhabi, UAE — National & International Fulfillment Available</span>
          <div className="flex items-center gap-6">
            <a href="tel:+971555599508" className="flex items-center gap-1.5 hover:text-white/80 transition-colors">
              <Phone size={12} /> +971 55 559 9508
            </a>
            <a href="mailto:info@standardgroup.ae" className="flex items-center gap-1.5 hover:text-white/80 transition-colors">
              <Mail size={12} /> info@standardgroup.ae
            </a>
          </div>
        </div>
      </div>

      {/* ── HEADER ── */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
              <img src="/sglogocion.png" alt="Standard Group" className="w-9 h-9 object-contain" />
              <div className="hidden sm:block leading-tight">
                <span className="font-montserrat font-bold text-[#0c0c0b] text-sm block">Standard Group</span>
                <span className="font-montserrat text-[#0F766E] text-[10px] font-semibold">Building Materials, UAE</span>
              </div>
            </Link>

            {/* Search bar (center) */}
            <div className="flex-1 max-w-xl mx-auto hidden md:flex items-center border border-gray-300 rounded overflow-hidden">
              <input
                type="text"
                placeholder="Search products — tiles, cement, steel, gypsum..."
                className="flex-1 px-4 py-2.5 text-sm outline-none font-onest"
              />
              <button className="bg-[#0F766E] px-5 py-2.5 text-white flex items-center gap-1.5 text-sm font-montserrat font-bold hover:bg-[#0D6B64] transition-colors">
                <Search size={14} /> Search
              </button>
            </div>

            {/* Right nav */}
            <nav className="hidden lg:flex items-center gap-5 flex-shrink-0 ml-auto">
              <Link to="/products" className="font-poppins text-[#444] text-sm hover:text-[#0F766E] transition-colors">Products</Link>
              <Link to="/about"    className="font-poppins text-[#444] text-sm hover:text-[#0F766E] transition-colors">About</Link>
              <Link to="/contact"  className="font-poppins text-[#444] text-sm hover:text-[#0F766E] transition-colors">Contact</Link>
              <a href="https://wa.me/971504654613" target="_blank" rel="noreferrer"
                className="bg-[#0F766E] text-white px-4 py-2 text-sm font-montserrat font-bold rounded hover:bg-[#0D6B64] transition-colors">
                Quick Enquiry
              </a>
            </nav>

            <button className="lg:hidden ml-auto p-2 text-[#444]" onClick={() => setMenuOpen(v => !v)}>
              {menuOpen
                ? <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
              }
            </button>
          </div>

          {/* Category nav bar */}
          <div className="hidden lg:flex items-center gap-0 border-t border-gray-100 overflow-x-auto scrollbar-hide">
            {productCategories.slice(0, 12).map((cat, i) => (
              <Link key={i} to={`/${cat.slug}`}
                className="whitespace-nowrap px-4 py-2.5 text-xs font-poppins text-[#555] hover:text-[#0F766E] hover:bg-gray-50 transition-colors border-b-2 border-transparent hover:border-[#0F766E]">
                {cat.name}
              </Link>
            ))}
            <Link to="/products" className="whitespace-nowrap px-4 py-2.5 text-xs font-poppins text-[#0F766E] font-bold hover:bg-gray-50">
              View All →
            </Link>
          </div>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 px-4 py-4">
            <div className="flex flex-col gap-3 mb-4">
              <Link to="/products" className="font-poppins text-[#444] py-1">Products</Link>
              <Link to="/about"    className="font-poppins text-[#444] py-1">About</Link>
              <Link to="/contact"  className="font-poppins text-[#444] py-1">Contact</Link>
            </div>
            <a href="tel:+971555599508" className="flex items-center gap-2 text-[#0F766E] font-montserrat font-bold text-sm">
              <Phone size={14} /> +971 55 559 9508
            </a>
          </div>
        )}
      </header>

      {/* ── 1. HERO BANNER ── */}
      <section className="relative bg-[#0c0c0b] overflow-hidden">
        {/* Background video with overlay */}
        <div className="absolute inset-0">
          <video
            autoPlay muted loop playsInline
            className="w-full h-full object-cover opacity-40"
            poster="/pics/1rebar.JPG"
          >
            <source src="/standardgrouphero.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0c0c0b] via-[#0c0c0b]/75 to-[#0c0c0b]/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <span className="h-tag inline-block bg-[#0F766E] text-white text-xs font-montserrat font-bold uppercase tracking-widest px-3 py-1.5 mb-5">
            Abu Dhabi's #1 Building Materials Supplier
          </span>
          <h1 className="h-title font-montserrat font-bold text-white text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-5 max-w-2xl">
            Everything Your<br />
            Project Needs —<br />
            <span className="text-[#14B8A6]">In One Place.</span>
          </h1>
          <p className="h-body font-onest text-white/70 text-base md:text-lg max-w-xl mb-8">
            Cement, Steel, Tiles, Sanitary Ware, Waterproofing, Gypsum, Paints, Plumbing &amp; more.
            Serving contractors and distributors across UAE since 2003. National &amp; international delivery available.
          </p>
          <div className="h-btns flex flex-wrap gap-4 mb-12">
            <Link to="/products"
              className="inline-flex items-center gap-2 bg-[#0F766E] text-white px-7 py-3.5 font-montserrat font-bold text-sm uppercase tracking-wide hover:bg-[#14B8A6] transition-colors">
              Browse All Products <ArrowRight size={16} />
            </Link>
            <a href="https://wa.me/971504654613?text=Hi, I need a price list for building materials."
              target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 border-2 border-white/40 text-white px-7 py-3.5 font-montserrat font-bold text-sm uppercase tracking-wide hover:border-white hover:bg-white/10 transition-colors">
              Request Price List
            </a>
          </div>
          {/* Quick stats */}
          <div className="h-stats flex flex-wrap gap-8">
            {whyUs.map((s, i) => (
              <div key={i} className="text-white">
                <span className="font-montserrat font-bold text-3xl text-[#14B8A6]">{s.n}</span>
                <p className="font-onest text-sm text-white/70">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. TRUST BADGES ── */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-200">
            {trustBadges.map((b, i) => (
              <div key={i} className="fade-up flex items-center gap-3 px-6 py-5">
                <div className="w-10 h-10 bg-[#0F766E]/10 rounded-full flex items-center justify-center text-[#0F766E] flex-shrink-0">
                  {b.icon}
                </div>
                <div>
                  <p className="font-montserrat font-bold text-[#0c0c0b] text-sm">{b.title}</p>
                  <p className="font-onest text-[#888] text-xs">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. BRAND LOGOS (ticker) ── */}
      <section className="py-10 bg-gray-50 border-b border-gray-200 overflow-hidden">
        <p className="fade-up text-center font-montserrat text-[11px] tracking-[0.25em] uppercase text-[#888] mb-6">
          Authorized Dealer — {brands.length}+ Trusted Brands
        </p>
        <div className="relative flex gap-0 overflow-hidden">
          {/* Two copies for seamless loop */}
          {[0, 1].map(copy => (
            <div key={copy} className="flex gap-10 items-center animate-[marquee_30s_linear_infinite] whitespace-nowrap px-5">
              {brands.map((b, i) => (
                <span key={i} className="font-montserrat font-bold text-sm text-[#555] hover:text-[#0F766E] transition-colors cursor-default px-2">
                  {b.name}
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. PRODUCT CATEGORIES (image grid like MIH) ── */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="fade-up flex items-end justify-between mb-8">
            <div>
              <h2 className="font-montserrat font-bold text-2xl md:text-3xl text-[#0c0c0b]">Featured Products</h2>
              <p className="font-onest text-[#666] text-sm mt-1">Click any category to view full range</p>
            </div>
            <Link to="/products" className="hidden md:inline-flex items-center gap-1 text-[#0F766E] font-montserrat font-bold text-sm hover:gap-2 transition-all">
              All Products <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {featuredCategories.map((cat, i) => (
              <Link key={i} to={cat.slug}
                className="fade-up group relative overflow-hidden rounded bg-gray-100 aspect-[4/3] block">
                <img src={cat.img} alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <span className="font-montserrat font-bold text-white text-sm block">{cat.name}</span>
                  <span className="font-onest text-white/70 text-xs">{cat.count} Products</span>
                </div>
                <div className="absolute top-3 right-3 bg-[#0F766E] text-white text-[10px] font-montserrat font-bold px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  View Range
                </div>
              </Link>
            ))}
          </div>

          {/* Full category list below */}
          <div className="fade-up mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
            {productCategories.map((cat, i) => (
              <Link key={i} to={`/${cat.slug}`}
                className="flex items-center gap-2 px-3 py-2.5 border border-gray-200 rounded text-sm text-[#444] hover:border-[#0F766E] hover:text-[#0F766E] hover:bg-[#0F766E]/5 transition-all group">
                <span className="text-base">{cat.icon}</span>
                <span className="font-onest text-xs">{cat.name}</span>
                <ChevronRight size={12} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-[#0F766E]" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. GALLERY / SHOWROOM ── */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="fade-up grid lg:grid-cols-2 gap-8 items-center mb-10">
            <div>
              <span className="font-montserrat text-[11px] tracking-[0.2em] uppercase text-[#0F766E] mb-2 block">Our Locations</span>
              <h2 className="font-montserrat font-bold text-2xl md:text-3xl text-[#0c0c0b]">Two Showrooms in Abu Dhabi</h2>
              <p className="font-onest text-[#666] text-sm mt-3 max-w-lg">
                Visit us at Baniyas West for our full product display, or our Mafraq warehouse for bulk pickup.
                Walk in — no appointment needed.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white border border-gray-200 rounded p-4">
                <MapPin size={18} className="text-[#0F766E] mb-2" />
                <p className="font-montserrat font-bold text-sm text-[#0c0c0b]">Baniyas West</p>
                <p className="font-onest text-xs text-[#666] mt-1">Main Showroom, Abu Dhabi</p>
                <a href="tel:+971555599508" className="font-montserrat font-bold text-[#0F766E] text-xs mt-2 block">+971 55 559 9508</a>
              </div>
              <div className="bg-white border border-gray-200 rounded p-4">
                <MapPin size={18} className="text-[#0F766E] mb-2" />
                <p className="font-montserrat font-bold text-sm text-[#0c0c0b]">Mafraq</p>
                <p className="font-onest text-xs text-[#666] mt-1">Warehouse, Abu Dhabi</p>
                <a href="tel:+971504654613" className="font-montserrat font-bold text-[#0F766E] text-xs mt-2 block">+971 50 465 4613</a>
              </div>
            </div>
          </div>

          {/* Photo grid using real pics */}
          <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
            {['/pics/1tile.JPG','/pics/4tile.JPG','/pics/1interlock.JPG','/pics/3interlock.JPG','/pics/1rebar.JPG',
              '/pics/1cinderblock.JPG','/pics/2cinderblock.JPG','/pics/1interior.JPG','/pics/2interior.JPG','/pics/1sanitary.JPG'
            ].map((src, i) => (
              <div key={i} className={`fade-up overflow-hidden rounded bg-gray-200 ${i === 0 ? 'col-span-2 row-span-2' : ''}`}>
                <img src={src} alt={`Gallery ${i+1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 aspect-square" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. TESTIMONIALS ── */}
      <section className="py-14 bg-[#0c0c0b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="fade-up text-center mb-10">
            <span className="font-montserrat text-[11px] tracking-[0.2em] uppercase text-[#14B8A6] mb-2 block">Client Reviews</span>
            <h2 className="font-montserrat font-bold text-2xl md:text-3xl text-white">What Contractors Say About Us</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <div key={i} className="fade-up bg-white/5 border border-white/10 rounded p-6">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <svg key={j} width="14" height="14" viewBox="0 0 24 24" fill="#14B8A6"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  ))}
                </div>
                <p className="font-onest text-white/75 text-sm leading-relaxed mb-5">"{t.text}"</p>
                <div className="border-t border-white/10 pt-4">
                  <p className="font-montserrat font-bold text-white text-sm">{t.name}</p>
                  <p className="font-onest text-[#14B8A6] text-xs">{t.role} — {t.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. WHY STANDARD GROUP ── */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="fade-up grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="font-montserrat text-[11px] tracking-[0.2em] uppercase text-[#0F766E] mb-3 block">Why Choose Us</span>
              <h2 className="font-montserrat font-bold text-2xl md:text-3xl text-[#0c0c0b] mb-4">
                Abu Dhabi's Most Reliable<br />Building Materials Supplier
              </h2>
              <p className="font-onest text-[#666] text-sm leading-relaxed mb-6">
                We are an authorized dealer and official distributor for 31+ international building material brands.
                From a single bag of cement to a full project's worth of steel, tiles, waterproofing, and finishes —
                we supply it all, with documentation, warranties, and technical support.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Authorized distributor for RAKCC, Emirates Steel, MAPEI, Knauf, Jotun, Asian Paints & more',
                  'Bulk pricing for contractors and project procurement teams',
                  'National delivery across UAE — Dubai, Al Ain, Sharjah & Northern Emirates',
                  'International export available — GCC, Asia, Africa',
                  'Technical consultation for material selection & specifications',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm font-onest text-[#444]">
                    <span className="w-5 h-5 rounded-full bg-[#0F766E] text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3">
                <Link to="/about"
                  className="inline-flex items-center gap-2 bg-[#0F766E] text-white px-6 py-3 font-montserrat font-bold text-sm rounded hover:bg-[#0D6B64] transition-colors">
                  About Standard Group <ArrowRight size={15} />
                </Link>
                <Link to="/contact"
                  className="inline-flex items-center gap-2 border border-gray-300 text-[#444] px-6 py-3 font-montserrat font-bold text-sm rounded hover:border-[#0F766E] hover:text-[#0F766E] transition-colors">
                  Contact Us
                </Link>
              </div>
            </div>
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { n: '20+', t: 'Years of Experience', c: 'Established 2003, Abu Dhabi' },
                { n: '31+', t: 'Authorized Brands',   c: 'Global & regional brands' },
                { n: '500+',t: 'Products in Stock',   c: 'Across 17 categories' },
                { n: '2',   t: 'Showroom Locations',  c: 'Baniyas West & Mafraq, AD' },
              ].map((s, i) => (
                <div key={i} className="fade-up bg-gray-50 border border-gray-200 rounded p-6 text-center">
                  <span className="font-montserrat font-bold text-4xl text-[#0F766E]">{s.n}</span>
                  <p className="font-montserrat font-bold text-[#0c0c0b] text-sm mt-1">{s.t}</p>
                  <p className="font-onest text-[#888] text-xs mt-0.5">{s.c}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="bg-[#0F766E] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-montserrat font-bold text-white text-2xl">Need a quote for your project?</h3>
            <p className="font-onest text-white/80 text-sm mt-1">Contact us on WhatsApp for a fast response and competitive pricing.</p>
          </div>
          <div className="flex flex-wrap gap-3 flex-shrink-0">
            <a href="https://wa.me/971504654613?text=Hi, I'd like to request a quote for building materials."
              target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 bg-white text-[#0F766E] px-6 py-3 font-montserrat font-bold text-sm rounded hover:bg-gray-100 transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.13 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp Now
            </a>
            <a href="tel:+971555599508"
              className="inline-flex items-center gap-2 border-2 border-white text-white px-6 py-3 font-montserrat font-bold text-sm rounded hover:bg-white/10 transition-colors">
              <Phone size={16} /> Call Us
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#111] text-white pt-12 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src="/sglogocion.png" alt="Standard Group" className="w-8 h-8 object-contain" />
                <span className="font-montserrat font-bold text-white">Standard Group</span>
              </div>
              <p className="font-onest text-white/50 text-sm mb-5">
                UAE's trusted B2B building materials supplier. National &amp; international fulfillment. Serving contractors, distributors &amp; builders since 2003.
              </p>
              <div className="flex gap-2">
                {[
                  { href: 'https://wa.me/971504654613', label: 'WhatsApp', path: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.13 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z' },
                ].map((s, i) => (
                  <a key={i} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}
                    className="w-8 h-8 bg-white/10 rounded flex items-center justify-center hover:bg-[#0F766E] transition-colors">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d={s.path}/></svg>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-montserrat font-bold text-white text-sm uppercase tracking-wider mb-4">Products</h4>
              <ul className="space-y-2">
                {[['Electric Water Heaters','/milano-water-heaters'],['Water Closets','/water-closets'],
                  ['Tiles & Interlock','/tiles-roof-interlock'],['Cement','/cement'],
                  ['Steel','/steel'],['Waterproofing','/water-proofing'],
                  ['Gypsum Board','/gypsum-board'],['View All →','/products']].map(([l,h]) => (
                  <li key={l}><Link to={h} className="font-onest text-white/50 text-sm hover:text-[#14B8A6] transition-colors">{l}</Link></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-montserrat font-bold text-white text-sm uppercase tracking-wider mb-4">Company</h4>
              <ul className="space-y-2">
                {[['About Us','/about'],['Contact','/contact'],['Products','/products']].map(([l,h]) => (
                  <li key={l}><Link to={h} className="font-onest text-white/50 text-sm hover:text-[#14B8A6] transition-colors">{l}</Link></li>
                ))}
              </ul>
              <h4 className="font-montserrat font-bold text-white text-sm uppercase tracking-wider mt-6 mb-3">Authorized Brands</h4>
              <p className="font-onest text-white/40 text-xs leading-relaxed">
                RAKCC · Emirates Steel · MAPEI · Knauf · Jotun · Asian Paints · Terraco · Wefatherm · Awazel · Polybit · Milano · GROHE · Jaquar + 18 more
              </p>
            </div>

            <div>
              <h4 className="font-montserrat font-bold text-white text-sm uppercase tracking-wider mb-4">Contact Us</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Phone size={14} className="text-[#14B8A6] mt-0.5 flex-shrink-0" />
                  <div>
                    <a href="tel:+971555599508" className="font-onest text-white/60 text-sm hover:text-white block">+971 55 559 9508</a>
                    <a href="tel:+971504654613" className="font-onest text-white/60 text-sm hover:text-white block">+971 50 465 4613</a>
                  </div>
                </li>
                <li className="flex items-center gap-2">
                  <Mail size={14} className="text-[#14B8A6] flex-shrink-0" />
                  <a href="mailto:info@standardgroup.ae" className="font-onest text-white/60 text-sm hover:text-white">info@standardgroup.ae</a>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin size={14} className="text-[#14B8A6] mt-0.5 flex-shrink-0" />
                  <div className="font-onest text-white/50 text-sm">
                    <p>Baniyas West, Abu Dhabi</p>
                    <p>Mafraq, Abu Dhabi</p>
                    <p className="text-white/30 text-xs mt-1">UAE · International Delivery Available</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-5 flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="font-onest text-white/30 text-xs">© {new Date().getFullYear()} Standard Group LLC. All rights reserved.</p>
            <p className="font-montserrat text-white/20 text-[10px] uppercase tracking-[0.2em]">We Set Standards</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
