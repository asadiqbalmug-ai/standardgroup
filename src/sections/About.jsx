import React, { useEffect, useRef, useCallback } from 'react'
import { Shield, Truck, Users, Star } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const values = [
  { icon: Shield, title: 'Quality Assured', description: 'Every product we supply meets rigorous quality standards from internationally certified manufacturers.' },
  { icon: Truck, title: 'Reliable Supply', description: 'Consistent stock availability and dependable delivery to keep your projects on schedule.' },
  { icon: Users, title: 'Expert Support', description: 'Our team of specialists is ready to help you choose the right materials for every project.' },
  { icon: Star, title: 'Trusted Brands', description: 'Authorized distributor for 30+ globally recognized building material brands.' },
]

function ValueCard({ icon: Icon, title, description }) {
  const ref = useRef(null)
  const handleMove = useCallback((e) => {
    const r = ref.current.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    gsap.to(ref.current, { rotateY: x * 10, rotateX: -y * 10, duration: 0.3, ease: 'power2.out' })
  }, [])
  const handleLeave = useCallback(() => {
    gsap.to(ref.current, { rotateY: 0, rotateX: 0, duration: 0.5, ease: 'power3.out' })
  }, [])

  return (
    <div ref={ref} onMouseMove={handleMove} onMouseLeave={handleLeave}
      className="p-6 rounded-2xl border border-zinc-200 bg-white hover:border-[var(--mahenti-accent)]/50 transition-all duration-300 group preserve-3d cursor-default"
      style={{ boxShadow: '0 4px 6px -1px rgba(0,0,0,0.06), 0 10px 20px -5px rgba(0,0,0,0.08), 0 20px 40px -10px rgba(0,0,0,0.05)' }}>
      <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-4 bg-zinc-900 group-hover:bg-[var(--mahenti-accent)] transition-all duration-300">
        <Icon size={20} className="text-white" />
      </div>
      <h4 className="text-zinc-900 font-bold text-lg mb-2 group-hover:text-[var(--mahenti-accent)] transition-colors font-display">{title}</h4>
      <p className="text-zinc-600 text-sm leading-relaxed">{description}</p>
    </div>
  )
}

export default function About() {
  const leftRef = useRef(null)
  const rightRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(leftRef.current.children,
        { opacity: 0, x: -60 },
        { opacity: 1, x: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: leftRef.current, start: 'top 80%' }
        }
      )
      gsap.fromTo(rightRef.current.children,
        { opacity: 0, y: 50, rotateX: 15 },
        { opacity: 1, y: 0, rotateX: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: rightRef.current, start: 'top 80%' }
        }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <section id="about" className="py-28 bg-[#F9F6F0]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div ref={leftRef}>
            <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[var(--mahenti-accent)] mb-6">
              <span className="w-6 h-px bg-[var(--mahenti-accent)]" /> About Us
            </div>
            <h2 className="text-4xl md:text-5xl text-zinc-900 mb-6 leading-tight font-black font-display">
              Who We <span className="text-gradient">Are</span>
            </h2>
            <p className="text-zinc-600 text-base leading-relaxed mb-6">
              <strong className="text-zinc-900">Standard Group</strong> is a premier building materials supplier based in the UAE. We provide contractors, developers, and individual builders with access to a comprehensive range of construction and finishing materials — all from globally trusted brands.
            </p>
            <p className="text-zinc-500 text-sm leading-relaxed mb-8">
              From structural essentials like cement, steel, and concrete blocks, to finishing products like tiles, paints, sanitary ware, and electrical fittings — we are a one-stop solution for every phase of construction.
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-0.5 rounded-full bg-[var(--mahenti-accent)]" />
              <span className="text-[var(--mahenti-accent)] text-[11px] font-bold tracking-widest uppercase">We Set Standards</span>
            </div>
          </div>

          <div ref={rightRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4 perspective">
            {values.map(({ icon, title, description }) => (
              <ValueCard key={title} icon={icon} title={title} description={description} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
