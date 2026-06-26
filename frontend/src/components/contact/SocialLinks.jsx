import * as Icons from "@/components/common/Icons";
import { contactInfo } from "@/data/contactData";

export default function SocialLinks() {
  const socials = [
    { platform: "Facebook", href: contactInfo.socialLinks.facebook, iconName: "Facebook" },
    { platform: "Instagram", href: contactInfo.socialLinks.instagram, iconName: "Instagram" },
    { platform: "LinkedIn", href: contactInfo.socialLinks.linkedin, iconName: "Linkedin" },
    { platform: "Twitter", href: contactInfo.socialLinks.twitter, iconName: "Twitter" },
  ];

  return (
    <section className="py-12 bg-mint">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-poppins font-bold text-xl sm:text-2xl text-slate-dark mb-8">
          Follow Our Progress
        </h2>
        <div className="flex justify-center gap-6">
          {socials.map((social) => {
            const IconComponent = Icons[social.iconName] || Icons.Facebook;
            return (
              <a
                key={social.platform}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 rounded-2xl bg-white border border-primary/5 shadow-sm hover:shadow-md text-slate-light hover:text-primary hover:border-primary/20 flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
                aria-label={social.platform}
              >
                <IconComponent className="h-6 w-6" />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
