import { variables } from "@/constants";
import axios from "@/lib/axios";
import { generateDigits } from "@/lib/generate-digits";

type Response = {
	total_invested: number;
	portfolio_value: number;
	total_projects: number;
	average_return: number;
};

export async function production(): Promise<Response> {
	const response = await axios.get(`/investors/metrics`);
	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(
			() =>
				resolve({
					total_invested: generateDigits(9999999),
					portfolio_value: generateDigits(99),
					total_projects: generateDigits(99),
					average_return: generateDigits(99),
				}),
			2000
		);
	});
}

export default async function getInvestorMetrics(): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();

	return production();
}
