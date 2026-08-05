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
    <div className="w-full relative mt-6">
      {showArrows && (
        <>
          <button 
            onClick={() => scroll("left")}
            className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-[#112133] border border-white/10 shadow-lg hover:shadow-xl rounded-full hidden md:flex items-center justify-center text-gray-300 hover:text-yellow-400 transition-all"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={() => scroll("right")}
            className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-[#112133] border border-white/10 shadow-lg hover:shadow-xl rounded-full hidden md:flex items-center justify-center text-gray-300 hover:text-yellow-400 transition-all"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      <div 
        ref={scrollRef}
        className={`w-full ${showArrows ? 'flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-4' : 'grid grid-cols-1 md:grid-cols-3 gap-6 justify-center'}`}
        style={showArrows ? { scrollbarWidth: 'none', msOverflowStyle: 'none' } : {}}
      >
        {reviews.map((review) => (
          <div 
            key={review.id} 
            className={`${showArrows ? 'snap-start shrink-0 w-[85vw] sm:w-[350px] md:w-[400px]' : ''} bg-[#112133] border border-white/5 rounded-lg p-6 flex flex-col justify-between gap-5 shadow-lg hover:-translate-y-1 transition-transform duration-300`}
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-1">
                {[...Array(review.rating || 5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                "{review.content}"
              </p>
            </div>

            <div className="flex flex-col gap-1 pt-5 border-t border-white/10 mt-auto">
              <span className="text-white font-bold text-[15px]">{review.author_name}</span>
              <span className="text-yellow-400 text-xs">{review.company_name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
