import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1b1b1b] text-white pt-16 pb-8 border-t border-white/10 rounded-t-[32px] md:rounded-t-[48px] mt-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Brand & Info */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-3">
              <img src="/logos/logo.png" alt="Standard Group Logo" className="h-10 w-auto" />
              <span className="text-xl font-bold tracking-tight">
                Standard Group
              </span>
            </Link>
            <p className="text-gray-400 text-[13px] leading-relaxed">
              UAE's trusted B2B building materials supplier. National & international fulfillment. Serving contractors, distributors & builders since 2003.
            </p>
            <div className="flex items-center gap-4 mt-4">
              <a href="#" className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#1b1b1b] hover:bg-[#bf5e42] hover:text-white transition-all hover:scale-110">
                <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#1b1b1b] hover:bg-[#bf5e42] hover:text-white transition-all hover:scale-110">
                <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#1b1b1b] hover:bg-[#bf5e42] hover:text-white transition-all hover:scale-110">
                <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#1b1b1b] hover:bg-[#bf5e42] hover:text-white transition-all hover:scale-110">
                <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
            </div>
          </div>

          {/* Column 2: Categories */}
          <div className="flex flex-col gap-6">
            <h3 className="font-bold text-[12px] uppercase tracking-widest text-[#bf5e42]">Categories</h3>
            <div className="flex flex-col gap-3 text-[13px] text-gray-300 font-medium">
              <Link href={`/categories?category=${encodeURIComponent("Main Building Materials")}`} className="hover:text-white transition-colors">Main Building Materials</Link>
              <Link href={`/categories?category=${encodeURIComponent("Cables & Wires")}`} className="hover:text-white transition-colors">Cables & Wires</Link>
              <Link href={`/categories?category=${encodeURIComponent("Glues & Adhesives")}`} className="hover:text-white transition-colors">Glues & Adhesives</Link>
              <Link href={`/categories?category=${encodeURIComponent("Paints")}`} className="hover:text-white transition-colors">Paints</Link>
              <Link href={`/categories?category=${encodeURIComponent("Gypsum Board")}`} className="hover:text-white transition-colors">Gypsum Board</Link>
              <Link href={`/categories?category=${encodeURIComponent("Tools & Hardware")}`} className="hover:text-white transition-colors">Tools & Hardware</Link>
              <Link href="/categories" className="hover:text-[#bf5e42] transition-colors flex items-center gap-1 mt-2 text-white font-bold">View All &rarr;</Link>
            </div>
          </div>

          {/* Column 3: Company & Brands */}
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-6">
              <h3 className="font-bold text-[12px] uppercase tracking-widest text-[#bf5e42]">Company</h3>
              <div className="flex flex-col gap-3 text-[13px] text-gray-300 font-medium">
                <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
                <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
                <Link href="/categories" className="hover:text-white transition-colors">Categories</Link>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="font-bold text-[12px] uppercase tracking-widest text-[#bf5e42]">Authorized Brands</h3>
              <p className="text-[11px] text-gray-400 leading-relaxed font-medium uppercase tracking-wide">
                Ariston • Asmaco • Awazel • Bildco • Bosch • Bucomac • Dubai Polymer • Ducab • Everhot • Fosroc • GCEM • GSI
              </p>
            </div>
          </div>

          {/* Column 4: Contact Us */}
          <div className="flex flex-col gap-6">
            <h3 className="font-bold text-[12px] uppercase tracking-widest text-[#bf5e42]">Contact Us</h3>
            <div className="flex flex-col gap-4 text-[13px] text-gray-300 font-medium">
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#bf5e42] shrink-0" strokeWidth={2.5} />
                <div className="flex flex-col gap-1">
                  <a href="tel:+971555599508" className="hover:text-white transition-colors">+971 55 559 9508</a>
                  <a href="tel:+971504654613" className="hover:text-white transition-colors">+971 50 465 4613</a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#bf5e42] shrink-0" strokeWidth={2.5} />
                <a href="mailto:info@standardgroup.ae" className="hover:text-white transition-colors">info@standardgroup.ae</a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#bf5e42] shrink-0 mt-0.5" strokeWidth={2.5} />
                <div className="flex flex-col gap-1 leading-relaxed">
                  <span>Baniyas West, Abu Dhabi</span>
                  <span>Mafraq, Abu Dhabi</span>
                  <span className="text-[11px] text-gray-500 mt-1 uppercase tracking-widest font-bold">UAE · International Delivery Available</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p className="font-medium">&copy; 2026 Standard Group LLC. All rights reserved.</p>
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 font-medium">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/refund-policy" className="hover:text-white transition-colors">Refund & Return Policy</Link>
          </div>
          <p className="tracking-widest uppercase font-bold text-gray-600 hidden lg:block">We Set The Standards</p>
        </div>
      </div>
    </footer>
  );
}
