import React from "react";
import classNames from "classnames";
import upload_icon from "./assets/upload-icon.svg";
import capitalize from "@/lib/capitalize";

type InputNativeAttributes = React.ComponentPropsWithRef<"input">;

type Ref = HTMLInputElement;

interface InputProps extends InputNativeAttributes {
	label?: string;
	disabled?: boolean;
	containerStyle?: string;
	maxFileSize?: string;
	invalid?: boolean;
	overrideInvalid?: boolean;
}

const FileInput = React.forwardRef<Ref, InputProps>((props: InputProps, ref) => {
	const {
		name,
		label,
		className,
		placeholder,
		disabled,
		containerStyle,
		invalid,
		overrideInvalid: override_invalid,
		maxFileSize,
		...rest
	} = props;

	const { isInvalid } = React.useMemo(() => {
		let isInvalid = false;
		const userInput = rest.value?.toString();
		if (override_invalid) {
			isInvalid = true;
		} else if (invalid && !userInput && rest.required) {
			isInvalid = true;
		}
		return { isInvalid };
	}, [invalid, rest.value, rest.required, override_invalid]);

	const container = classNames("input-container", containerStyle);

	const cn = classNames("flex justify-center rounded-lg border p-3", className, {
		invalid: isInvalid,
	});
	return (
		<div className={container}>
			{label && (
				<div className="capitalize">
					{label} {rest.required && "*"}
				</div>
			)}

			<div className={cn}>
				<label htmlFor={name} className="flex flex-col items-center gap-2 cursor-pointer">
					<div className="flex items-center justify-center rounded-full size-10 bg-neutral-100">
						<img src={upload_icon} alt="upload-icon" />
					</div>
					<span className="text-xs normal-case">{placeholder}</span>
					{rest.accept && (
						<span className="text-xs text-neutral-500">
							{" "}
							{capitalize(rest.accept ?? "", "all")}
						</span>
					)}
					{maxFileSize && <span className="text-xs text-neutral-500">Max size: {maxFileSize}</span>}
				</label>
				<input
					ref={ref}
					className="hidden"
					type={"file"}
					id={name}
					name={name}
					disabled={disabled}
					{...rest}
				/>
			</div>
		</div>
	);
});

FileInput.displayName = "FileInput";

export default FileInput;

//  <div className="flex justify-center p-3 border rounded-lg">
// <label htmlFor="upload-doc" className="flex flex-col items-center gap-2 cursor-pointer">
// 	<Badge className="rounded-full size-10 bg-neutral-100">
// 		<img src={assets.upload_icon_01} alt="upload-icon" />
// 	</Badge>
// 	<span className="caption-accent">{formData?.document?.name ?? "Click to Upload"}</span>
// 	<span className="caption-standard text-neutral-500">SVG, PNG, JPG (max. 800x400px)</span>
// </label>

// 		<input
// 			type="file"
// 			name="upload-doc"
// 			id="upload-doc"
// 			accept=".png, .jpg, .jpeg, .pdf"
// 			className="hidden"
// 			onChange={(e) => {
// 				const file = e.target.files?.[0] || null;
// 				if (file) updateForm("document", file);
// 			}}
// 			disabled={isLoading}
// 		/>
//  </div>;
