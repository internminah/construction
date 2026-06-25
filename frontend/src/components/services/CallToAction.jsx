import { PhoneCall } from "@/components/common/Icons";

export default function CallToAction({ companyInfo }) {
  return (
    <section className="relative py-24 bg-primary overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-0" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-0" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-8">
        <span className="font-poppins font-bold text-xs uppercase tracking-widest text-accent">
          Consultation Booking
        </span>
        
        <h2 className="font-poppins font-bold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight max-w-3xl">
          Ready to Discuss Your Construction Goals?
        </h2>
        
        <p className="font-sans text-gray-300 text-base sm:text-lg leading-relaxed max-w-2xl">
          Schedule a direct meeting with our project managers or Principal Architect. We provide a full environmental analysis and cost breakdown.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-4 w-full sm:w-auto">
          <a
            href="#quote"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 font-poppins font-semibold text-base rounded-lg text-primary bg-accent hover:bg-accent-light transition-all duration-300 shadow-xl hover:shadow-accent/20 hover:-translate-y-0.5"
          >
            Book Free Consultation
          </a>
          <a
            href={`tel:${companyInfo.phone}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 font-poppins font-semibold text-base rounded-lg text-white border border-white/30 hover:bg-white/10 transition-all duration-300"
          >
            <PhoneCall className="h-5 w-5" />
            Call Direct Line
          </a>
        </div>
      </div>
    </section>
  );
}
