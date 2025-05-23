import { variables } from "@/constants";
import { users } from "@/constants/data/users";
import axios from "@/lib/axios";
import { User, UserRole } from "@/types/user.types";

type Parameters = {
	email: string;
	name: string;
	phone_number: string;
	password: string;
	role: UserRole;
	operating_location: string;
	established_at: string;
};

type Response = User;

export async function production(data: Parameters): Promise<Response> {
	const response = await axios.post(`/auth/register`, data);
	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(() => resolve(users[0]), 2000);
	});
}

export default async function createAccount(data: Parameters): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();

	return production(data);
}
