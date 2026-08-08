"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const brands = [
  { name: "Ariston", logo: "/brands/ariston.png", customClass: "scale-[1.6]" },
  { name: "Asmaco", logo: "/brands/asmaco.png" },
  { name: "Awazel", logo: "/brands/awazel.jpg" },
  { name: "Bildco", logo: "/brands/bildco.jpg", customClass: "scale-150" },
  { name: "Bosch", logo: "/brands/bosch.png", customClass: "scale-[1.6]" },
  { name: "Bucomac", logo: "/brands/Bucomac.webp" },
  { name: "Dubai Polymer", logo: "/brands/DubaiPolymer.png" },
  { name: "Ducab", logo: "/brands/ducab.png", customClass: "scale-[1.3]" },
  { name: "Everhot", logo: "/brands/everhot.png" },
  { name: "Fosroc", logo: "/brands/fosroc.png" },
  { name: "GCEM", logo: "/brands/gcem.png", customClass: "scale-150" },
  { name: "GSI", logo: "/brands/gsi.jpg" }
];

export default function BrandCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 250; 
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="w-full bg-white pt-6 pb-12 md:pt-8 md:pb-16 border-t border-gray-100">
      <div className="max-w-[1400px] mx-auto px-4 md:px-12 relative">
        
        {/* Section Title */}
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#091522] mb-8">
          Main Brands
        </h2>

        <div className="relative">
          {/* Navigation Arrows */}
          <button 
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white border border-gray-200 shadow-md hover:shadow-lg rounded-full flex items-center justify-center text-gray-700 hover:text-black transition-all -ml-6 hidden md:flex"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white border border-gray-200 shadow-md hover:shadow-lg rounded-full flex items-center justify-center text-gray-700 hover:text-black transition-all -mr-6 hidden md:flex"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Scrollable Container */}
          <div 
            ref={scrollRef}
            className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-4 pt-2 px-1 -mx-1"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {brands.map((brand, idx) => (
              <Link 
                key={idx}
                href={`/categories?brand=${encodeURIComponent(brand.name)}`}
                className="snap-start shrink-0 w-[200px] md:w-[240px] h-[120px] bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-center hover:border-[#091522] transition-all duration-300 hover:shadow-md hover:-translate-y-1 cursor-pointer overflow-hidden relative"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={brand.logo} 
                  alt={brand.name}
                  className={`max-w-full max-h-[80px] object-contain mix-blend-multiply ${brand.customClass || ''}`}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
