import { variables } from "@/constants";
import { bankAccounts } from "@/constants/data/bank-accounts";
import axios from "@/lib/axios";
import { BankAccount } from "@/types/bank-account.types";

type Response = BankAccount[];

export async function production(): Promise<Response> {
	const response = await axios.get(`/banks/bank-accounts`);
	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(
			() =>
				resolve(bankAccounts),
			2000
		);
	});
}

export default async function getUserAccounts(): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();

	return production();
}
