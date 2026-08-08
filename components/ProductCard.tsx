"use client";

import { ShoppingCart, Search } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product, className = "" }: { product: any, className?: string }) {
  const { addToCart } = useCart();

  return (
    <div className={`bg-white border border-gray-100 p-3 md:p-4 flex flex-col group hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-shadow duration-300 relative ${className}`}>
      {/* Image Area */}
      <div className="relative w-full h-[140px] md:h-[180px] bg-[#f8f9fa] mb-4 flex items-center justify-center overflow-hidden">
        <Link href={`/product/${product.id}`} className="w-full h-full flex items-center justify-center cursor-pointer">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={product.image_url} 
            alt={product.name}
            className="w-full h-full object-contain mix-blend-multiply p-4 group-hover:scale-105 transition-transform duration-500"
          />
        </Link>
        
        {/* Hover Search Icon */}
        <Link href={`/product/${product.id}`}>
          <div className="absolute right-2 bottom-2 w-8 h-8 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer hover:bg-black/50">
            <Search className="w-4 h-4 text-white" />
          </div>
        </Link>
      </div>

      {/* Product Info */}
      <div className="flex flex-col flex-1 text-center">
        <Link href={`/product/${product.id}`} className="hover:text-yellow-500 transition-colors">
          <h3 className="text-[#091522] text-[12px] md:text-[13px] font-bold leading-snug line-clamp-2 min-h-[36px]">
            {product.name}
          </h3>
        </Link>
        
        <div className="mt-3 text-[#1a365d] font-extrabold text-base md:text-lg">
          {(() => {
            if (!product.price) return "0.00 AED";
            const num = parseFloat(product.price.toString().replace(/[^0-9.]/g, ''));
            if (isNaN(num)) return product.price.toString();
            return num.toFixed(2) + " AED";
          })()}
        </div>
        
        <div className="mt-1.5 inline-block">
          <span className="bg-[#4a4a4a] text-white text-[9px] md:text-[10px] font-bold px-3 py-1 rounded-full whitespace-nowrap">
            ( VAT EXL. )
          </span>
        </div>
      </div>

      {/* Add to cart Button */}
      <button 
        onClick={(e) => {
          e.preventDefault();
          addToCart(product);
        }}
        className="w-full bg-[#f6c000] hover:bg-yellow-500 text-[#091522] font-bold py-2.5 mt-4 flex items-center justify-center gap-2 text-[13px] transition-colors rounded-sm"
      >
        <ShoppingCart className="w-4 h-4" />
        Add to cart
      </button>
    </div>
  );
}
