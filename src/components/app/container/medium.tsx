import * as React from "react";
import classnames from "classnames";

type MediumProps = {
	children?: any;
	className?: string;
};
export default React.memo(function Medium({ children, className }: MediumProps) {
	const medium = classnames("w-full xl:w-4/12 2xl:w-3/12", className);

	return <div className={medium}>{children}</div>;
});
