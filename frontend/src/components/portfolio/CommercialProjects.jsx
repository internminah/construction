"use client";

import { useState } from "react";
import ProjectCard from "@/components/portfolio/ProjectCard";
import ProjectDetailModal from "@/components/portfolio/ProjectDetailModal";
import { usePortfolioProjects } from "@/hooks/usePortfolioProjects";

export default function CommercialProjects() {
  const { projects, loading } = usePortfolioProjects();
  const [selectedProject, setSelectedProject] = useState(null);

  const commercialProjects = projects.filter(
    (p) => p.category === "Commercial"
  );

  if (!loading && commercialProjects.length === 0) return null;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row gap-8 items-start md:items-end mb-16">
          <div className="md:w-1/2">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-[2px] bg-primary" />
              <span className="font-poppins font-bold text-xs uppercase tracking-widest text-primary">
                Commercial Division
              </span>
            </div>
            <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-slate-dark leading-tight">
              Corporate Towers &amp; Commercial Complexes
            </h2>
          </div>
          <p className="md:w-1/2 font-sans text-slate-light text-sm sm:text-base leading-relaxed self-end">
            Our commercial portfolio spans skyscrapers, office parks, retail centres, and mixed-use developments —
            each a statement of structural ambition and engineering precision.
          </p>
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-2xl h-72 animate-pulse" />
            ))}
          </div>
        )}

        {/* Grid */}
        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {commercialProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onViewDetail={setSelectedProject}
              />
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
