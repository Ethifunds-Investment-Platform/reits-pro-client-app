import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Coins, LineChart, Percent } from "lucide-react";
import useAppSelector from "@/store/hooks";
import { figureConverter } from "@/lib/figure-converter";

export function InvestorStats() {
	const { activeCurrency } = useAppSelector("init");
	const currency = activeCurrency?.code ?? "NGN";

	// Mock data for investor stats
	const stats = {
		activeInvestments: 5,
		totalInvested: 250000,
		portfolioReturn: 12.5,
		projectsFunded: 8,
	};

	return (
		<Card>
			<CardHeader className="pb-2">
				<CardTitle className="text-lg">Investment Statistics</CardTitle>
			</CardHeader>
			<CardContent className="grid grid-cols-2 gap-4">
				<div className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-lg">
					<Building2 className="h-5 w-5 text-primary-500 mb-2" />
					<span className="text-sm text-gray-500">Active Investments</span>
					<span className="font-bold text-primary-700">{stats.activeInvestments}</span>
				</div>

				<div className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-lg">
					<LineChart className="h-5 w-5 text-primary-500 mb-2" />
					<span className="text-sm text-gray-500">Projects Funded</span>
					<span className="font-bold text-primary-700">{stats.projectsFunded}</span>
				</div>

				<div className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-lg">
					<Coins className="h-5 w-5 text-primary-500 mb-2" />
					<span className="text-sm text-gray-500">Total Invested</span>
					<span className="font-bold text-primary-700">
						{figureConverter(stats.totalInvested, { currency })}
					</span>
				</div>

				<div className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-lg">
					<Percent className="h-5 w-5 text-primary-500 mb-2" />
					<span className="text-sm text-gray-500">Portfolio Return</span>
					<span className="font-bold text-primary-700">{stats.portfolioReturn}%</span>
				</div>
			</CardContent>
		</Card>
	);
}
