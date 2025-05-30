
import { User } from "./user.types";

export type InvestorMetrics = {
    total_investments: number;
    total_value: number;
    total_returns: number;
    active_investments: number;
};

export type InvestorProfile = {
    id: string;
    investor_id: string;
    investor: User;
    investments_count: number;
    bio: string;
    active_investments: number;
    total_invested: number;
    average_return: number;
    investing_since: string;
    created_at: string;
    updated_at: string;
};


