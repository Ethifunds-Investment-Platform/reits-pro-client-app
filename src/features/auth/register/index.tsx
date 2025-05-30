
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
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { UserPlus, Mail, Phone, LockKeyhole, User, Building, Calendar } from "lucide-react";
import useRegister from "./use-register";

const Register = () => {
	const { isSubmitting, form, onSubmit } = useRegister();
	return (
		<div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
			<Card className="w-full max-w-md">
				<CardHeader className="space-y-1">
					<CardTitle className="text-2xl font-bold text-center flex justify-center items-center gap-2">
						<UserPlus className="h-6 w-6" />
						Create an Account
					</CardTitle>
					<CardDescription className="text-center">
						Enter your details below to create your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
							<FormField
								control={form.control}
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
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name (full name)</FormLabel>
										<FormControl>
											<div className="relative">
												<User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
												<Input placeholder="Jon Doe" className="pl-10" {...field} />
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="phoneNumber"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Phone Number </FormLabel>
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

							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<div className="relative">
												<LockKeyhole className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
												<Input
													type="password"
													placeholder="••••••••"
													className="pl-10"
													{...field}
												/>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="confirmPassword"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Confirm Password</FormLabel>
										<FormControl>
											<div className="relative">
												<LockKeyhole className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
												<Input
													type="password"
													placeholder="••••••••"
													className="pl-10"
													{...field}
												/>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="role"
								render={({ field }) => (
									<FormItem>
										<FormLabel>I am</FormLabel>
										<Select 
											onValueChange={(value) => {
												field.onChange(value);
												if (value !== "developer") {
													form.setValue("operating_location", "");
													form.setValue("established_at", "");
												}
											}} 
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select your role" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="developer">A Developer</SelectItem>
												<SelectItem value="investor">An Investor</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
							
							{/* Developer-specific fields */}
							{form.watch("role") === "developer" && (
								<>
									<FormField
										control={form.control}
										name="operating_location"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Operating Location</FormLabel>
												<FormControl>
													<div className="relative">
														<Building className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
														<Input
															placeholder="State, Country"
															className="pl-10"
															{...field}
														/>
													</div>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="established_at"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Established Date</FormLabel>
												<FormControl>
													<div className="relative">
														<Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
														<Input
															type="date"
															className="pl-10"
															{...field}
														/>
													</div>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</>
							)}

							<Button
								type="submit"
								className="w-full bg-navy-800 hover:bg-navy-700"
								disabled={isSubmitting}
							>
								{isSubmitting ? "Creating account..." : "Create account"}
							</Button>
						</form>
					</Form>
				</CardContent>
				<CardFooter className="flex justify-center">
					<p className="text-sm text-gray-600 text-center">
						Already have an account?{" "}
						<Link to="/auth/login" className="text-navy-800 hover:text-navy-600 font-medium">
							Log in
						</Link>
					</p>
				</CardFooter>
			</Card>
		</div>
	);
};


export default Register
