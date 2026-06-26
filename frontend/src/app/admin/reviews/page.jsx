import ReviewManager from "@/components/admin/ReviewManager";
import { getCompanyInfo } from "@/lib/data";

export const metadata = {
  title: "Review Moderation Management | Admin Dashboard | I Constructions",
  description: "Management panel for reviewing, approving, rejecting, editing, and deleting customer testimonials.",
};

export default async function ReviewsPage() {
  const company = await getCompanyInfo();

  return <ReviewManager companyInfo={company} />;
}
