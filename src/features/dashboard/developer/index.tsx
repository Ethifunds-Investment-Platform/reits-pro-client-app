
import AppContainer from "@/components/app/container/container";
import DeveloperMetrics from "./metrics";
import RecentProjects from "@/features/projects/recent-projects";
import useAppSelector from "@/store/hooks";
import NewProjectButton from "@/features/projects/new-project-button";

export default function DeveloperDashboard() {
  const { account } = useAppSelector("account");

	return (
		<AppContainer className="flex flex-col gap-5">
			<div className="mb-8 flex flex-col lg:flex-row lg:justify-between lg:items-center">
				<div>
					<h1 className="text-3xl font-bold text-navy-800">Developer Dashboard</h1>
					<p className="text-gray-600 mt-2">
						Welcome back, {account?.name || account?.email}. Manage your real estate development
						projects.
					</p>
				</div>
				<NewProjectButton />
			</div>

      <DeveloperMetrics />

      <RecentProjects />
    </AppContainer>
  );
}
