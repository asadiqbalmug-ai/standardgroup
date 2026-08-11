import { Phone } from "lucide-react";
import Link from "next/link";

export default function TopBanner() {
  return (
    <div className="bg-black text-[#e5e5e5] text-[12px] py-2 px-4 md:px-8 w-full flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0 z-50 relative">
      {/* Left Section */}
      <div className="font-medium tracking-wide">
        Delivering quality building materials across UAE since 2003.
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4 font-medium tracking-wide">
        <a href="https://wa.me/971555599508?text=Hello%20Standard%20Group!%20I%20would%20like%20to%20track%20my%20order." target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
          Track Order
        </a>
        <div className="w-[1px] h-3 bg-gray-600"></div>
        <a href="tel:+971555599508" className="flex items-center gap-1.5 hover:text-white transition-colors text-[#d3aa70]">
          <Phone className="w-3.5 h-3.5" />
          <span>+971 55 559 9508</span>
        </a>
        <div className="w-[1px] h-3 bg-gray-600"></div>
        <div className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors">
          <svg className="w-4 h-4 rounded-full shrink-0" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
            <clipPath id="uae-circle">
              <circle cx="30" cy="30" r="30" />
            </clipPath>
            <g clipPath="url(#uae-circle)">
              <rect width="60" height="60" fill="#fff"/>
              <rect x="15" width="45" height="20" fill="#00732f"/>
              <rect x="15" y="40" width="45" height="20" fill="#000"/>
              <rect width="15" height="60" fill="#f00"/>
            </g>
          </svg>
          <span>العربية</span>
        </div>
      </div>
    </div>
  );
}
