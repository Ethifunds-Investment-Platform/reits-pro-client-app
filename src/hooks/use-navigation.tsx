import {
	useNavigate,
	To,
	NavigateOptions,
	useLocation,
	useParams,
	useSearchParams,
} from "react-router-dom";

type ToExtended = To | number;

const useCustomNavigation = () => {
	const location = useLocation();
	const params = useParams();
	const navigate = useNavigate();
	const [queryParams, setQueryParams] = useSearchParams();

	// Query parameter utilities
	const queryUtils = {
		queries: queryParams,
		has: (name: string, value?: string) => queryParams.has(name, value),
		get: (name: string) => queryParams.get(name),
		set: (name: string, value: string) => {
			setQueryParams((prev) => {
				prev.set(name, value);
				return prev;
			});
		},
		append: (name: string, value: string) => {
			setQueryParams((prev) => {
				prev.append(name, value);
				return prev;
			});
		},

		delete: (name: string) => {
			setQueryParams((prev) => {
				prev.delete(name);
				return prev;
			});
		},
	};

	// Navigation utility
	const navigateTo = (path: ToExtended, options: NavigateOptions = {}) => {
		if (typeof path === "number") {
			navigate(path);
		} else {
			navigate(path, options);
		}
	};

	return {
		navigate: navigateTo,
		params,
		location,
		queryParams: queryUtils,
	};
};

export default useCustomNavigation;
