import useCustomNavigation from "@/hooks/use-navigation";
import getDeveloperProjects from "@/services/developer/get-developer-projects";
import useAppSelector from "@/store/hooks";
import { useQuery } from "@tanstack/react-query";

export default function useProjects() {
	const { account } = useAppSelector("account");
	const { queryParams } = useCustomNavigation();
	const page = Number(queryParams.get("page") ?? 1);
	const project_status = queryParams.get("project_status") ?? "";

	const query = useQuery({
		queryKey: ["projects", page, project_status],
		queryFn: () => getDeveloperProjects({ developer_id: account?.id, page, project_status }),
		enabled: !!account?.id,
	});
	return {
		...query,
	};
}
