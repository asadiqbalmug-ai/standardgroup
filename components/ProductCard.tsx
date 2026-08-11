"use client";

import { ShoppingCart, Search } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product, className = "" }: { product: any, className?: string }) {
  const { addToCart } = useCart();

  return (
    <div className={`bg-white border border-gray-100 p-4 flex flex-col group hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-gray-200 transition-all duration-300 relative rounded-md ${className}`}>
      {/* Image Area */}
      <div className="relative w-full h-[150px] md:h-[170px] bg-[#fafafa] mb-4 flex items-center justify-center overflow-hidden rounded-sm">
        <Link href={`/product/${product.id}`} className="w-full h-full flex items-center justify-center cursor-pointer p-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={product.image_url} 
            alt={product.name}
            className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
          />
        </Link>
        
        {/* Hover Search Icon */}
        <Link href={`/product/${product.id}`}>
          <div className="absolute right-2 bottom-2 w-8 h-8 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer hover:bg-black/50 rounded-sm">
            <Search className="w-4 h-4 text-white" />
          </div>
        </Link>
      </div>

      {/* Product Info */}
      <div className="flex flex-col flex-1">
        {/* Brand / Category */}
        <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider mb-1 line-clamp-1">
          {product.brand || product.category || "Standard Group"}
        </span>

        {/* Title */}
        <Link href={`/product/${product.id}`} className="hover:text-[#c25141] transition-colors mb-4">
          <h3 className="text-[#091522] text-[13px] font-bold leading-snug line-clamp-2 min-h-[38px]">
            {product.name}
          </h3>
        </Link>
        
        {/* Bottom Row: Price & Cart Button */}
        <div className="flex items-end justify-between mt-auto">
          <div className="flex items-baseline gap-1">
            <span className="text-[#091522] font-extrabold text-[15px]">
              {(() => {
                if (!product.price) return "AED 0.00";
                const num = parseFloat(product.price.toString().replace(/[^0-9.]/g, ''));
                if (isNaN(num)) return `AED ${product.price.toString()}`;
                return `AED ${num.toFixed(2)}`;
              })()}
            </span>
            <span className="text-gray-400 text-[10px] font-bold">
              / Unit
            </span>
          </div>
          
          <button 
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
            className="w-8 h-8 bg-[#b5322b] hover:bg-red-800 text-white rounded-sm flex items-center justify-center transition-colors shrink-0 shadow-sm"
            aria-label="Add to cart"
          >
            <ShoppingCart className="w-[14px] h-[14px] stroke-[2.5]" />
          </button>
        </div>
      </div>
    </div>
  );
}
