import * as React from "react";
import { useForm } from "react-hook-form";
import { sanitizeNumInput } from "@/lib/utils";
import useAppSelector from "@/store/hooks";
import useActions from "@/store/actions";
import useCustomNavigation from "@/hooks/use-navigation";
import { useQuery } from "@tanstack/react-query";
import getPropertiesById from "@/services/properties/get-properties-by-id";
import { toast } from "@/hooks/use-toast";

type InvestFormValues = {
	investmentAmount: string;
};

export default function useInvest() {
	const { dialog } = useAppSelector("ui");
	const { account } = useAppSelector("account");
	const { queryParams, params } = useCustomNavigation();
	const { ui } = useActions();
	const project_id = params.id as string;

	const {
		isFetching,
		isError,
		error,
		data: project,
	} = useQuery({
		queryKey: ["invest-dialog"],
		queryFn: () => getPropertiesById({ project_id }),
		enabled: !!project_id,
	});

	const name = account?.name ?? "";

	const form = useForm<InvestFormValues>({
		defaultValues: {
			investmentAmount: project?.minimum_investment?.toString() || "",
		},
	});

	const watchInvestmentAmount = form.watch("investmentAmount");
	const numericAmount = React.useMemo(() => {
		return parseInt(watchInvestmentAmount?.replace(/,/g, "") || "0", 10);
	}, [watchInvestmentAmount]);

	// Calculate expected returns
	const expectedReturn = React.useMemo(() => {
		if (!project || isNaN(numericAmount)) return 0;
		return numericAmount * (project.expected_roi / 100);
	}, [numericAmount, project]);

	// Validation for minimum investment amount
	const isValidAmount = React.useMemo(() => {
		if (!project || isNaN(numericAmount)) return false;
		return numericAmount >= project.minimum_investment;
	}, [numericAmount, project]);

	const open = React.useMemo(
		() => dialog.show && dialog.type === "invest_now",
		[dialog.show, dialog.type]
	);

	const handleClose = React.useCallback(() => {
		ui.resetDialog();
	}, [ui]);

	const onSubmit = () => {
		if (!account?.id) {
			toast({
				title: "Error",
				description: "You need to be signed in to make an investment.",
				variant: "destructive",
			});
			return;
		}
		queryParams.set("action", "pay_now");
	};

	const formatAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = sanitizeNumInput(e.target.value, false);
		if (value === "") {
			form.setValue("investmentAmount", "");
			return;
		}

		const numVal = parseInt(value, 10);
		if (!isNaN(numVal)) {
			form.setValue("investmentAmount", numVal.toLocaleString());
		}
	};

	React.useEffect(() => {
		if (project && open) {
			form.reset({
				investmentAmount: project.minimum_investment.toLocaleString(),
			});
		}
	}, [project, open, form]);

	return {
		isFetching,
		isError,
		error,
		open,
		project,
		form,
		handleClose,
		onSubmit,
		formatAmount,
		expectedReturn,
		isValidAmount,
		numericAmount,
	};
}
