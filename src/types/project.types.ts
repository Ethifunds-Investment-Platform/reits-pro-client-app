import { Currency } from "./currency.types";
import { User } from "./user.types";

export const PROJECT_STATUS = [
	"pending",
	"approved",
	"rejected",
	"funded",
	"in-progress",
	"completed",
	"sold",
	"active",
] as const;

export type ProjectStatus = (typeof PROJECT_STATUS)[number];

export type ProjectLocation = {
	country: string;
	state: string;

	fullAddress?: string;
};

export const PROJECT_TYPES = ["development", "completed"] as const;

export type ProjectType = (typeof PROJECT_TYPES)[number];

export type TenorUnit = "days" | "weeks" | "months" | "years";

export const TENOR_UNITS = ["days", "weeks", "months", "years"] as const;

export const DISTRIBUTION_FREQUENCIES = ["daily", "weekly", "monthly", "yearly"] as const;

export type DistributionFrequency = (typeof DISTRIBUTION_FREQUENCIES)[number];

export type Project = {
	id: string;
	name: string;
	developer_id: string;
	developer: User;
	type: ProjectType;
	description: string;
	location: ProjectLocation;
	display_image: string;
	images?: string[];
	risk_factors: string[];
	property_highlights: string[];
	currency_id: string;
	currency: Currency;
	funding_goal: number;
	amount_raised: number;
	expected_roi: number;
	minimum_investment: number;
	maximum_investment: number;
	tenor_unit: TenorUnit;
	tenor_value: number;
	funding_deadline: string | null;
	distribution_frequency: DistributionFrequency;
	total_investors: number;
	status: ProjectStatus;
	approved_at: string | null;
	last_update_at: string;
	project_memo: string | null;
	developer_track_record: string | null;
	market_analysis: string | null;
	financial_projections: string | null;
	created_at: string;
	updated_at: string;
	paystack_product_url: string;
};

export type NewProject = {
	name: string;
	developer_id: string;
	description: string;
	location: ProjectLocation;
	type: ProjectType;
	display_image: string;
	images?: string[];
	risk_factors: string[];
	property_highlights: string[];
	currency_id: string;
	funding_goal: number;
	expected_roi: number;
	minimum_investment: number;
	maximum_investment: number;
	tenor_unit: TenorUnit;
	tenor_value: number;
	funding_deadline: string | null;
	distribution_frequency: DistributionFrequency;
	project_memo: string | null;
	developer_track_record: string | null;
	market_analysis: string | null;
	financial_projections: string | null;
};

export type NewProjectUpdate = {
	project_id: string;
	title: string;
	content: string;
	images: string[];
};

export type ProjectUpdate = {
	id: string;
	project_id: string;
	title: string;
	content: string;
	images: string[];
	created_at: string;
	updated_at: string;
};


