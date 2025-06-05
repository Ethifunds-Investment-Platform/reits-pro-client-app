import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { projectFormSchema } from "./schema";
import createProject from "@/services/developer/create-project";
import useAppSelector from "@/store/hooks";
import { DistributionFrequency, NewProject, ProjectType, TenorUnit } from "@/types/project.types";
import ensureError from "@/lib/ensure-error";

type FormValues = z.infer<typeof projectFormSchema>;

export function useCreateProject() {
	const { account } = useAppSelector("account");
	const [activeTab, setActiveTab] = useState("basic-details");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const navigate = useNavigate();

	const form = useForm<FormValues>({
		resolver: zodResolver(projectFormSchema),
		defaultValues: {
			name: "",
			description: "",
			type: "development" as ProjectType,
			display_image: "",
			location: {
				country: "",
				state: "",
				fullAddress: "",
			},
			paystack_product_url: "",
			risk_factors: "",
			property_highlights: "",
			currency_id: "",
			funding_goal: 0,
			expected_roi: 0,
			minimum_investment: 0,
			maximum_investment: 0,
			tenor_unit: "months" as TenorUnit,
			tenor_value: 12,
			distribution_frequency: "monthly" as DistributionFrequency,
			images: [],
		},
	});

	const handleSubmit = async (values: FormValues) => {
		if (!account?.id) {
			toast.error("Please log in to create a project");
			return;
		}

		setIsSubmitting(true);
		try {
			// Convert string fields to arrays
			const riskFactors = values.risk_factors
				.split(",")
				.map((item) => item.trim())
				.filter(Boolean);

			const propertyHighlights = values.property_highlights
				.split(",")
				.map((item) => item.trim())
				.filter(Boolean);

			// Format the data to match the NewProject type
			const formattedData: NewProject = {
				name: values.name,
				description: values.description,
				type: values.type as ProjectType,
				display_image: values.display_image,
				location: {
					country: values.location.country,
					state: values.location.state,
					fullAddress: values.location.fullAddress || "",
				},
				paystack_product_url: values.paystack_product_url,
				risk_factors: riskFactors,
				property_highlights: propertyHighlights,
				currency_id: values.currency_id,
				funding_goal: values.funding_goal,
				expected_roi: values.expected_roi,
				minimum_investment: values.minimum_investment,
				maximum_investment: values.maximum_investment,
				tenor_unit: values.tenor_unit as TenorUnit,
				tenor_value: values.tenor_value,
				distribution_frequency: values.distribution_frequency as DistributionFrequency,
				images: values.images || [],
				developer_id: account.id,
				funding_deadline: values.funding_deadline || null,
				project_memo: values.project_memo || null,
				developer_track_record: values.developer_track_record || null,
				market_analysis: values.market_analysis || null,
				financial_projections: values.financial_projections || null,
			};

			const projectResponse = await createProject(formattedData);
			if (projectResponse) {
				toast.success("Project created successfully! Redirecting to project page...");
				navigate(`/developer/projects/${projectResponse.id}`);
			}
		} catch (error) {
			const errMsg = ensureError(error).message;
			toast.error(errMsg);
		} finally {
			setIsSubmitting(false);
		}
	};

	// Set up error handling for form
	const setupErrorHandling = () => {
		const subscription = form.watch(() => {
			const errors = form.formState.errors;
			// Only show errors when form is submitted
			if (form.formState.isSubmitted) {
				Object.entries(errors).forEach(([field, error]) => {
					if (error?.message) {
						toast.error(`${field.charAt(0).toUpperCase() + field.slice(1)}: ${error.message}`, {
							id: `field-error-${field}`, // Prevent duplicate toasts
						});
					}
				});
			}
		});

		return subscription;
	};

	const tabs = ["basic-details", "location", "financial", "images", "analysis"];
	const goToNextTab = () => {
		const currentIndex = tabs.indexOf(activeTab);
		if (currentIndex < tabs.length - 1) {
			setActiveTab(tabs[currentIndex + 1]);
		}
	};

	const goToPreviousTab = () => {
		const currentIndex = tabs.indexOf(activeTab);
		if (currentIndex > 0) {
			setActiveTab(tabs[currentIndex - 1]);
		}
	};

	return {
		form,
		activeTab,
		setActiveTab,
		isSubmitting,
		handleSubmit,
		setupErrorHandling,
		goToNextTab,
		goToPreviousTab,
		tabs: ["basic-details", "location", "financial", "images", "analysis"],
	};
}
