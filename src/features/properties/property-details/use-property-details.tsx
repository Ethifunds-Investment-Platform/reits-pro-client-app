import useCustomNavigation from "@/hooks/use-navigation";
import getPropertiesById from "@/services/properties/get-properties-by-id";
import { useQuery } from "@tanstack/react-query";

export default function usePropertyDetails() {
	const { params } = useCustomNavigation();
	const project_id = params.id;

	const { data, isFetching, isError, error } = useQuery({
		queryKey: ["property-details", project_id],
		queryFn: () => getPropertiesById({ project_id }),
	});

	return { data, isFetching, isError, error };
}
