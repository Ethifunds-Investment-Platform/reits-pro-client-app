import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Trash2, Plus, StarOff, LoaderCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import LoadingBox from "@/components/app/loading-box";
import AppDialog from "@/components/app/app-dialog";
import getUserAccounts from "@/services/bank/get-user-accounts";
import getBankList from "@/services/bank/get-bank-list";
import verifyAccountNumber from "@/services/bank/verify-account-number";
import addAccount from "@/services/bank/add-account";
import setDefaultBankAccount from "@/services/bank/set-default-bank";
import removeAccount from "@/services/bank/remove-account";
import { Bank, BankAccount } from "@/types/bank-account.types";
import useAppSelector from "@/store/hooks";
import Render from "@/components/app/render";

const bankAccountSchema = z.object({
	bank_code: z.string().min(1, "Please select a bank"),
	account_number: z.string().min(10, "Account number must be at least 10 digits"),
});

type BankAccountFormValues = z.infer<typeof bankAccountSchema>;

export function BankDetails() {
	const { account } = useAppSelector("account");
	const [accounts, setAccounts] = useState<BankAccount[]>(account?.bank_accounts ?? []);
	const [banks, setBanks] = useState<Bank[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [deleting, setDeleting] = useState(false);
	const [isVerifying, setIsVerifying] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [verifiedAccountName, setVerifiedAccountName] = useState<string>("");
	const [showAddForm, setShowAddForm] = useState(false);
	const [showRemoveDialog, setShowRemoveDialog] = useState(false);
	const [accountToRemove, setAccountToRemove] = useState<BankAccount | null>(null);

	const form = useForm<BankAccountFormValues>({
		resolver: zodResolver(bankAccountSchema),
		defaultValues: {
			bank_code: "",
			account_number: "",
		},
	});

	const selectedBankCode = form.watch("bank_code");
	const accountNumber = form.watch("account_number");

	// Fetch initial data
	useEffect(() => {
		const fetchData = async () => {
			try {
				const bankList = await getBankList();
				setBanks(bankList);
			} catch (error) {
				toast({
					variant: "destructive",
					title: "Error",
					description: "Failed to load bank list",
				});
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, []);

	// Auto-verify account when bank and account number are provided
	useEffect(() => {
		const verify = async () => {
			if (selectedBankCode && accountNumber && accountNumber.length >= 10) {
				setIsVerifying(true);
				try {
					const result = await verifyAccountNumber({
						account_number: accountNumber,
						bank_code: selectedBankCode,
					});
					setVerifiedAccountName(result.account_name);
				} catch (error) {
					setVerifiedAccountName("");
					toast({
						variant: "destructive",
						title: "Verification Failed",
						description: "Could not verify account details",
					});
				} finally {
					setIsVerifying(false);
				}
			} else {
				setVerifiedAccountName("");
			}
		};

		const timeoutId = setTimeout(verify, 500);
		return () => clearTimeout(timeoutId);
	}, [selectedBankCode, accountNumber]);

	const handleAddAccount = async (data: BankAccountFormValues) => {
		if (!verifiedAccountName) {
			toast({
				variant: "destructive",
				title: "Error",
				description: "Please verify account details first",
			});
			return;
		}

		setIsSubmitting(true);
		try {
			const selectedBank = banks.find((bank) => bank.code === data.bank_code);
			if (!selectedBank) return;

			const newAccount = await addAccount({
				account_number: data.account_number,
				bank_code: data.bank_code,
				name: verifiedAccountName,
			});

			setAccounts((prev) => [...prev, newAccount]);
			setShowAddForm(false);
			form.reset();
			setVerifiedAccountName("");

			toast({
				title: "Success",
				description: "Bank account added successfully",
			});
		} catch (error) {
			toast({
				variant: "destructive",
				title: "Error",
				description: "Failed to add bank account",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleSetDefault = async (accountId: number) => {
		try {
			await setDefaultBankAccount({ user_bank_account_id: accountId });
			setAccounts((prev) =>
				prev.map((account) => ({
					...account,
					is_default: account.id === accountId ? true : false,
				}))
			);
			toast({
				title: "Success",
				description: "Default account updated",
			});
		} catch (error) {
			toast({
				variant: "destructive",
				title: "Error",
				description: "Failed to set default account",
			});
		}
	};

	const handleRemoveAccount = async () => {
		if (!accountToRemove) return;
		setDeleting(true);

		try {
			await removeAccount({ bank_id: accountToRemove.id });
			setAccounts((prev) => prev.filter((account) => account.id !== accountToRemove.id));
			setShowRemoveDialog(false);
			setAccountToRemove(null);
			toast({
				title: "Success",
				description: "Bank account removed",
			});
		} catch (error) {
			toast({
				variant: "destructive",
				title: "Error",
				description: "Failed to remove bank account",
			});
		} finally {
			setDeleting(false);
		}
	};

	const openRemoveDialog = (account: BankAccount) => {
		setAccountToRemove(account);
		setShowRemoveDialog(true);
	};

	return (
		<div className="space-y-6">
			<Render isLoading={isLoading}>
				<Card>
					<CardHeader>
						<div className="flex items-center justify-between">
							<div>
								<CardTitle>Bank Details</CardTitle>
								<CardDescription>
									Manage your bank account information for withdrawals
								</CardDescription>
							</div>
							{accounts.length > 0 && (
								<Button onClick={() => setShowAddForm(!showAddForm)} variant="outline" size="sm">
									<Plus className="h-4 w-4 mr-2" />
									Add Account
								</Button>
							)}
						</div>
					</CardHeader>
					<CardContent>
						{accounts.length === 0 && !showAddForm ? (
							<div className="text-center py-8">
								<p className="text-muted-foreground mb-4">
									No bank accounts found. Add your first bank account to start receiving payments.
								</p>
								<Button onClick={() => setShowAddForm(true)}>
									<Plus className="h-4 w-4 mr-2" />
									Add Bank Account
								</Button>
							</div>
						) : (
							<div className="space-y-4">
								{accounts.map((account,idx) => (
									<div
										key={idx}
										className="flex items-center justify-between p-4 border rounded-lg"
									>
										<div className="flex-1">
											<div className="flex items-center gap-2 mb-1">
												<h4 className="font-medium">{account.bank_name}</h4>
												{account.is_default && <Badge variant="default">Default</Badge>}
											</div>
											<p
												className="text-sm text-muted-foreground line-clamp-1"
												title={account.account_name}
											>
												{account.account_name}
											</p>
											<p className="text-sm text-muted-foreground">{account.account_number}</p>
										</div>
										<div className="flex items-center gap-2">
											{!account.is_default && (
												<Button
													variant="ghost"
													size="icon"
													onClick={() => handleSetDefault(account.id)}
													title="Set as default"
												>
													<StarOff className="h-4 w-4" />
												</Button>
											)}
											<Button
												variant="ghost"
												size="icon"
												onClick={() => openRemoveDialog(account)}
												title="Remove account"
											>
												<Trash2 className="h-4 w-4" />
											</Button>
										</div>
									</div>
								))}

								{showAddForm && (
									<Form {...form}>
										<form onSubmit={form.handleSubmit(handleAddAccount)} className="space-y-4 mt-6">
											<FormField
												control={form.control}
												name="bank_code"
												render={({ field }) => (
													<FormItem>
														<FormLabel>Bank</FormLabel>
														<Select onValueChange={field.onChange} defaultValue={field.value}>
															<FormControl>
																<SelectTrigger>
																	<SelectValue placeholder="Select a bank" />
																</SelectTrigger>
															</FormControl>
															<SelectContent>
																{banks.map((bank) => (
																	<SelectItem key={bank.code} value={bank.code}>
																		{bank.name}
																	</SelectItem>
																))}
															</SelectContent>
														</Select>
														<FormMessage />
													</FormItem>
												)}
											/>

											<FormField
												control={form.control}
												name="account_number"
												render={({ field }) => (
													<FormItem>
														<FormLabel>Account Number</FormLabel>
														<FormControl>
															<Input placeholder="Enter account number" {...field} />
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
											{isVerifying && <LoaderCircle className="w-4 h-4 animate-spin" />}
											{verifiedAccountName && (
												<div className="p-3 bg-green-50 text-green-700 rounded-lg">
													<p className="text-sm font-medium">Verified Account Name:</p>
													<p>{verifiedAccountName}</p>
												</div>
											)}

											<div className="flex items-center gap-2">
												<Button type="submit" disabled={isSubmitting || !verifiedAccountName}>
													{isSubmitting ? "Adding..." : "Add Account"}
												</Button>
												<Button
													type="button"
													variant="outline"
													onClick={() => {
														setShowAddForm(false);
														form.reset();
														setVerifiedAccountName("");
													}}
												>
													Cancel
												</Button>
											</div>
										</form>
									</Form>
								)}
							</div>
						)}
					</CardContent>
				</Card>
			</Render>

			<AppDialog
				open={showRemoveDialog}
				onClose={() => setShowRemoveDialog(false)}
				title="Remove Bank Account"
				description="Are you sure you want to remove this bank account? This action cannot be undone."
				footer={
					<Button variant="destructive" onClick={handleRemoveAccount} disabled={deleting}>
						{deleting ? "Removing..." : "Remove Account"}
					</Button>
				}
			>
				<></>
			</AppDialog>
		</div>
	);
}
