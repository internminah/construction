"use client";

import Link from "next/link";
import { ArrowRight, Compass, Target } from "@/components/common/Icons";

export default function AboutUsOverview() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side: Premium Image Layout */}
          <div className="relative group">
            {/* Background decorative glow */}
            <div className="absolute -inset-2 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl blur-lg opacity-70 group-hover:opacity-100 transition duration-1000 -z-10" />
            
            {/* Primary Image */}
            <div className="relative overflow-hidden rounded-2xl shadow-xl h-[450px] w-full bg-slate-900">
              <img
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200"
                alt="Architect planning layout"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              
              {/* Overlapping badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-6 rounded-xl shadow-lg border border-primary/5">
                <div className="font-poppins font-bold text-lg text-slate-dark">
                  High-End Architectural Planning
                </div>
                <div className="font-sans text-xs text-slate-light mt-1">
                  Meticulous drafts, 3D structural previews, and sustainable blueprints.
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Content Area */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <span className="w-8 h-[2px] bg-primary" />
              <span className="font-poppins font-bold text-xs uppercase tracking-widest text-primary">
                About Our Company
              </span>
            </div>
            
            <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-slate-dark leading-tight">
              Shaping Spaces, Enriching Environments
            </h2>
            
            <p className="font-sans text-slate-light text-base leading-relaxed">
              Founded in 2015, I Constructions was built on a simple philosophy: architectural integrity, engineering ingenuity, and client-centric workflows. Over the decade, we have grown from a boutique residential design studio to a full-service commercial developer.
            </p>

            {/* Mission & Vision Rows */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-2">
              {/* Mission */}
              <div className="flex gap-4">
                <div className="p-3 rounded-lg bg-mint text-primary shrink-0 self-start">
                  <Target className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-poppins font-bold text-base text-slate-dark mb-1">
                    Our Mission
                  </h3>
                  <p className="font-sans text-slate-light text-xs leading-relaxed">
                    To deliver sustainable, high-performance structural landmarks that exceed visual and functional expectations.
                  </p>
                </div>
              </div>

              {/* Vision */}
              <div className="flex gap-4">
                <div className="p-3 rounded-lg bg-mint text-accent shrink-0 self-start">
                  <Compass className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-poppins font-bold text-base text-slate-dark mb-1">
                    Our Vision
                  </h3>
                  <p className="font-sans text-slate-light text-xs leading-relaxed">
                    To lead the construction industry in smart green-building integrations and full-lifecycle project governance.
                  </p>
                </div>
              </div>
            </div>

            {/* Learn More Button */}
            <div className="mt-6">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 font-poppins font-semibold text-sm rounded-lg text-mint bg-primary hover:bg-primary-light transition-all duration-300 shadow-md hover:shadow-lg group"
              >
                Learn More About Us
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
