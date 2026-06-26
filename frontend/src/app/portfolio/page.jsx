import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import PortfolioHero from "@/components/portfolio/PortfolioHero";
import CompletedProjects from "@/components/portfolio/CompletedProjects";
import OngoingProjects from "@/components/portfolio/OngoingProjects";
import ResidentialProjects from "@/components/portfolio/ResidentialProjects";
import CommercialProjects from "@/components/portfolio/CommercialProjects";
import ProjectGallery from "@/components/portfolio/ProjectGallery";
import PortfolioHighlights from "@/components/portfolio/PortfolioHighlights";
import PortfolioCTA from "@/components/portfolio/PortfolioCTA";
import {
  getCompanyInfo,
  getNavLinks,
  getSocialLinks,
  getServices,
} from "@/lib/data";

export const metadata = {
  title: "Our Portfolio | I Constructions | Landmark Projects & Structural Feats",
  description: "Browse completed landmarks, ongoing construction sites, residential villas, and commercial towers built by I Constructions — a decade of engineering excellence.",
};

export default async function PortfolioPage() {
  const [company, links, socials, allServices] = await Promise.all([
    getCompanyInfo(),
    getNavLinks(),
    getSocialLinks(),
    getServices(),
  ]);

  return (
    <>
      <Navbar companyInfo={company} navLinks={links} />

      <main className="flex-grow">
        {/* 1. Hero Section */}
        <PortfolioHero />

        {/* 2. Completed Projects */}
        <CompletedProjects />

        {/* 3. Ongoing Projects */}
        <OngoingProjects />

        {/* 4. Residential Projects */}
        <ResidentialProjects />

        {/* 5. Commercial Projects */}
        <CommercialProjects />

        {/* 6. Image Gallery */}
        <ProjectGallery />

        {/* 7. Highlights / Company Strengths */}
        <PortfolioHighlights />

        {/* 8. Call to Action */}
        <PortfolioCTA companyInfo={company} />
      </main>

      {/* 9. Footer (reused exactly) */}
      <Footer
        companyInfo={company}
        quickLinks={links}
        services={allServices}
        socialLinks={socials}
      />
    </>
  );
}

