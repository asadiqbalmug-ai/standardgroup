# Standard Group - Design System

## Brand Identity

### Mission
UAE's trusted B2B building materials supplier. 20+ years serving contractors, distributors, and construction professionals with quality, reliability, and competitive pricing.

### Target Audience
- **Primary**: Construction contractors, project managers, procurement teams
- **Secondary**: Distributors, retailers, architects, interior designers
- **Tertiary**: Individual builders, DIY professionals

### Brand Voice
Professional, straightforward, reliable, knowledgeable, approachable. No fluff. Business-focused.

---

## Color System

### Primary Colors
| Name | Hex | Usage |
|------|-----|-------|
| Brand Teal | `#0F766E` | Primary buttons, links, accents |
| Brand Teal Light | `#14B8A6` | Hover states, highlights |
| Brand Teal Dark | `#0D6B64` | Active states, pressed buttons |

### Neutral Colors
| Name | Hex | Usage |
|------|-----|-------|
| Charcoal | `#0c0c0b` | Headlines, dark backgrounds |
| Dark Gray | `#1a1a1a` | Footer, cards |
| Medium Gray | `#555555` | Body text |
| Light Gray | `#888888` | Secondary text, captions |
| Off-White | `#F5F0E8` | Page backgrounds (warm) |
| Pure White | `#FFFFFF` | Cards, inputs |

### Accent Colors (Product Categories)
| Category | Hex | Usage |
|----------|-----|-------|
| Water Heaters | `#2563eb` | Category badges |
| Water Closets | `#7C3AED` | Category badges |
| Wash Basins | `#0D9488` | Category badges |
| Sanitary Ware | `#1D4ED8` | Category badges |
| Tiles & Interlock | `#059669` | Category badges |
| Blocks & Sands | `#92400E` | Category badges |
| Cement | `#6B7280` | Category badges |
| Steel | `#475569` | Category badges |
| Plywood | `#78350F` | Category badges |
| Waterproofing | `#0369A1` | Category badges |
| Gypsum | `#64748B` | Category badges |
| Paints | `#BE123C` | Category badges |
| Plumbing | `#0C4A6E` | Category badges |
| Electric | `#CA8A04` | Category badges |

---

## Typography System

### Font Families
| Font | Usage | Import |
|------|-------|--------|
| **Montserrat** | Headlines, navigation, buttons, brand text | `font-montserrat` |
| **Onest** | Body text, descriptions, labels | `font-onest` |
| **Poppins** | Alternative UI text, small labels | `font-poppins` |

### Type Scale
| Element | Font | Size | Weight | Line Height | Letter Spacing |
|---------|------|------|--------|-------------|----------------|
| **H1 (Hero)** | Montserrat | 48-64px | 700 (Bold) | 1.1 | 0.02em |
| **H2 (Section)** | Montserrat | 32-40px | 700 (Bold) | 1.2 | 0.01em |
| **H3 (Card Title)** | Montserrat | 20-24px | 600 (Semibold) | 1.3 | 0 |
| **H4 (Subsection)** | Montserrat | 16-18px | 600 (Semibold) | 1.4 | 0.02em |
| **Body Large** | Onest | 16-18px | 400 (Regular) | 1.6 | 0 |
| **Body** | Onest | 14-16px | 400 (Regular) | 1.5 | 0 |
| **Body Small** | Onest | 12-14px | 400 (Regular) | 1.5 | 0 |
| **Caption** | Onest | 11-12px | 500 (Medium) | 1.4 | 0.02em |
| **Label/Tag** | Montserrat | 10-12px | 600 (Semibold) | 1 | 0.1em (uppercase) |
| **Button** | Montserrat | 13-14px | 700 (Bold) | 1 | 0.05em (uppercase) |
| **Nav Link** | Poppins | 12px | 500 (Medium) | 1 | 0.1em (uppercase) |
| **Price** | Montserrat | 18-24px | 700 (Bold) | 1 | 0 |

### Typography Patterns
- **Headlines**: Title case, bold weight, tight line height
- **Section Labels**: Uppercase, small size, wide letter spacing, teal color
- **Body Text**: Sentence case, comfortable line height (1.5-1.6)
- **Buttons**: Uppercase, bold, letter spacing 0.05em

---

## Spacing System

