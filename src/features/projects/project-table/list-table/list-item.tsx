import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import mergeText from "@/lib/transform-text";
import { Project } from "@/types/project.types";
import { Link } from "react-router-dom";

type ListItemProps = {
	item: Project;
};

export default function ListItem({ item }: ListItemProps) {
	const currency = item.currency.symbol;
	const progress = (item.amount_raised / item.funding_goal) * 100;
	return (
		<div className="flex flex-col gap-2 border border-neutral-200 p-2 rounded-lg">
			<div className="flex items-start justify-between">
				<div>
					<h4 className="text-base font-medium line-clamp-1">{item.name}</h4>
					<span className="text-sm text-neutral-500">
						{mergeText(item.location.state, item.location.country).replace(" ", ", ")}
					</span>
				</div>
				<Badge variant="outline" className={"capitalize border-primary"}>
					{item.status}
				</Badge>
			</div>

			<div className="flex justify-between gap-10 items-center">
				<div className="flex flex-col gap-2 flex-grow">
					<Progress value={progress} />
					<div className="text-sm text-gray-500 font-medium">
						{currency}
						{item.amount_raised.toLocaleString()} ({Math.round(progress)}%)
					</div>
				</div>
				<div className="flex space-x-2 w-1/4">
					<Button
						variant="secondary"
						className=" border border-primary  !py-0 w-full hover:bg-primary hover:text-white"
						asChild
					>
						<Link to={`/developer/project/${item.id}`}>View</Link>
					</Button>
				</div>
			</div>
		</div>
	);
}
