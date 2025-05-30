import { variables } from "@/constants";
import axios from "@/lib/axios";
import { DeveloperProfile } from "@/types/developer.types";
import { developers } from "@/constants/data/developers";

type Response = DeveloperProfile;

type Parameters = {
	developer_id: string;
};

export async function production({ developer_id }: Parameters): Promise<Response> {
	const response = await axios.get(`/developers/${developer_id}/profile`);
	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(() => resolve(developers[0]), 2000);
	});
}

export default async function getDeveloperProfile(data: Parameters): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();

	return production(data);
}
