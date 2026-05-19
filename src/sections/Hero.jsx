import React, { useEffect, useRef } from 'react'
import { ArrowDown, Building2, Package, Award } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: 18, suffix: '+', label: 'Product Categories' },
  { value: 30, suffix: '+', label: 'Global Brands' },
  { value: 1000, suffix: '+', label: 'Products Available' },
  { value: 0, suffix: 'UAE', label: 'Based In' },
]

function CountUp({ value, suffix }) {
  const ref = useRef(null)
  useEffect(() => {
    if (value === 0) return
    const obj = { val: 0 }
    gsap.to(obj, {
      val: value, duration: 2, ease: 'power2.out',
      scrollTrigger: { trigger: ref.current, start: 'top 90%' },
      onUpdate: () => { if (ref.current) ref.current.textContent = Math.round(obj.val) + suffix }
    })
  }, [value, suffix])
  if (value === 0) return <span ref={ref}>{suffix}</span>
  return <span ref={ref}>0{suffix}</span>
}

export default function Hero() {
  const sectionRef = useRef(null)
  const canvasRef = useRef(null)
  const badgeRef = useRef(null)
  const line1Ref = useRef(null)
  const line2Ref = useRef(null)
  const taglineRef = useRef(null)
  const descRef = useRef(null)
  const btnsRef = useRef(null)
  const statsRef = useRef(null)
  const glowRef = useRef(null)
  const shape1 = useRef(null)
  const shape2 = useRef(null)
  const shape3 = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize()
    window.addEventListener('resize', resize)
    const particles = Array.from({ length: 90 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      r: Math.random() * 2 + 0.3,
      vx: (Math.random() - 0.5) * 0.2, vy: (Math.random() - 0.5) * 0.2,
      alpha: Math.random() * 0.35 + 0.05,
    }))
    const drawCanvas = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(16,185,129,${p.alpha})`; ctx.fill()
      })
      animId = requestAnimationFrame(drawCanvas)
    }
    drawCanvas()

    // Floating 3D shapes
    gsap.to(shape1.current, { y: -30, rotateX: 15, rotateY: 25, duration: 4, repeat: -1, yoyo: true, ease: 'sine.inOut' })
    gsap.to(shape2.current, { y: 20, rotateX: -10, rotateZ: 30, duration: 5, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1 })
    gsap.to(shape3.current, { y: -15, rotateY: -20, rotateZ: -15, duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 2 })

    // Glow pulse
    gsap.to(glowRef.current, { scale: 1.2, opacity: 0.8, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut' })

    // Entrance timeline
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.fromTo(badgeRef.current, { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 0.7 })
      .fromTo(line1Ref.current, { opacity: 0, y: 80, rotateX: 40 }, { opacity: 1, y: 0, rotateX: 0, duration: 1 }, '-=0.2')
      .fromTo(line2Ref.current, { opacity: 0, y: 80, rotateX: 40 }, { opacity: 1, y: 0, rotateX: 0, duration: 1 }, '-=0.7')
      .fromTo(taglineRef.current, { opacity: 0, letterSpacing: '1.2em' }, { opacity: 1, letterSpacing: '0.5em', duration: 0.8 }, '-=0.5')
      .fromTo(descRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.3')
      .fromTo(btnsRef.current.children, { opacity: 0, y: 25, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.15 }, '-=0.3')
      .fromTo(statsRef.current.children, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }, '-=0.2')

    // Scrub parallax: title moves up & scales down as you scroll away
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
      onUpdate: (self) => {
        const p = self.progress
        gsap.set(line1Ref.current, { y: p * -60, scale: 1 - p * 0.15, opacity: 1 - p * 0.8 })
        gsap.set(line2Ref.current, { y: p * -40, scale: 1 - p * 0.1, opacity: 1 - p * 0.8 })
      }
    })

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      tl.kill()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <section id="home" ref={sectionRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-zinc-950">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(rgba(16,185,129,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(16,185,129,0.6) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />

      {/* Glow orb */}
      <div ref={glowRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)' }} />

      {/* Floating 3D shapes */}
      <div ref={shape1} className="absolute top-[15%] left-[10%] w-20 h-20 border border-[var(--mahenti-accent)]/20 rounded-2xl pointer-events-none preserve-3d"
        style={{ transform: 'rotateX(10deg) rotateY(20deg)' }} />
      <div ref={shape2} className="absolute bottom-[20%] right-[12%] w-16 h-16 border border-[var(--mahenti-accent)]/15 rounded-full pointer-events-none preserve-3d"
        style={{ transform: 'rotateX(-5deg) rotateZ(15deg)' }} />
      <div ref={shape3} className="absolute top-[60%] left-[80%] w-12 h-12 border border-[var(--mahenti-accent)]/10 pointer-events-none preserve-3d"
        style={{ transform: 'rotateY(-10deg) rotateZ(-10deg)', borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' }} />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto perspective">
        <div ref={badgeRef} style={{ opacity: 0 }}
          className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[var(--mahenti-accent)] mb-8">
          <span className="w-6 h-px bg-[var(--mahenti-accent)]" />
          <Building2 size={12} /> Building Materials Supplier · UAE
          <span className="w-6 h-px bg-[var(--mahenti-accent)]" />
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-[8rem] tracking-tight text-white mb-4 leading-[0.9] font-black font-display overflow-hidden preserve-3d">
          <span ref={line1Ref} className="block" style={{ opacity: 0 }}>STANDARD</span>
          <span ref={line2Ref} className="block text-gradient" style={{ opacity: 0 }}>GROUP</span>
        </h1>

        <p ref={taglineRef} style={{ opacity: 0 }} className="text-[var(--mahenti-accent)]/60 tracking-[0.5em] text-sm md:text-base uppercase mb-6 font-medium">
          We Set Standards
        </p>

        <p ref={descRef} style={{ opacity: 0 }} className="text-zinc-400 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          Your trusted partner for premium building materials. From cement and steel to sanitary ware and lighting — everything you need to build with confidence.
        </p>

        <div ref={btnsRef} className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <a href="#products" style={{ opacity: 0 }}
            className="flex items-center justify-center gap-2 bg-[var(--mahenti-accent)] text-zinc-900 font-bold px-8 py-4 rounded-2xl hover:brightness-110 transition-all duration-300 text-sm tracking-widest uppercase shadow-lg shadow-[var(--mahenti-accent)]/30 hover:shadow-xl hover:shadow-[var(--mahenti-accent)]/40 hover:scale-[1.02] font-display">
            <Package size={16} /> Explore Products
          </a>
          <a href="#brands" style={{ opacity: 0 }}
            className="flex items-center justify-center gap-2 border border-zinc-700 bg-white/5 backdrop-blur px-8 py-4 rounded-2xl font-semibold hover:border-zinc-500 transition-all duration-300 text-sm tracking-widest uppercase text-white hover:scale-[1.02]">
            <Award size={16} /> Our Brands
          </a>
        </div>

        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {stats.map((s) => (
            <div key={s.label} style={{ opacity: 0 }}
              className="text-center p-5 rounded-2xl border border-zinc-800 bg-zinc-900/40 hover:border-[var(--mahenti-accent)]/50 transition-all duration-300 hover:glow-accent group">
              <div className="text-3xl md:text-4xl leading-none mb-1 font-black text-gradient font-display">
                <CountUp value={s.value} suffix={s.suffix} />
              </div>
              <div className="text-zinc-500 text-[11px] font-bold uppercase tracking-widest">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <a href="#products" className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--mahenti-accent)]/50 hover:text-[var(--mahenti-accent)] transition-colors">
        <span className="text-[11px] tracking-widest uppercase font-bold">Scroll</span>
        <ArrowDown size={16} className="animate-bounce" />
      </a>
    </section>
  )
}
