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

  const { data: brands } = await supabase
    .from("brands")
    .select("*")
    .order("name", { ascending: true });

  const { data: topCategories } = await supabase
    .from("categories")
    .select("*")
    .eq("is_top_category", true)
    .order("name", { ascending: true });

  const { data: videos } = await supabase
    .from("homepage_video")
    .select("video_url")
    .order("created_at", { ascending: false })
    .limit(1);

  const validProducts = products || [];
  const validBrands = brands || [];
  const validCategories = topCategories || [];
  const videoUrl = videos && videos.length > 0 ? videos[0].video_url : null;

  const categoryCounts = validProducts.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <main className="w-full flex-1 flex flex-col overflow-x-hidden">
      {/* Section 1 - Hero */}
      <Hero />

      {/* Section 2 - Categories */}
      <div id="products">
        <CategoryCarousel categoryCounts={categoryCounts} categories={validCategories} />
      </div>
      
      {/* Popular Picks (formerly Browse) */}
      <ProductSection 
        sectionTag="Trending Products" 
        title="Popular Picks" 
        showViewAll={true} 
        products={validProducts.slice(0, 10)} 
      />

      {/* Section 3 - Brands */}
      <BrandCarousel brands={validBrands} />

      {/* Why Choose Us & CTA */}
      <WhyChooseUs videoUrl={videoUrl} />

      {/* Section 4 - Client Reviews */}
      <Testimonials />
    </main>
  );
}
