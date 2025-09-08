import { variables } from "@/constants";
import axios from "@/lib/axios";

type Response = void;

type Parameter = {
	auth_token?: string;
};

export async function production(data: Parameter): Promise<Response> {
	const headers = {};

	if (data.auth_token) {
		headers["Authorization"] = `Bearer ${data?.auth_token}`;
	}
	await axios.post(
		`/auth/logout`,
		{},
		{
			headers,
		}
	);
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(() => resolve(), 2000);
	});
}

export default async function logoutAccount(data: Parameter): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();

	return production(data);
}
