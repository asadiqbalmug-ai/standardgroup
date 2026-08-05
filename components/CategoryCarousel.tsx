"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";

const categories = [
  {
    name: "Main Building Materials",
    image: "/categories/MainBuildingMaterials.png",
    link: `/categories?category=${encodeURIComponent("Main Building Materials")}`
  },
  {
    name: "Wooden Products",
    image: "/categories/WoodenProducts.png",
    link: `/categories?category=${encodeURIComponent("Wooden Products")}`
  },
  {
    name: "Bitumen & Chemicals",
    image: "/categories/Bitumen.png",
    link: `/categories?category=${encodeURIComponent("Bitumen & Chemicals")}`
  },
  {
    name: "Cement Board",
    image: "/categories/CementBoards.png",
    link: `/categories?category=${encodeURIComponent("Cement Board")}`
  },
  {
    name: "Gypsum Board",
    image: "/categories/GypsumBoards.png",
    link: `/categories?category=${encodeURIComponent("Gypsum Board")}`
  },
  {
    name: "Glues & Adhesives",
    image: "/categories/GlueandAdhesive.png",
    link: `/categories?category=${encodeURIComponent("Glues & Adhesives")}`
  },
  {
    name: "Water Tanks",
    image: "/categories/WaterTanks.jpg",
    link: `/categories?category=${encodeURIComponent("Water Tanks")}`
  },
  {
    name: "All Categories",
    link: "/categories"
  }
];

export default function CategoryCarousel({ categoryCounts = {} }: { categoryCounts?: Record<string, number> }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300; // approx width of one card + gap
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="w-full bg-white pt-2 pb-12 md:pt-4 md:pb-16">
      <div className="max-w-[1400px] mx-auto px-4 md:px-12">
        
        {/* Heading */}
        <div className="mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#091522] uppercase tracking-tight">Products</h2>
          <div className="w-12 h-1 bg-yellow-400 mt-3 rounded-full"></div>
        </div>

        <div className="relative">
        
        {/* Navigation Arrows */}
        <button 
          onClick={() => scroll("left")}
          className="absolute left-0 md:left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white border border-gray-200 shadow-md hover:shadow-lg rounded-full flex items-center justify-center text-gray-700 hover:text-black transition-all -ml-2 md:ml-0 hidden md:flex"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button 
          onClick={() => scroll("right")}
          className="absolute right-0 md:right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white border border-gray-200 shadow-md hover:shadow-lg rounded-full flex items-center justify-center text-gray-700 hover:text-black transition-all -mr-2 md:mr-0 hidden md:flex"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Scrollable Container */}
        <div 
          ref={scrollRef}
          className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {categories.map((category, idx) => (
            <Link 
              key={idx}
              href={category.link}
              className={`snap-start shrink-0 w-[180px] md:w-[200px] h-[220px] bg-white border border-gray-200 rounded-lg p-4 md:p-5 flex flex-col group hover:border-[#091522] hover:shadow-lg transition-all cursor-pointer ${category.image ? 'justify-between' : 'justify-center items-center'}`}
            >
              {category.image ? (
                <>
                  {/* Image Circle Area */}
                  <div className="w-[100px] h-[100px] md:w-[110px] md:h-[110px] mx-auto rounded-full overflow-hidden mb-4 flex items-center justify-center border-2 border-gray-50 group-hover:scale-105 transition-transform duration-300">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Text & Arrow */}
                  <div className="flex items-end justify-between w-full mt-auto">
                    <div className="flex flex-col">
                      <span className="font-bold text-[#091522] text-xs md:text-sm leading-tight max-w-[90%] group-hover:text-yellow-500 transition-colors">
                        {category.name}
                      </span>
                      {categoryCounts[category.name] !== undefined && (
                        <span className="text-gray-400 text-[10px] font-bold mt-1">
                          {categoryCounts[category.name]} products
                        </span>
                      )}
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-300 transform group-hover:translate-x-1 group-hover:text-[#091522] transition-all shrink-0" />
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center gap-3 mt-4 text-center">
                  <span className="font-bold text-[#091522] text-sm md:text-base group-hover:text-yellow-500 transition-colors">
                    View All Categories
                  </span>
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-[#091522] transition-colors mt-2">
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-yellow-500 transition-colors" />
                  </div>
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}
