import { createClient } from "@/utils/supabase/server";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import CategoryCarousel from "@/components/CategoryCarousel";
import BrandCarousel from "@/components/BrandCarousel";
import ProductSection from "@/components/ProductSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";

export default async function Home() {
  const supabase = await createClient();
  
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  const validProducts = products || [];

  const categoryCounts = validProducts.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <main className="w-full flex-1 flex flex-col overflow-x-hidden">
      {/* Section 1 - Hero & Features */}
      <Hero />
      <Features />

      {/* Section 2 - Categories */}
      <div id="products">
        <CategoryCarousel categoryCounts={categoryCounts} />
      </div>
      <ProductSection title="Browse" showViewAll={true} products={validProducts.slice(0, 10)} />

      {/* Section 3 - Brands */}
      <BrandCarousel />
      <ProductSection title="Best Sellers" products={(products || []).slice(0, 10)} />

      {/* Section 4 - Client Reviews */}
      <Testimonials />

      {/* Why Choose Us & CTA */}
      <WhyChooseUs />
    </main>
  );
}
