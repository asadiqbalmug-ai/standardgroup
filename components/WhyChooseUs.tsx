import { CheckCircle2, Phone } from "lucide-react";
import Link from "next/link";

export default function WhyChooseUs() {
  return (
    <section className="w-full flex flex-col">
      {/* Top Part: White Background */}
      <div className="w-full bg-white py-6 md:py-10 px-4 md:px-12 border-t border-gray-200">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-8 lg:gap-10 items-center">
          
          {/* Left Side Content */}
          <div className="flex-1 flex flex-col gap-6">
            <span className="text-[#091522] font-bold text-sm tracking-widest uppercase">
              Why Choose Us
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight">
              Abu Dhabi's Most Reliable <br className="hidden md:block" /> Building Materials Supplier
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed max-w-2xl">
              We are an authorized dealer and official distributor for 31+ international building material brands. From a single bag of cement to a full project's worth of steel, tiles, waterproofing, and finishes — we supply it all, with documentation, warranties, and technical support.
            </p>
            
            <ul className="flex flex-col gap-2 mt-2">
              {[
                "Authorized distributor for Ariston, Asmaco, Awazel, Bildco, Bosch, Ducab & more",
                "Bulk pricing for contractors and project procurement teams",
                "National delivery across UAE — Dubai, Al Ain, Sharjah & Northern Emirates",
                "International export available — GCC, Asia, Africa",
                "Technical consultation for material selection & specifications"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700 text-sm font-medium">
                  <CheckCircle2 className="w-5 h-5 text-yellow-500 shrink-0" />
                  <span className="leading-tight mt-0.5">{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
              <Link href="/about" className="bg-[#091522] hover:bg-yellow-400 hover:text-black transition-colors text-white font-bold py-3 px-6 rounded-md flex items-center justify-center w-full sm:w-auto">
                About Standard Group &rarr;
              </Link>
              <Link href="/contact" className="bg-white border border-gray-300 hover:border-[#091522] text-[#091522] font-bold py-3 px-6 rounded-md transition-colors flex items-center justify-center w-full sm:w-auto">
                Contact Us
              </Link>
            </div>
          </div>

          {/* Right Side Stats Grid */}
          <div className="flex-1 w-full max-w-2xl lg:max-w-none">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Card 1 */}
              <div className="group bg-[#091522] border border-[#1a365d] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 rounded-lg p-4 py-5 flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-extrabold text-yellow-500 group-hover:text-white transition-colors mb-2">20+</span>
                <span className="font-bold text-white text-sm">Years of Experience</span>
                <span className="text-xs text-gray-400 mt-1">Established 2003, Abu Dhabi</span>
              </div>
              {/* Card 2 */}
              <div className="group bg-[#091522] border border-[#1a365d] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 rounded-lg p-4 py-5 flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-extrabold text-yellow-500 group-hover:text-white transition-colors mb-2">31+</span>
                <span className="font-bold text-white text-sm">Authorized Brands</span>
                <span className="text-xs text-gray-400 mt-1">Global & regional brands</span>
              </div>
              {/* Card 3 */}
              <div className="group bg-[#091522] border border-[#1a365d] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 rounded-lg p-4 py-5 flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-extrabold text-yellow-500 group-hover:text-white transition-colors mb-2">500+</span>
                <span className="font-bold text-white text-sm">Products in Stock</span>
                <span className="text-xs text-gray-400 mt-1">Across 17 categories</span>
              </div>
              {/* Card 4 */}
              <div className="group bg-[#091522] border border-[#1a365d] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 rounded-lg p-4 py-5 flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-extrabold text-yellow-500 group-hover:text-white transition-colors mb-2">2</span>
                <span className="font-bold text-white text-sm">Showroom Locations</span>
                <span className="text-xs text-gray-400 mt-1">Baniyas West & Mafraq, AD</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Strip: Yellow Background */}
      <div className="w-full bg-[#f6c000] py-5 px-4 md:px-12 border-t border-yellow-300 shadow-inner">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-1 text-center md:text-left">
            <h3 className="text-[#091522] text-lg md:text-xl font-bold">Need a quote for your project?</h3>
            <p className="text-[#1a365d] text-sm font-medium">Contact us on WhatsApp for a fast response and competitive pricing.</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <a href="https://wa.me/971555599508?text=Hi%2C%20I%20would%20like%20to%20get%20a%20quote%20for%20a%20project." target="_blank" rel="noopener noreferrer" className="bg-[#091522] hover:bg-black text-white font-bold py-3 px-6 rounded-md flex items-center justify-center gap-2 transition-colors w-full sm:w-auto shadow-md">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.66-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
              </svg>
              WhatsApp Now
            </a>
            <a href="tel:+971555599508" className="bg-white hover:bg-gray-100 border-2 border-white hover:border-gray-100 text-[#091522] font-bold py-[10px] px-6 rounded-md flex items-center justify-center gap-2 transition-colors w-full sm:w-auto shadow-sm">
              <Phone className="w-5 h-5" />
              Call Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
