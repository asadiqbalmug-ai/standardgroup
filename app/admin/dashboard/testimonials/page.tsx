import { createClient } from "@/utils/supabase/server";
import { addTestimonial, deleteTestimonial, toggleTestimonial } from "./actions";
import { Trash2, Plus, Star, CheckCircle, XCircle } from "lucide-react";

export default async function TestimonialsManager() {
  const supabase = await createClient();
  
  const { data: testimonials } = await supabase
    .from("testimonials")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="max-w-6xl">
      <h1 className="text-3xl font-extrabold text-[#111] mb-2">Manage Testimonials</h1>
      <p className="text-gray-500 mb-8">Add client reviews to display on the homepage.</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Add Form */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] sticky top-24">
            <h2 className="text-lg font-bold text-[#111] mb-4 flex items-center gap-2">
              <Plus className="w-5 h-5 text-[#bf5e42]" />
              Add Testimonial
            </h2>
            <form action={addTestimonial} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Author Name</label>
                <input required type="text" name="author_name" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#bf5e42] focus:border-[#bf5e42] text-sm font-medium" placeholder="e.g. John Doe" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Company (Optional)</label>
                <input type="text" name="company_name" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#bf5e42] focus:border-[#bf5e42] text-sm font-medium" placeholder="e.g. Acme Corp" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Rating</label>
                <select required name="rating" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#bf5e42] focus:border-[#bf5e42] text-sm font-medium">
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="2">2 Stars</option>
                  <option value="1">1 Star</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Review Content</label>
                <textarea required name="content" rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#bf5e42] focus:border-[#bf5e42] text-sm font-medium resize-none" placeholder="Write the review here..."></textarea>
              </div>
              
              <button type="submit" className="w-full bg-[#1b1b1b] hover:bg-black text-white font-bold py-2.5 rounded-lg transition-colors mt-2 text-sm">
                Save Testimonial
              </button>
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
                    <th className="px-6 py-4 text-xs font-extrabold text-gray-500 uppercase tracking-wider">Author</th>
                    <th className="px-6 py-4 text-xs font-extrabold text-gray-500 uppercase tracking-wider">Review</th>
                    <th className="px-6 py-4 text-xs font-extrabold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-xs font-extrabold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {(!testimonials || testimonials.length === 0) && (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-gray-500 text-sm font-medium">
                        No testimonials found. Add your first one!
                      </td>
                    </tr>
                  )}
                  {testimonials?.map((t) => (
                    <tr key={t.id} className="hover:bg-gray-50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="text-sm font-bold text-[#111]">{t.author_name}</div>
                        <div className="text-xs font-medium text-gray-500">{t.company_name || "-"}</div>
                        <div className="flex items-center gap-0.5 mt-1">
                          {[...Array(t.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 text-[#bf5e42] fill-current" />
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-600 line-clamp-3">{t.content}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <form action={async () => {
                          'use server'
                          await toggleTestimonial(t.id, t.is_active)
                        }}>
                          <button type="submit" className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-colors ${t.is_active ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`} title="Click to toggle status">
                            {t.is_active ? (
                              <><CheckCircle className="w-3.5 h-3.5" /> Active</>
                            ) : (
                              <><XCircle className="w-3.5 h-3.5" /> Inactive</>
                            )}
                          </button>
                        </form>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <form action={async () => {
                          'use server'
                          await deleteTestimonial(t.id)
                        }}>
                          <button type="submit" className="text-[#bf5e42] hover:text-[#b55239] hover:bg-[#bf5e42]/10 p-2 rounded-lg transition-colors" title="Delete">
                            <Trash2 className="w-5 h-5" />
                          </button>
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
