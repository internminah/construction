import { ShieldCheck, Compass, HardHat } from "@/components/common/Icons";

export default function ServicesOverview() {
  const pillars = [
    {
      title: "Safety Certified",
      desc: "Zero-accident site policy enforced by certified environmental safety managers.",
      icon: HardHat,
    },
    {
      title: "BIM Integrated Planning",
      desc: "3D virtual model mockups prevent field errors and optimize spatial efficiency.",
      icon: Compass,
    },
    {
      title: "LEED Sustainable Build",
      desc: "Commitment to energy-efficient components, raw materials, and insulation systems.",
      icon: ShieldCheck,
    },
  ];

  return (
    <section id="overview" className="py-20 bg-mint scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          {/* Header Description (Takes 2 Columns on desktop) */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <span className="w-12 h-[2px] bg-primary rounded" />
              <span className="font-poppins font-bold text-xs uppercase tracking-widest text-primary">
                Overview
              </span>
            </div>
            
            <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-slate-dark leading-tight">
              Engineering Marvels and Custom Architectural Environments
            </h2>
            
            <p className="font-sans text-slate-light text-base leading-relaxed">
              At I Constructions, we deliver end-to-end solutions that resolve complex engineering mechanics and architectural aesthetics. Our service catalog is divided into specialized construction divisions, ensuring expert supervision at every phase.
            </p>
            
            <p className="font-sans text-slate-light text-base leading-relaxed">
              Whether you are an institutional client seeking high-density corporate offices or a private homeowner building a smart luxury estate, we orchestrate all structural steps—from soil checks and zoning permissions to detailed interior styling.
            </p>
          </div>

          {/* Pillars List (Takes 1 Column) */}
          <div className="lg:col-span-1 flex flex-col gap-6 bg-white p-8 rounded-2xl border border-primary/5 shadow-lg">
            <h3 className="font-poppins font-bold text-lg text-slate-dark mb-2">
              Project Standards
            </h3>
            
            <div className="space-y-6">
              {pillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div key={pillar.title} className="flex gap-4 items-start">
                    <div className="p-2.5 bg-primary/10 text-primary rounded-lg shrink-0">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-poppins font-bold text-sm text-slate-dark">
                        {pillar.title}
                      </h4>
                      <p className="font-sans text-xs text-slate-light mt-1 leading-relaxed">
                        {pillar.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
