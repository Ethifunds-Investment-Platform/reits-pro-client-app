import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
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

const ResetPassword = () => {
	const {
		isSubmitting,
		resetMethod,
		setResetMethod,
		resetRequested,
		onEmailSubmit,
		onPhoneSubmit,
		emailForm,
		phoneForm,
	} = useResetPassword();

	return (
		<div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
			<Card className="w-full max-w-md">
				<CardHeader className="space-y-1">
					<CardTitle className="text-2xl font-bold text-center flex justify-center items-center gap-2">
						<KeyRound className="h-6 w-6" />
						Reset Your Password
					</CardTitle>
					<CardDescription className="text-center">
						Enter your email address or phone number to receive a reset link
					</CardDescription>
				</CardHeader>
				<CardContent>
					{resetRequested ? (
						<Alert className="bg-green-50 border-green-200 text-green-800">
							<AlertDescription>
								Password reset instructions have been sent. Please check your{" "}
								{resetMethod === "email" ? "email inbox" : "phone"} and follow the instructions to
								reset your password.
							</AlertDescription>
						</Alert>
					) : (
						<Tabs
							defaultValue="email"
							onValueChange={(value) => setResetMethod(value as "email" | "phone")}
						>
							<TabsList className="grid w-full grid-cols-2 mb-6">
								<TabsTrigger value="email">Email</TabsTrigger>
								<TabsTrigger value="phone">Phone</TabsTrigger>
							</TabsList>

							<TabsContent value="email">
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
											{isSubmitting ? "Sending..." : "Send Reset Link"}
										</Button>
									</form>
								</Form>
							</TabsContent>

							<TabsContent value="phone">
								<Form {...phoneForm}>
									<form onSubmit={phoneForm.handleSubmit(onPhoneSubmit)} className="space-y-4">
										<FormField
											control={phoneForm.control}
											name="phoneNumber"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Phone Number</FormLabel>
													<FormControl>
														<div className="relative">
															<Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
															<Input
																placeholder="08012345678 or +2348012345678"
																className="pl-10"
																{...field}
															/>
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
											{isSubmitting ? "Sending..." : "Send Reset Code"}
										</Button>
									</form>
								</Form>
							</TabsContent>
						</Tabs>
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

export default ResetPassword
