import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { createPortal } from 'react-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import WhatsAppButton from './components/WhatsAppButton'
import ChatbotButton from './components/ChatbotButton'

gsap.registerPlugin(ScrollTrigger)

/* ═══════════════════════════════════════════════════════════
   DESIGN — Emerald teal accent, DARK→LIGHT clustering
   Cluster A: DARK  (hero, stats, texture marquee)
   Cluster B: LIGHT (split, philosophy, process)
   Cluster C: DARK  (products, brands, construction)
   Cluster D: LIGHT (showroom, trust)
   Cluster E: DARK  (CTA, footer)
   ═══════════════════════════════════════════════════════════ */
const C = {
  bg:'#F5F0E8', dark:'#0c0c0b', accent:'#0F766E', accentL:'#14B8A6', accentD:'#0D6B64',
  slate:'#141a23', charcoal:'#111110', white:'#FFFFFF', cream:'#F5F0E8', muted:'#64748b',
  darkCard:'#181e28', lightCard:'#ede8df',
}

/* ── CURSOR ── */
function Cursor() {
  const d = useRef(null), r = useRef(null)
  useEffect(() => {
    if(window.innerWidth < 1024) return
    const dot = d.current, ring = r.current; if(!dot||!ring) return
    const mv = (e) => { gsap.to(dot,{x:e.clientX,y:e.clientY,duration:0.06,overwrite:true}); gsap.to(ring,{x:e.clientX,y:e.clientY,duration:0.25,ease:'power2.out',overwrite:true}) }
    window.addEventListener('mousemove',mv,{passive:true})
    return ()=>window.removeEventListener('mousemove',mv)
  },[])
  return <>
    <div ref={d} className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden lg:block" style={{background:C.accentL}}/>
    <div ref={r} className="fixed top-0 left-0 w-11 h-11 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden lg:block border-2" style={{borderColor:C.accentL}}/>
  </>
}

/* ── MAGNETIC BUTTON ── */
function MagBtn({children,className='',href,ghost=false,to}) {
  const ref = useRef(null)
  const mv = (e) => { if(!ref.current) return; const b=ref.current.getBoundingClientRect(); gsap.to(ref.current,{x:(e.clientX-b.left-b.width/2)*0.3,y:(e.clientY-b.top-b.height/2)*0.3,scale:1.06,duration:0.3,ease:'power2.out',overwrite:true}) }
  const lv = () => { if(!ref.current) return; gsap.to(ref.current,{x:0,y:0,scale:1,duration:0.5,ease:'elastic.out(1,0.4)',overwrite:true}) }
  const base = ghost ? 'border border-white/20 text-white hover:bg-white/10 backdrop-blur-sm' : 'text-white hover:brightness-110'
  const cls = `inline-flex items-center gap-2.5 px-8 py-4 font-poppins font-semibold text-[13px] tracking-[0.08em] uppercase transition-all duration-300 ${base} ${className}`
  const st = ghost ? {} : {background:`linear-gradient(135deg,${C.accent},${C.accentD})`}
  if(to) return <Link ref={ref} to={to} onMouseMove={mv} onMouseLeave={lv} className={cls} style={st}>{children}</Link>
  if(href) return <a ref={ref} href={href} onMouseMove={mv} onMouseLeave={lv} className={cls} style={st}>{children}</a>
  return <button ref={ref} onMouseMove={mv} onMouseLeave={lv} className={cls} style={st}>{children}</button>
}

/* ── Lazy image with loading=lazy + decoding=async ── */
const Img = ({src, alt='', className='', style={}}) => <img src={src} alt={alt} className={className} style={style} loading="lazy" decoding="async" />


/* ═══════════════════════════════════════════════════════════
   ████  CLUSTER A — DARK  ████████████████████████████████
   ═══════════════════════════════════════════════════════════ */

/* ── 1. HERO ── */
function Hero() {
  const sec = useRef(null), h1 = useRef(null), sub = useRef(null), cta = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.hero-img', { yPercent: 12, ease: 'none', scrollTrigger: { trigger: sec.current, start: 'top top', end: 'bottom top', scrub: true } })
      const tl = gsap.timeline({ delay: 0.4 })
      tl.fromTo(h1.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' })
        .fromTo(sub.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '-=0.6')
        .fromTo(cta.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
    }, sec)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sec} className="relative h-screen flex items-center overflow-hidden" style={{ background: C.dark }}>
      {/* Background video */}
      <div className="absolute inset-0 overflow-hidden">
        <video src="/standardgrouphero.mp4" autoPlay loop muted playsInline className="hero-img absolute inset-0 w-full h-full object-cover" />
      </div>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(12,12,11,0.85) 0%, rgba(12,12,11,0.4) 50%, rgba(12,12,11,0.6) 100%)' }} />

      {/* Content - centered vertically with big bottom margin to clear ticker */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 pt-20 mb-28">
        {/* Headline */}
        <h1 ref={h1} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white leading-[1.15] mb-6 max-w-5xl" style={{ opacity: 0 }}>
          <span className="font-montserrat font-bold">Building the UAE,</span><br className="hidden sm:block" /> <span className="font-montserrat">One Material at a Time.</span>
        </h1>

        {/* Subtitle */}
        <p ref={sub} className="font-onest text-white/50 text-base md:text-lg max-w-2xl leading-relaxed mb-8" style={{ opacity: 0 }}>
          Two decades of excellence. <span style={{ color: C.accentL }}>31+ global brands.</span> 500+ premium products. From foundations to finishing — we supply what builds the UAE.
        </p>

        {/* CTAs */}
        <div ref={cta} className="flex flex-wrap items-center gap-4" style={{ opacity: 0 }}>
          <MagBtn to="/products">Explore Products</MagBtn>
        </div>
      </div>

      {/* Ticker - serif italic to match logo */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden border-t border-white/10" style={{ background: 'rgba(15,118,110,0.12)' }}>
        <div className="ticker-wrap py-3.5">
          <div className="ticker-track flex whitespace-nowrap">
            {[...Array(3)].map((_, i) => (
              <span key={i} className="font-serif italic text-sm md:text-base tracking-wide text-white/60 px-10">
                20+ Years · 31+ Brands · 500+ Products · Trusted Across UAE · We Set Standards ·
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── 2. MATERIAL TEXTURES MARQUEE ── */
function Lightbox({ src, label, onClose }) {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 20)
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => { clearTimeout(t); window.removeEventListener('keydown', onKey) }
  }, [])

  const close = () => { setShow(false); setTimeout(onClose, 280) }

  const overlayStyle = { position:'fixed', top:0, left:0, right:0, bottom:0, zIndex:9999, background:'#080808', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:32, opacity:show?1:0, transition:'opacity 0.25s ease' }
  const imgWrapStyle = { position:'relative', maxWidth:'90vw', maxHeight:'80vh', transform:show?'scale(1)':'scale(0.85)', opacity:show?1:0, transition:'transform 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease' }
  const labelStyle = { marginTop:24, fontFamily:"'Poppins',sans-serif", color:'white', fontSize:17, fontWeight:700, opacity:show?1:0, transform:show?'translateY(0)':'translateY(10px)', transition:'opacity 0.4s ease 0.1s, transform 0.4s ease 0.1s' }

  return createPortal(
    <div style={overlayStyle} onClick={close}>
      <div style={{width:'100%',height:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}} onClick={(e) => e.stopPropagation()}>
        <div style={imgWrapStyle}>
          <img src={src} alt={label} style={{maxWidth:'90vw',maxHeight:'80vh',objectFit:'contain',borderRadius:10,display:'block',boxShadow:'0 30px 80px rgba(0,0,0,0.6)'}} />
          <button onClick={close} style={{position:'absolute',top:-18,right:-18,width:44,height:44,borderRadius:'50%',background:'rgba(255,255,255,0.12)',display:'flex',alignItems:'center',justifyContent:'center',border:'1px solid rgba(255,255,255,0.15)',cursor:'pointer',transition:'background 0.2s'}} onMouseEnter={(e) => e.currentTarget.style.background='rgba(255,255,255,0.25)'} onMouseLeave={(e) => e.currentTarget.style.background='rgba(255,255,255,0.12)'}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
        <span style={labelStyle}>{label}</span>
      </div>
    </div>,
    document.body
  )
}

const texDrag = { current: false }

function TexCard({ item }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div className="tex-card relative flex-shrink-0 w-[260px] h-[170px] md:w-[340px] md:h-[220px] rounded-xl overflow-hidden group cursor-pointer" style={{opacity:0}} onClick={() => { if (texDrag.current) return; setOpen(true) }}>
        <div className="absolute inset-0 overflow-hidden">
          <Img src={item.src} className="tex-img w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-110" />
        </div>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500" />
        <div className="absolute inset-0 flex items-end p-4">
          <span className="font-poppins text-white text-sm font-bold translate-y-full group-hover:translate-y-0 transition-transform duration-500">{item.label}</span>
        </div>
        <div className="absolute top-3 right-3 w-8 h-8 rounded-full border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:rotate-45">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </div>
      </div>
      {open && <Lightbox src={item.src} label={item.label} onClose={() => setOpen(false)} />}
    </>
  )
}

function parseTranslateX(str) {
  if (!str || str === 'none') return 0
  const m2d = str.match(/matrix\(([^)]+)\)/)
  if (m2d) {
    const vals = m2d[1].split(',').map(v => parseFloat(v.trim()))
    return vals[4] || 0
  }
  const m3d = str.match(/matrix3d\(([^)]+)\)/)
  if (m3d) {
    const vals = m3d[1].split(',').map(v => parseFloat(v.trim()))
    return vals[12] || 0
  }
  return 0
}

