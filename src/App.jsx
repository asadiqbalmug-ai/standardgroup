import React, { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, ArrowRight, Shield, Truck, DollarSign, Headphones, ChevronDown, MapPin, Phone, Mail, Linkedin, Facebook, Instagram, Youtube, Leaf, Settings, Boxes, Wrench, Container, LayoutGrid, Home, Pipette, X, MessageCircle, FileText, ExternalLink, ChevronRight, Star, Check, BookOpen, Users, Building2, Droplets, Sparkles, Square, CheckCircle2, Ruler } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link, useLocation } from 'react-router-dom'

gsap.registerPlugin(ScrollTrigger)

/* ─── NAVBAR — Two-row premium header ─── */
const categoryNav = [
  { label: 'Water Heaters',   href: '/milano-water-heaters',   accent: '#2563eb' },
  { label: 'Water Closets',   href: '/water-closets',          accent: '#7C3AED' },
  { label: 'Wash Basins',     href: '/wash-basins',            accent: '#0D9488' },
  { label: 'Wall Hung WC',    href: '/wall-hung',              accent: '#B45309' },
  { label: 'Tiles & Interlock', href: '/tiles-roof-interlock', accent: '#059669' },
  { label: 'Sanitary Ware',   href: '/sanitary-ware',          accent: '#1D4ED8' },
  { label: 'Blocks & Sands',  href: '/blocks-sands',           accent: '#92400E' },
  { label: 'Cement',          href: '/cement',                 accent: '#6B7280' },
  { label: 'Steel',           href: '/steel',                  accent: '#475569' },
  { label: 'Film Plywood',    href: '/film-faced-plywood',     accent: '#78350F' },
  { label: 'Waterproofing',   href: '/water-proofing',         accent: '#0369A1' },
  { label: 'Gypsum Board',    href: '/gypsum-board',           accent: '#64748B' },
  { label: 'Paints & Tools',  href: '/paints-tools',           accent: '#BE123C' },
  { label: 'General Tools',   href: '/general-tools-plumbing', accent: '#0F766E' },
  { label: 'Plumbing 16',     href: '/plumbing-sanitary',      accent: '#0C4A6E' },
  { label: 'Plumbing 17',     href: '/plumbing-sanitary-2',    accent: '#1E3A5F' },
  { label: 'Electric Lights', href: '/electric-lights',        accent: '#CA8A04' },
  { label: 'Our Story',       href: '#about', bold: true,      accent: '#A58B62' },
]

