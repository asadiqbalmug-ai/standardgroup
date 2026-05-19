# Page Style Benchmark - Milano Water Heaters

This document serves as the benchmark standard for all future product pages. Each section below documents the exact styling, effects, and formatting used.

---

## Page Configuration

### Accent Color
- **Milano Water Heaters**: `#2563eb` (Blue)
- Future pages will use different accent colors per product category

### Color Palette
- **Background**: `#F9F6F0` (Cream)
- **Text Primary**: `#1a1a1a`
- **Text Secondary**: `#555`
- **Text Tertiary**: `#888`, `#94a3b8`, `#666`
- **Dark Background Sections**: `#1e293b`, `#334155`, `#0f172a`
- **Accent**: `#2563eb`, `#60a5fa`

### Fonts
- **Major Display**: `font-major` (Archivo Black)
- **Serif Italic**: `font-serif` (Cormorant Garamond)
- **Body**: `font-poppins` (Poppins)
- **Mono**: `font-manrope` (Manrope)

---

## Global CSS Effects

### 3D Text Shadow
```css
.text-3d-shadow {
  text-shadow: 
    2px 2px 0 rgba(0,0,0,0.15),
    4px 4px 0 rgba(0,0,0,0.12),
    6px 6px 0 rgba(0,0,0,0.08),
    8px 8px 12px rgba(0,0,0,0.25);
}
```
**Usage**: Apply to section headers (h1, h2) - NOT to card text

### Magnetic Text (CSS Only)
```css
.magnetic-text {
  display: inline-block;
  transition: transform 0.3s ease-out;
  will-change: transform;
}
.magnetic-text:hover {
  transform: translate(3px, -3px);
}
```
**Usage**: Apply to header line 2 for subtle magnetic effect

### Magnetic Buttons (CSS Only)
```css
.magnetic-btn {
  display: inline-flex;
  transition: transform 0.3s ease-out, box-shadow 0.3s ease;
  will-change: transform;
}
.magnetic-btn:hover {
  transform: translate(4px, -4px);
  box-shadow: 0 15px 35px rgba(37, 99, 235, 0.4);
}
```
**Usage**: Apply to all CTA buttons

### Card Shadows
- **Light cards**: `shadow-lg shadow-black/10`
- **Dark cards**: `shadow-lg shadow-black/20`
- **Hover**: `hover:shadow-xl` or `hover:shadow-xl hover:shadow-[accent-color]/20`

---

## Section-by-Section Breakdown

### 1. Navigation
- **Position**: Fixed top
- **Background**: `bg-[#F9F6F0]/80 backdrop-blur-md`
- **Border**: `border-b border-black/5`
- **Padding**: `px-8 lg:px-16 py-4`
- **Logo**: SGfavicon.png (h-7)
- **Links**: `text-[#666] text-xs tracking-[0.1em] uppercase hover:text-[#1a1a1a]`
- **Contact Button**: `magnetic-btn bg-[accent-color] text-white px-5 py-2.5 rounded-full`

### 2. Hero Section
- **Background Image**: Full-bleed image with `bg-[#F9F6F0]/85` overlay
- **Header Structure**: Two-line header
  - Line 1: `font-major text-3xl sm:text-4xl lg:text-5xl text-[#1a1a1a] text-3d-shadow`
  - Line 2: `font-serif italic text-4xl sm:text-5xl lg:text-6xl text-[#555] text-3d-shadow` + magnetic effect
- **Animations**:
  - Line 1: Float up/down animation with GSAP (y: -15, yoyo: true, repeat: -1)
  - Line 2: Magnetic effect with inline mousemove handler
  - Subtitle: Fade in with GSAP
  - CTA: Fade in with GSAP
- **CTA Button**: `magnetic-btn bg-[#1a1a1a] text-white px-7 py-3.5 rounded-full hover:bg-[accent-color]`

### 3. Product Showcase
- **Section Header**: 
  - Label: `text-[accent-color] text-[11px] tracking-[0.3em] uppercase`
  - Title: `text-3xl sm:text-4xl lg:text-5xl text-[#1a1a1a] font-light text-3d-shadow`
  - Two-line structure with magnetic effect on line 2
- **Product Cards**:
  - **Dimensions**: `h-[380px]` (adjusted for price visibility)
  - **Classes**: `perspective-1000` on outer div
  - **Card Container**: `transform-style-preserve-3d group-hover:rotate-y-180`
  - **Front Side**:
    - `bg-white border border-black/[0.04] rounded-2xl shadow-lg shadow-black/10`
    - Image height: `h-48`
    - Title: `font-poppins text-[#1a1a1a] text-base` (NO 3D shadow on text)
    - Price: `font-poppins text-[accent-color] text-sm`
  - **Back Side** (Flip):
    - `bg-gradient-to-br from-[accent-color] to-[accent-darker]`
    - `backface-hidden rotate-y-180`
    - Grid of 4 icons with labels

### 4. Specs Section (Engineering Precision)
- **Background**: `bg-[#1e293b]` (Dark slate)
- **Header**: 
  - Line 1: `font-major tracking-[0.02em] text-white text-3d-shadow`
  - Line 2: `font-serif italic text-[#94a3b8] magnetic-text`
- **Spec Items**:
  - `bg-[#334155] rounded-xl border border-white/10 shadow-lg shadow-black/20`
  - Label: `text-[#94a3b8] text-[10px] uppercase` (NO 3D shadow)
  - Value: `text-white text-lg font-light`
  - Hover: `hover:border-[accent-color]/30 hover:shadow-xl hover:shadow-[accent-color]/20`
