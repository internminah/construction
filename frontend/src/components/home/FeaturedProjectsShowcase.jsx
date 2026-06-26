"use client";

import Link from "next/link";
import { ArrowRight, Eye } from "@/components/common/Icons";

export default function FeaturedProjectsShowcase({ projects = [] }) {
  // Take up to 3 projects for the homepage showcase
  const featured = projects.slice(0, 3);

  return (
    <section className="py-20 bg-mint">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-[2px] bg-primary" />
              <span className="font-poppins font-bold text-xs uppercase tracking-widest text-primary">
                Featured Works
              </span>
            </div>
            <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-slate-dark leading-tight">
              Shaping Landscapes, Constructing Legacies
            </h2>
            <p className="font-sans text-slate-light text-sm sm:text-base mt-4">
              Explore our latest completed landmark developments spanning high-performance commercial skyscrapers and private estates.
            </p>
          </div>
          <div className="mt-6 md:mt-0">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 px-6 py-3 font-poppins font-semibold text-sm rounded-lg text-primary border border-primary/20 hover:bg-primary/5 hover:border-primary transition-all duration-300 group"
            >
              Browse All Projects
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((project) => (
            <div
              key={project.id}
              className="group bg-white border border-primary/5 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col h-full"
            >
              {/* Image Wrap with overlay and zoom */}
              <div className="relative h-64 w-full overflow-hidden bg-slate-900">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-750 group-hover:scale-105"
                />
                
                {/* Dark Hover Overlay */}
                <div className="absolute inset-0 bg-slate-darkest/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="p-3 bg-white/95 text-primary rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <Eye className="h-5 w-5" />
                  </div>
                </div>

                {/* Category Tag */}
                <div className="absolute top-4 left-4 py-1 px-3 bg-primary text-mint rounded-lg text-xs font-poppins font-semibold uppercase tracking-wider">
                  {project.category}
                </div>
              </div>

              {/* Card Details */}
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                    Client: {project.client}
                  </span>
                  <h3 className="font-poppins font-bold text-xl text-slate-dark mt-2 mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="font-sans text-slate-light text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>

                {/* Footer Metadata */}
                <div className="flex justify-between items-center text-xs text-slate-light/80 border-t border-mint-dark pt-4">
                  <span>📍 {project.location}</span>
                  <span>🗓️ Completed: {project.year}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
