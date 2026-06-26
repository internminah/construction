"use client";

import { useState } from "react";
import { X, ArrowRight, Eye } from "@/components/common/Icons";

export default function ProjectImageGallery() {
  const [selectedIdx, setSelectedIdx] = useState(null);

  const galleryImages = [
    {
      url: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1200",
      title: "Commercial Concrete Formwork",
      category: "Structural",
      description: "Laying the reinforced concrete foundation for a modern commercial facility.",
    },
    {
      url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200",
      title: "Glazed Skyscraper Facade",
      category: "Commercial",
      description: "Installation of thermal-insulated glass panels on the Emerald Heights tower.",
    },
    {
      url: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200",
      title: "Bespoke Timber Framing",
      category: "Residential",
      description: "Exposed local pine beams supporting the high-vaulted villa roof structure.",
    },
    {
      url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200",
      title: "Eco-Ventilation Installation",
      category: "Engineering",
      description: "Fitting smart passive ventilation ductwork inside our industrial park.",
    },
    {
      url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200",
      title: "Modern Glass Villa Exterior",
      category: "Residential",
      description: "Completed view of the Sterling villa featuring reflection-coated glass walls.",
    },
    {
      url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200",
      title: "Bespoke Living Lounge",
      category: "Interior",
      description: "Warm minimalistic living layout combining structural concrete with timber details.",
    },
  ];

  const handlePrev = (e) => {
    e.stopPropagation();
    setSelectedIdx((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setSelectedIdx((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-8 h-[2px] bg-primary" />
            <span className="font-poppins font-bold text-xs uppercase tracking-widest text-primary">
              Visual Gallery
            </span>
            <span className="w-8 h-[2px] bg-primary" />
          </div>
          <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-slate-dark leading-tight">
            Our Work in Focus
          </h2>
          <p className="font-sans text-slate-light text-sm sm:text-base mt-4">
            A visual showcase of building sites, custom carpentry, core structural columns, and finished interior spaces.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((img, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedIdx(idx)}
              className="group relative h-72 w-full overflow-hidden rounded-2xl cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 bg-slate-900"
            >
              {/* Photo */}
              <img
                src={img.url}
                alt={img.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlay styling */}
              <div className="absolute inset-0 bg-slate-darkest/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6" />

              {/* Title & Category shown on Hover */}
              <div className="absolute inset-x-0 bottom-0 p-6 translate-y-6 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 flex items-end justify-between pointer-events-none">
                <div>
                  <span className="text-xs font-poppins font-bold text-accent uppercase tracking-wider">
                    {img.category}
                  </span>
                  <h3 className="font-poppins font-bold text-lg text-white mt-1">
                    {img.title}
                  </h3>
                </div>
                <div className="p-3 bg-primary text-mint rounded-full shadow-lg">
                  <Eye className="h-5 w-5" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal (Frontend Only) */}
      {selectedIdx !== null && (
        <div
          className="fixed inset-0 z-50 bg-slate-darkest/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 animate-fade-in"
          onClick={() => setSelectedIdx(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setSelectedIdx(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close Lightbox"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Navigation Controls */}
          <button
            onClick={handlePrev}
            className="absolute left-4 sm:left-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer rotate-180"
            aria-label="Previous Image"
          >
            <ArrowRight className="h-6 w-6" />
          </button>
          
          <button
            onClick={handleNext}
            className="absolute right-4 sm:right-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Next Image"
          >
            <ArrowRight className="h-6 w-6" />
          </button>

          {/* Main Lightbox Card */}
          <div
            className="max-w-4xl w-full flex flex-col items-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative overflow-hidden rounded-2xl shadow-2xl max-h-[70vh] flex items-center justify-center bg-black/40">
              <img
                src={galleryImages[selectedIdx].url}
                alt={galleryImages[selectedIdx].title}
                className="max-h-[70vh] max-w-full object-contain"
              />
            </div>
            
            {/* Image Details Footer */}
            <div className="w-full text-center text-white max-w-2xl px-4 mt-2">
              <span className="text-xs font-poppins font-bold text-accent uppercase tracking-widest">
                {galleryImages[selectedIdx].category}
              </span>
              <h3 className="font-poppins font-bold text-xl sm:text-2xl mt-1 text-white">
                {galleryImages[selectedIdx].title}
              </h3>
              <p className="font-sans text-gray-400 text-sm mt-2 leading-relaxed">
                {galleryImages[selectedIdx].description}
              </p>
              <div className="text-xs text-gray-500 mt-4 font-poppins font-semibold">
                Photo {selectedIdx + 1} of {galleryImages.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
