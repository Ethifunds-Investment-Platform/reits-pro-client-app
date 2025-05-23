import { useQuery } from "@tanstack/react-query";
import PropertyCard from "./property-card";
import Render from "@/components/app/render";
import getFeaturedProperties from "@/services/properties/get-featured-properties";
import { projectToPropertyData } from "./property-list";
import * as React from "react";

export default function FeaturedProperties() {
	const {
		data: featuredProperties,
		isFetching,
		isError,
		error,
	} = useQuery({
		queryKey: ["featured-properties"],
		queryFn: () => getFeaturedProperties(),
		select: (data) => data.map(projectToPropertyData),
	});

	const isEmpty = featuredProperties?.length === 0;
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
			<Render
				isLoading={isFetching}
				isError={isError}
				error={error}
				loadingComponent={<LoadingComponent />}
			>
				{isEmpty ? (
					<div className="text-center w-full col-span-full text-gray-500">
						
						No featured properties found
					
					</div>
				) : (
					featuredProperties?.slice(0, 3).map((property) => (
						<PropertyCard key={property.id} property={property} />
					))
				)}
			</Render>
		</div>
	);
}

function LoadingComponent() {
	return (
		<React.Fragment>
			{[1, 2, 3].map((i) => (
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
		</React.Fragment>
	);
}
