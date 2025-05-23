import ProjectDetails from "@/features/projects/project-details";
import useSeo from "@/hooks/use-seo";

export default function ProjectDetailsPage() {
	useSeo({ pageTitle: "Project Details" });

	return <ProjectDetails />;
}
