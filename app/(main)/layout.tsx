import TopBanner from "@/components/TopBanner";
import Navbar from "@/components/Navbar";
import CategoriesNav from "@/components/CategoriesNav";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { CartProvider } from "@/context/CartContext";
import { createClient } from "@/utils/supabase/server";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: dbCategories } = await supabase.from("categories").select("*").order("name", { ascending: true });
  const categories = dbCategories || [];

  return (
    <CartProvider>
      <div className="w-full flex-1 flex flex-col overflow-x-hidden relative">
        <TopBanner />
        <Navbar categories={categories} />
        
        {/* Main Content Rendered Here */}
        {children}
        
        <Footer />
        <FloatingWhatsApp />
      </div>
    </CartProvider>
  );
}