function useTexDrag(trackRef) {
  const isDown = useRef(false)
  const startX = useRef(0)
  const baseX = useRef(0)

  const onPointerDown = (e) => {
    try {
      console.log('[TexDrag] pointerdown', e.clientX)
      isDown.current = true
      texDrag.current = false
      startX.current = e.clientX
      const el = trackRef.current
      const style = window.getComputedStyle(el)
      baseX.current = parseTranslateX(style.transform)
      console.log('[TexDrag] baseX', baseX.current)
      el.style.animationPlayState = 'paused'
      el.style.transform = `translateX(${baseX.current}px)`
      el.style.willChange = 'transform'
      window.addEventListener('pointermove', onPointerMove)
      window.addEventListener('pointerup', onPointerUp)
    } catch (err) { console.error('[TexDrag] pointerdown error', err) }
  }

  const onPointerMove = (e) => {
    if (!isDown.current) return
    const dx = e.clientX - startX.current
    if (Math.abs(dx) > 4) texDrag.current = true
    const el = trackRef.current
    if (el) {
      const newX = baseX.current + dx
      el.style.transform = `translateX(${newX}px)`
      console.log('[TexDrag] pointermove dx:', dx, 'newX:', newX)
    }
  }

  const onPointerUp = () => {
    console.log('[TexDrag] pointerup')
    isDown.current = false
    window.removeEventListener('pointermove', onPointerMove)
    window.removeEventListener('pointerup', onPointerUp)
    const el = trackRef.current
    if (el) {
      el.style.transform = ''
      el.style.animationPlayState = 'running'
      el.style.willChange = ''
    }
    setTimeout(() => { texDrag.current = false }, 80)
  }

  return { onPointerDown }
}

