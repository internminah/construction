"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRight } from "@/components/common/Icons";

export default function Testimonials() {
  const testimonials = [
    {
      id: "rev-1",
      clientName: "Jonathan Sterling",
      role: "President, Sterling Family Trust",
      content: "I Constructions exceeded all our expectations. They finished the Hamptons Glass Villa three weeks ahead of schedule, and the transparency in pricing was incredibly refreshing. The architectural detailing on the wooden beams is superb.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=150",
    },
    {
      id: "rev-2",
      clientName: "Clara Vance",
      role: "Managing Director, Emerald Holdings Group",
      content: "The engineering team at I Constructions is top-tier. They integrated complex sustainable energy grids into our 45-story skyscraper with extreme precision. Communication was impeccable throughout the full-lifecycle project.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150",
    },
    {
      id: "rev-3",
      clientName: "Marcus Thorne",
      role: "Founder, Thorne Eco-Lodges",
      content: "We hired I Constructions to build a series of light-footprint eco-cabins in upstate New York. Their commitment to environmental sustainability, water harvesting, and passive heating integration blew us away.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=150",
    },
    {
      id: "rev-4",
      clientName: "Sophia Martinez",
      role: "Homeowner, Modernist Villa",
      content: "Their interior design department transformed our dark, narrow space into a bright, breathable mid-century masterpiece. The custom timber furniture and ambient light installations are absolute works of art.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=150",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoPlayRef = useRef(null);

  const slideNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const slidePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 500); // matches transition-duration
    return () => clearTimeout(timer);
  }, [activeIndex]);

  // Start Autoplay
  const startAutoplay = () => {
    stopAutoplay();
    autoPlayRef.current = setInterval(slideNext, 5000);
  };

  // Stop Autoplay
  const stopAutoplay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, []);

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-8 h-[2px] bg-primary" />
            <span className="font-poppins font-bold text-xs uppercase tracking-widest text-primary">
              Client Feedback
            </span>
            <span className="w-8 h-[2px] bg-primary" />
          </div>
          <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-slate-dark leading-tight">
            What Our Valued Partners Say
          </h2>
        </div>

        {/* Carousel Viewport Container */}
        <div 
          className="relative px-4 sm:px-12"
          onMouseEnter={stopAutoplay}
          onMouseLeave={startAutoplay}
        >
          {/* Left Arrow */}
          <button
            onClick={slidePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-mint text-primary hover:bg-primary hover:text-white transition-all shadow-md cursor-pointer rotate-180 z-10"
            aria-label="Previous Review"
          >
            <ArrowRight className="h-5 w-5" />
          </button>

          {/* Center Card */}
          <div className="relative min-h-[320px] sm:min-h-[250px] flex items-center justify-center">
            {testimonials.map((item, idx) => {
              const isActive = idx === activeIndex;
              return (
                <div
                  key={item.id}
                  className={`absolute w-full bg-mint border border-primary/5 rounded-3xl p-8 sm:p-12 shadow-lg transition-all duration-500 ease-in-out flex flex-col md:flex-row items-center gap-8 ${
                    isActive
                      ? "opacity-100 scale-100 z-10 pointer-events-auto"
                      : "opacity-0 scale-95 -z-10 pointer-events-none"
                  }`}
                >
                  {/* Photo / Rating Column */}
                  <div className="flex flex-col items-center shrink-0">
                    <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md bg-slate-200">
                      <img
                        src={item.image}
                        alt={item.clientName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Stars */}
                    <div className="flex gap-1 mt-4 text-amber-500">
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <span key={i} className="text-lg">★</span>
                      ))}
                    </div>
                  </div>

                  {/* Comment Details */}
                  <div className="flex-grow text-center md:text-left flex flex-col justify-center">
                    {/* Quote mark decoration */}
                    <span className="text-6xl text-primary/10 font-serif leading-none h-4 -mt-4 block text-left">
                      “
                    </span>
                    <p className="font-sans text-slate-light text-base sm:text-lg italic leading-relaxed">
                      {item.content}
                    </p>
                    
                    <div className="mt-6 border-t border-primary/10 pt-4">
                      <h3 className="font-poppins font-bold text-lg text-slate-dark">
                        {item.clientName}
                      </h3>
                      <p className="font-sans text-xs text-primary font-semibold uppercase tracking-wider mt-0.5">
                        {item.role}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Arrow */}
          <button
            onClick={slideNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-mint text-primary hover:bg-primary hover:text-white transition-all shadow-md cursor-pointer z-10"
            aria-label="Next Review"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>

        {/* Carousel Dots */}
        <div className="flex justify-center gap-3 mt-8">
          {testimonials.map((_, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  isActive ? "w-8 bg-primary" : "w-2.5 bg-primary/20 hover:bg-primary/45"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            );
          })}
        </div>

      </div>
    </section>
  );
}
