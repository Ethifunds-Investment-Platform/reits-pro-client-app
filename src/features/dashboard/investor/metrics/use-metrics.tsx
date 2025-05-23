
import { useQuery } from "@tanstack/react-query";
import useAppSelector from "@/store/hooks";

type InvestorMetrics = {
  totalInvested: number;
  portfolioValue: number;
  totalProjects: number;
  avgReturn: number;
};

export function useMetrics() {
  const { account } = useAppSelector("account");

  return useQuery({
    queryKey: ["investor-metrics", account?.id],
    queryFn: async (): Promise<InvestorMetrics> => {
      // This would be replaced with an actual API call
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            totalInvested: 24750000,
            portfolioValue: 28500000,
            totalProjects: 7,
            avgReturn: 12.5,
          });
        }, 1000);
      });
    },
    enabled: !!account?.id,
  });
}
