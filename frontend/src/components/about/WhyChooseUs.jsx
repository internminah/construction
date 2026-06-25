import * as Icons from "@/components/common/Icons";
import { whyChooseUs as defaultCards } from "@/lib/data";

export default function WhyChooseUs({
  cards = defaultCards,
}) {
  return (
    <section className="py-20 bg-mint">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-8 h-[2px] bg-primary" />
            <span className="font-poppins font-bold text-xs uppercase tracking-widest text-primary">
              Core Strengths
            </span>
            <span className="w-8 h-[2px] bg-primary" />
          </div>
          <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-slate-dark leading-tight">
            Why Discerning Clients Choose Us
          </h2>
          <p className="font-sans text-slate-light text-sm sm:text-base mt-4">
            We hold ourselves to a higher benchmark of safety, design innovation, and project governance.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cards.map((card) => {
            const IconComponent = Icons[card.iconName] || Icons.HardHat;
            return (
              <div
                key={card.id}
                className="relative group bg-white border border-primary/5 rounded-2xl p-8 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden"
              >
                {/* Decorative Hover Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`} />
                
                {/* Icon */}
                <div className={`p-4 rounded-xl inline-block shadow-md transition-transform duration-300 group-hover:scale-110 ${card.iconBg}`}>
                  <IconComponent className="h-6 w-6" />
                </div>

                {/* Title */}
                <h3 className="font-poppins font-bold text-xl text-slate-dark mt-6 mb-3">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="font-sans text-slate-light text-sm leading-relaxed">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
