import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import ServicesHero from "@/components/services/ServicesHero";
import ServicesOverview from "@/components/services/ServicesOverview";
import ServiceCardsGrid from "@/components/services/ServiceCardsGrid";
import DetailedServices from "@/components/services/DetailedServices";
import WhyChooseUs from "@/components/about/WhyChooseUs";
import ProcessTimeline from "@/components/services/ProcessTimeline";
import QuotationForm from "@/components/services/QuotationForm";
import CallToAction from "@/components/services/CallToAction";

import {
  getCompanyInfo,
  getNavLinks,
  getSocialLinks,
  getServices,
  getWhyChooseUs,
  getProcessTimeline,
} from "@/lib/data";

export const metadata = {
  title: "Our Services | I Constructions | Building Excellence",
  description: "Explore I Constructions' construction capabilities, architectural planning, interior designs, and construction management workflows.",
};

export default async function ServicesPage() {
  // Fetch all datasets asynchronously at the page level (Server Component)
  const [
    company,
    links,
    socials,
    allServices,
    chooseUsCards,
    steps,
  ] = await Promise.all([
    getCompanyInfo(),
    getNavLinks(),
    getSocialLinks(),
    getServices(),
    getWhyChooseUs(),
    getProcessTimeline(),
  ]);

  return (
    <>
      <Navbar companyInfo={company} navLinks={links} />
      <main className="flex-grow">
        {/* Hero Section */}
        <ServicesHero companyInfo={company} />

        {/* Services Overview */}
        <ServicesOverview />

        {/* Service Cards Grid */}
        <ServiceCardsGrid services={allServices} />

        {/* Detailed Service Descriptions */}
        <DetailedServices services={allServices} />

        {/* Why Choose Us (Reused from About page directory) */}
        <WhyChooseUs cards={chooseUsCards} />

        {/* Construction Process Timeline */}
        <ProcessTimeline milestones={steps} />

        {/* Request Quotation Form */}
        <QuotationForm services={allServices} />

        {/* Call To Action Banner */}
        <CallToAction companyInfo={company} />
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
