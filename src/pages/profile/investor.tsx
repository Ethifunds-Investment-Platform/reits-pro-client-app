
import InvestorProfilePage from "@/features/profile/investor";
import useSeo from "@/hooks/use-seo";
export default function InvestorProfile() {
	useSeo({
		pageTitle: "Investor Profile",
		metaDescription: "Investor Profile",
	});
	return <InvestorProfilePage />;
}