- **Visual Frame**:
  - Square: `w-96 h-96`
  - `bg-[#334155] rounded-3xl border border-white/10 shadow-xl shadow-black/20`
  - Image: `object-cover` (fills frame)
  - Overlay: `bg-gradient-to-b from-[accent-color]/10 via-transparent to-transparent`

### 5. Features Section (Why Milano Stands Apart)
- **Background**: `bg-[#F9F6F0]` (Cream)
- **Header**: Same structure as other sections
- **Feature Cards**:
  - `bg-[#F9F6F0] rounded-2xl border border-black/[0.03] shadow-lg shadow-black/10`
  - Title: `text-[#1a1a1a] text-sm font-medium` (NO 3D shadow)
  - Description: `text-[#888] text-xs`
  - Hover: `hover:shadow-xl`

### 6. Comparison Section
- **Background**: `bg-white`
- **Header**: Same structure
- **Table**:
  - Model names: `text-[#1a1a1a] font-medium text-3d-shadow`
  - Values: `text-[#888] text-sm`
  - Hover rows: `hover:bg-[#F9F6F0]/50`

### 7. Why Standard Group (Your Trusted Partner)
- **Background**: `bg-white`
- **Header**: Same structure
- **Reason Cards**:
  - `bg-[#F9F6F0] rounded-2xl border border-black/[0.03] shadow-lg shadow-black/10`
  - Number: `text-3xl lg:text-4xl font-light text-[accent-color]`
  - Title: `text-[#1a1a1a] text-sm font-medium` (NO 3D shadow)
  - Description: `text-[#888] text-xs`
  - Hover: `hover:shadow-xl`

### 8. CTA Section
- **Background**: `bg-[#1e293b]` (Dark slate)
- **Header**: 
  - Title: `text-white font-light` with inline textShadow
  - Subtitle: `text-[#94a3b8]`
- **Buttons**:
  - Primary: `magnetic-btn bg-[accent-color] text-white px-8 py-4 rounded-full shadow-lg shadow-[accent-color]/20`
  - Secondary: `magnetic-btn border border-white/20 text-white px-8 py-4 rounded-full hover:bg-white/10`

### 9. Footer
- **Background**: `bg-[#0f172a]`
- **Border**: `border-t border-white/10`
- **Logo**: SGfavicon.png (h-7, opacity-80)
- **Text**: `text-[#94a3b8]` and `text-[#64748b]`

---

## Animation Patterns

### GSAP Animations
```javascript
// Header lines float animation
gsap.to(headerLine1Ref.current, {
  y: -15,
  duration: 2,
  ease: 'sine.inOut',
  yoyo: true,
  repeat: -1
})

// Fade in animations
gsap.fromTo('.hero-title-line', 
  { y: 60, opacity: 0 }, 
  { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out', delay: 0.2 }
)

// ScrollTrigger for sections
gsap.fromTo('.card-class',
  { y: 30, opacity: 0 },
  { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: '.grid', start: 'top 85%' } }
)
```

### Magnetic Effect Pattern (Inline Handler)
```jsx
const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

<span
  ref={ref}
  style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
  onMouseMove={(e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    setMousePos({
      x: (e.clientX - centerX) * 0.15,
      y: (e.clientY - centerY) * 0.15
    })
  }}
  onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
>
  Text
</span>
```

---

## Card Flip Effect

### CSS Classes (in index.css)
```css
.perspective-1000 {
  perspective: 1000px;
}
.transform-style-preserve-3d {
  transform-style: preserve-3d;
}
.backface-hidden {
  backface-visibility: hidden;
}
.rotate-y-180 {
  transform: rotateY(180deg);
}
```

### JSX Pattern
```jsx
<div className="perspective-1000">
  <div className="transform-style-preserve-3d group-hover:rotate-y-180 transition-transform duration-500">
    <div className="backface-hidden">Front content</div>
    <div className="backface-hidden rotate-y-180">Back content</div>
  </div>
</div>
```

---

## Component Structure Pattern

```jsx
function SectionName() {
  const sectionRef = useRef(null)
  const headerLine1Ref = useRef(null)
  // Add ewhRef and mousePos state if magnetic effect needed

  useEffect(() => {
    const ctx = gsap.context(() => {
      // GSAP animations
      // Float animation for header line 1
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-[color]">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
        <div className="mb-14">
          <p className="text-[accent-color] text-[11px] tracking-[0.3em] uppercase font-medium mb-3">Label</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#1a1a1a] font-light leading-[1.1] text-3d-shadow">
            <span ref={headerLine1Ref} className="block font-major tracking-[0.02em]">Line 1</span>
            <span className="magnetic-text block font-serif italic text-[#555]">Line 2</span>
          </h2>
        </div>
        {/* Content */}
      </div>
    </section>
  )
}
```

---

## Important Rules

1. **NEVER** apply `text-3d-shadow` to card text - only apply to section headers
2. **ALWAYS** apply shadow to card containers, not text
3. **ALWAYS** use `magnetic-btn` class on all buttons
4. **ALWAYS** use two-line header structure with magnetic effect on line 2
5. **ALWAYS** use `sectionRef` for GSAP context cleanup
6. **ALWAYS** use `headerLine1Ref` for float animation on line 1
7. **NEVER** use `useMagneticEffect` hook - use inline mousemove handler instead
8. **ALWAYS** set accent color per page (Milano uses #2563eb)
9. **ALWAYS** use consistent padding: `py-24 lg:py-32` for sections
10. **ALWAYS** use consistent container: `max-w-[1400px] mx-auto px-8 lg:px-16`
