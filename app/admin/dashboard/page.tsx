import { createClient } from "@/utils/supabase/server";
import { Package, Tags, Star, AlertTriangle, ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";

export default async function DashboardOverview() {
  const supabase = await createClient();
  
  // Fetch all products for metrics
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  const allProducts = products || [];
  
  const totalProducts = allProducts.length;
  const uniqueCategories = new Set(allProducts.map(p => p.category)).size;
  const featuredCount = allProducts.filter(p => p.is_featured).length;

  return (
    <div className="max-w-6xl">
      <h1 className="text-3xl font-extrabold text-[#091522] mb-2">Dashboard Overview</h1>
      <p className="text-gray-500 mb-8">Welcome to the Standard Group Admin Control Panel.</p>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        
        {/* Total Products */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col group hover:border-[#091522] transition-colors">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-500 font-bold text-xs uppercase tracking-wider">Total Products</span>
            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center">
              <Package className="w-4 h-4 text-[#091522]" />
            </div>
          </div>
          <span className="text-4xl font-extrabold text-[#091522]">{totalProducts}</span>
        </div>

        {/* Total Categories */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col group hover:border-[#091522] transition-colors">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-500 font-bold text-xs uppercase tracking-wider">Categories</span>
            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center">
              <Tags className="w-4 h-4 text-[#091522]" />
            </div>
          </div>
          <span className="text-4xl font-extrabold text-[#091522]">{uniqueCategories}</span>
        </div>

        {/* Featured Products */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col group hover:border-yellow-500 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-500 font-bold text-xs uppercase tracking-wider">Featured Items</span>
            <div className="w-8 h-8 rounded-full bg-yellow-50 flex items-center justify-center">
              <Star className="w-4 h-4 text-yellow-500" />
            </div>
          </div>
          <span className="text-4xl font-extrabold text-[#091522]">{featuredCount}</span>
        </div>

      </div>
    </div>
  );
}
