"use client";

import * as Icons from "@/components/common/Icons";

export default function WhyChooseUs() {
  const strengths = [
    {
      id: "wcu-home-1",
      title: "Experienced Team",
      description: "Our roster comprises certified architects, LEED coordinators, master builders, and veteran project engineers with decades of hands-on expertise.",
      iconName: "Users",
      color: "from-emerald-500/10 to-primary/5",
      iconBg: "bg-primary text-mint",
    },
    {
      id: "wcu-home-2",
      title: "Premium Quality",
      description: "We partner with top global manufacturers to source premium structural steel, concrete, sustainable insulation, and finishes that withstand time.",
      iconName: "Award",
      color: "from-teal-500/10 to-accent/5",
      iconBg: "bg-accent text-mint",
    },
    {
      id: "wcu-home-3",
      title: "Affordable Pricing",
      description: "Through detailed bill of materials and strategic sourcing plans, we ensure pricing configurations that prevent cost overruns and maintain budget boundaries.",
      iconName: "Target",
      color: "from-emerald-500/10 to-primary/5",
      iconBg: "bg-primary text-mint",
    },
    {
      id: "wcu-home-4",
      title: "Timely Delivery",
      description: "Using advanced BIM software and critical path project scheduling, we guarantee prompt delivery of all residential and commercial building layouts.",
      iconName: "Clock",
      color: "from-teal-500/10 to-accent/5",
      iconBg: "bg-accent text-mint",
    },
    {
      id: "wcu-home-5",
      title: "Trusted Service",
      description: "We practice transparent and legal construction governance, ensuring all permits, zoning approvals, and safety inspections are handled cleanly.",
      iconName: "HeartHandshake",
      color: "from-emerald-500/10 to-primary/5",
      iconBg: "bg-primary text-mint",
    },
    {
      id: "wcu-home-6",
      title: "Customer Satisfaction",
      description: "We work with clients in close alignment, providing detailed progress visualizers, on-site walkthrough audits, and premium post-handover support.",
      iconName: "Heart",
      color: "from-teal-500/10 to-accent/5",
      iconBg: "bg-accent text-mint",
    },
  ];

  return (
    <section className="py-20 bg-mint">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-8 h-[2px] bg-primary" />
            <span className="font-poppins font-bold text-xs uppercase tracking-widest text-primary">
              Our Benchmarks
            </span>
            <span className="w-8 h-[2px] bg-primary" />
          </div>
          <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-slate-dark leading-tight">
            Why Clients Entrust Us With Their Dreams
          </h2>
          <p className="font-sans text-slate-light text-sm sm:text-base mt-4">
            We hold ourselves to a higher benchmark of safety, design innovation, structural longevity, and financial discipline.
          </p>
        </div>

        {/* Six Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {strengths.map((strength) => {
            const IconComponent = Icons[strength.iconName] || Icons.HardHat;
            return (
              <div
                key={strength.id}
                className="relative group bg-white border border-primary/5 rounded-2xl p-8 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden"
              >
                {/* Decorative Hover Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${strength.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`} />
                
                {/* Icon Container */}
                <div className={`p-4 rounded-xl inline-block shadow-md transition-transform duration-300 group-hover:scale-110 ${strength.iconBg}`}>
                  <IconComponent className="h-6 w-6" />
                </div>

                {/* Title */}
                <h3 className="font-poppins font-bold text-xl text-slate-dark mt-6 mb-3 group-hover:text-primary transition-colors">
                  {strength.title}
                </h3>

                {/* Description */}
                <p className="font-sans text-slate-light text-sm leading-relaxed">
                  {strength.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
