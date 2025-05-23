
import React from "react";
import {
	LayoutDashboard,
	Building2,
	UsersIcon,
	ListCheck,
	Calculator,
	TrendingUpIcon,
	ChartNoAxesCombined,
} from "lucide-react";
import classNames from "classnames";
import { UserRole } from "@/types/user.types";

export type SidebarLink = {
	name: string;
	path: string;
	icon: React.ReactNode;
	activeIcon: React.ReactNode;
	relativePaths: string[];
	role: UserRole[];
};

const IconContainer = (node: any, isActiveIcon?: boolean) => {
	const cn = classNames("size-5", {
		"text-white": isActiveIcon,
	});
	return React.createElement(node, { className: cn });
};

export const sidebarLinks: SidebarLink[] = [
	{
		name: "dashboard",
		path: "developer/dashboard",
		icon: IconContainer(LayoutDashboard),
		activeIcon: IconContainer(LayoutDashboard, true),
		relativePaths: [],
		role: ["developer"],
	},
	{
		name: "dashboard",
		path: "investor/dashboard",
		icon: IconContainer(LayoutDashboard),
		activeIcon: IconContainer(LayoutDashboard, true),
		relativePaths: [],
		role: ["investor"],
	},
	{
		name: "Listed projects",
		path: "/developer/projects",
		icon: IconContainer(ListCheck),
		activeIcon: IconContainer(ListCheck, true),
		relativePaths: [],
		role: ["developer"],
	},
	{
		name: "My Investments",
		path: "/investor/investments",
		icon: IconContainer(ChartNoAxesCombined),
		activeIcon: IconContainer(ChartNoAxesCombined, true),
		relativePaths: [],
		role: ["investor"],
	},
	{
		name: "properties",
		path: "/properties",
		icon: IconContainer(Building2),
		activeIcon: IconContainer(Building2, true),
		relativePaths: [],
		role: ["developer", "investor"],
	},
	{
		name: "developers",
		path: "/developers",
		icon: IconContainer(UsersIcon),
		activeIcon: IconContainer(UsersIcon, true),
		relativePaths: [],
		role: ["developer", "investor"],
	},
	// {
	// 	name: "profile",
	// 	path: "/profile",
	// 	icon: IconContainer(User),
	// 	activeIcon: IconContainer(User, true),
	// 	relativePaths: ["/profile/developer", "/profile/investor"],
	// 	role: ["developer", "investor"],
	// },
	/*
	{
		name: "investment calculator",
		path: "calculator",
		icon: IconContainer(Calculator),
		activeIcon: IconContainer(Calculator, true),
		relativePaths: [],
		role: ["developer", "investor"],
	},
	*/
];
