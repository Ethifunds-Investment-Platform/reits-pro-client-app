import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";
import useVerifyEmail from "./use-verify-email";

const VerifyEmail = () => {
	const { form, onSubmit, isSubmitting, handleResendCode } = useVerifyEmail();
	return (
		<div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
			<Card className="w-full max-w-md">
				<CardHeader className="space-y-1">
					<CardTitle className="text-2xl font-bold text-center flex justify-center items-center gap-2">
						<ShieldCheck className="h-6 w-6" />
						Verify Your Account
					</CardTitle>
					<CardDescription className="text-center">
						Please enter the 6-digit verification code sent to your email or phone
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
							<FormField
								control={form.control}
								name="otp"
								render={({ field }) => (
									<FormItem className="mx-auto">
										<FormControl>
											<InputOTP maxLength={6} {...field} >
												<InputOTPGroup className="flex justify-center gap-2">
													<InputOTPSlot index={0} className="h-12 w-12 text-lg" />
													<InputOTPSlot index={1} className="h-12 w-12 text-lg" />
													<InputOTPSlot index={2} className="h-12 w-12 text-lg" />
													<InputOTPSlot index={3} className="h-12 w-12 text-lg" />
													<InputOTPSlot index={4} className="h-12 w-12 text-lg" />
													<InputOTPSlot index={5} className="h-12 w-12 text-lg" />
												</InputOTPGroup>
											</InputOTP>
										</FormControl>
										<FormMessage className="text-center" />
									</FormItem>
								)}
							/>

							<Button
								type="submit"
								className="w-full bg-navy-800 hover:bg-navy-700"
								disabled={isSubmitting}
							>
								{isSubmitting ? "Verifying..." : "Verify Account"}
							</Button>
						</form>
					</Form>
				</CardContent>
				<CardFooter className="flex flex-col space-y-4">
					<Button
						type="button"
						variant="ghost"
						onClick={handleResendCode}
						className="text-navy-800 hover:text-navy-600"
					>
						Didn't receive a code? Resend
					</Button>
					<p className="text-sm text-gray-600 text-center">
						Already verified?{" "}
						<Link to="/auth/login" className="text-navy-800 hover:text-navy-600 font-medium">
							Log in
						</Link>
					</p>
				</CardFooter>
			</Card>
		</div>
	);
};

export default VerifyEmail;
