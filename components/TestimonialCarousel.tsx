"use client";

import { useRef } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

type Review = {
  id: number;
  author_name: string;
  company_name: string;
  content: string;
  rating: number;
};

export default function TestimonialCarousel({ reviews }: { reviews: Review[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 400; 
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  const showArrows = reviews.length > 3;

  return (
    <div className="w-full relative mt-2 md:mt-6 px-0 md:px-4">
      {showArrows && (
        <>
          <button 
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white border border-gray-100 shadow-[0_4px_15px_rgba(0,0,0,0.1)] rounded-full flex items-center justify-center text-gray-500 hover:text-black transition-all md:opacity-0 group-hover:opacity-100 hidden md:flex"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white border border-gray-100 shadow-[0_4px_15px_rgba(0,0,0,0.1)] rounded-full flex items-center justify-center text-gray-500 hover:text-black transition-all md:opacity-0 group-hover:opacity-100 hidden md:flex"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      <div 
        ref={scrollRef}
        className={`w-full ${showArrows ? 'flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-6 pt-4' : 'grid grid-cols-1 md:grid-cols-3 gap-6 justify-center pb-6 pt-4'}`}
        style={showArrows ? { scrollbarWidth: 'none', msOverflowStyle: 'none' } : {}}
      >
        {reviews.map((review) => (
          <div 
            key={review.id} 
            className={`${showArrows ? 'snap-start shrink-0 w-[85vw] sm:w-[350px] md:w-[380px]' : ''} bg-[#1b1b1b] border border-white/5 rounded-xl p-8 flex flex-col justify-between gap-6 shadow-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)] hover:border-white/10 transition-all duration-300 relative`}
          >
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-1">
                {[...Array(review.rating || 5)].map((_, i) => (
                  <Star key={i} className="w-[14px] h-[14px] text-[#eeb424] fill-current" />
                ))}
              </div>
              <p className="text-gray-300 text-[14px] leading-relaxed italic">
                "{review.content}"
              </p>
            </div>

            <div className="flex flex-col gap-1.5 pt-6 border-t border-white/10 mt-auto">
              <span className="text-white font-bold text-[14px]">{review.author_name}</span>
              <span className="text-gray-400 font-medium text-[11px] uppercase tracking-wider">{review.company_name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
