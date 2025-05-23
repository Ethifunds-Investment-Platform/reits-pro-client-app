import AppDialog from "@/components/app/app-dialog";
import { Button } from "@/components/ui/button";
import useAppSelector from "@/store/hooks";
import { Link } from "react-router-dom";
import * as React from "react";
import useActions from "@/store/actions";

export default function SignInDialog() {
	const { dialog } = useAppSelector("ui");
	const { ui } = useActions();

	const open = React.useMemo(
		() => dialog.show && dialog.type === "sign_in",
		[dialog.show, dialog.type]
	);

	const redirect = React.useMemo(() => dialog?.data?.redirect, [dialog.data]);

	const path = redirect ? `/auth/login?redirect=${redirect}` : "/auth/login";

	const close = () => {
		ui.resetDialog();
	};
	return (
		<AppDialog
			open={open}
			onClose={close}
			title="Sign In"
			description="The feature you are about to access requires you to be logged in"
		>
			<div className="flex justify-end">
				<Button asChild onClick={close}>
					<Link to={path}>Login</Link>
				</Button>
			</div>
		</AppDialog>
	);
}
