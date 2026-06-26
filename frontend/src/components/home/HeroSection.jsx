"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Clock, Trophy, Users } from "@/components/common/Icons";

export default function HeroSection({ companyInfo }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    { id: "hstat-1", value: "10+", label: "Years Experience", icon: Clock },
    { id: "hstat-2", value: "500+", label: "Landmarks Built", icon: Trophy },
    { id: "hstat-3", value: "1,000+", label: "Happy Clients", icon: Users },
  ];

  return (
    <section className="relative min-h-[90vh] lg:min-h-screen w-full flex items-center justify-center overflow-hidden bg-slate-dark text-white">
      {/* Background Image with Scale-in Animation */}
      <div
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-10000 ease-out ${
          isVisible ? "scale-100" : "scale-110"
        }`}
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070')",
        }}
      />
      {/* Premium Multi-Layered Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-darkest/95 via-slate-darkest/80 to-transparent mix-blend-multiply" />
      <div className="absolute inset-0 bg-primary-dark/40 mix-blend-color-burn" />
      <div className="absolute inset-0 bg-black/35" />

      {/* Subtle Floating Elements */}
      <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col justify-between h-full w-full">
        <div className="max-w-3xl mt-10 md:mt-20">
          {/* Tagline Badge */}
          <span
            className={`inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-semibold bg-accent/20 text-accent border border-accent/30 uppercase tracking-widest mb-6 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
            {companyInfo.tagline}
          </span>

          {/* Headline */}
          <h1
            className={`font-poppins font-bold text-4xl sm:text-5xl lg:text-7xl text-white leading-tight tracking-tight mb-6 transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            Engineering Excellence. <br />
            <span className="text-accent font-extrabold">Designing Legacies.</span>
          </h1>

          {/* Description */}
          <p
            className={`font-sans text-gray-300 text-base sm:text-xl leading-relaxed mb-10 max-w-2xl transition-all duration-1000 delay-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            {companyInfo.description} We manage full-lifecycle construction projects, delivering meticulous planning, breathtaking architectural design, and masterful execution.
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-wrap gap-4 transition-all duration-1000 delay-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <a
              href="#quote-form"
              className="inline-flex items-center justify-center px-8 py-4 font-poppins font-semibold text-base rounded-lg text-mint bg-primary hover:bg-primary-light transition-all duration-300 shadow-xl hover:shadow-primary/20 hover:-translate-y-0.5 active:translate-y-0"
            >
              Get a Free Quote
            </a>
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 font-poppins font-semibold text-base rounded-lg text-white border border-white/30 hover:bg-white/10 transition-all duration-300 group"
            >
              View Our Projects
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Statistics Overlay at Bottom of Hero */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 md:mt-24 border-t border-white/10 pt-8 transition-all duration-1000 delay-900 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {stats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <div key={stat.id} className="flex items-center gap-4 group">
                <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-accent group-hover:bg-accent/25 group-hover:border-accent/40 transition-all duration-300">
                  <IconComponent className="h-6 w-6" />
                </div>
                <div>
                  <div className="font-poppins font-bold text-2xl md:text-3xl text-white">
                    {stat.value}
                  </div>
                  <div className="font-sans text-xs text-gray-400 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Animated Scroll Down Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity cursor-pointer hidden md:flex">
        <a href="#company-intro" className="flex flex-col items-center">
          <span className="font-poppins text-xxs uppercase tracking-widest text-white/50 mb-1">
            Scroll Explore
          </span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full p-1 flex justify-center">
            <div className="w-1.5 h-3 bg-accent rounded-full animate-bounce" />
          </div>
        </a>
      </div>

      {/* Slope overlay to section transition */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-[30px] text-mint fill-current"
        >
          <path d="M1200 120L0 120L0 0L1200 120Z"></path>
        </svg>
      </div>
    </section>
  );
}
