import { variables } from "@/constants";
import axios from "@/lib/axios";


type Response = {
	reference: string;
};

type Parameter = {
	project_id: string;
	amount: number;
	auth_token: string;
};

export async function production(data: Parameter): Promise<Response> {
	const response = await axios.post(`/investments/purchase/initialize`, data, {
		headers: {
			Authorization: `Bearer ${data.auth_token}`,
		},
	});
	return response.data.data;
}	

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				reference: "INV_PMKHIWTPMZ_1756899827",
			});
		}, 1000);
	});
}

export default async function initiateInvestment(data: Parameter): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();

	return production(data);
}
