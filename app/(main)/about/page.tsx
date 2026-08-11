import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="w-full min-h-screen flex flex-col font-sans bg-[#fcfbf9]">

      {/* 1. Hero & Statistics */}
      <section className="w-full pt-16 md:pt-24 pb-16 px-4 md:px-12 bg-white border-y border-gray-100">
        <div className="max-w-[1200px] mx-auto">
          {/* Hero Content */}
          <div className="max-w-4xl mb-8 md:mb-12 text-center mx-auto">
            <span className="text-[#bf5e42] font-bold text-[11px] tracking-widest uppercase mb-2 block">
              We Set Standards.
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-[56px] font-bold text-[#111] mb-8 tracking-tight leading-[1.15]">
              About Us
            </h1>
            <p className="text-gray-500 text-base md:text-lg leading-relaxed font-medium">
              Since 2003, Standard Group has been the UAE's most trusted partner for building materials. From foundational raw aggregates to high-end luxury bathroom fittings, we supply the comprehensive inventory your project demands, backed by two decades of localized expertise, exclusive global brand partnerships, and a relentless commitment to uncompromising quality.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Grid - Full Width */}
      <div className="w-full border-y border-gray-200 bg-white">
        <div className="max-w-[1200px] mx-auto py-8 md:py-10 px-4 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
            <div className="flex flex-col gap-2">
              <span className="text-4xl md:text-5xl font-bold text-[#111]">20+</span>
              <span className="text-gray-500 text-[12px] font-bold uppercase tracking-wider mt-2">Years Experience</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-4xl md:text-5xl font-bold text-[#111]">31+</span>
              <span className="text-gray-500 text-[12px] font-bold uppercase tracking-wider mt-2">Global Brands</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-4xl md:text-5xl font-bold text-[#111]">500+</span>
              <span className="text-gray-500 text-[12px] font-bold uppercase tracking-wider mt-2">Products</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-4xl md:text-5xl font-bold text-[#111]">2</span>
              <span className="text-gray-500 text-[12px] font-bold uppercase tracking-wider mt-2">Locations in UAE</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Core Values */}
      <section className="w-full pt-10 md:pt-16 pb-16 px-4 md:px-12 relative z-10">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#bf5e42] font-bold text-[11px] tracking-widest uppercase mb-4 block">
              What Drives Us
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-[40px] font-bold text-[#111] tracking-tight">Our Core Values</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
             {/* Value 1 */}
             <div className="bg-[#1b1b1b] p-10 md:p-12 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)] transition-all duration-300 border border-white/5 flex flex-col items-start gap-4">
               <span className="text-[#bf5e42] font-bold text-lg mb-2 block">01</span>
               <h3 className="text-xl md:text-2xl font-bold text-white">Quality First</h3>
               <p className="text-gray-400 text-[14px] leading-relaxed font-medium">
                 We never compromise on material standards. Every product in our inventory meets or exceeds strict international certifications, ensuring your projects stand the test of time.
               </p>
             </div>
             {/* Value 2 */}
             <div className="bg-[#1b1b1b] p-10 md:p-12 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)] transition-all duration-300 border border-white/5 flex flex-col items-start gap-4">
               <span className="text-[#bf5e42] font-bold text-lg mb-2 block">02</span>
               <h3 className="text-xl md:text-2xl font-bold text-white">Partnership</h3>
               <p className="text-gray-400 text-[14px] leading-relaxed font-medium">
                 We don't just supply materials; we work alongside our clients from initial specification to final installation, ensuring project success at every critical stage.
               </p>
             </div>
             {/* Value 3 */}
             <div className="bg-[#1b1b1b] p-10 md:p-12 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)] transition-all duration-300 border border-white/5 flex flex-col items-start gap-4">
               <span className="text-[#bf5e42] font-bold text-lg mb-2 block">03</span>
               <h3 className="text-xl md:text-2xl font-bold text-white">Reliability</h3>
               <p className="text-gray-400 text-[14px] leading-relaxed font-medium">
                 In construction, time is money. We guarantee on-time delivery, consistent stock levels, and completely transparent pricing — no surprises, no costly delays.
               </p>
             </div>
             {/* Value 4 */}
             <div className="bg-[#1b1b1b] p-10 md:p-12 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)] transition-all duration-300 border border-white/5 flex flex-col items-start gap-4">
               <span className="text-[#bf5e42] font-bold text-lg mb-2 block">04</span>
               <h3 className="text-xl md:text-2xl font-bold text-white">Innovation</h3>
               <p className="text-gray-400 text-[14px] leading-relaxed font-medium">
                 The construction industry is evolving. We continuously expand our range to bring the latest, most sustainable global building solutions directly to the UAE market.
               </p>
             </div>
          </div>
        </div>
      </section>

      {/* 3. Journey / Timeline */}
      <section className="w-full bg-[#1b1b1b] py-20 md:py-32 px-4 md:px-12 relative overflow-hidden rounded-[32px] md:rounded-[48px] max-w-[1400px] mx-auto mb-12 shadow-2xl">
        <div className="max-w-[1000px] mx-auto relative z-10">
          <div className="text-center mb-20">
            <span className="text-[#bf5e42] font-bold text-[11px] tracking-widest uppercase mb-4 block">Our Journey</span>
            <h2 className="text-3xl md:text-4xl lg:text-[40px] font-bold text-white tracking-tight">Two Decades of Growth</h2>
          </div>

          {/* Timeline Container */}
          <div className="relative">
            {/* Center Line (Desktop) / Left Line (Mobile) */}
            <div className="absolute left-[16px] md:left-1/2 top-0 bottom-0 w-[1px] bg-white/10 md:-translate-x-1/2"></div>

            <div className="flex flex-col gap-12 md:gap-16">

              {/* Item 1 */}
              <div className="relative flex items-center md:justify-center group">
                <div className="absolute left-[13px] md:left-1/2 w-2 h-2 rounded-full bg-[#bf5e42] md:-translate-x-1/2 group-hover:scale-150 transition-all duration-300"></div>
                <div className="ml-12 md:ml-0 md:w-1/2 md:pr-16 text-left md:text-right flex flex-col items-start md:items-end">
                  <span className="text-[#bf5e42] font-bold text-[13px] mb-2">2003</span>
                  <h3 className="text-white font-bold text-xl md:text-2xl mb-3">Founded in Abu Dhabi</h3>
                  <p className="text-gray-400 text-[14px] leading-relaxed font-medium">
                    Started as a small trading company supplying raw building materials to local residential contractors in the capital.
                  </p>
                </div>
                <div className="hidden md:block md:w-1/2"></div>
              </div>

              {/* Item 2 */}
              <div className="relative flex items-center md:justify-center group">
                <div className="absolute left-[13px] md:left-1/2 w-2 h-2 rounded-full bg-[#bf5e42] md:-translate-x-1/2 group-hover:scale-150 transition-all duration-300"></div>
                <div className="hidden md:block md:w-1/2"></div>
                <div className="ml-12 md:ml-0 md:w-1/2 md:pl-16 text-left flex flex-col items-start">
                  <span className="text-[#bf5e42] font-bold text-[13px] mb-2">2008</span>
                  <h3 className="text-white font-bold text-xl md:text-2xl mb-3">Brand Partnerships Begin</h3>
                  <p className="text-gray-400 text-[14px] leading-relaxed font-medium">
                    Secured exclusive distribution rights for major European and Asian sanitary and piping brands, drastically expanding our portfolio.
                  </p>
                </div>
              </div>

              {/* Item 3 */}
              <div className="relative flex items-center md:justify-center group">
                <div className="absolute left-[13px] md:left-1/2 w-2 h-2 rounded-full bg-[#bf5e42] md:-translate-x-1/2 group-hover:scale-150 transition-all duration-300"></div>
                <div className="ml-12 md:ml-0 md:w-1/2 md:pr-16 text-left md:text-right flex flex-col items-start md:items-end">
                  <span className="text-[#bf5e42] font-bold text-[13px] mb-2">2015</span>
                  <h3 className="text-white font-bold text-xl md:text-2xl mb-3">500+ Product Range</h3>
                  <p className="text-gray-400 text-[14px] leading-relaxed font-medium">
                    Expanded from raw aggregates to complete finishing solutions — including luxury tiles, paints, waterproofing, and hardware.
                  </p>
                </div>
                <div className="hidden md:block md:w-1/2"></div>
              </div>

              {/* Item 4 */}
              <div className="relative flex items-center md:justify-center group">
                <div className="absolute left-[13px] md:left-1/2 w-2 h-2 rounded-full bg-[#bf5e42] md:-translate-x-1/2 group-hover:scale-150 transition-all duration-300"></div>
                <div className="hidden md:block md:w-1/2"></div>
                <div className="ml-12 md:ml-0 md:w-1/2 md:pl-16 text-left flex flex-col items-start">
                  <span className="text-[#bf5e42] font-bold text-[13px] mb-2">2020</span>
                  <h3 className="text-white font-bold text-xl md:text-2xl mb-3">Second Location</h3>
                  <p className="text-gray-400 text-[14px] leading-relaxed font-medium">
                    Opened the massive Mafraq showroom and warehouse to better serve northern Abu Dhabi and Al Ain corridor mega-projects.
                  </p>
                </div>
              </div>

              {/* Item 5 */}
              <div className="relative flex items-center md:justify-center group">
                <div className="absolute left-[13px] md:left-1/2 w-2 h-2 rounded-full bg-[#bf5e42] md:-translate-x-1/2 group-hover:scale-150 transition-all duration-300"></div>
                <div className="ml-12 md:ml-0 md:w-1/2 md:pr-16 text-left md:text-right flex flex-col items-start md:items-end">
                  <span className="text-[#bf5e42] font-bold text-[13px] mb-2">2024</span>
                  <h3 className="text-white font-bold text-xl md:text-2xl mb-3">Digital Transformation</h3>
                  <p className="text-gray-400 text-[14px] leading-relaxed font-medium">
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
      <section className="w-full py-20 md:py-24 px-4 text-center">
        <div className="max-w-[800px] mx-auto flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl lg:text-[40px] font-bold text-[#111] mb-6 tracking-tight">Ready to Build?</h2>
          <p className="text-gray-500 text-[15px] mb-10 max-w-xl mx-auto leading-relaxed font-medium">
            Whether you are starting a new mega-project or simply restocking your site, our expert team is here to help you get the best materials on time.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <Link
              href="/categories"
              className="w-full sm:w-auto bg-[#b55239] hover:bg-red-800 text-white font-bold py-4 px-8 rounded-md transition-colors uppercase tracking-widest text-[11px]"
            >
              Browse Products
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto bg-transparent border-2 border-gray-200 text-[#111] hover:border-[#111] font-bold py-4 px-8 rounded-md transition-colors uppercase tracking-widest text-[11px]"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
