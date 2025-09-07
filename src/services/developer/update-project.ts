import { variables } from "@/constants";
import axios from "@/lib/axios";
import { NewProject, Project } from "@/types/project.types";
import { buildProjectFormData } from "@/lib/build-form-data";
import { projects } from "@/constants/data/project/projects";

type Response = Project;

type Parameters = NewProject & { id: string };

export async function production(data: Parameters): Promise<Response> {
	const formData = buildProjectFormData(data);

	const response = await axios.put(`/developers/projects/${data.id}`, formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
	return response.data.data;
}

export async function development(data: Parameters): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(() => resolve(projects[0]), 1000);
	});
}

export default async function updateProject(data: Parameters): Promise<Response> {
	if (variables.NODE_ENV === "development") return development(data);
	return production(data);
}
