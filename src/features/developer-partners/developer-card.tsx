import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Building, CircleDollarSign, Percent, PieChart } from "lucide-react";
import { DeveloperProfile } from "@/types/developer.types";


export default function DeveloperCard(props: DeveloperProfile&{symbol: string}) {
	const operating_location = props.operating_location.includes(",")
		? props.operating_location
		: props.operating_location.replace(" ", ",");

	const established = new Date(props.established_at).getFullYear();

	
	return (
		<Card className="hover:shadow-md transition-shadow duration-300">
			<CardContent className="p-6">
				<div className="md:flex">
					<div className="md:w-1/4 mb-6 md:mb-0 md:pr-6 flex justify-center md:justify-start">
						<div className="h-32 w-32 rounded-lg bg-navy-100 flex items-center justify-center overflow-hidden">
							<Building className="h-16 w-16 text-navy-800" />
						</div>
					</div>

					<div className="md:w-3/4">
						<div className="mb-4">
							<h3 className="text-xl font-bold text-navy-800">{props.developer.name}</h3>
							<p className="text-gray-600 text-sm">
								Established {established} • {operating_location}
							</p>
						</div>

						<p className="text-gray-700 mb-6">{props.bio}</p>

						<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
							<div className="bg-navy-50 p-3 rounded-lg">
								<div className="flex items-center mb-1">
									<Building className="h-4 w-4 text-navy-700 mr-1" />
									<p className="text-xs text-gray-600">Projects Completed</p>
								</div>
								<p className="text-lg font-bold text-navy-800">{props.projects_completed}</p>
							</div>

							<div className="bg-navy-50 p-3 rounded-lg">
								<div className="flex items-center mb-1">
									<PieChart className="h-4 w-4 text-navy-700 mr-1" />
									<p className="text-xs text-gray-600">Active Projects</p>
								</div>
								<p className="text-lg font-bold text-navy-800">{props.active_projects}</p>
							</div>

							<div className="bg-navy-50 p-3 rounded-lg">
								<div className="flex items-center mb-1">
									<CircleDollarSign className="h-4 w-4 text-navy-700 mr-1" />
									<p className="text-xs text-gray-600">Total Raised</p>
								</div>
								<p className="text-lg font-bold text-navy-800">
									{props.symbol}
									{(props.total_raised / 1000000).toFixed(1)}M
								</p>
							</div>

							<div className="bg-navy-50 p-3 rounded-lg">
								<div className="flex items-center mb-1">
									<Percent className="h-4 w-4 text-navy-700 mr-1" />
									<p className="text-xs text-gray-600">Average Return</p>
								</div>
								<p className="text-lg font-bold text-navy-800">{props.average_return}%</p>
							</div>
						</div>

						<div className="flex flex-wrap gap-3 justify-center lg:justify-start">
							<Button asChild className="bg-navy-800 hover:bg-navy-700 text-white">
								<Link to={`/properties?developer_id=${props.developer_id}`}>
									View Available Projects
								</Link>
							</Button>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