function Navbar() {
  const [scrolled, setScrolled]     = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQ, setSearchQ]       = useState('')
  const location     = useLocation()
  const navScrollRef = useRef(null)

  const scrollNav = (dir) => {
    if (navScrollRef.current) navScrollRef.current.scrollBy({ left: dir * 200, behavior: 'smooth' })
  }

  const isActive = (href) => {
    if (href.startsWith('#')) return false
    return location.pathname === href || location.pathname.startsWith(href + '/')
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const filteredNav = searchQ.trim()
    ? categoryNav.filter(n => n.label.toLowerCase().includes(searchQ.toLowerCase()))
    : categoryNav

  return (
    <header className={`fixed top-0 left-0 right-0 z-[100] bg-white transition-all duration-300 ${scrolled ? 'shadow-md' : ''}`}>

      {/* ── TOP BAR ── */}
      <div className="bg-white border-b border-black/[0.06] px-6 lg:px-12 h-12 flex items-center relative">
        {/* Left — Showrooms */}
        <div className="flex-1 flex items-center gap-2">
          <MapPin size={13} className="text-[#888]" />
          <a href="#contactus" className="text-[#666] text-[11px] tracking-[0.08em] hover:text-[#1a1a1a] transition-colors">Showrooms</a>
        </div>

        {/* Centre — Logo */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full border border-[#A58B62]/60 flex items-center justify-center">
            <span className="font-serif italic text-[#A58B62] text-base font-bold leading-none">S</span>
          </div>
          <a href="/" className="flex flex-col leading-none">
            <span className="font-quicksand text-[13px] tracking-[0.18em] text-[#1a1a1a] uppercase">Standard Group</span>
            <span className="text-[8px] tracking-[0.25em] text-[#A58B62] uppercase font-medium">We Set Standards</span>
          </a>
        </div>

        {/* Right — Search + social icons */}
        <div className="flex-1 flex items-center justify-end gap-4">
          {/* Search */}
          <div className="flex items-center gap-2">
            {searchOpen && (
              <input
                autoFocus
                value={searchQ}
                onChange={e => setSearchQ(e.target.value)}
                placeholder="Search products…"
                className="text-[11px] border-b border-[#ccc] bg-transparent outline-none px-1 py-0.5 w-36 text-[#333] placeholder-[#aaa]"
                onBlur={() => { if (!searchQ) setSearchOpen(false) }}
              />
            )}
            <button onClick={() => setSearchOpen(v => !v)} className="text-[#666] hover:text-[#1a1a1a] transition-colors">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            </button>
          </div>
          <a href="https://wa.me/971000000000" target="_blank" rel="noreferrer" className="text-[#666] hover:text-[#25D366] transition-colors" title="WhatsApp">
            <MessageCircle size={15} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-[#666] hover:text-[#E1306C] transition-colors" title="Instagram">
            <Instagram size={15} />
          </a>
          <a href="#contactus" className="hidden sm:inline-flex items-center gap-1.5 bg-[#A58B62] text-white text-[10px] tracking-[0.1em] uppercase px-3.5 py-1.5 rounded-full hover:bg-[#8B7355] transition-colors">
            Contact <ArrowRight size={10} />
          </a>
          {/* Mobile hamburger */}
          <button onClick={() => setMobileOpen(v => !v)} className="lg:hidden text-[#666] ml-1">
            {mobileOpen ? <X size={18} /> : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>}
          </button>
        </div>
      </div>

      {/* ── CATEGORY NAV BAR ── */}
      <div className="hidden lg:block bg-white border-b border-black/[0.06]">
      <div className="max-w-[1100px] mx-auto flex items-stretch h-[38px]">
        <button
          onClick={() => scrollNav(-1)}
          className="flex-shrink-0 w-8 flex items-center justify-center text-[#999] hover:text-[#1a1a1a] hover:bg-black/[0.04] transition-colors border-r border-black/[0.08]"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <div ref={navScrollRef} className="flex-1 overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-0 whitespace-nowrap">
            {filteredNav.map((item) => {
              const active = isActive(item.href)
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`inline-flex items-center px-4 py-2.5 text-[11.5px] tracking-[0.04em] transition-all duration-200 whitespace-nowrap font-medium
                    ${active ? 'text-white' : item.bold ? 'text-[#1a1a1a]' : 'text-[#555]'}`}
                  style={active ? { backgroundColor: item.accent } : {}}
                  onMouseEnter={e => { if (!active) e.currentTarget.style.backgroundColor = item.accent + '18' }}
                  onMouseLeave={e => { if (!active) e.currentTarget.style.backgroundColor = '' }}
                >
                  {item.label}
                </a>
              )
            })}
          </div>
        </div>
        <button
          onClick={() => scrollNav(1)}
          className="flex-shrink-0 w-8 flex items-center justify-center text-[#999] hover:text-[#1a1a1a] hover:bg-black/[0.04] transition-colors border-l border-black/[0.08]"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>
      </div>

      {/* ── MOBILE MENU ── */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-black/5 shadow-lg max-h-[70vh] overflow-y-auto">
          <div className="px-6 py-3 border-b border-black/5">
            <input
              value={searchQ}
              onChange={e => setSearchQ(e.target.value)}
              placeholder="Search products…"
              className="w-full text-[12px] border border-[#ddd] rounded-lg px-3 py-2 outline-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-0">
            {filteredNav.map((item) => {
              const active = isActive(item.href)
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`px-5 py-3 text-[11px] tracking-[0.06em] border-b border-r border-black/[0.04] transition-colors
                    ${ active
                      ? 'bg-[#A58B62] text-white font-semibold'
                      : item.bold
                        ? 'font-semibold text-[#1a1a1a] hover:bg-[#F9F6F0] hover:text-[#A58B62]'
                        : 'text-[#555] hover:bg-[#F9F6F0] hover:text-[#A58B62]'
                    }`}
                >
                  {item.label}
                </a>
              )
            })}
          </div>
        </div>
      )}

    </header>
  )
}

