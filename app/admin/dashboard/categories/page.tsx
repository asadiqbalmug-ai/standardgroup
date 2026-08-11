import { createClient } from "@/utils/supabase/server";
import { addCategory, deleteCategory, toggleTopCategory } from "./actions";
import { Plus, Image as ImageIcon } from "lucide-react";
import { SubmitCategoryButton, DeleteButton, ToggleTopCategoryButton } from "@/components/AdminSubmitButtons";

export default async function CategoriesManager() {
  const supabase = await createClient();
  
  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("name", { ascending: true });

  return (
    <div className="max-w-6xl">
      <h1 className="text-3xl font-extrabold text-[#111] mb-2">Manage Categories</h1>
      <p className="text-gray-500 mb-8">Upload categories, add their images, and mark them as Top Categories for the homepage.</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Add Form */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] sticky top-24">
            <h2 className="text-lg font-bold text-[#111] mb-4 flex items-center gap-2">
              <Plus className="w-5 h-5 text-[#bf5e42]" />
              Add Category
            </h2>
            <form action={addCategory} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Category Name</label>
                <input required type="text" name="name" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#bf5e42] focus:border-[#bf5e42] text-sm font-medium" placeholder="e.g. Cement" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Category Image (For Homepage)</label>
                <input type="file" accept="image/*" name="image" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#bf5e42] focus:border-[#bf5e42] text-sm font-medium bg-white" />
                <p className="text-[10px] text-gray-400 mt-1">Upload a clear, transparent PNG image if possible.</p>
              </div>
              
              <SubmitCategoryButton />
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
                    <th className="px-6 py-4 text-xs font-extrabold text-gray-500 uppercase tracking-wider">Image</th>
                    <th className="px-6 py-4 text-xs font-extrabold text-gray-500 uppercase tracking-wider">Category Name</th>
                    <th className="px-6 py-4 text-xs font-extrabold text-gray-500 uppercase tracking-wider text-center">Homepage Status</th>
                    <th className="px-6 py-4 text-xs font-extrabold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {(!categories || categories.length === 0) && (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-gray-500 text-sm font-medium">
                        No categories found. Add your first one!
                      </td>
                    </tr>
                  )}
                  {categories?.map((category) => (
                    <tr key={category.id} className="hover:bg-gray-50 transition-colors group">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="w-12 h-12 rounded bg-white border border-gray-200 flex items-center justify-center overflow-hidden p-1 shadow-sm">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          {category.image_url ? (
                            <img src={category.image_url} alt={category.name} className="max-w-full max-h-full object-contain" />
                          ) : (
                            <ImageIcon className="w-5 h-5 text-gray-300" />
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-bold text-[#111]">{category.name}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <form action={async () => {
                          'use server'
                          await toggleTopCategory(category.id, category.is_top_category)
                        }}>
                          <ToggleTopCategoryButton isTopCategory={category.is_top_category} />
                        </form>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <form action={async () => {
                          'use server'
                          await deleteCategory(category.id)
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
