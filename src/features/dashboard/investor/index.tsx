
import AppContainer from "@/components/app/container/container";
import InvestorMetrics from "./metrics";
import useAppSelector from "@/store/hooks";
import OpportunityExplorer from "./opportunity-explorer";


export default function InvestorDashboard() {
  const { account } = useAppSelector("account");

  return (
    <AppContainer className="flex flex-col gap-5">
      <div className="mb-8 flex flex-col lg:flex-row lg:justify-between lg:items-center">
        <div>
          <h1 className="text-3xl font-bold text-navy-800">Investor Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Welcome back, {account?.name || account?.email}. Manage your real estate investments.
          </p>
        </div>
      </div>

      <InvestorMetrics />
      {/* <PortfolioOverview /> */}
      {/* <InvestorInvestments /> */}
      <OpportunityExplorer />
    </AppContainer>
  );
}
