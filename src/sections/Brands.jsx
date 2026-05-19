import React, { useState, useEffect, useRef, useCallback } from 'react'
import { brands } from '../data/products'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const categories = ['All', ...Array.from(new Set(brands.map((b) => b.category))).sort()]

function BrandCard({ brand }) {
  const ref = useRef(null)
  const handleMove = useCallback((e) => {
    const r = ref.current.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    gsap.to(ref.current, { rotateY: x * 12, rotateX: -y * 12, scale: 1.05, duration: 0.3, ease: 'power2.out' })
  }, [])
  const handleLeave = useCallback(() => {
    gsap.to(ref.current, { rotateY: 0, rotateX: 0, scale: 1, duration: 0.5, ease: 'power3.out' })
  }, [])

  return (
    <div ref={ref} onMouseMove={handleMove} onMouseLeave={handleLeave}
      className="group flex flex-col items-center justify-center p-5 rounded-2xl border border-zinc-800 bg-zinc-900 hover:border-[var(--mahenti-accent)]/50 transition-all duration-300 cursor-default relative preserve-3d"
      style={{ minHeight: '120px' }}>
      <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-zinc-700 group-hover:bg-[var(--mahenti-accent)] transition-colors" />
      <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3 border border-zinc-800 group-hover:border-[var(--mahenti-accent)]/50 transition-all bg-zinc-950/50 group-hover:glow-accent">
        <span className="font-black text-xl text-gradient font-display">{brand.name.charAt(0)}</span>
      </div>
      <div className="text-white text-xs font-bold group-hover:text-[var(--mahenti-accent)] transition-colors leading-tight text-center font-display">
        {brand.name}
      </div>
      <div className="text-zinc-600 text-[10px] mt-1 tracking-wider uppercase text-center font-bold">{brand.category}</div>
    </div>
  )
}

export default function Brands() {
  const [activeCategory, setActiveCategory] = useState('All')
  const filtered = activeCategory === 'All' ? brands : brands.filter((b) => b.category === activeCategory)
  const headerRef = useRef(null)
  const gridRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current.children,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 80%' }
        }
      )
    })
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!gridRef.current) return
    gsap.fromTo(gridRef.current.children,
      { opacity: 0, y: 30, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.03, ease: 'power3.out', overwrite: true }
    )
  }, [filtered])

  return (
    <section id="brands" className="py-28 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={headerRef} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[var(--mahenti-accent)] mb-3">
            <span className="w-6 h-px bg-[var(--mahenti-accent)]" /> Trusted Partners
          </div>
          <h2 className="text-4xl md:text-5xl text-white mb-4 font-black font-display">
            Brands We <span className="text-gradient">Represent</span>
          </h2>
          <p className="text-zinc-500 max-w-2xl mx-auto text-sm leading-relaxed">
            We partner with the world's leading building material manufacturers to ensure every product meets the highest standards of quality and reliability.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-2xl text-[11px] font-bold tracking-widest uppercase transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-[var(--mahenti-accent)] text-zinc-900 shadow-lg shadow-[var(--mahenti-accent)]/30'
                  : 'border border-zinc-700 bg-white/5 backdrop-blur text-zinc-400 hover:border-zinc-500 hover:text-white'
              }`}>
              {cat}
            </button>
          ))}
        </div>

        <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 perspective">
          {filtered.map((brand) => (
            <BrandCard key={brand.id} brand={brand} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-zinc-600 text-[11px] font-bold tracking-widest uppercase">
            {filtered.length} brand{filtered.length !== 1 ? 's' : ''}{activeCategory !== 'All' ? ` in ${activeCategory}` : ' represented'}
          </p>
        </div>
      </div>
    </section>
  )
}
