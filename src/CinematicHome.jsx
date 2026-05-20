import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { CountUp } from 'countup.js'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Autoplay, FreeMode } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/free-mode'

gsap.registerPlugin(ScrollTrigger)

const C = {
  bg:'#F5F0E8', dark:'#111110', accent:'#0F766E', accentL:'#14B8A6', accentD:'#0D6B64',
  slate:'#1e293b', charcoal:'#1a1a1a', white:'#FFFFFF', cream:'#F5F0E8', muted:'#64748b',
}

/* ── CURSOR ── */
function CustomCursor() {
  const d = useRef(null), r = useRef(null)
  useEffect(() => {
    const dot = d.current, ring = r.current; if (!dot||!ring) return
    const mv = (e) => { gsap.to(dot,{x:e.clientX,y:e.clientY,duration:0.08}); gsap.to(ring,{x:e.clientX,y:e.clientY,duration:0.3,ease:'power2.out'}) }
    const g = () => gsap.to(ring,{scale:3,opacity:0.6,duration:0.4})
    const s = () => gsap.to(ring,{scale:1,opacity:1,duration:0.4})
    window.addEventListener('mousemove',mv)
    const t = setTimeout(()=>document.querySelectorAll('a,button,[data-hover]').forEach(el=>{el.addEventListener('mouseenter',g);el.addEventListener('mouseleave',s)}),800)
    return ()=>{window.removeEventListener('mousemove',mv);clearTimeout(t)}
  },[])
  return <>
    <div ref={d} className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden lg:block" style={{background:C.accentL}}/>
    <div ref={r} className="fixed top-0 left-0 w-11 h-11 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden lg:block border-2" style={{borderColor:C.accentL}}/>
  </>
}

/* ── MAGNETIC BUTTON ── */
function MagBtn({children,className='',href,ghost=false,onClick}) {
  const ref = useRef(null)
  const mv = (e) => { const b=ref.current.getBoundingClientRect(); gsap.to(ref.current,{x:(e.clientX-b.left-b.width/2)*0.35,y:(e.clientY-b.top-b.height/2)*0.35,scale:1.08,duration:0.3,ease:'power2.out'}) }
  const lv = () => gsap.to(ref.current,{x:0,y:0,scale:1,duration:0.5,ease:'elastic.out(1,0.4)'})
  const base = ghost ? 'border border-white/25 text-white hover:bg-white/10 backdrop-blur-sm' : 'text-white hover:brightness-110'
  const Tag = href ? 'a' : 'button'
  return <Tag ref={ref} href={href||undefined} onClick={onClick} onMouseMove={mv} onMouseLeave={lv} data-hover
    className={`inline-flex items-center gap-2.5 px-8 py-4 font-poppins font-semibold text-[13px] tracking-[0.08em] uppercase transition-all duration-300 ${base} ${className}`}
    style={ghost?{}:{background:`linear-gradient(135deg,${C.accent},${C.accentD})`}}>{children}</Tag>
}

/* ═══════════════════════════════════════════════════════════
   1. HERO — Cinematic fullscreen with bathroom interior
   ═══════════════════════════════════════════════════════════ */
