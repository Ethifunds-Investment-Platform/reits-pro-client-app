import VerifyEmail from "@/features/auth/verify-email";
import useSeo from "@/hooks/use-seo";

export default function VerifyEmailPage() {
  useSeo({pageTitle:"Verify Email"})
  return <VerifyEmail/>
}