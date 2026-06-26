import InquiryManager from "@/components/admin/InquiryManager";
import { getCompanyInfo } from "@/lib/data";

export const metadata = {
  title: "Contact Enquiries Management | Admin Dashboard | I Constructions",
  description: "Management panel for monitoring, checking, and deleting user inquiries.",
};

export default async function ContactsPage() {
  const company = await getCompanyInfo();

  return <InquiryManager companyInfo={company} />;
}
