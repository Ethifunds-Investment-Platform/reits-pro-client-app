import { variables } from "@/constants";
import axios from "@/lib/axios";
import { Project } from "@/types/project.types";
import { projects } from "@/constants/data/project/projects";

type Response = Project[];

export async function production(): Promise<Response> {
	const response = await axios.get(`/properties/featured`);
	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(projects);
		}, 1000);
	});
}

export default async function getFeaturedProperties(): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();

	return production();
}
