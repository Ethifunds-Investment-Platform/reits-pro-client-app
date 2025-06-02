import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { LogIn, Mail, LockKeyhole, ShieldCheck, Eye, EyeOff } from "lucide-react";
import useLogin from "./use-login";

const Login = () => {
	const {
		isSubmitting,
		otpForm,
		loginForm,
		setShowOtpDialog,
		showOtpDialog,
		loginData,
		onOtpSubmit,
		onLoginSubmit,
		resendOtp,
		showPassword,
		togglePassword,
	} = useLogin();

	return (
		<>
			<div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
				<Card className="w-full max-w-md">
					<CardHeader className="space-y-1">
						<CardTitle className="text-2xl font-bold text-center flex justify-center items-center gap-2">
							<LogIn className="h-6 w-6" />
							Log in to your account
						</CardTitle>
						<CardDescription className="text-center">
							Enter your email and password to access your account
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Form {...loginForm}>
							<form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
								<FormField
									control={loginForm.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<div className="relative">
													<Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
													<Input placeholder="you@example.com" className="pl-10" {...field} />
												</div>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={loginForm.control}
									name="password"
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

								<div className="flex justify-end">
									<Link
										to="/auth/reset-password"
										className="text-sm text-navy-800 hover:text-navy-600"
									>
										Forgot password?
									</Link>
								</div>

								<Button
									type="submit"
									className="w-full bg-navy-800 hover:bg-navy-700"
									disabled={isSubmitting}
								>
									{isSubmitting ? "Logging in..." : "Log in"}
								</Button>
							</form>
						</Form>
					</CardContent>
					<CardFooter className="flex justify-center">
						<p className="text-sm text-gray-600 text-center">
							Don't have an account?{" "}
							<Link to="/auth/register" className="text-navy-800 hover:text-navy-600 font-medium">
								Sign up
							</Link>
						</p>
					</CardFooter>
				</Card>
			</div>

			{/* OTP Verification Dialog */}
			<Dialog open={showOtpDialog} onOpenChange={setShowOtpDialog}>
				<DialogContent className="sm:max-w-md">
					<DialogHeader>
						<DialogTitle className="flex items-center gap-2">
							<ShieldCheck className="h-5 w-5" />
							Two-Factor Authentication
						</DialogTitle>
						<DialogDescription>
							Please enter the 6-digit code sent to your email or phone
						</DialogDescription>
					</DialogHeader>

					<Form {...otpForm}>
						<form onSubmit={otpForm.handleSubmit(onOtpSubmit)} className="space-y-4">
							<FormField
								control={otpForm.control}
								name="otp"
								render={({ field }) => (
									<FormItem className="mx-auto">
										<FormControl>
											<InputOTP maxLength={6} {...field}>
												<InputOTPGroup>
													<InputOTPSlot index={0} />
													<InputOTPSlot index={1} />
													<InputOTPSlot index={2} />
													<InputOTPSlot index={3} />
													<InputOTPSlot index={4} />
													<InputOTPSlot index={5} />
												</InputOTPGroup>
											</InputOTP>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<div className="flex justify-between items-center">
								<Button
									type="button"
									variant="outline"
									onClick={() => resendOtp(loginData?.email || "")}
									className="text-sm"
								>
									Resend Code
								</Button>
								<Button
									type="submit"
									className="bg-navy-800 hover:bg-navy-700"
									disabled={isSubmitting}
								>
									{isSubmitting ? "Verifying..." : "Verify"}
								</Button>
							</div>
						</form>
					</Form>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default Login;
