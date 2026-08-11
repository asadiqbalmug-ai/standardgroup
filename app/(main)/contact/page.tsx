import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="w-full min-h-screen bg-[#fcfbf9] flex flex-col">
      {/* Header Banner */}
      <div className="w-full bg-white py-20 md:py-32 px-4 rounded-b-[32px] md:rounded-b-[48px] border-b border-gray-100 shadow-sm">
        <div className="max-w-[1400px] mx-auto text-center">
          <span className="text-[#bf5e42] font-bold tracking-widest text-[11px] uppercase mb-5 block">
            Get In Touch
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-[56px] font-bold text-[#111] tracking-tight mb-6">Contact Us</h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base leading-relaxed font-medium">
            Whether you need a bulk quote, technical support, or have a general inquiry, our team is ready to help you build better.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full flex-1 max-w-[1400px] mx-auto px-4 md:px-12 py-16 md:py-24 relative z-10 -mt-8 md:-mt-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* Contact Information Cards */}
          <div className="flex-1 flex flex-col gap-6">
            {/* Phone */}
            <div className="bg-[#1b1b1b] p-8 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-white/5 flex items-start gap-6 hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)] transition-all">
              <div className="w-12 h-12 bg-[#2a2a2a] rounded-full flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-[#bf5e42]" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="text-[17px] font-bold text-white">Call or WhatsApp</h3>
                <p className="text-gray-400 text-[13px] font-medium">Available for fast quotes and support.</p>
                <a href="tel:+971555599508" className="text-[#bf5e42] font-bold text-[15px] hover:text-[#8c3c22] transition-colors mt-1">
                  +971 55 559 9508
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="bg-[#1b1b1b] p-8 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-white/5 flex items-start gap-6 hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)] transition-all">
              <div className="w-12 h-12 bg-[#2a2a2a] rounded-full flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-[#bf5e42]" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="text-[17px] font-bold text-white">Our Showrooms</h3>
                <p className="text-gray-400 text-[13px] font-medium">Visit us to see our material selection.</p>
                <p className="text-gray-200 font-bold text-[14px] mt-1">Baniyas West & Mafraq, Abu Dhabi, UAE</p>
              </div>
            </div>

            {/* Email */}
            <div className="bg-[#1b1b1b] p-8 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-white/5 flex items-start gap-6 hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)] transition-all">
              <div className="w-12 h-12 bg-[#2a2a2a] rounded-full flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-[#bf5e42]" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="text-[17px] font-bold text-white">Email Us</h3>
                <p className="text-gray-400 text-[13px] font-medium">Drop us a line anytime.</p>
                <a href="mailto:info@standardgroup.ae" className="text-[#bf5e42] font-bold text-[15px] hover:text-[#8c3c22] transition-colors mt-1">
                  info@standardgroup.ae
                </a>
              </div>
            </div>
            
            {/* Hours */}
            <div className="bg-[#1b1b1b] p-8 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-white/5 flex items-start gap-6 hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)] transition-all">
              <div className="w-12 h-12 bg-[#2a2a2a] rounded-full flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-[#bf5e42]" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="text-[17px] font-bold text-white">Working Hours</h3>
                <p className="text-gray-400 text-[13px] font-medium">We are open 6 days a week.</p>
                <p className="text-gray-200 font-bold text-[14px] mt-1">Mon - Sat: 8:00 AM - 6:00 PM</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="flex-[1.2] bg-[#1b1b1b] p-10 md:p-12 lg:p-14 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.15)] border border-white/5 flex flex-col justify-center">
            <div className="mb-10">
              <span className="text-[#bf5e42] font-bold tracking-widest text-[10px] uppercase mb-4 block">
                Send a message
              </span>
              <h2 className="text-3xl font-bold text-white tracking-tight">Let's work together.</h2>
            </div>
            
            <form className="flex flex-col gap-6">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-1 flex flex-col gap-2.5">
                  <label htmlFor="name" className="text-[12px] font-bold text-gray-400 tracking-wider uppercase">Full Name *</label>
                  <input type="text" id="name" placeholder="John Doe" className="w-full bg-white border border-gray-200 rounded-md px-5 py-4 outline-none focus:border-[#bf5e42] transition-all text-[14px] text-[#111] placeholder:text-gray-400 font-medium" />
                </div>
                <div className="flex-1 flex flex-col gap-2.5">
                  <label htmlFor="phone" className="text-[12px] font-bold text-gray-400 tracking-wider uppercase">Phone Number *</label>
                  <input type="tel" id="phone" placeholder="+971 50 000 0000" className="w-full bg-white border border-gray-200 rounded-md px-5 py-4 outline-none focus:border-[#bf5e42] transition-all text-[14px] text-[#111] placeholder:text-gray-400 font-medium" />
                </div>
              </div>

              <div className="flex flex-col gap-2.5">
                <label htmlFor="email" className="text-[12px] font-bold text-gray-400 tracking-wider uppercase">Email Address</label>
                <input type="email" id="email" placeholder="john@example.com" className="w-full bg-white border border-gray-200 rounded-md px-5 py-4 outline-none focus:border-[#bf5e42] transition-all text-[14px] text-[#111] placeholder:text-gray-400 font-medium" />
              </div>

              <div className="flex flex-col gap-2.5">
                <label htmlFor="company" className="text-[12px] font-bold text-gray-400 tracking-wider uppercase">Company Name (Optional)</label>
                <input type="text" id="company" placeholder="ABC Contracting LLC" className="w-full bg-white border border-gray-200 rounded-md px-5 py-4 outline-none focus:border-[#bf5e42] transition-all text-[14px] text-[#111] placeholder:text-gray-400 font-medium" />
              </div>

              <div className="flex flex-col gap-2.5">
                <label htmlFor="message" className="text-[12px] font-bold text-gray-400 tracking-wider uppercase">Message / Material List *</label>
                <textarea id="message" rows={5} placeholder="Please provide details about your inquiry or required materials..." className="w-full bg-white border border-gray-200 rounded-md px-5 py-4 outline-none focus:border-[#bf5e42] transition-all resize-none text-[14px] text-[#111] placeholder:text-gray-400 font-medium"></textarea>
              </div>

              <button type="button" className="bg-[#b55239] hover:bg-red-800 text-white font-bold text-[12px] uppercase tracking-widest py-4 md:py-5 px-8 rounded-md transition-colors mt-4">
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </main>
  );
}
