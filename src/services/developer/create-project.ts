
import { variables } from "@/constants";
import axios from "@/lib/axios";
import { NewProject, Project } from "@/types/project.types";
import { projects } from "@/constants/data/project/projects";
import  {buildFormData}  from "@/lib/build-form-data";

type Response = Project;

type Parameters = NewProject;

export async function production(data: Parameters): Promise<Response> {
	const formData = buildFormData(data);

	const response = await axios.post("/developers/projects/create", formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(() => resolve(projects[0]), 1000);
	});
}

export default async function createProject(data: Parameters): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();
	return production(data);
}


