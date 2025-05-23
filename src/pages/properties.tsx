import Properties from "@/features/properties";
import useSeo from "@/hooks/use-seo";

export default function PropertiesPage() {
	useSeo({ pageTitle: "Properties" });
	return <Properties />;
}
