"use client";

import { useState } from "react";
import { Pencil, X } from "lucide-react";
import { updateBrand } from "@/app/admin/dashboard/brands/actions";
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

export default function EditBrandModal({ brand }: { brand: any }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="p-1.5 text-gray-400 hover:text-[#bf5e42] hover:bg-red-50 rounded transition-colors mr-2 inline-flex"
        title="Edit Brand"
      >
        <Pencil className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden text-left relative">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#111]">Edit Brand</h2>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form action={async (formData) => {
              await updateBrand(formData);
              setIsOpen(false);
            }} className="p-6 space-y-4">
              
              <input type="hidden" name="id" value={brand.id} />
              
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Brand Name</label>
                <input required type="text" name="name" defaultValue={brand.name} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#bf5e42] focus:border-[#bf5e42] text-sm font-medium" />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Logo Image (Optional)</label>
                {brand.logo_url && (
                  <div className="mb-2 w-20 h-10 rounded bg-gray-50 border border-gray-200 flex items-center justify-center overflow-hidden p-1">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={brand.logo_url} alt="Current logo" className="max-w-full max-h-full object-contain" />
                  </div>
                )}
                <input type="file" accept="image/*" name="logo" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#bf5e42] focus:border-[#bf5e42] text-sm font-medium bg-white" />
                <p className="text-[10px] text-gray-400 mt-1">Leave empty to keep the current logo. Upload a clear PNG to replace it.</p>
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
