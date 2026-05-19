import React, { useEffect, useRef } from 'react'
import { Phone, Mail, Globe, MapPin, MessageCircle } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const contactItems = [
  { icon: Phone, label: 'Phone', value: '+971 XXXX XXXX', href: 'tel:+971XXXXXXXX' },
  { icon: MessageCircle, label: 'WhatsApp', value: '+971 XXXX XXXX', href: 'https://wa.me/971XXXXXXXX' },
  { icon: Mail, label: 'Email', value: 'info@standardgroup.ae', href: 'mailto:info@standardgroup.ae' },
  { icon: Globe, label: 'Website', value: 'www.standardgroup.ae', href: 'https://www.standardgroup.ae' },
  { icon: MapPin, label: 'Location', value: 'UAE', href: '#' },
]

export default function Contact() {
  const headerRef = useRef(null)
  const cardsRef = useRef(null)
  const formRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current.children,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 80%' }
        }
      )
      gsap.fromTo(cardsRef.current.children,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: cardsRef.current, start: 'top 80%' }
        }
      )
      gsap.fromTo(formRef.current,
        { opacity: 0, x: 50, rotateY: 5 },
        { opacity: 1, x: 0, rotateY: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: formRef.current, start: 'top 80%' }
        }
      )
    })
    return () => ctx.revert()
  }, [])

  const inputClass = "w-full bg-zinc-950/60 border border-zinc-800 focus:border-[var(--mahenti-accent)]/50 outline-none text-zinc-300 text-sm px-4 py-3 rounded-2xl transition-all duration-300 focus:glow-accent placeholder:text-zinc-600"

  return (
    <section id="contact" className="py-28 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={headerRef} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[var(--mahenti-accent)] mb-3">
            <span className="w-6 h-px bg-[var(--mahenti-accent)]" /> Get In Touch
          </div>
          <h2 className="text-4xl md:text-5xl text-white mb-4 font-black font-display">
            Contact <span className="text-gradient">Us</span>
          </h2>
          <p className="text-zinc-500 max-w-xl mx-auto text-sm leading-relaxed">
            Ready to supply your next project? Reach out to our team for product availability, pricing, and delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 perspective">
          <div ref={cardsRef} className="lg:col-span-2 flex flex-col gap-3">
            {contactItems.map(({ icon: Icon, label, value, href }) => (
              <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl border border-zinc-800 bg-zinc-900 hover:border-[var(--mahenti-accent)]/50 transition-all duration-300 group hover:glow-accent">
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 bg-[var(--mahenti-accent)]/10 border border-[var(--mahenti-accent)]/20 group-hover:bg-[var(--mahenti-accent)]/20 transition-all">
                  <Icon size={16} className="text-[var(--mahenti-accent)]" />
                </div>
                <div>
                  <div className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest">{label}</div>
                  <div className="text-zinc-300 text-sm group-hover:text-[var(--mahenti-accent)] transition-colors font-medium">{value}</div>
                </div>
              </a>
            ))}
          </div>

          <div ref={formRef} className="lg:col-span-3 p-8 rounded-2xl border border-zinc-800 bg-zinc-900 preserve-3d">
            <h3 className="text-white font-bold text-lg mb-6 font-display">Send an Enquiry</h3>
            <form className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-zinc-500 text-[11px] font-bold uppercase tracking-widest mb-2 block">Name</label>
                  <input type="text" placeholder="Your name" className={inputClass} />
                </div>
                <div>
                  <label className="text-zinc-500 text-[11px] font-bold uppercase tracking-widest mb-2 block">Phone</label>
                  <input type="tel" placeholder="+971 XXXX XXXX" className={inputClass} />
                </div>
              </div>
              <div>
                <label className="text-zinc-500 text-[11px] font-bold uppercase tracking-widest mb-2 block">Email</label>
                <input type="email" placeholder="your@email.com" className={inputClass} />
              </div>
              <div>
                <label className="text-zinc-500 text-[11px] font-bold uppercase tracking-widest mb-2 block">Product / Category</label>
                <input type="text" placeholder="e.g. Cement, Steel, Tiles..." className={inputClass} />
              </div>
              <div>
                <label className="text-zinc-500 text-[11px] font-bold uppercase tracking-widest mb-2 block">Message</label>
                <textarea rows={4} placeholder="Describe your requirements..." className={inputClass + ' resize-none'} />
              </div>
              <button type="submit"
                className="mt-2 bg-[var(--mahenti-accent)] text-zinc-900 font-bold px-8 py-4 rounded-2xl hover:brightness-110 transition-all duration-300 text-sm tracking-widest uppercase shadow-lg shadow-[var(--mahenti-accent)]/30 font-display">
                Send Enquiry
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
