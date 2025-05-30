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
import { KeyRound, Mail, Phone } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import useResetPassword from "./use-reset-password";
import NewPassword from "./new-password";

const ResetPassword = () => {
	const { isSubmitting, resetRequested, onEmailSubmit, emailForm, contact } = useResetPassword();

	return (
		<div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
			<Card className="w-full max-w-md">
				<CardHeader className="space-y-1">
					<CardTitle className="text-2xl font-bold text-center flex justify-center items-center gap-2">
						<KeyRound className="h-6 w-6" />
						Reset Your Password
					</CardTitle>
					<CardDescription className="text-center">
						Enter your email address to receive a reset code
					</CardDescription>
				</CardHeader>
				<CardContent>
					{resetRequested ? (
						<NewPassword email={contact} />
					) : (
						<div>
							<Form {...emailForm}>
								<form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-4">
									<FormField
										control={emailForm.control}
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

									<Button
										type="submit"
										className="w-full bg-navy-800 hover:bg-navy-700"
										disabled={isSubmitting}
									>
										{isSubmitting ? "Sending..." : "Send Reset code"}
									</Button>
								</form>
							</Form>
						</div>
					)}
				</CardContent>
				<CardFooter className="flex justify-center">
					<p className="text-sm text-gray-600 text-center">
						Remember your password?{" "}
						<Link to="/auth/login" className="text-navy-800 hover:text-navy-600 font-medium">
							Log in
						</Link>
					</p>
				</CardFooter>
			</Card>
		</div>
	);
};

export default ResetPassword;
