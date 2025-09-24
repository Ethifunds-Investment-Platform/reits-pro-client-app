import { z } from "zod";
import { DISTRIBUTION_FREQUENCIES, PROJECT_TYPES, TENOR_UNITS } from "@/types/project.types";

// Create a custom transformation function for string to array
const stringToArray = (val: string) =>
	val
		.split(",")
		.map((item) => item.trim())
		.filter(Boolean);

export const projectFormSchema = z.object({
	name: z.string().min(3, "Project name must be at least 3 characters"),
	description: z.string().min(10, "Description must be at least 10 characters"),
	location: z.object({
		country: z.string().min(1, "Country is required"),
		state: z.string().min(1, "State is required"),
		fullAddress: z.string().optional(),
	}),
	display_image: z.instanceof(File, { message: "Display image is required" }),
	images: z.array(z.instanceof(File)).optional(),
	risk_factors: z.string().optional(),
	property_highlights: z.string().min(1, "At least one property highlight is required"),
	currency_id: z.string().min(1, "Currency is required"),
	funding_goal: z.number().positive("Funding goal must be a positive number"),
	expected_roi: z.number().positive("Expected ROI must be a positive number"),
	minimum_investment: z.number().positive("Minimum investment must be a positive number"),
	maximum_investment: z
		.number()
		// .negative("Maximum investment must be a positive number")
		.nullable(),
	tenor_unit: z.enum(TENOR_UNITS as unknown as [string, ...string[]], {
		message: "Tenor unit is required",
	}),
	tenor_value: z.number().positive("Tenor value must be a positive number"),
	funding_deadline: z.string().min(1, "Funding deadline is required"),
	distribution_frequency: z.enum(DISTRIBUTION_FREQUENCIES as unknown as [string, ...string[]], {
		message: "Distribution frequency is required",
	}),
	type: z.enum(PROJECT_TYPES as unknown as [string, ...string[]], {
		message: "Type is required",
	}),
	project_memo: z
		.union([z.string(), z.instanceof(File)])
		.nullable()
		.optional(),
	developer_track_record: z
		.union([z.string(), z.instanceof(File)])
		.nullable()
		.optional(),
	market_analysis: z
		.union([z.string(), z.instanceof(File)])
		.nullable()
		.optional(),
	financial_projections: z
		.union([z.string(), z.instanceof(File)])
		.nullable()
		.optional(),
});
