import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { brands } from '../data/products'

export default function BrandTicker() {
  const track1 = useRef(null)
  const track2 = useRef(null)

  useEffect(() => {
    const w = track1.current.scrollWidth / 2
    gsap.to(track1.current, { x: -w, duration: 30, ease: 'none', repeat: -1 })
    gsap.to(track2.current, { x: -w, duration: 30, ease: 'none', repeat: -1, delay: 15 })
  }, [])

  const items = [...brands, ...brands]

  return (
    <div className="w-full overflow-hidden border-t border-b border-zinc-200 py-5 bg-[#F9F6F0] relative">
      <div className="absolute left-0 top-0 h-full w-32 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #F9F6F0, transparent)' }} />
      <div className="absolute right-0 top-0 h-full w-32 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #F9F6F0, transparent)' }} />

      <div className="flex whitespace-nowrap will-change-transform" style={{ width: 'max-content' }}>
        <div ref={track1} className="flex gap-12 pr-12">
          {items.map((b, i) => (
            <span key={`t1-${i}`}
              className={`text-[11px] font-bold tracking-[0.25em] uppercase font-display ${i % 3 === 0 ? 'text-[var(--mahenti-accent)]' : 'text-zinc-400'}`}>
              {b.name}
            </span>
          ))}
        </div>
        <div ref={track2} className="flex gap-12 pr-12">
          {items.map((b, i) => (
            <span key={`t2-${i}`}
              className={`text-[11px] font-bold tracking-[0.25em] uppercase font-display ${i % 3 === 0 ? 'text-[var(--mahenti-accent)]' : 'text-zinc-400'}`}>
              {b.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
