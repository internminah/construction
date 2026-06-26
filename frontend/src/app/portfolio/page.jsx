import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import {
  getCompanyInfo,
  getNavLinks,
  getSocialLinks,
  getServices,
  getProjects,
} from "@/lib/data";

export const metadata = {
  title: "Our Portfolio | I Constructions",
  description: "Browse the engineering marvels and custom architecture projects completed by I Constructions.",
};

export default async function PortfolioPage() {
  const [company, links, socials, allServices, allProjects] = await Promise.all([
    getCompanyInfo(),
    getNavLinks(),
    getSocialLinks(),
    getServices(),
    getProjects(),
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
                Works
              </span>
              <span className="w-8 h-[2px] bg-primary" />
            </div>
            <h1 className="font-poppins font-bold text-3xl sm:text-4xl text-slate-dark leading-tight">
              Our Completed Landmarks
            </h1>
            <p className="font-sans text-slate-light text-sm sm:text-base mt-4">
              A curated catalog of structural feats spanning commercial skyscraper builds and private glass estates.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {allProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white border border-primary/5 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* Image Wrap */}
                <div className="relative h-64 w-full overflow-hidden bg-slate-900">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 py-1 px-3 bg-primary text-mint rounded-lg text-xs font-poppins font-semibold uppercase tracking-wider">
                    {project.category}
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                      Client: {project.client}
                    </span>
                    <h3 className="font-poppins font-bold text-xl text-slate-dark mt-2 mb-3">
                      {project.title}
                    </h3>
                    <p className="font-sans text-slate-light text-sm leading-relaxed mb-6">
                      {project.description}
                    </p>
                  </div>

                  {/* Metadata labels */}
                  <div className="flex justify-between items-center text-xs text-slate-light/80 border-t border-mint-dark pt-4">
                    <span>📍 {project.location}</span>
                    <span>🗓️ Completed: {project.year}</span>
                  </div>
                </div>
              </div>
            ))}
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
