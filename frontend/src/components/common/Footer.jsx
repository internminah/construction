import Link from "next/link";
import * as Icons from "@/components/common/Icons";
import { 
  companyInfo as defaultCompanyInfo, 
  navLinks as defaultNavLinks, 
  services as defaultServices, 
  socialLinks as defaultSocialLinks 
} from "@/lib/data";

export default function Footer({
  companyInfo = defaultCompanyInfo,
  quickLinks = defaultNavLinks,
  services = defaultServices,
  socialLinks = defaultSocialLinks,
}) {
  const currentYear = new Date().getFullYear();
  const { Building2, ArrowRight, MapPin, PhoneCall: Phone, Mail } = Icons;

  return (
    <footer className="bg-slate-dark text-gray-300 border-t border-slate-700">
      {/* Main Footer Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Brand Info */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-primary text-mint">
                <Building2 className="h-6 w-6" />
              </div>
              <span className="font-poppins font-bold text-xl tracking-tight text-white">
                {companyInfo.name.split(" ")[0]} <span className="text-accent font-extrabold">{companyInfo.name.split(" ").slice(1).join(" ")}</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400 font-sans">
              {companyInfo.detailedDescription.substring(0, 192)}...
            </p>
            {/* Social Media Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const IconComponent = Icons[social.iconName] || Icons.Facebook;
                return (
                  <a
                    key={social.platform}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-slate-light/10 hover:bg-primary text-gray-400 hover:text-white flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
                    aria-label={social.platform}
                  >
                    <IconComponent className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-poppins font-bold text-white text-base tracking-wider uppercase mb-6 relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-12 after:h-[2px] after:bg-primary">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-accent text-sm flex items-center gap-1.5 transition-colors duration-200 group"
                  >
                    <ArrowRight className="h-3 w-3 text-primary group-hover:translate-x-1 transition-transform" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h3 className="font-poppins font-bold text-white text-base tracking-wider uppercase mb-6 relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-12 after:h-[2px] after:bg-primary">
              Services
            </h3>
            <ul className="space-y-3">
              {services.slice(0, 5).map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services#${service.slug}`}
                    className="text-gray-400 hover:text-accent text-sm flex items-center gap-1.5 transition-colors duration-200 group"
                  >
                    <ArrowRight className="h-3 w-3 text-primary group-hover:translate-x-1 transition-transform" />
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="flex flex-col gap-6">
            <h3 className="font-poppins font-bold text-white text-base tracking-wider uppercase relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-12 after:h-[2px] after:bg-primary">
              Newsletter
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed font-sans">
              Subscribe to our newsletter to receive the latest updates, design trends, and architectural insights.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Your email address"
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
              />
              <button
                type="button"
                className="bg-primary hover:bg-primary-light text-white font-poppins px-4 py-2 rounded-lg text-sm transition-all duration-300"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Contact Snippets row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 pt-8 border-t border-slate-700/60 text-sm text-gray-400">
          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-primary shrink-0" />
            <span>{companyInfo.address}</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-primary shrink-0" />
            <span>{companyInfo.phone}</span>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-primary shrink-0" />
            <span>{companyInfo.email}</span>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Section */}
      <div className="bg-slate-900/50 py-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <span>
            © {currentYear} {companyInfo.name}. All rights reserved.
          </span>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gray-300 transition-colors">Terms of Service</Link>
            <Link href="/sitemap" className="hover:text-gray-300 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