function HeroSection() {
  const sec = useRef(null), h1Ref = useRef(null), subRef = useRef(null), ctaRef = useRef(null), imgRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const el = h1Ref.current; if(!el) return
      const text = el.textContent; el.innerHTML = ''
      text.split('').forEach(ch => {
        const sp = document.createElement('span')
        sp.textContent = ch === ' ' ? '\u00A0' : ch
        sp.style.cssText = 'display:inline-block;opacity:0;transform:translateY(100px) rotateX(-90deg)'
        sp.className = 'hc'
        el.appendChild(sp)
      })
      const tl = gsap.timeline({delay:0.6})
      tl.to('.hc',{opacity:1,y:0,rotateX:0,duration:1,stagger:0.035,ease:'power3.out'})
        .fromTo(subRef.current,{opacity:0,y:50},{opacity:1,y:0,duration:1,ease:'power3.out'},'-=0.5')
        .fromTo(ctaRef.current,{opacity:0,y:30},{opacity:1,y:0,duration:0.8,ease:'power3.out'},'-=0.6')

      // parallax image zoom
      gsap.to(imgRef.current,{scale:1.2,ease:'none',scrollTrigger:{trigger:sec.current,start:'top top',end:'bottom top',scrub:1.5}})
    }, sec)
    return () => ctx.revert()
  },[])

  return (
    <section ref={sec} className="relative h-screen flex items-center overflow-hidden">
      {/* BG Image */}
      <div className="absolute inset-0">
        <img ref={imgRef} src="/pics/bathroominterior.jpg" alt="" className="w-full h-full object-cover scale-105" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
      </div>

      {/* Depth number */}
      <div className="absolute right-8 bottom-8 lg:right-16 lg:bottom-16 font-major text-[20vw] leading-none pointer-events-none select-none" style={{color:C.accentL,opacity:0.04,letterSpacing:'-0.05em'}}>01</div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-16 pt-24">
        <div className="max-w-3xl">
          <p className="font-major text-[11px] tracking-[0.15em] text-[#14B8A6] uppercase mb-6" style={{letterSpacing:'0.05em'}}>standard group — we set standards</p>
          <h1 ref={h1Ref} className="font-serif italic text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white leading-[1.0] mb-8" style={{perspective:'1000px'}}>
            UAE's Premier Building Materials Supplier.
          </h1>
          <p ref={subRef} className="font-onest text-white/55 text-base md:text-lg max-w-xl leading-relaxed mb-10" style={{opacity:0}}>
            Two decades of excellence. 31+ global brands. 500+ premium products. From foundations to finishing — we supply the materials that build the UAE.
          </p>
          <div ref={ctaRef} className="flex flex-wrap gap-4" style={{opacity:0}}>
            <MagBtn href="#categories">Explore Products</MagBtn>
            <MagBtn href="#contact" ghost>Get a Quote</MagBtn>
          </div>
        </div>
      </div>

      {/* Ticker */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden backdrop-blur-sm border-t border-white/5" style={{background:'rgba(15,118,110,0.08)'}}>
        <div className="ticker-wrap py-3">
          <div className="ticker-track flex whitespace-nowrap">
            {[...Array(6)].map((_,i)=>(
              <span key={i} className="font-major text-[10px] tracking-[0.12em] text-white/40 uppercase mx-8" style={{letterSpacing:'0.05em'}}>
                20+ Years &nbsp;—&nbsp; 31+ Brands &nbsp;—&nbsp; 500+ Products &nbsp;—&nbsp; Trusted Across UAE &nbsp;—&nbsp; We Set Standards &nbsp;—&nbsp;
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   2. STATS  — Counters on dark band
   ═══════════════════════════════════════════════════════════ */
function StatsSection() {
  const sec = useRef(null), refs = useRef([])
  const stats = [{end:20,s:'+',l:'Years of Excellence'},{end:31,s:'+',l:'Global Brand Partners'},{end:500,s:'+',l:'Premium Products'}]

  useEffect(() => {
    const ctx = gsap.context(() => {
      refs.current.forEach((el,i) => {
        if(!el) return
        let done = false
        ScrollTrigger.create({trigger:el,start:'top 85%',onEnter:()=>{
          if(done) return; done=true
          new CountUp(el.querySelector('.sn'),stats[i].end,{duration:2.5,suffix:stats[i].s}).start()
        }})
        gsap.fromTo(el,{opacity:0,y:60},{opacity:1,y:0,duration:1,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 85%'}})
      })
    }, sec)
    return () => ctx.revert()
  },[])

  return (
    <section ref={sec} className="relative py-20 md:py-28 overflow-hidden" style={{background:C.slate}}>
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        {stats.map((s,i) => (
          <div key={i} ref={el=>refs.current[i]=el} className="text-center" style={{opacity:0}}>
            <div className="sn font-major text-5xl md:text-6xl lg:text-7xl font-bold mb-3" style={{color:C.accentL,letterSpacing:'-0.02em'}}>0</div>
            <div className="font-serif italic text-white/40 text-lg">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   3. MATERIAL TEXTURES GALLERY  — Horizontal scroll mosaic
   ═══════════════════════════════════════════════════════════ */
function TextureGallery() {
  const sec = useRef(null), track = useRef(null)
  const images = [
    '/pics/tiles12.jpg','/pics/whitesand.jpg','/pics/crackedgravel.jpg','/pics/tiles9.jpg',
    '/pics/tiles13.jpg','/pics/brownsand.jpg','/pics/tiles1.jpg','/pics/interlock3.jpg',
    '/pics/whiterocks.jpg','/pics/tiles8.jpg','/pics/tiles14.jpg','/pics/tiles7.jpg',
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      if(!track.current) return
      const totalScroll = track.current.scrollWidth - window.innerWidth
      gsap.to(track.current, {
        x: -totalScroll,
        ease: 'none',
        scrollTrigger: {trigger:sec.current,start:'top top',end:()=>`+=${totalScroll*1.2}`,scrub:1.5,pin:true,anticipatePin:1},
      })
    }, sec)
    return () => ctx.revert()
  },[])

  return (
    <section ref={sec} className="relative overflow-hidden" style={{height:'100vh',background:C.dark}}>
      <div className="absolute top-8 left-8 z-20">
        <span className="font-major text-[10px] tracking-[0.08em] uppercase" style={{color:C.accentL,letterSpacing:'0.05em'}}>Material Textures</span>
      </div>
      <div className="absolute top-8 right-8 z-20">
        <span className="font-major text-[10px] tracking-[0.08em] text-white/20 uppercase" style={{letterSpacing:'0.05em'}}>scroll →</span>
      </div>
      <div ref={track} className="flex items-center h-full gap-4 pl-8">
        {images.map((img,i) => (
          <div key={i} className="flex-shrink-0 relative overflow-hidden rounded-2xl group" style={{width: i%3===0?'45vw':i%3===1?'35vw':'28vw', height: i%2===0?'70vh':'55vh'}}>
            <img src={img} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/5 transition-all duration-500" />
          </div>
        ))}
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   4. SPLIT  — Luxury bathroom + brand promise
   ═══════════════════════════════════════════════════════════ */
function SplitSection() {
  const sec = useRef(null), imgRef = useRef(null), lines = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(imgRef.current,{scale:1},{scale:1.15,ease:'none',scrollTrigger:{trigger:sec.current,start:'top bottom',end:'bottom top',scrub:1.5}})
      lines.current.forEach((l,i) => {
        if(!l) return
        gsap.fromTo(l,{opacity:0,y:60,clipPath:'inset(100% 0 0 0)'},{opacity:1,y:0,clipPath:'inset(0% 0 0 0)',duration:1,delay:i*0.12,ease:'power3.out',scrollTrigger:{trigger:l,start:'top 85%'}})
      })
    }, sec)
    return () => ctx.revert()
  },[])

  return (
    <section ref={sec} className="relative min-h-screen" style={{background:C.cream}}>
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        <div className="relative h-[60vh] lg:h-auto overflow-hidden">
          <img ref={imgRef} src="/pics/bathroominterior2.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#F5F0E8]/40 hidden lg:block" />
        </div>
        <div className="flex items-center py-20 lg:py-0">
          <div className="max-w-lg mx-auto px-8 lg:px-14">
            {[
              {t:'label',v:'Our Promise'},
              {t:'h',v:'Building Dreams,'},
              {t:'h',v:'One Project at a Time.'},
              {t:'p',v:'From the foundation to the finishing touches, Standard Group provides everything a builder needs. Our curated portfolio spans concrete, steel, plumbing, electrical, waterproofing, and premium sanitary ware — all sourced from the world\'s finest manufacturers.'},
              {t:'p',v:'Whether you\'re constructing a luxury villa in Dubai, a commercial tower in Abu Dhabi, or a residential community in Sharjah — we deliver the materials that make it possible.'},
            ].map((item,i) => (
              <div key={i} ref={el=>lines.current[i]=el} style={{opacity:0}}>
                {item.t==='label' && <span className="font-major text-[10px] tracking-[0.08em] uppercase block mb-6" style={{color:C.accent,letterSpacing:'0.05em'}}>{item.v}</span>}
                {item.t==='h' && <h2 className="font-serif italic text-3xl md:text-4xl lg:text-5xl leading-[1.08]" style={{color:C.dark}}>{item.v}</h2>}
                {item.t==='p' && <p className="font-onest text-[#555] text-[15px] leading-relaxed mt-5">{item.v}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   5. ALL 17 PRODUCT CATEGORIES  — Massive immersive grid
   ═══════════════════════════════════════════════════════════ */
function ProductCategories() {
  const sec = useRef(null)
  const cats = [
    {name:'Water Heaters',       href:'/milano-water-heaters',   img:'/pics/waterheater.JPG',     desc:'Milano electric water heaters — Italian engineering, UAE reliability.'},
    {name:'Water Closets',       href:'/water-closets',          img:'/pics/toilet.JPG',          desc:'European-designed toilets engineered for comfort and hygiene.'},
    {name:'Wash Basins',         href:'/wash-basins',            img:'/pics/washbasin.jpg',       desc:'Countertop, wall-hung & pedestal basins in premium ceramic.'},
    {name:'Wall Hung WC',        href:'/wall-hung',              img:'/pics/toilet1.JPG',         desc:'Space-saving wall-hung water closets with concealed cisterns.'},
    {name:'Tiles & Interlock',   href:'/tiles-roof-interlock',   img:'/pics/tiles7.jpg',          desc:'Floor tiles, wall tiles, roof tiles & interlocking pavers.'},
    {name:'Sanitary Ware',       href:'/sanitary-ware',          img:'/pics/sanitaryware.png',    desc:'Complete sanitary solutions — toilets, basins, bidets & accessories.'},
    {name:'Blocks & Sands',      href:'/blocks-sands',           img:'/pics/cinderblock.jpg',     desc:'Hollow blocks, solid blocks, washed sand & crusher run.'},
    {name:'Cement',              href:'/cement',                 img:'/pics/brownsand.jpg',       desc:'OPC, SRC & specialty cements meeting international standards.'},
    {name:'Steel',               href:'/steel',                  img:'/pics/rebar.jpg',           desc:'TMT rebars, steel channels, angles & structural sections.'},
    {name:'Film Faced Plywood',  href:'/film-faced-plywood',     img:'/pics/scaffold.jpg',        desc:'Marine plywood & film-faced shuttering boards.'},
    {name:'Waterproofing',       href:'/water-proofing',         img:'/pics/tiles14.jpg',         desc:'Liquid membranes, bituminous sheets & crystalline solutions.'},
    {name:'Gypsum Board',        href:'/gypsum-board',           img:'/pics/whiterocks.jpg',      desc:'Gypsum boards, metal frames & acoustic ceiling systems.'},
    {name:'Paints & Tools',      href:'/paints-tools',           img:'/pics/tiles8.jpg',          desc:'Interior & exterior paints, brushes, rollers & accessories.'},
    {name:'General Tools',       href:'/general-tools-plumbing', img:'/pics/interlock1.jpg',      desc:'Plumbing tools, pipe cutters, wrenches & hardware.'},
    {name:'Plumbing Systems',    href:'/plumbing-sanitary',      img:'/pics/sink.jpg',            desc:'PPR, PVC, GI pipes, fittings, pumps & valves.'},
    {name:'Plumbing Hardware',   href:'/plumbing-sanitary-2',    img:'/pics/sink1.jpg',           desc:'Mixers, showers, drains, traps & installation materials.'},
    {name:'Electric & Lights',   href:'/electric-lights',        img:'/pics/bathroominterior1.jpg',desc:'LED panels, downlights, switches, MCBs & wiring.'},
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.pcard',{opacity:0,y:80,scale:0.95},{opacity:1,y:0,scale:1,duration:0.8,stagger:0.06,ease:'power3.out',scrollTrigger:{trigger:sec.current,start:'top 75%'}})
    }, sec)
    return () => ctx.revert()
  },[])

  return (
    <section ref={sec} id="categories" className="relative py-28 overflow-hidden" style={{background:C.dark}}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="font-major text-[10px] tracking-[0.08em] uppercase block mb-4" style={{color:C.accentL,letterSpacing:'0.05em'}}>17 Categories</span>
          <h2 className="font-serif italic text-4xl md:text-5xl lg:text-6xl text-white mb-4">
            Everything You Need to Build.
          </h2>
          <p className="font-onest text-white/40 text-base max-w-xl mx-auto">From raw aggregates to luxury bathroom fittings — every material, one supplier.</p>
        </div>

        {/* Featured large cards — first 4 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          {cats.slice(0,4).map((c,i) => (
            <Link key={i} to={c.href} className="pcard group relative rounded-2xl overflow-hidden aspect-[16/10] block" data-hover style={{opacity:0}}>
              <img src={c.img} alt={c.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                <span className="font-major text-[9px] tracking-[0.08em] uppercase block mb-2" style={{color:C.accentL,letterSpacing:'0.05em'}}>Category {String(i+1).padStart(2,'0')}</span>
                <h3 className="font-poppins text-white text-xl md:text-2xl font-bold mb-1">{c.name}</h3>
                <p className="font-onest text-white/50 text-sm max-w-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500">{c.desc}</p>
              </div>
              <div className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:rotate-45" style={{background:C.accent}}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </div>
            </Link>
          ))}
        </div>

        {/* Smaller cards — rest */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {cats.slice(4).map((c,i) => (
            <Link key={i} to={c.href} className="pcard group relative rounded-xl overflow-hidden aspect-[3/4] block" data-hover style={{opacity:0}}>
              <img src={c.img} alt={c.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <span className="font-major text-[8px] tracking-[0.06em] uppercase block mb-1" style={{color:C.accentL,letterSpacing:'0.04em'}}>{String(i+5).padStart(2,'0')}</span>
                <h3 className="font-poppins text-white text-sm font-bold leading-tight">{c.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   6. SHOWROOM GALLERY  — Bathroom interiors cinematic strip
   ═══════════════════════════════════════════════════════════ */
function ShowroomGallery() {
  const sec = useRef(null)
  const images = [
    {src:'/pics/bathroominterior.jpg',  label:'Modern Blue Suite'},
    {src:'/pics/bathroominterior1.jpg', label:'Marble Elegance'},
    {src:'/pics/bathroominterior2.jpg', label:'Warm Minimalist'},
    {src:'/pics/bathroominterior4.jpg', label:'Industrial Chic'},
    {src:'/pics/bathroominterior5.jpg', label:'Contemporary Bath'},
    {src:'/pics/bathroominterior7.jpg', label:'Fixtures Collection'},
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.gimg',{opacity:0,y:100,rotateZ:2},{opacity:1,y:0,rotateZ:0,duration:1,stagger:0.15,ease:'power3.out',scrollTrigger:{trigger:sec.current,start:'top 70%'}})
    }, sec)
    return () => ctx.revert()
  },[])

  return (
    <section ref={sec} className="relative py-28 overflow-hidden" style={{background:C.cream}}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-6">
          <div>
            <span className="font-major text-[10px] tracking-[0.08em] uppercase block mb-4" style={{color:C.accent,letterSpacing:'0.05em'}}>Showroom</span>
            <h2 className="font-serif italic text-4xl md:text-5xl" style={{color:C.dark}}>
              Spaces We've<br/>Helped Create.
            </h2>
          </div>
          <p className="font-onest text-[#666] text-[15px] max-w-md leading-relaxed">
            Our materials live in the most prestigious bathrooms, kitchens, and interiors across the UAE. Every fixture, every tile — curated for perfection.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {images.map((img,i) => (
            <div key={i} className="gimg group relative rounded-2xl overflow-hidden cursor-pointer" style={{opacity:0,aspectRatio:i<2?'4/3':'3/4'}} data-hover>
              <img src={img.src} alt={img.label} className="w-full h-full object-cover transition-transform duration-[1.4s] group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <span className="font-poppins text-white text-sm font-bold">{img.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   7. HOW WE WORK  — Timeline
   ═══════════════════════════════════════════════════════════ */
function ProcessSection() {
  const sec = useRef(null), steps = useRef([]), lineRef = useRef(null)
  const data = [
    {n:'01',t:'Request a Quote',   d:'Tell us what you need — our team responds within 24 hours with pricing and availability.'},
    {n:'02',t:'Browse Our Catalogue',d:'500+ products, 31+ brands. Compare specs, finishes, and bulk pricing in our curated library.'},
    {n:'03',t:'Confirm & Schedule',  d:'Flexible payment terms and scheduled delivery. We handle logistics so you focus on building.'},
    {n:'04',t:'Quality Assurance',   d:'Every product meets international standards. Our experts verify compatibility with your project specs.'},
    {n:'05',t:'UAE-Wide Delivery',   d:'From single units to full container loads. On-time delivery to any site across the Emirates.'},
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      if(lineRef.current) gsap.fromTo(lineRef.current,{scaleY:0},{scaleY:1,transformOrigin:'top',ease:'none',scrollTrigger:{trigger:sec.current,start:'top 50%',end:'bottom 50%',scrub:1.2}})
      steps.current.forEach((s,i) => {
        if(!s) return
        gsap.fromTo(s,{opacity:0,x:i%2===0?-80:80},{opacity:1,x:0,duration:1,ease:'power3.out',scrollTrigger:{trigger:s,start:'top 80%'}})
      })
    }, sec)
    return () => ctx.revert()
  },[])

  return (
    <section ref={sec} className="relative py-28 overflow-hidden" style={{background:C.cream}}>
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="font-major text-[10px] tracking-[0.08em] uppercase block mb-4" style={{color:C.accent,letterSpacing:'0.05em'}}>The Process</span>
          <h2 className="font-serif italic text-4xl md:text-5xl lg:text-6xl" style={{color:C.dark}}>How We Work</h2>
        </div>
        <div className="relative">
          <div ref={lineRef} className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 hidden md:block" style={{background:C.accent,transformOrigin:'top',transform:'scaleY(0)'}} />
          <div className="space-y-20 md:space-y-28">
            {data.map((s,i) => (
              <div key={i} ref={el=>steps.current[i]=el} className={`relative flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-14 ${i%2===0?'':'md:flex-row-reverse'}`} style={{opacity:0}}>
                <div className="flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center shadow-lg shadow-[#0F766E]/20" style={{background:`linear-gradient(135deg,${C.accent},${C.accentD})`}}>
                  <span className="font-major text-white text-[13px]" style={{letterSpacing:'0.02em'}}>{s.n}</span>
                </div>
                <div className={`flex-1 ${i%2===0?'md:text-right':'md:text-left'}`}>
                  <h3 className="font-poppins text-xl md:text-2xl font-bold mb-2" style={{color:C.dark}}>{s.t}</h3>
                  <p className="font-onest text-[#777] text-[15px] leading-relaxed max-w-md inline-block">{s.d}</p>
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
   8. BRANDS MARQUEE  — Double row
   ═══════════════════════════════════════════════════════════ */
function BrandsMarquee() {
  const sec = useRef(null)
  const brands = ['Milano','Ariston','Lecico','National Paints','Akfix','Dulux','RAK Ceramics','Hempel','Geberit','Grohe','Al Jazeera','Saveto','Bravat','Jotun','Henkel','Knauf','Hunter','Al Wataniah','Sika','Mapei','Daikin','Panasonic','Legrand','ABB','Schneider','Philips','Osram','Samsung','Hager','Megaman','GE']
  const half = Math.ceil(brands.length/2)
  const r1 = brands.slice(0,half), r2 = brands.slice(half)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sec.current,{opacity:0},{opacity:1,duration:1,scrollTrigger:{trigger:sec.current,start:'top 85%'}})
    }, sec)
    return () => ctx.revert()
  },[])

  return (
    <section ref={sec} className="relative py-20 overflow-hidden" style={{background:C.slate,opacity:0}}>
      <div className="text-center mb-12">
        <span className="font-major text-[10px] tracking-[0.08em] uppercase block mb-3" style={{color:C.accentL,letterSpacing:'0.05em'}}>Partners</span>
        <h2 className="font-serif italic text-3xl md:text-4xl text-white">31+ Global Brands. <em className="not-italic" style={{color:C.accentL}}>Zero Compromise.</em></h2>
      </div>
      {[r1,r2].map((row,ri) => (
        <div key={ri} className="marquee-container mb-3">
          <div className={ri===0?'marquee-track-left flex whitespace-nowrap':'marquee-track-right flex whitespace-nowrap'}>
            {[...row,...row,...row,...row].map((b,i) => (
              <span key={i} className="inline-flex items-center px-6 py-3 mx-1.5 rounded-full border border-white/8 font-poppins text-white/40 text-[12px] font-medium hover:text-white hover:border-[#14B8A6]/40 transition-colors duration-300 cursor-default" data-hover>{b}</span>
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   9. CONSTRUCTION GALLERY  — Raw materials art section
   ═══════════════════════════════════════════════════════════ */
function ConstructionGallery() {
  const sec = useRef(null)
  const items = [
    {src:'/pics/scaffold.jpg',      label:'Steel Scaffolding',  size:'lg'},
    {src:'/pics/rebar2.jpg',        label:'TMT Rebar',          size:'sm'},
    {src:'/pics/cinderblocks.jpg',   label:'Hollow Blocks',      size:'sm'},
    {src:'/pics/interlock5.jpg',    label:'Interlocking Pavers', size:'lg'},
    {src:'/pics/cinderblocks1.jpg', label:'Masonry Blocks',      size:'md'},
    {src:'/pics/interlock2.jpg',    label:'Paver Patterns',      size:'md'},
    {src:'/pics/whitesand.jpg',     label:'Washed Sand',         size:'lg'},
    {src:'/pics/interlock4.jpg',    label:'Heavy-Duty Interlock',size:'sm'},
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.cg-item',{opacity:0,scale:0.9,y:60},{opacity:1,scale:1,y:0,duration:0.9,stagger:0.08,ease:'power3.out',scrollTrigger:{trigger:sec.current,start:'top 70%'}})
    }, sec)
    return () => ctx.revert()
  },[])

  return (
    <section ref={sec} className="relative py-28 overflow-hidden" style={{background:C.dark}}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="font-major text-[10px] tracking-[0.08em] uppercase block mb-4" style={{color:C.accentL,letterSpacing:'0.05em'}}>Raw Materials</span>
          <h2 className="font-serif italic text-4xl md:text-5xl text-white">The Art of <em className="not-italic" style={{color:C.accentL}}>Construction</em></h2>
        </div>
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {items.map((item,i) => (
            <div key={i} className="cg-item break-inside-avoid group relative rounded-2xl overflow-hidden cursor-pointer" style={{opacity:0}} data-hover>
              <img src={item.src} alt={item.label} className="w-full object-cover transition-transform duration-[1.2s] group-hover:scale-105" style={{aspectRatio: item.size==='lg'?'4/3':item.size==='md'?'3/4':'1/1'}} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
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
   10. TRUST + TESTIMONIALS
   ═══════════════════════════════════════════════════════════ */
function TrustSection() {
  const sec = useRef(null)
  const [active,setActive] = useState(0)
  const trust = ['Premium Quality','On-Time Delivery','Built for Showrooms','UAE-Wide Supply','20+ Years Trusted']
  const tests = [
    {q:'Standard Group has been our go-to supplier for over a decade. Their range and service are unmatched.',a:'Ahmed Al Maktoum',r:'Project Director'},
    {q:'From sanitary ware to steel — they deliver everything on time and within spec. A true one-stop-shop.',a:'Sarah Mitchell',r:'Procurement Manager'},
    {q:'Competitive pricing and premium quality helped us complete our luxury resort project ahead of schedule.',a:'Rajesh Patel',r:'Senior Engineer'},
  ]
  useEffect(()=>{ const iv = setInterval(()=>setActive(p=>(p+1)%tests.length),4500); return ()=>clearInterval(iv) },[])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.tw',{opacity:0,y:40},{opacity:1,y:0,duration:0.8,stagger:0.12,ease:'power3.out',scrollTrigger:{trigger:sec.current,start:'top 80%'}})
    }, sec)
    return () => ctx.revert()
  },[])

  return (
    <section ref={sec} className="relative py-24 overflow-hidden bg-white">
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-16 px-6">
        {trust.map((t,i) => (
          <span key={i} className="tw font-serif italic text-2xl md:text-3xl lg:text-4xl" style={{color:C.dark,opacity:0}}>
            {t}{i<trust.length-1 && <span className="mx-3" style={{color:C.accent}}>·</span>}
          </span>
        ))}
      </div>
      <div className="max-w-3xl mx-auto px-6 text-center">
        <div className="relative h-44 md:h-32">
          {tests.map((t,i) => (
            <div key={i} className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-700" style={{opacity:active===i?1:0,transform:active===i?'none':'translateY(20px)'}}>
              <p className="font-serif italic text-xl md:text-2xl leading-relaxed mb-6" style={{color:C.dark+'aa'}}>"{t.q}"</p>
              <span className="font-poppins text-sm font-bold" style={{color:C.dark}}>{t.a}</span>
              <span className="font-onest text-xs" style={{color:C.muted}}>{t.r}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-2 mt-6">
          {tests.map((_,i) => <button key={i} onClick={()=>setActive(i)} className={`h-2 rounded-full transition-all duration-300 ${active===i?'w-7':'w-2'}`} style={{background:active===i?C.accent:C.dark+'22'}} data-hover />)}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   11. CTA FINALE
   ═══════════════════════════════════════════════════════════ */
function CTAFinale() {
  const sec = useRef(null), words = useRef([])
  const w = ["Let's","Build","Something","Extraordinary."]

  useEffect(() => {
    const ctx = gsap.context(() => {
      words.current.forEach((el,i) => {
        if(!el) return
        gsap.fromTo(el,{clipPath:'inset(100% 0 0 0)',opacity:0},{clipPath:'inset(0% 0 0 0)',opacity:1,duration:1.2,delay:i*0.18,ease:'power3.out',scrollTrigger:{trigger:sec.current,start:'top 65%'}})
      })
    }, sec)
    return () => ctx.revert()
  },[])

  return (
    <section ref={sec} id="contact" className="relative py-32 md:py-40 overflow-hidden" style={{background:C.dark}}>
      {/* Floating dots */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(40)].map((_,i) => (
          <div key={i} className="absolute w-1 h-1 rounded-full animate-float-p" style={{background:C.accentL+'33',left:`${Math.random()*100}%`,top:`${Math.random()*100}%`,animationDelay:`${Math.random()*10}s`,animationDuration:`${5+Math.random()*10}s`}} />
        ))}
      </div>
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="mb-12">
          {w.map((word,i) => (
            <div key={i} ref={el=>words.current[i]=el} className="overflow-hidden" style={{opacity:0}}>
              <span className="font-serif italic text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white leading-[1.08] block">{word}</span>
            </div>
          ))}
        </div>
        <p className="font-onest text-white/35 text-base md:text-lg max-w-xl mx-auto mb-12 leading-relaxed">
          Whether it's a single product or a full project supply across the UAE — Standard Group delivers excellence.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <MagBtn href="#categories">Explore Products</MagBtn>
          <MagBtn href="https://wa.me/971501234567" ghost>Contact Us</MagBtn>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   12. FOOTER
   ═══════════════════════════════════════════════════════════ */
function Footer() {
  const ref = useRef(null)
  const navLinks = [
    {l:'Water Heaters',h:'/milano-water-heaters'},{l:'Sanitary Ware',h:'/sanitary-ware'},{l:'Steel',h:'/steel'},
    {l:'Cement',h:'/cement'},{l:'Tiles & Interlock',h:'/tiles-roof-interlock'},{l:'Gypsum Board',h:'/gypsum-board'},
    {l:'Paints',h:'/paints-tools'},{l:'Plumbing',h:'/plumbing-sanitary'},{l:'Electric',h:'/electric-lights'},
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.fi',{opacity:0,y:20},{opacity:1,y:0,duration:0.8,stagger:0.1,ease:'power3.out',scrollTrigger:{trigger:ref.current,start:'top 90%'}})
    }, ref)
    return () => ctx.revert()
  },[])

  return (
    <footer ref={ref} style={{background:C.charcoal}}>
      <div className="h-px" style={{background:`linear-gradient(90deg,transparent,${C.accent},transparent)`}} />
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="fi" style={{opacity:0}}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full border flex items-center justify-center" style={{borderColor:C.accent+'88'}}>
                <span className="font-serif italic text-lg font-bold" style={{color:C.accentL}}>S</span>
              </div>
              <div>
                <span className="font-poppins text-white text-[12px] tracking-[0.15em] uppercase block font-bold">Standard Group</span>
                <span className="font-major text-[7px] tracking-[0.1em] uppercase" style={{color:C.accentL,letterSpacing:'0.05em'}}>We Set Standards</span>
              </div>
            </div>
            <p className="font-onest text-white/30 text-[13px] leading-relaxed max-w-xs">UAE's premier building materials supplier. 20+ years, 31+ global brands, 500+ products.</p>
          </div>
          <div className="fi" style={{opacity:0}}>
            <h4 className="font-major text-[9px] tracking-[0.1em] uppercase mb-5" style={{color:C.accentL,letterSpacing:'0.05em'}}>Products</h4>
            <div className="grid grid-cols-2 gap-1.5">
              {navLinks.map((lnk,i) => <Link key={i} to={lnk.h} className="font-onest text-white/30 text-[13px] hover:text-[#14B8A6] transition-colors" data-hover>{lnk.l}</Link>)}
            </div>
          </div>
          <div className="fi" style={{opacity:0}}>
            <h4 className="font-major text-[9px] tracking-[0.1em] uppercase mb-5" style={{color:C.accentL,letterSpacing:'0.05em'}}>Contact</h4>
            <div className="space-y-2 font-onest text-white/30 text-[13px]">
              <p>Sharjah, United Arab Emirates</p>
              <p>info@standardgroup.ae</p>
              <p>+971 6 XXX XXXX</p>
            </div>
          </div>
        </div>
        <div className="fi mt-14 pt-6 border-t border-white/5 text-center" style={{opacity:0}}>
          <p className="font-major text-white/15 text-[9px] tracking-[0.1em]" style={{letterSpacing:'0.05em'}}>© {new Date().getFullYear()} Standard Group. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

/* ═══════════════════════════════════════════════════════════
   NAVBAR
   ═══════════════════════════════════════════════════════════ */
function CinematicNavbar() {
  const [scrolled,setScrolled] = useState(false)
  const [open,setOpen] = useState(false)
  const ref = useRef(null)
  const cats = [
    {l:'Water Heaters',h:'/milano-water-heaters'},{l:'Water Closets',h:'/water-closets'},{l:'Wash Basins',h:'/wash-basins'},
    {l:'Wall Hung WC',h:'/wall-hung'},{l:'Sanitary Ware',h:'/sanitary-ware'},{l:'Tiles & Interlock',h:'/tiles-roof-interlock'},
    {l:'Blocks & Sands',h:'/blocks-sands'},{l:'Cement',h:'/cement'},{l:'Steel',h:'/steel'},
    {l:'Plywood',h:'/film-faced-plywood'},{l:'Waterproofing',h:'/water-proofing'},{l:'Gypsum Board',h:'/gypsum-board'},
    {l:'Paints',h:'/paints-tools'},{l:'General Tools',h:'/general-tools-plumbing'},{l:'Plumbing',h:'/plumbing-sanitary'},
    {l:'Plumbing HW',h:'/plumbing-sanitary-2'},{l:'Electric & Lights',h:'/electric-lights'},
  ]

  useEffect(()=>{
    const fn = ()=>setScrolled(window.scrollY>50)
    window.addEventListener('scroll',fn); return ()=>window.removeEventListener('scroll',fn)
  },[])
  useEffect(()=>{ gsap.fromTo(ref.current,{y:-100,opacity:0},{y:0,opacity:1,duration:1,delay:0.2,ease:'power3.out'}) },[])

  return (
    <header ref={ref} className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled?'shadow-lg':''}`} style={{background:scrolled?'rgba(17,17,16,0.95)':'transparent',backdropFilter:scrolled?'blur(12px)':'none',opacity:0}}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5" data-hover>
          <div className="w-8 h-8 rounded-full border flex items-center justify-center" style={{borderColor:C.accent+'88'}}>
            <span className="font-serif italic text-base font-bold" style={{color:C.accentL}}>S</span>
          </div>
          <div className="hidden sm:flex flex-col leading-none">
            <span className="font-poppins text-white text-[11px] tracking-[0.15em] uppercase font-bold">Standard Group</span>
            <span className="font-major text-[6px] tracking-[0.08em] uppercase" style={{color:C.accentL,letterSpacing:'0.04em'}}>We Set Standards</span>
          </div>
        </Link>
        <nav className="hidden lg:flex items-center gap-5">
          <a href="#categories" className="font-poppins text-white/50 text-[11px] tracking-[0.1em] uppercase font-medium hover:text-[#14B8A6] transition-colors" data-hover>Products</a>
          <a href="#contact" className="font-poppins text-white/50 text-[11px] tracking-[0.1em] uppercase font-medium hover:text-[#14B8A6] transition-colors" data-hover>Contact</a>
          <a href="#contact" className="ml-1 inline-flex items-center gap-2 px-5 py-2 text-white text-[10px] tracking-[0.1em] uppercase font-poppins font-bold transition-colors" style={{background:C.accent}} data-hover>Get a Quote</a>
        </nav>
        <button onClick={()=>setOpen(!open)} className="lg:hidden text-white" data-hover>
          {open ? <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
               : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>}
        </button>
      </div>
      {open && (
        <div className="lg:hidden border-t border-white/5" style={{background:'rgba(17,17,16,0.98)'}}>
          <div className="max-w-7xl mx-auto px-6 py-5 grid grid-cols-2 gap-2">
            {cats.map((c,i) => <Link key={i} to={c.h} onClick={()=>setOpen(false)} className="font-onest text-white/40 text-[13px] py-1.5 hover:text-[#14B8A6] transition-colors">{c.l}</Link>)}
          </div>
        </div>
      )}
    </header>
  )
}

/* ═══════════════════════════════════════════════════════════
   MAIN EXPORT
   ═══════════════════════════════════════════════════════════ */
export default function CinematicHome() {
  useEffect(() => {
    const lenis = new Lenis({ duration:1.4, easing:t=>Math.min(1,1.001-Math.pow(2,-10*t)), smoothWheel:true })
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add(t => lenis.raf(t*1000))
    gsap.ticker.lagSmoothing(0)
    return () => { lenis.destroy() }
  },[])

  return (
    <div className="min-h-screen font-onest" style={{background:C.bg}}>
      <CustomCursor />
      <CinematicNavbar />
      <HeroSection />
      <StatsSection />
      <TextureGallery />
      <SplitSection />
      <ProductCategories />
      <ShowroomGallery />
      <ProcessSection />
      <BrandsMarquee />
      <ConstructionGallery />
      <TrustSection />
      <CTAFinale />
      <Footer />

      <style>{`
        .ticker-wrap{overflow:hidden}
        .ticker-track{animation:ticker 25s linear infinite}
        @keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        .marquee-container{overflow:hidden}
        .marquee-track-left{animation:mql 50s linear infinite}
        .marquee-track-right{animation:mqr 55s linear infinite}
        @keyframes mql{0%{transform:translateX(0)}100%{transform:translateX(-25%)}}
        @keyframes mqr{0%{transform:translateX(-25%)}100%{transform:translateX(0)}}
        .marquee-container:hover .marquee-track-left,.marquee-container:hover .marquee-track-right{animation-play-state:paused}
        @keyframes fp{0%,100%{transform:translateY(0) translateX(0);opacity:0}10%{opacity:0.8}50%{transform:translateY(-120px) translateX(40px);opacity:0.4}90%{opacity:0}}
        .animate-float-p{animation:fp 8s ease-in-out infinite}
      `}</style>
    </div>
  )
}
