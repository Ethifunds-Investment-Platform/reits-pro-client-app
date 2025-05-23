import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import useCustomNavigation from "@/hooks/use-navigation";
import TableSearchBar from "./table-search-bar";

export default function TableFilters({ disabled = false }: { disabled?: boolean }) {
	const { queryParams } = useCustomNavigation();
	const onChange = (value: string) => {
		queryParams.set("status", value);
	};

	return (
		<div className="flex flex-wrap gap-2 items-center justify-between">
			<TableSearchBar disabled={disabled} />

			<div className="flex flex-wrap items-center gap-2">
				<Select disabled={disabled} onValueChange={onChange}>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="All Statuses" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All Statuses</SelectItem>
						<SelectItem value="active">Active</SelectItem>
						<SelectItem value="funded">Funded</SelectItem>
						<SelectItem value="completed">Completed</SelectItem>
					</SelectContent>
				</Select>
			</div>
		</div>
	);
}
