import ServiceManager from "@/components/admin/ServiceManager";
import { getCompanyInfo } from "@/lib/data";

export const metadata = {
  title: "Services Management | Admin Dashboard | I Constructions",
  description: "Management panel for viewing, creating, updating, and deleting construction services.",
};

export default async function ServicesPage() {
  const company = await getCompanyInfo();

  return <ServiceManager companyInfo={company} />;
}
