import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Building, Menu, X } from "lucide-react";
import { useState } from "react";
import AuthButtons from "./app/app-sidebar/sidebar-header/auth-buttons";

const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between h-16">
					<div className="flex items-center">
						<Link to="/" className="flex-shrink-0 flex items-center">
							<Building className="h-8 w-8 text-navy-800" />
							<span className="ml-2 text-xl font-bold text-navy-800">REITPro</span>
						</Link>
						<div className="hidden md:ml-10 md:flex md:space-x-8">
							<Link
								to="/properties"
								className="text-navy-600 hover:text-navy-800 px-3 py-2 text-sm font-medium"
							>
								Investments
							</Link>
							<Link
								to="/developers"
								className="text-navy-600 hover:text-navy-800 px-3 py-2 text-sm font-medium"
							>
								Developers
							</Link>
							<Link
								to="/how-it-works"
								className="text-navy-600 hover:text-navy-800 px-3 py-2 text-sm font-medium"
							>
								How It Works
							</Link>
							{/* <Link to="/calculator" className="text-navy-600 hover:text-navy-800 px-3 py-2 text-sm font-medium">Investment Calculator</Link> */}
						</div>
					</div>
					<div className="hidden md:flex items-center space-x-4">
						<AuthButtons />
					</div>
					<div className="flex md:hidden items-center">
						<button
							type="button"
							className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-navy-500"
							onClick={() => setIsMenuOpen(!isMenuOpen)}
						>
							{isMenuOpen ? (
								<X className="h-6 w-6" aria-hidden="true" />
							) : (
								<Menu className="h-6 w-6" aria-hidden="true" />
							)}
						</button>
					</div>
				</div>
			</div>

			{isMenuOpen && (
				<div className="md:hidden">
					<div className="px-2 pt-2 pb-3 space-y-1">
						<Link
							to="/properties"
							className="block px-3 py-2 rounded-md text-base font-medium text-navy-600 hover:text-navy-800 hover:bg-navy-50"
						>
							Investments
						</Link>
						<Link
							to="/developers"
							className="block px-3 py-2 rounded-md text-base font-medium text-navy-600 hover:text-navy-800 hover:bg-navy-50"
						>
							Developers
						</Link>
						<Link
							to="/how-it-works"
							className="block px-3 py-2 rounded-md text-base font-medium text-navy-600 hover:text-navy-800 hover:bg-navy-50"
						>
							How It Works
						</Link>
						{/* <Link to="/calculator" className="block px-3 py-2 rounded-md text-base font-medium text-navy-600 hover:text-navy-800 hover:bg-navy-50">Investment Calculator</Link> */}
					</div>
					<div className="pt-4 pb-3 border-t border-gray-200">
						<div className="flex flex-col px-5 space-y-3">
							<Link to="/auth/login">
								<Button variant="outline" className="w-full border-navy-600 text-navy-600">
									Sign In
								</Button>
							</Link>
							<Link to="/auth/register">
								<Button className="w-full bg-navy-800 hover:bg-navy-700 text-white">Sign Up</Button>
							</Link>
						</div>
					</div>
				</div>
			)}
		</nav>
	);
};

export default Navbar;
