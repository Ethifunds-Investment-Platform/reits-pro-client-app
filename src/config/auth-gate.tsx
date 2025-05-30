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
	const interceptor = React.useRef(0);
	const { cookie: authToken, deleteCookie } = useCookie(variables.STORAGE.session, "");
	const { account: accountActions } = useActions();
	const { navigate } = useCustomNavigation();

	const logout = React.useCallback(async () => {
		try {
			await logoutAccount();
			deleteCookie();
		} catch {
			navigate("/");
		}
	}, []);

	const session = React.useCallback(async () => {
		setIsLoading(true);
		if (!authToken) {
			logout();
			setIsLoading(false);
			return;
		}

		try {
			const value = axios.interceptors.request.use(
				(config) => {
					try {
						const accessToken = authToken;

						config.headers.Authorization = `Bearer ${accessToken}`;
						return config;
					} catch (error) {
						return Promise.reject(error);
					}
				},
				(error) => {
					return Promise.reject(error);
				}
			);

			interceptor.current = value;
			const response = await whoami();
			accountActions.changeAccount(response);
		} catch (error) {
			logout();
		} finally {
			setIsLoading(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [authToken, logout]);

	React.useEffect(() => {
		session();
		return () => {
			axios.interceptors.request.eject(interceptor.current);
		};
	}, [session]);

	if (isLoading) return <LoadingBox type="screen" load_type="spinner" />;

	return <React.Fragment>{children}</React.Fragment>;
});
