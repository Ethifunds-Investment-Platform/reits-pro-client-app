
import { variables } from "@/constants";
import axios from "@/lib/axios";
import { PaginationQuery, PaginatedResponse } from "@/types/global.types";
import buildQueryString from "@/lib/build-query-string";
import { Investment } from "@/types/investments.types";
import { investments } from "@/constants/data/investment/investments";

type Response = PaginatedResponse<Investment>;

type Parameter = PaginationQuery & {
	investor_id?: string;
	status?: string;
	search?: string;
};

export async function production({ investor_id, ...data }: Parameter): Promise<Response> {
	const query = buildQueryString(data);
	const response = await axios.get(`/investors/investments?${query}`);
	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(
			() =>
				resolve({
					docs: investments,
					totalDocs: investments.length,
					limit: 10,
					page: 1,
					totalPages: 1,
					hasNextPage: false,
					nextPage: null,
					hasPrevPage: false,
					prevPage: null,
					pagingCounter: 1,
				}),
			2000
		);
	});
}

export default async function getInvestorInvestments(data: Parameter): Promise<Response> {
	if (variables.NODE_ENV === "development") return development();

	return production(data);
}
