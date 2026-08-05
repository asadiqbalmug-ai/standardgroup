import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="w-full min-h-screen flex flex-col font-sans bg-white">
      
      {/* 1. Hero & Statistics */}
      <section className="w-full pt-12 md:pt-16 pb-12 px-4 md:px-12">
        <div className="max-w-[1200px] mx-auto">
          {/* Hero Content */}
          <div className="max-w-4xl mb-12">
            <span className="text-yellow-500 font-bold text-sm tracking-[0.2em] uppercase mb-4 block">About Us</span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-[#091522] mb-6 tracking-tight">We Set Standards.</h1>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed">
              Since 2003, Standard Group has been the UAE's most trusted partner for building materials. From foundational raw aggregates to high-end luxury bathroom fittings, we supply the comprehensive inventory your project demands — backed by two decades of localized expertise, exclusive global brand partnerships, and a relentless commitment to uncompromising quality.
            </p>
          </div>

          <hr className="border-gray-200 mb-10" />

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col gap-2">
              <span className="text-4xl md:text-5xl font-extrabold text-[#091522]">20+</span>
              <span className="text-gray-500 text-sm font-medium">Years Experience</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-4xl md:text-5xl font-extrabold text-[#091522]">31+</span>
              <span className="text-gray-500 text-sm font-medium">Global Brands</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-4xl md:text-5xl font-extrabold text-[#091522]">500+</span>
              <span className="text-gray-500 text-sm font-medium">Products</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-4xl md:text-5xl font-extrabold text-[#091522]">2</span>
              <span className="text-gray-500 text-sm font-medium">Locations in UAE</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Core Values */}
      <section className="w-full pt-16 md:pt-24 pb-12 md:pb-20 px-4 md:px-12">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-10">
             <span className="text-yellow-500 font-bold text-xs tracking-[0.2em] uppercase mb-3 block">What Drives Us</span>
             <h2 className="text-3xl md:text-4xl font-extrabold text-[#091522]">Our Core Values</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {/* Value 1 */}
             <div className="bg-[#091522] p-8 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-[#1a2d40]">
               <span className="text-yellow-400 font-bold text-sm mb-4 block">01</span>
               <h3 className="text-lg md:text-xl font-extrabold text-white mb-3">Quality First</h3>
               <p className="text-gray-300 text-sm leading-relaxed">
                 We never compromise on material standards. Every product in our inventory meets or exceeds strict international certifications, ensuring your projects stand the test of time.
               </p>
             </div>
             {/* Value 2 */}
             <div className="bg-[#091522] p-8 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-[#1a2d40]">
               <span className="text-yellow-400 font-bold text-sm mb-4 block">02</span>
               <h3 className="text-lg md:text-xl font-extrabold text-white mb-3">Partnership</h3>
               <p className="text-gray-300 text-sm leading-relaxed">
                 We don't just supply materials; we work alongside our clients from initial specification to final installation, ensuring project success at every critical stage.
               </p>
             </div>
             {/* Value 3 */}
             <div className="bg-[#091522] p-8 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-[#1a2d40]">
               <span className="text-yellow-400 font-bold text-sm mb-4 block">03</span>
               <h3 className="text-lg md:text-xl font-extrabold text-white mb-3">Reliability</h3>
               <p className="text-gray-300 text-sm leading-relaxed">
                 In construction, time is money. We guarantee on-time delivery, consistent stock levels, and completely transparent pricing — no surprises, no costly delays.
               </p>
             </div>
             {/* Value 4 */}
             <div className="bg-[#091522] p-8 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-[#1a2d40]">
               <span className="text-yellow-400 font-bold text-sm mb-4 block">04</span>
               <h3 className="text-lg md:text-xl font-extrabold text-white mb-3">Innovation</h3>
               <p className="text-gray-300 text-sm leading-relaxed">
                 The construction industry is evolving. We continuously expand our range to bring the latest, most sustainable global building solutions directly to the UAE market.
               </p>
             </div>
          </div>
        </div>
      </section>

      {/* 3. Journey / Timeline */}
      <section className="w-full bg-[#091522] py-16 px-4 md:px-12 relative overflow-hidden">
        <div className="max-w-[1000px] mx-auto relative z-10">
          <div className="text-center mb-16">
             <span className="text-yellow-400 font-bold text-xs tracking-[0.2em] uppercase mb-3 block">Our Journey</span>
             <h2 className="text-3xl md:text-4xl font-extrabold text-white">Two Decades of Growth</h2>
          </div>

          {/* Timeline Container */}
          <div className="relative">
            {/* Center Line (Desktop) / Left Line (Mobile) */}
            <div className="absolute left-[16px] md:left-1/2 top-0 bottom-0 w-[1px] bg-yellow-400/30 md:-translate-x-1/2"></div>

            <div className="flex flex-col gap-12">
              
              {/* Item 1 */}
              <div className="relative flex items-center md:justify-center group">
                <div className="absolute left-[13px] md:left-1/2 w-2 h-2 rounded-full bg-yellow-400 md:-translate-x-1/2 group-hover:scale-150 group-hover:bg-white transition-all duration-300 shadow-[0_0_10px_rgba(246,192,0,0.8)]"></div>
                <div className="ml-12 md:ml-0 md:w-1/2 md:pr-12 text-left md:text-right flex flex-col items-start md:items-end">
                  <span className="text-yellow-400 font-bold text-sm mb-1">2003</span>
                  <h3 className="text-white font-extrabold text-lg md:text-xl mb-2">Founded in Abu Dhabi</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Started as a small trading company supplying raw building materials to local residential contractors in the capital.
                  </p>
                </div>
                <div className="hidden md:block md:w-1/2"></div>
              </div>

              {/* Item 2 */}
              <div className="relative flex items-center md:justify-center group">
                <div className="absolute left-[13px] md:left-1/2 w-2 h-2 rounded-full bg-yellow-400 md:-translate-x-1/2 group-hover:scale-150 group-hover:bg-white transition-all duration-300 shadow-[0_0_10px_rgba(246,192,0,0.8)]"></div>
                <div className="hidden md:block md:w-1/2"></div>
                <div className="ml-12 md:ml-0 md:w-1/2 md:pl-12 text-left flex flex-col items-start">
                  <span className="text-yellow-400 font-bold text-sm mb-1">2008</span>
                  <h3 className="text-white font-extrabold text-lg md:text-xl mb-2">Brand Partnerships Begin</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Secured exclusive distribution rights for major European and Asian sanitary and piping brands, drastically expanding our portfolio.
                  </p>
                </div>
              </div>

              {/* Item 3 */}
              <div className="relative flex items-center md:justify-center group">
                <div className="absolute left-[13px] md:left-1/2 w-2 h-2 rounded-full bg-yellow-400 md:-translate-x-1/2 group-hover:scale-150 group-hover:bg-white transition-all duration-300 shadow-[0_0_10px_rgba(246,192,0,0.8)]"></div>
                <div className="ml-12 md:ml-0 md:w-1/2 md:pr-12 text-left md:text-right flex flex-col items-start md:items-end">
                  <span className="text-yellow-400 font-bold text-sm mb-1">2015</span>
                  <h3 className="text-white font-extrabold text-lg md:text-xl mb-2">500+ Product Range</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Expanded from raw aggregates to complete finishing solutions — including luxury tiles, paints, waterproofing, and hardware.
                  </p>
                </div>
                <div className="hidden md:block md:w-1/2"></div>
              </div>

              {/* Item 4 */}
              <div className="relative flex items-center md:justify-center group">
                <div className="absolute left-[13px] md:left-1/2 w-2 h-2 rounded-full bg-yellow-400 md:-translate-x-1/2 group-hover:scale-150 group-hover:bg-white transition-all duration-300 shadow-[0_0_10px_rgba(246,192,0,0.8)]"></div>
                <div className="hidden md:block md:w-1/2"></div>
                <div className="ml-12 md:ml-0 md:w-1/2 md:pl-12 text-left flex flex-col items-start">
                  <span className="text-yellow-400 font-bold text-sm mb-1">2020</span>
                  <h3 className="text-white font-extrabold text-lg md:text-xl mb-2">Second Location</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Opened the massive Mafraq showroom and warehouse to better serve northern Abu Dhabi and Al Ain corridor mega-projects.
                  </p>
                </div>
              </div>

              {/* Item 5 */}
              <div className="relative flex items-center md:justify-center group">
                <div className="absolute left-[13px] md:left-1/2 w-2 h-2 rounded-full bg-yellow-400 md:-translate-x-1/2 group-hover:scale-150 group-hover:bg-white transition-all duration-300 shadow-[0_0_10px_rgba(246,192,0,0.8)]"></div>
                <div className="ml-12 md:ml-0 md:w-1/2 md:pr-12 text-left md:text-right flex flex-col items-start md:items-end">
                  <span className="text-yellow-400 font-bold text-sm mb-1">2024</span>
                  <h3 className="text-white font-extrabold text-lg md:text-xl mb-2">Digital Transformation</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Launched a comprehensive online catalog and streamlined enquiry system to facilitate faster procurement for clients nationwide.
                  </p>
                </div>
                <div className="hidden md:block md:w-1/2"></div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 4. CTA */}
      <section className="w-full py-16 px-4 text-center border-b border-gray-200">
        <div className="max-w-[800px] mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#091522] mb-4">Ready to Build?</h2>
          <p className="text-gray-600 text-base mb-8 max-w-xl mx-auto">
            Whether you are starting a new mega-project or simply restocking your site, our expert team is here to help you get the best materials on time.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/categories" 
              className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded-md transition-colors uppercase tracking-wider text-sm"
            >
              Browse Products
            </Link>
            <Link 
              href="/contact" 
              className="w-full sm:w-auto bg-transparent border-2 border-[#091522] text-[#091522] hover:bg-[#091522] hover:text-white font-bold py-3 px-8 rounded-md transition-colors uppercase tracking-wider text-sm"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
