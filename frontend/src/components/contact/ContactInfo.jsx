import * as Icons from "@/components/common/Icons";
import { contactInfo as defaultContactInfo } from "@/data/contactData";

export default function ContactInfo({ companyInfo }) {
  const { ExternalLink } = Icons;

  // Use dynamic companyInfo from settings if provided, else fall back to static contactData
  const phone = companyInfo?.phone || defaultContactInfo.phone;
  const email = companyInfo?.email || defaultContactInfo.email;
  const address = companyInfo?.address || defaultContactInfo.address;
  const mapHref = companyInfo?.mapHref || "https://www.google.com/maps/place/I+constructions/@15.8847063,78.1185717,6z";

  const cards = [
    {
      id: "info-phone",
      title: "Phone Support",
      detail: phone,
      actionLabel: "Call Now",
      actionHref: `tel:${phone.replace(/[^+\d]/g, "")}`,
      iconName: "PhoneCall",
    },
    {
      id: "info-email",
      title: "Email Queries",
      detail: email,
      actionLabel: "Send Email",
      actionHref: `mailto:${email}`,
      iconName: "Mail",
    },
    {
      id: "info-address",
      title: "Headquarters Office",
      detail: address,
      actionLabel: "Get Directions",
      actionHref: mapHref,
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
