import { Truck, ShieldCheck, Award, RefreshCw } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: ShieldCheck,
      title: "20+",
      subtitle: "Years of Trust",
      desc: "Serving the UAE since 2003"
    },
    {
      icon: Award,
      title: "500+",
      subtitle: "Quality Products",
      desc: "Wide range of building materials"
    },
    {
      icon: RefreshCw,
      title: "1000+",
      subtitle: "Happy Clients",
      desc: "Builders, contractors & distributors"
    },
    {
      icon: Truck,
      title: "Nationwide\nDelivery",
      subtitle: "Fast & reliable delivery\nacross UAE",
      desc: ""
    }
  ];

  return (
    <section className="w-full px-4 md:px-12 pt-0 pb-8 md:pb-12 bg-white">
      <div className="max-w-[1400px] mx-auto bg-[#091522] rounded-2xl md:rounded-3xl shadow-xl overflow-hidden">
        <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-[#1a2d40]">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div 
                key={idx} 
                className="flex-1 flex items-start gap-4 py-8 px-6 md:px-8"
              >
                {/* Icon */}
                <div className="flex items-center justify-center shrink-0 mt-1">
                  <Icon className="w-8 h-8 text-red-600" strokeWidth={1.5} />
                </div>
                {/* Text Content */}
                <div className="flex flex-col gap-1">
                  <span className="font-extrabold text-white text-2xl leading-none whitespace-pre-line">
                    {feature.title}
                  </span>
                  <span className="font-bold text-gray-300 text-sm md:text-[15px] whitespace-pre-line mt-1">
                    {feature.subtitle}
                  </span>
                  {feature.desc && (
                    <span className="text-gray-500 text-xs md:text-[13px] leading-relaxed mt-1 pr-4">
                      {feature.desc}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
