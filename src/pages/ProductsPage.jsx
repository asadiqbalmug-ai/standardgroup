import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronDown, ChevronUp, Package, Mail, MessageCircle } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { productCategories } from '../data/products'

gsap.registerPlugin(ScrollTrigger)

/* ── Map category slugs to page routes ── */
const SLUG_MAP = {
  'electric-water-heaters': '/milano-water-heaters',
  'water-closet': '/water-closets',
  'wash-basin': '/wash-basins',
  'wall-hung': '/wall-hung',
  'tiles': '/tiles-roof-interlock',
  'sanitary-ware': '/sanitary-ware',
  'blocks-aggregates': '/blocks-sands',
  'cement': '/cement',
  'tile-glue-grout': '/tiles-roof-interlock',
  'steel': '/steel',
  'plywood': '/film-faced-plywood',
  'waterproofing': '/water-proofing',
  'gypsum-board': '/gypsum-board',
  'paints': '/paints-tools',
  'general-tools': '/general-tools-plumbing',
  'plumbing-sanitary': '/plumbing-sanitary',
  'electric-lights': '/electric-lights',
}

function CategoryCard({ cat, index }) {
  const [expanded, setExpanded] = useState(false)
  const cardRef = useRef(null)
  const route = SLUG_MAP[cat.slug] || `/products`

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, delay: index * 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: cardRef.current, start: 'top 88%' }
        }
      )
    })
    return () => ctx.revert()
  }, [index])

  return (
    <div ref={cardRef} className="group bg-white rounded-2xl border border-black/[0.06] overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-black/5 hover:-translate-y-1">
      {/* Header */}
      <div className="p-6 md:p-8">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{cat.icon}</span>
            <div>
              <h3 className="font-montserrat font-bold text-lg text-[#1a1a1a]">{cat.name}</h3>
              <p className="text-[11px] text-[#A58B62] font-semibold uppercase tracking-wider">{cat.products.length} items</p>
            </div>
          </div>
          <Link
            to={route}
            className="flex-shrink-0 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#0F766E] hover:text-[#14B8A6] transition-colors"
          >
            View <ArrowRight size={12} />
          </Link>
        </div>
        <p className="text-[#666] text-sm leading-relaxed">{cat.description}</p>
        {cat.brands && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {cat.brands.map((b) => (
              <span key={b} className="text-[10px] font-semibold uppercase tracking-wider text-[#888] bg-[#F9F6F0] px-2.5 py-1 rounded-full">{b}</span>
            ))}
          </div>
        )}
      </div>

      {/* Product list — expandable */}
      <div className="border-t border-black/[0.04]">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-between px-6 md:px-8 py-3 text-[11px] font-bold uppercase tracking-wider text-[#888] hover:text-[#1a1a1a] transition-colors"
        >
          <span className="flex items-center gap-2">
            <Package size={13} />
            {expanded ? 'Hide items' : `Show all ${cat.products.length} items`}
          </span>
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
        <div className={`overflow-hidden transition-all duration-500 ${expanded ? 'max-h-[600px]' : 'max-h-0'}`}>
          <div className="px-6 md:px-8 pb-6 grid gap-2">
            {cat.products.map((p) => (
              <div key={p.id} className="flex items-center justify-between py-2.5 border-b border-black/[0.03] last:border-0">
                <div>
                  <p className="font-montserrat font-semibold text-sm text-[#1a1a1a]">{p.name}</p>
                  {p.model && <p className="text-[10px] text-[#888] mt-0.5">Model #{p.model}</p>}
                </div>
                {p.specs && (
                  <span className="hidden sm:inline text-[10px] text-[#888] bg-[#F9F6F0] px-2 py-1 rounded-md ml-2 flex-shrink-0 max-w-[180px] truncate">
                    {p.specs}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProductsPage() {
  const heroRef = useRef(null)
  const gridRef = useRef(null)
  const ctaRef = useRef(null)

  const totalItems = productCategories.reduce((sum, c) => sum + c.products.length, 0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(heroRef.current.querySelectorAll('.hero-animate'),
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out' }
      )
    })
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!gridRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(gridRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.06, ease: 'power3.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 80%' }
        }
      )
    })
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!ctaRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(ctaRef.current.querySelectorAll('.cta-animate'),
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: ctaRef.current, start: 'top 80%' }
        }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <div className="min-h-screen bg-[#F9F6F0]">
      {/* Hero */}
      <section ref={heroRef} className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-[#0c0c0b]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="hero-animate font-montserrat text-[11px] tracking-[0.3em] uppercase text-[#A58B62] mb-4">Our Catalogue</p>
          <h1 className="hero-animate font-montserrat font-bold text-3xl md:text-5xl lg:text-6xl text-white mb-6">
            <span className="text-white">{productCategories.length} Categories.</span>{' '}
            <span className="text-[#14B8A6]">{totalItems}+ Products.</span>
          </h1>
          <p className="hero-animate font-onest text-white/40 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10">
            From structural essentials to luxury finishing — browse our complete range of building materials, all in one place.
          </p>
          <div className="hero-animate flex flex-wrap items-center justify-center gap-4">
            <a href="mailto:info@standardgroup.ae" className="magnetic-btn group inline-flex items-center gap-3 bg-[#A58B62] text-white px-8 py-4 rounded-full text-sm font-medium hover:bg-[#8B7355] transition-all duration-300 shadow-lg shadow-[#A58B62]/20">
              Request Quote
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a href="https://wa.me/971504654613" target="_blank" rel="noreferrer" className="magnetic-btn group inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-full text-sm font-medium hover:bg-[#128C7E] transition-all duration-300 shadow-lg shadow-[#25D366]/30">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.13 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productCategories.map((cat, i) => (
              <CategoryCard key={cat.id} cat={cat} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section ref={ctaRef} className="py-20 md:py-28 bg-[#0c0c0b]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="cta-animate font-montserrat text-[11px] tracking-[0.3em] uppercase text-[#A58B62] mb-4">Need Something Specific?</p>
          <h2 className="cta-animate font-montserrat font-bold text-2xl md:text-4xl lg:text-5xl text-white mb-6">
            Can't find what you're looking for?
          </h2>
          <p className="cta-animate font-onest text-white/40 text-base max-w-lg mx-auto leading-relaxed mb-10">
            We source specialized materials on request. Tell us what you need and our team will get back to you within 24 hours.
          </p>
          <div className="cta-animate flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="mailto:info@standardgroup.ae" className="magnetic-btn group flex items-center gap-3 bg-[#A58B62] text-white px-8 py-4 rounded-full text-sm font-medium hover:bg-[#8B7355] transition-all duration-300 shadow-lg shadow-[#A58B62]/20">
              <Mail size={16} />
              Email Us
            </a>
            <a href="tel:+971555599508" className="magnetic-btn group flex items-center gap-3 border border-white/20 text-white px-8 py-4 rounded-full text-sm font-medium hover:bg-white/10 transition-all duration-300">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
              Call Now
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
