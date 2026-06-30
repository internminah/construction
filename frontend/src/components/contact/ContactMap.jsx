import { contactInfo as defaultContactInfo } from "@/data/contactData";

export default function ContactMap({ companyInfo }) {
  // Use mapHref from settings if provided, else fall back to static contactData embed URL
  const embedUrl = companyInfo?.mapHref || defaultContactInfo.googleMapEmbedUrl;
  const companyName = companyInfo?.name || defaultContactInfo.companyName;

  return (
    <section className="py-16 bg-mint">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-poppins font-bold text-2xl sm:text-3xl text-slate-dark">
            Our Location
          </h2>
          <p className="font-sans text-slate-light text-sm sm:text-base mt-2">
            Visit our corporate headquarters or get directions below.
          </p>
        </div>

        <div className="bg-white border border-primary/5 rounded-2xl p-4 shadow-xl overflow-hidden relative">
          <div className="w-full h-[450px] rounded-xl overflow-hidden border border-mint-dark">
            <iframe
              src={embedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title={`${companyName} Head Office Map`}
              className="grayscale-[20%] contrast-[110%] hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
