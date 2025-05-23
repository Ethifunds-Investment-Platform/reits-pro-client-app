import { useQuery } from "@tanstack/react-query";
import getInvestorInvestments from "@/services/investor/get-investor-investments";
import useAppSelector from "@/store/hooks";
import useCustomNavigation from "@/hooks/use-navigation";

export default function useInvestments() {
	const { account } = useAppSelector("account");
	const { queryParams } = useCustomNavigation();
	const page = queryParams.get("page") ? parseInt(queryParams.get("page")!) : 1;
	const status = queryParams.get("status");
	const search = queryParams.get("search");

	const query = useQuery({
		queryKey: ["investor-investments-list", account?.id, page, status, search],
		queryFn: () =>
			getInvestorInvestments({
				investor_id: account?.id,
				page,
				status,
				search,
			}),
		enabled: !!account?.id,
	});

	return {
		...query,
		filters: {
			status,
		},
	};
}
