import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import InvestmentsTable from "./investments-table";
import Render from "@/components/app/render";
import useInvestments from "./use-investments";
import TableFilters from "./table-filters";
import TablePagination from "./table-pagination";
import AppContainer from "@/components/app/container/container";

export default function InvestorInvestments() {
	const { data, isFetching, isError, error } = useInvestments();

	return (
		<AppContainer className="mt-8">
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-xl font-semibold">My Investments</h2>
				<Button variant="outline" size="sm" asChild>
					<Link to="/properties" className="flex items-center gap-1">
						Explore More Properties
						<ChevronRight className="h-4 w-4" />
					</Link>
				</Button>
			</div>

			<Card className="p-2">
				<CardHeader className="px-4 py-2">
					<TableFilters disabled={isFetching} />
				</CardHeader>
				<CardContent className="px-4">
					<div className="flex flex-col min-h-screen">
						<Render isLoading={isFetching} isError={isError} error={error} >
							<div className="overflow-auto flex-1">
								<InvestmentsTable data={data?.docs ?? []} isEmpty={!data?.docs?.length} />
							</div>
							{data && <TablePagination {...data} />}
						</Render>
					</div>
				</CardContent>
			</Card>
		</AppContainer>
	);
}
