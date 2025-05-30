import * as React from "react";
import classnames from "classnames";
import { FolderOpen } from "lucide-react";

type EmptyDataProps = {
	title?: string;
	text?: string;
	icon?: string;
	className?: string;
};
export default React.memo(function EmptyData(props: EmptyDataProps) {
	const container = classnames(
		"w-full h-full flex col-span-full flex-col items-center justify-center",
		props.className
	);
	return (
		<div className={container}>
			<FolderOpen className="size-24 text-primary" />

			{props.title && <h1 className="text-xl font-semibold text-primary">{props.title}</h1>}
			<p className="text-center body-2 text-neutral-500 max-w-96">
				{props.text ?? "No Data available"}
			</p>
		</div>
	);
});