### Section Spacing
| Size | Value | Usage |
|------|-------|-------|
| xs | 16px | Tight sections, mobile |
| sm | 24px | Compact sections |
| md | 40px | Standard sections |
| lg | 64px | Large sections |
| xl | 80px | Hero sections, major breaks |
| 2xl | 120px | Major section separations |

### Content Spacing
| Token | Value | Usage |
|-------|-------|-------|
| space-1 | 4px | Icon gaps, tight text |
| space-2 | 8px | Inline elements |
| space-3 | 12px | Card padding small |
| space-4 | 16px | Standard gaps |
| space-5 | 20px | Card padding |
| space-6 | 24px | Section content gaps |
| space-8 | 32px | Large content gaps |
| space-10 | 40px | Section internal padding |
| space-12 | 48px | Major content blocks |
| space-16 | 64px | Section padding |

### Container Widths
| Container | Max Width | Padding |
|-----------|-----------|---------|
| sm | 640px | 16px |
| md | 768px | 24px |
| lg | 1024px | 24px |
| xl | 1280px | 32px |
| 2xl | 1400px | 48px |
| Full | 100% | 16-48px (responsive) |

---

## Component Library

### Buttons

#### Primary Button
```
Background: #0F766E
Text: White
Font: Montserrat Bold 13px
Padding: 12px 24px
Border Radius: 4px (rounded-sm)
Text Transform: Uppercase
Letter Spacing: 0.05em
Hover: Background #0D6B64
Transition: 200ms ease
```

#### Secondary Button
```
Background: Transparent
Border: 1px solid #0F766E
Text: #0F766E
Font: Montserrat Bold 13px
Padding: 12px 24px
Border Radius: 4px
Hover: Background #0F766E, Text White
```

#### Ghost Button
```
Background: Transparent
Text: #555555
Font: Montserrat 13px
Padding: 8px 16px
Hover: Text #0F766E
```

### Cards

#### Product Card
```
Background: White
Border: 1px solid #e5e5e5
Border Radius: 8px
Padding: 0 (image bleeds) / 16px (content)
Shadow: 0 1px 3px rgba(0,0,0,0.05)
Hover Shadow: 0 4px 12px rgba(0,0,0,0.1)
Hover Transform: translateY(-4px)
Transition: 300ms ease
```

#### Category Card
```
Background: #F5F0E8
Border Radius: 8px
Padding: 24px
Border: 1px solid transparent
Hover Border: #0F766E
Icon Size: 40px
Icon Color: #0F766E
```

### Forms/Inputs

#### Text Input
```
Background: White
Border: 1px solid #e5e5e5
Border Radius: 4px
Padding: 12px 16px
Font: Onest 14px
Focus Border: #0F766E
Placeholder: #888888
```

### Badges

#### Category Badge
```
Background: Teal 10% opacity
Text: #0F766E
Font: Montserrat 11px Bold
Padding: 4px 10px
Border Radius: 9999px (full)
Text Transform: Uppercase
Letter Spacing: 0.05em
```

#### Price Badge
```
Background: #0c0c0b
Text: White
Font: Montserrat 16px Bold
Padding: 8px 14px
Border Radius: 4px
```

---

## Layout Patterns

### Grid System
- **Product Grid**: 4 columns (desktop), 2 columns (tablet), 1 column (mobile)
- **Category Grid**: 3-4 columns (desktop), 2 columns (tablet), 1 column (mobile)
- **Feature Grid**: 3 columns (desktop), 1 column (mobile)

### Section Structure
```
<section>
  <div className="max-w-7xl mx-auto px-6">
    <!-- Section Header -->
    <div className="text-center mb-12">
      <span className="label">Section Label</span>
      <h2>Section Title</h2>
      <p>Section description</p>
    </div>
    <!-- Content -->
  </div>
</section>
```

### Responsive Breakpoints
| Breakpoint | Width | Target |
|------------|-------|--------|
| sm | 640px | Large phones |
| md | 768px | Tablets |
| lg | 1024px | Small laptops |
| xl | 1280px | Desktops |
| 2xl | 1536px | Large screens |

---

## Animation Guidelines

### Philosophy
**Balanced, not overwhelming.** Animations should guide attention, not distract. Professional B2B feel.

