import { Link } from "react-router-dom";
import ProjectTable from "../project-table";
import Render from "@/components/app/render";
import useRecentProjects from "./use-recent-projects";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";


export default function RecentProjects() {
	const { isFetching, isError, error, data } = useRecentProjects();

	return (
		<Card className="w-full ">
			<CardHeader className=" px-4 w-full">
				<div>
					<CardTitle className="text-primary">Recent Listed Projects</CardTitle>
					<CardDescription>
						Recent listed projects currently in development or fundraising stage
					</CardDescription>
				</div>

				{data && data?.length > 0 && (
					<div className="self-end">
						<Link to={"/developer/projects"} className="text-primary underline">
							View All
						</Link>
					</div>
				)}
			</CardHeader>
			<CardContent className="h-full max-h-96 min-h-60 overflow-auto px-4">
				<Render isLoading={isFetching} isError={isError} error={error}>
					<ProjectTable data={data ?? []} isEmpty={!data?.length} />
				</Render>
			</CardContent>
		</Card>
	);
}
