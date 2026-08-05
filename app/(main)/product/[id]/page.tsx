import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import ProductActionBox from "./ProductActionBox";
import ProductGallery from "@/components/ProductGallery";
import Link from "next/link";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const supabase = await createClient();

  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("id", resolvedParams.id)
    .single();

  if (!product) {
    notFound();
  }

  const formatPrice = (price: string | number) => {
    if (!price) return "0.00 AED";
    const num = parseFloat(price.toString().replace(/[^0-9.]/g, ''));
    if (isNaN(num)) return price.toString();
    return num.toFixed(2) + " AED";
  };

  return (
    <main className="w-full bg-white min-h-screen pt-4 pb-12 md:pb-20">
      <div className="max-w-[1300px] mx-auto px-4 md:px-8">
        
        {/* Breadcrumb */}
        <div className="flex flex-wrap items-center gap-1 text-[11px] font-extrabold text-[#091522] mb-8 uppercase tracking-tight">
          <Link href="/" className="hover:text-yellow-500 flex items-center"><Home className="w-3.5 h-3.5 mr-1" /> Products</Link>
          <ChevronRight className="w-3.5 h-3.5 mx-0.5" />
          <Link href={`/categories?category=${encodeURIComponent(product.category)}`} className="hover:text-yellow-500">{product.category}</Link>
          <ChevronRight className="w-3.5 h-3.5 mx-0.5" />
          <span className="text-gray-500">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          
          {/* Image Gallery (Left Side) */}
          <div className="lg:col-span-5">
            <ProductGallery 
              primaryImage={product.image_url} 
              additionalImages={product.additional_images} 
              productName={product.name} 
            />
          </div>

          {/* Product Details (Right Side) */}
          <div className="lg:col-span-7 flex flex-col pt-2">
            <h1 className="text-[17px] font-extrabold text-[#091522] mb-4">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-[26px] font-extrabold text-[#091522] tracking-tight">
                {formatPrice(product.price)}
              </span>
              <span className="bg-[#091522] text-[#f6c000] text-[9px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                ( VAT EXL. )
              </span>
            </div>

            <ProductActionBox product={product} />

          </div>
        </div>

        {/* Description Section */}
        {product.description && (
          <div className="mt-16 pt-10">
            <div className="prose max-w-none text-[#091522]">
              <div className="whitespace-pre-wrap text-sm leading-loose font-bold">
                {product.description}
              </div>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
