import * as React from "react";
import AuthButtons from "./auth-buttons";
import useAppSelector from "@/store/hooks";
import { ChevronRight } from "lucide-react";
import useCustomNavigation from "@/hooks/use-navigation";
import { useIsMobile } from "@/hooks/use-mobile";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default React.memo(function SidebarHeader() {
	const { pageTitle } = useAppSelector("ui");
	const { location } = useCustomNavigation();
	const isMobile = useIsMobile();
	const splittedTitle = pageTitle ? pageTitle.split(",") : location.pathname.slice(1).split("/");

	return (
		<header className="flex items-center justify-between border-b px-3  py-3.5">
			<SidebarTrigger className="lg:hidden" />
			<div className="hidden lg:flex gap-1 flex-1 items-center text-primary ">
				{splittedTitle.slice(0, isMobile ? 3 : splittedTitle.length).map((title, idx) => {
					return (
						<React.Fragment key={title}>
							<span key={title} className="!font-semibold  capitalize text-base">
								{title.trim()}
							</span>
							{idx !== splittedTitle.length - 1 && <ChevronRight className="w-4 h-4 mt-1" />}
						</React.Fragment>
					);
				})}
			</div>

			<div className="flex items-center gap-5">
				{/* <Notifications /> */}
				<AuthButtons />
			</div>
		</header>
	);
});
