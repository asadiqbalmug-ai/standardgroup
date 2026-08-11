import { createClient } from "@/utils/supabase/server";
import TestimonialCarousel from "./TestimonialCarousel";

export default async function Testimonials() {
  const supabase = await createClient();
  
  // Fetch active testimonials
  const { data: reviews } = await supabase
    .from("testimonials")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (!reviews || reviews.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-[#fcfbf9] pt-12 pb-16 md:pt-16 md:pb-20 px-4 md:px-12 border-t border-gray-100">
      <div className="max-w-[1400px] mx-auto flex flex-col items-center relative">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-[#bf5e42] font-bold tracking-widest text-[10px] uppercase mb-4 block">
            Client Reviews
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-[40px] font-bold text-[#111] leading-[1.15] tracking-tight">
            What Contractors Say About Us
          </h2>
        </div>

        {/* Carousel UI injected as a Client Component */}
        <TestimonialCarousel reviews={reviews} />

      </div>
    </section>
  );
}
