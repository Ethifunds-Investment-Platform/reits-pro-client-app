import { variables } from "@/constants";
import axios from "@/lib/axios";

type Parameters = {
	account_number: string;
	bank_code: string;
};

type Response = {
	account_number: string;
	account_name: string;
	bank_id: number;
};

export async function production(payload: Parameters): Promise<Response> {
	const response = await axios.post(`/settings/verify-account-details`, payload);

	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(
			() =>
				resolve({
					account_number: "0225644127",
					account_name: "EZE VICTOR UCHECHUKWU",
					bank_id: 9,
				}),
			2000
		);
	});
}

export default async function verifyAccountNumber(data: Parameters): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();

	return production(data);
}
