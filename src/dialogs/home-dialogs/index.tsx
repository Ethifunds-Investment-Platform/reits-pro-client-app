import * as React from "react";
import InvestDialog from "../invest-dialog";
import SuccessDialog from "../success-dialog";
import SignInDialog from "../sign-in-dialog";
import LogoutDialog from "../logout-dialog";
export default function HomeDialogs() {

	return (
		<React.Fragment>
			<InvestDialog />
			<SuccessDialog />
			<SignInDialog />
			<LogoutDialog />
		</React.Fragment>
	);
}
