import { variables } from "@/constants";
import { bankList } from "@/constants/data/bank-list";
import axios from "@/lib/axios";
import { Bank } from "@/types/bank-account.types";

type Response = Bank[];

export async function production(): Promise<Response> {
	const response = await axios.get(`/bank-list`);

	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(() => resolve(bankList), 2000);
	});
}

export default async function getBankList(): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();

	return production();
}
