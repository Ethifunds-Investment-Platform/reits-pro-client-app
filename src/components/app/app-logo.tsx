import classNames from "classnames";
import { Building } from "lucide-react";
import { Link } from "react-router-dom";

type Props = {
	clickable?: boolean;
	scope?: "logo_with_text" | "logo";
	logoStyle?: string;
	containerStyle?: string;
};
export default function AppLogo(props: Props) {
	const { clickable = false, scope = "logo_with_text", logoStyle, containerStyle } = props;
	const container = classNames("flex-shrink-0 flex gap-2 items-center", containerStyle);
	const logoClx = classNames("size-8 text-navy-800", logoStyle);

	if (clickable) {
		return (
			<Link to="/" className={container}>
				<Building className={logoClx} />
				{scope === "logo_with_text" && (
					<span className="text-xl font-bold text-navy-800">REITPro</span>
				)}
			</Link>
		);
	}

	return (
		<div className={container}>
			<Building className={logoClx} />
			{scope === "logo_with_text" && (
				<span className="text-xl font-bold text-navy-800">REITPro</span>
			)}
		</div>
	);
}
