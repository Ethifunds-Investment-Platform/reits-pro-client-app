import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import useCustomNavigation from "@/hooks/use-navigation";
import { toast } from "@/hooks/use-toast";
import verifyAccountEmail from "@/services/account/verify-account-email";
import ensureError from "@/lib/ensure-error";
import sendOtp from "@/services/account/send-otp";

// Form validation schema
const formSchema = z.object({
	otp: z.string().length(6, "Verification code must be 6 digits"),
});

type FormData = z.infer<typeof formSchema>;

export default function useVerifyEmail() {
	const { navigate, queryParams } = useCustomNavigation();

	const email = queryParams.get("email");

	const [isSubmitting, setIsSubmitting] = useState(false);

	// Initialize form
	const form = useForm<FormData>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			otp: "",
		},
	});

	// Form submission handler
	const onSubmit = async (data: FormData) => {
		if (!email)
			return toast({
				variant: "destructive",
				title: "Failed to verify",
				description: "Email not found/has been tempered with.",
			});
		setIsSubmitting(true);
		try {
			// Mock verification with any 6-digit code
			await verifyAccountEmail({ email, otp_code: data.otp });
			toast({
				title: "Account verified",
				description: "Your account has been verified",
			});
			navigate("/auth/login");
		} catch (error) {
			const errMsg = ensureError(error).message;
			toast({
				variant: "destructive",
				title: "Failed to verify",
				description: errMsg,
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	// Resend verification code
	const handleResendCode = async () => {
		try {
			await sendOtp({ email });
			toast({
				title: "OTP Sent",
				description: "OTP has been sent to your email",
			});
		} catch (err) {
			const errMsg = ensureError(err).message;
			toast({
				title: "OTP Failed",
				description: errMsg,
			});
		}
	};

	return {
		form,
		onSubmit,
		isSubmitting,
		handleResendCode,
	};
}
