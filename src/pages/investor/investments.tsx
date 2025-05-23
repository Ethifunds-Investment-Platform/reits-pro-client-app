
import InvestorInvestments from "@/features/investments";
import useSeo from "@/hooks/use-seo";

export default function InvestorInvestmentsPage() {
	useSeo({ pageTitle: "Investor Investments" });
	return <InvestorInvestments />;
}
