
import { useQuery } from "@tanstack/react-query";
import useAppSelector from "@/store/hooks";
import getInvestorMetrics from "@/services/investor/get-investor-metrics";



export function useMetrics() {
  const { account } = useAppSelector("account");

  return useQuery({
    queryKey: ["investor-metrics", account?.id],
    queryFn: () => getInvestorMetrics(),
    enabled: !!account?.id,
  });
}
