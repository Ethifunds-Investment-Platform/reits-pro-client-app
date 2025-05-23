import * as React from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { assets } from "@/constants";
import ViewDetails from "./view-details";

type TableActionsProps = {
	id: string
}
export default React.memo(function TableActions(props:TableActionsProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="!outline-non">
				<img src={assets.option_icon_01} alt="" />
			</DropdownMenuTrigger>
			<DropdownMenuContent className="p-2">
				<ViewDetails id={props.id} />
			</DropdownMenuContent>
		</DropdownMenu>
	);
});
