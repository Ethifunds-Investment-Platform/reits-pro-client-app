import { variables } from "@/constants";
import axios from "@/lib/axios";
import { Currency } from "@/types/currency.types";
import { currencies } from "@/constants/data/currencies";
type Response = Currency[];

export async function production(): Promise<Response> {
	const response = await axios.get(`/currencies`);
	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(() => resolve(currencies), 2000);
	});
}

export default async function getActiveCurrency(): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();

	return production();
}
