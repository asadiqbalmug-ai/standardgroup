import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'

const stats = [
  { n: '20+', t: 'Years Experience' },
  { n: '31+', t: 'Global Brands' },
  { n: '500+', t: 'Products' },
  { n: '2', t: 'Locations in UAE' },
]

const values = [
  { i: '01', t: 'Quality First', d: 'We never compromise on material standards. Every product meets or exceeds international certifications.' },
  { i: '02', t: 'Partnership', d: 'We work alongside our clients from specification to installation, ensuring project success at every stage.' },
  { i: '03', t: 'Reliability', d: 'On-time delivery, consistent stock levels, and transparent pricing — no surprises, no delays.' },
  { i: '04', t: 'Innovation', d: 'We continuously expand our range to bring the latest global building solutions to the UAE market.' },
]

const timeline = [
  { year: '2003', title: 'Founded in Abu Dhabi', desc: 'Started as a small trading company supplying raw building materials to local contractors.' },
  { year: '2008', title: 'Brand Partnerships Begin', desc: 'Secured exclusive distribution rights for major European and Asian sanitary brands.' },
  { year: '2015', title: '500+ Product Range', desc: 'Expanded from raw aggregates to complete finishing solutions — tiles, paints, waterproofing, and more.' },
  { year: '2020', title: 'Second Location', desc: 'Opened the Mafraq showroom to better serve northern Abu Dhabi and Al Ain corridor projects.' },
  { year: '2024', title: 'Digital Transformation', desc: 'Launched online catalog and enquiry system to streamline procurement for clients nationwide.' },
]

export default function AboutPage() {
  const heroRef = useRef(null)
  const statsRef = useRef(null)
  const valuesRef = useRef(null)
  const timelineRef = useRef(null)
  const ctaRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero
      gsap.fromTo('.about-hero-title', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' })
      gsap.fromTo('.about-hero-sub', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, delay: 0.15, ease: 'power3.out' })
      gsap.fromTo('.about-hero-body', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: 0.3, ease: 'power3.out' })

      // Stats
      gsap.fromTo('.about-stat-item', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: statsRef.current, start: 'top 80%' } })

      // Values
      gsap.fromTo('.about-value-card', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: valuesRef.current, start: 'top 75%' } })

      // Timeline
      gsap.fromTo('.about-timeline-item', { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: timelineRef.current, start: 'top 75%' } })

      // CTA
      gsap.fromTo('.about-cta-content', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: ctaRef.current, start: 'top 80%' } })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div className="min-h-screen bg-[#F5F0E8] pt-24">
      {/* Hero */}
      <section ref={heroRef} className="relative py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <span className="about-hero-sub inline-block font-montserrat text-[11px] tracking-[0.3em] uppercase text-[#0F766E] mb-4">About Us</span>
            <h1 className="about-hero-title font-montserrat text-4xl md:text-5xl lg:text-6xl font-bold text-[#0c0c0b] leading-[1.1] mb-6">
              We Set Standards.
            </h1>
            <p className="about-hero-body font-onest text-[#555] text-lg leading-relaxed max-w-2xl">
              Since 2003, Standard Group has been the UAE's trusted partner for building materials. 
              From raw aggregates to luxury bathroom fittings, we supply everything your project needs — 
              backed by decades of expertise, global brand partnerships, and a relentless commitment to quality.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section ref={statsRef} className="py-16 border-y border-[#0c0c0b]/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <div key={i} className="about-stat-item text-center">
                <span className="font-montserrat text-4xl md:text-5xl font-bold text-[#0F766E] block mb-2">{s.n}</span>
                <span className="font-onest text-[#666] text-sm">{s.t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section ref={valuesRef} className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="font-montserrat text-[11px] tracking-[0.3em] uppercase text-[#0F766E] mb-3 block">What Drives Us</span>
            <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-[#0c0c0b]">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((v, i) => (
              <div key={i} className="about-value-card p-8 md:p-10 rounded-2xl bg-white border border-black/[0.04] hover:shadow-xl hover:shadow-[#0F766E]/5 transition-all duration-500">
                <span className="font-montserrat text-sm text-[#0F766E] font-bold mb-4 block">{v.i}</span>
                <h3 className="font-montserrat text-xl font-bold text-[#0c0c0b] mb-3">{v.t}</h3>
                <p className="font-onest text-[#666] text-[15px] leading-relaxed">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section ref={timelineRef} className="py-20 md:py-28 bg-[#0c0c0b]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="font-montserrat text-[11px] tracking-[0.3em] uppercase text-[#14B8A6] mb-3 block">Our Journey</span>
            <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-white">Two Decades of Growth</h2>
          </div>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-[#14B8A6]/20 md:-translate-x-px" />
            {timeline.map((item, i) => (
              <div key={i} className={`about-timeline-item relative flex items-start gap-6 md:gap-0 mb-12 last:mb-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-[#14B8A6] border-2 border-[#0c0c0b] -translate-x-1.5 md:-translate-x-1.5 mt-1.5 z-10" />
                {/* Content */}
                <div className={`ml-10 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                  <span className="font-montserrat text-[#14B8A6] text-sm font-bold block mb-1">{item.year}</span>
                  <h3 className="font-montserrat text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="font-onest text-white/40 text-[14px] leading-relaxed">{item.desc}</p>
                </div>
                {/* Spacer for opposite side */}
                <div className="hidden md:block md:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef} className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="about-cta-content">
            <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-[#0c0c0b] mb-4">
              Ready to Build?
            </h2>
            <p className="font-onest text-[#666] text-lg mb-8 max-w-xl mx-auto">
              Whether you are starting a new project or restocking your site, our team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/products" className="inline-flex items-center px-8 py-3.5 bg-[#0F766E] text-white font-montserrat text-sm font-bold tracking-wider uppercase rounded-sm hover:bg-[#0D6B64] transition-colors">
                Browse Products
              </Link>
              <Link to="/contact" className="inline-flex items-center px-8 py-3.5 border border-[#0F766E] text-[#0F766E] font-montserrat text-sm font-bold tracking-wider uppercase rounded-sm hover:bg-[#0F766E] hover:text-white transition-colors">
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
