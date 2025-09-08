// config/auth-context.tsx
"use client";

import LoadingBox from "@/components/app/loading-box";
import { variables } from "@/constants";
import logoutAccount from "@/services/account/logout";
import whoami from "@/services/account/whoami";
import useActions from "@/store/actions";
import useAppSelector from "@/store/hooks";
import { User } from "@/types/user.types";
import * as React from "react";
import axios from "@/lib/axios";
import useCustomNavigation from "@/hooks/use-navigation";
import useCookie from "@/hooks/use-cookie";

// Define the shape of the context
interface AuthContextType {
	isLoading: boolean;
	isAuthenticated: boolean;
	logout: () => Promise<void>;
	account: User;
}

// Create the context with a default value
const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

// Custom hook to access the context
export function useAuth() {
	const context = React.useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}

// AuthProvider component
interface AuthProviderProps {
	children: React.ReactNode;
}

export const AuthGateProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [isLoading, setIsLoading] = React.useState(true);
	const [isAuthenticated, setIsAuthenticated] = React.useState(false);
	const { account } = useAppSelector("account");
	const interceptor = React.useRef<number | null>(null);
	const { cookie: authToken, deleteCookie } = useCookie(variables.STORAGE.session, "");
	const { account: accountActions } = useActions();
	const { navigate } = useCustomNavigation();

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

	const logout = React.useCallback(async () => {
		try {
			await logoutAccount({});
		} catch (error) {
			if (error) throw error;
		} finally {
			// Clean up interceptor
			if (interceptor.current !== null) {
				axios.interceptors.request.eject(interceptor.current);
				interceptor.current = null;
			}
			deleteCookie();
			setIsAuthenticated(false);
			navigate("/", { replace: true });
		}
	}, [deleteCookie, navigate]);

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
			// Setup interceptor before making the whoami call
			setupInterceptor();

			const response = await whoami();
			accountActions.changeAccount(response);
			setIsAuthenticated(true);
		} catch (error) {
			logout();
			throw error;
		} finally {
			setIsLoading(false);
		}
	}, [authToken, isAuthenticated, logout, accountActions, setupInterceptor]);

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

	// Memoize context value to prevent unnecessary re-renders
	const contextValue = React.useMemo(
		() => ({
			isLoading,
			isAuthenticated,
			logout,
			account: account,
		}),
		[isLoading, isAuthenticated, logout, account]
	);

	if (isLoading) return <LoadingBox type="screen" />;

	return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default function AuthGate({ children }: { children: React.ReactNode }) {
	const { isAuthenticated } = useAuth();
	if (!isAuthenticated) return "not authenticated";
	return <React.Fragment>{children}</React.Fragment>;
}