/* ─── FLOATING PARTICLES ─── */
function FloatingParticles() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId
    const particles = []
    const count = 40

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize()
    window.addEventListener('resize', resize)

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.5,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3,
        o: Math.random() * 0.3 + 0.1,
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        p.x += p.dx; p.y += p.dy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(245, 242, 236, ${p.o})`
        ctx.fill()
      })
      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-[2]" />
}

/* ─── HERO ─── */
function Hero() {
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
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80" 
          alt="Modern architectural building" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#F9F6F0]/85" />
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-8 lg:px-16 pt-[76px] pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h1 className="mb-6">
              <span ref={titleRef} className="hero-title-line block font-quicksand text-3xl sm:text-4xl lg:text-5xl text-[#1a1a1a] leading-[1.1] tracking-[0.06em] mb-2 inline-block text-3d-shadow">
                Standard Group
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
                We Set Standards
              </span>
            </h1>

            <p className="hero-subtitle text-[#444] text-lg max-w-md leading-relaxed mb-10">
              Premium building materials in UAE for over 2 decades. Partnered with top global brands for every project need.
            </p>

            <div className="hero-cta flex items-center gap-4">
              <a href="#products" className="magnetic-btn group flex items-center gap-3 bg-[#1a1a1a] text-white px-7 py-3.5 rounded-full text-sm font-medium hover:bg-[#A58B62] transition-all duration-300">
                Explore Products
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a href="#contactus" className="magnetic-btn text-[#666] text-sm font-medium hover:text-[#1a1a1a] transition-colors flex items-center gap-1.5">
                Contact Us
                <ChevronDown size={14} />
              </a>
            </div>
          </div>

          <div className="relative hidden lg:flex items-center justify-center">
            <div className="relative w-96 h-96 bg-[#f0ece4] rounded-3xl border border-black/10 shadow-xl shadow-black/10 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-[#A58B62]/10 via-transparent to-transparent" />
              <Building2 size={120} className="text-[#A58B62] relative" strokeWidth={1} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── IMAGE SEQUENCE REVEAL ─── */
function ImageSequenceReveal() {
  const sectionRef = useRef(null)
  const canvasRef = useRef(null)
  const progressRef = useRef(0)
  const imagesRef = useRef([])
  const frameRef = useRef(0)

  const TOTAL_FRAMES = 151
  const FRAME_PATH = (i) => `/sec2/ezgif-frame-${String(i).padStart(3, '0')}.jpg`
  const textRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Load images
    const loadImages = async () => {
      const promises = []
      for (let i = 1; i <= TOTAL_FRAMES; i++) {
        const img = new Image()
        img.src = FRAME_PATH(i)
        img.decoding = 'async'
        imagesRef.current[i] = img
        promises.push(new Promise((resolve) => {
          img.onload = resolve
          img.onerror = resolve // Skip failed frames
        }))
      }
      // Load first batch immediately, rest can stream in
      await Promise.all(promises.slice(0, 30))
    }

    // Draw current frame
    const draw = () => {
      const targetFrame = Math.min(
        TOTAL_FRAMES,
        Math.max(1, Math.floor(progressRef.current * TOTAL_FRAMES))
      )

      // Only draw if frame changed
      if (targetFrame !== frameRef.current) {
        frameRef.current = targetFrame
        const img = imagesRef.current[targetFrame]
        if (img && img.complete) {
          // Draw image to fill canvas (cover mode)
          const scale = Math.max(canvas.width / img.width, canvas.height / img.height)
          const x = (canvas.width - img.width * scale) / 2
          const y = (canvas.height - img.height * scale) / 2
          ctx.drawImage(img, x, y, img.width * scale, img.height * scale)
        }
      }
      requestAnimationFrame(draw)
    }

    loadImages().then(() => draw())

    // Scroll trigger
    const gsapCtx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=2000', // 2x screen height for smooth scroll
        pin: true,
        anticipatePin: 1,
        scrub: 0.1, // Tight scrub for instant response
        onUpdate: (self) => {
          progressRef.current = self.progress
          // Text fade in at last 20% of scroll (80-100%)
          if (textRef.current) {
            const textOpacity = self.progress > 0.8 ? (self.progress - 0.8) * 5 : 0
            const textY = self.progress > 0.8 ? (0.9 - self.progress) * 300 : 60
            textRef.current.style.opacity = textOpacity
            textRef.current.style.transform = `translateY(${textY}px)`
          }
        }
      })
    }, sectionRef)

    return () => {
      window.removeEventListener('resize', resize)
      gsapCtx.revert()
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative h-screen bg-[#F9F6F0]">
      <canvas ref={canvasRef} className="w-full h-full block" />
      {/* Text appears at the end */}
      <div ref={textRef} className="end-text absolute inset-0 flex flex-col items-center justify-center text-center px-8 pointer-events-none" style={{ opacity: 0, transform: 'translateY(60px)' }}>
        <p className="text-white/60 text-[11px] tracking-[0.3em] uppercase font-semibold mb-4">Experience Luxury</p>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl text-white font-normal leading-tight mb-6">
          <span className="font-major tracking-[0.05em]">Crafted</span> <span className="font-serif-italic font-semibold">Excellence.</span>
        </h2>
        <p className="text-white/80 text-base max-w-md mb-8 font-medium">
          Premium building materials, hardware, plumbing & sanitary ware, electrical accessories, and safety equipment for every project need.
        </p>
        <a href="#products" className="pointer-events-auto flex items-center gap-2 bg-white text-luxury-black text-sm font-bold px-6 py-3 rounded-full hover:bg-luxury-gold transition-colors">
          Explore Products <ArrowRight size={16} />
        </a>
      </div>
    </section>
  )
}

/* ─── OUR PHILOSOPHY ─── */
function OurPhilosophy() {
  const cards = [
    {
      tag: 'Vision',
      icon: (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
          <circle cx="12" cy="12" r="3"/><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z"/>
        </svg>
      ),
      text: 'To be the most trusted building materials partner in the UAE — where every project, from a family home to a landmark tower, is built on quality that sets a standard.',
      bg: 'bg-[#111111]',
      textColor: 'text-white',
      subColor: 'text-white/50',
    },
    {
      tag: 'Mission',
      icon: (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
          <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
          <line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/>
          <line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/>
        </svg>
      ),
      text: 'To supply premium construction and finishing materials backed by expert guidance, competitive pricing, and service that exceeds expectations at every step of the build.',
      bg: 'bg-white',
      textColor: 'text-[#1a1a1a]',
      subColor: 'text-[#888]',
      accent: true,
    },
    {
      tag: 'Standards',
      icon: (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
          <path d="M12 2l1.5 4.5H18l-3.75 2.75L15.75 14 12 11.25 8.25 14l1.5-4.75L6 6.5h4.5L12 2z"/>
          <path d="M5 20h14M8 17v3M12 15v5M16 17v3"/>
        </svg>
      ),
      text: 'We set standards, not just supply materials. Every product is vetted for durability, compliance, and craftsmanship — because what you build with defines what stands.',
      bg: 'bg-[#2d3f50]',
      textColor: 'text-white',
      subColor: 'text-white/50',
    },
  ]

  return (
    <section className="relative bg-[#F9F6F0] py-20 lg:py-28">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-6">
          <div>
            <p className="text-[#A58B62] text-[11px] tracking-[0.3em] uppercase font-medium mb-3">Our Essence</p>
            <h2 className="text-4xl lg:text-5xl text-[#1a1a1a] font-light leading-[1.1]">
              <span className="block font-major tracking-[0.01em]">Our Philosophy</span>
              <span className="block font-serif italic text-[#555]">of Building.</span>
            </h2>
          </div>
          <p className="text-[#888] text-sm max-w-sm leading-relaxed lg:text-right">
            Three pillars that guide every decision we make — from the products we source to the partnerships we build.
          </p>
        </div>

        {/* Three tall cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 rounded-2xl overflow-hidden shadow-2xl shadow-black/10">
          {cards.map((card, i) => (
            <div key={i} className={`${card.bg} relative flex flex-col justify-between p-8 lg:p-10 min-h-[480px]`}>
              {/* Icon top */}
              <div className={`${card.subColor} mb-auto`}>
                {card.icon}
              </div>

              {/* Bottom content */}
              <div className="mt-16">
                {card.accent
                  ? <h3 className="text-3xl lg:text-4xl font-light text-[#1a1a1a] mb-4 font-serif italic">{card.tag}</h3>
                  : <h3 className={`text-3xl lg:text-4xl font-light ${card.textColor} mb-4`}>{card.tag}</h3>
                }
                <p className={`text-sm leading-relaxed ${card.accent ? 'text-[#A58B62] font-medium' : card.subColor}`}>
                  {card.text}
                </p>
              </div>

              {/* Subtle divider line between cards on desktop */}
              {i < 2 && <div className="hidden md:block absolute right-0 top-8 bottom-8 w-px bg-white/10" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── SERVICES GRID ─── */
function ServicesGrid() {
  const items = [
    {
      num: '01',
      title: 'Request a Quote',
      desc: 'Share your project scope — residential, commercial, or industrial — and get a tailored material quote within 24 hours.',
    },
    {
      num: '02',
      title: 'Product Catalogue',
      desc: 'Browse our full range of 500+ SKUs across 18 categories. Download specs, datasheets, and brand certificates.',
    },
    null, // centre CTA slot
    {
      num: '04',
      title: 'Brand Compatibility',
      desc: 'Expert guidance on pairing the right materials, fixtures, and finishes from our portfolio of 31+ global brands.',
    },
    {
      num: '05',
      title: 'Bulk & Project Supply',
      desc: 'Volume pricing for contractors and developers. Reliable delivery across all Emirates with dedicated account support.',
    },
  ]

  return (
    <section
      className="relative py-16 lg:py-20"
      style={{
        backgroundImage: `url("https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1800&q=80")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark overlay so wood texture is subtle */}
      <div className="absolute inset-0 bg-black/55" />

      <div className="relative max-w-[1400px] mx-auto px-8 lg:px-16">
        {/* Section label */}
        <p className="text-[#A58B62] text-[11px] tracking-[0.3em] uppercase font-medium mb-10">How We Work</p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {items.map((item, i) =>
            item === null ? (
              /* Centre CTA card — shows background through */
              <a
                key="cta"
                href="#contactus"
                className="group relative flex flex-col items-center justify-center min-h-[280px] rounded-none bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-[#A58B62]/30 transition-all duration-500 cursor-pointer"
              >
                <ArrowUpRight size={28} className="text-white mb-3 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-white text-lg font-light tracking-wide">Get started</span>
              </a>
            ) : (
              <div
                key={i}
                className="relative flex flex-col justify-between min-h-[280px] bg-[#0f0f0f]/90 p-6 lg:p-7 hover:bg-[#1a1a1a] transition-colors duration-300 group"
              >
                <span className="font-serif italic text-white/20 text-4xl font-light leading-none">{item.num}</span>
                <div>
                  <h3 className="text-white text-lg font-light mb-3 leading-snug group-hover:text-[#A58B62] transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-white/45 text-[12px] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  )
}

/* ─── CINEMATIC BANNER ─── */
function CinematicBanner() {
  return (
    <section className="relative w-full h-[520px] lg:h-[580px] overflow-hidden">
      {/* Background image */}
      <img
        src="https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=1800&q=80"
        alt="Standard Group Showroom"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      {/* Subtle overall dark tint */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Right panel — frosted dark box */}
      <div className="absolute right-0 top-0 bottom-0 w-full md:w-[48%] lg:w-[42%] bg-[#1a1a1a]/80 backdrop-blur-sm flex flex-col justify-center px-10 lg:px-14 py-12">
        <p className="text-[#A58B62] text-[11px] tracking-[0.3em] uppercase font-medium mb-5">
          Hosted by Standard Group
        </p>
        <h2 className="text-white text-3xl lg:text-4xl font-light leading-[1.2] mb-6">
          Building Dreams,<br />
          <span className="font-serif italic">One Project at a Time.</span>
        </h2>
        <p className="text-white/65 text-sm leading-relaxed mb-10 max-w-sm">
          From foundations to finishes, Standard Group supplies the UAE's finest residential and commercial projects with premium materials, trusted brands, and expert support — every step of the build.
        </p>
        <a
          href="#products"
          className="self-start inline-flex items-center gap-2.5 bg-white text-[#1a1a1a] text-sm font-medium px-7 py-3 hover:bg-[#A58B62] hover:text-white transition-all duration-300"
        >
          Explore Our Range
          <ArrowRight size={15} />
        </a>
      </div>
    </section>
  )
}

/* ─── PRODUCTS ─── */
function Products() {
  const sectionRef = useRef(null)
  const headerLine1Ref = useRef(null)

  const products = [
    { id: 1, name: 'Milano Water Heaters', type: 'Premium', price: 'Starting AED 1,200', desc: 'Italian precision engineering for hot water solutions.', link: '/milano-water-heaters' },
    { id: 2, name: 'Water Closets', type: 'Sanitary', price: 'Starting AED 850', desc: 'Premium European design water closets.', link: '/water-closets' },
    { id: 3, name: 'Building Materials', type: 'Construction', price: 'Bulk Pricing', desc: 'Cement, steel, blocks for every project.', link: '#' },
    { id: 4, name: 'Hardware & Tools', type: 'Industrial', price: 'Bulk Pricing', desc: 'Professional grade tools and equipment.', link: '#' },
    { id: 5, name: 'Plumbing Solutions', type: 'Sanitary', price: 'Bulk Pricing', desc: 'Complete plumbing systems and fittings.', link: '#' },
    { id: 6, name: 'Electrical Accessories', type: 'Electrical', price: 'Bulk Pricing', desc: 'Wiring, switches, and electrical components.', link: '#' },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.prod-card',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: '.prod-grid', start: 'top 85%' }
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
    <section ref={sectionRef} id="products" className="relative py-24 lg:py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
        <div className="mb-14">
          <p className="text-[#A58B62] text-[11px] tracking-[0.3em] uppercase font-medium mb-3">Our Products</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#1a1a1a] font-light leading-[1.1] text-3d-shadow">
            <span ref={headerLine1Ref} className="block font-major tracking-[0.02em]">Premium</span>
            <span className="magnetic-text block font-serif italic text-[#555]">Building Materials</span>
          </h2>
          <p className="text-[#666] text-base max-w-lg leading-relaxed mt-4">
            From premium sanitary ware to construction essentials, we provide quality materials for every project.
          </p>
        </div>

        {/* Products Grid */}
        <div className="prod-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map((product) => (
            <a key={product.id} href={product.link} className="prod-card group relative h-[380px] cursor-pointer perspective-1000">
              <div className="relative w-full h-full transition-transform duration-500 transform-style-preserve-3d group-hover:rotate-y-180">
                <div className="absolute inset-0 bg-white border border-black/[0.04] rounded-2xl overflow-hidden backface-hidden shadow-lg shadow-black/10">
                  <div className="relative h-48 flex items-center justify-center bg-gradient-to-b from-[#fafafa] to-white overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-[#f0f0f0] to-white">
                      <Square size={80} className="text-[#A58B62]/30" strokeWidth={1} />
                    </div>
                    <div className="absolute top-3 left-3 px-2.5 py-1 bg-white rounded-full border border-black/5 shadow-sm">
                      <span className="text-[#1a1a1a] text-[10px] font-semibold">{product.type}</span>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-poppins text-[#1a1a1a] text-base tracking-[0.02em]">{product.name}</h3>
                      <ArrowUpRight size={13} className="text-[#ccc] group-hover:text-[#A58B62] transition-colors duration-300" />
                    </div>
                    <p className="text-[#888] text-xs leading-relaxed mb-3">{product.desc}</p>
                    <div className="flex items-center justify-between pt-3 border-t border-black/5">
                      <span className="font-poppins text-[#A58B62] text-sm tracking-[0.02em]">{product.price}</span>
                      <span className="text-[#bbb] text-[9px] uppercase tracking-wider">{product.type}</span>
                    </div>
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-br from-[#A58B62] to-[#8B7355] rounded-2xl overflow-hidden backface-hidden rotate-y-180 p-6 flex flex-col items-center justify-center text-white">
                  <h3 className="font-poppins text-lg font-medium mb-6 text-center">{product.name}</h3>
                  <div className="grid grid-cols-2 gap-4 w-full">
                    <div className="flex flex-col items-center gap-2 p-3 bg-white/10 rounded-xl">
                      <Droplets size={24} className="text-white" />
                      <span className="text-[10px] uppercase tracking-wider">Premium</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 p-3 bg-white/10 rounded-xl">
                      <Sparkles size={24} className="text-white" />
                      <span className="text-[10px] uppercase tracking-wider">Quality</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 p-3 bg-white/10 rounded-xl">
                      <Shield size={24} className="text-white" />
                      <span className="text-[10px] uppercase tracking-wider">Durable</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 p-3 bg-white/10 rounded-xl">
                      <CheckCircle2 size={24} className="text-white" />
                      <span className="text-[10px] uppercase tracking-wider">Trusted</span>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── SOLUTIONS ─── */
function Solutions() {
  const sectionRef = useRef(null)
  const headerLine1Ref = useRef(null)

  const solutions = [
    { title: 'Residential', desc: 'Quality materials for homes built to last.' },
    { title: 'Commercial', desc: 'Reliable solutions for offices, retail, and infrastructure.' },
    { title: 'Industrial', desc: 'High-performance materials for heavy-duty applications.' },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.sol-card',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.sol-grid', start: 'top 85%' }
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
    <section ref={sectionRef} id="solutions" className="relative py-24 lg:py-32 bg-[#1e293b]">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
        <div className="mb-14">
          <p className="text-[#A58B62] text-[11px] tracking-[0.3em] uppercase font-medium mb-3">Our Solutions</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white font-light leading-[1.1] text-3d-shadow">
            <span ref={headerLine1Ref} className="block font-major tracking-[0.02em]">Smart Materials.</span>
            <span className="magnetic-text block font-serif italic text-[#94a3b8]">Stronger Results.</span>
          </h2>
          <p className="text-[#94a3b8] text-base max-w-lg leading-relaxed mt-4">
            We provide end-to-end material solutions tailored to your project needs—residential, commercial, or industrial.
          </p>
        </div>

        <div className="sol-grid grid grid-cols-1 sm:grid-cols-3 gap-5">
          {solutions.map((sol, idx) => (
            <div key={idx} className="sol-card p-7 bg-[#334155] rounded-2xl border border-white/10 shadow-lg shadow-black/20 hover:shadow-xl hover:border-[#A58B62]/30 transition-all duration-300">
              <div className="mb-4">
                <span className="text-3xl lg:text-4xl font-light text-[#A58B62]">{idx + 1}</span>
              </div>
              <h4 className="text-[#94a3b8] text-sm font-medium mb-1.5">{sol.title}</h4>
              <p className="text-[#888] text-xs leading-relaxed">{sol.desc}</p>
            </div>
          ))}
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
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.why-grid', start: 'top 85%' }
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
          <p className="text-[#A58B62] text-[11px] tracking-[0.3em] uppercase font-medium mb-3">Why Choose Us</p>
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
                <span className="text-3xl lg:text-4xl font-light text-[#A58B62]">{reason.num}</span>
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
    <section id="contactus" ref={sectionRef} className="relative py-24 lg:py-32 bg-[#1e293b]">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16 text-center">
        <p className="text-[#A58B62] text-[11px] tracking-[0.3em] uppercase font-medium mb-4">Get In Touch</p>
        <h2 className="text-3xl sm:text-4xl lg:text-6xl text-white font-light leading-[1.1] mb-4" style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.3), 2px 2px 0 rgba(0,0,0,0.2), 3px 3px 0 rgba(0,0,0,0.1), 4px 4px 8px rgba(0,0,0,0.4)' }}>
          <span ref={headerLine1Ref} className="block font-major tracking-[0.02em]">Ready to Start?</span>
          <span className="magnetic-text block font-serif italic text-[#94a3b8]">Build With Us</span>
        </h2>
        <p className="text-[#94a3b8] text-base max-w-lg mx-auto leading-relaxed mb-10">
          Contact Standard Group today for competitive pricing, bulk orders, and expert consultation on your next project.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="mailto:sales@standardgroup.ae" className="magnetic-btn group flex items-center gap-3 bg-[#A58B62] text-white px-8 py-4 rounded-full text-sm font-medium hover:bg-[#8B7355] transition-all duration-300 shadow-lg shadow-[#A58B62]/20">
            Request Quote
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </a>
          <a href="https://wa.me/971551234567" target="_blank" rel="noopener noreferrer" className="magnetic-btn group flex items-center gap-3 border border-white/20 text-white px-8 py-4 rounded-full text-sm font-medium hover:bg-white/10 transition-all duration-300">
            WhatsApp
            <MessageCircle size={16} />
          </a>
        </div>
      </div>
    </section>
  )
}

/* ─── FOOTER ─── */
function PageFooter() {
  const productLinks = [
    { label: 'Water Heaters',     href: '/milano-water-heaters' },
    { label: 'Water Closets',     href: '/water-closets' },
    { label: 'Wash Basins',       href: '/wash-basins' },
    { label: 'Wall Hung WC',      href: '/wall-hung' },
    { label: 'Tiles & Interlock', href: '/tiles-roof-interlock' },
    { label: 'Sanitary Ware',     href: '/sanitary-ware' },
    { label: 'Blocks & Sands',    href: '/blocks-sands' },
    { label: 'Cement',            href: '/cement' },
    { label: 'Steel',             href: '/steel' },
    { label: 'Film Plywood',      href: '/film-faced-plywood' },
    { label: 'Waterproofing',     href: '/water-proofing' },
    { label: 'Gypsum Board',      href: '/gypsum-board' },
    { label: 'Paints & Tools',    href: '/paints-tools' },
    { label: 'General Tools',     href: '/general-tools-plumbing' },
    { label: 'Plumbing & Sanitary (16)', href: '/plumbing-sanitary' },
    { label: 'Plumbing & Sanitary (17)', href: '/plumbing-sanitary-2' },
    { label: 'Electric Lights',   href: '/electric-lights' },
  ]

  return (
    <footer className="bg-[#1a1a1a] text-white">
      {/* ── MAIN FOOTER ── */}
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* Col 1 — Brand */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-full border border-[#A58B62]/70 flex items-center justify-center flex-shrink-0">
              <span className="font-serif italic text-[#A58B62] text-base font-bold leading-none">S</span>
            </div>
            <div>
              <p className="font-quicksand text-white text-[13px] tracking-[0.15em] uppercase leading-none">Standard Group</p>
              <p className="text-[#A58B62] text-[9px] tracking-[0.25em] uppercase mt-0.5">We Set Standards</p>
            </div>
          </div>
          <p className="text-[#888] text-xs leading-relaxed mb-6">
            Premier building materials supplier in the UAE. Quality construction and finishing products from globally trusted brands — serving residential, commercial, and industrial projects for over 20 years.
          </p>
          {/* Social */}
          <div className="flex items-center gap-3">
            <a href="https://wa.me/971000000000" target="_blank" rel="noreferrer"
              className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-[#888] hover:text-[#25D366] hover:border-[#25D366]/40 transition-all">
              <MessageCircle size={13} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer"
              className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-[#888] hover:text-[#E1306C] hover:border-[#E1306C]/40 transition-all">
              <Instagram size={13} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer"
              className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-[#888] hover:text-[#1877F2] hover:border-[#1877F2]/40 transition-all">
              <Facebook size={13} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer"
              className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-[#888] hover:text-[#0A66C2] hover:border-[#0A66C2]/40 transition-all">
              <Linkedin size={13} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer"
              className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-[#888] hover:text-[#FF0000] hover:border-[#FF0000]/40 transition-all">
              <Youtube size={13} />
            </a>
          </div>
        </div>

        {/* Col 2 & 3 — Product Categories (spans 2) */}
        <div className="lg:col-span-2">
          <h4 className="text-[10px] tracking-[0.25em] uppercase text-[#A58B62] font-semibold mb-5 pb-3 border-b border-white/[0.06]">Product Categories</h4>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2.5">
            {productLinks.map((item) => (
              <a key={item.href} href={item.href}
                className="flex items-center gap-2 text-[#888] hover:text-white transition-colors text-[11px] group">
                <span className="w-1 h-1 rounded-full bg-[#A58B62]/40 group-hover:bg-[#A58B62] transition-colors flex-shrink-0" />
                {item.label}
              </a>
            ))}
          </div>
        </div>

        {/* Col 4 — Contact */}
        <div>
          <h4 className="text-[10px] tracking-[0.25em] uppercase text-[#A58B62] font-semibold mb-5 pb-3 border-b border-white/[0.06]">Get In Touch</h4>
          <div className="flex flex-col gap-4 mb-8">
            <a href="tel:+97142220000" className="flex items-start gap-3 text-[#888] hover:text-white transition-colors group">
              <Phone size={13} className="text-[#A58B62] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-[10px] text-[#555] uppercase tracking-wider mb-0.5">Phone</p>
                <p className="text-[11px]">+971 4 222 0000</p>
              </div>
            </a>
            <a href="mailto:sales@standardgroup.ae" className="flex items-start gap-3 text-[#888] hover:text-white transition-colors group">
              <Mail size={13} className="text-[#A58B62] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-[10px] text-[#555] uppercase tracking-wider mb-0.5">Email</p>
                <p className="text-[11px]">sales@standardgroup.ae</p>
              </div>
            </a>
            <div className="flex items-start gap-3 text-[#888]">
              <MapPin size={13} className="text-[#A58B62] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-[10px] text-[#555] uppercase tracking-wider mb-0.5">Showroom</p>
                <p className="text-[11px] leading-relaxed">Dubai, United Arab Emirates</p>
              </div>
            </div>
          </div>

          <h4 className="text-[10px] tracking-[0.25em] uppercase text-[#A58B62] font-semibold mb-3">Quick Links</h4>
          <div className="flex flex-col gap-2">
            {['Home', 'Products', 'About Us', 'Contact Us'].map((l) => (
              <a key={l} href={`#${l.toLowerCase().replace(' ', '')}`}
                className="text-[#888] hover:text-white transition-colors text-[11px] flex items-center gap-2 group">
                <ChevronRight size={10} className="text-[#A58B62]/50 group-hover:text-[#A58B62] transition-colors" />
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[#555] text-[11px]">© {new Date().getFullYear()} Standard Group LLC. All rights reserved.</p>
          <p className="text-[#444] text-[10px] tracking-[0.25em] uppercase font-semibold">We Set Standards</p>
          <p className="text-[#555] text-[11px]">Dubai, United Arab Emirates</p>
        </div>
      </div>
    </footer>
  )
}

/* ─── SCROLL SEQUENCE (shared logic) ─── */
function ScrollSequence({ folder, total, scrollMultiplier = 10, className = '' }) {
  const sectionRef = useRef(null)
  const canvasRef  = useRef(null)
  const frameRef   = useRef(1)
  const imagesRef  = useRef([])

  const PATH = (i) => `/${folder}/ezgif-frame-${String(i).padStart(3, '0')}.jpg`

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const setSize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      drawFrame(frameRef.current)
    }

    function drawFrame(n) {
      const img = imagesRef.current[n]
      if (!img || !img.complete || !img.naturalWidth) return
      const cw = canvas.width
      const ch = canvas.height
      const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight)
      const dw = img.naturalWidth  * scale
      const dh = img.naturalHeight * scale
      const x  = (cw - dw) / 2
      const y  = 0
      ctx.clearRect(0, 0, cw, ch)
      ctx.drawImage(img, x, y, dw, dh)
    }

    canvas.width  = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
    window.addEventListener('resize', setSize)

    for (let i = 1; i <= total; i++) {
      const img = new Image()
      img.src = PATH(i)
      img.onload = () => { if (i === 1) drawFrame(1) }
      imagesRef.current[i] = img
    }

    const gsapCtx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: `+=${total * scrollMultiplier}`,
        pin: true,
        scrub: 0.5,
        anticipatePin: 1,
        onUpdate(self) {
          const next = Math.max(1, Math.min(total, Math.ceil(self.progress * total)))
          if (next !== frameRef.current) {
            frameRef.current = next
            drawFrame(next)
          }
        },
      })
    }, sectionRef)

    return () => {
      window.removeEventListener('resize', setSize)
      gsapCtx.revert()
    }
  }, [])

  return (
    <section ref={sectionRef} className={`relative w-full h-screen overflow-hidden bg-[#0a0a0a] ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full block" />
    </section>
  )
}

/* Desktop version — hidden on mobile */
function Sec3ScrollSequence() {
  return <ScrollSequence folder="sec3" total={300} scrollMultiplier={10} className="hidden lg:block" />
}

/* Mobile version — hidden on lg+ */
function Sec3ScrollSequenceMobile() {
  return <ScrollSequence folder="sec3m" total={278} scrollMultiplier={8} className="block lg:hidden" />
}

/* ─── MAIN PAGE COMPONENT ─── */
export default function App() {
  return (
    <div className="bg-[#F9F6F0] min-h-screen selection:bg-[#A58B62]/20 selection:text-[#1a1a1a]">
      <Navbar />
      <Hero />
      <OurPhilosophy />
      <CinematicBanner />
      <ServicesGrid />
      <Sec3ScrollSequence />
      <Sec3ScrollSequenceMobile />
      <Products />
      <Solutions />
      <WhyStandardGroup />
      <CTASection />
      <PageFooter />
    </div>
  )
}
