import { Clock, TrendingUp } from "lucide-react";

import { ListChecks } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import useMetrics from "./use-metrics";
import { Building } from "lucide-react";
import { amountSeparator } from "@/lib/amount-separator";
import { figureConverter } from "@/lib/figure-converter";
import useAppSelector from "@/store/hooks";
export default function DeveloperMetrics() {
	const { data } = useMetrics();
	const { activeCurrency } = useAppSelector("init");

	const currency = activeCurrency?.code ?? "NGN";


	const cardData = [
		{
			icon: <Building className="h-8 w-8 text-navy-600" />,
			title: "Active Projects",
			value: amountSeparator(data?.active_projects ?? 0),
		},
		{
			icon: <ListChecks className="h-8 w-8 text-navy-600" />,
			title: "Completed Projects",
			value: amountSeparator(data?.completed_projects ?? 0),
		},
		{
			icon: <TrendingUp className="h-8 w-8 text-navy-600" />,
			title: "Total Investment",
			value: `${currency} ${data?.total_investment?.toLocaleString()}`,
		},
	];

	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
			{cardData.map((card) => (
				<Card key={card.title}>
					<CardContent className="pt-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-gray-500">{card.title}</p>
								<p className="text-3xl font-bold text-navy-800">{card.value}</p>
							</div>
							{card.icon}
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
}
