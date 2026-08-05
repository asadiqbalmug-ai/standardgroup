import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="w-full min-h-screen bg-gray-50 flex flex-col">
      {/* Header Banner */}
      <div className="w-full bg-[#091522] py-16 md:py-24 px-4">
        <div className="max-w-[1400px] mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">Contact Us</h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Whether you need a bulk quote, technical support, or have a general inquiry, our team is ready to help you build better.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full flex-1 max-w-[1400px] mx-auto px-4 md:px-12 py-12 md:py-20 -mt-10 relative z-10">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Contact Information Cards */}
          <div className="flex-1 flex flex-col gap-6">
            {/* Phone */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex items-start gap-5">
              <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#091522] mb-1">Call or WhatsApp</h3>
                <p className="text-gray-500 mb-2">Available for fast quotes and support.</p>
                <a href="tel:+971555599508" className="text-[#1a365d] font-bold text-lg hover:text-yellow-500 transition-colors">
                  +971 55 559 9508
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex items-start gap-5">
              <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#091522] mb-1">Our Showrooms</h3>
                <p className="text-gray-500 mb-2">Visit us to see our material selection.</p>
                <p className="text-[#1a365d] font-bold">Baniyas West & Mafraq, Abu Dhabi, UAE</p>
              </div>
            </div>

            {/* Email */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex items-start gap-5">
              <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#091522] mb-1">Email Us</h3>
                <p className="text-gray-500 mb-2">Drop us a line anytime.</p>
                <a href="mailto:info@standardgroup.ae" className="text-[#1a365d] font-bold hover:text-yellow-500 transition-colors">
                  info@standardgroup.ae
                </a>
              </div>
            </div>
            
            {/* Hours */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex items-start gap-5">
              <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#091522] mb-1">Working Hours</h3>
                <p className="text-gray-500 mb-2">We are open 6 days a week.</p>
                <p className="text-[#1a365d] font-bold">Mon - Sat: 8:00 AM - 6:00 PM</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="flex-1 bg-white p-8 md:p-12 rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-[#091522] mb-6">Send us a message</h2>
            <form className="flex flex-col gap-6">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-1 flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-bold text-gray-700">Full Name *</label>
                  <input type="text" id="name" placeholder="John Doe" className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-3 outline-none focus:border-yellow-400 focus:bg-white transition-all" />
                </div>
                <div className="flex-1 flex flex-col gap-2">
                  <label htmlFor="phone" className="text-sm font-bold text-gray-700">Phone Number *</label>
                  <input type="tel" id="phone" placeholder="+971 50 000 0000" className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-3 outline-none focus:border-yellow-400 focus:bg-white transition-all" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-bold text-gray-700">Email Address</label>
                <input type="email" id="email" placeholder="john@example.com" className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-3 outline-none focus:border-yellow-400 focus:bg-white transition-all" />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="company" className="text-sm font-bold text-gray-700">Company Name (Optional)</label>
                <input type="text" id="company" placeholder="ABC Contracting LLC" className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-3 outline-none focus:border-yellow-400 focus:bg-white transition-all" />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-bold text-gray-700">Message / Material List *</label>
                <textarea id="message" rows={5} placeholder="Please provide details about your inquiry or required materials..." className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-3 outline-none focus:border-yellow-400 focus:bg-white transition-all resize-none"></textarea>
              </div>

              <button type="button" className="bg-[#f6c000] hover:bg-yellow-500 text-[#091522] font-extrabold text-lg py-4 rounded-md transition-colors mt-2">
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </main>
  );
}
