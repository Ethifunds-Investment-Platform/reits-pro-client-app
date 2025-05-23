import { variables } from "@/constants";
import { users } from "@/constants/data/users";
import axios from "@/lib/axios";
import { generateDigits } from "@/lib/generate-digits";
import { User } from "@/types/user.types";

type Response = {
	active_projects: number;
	completed_projects: number;
	updates_due: number;
};

export async function production(): Promise<Response> {
	const response = await axios.get(`/developers/metrics`);
	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(
			() =>
				resolve({
					active_projects: generateDigits(99),
					completed_projects: generateDigits(99),
					updates_due: generateDigits(99),
				}),
			2000
		);
	});
}

export default async function getDeveloperMetrics(): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();

	return production();
}
