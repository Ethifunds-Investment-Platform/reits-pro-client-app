import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import loginAccount from "@/services/account/login-account";
import sendOtp from "@/services/account/send-otp";
import * as React from "react";
import { toast } from "@/components/ui/use-toast";
import ensureError from "@/lib/ensure-error";
import verifyOtp from "@/services/account/verify-otp";
import useCookie from "@/hooks/use-cookie";
import { variables } from "@/constants";
import useCustomNavigation from "@/hooks/use-navigation";
import useActions from "@/store/actions";

// Form validation schema
const loginSchema = z.object({
	email: z.string().email("Please enter a valid email address"),
	password: z.string().min(1, "Password is required"),
});

const otpSchema = z.object({
	otp: z.string().length(6, "OTP must be 6 digits"),
});

type LoginFormData = z.infer<typeof loginSchema>;
type OTPFormData = z.infer<typeof otpSchema>;

export default function useLogin() {
	const { navigate, queryParams } = useCustomNavigation();
	const [isSubmitting, setIsSubmitting] = React.useState(false);
	const [showOtpDialog, setShowOtpDialog] = React.useState(false);
	const [loginData, setLoginData] = React.useState<LoginFormData | null>(null);
	const { setCookie } = useCookie(variables.STORAGE.session, "");
	const redirect = queryParams.get("redirect");

	const { account: accountActions } = useActions();
	// Initialize login form
	const loginForm = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	// Initialize OTP form
	const otpForm = useForm<OTPFormData>({
		resolver: zodResolver(otpSchema),
		defaultValues: {
			otp: "",
		},
	});

	const onLoginSubmit = async (data: LoginFormData) => {
		setIsSubmitting(true);
		try {
			// login user
			const response = await loginAccount({ email: data.email, password: data.password });
			setCookie(response.token);
			accountActions.changeAccount(response.user);
			accountActions.changeToken(response.token);
			const userRoute = redirect?.length > 0 ? redirect : `/${response.user.role}/dashboard`;

			if (response.user.two_factor_enabled) {
				setLoginData(data);

				// Request OTP
				await sendOtp({ email: response.user.email });
				toast({
					title: "OTP Sent",
					description: "OTP has been sent to your email",
				});

				queryParams.set("next", userRoute);
				// Show OTP dialog
				setShowOtpDialog(true);

				return;
			}

			toast({
				title: "Login successful",
				description: "You have been logged in successfully",
			});

			navigate(userRoute);
		} catch (error) {
			const errMsg = ensureError(error).message;
			toast({
				variant: "destructive",
				title: "Login failed",
				description: errMsg,
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	// OTP form submission handler
	const onOtpSubmit = async (data: OTPFormData) => {
		if (!loginData) return;
		const nextUrl = queryParams.get("next") ?? "";
		setIsSubmitting(true);
		try {
			// Verify OTP
			await verifyOtp({ email: loginData.email, otp_code: data.otp });

			toast({
				title: "OTP verified successfully",
				description: "Logging into your account.",
			});
			setShowOtpDialog(false);

			navigate(nextUrl);
		} catch (error) {
			const errMsg = ensureError(error).message;
			toast({
				variant: "destructive",
				title: "Login failed",
				description: errMsg,
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	const resendOtp = async (email: string) => {
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
		isSubmitting,
		otpForm,
		loginForm,
		loginData,
		showOtpDialog,
		setShowOtpDialog,
		onOtpSubmit,
		onLoginSubmit,
		resendOtp,
	};
}
