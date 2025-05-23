import { Card, CardContent } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Project } from "@/types/project.types";
import { Calendar, CircleDollarSign, Clock, Percent } from "lucide-react";
import * as React from "react";

export default React.memo(function Details(props: Project) {
	const isCompleted = props.status === "completed";
	return (
		<TabsContent value="details">
			<div className="space-y-6">
				<div>
					<h2 className="text-xl font-semibold text-navy-800 mb-3">Investment Structure</h2>
					<p className="text-gray-700 mb-4">
						This investment is structured as an equity ownership in a Special Purpose Vehicle (SPV)
						that holds the
						{!isCompleted ? " development rights to" : ""} property. Investors receive pro-rata
						ownership based on their investment amount.
					</p>

					<div className="space-y-4">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<Card>
								<CardContent className="p-6">
									<div className="flex items-start">
										<CircleDollarSign className="h-5 w-5 text-gold-500 mt-1 mr-3" />
										<div>
											<h3 className="font-medium text-navy-800">Minimum Investment</h3>
											<p className="text-gray-600">
												{props.currency.symbol} {props.minimum_investment.toLocaleString()}
											</p>
										</div>
									</div>
								</CardContent>
							</Card>

							<Card>
								<CardContent className="p-6">
									<div className="flex items-start">
										<Percent className="h-5 w-5 text-gold-500 mt-1 mr-3" />
										<div>
											<h3 className="font-medium text-navy-800">Target Annual Return</h3>
											<p className="text-gray-600">{props.expected_roi}%</p>
										</div>
									</div>
								</CardContent>
							</Card>

							<Card>
								<CardContent className="p-6">
									<div className="flex items-start">
										<Clock className="h-5 w-5 text-gold-500 mt-1 mr-3" />
										<div>
											<h3 className="font-medium text-navy-800">Investment Term</h3>
											<p className="text-gray-600 capitalize">
												{props.tenor_value} {props.tenor_unit} (targeted)
											</p>
										</div>
									</div>
								</CardContent>
							</Card>

							<Card>
								<CardContent className="p-6">
									<div className="flex items-start">
										<Calendar className="h-5 w-5 text-gold-500 mt-1 mr-3" />
										<div>
											<h3 className="font-medium text-navy-800">Distribution Frequency</h3>
											<p className="text-gray-600 capitalize">{props.distribution_frequency}</p>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>

						{/* <Card>
							<CardContent className="p-6">
								<h3 className="font-medium text-navy-800 mb-3">Fee Structure</h3>
								<ul className="space-y-2 text-gray-600">
									<li className="flex items-center justify-between">
										<span>Platform Fee</span>
										<span>1.5% annually</span>
									</li>
									<li className="flex items-center justify-between">
										<span>Developer Promote</span>
										<span>20% of profits above 8% hurdle</span>
									</li>
									<li className="flex items-center justify-between">
										<span>Early Redemption Fee</span>
										<span>2% (waived after 3 years)</span>
									</li>
								</ul>
							</CardContent>
						</Card> */}
					</div>
				</div>

				<div>
					<h2 className="text-xl font-semibold text-navy-800 mb-3">Risk Factors</h2>
					<ul className="list-disc pl-5 space-y-2 text-gray-700">
						{props.risk_factors.map((item) => (
							<li key={item}>{item}</li>
						))}
						<li>Economic factors affecting real estate values</li>
					</ul>
				</div>
			</div>
		</TabsContent>
	);
});
