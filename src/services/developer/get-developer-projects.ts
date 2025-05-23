import { variables } from "@/constants";
import axios from "@/lib/axios";
import { PaginationQuery, PaginatedResponse } from "@/types/global.types";
import buildQueryString from "@/lib/build-query-string";
import { Project } from "@/types/project.types";
import { projects } from "@/constants/data/project/projects";
type Response = PaginatedResponse<Project>;

type Parameter = PaginationQuery & {
	developer_id: string;
	project_status?: string;
};

export async function production({ developer_id, ...data }: Parameter): Promise<Response> {
	const query = buildQueryString(data);
	const response = await axios.get(`/developers/${developer_id}/projects?${query}`);
	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(
			() =>
				resolve({
					docs: projects,
					totalDocs: projects.length,
					limit: 10,
					page: 1,
					totalPages: 1,
					hasNextPage: false,
					nextPage: null,
					hasPrevPage: false,
					prevPage: null,
					pagingCounter: 1,
				}),
			2000
		);
	});
}

export default async function getDeveloperProjects(data: Parameter): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();

	return production(data);
}
