import DeveloperDashboard from "@/features/dashboard/developer";
import useSeo from "@/hooks/use-seo";

export default function DeveloperDashboardPage() {
	useSeo({ pageTitle: "Developer Dashboard" });
	return <DeveloperDashboard />;
}
