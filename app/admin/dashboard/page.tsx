import { createClient } from "@/utils/supabase/server";
import { Package, Tags, Star, AlertTriangle, ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";

export default async function DashboardOverview() {
  const supabase = await createClient();
  
  const { count: totalProducts } = await supabase
    .from("products")
    .select("*", { count: "exact", head: true });

  const { count: featuredCount } = await supabase
    .from("products")
    .select("*", { count: "exact", head: true })
    .eq("is_featured", true);

  const { count: totalCategories } = await supabase
    .from("categories")
    .select("*", { count: "exact", head: true });

  const { count: totalBrands } = await supabase
    .from("brands")
    .select("*", { count: "exact", head: true });

  return (
    <div className="max-w-6xl">
      <h1 className="text-3xl font-extrabold text-[#111] mb-2">Dashboard Overview</h1>
      <p className="text-gray-500 mb-8">Welcome to the Standard Group Admin Control Panel.</p>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        
        {/* Total Products */}
        <Link href="/admin/dashboard/products" className="bg-white p-5 md:p-6 rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex flex-col group hover:border-[#bf5e42] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all cursor-pointer">
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <span className="text-gray-500 font-bold text-xs uppercase tracking-wider group-hover:text-[#bf5e42] transition-colors">Total Products</span>
            <div className="w-10 h-10 rounded-full bg-[#bf5e42]/10 flex items-center justify-center group-hover:bg-[#bf5e42]/20 transition-colors">
              <Package className="w-5 h-5 text-[#bf5e42]" />
            </div>
          </div>
          <span className="text-3xl md:text-4xl font-extrabold text-[#111]">{totalProducts || 0}</span>
        </Link>

        {/* Featured Products */}
        <Link href="/admin/dashboard/products" className="bg-white p-5 md:p-6 rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex flex-col group hover:border-[#bf5e42] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all cursor-pointer">
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <span className="text-gray-500 font-bold text-xs uppercase tracking-wider group-hover:text-[#bf5e42] transition-colors">Featured Items</span>
            <div className="w-10 h-10 rounded-full bg-[#bf5e42]/10 flex items-center justify-center group-hover:bg-[#bf5e42]/20 transition-colors">
              <Star className="w-5 h-5 text-[#bf5e42]" />
            </div>
          </div>
          <span className="text-3xl md:text-4xl font-extrabold text-[#111]">{featuredCount || 0}</span>
        </Link>

        {/* Total Categories */}
        <Link href="/admin/dashboard/categories" className="bg-white p-5 md:p-6 rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex flex-col group hover:border-[#bf5e42] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all cursor-pointer">
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <span className="text-gray-500 font-bold text-xs uppercase tracking-wider group-hover:text-[#bf5e42] transition-colors">Categories</span>
            <div className="w-10 h-10 rounded-full bg-[#bf5e42]/10 flex items-center justify-center group-hover:bg-[#bf5e42]/20 transition-colors">
              <Tags className="w-5 h-5 text-[#bf5e42]" />
            </div>
          </div>
          <span className="text-3xl md:text-4xl font-extrabold text-[#111]">{totalCategories || 0}</span>
        </Link>

        {/* Total Brands */}
        <Link href="/admin/dashboard/brands" className="bg-white p-5 md:p-6 rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex flex-col group hover:border-[#bf5e42] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all cursor-pointer">
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <span className="text-gray-500 font-bold text-xs uppercase tracking-wider group-hover:text-[#bf5e42] transition-colors">Brands</span>
            <div className="w-10 h-10 rounded-full bg-[#bf5e42]/10 flex items-center justify-center group-hover:bg-[#bf5e42]/20 transition-colors">
              <CheckCircle className="w-5 h-5 text-[#bf5e42]" />
            </div>
          </div>
          <span className="text-3xl md:text-4xl font-extrabold text-[#111]">{totalBrands || 0}</span>
        </Link>

      </div>
    </div>
  );
}
