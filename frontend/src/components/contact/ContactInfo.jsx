import * as Icons from "@/components/common/Icons";
import { contactInfo } from "@/data/contactData";

export default function ContactInfo() {
  const { ExternalLink } = Icons;

  const cards = [
    {
      id: "info-phone",
      title: "Phone Support",
      detail: contactInfo.phone,
      actionLabel: "Call Now",
      actionHref: `tel:${contactInfo.phone.replace(/[^+\d]/g, "")}`,
      iconName: "PhoneCall",
    },
    {
      id: "info-email",
      title: "Email Queries",
      detail: contactInfo.email,
      actionLabel: "Send Email",
      actionHref: `mailto:${contactInfo.email}`,
      iconName: "Mail",
    },
    {
      id: "info-address",
      title: "Headquarters Office",
      detail: contactInfo.address,
      actionLabel: "Get Directions",
      actionHref: "https://maps.google.com",
      iconName: "MapPin",
    },
  ];

  return (
    <section className="py-20 bg-mint">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card) => {
            const IconComponent = Icons[card.iconName] || Icons.MapPin;
            return (
              <div
                key={card.id}
                className="bg-white border border-primary/5 rounded-2xl p-8 shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Icon Container */}
                  <div className="p-4 bg-primary/10 text-primary rounded-xl inline-block mb-6">
                    <IconComponent className="h-6 w-6" />
                  </div>

                  {/* Title */}
                  <h3 className="font-poppins font-bold text-xl text-slate-dark mb-3">
                    {card.title}
                  </h3>

                  {/* Detail */}
                  <p className="font-sans text-slate-light text-sm sm:text-base leading-relaxed mb-8">
                    {card.detail}
                  </p>
                </div>

                {/* Action Button */}
                <a
                  href={card.actionHref}
                  target={card.actionHref.startsWith("http") ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-primary/20 font-poppins font-semibold text-sm rounded-lg text-primary hover:text-white hover:bg-primary transition-all duration-300"
                >
                  {card.actionLabel}
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
