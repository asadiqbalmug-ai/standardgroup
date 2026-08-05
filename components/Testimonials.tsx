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
    <section className="w-full bg-[#091522] pt-8 pb-12 md:pt-10 md:pb-16 px-4 md:px-12 border-t border-[#1a2d40]">
      <div className="max-w-[1400px] mx-auto flex flex-col items-center relative">
        {/* Header */}
        <div className="text-center mb-2">
          <span className="text-yellow-400 font-bold text-sm tracking-widest uppercase mb-3 block">
            Client Reviews
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">
            What Contractors Say About Us
          </h2>
        </div>

        {/* Carousel UI injected as a Client Component */}
        <TestimonialCarousel reviews={reviews} />

      </div>
    </section>
  );
}
