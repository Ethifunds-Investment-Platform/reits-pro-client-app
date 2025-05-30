import { variables } from "@/constants";
import axios from "@/lib/axios";
import { generateDigits } from "@/lib/generate-digits";

type Response = {
	active_projects: number;
	completed_projects: number;
	total_investment: number;
};

export async function production(): Promise<Response> {
	const response = await axios.get(`/developers/metrics`);
	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(
			() =>
				resolve({
					active_projects: generateDigits(99),
					completed_projects: generateDigits(99),
					total_investment: generateDigits(99999999),
				}),
			2000
		);
	});
}

export default async function getDeveloperMetrics(): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();

	return production();
}
