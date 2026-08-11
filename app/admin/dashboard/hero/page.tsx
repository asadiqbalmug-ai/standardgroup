import { createClient } from "@/utils/supabase/server";
import { addHeroImage, deleteHeroImage, toggleHeroImage, reorderHeroImage } from "./actions";
import { Plus, Image as ImageIcon } from "lucide-react";
import { SubmitBannerButton, ReorderButton, DeleteButton, ToggleActiveButton } from "@/components/AdminSubmitButtons";

export default async function HeroManager() {
  const supabase = await createClient();
  
  const { data: images } = await supabase
    .from("hero_images")
    .select("*")
    .order("display_order", { ascending: true })
    .order("id", { ascending: true });

  return (
    <div className="max-w-6xl">
      <h1 className="text-3xl font-extrabold text-[#111] mb-2">Manage Hero Images</h1>
      <p className="text-gray-500 mb-8">Control the large banner images that slide at the top of your homepage.</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Add Form */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] sticky top-24">
            <h2 className="text-lg font-bold text-[#111] mb-4 flex items-center gap-2">
              <Plus className="w-5 h-5 text-[#bf5e42]" />
              Add Banner Image
            </h2>
            <form action={addHeroImage} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Internal Title (Optional)</label>
                <input type="text" name="title" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#bf5e42] focus:border-[#bf5e42] text-sm font-medium" placeholder="e.g. Summer Sale Banner" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Image File</label>
                <input required type="file" accept="image/*" name="image" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#bf5e42] focus:border-[#bf5e42] text-sm font-medium bg-white" />
                <p className="text-[10px] text-gray-400 mt-1">Select a wide, high-resolution image from your computer.</p>
              </div>
              <div className="flex items-center gap-2 pt-2">
                <input type="checkbox" id="is_active" name="is_active" value="true" defaultChecked className="w-4 h-4 text-[#bf5e42] focus:ring-[#bf5e42] border-gray-300 rounded" />
                <label htmlFor="is_active" className="text-sm font-bold text-[#111]">Set Active Immediately</label>
              </div>
              
              <SubmitBannerButton />
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
                    <th className="px-6 py-4 text-xs font-extrabold text-gray-500 uppercase tracking-wider">Preview</th>
                    <th className="px-6 py-4 text-xs font-extrabold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-xs font-extrabold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {(!images || images.length === 0) && (
                    <tr>
                      <td colSpan={3} className="px-6 py-12 text-center text-gray-500 text-sm font-medium">
                        No hero images found. Add your first banner!
                      </td>
                    </tr>
                  )}
                  {images?.map((img) => (
                    <tr key={img.id} className="hover:bg-gray-50 transition-colors group">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-4">
                          <div className="w-32 h-16 rounded bg-gray-100 border border-gray-200 flex items-center justify-center overflow-hidden">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            {img.image_url ? (
                              <img src={img.image_url} alt={img.title || "Hero Image"} className="w-full h-full object-cover" />
                            ) : (
                              <ImageIcon className="w-5 h-5 text-gray-400" />
                            )}
                          </div>
                          <span className="text-sm font-bold text-[#111]">{img.title || "Untitled Banner"}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <form action={async () => {
                          'use server'
                          await toggleHeroImage(img.id, img.is_active)
                        }}>
                          <ToggleActiveButton isActive={img.is_active} />
                        </form>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right flex items-center justify-end gap-2">
                        <div className="flex flex-col gap-0.5 mr-2 border-r border-gray-100 pr-4">
                          <form action={async () => {
                            'use server'
                            await reorderHeroImage(img.id, 'up')
                          }}>
                            <ReorderButton direction="up" />
                          </form>
                          <form action={async () => {
                            'use server'
                            await reorderHeroImage(img.id, 'down')
                          }}>
                            <ReorderButton direction="down" />
                          </form>
                        </div>
                        <form action={async () => {
                          'use server'
                          await deleteHeroImage(img.id)
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
