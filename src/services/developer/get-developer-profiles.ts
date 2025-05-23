import { variables } from "@/constants";
import axios from "@/lib/axios";
import { DeveloperProfile } from "@/types/developer.types";
import { developers } from "@/constants/data/developers";

type Response = DeveloperProfile[];

export async function production(): Promise<Response> {
	const response = await axios.get(`/developers`);
	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(() => resolve(developers), 2000);
	});
}

export default async function getDeveloperProfiles(): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();

	return production();
}
