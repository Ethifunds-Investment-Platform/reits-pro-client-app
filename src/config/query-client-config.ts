import { variables } from "@/constants";
import { QueryClientConfig } from "@tanstack/react-query";

export const queryClientConfig: QueryClientConfig = {
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: variables.NODE_ENV !== "development",
		},
	},
};