function TextureMarquee() {
  const sec = useRef(null), title = useRef(null), sub = useRef(null)
  const track1 = useRef(null), track2 = useRef(null)
  const drag1 = useTexDrag(track1)
  const drag2 = useTexDrag(track2)

  const row1 = [
    {src:'/pics/1tile.JPG',label:'Ceramic Tiles'},
    {src:'/pics/1whitesand.JPG',label:'Washed Sand'},
    {src:'/pics/1crackedgravel.JPG',label:'Crushed Gravel'},
    {src:'/pics/8tile.JPG',label:'Porcelain Tiles'},
    {src:'/pics/6tile.JPG',label:'Wall Tiles'},
    {src:'/pics/1brownsand.JPG',label:'Brown Aggregate'},
  ]
  const row2 = [
    {src:'/pics/2tile.JPG',label:'Floor Tiles'},
    {src:'/pics/3interlock.JPG',label:'Interlock Pavers'},
    {src:'/pics/1whiterocks.JPG',label:'White Rocks'},
    {src:'/pics/7tile.JPG',label:'Mosaic Tiles'},
    {src:'/pics/5tile.JPG',label:'Roof Tiles'},
    {src:'/pics/4tile.JPG',label:'Terrazzo Tiles'},
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(title.current, {opacity:0, y:40, clipPath:'inset(0 100% 0 0)'}, {opacity:1, y:0, clipPath:'inset(0 0% 0 0)', duration:1.2, ease:'power3.out', scrollTrigger:{trigger:sec.current, start:'top 80%'}})
      gsap.fromTo(sub.current, {opacity:0, y:20}, {opacity:1, y:0, duration:0.9, delay:0.2, ease:'power3.out', scrollTrigger:{trigger:sec.current, start:'top 80%'}})
      gsap.utils.toArray('.tex-img').forEach((el) => {
        gsap.fromTo(el, {scale:1.15}, {scale:1, ease:'none', scrollTrigger:{trigger:el, start:'top bottom', end:'bottom top', scrub:1.5}})
      })
      gsap.utils.toArray('.tex-card').forEach((el, i) => {
        gsap.fromTo(el, {opacity:0, y:40, scale:0.94}, {opacity:1, y:0, scale:1, duration:0.8, delay:i*0.03, ease:'power3.out', scrollTrigger:{trigger:el, start:'top 92%'}})
      })
    }, sec)
    return ()=>ctx.revert()
  },[])

  return (
    <section ref={sec} className="relative py-20 md:py-28 overflow-hidden" style={{background:C.dark}}>
      {/* ambient top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-10 blur-[120px] pointer-events-none" style={{background:C.accent}} />
      <div className="text-center mb-12 md:mb-16 px-6 relative z-10">
        <h2 ref={title} className="font-montserrat text-3xl md:text-4xl lg:text-5xl xl:text-6xl uppercase tracking-[0.04em] mb-4" style={{color:C.accentL, opacity:0}}>Material Textures</h2>
        <p ref={sub} className="font-onest text-white/30 text-base md:text-lg max-w-md mx-auto" style={{opacity:0}}>Premium aggregates, tiles, and raw materials</p>
      </div>

      <div className="overflow-hidden mb-3 cursor-grab active:cursor-grabbing select-none" style={{touchAction:'pan-y'}} onPointerDown={drag1.onPointerDown}>
        <div ref={track1} className="flex gap-3 tex-track-l">
          {[...row1,...row1,...row1,...row1].map((item,i)=>(
            <TexCard key={i} item={item} />
          ))}
        </div>
      </div>

      <div className="overflow-hidden mb-3 cursor-grab active:cursor-grabbing select-none" style={{touchAction:'pan-y'}} onPointerDown={drag2.onPointerDown}>
        <div ref={track2} className="flex gap-3 tex-track-r">
          {[...row2,...row2,...row2,...row2].map((item,i)=>(
            <TexCard key={i} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   ████  CLUSTER B — LIGHT  ████████████████████████████████
   ═══════════════════════════════════════════════════════════ */

/* ── 4. SPLIT — Horizontal scroll: two image panels ── */
function Split() {
  const sec = useRef(null), track = useRef(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray('.split-panel')
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sec.current,
          start: 'top top',
          end: `+=${panels.length * 100}%`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        }
      })

      // Horizontal scroll
      tl.to(track.current, { xPercent: -100 * (panels.length - 1), ease: 'none', duration: 1 }, 0)

      // Panel 1 text reveal
      const p1 = panels[0].querySelectorAll('.split-line')
      p1.forEach((el, i) => {
        tl.fromTo(el, { opacity: 0, y: 50, clipPath: 'inset(100% 0 0 0)' },
          { opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)', ease: 'power3.out', duration: 0.12 }, 0.02 + i * 0.03)
      })

      // Panel 2 text reveal
      const p2 = panels[1].querySelectorAll('.split-line')
      p2.forEach((el, i) => {
        tl.fromTo(el, { opacity: 0, y: 50, clipPath: 'inset(100% 0 0 0)' },
          { opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)', ease: 'power3.out', duration: 0.12 }, 0.52 + i * 0.03)
      })
    }, sec)
    return () => ctx.revert()
  }, [])

  const panelData = [
    {
      img: '/pics/2interior.JPG',
      label: 'our promise',
      h1: 'Building Dreams,',
      h2: 'One Project at a Time.',
      body: 'From the foundation to the finishing touches, Standard Group provides everything a builder needs. Our curated portfolio spans concrete, steel, plumbing, electrical, waterproofing, and premium sanitary ware — all sourced from the world\'s finest manufacturers.',
      btn: 'Browse Sanitary Ware',
      btnTo: '/sanitary-ware',
    },
    {
      img: '/pics/1interior.JPG',
      label: 'our reach',
      h1: 'Across the UAE,',
      h2: 'From Coast to Desert.',
      body: 'Whether you\'re constructing a luxury villa in Dubai, a commercial tower in Abu Dhabi, or a residential community in Sharjah — we deliver the materials that make it possible. Two decades. 31+ brands. 500+ products. One partner.',
      btn: 'Explore All Products',
      btnTo: '/products',
    },
  ]

  return (
    <section ref={sec} className="relative overflow-hidden" style={{ background: C.cream }}>
      <div ref={track} className="flex h-screen">
        {panelData.map((p, i) => (
          <div key={i} className="split-panel relative flex-shrink-0 w-screen h-full flex items-center justify-center overflow-hidden">
            {/* Full-bleed image */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <Img src={p.img} className="split-h-img w-full h-full object-cover" />
            </div>
            {/* Gradient overlay */}
            <div className="absolute inset-0 z-[1]" style={{ background: i===0 ? 'linear-gradient(270deg, rgba(12,12,11,0.75) 0%, rgba(12,12,11,0.25) 60%, transparent 100%)' : 'linear-gradient(90deg, rgba(12,12,11,0.75) 0%, rgba(12,12,11,0.25) 60%, transparent 100%)' }} />
            {/* Content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
              <div className={`max-w-xl ${i===0?'ml-auto text-right':''}`}>
                <span className="split-line font-montserrat text-xl md:text-2xl lg:text-3xl uppercase tracking-wider block mb-6" style={{ color: 'white', opacity: 0 }}>{p.label}</span>
                <h2 className="split-line font-montserrat font-bold text-3xl md:text-4xl lg:text-5xl leading-[1.08] mb-2 text-white" style={{ opacity: 0 }}>{p.h1}</h2>
                <h2 className="split-line font-serif italic text-3xl md:text-4xl lg:text-5xl leading-[1.08] mb-8 text-white" style={{ opacity: 0 }}>{p.h2}</h2>
                <p className={`split-line font-onest text-white/60 text-[15px] leading-relaxed mb-8 max-w-lg ${i===0?'ml-auto':''}`} style={{ opacity: 0 }}>{p.body}</p>
                <div className="split-line" style={{ opacity: 0 }}>
                  <MagBtn to={p.btnTo} className="!text-white">{p.btn}</MagBtn>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ── 5. PHILOSOPHY ── */
function PhilCard({ c }) {
  const cardRef = useRef(null)
  const [mag, setMag] = useState({ x: 0, y: 0 })

  const onMove = (e) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const x = (e.clientX - cx) / (rect.width / 2) * 10
    const y = (e.clientY - cy) / (rect.height / 2) * 10
    setMag({ x, y })
  }
  const onLeave = () => setMag({ x: 0, y: 0 })

  return (
    <div ref={cardRef} className="phil-card group p-8 md:p-10 rounded-2xl border transition-all duration-500 hover:shadow-xl hover:shadow-[#0F766E]/8" style={{opacity:0,background:'white',borderColor:'rgba(0,0,0,0.04)',transform:`translate(${mag.x}px,${mag.y}px)`}} onMouseMove={onMove} onMouseLeave={onLeave}>
      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl" style={{background:C.accent+'12',color:C.accent}}>{c.ico}</div>
        <span className="font-montserrat text-xl md:text-2xl" style={{color:C.accent}}>{c.n}</span>
      </div>
      <h3 className="font-poppins text-xl font-bold mb-3 transition-all duration-300 group-hover:text-shadow-glow" style={{color:C.dark}}>{c.t}</h3>
      <p className="font-onest text-[#666] text-[15px] leading-relaxed transition-all duration-300 group-hover:text-shadow-glow">{c.d}</p>
    </div>
  )
}

function Philosophy() {
  const sec = useRef(null)
  const cards = [
    {n:'01',t:'Uncompromising Quality',d:'Every product in our catalogue has been vetted against international standards. We don\'t stock anything we wouldn\'t use ourselves.',ico:'◆'},
    {n:'02',t:'Complete Solutions',d:'Why deal with 10 suppliers when one can do it all? Concrete to chandeliers, pipes to paint — we cover every category.',ico:'◇'},
    {n:'03',t:'UAE Expertise',d:'20 years of understanding UAE construction requirements — climate, codes, and the pace of this region\'s ambition.',ico:'◈'},
  ]
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.phil-card',{opacity:0,y:70,rotateY:5},{opacity:1,y:0,rotateY:0,duration:1,stagger:0.15,ease:'power3.out',scrollTrigger:{trigger:sec.current,start:'top 70%'}})
    },sec)
    return ()=>ctx.revert()
  },[])
  return (
    <section ref={sec} className="relative py-28 md:py-36" style={{background:C.cream}}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="font-montserrat text-2xl md:text-3xl lg:text-4xl uppercase tracking-[0.04em] mb-4" style={{color:C.accent}}>why standard group</h2>
          <p className="text-3xl md:text-4xl lg:text-5xl" style={{color:C.dark}}><span className="font-montserrat font-bold">We Don't Just Supply.</span> <span className="font-serif italic">We Partner.</span></p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((c,i) => (
            <PhilCard key={i} c={c} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── 5½. SCROLL SEQUENCE (sec3 desktop / sec3m mobile) ── */
function Section3Scroll() {
  const sectionRef = useRef(null)
  const canvasRef  = useRef(null)
  const frameRef   = useRef(1)
  const imagesRef  = useRef([])
  const [isMobile, setIsMobile] = useState(false)
  const text1Ref   = useRef(null)
  const text2Ref   = useRef(null)
  const text3Ref   = useRef(null)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const folder = isMobile ? 'sec3m' : 'sec3'
  const total  = isMobile ? 278 : 300
  const PATH   = (i) => `/${folder}/ezgif-frame-${String(i).padStart(3, '0')}.jpg`

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

    imagesRef.current = []
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
        end: `+=${total * 10}`,
        pin: true,
        scrub: 0.5,
        anticipatePin: 1,
        onUpdate(self) {
          const p = self.progress
          const next = Math.max(1, Math.min(total, Math.ceil(p * total)))
          if (next !== frameRef.current) {
            frameRef.current = next
            drawFrame(next)
          }
          // Moving fade in/out for text overlays
          function fadeState(progress, start, end) {
            const range = end - start
            const mid = start + range / 2
            if (progress < start) return { opacity: 0, y: 30 }
            if (progress > end)   return { opacity: 0, y: -30 }
            if (progress < mid) {
              const t = (progress - start) / (range / 2)
              return { opacity: t, y: 30 * (1 - t) }
            }
            const t = (progress - mid) / (range / 2)
            return { opacity: 1 - t, y: -30 * t }
          }
          function fadeInState(progress, start) {
            if (progress < start) return { opacity: 0, y: 30 }
            if (progress < start + 0.10) {
              const t = (progress - start) / 0.10
              return { opacity: t, y: 30 * (1 - t) }
            }
            return { opacity: 1, y: 0 }
          }
          const t1 = text1Ref.current, t2 = text2Ref.current, t3 = text3Ref.current
          if (t1) { const s = fadeState(p, 0.20, 0.45); gsap.to(t1, { opacity: s.opacity, y: s.y, duration: 0.25, overwrite: 'auto' }) }
          if (t2) { const s = fadeState(p, 0.50, 0.75); gsap.to(t2, { opacity: s.opacity, y: s.y, duration: 0.25, overwrite: 'auto' }) }
          if (t3) { const s = fadeInState(p, 0.80); gsap.to(t3, { opacity: s.opacity, y: s.y, duration: 0.25, overwrite: 'auto' }) }
        }
      })
    }, sectionRef)

    return () => {
      window.removeEventListener('resize', setSize)
      gsapCtx.revert()
    }
  }, [folder, total])

  return (
    <section ref={sectionRef} className="relative w-full h-screen bg-black overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h2 ref={text1Ref} className="font-montserrat text-3xl md:text-5xl lg:text-6xl uppercase tracking-[0.08em] text-white opacity-0" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8)' }}>No Compromises</h2>
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h2 ref={text2Ref} className="font-montserrat text-3xl md:text-5xl lg:text-6xl uppercase tracking-[0.08em] text-white opacity-0" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8)' }}>Built to Last</h2>
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h2 ref={text3Ref} className="font-montserrat text-3xl md:text-5xl lg:text-6xl uppercase tracking-[0.08em] text-white opacity-0" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8)' }}>With Trust, Comes Success</h2>
      </div>
    </section>
  )
}

