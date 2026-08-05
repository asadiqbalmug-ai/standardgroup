"use client";

import { Search, Filter } from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useTransition, useState } from "react";
import { PREDEFINED_BRANDS, PREDEFINED_CATEGORIES } from "@/utils/constants";

export default function ProductSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [brand, setBrand] = useState(searchParams.get("brand") || "");

  const updateParams = (newQ: string, newCat: string, newBrand: string) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (newQ) params.set("q", newQ);
      else params.delete("q");
      
      if (newCat) params.set("category", newCat);
      else params.delete("category");

      if (newBrand) params.set("brand", newBrand);
      else params.delete("brand");

      router.replace(`${pathname}?${params.toString()}`);
    });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    updateParams(value, category, brand);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setCategory(value);
    updateParams(query, value, brand);
  };

  const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setBrand(value);
    updateParams(query, category, value);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 sm:text-sm font-medium"
          placeholder="Search products by name or sku..."
        />
        {isPending && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <div className="w-4 h-4 border-2 border-gray-300 border-t-yellow-500 rounded-full animate-spin" />
          </div>
        )}
      </div>

      <div className="flex items-center gap-4 flex-1 md:flex-none">
        <div className="relative flex-1 md:w-48">
          <select 
            value={category}
            onChange={handleCategoryChange}
            className="block w-full pl-3 pr-8 py-2.5 border border-gray-300 rounded-md leading-5 bg-white text-gray-900 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 sm:text-sm font-medium"
          >
            <option value="">All Categories</option>
            {PREDEFINED_CATEGORIES.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="relative flex-1 md:w-48">
          <select 
            value={brand}
            onChange={handleBrandChange}
            className="block w-full pl-3 pr-8 py-2.5 border border-gray-300 rounded-md leading-5 bg-white text-gray-900 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 sm:text-sm font-medium"
          >
            <option value="">All Brands</option>
            {PREDEFINED_BRANDS.map(b => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