### Allowed Animations
1. **Fade In + Slide Up**: Content reveals (0.5s ease-out)
2. **Hover Scale**: Buttons, cards (1.02-1.05x, 200ms)
3. **Hover Lift**: Cards translateY(-4px) with shadow increase
4. **Smooth Scroll**: Lenis for page scrolling
5. **Image Zoom**: Product images on hover (1.05x, 400ms)
6. **Counter Animation**: Number counting for stats

### Avoid
- Complex 3D transforms
- Long animation durations (>1s)
- Multiple simultaneous animations
- Parallax effects (can cause motion sickness)
- Auto-playing videos with sound

### Timing
| Type | Duration | Easing |
|------|----------|--------|
| Hover | 200ms | ease |
| Reveal | 500ms | cubic-bezier(0.25, 0.46, 0.45, 0.94) |
| Page Transition | 300ms | ease-in-out |

---

## Favicon Setup

### Location
`/public/favicon.ico` - Root of public folder

### Required Files
| File | Format | Size | Purpose |
|------|--------|------|---------|
| favicon.ico | ICO | 32x32 | Legacy browser support |
| favicon-16x16.png | PNG | 16x16 | Browser tabs |
| favicon-32x32.png | PNG | 32x32 | Browser tabs (retina) |
| apple-touch-icon.png | PNG | 180x180 | iOS home screen |
| android-chrome-192x192.png | PNG | 192x192 | Android |
| android-chrome-512x512.png | PNG | 512x512 | Android (splash) |

### HTML Head Tags (in index.html)
```html
<link rel="icon" type="image/x-icon" href="/favicon.ico">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
```

---

## Image Guidelines

### Product Images
- **Format**: WebP (with JPG fallback)
- **Size**: 800x800px minimum
- **Aspect Ratio**: 1:1 (square) or 4:3
- **Background**: White or transparent
- **Style**: Clean, professional, consistent lighting

### Hero/Background Images
- **Format**: WebP or high-quality JPG
- **Size**: 1920x1080px minimum
- **Optimization**: Compressed to <200KB
- **Overlay**: Dark gradient for text readability

### Brand Logos
- **Format**: SVG (preferred) or PNG
- **Style**: Grayscale or original colors
- **Height**: 40-60px display size
- **Spacing**: Even gaps between logos

### Icons
- **Library**: Lucide React
- **Size**: 16-24px inline, 32-48px feature
- **Stroke Width**: 2px
- **Color**: Inherit from text or #0F766E

---

## Page Structure (New Design)

### Homepage Sections Order
1. **Hero** - Value prop, CTA to products
2. **Partners/Brands** - Trust indicators (logo grid)
3. **Product Categories** - Visual grid with prices starting at
4. **Featured Products** - Popular items with prices
5. **Showroom/Gallery** - Visual proof
6. **Testimonials** - Client quotes
7. **Business Ethics/R&D** - Why choose us
8. **Footer** - Contact, links, social

### Product Page Structure
1. Category header
2. Filter/Sort bar
3. Product grid (Shopify-style)
4. Each product card: Image, Name, Price, Quick view button
5. Load more / Pagination

---

## Naming Conventions

### CSS Classes
- Use Tailwind utility classes
- Custom classes: `kebab-case`
- Component classes: `ComponentName-element`

### File Naming
- Components: `PascalCase.jsx`
- Pages: `PascalCase.jsx` or `kebab-case.jsx`
- Utilities: `camelCase.js`
- Styles: `kebab-case.css`
- Assets: `kebab-case.ext`

### Color Variables (CSS Custom Properties)
```css
:root {
  --brand-teal: #0F766E;
  --brand-teal-light: #14B8A6;
  --brand-teal-dark: #0D6B64;
  --charcoal: #0c0c0b;
  --off-white: #F5F0E8;
}
```

---

## Accessibility Standards

- **Color Contrast**: WCAG AA minimum (4.5:1 for text)
- **Focus States**: Visible outline on all interactive elements
- **Alt Text**: Descriptive alt text for all product images
- **Semantic HTML**: Proper heading hierarchy (h1 > h2 > h3)
- **ARIA Labels**: For icon-only buttons
- **Reduced Motion**: Respect `prefers-reduced-motion`

---

## Version
**v2.0 - B2B Simplified Redesign**
Last Updated: May 2026
