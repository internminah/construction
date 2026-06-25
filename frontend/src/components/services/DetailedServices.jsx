import * as Icons from "@/components/common/Icons";

export default function DetailedServices({ services }) {
  const scopeData = {
    residential: [
      "Custom single-family luxury estates",
      "Multi-family residential apartments",
      "Structural framing & roofing design",
      "Green home building certifications"
    ],
    commercial: [
      "Grade-A corporate headquarter blocks",
      "Retail showrooms & mall spaces",
      "Industrial distribution facilities",
      "Zoning & local building permissions"
    ],
    interior: [
      "Bespoke material selection & layouts",
      "Acoustic planning & spatial designs",
      "Custom cabinetry & millwork detailing",
      "Curated color schemes & furniture"
    ],
    renovation: [
      "Historic landmark retrofitting",
      "Residential footprint expansions",
      "Seismic & structural strengthening",
      "Commercial facade upgrades"
    ],
    engineering: [
      "Geotechnical surveys & site analysis",
      "Load-bearing structural modeling",
      "Foundation system engineering",
      "Stormwater & drainage schematics"
    ],
    management: [
      "Material procurement & bidding governance",
      "BIM scheduling & critical path timeline",
      "Continuous on-site quality testing",
      "Budget control & risk audits"
    ]
  };

  const { ShieldCheck } = Icons;

  return (
    <section className="py-20 bg-mint">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Alternating Service Cards */}
        <div className="flex flex-col gap-24">
          {services.map((service, index) => {
            const isEven = index % 2 === 0;
            const scope = scopeData[service.slug] || [];
            
            return (
              <div
                key={service.id}
                id={service.slug}
                className={`flex flex-col lg:flex-row gap-12 lg:gap-16 items-center scroll-mt-24 ${
                  isEven ? "" : "lg:flex-row-reverse"
                }`}
              >
                {/* Column 1: Image wrapper with premium borders */}
                <div className="w-full lg:w-1/2 relative group">
                  <div className="absolute -top-4 -left-4 w-72 h-72 bg-primary/5 rounded-3xl blur-2xl -z-10 group-hover:bg-primary/10 transition-colors" />
                  <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-accent/5 rounded-3xl blur-2xl -z-10 group-hover:bg-accent/10 transition-colors" />
                  
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-primary/10 transition-transform duration-500 group-hover:scale-[1.005]">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-[380px] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  </div>
                </div>

                {/* Column 2: Detailed Text Scope */}
                <div className="w-full lg:w-1/2 flex flex-col gap-6">
                  <div className="flex items-center gap-2">
                    <span className="w-8.5 h-[2px] bg-primary rounded" />
                    <span className="font-poppins font-bold text-xs uppercase tracking-widest text-primary">
                      Division {index + 1}
                    </span>
                  </div>

                  <h3 className="font-poppins font-bold text-3xl text-slate-dark leading-tight">
                    {service.title}
                  </h3>

                  <p className="font-sans text-slate-light text-base leading-relaxed">
                    {service.details}
                  </p>

                  {/* Bulleted List */}
                  <div>
                    <h4 className="font-poppins font-bold text-sm text-slate-dark uppercase tracking-wider mb-4">
                      Scope of Services:
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {scope.map((item, bulletIdx) => (
                        <li key={bulletIdx} className="flex items-start gap-3">
                          <div className="p-1 bg-primary/10 text-primary rounded-md shrink-0 mt-0.5">
                            <ShieldCheck className="h-4 w-4" />
                          </div>
                          <span className="font-sans text-sm text-slate-light leading-snug">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA link to Quote form */}
                  <div className="mt-4">
                    <a
                      href="#quote"
                      className="inline-flex items-center gap-1 font-poppins font-bold text-sm text-primary hover:text-primary-light transition-colors"
                    >
                      Request Consultation &rarr;
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
