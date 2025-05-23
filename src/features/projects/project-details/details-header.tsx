import { Badge } from "@/components/ui/badge";
import mergeText from "@/lib/transform-text";
import { Project } from "@/types/project.types";
import classNames from "classnames";
import { MapPin } from "lucide-react";

export default function DetailsHeader(props: Project) {
	const badgeCn = classNames({
		"bg-gold-500 hover:bg-gold-600": props.status === "completed",
		"bg-navy-600 hover:bg-navy-700": props.status !== "completed",
	});
	return (
		<div className="mb-6 md:flex md:items-center md:justify-between">
			<div>
				<h1 className="text-3xl font-bold text-navy-800">{props.name}</h1>
				<div className="flex items-center mt-2 text-gray-600">
					<MapPin className="h-4 w-4 mr-1" />
					<span>{mergeText(props.location.state, props.location.country)}</span>
				</div>
			</div>
			<Badge className={badgeCn}>
				{props.status !== "completed" ? "Development" : "Completed Property"}
			</Badge>
		</div>
	);
}
