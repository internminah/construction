import { ArrowRight } from "@/components/common/Icons";

export default function ServicesHero({ companyInfo }) {
  return (
    <section className="relative h-[55vh] min-h-[400px] w-full flex items-center justify-center overflow-hidden bg-slate-900">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070')",
        }}
      />
      {/* Dark Emerald Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/95 via-primary-dark/85 to-transparent mix-blend-multiply" />
      <div className="absolute inset-0 bg-black/35" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left w-full">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-semibold bg-accent/20 text-accent border border-accent/30 uppercase tracking-widest mb-6 animate-pulse">
            Our Expertise
          </span>
          
          <h1 className="font-poppins font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight tracking-tight mb-6">
            Services We <span className="text-accent">Offer</span>
          </h1>
          
          <p className="font-sans text-gray-300 text-lg sm:text-xl leading-relaxed mb-8 max-w-2xl">
            From residential architectural designs to large-scale commercial civil engineering, we deliver structures with unmatched craftsmanship and engineering precision.
          </p>
          
          <a
            href="#overview"
            className="inline-flex items-center gap-2 px-6 py-3.5 font-poppins font-semibold text-sm rounded-lg text-mint bg-primary hover:bg-primary-light transition-all duration-300 shadow-xl hover:shadow-primary/20 hover:-translate-y-0.5 active:translate-y-0 group"
          >
            Explore Services
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>

      {/* bottom curve overlay */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[30px] text-mint fill-current">
          <path d="M1200 120L0 120L0 0L1200 120Z"></path>
        </svg>
      </div>
    </section>
  );
}
