import { Project } from "@/types/project.types";
import { z } from "zod";
import { updateProjectFormSchema } from "../schema";

type FormValues = z.infer<typeof updateProjectFormSchema>;

/**
 * Transforms server project data to form-compatible data
 * Handles conversion of URLs to display state while keeping form values as undefined
 * for file fields until user uploads new files
 */
export function transformProjectToFormData(project: Project): FormValues {
	return {
		name: project.name,
		description: project.description,
		type: project.type,
		location: {
			country: project.location.country,
			state: project.location.state,
			fullAddress: project.location.fullAddress || "",
		},
		// Convert array back to comma-separated string for form
		risk_factors: project.risk_factors.join(", "),
		property_highlights: project.property_highlights.join(", "),
		currency_id: project.currency_id,
		funding_goal: project.funding_goal,
		expected_roi: project.expected_roi,
		minimum_investment: project.minimum_investment,
		maximum_investment: project.maximum_investment || 0,
		tenor_unit: project.tenor_unit,
		tenor_value: project.tenor_value,
		funding_deadline: project.funding_deadline || "",
		distribution_frequency: project.distribution_frequency,

		// File fields: Keep as undefined initially, will be handled separately
		display_image: undefined,
		images: [],
		project_memo: project.project_memo,
		developer_track_record: project.developer_track_record,
		market_analysis: project.market_analysis,
		financial_projections: project.financial_projections,
	};
}

/**
 * Extracts image URLs for display purposes
 */
export function extractImageUrls(project: Project) {
	return {
		displayImageUrl: project.display_image,
		imageUrls: project.images || [],
	};
}

/**
 * Extracts document URLs for display purposes
 */
export function extractDocumentUrls(project: Project) {
	return {
		project_memo: project.project_memo,
		developer_track_record: project.developer_track_record,
		market_analysis: project.market_analysis,
		financial_projections: project.financial_projections,
	};
}
