import * as Icons from "@/components/common/Icons";

export default function ServiceCardsGrid({ services }) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-8 h-[2px] bg-primary" />
            <span className="font-poppins font-bold text-xs uppercase tracking-widest text-primary">
              Core Divisions
            </span>
            <span className="w-8 h-[2px] bg-primary" />
          </div>
          <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-slate-dark leading-tight">
            Our Architectural & Civil Offerings
          </h2>
          <p className="font-sans text-slate-light text-sm sm:text-base mt-4">
            We deliver design sophistication and general contracting power across six specialized categories.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const IconComponent = Icons[service.iconName] || Icons.Building2;
            return (
              <a
                key={service.id}
                href={`#${service.slug}`}
                className="group bg-mint border border-primary/5 rounded-2xl p-8 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Icon Area */}
                  <div className="p-4 bg-white text-primary rounded-xl inline-block shadow-sm transition-colors group-hover:bg-primary group-hover:text-white">
                    <IconComponent className="h-6 w-6" />
                  </div>

                  {/* Title */}
                  <h3 className="font-poppins font-bold text-xl text-slate-dark mt-6 mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>

                  {/* Short Description */}
                  <p className="font-sans text-slate-light text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                {/* Inline link indicator */}
                <span className="font-poppins font-semibold text-xs text-primary group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  Learn Scope Details &rarr;
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
