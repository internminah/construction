"use client";

import { useState } from "react";
import { ArrowRight } from "@/components/common/Icons";
import ProjectCard from "@/components/portfolio/ProjectCard";
import ProjectDetailModal from "@/components/portfolio/ProjectDetailModal";
import { usePortfolioProjects } from "@/hooks/usePortfolioProjects";

export default function CompletedProjects() {
  const { projects, loading } = usePortfolioProjects();
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);

  // Only show completed or featured projects
  const completed = projects.filter(
    (p) => p.status === "Completed" || p.status === "Featured"
  );

  const categories = ["All", ...Array.from(new Set(completed.map((p) => p.category)))];

  const filtered =
    activeFilter === "All"
      ? completed
      : completed.filter((p) => p.category === activeFilter);

  return (
    <section id="completed-projects" className="py-20 bg-mint scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-[2px] bg-primary" />
              <span className="font-poppins font-bold text-xs uppercase tracking-widest text-primary">
                Completed Works
              </span>
            </div>
            <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-slate-dark leading-tight">
              Delivered Landmarks &amp; Structural Feats
            </h2>
            <p className="font-sans text-slate-light text-sm sm:text-base mt-4">
              Every project below represents a promise kept — on time, on budget, and beyond expectation.
            </p>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap gap-2 shrink-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 rounded-lg font-poppins font-semibold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  activeFilter === cat
                    ? "bg-primary text-mint shadow-md"
                    : "bg-white text-slate-light border border-primary/10 hover:border-primary hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl h-80 animate-pulse" />
            ))}
          </div>
        )}

        {/* Projects Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onViewDetail={setSelectedProject}
              />
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="text-center py-16 text-slate-light font-sans">
            No projects found in this category.
          </div>
        )}

      </div>

      {/* Detail Modal */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
