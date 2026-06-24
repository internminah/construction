import Link from "next/link";
import { ArrowRight } from "@/components/common/Icons";
import { companyInfo as defaultCompanyInfo } from "@/lib/data";

export default function HeroSection({
  companyInfo = defaultCompanyInfo,
}) {
  return (
    <section className="relative h-[65vh] min-h-[450px] w-full flex items-center justify-center overflow-hidden bg-slate-900">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transition-transform duration-1000"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070')",
        }}
      />
      {/* Dark Emerald Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/95 via-primary-dark/85 to-transparent mix-blend-multiply" />
      <div className="absolute inset-0 bg-black/40" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left w-full">
        <div className="max-w-3xl">
          {/* Badge */}
          <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-semibold bg-accent/20 text-accent border border-accent/30 uppercase tracking-widest mb-6 animate-pulse">
            About {companyInfo.name}
          </span>
          
          <h1 className="font-poppins font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight tracking-tight mb-6">
            {companyInfo.tagline.split(" Since ")[0]} <br />
            <span className="text-accent">Since {companyInfo.foundedYear}</span>
          </h1>
          
          <p className="font-sans text-gray-300 text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl">
            {companyInfo.description}
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 px-8 py-4 font-poppins font-semibold text-base rounded-lg text-mint bg-primary hover:bg-primary-light transition-all duration-300 shadow-xl hover:shadow-primary/20 hover:-translate-y-0.5 active:translate-y-0 group"
            >
              View Projects
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 font-poppins font-semibold text-base rounded-lg text-white border border-white/30 hover:bg-white/10 transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* Slope overlay */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[30px] text-mint fill-current">
          <path d="M1200 120L0 120L0 0L1200 120Z"></path>
        </svg>
      </div>
    </section>
  );
}
