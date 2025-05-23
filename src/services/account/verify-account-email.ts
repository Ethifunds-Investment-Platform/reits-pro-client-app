import { variables } from "@/constants";
import axios from "@/lib/axios";

type Parameters = {
	otp_code: string;
	email: string;
};

type Response = void;

export async function production(data: Parameters): Promise<Response> {
	await axios.post(`/auth/verify-email-otp`, data);
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(() => resolve(), 2000);
	});
}

export default async function verifyAccountEmail(data: Parameters): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();

	return production(data);
}
