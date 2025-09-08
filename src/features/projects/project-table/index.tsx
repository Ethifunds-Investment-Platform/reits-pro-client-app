import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { amountSeparator } from "@/lib/amount-separator";

import classNames from "classnames";

import EmptyData from "@/components/app/empty-data";
import { Project } from "@/types/project.types";
import mergeText from "@/lib/transform-text";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import truncate from "@/lib/truncate";
import { useIsMobile } from "@/hooks/use-mobile";
import ListTable from "./list-table";

type TableProps = {
	data: Project[];
	isEmpty: boolean;
};
export default function ProjectTable(props: TableProps) {
	const isMobile = useIsMobile();
	if (props.isEmpty)
		return <EmptyData title="No projects found" text="You haven't made any projects yet." />;

	if (isMobile) {
		return <ListTable data={props.data} />;
	}

	return (
		<Table>
			<TableHeader
			// className="!bg-neutral-100/50"
			>
				<TableRow className="whitespace-nowrap">
					<TableHead>Project Name</TableHead>
					<TableHead>Location</TableHead>
					<TableHead className="hidden lg:table-cell">Funding Progress</TableHead>
					<TableHead className="hidden lg:table-cell">Investors</TableHead>
					<TableHead>Status</TableHead>
					<TableHead>Actions</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{props.data.map((item) => {
					const statusClx = classNames("capitalize border-primary");

					const currency = item.currency.symbol;
					const progress = (item.amount_raised / item.funding_goal) * 100;

					return (
						<TableRow key={item.id} className="whitespace-nowrap">
							<TableCell className="font-medium">{truncate(item.name, 20)}</TableCell>
							<TableCell>
								{mergeText(item.location.state, item.location.country).replace(" ", ", ")}
							</TableCell>
							<TableCell className="hidden lg:table-cell">
								<Progress value={progress} />
								<div className="text-xs text-gray-500">
									{currency}
									{item.amount_raised?.toLocaleString()} ({Math.round(progress)}%)
								</div>
							</TableCell>
							<TableCell className="hidden lg:table-cell">{amountSeparator(item.total_investors)}</TableCell>
							<TableCell>
								<Badge variant="outline" className={statusClx}>
									{item.status}
								</Badge>
							</TableCell>
							<TableCell>
								<div className="flex space-x-2">
									<Button size="sm" className="bg-navy-800 hover:bg-navy-700" asChild>
										<Link to={`/developer/projects/${item.id}`}>View</Link>
									</Button>
								</div>
							</TableCell>
						</TableRow>
					);
				})}
			</TableBody>
		</Table>
	);
}
