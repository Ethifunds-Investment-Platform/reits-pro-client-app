import * as React from "react";
import ProjectDialogs from "./project-dialogs";
import LogoutDialog from "./logout-dialog";
import SuccessDialog from "./success-dialog";

export default function Dialogs() {
	return (
		<React.Fragment>
			<ProjectDialogs />
			<LogoutDialog />
			<SuccessDialog />
		</React.Fragment>
	);
};
