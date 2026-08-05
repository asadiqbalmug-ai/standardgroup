import { createClient } from "@/utils/supabase/server";
import { addProduct, deleteProduct } from "./actions";
import { Plus, Image as ImageIcon } from "lucide-react";
import { SubmitProductButton, DeleteButton } from "@/components/AdminSubmitButtons";
import Link from "next/link";
import ProductSearch from "@/components/ProductSearch";
import EditProductModal from "@/components/EditProductModal";

export default async function ProductsManager({
  searchParams,
}: {
  searchParams?: Promise<{ tab?: string; q?: string }>;
}) {
  const resolvedParams = await searchParams;
  const activeTab = resolvedParams?.tab || 'upload';
  const query = (resolvedParams?.q || '').toLowerCase();

  const supabase = await createClient();
  
  // Fetch products
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  // Filter products based on search query
  const filteredProducts = products?.filter((p) => {
    if (!query) return true;
    return (
      (p.name && p.name.toLowerCase().includes(query)) ||
      (p.sku && p.sku.toLowerCase().includes(query)) ||
      (p.brand && p.brand.toLowerCase().includes(query)) ||
      (p.category && p.category.toLowerCase().includes(query))
    );
  }) || [];

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-extrabold text-[#091522] mb-2">Manage Products</h1>
      <p className="text-gray-500 mb-8">Upload new products, update details, or remove them from your catalog.</p>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-gray-200 mb-8">
        <Link 
          href="?tab=upload" 
          className={`pb-3 font-bold transition-colors ${activeTab === 'upload' ? 'border-b-2 border-[#091522] text-[#091522]' : 'text-gray-400 hover:text-gray-700 border-b-2 border-transparent'}`}
        >
          Upload Product
        </Link>
        <Link 
          href="?tab=update" 
          className={`pb-3 font-bold transition-colors ${activeTab === 'update' ? 'border-b-2 border-[#091522] text-[#091522]' : 'text-gray-400 hover:text-gray-700 border-b-2 border-transparent'}`}
        >
          Update Product
        </Link>
        <Link 
          href="?tab=delete" 
          className={`pb-3 font-bold transition-colors ${activeTab === 'delete' ? 'border-b-2 border-[#091522] text-[#091522]' : 'text-gray-400 hover:text-gray-700 border-b-2 border-transparent'}`}
        >
          Delete Product
        </Link>
      </div>

      {activeTab === 'upload' && (
        <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-200 shadow-sm max-w-3xl">
          <h2 className="text-xl font-bold text-[#091522] mb-6 flex items-center gap-2">
            <Plus className="w-5 h-5 text-yellow-500" />
            Upload New Product
          </h2>
          <form action={addProduct} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Product Name</label>
              <input required type="text" name="name" className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500 text-sm font-medium" placeholder="e.g. 254 PLATINUM" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Brand</label>
              <input type="text" name="brand" className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500 text-sm font-medium" placeholder="e.g. Jotun" />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Price</label>
                <input required type="text" name="price" className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500 text-sm font-medium" placeholder="e.g. 55.00 AED" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">SKU</label>
                <input required type="text" name="sku" className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500 text-sm font-medium" placeholder="e.g. PL-AT-25" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Category</label>
              <select required name="category" className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500 text-sm font-medium">
                <option value="Bitumen & Chemicals">Bitumen & Chemicals</option>
                <option value="Cables & Wires">Cables & Wires</option>
                <option value="Cement Board">Cement Board</option>
                <option value="Fittings">Fittings</option>
                <option value="Glues & Adhesives">Glues & Adhesives</option>
                <option value="Gypsum Board">Gypsum Board</option>
                <option value="Gypsum Powder">Gypsum Powder</option>
                <option value="Insulation">Insulation</option>
                <optgroup label="Main Building Materials">
                  <option value="Main Building Materials">Main Building Materials (General)</option>
                  <option value="Cement">Cement</option>
                  <option value="Concrete Blocks">Concrete Blocks</option>
                  <option value="Reinforcement Steel">Reinforcement Steel</option>
                </optgroup>
                <option value="Manhole Covers">Manhole Covers</option>
                <option value="Paints">Paints</option>
                <option value="Plastering">Plastering</option>
                <option value="Power Tools">Power Tools</option>
                <option value="Safety">Safety</option>
                <option value="Sand">Sand</option>
                <option value="Sealants">Sealants</option>
                <option value="Tools & Hardware">Tools & Hardware</option>
                <option value="Water Heaters">Water Heaters</option>
                <option value="Water Tanks">Water Tanks</option>
                <option value="Waterproofing">Waterproofing</option>
                <option value="Wooden Products">Wooden Products</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Description</label>
              <textarea name="description" rows={4} className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500 text-sm font-medium" placeholder="Product details..."></textarea>
            </div>
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Primary Image</label>
                <input required type="file" accept="image/*" name="image" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500 text-sm font-medium bg-white" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Gallery Images (Optional)</label>
                <input type="file" multiple accept="image/*" name="additional_images" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500 text-sm font-medium bg-white" />
                <p className="text-[11px] text-gray-500 mt-1">Select multiple images to show a gallery on the product page.</p>
              </div>
            </div>
            <div className="flex items-center gap-2 pt-2 pb-2">
              <input type="checkbox" id="is_featured" name="is_featured" value="true" className="w-4 h-4 text-[#091522] focus:ring-[#091522] border-gray-300 rounded" />
              <label htmlFor="is_featured" className="text-sm font-bold text-gray-700">Feature on Homepage</label>
            </div>
            
            <div className="pt-4">
              <SubmitProductButton />
            </div>
          </form>
        </div>
      )}

      {(activeTab === 'update' || activeTab === 'delete') && (
        <div>
          <ProductSearch />
          
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-4 text-xs font-extrabold text-gray-500 uppercase tracking-wider">Image</th>
                    <th className="px-6 py-4 text-xs font-extrabold text-gray-500 uppercase tracking-wider">Details</th>
                    <th className="px-6 py-4 text-xs font-extrabold text-gray-500 uppercase tracking-wider">Price / SKU</th>
                    <th className="px-6 py-4 text-xs font-extrabold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {(!filteredProducts || filteredProducts.length === 0) && (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-gray-500 text-sm font-medium">
                        No products match your search.
                      </td>
                    </tr>
                  )}
                  {filteredProducts?.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50 transition-colors group">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="w-12 h-12 rounded bg-gray-100 border border-gray-200 flex items-center justify-center overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          {product.image_url ? (
                            <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                          ) : (
                            <ImageIcon className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-bold text-[#091522] truncate max-w-[250px]">{product.name}</div>
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
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-extrabold text-[#091522]">{product.price}</div>
                        <div className="text-xs font-medium text-gray-500 mt-1">{product.sku}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right flex justify-end items-center h-full gap-2">
                        {activeTab === 'update' && (
                          <EditProductModal product={product} />
                        )}
                        {activeTab === 'delete' && (
                          <form action={async () => {
                            'use server'
                            await deleteProduct(product.id)
                          }}>
                            <DeleteButton />
                          </form>
                        )}
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
