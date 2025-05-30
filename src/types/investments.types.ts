import { Project } from "./project.types";
import { User } from "./user.types";
export type Investment = {
	id: string;
	project_id: string;
	project: Project;
	investor_id: string;
	investor: User;
	amount_invested: number;
	investment_date: string;
	created_at: string;
	updated_at: string;
};
