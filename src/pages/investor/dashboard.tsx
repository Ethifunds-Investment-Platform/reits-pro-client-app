
import InvestorDashboard from "@/features/dashboard/investor";
import useSeo from "@/hooks/use-seo";

export default function InvestorDashboardPage() {
	useSeo({ pageTitle: "Investor Dashboard" });
	return <InvestorDashboard />;
}
