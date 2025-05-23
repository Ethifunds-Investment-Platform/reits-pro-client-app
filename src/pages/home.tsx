import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Building, CircleDollarSign, ChevronRight, Percent, PieChart, Shield } from "lucide-react";
import FeaturedProperties from "@/features/properties/featured-properties";
import HomeMetrics from "@/features/home-metrics";

const HomePage = () => {
	return (
		<div className="flex flex-col min-h-screen">
			{/* Hero Section */}
			<section className="hero-section py-20 md:py-28">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="md:max-w-2xl lg:max-w-3xl">
						<h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
							Invest in Real Estate.
							<br />
							<span className="text-gold-400">Together.</span>
						</h1>
						<p className="mt-6 text-lg text-gray-100 max-w-3xl">
							Join thousands of investors funding the future of real estate development. Find
							curated opportunities with trusted developers and start building your real estate
							portfolio today.
						</p>
						<div className="mt-10 flex flex-wrap gap-4">
							<Button
								asChild
								size="lg"
								className="bg-gold-500 hover:bg-gold-600 text-navy-900 font-semibold"
							>
								<Link to="/properties">Browse Investments</Link>
							</Button>
							<Button
								asChild
								size="lg"
								variant="outline"
								className="bg-navy-800 text-white border-white hover:bg-navy-700"
							>
								<Link to="/how-it-works">How It Works</Link>
							</Button>
						</div>
						<HomeMetrics />
					</div>
				</div>
			</section>

			{/* How It Works Section */}
			<section className="py-16 bg-gray-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center max-w-3xl mx-auto">
						<h2 className="text-3xl font-bold text-navy-800 sm:text-4xl">How RealtyRise Works</h2>
						<p className="mt-4 text-lg text-gray-600">
							We make real estate investing simple, transparent, and accessible.
						</p>
					</div>

					<div className="mt-16 grid gap-8 md:grid-cols-3">
						<div className="stat-card">
							<div className="h-12 w-12 bg-navy-100 text-navy-800 rounded-lg flex items-center justify-center mb-4">
								<PieChart className="h-6 w-6" />
							</div>
							<h3 className="text-xl font-semibold text-navy-800">Browse Investments</h3>
							<p className="mt-2 text-gray-600">
								Explore a curated selection of high-quality real estate investment opportunities
								from vetted developers.
							</p>
						</div>

						<div className="stat-card">
							<div className="h-12 w-12 bg-navy-100 text-navy-800 rounded-lg flex items-center justify-center mb-4">
								<CircleDollarSign className="h-6 w-6" />
							</div>
							<h3 className="text-xl font-semibold text-navy-800">Invest Securely</h3>
							<p className="mt-2 text-gray-600">
								Invest any amount above the minimum with our secure platform, backed by
								industry-leading security standards.
							</p>
						</div>

						<div className="stat-card">
							<div className="h-12 w-12 bg-navy-100 text-navy-800 rounded-lg flex items-center justify-center mb-4">
								<Percent className="h-6 w-6" />
							</div>
							<h3 className="text-xl font-semibold text-navy-800">Receive Returns</h3>
							<p className="mt-2 text-gray-600">
								Track your investments in real-time and receive quarterly distributions directly to
								your bank account.
							</p>
						</div>
					</div>

					<div className="mt-12 text-center">
						<Button
							asChild
							variant="outline"
							className="mt-8 border-navy-600 text-navy-700 hover:bg-navy-50"
						>
							<Link to="/how-it-works" className="inline-flex items-center">
								Learn More About Investing
								<ChevronRight className="ml-2 h-4 w-4" />
							</Link>
						</Button>
					</div>
				</div>
			</section>

			{/* Featured Properties Section */}
			<section className="py-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between mb-12">
						<div>
							<h2 className="text-3xl font-bold text-navy-800">
								Featured Investment Opportunities
							</h2>
							<p className="mt-2 text-gray-600">Curated properties with strong potential returns</p>
						</div>
						<Button
							asChild
							variant="outline"
							className="border-navy-600 text-navy-700 hover:bg-navy-50 hidden md:flex"
						>
							<Link to="/properties" className="inline-flex items-center">
								View All Properties
								<ChevronRight className="ml-2 h-4 w-4" />
							</Link>
						</Button>
					</div>

					<FeaturedProperties />

					<div className="mt-8 text-center md:hidden">
						<Button
							asChild
							variant="outline"
							className="border-navy-600 text-navy-700 hover:bg-navy-50"
						>
							<Link to="/properties">
								View All Properties
								<ChevronRight className="ml-2 h-4 w-4" />
							</Link>
						</Button>
					</div>
				</div>
			</section>

			{/* Why Choose Us Section */}
			<section className="py-16 bg-navy-800 text-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center max-w-3xl mx-auto">
						<h2 className="text-3xl font-bold sm:text-4xl">Why Choose RealtyRise</h2>
						<p className="mt-4 text-lg text-gray-300">
							We're transforming real estate investing with technology and transparency.
						</p>
					</div>

					<div className="mt-16 grid gap-8 md:grid-cols-3">
						<div className="bg-navy-700 rounded-lg p-6 shadow-md border border-navy-600">
							<div className="h-12 w-12 bg-navy-600 text-gold-400 rounded-lg flex items-center justify-center mb-4">
								<Shield className="h-6 w-6" />
							</div>
							<h3 className="text-xl font-semibold">Rigorous Vetting</h3>
							<p className="mt-2 text-gray-300">
								Less than 5% of proposed projects meet our strict underwriting criteria. We focus on
								quality, not quantity.
							</p>
						</div>

						<div className="bg-navy-700 rounded-lg p-6 shadow-md border border-navy-600">
							<div className="h-12 w-12 bg-navy-600 text-gold-400 rounded-lg flex items-center justify-center mb-4">
								<Building className="h-6 w-6" />
							</div>
							<h3 className="text-xl font-semibold">Experienced Developers</h3>
							<p className="mt-2 text-gray-300">
								We partner with experienced developers with proven track records of successful
								projects and returns.
							</p>
						</div>

						<div className="bg-navy-700 rounded-lg p-6 shadow-md border border-navy-600">
							<div className="h-12 w-12 bg-navy-600 text-gold-400 rounded-lg flex items-center justify-center mb-4">
								<CircleDollarSign className="h-6 w-6" />
							</div>
							<h3 className="text-xl font-semibold">Transparent Fees</h3>
							<p className="mt-2 text-gray-300">
								Clear fee structure with no hidden costs. We succeed when you succeed.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Call To Action */}
			<section className="py-16 bg-gradient-to-r from-navy-700 to-navy-900 text-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<h2 className="text-3xl font-bold sm:text-4xl">
						Ready to start investing in real estate?
					</h2>
					<p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
						Join thousands of investors who are already diversifying their portfolios with real
						estate.
					</p>
					<Button
						asChild
						size="lg"
						className="mt-10 bg-gold-500 hover:bg-gold-600 text-navy-900 font-semibold"
					>
						<Link to="/properties">Browse Investment Opportunities</Link>
					</Button>
				</div>
			</section>
		</div>
	);
};

export default HomePage;
