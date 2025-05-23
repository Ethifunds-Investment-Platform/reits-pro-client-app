import useCustomNavigation from "@/hooks/use-navigation";
import * as React from "react";

type RedirectProps = {
	to: string;
	replace?: boolean;
};
export default function Redirect(props: RedirectProps) {
	const { navigate } = useCustomNavigation();

	React.useEffect(() => {
		navigate(props.to, { replace: props.replace });
	}, [navigate, props.replace, props.to]);

	return <React.Fragment />;
}
