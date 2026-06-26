import * as Icons from "@/components/common/Icons";

export default function PortfolioHighlights() {
  const highlights = [
    {
      id: "ph-1",
      title: "10+ Years Building Homes",
      description: "Over a decade of crafting bespoke residential environments — from eco-cottages to luxury glass villas — with an unwavering commitment to quality.",
      iconName: "Building2",
      iconBg: "bg-primary text-mint",
      color: "from-emerald-500/10 to-primary/5",
    },
    {
      id: "ph-2",
      title: "Construction Quality Standards",
      description: "Every build undergoes multi-phase inspections verified by LEED-certified supervisors and structural engineers adhering to international building codes.",
      iconName: "ShieldCheck",
      iconBg: "bg-accent text-mint",
      color: "from-teal-500/10 to-accent/5",
    },
    {
      id: "ph-3",
      title: "Project Delivery Excellence",
      description: "Using BIM-integrated scheduling and critical-path tracking, we have maintained a 97% on-time delivery record across 500+ projects.",
      iconName: "Clock",
      iconBg: "bg-primary text-mint",
      color: "from-emerald-500/10 to-primary/5",
    },
    {
      id: "ph-4",
      title: "Company Strengths",
      description: "Our multidisciplinary team of structural engineers, sustainability coordinators, interior designers, and builders operate as one integrated unit.",
      iconName: "Users",
      iconBg: "bg-accent text-mint",
      color: "from-teal-500/10 to-accent/5",
    },
    {
      id: "ph-5",
      title: "What Makes Us Different",
      description: "Transparent pricing, dedicated project managers, real-time 3D progress walkthroughs, and post-handover support distinguish I Constructions from every competitor.",
      iconName: "Award",
      iconBg: "bg-primary text-mint",
      color: "from-emerald-500/10 to-primary/5",
    },
    {
      id: "ph-6",
      title: "Sustainable Construction",
      description: "From passive cooling systems to solar-integrated roofing and rainwater harvesting, we design for long-term environmental stewardship.",
      iconName: "Globe",
      iconBg: "bg-accent text-mint",
      color: "from-teal-500/10 to-accent/5",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-8 h-[2px] bg-primary" />
            <span className="font-poppins font-bold text-xs uppercase tracking-widest text-primary">
              Why We Stand Out
            </span>
            <span className="w-8 h-[2px] bg-primary" />
          </div>
          <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-slate-dark leading-tight">
            The I Constructions Difference
          </h2>
          <p className="font-sans text-slate-light text-sm sm:text-base mt-4">
            Our strengths aren't accidental — they're the result of decade-long investment in people, process, and precision.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {highlights.map((item) => {
            const IconComponent = Icons[item.iconName] || Icons.HardHat;
            return (
              <div
                key={item.id}
                className="relative group bg-white border border-primary/5 rounded-2xl p-8 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden"
              >
                {/* Hover gradient overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`}
                />

                {/* Icon */}
                <div className={`p-4 rounded-xl inline-block shadow-md transition-transform duration-300 group-hover:scale-110 ${item.iconBg}`}>
                  <IconComponent className="h-6 w-6" />
                </div>

                {/* Title */}
                <h3 className="font-poppins font-bold text-xl text-slate-dark mt-6 mb-3 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="font-sans text-slate-light text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
