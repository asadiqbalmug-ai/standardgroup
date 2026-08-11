import Link from "next/link";
import { ChevronRight, ShieldCheck, PackageSearch, RotateCcw, Truck } from "lucide-react";

export default function CategoryCarousel({ 
  categoryCounts = {}, 
  categories = [] 
}: { 
  categoryCounts?: Record<string, number>, 
  categories?: any[] 
}) {
  return (
    <section className="w-full bg-white pt-20 pb-12">
      <div className="max-w-[1400px] mx-auto px-4 md:px-12">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-red-600 font-extrabold tracking-widest text-[11px] uppercase">
              Shop by Category
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#091522] tracking-tight">
              Top Categories
            </h2>
          </div>
          
          <Link href="/categories" className="flex items-center text-red-600 hover:text-red-700 font-bold text-xs uppercase tracking-widest transition-colors group">
            View All Categories
            <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" strokeWidth={3} />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 md:gap-5">
          {categories.map((category, idx) => (
            <Link 
              key={category.id || idx}
              href={`/categories?category=${encodeURIComponent(category.name)}`}
              className="bg-white border border-gray-100 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_-10px_rgba(0,0,0,0.12)] rounded-2xl p-6 flex flex-col items-center justify-center group hover:border-gray-200 transition-all cursor-pointer aspect-square"
            >
              {/* Image Area */}
              <div className="w-full flex-1 mb-4 flex items-center justify-center relative transition-transform duration-300 group-hover:-translate-y-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {category.image_url ? (
                  <img 
                    src={category.image_url} 
                    alt={category.name}
                    className="max-h-[100px] w-auto object-contain mix-blend-multiply"
                  />
                ) : (
                  <span className="text-gray-400 font-bold text-3xl opacity-20">{category.name.substring(0, 2).toUpperCase()}</span>
                )}
              </div>

              {/* Text */}
              <span className="font-bold text-[#091522] text-[14px] text-center leading-tight group-hover:text-red-600 transition-colors">
                {category.name}
              </span>
            </Link>
          ))}
        </div>

        {/* Dark Stats Banner */}
        <div className="mt-16 w-full bg-[#1b1b1b] rounded-[2rem] py-12 px-8 lg:px-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-0 shadow-2xl">
          
          {/* Stat 1 */}
          <div className="flex items-start gap-4 lg:pr-8">
            <ShieldCheck className="w-8 h-8 text-[#d3aa70] shrink-0 stroke-[1.5]" />
            <div className="flex flex-col">
              <span className="text-white text-2xl font-extrabold leading-none mb-1">20+</span>
              <span className="text-gray-200 font-bold text-[13px] mb-2">Years of Trust</span>
              <span className="text-gray-400 text-[11px] leading-relaxed font-medium pr-4">Serving the UAE since 2003</span>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="flex items-start gap-4 lg:px-8 lg:border-l lg:border-gray-700/60">
            <PackageSearch className="w-8 h-8 text-[#d3aa70] shrink-0 stroke-[1.5]" />
            <div className="flex flex-col">
              <span className="text-white text-2xl font-extrabold leading-none mb-1">500+</span>
              <span className="text-gray-200 font-bold text-[13px] mb-2">Quality Products</span>
              <span className="text-gray-400 text-[11px] leading-relaxed font-medium pr-4">Wide range of building materials</span>
            </div>
          </div>

          {/* Stat 3 */}
          <div className="flex items-start gap-4 lg:px-8 lg:border-l lg:border-gray-700/60">
            <RotateCcw className="w-8 h-8 text-[#d3aa70] shrink-0 stroke-[1.5]" />
            <div className="flex flex-col">
              <span className="text-white text-2xl font-extrabold leading-none mb-1">1000+</span>
              <span className="text-gray-200 font-bold text-[13px] mb-2">Happy Clients</span>
              <span className="text-gray-400 text-[11px] leading-relaxed font-medium pr-4">Builders, contractors & distributors</span>
            </div>
          </div>

          {/* Stat 4 */}
          <div className="flex items-start gap-4 lg:pl-8 lg:border-l lg:border-gray-700/60">
            <Truck className="w-8 h-8 text-[#d3aa70] shrink-0 stroke-[1.5]" />
            <div className="flex flex-col">
              <span className="text-white text-2xl font-extrabold leading-none mb-1">Nationwide<br/>Delivery</span>
              <span className="text-gray-400 text-[11px] leading-relaxed font-medium pr-4 mt-2">Fast & reliable delivery across UAE</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
