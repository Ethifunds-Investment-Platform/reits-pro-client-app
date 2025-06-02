import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Asterisk, Eye, EyeOff, LockKeyhole } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import * as React from "react";
import { toast } from "@/hooks/use-toast";
import resetPassword from "@/services/account/reset-password";
// Form validation schema
const emailSchema = z.object({
	email: z.string().email("Please enter a valid email address"),
});

const newPasswordSchema = z.object({
	token: z.string().length(6, "Token must be 6 characters long"),
	new_password: z
		.string()
		.min(8, "Password must be at least 8 characters")
		.regex(/[A-Z]/, "Password must contain at least one uppercase letter")
		.regex(/[a-z]/, "Password must contain at least one lowercase letter")
		.regex(/[0-9]/, "Password must contain at least one number")
		.regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
});


type NewPasswordFormData = z.infer<typeof newPasswordSchema>;

export default function NewPassword({ email: contact }: { email: string }) {
	const [isSubmitting, setIsSubmitting] = React.useState(false);
	const [showPassword, setShowPassword] = React.useState(false);
	// Initialize email form
	const newPasswordForm = useForm<NewPasswordFormData>({
		resolver: zodResolver(newPasswordSchema),
		defaultValues: {
			token: "",
			new_password: "",
		},
	});

	const onNewPasswordSubmit = async (data: NewPasswordFormData) => {
		if (!contact) {
			toast({
				title: "No contact found",
				description: "restart the process and try again",
			});
			return;
		}

		try {
			setIsSubmitting(true);
			const payload = {
				email: contact,
				token: data.token,
				new_password: data.new_password,
			};

			await resetPassword(payload);
			toast({
				title: "Password reset successful",
				description: "You can now login with your new password",
			});
		} catch (error) {
			console.error(error);
		} finally {
			setIsSubmitting(false);
		}
	};

	const togglePassword = () => {
		setShowPassword(!showPassword);
	};

	return (
		<Form {...newPasswordForm}>
			<form onSubmit={newPasswordForm.handleSubmit(onNewPasswordSubmit)} className="space-y-4">
				<FormField
					control={newPasswordForm.control}
					name="token"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Reset Code</FormLabel>
							<FormControl>
								<div className="relative">
									<Asterisk className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
									<Input placeholder="Reset Code" className="pl-10" {...field} />
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={newPasswordForm.control}
					name="new_password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<div className="relative">
									<LockKeyhole className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
									<Input
										type={showPassword ? "text" : "password"}
										placeholder="••••••••"
										className="pl-10"
										{...field}
									/>
									{showPassword ? (
										<Eye
											onClick={togglePassword}
											className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
										/>
									) : (
										<EyeOff
											onClick={togglePassword}
											className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
										/>
									)}
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button
					type="submit"
					className="w-full bg-navy-800 hover:bg-navy-700"
					disabled={isSubmitting}
				>
					{isSubmitting ? "Sending..." : "Reset Password"}
				</Button>
			</form>
		</Form>
	);
}
