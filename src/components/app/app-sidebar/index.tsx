import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
} from "@/components/ui/sidebar";
import { sidebarLinks } from "./data";
import SidebarLink from "./sidebar-link";
import * as React from "react";
import useCustomNavigation from "@/hooks/use-navigation";
import AppLogo from "../app-logo";

import { UserRole } from "@/types/user.types";
import { variables } from "@/constants";
import { Separator } from "@/components/ui/separator";

type Props = {
	role: UserRole;
};
export default function AppSidebar(props: Props) {
	const [activeLink, setActiveLink] = React.useState("");
	const [currentPath, setCurrentPath] = React.useState("");
	const { location } = useCustomNavigation();

	React.useEffect(() => {
		setCurrentPath(location.pathname);
	}, [location]);
	const linkProps = {
		activeLink,
		setActiveLink,
		currentPath,
	};
	return (
		<Sidebar className="py-5">
			<SidebarHeader className="px-3">
				<AppLogo clickable={true} />
			</SidebarHeader>
			<Separator />
			<SidebarContent className="px-3 pt-5">
				<SidebarGroup>
					<SidebarGroupContent className="space-y-3">
						{sidebarLinks
							.filter((item) => item.role.includes(props.role))
							.map((item) => (
								<SidebarLink key={item.name} {...item} {...linkProps} />
							))}
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<div className="p-4 rounded-md bg-sidebar-accent/10">
					<p className="text-sm text-sidebar-foreground/80">
						Need help?{" "}
						<a
							href={`mailto:${variables.CONTACTS.support_email}`}
							target="_blank"
							rel="noopener noreferrer"
							className="text-primary underline font-semibold"
						>
							Contact support
						</a>
					</p>
				</div>
			</SidebarFooter>
		</Sidebar>
	);
}

{
	/* <SidebarGroup className={"pt-0"}>
	<SidebarGroupContent>
		<SidebarMenu>
			{links.map((item) => (
				<SidebarMenuItem key={item.title}>
					<SidebarMenuButton asChild>
						<Link href={item.href}>
							<item.icon />
							<span>{item.title}</span>
						</Link>
					</SidebarMenuButton>
				</SidebarMenuItem>
			))}
		</SidebarMenu>
	</SidebarGroupContent>
</SidebarGroup>; */
}
