import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="text-center bg-white p-10 rounded-lg shadow-md">
				<h1 className="text-6xl font-bold mb-4 text-navy-800">404</h1>
				<p className="text-xl text-gray-600 mb-6">Oops! Page not found</p>
				<p className="text-gray-500 mb-6">
					The page you're looking for doesn't exist or has been moved.
				</p>
				<Button asChild className="bg-navy-800 hover:bg-navy-700 text-white">
					<Link to="/">Return to Home</Link>
				</Button>
			</div>
		</div>
	);
};

export default NotFound;
