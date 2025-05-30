import { ProfileBase } from "../components/profile-base";
import { ProfileForm } from "../components/profile-form";
import { ProfileStats } from "./profile-stats";
import { DeveloperInfo } from "./developer-info";
import useAppSelector from "@/store/hooks";
import LoadingBox from "@/components/app/loading-box";
import { useQuery } from "@tanstack/react-query";
import getDeveloperProfile from "@/services/developer/get-developer-profile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BankDetails } from "../components/bank-details";


export default function DeveloperProfilePage() {
	const { account } = useAppSelector("account");

	const { data: developerProfile, isFetching } = useQuery({
		queryKey: ["developer-profile"],
		queryFn: () => getDeveloperProfile({ developer_id: account?.id }),
	});
	if (isFetching) {
		return <LoadingBox type="screen" load_type="spinner" />;
	}

	return (
		<ProfileBase user={account}>
			<Tabs defaultValue="profile">
				<TabsList className=" gap-5">
					<TabsTrigger value="profile">Profile</TabsTrigger>
					<TabsTrigger value="bank_details">Bank Details</TabsTrigger>
				</TabsList>

				<TabsContent value="profile">
					<div className="grid gap-6 md:grid-cols-12">
						{/* Left column - User info */}
						<div className="md:col-span-7">
							<ProfileForm user={account} bio={developerProfile?.bio} />
						</div>

						{/* Right column - Stats */}
						<div className="md:col-span-5">
							{developerProfile && (
								<>
									<ProfileStats developerProfile={developerProfile} />
									<div className="mt-6">
										<DeveloperInfo developerProfile={developerProfile} />
									</div>
								</>
							)}
						</div>
					</div>
				</TabsContent>

				<TabsContent value="bank_details" className="w-3/4">
					<BankDetails />
				</TabsContent>
			</Tabs>
		</ProfileBase>
	);
}
