import { createClient } from "@/utils/supabase/server";
import HeroCarousel from "./HeroCarousel";

export default async function Hero() {
  const supabase = await createClient();
  
  // Fetch up to 3 active hero images
  const { data: heroImages } = await supabase
    .from("hero_images")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true })
    .order("id", { ascending: true })
    .limit(3);

  const slidesToUse = heroImages && heroImages.length > 0 ? heroImages : [];

  return <HeroCarousel slides={slidesToUse} />;
}
