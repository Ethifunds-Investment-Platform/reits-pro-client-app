import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";
import { figureConverter } from "@/lib/figure-converter";

const CalculatorPage = () => {
	const [initialInvestment, setInitialInvestment] = useState(50000);
	const [annualReturn, setAnnualReturn] = useState(10);
	const [investmentTerm, setInvestmentTerm] = useState(5);
	const [contributionFrequency, setContributionFrequency] = useState("none");
	const [additionalContribution, setAdditionalContribution] = useState(10000);

	// Handle slider changes
	const handleInitialInvestmentChange = (value: number[]) => {
		setInitialInvestment(value[0]);
	};

	const handleAnnualReturnChange = (value: number[]) => {
		setAnnualReturn(value[0]);
	};

	const handleInvestmentTermChange = (value: number[]) => {
		setInvestmentTerm(value[0]);
	};

	const handleAdditionalContributionChange = (value: number[]) => {
		setAdditionalContribution(value[0]);
	};

	// Handle direct input changes
	const handleInitialInvestmentInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = parseInt(e.target.value);
		if (!isNaN(value) && value >= 0) {
			setInitialInvestment(Math.min(value, 1000000));
		}
	};

	const handleAnnualReturnInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = parseFloat(e.target.value);
		if (!isNaN(value) && value >= 0) {
			setAnnualReturn(Math.min(value, 30));
		}
	};

	const handleInvestmentTermInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = parseInt(e.target.value);
		if (!isNaN(value) && value >= 0) {
			setInvestmentTerm(Math.min(value, 30));
		}
	};

	const handleAdditionalContributionInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = parseInt(e.target.value);
		if (!isNaN(value) && value >= 0) {
			setAdditionalContribution(Math.min(value, 100000));
		}
	};

	// Calculate investment projections
	const calculateProjections = () => {
		const projections = [];
		let currentValue = initialInvestment;

		for (let year = 0; year <= investmentTerm; year++) {
			// Add current year data
			projections.push({
				year,
				value: Math.round(currentValue),
			});

			// Calculate next year with compound interest
			if (year < investmentTerm) {
				// Apply annual return
				currentValue *= 1 + annualReturn / 100;

				// Add additional contributions based on frequency
				if (contributionFrequency === "annual" && year < investmentTerm) {
					currentValue += additionalContribution;
				} else if (contributionFrequency === "quarterly" && year < investmentTerm) {
					for (let quarter = 0; quarter < 4; quarter++) {
						const quarterlyAmount = additionalContribution / 4;
						// Apply partial year growth to each contribution
						const remainingYearFraction = (3 - quarter) / 4;
						currentValue += quarterlyAmount * (1 + (annualReturn / 100) * remainingYearFraction);
					}
				}
			}
		}

		return projections;
	};

	const projections = calculateProjections();
	const finalValue = projections[projections.length - 1].value;
	const totalContributions =
		initialInvestment +
		(contributionFrequency === "annual"
			? additionalContribution * investmentTerm
			: contributionFrequency === "quarterly"
			? additionalContribution * investmentTerm
			: 0);
	const totalReturn = finalValue - totalContributions;
	const returnPercentage = (finalValue / totalContributions - 1) * 100;

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
			<div className="text-center mb-12">
				<h1 className="text-3xl font-bold text-navy-800">Investment Calculator</h1>
				<p className="mt-2 text-gray-600">
					Estimate your potential returns from real estate investments over time
				</p>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* Input Panel */}
				<div className="lg:col-span-1 space-y-6">
					<Card>
						<CardContent className="p-6">
							<h2 className="text-xl font-semibold text-navy-800 mb-6">Investment Parameters</h2>

							<div className="space-y-8">
								{/* Initial Investment */}
								<div>
									<div className="flex items-center justify-between mb-2">
										<label
											htmlFor="initial-investment"
											className="text-sm font-medium text-gray-700"
										>
											Initial Investment
										</label>
										<div className="relative">
											<span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
												$
											</span>
											<Input
												id="initial-investment"
												type="number"
												value={initialInvestment}
												onChange={handleInitialInvestmentInputChange}
												className="w-24 pl-7 text-right"
											/>
										</div>
									</div>
									<Slider
										value={[initialInvestment]}
										min={10000}
										max={1000000}
										step={5000}
										onValueChange={handleInitialInvestmentChange}
									/>
									<div className="flex items-center justify-between mt-1 text-xs text-gray-500">
										<span>$10,000</span>
										<span>$1,000,000</span>
									</div>
								</div>

								{/* Annual Return */}
								<div>
									<div className="flex items-center justify-between mb-2">
										<label htmlFor="annual-return" className="text-sm font-medium text-gray-700">
											Expected Annual Return
										</label>
										<div className="relative">
											<Input
												id="annual-return"
												type="number"
												value={annualReturn}
												onChange={handleAnnualReturnInputChange}
												className="w-24 pr-7 text-right"
											/>
											<span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
												%
											</span>
										</div>
									</div>
									<Slider
										value={[annualReturn]}
										min={1}
										max={30}
										step={0.5}
										onValueChange={handleAnnualReturnChange}
									/>
									<div className="flex items-center justify-between mt-1 text-xs text-gray-500">
										<span>1%</span>
										<span>30%</span>
									</div>
								</div>

								{/* Investment Term */}
								<div>
									<div className="flex items-center justify-between mb-2">
										<label htmlFor="investment-term" className="text-sm font-medium text-gray-700">
											Investment Term
										</label>
										<div className="relative">
											<Input
												id="investment-term"
												type="number"
												value={investmentTerm}
												onChange={handleInvestmentTermInputChange}
												className="w-24 pr-11 text-right"
											/>
											<span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
												years
											</span>
										</div>
									</div>
									<Slider
										value={[investmentTerm]}
										min={1}
										max={30}
										step={1}
										onValueChange={handleInvestmentTermChange}
									/>
									<div className="flex items-center justify-between mt-1 text-xs text-gray-500">
										<span>1 year</span>
										<span>30 years</span>
									</div>
								</div>

								{/* Additional Contributions */}
								<div>
									<div className="flex items-center justify-between mb-2">
										<label
											htmlFor="contribution-frequency"
											className="text-sm font-medium text-gray-700"
										>
											Additional Contributions
										</label>
										<select
											id="contribution-frequency"
											value={contributionFrequency}
											onChange={(e) => setContributionFrequency(e.target.value)}
											className="text-sm rounded-md border border-gray-300 py-1 px-2"
										>
											<option value="none">None</option>
											<option value="annual">Annual</option>
											<option value="quarterly">Quarterly</option>
										</select>
									</div>

									{contributionFrequency !== "none" && (
										<>
											<div className="flex items-center justify-between mt-4 mb-2">
												<label
													htmlFor="additional-contribution"
													className="text-sm font-medium text-gray-700"
												>
													{contributionFrequency === "annual" ? "Annual" : "Quarterly"} Amount
												</label>
												<div className="relative">
													<span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
														$
													</span>
													<Input
														id="additional-contribution"
														type="number"
														value={additionalContribution}
														onChange={handleAdditionalContributionInputChange}
														className="w-24 pl-7 text-right"
													/>
												</div>
											</div>
											<Slider
												value={[additionalContribution]}
												min={1000}
												max={100000}
												step={1000}
												onValueChange={handleAdditionalContributionChange}
											/>
											<div className="flex items-center justify-between mt-1 text-xs text-gray-500">
												<span>$1,000</span>
												<span>$100,000</span>
											</div>
										</>
									)}
								</div>
							</div>

							<Button className="w-full mt-8 bg-navy-800 hover:bg-navy-700 text-white" asChild>
								<a href="/properties">View Investment Opportunities</a>
							</Button>
						</CardContent>
					</Card>
				</div>

				{/* Results Panel */}
				<div className="lg:col-span-2">
					<Card className="mb-6">
						<CardContent className="p-6">
							<h2 className="text-xl font-semibold text-navy-800 mb-6">Investment Projection</h2>

							<div className="h-80">
								<ResponsiveContainer width="100%" height="100%">
									<LineChart data={projections} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
										<CartesianGrid strokeDasharray="3 3" />
										<XAxis
											dataKey="year"
											label={{ value: "Years", position: "insideBottomRight", offset: -10 }}
										/>
										<YAxis
											tickFormatter={(value) => figureConverter(value, { showCurrency: false })}
											label={{ value: "Value ($)", angle: -90, position: "insideLeft" }}
										/>
										<Tooltip
											formatter={(value) => [
												figureConverter(value as number, { currency: "$", precision: 0 }),
												"Investment Value",
											]}
											labelFormatter={(label) => `Year ${label}`}
										/>
										<Legend />
										<Line
											type="monotone"
											dataKey="value"
											name="Investment Value"
											stroke="#334E68"
											strokeWidth={3}
											dot={{ r: 4 }}
											activeDot={{ r: 6 }}
										/>
									</LineChart>
								</ResponsiveContainer>
							</div>
						</CardContent>
					</Card>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
						<Card className="bg-navy-50">
							<CardContent className="p-6">
								<h3 className="text-sm font-medium text-gray-600 mb-1">Final Investment Value</h3>
								<div className="text-3xl font-bold text-navy-800">
									{figureConverter(finalValue, { currency: "$", precision: 0 })}
								</div>
								<p className="text-sm text-gray-600 mt-1">After {investmentTerm} years</p>
							</CardContent>
						</Card>

						<Card className="bg-navy-50">
							<CardContent className="p-6">
								<h3 className="text-sm font-medium text-gray-600 mb-1">Total Investment Return</h3>
								<div className="text-3xl font-bold text-navy-800">
									{figureConverter(totalReturn, { currency: "$", precision: 0 })}
								</div>
								<p className="text-sm text-gray-600 mt-1">
									{returnPercentage.toFixed(1)}% total return
								</p>
							</CardContent>
						</Card>
					</div>

					<Card>
						<CardContent className="p-6">
							<h2 className="text-xl font-semibold text-navy-800 mb-6">Investment Breakdown</h2>

							<Tabs defaultValue="summary">
								<TabsList className="mb-4">
									<TabsTrigger value="summary">Summary</TabsTrigger>
									<TabsTrigger value="yearly">Yearly Breakdown</TabsTrigger>
								</TabsList>

								<TabsContent value="summary">
									<div className="grid grid-cols-2 gap-4">
										<div className="space-y-1">
											<p className="text-sm text-gray-600">Initial Investment</p>
											<p className="text-lg font-semibold text-navy-800">
												{figureConverter(initialInvestment, { currency: "$" })}
											</p>
										</div>

										{contributionFrequency !== "none" && (
											<div className="space-y-1">
												<p className="text-sm text-gray-600">Additional Contributions</p>
												<p className="text-lg font-semibold text-navy-800">
													{figureConverter(
														contributionFrequency === "annual"
															? additionalContribution * investmentTerm
															: additionalContribution * investmentTerm,
														{ currency: "$" }
													)}
												</p>
											</div>
										)}

										<div className="space-y-1">
											<p className="text-sm text-gray-600">Total Contributions</p>
											<p className="text-lg font-semibold text-navy-800">
												{figureConverter(totalContributions, { currency: "$" })}
											</p>
										</div>

										<div className="space-y-1">
											<p className="text-sm text-gray-600">Investment Gains</p>
											<p className="text-lg font-semibold text-green-600">
												+{figureConverter(totalReturn, { currency: "$" })}
											</p>
										</div>

										<div className="space-y-1">
											<p className="text-sm text-gray-600">Annualized Return</p>
											<p className="text-lg font-semibold text-navy-800">{annualReturn}%</p>
										</div>

										<div className="space-y-1">
											<p className="text-sm text-gray-600">Total Return</p>
											<p className="text-lg font-semibold text-navy-800">
												{returnPercentage.toFixed(1)}%
											</p>
										</div>
									</div>

									<div className="mt-6 pt-6 border-t border-gray-200">
										<div className="flex items-center justify-between">
											<p className="text-base font-medium text-gray-700">Final Investment Value</p>
											<p className="text-2xl font-bold text-navy-800">
												{figureConverter(finalValue, { currency: "$", precision: 0 })}
											</p>
										</div>
									</div>
								</TabsContent>

								<TabsContent value="yearly">
									<div className="overflow-x-auto">
										<table className="min-w-full divide-y divide-gray-200">
											<thead className="bg-gray-50">
												<tr>
													<th
														scope="col"
														className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
													>
														Year
													</th>
													<th
														scope="col"
														className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
													>
														Investment Value
													</th>
													<th
														scope="col"
														className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
													>
														Annual Growth
													</th>
												</tr>
											</thead>
											<tbody className="bg-white divide-y divide-gray-200">
												{projections.map((year, i) => (
													<tr key={year.year}>
														<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
															Year {year.year}
														</td>
														<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 text-right font-medium">
															{figureConverter(year.value, { currency: "$" })}
														</td>
														<td className="px-4 py-3 whitespace-nowrap text-sm text-right">
															{i > 0 ? (
																<span className="text-green-600 font-medium">
																	+
																	{figureConverter(year.value - projections[i - 1].value, {
																		currency: "$",
																	})}
																</span>
															) : null}
														</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
								</TabsContent>
							</Tabs>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
};

export default CalculatorPage;
