import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import AppDialog from "@/components/app/app-dialog";
import useInvest from "./use-invest";
import * as React from "react";
import Proceed from "./proceed";
import ErrorBoundary from "@/components/app/error-boundary";
import useCustomNavigation from "@/hooks/use-navigation";
import Render from "@/components/app/render";
export default function InvestDialog() {
	const {
		isFetching,
		isError,
		error,
		open,
		handleClose,
		onSubmit,
		formatAmount,
		project,
		form,
		expectedReturn,
		isValidAmount,
		numericAmount,
	} = useInvest();

	const { queryParams } = useCustomNavigation();

	const hasAction = React.useMemo(() => {
		return queryParams.has("action")
	}, [queryParams]);

	React.useEffect(() => {
		return () => {
			if (hasAction) {
				queryParams.delete("action");
			}
		};
	}, [hasAction]);



	return (
		
		<ErrorBoundary>
			<AppDialog
				open={open}
				onClose={handleClose}
				title={`Invest in ${project?.name}`}
				description="Complete the form below to make your investment"
			>
				<Render isLoading={isFetching} isError={isError} error={error}>
					<div className="space-y-6 py-4">
						{/* Project summary */}
						<div className="bg-gray-50 p-4 rounded-md">
							<div className="grid grid-cols-2 gap-4 text-sm">
								<div>
									<p className="text-gray-500">Location</p>
									<p className="font-medium">
										{project?.location?.state}, {project?.location?.country}
									</p>
								</div>
								<div>
									<p className="text-gray-500">Minimum Investment</p>
									<p className="font-medium">
										{project?.currency?.symbol}
										{project?.minimum_investment?.toLocaleString()}
									</p>
								</div>
								<div>
									<p className="text-gray-500">Expected ROI</p>
									<p className="font-medium">{project?.expected_roi}% Annually</p>
								</div>
								<div>
									<p className="text-gray-500">Funding Progress</p>
									<p className="font-medium">
										{((project?.amount_raised / project?.funding_goal) * 100).toFixed(1)}%
									</p>
								</div>
							</div>
						</div>

						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
								<FormField
									control={form.control}
									name="investmentAmount"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Investment Amount ({project.currency.symbol})</FormLabel>
											<FormControl>
												<Input
													{...field}
													onChange={(e) => formatAmount(e)}
													// className="text-right"
													inputMode="numeric"
												/>
											</FormControl>
											{!isValidAmount && numericAmount > 0 && (
												<FormMessage>
													Amount must be at least {project.currency.symbol}
													{project.minimum_investment.toLocaleString()}
												</FormMessage>
											)}
										</FormItem>
									)}
								/>

								<div>
									<FormLabel>Expected Annual Return</FormLabel>
									<div className="p-3 bg-navy-50 rounded-md text-right">
										<span className="text-navy-800 font-semibold">
											{project?.currency?.symbol}
											{expectedReturn.toLocaleString()}
										</span>
									</div>
									<p className="text-xs mt-1 text-gray-500">
										Based on the annual ROI of {project?.expected_roi}%
									</p>
								</div>

								<Button
									type="submit"
									className="w-full bg-navy-800 hover:bg-navy-700 text-white"
									disabled={!isValidAmount || numericAmount <= 0}
								>
									Proceed to Payment
								</Button>
							</form>
						</Form>
					</div>
				</Render>
			</AppDialog>
			{numericAmount > 0 && <Proceed amount={numericAmount} project={project} />}
		</ErrorBoundary>
	);
}
