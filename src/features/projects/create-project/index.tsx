import  { useEffect } from "react";
import { ArrowLeft, Check, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AppContainer from "@/components/app/container/container";
import { Button } from "@/components/ui/button";
import {
	Form,

} from "@/components/ui/form";
import { Link } from "react-router-dom";
import ProjectFormBasicDetails from "./tabs/basic-details";
import ProjectFormFinancialDetails from "./tabs/financial-details";
import ProjectFormImagesTab from "./tabs/images";
import ProjectFormLocationTab from "./tabs/location";
import ProjectFormAnalysisTab from "./tabs/analysis";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useCreateProject } from "./use-create-project";
import { Input } from "@/components/ui/input";

export default function CreateProject() {
	const navigate = useNavigate();
	const {
		form,
		activeTab,
		setActiveTab,
		isSubmitting,
		handleSubmit,
		setupErrorHandling,
		goToNextTab,
		goToPreviousTab,
		tabs,
	} = useCreateProject();

	// Setup form error handling
	useEffect(() => {
		const subscription = setupErrorHandling();
		return () => subscription.unsubscribe();
	}, []);

	return (
		<AppContainer>
			<div className="mb-8">
				<div className="flex items-center gap-4 mb-6">
					<Button variant="outline" size="sm" asChild>
						<Link to="/developer/projects">
							<ArrowLeft className="h-4 w-4 mr-1" />
							Back to Projects
						</Link>
					</Button>
				</div>

				<h1 className="text-2xl font-bold text-navy-800">Create New Project</h1>
				<p className="text-gray-600 mt-2">
					Fill in the details below to create a new property development project
				</p>
			</div>

			<Card className="space-y-6">
				<Form {...form}>
					<form id="project-form" onSubmit={form.handleSubmit(handleSubmit)}>
						<div className="flex justify-between px-5 pt-3">
							{/* <Input
								placeholder="Enter Paystack product URL here"
								{...form.register("paystack_product_url")}
								className="w-1/3"
							/> */}

							<Button
								type="submit"
								form="project-form"
								disabled={isSubmitting}
								className="bg-navy-800 hover:bg-navy-700 "
							>
								{isSubmitting ? (
									<>
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										Creating...
									</>
								) : (
									<>
										<Check className="mr-2 h-4 w-4" />
										Create Project
									</>
								)}
							</Button>
						</div>
						<CardContent className="p-6">
							<Tabs value={activeTab} onValueChange={setActiveTab}>
								<TabsList className="flex gap-3 lg:grid grid-cols-5 mb-8 overflow-auto justify-start">
									<TabsTrigger value="basic-details">Basic Details</TabsTrigger>
									<TabsTrigger value="location">Location</TabsTrigger>
									<TabsTrigger value="financial">Financial Details</TabsTrigger>
									<TabsTrigger value="images">Images</TabsTrigger>
									<TabsTrigger value="analysis">Analysis</TabsTrigger>
								</TabsList>

								<ProjectFormBasicDetails form={form} />

								<ProjectFormLocationTab form={form} />

								<ProjectFormFinancialDetails form={form} />

								<ProjectFormImagesTab form={form} />

								<ProjectFormAnalysisTab form={form} />
							</Tabs>
						</CardContent>
					</form>
				</Form>

				<CardFooter className="flex justify-between pt-4 border-t mx-6">
					{activeTab !== "basic-details" && (
						<Button type="button" variant="outline" onClick={goToPreviousTab}>
							Previous
						</Button>
					)}

					<div className="ml-auto flex space-x-2">
						<Button type="button" variant="outline" onClick={() => navigate("/developer/projects")}>
							Cancel
						</Button>

						{activeTab !== "analysis" ? (
							<Button type="button" onClick={goToNextTab}>
								Next
							</Button>
						) : null}
					</div>
				</CardFooter>
			</Card>
		</AppContainer>
	);
}
