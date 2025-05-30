import { Badge, badgeVariants } from "@/components/ui/badge";
import { TabsContent } from "@/components/ui/tabs";
import useAppSelector from "@/store/hooks";
import { Project } from "@/types/project.types";
import { FileText } from "lucide-react";
import * as React from "react";
import { Link } from "react-router-dom";

export default React.memo(function Documents(props: Project) {
	const data = [
		{ title: "Offering Memorandum", url: props.project_memo || "" },
		{ title: "Financial Projections", url: props.financial_projections || "" },
		{ title: "Developer Track Record", url: props.developer_track_record || "" },
		{ title: "Market Analysis", url: props.market_analysis || "" },
	];
	return (
		<TabsContent value="documents">
			<div className="space-y-6">
				{/* <div className="bg-gray-50 rounded-lg p-8 text-center border border-gray-200">
					<FileText className="h-10 w-10 mx-auto text-navy-600 mb-4" />
					<h3 className="text-lg font-medium text-navy-800 mb-2">
						Investment Documents Available After Sign-Up
					</h3>
					<p className="text-gray-600 mb-6">
						Create an account to access detailed financial models, developer background, and legal
						documentation.
					</p>
					<Button className="bg-navy-800 hover:bg-navy-700 text-white">
						Sign Up to Access Documents
					</Button>
				</div> */}

				<div>
					<h2 className="text-xl font-semibold text-navy-800 mb-3">Available Documents</h2>
					<ul className="space-y-4">
						{data
							.filter((item) => item.url !== "")
							.map((item) => (
								<DocumentItem key={item.title} {...item} />
							))}
					</ul>
				</div>
			</div>
		</TabsContent>
	);
});

function DocumentItem(props: { title: string; url: string }) {
	const { account } = useAppSelector("account");

	const isLoggedIn = !!account?.id;

	return (
		<li className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
			<div className="flex items-center">
				<FileText className="h-5 w-5 text-gray-400 mr-3" />
				<span className="text-gray-800">Market Analysis</span>
			</div>
			{!isLoggedIn ? (
				<Badge variant="outline">Sign Up to View</Badge>
			) : (
				<Link to={props.url} target="_blank" className={badgeVariants({ variant: "outline" })}>
					View
				</Link>
			)}
		</li>
	);
}
