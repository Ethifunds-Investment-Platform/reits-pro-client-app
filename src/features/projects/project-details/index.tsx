import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useProjectDetails from "./use-project-details";
import DetailsHeader from "./details-header";
import ContentSlider from "./content-slider";
import ProjectTabs from "./project-tabs";
import AppContainer from "@/components/app/container/container";
import Render from "@/components/app/render";
import * as React from "react";

export default function ProjectDetails() {
	const { data, isFetching, isError, error } = useProjectDetails();

	return (
		<AppContainer className="">
			<Render
				isLoading={isFetching}
				isError={isError}
				error={error}
				loadingComponent={<LoadingComponent />}
			>
				{!data ? (
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
						<div className="text-center py-16">
							<h1 className="text-2xl font-semibold text-gray-900">Property Not Found</h1>
							<p className="mt-2 text-gray-600">
								The property you're looking for doesn't exist or has been removed.
							</p>
							<Button asChild className="mt-6 bg-navy-800 hover:bg-navy-700 text-white">
								<Link to="/developer/projects">Browse your Projects</Link>
							</Button>
						</div>
					</div>
				) : (
					<React.Fragment>
						{/* Property Title and Location */}
						<DetailsHeader {...data} />

						{/* Main Image */}
						<div className="rounded-lg overflow-hidden h-96 mb-10">
							<img
								src={data.display_image}
								alt={data.name}
								className="w-full h-full object-cover"
							/>
						</div>

						{/* Content Grid */}
						<div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-10">
							{/* Main Content Area */}
							<ProjectTabs {...data} />

							{/* Investment Sidebar */}
							<ContentSlider {...data} />
						</div>
					</React.Fragment>
				)}
			</Render>
		</AppContainer>
	);
}

function LoadingComponent() {
	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
			<div className="animate-pulse">
				<div className="h-8 bg-gray-200 rounded w-3/4 mb-6"></div>
				<div className="h-96 bg-gray-200 rounded mb-8"></div>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					<div className="md:col-span-2">
						<div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
						<div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
						<div className="h-4 bg-gray-200 rounded w-3/4 mb-8"></div>
						<div className="h-64 bg-gray-200 rounded w-full"></div>
					</div>
					<div>
						<div className="h-64 bg-gray-200 rounded mb-4"></div>
						<div className="h-12 bg-gray-200 rounded"></div>
					</div>
				</div>
			</div>
		</div>
	);
}
