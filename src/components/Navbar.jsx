import React, { useState, useEffect, useRef } from 'react'
import { Menu, X, Phone } from 'lucide-react'
import gsap from 'gsap'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Products', href: '#products' },
  { label: 'Brands', href: '#brands' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef(null)
  const linksRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.fromTo(navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 0.2 }
    )
    if (linksRef.current) {
      tl.fromTo(linksRef.current.children,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.07 }, '-=0.4'
      )
    }
    return () => tl.kill()
  }, [])

  return (
    <nav ref={navRef} style={{ opacity: 0 }} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'glass border-b border-zinc-800 shadow-2xl shadow-black/30' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-2xl border-2 border-[var(--mahenti-accent)] flex items-center justify-center group-hover:glow-accent transition-all duration-300">
            <span className="text-[var(--mahenti-accent)] font-black text-xl font-display">S</span>
          </div>
          <div>
            <div className="text-white font-bold text-base tracking-widest leading-none font-display">STANDARD GROUP</div>
            <div className="text-[var(--mahenti-accent)] text-[10px] tracking-[0.3em] uppercase">We Set Standards</div>
          </div>
        </a>

        <div ref={linksRef} className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href}
              className="text-zinc-400 hover:text-[var(--mahenti-accent)] transition-colors duration-300 text-sm tracking-wider uppercase font-medium relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-[var(--mahenti-accent)] after:transition-all after:duration-300 hover:after:w-full">
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex">
          <a href="tel:+971XXXXXXXX"
            className="flex items-center gap-2 bg-[var(--mahenti-accent)] text-zinc-900 font-bold px-5 py-2.5 rounded-2xl hover:brightness-110 transition-all duration-300 text-sm shadow-lg shadow-[var(--mahenti-accent)]/30">
            <Phone size={14} /><span>Call Us</span>
          </a>
        </div>

        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-[var(--mahenti-accent)] p-2">
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden glass border-t border-zinc-800 px-6 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} onClick={() => setMenuOpen(false)}
              className="text-zinc-300 hover:text-[var(--mahenti-accent)] transition-colors text-sm tracking-wider uppercase py-3 border-b border-zinc-800/50">
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
