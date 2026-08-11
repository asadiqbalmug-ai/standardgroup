import { Check, Play, ArrowRight, Package, Handshake, RefreshCcw, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function WhyChooseUs({ videoUrl }: { videoUrl?: string | null }) {
  return (
    <section className="w-full flex flex-col bg-white pb-12 md:pb-20">
      <div className="max-w-[1400px] mx-auto px-4 md:px-12 w-full">
        
        {/* Split Layout: Content & Video */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 w-full">
          
          {/* Left Side: Content Box */}
          <div className="lg:w-[38%] shrink-0 bg-[#fcfbf9] rounded-[10px] p-10 md:p-14 lg:p-12 flex flex-col justify-center border border-gray-100/50">
            <span className="text-[#bf5e42] font-bold tracking-widest text-[10px] uppercase mb-4">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-[40px] font-bold text-[#111] leading-[1.15] tracking-tight mb-8">
              Built on Quality.<br/>Focused on You.
            </h2>
            
            <ul className="flex flex-col gap-3 mb-10">
              {[
                "Genuine Products from Trusted Brands",
                "Competitive Prices",
                "Expert Advice & Support",
                "On-time Delivery Across UAE"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-500 text-[13px] font-medium">
                  <Check className="w-[14px] h-[14px] text-[#bf5e42] shrink-0 stroke-[2.5]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div>
              <Link href="/about" className="inline-flex bg-[#b55239] hover:bg-red-800 text-white font-semibold py-3.5 px-6 rounded-md flex items-center justify-center transition-colors text-[11px] tracking-widest uppercase gap-2 group">
                Learn More About Us
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
              </Link>
            </div>
          </div>

          {/* Right Side: Video Box */}
          <div className="flex-1 relative rounded-[10px] overflow-hidden min-h-[300px] lg:min-h-[380px] flex flex-col justify-center group cursor-pointer bg-black">
            {videoUrl ? (
              <video 
                src={videoUrl} 
                controls 
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover absolute inset-0"
              />
            ) : (
              <>
                {/* Background Image Placeholder */}
                <div 
                  className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: "url('https://images.unsplash.com/photo-1541888086425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80')" }}
                >
                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-black/30" />
                </div>

                {/* Play Button (Center) */}
                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                  <div className="w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center pl-1 shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-7 h-7 text-[#8c3c22] fill-current" />
                  </div>
                </div>
              </>
            )}
          </div>

        </div>

        {/* Bottom Features Banner */}
        <div className="w-full mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 py-4">
          
          <div className="flex items-start gap-4">
            <Package className="w-8 h-8 text-[#c25141] shrink-0 stroke-[1.5]" />
            <div className="flex flex-col">
              <span className="text-[#091522] font-extrabold text-[15px] mb-1">Bulk Orders</span>
              <span className="text-gray-500 text-[12px] leading-relaxed font-medium">Special prices for bulk requirements</span>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Handshake className="w-8 h-8 text-[#c25141] shrink-0 stroke-[1.5]" />
            <div className="flex flex-col">
              <span className="text-[#091522] font-extrabold text-[15px] mb-1">Project Support</span>
              <span className="text-gray-500 text-[12px] leading-relaxed font-medium">Solutions tailored for your projects</span>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <RefreshCcw className="w-8 h-8 text-[#c25141] shrink-0 stroke-[1.5]" />
            <div className="flex flex-col">
              <span className="text-[#091522] font-extrabold text-[15px] mb-1">Easy Returns</span>
              <span className="text-gray-500 text-[12px] leading-relaxed font-medium">Hassle-free return policy</span>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <ShieldCheck className="w-8 h-8 text-[#c25141] shrink-0 stroke-[1.5]" />
            <div className="flex flex-col">
              <span className="text-[#091522] font-extrabold text-[15px] mb-1">Secure Payments</span>
              <span className="text-gray-500 text-[12px] leading-relaxed font-medium">100% safe & secure transactions</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
