import Dashboard from "@/components/admin/Dashboard";
import {
  getCompanyInfo,
  getDashboardStats,
  getProjects,
  getReviews,
} from "@/lib/data";

export const metadata = {
  title: "Admin Dashboard | I Constructions",
  description: "Management portal for checking client inquiries, portfolio project cards, and client reviews.",
};

export default async function AdminPage() {
  const [company, stats, allProjects, allReviews] = await Promise.all([
    getCompanyInfo(),
    getDashboardStats(),
    getProjects(),
    getReviews(),
  ]);

  return (
    <Dashboard
      companyInfo={company}
      stats={stats}
      projects={allProjects}
      reviews={allReviews}
    />
  );
}
