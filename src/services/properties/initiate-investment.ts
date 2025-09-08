import { variables } from "@/constants";
import axios from "@/lib/axios";
import { PaginationQuery, PaginatedResponse } from "@/types/global.types";
import buildQueryString from "@/lib/build-query-string";
import { Project } from "@/types/project.types";
import { projects } from "@/constants/data/project/projects";

type Response = {
	reference: string;
};

type Parameter = {
	project_id: string;
	amount: number;
};



export async function production(data: Parameter): Promise<Response> {
	const query = buildQueryString(data);
	const response = await axios.get(`/investments/purchase/initialize`);
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
