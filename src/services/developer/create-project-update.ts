import { variables } from "@/constants";
import axios from "@/lib/axios";
import { NewProjectUpdate } from "@/types/project.types";

type Response = {
	id: string;
	project_id: string;
	title: string;
	content: string;
	images: string[];
	created_at: string;
};

type Parameters = NewProjectUpdate;

export async function production(data: Parameters): Promise<Response> {
	const response = await axios.post("/developers/project-updates", data);
	return response.data.data;
}

export async function development(data: Parameters): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(
			() =>
				resolve({
					id: "upd_" + Date.now(),
					project_id: data.project_id,
					title: data.title,
					content: data.content,
					images: data.images || [],
					created_at: new Date().toISOString(),
				}),
			1000
		);
	});
}

export default async function createProjectUpdate(data: Parameters): Promise<Response> {
	if (variables.NODE_ENV === "development") return development(data);
	return production(data);
}
