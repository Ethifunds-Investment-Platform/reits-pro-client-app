
import AppContainer from "@/components/app/container/container";
import ProjectTable from "./project-table";
import Render from "@/components/app/render";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import useProjects from "./use-projects";
import TablePagination from "./project-table/table-pagination";
import TableFilters from "./project-table/table-filters";
import NewProjectButton from "./new-project-button";

export default function Projects() {
  const { isFetching, isError, error, data } = useProjects();

	return (
		<AppContainer className="space-y-5">
			<div className="mb-8 flex flex-col lg:flex-row lg:justify-between lg:items-center">
				<div>
					<h1 className="text-3xl font-bold text-navy-800">Listed Projects</h1>
					<p className="text-gray-600 mt-2">
						Listed projects currently in development or fundraising stage
					</p>
				</div>
				<NewProjectButton />
			</div>

      <Card>
        <CardHeader className="px-4 py-2">
          <TableFilters disabled={isFetching} />
        </CardHeader>
        <CardContent className="px-4">
          <div className="flex flex-col h-screen">
            <Render isLoading={isFetching} isError={isError} error={error}>
              <div className="overflow-auto grow">
                <ProjectTable data={data?.docs ?? []} isEmpty={!data?.docs?.length} />
              </div>
              {data && <TablePagination {...data} />}
            </Render>
          </div>
        </CardContent>
      </Card>
    </AppContainer>
  );
}
