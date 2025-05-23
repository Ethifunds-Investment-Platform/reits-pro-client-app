import getDeveloperRecentProjects from "@/services/developer/get-developer-recent-projects";
import useAppSelector from "@/store/hooks";
import { useQuery } from "@tanstack/react-query";

export default function useRecentProjects() {
	const { account } = useAppSelector("account");
	const query = useQuery({
		queryKey: ["recent-projects"],
		queryFn: () => getDeveloperRecentProjects({ developer_id: account?.id }),
		enabled: !!account?.id,
	});
	return {
		...query,
	};
}
