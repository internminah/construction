import * as Icons from "@/components/common/Icons";
import { milestones as defaultMilestones } from "@/lib/data";

export default function Timeline({
  milestones = defaultMilestones,
}) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-8 h-[2px] bg-primary" />
            <span className="font-poppins font-bold text-xs uppercase tracking-widest text-primary">
              Our Journey
            </span>
            <span className="w-8 h-[2px] bg-primary" />
          </div>
          <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-slate-dark leading-tight">
            How We Built Our Reputation
          </h2>
          <p className="font-sans text-slate-light text-sm sm:text-base mt-4">
            A decade of precision, craftsmanship, and trust-building timeline.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative mt-12">
          {/* Vertical Connecting Line (Desktop) */}
          <div className="absolute left-4 md:left-1/2 top-0 h-full w-[2px] bg-mint-dark -translate-x-1/2" />

          {/* Milestones List */}
          <div className="space-y-12">
            {milestones.map((milestone, index) => {
              const IconComponent = Icons[milestone.iconName] || Icons.Building;
              const isEven = index % 2 === 0;
              
              return (
                <div key={milestone.id} className="relative flex flex-col md:flex-row items-start md:items-center">
                  
                  {/* Timeline Dot & Icon */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10">
                    <div className="p-3 rounded-full bg-white border-2 border-primary text-primary shadow-md hover:bg-primary hover:text-white transition-colors duration-300">
                      <IconComponent className="h-5 w-5" />
                    </div>
                  </div>

                  {/* Left Column (Desktop) */}
                  <div className={`w-full md:w-1/2 pl-12 md:pl-0 md:pr-12 md:text-right ${
                    isEven ? "md:opacity-100" : "md:opacity-0 md:pointer-events-none md:absolute"
                  }`}>
                    {isEven && (
                      <div className="bg-mint p-6 sm:p-8 rounded-2xl border border-primary/10 shadow-lg inline-block text-left w-full md:max-w-xl transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5">
                        <span className="font-poppins font-extrabold text-2xl text-primary">{milestone.year}</span>
                        <h4 className="font-poppins font-bold text-lg text-slate-dark mt-1">{milestone.title}</h4>
                        <p className="font-sans text-slate-light text-sm mt-3 leading-relaxed">{milestone.description}</p>
                      </div>
                    )}
                  </div>

                  {/* Spacer Column (Desktop Helper to maintain layout) */}
                  <div className="hidden md:block w-1/2" />

                  {/* Right Column (Desktop) */}
                  <div className={`w-full md:w-1/2 pl-12 md:pl-12 text-left ${
                    !isEven ? "md:opacity-100" : "md:opacity-0 md:pointer-events-none md:absolute md:top-0"
                  }`}>
                    {!isEven && (
                      <div className="bg-mint p-6 sm:p-8 rounded-2xl border border-primary/10 shadow-lg inline-block w-full md:max-w-xl transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5">
                        <span className="font-poppins font-extrabold text-2xl text-primary">{milestone.year}</span>
                        <h4 className="font-poppins font-bold text-lg text-slate-dark mt-1">{milestone.title}</h4>
                        <p className="font-sans text-slate-light text-sm mt-3 leading-relaxed">{milestone.description}</p>
                      </div>
                    )}
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
