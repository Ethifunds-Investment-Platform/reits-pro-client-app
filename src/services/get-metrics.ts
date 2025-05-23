import { variables } from "@/constants";
import axios from "@/lib/axios";
import { Currency } from "@/types/currency.types";
import { currencies } from "@/constants/data/currencies";
import { generateDigits } from "@/lib/generate-digits";

type Response = {
	total_investments: number;
	total_investors: number;
	average_return: number;
};

export async function production(): Promise<Response> {
	const response = await axios.get(`/metrics`);
	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(
			() =>
				resolve({
					total_investments: generateDigits(99999999),
					total_investors: generateDigits(999),
					average_return: generateDigits(99),
				}),
			2000
		);
	});
}

export default async function getMetrics(): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();

	return production();
}
