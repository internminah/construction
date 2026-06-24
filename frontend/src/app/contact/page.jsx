import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import * as Icons from "@/components/common/Icons";
import {
  getCompanyInfo,
  getNavLinks,
  getSocialLinks,
  getServices,
  getContactInfo,
} from "@/lib/data";

export const metadata = {
  title: "Contact Us | I Constructions",
  description: "Get in touch with I Constructions for project quotes, consultations, and architectural blueprint inquiries.",
};

export default async function ContactPage() {
  const [company, links, socials, allServices, contacts] = await Promise.all([
    getCompanyInfo(),
    getNavLinks(),
    getSocialLinks(),
    getServices(),
    getContactInfo(),
  ]);

  return (
    <>
      <Navbar companyInfo={company} navLinks={links} />
      <main className="flex-grow bg-mint py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="w-8 h-[2px] bg-primary" />
              <span className="font-poppins font-bold text-xs uppercase tracking-widest text-primary">
                Get In Touch
              </span>
              <span className="w-8 h-[2px] bg-primary" />
            </div>
            <h1 className="font-poppins font-bold text-3xl sm:text-4xl text-slate-dark leading-tight">
              Start Your Construction Roadmap
            </h1>
            <p className="font-sans text-slate-light text-sm sm:text-base mt-4">
              Submit your project specifications or contact our regional representatives directly.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            {/* Left Column: Info Cards */}
            <div className="flex flex-col gap-6 lg:col-span-1">
              {contacts.map((contact) => {
                const IconComponent = Icons[contact.iconName] || Icons.MapPin;
                return (
                  <div
                    key={contact.id}
                    className="bg-white border border-primary/5 rounded-2xl p-6 shadow-md flex items-start gap-4"
                  >
                    <div className="p-3 bg-primary/10 text-primary rounded-xl shrink-0">
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-poppins font-bold text-base text-slate-dark">
                        {contact.title}
                      </h3>
                      <p className="font-sans text-slate-light text-sm mt-1 leading-relaxed break-words">
                        {contact.detail}
                      </p>
                      <a
                        href={contact.actionHref}
                        className="font-poppins font-semibold text-xs text-primary hover:text-primary-light inline-flex items-center gap-1 mt-3"
                      >
                        {contact.actionLabel} &rarr;
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Column: Contact Form */}
            <div className="bg-white border border-primary/5 rounded-2xl p-8 sm:p-10 shadow-lg lg:col-span-2">
              <h2 className="font-poppins font-bold text-2xl text-slate-dark mb-6">
                Project Specification Form
              </h2>
              <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-poppins font-bold text-slate-dark uppercase tracking-wider mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Marcus Aurelius"
                    className="w-full bg-mint border border-primary/10 rounded-lg px-4 py-3 text-sm text-slate-dark focus:outline-none focus:border-primary focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-poppins font-bold text-slate-dark uppercase tracking-wider mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="marcus@example.com"
                    className="w-full bg-mint border border-primary/10 rounded-lg px-4 py-3 text-sm text-slate-dark focus:outline-none focus:border-primary focus:bg-white transition-all"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-poppins font-bold text-slate-dark uppercase tracking-wider mb-2">
                    Subject / Project Category
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Residential Villa Build Quotation"
                    className="w-full bg-mint border border-primary/10 rounded-lg px-4 py-3 text-sm text-slate-dark focus:outline-none focus:border-primary focus:bg-white transition-all"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-poppins font-bold text-slate-dark uppercase tracking-wider mb-2">
                    Project Requirements
                  </label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Tell us about your structural dimensions, location, and timelines..."
                    className="w-full bg-mint border border-primary/10 rounded-lg px-4 py-3 text-sm text-slate-dark focus:outline-none focus:border-primary focus:bg-white transition-all resize-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <button
                    type="button"
                    className="w-full bg-primary hover:bg-primary-light text-mint font-poppins font-bold py-4 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Submit Quotation Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer
        companyInfo={company}
        quickLinks={links}
        services={allServices}
        socialLinks={socials}
      />
    </>
  );
}
