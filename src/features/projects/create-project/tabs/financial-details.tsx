import { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { TENOR_UNITS, DISTRIBUTION_FREQUENCIES } from "@/types/project.types";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn, sanitizeNumInput, parseNumericInput } from "@/lib/utils";
import { TabsContent } from "@/components/ui/tabs";
import useAppSelector from "@/store/hooks";

type ProjectFormFinancialDetailsProps = {
	form: UseFormReturn<any>;
};

export default function ProjectFormFinancialDetails({ form }: ProjectFormFinancialDetailsProps) {
	const { currencies } = useAppSelector("init");

	const currencyOptions = currencies?.map((currency) => ({
		title: `${currency.name} (${currency.symbol})`,
		value: currency.id.toString(),
	}));

	

	return (
		<TabsContent value="financial">
			<div className="space-y-6">
				<h2 className="text-lg font-semibold text-navy-800">Project Financial Details</h2>

				<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
					<FormField
						control={form.control}
						name="currency_id"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Currency*</FormLabel>
								<Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select currency"/>
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{currencyOptions?.map((option) => (
											<SelectItem key={option.value} value={option.value}>
												{option.title}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="funding_goal"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Funding Goal*</FormLabel>
								<FormControl>
									<Input
										type="text"
										placeholder="0.00"
										value={field.value?.toLocaleString() || ""}
										onChange={(e) => {
											const sanitized = sanitizeNumInput(e.target.value);
											field.onChange(parseNumericInput(sanitized));
										}}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
					<FormField
						control={form.control}
						name="minimum_investment"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Minimum Investment*</FormLabel>
								<FormControl>
									<Input
										type="text"
										placeholder="0.00"
										value={field.value?.toLocaleString() || ""}
										onChange={(e) => {
											const sanitized = sanitizeNumInput(e.target.value);
											field.onChange(parseNumericInput(sanitized));
										}}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="maximum_investment"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Maximum Investment</FormLabel>
								<FormControl>
									<Input
										type="text"
										placeholder="0.00"
										value={field.value?.toLocaleString() || ""}
										onChange={(e) => {
											const sanitized = sanitizeNumInput(e.target.value);
											field.onChange(parseNumericInput(sanitized));
										}}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<FormField
					control={form.control}
					name="expected_roi"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Expected ROI (%)*</FormLabel>
							<FormControl>
								<Input
									type="number"
									placeholder="0.00"
									value={field.value?.toString() || ""}
									onChange={(e) => {
										const sanitized = sanitizeNumInput(e.target.value);
										field.onChange(parseNumericInput(sanitized));
									}}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
					<FormField
						control={form.control}
						name="tenor_value"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Tenor Value*</FormLabel>
								<FormControl>
									<Input
										type="number"
										placeholder="0"
										value={field.value?.toString() || ""}
										onChange={(e) => {
											const sanitized = sanitizeNumInput(e.target.value, false); // No decimals for tenor
											field.onChange(parseNumericInput(sanitized));
										}}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="tenor_unit"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Tenor Unit*</FormLabel>
								<Select onValueChange={field.onChange} defaultValue={field.value}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select tenor unit" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{TENOR_UNITS.map((unit) => (
											<SelectItem key={unit} value={unit} className="capitalize">
												{unit}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 items-center">
					<FormField
						control={form.control}
						name="distribution_frequency"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Distribution Frequency*</FormLabel>
								<Select onValueChange={field.onChange} defaultValue={field.value}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select distribution frequency" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{DISTRIBUTION_FREQUENCIES.map((freq) => (
											<SelectItem key={freq} value={freq} className="capitalize">
												{freq}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="funding_deadline"
						render={({ field }) => (
							<FormItem className="flex flex-col">
								<FormLabel>Funding Deadline*</FormLabel>
								<Popover>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												variant={"outline"}
												className={cn(
													"w-full pl-3 text-left font-normal",
													!field.value && "text-muted-foreground"
												)}
											>
												{field.value ? (
													format(new Date(field.value), "PPP")
												) : (
													<span>Pick a date</span>
												)}
												<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent className="w-auto p-0" align="start">
										<Calendar
											mode="single"
											selected={field.value ? new Date(field.value) : undefined}
											onSelect={(date) => field.onChange(date ? date.toISOString() : null)}
											initialFocus
											className="p-3 pointer-events-auto"
										/>
									</PopoverContent>
								</Popover>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
			</div>
		</TabsContent>
	);
}
