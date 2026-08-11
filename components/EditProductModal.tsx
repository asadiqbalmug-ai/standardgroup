"use client";

import { useState } from "react";
import { X, Edit2 } from "lucide-react";
import { updateProduct } from "@/app/admin/dashboard/products/actions";
import { useFormStatus } from "react-dom";
import BrandSelect from "@/components/BrandSelect";
import CategorySelect from "@/components/CategorySelect";

function UpdateButton() {
  const { pending } = useFormStatus();
  return (
    <button 
      type="submit" 
      disabled={pending}
      className="w-full bg-[#091522] hover:bg-gray-800 disabled:bg-gray-400 text-white font-bold py-2.5 rounded-md transition-colors text-sm flex items-center justify-center gap-2"
    >
      {pending ? "Saving..." : "Save Changes"}
    </button>
  );
}

export default function EditProductModal({ product, brands = [], categories = [] }: { product: any, brands?: any[], categories?: any[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 p-2 rounded-md transition-colors mr-2 inline-flex"
        title="Edit"
      >
        <Edit2 className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col text-left">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-[#091522]">Edit Product: {product.name}</h2>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-red-500 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto custom-scrollbar">
              <form action={async (formData) => {
                formData.append("id", product.id.toString());
                await updateProduct(formData);
                setIsOpen(false);
              }} className="space-y-4">
                
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Product Name</label>
                  <input required type="text" name="name" defaultValue={product.name} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-red-700 focus:border-red-700 text-sm font-medium" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Brand</label>
                  <BrandSelect defaultValue={product.brand} brands={brands} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Price</label>
                    <input required type="text" name="price" defaultValue={product.price} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-red-700 focus:border-red-700 text-sm font-medium" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">SKU</label>
                    <input required type="text" name="sku" defaultValue={product.sku} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-red-700 focus:border-red-700 text-sm font-medium" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Category</label>
                  <CategorySelect defaultValue={product.category} categories={categories} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Description</label>
                  <textarea name="description" rows={4} defaultValue={product.description} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-red-700 focus:border-red-700 text-sm font-medium"></textarea>
                </div>
                
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg mt-4">
                  <p className="text-xs font-bold text-gray-700 mb-2">Leave image fields empty to keep existing images.</p>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Replace Primary Image</label>
                      <input type="file" accept="image/*" name="image" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-red-700 text-sm bg-white" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Replace Gallery Images</label>
                      <input type="file" multiple accept="image/*" name="additional_images" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-red-700 text-sm bg-white" />
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 pt-4">
                  <input type="checkbox" id={`is_featured_${product.id}`} name="is_featured" value="true" defaultChecked={product.is_featured} className="w-4 h-4 text-[#091522] border-gray-300 rounded focus:ring-[#091522]" />
                  <label htmlFor={`is_featured_${product.id}`} className="text-sm font-bold text-gray-700">Feature on Homepage</label>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-100 flex gap-4">
                  <button type="button" onClick={() => setIsOpen(false)} className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold py-2.5 rounded-md transition-colors text-sm">Cancel</button>
                  <UpdateButton />
                </div>

              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
