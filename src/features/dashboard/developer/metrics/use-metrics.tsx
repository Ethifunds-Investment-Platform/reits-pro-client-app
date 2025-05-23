import { useQuery } from "@tanstack/react-query";
import getDeveloperMetrics from "@/services/developer/get-developer-metrics";

export default function useMetrics() {
	const { isFetching, data } = useQuery({
		queryKey: ["developer-metrics"],
		queryFn: getDeveloperMetrics,
	});
	return { isFetching, data };
}
