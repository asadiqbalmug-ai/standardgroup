"use client";

import Link from "next/link";
import ProductCard from "./ProductCard";
import { ChevronRight } from "lucide-react";
import { useRef } from "react";

export default function ProductSection({ sectionTag, title, showViewAll = false, id, products = [] }: { sectionTag?: string, title: string, showViewAll?: boolean, id?: string, products?: any[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <section id={id} className="w-full bg-white py-12 md:py-16">
      <div className="max-w-[1400px] mx-auto px-4 md:px-12">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div className="flex flex-col gap-1">
            {sectionTag && (
              <span className="text-[#bf846b] font-extrabold tracking-widest text-[11px] uppercase">
                {sectionTag}
              </span>
            )}
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#091522] tracking-tight">
              {title}
            </h2>
          </div>
          
          {showViewAll && (
            <Link href="/categories" className="flex items-center text-[#c25141] hover:text-red-700 font-bold text-[13px] uppercase tracking-widest transition-colors group">
              View All Products
              <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
            </Link>
          )}
        </div>

        {/* Carousel Container */}
        <div className="relative group">
          {/* Right Scroll Arrow */}
          <button 
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 w-12 h-12 bg-white border border-gray-100 shadow-[0_4px_15px_rgba(0,0,0,0.1)] rounded-full flex items-center justify-center text-gray-500 hover:text-black transition-all md:opacity-0 group-hover:opacity-100 hidden md:flex"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div 
            ref={scrollRef}
            className="flex gap-4 md:gap-5 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-6"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {products.map((product) => (
              <div key={product.id} className="snap-start shrink-0 w-[180px] sm:w-[220px] md:w-[240px]">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
