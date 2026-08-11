"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState } from "react";

export default function PriceFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [minPrice, setMinPrice] = useState(searchParams.get("min") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("max") || "");

  const handleApply = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (minPrice) params.set("min", minPrice);
    else params.delete("min");
    
    if (maxPrice) params.set("max", maxPrice);
    else params.delete("max");

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div>
      <h4 className="font-bold text-[#091522] mb-4 text-sm uppercase tracking-wide">Price Range</h4>
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-bold">AED</span>
          <input 
            type="number" 
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="Min" 
            className="w-full bg-white border border-gray-300 text-sm font-bold text-[#091522] rounded-md pl-10 pr-3 py-2 outline-none focus:border-red-700" 
          />
        </div>
        <span className="text-gray-400 font-bold">-</span>
        <div className="flex-1 relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-bold">AED</span>
          <input 
            type="number" 
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Max" 
            className="w-full bg-white border border-gray-300 text-sm font-bold text-[#091522] rounded-md pl-10 pr-3 py-2 outline-none focus:border-red-700" 
          />
        </div>
      </div>
      <button 
        onClick={handleApply}
        className="w-full mt-4 bg-[#091522] hover:bg-red-700 hover:text-white text-white font-bold py-2 rounded-md transition-colors text-xs uppercase tracking-wider"
      >
        Apply Filter
      </button>
    </div>
  );
}
