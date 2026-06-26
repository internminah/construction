import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import HeroSection from "@/components/home/HeroSection";
import CompanyIntroSummary from "@/components/home/CompanyIntroSummary";
import AboutUsOverview from "@/components/home/AboutUsOverview";
import FeaturedProjectsShowcase from "@/components/home/FeaturedProjectsShowcase";
import ProjectImageGallery from "@/components/home/ProjectImageGallery";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Testimonials from "@/components/home/Testimonials";
import LeadGenQuotationForm from "@/components/home/LeadGenQuotationForm";
import CallToAction from "@/components/home/CallToAction";
import WhatsAppIntegration from "@/components/home/WhatsAppIntegration";
import AiChatbotUi from "@/components/home/AiChatbotUi";
import QuickNavigation from "@/components/home/QuickNavigation";
import {
  getCompanyInfo,
  getNavLinks,
  getSocialLinks,
  getServices,
  getProjects,
} from "@/lib/data";

export default async function Home() {
  // Fetch all datasets asynchronously at the page level (Server Component)
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
      
      <main className="flex-grow">
        {/* 1. Hero Section */}
        <HeroSection companyInfo={company} />

        {/* 2. Company Introduction Summary */}
        <CompanyIntroSummary companyInfo={company} />

        {/* 3. About Us Overview */}
        <AboutUsOverview />

        {/* 4. Featured Projects Showcase */}
        <FeaturedProjectsShowcase projects={allProjects} />

        {/* 5. Project Image Gallery */}
        <ProjectImageGallery />

        {/* 6. Why Choose Us */}
        <WhyChooseUs />

        {/* 7. Customer Reviews & Testimonials */}
        <Testimonials />

        {/* 8. Lead Generation / Quotation Request Form */}
        <LeadGenQuotationForm services={allServices} />

        {/* 9. Call to Action Section */}
        <CallToAction companyInfo={company} />

        {/* 12. Quick Navigation row */}
        <QuickNavigation />
      </main>

      {/* 10. WhatsApp Integration */}
      <WhatsAppIntegration companyInfo={company} />

      {/* 11. AI Chatbot UI */}
      <AiChatbotUi companyInfo={company} />

      {/* 13. Footer */}
      <Footer
        companyInfo={company}
        quickLinks={links}
        services={allServices}
        socialLinks={socials}
      />
    </>
  );
}

