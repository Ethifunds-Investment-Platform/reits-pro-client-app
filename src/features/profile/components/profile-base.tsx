
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "@/types/user.types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface ProfileBaseProps {
  user: User;
  children?: React.ReactNode;
}

export function ProfileBase({ user, children }: ProfileBaseProps) {
  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("")
    : "U";

  return (
    <div className="container py-8">
      <div className="mb-8 flex items-center gap-6">
        <Avatar className="h-20 w-20 border-2 border-primary-100">
          {user?.profile_picture ? (
            <AvatarImage src={user.profile_picture} />
          ) : (
            <AvatarFallback className="text-xl font-semibold bg-primary-100 text-primary-700">
              {initials}
            </AvatarFallback>
          )}
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">{user?.name || "User"}</h1>
          <p className="text-gray-500">{user?.email}</p>
          <p className="text-sm flex items-center gap-1 mt-1">
            <span className="capitalize bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full text-xs">
              {user?.role || "User"}
            </span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-500 text-xs">
              Member since {user?.created_at ? new Date(user.created_at).toLocaleDateString() : "N/A"}
            </span>
          </p>
        </div>
      </div>
      {children}
    </div>
  );
}
