import * as Icons from "@/components/common/Icons";
import { contactInfo as defaultContacts } from "@/lib/data";

export default function ContactInfo({
  contacts = defaultContacts,
}) {
  const { ExternalLink } = Icons;

  return (
    <section className="py-20 bg-mint">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-8 h-[2px] bg-primary" />
            <span className="font-poppins font-bold text-xs uppercase tracking-widest text-primary">
              Connect With Us
            </span>
            <span className="w-8 h-[2px] bg-primary" />
          </div>
          <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-slate-dark leading-tight">
            We're Ready to Build Your Vision
          </h2>
          <p className="font-sans text-slate-light text-sm sm:text-base mt-4">
            Reach out to our offices or call our direct project line to discuss your construction roadmap.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {contacts.map((contact) => {
            const IconComponent = Icons[contact.iconName] || Icons.MapPin;
            return (
              <div
                key={contact.id}
                className="bg-white border border-primary/5 rounded-2xl p-8 shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Icon Container */}
                  <div className="p-4 bg-primary/10 text-primary rounded-xl inline-block mb-6">
                    <IconComponent className="h-6 w-6" />
                  </div>

                  {/* Title */}
                  <h3 className="font-poppins font-bold text-xl text-slate-dark mb-3">
                    {contact.title}
                  </h3>

                  {/* Detail */}
                  <p className="font-sans text-slate-light text-sm sm:text-base leading-relaxed mb-8">
                    {contact.detail}
                  </p>
                </div>

                {/* Call-to-action Button */}
                <a
                  href={contact.actionHref}
                  target={contact.actionHref.startsWith("http") ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-primary/20 font-poppins font-semibold text-sm rounded-lg text-primary hover:text-white hover:bg-primary transition-all duration-300"
                >
                  {contact.actionLabel}
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
