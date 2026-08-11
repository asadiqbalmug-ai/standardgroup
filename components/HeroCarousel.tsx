"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, FileText, Truck, ShieldCheck, HeadphonesIcon } from "lucide-react";

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
    <section className="relative w-full bg-[#f5f0e6] flex flex-col justify-center overflow-hidden min-h-[600px] pt-[100px] pb-12">
      {/* Background Images Carousel */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 w-full h-full mix-blend-darken transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <div 
            className="absolute inset-0 w-full h-full bg-[position:right_bottom] bg-[length:auto_75%] md:bg-[length:auto_85%] lg:bg-[length:auto_92%] bg-no-repeat transition-transform duration-[10000ms] ease-linear"
            style={{ 
              backgroundImage: `url('${slide.image_url}')`,
              transform: index === currentSlide ? "scale(1.01)" : "scale(1)"
            }}
          />
        </div>
      ))}

      {/* Main Content */}
      <div className="relative z-30 w-full max-w-[1400px] mx-auto px-4 md:px-12 flex flex-col h-full justify-center">
        <div className="max-w-[650px] flex flex-col items-start gap-5">
          
          {/* Top Tagline */}
          <span className="text-red-600 font-extrabold tracking-widest text-xs uppercase">
            Quality You Can Build On
          </span>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-[68px] font-extrabold text-[#091522] leading-[1.05] tracking-tight">
            Everything Your <br/>Project Needs — <br/>
            <span className="text-red-600">In One Place.</span>
          </h1>

          {/* Description */}
          <p className="text-gray-600 text-[15px] md:text-[17px] font-medium max-w-[500px] leading-relaxed mt-2">
            Cement, Steel, Tiles, Sanitary Ware, Waterproofing, Gypsum, Paints, Plumbing & more. Trusted by contractors and builders across UAE.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full sm:w-auto">
            <Link 
              href="/categories" 
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 px-8 flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-[0_8px_20px_rgba(220,38,38,0.25)] hover:-translate-y-0.5 w-full sm:w-auto rounded-sm text-sm tracking-wide shadow-md group"
            >
              BROWSE ALL PRODUCTS
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/contact" 
              className="bg-white hover:bg-gray-50 border border-gray-200 text-[#091522] hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 font-bold py-3.5 px-8 flex items-center justify-center gap-2 transition-all duration-300 w-full sm:w-auto uppercase tracking-wide text-sm rounded-sm shadow-sm group"
            >
              <FileText className="w-4 h-4 text-gray-500 group-hover:text-gray-700 transition-colors" />
              Request Price List
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="mt-10 flex flex-col sm:flex-row flex-wrap gap-8">
            <div className="flex items-center gap-3">
              <Truck className="w-6 h-6 text-red-600 stroke-[1.5]" />
              <div className="flex flex-col">
                <span className="text-[#091522] font-extrabold text-[13px]">Fast Delivery</span>
                <span className="text-gray-500 font-medium text-[11px]">Across UAE</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-red-600 stroke-[1.5]" />
              <div className="flex flex-col">
                <span className="text-[#091522] font-extrabold text-[13px]">Trusted Quality</span>
                <span className="text-gray-500 font-medium text-[11px]">100% Genuine Products</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <HeadphonesIcon className="w-6 h-6 text-red-600 stroke-[1.5]" />
              <div className="flex flex-col">
                <span className="text-[#091522] font-extrabold text-[13px]">Expert Support</span>
                <span className="text-gray-500 font-medium text-[11px]">We're Here to Help</span>
              </div>
            </div>
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
                  ? "w-8 h-2 bg-red-600" 
                  : "w-2 h-2 bg-[#091522]/20 hover:bg-[#091522]/40"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
