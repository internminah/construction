import * as Icons from "@/components/common/Icons";

export default function ProcessTimeline({ milestones }) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-8 h-[2px] bg-primary" />
            <span className="font-poppins font-bold text-xs uppercase tracking-widest text-primary">
              Our Process
            </span>
            <span className="w-8 h-[2px] bg-primary" />
          </div>
          <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-slate-dark leading-tight">
            How We Execute Projects
          </h2>
          <p className="font-sans text-slate-light text-sm sm:text-base mt-4">
            A transparent workflow roadmap ensuring cost management, design precision, and safety.
          </p>
        </div>

        {/* Process Timeline Stepper (Desktop/Mobile Layouts) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative mt-12">
          
          {/* Horizontal Connecting Line (Desktop Only) */}
          <div className="hidden lg:block absolute top-[44px] left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-primary via-accent to-mint-dark -z-0" />

          {milestones.map((milestone, index) => {
            const IconComponent = Icons[milestone.iconName] || Icons.Building;
            return (
              <div key={milestone.id} className="relative z-10 flex flex-col items-center text-center group">
                
                {/* Step Circle with Icon */}
                <div className="h-[90px] w-[90px] rounded-full border-4 border-white bg-mint flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-105 group-hover:border-primary relative">
                  
                  {/* Step Number Badge */}
                  <span className="absolute -top-1 -right-1 bg-primary text-mint font-poppins font-extrabold text-[10px] h-5 w-5 rounded-full flex items-center justify-center">
                    {milestone.step}
                  </span>

                  <div className="p-3.5 bg-primary/10 text-primary rounded-full group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <IconComponent className="h-6 w-6" />
                  </div>
                </div>

                {/* Text Block */}
                <div className="mt-6 flex flex-col gap-3 max-w-xs">
                  <h3 className="font-poppins font-bold text-lg text-slate-dark group-hover:text-primary transition-colors">
                    {milestone.title}
                  </h3>
                  <p className="font-sans text-slate-light text-xs sm:text-sm leading-relaxed">
                    {milestone.description}
                  </p>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
