
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LogIn, UserPlus, User, Building } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAppSelector from "@/store/hooks";
import logoutAccount from "@/services/account/logout";
import { useToast } from "@/hooks/use-toast";
import useCustomNavigation from "@/hooks/use-navigation";
import useCookie from "@/hooks/use-cookie";
import { variables } from "@/constants";
import useActions from "@/store/actions";
import * as React from "react";

const AuthButtons = () => {
	const { account } = useAppSelector("account");
	const { cookie: authToken, deleteCookie } = useCookie(variables.STORAGE.session, "");
	const { navigate } = useCustomNavigation();
	const { toast } = useToast();

	const { account: accountActions, ui } = useActions();

	const profilePath = React.useMemo(() => {
		if (account?.role === "developer") {
			return "/profile/developer";
		}
		return "/profile/investor";
	}, [account?.role]);

	const handleLogoutConfirm = async () => {
		try {
			await logoutAccount({ auth_token: authToken });
			deleteCookie();
			navigate("/", { replace: true });
			toast({
				title: "Logged out",
				description: "You have been logged out successfully",
			});
			accountActions.changeAccount({} as any);
		} catch (error) {
			toast({
				variant: "destructive",
				title: "Error",
				description: "Failed to log out. Please try again.",
			});
		}
	};

	const handleLogout = () => {
		ui.changeDialog({
			show: true,
			type: "logout",
			action: handleLogoutConfirm,
			id: "logout-dialog",
			data: null,
			dismiss: null,
		});
	};

	if (account?.id) {
		return (
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="outline"
						className="flex items-center gap-2 border-navy-600 text-navy-600 hover:bg-navy-50"
					>
						<User className="h-4 w-4" />
						<span className="hidden md:inline">My Account</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="w-56">
					<div className="px-2 py-1.5 text-sm font-medium">
						<span className="line-clamp-1">
						{account.email}
						</span>
						<div className="text-xs text-gray-500 mt-1">
							Role: {account.role.charAt(0).toUpperCase() + account.role.slice(1)}
						</div>
					</div>
					<DropdownMenuSeparator />
					{account.role === "developer" && (
						<Link to="/developer/dashboard">
							<DropdownMenuItem>
								<Building className="mr-2 h-4 w-4" />
								Developer Dashboard
							</DropdownMenuItem>
						</Link>
					)}
					{account.role === "investor" && (
						<Link to="/investor/dashboard">
							<DropdownMenuItem>
								<Building className="mr-2 h-4 w-4" />
								Investor Dashboard
							</DropdownMenuItem>
						</Link>
					)}
					<Link to={profilePath}>
						<DropdownMenuItem>Profile</DropdownMenuItem>
					</Link>
					<DropdownMenuSeparator />
					<DropdownMenuItem onClick={handleLogout} className="text-red-600">
						Logout
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		);
	}

	return (
		<>
			<Button variant="outline" className="border-navy-600 text-navy-600 hover:bg-navy-50" asChild>
				<Link to="/auth/login" className="flex items-center gap-2">
					<LogIn className="h-4 w-4" />
					<span>Sign In</span>
				</Link>
			</Button>
			<Button className="bg-navy-800 hover:bg-navy-700 text-white" asChild>
				<Link to="/auth/register" className="flex items-center gap-2">
					<UserPlus className="h-4 w-4" />
					<span>Sign Up</span>
				</Link>
			</Button>
		</>
	);
};

export default AuthButtons;
