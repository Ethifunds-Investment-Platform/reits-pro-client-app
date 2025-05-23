
import { useState, useEffect } from "react";
import { ProfileBase } from "../components/profile-base";
import { ProfileForm } from "../components/profile-form";
import { ProfileStats } from "./profile-stats";
import { DeveloperInfo } from "./developer-info";
import useAppSelector from "@/store/hooks";
import { DeveloperProfile } from "@/types/developer.types";
import LoadingBox from "@/components/app/loading-box";

export default function DeveloperProfilePage() {
  const { account } = useAppSelector("account");
  const [developerProfile, setDeveloperProfile] = useState<DeveloperProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock fetching developer profile data
    const fetchDeveloperProfile = async () => {
      try {
        // This would normally be an API call
        setTimeout(() => {
          setDeveloperProfile({
            id: "dev-1",
            developer_id: account?.id || "",
            developer: account,
            projects_completed: 12,
            bio: "Experienced real estate developer with 15 years in the industry",
            active_projects: 3,
            total_raised: 4500000,
            average_return: 14.5,
            operating_location: "Lagos, Nigeria",
            established_at: "2010-05-20T00:00:00Z",
            created_at: "2023-01-01T00:00:00Z",
            updated_at: "2023-05-15T00:00:00Z"
          });
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Failed to fetch developer profile:", error);
        setIsLoading(false);
      }
    };

    if (account?.id) {
      fetchDeveloperProfile();
    }
  }, [account?.id]);

  if (isLoading) {
    return <LoadingBox type="screen" load_type="spinner" />;
  }

  return (
    <ProfileBase user={account}>
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
    </ProfileBase>
  );
}
