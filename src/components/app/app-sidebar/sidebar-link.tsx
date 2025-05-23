import { Link } from "react-router-dom";
import { SidebarMenuButton, SidebarMenuItem } from "../../ui/sidebar";
import { type SidebarLink } from "./data";
import classNames from "classnames";
import * as React from "react";

type SidebarLinkProps = SidebarLink & {
	currentPath: string;
	activeLink: string;
	setActiveLink: React.Dispatch<React.SetStateAction<string>>;
};
export default React.memo(function SidebarLink(link: SidebarLinkProps) {
	const { icon, name, activeIcon, path, relativePaths, currentPath, activeLink, setActiveLink } =
		link;

	const isActive = React.useMemo(() => {
		const allPaths = [path, ...relativePaths];
		const formattedCurrentPath = currentPath.split("/");
		return (
			allPaths.some((pathPrefix) => {
				const formattedPath = pathPrefix.split("/");
				return formattedCurrentPath.slice(1).includes(formattedPath[formattedPath.length - 1]);
			}) || activeLink == name
		);
	}, [activeLink, currentPath, name, path, relativePaths]);

	const cn = classNames("flex items-center gap-5 capitalize px-3 py-5 transition-all duration-300", {
		"!bg-primary content-bold !text-white rounded-md": isActive,
		"content-standard text-neutral-500": !isActive,
	});

	return (
		<SidebarMenuItem
			className="list-none"
			onMouseOver={() => setActiveLink(name)}
			onMouseLeave={() => setActiveLink("")}
		>
			<SidebarMenuButton asChild className={cn}>
				<Link to={path}>
					{isActive ? activeIcon : icon}
					<span>{name}</span>
				</Link>
			</SidebarMenuButton>
		</SidebarMenuItem>
	);
});
