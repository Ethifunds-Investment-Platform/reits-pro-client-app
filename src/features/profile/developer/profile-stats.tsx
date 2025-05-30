import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Coins, LineChart, Users } from "lucide-react";
import { DeveloperProfile } from "@/types/developer.types";
import useAppSelector from "@/store/hooks";
import { figureConverter } from "@/lib/figure-converter";

export function ProfileStats({ developerProfile }: { developerProfile: DeveloperProfile }) {
	const { activeCurrency } = useAppSelector("init");
	const currency = activeCurrency?.code ?? "NGN";


	// No need for manual conversion
	// const totalRaised = (developerProfile.total_raised/1000000)
	return (
		<Card>
			<CardHeader className="pb-2">
				<CardTitle className="text-lg">Developer Statistics</CardTitle>
			</CardHeader>
			<CardContent className="grid grid-cols-2 gap-4">
				<div className="flex flex-col items-center justify-center p-3 text-center bg-gray-50 rounded-lg">
					<Building2 className="h-5 w-5 text-primary-500 mb-2" />
					<span className="text-sm text-gray-500">Active Projects</span>
					<span className="font-bold text-primary-700">{developerProfile.active_projects}</span>
				</div>

				<div className="flex flex-col items-center justify-center p-3 text-center bg-gray-50 rounded-lg">
					<LineChart className="h-5 w-5 text-primary-500 mb-2" />
					<span className="text-sm text-gray-500">Completed Projects</span>
					<span className="font-bold text-primary-700">{developerProfile.projects_completed}</span>
				</div>

				<div className="flex flex-col items-center justify-center p-3 text-center bg-gray-50 rounded-lg">
					<Coins className="h-5 w-5 text-primary-500 mb-2" />
					<span className="text-sm text-gray-500">Total Raised</span>
					<span className="font-bold text-primary-700">
						{figureConverter(developerProfile.total_raised, { currency, precision: 2 })}
					</span>
				</div>

				<div className="flex flex-col items-center justify-center p-3 text-center bg-gray-50 rounded-lg">
					<Users className="h-5 w-5 text-primary-500 mb-2" />
					<span className="text-sm text-gray-500">Avg. Return</span>
					<span className="font-bold text-primary-700">{developerProfile.average_return}%</span>
				</div>
			</CardContent>
		</Card>
	);
}
