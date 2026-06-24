import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import HeroSection from "@/components/about/HeroSection";
import CompanyIntro from "@/components/about/CompanyIntro";
import MissionVision from "@/components/about/MissionVision";
import Timeline from "@/components/about/Timeline";
import WhyChooseUs from "@/components/about/WhyChooseUs";
import TeamSection from "@/components/about/TeamSection";
import Achievements from "@/components/about/Achievements";
import ContactInfo from "@/components/about/ContactInfo";

import {
  getCompanyInfo,
  getNavLinks,
  getSocialLinks,
  getServices,
  getMilestones,
  getWhyChooseUs,
  getTeamMembers,
  getAchievements,
  getContactInfo,
} from "@/lib/data";

export const metadata = {
  title: "About Us | I Constructions | Building Excellence Since 2015",
  description: "Learn about I Constructions' team, journey milestones since 2015, and mission to deliver architectural brilliance.",
};

export default async function AboutPage() {
  // Fetch all datasets asynchronously at the page level (Server Component)
  const [
    company,
    links,
    socials,
    allServices,
    journeyMilestones,
    chooseUsCards,
    leaders,
    stats,
    contacts,
  ] = await Promise.all([
    getCompanyInfo(),
    getNavLinks(),
    getSocialLinks(),
    getServices(),
    getMilestones(),
    getWhyChooseUs(),
    getTeamMembers(),
    getAchievements(),
    getContactInfo(),
  ]);

  return (
    <>
      <Navbar companyInfo={company} navLinks={links} />
      <main className="flex-grow">
        {/* Hero Section */}
        <HeroSection companyInfo={company} />

        {/* Company Introduction */}
        <CompanyIntro companyInfo={company} />

        {/* Mission & Vision */}
        <MissionVision />

        {/* Company Journey Timeline */}
        <Timeline milestones={journeyMilestones} />

        {/* Why Choose Us */}
        <WhyChooseUs cards={chooseUsCards} />

        {/* Leadership Team */}
        <TeamSection team={leaders} />

        {/* Achievement Metrics */}
        <Achievements stats={stats} />

        {/* Contact Coordinates */}
        <ContactInfo contacts={contacts} />
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
