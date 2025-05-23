
import { variables } from "@/constants";
import axios from "@/lib/axios";
import { DeveloperProfile } from "@/types/developer.types";
import { developers } from "@/constants/data/developers";

type Parameters = {
  operating_location?: string;
  bio?: string;
  established_at?: string;
};

type Response = DeveloperProfile;

export async function production(developerId: string, data: Parameters): Promise<Response> {
  const response = await axios.patch(`/developers/${developerId}/profile`, data);
  return response.data.data;
}

export async function development(data: Parameters): Promise<Response> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const updatedProfile = {...developers[0], ...data};
      return resolve(updatedProfile);
    }, 1000);
  });
}

export default async function updateDeveloperProfile(developerId: string, data: Parameters): Promise<Response> {
  if (variables.NODE_ENV === "development") return development(data);
  return production(developerId, data);
}
