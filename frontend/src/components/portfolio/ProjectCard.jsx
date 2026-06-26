"use client";

import { useState } from "react";
import { Eye, MapPin, ArrowRight } from "@/components/common/Icons";

export default function ProjectCard({ project, onViewDetail }) {
  const [hovered, setHovered] = useState(false);

  const isOngoing = project.completionStatus !== "Completed";

  return (
    <div
      className="group bg-white border border-primary/5 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col h-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative h-60 w-full overflow-hidden bg-slate-900 shrink-0">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Dark hover overlay */}
        <div className="absolute inset-0 bg-slate-darkest/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button
            onClick={() => onViewDetail?.(project)}
            className="p-3 bg-white/95 text-primary rounded-full shadow-lg transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300"
            aria-label="View project details"
          >
            <Eye className="h-5 w-5" />
          </button>
        </div>

        {/* Category badge */}
        <div className="absolute top-4 left-4 py-1 px-3 bg-primary text-mint rounded-lg text-xs font-poppins font-semibold uppercase tracking-wider">
          {project.category}
        </div>

        {/* Status badge */}
        {isOngoing && (
          <div className="absolute top-4 right-4 py-1 px-3 bg-accent/90 text-white rounded-lg text-xs font-poppins font-semibold uppercase tracking-wider flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            In Progress
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col justify-between flex-grow">
        <div>
          <span className="text-xs font-semibold text-primary uppercase tracking-wide">
            Client: {project.client}
          </span>
          <h3 className="font-poppins font-bold text-xl text-slate-dark mt-2 mb-3 group-hover:text-primary transition-colors duration-300">
            {project.title}
          </h3>
          <p className="font-sans text-slate-light text-sm leading-relaxed">
            {project.description}
          </p>

          {/* Tags */}
          {project.tags?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-poppins font-semibold uppercase tracking-wider text-primary/70 bg-mint border border-primary/10 rounded-full px-2.5 py-0.5"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Footer meta + CTA */}
        <div className="mt-6">
          <div className="flex justify-between items-center text-xs text-slate-light/80 border-t border-mint-dark pt-4 mb-4">
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3 text-primary" />
              {project.location}
            </span>
            <span>🗓️ {isOngoing ? "Est." : "Completed:"} {project.year}</span>
          </div>

          <button
            onClick={() => onViewDetail?.(project)}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 font-poppins font-semibold text-sm rounded-lg text-primary border border-primary/20 hover:bg-primary hover:text-mint hover:border-primary transition-all duration-300 group/btn"
          >
            View Details
            <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
