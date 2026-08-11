"use client";

import { useState } from "react";
import { Pencil, X } from "lucide-react";
import { updateCategory } from "@/app/admin/dashboard/categories/actions";
import { useFormStatus } from "react-dom";

function SubmitEditButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-[#bf5e42] hover:bg-[#a04b32] text-white font-bold py-2.5 px-4 rounded-lg transition-colors disabled:opacity-50"
    >
      {pending ? "Saving..." : "Save Changes"}
    </button>
  );
}

export default function EditCategoryModal({ category }: { category: any }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="p-1.5 text-gray-400 hover:text-[#bf5e42] hover:bg-red-50 rounded transition-colors mr-2 inline-flex"
        title="Edit Category"
      >
        <Pencil className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden text-left relative">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#111]">Edit Category</h2>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form action={async (formData) => {
              await updateCategory(formData);
              setIsOpen(false);
            }} className="p-6 space-y-4">
              
              <input type="hidden" name="id" value={category.id} />
              
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Category Name</label>
                <input required type="text" name="name" defaultValue={category.name} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#bf5e42] focus:border-[#bf5e42] text-sm font-medium" />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Category Image (Optional)</label>
                {category.image_url && (
                  <div className="mb-2 w-12 h-12 rounded bg-gray-50 border border-gray-200 flex items-center justify-center overflow-hidden p-1">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={category.image_url} alt="Current image" className="max-w-full max-h-full object-contain" />
                  </div>
                )}
                <input type="file" accept="image/*" name="image" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#bf5e42] focus:border-[#bf5e42] text-sm font-medium bg-white" />
                <p className="text-[10px] text-gray-400 mt-1">Leave empty to keep the current image. Upload a clear PNG to replace it.</p>
              </div>
              
              <div className="pt-2">
                <SubmitEditButton />
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
