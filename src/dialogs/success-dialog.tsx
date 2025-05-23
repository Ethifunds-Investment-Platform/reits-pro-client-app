import AppDialog from "@/components/app/app-dialog";
import { Button } from "@/components/ui/button";
import useActions from "@/store/actions";
import useAppSelector from "@/store/hooks";
import { CircleCheckBig } from "lucide-react";
import * as React from "react";

export default React.memo(function SuccessDialog() {
	const { dialog } = useAppSelector("ui");
	const { ui } = useActions();
	const open = React.useMemo(() => {
		return dialog.show && dialog.type === "success";
	}, [dialog.show, dialog.type]);

	const close = React.useCallback(() => {
		if (dialog.dismiss) {
			dialog.dismiss();
		}
		ui.resetDialog();
	}, [dialog.dismiss]);

	return (
		<AppDialog
			open={open}
			onClose={close}
			footer={
				<Button
					variant={dialog.data?.buttonVariant ?? "default"}
					onClick={close}
					className="w-full"
				>
					{dialog.data?.buttonText ?? "Dismiss"}
				</Button>
			}
		>
			<div className="flex flex-col items-center justify-center gap-5">
				<CircleCheckBig className="size-14 text-green-500" />
				<div className="text-center">
					<h1 className="font-bold heading-5">{dialog.data?.title ?? "Successful"} </h1>
					<span className="text-center body-2 text-neutral-500">
						{dialog.data?.text ?? "success"}
					</span>
				</div>
			</div>
		</AppDialog>
	);
});
