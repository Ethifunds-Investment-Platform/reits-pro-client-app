import AppSidebar from "@/components/app/app-sidebar";
import SidebarHeader from "@/components/app/app-sidebar/sidebar-header";
import Redirect from "@/components/app/redirect";
import Render from "@/components/app/render";
import { SidebarProvider } from "@/components/ui/sidebar";
import AuthGate, { AuthGateProvider } from "@/config/auth-gate";
import Dialogs from "@/dialogs";
import useCustomNavigation from "@/hooks/use-navigation";
import useAppSelector from "@/store/hooks";
import { UserRole } from "@/types/user.types";
import * as React from "react";
import { Outlet } from "react-router-dom";

export default function AccountLayout(props: { requiredRole: UserRole }) {
	const { account } = useAppSelector("account");
	const [isLoading, setIsLoading] = React.useState(true);
	const { location } = useCustomNavigation();

	const restricted = React.useMemo(() => {
		if (!account?.role) return;
		const rolePaths: Record<UserRole, string> = {
			developer: "developer",
			investor: "investor",
		};

		const isRestricted =
			location.pathname.includes(rolePaths[props.requiredRole]) &&
			account.role !== props.requiredRole;

		setIsLoading(false);

		return isRestricted;
	}, [account.role, location.pathname, props.requiredRole]);

	return (
		<AuthGateProvider>
			<AuthGate>
				<Render isLoading={isLoading}>
					{restricted ? (
						<Redirect to="/forbidden" />
					) : (
						<SidebarProvider>
							<AppSidebar role={props.requiredRole} />

							<main className="flex flex-col w-full">
								<SidebarHeader />
								<Outlet />
							</main>
							<Dialogs />
						</SidebarProvider>
					)}
				</Render>
			</AuthGate>
		</AuthGateProvider>
	);
}
