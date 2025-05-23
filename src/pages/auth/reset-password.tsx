import ResetPassword from "@/features/auth/reset-password";
import useSeo from "@/hooks/use-seo";

export default function ResetPasswordPage() {
	useSeo({ pageTitle: "Rest Password" });
	return <ResetPassword />;
}
