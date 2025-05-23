import * as React from "react";
import PaystackPop from "@paystack/inline-js";
import { variables } from "@/constants";
import useCustomNavigation from "@/hooks/use-navigation";
import useAppSelector from "@/store/hooks";
import { toast } from "@/hooks/use-toast";
import { Project } from "@/types/project.types";
import useActions from "@/store/actions";

type Props = {
	amount: number;
	project: Project;
};
export default React.memo(function Proceed(props: Props) {
	const { account } = useAppSelector("account");
	const { params, queryParams } = useCustomNavigation();
	const project_id = params.id as string;

	const amount = props.amount || 0;
	const { ui } = useActions();

	const hasAction = React.useMemo(() => queryParams.has("action", "pay_now"), [queryParams]);

	const initiate = hasAction && project_id && account?.id && amount > 0;

	const project = props.project;

	const handleClose = () => {
		queryParams.delete("action");
	};

	const name = account?.name ?? " ";
	const [firstName, lastName] = name.split(" ");

	const paystackInstance = new PaystackPop();

	const onSuccess = React.useCallback(() => {
		ui.changeDialog({
			type: "success",
			data: {
				title: "Investment Successful",
				text: `You have successfully invested ${
					project?.currency.symbol
				}${amount.toLocaleString()} in ${project?.name}. Do check your email for more details.`,
			},
		});
		handleClose();
	}, []);

	const onCancel = React.useCallback(() => {
		toast({
			title: "Transaction Cancelled",
			description: "Investment transaction was cancelled.",
		});
		handleClose();
	}, []);

	const onError = React.useCallback((params: { message: string }) => {
		toast({
			title: "Payment Error",
			description: params.message || "An error occurred while processing your payment.",
			variant: "destructive",
		});
		handleClose();
	}, []);

	if (!initiate) return;

	paystackInstance.newTransaction({
		key: variables.PAYSTACK.public_key,
		email: account?.email || " ",
		firstName,
		lastName,
		amount: amount * 100, // Paystack expects amount in kobo (or lowest currency unit)
		metadata: {
			custom_fields: [
				{
					display_name: "Email",
					variable_name: "email",
					value: account.email,
				},
				{
					display_name: "Investment Amount",
					variable_name: "investment_amount",
					value: amount,
				},
				{
					display_name: "Project ID",
					variable_name: "project_id",
					value: project_id,
				},
			],
		},
		onSuccess: onSuccess,
		onCancel: onCancel,
		onError: onError,
	});

	return <></>;
});
