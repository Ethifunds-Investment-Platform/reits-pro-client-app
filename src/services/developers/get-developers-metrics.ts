import { variables } from "@/constants";
import axios from "@/lib/axios";
import { DevelopersMetrics } from "@/types/developer.types";
import { developersMetrics } from "@/constants/data/developers";
type Response = DevelopersMetrics;

export async function production(): Promise<Response> {
	const response = await axios.get(`/developers-metrics`);
	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(() => resolve(developersMetrics), 2000);
	});
}

export default async function getDevelopersMetrics(): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();

	return production();
}
