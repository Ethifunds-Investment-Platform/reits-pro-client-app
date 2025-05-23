import DeveloperPartners from "@/features/developer-partners";
import useSeo from "@/hooks/use-seo";

export default function DeveloperPartnersPage() {
	useSeo({ pageTitle: "Developer Partners" });
	return <DeveloperPartners />;
}
