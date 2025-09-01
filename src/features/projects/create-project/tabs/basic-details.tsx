import { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { PROJECT_STATUS, PROJECT_TYPES } from "@/types/project.types";
import { TabsContent } from "@/components/ui/tabs";

type ProjectFormBasicDetailsProps = {
	form: UseFormReturn<any>;
};

export default function ProjectFormBasicDetails({ form }: ProjectFormBasicDetailsProps) {
	return (
		<TabsContent value="basic-details">
			<div className="space-y-6">
				<h2 className="text-lg font-semibold text-navy-800">Project Basic Details</h2>

				<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Project Name*</FormLabel>
								<FormControl>
									<Input placeholder="Enter project name" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="type"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Project Type*</FormLabel>
								<Select onValueChange={field.onChange} defaultValue={field.value}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select type" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{PROJECT_TYPES.map((type) => (
											<SelectItem key={type} value={type} className="capitalize">
												{type}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Project Description*</FormLabel>
							<FormControl>
								<Textarea
									placeholder="Enter a detailed description of the project"
									className="min-h-32 resize-none"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
					<FormField
						control={form.control}
						name="property_highlights"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Property Highlights*</FormLabel>
								<FormControl>
									<Textarea
										placeholder="Enter property highlights (separated by commas)"
										className="min-h-32 resize-none"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="risk_factors"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Risk Factors</FormLabel>
								<FormControl>
									<Textarea
										placeholder="Enter risk factors (separated by commas)"
										className="min-h-32 resize-none"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
			</div>
		</TabsContent>
	);
}
