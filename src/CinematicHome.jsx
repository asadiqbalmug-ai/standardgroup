import React, { useEffect, useRef, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { CountUp } from 'countup.js'

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
      // hero image parallax
      gsap.to('.hero-img',{yPercent:20,ease:'none',scrollTrigger:{trigger:sec.current,start:'top top',end:'bottom top',scrub:true}})

      // char-by-char reveal
      const el = h1.current; if(!el) return
      const txt = el.textContent; el.innerHTML = ''
      txt.split('').forEach(ch => { const s = document.createElement('span'); s.textContent = ch===' '?'\u00A0':ch; s.className='hch'; s.style.cssText='display:inline-block;opacity:0;transform:translateY(80px)'; el.appendChild(s) })
      const tl = gsap.timeline({delay:0.5})
      tl.to('.hch',{opacity:1,y:0,duration:0.9,stagger:0.025,ease:'power3.out'})
        .fromTo(sub.current,{opacity:0,y:40},{opacity:1,y:0,duration:1,ease:'power3.out'},'-=0.5')
        .fromTo(cta.current,{opacity:0,y:30},{opacity:1,y:0,duration:0.8,ease:'power3.out'},'-=0.6')
    }, sec)
    return () => ctx.revert()
  },[])

  return (
    <section ref={sec} className="relative h-screen flex items-end overflow-hidden" style={{background:C.dark}}>
      <div className="absolute inset-0">
        <img src="/pics/bathroominterior.jpg" alt="" className="hero-img w-full h-full object-cover" style={{transform:'scale(1.1)'}} />
        <div className="absolute inset-0" style={{background:'linear-gradient(to top, rgba(12,12,11,0.92) 0%, rgba(12,12,11,0.5) 40%, rgba(12,12,11,0.25) 100%)'}} />
      </div>
      {/* Big depth number */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 font-major text-[28vw] leading-none pointer-events-none select-none" style={{color:C.accentL,opacity:0.03}}>SG</div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 pb-20 md:pb-28 w-full">
        <p className="font-major text-base md:text-lg lg:text-xl tracking-[0.08em] uppercase mb-6" style={{color:C.accentL}}>standard group</p>
        <h1 ref={h1} className="font-serif italic text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] text-white leading-[1.02] mb-8 max-w-4xl" style={{perspective:'1000px'}}>
          Building the UAE, One Material at a Time.
        </h1>
        <p ref={sub} className="font-onest text-white/50 text-base md:text-lg max-w-xl leading-relaxed mb-10" style={{opacity:0}}>
          Two decades of excellence. 31+ global brands. 500+ premium products. From foundations to finishing — we supply the materials that build the UAE.
        </p>
        <div ref={cta} className="flex flex-wrap gap-4" style={{opacity:0}}>
          <MagBtn href="#categories">Explore Products</MagBtn>
          <MagBtn href="#contact" ghost>Get a Quote →</MagBtn>
        </div>
      </div>

      {/* Ticker */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden border-t border-white/5" style={{background:'rgba(15,118,110,0.06)'}}>
        <div className="ticker-wrap py-3.5">
          <div className="ticker-track flex whitespace-nowrap">
            {[...Array(4)].map((_,i)=>(
              <span key={i} className="font-major text-sm md:text-base tracking-[0.06em] text-white/25 uppercase mx-12">
                20+ Years &nbsp;·&nbsp; 31+ Brands &nbsp;·&nbsp; 500+ Products &nbsp;·&nbsp; Trusted Across UAE &nbsp;·&nbsp; We Set Standards &nbsp;·&nbsp;
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── 2. STATS ── */
function Stats() {
  const sec = useRef(null), refs = useRef([])
  const data = [
    {end:20,s:'+',l:'Years of Excellence',sub:'Trusted since 2004'},
    {end:31,s:'+',l:'Global Brand Partners',sub:'From Italy to Japan'},
    {end:500,s:'+',l:'Premium Products',sub:'Every category covered'},
    {end:7,s:'',l:'Emirates Served',sub:'UAE-wide delivery'},
  ]
  useEffect(() => {
    const ctx = gsap.context(() => {
      refs.current.forEach((el,i) => {
        if(!el) return; let done=false
        ScrollTrigger.create({trigger:el,start:'top 85%',onEnter:()=>{ if(done)return;done=true;new CountUp(el.querySelector('.sn'),data[i].end,{duration:2.5,suffix:data[i].s}).start() }})
        gsap.fromTo(el,{opacity:0,y:50},{opacity:1,y:0,duration:0.9,delay:i*0.1,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 88%'}})
      })
    },sec)
    return ()=>ctx.revert()
  },[])
  return (
    <section ref={sec} className="relative py-24 md:py-32" style={{background:C.slate}}>
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6">
        {data.map((s,i) => (
          <div key={i} ref={el=>refs.current[i]=el} className="text-center" style={{opacity:0}}>
            <div className="sn font-major text-5xl md:text-6xl lg:text-7xl font-bold mb-2" style={{color:C.accentL}}>0</div>
            <div className="font-poppins text-white text-sm font-bold mb-1">{s.l}</div>
            <div className="font-onest text-white/25 text-xs">{s.sub}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ── 3. MATERIAL TEXTURES MARQUEE (fast auto-scroll, not pinned) ── */
function TextureMarquee() {
  const row1 = ['/pics/tiles12.jpg','/pics/whitesand.jpg','/pics/crackedgravel.jpg','/pics/tiles9.jpg','/pics/tiles13.jpg','/pics/brownsand.jpg']
  const row2 = ['/pics/tiles1.jpg','/pics/interlock3.jpg','/pics/whiterocks.jpg','/pics/tiles8.jpg','/pics/tiles14.jpg','/pics/tiles7.jpg']
  return (
    <section className="relative py-16 overflow-hidden" style={{background:C.dark}}>
      <div className="text-center mb-10">
        <h2 className="font-major text-2xl md:text-3xl lg:text-4xl uppercase tracking-[0.04em]" style={{color:C.accentL}}>material textures</h2>
        <p className="font-onest text-white/25 text-sm mt-2">The raw beauty of what we supply</p>
      </div>
      {[row1,row2].map((row,ri)=>(
        <div key={ri} className="overflow-hidden mb-3">
          <div className={`flex gap-3 ${ri===0?'tex-track-l':'tex-track-r'}`}>
            {[...row,...row,...row,...row].map((src,i)=>(
              <div key={i} className="flex-shrink-0 w-[280px] h-[180px] md:w-[360px] md:h-[220px] rounded-xl overflow-hidden group">
                <Img src={src} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}


/* ═══════════════════════════════════════════════════════════
   ████  CLUSTER B — LIGHT  ███████████████████████████████
   ═══════════════════════════════════════════════════════════ */

/* ── 4. SPLIT — Luxury bathroom + brand promise ── */
function Split() {
  const sec = useRef(null), lines = useRef([])
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.split-img',{scale:1.12,ease:'none',scrollTrigger:{trigger:sec.current,start:'top bottom',end:'bottom top',scrub:true}})
      lines.current.forEach((l,i) => { if(!l)return; gsap.fromTo(l,{opacity:0,y:50,clipPath:'inset(100% 0 0 0)'},{opacity:1,y:0,clipPath:'inset(0% 0 0 0)',duration:1,delay:i*0.1,ease:'power3.out',scrollTrigger:{trigger:l,start:'top 85%'}}) })
    },sec)
    return ()=>ctx.revert()
  },[])
  return (
    <section ref={sec} style={{background:C.cream}}>
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        <div className="relative h-[60vh] lg:h-auto overflow-hidden">
          <Img src="/pics/bathroominterior2.jpg" className="split-img absolute inset-0 w-full h-full object-cover" />
        </div>
        <div className="flex items-center py-20 lg:py-0">
          <div className="max-w-lg mx-auto px-8 lg:px-16">
            <div ref={el=>lines.current[0]=el} style={{opacity:0}}>
              <span className="font-major text-lg md:text-xl uppercase tracking-[0.06em] block mb-6" style={{color:C.accent}}>our promise</span>
            </div>
            <div ref={el=>lines.current[1]=el} style={{opacity:0}}>
              <h2 className="font-serif italic text-3xl md:text-4xl lg:text-5xl leading-[1.08] mb-2" style={{color:C.dark}}>Building Dreams,</h2>
            </div>
            <div ref={el=>lines.current[2]=el} style={{opacity:0}}>
              <h2 className="font-serif italic text-3xl md:text-4xl lg:text-5xl leading-[1.08] mb-8" style={{color:C.dark}}>One Project at a Time.</h2>
            </div>
            <div ref={el=>lines.current[3]=el} style={{opacity:0}}>
              <p className="font-onest text-[#555] text-[15px] leading-relaxed mb-5">From the foundation to the finishing touches, Standard Group provides everything a builder needs. Our curated portfolio spans concrete, steel, plumbing, electrical, waterproofing, and premium sanitary ware — all sourced from the world's finest manufacturers.</p>
            </div>
            <div ref={el=>lines.current[4]=el} style={{opacity:0}}>
              <p className="font-onest text-[#555] text-[15px] leading-relaxed mb-8">Whether you're constructing a luxury villa in Dubai, a commercial tower in Abu Dhabi, or a residential community in Sharjah — we deliver the materials that make it possible.</p>
            </div>
            <div ref={el=>lines.current[5]=el} style={{opacity:0}}>
              <MagBtn to="/sanitary-ware" className="!text-white">Browse Sanitary Ware</MagBtn>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── 5. PHILOSOPHY ── */
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
          <h2 className="font-major text-2xl md:text-3xl lg:text-4xl uppercase tracking-[0.04em] mb-4" style={{color:C.accent}}>why standard group</h2>
          <p className="font-serif italic text-3xl md:text-4xl lg:text-5xl" style={{color:C.dark}}>We Don't Just Supply. We Partner.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((c,i) => (
            <div key={i} className="phil-card group p-8 md:p-10 rounded-2xl border transition-all duration-500 hover:shadow-xl hover:shadow-[#0F766E]/8 hover:-translate-y-1" style={{opacity:0,background:'white',borderColor:'rgba(0,0,0,0.04)'}}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl" style={{background:C.accent+'12',color:C.accent}}>{c.ico}</div>
                <span className="font-major text-xl md:text-2xl" style={{color:C.accent}}>{c.n}</span>
              </div>
              <h3 className="font-poppins text-xl font-bold mb-3" style={{color:C.dark}}>{c.t}</h3>
              <p className="font-onest text-[#666] text-[15px] leading-relaxed">{c.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── 6. HOW WE WORK ── */
function Process() {
  const sec = useRef(null), steps = useRef([]), lineRef = useRef(null)
  const data = [
    {n:'01',t:'Request a Quote',d:'Share your requirements — our team responds within 24 hours.',img:'/pics/bathroominterior4.jpg'},
    {n:'02',t:'Explore 500+ Products',d:'Browse our curated catalogue. Compare specs, finishes, and bulk pricing.',img:'/pics/tiles7.jpg'},
    {n:'03',t:'Confirm & Schedule',d:'Flexible payment terms. We handle logistics so you focus on building.',img:'/pics/scaffold.jpg'},
    {n:'04',t:'Quality Delivered',d:'International standards guaranteed. On-time delivery to any site in the UAE.',img:'/pics/interlock5.jpg'},
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
          <h2 className="font-major text-2xl md:text-3xl lg:text-4xl uppercase tracking-[0.04em] mb-4" style={{color:C.accent}}>the process</h2>
          <p className="font-serif italic text-3xl md:text-4xl lg:text-5xl" style={{color:C.dark}}>How We Work With You</p>
        </div>
        <div className="relative">
          <div ref={lineRef} className="absolute left-[29px] md:left-1/2 top-0 bottom-0 w-0.5 md:-translate-x-1/2" style={{background:C.accent,transform:'scaleY(0)'}} />
          <div className="space-y-16 md:space-y-24">
            {data.map((s,i) => (
              <div key={i} ref={el=>steps.current[i]=el} className={`relative flex flex-col md:flex-row items-start gap-6 md:gap-10 ${i%2!==0?'md:flex-row-reverse':''}`} style={{opacity:0}}>
                <div className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-lg z-10" style={{background:`linear-gradient(135deg,${C.accent},${C.accentD})`}}>
                  <span className="font-major text-white text-lg md:text-xl">{s.n}</span>
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
    {name:'Water Heaters',       href:'/milano-water-heaters',   img:'/pics/waterheater.JPG',     desc:'Milano electric water heaters — Italian engineering.'},
    {name:'Water Closets',       href:'/water-closets',          img:'/pics/toilet.JPG',          desc:'European-designed toilets for comfort & hygiene.'},
    {name:'Wash Basins',         href:'/wash-basins',            img:'/pics/washbasin.jpg',       desc:'Countertop, wall-hung & pedestal basins.'},
    {name:'Wall Hung WC',        href:'/wall-hung',              img:'/pics/toilet1.JPG',         desc:'Space-saving wall-hung with concealed cisterns.'},
    {name:'Tiles & Interlock',   href:'/tiles-roof-interlock',   img:'/pics/tiles7.jpg',          desc:'Floor, wall, roof tiles & interlocking pavers.'},
    {name:'Sanitary Ware',       href:'/sanitary-ware',          img:'/pics/sanitaryware.png',    desc:'Complete sanitary solutions & accessories.'},
    {name:'Blocks & Sands',      href:'/blocks-sands',           img:'/pics/cinderblock.jpg',     desc:'Hollow blocks, solid blocks & washed sand.'},
    {name:'Cement',              href:'/cement',                 img:'/pics/brownsand.jpg',       desc:'OPC, SRC & specialty cements.'},
    {name:'Steel',               href:'/steel',                  img:'/pics/rebar.jpg',           desc:'TMT rebars, channels, angles & sections.'},
    {name:'Film Faced Plywood',  href:'/film-faced-plywood',     img:'/pics/scaffold.jpg',        desc:'Marine plywood & shuttering boards.'},
    {name:'Waterproofing',       href:'/water-proofing',         img:'/pics/tiles14.jpg',         desc:'Liquid membranes & crystalline solutions.'},
    {name:'Gypsum Board',        href:'/gypsum-board',           img:'/pics/whiterocks.jpg',      desc:'Gypsum boards & acoustic ceiling systems.'},
    {name:'Paints & Tools',      href:'/paints-tools',           img:'/pics/tiles8.jpg',          desc:'Interior & exterior paints & accessories.'},
    {name:'General Tools',       href:'/general-tools-plumbing', img:'/pics/interlock1.jpg',      desc:'Plumbing tools, cutters & hardware.'},
    {name:'Plumbing Systems',    href:'/plumbing-sanitary',      img:'/pics/sink.jpg',            desc:'PPR, PVC, GI pipes, fittings & pumps.'},
    {name:'Plumbing Hardware',   href:'/plumbing-sanitary-2',    img:'/pics/sink1.jpg',           desc:'Mixers, showers, drains & installation.'},
    {name:'Electric & Lights',   href:'/electric-lights',        img:'/pics/bathroominterior1.jpg',desc:'LED panels, switches, MCBs & wiring.'},
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
            <h2 className="font-major text-3xl md:text-4xl lg:text-5xl uppercase tracking-[0.03em] mb-3" style={{color:C.accentL}}>17 categories</h2>
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
                <span className="font-major text-base md:text-lg uppercase block mb-2" style={{color:C.accentL}}>{String(i+1).padStart(2,'0')}</span>
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
                <span className="font-major text-sm md:text-base uppercase block mb-1" style={{color:C.accentL}}>{String(i+5).padStart(2,'0')}</span>
                <h3 className="font-poppins text-white text-xs md:text-sm font-bold leading-tight">{c.name}</h3>
              </div>
            </Link>
          ))}
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
        <h2 className="font-major text-3xl md:text-4xl lg:text-5xl uppercase tracking-[0.03em] mb-3" style={{color:C.accentL}}>31+ partners</h2>
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
    {src:'/pics/scaffold.jpg',     label:'Steel Scaffolding'},
    {src:'/pics/rebar2.jpg',       label:'TMT Rebar'},
    {src:'/pics/cinderblocks.jpg', label:'Hollow Blocks'},
    {src:'/pics/interlock5.jpg',   label:'Interlocking Pavers'},
    {src:'/pics/cinderblocks1.jpg',label:'Masonry Blocks'},
    {src:'/pics/interlock2.jpg',   label:'Paver Patterns'},
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
            <h2 className="font-major text-2xl md:text-3xl lg:text-4xl uppercase tracking-[0.04em] mb-3" style={{color:C.accentL}}>raw materials</h2>
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
    {src:'/pics/bathroominterior.jpg', label:'Modern Blue Suite'},
    {src:'/pics/bathroominterior1.jpg',label:'Marble Elegance'},
    {src:'/pics/bathroominterior2.jpg',label:'Warm Minimalist'},
    {src:'/pics/bathroominterior4.jpg',label:'Industrial Chic'},
    {src:'/pics/bathroominterior5.jpg',label:'Contemporary'},
    {src:'/pics/bathroominterior7.jpg',label:'Fixtures Collection'},
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
            <h2 className="font-major text-2xl md:text-3xl lg:text-4xl uppercase tracking-[0.04em] mb-3" style={{color:C.accent}}>showroom</h2>
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
          <h2 className="font-major text-3xl md:text-4xl lg:text-5xl xl:text-6xl uppercase tracking-[0.02em] leading-[1.2] mb-6" style={{color:C.accent}}>we don't just sell materials</h2>
        </div>
        <div className="bs-line" style={{opacity:0}}>
          <p className="font-serif italic text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-[1.15]" style={{color:C.dark}}>We Build Relationships That Last Longer Than The Structures Themselves.</p>
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
          <MagBtn href="#categories">Browse All Products</MagBtn>
          <MagBtn href="https://wa.me/971501234567" ghost>WhatsApp Us →</MagBtn>
        </div>
      </div>
    </section>
  )
}

/* ── 14. FOOTER ── */
function Foot() {
  const navLinks = [
    {l:'Water Heaters',h:'/milano-water-heaters'},{l:'Sanitary Ware',h:'/sanitary-ware'},{l:'Steel',h:'/steel'},
    {l:'Cement',h:'/cement'},{l:'Tiles',h:'/tiles-roof-interlock'},{l:'Gypsum',h:'/gypsum-board'},
    {l:'Paints',h:'/paints-tools'},{l:'Plumbing',h:'/plumbing-sanitary'},{l:'Electric',h:'/electric-lights'},
    {l:'Wash Basins',h:'/wash-basins'},{l:'Blocks',h:'/blocks-sands'},{l:'Plywood',h:'/film-faced-plywood'},
  ]
  return (
    <footer style={{background:C.charcoal}}>
      <div className="h-px" style={{background:`linear-gradient(90deg,transparent,${C.accent},transparent)`}} />
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-14">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full border flex items-center justify-center" style={{borderColor:C.accent+'88'}}>
                <span className="font-serif italic text-lg font-bold" style={{color:C.accentL}}>S</span>
              </div>
              <div className="leading-none">
                <span className="font-poppins text-white text-[12px] tracking-[0.12em] uppercase block font-bold">Standard Group</span>
                <span className="font-major text-xs uppercase" style={{color:C.accentL}}>we set standards</span>
              </div>
            </div>
            <p className="font-onest text-white/25 text-[13px] leading-relaxed max-w-xs">UAE's premier building materials supplier. 20+ years, 31+ global brands, 500+ products.</p>
          </div>
          <div className="md:col-span-2">
            <h4 className="font-major text-base uppercase mb-5" style={{color:C.accentL}}>products</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-2 gap-x-4">
              {navLinks.map((lnk,i) => <Link key={i} to={lnk.h} className="font-onest text-white/25 text-[13px] hover:text-[#14B8A6] transition-colors">{lnk.l}</Link>)}
            </div>
          </div>
          <div>
            <h4 className="font-major text-base uppercase mb-5" style={{color:C.accentL}}>contact</h4>
            <div className="space-y-2 font-onest text-white/25 text-[13px]">
              <p>Sharjah, UAE</p>
              <p>info@standardgroup.ae</p>
              <p>+971 6 XXX XXXX</p>
            </div>
          </div>
        </div>
        <div className="pt-6 border-t border-white/5 text-center">
          <p className="font-major text-white/12 text-xs uppercase">© {new Date().getFullYear()} Standard Group. All rights reserved.</p>
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
  const cats = [
    {l:'Water Heaters',h:'/milano-water-heaters'},{l:'Water Closets',h:'/water-closets'},{l:'Wash Basins',h:'/wash-basins'},
    {l:'Sanitary Ware',h:'/sanitary-ware'},{l:'Tiles & Interlock',h:'/tiles-roof-interlock'},
    {l:'Blocks & Sands',h:'/blocks-sands'},{l:'Cement',h:'/cement'},{l:'Steel',h:'/steel'},
    {l:'Plywood',h:'/film-faced-plywood'},{l:'Waterproofing',h:'/water-proofing'},{l:'Gypsum',h:'/gypsum-board'},
    {l:'Paints',h:'/paints-tools'},{l:'Plumbing',h:'/plumbing-sanitary'},{l:'Electric',h:'/electric-lights'},
  ]
  useEffect(()=>{ const fn=()=>setScrolled(window.scrollY>50); window.addEventListener('scroll',fn,{passive:true}); return ()=>window.removeEventListener('scroll',fn) },[])
  useEffect(()=>{ gsap.fromTo(ref.current,{y:-80,opacity:0},{y:0,opacity:1,duration:0.8,delay:0.15,ease:'power3.out'}) },[])
  return (
    <header ref={ref} className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled?'shadow-lg':''}`} style={{background:scrolled?'rgba(12,12,11,0.96)':'transparent',backdropFilter:scrolled?'blur(16px)':'none',opacity:0}}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full border flex items-center justify-center" style={{borderColor:C.accent+'88'}}>
            <span className="font-serif italic text-base font-bold" style={{color:C.accentL}}>S</span>
          </div>
          <div className="hidden sm:flex flex-col leading-none">
            <span className="font-poppins text-white text-[11px] tracking-[0.12em] uppercase font-bold">Standard Group</span>
            <span className="font-major text-[9px] uppercase" style={{color:C.accentL}}>we set standards</span>
          </div>
        </Link>
        <nav className="hidden lg:flex items-center gap-6">
          <a href="#categories" className="font-poppins text-white/50 text-[11px] tracking-[0.1em] uppercase font-medium hover:text-[#14B8A6] transition-colors">Products</a>
          <a href="#contact" className="font-poppins text-white/50 text-[11px] tracking-[0.1em] uppercase font-medium hover:text-[#14B8A6] transition-colors">Contact</a>
          <a href="#contact" className="ml-2 inline-flex items-center px-5 py-2 text-white text-[10px] tracking-[0.1em] uppercase font-poppins font-bold rounded-sm" style={{background:C.accent}}>Get a Quote</a>
        </nav>
        <button onClick={()=>setOpen(!open)} className="lg:hidden text-white">
          {open ? <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
               : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>}
        </button>
      </div>
      {open && (
        <div className="lg:hidden border-t border-white/5" style={{background:'rgba(12,12,11,0.98)'}}>
          <div className="max-w-7xl mx-auto px-6 py-4 grid grid-cols-2 gap-1.5">
            {cats.map((c,i) => <Link key={i} to={c.h} onClick={()=>setOpen(false)} className="font-onest text-white/35 text-[13px] py-1.5 hover:text-[#14B8A6] transition-colors">{c.l}</Link>)}
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
      <Stats />
      <TextureMarquee />

      {/* ████ CLUSTER B — LIGHT ████ */}
      <Split />
      <Philosophy />
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
      `}</style>
    </div>
  )
}
