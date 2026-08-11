import { ChevronRight, Filter } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import ProductCard from "@/components/ProductCard";
import { PREDEFINED_BRANDS } from "@/utils/constants";
import CategorySort from "@/components/CategorySort";
import PriceFilter from "@/components/PriceFilter";
import { Suspense } from "react";

export const dynamic = 'force-dynamic';

export default async function BrandsPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string; category?: string; brand?: string; min?: string; max?: string; sort?: string }>;
}) {
  const resolvedParams = await searchParams;
  const supabase = await createClient();
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  const { data: dbCategories } = await supabase
    .from("categories")
    .select("*")
    .order("name", { ascending: true });

  const { data: dbBrands } = await supabase
    .from("brands")
    .select("*")
    .order("name", { ascending: true });

  const validProducts = products || [];
  const validDbBrands = dbBrands || [];

  const categoryCounts = validProducts.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Compute brand counts from DB brands
  const brandCounts = validProducts.reduce((acc, product) => {
    if (product.brand && validDbBrands.some(b => b.name === product.brand)) {
      acc[product.brand] = (acc[product.brand] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  // Add all DB brands even if count is 0
  const dynamicBrands = validDbBrands.map(brand => ({
    name: brand.name,
    count: brandCounts[brand.name] || 0
  })).sort((a, b) => b.count - a.count);

  const query = resolvedParams?.q?.toLowerCase();
  const selectedCategory = resolvedParams?.category;
  const selectedBrand = resolvedParams?.brand;
  const sort = resolvedParams?.sort || "featured";
  const minPrice = resolvedParams?.min ? parseFloat(resolvedParams.min) : null;
  const maxPrice = resolvedParams?.max ? parseFloat(resolvedParams.max) : null;
  
  let filteredProducts = validProducts;

  if (query) {
    filteredProducts = filteredProducts.filter(p => 
      p.name?.toLowerCase().includes(query) || 
      p.sku?.toLowerCase().includes(query)
    );
  }
  
  if (selectedCategory) {
    filteredProducts = filteredProducts.filter(p => p.category === selectedCategory);
  }
  if (selectedBrand) {
    filteredProducts = filteredProducts.filter(p => p.brand === selectedBrand);
  }

  if (minPrice !== null || maxPrice !== null) {
    filteredProducts = filteredProducts.filter(p => {
      if (!p.price) return false;
      const priceNum = parseFloat(p.price.toString().replace(/[^0-9.]/g, ''));
      if (isNaN(priceNum)) return false;
      
      if (minPrice !== null && priceNum < minPrice) return false;
      if (maxPrice !== null && priceNum > maxPrice) return false;
      return true;
    });
  }

  filteredProducts = [...filteredProducts];
  if (sort === "price_asc") {
    filteredProducts.sort((a, b) => {
      const pA = parseFloat((a.price || "").toString().replace(/[^0-9.]/g, '')) || 0;
      const pB = parseFloat((b.price || "").toString().replace(/[^0-9.]/g, '')) || 0;
      return pA - pB;
    });
  } else if (sort === "price_desc") {
    filteredProducts.sort((a, b) => {
      const pA = parseFloat((a.price || "").toString().replace(/[^0-9.]/g, '')) || 0;
      const pB = parseFloat((b.price || "").toString().replace(/[^0-9.]/g, '')) || 0;
      return pB - pA;
    });
  } else if (sort === "newest") {
    filteredProducts.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  // Build categories array for sidebar from DB
  const validDbCategories = dbCategories || [];

  const dynamicCategories = validDbCategories.map(cat => {
    return {
      name: cat.name,
      count: categoryCounts[cat.name] || 0
    }
  });

  return (
    <main className="w-full min-h-screen bg-white py-12 px-4 md:px-8 lg:px-12">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header */}
        <div className="mb-8 md:mb-12">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-red-700 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            {(selectedCategory || selectedBrand) ? (
              <>
                <Link href="/brands" className="hover:text-red-700 transition-colors">Brands</Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-[#091522] font-bold">{selectedCategory || selectedBrand}</span>
              </>
            ) : (
              <span className="text-[#091522] font-bold">Brands</span>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#091522]">
            {selectedCategory || selectedBrand || "All Products"}
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative">
          
          {/* LEFT SIDE: Product Grid */}
          <div className="w-full lg:w-3/4 order-2 lg:order-1">
            
            {/* Top Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-center bg-gray-50 p-4 rounded-lg border border-gray-100 mb-6 gap-4">
              <span className="text-sm font-bold text-gray-600">Showing {filteredProducts.length} products</span>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <span className="text-sm text-gray-500 shrink-0">Sort by:</span>
                <CategorySort />
              </div>
            </div>

            {/* Grid Container */}
            <div id="product-grid" className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-5">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            

          </div>

          {/* RIGHT SIDE: Sidebar */}
          <div className="w-full lg:w-1/4 order-1 lg:order-2 space-y-8">
            
            {/* 1. Filter Options (Price) */}
            <div className="bg-gray-50 border border-gray-100 p-6 rounded-xl">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-200">
                <Filter className="w-5 h-5 text-[#091522]" />
                <h3 className="text-lg font-extrabold text-[#091522]">Filter Options</h3>
              </div>

              {/* Price Filter */}
              <PriceFilter />
            </div>

            {/* 2. Brands Filter (Moved to Top) */}
            <div className="bg-gray-50 border border-gray-100 p-6 rounded-xl">
              <h2 className="text-2xl font-extrabold text-[#091522] mb-4 pb-4 border-b border-gray-100">Brands</h2>
              <div className="flex flex-col gap-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                
                {/* All Brands Option */}
                <Link href={selectedCategory ? `/brands?category=${encodeURIComponent(selectedCategory)}` : '/brands'} className="flex items-center justify-between cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="relative flex items-center justify-center w-5 h-5 rounded border border-gray-300 bg-white group-hover:border-red-700 transition-colors">
                      <div className={`w-3 h-3 bg-red-600 rounded-sm transition-transform ${!selectedBrand ? 'scale-100' : 'scale-0 group-hover:scale-50'}`}></div>
                    </div>
                    <span className={`text-sm font-bold transition-colors ${!selectedBrand ? 'text-[#091522]' : 'text-gray-700 group-hover:text-[#091522]'}`}>All Brands</span>
                  </div>
                  <span className="text-xs font-bold text-gray-400 group-hover:text-red-700 transition-colors">{validProducts.length}</span>
                </Link>

                {dynamicBrands.map((brand, idx) => {
                  const isSelected = selectedBrand === brand.name;
                  const href = isSelected 
                    ? (selectedCategory ? `/brands?category=${encodeURIComponent(selectedCategory)}` : '/brands')
                    : `/brands?brand=${encodeURIComponent(brand.name)}${selectedCategory ? `&category=${encodeURIComponent(selectedCategory)}` : ''}`;
                    
                  return (
                    <Link key={idx} href={href} className="flex items-center justify-between cursor-pointer group">
                      <div className="flex items-center gap-3">
                        <div className="relative flex items-center justify-center w-5 h-5 rounded border border-gray-300 bg-white group-hover:border-red-700 transition-colors">
                          <div className={`w-3 h-3 bg-red-600 rounded-sm transition-transform ${isSelected ? 'scale-100' : 'scale-0 group-hover:scale-50'}`}></div>
                        </div>
                        <span className={`text-sm font-bold transition-colors ${isSelected ? 'text-[#091522]' : 'text-gray-700 group-hover:text-[#091522]'}`}>{brand.name}</span>
                      </div>
                      <span className="text-xs font-bold text-gray-400 group-hover:text-red-700 transition-colors">{brand.count}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* 3. Product Categories (Moved to Bottom) */}
            <div className="bg-white">
              <h2 className="text-2xl font-extrabold text-[#091522] mb-4 pb-4 border-b border-gray-100">Product Categories</h2>
              <ul className="flex flex-col text-[14px]">
                <li className="flex flex-col">
                  <Link href="/brands" className="flex justify-between items-center py-2.5 border-b border-gray-50 group cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className={`w-1.5 h-1.5 rounded-full transition-colors ${!selectedCategory ? 'bg-red-700' : 'bg-[#091522] group-hover:bg-red-700'}`}></div>
                      <span className={`font-bold transition-colors ${!selectedCategory ? 'text-red-700' : 'text-[#091522] group-hover:text-red-700'}`}>All Categories</span>
                    </div>
                    <span className="text-gray-400 font-bold">({validProducts.length})</span>
                  </Link>
                </li>
                {dynamicCategories.map((cat, idx) => (
                  <li key={idx} className="flex flex-col">
                    <Link href={`/brands?category=${encodeURIComponent(cat.name)}${selectedBrand ? `&brand=${encodeURIComponent(selectedBrand)}` : ''}`} className="flex justify-between items-center py-2.5 border-b border-gray-50 group cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className={`w-1.5 h-1.5 rounded-full transition-colors ${selectedCategory === cat.name ? 'bg-red-700' : 'bg-[#091522] group-hover:bg-red-700'}`}></div>
                        <span className={`font-bold transition-colors ${selectedCategory === cat.name ? 'text-red-700' : 'text-[#091522] group-hover:text-red-700'}`}>{cat.name}</span>
                      </div>
                      <span className="text-gray-400 font-bold">({cat.count})</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
