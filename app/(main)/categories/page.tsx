import { ChevronRight, Filter } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import ProductCard from "@/components/ProductCard";
import { PREDEFINED_BRANDS } from "@/utils/constants";
import CategorySort from "@/components/CategorySort";
import PriceFilter from "@/components/PriceFilter";
import ScrollToGrid from "@/components/ScrollToGrid";
import { Suspense } from "react";

const categories = [
  { name: "Bitumen & Chemicals", count: 35 },
  { name: "Cables & Wires", count: 120 },
  { name: "Cement Board", count: 8 },
  { name: "Fittings", count: 52 },
  { name: "Glues & Adhesives", count: 94 },
  { name: "Gypsum Board", count: 50 },
  { name: "Gypsum Powder", count: 5 },
  { name: "Insulation", count: 1 },
  { 
    name: "Main Building Materials", count: 52, 
    subcategories: [
      { name: "Cement", count: 10 },
      { name: "Concrete Blocks", count: 16 },
      { name: "Reinforcement Steel", count: 26 },
    ]
  },
  { name: "Manhole Covers", count: 14 },
  { name: "Paints", count: 62 },
  { name: "Plastering", count: 8 },
  { name: "Power Tools", count: 32 },
  { name: "Safety", count: 1 },
  { name: "Sand", count: 15 },
  { name: "Sealants", count: 43 },
  { name: "Tools & Hardware", count: 41 },
  { name: "Water Heaters", count: 28 },
  { name: "Water Tanks", count: 24 },
  { name: "Waterproofing", count: 24 },
  { name: "Wooden Products", count: 16 },
];

export const dynamic = 'force-dynamic';

