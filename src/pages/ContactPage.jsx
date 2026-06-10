import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Phone, Mail, Globe, MapPin, MessageCircle, ArrowRight, Clock, CheckCircle } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const contactItems = [
  { icon: Phone, label: 'Phone', value: '+971 555599508', href: 'tel:+971555599508' },
  { icon: MessageCircle, label: 'WhatsApp', value: '+971 504654613', href: 'https://wa.me/971504654613' },
  { icon: Mail, label: 'Email', value: 'info@standardgroup.ae', href: 'mailto:info@standardgroup.ae' },
  { icon: Globe, label: 'Website', value: 'www.standardgroup.ae', href: 'https://www.standardgroup.ae' },
  { icon: MapPin, label: 'Location', value: 'Baniyas West, Abu Dhabi-U.A.E.', href: '#' },
]

export default function ContactPage() {
  const heroRef = useRef(null)
  const cardsRef = useRef(null)
  const formRef = useRef(null)
  const ctaRef = useRef(null)
  const [submitted, setSubmitted] = useState(false)

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
    if (!cardsRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(cardsRef.current.children,
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: cardsRef.current, start: 'top 80%' }
        }
      )
    })
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!formRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(formRef.current,
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: formRef.current, start: 'top 80%' }
        }
      )
    })
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!ctaRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(ctaRef.current.querySelectorAll('.cta-animate'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: ctaRef.current, start: 'top 85%' }
        }
      )
    })
    return () => ctx.revert()
  }, [])

  const inputClass = "w-full bg-zinc-950/60 border border-zinc-800 focus:border-[#A58B62]/50 outline-none text-zinc-300 text-sm px-4 py-3 rounded-xl transition-all duration-300 placeholder:text-zinc-600"

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Hero */}
      <section ref={heroRef} className="relative pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="hero-animate font-montserrat text-[11px] tracking-[0.3em] uppercase text-[#A58B62] mb-4">Get In Touch</p>
          <h1 className="hero-animate font-montserrat font-bold text-3xl md:text-5xl lg:text-6xl text-white mb-6">
            Contact <span className="text-[#14B8A6]">Us</span>
          </h1>
          <p className="hero-animate font-onest text-white/40 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10">
            Ready to supply your next project? Reach out for product availability, bulk pricing, and delivery anywhere in the UAE.
          </p>
          <div className="hero-animate flex flex-wrap items-center justify-center gap-4">
            <a href="tel:+971555599508" className="magnetic-btn group inline-flex items-center gap-3 bg-[#A58B62] text-white px-8 py-4 rounded-full text-sm font-medium hover:bg-[#8B7355] transition-all duration-300 shadow-lg shadow-[#A58B62]/20">
              <Phone size={16} />
              Call Now
            </a>
            <a href="https://wa.me/971504654613" target="_blank" rel="noreferrer" className="magnetic-btn group inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-full text-sm font-medium hover:bg-[#128C7E] transition-all duration-300 shadow-lg shadow-[#25D366]/30">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.13 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* Contact Cards + Form */}
      <section className="pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Contact cards */}
            <div ref={cardsRef} className="lg:col-span-2 flex flex-col gap-3">
              {contactItems.map(({ icon: Icon, label, value, href }) => (
                <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
                  className="flex items-center gap-4 p-5 rounded-2xl border border-zinc-800 bg-zinc-900 hover:border-[#A58B62]/40 transition-all duration-300 group">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 bg-[#A58B62]/10 border border-[#A58B62]/20 group-hover:bg-[#A58B62]/20 transition-all">
                    <Icon size={18} className="text-[#A58B62]" />
                  </div>
                  <div>
                    <div className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest">{label}</div>
                    <div className="text-zinc-300 text-sm group-hover:text-[#A58B62] transition-colors font-medium">{value}</div>
                  </div>
                  <ArrowRight size={14} className="ml-auto text-zinc-700 group-hover:text-[#A58B62] transition-colors flex-shrink-0" />
                </a>
              ))}
              <div className="mt-4 p-5 rounded-2xl border border-zinc-800 bg-zinc-900">
                <div className="flex items-center gap-2 mb-2">
                  <Clock size={14} className="text-[#14B8A6]" />
                  <span className="text-zinc-400 text-xs font-bold uppercase tracking-wider">Working Hours</span>
                </div>
                <p className="text-zinc-300 text-sm">Saturday – Thursday: 8:00 AM – 6:00 PM</p>
                <p className="text-zinc-500 text-sm">Friday: Closed</p>
              </div>
            </div>

            {/* Form */}
            <div ref={formRef} className="lg:col-span-3 p-8 md:p-10 rounded-2xl border border-zinc-800 bg-zinc-900">
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <CheckCircle size={48} className="text-[#14B8A6] mb-4" />
                  <h3 className="text-white font-bold text-xl mb-2 font-montserrat">Message Sent!</h3>
                  <p className="text-zinc-400 text-sm max-w-sm">Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                  <button onClick={() => setSubmitted(false)} className="mt-6 text-[#A58B62] text-sm font-medium hover:underline">Send another message</button>
                </div>
              ) : (
                <>
                  <h3 className="text-white font-bold text-lg mb-6 font-montserrat">Send an Enquiry</h3>
                  <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }} className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-zinc-500 text-[11px] font-bold uppercase tracking-widest mb-2 block">Name</label>
                        <input type="text" placeholder="Your name" className={inputClass} required />
                      </div>
                      <div>
                        <label className="text-zinc-500 text-[11px] font-bold uppercase tracking-widest mb-2 block">Phone</label>
                        <input type="tel" placeholder="+971 555599508" className={inputClass} />
                      </div>
                    </div>
                    <div>
                      <label className="text-zinc-500 text-[11px] font-bold uppercase tracking-widest mb-2 block">Email</label>
                      <input type="email" placeholder="your@email.com" className={inputClass} required />
                    </div>
                    <div>
                      <label className="text-zinc-500 text-[11px] font-bold uppercase tracking-widest mb-2 block">Product / Category</label>
                      <input type="text" placeholder="e.g. Cement, Steel, Tiles..." className={inputClass} />
                    </div>
                    <div>
                      <label className="text-zinc-500 text-[11px] font-bold uppercase tracking-widest mb-2 block">Message</label>
                      <textarea rows="4" placeholder="Tell us about your project requirements..." className={`${inputClass} resize-none`} />
                    </div>
                    <button type="submit" className="mt-2 w-full bg-[#A58B62] text-white font-bold text-sm text-center py-4 rounded-xl hover:bg-[#8B7355] transition-all duration-200 tracking-wide">
                      Send Enquiry
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section ref={ctaRef} className="py-20 md:py-28 bg-[#F9F6F0]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="cta-animate font-montserrat text-[11px] tracking-[0.3em] uppercase text-[#A58B62] mb-4">Browse Our Range</p>
          <h2 className="cta-animate font-montserrat font-bold text-2xl md:text-4xl lg:text-5xl text-[#1a1a1a] mb-6">
            Looking for specific products?
          </h2>
          <p className="cta-animate font-onest text-[#666] text-base max-w-lg mx-auto leading-relaxed mb-10">
            Explore our full catalogue of 17 categories and 200+ products from premium global brands.
          </p>
          <div className="cta-animate flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/products" className="magnetic-btn group inline-flex items-center gap-3 bg-[#0c0c0b] text-white px-8 py-4 rounded-full text-sm font-medium hover:bg-[#1a1a1a] transition-all duration-300 shadow-lg">
              View Products
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <a href="/" className="magnetic-btn group inline-flex items-center gap-3 border border-[#1a1a1a]/20 text-[#1a1a1a] px-8 py-4 rounded-full text-sm font-medium hover:bg-[#1a1a1a]/5 transition-all duration-300">
              Back to Home
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
