import { DeveloperProfile, DevelopersMetrics } from "@/types/developer.types";
import { users } from "./users";
import { generateDigits } from "@/lib/generate-digits";

export const developers: DeveloperProfile[] = users.slice(0, 5).map((user) => ({
	id: user.id,
	developer: user,
	developer_id: user.id,
	projects_completed: generateDigits(999),
	active_projects: generateDigits(999),
	total_raised: generateDigits(99999999),
	average_return: generateDigits(99),
	operating_location: "Los Angeles, CA",
	bio: "A leading developer of mixed-use urban projects and master-planned communities across the West Coast.",
	established_at: "2021-01-01",
	created_at: "2021-01-01",
	updated_at: "2021-01-01",
}));

export const developersMetrics: DevelopersMetrics = {
	total_projects: generateDigits(9999),
	total_investors: generateDigits(9999),
	total_investment: generateDigits(999),
	total_return: generateDigits(99),
	average_experience: generateDigits(99),
	developers: developers,
};
