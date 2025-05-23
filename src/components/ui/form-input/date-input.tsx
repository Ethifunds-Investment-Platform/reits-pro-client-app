import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import classNames from "classnames";

import * as React from "react";

type DatePickerProps = {
	name?: string;
	value: Date;
	onChange: (value: Date) => void;
	disabled?: boolean;
	triggerStyle?: string;
	disableMonthNavigation?: boolean;
	daySelectedStyle?: string;
	showOutsideDays?: boolean;

	label?: string;
	placeholder?: string;
	containerStyle?: string;
	hideIcon?: boolean;
	invalid?: boolean;
	overrideInvalid?: boolean;
	required?: boolean;
};

export default function DateInput({
	name,
	value,
	onChange,
	showOutsideDays = true,
	label,
	placeholder,
	disabled,
	containerStyle,
	invalid,

	...props
}: DatePickerProps) {
	const { isInvalid } = React.useMemo(() => {
		let isInvalid = false;
		const userInput = value?.toString();
		if (props.overrideInvalid) {
			isInvalid = true;
		} else if (invalid && !userInput && props.required) {
			isInvalid = true;
		}
		return { isInvalid };
	}, [invalid, value, props.required, props.overrideInvalid]);

	const daySelectedCn = classNames(
		"bg-primary text-stone-50 hover:bg-primary hover:text-stone-50 focus:bg-primary focus:text-stone-50",
		props.daySelectedStyle
	);

	const triggerCn = classNames(
		"w-[280px] justify-start text-left font-normal",
		props.triggerStyle,
		{
			"text-muted-foreground": !value,
			invalid: isInvalid,
		}
	);

	const container = classNames("input-container", containerStyle);
	return (
		<div className={container}>
			{label && (
				<label htmlFor={name} className="capitalize ">
					{label} {props.required && "*"}
				</label>
			)}
			<Popover modal={true}>
				<PopoverTrigger asChild>
					<Button name={name} variant={"outline"} className={triggerCn} disabled={disabled}>
						<CalendarIcon className="mr-2 h-4 w-4" />
						{value ? format(value, "PPP") : <span> {placeholder ?? "Pick a date"}</span>}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="z-50 w-auto p-0">
					<Calendar
						mode="single"
						selected={value}
						onSelect={(selected) => {
							if (selected) {
								onChange(selected);
							}
						}}
						initialFocus
						showOutsideDays={showOutsideDays}
						month={showOutsideDays ? undefined : new Date()}
						classNames={{
							day_selected: daySelectedCn,
						}}
						disableNavigation={!showOutsideDays && true}
					/>
				</PopoverContent>
			</Popover>
		</div>
	);
}
