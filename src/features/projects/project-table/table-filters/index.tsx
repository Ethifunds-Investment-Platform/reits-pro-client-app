import AppDropdown from "@/components/app/app-dropdown";
import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { SlidersHorizontal } from "lucide-react";
import ProjectStatus from "./project-status";

export type FilterProps = {
	disabled: boolean;
};
export default function TableFilters(props: FilterProps) {
	return (
		<div className="flex items-center gap-3 overflow-auto py-1">
			<AppDropdown
				disabled={props.disabled}
				trigger={
					<Button
						variant="outline"
						size="sm"
						disabled={props.disabled}
						className="!outline-none bg-transparent border-primary/50 hover:bg-primary"
					>
						{" "}
						<SlidersHorizontal className="h-4 w-4 mr-2" /> Filter
					</Button>
				}
			>
				<ProjectStatus />
			</AppDropdown>
		</div>
	);
}
