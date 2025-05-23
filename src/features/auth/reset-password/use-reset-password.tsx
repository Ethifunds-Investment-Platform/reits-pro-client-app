import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import requestResetPassword from "@/services/account/request-reset-password";
import { toast } from "@/hooks/use-toast";
import ensureError from "@/lib/ensure-error";

// Form validation schema
const emailSchema = z.object({
	email: z.string().email("Please enter a valid email address"),
});

const phoneSchema = z.object({
	phoneNumber: z
		.string()
		.min(11, "Phone number must be at least 11 digits")
		.regex(/^(\+234|0)[0-9]{10}$/, "Please enter a valid Nigerian phone number"),
});

type EmailFormData = z.infer<typeof emailSchema>;
type PhoneFormData = z.infer<typeof phoneSchema>;

export default function useResetPassword() {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [resetRequested, setResetRequested] = useState(false);
	const [resetMethod, setResetMethod] = useState<"email" | "phone">("email");

	// Initialize email form
	const emailForm = useForm<EmailFormData>({
		resolver: zodResolver(emailSchema),
		defaultValues: {
			email: "",
		},
	});

	// Initialize phone form
	const phoneForm = useForm<PhoneFormData>({
		resolver: zodResolver(phoneSchema),
		defaultValues: {
			phoneNumber: "",
		},
	});

	// Email form submission handler
	const onSubmit = async (data: string) => {
		setIsSubmitting(true);
		try {
			const phone = {
				phone_number: data,
			};

			const email = {
				email: data,
			};
			await requestResetPassword(resetMethod === "email" ? email : phone);
			toast({
				title: "Rest link sent",
				description: "Check your email or phone for further instructions",
			});
			setResetRequested(true);
		} catch (error) {
			const errMsg = ensureError(error).message;
			toast({
				variant: "destructive",
				title: "Rest link failed",
				description: errMsg,
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	// Email form submission handler
	const onEmailSubmit = (data: EmailFormData) => {
		onSubmit(data.email);
	};

	// Phone form submission handler
	const onPhoneSubmit = async (data: PhoneFormData) => {
		onSubmit(data.phoneNumber);
	};
	return {
		isSubmitting,
		resetMethod,
		setResetMethod,
		resetRequested,
        onPhoneSubmit,
        onEmailSubmit,
		emailForm,
		phoneForm,
	};
}
