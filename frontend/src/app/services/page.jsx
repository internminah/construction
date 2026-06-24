import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import * as Icons from "@/components/common/Icons";
import {
  getCompanyInfo,
  getNavLinks,
  getSocialLinks,
  getServices,
} from "@/lib/data";

export const metadata = {
  title: "Our Services | I Constructions",
  description: "Explore the engineering and construction services offered by I Constructions.",
};

export default async function ServicesPage() {
  const [company, links, socials, allServices] = await Promise.all([
    getCompanyInfo(),
    getNavLinks(),
    getSocialLinks(),
    getServices(),
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
                Expertise
              </span>
              <span className="w-8 h-[2px] bg-primary" />
            </div>
            <h1 className="font-poppins font-bold text-3xl sm:text-4xl text-slate-dark leading-tight">
              Our Professional Services
            </h1>
            <p className="font-sans text-slate-light text-sm sm:text-base mt-4">
              We provide full-scale contracting, custom architectural blueprinting, and sustainable civil engineering.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {allServices.map((service) => {
              const IconComponent = Icons[service.iconName] || Icons.Building2;
              return (
                <div
                  key={service.id}
                  id={service.slug}
                  className="bg-white border border-primary/5 rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row gap-6 scroll-mt-24"
                >
                  {/* Icon Column */}
                  <div className="p-4 bg-primary/10 text-primary rounded-xl shrink-0 h-14 w-14 flex items-center justify-center">
                    <IconComponent className="h-6 w-6" />
                  </div>

                  {/* Info Column */}
                  <div className="flex flex-col gap-3">
                    <h3 className="font-poppins font-bold text-xl text-slate-dark">
                      {service.title}
                    </h3>
                    <p className="font-sans text-slate-light text-sm sm:text-base leading-relaxed">
                      {service.details}
                    </p>
                  </div>
                </div>
              );
            })}
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
