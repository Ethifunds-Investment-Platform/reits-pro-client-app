
import DeveloperProfilePage from "@/features/profile/developer";
import useSeo from "@/hooks/use-seo";

export default function DeveloperProfile() {
	useSeo({
		pageTitle: "Developer Profile",
		metaDescription: "Developer Profile",
	});
	return <DeveloperProfilePage />;
}
