import { variables } from "@/constants";
import axios from "@/lib/axios";
import { Project } from "@/types/project.types";
import { projects } from "@/constants/data/project/projects";
type Response = Project[];

type Parameter = {
	developer_id: string;
};

export async function production(data: Parameter): Promise<Response> {
	const response = await axios.get(`/developers/${data.developer_id}/projects/recent`);
	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(() => resolve(projects), 2000);
	});
}

export default async function getDeveloperRecentProjects(data: Parameter): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();

	return production(data);
}
