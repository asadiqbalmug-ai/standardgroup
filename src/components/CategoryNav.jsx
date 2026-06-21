import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { fetchCatalog } from '../lib/catalog'
import { accentForKey } from '../config/colors'

// Trimmed, backend-driven category navigation: shows the categories flagged
// "In nav" (is_featured) inline, and tucks the rest under a "More" dropdown.
export default function CategoryNav({ categories: provided }) {
  const [cats, setCats] = useState(provided || [])
  const [moreOpen, setMoreOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (provided) { setCats(provided); return }
    fetchCatalog().then(({ categories }) => setCats(categories))
  }, [provided])

  useEffect(() => {
    const onClick = (e) => { if (ref.current && !ref.current.contains(e.target)) setMoreOpen(false) }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  if (!cats.length) return null
  const featured = cats.filter((c) => c.isFeatured)
  const primary = (featured.length ? featured : cats).slice(0, 7)
  const primarySlugs = new Set(primary.map((c) => c.slug))
  const rest = cats.filter((c) => !primarySlugs.has(c.slug))

  const linkCls = 'whitespace-nowrap px-3 py-2 text-[11px] font-poppins text-[#555] hover:text-[#0F766E] hover:bg-gray-50 transition-colors border-b-2 border-transparent'

  return (
    <div className="hidden lg:flex items-center border-t border-gray-100">
      {primary.map((c) => {
        const a = accentForKey(c.slug)
        return (
          <Link key={c.slug} to={`/products?cat=${c.slug}`} className={linkCls}
            style={{ '--ac': a.solid }}
            onMouseEnter={(e) => (e.currentTarget.style.borderBottomColor = a.solid)}
            onMouseLeave={(e) => (e.currentTarget.style.borderBottomColor = 'transparent')}>
            {c.icon ? `${c.icon} ` : ''}{c.name}
          </Link>
        )
      })}
      {rest.length > 0 && (
        <div className="relative" ref={ref}>
          <button onClick={() => setMoreOpen((v) => !v)}
            className="flex items-center gap-1 whitespace-nowrap px-3 py-2 text-[11px] font-poppins text-[#555] hover:text-[#0F766E] hover:bg-gray-50 transition-colors border-b-2 border-transparent">
            More <ChevronDown size={12} className={moreOpen ? 'rotate-180 transition-transform' : 'transition-transform'} />
          </button>
          {moreOpen && (
            <div className="absolute left-0 top-full bg-white border border-gray-200 rounded-b-lg shadow-lg py-2 w-60 grid grid-cols-1 z-50">
              {rest.map((c) => (
                <Link key={c.slug} to={`/products?cat=${c.slug}`} onClick={() => setMoreOpen(false)}
                  className="px-4 py-2 text-xs font-onest text-[#444] hover:bg-gray-50 hover:text-[#0F766E] flex items-center gap-2">
                  {c.icon && <span>{c.icon}</span>}{c.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
      <Link to="/products" className="whitespace-nowrap px-3 py-2 text-[11px] font-poppins text-[#0F766E] font-bold hover:bg-gray-50 border-b-2 border-transparent ml-auto">
        All Products →
      </Link>
    </div>
  )
}
