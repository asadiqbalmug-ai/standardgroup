import { Truck, ShieldCheck, PackageOpen, Clock } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: Truck,
      title: "Fast Delivery",
      subtitle: "Abu Dhabi same-day"
    },
    {
      icon: ShieldCheck,
      title: "Certified Products",
      subtitle: "UAE & international std."
    },
    {
      icon: PackageOpen,
      title: "Order on Demand",
      subtitle: "Bulk & custom quantities"
    },
    {
      icon: Clock,
      title: "Support Team",
      subtitle: "Respond within hours"
    }
  ];

  return (
    <section className="w-full relative z-40 px-4 md:px-12 -mt-12 md:-mt-16 pb-8 md:pb-12 bg-transparent pointer-events-none">
      <div className="max-w-[1400px] mx-auto bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 pointer-events-auto">
        <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-gray-100">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div 
                key={idx} 
                className="flex-1 flex items-center justify-center md:justify-start gap-5 py-6 md:py-8 px-6 md:px-10"
              >
                {/* Icon Circle */}
                <div className="w-14 h-14 rounded-full bg-[#fef3c7] flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6 text-[#091522]" strokeWidth={1.5} />
                </div>
                {/* Text */}
                <div className="flex flex-col gap-0.5">
                  <span className="font-bold text-[#091522] text-base">{feature.title}</span>
                  <span className="text-gray-500 text-[13px]">{feature.subtitle}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
