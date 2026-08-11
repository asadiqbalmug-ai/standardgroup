"use client";

import { useRef } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function BrandCarousel({ brands = [] }: { brands?: any[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  return (
    <section className="w-full bg-white pt-4 md:pt-6 pb-24 md:pb-28">
      <div className="max-w-[1400px] mx-auto px-4 md:px-12">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-[#bf846b] font-extrabold tracking-widest text-[11px] uppercase">
              Top Brands
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#091522] tracking-tight">
              We Partner With The Best
            </h2>
          </div>
          
          <Link href="/brands" className="flex items-center text-[#c25141] hover:text-red-700 font-bold text-[13px] uppercase tracking-widest transition-colors group">
            View All Brands
            <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
          </Link>
        </div>

        <div className="relative group mt-6">
          {/* Left Arrow */}
          <button 
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 w-12 h-12 bg-white border border-gray-100 shadow-[0_4px_15px_rgba(0,0,0,0.1)] rounded-full flex items-center justify-center text-gray-500 hover:text-black transition-all md:opacity-0 group-hover:opacity-100 hidden md:flex"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Arrow */}
          <button 
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 w-12 h-12 bg-white border border-gray-100 shadow-[0_4px_15px_rgba(0,0,0,0.1)] rounded-full flex items-center justify-center text-gray-500 hover:text-black transition-all md:opacity-0 group-hover:opacity-100 hidden md:flex"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Unified Border Container */}
          <div className="w-full border border-gray-200 rounded-2xl overflow-hidden bg-white">
            <div 
              ref={scrollRef}
              className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {brands.map((brand, idx) => (
                <Link 
                  key={brand.id || idx}
                  href={`/brands?brand=${encodeURIComponent(brand.name)}`}
                  className={`snap-start shrink-0 w-[180px] md:w-[220px] h-[120px] bg-white p-6 flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer relative ${idx !== brands.length - 1 ? 'border-r border-gray-200' : ''}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {brand.logo_url ? (
                    <img 
                      src={brand.logo_url} 
                      alt={brand.name}
                      className="max-w-full max-h-full object-contain mix-blend-multiply"
                    />
                  ) : (
                    <span className="text-xl font-bold text-gray-400">{brand.name}</span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
