"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ShieldCheck, LogOut, LayoutDashboard, Package, MessageSquareQuote, Image as ImageIcon, Tags, Grid, Video } from "lucide-react";

const navItems = [
  { name: "Overview", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Products", href: "/admin/dashboard/products", icon: Package },
  { name: "Categories", href: "/admin/dashboard/categories", icon: Grid },
  { name: "Brands", href: "/admin/dashboard/brands", icon: Tags },
  { name: "Testimonials", href: "/admin/dashboard/testimonials", icon: MessageSquareQuote },
  // { name: "Hero Images", href: "/admin/dashboard/hero", icon: ImageIcon },
  { name: "Homepage Video", href: "/admin/dashboard/video", icon: Video },
];

export default function MobileAdminNav({ onSignOut }: { onSignOut: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <header className="md:hidden bg-[#1b1b1b] text-white h-16 flex items-center justify-between px-4 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsOpen(true)}
            className="text-white p-1.5 hover:bg-white/10 rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#bf5e42]" />
            <span className="font-extrabold text-lg tracking-tight">Admin</span>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[60] bg-black/50 flex">
          <div className="w-64 bg-[#1b1b1b] h-full shadow-2xl flex flex-col">
            <div className="h-16 flex items-center justify-between px-4 border-b border-white/5 shrink-0">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#bf5e42]" />
                <span className="font-extrabold text-lg text-white">Menu</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white p-2 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-colors ${
                      isActive 
                        ? "bg-[#bf5e42]/10 text-white" 
                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <item.icon className={`w-5 h-5 ${isActive ? "text-[#bf5e42]" : ""}`} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            <div className="p-4 border-t border-white/5 shrink-0">
              <button 
                onClick={() => {
                  setIsOpen(false);
                  onSignOut();
                }}
                className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-[#bf5e42] rounded-lg hover:bg-[#bf5e42]/10 transition-colors w-full"
              >
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            </div>
          </div>
          <div className="flex-1" onClick={() => setIsOpen(false)}></div>
        </div>
      )}
    </>
  );
}
