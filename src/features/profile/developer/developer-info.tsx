
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Calendar } from "lucide-react";
import { DeveloperProfile } from "@/types/developer.types";

export function DeveloperInfo({ developerProfile }: { developerProfile: DeveloperProfile }) {
	return (
		<Card>
			<CardHeader className="pb-2">
				<CardTitle className="text-lg">Company Information</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex items-center">
					<Building className="h-5 w-5 text-gray-400 mr-3" />
					<div>
						<p className="text-sm font-medium text-gray-500">Operating Location</p>
						<p>{developerProfile.operating_location}</p>
					</div>
				</div>

				<div className="flex items-center">
					<Calendar className="h-5 w-5 text-gray-400 mr-3" />
					<div>
						<p className="text-sm font-medium text-gray-500">Established</p>
						<p>{new Date(developerProfile.established_at).toLocaleDateString()}</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
