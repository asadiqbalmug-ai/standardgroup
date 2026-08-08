"use client";

import Link from "next/link";
import ProductCard from "./ProductCard";

export default function ProductSection({ title, showViewAll = false, id, products = [] }: { title: string, showViewAll?: boolean, id?: string, products?: any[] }) {

  return (
    <section id={id} className="w-full bg-white pb-12 md:pb-20">
      <div className="max-w-[1400px] mx-auto px-4 md:px-12">
        
        {/* Heading */}
        <div className="mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#091522] uppercase tracking-tight">{title}</h2>
          <div className="w-12 h-1 bg-yellow-400 mt-3 rounded-full"></div>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} className={index >= 6 ? "hidden md:flex" : ""} />
          ))}
        </div>

        {/* View All Button */}
        {showViewAll && (
          <div className="mt-10 md:mt-12 flex justify-center">
            <Link 
              href="/categories"
              className="inline-flex items-center justify-center bg-transparent border-2 border-[#091522] text-[#091522] hover:bg-[#091522] hover:text-white font-bold py-3 px-10 rounded-full transition-colors duration-300 gap-2 uppercase tracking-wide text-sm"
            >
              View All Products
            </Link>
          </div>
        )}

      </div>
    </section>
  );
}
