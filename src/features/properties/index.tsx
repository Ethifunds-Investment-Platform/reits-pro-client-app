import useProperties from "@/features/properties/use-properties";

import PropertyList from "./property-list";
import Render from "@/components/app/render";
import PropertyFilter from "./property-filter";

const PropertiesPage = () => {
	const {
		properties,
		totalCount,
		isLoading,
		isError,
		error,
		filters,
		updateSearchQuery,
		updatePropertyType,
		updateMinInvestment,
		updateExpectedReturn,
		clearFilters,
		currentPage,
		totalPages,
		onPageChange,
	} = useProperties();

	const hasActiveFilters =
		filters.propertyType !== "all" || filters.minInvestment > 0 || filters.expectedReturn > 0;

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
			<div className="mb-12">
				<h1 className="text-3xl font-bold text-navy-800">Investment Opportunities</h1>
				<p className="mt-2 text-gray-600">
					Browse our curated selection of real estate investment options
				</p>
			</div>

			<div className="flex flex-col lg:flex-row gap-8">
				{/* Filter section */}
				<PropertyFilter
					filters={filters}
					onUpdateSearchQuery={updateSearchQuery}
					onUpdatePropertyType={updatePropertyType}
					onUpdateMinInvestment={updateMinInvestment}
					onUpdateExpectedReturn={updateExpectedReturn}
					onClearFilters={clearFilters}
				/>

				{/* Property list with loading state handling */}
				<Render
					isLoading={isLoading}
					isError={isError}
					error={error}
					loadingComponent={<LoadingComponent />}
				>
					<PropertyList
						properties={properties}
						totalCount={totalCount}
						hasActiveFilters={hasActiveFilters}
						isLoading={isLoading}
						onClearFilters={clearFilters}
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={onPageChange}
					/>
				</Render>
			</div>
		</div>
	);
};

export default PropertiesPage;

function LoadingComponent() {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
			{[1, 2, 3, 4, 5, 6].map((i) => (
				<div key={i} className="property-card h-64 animate-pulse">
					<div className="h-36 bg-gray-200 rounded-t-lg"></div>
					<div className="p-4">
						<div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
						<div className="h-3 bg-gray-200 rounded w-1/2 mb-3"></div>
						<div className="h-2 bg-gray-200 rounded w-full mb-3"></div>
						<div className="flex gap-2">
							<div className="h-3 bg-gray-200 rounded w-1/4"></div>
							<div className="h-3 bg-gray-200 rounded w-1/4"></div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