/* ── 6. HOW WE WORK ── */
function Process() {
  const sec = useRef(null), steps = useRef([]), lineRef = useRef(null)
  const data = [
    {n:'01',t:'Request a Quote',d:'Share your requirements — our team responds within 24 hours.',img:'/pics/4interior.JPG'},
    {n:'02',t:'Explore 500+ Products',d:'Browse our curated catalogue. Compare specs, finishes, and bulk pricing.',img:'/pics/2tile.JPG'},
    {n:'03',t:'Confirm & Schedule',d:'Flexible payment terms. We handle logistics so you focus on building.',img:'/pics/1rebar.JPG'},
    {n:'04',t:'Quality Delivered',d:'International standards guaranteed. On-time delivery to any site in the UAE.',img:'/pics/5interlock.JPG'},
  ]
  useEffect(() => {
    const ctx = gsap.context(() => {
      if(lineRef.current) gsap.fromTo(lineRef.current,{scaleY:0},{scaleY:1,transformOrigin:'top',ease:'none',scrollTrigger:{trigger:sec.current,start:'top 40%',end:'bottom 60%',scrub:1.2}})
      steps.current.forEach((s,i) => { if(!s)return; gsap.fromTo(s,{opacity:0,x:i%2===0?-60:60},{opacity:1,x:0,duration:1,ease:'power3.out',scrollTrigger:{trigger:s,start:'top 80%'}}) })
    },sec)
    return ()=>ctx.revert()
  },[])
  return (
    <section ref={sec} className="relative py-28 md:py-36" style={{background:'#f0ebe3'}}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="font-montserrat text-2xl md:text-3xl lg:text-4xl uppercase tracking-[0.04em] mb-4" style={{color:C.accent}}>the process</h2>
          <p className="font-serif italic text-3xl md:text-4xl lg:text-5xl" style={{color:C.dark}}>How We Work With You</p>
        </div>
        <div className="relative">
          <div ref={lineRef} className="absolute left-[29px] md:left-1/2 top-0 bottom-0 w-0.5 md:-translate-x-1/2" style={{background:C.accent,transform:'scaleY(0)'}} />
          <div className="space-y-16 md:space-y-24">
            {data.map((s,i) => (
              <div key={i} ref={el=>steps.current[i]=el} className={`relative flex flex-col md:flex-row items-start gap-6 md:gap-10 ${i%2!==0?'md:flex-row-reverse':''}`} style={{opacity:0}}>
                <div className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-lg z-10" style={{background:`linear-gradient(135deg,${C.accent},${C.accentD})`}}>
                  <span className="font-montserrat text-white text-lg md:text-xl">{s.n}</span>
                </div>
                <div className="flex-1 flex flex-col md:flex-row gap-5 items-start">
                  <div className={`flex-1 ${i%2!==0?'md:text-right':''}`}>
                    <h3 className="font-poppins text-xl md:text-2xl font-bold mb-2" style={{color:C.dark}}>{s.t}</h3>
                    <p className="font-onest text-[#777] text-[15px] leading-relaxed max-w-sm">{s.d}</p>
                  </div>
                  <div className="w-full md:w-48 h-32 rounded-xl overflow-hidden flex-shrink-0">
                    <Img src={s.img} className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="https://wa.me/971504654613" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-[#25D366] text-white px-7 py-3.5 rounded-full text-sm font-medium hover:bg-[#128C7E] transition-all duration-300 shadow-lg shadow-[#25D366]/30">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.13 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Request a Quote
          </a>
          <a href="tel:+971555599508" className="inline-flex items-center gap-2 border border-[#A58B62]/30 text-[#A58B62] px-7 py-3.5 rounded-full text-sm font-medium hover:bg-[#A58B62] hover:text-white transition-all duration-300">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
            Call +971 555599508
          </a>
        </div>
      </div>
    </section>
  )
}


/* ═══════════════════════════════════════════════════════════
   ████  CLUSTER C — DARK  ████████████████████████████████
   ═══════════════════════════════════════════════════════════ */

/* ── 7. PRODUCT CATEGORIES — All 17 ── */
function Products() {
  const sec = useRef(null)
  const cats = [
    {name:'Water Heaters',       href:'/milano-water-heaters',   img:'/pics/1sanitary.JPG',     desc:'Milano electric water heaters — Italian engineering.'},
    {name:'Water Closets',       href:'/water-closets',          img:'/pics/1wc.JPG',          desc:'European-designed toilets for comfort & hygiene.'},
    {name:'Wash Basins',         href:'/wash-basins',            img:'/pics/1sink.JPG',       desc:'Countertop, wall-hung & pedestal basins.'},
    {name:'Wall Hung WC',        href:'/wall-hung',              img:'/pics/2wc.JPG',         desc:'Space-saving wall-hung with concealed cisterns.'},
    {name:'Tiles & Interlock',   href:'/tiles-roof-interlock',   img:'/pics/4tile.JPG',          desc:'Floor, wall, roof tiles & interlocking pavers.'},
    {name:'Sanitary Ware',       href:'/sanitary-ware',          img:'/pics/1sanitary.JPG',    desc:'Complete sanitary solutions & accessories.'},
    {name:'Blocks & Sands',      href:'/blocks-sands',           img:'/pics/1cinderblock.JPG',     desc:'Hollow blocks, solid blocks & washed sand.'},
    {name:'Cement',              href:'/cement',                 img:'/pics/1brownsand.JPG',       desc:'OPC, SRC & specialty cements.'},
    {name:'Steel',               href:'/steel',                  img:'/pics/1rebar.JPG',           desc:'TMT rebars, channels, angles & sections.'},
    {name:'Film Faced Plywood',  href:'/film-faced-plywood',     img:'/pics/2rebar.JPG',        desc:'Marine plywood & shuttering boards.'},
    {name:'Waterproofing',       href:'/water-proofing',         img:'/pics/5tile.JPG',         desc:'Liquid membranes & crystalline solutions.'},
    {name:'Gypsum Board',        href:'/gypsum-board',           img:'/pics/1whiterocks.JPG',      desc:'Gypsum boards & acoustic ceiling systems.'},
    {name:'Paints & Tools',      href:'/paints-tools',           img:'/pics/7tile.JPG',          desc:'Interior & exterior paints & accessories.'},
    {name:'General Tools',       href:'/general-tools-plumbing', img:'/pics/2interlock.JPG',      desc:'Plumbing tools, cutters & hardware.'},
    {name:'Plumbing Systems',    href:'/plumbing-sanitary',      img:'/pics/2sink.JPG',            desc:'PPR, PVC, GI pipes, fittings & pumps.'},
    {name:'Plumbing Hardware',   href:'/plumbing-sanitary-2',    img:'/pics/3sink.JPG',           desc:'Mixers, showers, drains & installation.'},
    {name:'Electric & Lights',   href:'/electric-lights',        img:'/pics/3interior.JPG',desc:'LED panels, switches, MCBs & wiring.'},
  ]
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.pcard').forEach((el,i) => {
        gsap.fromTo(el,{opacity:0,y:60,scale:0.96},{opacity:1,y:0,scale:1,duration:0.7,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 90%'}})
      })
    },sec)
    return ()=>ctx.revert()
  },[])
  return (
    <section ref={sec} id="categories" className="relative py-28 md:py-36" style={{background:C.dark}}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-6">
          <div>
            <h2 className="font-montserrat text-3xl md:text-4xl lg:text-5xl uppercase tracking-[0.03em] mb-3" style={{color:C.accentL}}>17 categories</h2>
            <p className="font-serif italic text-3xl md:text-4xl lg:text-5xl text-white">Everything to Build.</p>
          </div>
          <p className="font-onest text-white/30 text-[15px] max-w-md leading-relaxed">From raw aggregates to luxury bathroom fittings — every material, one supplier.</p>
        </div>

        {/* Top 4 hero cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {cats.slice(0,4).map((c,i) => (
            <Link key={i} to={c.href} className="pcard group relative rounded-2xl overflow-hidden aspect-[16/10] block">
              <Img src={c.img} alt={c.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1s] group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                <span className="font-montserrat text-base md:text-lg uppercase block mb-2" style={{color:C.accentL}}>{String(i+1).padStart(2,'0')}</span>
                <h3 className="font-poppins text-white text-xl md:text-2xl font-bold mb-1">{c.name}</h3>
                <p className="font-onest text-white/40 text-sm max-w-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">{c.desc}</p>
              </div>
              <div className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:rotate-45" style={{background:C.accent}}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </div>
            </Link>
          ))}
        </div>

        {/* Rest in compact grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {cats.slice(4).map((c,i) => (
            <Link key={i} to={c.href} className="pcard group relative rounded-xl overflow-hidden aspect-[3/4] block">
              <Img src={c.img} alt={c.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <span className="font-montserrat text-sm md:text-base uppercase block mb-1" style={{color:C.accentL}}>{String(i+5).padStart(2,'0')}</span>
                <h3 className="font-poppins text-white text-xs md:text-sm font-bold leading-tight">{c.name}</h3>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="https://wa.me/971504654613" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-[#25D366] text-white px-7 py-3.5 rounded-full text-sm font-medium hover:bg-[#128C7E] transition-all duration-300 shadow-lg shadow-[#25D366]/30">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.13 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Get a Quote on WhatsApp
          </a>
          <a href="tel:+971555599508" className="inline-flex items-center gap-2 border border-white/20 text-white/70 px-7 py-3.5 rounded-full text-sm font-medium hover:border-white/40 hover:text-white transition-all duration-300">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
            Call +971 555599508
          </a>
        </div>
      </div>
    </section>
  )
}

/* ── 8. BRANDS MARQUEE ── */
function Brands() {
  const brands = ['Milano','Ariston','Lecico','National Paints','Akfix','Dulux','RAK Ceramics','Hempel','Geberit','Grohe','Al Jazeera','Saveto','Bravat','Jotun','Henkel','Knauf','Hunter','Al Wataniah','Sika','Mapei','Daikin','Panasonic','Legrand','ABB','Schneider','Philips','Osram','Samsung','Hager','Megaman','GE']
  const h = Math.ceil(brands.length/2), r1 = brands.slice(0,h), r2 = brands.slice(h)
  return (
    <section className="relative py-20" style={{background:C.slate}}>
      <div className="text-center mb-12">
        <h2 className="font-montserrat text-3xl md:text-4xl lg:text-5xl uppercase tracking-[0.03em] mb-3" style={{color:C.accentL}}>31+ partners</h2>
        <p className="font-serif italic text-2xl md:text-3xl text-white/60">Global Brands. <span style={{color:C.accentL}}>Zero Compromise.</span></p>
      </div>
      {[r1,r2].map((row,ri)=>(
        <div key={ri} className="overflow-hidden mb-3">
          <div className={ri===0?'mq-l flex whitespace-nowrap':'mq-r flex whitespace-nowrap'}>
            {[...row,...row,...row,...row].map((b,i)=>(
              <span key={i} className="inline-flex items-center px-6 py-3 mx-1.5 rounded-full border border-white/8 font-poppins text-white/30 text-[13px] font-medium hover:text-white hover:border-[#14B8A6]/30 transition-colors duration-300 cursor-default">{b}</span>
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}

/* ── 9. CONSTRUCTION ART GALLERY ── */
function ConstructionArt() {
  const sec = useRef(null)
  const items = [
    {src:'/pics/1rebar.JPG',     label:'Steel Scaffolding'},
    {src:'/pics/2rebar.JPG',       label:'TMT Rebar'},
    {src:'/pics/2cinderblock.JPG', label:'Hollow Blocks'},
    {src:'/pics/5interlock.JPG',   label:'Interlocking Pavers'},
    {src:'/pics/3cinderblock.JPG',label:'Masonry Blocks'},
    {src:'/pics/4interlock.JPG',   label:'Paver Patterns'},
  ]
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.ca-item').forEach(el => {
        gsap.fromTo(el,{opacity:0,y:50},{opacity:1,y:0,duration:0.8,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 88%'}})
      })
    },sec)
    return ()=>ctx.revert()
  },[])
  return (
    <section ref={sec} className="relative py-28" style={{background:C.dark}}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-6">
          <div>
            <h2 className="font-montserrat text-2xl md:text-3xl lg:text-4xl uppercase tracking-[0.04em] mb-3" style={{color:C.accentL}}>raw materials</h2>
            <p className="font-serif italic text-3xl md:text-4xl text-white">The Art of Construction</p>
          </div>
          <p className="font-onest text-white/25 text-[15px] max-w-sm leading-relaxed">Steel, blocks, interlock, sand — the raw ingredients of every great structure.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item,i) => (
            <div key={i} className="ca-item group relative rounded-2xl overflow-hidden cursor-pointer aspect-[4/3]" style={{opacity:0}}>
              <Img src={item.src} alt={item.label} className="w-full h-full object-cover transition-transform duration-[1s] group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-all duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-6 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <span className="font-poppins text-white text-sm font-bold">{item.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   ████  CLUSTER D — LIGHT  ███████████████████████████████
   ═══════════════════════════════════════════════════════════ */

/* ── 10. SHOWROOM GALLERY ── */
function Showroom() {
  const sec = useRef(null)
  const imgs = [
    {src:'/pics/1interior.JPG', label:'Modern Blue Suite'},
    {src:'/pics/3interior.JPG',label:'Marble Elegance'},
    {src:'/pics/2interior.JPG',label:'Warm Minimalist'},
    {src:'/pics/4interior.JPG',label:'Industrial Chic'},
    {src:'/pics/5interior.JPG',label:'Contemporary'},
  ]
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.sr-img').forEach(el => {
        gsap.fromTo(el,{opacity:0,y:60,rotateZ:1},{opacity:1,y:0,rotateZ:0,duration:1,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 88%'}})
      })
    },sec)
    return ()=>ctx.revert()
  },[])
  return (
    <section ref={sec} className="relative py-28 md:py-36" style={{background:C.cream}}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-6">
          <div>
            <h2 className="font-montserrat text-2xl md:text-3xl lg:text-4xl uppercase tracking-[0.04em] mb-3" style={{color:C.accent}}>showroom</h2>
            <p className="font-serif italic text-3xl md:text-4xl lg:text-5xl" style={{color:C.dark}}>Spaces We've Helped Create.</p>
          </div>
          <p className="font-onest text-[#666] text-[15px] max-w-md leading-relaxed">Our materials live in the most prestigious bathrooms, kitchens, and interiors across the UAE.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {imgs.map((im,i) => (
            <div key={i} className="sr-img group relative rounded-2xl overflow-hidden cursor-pointer" style={{opacity:0,aspectRatio:i%2===0?'4/3':'3/4'}}>
              <Img src={im.src} alt={im.label} className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <span className="font-poppins text-white text-sm font-bold">{im.label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="https://wa.me/971504654613" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-[#A58B62] text-white px-7 py-3.5 rounded-full text-sm font-medium hover:bg-[#8B7355] transition-all duration-300 shadow-lg shadow-[#A58B62]/20">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.13 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Book a Showroom Visit
          </a>
          <a href="tel:+971555599508" className="inline-flex items-center gap-2 border border-[#A58B62]/30 text-[#A58B62] px-7 py-3.5 rounded-full text-sm font-medium hover:bg-[#A58B62] hover:text-white transition-all duration-300">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
            Call +971 555599508
          </a>
        </div>
      </div>
    </section>
  )
}

/* ── 11. BIG STATEMENT ── */
function BigStatement() {
  const sec = useRef(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.bs-line',{opacity:0,y:60},{opacity:1,y:0,duration:1,stagger:0.2,ease:'power3.out',scrollTrigger:{trigger:sec.current,start:'top 70%'}})
    },sec)
    return ()=>ctx.revert()
  },[])
  return (
    <section ref={sec} className="relative py-32 md:py-44 overflow-hidden" style={{background:'white'}}>
      <div className="max-w-6xl mx-auto px-6 text-center">
        <div className="bs-line" style={{opacity:0}}>
          <h2 className="font-montserrat text-3xl md:text-4xl lg:text-5xl xl:text-6xl uppercase tracking-[0.02em] leading-[1.2] mb-6" style={{color:C.accent}}>we don't just sell materials</h2>
        </div>
        <div className="bs-line" style={{opacity:0}}>
          <p className="font-serif italic text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-[1.15]" style={{color:C.dark}}>We Build Relationships That Last Longer Than The Structures Themselves.</p>
        </div>
        <div className="bs-line mt-10 flex flex-col sm:flex-row items-center justify-center gap-4" style={{opacity:0}}>
          <a href="https://wa.me/971504654613" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-[#14B8A6] text-white px-8 py-4 rounded-full text-sm font-medium hover:bg-[#0D9488] transition-all duration-300 shadow-lg shadow-[#14B8A6]/30">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.13 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Start Your Project — WhatsApp
          </a>
          <a href="tel:+971555599508" className="inline-flex items-center gap-2 border border-[#14B8A6]/30 text-[#14B8A6] px-8 py-4 rounded-full text-sm font-medium hover:bg-[#14B8A6] hover:text-white transition-all duration-300">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
            Call +971 555599508
          </a>
        </div>
      </div>
    </section>
  )
}

/* ── 12. TRUST + TESTIMONIALS ── */
function Trust() {
  const sec = useRef(null)
  const [active,setActive] = useState(0)
  const tags = ['Premium Quality','On-Time Delivery','UAE-Wide Supply','20+ Years Trusted','500+ Products']
  const tests = [
    {q:'Standard Group has been our go-to supplier for over a decade. Their range and service are unmatched in the UAE market.',a:'Ahmed Al Maktoum',r:'Project Director, Al Futtaim Construction'},
    {q:'From sanitary ware to steel — they deliver everything on time and within spec. A true one-stop-shop for builders.',a:'Sarah Mitchell',r:'Procurement Manager, Drake & Scull'},
    {q:'Competitive pricing and premium quality helped us complete our luxury resort project two months ahead of schedule.',a:'Rajesh Patel',r:'Senior Engineer, Emaar Properties'},
  ]
  useEffect(()=>{ const iv = setInterval(()=>setActive(p=>(p+1)%tests.length),5000); return ()=>clearInterval(iv) },[])
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.trust-tag',{opacity:0,y:30},{opacity:1,y:0,duration:0.8,stagger:0.08,ease:'power3.out',scrollTrigger:{trigger:sec.current,start:'top 80%'}})
    },sec)
    return ()=>ctx.revert()
  },[])
  return (
    <section ref={sec} className="relative py-24 md:py-32" style={{background:C.cream}}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {tags.map((t,i) => (
            <span key={i} className="trust-tag inline-flex items-center px-5 py-2.5 rounded-full border font-poppins text-sm font-medium" style={{opacity:0,borderColor:C.accent+'33',color:C.accent}}>{t}</span>
          ))}
        </div>
        <div className="text-center">
          <div className="relative h-48 md:h-40">
            {tests.map((t,i) => (
              <div key={i} className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-700" style={{opacity:active===i?1:0,transform:active===i?'none':'translateY(20px)'}}>
                <p className="font-serif italic text-xl md:text-2xl lg:text-3xl leading-relaxed mb-6 max-w-2xl" style={{color:C.dark+'bb'}}>"{t.q}"</p>
                <span className="font-poppins text-sm font-bold" style={{color:C.dark}}>{t.a}</span>
                <span className="font-onest text-xs" style={{color:C.muted}}>{t.r}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-2 mt-4">
            {tests.map((_,i) => <button key={i} onClick={()=>setActive(i)} className={`h-2 rounded-full transition-all duration-300 ${active===i?'w-8':'w-2'}`} style={{background:active===i?C.accent:C.dark+'22'}} />)}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <p className="font-onest text-[#666] text-sm mb-5">Join 500+ happy clients across the UAE</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="https://wa.me/971504654613" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-[#25D366] text-white px-7 py-3.5 rounded-full text-sm font-medium hover:bg-[#128C7E] transition-all duration-300 shadow-lg shadow-[#25D366]/30">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.13 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Get Your Free Quote
            </a>
            <a href="tel:+971555599508" className="inline-flex items-center gap-2 border border-[#14B8A6]/30 text-[#14B8A6] px-7 py-3.5 rounded-full text-sm font-medium hover:bg-[#14B8A6] hover:text-white transition-all duration-300">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
              Call +971 555599508
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}


/* ═══════════════════════════════════════════════════════════
   ████  CLUSTER E — DARK FINALE  █████████████████████████
   ═══════════════════════════════════════════════════════════ */

/* ── 13. CTA ── */
function CTA() {
  const sec = useRef(null), words = useRef([])
  useEffect(() => {
    const ctx = gsap.context(() => {
      words.current.forEach((el,i) => { if(!el)return; gsap.fromTo(el,{clipPath:'inset(100% 0 0 0)',opacity:0},{clipPath:'inset(0% 0 0 0)',opacity:1,duration:1.2,delay:i*0.15,ease:'power3.out',scrollTrigger:{trigger:sec.current,start:'top 65%'}}) })
    },sec)
    return ()=>ctx.revert()
  },[])
  return (
    <section ref={sec} id="contact" className="relative py-36 md:py-48 overflow-hidden" style={{background:C.dark}}>
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(25)].map((_,i) => <div key={i} className="absolute w-1 h-1 rounded-full animate-float-p" style={{background:C.accentL+'22',left:`${Math.random()*100}%`,top:`${Math.random()*100}%`,animationDelay:`${Math.random()*8}s`,animationDuration:`${6+Math.random()*10}s`}} />)}
      </div>
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="mb-14">
          {["Let's","Build","Something","Extraordinary."].map((w,i) => (
            <div key={i} ref={el=>words.current[i]=el} className="overflow-hidden" style={{opacity:0}}>
              <span className="font-serif italic text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white leading-[1.08] block">{w}</span>
            </div>
          ))}
        </div>
        <p className="font-onest text-white/30 text-base md:text-lg max-w-xl mx-auto mb-12 leading-relaxed">Whether it's a single product or a full project supply across the UAE — Standard Group delivers.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <MagBtn to="/products">Browse All Products</MagBtn>
          <a href="https://wa.me/971504654613" target="_blank" rel="noreferrer" className="magnetic-btn group inline-flex items-center gap-2 border border-[#14B8A6] text-[#14B8A6] px-6 py-3 rounded-full text-sm font-medium hover:bg-[#14B8A6] hover:text-white transition-all duration-300">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.13 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            WhatsApp Us →
          </a>
          <a href="tel:+971555599508" className="magnetic-btn group inline-flex items-center gap-2 text-white/50 text-sm font-medium hover:text-white transition-all duration-300">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
            Call Now
          </a>
        </div>
      </div>
    </section>
  )
}

/* ── 14. FOOTER ── */
function Foot() {
  const navLinks = [
    {l:'Water Heaters',h:'/milano-water-heaters'},{l:'Water Closets',h:'/water-closets'},{l:'Wash Basins',h:'/wash-basins'},
    {l:'Sanitary Ware',h:'/sanitary-ware'},{l:'Tiles & Interlock',h:'/tiles-roof-interlock'},{l:'Blocks & Sands',h:'/blocks-sands'},
    {l:'Cement',h:'/cement'},{l:'Steel',h:'/steel'},{l:'Plywood',h:'/film-faced-plywood'},
    {l:'Waterproofing',h:'/water-proofing'},{l:'Gypsum',h:'/gypsum-board'},{l:'Paints',h:'/paints-tools'},
    {l:'Plumbing',h:'/plumbing-sanitary'},{l:'Electric',h:'/electric-lights'},
  ]
  const socials = [
    {href:'https://wa.me/971504654613',label:'WhatsApp',svg:<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.13 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>},
    {href:'https://instagram.com/standarduae',label:'Instagram',svg:<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>},
    {href:'https://facebook.com/standarduae',label:'Facebook',svg:<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>},
    {href:'https://linkedin.com',label:'LinkedIn',svg:<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>},
  ]
  return (
    <footer style={{background:C.charcoal}}>
      <div className="h-px" style={{background:`linear-gradient(90deg,transparent,${C.accent},transparent)`}} />
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full border flex items-center justify-center" style={{borderColor:C.accent+'88'}}>
                <span className="font-montserrat text-lg font-bold not-italic" style={{color:C.accentL}}>S</span>
              </div>
              <div className="leading-none">
                <span className="font-montserrat text-white text-sm tracking-[0.12em] uppercase block font-bold">Standard Group</span>
                <span className="font-montserrat text-[11px] font-bold not-italic" style={{color:C.accentL}}>we set standards</span>
              </div>
            </div>
            <p className="font-onest text-white/30 text-[13px] leading-relaxed max-w-xs mb-5">
              UAE's premier building materials supplier. 20+ years, 31+ global brands, 500+ products.
            </p>
            <div className="flex items-center gap-2.5">
              {socials.map((s,i) => (
                <a key={i} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}
                  className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:text-[#14B8A6] hover:border-[#14B8A6]/30 transition-all duration-300">
                  {s.svg}
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div className="lg:col-span-2">
            <h4 className="font-montserrat text-base uppercase mb-5" style={{color:C.accentL}}>products</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-2 gap-x-4">
              {navLinks.map((lnk,i) => (
                <Link key={i} to={lnk.h} className="font-onest text-white/30 text-[13px] hover:text-[#14B8A6] transition-colors duration-200">{lnk.l}</Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-montserrat text-base uppercase mb-5" style={{color:C.accentL}}>contact</h4>
            <div className="space-y-2.5 font-onest text-white/30 text-[13px]">
              <a href="mailto:info@standardgroup.ae" className="block hover:text-[#14B8A6] transition-colors duration-200">info@standardgroup.ae</a>
              <a href="tel:+971555599508" className="block hover:text-[#14B8A6] transition-colors duration-200">+971 555599508</a>
              <a href="https://wa.me/971504654613" target="_blank" rel="noreferrer" className="block hover:text-[#14B8A6] transition-colors duration-200">WhatsApp: +971 504654613</a>
              <p className="text-white/20 text-[12px] pt-1">Baniyas West, Abu Dhabi-U.A.E.</p>
              <p className="text-white/20 text-[12px]">Mafraq, Abu Dhabi-U.A.E.</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-montserrat text-white/25 text-[11px] uppercase tracking-wider">© {new Date().getFullYear()} Standard Group. All rights reserved.</p>
          <p className="font-montserrat text-white/15 text-[10px] uppercase tracking-[0.2em]">We Set Standards</p>
        </div>
      </div>
    </footer>
  )
}

/* ═══════════════════════════════════════════════════════════
   NAVBAR
   ═══════════════════════════════════════════════════════════ */
function Nav() {
  const [scrolled,setScrolled] = useState(false)
  const [open,setOpen] = useState(false)
  const ref = useRef(null)
  const location = useLocation()
  const cats = [
    {l:'Water Heaters',h:'/milano-water-heaters',a:'#2563eb'},{l:'Water Closets',h:'/water-closets',a:'#7C3AED'},{l:'Wash Basins',h:'/wash-basins',a:'#0D9488'},
    {l:'Sanitary Ware',h:'/sanitary-ware',a:'#1D4ED8'},{l:'Tiles & Interlock',h:'/tiles-roof-interlock',a:'#059669'},
    {l:'Blocks & Sands',h:'/blocks-sands',a:'#92400E'},{l:'Cement',h:'/cement',a:'#6B7280'},{l:'Steel',h:'/steel',a:'#475569'},
    {l:'Plywood',h:'/film-faced-plywood',a:'#78350F'},{l:'Waterproofing',h:'/water-proofing',a:'#0369A1'},{l:'Gypsum',h:'/gypsum-board',a:'#64748B'},
    {l:'Paints',h:'/paints-tools',a:'#BE123C'},{l:'Plumbing',h:'/plumbing-sanitary',a:'#0C4A6E'},{l:'Electric',h:'/electric-lights',a:'#CA8A04'},
  ]
  const isActive = (href) => location.pathname === href || location.pathname.startsWith(href + '/')
  useEffect(()=>{ const fn=()=>setScrolled(window.scrollY>50); window.addEventListener('scroll',fn,{passive:true}); return ()=>window.removeEventListener('scroll',fn) },[])
  useEffect(()=>{ gsap.fromTo(ref.current,{y:-80,opacity:0},{y:0,opacity:1,duration:0.8,delay:0.15,ease:'power3.out'}) },[])
  return (
    <header ref={ref} className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled?'shadow-lg':''}`} style={{background:scrolled?'rgba(12,12,11,0.96)':'transparent',backdropFilter:scrolled?'blur(16px)':'none',opacity:0}}>
      {/* ── Top row: logo + nav ── */}
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src="/sglogocion.png" alt="" className="w-10 h-10 object-contain" />
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="font-montserrat text-white text-sm tracking-[0.12em] uppercase font-bold">Standard Group</span>
            <span className="font-montserrat text-[11px] text-white/70 font-bold not-italic">We Set Standards</span>
          </div>
        </Link>
        <nav className="hidden lg:flex items-center gap-6">
          <Link to="/products" className="font-poppins text-white/50 text-xs tracking-[0.1em] uppercase font-medium hover:text-[#14B8A6] transition-colors">Products</Link>
          <Link to="/about" className="font-poppins text-white/50 text-xs tracking-[0.1em] uppercase font-medium hover:text-[#14B8A6] transition-colors">About Us</Link>
          <Link to="/contact" className="font-poppins text-white/50 text-xs tracking-[0.1em] uppercase font-medium hover:text-[#14B8A6] transition-colors">Contact</Link>
          <a href="#contact" className="ml-2 inline-flex items-center px-5 py-2.5 text-white text-xs tracking-[0.1em] uppercase font-poppins font-bold rounded-sm" style={{background:C.accent}}>Get a Quote</a>
        </nav>
        <button onClick={()=>setOpen(!open)} className="lg:hidden text-white">
          {open ? <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
               : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>}
        </button>
      </div>
      {/* ── Bottom row: category tabs ── */}
      <div className="hidden lg:block border-t border-white/10">
        <div className="max-w-7xl mx-auto overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-0 whitespace-nowrap px-6">
            {cats.map((c,i) => {
              const active = isActive(c.h)
              return (
                <Link key={i} to={c.h} className={`font-onest text-[11.5px] tracking-[0.04em] px-4 py-2.5 hover:bg-white/[0.04] transition-all duration-200 whitespace-nowrap ${active ? 'font-semibold' : 'text-white/50 hover:text-[#14B8A6]'}`}
                  style={active ? { color: c.a, backgroundColor: c.a + '15' } : undefined}>
                  {c.l}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
      {open && (
        <div className="lg:hidden border-t border-white/5" style={{background:'rgba(12,12,11,0.98)'}}>
          <div className="max-w-7xl mx-auto px-6 py-4 grid grid-cols-2 gap-1.5">
            {cats.map((c,i) => {
              const active = isActive(c.h)
              return (
                <Link key={i} to={c.h} onClick={()=>setOpen(false)} className={`font-onest text-[13px] py-1.5 transition-colors ${active ? 'font-semibold' : 'text-white/35 hover:text-[#14B8A6]'}`}
                  style={active ? { color: c.a } : undefined}>{c.l}</Link>
              )
            })}
          </div>
        </div>
      )}
    </header>
  )
}


/* ═══════════════════════════════════════════════════════════
   MAIN EXPORT — Section flow with proper clustering
   ═══════════════════════════════════════════════════════════ */
export default function CinematicHome() {
  useEffect(() => {
    const lenis = new Lenis({ duration:1.2, easing:t=>Math.min(1,1.001-Math.pow(2,-10*t)), smoothWheel:true })
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add(t => lenis.raf(t*1000))
    gsap.ticker.lagSmoothing(0)
    return () => lenis.destroy()
  },[])

  return (
    <div className="min-h-screen font-onest" style={{background:C.bg}}>
      <Cursor />
      <Nav />

      {/* ████ CLUSTER A — DARK ████ */}
      <Hero />
      <TextureMarquee />

      {/* ████ CLUSTER B — LIGHT ████ */}
      <Split />
      <Philosophy />
      <Section3Scroll />
      <Process />

      {/* ████ CLUSTER C — DARK ████ */}
      <Products />
      <Brands />
      <ConstructionArt />

      {/* ████ CLUSTER D — LIGHT ████ */}
      <Showroom />
      <BigStatement />
      <Trust />

      {/* ████ CLUSTER E — DARK FINALE ████ */}
      <CTA />
      <Foot />
      <WhatsAppButton />
      <ChatbotButton />

      <style>{`
        .ticker-wrap{overflow:hidden}
        .ticker-track{animation:ticker 30s linear infinite}
        @keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        .tex-track-l{animation:texl 60s linear infinite}
        .tex-track-r{animation:texr 65s linear infinite}
        @keyframes texl{0%{transform:translateX(0)}100%{transform:translateX(-25%)}}
        @keyframes texr{0%{transform:translateX(-25%)}100%{transform:translateX(0)}}
        .mq-l{animation:texl 50s linear infinite}
        .mq-r{animation:texr 55s linear infinite}
        .overflow-hidden:hover .mq-l,.overflow-hidden:hover .mq-r{animation-play-state:paused}
        @keyframes fp{0%,100%{transform:translateY(0) translateX(0);opacity:0}10%{opacity:0.6}50%{transform:translateY(-80px) translateX(30px);opacity:0.3}90%{opacity:0}}
        .animate-float-p{animation:fp 8s ease-in-out infinite}
        @keyframes bounce-slow{0%,100%{transform:translateY(0)}50%{transform:translateY(10px)}}
        .animate-bounce-slow{animation:bounce-slow 2s ease-in-out infinite}
      `}</style>
    </div>
  )
}
