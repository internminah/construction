import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import ContactHero from "@/components/contact/ContactHero";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactForm from "@/components/contact/ContactForm";
import ContactMap from "@/components/contact/ContactMap";
import SocialLinks from "@/components/contact/SocialLinks";
import ContactCTA from "@/components/contact/ContactCTA";
import {
  getCompanyInfo,
  getNavLinks,
  getSocialLinks,
  getServices,
} from "@/lib/data";

export const metadata = {
  title: "Contact Us | I Constructions | Start Your Construction Roadmap",
  description: "Get in touch with I Constructions for project quotes, consultations, and architectural blueprint inquiries.",
};

export default async function ContactPage() {
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
        <ContactHero companyInfo={company} />

        {/* 2. Contact Information Cards */}
        <ContactInfo companyInfo={company} />

        {/* 3. Contact Form */}
        <ContactForm />

        {/* 4. Google Map Location */}
        <ContactMap companyInfo={company} />

        {/* 5. Social Media Links */}
        <SocialLinks />

        {/* 6. Call to Action */}
        <ContactCTA companyInfo={company} />
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

