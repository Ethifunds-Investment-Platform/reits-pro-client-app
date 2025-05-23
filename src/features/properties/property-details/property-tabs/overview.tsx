import { TabsContent } from "@/components/ui/tabs";
import mergeText from "@/lib/transform-text";
import { Project } from "@/types/project.types";
import * as React from "react";

export default React.memo(function Overview(props: Project) {
	const isCompleted = props.status === "completed";
	const fullAddress = mergeText(
		props.location?.fullAddress ?? "",
		props.location.state,
		props.location.country
	).replace(" ", ",");
	return (
		<TabsContent value="overview">
			<div className="space-y-6">
				<div>
					<h2 className="text-xl font-semibold text-navy-800 mb-3">Investment Opportunity</h2>
					<p className="text-gray-700">
						{props.description ? (
							<React.Fragment>{props.description}</React.Fragment>
						) : (
							<React.Fragment>
								This {!isCompleted ? "development project" : "property"} offers investors the
								opportunity to participate in
								{!isCompleted ? " the development of" : ""} a high-potential real estate asset in{" "}
								{fullAddress}. With a target annual return of {props.expected_roi}%, this investment
								is structured to provide both capital appreciation and regular income.
							</React.Fragment>
						)}
					</p>
				</div>

				<div>
					<h2 className="text-xl font-semibold text-navy-800 mb-3">Property Highlights</h2>
					<ul className="list-disc pl-5 space-y-2 text-gray-700">
						{props.property_highlights.map((item) => (
							<li key={item}>{item}</li>
						))}
						<li>Professional property management</li>
					</ul>
				</div>

				{/* <div>
					<h2 className="text-xl font-semibold text-navy-800 mb-3">Location</h2>
					<p className="text-gray-700 mb-4">
						Located in the heart of {property.location}, this property benefits from excellent
						transportation links, proximity to major employment centers, and strong local market
						fundamentals.
					</p>
				</div> */}
			</div>
		</TabsContent>
	);
});
