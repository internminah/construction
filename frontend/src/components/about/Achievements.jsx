import * as Icons from "@/components/common/Icons";
import { achievements as defaultStats } from "@/lib/data";

export default function Achievements({
  stats = defaultStats,
}) {
  return (
    <section className="relative py-20 bg-primary overflow-hidden">
      {/* Background Graphic Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-0" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-poppins font-bold text-xs uppercase tracking-widest text-accent">
            Proven Performance
          </span>
          <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-white mt-3 leading-tight">
            Our Achievements in Numbers
          </h2>
          <p className="font-sans text-gray-300 text-sm sm:text-base mt-4">
            We let our completed structures and structural metrics speak for our capability.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => {
            const IconComponent = Icons[stat.iconName] || Icons.Trophy;
            return (
              <div
                key={stat.id}
                className="bg-primary-dark/40 border border-primary-light/20 rounded-2xl p-8 hover:bg-primary-dark/60 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 text-center flex flex-col items-center"
              >
                {/* Icon Container */}
                <div className="p-3 bg-accent/15 text-accent rounded-xl mb-6">
                  <IconComponent className="h-6 w-6" />
                </div>
                
                {/* Metric Value */}
                <span className="font-poppins font-extrabold text-4xl sm:text-5xl text-accent tracking-tight">
                  {stat.value}
                </span>

                {/* Metric Label */}
                <h3 className="font-poppins font-bold text-white text-lg mt-3 mb-2">
                  {stat.label}
                </h3>

                {/* Metric Description */}
                <p className="font-sans text-gray-300 text-xs sm:text-sm leading-relaxed">
                  {stat.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
