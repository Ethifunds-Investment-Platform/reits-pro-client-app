import { Project } from "@/types/project.types";
import { Button } from "@/components/ui/button";
import { useMemo } from "react";
import PropertyCard from "./property-card";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
type PropertyListProps = {
	properties: Project[];
	totalCount: number;
	hasActiveFilters: boolean;
	isLoading: boolean;
	onClearFilters: () => void;
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
};

// Helper function to convert Project to PropertyData format
export const projectToPropertyData = (project: Project) => {
	return {
		id: project.id,
		title: project.name,
		location: `${project.location.state}, ${project.location.country}`,
		imageUrl: project.display_image,
		price: project.funding_goal,
		expectedReturn: project.expected_roi,
		type: project.type,
		fundingProgress: Math.min(100, (project.amount_raised / project.funding_goal) * 100),
		investorsCount: project.total_investors,
		minimumInvestment: project.minimum_investment,
		currency: project.currency,
	};
};

const PropertyList = ({
	properties,
	totalCount,
	hasActiveFilters,
	isLoading,
	onClearFilters,
	currentPage,
	totalPages,
	onPageChange,
}: PropertyListProps) => {
	// Convert Project to PropertyData format for PropertyCard
	const propertyData = useMemo(() => properties.map(projectToPropertyData), [properties]);

	return (
		<div className="flex-1">
			{/* Results count */}
			<div className="mb-6 flex justify-between items-center">
				<p className="text-sm text-gray-600">
					Showing {propertyData.length} of {totalCount} properties
				</p>

				{hasActiveFilters && (
					<Button
						variant="ghost"
						size="sm"
						className="text-navy-700 text-sm hover:bg-navy-50"
						onClick={onClearFilters}
					>
						Clear Filters
						<X className="ml-1 h-3 w-3" />
					</Button>
				)}
			</div>

			{/* Property grid */}
			{propertyData.length > 0 ? (
				<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
					{propertyData.map((property) => (
						<PropertyCard key={property.id} property={property} />
					))}
				</div>
			) : (
				<div className="text-center py-12">
					<h3 className="text-lg font-medium text-gray-900">No properties found</h3>
					<p className="mt-2 text-sm text-gray-500">
						Try adjusting your filters to find more investment opportunities.
					</p>
					<Button
						onClick={onClearFilters}
						className="mt-4 bg-navy-800 hover:bg-navy-700 text-white"
					>
						Clear all filters
					</Button>
				</div>
			)}

			{/* Pagination controls */}
			{propertyData.length > 0 && totalPages > 1 && (
				<div className="flex justify-center items-center mt-12 space-x-2">
					<Button
						variant="outline"
						size="sm"
						className="flex items-center"
						onClick={() => onPageChange(currentPage - 1)}
						disabled={currentPage <= 1}
					>
						<ChevronLeft className="h-4 w-4 mr-1" />
						Previous
					</Button>
					<div className="text-sm text-gray-600 px-4">
						Page {currentPage} of {totalPages}
					</div>
					<Button
						variant="outline"
						size="sm"
						className="flex items-center"
						onClick={() => onPageChange(currentPage + 1)}
						disabled={currentPage >= totalPages}
					>
						Next
						<ChevronRight className="h-4 w-4 ml-1" />
					</Button>
				</div>
			)}
		</div>
	);
};

export default PropertyList;
