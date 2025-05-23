
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import useCustomNavigation from "@/hooks/use-navigation";
import createAccount from "@/services/account/create-account";
import { toast } from "@/hooks/use-toast";
import ensureError from "@/lib/ensure-error";
import sendOtp from "@/services/account/send-otp";

// Form validation schema
const formSchema = z
	.object({
		email: z.string().email("Please enter a valid email address"),
		phoneNumber: z
			.string()
			.min(11, "Phone number must be at least 11 digits")
			.regex(/^(\+234|0)[0-9]{10}$/, "Please enter a valid Nigerian phone number"),
		name: z.string().trim().min(3, "name is required, name must be at least 3 characters long"),
		password: z
			.string()
			.min(8, "Password must be at least 8 characters")
			.regex(/[A-Z]/, "Password must contain at least one uppercase letter")
			.regex(/[a-z]/, "Password must contain at least one lowercase letter")
			.regex(/[0-9]/, "Password must contain at least one number")
			.regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
		confirmPassword: z.string(),
		role: z.enum(["developer", "investor"]),
		operating_location: z.string().optional(),
		established_at: z.string().optional(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	})
	.refine(
		(data) => {
			if (data.role === "developer") {
				return !!data.operating_location;
			}
			return true;
		},
		{
			message: "Operating location is required for developers",
			path: ["operating_location"],
		}
	)
	.refine(
		(data) => {
			if (data.role === "developer") {
				return !!data.established_at;
			}
			return true;
		},
		{
			message: "Establishment date is required for developers",
			path: ["established_at"],
		}
	);

type FormData = z.infer<typeof formSchema>;

export default function useRegister() {
	const { navigate } = useCustomNavigation();
	const [isSubmitting, setIsSubmitting] = useState(false);

	// Initialize form
	const form = useForm<FormData>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			name: "",
			phoneNumber: "",
			password: "",
			confirmPassword: "",
			role: "investor",
			operating_location: "",
			established_at: "",
		},
	});

	// Form submission handler
	const onSubmit = async (data: FormData) => {
		setIsSubmitting(true);
		try {
			const { email, name, phoneNumber, password, role, operating_location, established_at } = data;

			const account = await createAccount({
				email,
				name,
				phone_number: phoneNumber,
				password,
				role,
				operating_location,
				established_at,
			});
			
			
			toast({
				title: "Account creation successful",
				description: "You have successfully created an account",
			});

			await sendOtp({ email: account.email });

			navigate(`/auth/verify?email=${account.email}`);
		} catch (error) {
			const errMsg = ensureError(error).message;
			toast({
				variant: "destructive",
				title: "Account Creation failed",
				description: errMsg,
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return {
		isSubmitting,
		form,
		onSubmit,
	};
}
