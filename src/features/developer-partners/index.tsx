import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import DeveloperCard from "./developer-card";
import { useQuery } from "@tanstack/react-query";
import Render from "@/components/app/render";
import { variables } from "@/constants";
import getDevelopersMetrics from "@/services/developers/get-developers-metrics";
import useAppSelector from "@/store/hooks";
import { amountSeparator } from "@/lib/amount-separator";

const DeveloperPartners = () => {
	const { activeCurrency } = useAppSelector("init");
	const { data, isFetching, isError, error } = useQuery({
		queryKey: ["developers-metrics"],
		queryFn: () => getDevelopersMetrics(),
	});

	const symbol = activeCurrency.symbol ?? "";

	const metrics = data;

	const capitalRaised = metrics?.total_investment || 0;
	const metricsData = [
		{
			title: "Projects Completed",
			value: amountSeparator(metrics?.total_projects?.toString() || "0"),
		},
		{
			title: "Capital Raised",
			value: `${symbol}${(capitalRaised / 1000000).toFixed(capitalRaised > 1000000 ? 1 : 3)}M`,
		},
		{
			title: "Average Experience",
			value: `${metrics?.average_experience || 0} years`,
		},
		{
			title: "Average Returns",
			value: `${metrics?.total_return || 0}%`,
		},
	];

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
			<div className="mb-12">
				<h1 className="text-3xl font-bold text-navy-800">Our Development Partners</h1>
				<p className="mt-2 text-gray-600">
					REITpro partners with experienced real estate developers with proven track records
				</p>
			</div>

			{/* Featured Section */}
			<div className="mb-16 bg-navy-50 rounded-xl overflow-hidden">
				<div className="md:flex">
					<div className="md:w-1/2 p-8 md:p-12">
						<Badge variant="outline" className="mb-6 text-navy-700 border-navy-700">
							Featured Partner
						</Badge>
						<h2 className="text-2xl font-bold text-navy-800 mb-4">Trusted Development Partners</h2>
						<p className="text-gray-600 mb-6">
							We rigorously vet each developer partner to ensure they have a proven history of
							successful projects, strong financial performance, and a commitment to investor
							transparency. Our partners have an average of 15+ years experience in real estate
							development.
						</p>
						<div className="grid grid-cols-2 gap-4 mb-6">
							{metricsData.map((item) => (
								<div key={item.title}>
									<p className="text-sm text-gray-600">{item.title}</p>
									<p className="text-2xl font-bold text-navy-800">{item.value}</p>
								</div>
							))}
						</div>
						<Button variant="outline" className="border-navy-600 text-navy-700 hover:bg-navy-100">
							<Link to="#developers-list" className="inline-flex items-center">
								Meet Our Developers
							</Link>
						</Button>
					</div>
					<div className="md:w-1/2 bg-navy-800 flex items-center justify-center p-12">
						<div className="text-center">
							<Building className="h-16 w-16 mx-auto text-gold-400 mb-4" />
							<p className="text-white text-lg font-medium mb-6">Partner With Us</p>
							<p className="text-navy-100 mb-8">
								Are you a developer looking to raise capital for your next project? REITpro connects
								quality developers with our network of investors.
							</p>
							<Button className="bg-gold-500 hover:bg-gold-600 text-navy-900 font-semibold">
								<Link
									to={variables.CONTACTS.partner_with_us}
									target="_blank"
									// className="!bg-gold-500 hover:bg-gold-600 text-navy-900 font-semibold"
								>
									Submit Your Project
								</Link>
							</Button>
						</div>
					</div>
				</div>
			</div>

			{/* Developers List */}
			<div id="developers-list">
				<div className="flex items-center justify-between mb-8">
					<h2 className="text-2xl font-bold text-navy-800">Development Partners</h2>
				</div>

				<Render
					isLoading={isFetching}
					isError={isError}
					error={error}
					loadingComponent={<LoadingComponent />}
				>
					<div className="grid grid-cols-1 gap-8">
						{data &&
							data?.developers?.map((item) => (
								<DeveloperCard key={item.developer_id} {...item} symbol={symbol} />
							))}
					</div>
				</Render>
			</div>

			{/* Become a Partner */}
			<div className="mt-16 bg-gradient-to-r from-navy-800 to-navy-900 rounded-xl overflow-hidden text-white">
				<div className="px-6 py-12 sm:px-12 lg:px-16">
					<div className="md:flex items-center justify-between">
						<div className="md:w-2/3 mb-8 md:mb-0">
							<h2 className="text-2xl font-bold mb-4">Are you a real estate developer?</h2>
							<p className="text-navy-100">
								Partner with REITpro to raise capital for your projects from our network of
								qualified investors. We offer a streamlined process for developers to showcase their
								projects and secure funding.
							</p>
						</div>
						<div className="md:w-1/3 text-center md:text-right">
							<Button
								variant="outline"
								className="!bg-gold-500 hover:bg-gold-600 border-none text-navy-900 font-semibold"
								asChild
							>
								<Link
									to={variables.CONTACTS.partner_with_us}
									target="_blank"
									// className="!bg-gold-500 hover:bg-gold-600 text-navy-900 font-semibold"
								>
									<span className="flex items-center">
										Partner With Us
										<ExternalLink className="ml-2 h-4 w-4" />
									</span>
								</Link>
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DeveloperPartners;

function LoadingComponent() {
	return (
		<div className="grid grid-cols-1 gap-8">
			{[1, 2, 3].map((i) => (
				<Card key={i} className="animate-pulse">
					<CardContent className="p-6">
						<div className="md:flex">
							<div className="md:w-1/4 mb-6 md:mb-0 md:pr-6">
								<div className="bg-gray-200 h-32 w-32 mx-auto md:mx-0 rounded"></div>
							</div>
							<div className="md:w-3/4">
								<div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
								<div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
								<div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
								<div className="h-4 bg-gray-200 rounded w-5/6 mb-6"></div>
								<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
									<div className="h-12 bg-gray-200 rounded"></div>
									<div className="h-12 bg-gray-200 rounded"></div>
									<div className="h-12 bg-gray-200 rounded"></div>
									<div className="h-12 bg-gray-200 rounded"></div>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
}
