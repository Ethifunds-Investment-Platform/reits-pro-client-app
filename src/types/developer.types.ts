import { User } from "./user.types";

export type DevelopersMetrics = {
	total_projects: number;
	total_investors: number;
	total_investment: number;
	total_return: number;
	average_experience: number;
	developers: DeveloperProfile[];
};

export type DeveloperProfile = {
	id: string;
	developer_id: string;
	developer: User;
	projects_completed: number;
	bio: string;
	active_projects: number;
	total_raised: number;
	average_return: number;
	operating_location: string;
	established_at: string;
	created_at: string;
	updated_at: string;
};
