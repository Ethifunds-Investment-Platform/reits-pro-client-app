import EmptyData from "@/components/app/empty-data";
import Render from "@/components/app/render";
import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import getProjectUpdates from "@/services/developer/get-project-updates";
import useActions from "@/store/actions";
import useAppSelector from "@/store/hooks";
import { Project } from "@/types/project.types";
import { useQuery } from "@tanstack/react-query";
import * as React from "react";

export default React.memo(function Updates(props: Project) {
	const { account } = useAppSelector("account");
	const { ui } = useActions();
	const isLoggedIn = !!account?.id;

	const isDeveloper = account?.role === "developer";
	const {
		data: updates,
		isFetching,
		refetch,
	} = useQuery({
		queryKey: ["project-updates", props.id],
		queryFn: () => getProjectUpdates({ project_id: props.id }),
	});

	const click = () => {
		ui.changeDialog({
			show: true,
			type: "project_update",
			data: { project_id: props.id },
			action: async () => {
				await refetch();
				return;
			},
			dismiss: null,
			id: "project-update",
		});
	};
	return (
		<TabsContent value="updates">
			<div className="space-y-6">
				{!isLoggedIn ? (
					<div className="bg-gray-50 rounded-lg p-8 text-center border border-gray-200">
						<h3 className="text-lg font-medium text-navy-800 mb-2">
							Project Updates Available for Investors
						</h3>
						<p className="text-gray-600 mb-6">
							Sign up and invest to receive regular updates on this property's performance and
							milestones.
						</p>
						<Button className="bg-navy-800 hover:bg-navy-700 text-white">Create Account</Button>
					</div>
				) : (
					<div className="space-y-5">
						<div className="flex items-center justify-between">
							<h2 className="text-xl font-semibold text-navy-800 mb-3">Recent Updates</h2>
							{isDeveloper && <Button onClick={click}>Upload Update</Button>}
						</div>

						<Render isLoading={isFetching}>
							<div className="border border-gray-200 rounded-lg divide-y">
								{updates && updates?.length < 1 ? (
									<EmptyData
										title="No updates found"
										text="No updates found for this project. all updates would be recorded here"
									/>
								) : (
									updates?.map((item) => (
										<div className="p-4" key={item.id}>
											<div className="flex items-center justify-between mb-2">
												<h3 className="font-medium text-navy-800">{item.title}</h3>
												<span className="text-sm text-gray-500">{item.created_at}</span>
											</div>
											<p className="text-gray-600 text-sm">{item.content}</p>

											{item.images && item.images.length > 0 && (
												<div className="mt-3 grid grid-cols-3 gap-2">
													{item.images.map((image, index) => (
														<div key={index} className="border rounded-md overflow-hidden">
															<img
																src={
																	image.startsWith("data:")
																		? image
																		: `data:image/jpeg;base64,${image}`
																}
																alt={`Update image ${index + 1}`}
																className="w-full h-20 object-cover"
															/>
														</div>
													))}
												</div>
											)}
										</div>
									))
								)}
							</div>
						</Render>
					</div>
				)}
			</div>
		</TabsContent>
	);
});
