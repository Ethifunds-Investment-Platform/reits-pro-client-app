
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

import FeaturedProperties from "@/features/properties/featured-properties";


export default function OpportunityExplorer() {
	return (
		<div className="mt-6">
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-xl font-semibold">Investment Opportunities</h2>
				<Button variant="outline" size="sm" asChild>
					<Link to="/properties" className="flex items-center gap-1">
						View All
						<ChevronRight className="h-4 w-4" />
					</Link>
				</Button>
			</div>

			<FeaturedProperties />
		</div>
	);
}