export default async function CategoriesPage({
  searchParams,
}: {
  searchParams?: Promise<{ category?: string; brand?: string; min?: string; max?: string; sort?: string }>;
}) {
  const resolvedParams = await searchParams;
  const supabase = await createClient();
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  const validProducts = products || [];

  const categoryCounts = validProducts.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Compute brand counts
  const brandCounts = validProducts.reduce((acc, product) => {
    if (product.brand && PREDEFINED_BRANDS.includes(product.brand)) {
      acc[product.brand] = (acc[product.brand] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const dynamicBrands = Object.entries(brandCounts)
    .map(([name, count]) => ({ name, count: count as number }))
    .sort((a: { name: string; count: number }, b: { name: string; count: number }) => b.count - a.count);

  const selectedCategory = resolvedParams?.category;
  const selectedBrand = resolvedParams?.brand;
  const sort = resolvedParams?.sort || "featured";
  const minPrice = resolvedParams?.min ? parseFloat(resolvedParams.min) : null;
  const maxPrice = resolvedParams?.max ? parseFloat(resolvedParams.max) : null;
  
  let filteredProducts = validProducts;
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

  // Build categories array for sidebar
  type CategoryDef = {
    name: string;
    subcategories?: { name: string }[];
  };

  const ALL_CATEGORIES: CategoryDef[] = [
    { name: "Bitumen & Chemicals" },
    { name: "Cables & Wires" },
    { name: "Cement Board" },
    { name: "Fittings" },
    { name: "Glues & Adhesives" },
    { name: "Gypsum Board" },
    { name: "Gypsum Powder" },
    { name: "Insulation" },
    { 
      name: "Main Building Materials", 
      subcategories: [
        { name: "Cement" },
        { name: "Concrete Blocks" },
        { name: "Reinforcement Steel" },
      ]
    },
    { name: "Manhole Covers" },
    { name: "Paints" },
    { name: "Plastering" },
    { name: "Power Tools" },
    { name: "Safety" },
    { name: "Sand" },
    { name: "Sealants" },
    { name: "Tools & Hardware" },
    { name: "Water Heaters" },
    { name: "Water Tanks" },
    { name: "Waterproofing" },
    { name: "Wooden Products" },
    { name: "Other" }
  ];

  const dynamicCategories = ALL_CATEGORIES.map(cat => {
    return {
      ...cat,
      count: categoryCounts[cat.name] || 0,
      subcategories: cat.subcategories?.map(sub => ({
        ...sub,
        count: categoryCounts[sub.name] || 0
      }))
    }
  });

  return (
    <main className="w-full min-h-screen bg-white py-12 px-4 md:px-8 lg:px-12">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header */}
        <div className="mb-8 md:mb-12">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-yellow-500 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            {(selectedCategory || selectedBrand) ? (
              <>
                <Link href="/categories" className="hover:text-yellow-500 transition-colors">Categories</Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-[#091522] font-bold">{selectedCategory || selectedBrand}</span>
              </>
            ) : (
              <span className="text-[#091522] font-bold">Categories</span>
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

            {/* Auto-scroll helper for mobile */}
            <Suspense fallback={null}>
              <ScrollToGrid />
            </Suspense>

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

            {/* 2. Product Categories */}
            <div className="bg-white">
              <h2 className="text-2xl font-extrabold text-[#091522] mb-4 pb-4 border-b border-gray-100">Product Categories</h2>
              <ul className="flex flex-col text-[14px]">
                <li className="flex flex-col">
                  <Link href="/categories" className="flex justify-between items-center py-2.5 border-b border-gray-50 group cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className={`w-1.5 h-1.5 rounded-full transition-colors ${!selectedCategory ? 'bg-yellow-500' : 'bg-[#091522] group-hover:bg-yellow-500'}`}></div>
                      <span className={`font-bold transition-colors ${!selectedCategory ? 'text-yellow-500' : 'text-[#091522] group-hover:text-yellow-500'}`}>All Categories</span>
                    </div>
                    <span className="text-gray-400 font-bold">({validProducts.length})</span>
                  </Link>
                </li>
                {dynamicCategories.map((cat, idx) => (
                  <li key={idx} className="flex flex-col">
                    <Link href={`/categories?category=${encodeURIComponent(cat.name)}`} className="flex justify-between items-center py-2.5 border-b border-gray-50 group cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className={`w-1.5 h-1.5 rounded-full transition-colors ${selectedCategory === cat.name ? 'bg-yellow-500' : 'bg-[#091522] group-hover:bg-yellow-500'}`}></div>
                        <span className={`font-bold transition-colors ${selectedCategory === cat.name ? 'text-yellow-500' : 'text-[#091522] group-hover:text-yellow-500'}`}>{cat.name}</span>
                      </div>
                      <span className="text-gray-400 font-bold">({cat.count})</span>
                    </Link>
                    
                    {/* Subcategories (if any) */}
                    {cat.subcategories && (
                      <ul className="flex flex-col ml-6 mt-1 border-l-2 border-gray-100 pl-4">
                        {cat.subcategories.map((sub, subIdx) => (
                          <li key={subIdx} className="flex justify-between items-center py-2 group cursor-pointer">
                            <Link href={`/categories?category=${encodeURIComponent(sub.name)}`} className="flex items-center justify-between w-full">
                              <div className="flex items-center gap-3">
                                <div className={`w-1 h-1 rounded-full transition-colors ${selectedCategory === sub.name ? 'bg-yellow-500' : 'bg-gray-400 group-hover:bg-yellow-500'}`}></div>
                                <span className={`font-bold text-[13px] transition-colors ${selectedCategory === sub.name ? 'text-yellow-500' : 'text-[#091522] group-hover:text-yellow-500'}`}>{sub.name}</span>
                              </div>
                              <span className="text-gray-400 font-bold text-[13px]">({sub.count})</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. Brands Filter */}
            <div className="bg-gray-50 border border-gray-100 p-6 rounded-xl">
              <h2 className="text-2xl font-extrabold text-[#091522] mb-4 pb-4 border-b border-gray-100">Brands</h2>
              <div className="flex flex-col gap-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                {dynamicBrands.map((brand, idx) => {
                  const isSelected = selectedBrand === brand.name;
                  const href = isSelected 
                    ? (selectedCategory ? `/categories?category=${encodeURIComponent(selectedCategory)}` : '/categories')
                    : `/categories?brand=${encodeURIComponent(brand.name)}${selectedCategory ? `&category=${encodeURIComponent(selectedCategory)}` : ''}`;
                    
                  return (
                    <Link key={idx} href={href} className="flex items-center justify-between cursor-pointer group">
                      <div className="flex items-center gap-3">
                        <div className="relative flex items-center justify-center w-5 h-5 rounded border border-gray-300 bg-white group-hover:border-yellow-500 transition-colors">
                          <div className={`w-3 h-3 bg-yellow-400 rounded-sm transition-transform ${isSelected ? 'scale-100' : 'scale-0 group-hover:scale-50'}`}></div>
                        </div>
                        <span className={`text-sm font-bold transition-colors ${isSelected ? 'text-[#091522]' : 'text-gray-700 group-hover:text-[#091522]'}`}>{brand.name}</span>
                      </div>
                      <span className="text-xs font-bold text-gray-400 group-hover:text-yellow-500 transition-colors">{brand.count}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
