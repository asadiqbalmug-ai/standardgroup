"use client";

import { Search, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { cartCount } = useCart();

  return (
    <div className="bg-[#091522] border-b border-[#1a2d40] py-4 px-4 md:px-8 w-full flex items-center justify-between gap-4">
      {/* Logo Section */}
      <div className="relative group shrink-0 z-50">
        <Link href="/" className="flex items-center gap-3 py-1 cursor-pointer">
          <img src="/logos/logo.png" alt="Standard Group Logo" className="h-10 w-auto" />
          <div className="flex flex-col">
            <span className="text-base font-bold leading-tight text-white tracking-tight">
              Standard Group
            </span>
            <span className="text-xs font-normal text-yellow-400">
              Building Materials, UAE
            </span>
          </div>
        </Link>

        {/* Dropdown Menu */}
        <div className="absolute top-[100%] left-0 pt-3 opacity-0 translate-y-4 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible transition-all duration-300 ease-out">
          <div className="w-72 bg-[#091522] border border-[#1a2d40] shadow-2xl rounded-md overflow-hidden flex flex-col">
            {[1, 2, 3].map((_, i) => (
              <Link 
                key={i} 
                href="/" 
                className={`flex items-center gap-3 p-4 hover:bg-[#112338] hover:-translate-y-1 transition-all duration-300 ${i !== 2 ? 'border-b border-[#1a2d40]' : ''}`}
              >
                <div className="bg-[#112338] p-1.5 rounded-sm">
                  <img src="/logos/logo.png" alt="Standard Group Logo" className="h-6 w-auto" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-extrabold leading-tight text-white tracking-tight">
                    Standard Group
                  </span>
                  <span className="text-[11px] font-bold text-yellow-400">
                    Building Materials, UAE
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
        <input
          type="text"
          placeholder="Search products — tiles, cement, steel, gypsum..."
          className="w-full bg-white border border-gray-300 border-r-0 rounded-l-md px-4 py-2.5 outline-none focus:border-yellow-400 transition-colors text-sm text-gray-800 placeholder:text-gray-400"
        />
        <button className="bg-yellow-400 text-black px-6 py-2.5 rounded-r-md flex items-center gap-2 font-bold hover:bg-yellow-500 transition-colors text-sm">
          <Search className="w-4 h-4" strokeWidth={3} />
          Search
        </button>
      </div>

      {/* Navigation & Actions */}
      <div className="flex items-center gap-8 shrink-0">
        {/* Links */}
        <div className="hidden md:flex items-center gap-6 font-bold text-[15px] text-gray-200">
          <Link href="/#products" className="hover:text-yellow-400 transition-colors">
            Products
          </Link>
          <Link href="/about" className="hover:text-yellow-400 transition-colors">
            About
          </Link>
          <Link href="/contact" className="hover:text-yellow-400 transition-colors">
            Contact
          </Link>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-6 ml-4">
          <Link href="/cart" className="relative flex items-center gap-2 font-bold text-[15px] text-[#091522] bg-yellow-400 hover:bg-yellow-500 px-6 py-2.5 rounded-md transition-colors shadow-sm">
            <ShoppingCart className="w-5 h-5" />
            <span className="hidden sm:block">Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#091522] text-white text-[10px] font-extrabold w-5 h-5 flex items-center justify-center rounded-full border-2 border-yellow-400">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
}
