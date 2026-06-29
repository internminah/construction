"use client";

import { useState } from "react";
import ProjectDetailModal from "@/components/portfolio/ProjectDetailModal";
import { usePortfolioProjects } from "@/hooks/usePortfolioProjects";
import { Clock, MapPin } from "@/components/common/Icons";

export default function OngoingProjects() {
  const { projects, loading } = usePortfolioProjects();
  const [selectedProject, setSelectedProject] = useState(null);

  // Only show In Progress projects
  const ongoingProjects = projects.filter((p) => p.status === "In Progress");

  if (!loading && ongoingProjects.length === 0) return null;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-8 h-[2px] bg-primary" />
            <span className="font-poppins font-bold text-xs uppercase tracking-widest text-primary">
              Active Sites
            </span>
            <span className="w-8 h-[2px] bg-primary" />
          </div>
          <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-slate-dark leading-tight">
            Projects Currently Under Construction
          </h2>
          <p className="font-sans text-slate-light text-sm sm:text-base mt-4">
            Our active construction sites — each progressing toward an on-time delivery with precision and care.
          </p>
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="flex flex-col gap-8">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white border border-primary/5 rounded-2xl h-60 animate-pulse" />
            ))}
          </div>
        )}

        {/* Ongoing Cards — wider horizontal layout */}
        {!loading && (
          <div className="flex flex-col gap-8">
            {ongoingProjects.map((project) => (
              <div
                key={project.id}
                className="group bg-white border border-primary/5 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row"
              >
                {/* Image */}
                <div className="relative md:w-80 shrink-0 h-60 md:h-auto overflow-hidden bg-slate-900">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20 md:to-black/0" />
                  {/* Live badge */}
                  <div className="absolute top-4 left-4 py-1 px-3 bg-accent text-white rounded-lg text-xs font-poppins font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                    In Progress
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col justify-between flex-grow">
                  <div>
                    <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                      {project.category}
                    </span>
                    <h3 className="font-poppins font-bold text-2xl text-slate-dark mt-2 mb-3 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="font-sans text-slate-light text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Progress + Meta */}
                  <div className="mt-6">
                    {/* Progress bar */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-poppins font-bold text-xs text-slate-dark uppercase tracking-wider flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5 text-primary" />
                          Active Construction
                        </span>
                        <span className="font-poppins font-bold text-sm text-primary">{project.progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-mint-dark rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-mint-dark pt-4">
                      <div className="flex items-center gap-4 text-xs text-slate-light">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5 text-primary" />
                          {project.location || "Active Site"}
                        </span>
                      </div>
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="inline-flex items-center justify-center px-5 py-2 font-poppins font-semibold text-xs rounded-lg text-primary border border-primary/20 hover:bg-primary hover:text-mint hover:border-primary transition-all duration-300 cursor-pointer uppercase tracking-wider"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
