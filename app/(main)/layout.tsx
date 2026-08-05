import TopBanner from "@/components/TopBanner";
import Navbar from "@/components/Navbar";
import CategoriesNav from "@/components/CategoriesNav";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { CartProvider } from "@/context/CartContext";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <div className="w-full flex-1 flex flex-col overflow-x-hidden relative">
        <TopBanner />
        <Navbar />
        <CategoriesNav />
        
        {/* Main Content Rendered Here */}
        {children}
        
        <Footer />
        <FloatingWhatsApp />
      </div>
    </CartProvider>
  );
}
