export type BankAccount = {
	id: number;
	user_id: number;
	active: number;
	currency: string;
	name: string;
	recipient_code: string;
	type: string;
	is_default: boolean;
	account_number: string;
	account_name: string;
	bank_code: string;
	bank_name: string;
	created_at: string;
	updated_at: string;
};

export type Bank = {
	id: number;
	name: string;
	slug: string;
	code: string;
	currency: string;
};
