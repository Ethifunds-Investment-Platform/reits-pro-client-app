import { ProfileBase } from "../components/profile-base";
import { ProfileForm } from "../components/profile-form";
import { BankDetails } from "../components/bank-details";
import useAppSelector from "@/store/hooks";

export default function InvestorProfilePage() {
	const { account } = useAppSelector("account");

	return (
		<ProfileBase user={account}>
			<div className="grid gap-6 md:grid-cols-12">
				{/* Left column - User info */}
				<div className="md:col-span-7">
					<ProfileForm user={account} />
				</div>

				{/* Right column - Stats */}
				<div className="md:col-span-5">
					<BankDetails />
				</div>
			</div>
		</ProfileBase>
	);
}
