import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import EmptyData from "@/components/app/empty-data";
import mergeText from "@/lib/transform-text";
import truncate from "@/lib/truncate";
import { useIsMobile } from "@/hooks/use-mobile";
import { Investment } from "@/types/investments.types";
type TableProps = {
	data: Investment[];
	isEmpty: boolean;
};

export default function InvestmentsTable(props: TableProps) {
	const isMobile = useIsMobile();

	if (props.isEmpty)
		return <EmptyData title="No investments found" text="You haven't made any investments yet." />;

	return (
		<Table>
			<TableHeader>
				<TableRow className="whitespace-nowrap">
					<TableHead>Project Name</TableHead>
					<TableHead>Location</TableHead>
					<TableHead >Amount Invested</TableHead>
					<TableHead >Expected ROI</TableHead>
					<TableHead>Status</TableHead>
					<TableHead>Actions</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{props.data.map((item) => {
					const currency = item.project.currency.symbol;

					return (
						<TableRow key={item.id} className="whitespace-nowrap">
							<TableCell className="font-medium">{truncate(item.project.name, 20)}</TableCell>
							<TableCell>
								{mergeText(item.project.location.state, item.project.location.country).replace(
									" ",
									", "
								)}
							</TableCell>
							<TableCell >
								{currency} {item.amount_invested.toLocaleString()}
							</TableCell>
							<TableCell >
								{item.project.expected_roi}%
							</TableCell>
							<TableCell>
								<Badge variant="outline" className="capitalize">
									{item.project.status}
								</Badge>
							</TableCell>
							<TableCell>
								<div className="flex space-x-2">
									<Button size="sm" className="bg-navy-800 hover:bg-navy-700" asChild>
										<Link to={`/properties/${item.id}`}>View</Link>
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
