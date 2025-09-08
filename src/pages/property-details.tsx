import PropertyDetails from "@/features/properties/property-details";
import useSeo from "@/hooks/use-seo";

export default function PropertyDetailsPage() {
	useSeo({ pageTitle: "Property Details" });

	return <PropertyDetails />;
}
