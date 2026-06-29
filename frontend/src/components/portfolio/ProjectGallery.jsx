"use client";

import { useState } from "react";
import { X, ArrowRight, Eye } from "@/components/common/Icons";
import { usePortfolioProjects } from "@/hooks/usePortfolioProjects";

export default function ProjectGallery() {
  const { projects, loading } = usePortfolioProjects();
  const [selectedIdx, setSelectedIdx] = useState(null);

  // Filter projects that have valid images
  const galleryItems = projects
    .filter((p) => p.image && p.image.trim() !== "")
    .map((p, idx) => ({
      id: p.id,
      url: p.image,
      title: p.title,
      category: p.category,
      description: p.description,
    }));

  const handlePrev = (e) => {
    e.stopPropagation();
    setSelectedIdx((prev) => (prev === 0 ? galleryItems.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setSelectedIdx((prev) => (prev === galleryItems.length - 1 ? 0 : prev + 1));
  };

  if (!loading && galleryItems.length === 0) return null;

  return (
    <section className="py-20 bg-mint">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-8 h-[2px] bg-primary" />
            <span className="font-poppins font-bold text-xs uppercase tracking-widest text-primary">
              Photo Gallery
            </span>
            <span className="w-8 h-[2px] bg-primary" />
          </div>
          <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-slate-dark leading-tight">
            Our Work in Focus
          </h2>
          <p className="font-sans text-slate-light text-sm sm:text-base mt-4">
            A visual tour of our construction sites, finished interiors, and structural achievements. Click any image to explore.
          </p>
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white/50 rounded-2xl h-56 animate-pulse" />
            ))}
          </div>
        )}

        {/* Gallery Grid */}
        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {galleryItems.map((img, idx) => (
              <div
                key={img.id}
                onClick={() => setSelectedIdx(idx)}
                className={`group relative overflow-hidden rounded-2xl cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 bg-slate-900 ${
                  idx === 0 || idx === 5 ? "sm:col-span-2 sm:row-span-1" : ""
                }`}
                style={{ height: idx === 0 || idx === 5 ? "280px" : "220px" }}
              >
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-slate-darkest/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Hover content */}
                <div className="absolute inset-x-0 bottom-0 p-5 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 flex items-end justify-between pointer-events-none">
                  <div>
                    <span className="text-[10px] font-poppins font-bold text-accent uppercase tracking-widest">
                      {img.category}
                    </span>
                    <h3 className="font-poppins font-bold text-sm text-white mt-0.5 leading-snug">
                      {img.title}
                    </h3>
                  </div>
                  <div className="p-2.5 bg-primary text-mint rounded-full shadow-lg shrink-0">
                    <Eye className="h-4 w-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Lightbox Modal */}
      {selectedIdx !== null && (
        <div
          className="fixed inset-0 z-50 bg-slate-darkest/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
          onClick={() => setSelectedIdx(null)}
        >
          {/* Close */}
          <button
            onClick={() => setSelectedIdx(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close lightbox"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Prev */}
          <button
            onClick={handlePrev}
            className="absolute left-4 sm:left-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer rotate-180"
            aria-label="Previous image"
          >
            <ArrowRight className="h-6 w-6" />
          </button>

          {/* Next */}
          <button
            onClick={handleNext}
            className="absolute right-4 sm:right-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Next image"
          >
            <ArrowRight className="h-6 w-6" />
          </button>

          {/* Lightbox card */}
          <div
            className="max-w-4xl w-full flex flex-col items-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="overflow-hidden rounded-2xl shadow-2xl max-h-[65vh] flex items-center justify-center bg-black/30">
              <img
                src={galleryItems[selectedIdx].url}
                alt={galleryItems[selectedIdx].title}
                className="max-h-[65vh] max-w-full object-contain"
              />
            </div>

            <div className="text-center text-white max-w-2xl px-4">
              <span className="text-xs font-poppins font-bold text-accent uppercase tracking-widest">
                {galleryItems[selectedIdx].category}
              </span>
              <h3 className="font-poppins font-bold text-xl sm:text-2xl mt-1">
                {galleryItems[selectedIdx].title}
              </h3>
              <p className="font-sans text-gray-400 text-sm mt-2 leading-relaxed">
                {galleryItems[selectedIdx].description}
              </p>
              <p className="text-xs text-gray-500 mt-3 font-poppins font-semibold">
                {selectedIdx + 1} / {galleryItems.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
