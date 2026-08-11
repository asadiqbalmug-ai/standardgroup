import { createClient } from "@/utils/supabase/server";
import { addProduct, deleteProduct } from "./actions";
import { Plus, Image as ImageIcon } from "lucide-react";
import { SubmitProductButton, DeleteButton } from "@/components/AdminSubmitButtons";
import Link from "next/link";
import ProductSearch from "@/components/ProductSearch";
import EditProductModal from "@/components/EditProductModal";
import BrandSelect from "@/components/BrandSelect";
import CategorySelect from "@/components/CategorySelect";

export default async function ProductsManager({
  searchParams,
}: {
  searchParams?: Promise<{ tab?: string; q?: string; category?: string; brand?: string }>;
}) {
  const resolvedParams = await searchParams;
  const activeTab = resolvedParams?.tab || 'all';
  const query = (resolvedParams?.q || '').toLowerCase();
  const category = resolvedParams?.category || '';
  const brand = resolvedParams?.brand || '';

  const supabase = await createClient();
  
  // Fetch products
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  // Fetch brands for dropdowns
  const { data: brands } = await supabase
    .from("brands")
    .select("*")
    .order("name", { ascending: true });

  // Fetch categories for dropdowns
  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("name", { ascending: true });

  const dynamicBrands = brands || [];
  const dynamicCategories = categories || [];

  // Filter products based on search query, category, and brand
  const filteredProducts = products?.filter((p) => {
    let matches = true;

    if (query) {
      matches = matches && !!(
        (p.name && p.name.toLowerCase().includes(query)) ||
        (p.sku && p.sku.toLowerCase().includes(query)) ||
        (p.brand && p.brand.toLowerCase().includes(query)) ||
        (p.category && p.category.toLowerCase().includes(query))
      );
    }

    if (category) {
      matches = matches && p.category === category;
    }

    if (brand) {
      matches = matches && p.brand === brand;
    }

    return matches;
  }) || [];

  const formatPrice = (price: string | number) => {
    if (!price) return "0.00 AED";
    const num = parseFloat(price.toString().replace(/[^0-9.]/g, ''));
    if (isNaN(num)) return price.toString();
    return num.toFixed(2) + " AED";
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-extrabold text-[#111] mb-2">Manage Products</h1>
      <p className="text-gray-500 mb-8">Upload new products, update details, or remove them from your catalog.</p>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-6 border-b border-gray-200 mb-8">
        <Link 
          href="?tab=all" 
          className={`pb-3 font-bold transition-colors ${activeTab === 'all' ? 'border-b-2 border-[#bf5e42] text-[#111]' : 'text-gray-400 hover:text-gray-700 border-b-2 border-transparent'}`}
        >
          All Products
        </Link>
        <Link 
          href="?tab=upload" 
          className={`pb-3 font-bold transition-colors ${activeTab === 'upload' ? 'border-b-2 border-[#bf5e42] text-[#111]' : 'text-gray-400 hover:text-gray-700 border-b-2 border-transparent'}`}
        >
          Upload Product
        </Link>
        <Link 
          href="?tab=update" 
          className={`pb-3 font-bold transition-colors ${activeTab === 'update' ? 'border-b-2 border-[#bf5e42] text-[#111]' : 'text-gray-400 hover:text-gray-700 border-b-2 border-transparent'}`}
        >
          Update Product
        </Link>
        <Link 
          href="?tab=delete" 
          className={`pb-3 font-bold transition-colors ${activeTab === 'delete' ? 'border-b-2 border-[#bf5e42] text-[#111]' : 'text-gray-400 hover:text-gray-700 border-b-2 border-transparent'}`}
        >
          Delete Product
        </Link>
      </div>

      {activeTab === 'upload' && (
        <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] max-w-3xl">
          <h2 className="text-xl font-bold text-[#111] mb-6 flex items-center gap-2">
            <Plus className="w-5 h-5 text-[#bf5e42]" />
            Upload New Product
          </h2>
          <form action={addProduct} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Product Name</label>
              <input required type="text" name="name" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-[#bf5e42] focus:border-[#bf5e42] text-sm font-medium" placeholder="e.g. 254 PLATINUM" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Brand</label>
              <BrandSelect brands={dynamicBrands} />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Price</label>
                <input required type="text" name="price" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-[#bf5e42] focus:border-[#bf5e42] text-sm font-medium" placeholder="e.g. 55.00 AED" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">SKU</label>
                <input required type="text" name="sku" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-[#bf5e42] focus:border-[#bf5e42] text-sm font-medium" placeholder="e.g. PL-AT-25" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Category</label>
              <CategorySelect categories={dynamicCategories} />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Description</label>
              <textarea name="description" rows={4} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-[#bf5e42] focus:border-[#bf5e42] text-sm font-medium" placeholder="Product details..."></textarea>
            </div>
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Primary Image</label>
                <input required type="file" accept="image/*" name="image" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#bf5e42] focus:border-[#bf5e42] text-sm font-medium bg-white" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Gallery Images (Optional)</label>
                <input type="file" multiple accept="image/*" name="additional_images" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#bf5e42] focus:border-[#bf5e42] text-sm font-medium bg-white" />
                <p className="text-[11px] text-gray-500 mt-1">Select multiple images to show a gallery on the product page.</p>
              </div>
            </div>
            <div className="flex items-center gap-2 pt-2 pb-2">
              <input type="checkbox" id="is_featured" name="is_featured" value="true" className="w-4 h-4 text-[#bf5e42] focus:ring-[#bf5e42] border-gray-300 rounded" />
              <label htmlFor="is_featured" className="text-sm font-bold text-[#111]">Feature on Homepage</label>
            </div>
            
            <div className="pt-4">
              <SubmitProductButton />
            </div>
          </form>
        </div>
      )}

      {(activeTab === 'all' || activeTab === 'update' || activeTab === 'delete') && (
        <div>
          <ProductSearch />
          
          <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse block md:table">
                <thead className="hidden md:table-header-group">
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-4 text-xs font-extrabold text-gray-500 uppercase tracking-wider">Image</th>
                    <th className="px-6 py-4 text-xs font-extrabold text-gray-500 uppercase tracking-wider">Details</th>
                    <th className="px-6 py-4 text-xs font-extrabold text-gray-500 uppercase tracking-wider">Price / SKU</th>
                    <th className="px-6 py-4 text-xs font-extrabold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="block md:table-row-group">
                  {(!filteredProducts || filteredProducts.length === 0) && (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-gray-500 text-sm font-medium">
                        No products match your search.
                      </td>
                    </tr>
                  )}
                  {filteredProducts?.map((product) => (
                    <tr key={product.id} className="block md:table-row hover:bg-gray-50 transition-colors group bg-white border border-gray-100 md:border-b md:border-t-0 md:border-l-0 md:border-r-0 rounded-xl md:rounded-none mb-4 md:mb-0 p-4 md:p-0 shadow-sm md:shadow-none">
                      <td className="block md:table-cell px-0 md:px-6 py-3 md:py-4 md:whitespace-nowrap flex items-center justify-between border-b border-gray-50 md:border-none">
                        <span className="md:hidden text-xs text-gray-400 font-bold uppercase">Image</span>
                        <div className="w-12 h-12 rounded bg-gray-100 border border-gray-200 flex items-center justify-center overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          {product.image_url ? (
                            <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                          ) : (
                            <ImageIcon className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                      </td>
                      <td className="block md:table-cell px-0 md:px-6 py-3 md:py-4 flex flex-col md:block border-b border-gray-50 md:border-none">
                        <span className="md:hidden text-xs text-gray-400 font-bold uppercase mb-2">Details</span>
                        <div className="text-sm font-bold text-[#111] truncate max-w-[250px]">{product.name}</div>
                        <div className="text-xs font-medium text-gray-500 flex items-center gap-2 mt-1">
                          <span>{product.category}</span>
                          {product.brand && (
                            <>
                              <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                              <span>{product.brand}</span>
                            </>
                          )}
                        </div>
                      </td>
                      <td className="block md:table-cell px-0 md:px-6 py-3 md:py-4 md:whitespace-nowrap flex items-center justify-between border-b border-gray-50 md:border-none">
                        <span className="md:hidden text-xs text-gray-400 font-bold uppercase">Price / SKU</span>
                        <div className="text-right md:text-left">
                          <div className="text-sm font-extrabold text-[#111]">{formatPrice(product.price)}</div>
                          <div className="text-xs font-medium text-gray-500 mt-1">{product.sku}</div>
                        </div>
                      </td>
                      <td className="block md:table-cell px-0 md:px-6 py-3 md:py-4 md:whitespace-nowrap mt-2 md:mt-0 pt-4 md:pt-4">
                        <div className="flex justify-end items-center h-full gap-2">
                          {activeTab === 'update' && (
                            <EditProductModal product={product} brands={dynamicBrands} categories={dynamicCategories} />
                          )}
                          {activeTab === 'delete' && (
                            <form action={async () => {
                              'use server'
                              await deleteProduct(product.id)
                            }}>
                              <DeleteButton />
                            </form>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
