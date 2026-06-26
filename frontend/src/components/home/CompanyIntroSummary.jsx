"use client";

import * as Icons from "@/components/common/Icons";

export default function CompanyIntroSummary({ companyInfo }) {
  const highlightCards = [
    {
      id: "intro-card-1",
      title: "Years of Experience",
      value: "10+",
      desc: "Architectural mastery & contracting excellence.",
      iconName: "Clock",
      iconBg: "bg-primary text-mint",
      hoverBg: "from-emerald-500/10 to-primary/5",
    },
    {
      id: "intro-card-2",
      title: "Completed Projects",
      value: "500+",
      desc: "Residential, commercial, and infrastructure builds.",
      iconName: "Trophy",
      iconBg: "bg-accent text-mint",
      hoverBg: "from-teal-500/10 to-accent/5",
    },
    {
      id: "intro-card-3",
      title: "Happy Clients",
      value: "1,000+",
      desc: "Long-term relationships built on absolute trust.",
      iconName: "Users",
      iconBg: "bg-primary text-mint",
      hoverBg: "from-emerald-500/10 to-primary/5",
    },
    {
      id: "intro-card-4",
      title: "Professional Team",
      value: "50+",
      desc: "Engineers, architects, and project managers.",
      iconName: "Compass",
      iconBg: "bg-accent text-mint",
      hoverBg: "from-teal-500/10 to-accent/5",
    },
  ];

  return (
    <section id="company-intro" className="py-20 bg-mint scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Horizontal Split Layout: Text Introduction & Sub-features */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-[2px] bg-primary" />
              <span className="font-poppins font-bold text-xs uppercase tracking-widest text-primary">
                Who We Are
              </span>
            </div>
            <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-slate-dark leading-tight">
              Crafting Structures That Stand the Test of Time
            </h2>
          </div>
          <div className="lg:col-span-7">
            <p className="font-sans text-slate-light text-base leading-relaxed">
              {companyInfo.detailedDescription}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 text-sm text-slate-dark font-poppins font-semibold">
              <div className="flex items-center gap-2">
                <span className="text-primary font-bold">✔</span> Quality-Driven Engineering
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary font-bold">✔</span> Customer-First Communication
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary font-bold">✔</span> Absolute Pricing Transparency
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary font-bold">✔</span> On-Time Milestone Deliveries
              </div>
            </div>
          </div>
        </div>

        {/* Highlight Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlightCards.map((card) => {
            const IconComponent = Icons[card.iconName] || Icons.Building2;
            return (
              <div
                key={card.id}
                className="relative group bg-white border border-primary/5 rounded-2xl p-8 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden"
              >
                {/* Hover Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${card.hoverBg} opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`}
                />
                
                {/* Icon */}
                <div
                  className={`p-4 rounded-xl inline-block shadow-md transition-transform duration-300 group-hover:scale-110 ${card.iconBg}`}
                >
                  <IconComponent className="h-6 w-6" />
                </div>

                {/* Highlight Value */}
                <div className="font-poppins font-bold text-3xl text-slate-dark mt-6">
                  {card.value}
                </div>

                {/* Card Title */}
                <h3 className="font-poppins font-bold text-base text-slate-dark mt-1 mb-2">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="font-sans text-slate-light text-xs leading-relaxed">
                  {card.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
