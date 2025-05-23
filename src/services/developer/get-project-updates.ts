import { variables } from "@/constants";
import axios from "@/lib/axios";
import { ProjectUpdate } from "@/types/project.types";
import { projectUpdates } from "@/constants/data/project/project-updates";

type Response = ProjectUpdate[];

type Parameter = {
	project_id: string;
};

export async function production(data: Parameter): Promise<Response> {
	const response = await axios.get(`/projects/${data.project_id}/updates`);
	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(() => resolve(projectUpdates), 2000);
	});
}

export default async function getProjectUpdates(data: Parameter): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();

	return production(data);
}
