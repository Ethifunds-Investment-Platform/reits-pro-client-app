export type UserRole = "developer" | "investor";
export type AccountStatus = "active" | "inactive";

export type User = {
	id: string;
	email: string;
	phone_number: string;
	last_login: string | null;
	role: UserRole;
	name: string;
	email_verified: boolean;
	profile_picture: string | null;
	status: AccountStatus;
	two_factor_enabled: boolean;
	created_at: string;
	updated_at: string;
};



