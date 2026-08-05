"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Slide = {
  id: number;
  image_url: string;
};

export default function HeroCarousel({ slides }: { slides: Slide[] }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative w-full bg-[#091522] flex flex-col justify-center overflow-hidden pt-10 pb-20 md:pt-14 md:pb-28">
      {/* Background Images Carousel */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-[10000ms] ease-linear bg-gray-900"
            style={{ 
              backgroundImage: `url('${slide.image_url}')`,
              transform: index === currentSlide ? "scale(1.05)" : "scale(1)"
            }}
          />
        </div>
      ))}
      
      {/* A dark gradient overlay to make text pop over the images */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#091522] via-[#091522]/80 to-transparent z-20 pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-30 w-full max-w-[1400px] mx-auto px-4 md:px-12 flex flex-col h-full">
        <div className="max-w-4xl flex flex-col items-start gap-4 md:gap-5">
          
          {/* Headline */}
          <h1 className="text-3xl md:text-5xl lg:text-[56px] font-extrabold text-white leading-[1.1] tracking-tight">
            Everything Your Project Needs — <span className="text-yellow-400">In One Place.</span>
          </h1>

          {/* Description */}
          <p className="text-gray-300 text-sm md:text-base max-w-2xl leading-relaxed mt-1">
            Cement, Steel, Tiles, Sanitary Ware, Waterproofing, Gypsum, Paints, Plumbing & more. Serving contractors and distributors across UAE since 2003. National & international delivery available.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full sm:w-auto">
            <Link 
              href="/#products" 
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3.5 px-8 flex items-center justify-center gap-2 transition-colors w-full sm:w-auto rounded-sm"
            >
              BROWSE ALL PRODUCTS
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              href="/contact" 
              className="bg-transparent border border-gray-400 hover:border-white hover:bg-white/5 text-white font-bold py-3.5 px-8 transition-colors w-full sm:w-auto text-center uppercase tracking-wider text-sm rounded-sm"
            >
              Request Price List
            </Link>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="mt-8 md:mt-12 pt-6 border-t border-white/10 flex flex-wrap gap-8 md:gap-16">
          <div className="flex flex-col gap-0.5">
            <span className="text-3xl md:text-4xl font-extrabold text-yellow-400">20+</span>
            <span className="text-[11px] md:text-xs text-gray-400 uppercase tracking-wider">Years in UAE</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-3xl md:text-4xl font-extrabold text-yellow-400">31+</span>
            <span className="text-[11px] md:text-xs text-gray-400 uppercase tracking-wider">Global Brands</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-3xl md:text-4xl font-extrabold text-yellow-400">500+</span>
            <span className="text-[11px] md:text-xs text-gray-400 uppercase tracking-wider">Products</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-3xl md:text-4xl font-extrabold text-yellow-400">2</span>
            <span className="text-[11px] md:text-xs text-gray-400 uppercase tracking-wider">Locations</span>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-6 right-6 md:bottom-12 md:right-12 z-40 flex items-center gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentSlide 
                  ? "w-8 h-2 bg-yellow-400" 
                  : "w-2 h-2 bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
