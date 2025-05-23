import getMetrics from "@/services/get-metrics";
import { useQuery } from "@tanstack/react-query";
import { amountSeparator } from "@/lib/amount-separator";
import useAppSelector from "@/store/hooks";

export default function HomeMetrics() {
	const { activeCurrency } = useAppSelector("init");
	const { isFetching, data: metrics } = useQuery({
		queryKey: ["metrics"],
		queryFn: () => getMetrics(),
	});

	const totalInvestments = metrics?.total_investments || 0;
	const symbol = activeCurrency.symbol ?? "";
	const metricsData = [
		{
			title: "Investments Funded",
			value: `${symbol} ${(totalInvestments / 1000000).toFixed(
				totalInvestments > 1000000 ? 1 : 3
			)}M`,
		},
		{
			title: "Active Investors",
			value: amountSeparator(metrics?.total_investors?.toString() || "0"),
		},
		{
			title: "Average Returns",
			value: `${metrics?.average_return || 0}%`,
		},
	];

	return (
		<div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-6">
			{metricsData.map((metric) => (
				<div className="text-center" key={metric.title}>
					<div className="text-2xl md:text-3xl font-bold text-white">{isFetching? "...": metric.value}</div>
					<div className="text-sm text-gray-200 mt-1">{metric.title}</div>
				</div>
			))}
		</div>
	);
}
