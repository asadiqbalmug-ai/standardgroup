import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import { CheckCircle, Package, XCircle } from "lucide-react";
import AddToCartButton from "./AddToCartButton";
import ProductGallery from "@/components/ProductGallery";

export default async function ProductPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();

  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!product) {
    notFound();
  }

  return (
    <main className="w-full bg-[#f8f9fa] min-h-screen py-12 md:py-20">
      <div className="max-w-[1200px] mx-auto px-4 md:px-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* Image Gallery */}
            <div className="p-4 md:p-8 md:border-r border-gray-100">
              <ProductGallery 
                primaryImage={product.image_url} 
                additionalImages={product.additional_images} 
                productName={product.name} 
              />
            </div>

            {/* Product Details */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">
                <span>{product.category}</span>
                <span>•</span>
                <span>SKU: {product.sku}</span>
                {product.brand && (
                  <>
                    <span>•</span>
                    <span className="text-[#091522]">{product.brand}</span>
                  </>
                )}
              </div>
              
              <h1 className="text-3xl md:text-4xl font-extrabold text-[#091522] mb-6 leading-tight">
                {product.name}
              </h1>

              <div className="text-4xl font-extrabold text-[#f6c000] mb-6">
                {product.price}
                <span className="text-sm font-bold text-gray-400 ml-2">(EXCL. VAT)</span>
              </div>

              {product.description && (
                <div className="text-gray-600 mb-8 whitespace-pre-wrap text-sm leading-relaxed border-t border-gray-100 pt-6">
                  {product.description}
                </div>
              )}

              <div className="space-y-4 mb-10 border-t border-gray-100 pt-6">
                <div className="flex items-center gap-3 text-sm font-bold text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  Available for Inquiry
                </div>
                
                <div className="flex items-center gap-3 text-sm font-bold text-gray-700">
                  <Package className="w-5 h-5 text-blue-500" />
                  Bulk Quantities Available
                </div>
              </div>

              <div className="pt-8 border-t border-gray-100">
                <AddToCartButton product={product} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
