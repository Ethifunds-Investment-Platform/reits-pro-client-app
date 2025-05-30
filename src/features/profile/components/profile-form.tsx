import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { User } from "@/types/user.types";
import updateAccount from "@/services/account/update-account";
import { useQueryClient } from "@tanstack/react-query";
import useAppSelector from "@/store/hooks";

const profileFormSchema = z.object({
	name: z.string().min(3, "Name must be at least 3 characters"),
	email: z.string().email("Please enter a valid email address"),
	bio: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function ProfileForm({ user, bio = "" }: { user: User; bio?: string }) {
	const [isLoading, setIsLoading] = useState(false);
	const queryClient = useQueryClient();

	// Initialize form
	const form = useForm<ProfileFormValues>({
		resolver: zodResolver(profileFormSchema),
		defaultValues: {
			name: user?.name || "",
			email: user?.email || "",
			bio: bio || "",
		},
	});

	async function onSubmit(data: ProfileFormValues) {
		setIsLoading(true);
		try {
			await updateAccount({
				name: data.name,
				email: data.email,
				bio: data.bio,
			});

			// Invalidate and refetch the user data
			queryClient.invalidateQueries({ queryKey: ["user"] });

			toast({
				title: "Profile updated",
				description: "Your profile has been updated successfully.",
			});
		} catch (error) {
			toast({
				variant: "destructive",
				title: "Error",
				description: "Failed to update profile. Please try again.",
			});
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Profile Information</CardTitle>
				<CardDescription>Update your profile information</CardDescription>
			</CardHeader>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<CardContent className="space-y-4">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input placeholder="Your name" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input readOnly disabled placeholder="your.email@example.com" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{user.role === "developer" && <FormField
							control={form.control}
							name="bio"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Bio</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Tell us a little about yourself"
											className="resize-none min-h-[120px]"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>}
					</CardContent>
					<CardFooter>
						<Button type="submit" variant="default" disabled={isLoading}>
							{isLoading ? "Saving..." : "Save Changes"}
						</Button>
					</CardFooter>
				</form>
			</Form>
		</Card>
	);
}
