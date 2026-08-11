import { createClient } from "@/utils/supabase/server";
import { addBrand, deleteBrand } from "./actions";
import { Plus, Image as ImageIcon } from "lucide-react";
import { SubmitBrandButton, DeleteButton } from "@/components/AdminSubmitButtons";

export default async function BrandsManager() {
  const supabase = await createClient();
  
  const { data: brands } = await supabase
    .from("brands")
    .select("*")
    .order("name", { ascending: true });

  return (
    <div className="max-w-6xl">
      <h1 className="text-3xl font-extrabold text-[#111] mb-2">Manage Brands</h1>
      <p className="text-gray-500 mb-8">Upload brand logos to display on the homepage and in the product upload dropdown.</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Add Form */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] sticky top-24">
            <h2 className="text-lg font-bold text-[#111] mb-4 flex items-center gap-2">
              <Plus className="w-5 h-5 text-[#bf5e42]" />
              Add Brand
            </h2>
            <form action={addBrand} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Brand Name</label>
                <input required type="text" name="name" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#bf5e42] focus:border-[#bf5e42] text-sm font-medium" placeholder="e.g. Ariston" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Logo Image (Optional)</label>
                <input type="file" accept="image/*" name="logo" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#bf5e42] focus:border-[#bf5e42] text-sm font-medium bg-white" />
                <p className="text-[10px] text-gray-400 mt-1">Upload a clear, transparent PNG logo if possible.</p>
              </div>
              
              <SubmitBrandButton />
            </form>
          </div>
        </div>

        {/* Data Table */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-4 text-xs font-extrabold text-gray-500 uppercase tracking-wider">Logo</th>
                    <th className="px-6 py-4 text-xs font-extrabold text-gray-500 uppercase tracking-wider">Brand Name</th>
                    <th className="px-6 py-4 text-xs font-extrabold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {(!brands || brands.length === 0) && (
                    <tr>
                      <td colSpan={3} className="px-6 py-12 text-center text-gray-500 text-sm font-medium">
                        No brands found. Add your first one!
                      </td>
                    </tr>
                  )}
                  {brands?.map((brand) => (
                    <tr key={brand.id} className="hover:bg-gray-50 transition-colors group">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="w-20 h-10 rounded bg-white border border-gray-200 flex items-center justify-center overflow-hidden p-1 shadow-sm">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          {brand.logo_url ? (
                            <img src={brand.logo_url} alt={brand.name} className="max-w-full max-h-full object-contain" />
                          ) : (
                            <ImageIcon className="w-5 h-5 text-gray-300" />
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-bold text-[#111]">{brand.name}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <form action={async () => {
                          'use server'
                          await deleteBrand(brand.id)
                        }}>
                          <DeleteButton />
                        </form>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
