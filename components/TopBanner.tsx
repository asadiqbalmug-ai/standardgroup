import { Truck, ShieldCheck, BadgePercent, Phone } from "lucide-react";

export default function TopBanner() {
  return (
    <div className="bg-[#091522] text-white text-[13px] font-medium py-2 px-4 md:px-8 w-full flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
      {/* Left Section */}
      <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
        <div className="flex items-center gap-2">
          <Truck className="w-4 h-4 text-yellow-400" />
          <span>Delivering in Abu Dhabi</span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-yellow-400" />
          <span>100% Genuine Products</span>
        </div>
        <div className="flex items-center gap-2">
          <BadgePercent className="w-4 h-4 text-yellow-400" />
          <span>Best Prices Guaranteed</span>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        <a href="tel:+971555599508" className="flex items-center gap-2 cursor-pointer hover:text-yellow-400 transition-colors">
          <Phone className="w-4 h-4 text-yellow-400" />
          <span>+971 55 559 9508</span>
        </a>
        <div className="flex items-center gap-2 cursor-pointer hover:text-yellow-400 transition-colors">
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
