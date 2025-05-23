import { Project } from "@/types/project.types";
import Overview from "./overview";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Details from "./details";
import Documents from "./documents";
import Updates from "./updates";

export default function ProjectTabs(props: Project) {
	return (
		<div className="lg:col-span-2">
			{/* Investment Overview */}
			<Tabs defaultValue="overview" className="mb-12">
				<TabsList className="mb-4 !overflow-x-auto overflow-y-hidden w-full pl-10 lg:overflow-x-hidden lg:w-auto lg:pl-0">
					<TabsTrigger value="overview">Overview</TabsTrigger>
					<TabsTrigger value="details">Investment Details</TabsTrigger>
					<TabsTrigger value="documents">Documents</TabsTrigger>
					<TabsTrigger value="updates">Updates</TabsTrigger>
				</TabsList>

				<Overview {...props} />

				<Details {...props} />

				<Documents {...props} />

				<Updates {...props} />
			</Tabs>

			{/* Developer Info */}
			{/* <div className="mb-12">
				<h2 className="text-xl font-semibold text-navy-800 mb-4">About the Developer</h2>
				<Card>
					<CardContent className="p-6">
						<div className="flex items-center mb-4">
							<div className="h-16 w-16 bg-navy-100 rounded-full mr-4 flex items-center justify-center">
								<Building className="h-8 w-8 text-navy-800" />
							</div>
							<div>
								<h3 className="font-semibold text-navy-800">Horizon Development Group</h3>
								<p className="text-sm text-gray-600">Established 2005 • New York, NY</p>
							</div>
						</div>
						<p className="text-gray-700 mb-4">
							Horizon Development Group specializes in developing high-quality residential and
							commercial properties across major U.S. markets. With over 25 successful projects
							completed, their experienced team has a proven track record of delivering strong
							returns to investors.
						</p>
						<Button
							asChild
							variant="outline"
							className="w-full border-navy-600 text-navy-700 hover:bg-navy-50"
						>
							<Link to="/developers/dev1">View Developer Profile</Link>
						</Button>
					</CardContent>
				</Card>
			</div> */}
		</div>
	);
}
