import { LayoutDashboard, Package, MessageSquareQuote, Image as ImageIcon, LogOut, ShieldCheck, Tags, Grid, Video, Settings } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import MobileAdminNav from "@/components/MobileAdminNav";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const navItems = [
    { name: "Overview", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Products", href: "/admin/dashboard/products", icon: Package },
    { name: "Categories", href: "/admin/dashboard/categories", icon: Grid },
    { name: "Brands", href: "/admin/dashboard/brands", icon: Tags },
    { name: "Testimonials", href: "/admin/dashboard/testimonials", icon: MessageSquareQuote },
    // { name: "Hero Images", href: "/admin/dashboard/hero", icon: ImageIcon },
    { name: "Homepage Video", href: "/admin/dashboard/video", icon: Video },
  ];

  return (
    <div className="min-h-screen bg-[#fcfbf9] flex">
      
      {/* Sidebar */}
      <aside className="w-64 bg-[#1b1b1b] text-white flex-col hidden md:flex shrink-0 sticky top-0 h-screen overflow-y-auto border-r border-white/5">
        <div className="h-16 flex items-center gap-3 px-6 border-b border-white/5 shrink-0">
          <ShieldCheck className="w-6 h-6 text-[#bf5e42]" />
          <span className="font-extrabold text-lg tracking-tight">Admin Portal</span>
        </div>
        
        <nav className="flex-1 py-6 px-4 space-y-2">
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-400 rounded-lg hover:bg-white/5 hover:text-white transition-colors"
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5 shrink-0">
          <form action={async () => {
            'use server'
            const sb = await createClient()
            await sb.auth.signOut()
            redirect('/admin/login')
          }}>
            <button className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-[#bf5e42] rounded-lg hover:bg-[#bf5e42]/10 transition-colors w-full">
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Mobile Header (Only visible on small screens) */}
        <MobileAdminNav onSignOut={async () => {
          'use server'
          const sb = await createClient()
          await sb.auth.signOut()
          redirect('/admin/login')
        }} />

        {/* Top Bar Desktop */}
        <header className="hidden md:flex bg-white border-b border-gray-100 h-16 items-center justify-between px-8 sticky top-0 z-10 shrink-0 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-gray-500">Logged in as:</span>
            <span className="text-sm font-extrabold text-[#bf5e42] bg-[#bf5e42]/10 px-3 py-1.5 rounded-full">{user.email}</span>
          </div>
          <Link href="/" className="text-sm font-bold text-[#111] hover:text-[#bf5e42] transition-colors flex items-center gap-2">
            Back to Main Website &rarr;
          </Link>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
          {children}
        </main>
        
      </div>
    </div>
  );
}
