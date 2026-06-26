import ProjectManager from "@/components/admin/ProjectManager";
import { getCompanyInfo } from "@/lib/data";

export const metadata = {
  title: "Portfolio Showcase Management | Admin Dashboard | I Constructions",
  description: "Management panel for viewing, creating, updating, and deleting public portfolio showcase items.",
};

export default async function PortfolioPage() {
  const company = await getCompanyInfo();

  return <ProjectManager companyInfo={company} />;
}
