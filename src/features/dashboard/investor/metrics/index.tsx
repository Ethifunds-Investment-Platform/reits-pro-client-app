
import { Card, CardContent } from "@/components/ui/card";
import { BarChart4, LineChart, PieChart, TrendingUp } from "lucide-react";
import { useMetrics } from "./use-metrics";
import useAppSelector from "@/store/hooks";
import { figureConverter } from "@/lib/figure-converter";

export default function InvestorMetrics() {
  const { activeCurrency } = useAppSelector("init");
  const { data, isFetching } = useMetrics();

  const symbol = activeCurrency?.symbol;
  const totalInvested = figureConverter(data?.totalInvested).toLocaleString();
  const portfolioValue = figureConverter(data?.portfolioValue).toLocaleString();


  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Investment Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Invested</p>
                <h3 className="text-2xl font-bold mt-1">
                  {isFetching ? "..." : `${symbol}${totalInvested}`}
                </h3>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            {/* <div className="text-sm text-green-600 mt-4 flex items-center">
              <span>+12.5%</span>
              <span className="text-gray-500 ml-2">from last month</span>
            </div> */}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Portfolio Value</p>
                <h3 className="text-2xl font-bold mt-1">
                  {isFetching ? "..." : `${symbol}${portfolioValue}`}
                </h3>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <PieChart className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            {/* <div className="text-sm text-green-600 mt-4 flex items-center">
              <span>+8.3%</span>
              <span className="text-gray-500 ml-2">from last month</span>
            </div> */}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Projects</p>
                <h3 className="text-2xl font-bold mt-1">
                  {isFetching ? "..." : data?.totalProjects}
                </h3>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <BarChart4 className="h-6 w-6 text-green-600" />
              </div>
            </div>
            {/* <div className="text-sm text-green-600 mt-4 flex items-center">
              <span>+2</span>
              <span className="text-gray-500 ml-2">from last month</span>
            </div> */}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Avg. Annual Return</p>
                <h3 className="text-2xl font-bold mt-1">
                  {isFetching ? "..." : `${data?.avgReturn}%`}
                </h3>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <LineChart className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
            {/* <div className="text-sm text-green-600 mt-4 flex items-center">
              <span>+1.2%</span>
              <span className="text-gray-500 ml-2">from last month</span>
            </div> */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
