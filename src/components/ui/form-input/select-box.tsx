import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import * as React from "react";
import classnames from "classnames";

type SelectItem = {
	value: string;
	title: string;
};

type SelectBoxProps = {
	className?: string;
	containerStyle?: string;
	label?: string;
	options?: SelectItem[];
	showRestItem?: boolean;
	value?: string;
	onchange?: (item: string) => void;
	disabled?: boolean;
	placeholder?: string;
	name?: string;
	required?: boolean;
};

export default React.memo(function SelectBox(props: SelectBoxProps) {
	const { options = [], required = false, disabled = false, showRestItem = false } = props;

	const container = classnames("input-container space-y-1", props.containerStyle);

	const selectContainer = classnames("shadow-none capitalize w-full", props.className, {
		"!text-neutral-500 font-medium": !props.value?.trim(),
	});

	const change = (val: string) => {
		if (props.onchange) {
			props.onchange(val);
		}
	};
	return (
		<div className={container}>
			{props.label && (
				<label htmlFor={props.name} className="capitalize">
					{props.label} {props.required && "*"}
				</label>
			)}
			<Select
				value={props.value}
				onValueChange={change}
				name={props.name}
				disabled={disabled}
				required={required}
			>
				<SelectTrigger className={selectContainer}>
					<SelectValue placeholder={props.placeholder ?? "Select an item"} />
				</SelectTrigger>
				<SelectContent position="popper" side="bottom">
					{showRestItem && (
						<SelectItem value={" "} className="capitalize">
							{props.placeholder ?? "Select an item"}
						</SelectItem>
					)}
					{options.map((item, idx) => (
						<SelectItem value={item.value} key={idx} className="capitalize hover:!bg-primary">
							{item.title}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
});
