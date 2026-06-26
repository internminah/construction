import ProjectTracker from "@/components/admin/ProjectTracker";
import { getCompanyInfo } from "@/lib/data";

export const metadata = {
  title: "Project Tracking Management | Admin Dashboard | I Constructions",
  description: "Management panel for internal project tracking, phase monitoring, progress status updates, and manager assignments.",
};

export default async function ProjectsPage() {
  const company = await getCompanyInfo();

  return <ProjectTracker companyInfo={company} />;
}
