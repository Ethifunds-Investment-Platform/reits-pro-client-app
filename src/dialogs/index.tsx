import * as React from "react";
import ProjectDialogs from "./project-dialogs";
import LogoutDialog from "./logout-dialog";

export default function Dialogs() {
	return (
		<React.Fragment>
			<ProjectDialogs />
			<LogoutDialog />
		</React.Fragment>
	);
};
