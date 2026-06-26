import { PhoneCall } from "@/components/common/Icons";
import { contactInfo } from "@/data/contactData";

export default function ContactCTA() {
  return (
    <section className="relative py-24 bg-primary overflow-hidden">
      {/* Dynamic Background Glassmorphism Gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      {/* Content wrapper */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-8">
        {/* Badge */}
        <span className="font-poppins font-bold text-xs uppercase tracking-widest text-accent">
          Start Your Journey
        </span>

        {/* Headline */}
        <h2 className="font-poppins font-bold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight max-w-3xl">
          Let's Build Your Next Project Together
        </h2>

        {/* Description */}
        <p className="font-sans text-gray-300 text-base sm:text-lg leading-relaxed max-w-2xl">
          Partner with our multidisciplinary team of structural engineers, architects, and builders to bring your vision to life.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-4 w-full sm:w-auto">
          <a
            href="#contact-form"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 font-poppins font-semibold text-base rounded-lg text-primary bg-accent hover:bg-accent-light transition-all duration-300 shadow-xl hover:shadow-accent/20 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            Get a Quote
          </a>
          <a
            href={`tel:${contactInfo.phone.replace(/[^+\d]/g, "")}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 font-poppins font-semibold text-base rounded-lg text-white border border-white/30 hover:bg-white/10 transition-all duration-300"
          >
            <PhoneCall className="h-5 w-5" />
            Call Our Office
          </a>
        </div>
      </div>
    </section>
  );
}
