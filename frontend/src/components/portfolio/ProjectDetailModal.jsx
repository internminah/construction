"use client";

import { X, MapPin, ArrowRight } from "@/components/common/Icons";

export default function ProjectDetailModal({ project, onClose }) {
  if (!project) return null;

  const isOngoing = project.completionStatus !== "Completed";

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-darkest/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative h-72 w-full overflow-hidden bg-slate-900 shrink-0">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute top-4 left-4 py-1 px-3 bg-primary text-mint rounded-lg text-xs font-poppins font-semibold uppercase tracking-wider">
            {project.category}
          </div>
          {isOngoing && (
            <div className="absolute top-4 right-14 py-1 px-3 bg-accent/90 text-white rounded-lg text-xs font-poppins font-semibold uppercase tracking-wider flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              In Progress
            </div>
          )}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto flex-grow">
          <span className="text-xs font-semibold text-primary uppercase tracking-widest">
            Client: {project.client}
          </span>
          <h2 className="font-poppins font-bold text-2xl sm:text-3xl text-slate-dark mt-2 mb-4">
            {project.title}
          </h2>
          <p className="font-sans text-slate-light text-base leading-relaxed mb-6">
            {project.description}
          </p>

          {/* Meta grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-mint rounded-xl p-4 border border-primary/5">
              <div className="text-xs text-slate-light uppercase tracking-wider font-poppins font-semibold mb-1">Location</div>
              <div className="font-poppins font-bold text-slate-dark text-sm flex items-center gap-1">
                <MapPin className="h-4 w-4 text-primary" /> {project.location}
              </div>
            </div>
            <div className="bg-mint rounded-xl p-4 border border-primary/5">
              <div className="text-xs text-slate-light uppercase tracking-wider font-poppins font-semibold mb-1">Year</div>
              <div className="font-poppins font-bold text-slate-dark text-sm">
                {isOngoing ? `Est. ${project.year}` : project.year}
              </div>
            </div>
            <div className="bg-mint rounded-xl p-4 border border-primary/5">
              <div className="text-xs text-slate-light uppercase tracking-wider font-poppins font-semibold mb-1">Status</div>
              <div className={`font-poppins font-bold text-sm ${isOngoing ? "text-accent" : "text-primary"}`}>
                {project.completionStatus}
              </div>
            </div>
          </div>

          {/* Tags */}
          {project.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-poppins font-semibold uppercase tracking-wider text-primary bg-mint border border-primary/15 rounded-full px-3 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Progress bar for ongoing */}
          {isOngoing && project.progress !== undefined && (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="font-poppins font-bold text-xs text-slate-dark uppercase tracking-wider">
                  Construction Progress — {project.phase}
                </span>
                <span className="font-poppins font-bold text-sm text-primary">{project.progress}%</span>
              </div>
              <div className="w-full h-2.5 bg-mint-dark rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-700"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>
          )}

          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 px-6 py-3 font-poppins font-semibold text-sm rounded-lg text-mint bg-primary hover:bg-primary-light transition-all duration-300 shadow-md"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
}
