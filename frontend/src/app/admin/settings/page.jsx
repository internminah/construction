import SettingsManager from "@/components/admin/SettingsManager";
import { getCompanyInfo } from "@/lib/data";

export const metadata = {
  title: "System Settings | Admin Dashboard | I Constructions",
  description: "Configure company identity details, admin credentials, and global system fallback parameters.",
};

export default async function SettingsPage() {
  const company = await getCompanyInfo();

  return <SettingsManager companyInfo={company} />;
}
