
import { variables } from "@/constants";
import axios from "@/lib/axios";
import { User } from "@/types/user.types";
import { users } from "@/constants/data/users";

type Parameters = {
  name?: string;
  email?: string;
  bio?: string;
};

type Response = User;

export async function production(data: Parameters): Promise<Response> {
  const response = await axios.patch("/auth/account/update", data);
  return response.data.data;
}

export async function development(data: Parameters): Promise<Response> {
  return new Promise((resolve) => {
    // Simulate API call and update the mock user data
    setTimeout(() => {
      const mockUser = {...users[0], ...data};
      return resolve(mockUser);
    }, 1000);
  });
}

export default async function updateAccount(data: Parameters): Promise<Response> {
  if (variables.NODE_ENV === "development") return development(data);
  return production(data);
}
