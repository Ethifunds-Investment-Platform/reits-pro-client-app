import { variables } from "@/constants";
import { bankAccounts } from "@/constants/data/bank-accounts";
import axios from "@/lib/axios";
import { generateDigits } from "@/lib/generate-digits";
import { BankAccount } from "@/types/bank-account.types";

type Parameters = {
	name: string;
	account_number: string;
	bank_code: string;
};

type Response = BankAccount;

export async function production(payload: Parameters): Promise<Response> {
	const response = await axios.post(`/settings/add-bank`, payload);
	const data = response.data.data;

	return {
		id: data.id,
		user_id: data.id,
		active: data.active,
		currency: data.currency,
		name: data.name,
		recipient_code: data.recipient_code,
		type: data.type,
		account_number: data.details?.account_number,
		account_name: data.details?.account_name,
		bank_code: data.details?.bank_code,
		bank_name: data.details?.bank_name,
		created_at: data.createdAt,
		updated_at: data.updatedAt,
	};
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(
			() =>
				resolve({
					...bankAccounts[0],
					id: generateDigits(9999),
				}),
			2000
		);
	});
}

export default async function addAccount(data: Parameters): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();

	return production(data);
}
