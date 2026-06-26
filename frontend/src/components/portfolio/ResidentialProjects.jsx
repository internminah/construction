"use client";

import { useState } from "react";
import ProjectCard from "@/components/portfolio/ProjectCard";
import ProjectDetailModal from "@/components/portfolio/ProjectDetailModal";
import { residentialProjects } from "@/lib/portfolioData";

export default function ResidentialProjects() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section className="py-20 bg-mint">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end mb-16">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-[2px] bg-primary" />
              <span className="font-poppins font-bold text-xs uppercase tracking-widest text-primary">
                Residential Division
              </span>
            </div>
            <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-slate-dark leading-tight">
              Custom Homes & Luxury Residences
            </h2>
          </div>
          <p className="font-sans text-slate-light text-sm sm:text-base leading-relaxed">
            From bespoke glass villas to sustainable community housing, our residential portfolio represents
            the full spectrum of high-end private living environments — each crafted to the client's unique vision.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {residentialProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onViewDetail={setSelectedProject}
            />
          ))}
        </div>

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
