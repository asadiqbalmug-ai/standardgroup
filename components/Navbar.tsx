"use client";

import { Search, ShoppingCart, User, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { cartCount } = useCart();
  const router = useRouter();

  return (
    <div className="relative w-full z-40 bg-white py-4 px-4 md:px-12 flex items-center justify-between border-b border-gray-100">
      
      {/* Container */}
      <div className="w-full flex items-center justify-between">
        
        {/* Left: Logo Section */}
        <div className="relative group shrink-0 z-50">
          <Link href="/" className="flex items-center gap-3 py-1 cursor-pointer">
            <img src="/logos/logo.png" alt="Standard Group Logo" className="h-10 w-auto" />
            <div className="flex flex-col">
              <span className="text-lg font-extrabold leading-tight text-[#091522] tracking-tight uppercase">
                Standard Group
              </span>
              <span className="text-xs font-medium text-gray-500">
                Building Materials, UAE
              </span>
            </div>
          </Link>
          
          {/* Dropdown Menu (Sister Companies) */}
          <div className="absolute top-[100%] left-0 pt-3 opacity-0 translate-y-4 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible transition-all duration-300 ease-out">
            <div className="w-[340px] bg-white border border-gray-100 shadow-xl rounded-md overflow-hidden flex flex-col">
              {[
                {
                  name: "Standard Sanitary Ware",
                  subtitle: "We Set Standards",
                  image: "/logos/logo.png",
                  filter: "none",
                  href: "/",
                  textColor: "text-red-600"
                },
                {
                  name: "Standard Bldg Materials LLC",
                  subtitle: "We Set Standards",
                  image: "/logos/logo.png",
                  filter: "hue-rotate(190deg)",
                  href: "/",
                  textColor: "text-[#3b9bb8]"
                },
                {
                  name: "Standard Bldg Materials",
                  subtitle: "Mafraq Warehouse",
                  image: "/logos/logo.png",
                  filter: "hue-rotate(30deg)",
                  href: "/",
                  textColor: "text-[#eb6434]"
                },
                {
                  name: "Beautiful Lights & Elect Trdg",
                  subtitle: "We Set Standards",
                  image: "/logos/logo.png",
                  filter: "hue-rotate(240deg)",
                  href: "/",
                  textColor: "text-[#244bb5]"
                },
                {
                  name: "Tandori Flames",
                  subtitle: "Restaurant",
                  image: "/logos/tandoriflames.webp",
                  filter: "none",
                  href: "https://www.tandooriflames.ae/",
                  textColor: "text-orange-500",
                  isExternal: true
                }
              ].map((company, i, arr) => (
                <Link 
                  key={i} 
                  href={company.href} 
                  target={company.isExternal ? "_blank" : "_self"}
                  className={`flex items-center gap-3 p-4 hover:bg-gray-50 hover:-translate-y-1 transition-all duration-300 ${i !== arr.length - 1 ? 'border-b border-gray-50' : ''}`}
                >
                  <div className="bg-gray-50 border border-gray-100 p-1.5 rounded-sm flex items-center justify-center w-12 h-12 shrink-0">
                    <img 
                      src={company.image} 
                      alt={company.name} 
                      className="max-h-8 max-w-full object-contain" 
                      style={{ filter: company.filter }}
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-extrabold leading-tight text-[#091522] tracking-tight">
                      {company.name}
                    </span>
                    <span className={`text-[11px] font-bold mt-0.5 ${company.textColor}`}>
                      {company.subtitle}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Center: Navigation Links */}
        <div className="hidden lg:flex items-center gap-8 text-[15px] font-semibold text-[#091522]">
          <Link href="/categories" className="flex items-center gap-1 hover:text-red-700 transition-colors">
            Shop <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
          </Link>
          <Link href="/categories" className="flex items-center gap-1 hover:text-red-700 transition-colors">
            Categories
          </Link>
          <Link href="/brands" className="hover:text-red-700 transition-colors">
            Brands
          </Link>
          <Link href="/about" className="hover:text-red-700 transition-colors">
            About Us
          </Link>
          <Link href="/contact" className="hover:text-red-700 transition-colors">
            Contact
          </Link>
        </div>

        {/* Right: Icons */}
        <div className="flex items-center gap-6 shrink-0 text-[#091522]">
          <button onClick={() => router.push('/categories')} className="hover:text-red-700 transition-colors">
            <Search className="w-6 h-6" strokeWidth={2.5} />
          </button>
          <Link href="/admin/login" className="hover:text-red-700 transition-colors">
            <User className="w-6 h-6" strokeWidth={2.5} />
          </Link>
          <Link href="/cart" className="relative hover:text-red-700 transition-colors flex items-center">
            <ShoppingCart className="w-6 h-6" strokeWidth={2.5} />
            <span className="absolute -top-1.5 -right-2 bg-[#d26c48] text-white text-[9px] font-extrabold w-4 h-4 flex items-center justify-center rounded-full border border-white">
              {cartCount}
            </span>
          </Link>
        </div>

      </div>
    </div>
  );
}
