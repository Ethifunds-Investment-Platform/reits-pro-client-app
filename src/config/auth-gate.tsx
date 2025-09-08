import LoadingBox from "@/components/app/loading-box";
import { variables } from "@/constants";
import useCookie from "@/hooks/use-cookie";
import useCustomNavigation from "@/hooks/use-navigation";
import axios from "@/lib/axios";
import logoutAccount from "@/services/account/logout";
import whoami from "@/services/account/whoami";
import useActions from "@/store/actions";
import * as React from "react";

export default React.memo(function AuthGate({ children }: { children: React.ReactNode }) {
	const [isLoading, setIsLoading] = React.useState(true);
	const [isAuthenticated, setIsAuthenticated] = React.useState(false);
	const interceptor = React.useRef(0);
	const { cookie: authToken, deleteCookie } = useCookie(variables.STORAGE.session, "");
	const { account: accountActions } = useActions();
	const { navigate } = useCustomNavigation();

	const logout = React.useCallback(async () => {
		try {
			await logoutAccount();
			deleteCookie();
		} catch {
			deleteCookie();
			navigate("/");
		}
	}, []);

	// Setup interceptor function
	const setupInterceptor = React.useCallback(() => {
		if (interceptor.current !== null) {
			// Remove existing interceptor first
			axios.interceptors.request.eject(interceptor.current);
		}

		if (authToken) {
			const value = axios.interceptors.request.use(
				(config) => {
					try {
						config.headers.Authorization = `Bearer ${authToken}`;
						return config;
					} catch (error) {
						return Promise.reject(error);
					}
				},
				(error) => Promise.reject(error)
			);
			interceptor.current = value;
		}
	}, [authToken]);

	const session = React.useCallback(async () => {
	if (isAuthenticated) {
		setIsLoading(false);
		return;
	}

	setIsLoading(true);

	if (!authToken) {
		setIsAuthenticated(false);
		setIsLoading(false);
		return;
	}


		try {
			

				setupInterceptor();
			const response = await whoami();
			accountActions.changeAccount(response);
			setIsAuthenticated(true);
		} catch (error) {
			logout();
		} finally {
			setIsLoading(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [authToken, logout]);

	// Setup interceptor whenever authToken changes and user is authenticated
	React.useEffect(() => {
		if (isAuthenticated && authToken) {
			setupInterceptor();
		}
	}, [authToken, isAuthenticated, setupInterceptor]);

	React.useEffect(() => {
		session();

		// // Cleanup function
		return () => {
			if (interceptor.current !== null) {
				axios.interceptors.request.eject(interceptor.current);
			}
		};
	}, []);

	if (isLoading) return <LoadingBox type="screen" load_type="spinner" />;

	return <React.Fragment>{children}</React.Fragment>;
});
