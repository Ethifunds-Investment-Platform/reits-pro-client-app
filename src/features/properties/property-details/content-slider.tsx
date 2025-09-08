
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { variables } from "@/constants";
import { Project } from "@/types/project.types";
import { Calendar, CircleDollarSign, Percent } from "lucide-react";
import { Users } from "lucide-react";
import { Link } from "react-router-dom";
import useActions from "@/store/actions";
import useAppSelector from "@/store/hooks";
import { toast } from "sonner";
import useCustomNavigation from "@/hooks/use-navigation";

export default function ContentSlider(props: Project) {
	const { account } = useAppSelector("account");
	const { ui } = useActions();

	const { navigate } = useCustomNavigation();

	const progress =( (props.amount_raised / props.funding_goal) * 100);
	const handleInvestClick = () => {
		if (!account.id) {
			ui.changeDialog({
				show: true,
				type: "sign_in",
				data: { redirect: `/properties/${props.id}` },
			});
			return;
		}
		
		if (!account.bank_accounts.length) {
			toast.info("Please add a bank account to your profile before investing.");
			navigate(`/profile/${account.role}`);
			return;
		}

		ui.changeDialog({
			show: true,
			type: "invest_now",
			data: { project: props },
		});

		// if (props.paystack_product_url) {
		// 	window.open(props.paystack_product_url, "_blank");
		// } else {
		// 	toast.error("No payment link found for this project. Please contact support.");
		// }
	};

	return (
		<div className="lg:col-span-1  order-first lg:order-last">
			<div className="lg:sticky lg:top-24">
				<Card className="mb-6">
					<CardContent className="p-6">
						<div className="space-y-6">
							<div>
								<h3 className="text-2xl font-bold text-navy-800">
									{props.currency.symbol}
									{props?.funding_goal?.toLocaleString()}
								</h3>
								<p className="text-sm text-gray-600">Total Offering Size</p>
							</div>

							<div>
								<div className="flex items-center justify-between mb-2">
									<span className="text-sm font-medium text-gray-700">{progress.toFixed(1)}% Funded</span>
									<span className="text-sm text-gray-600">
										{props.currency.symbol} {props?.amount_raised?.toLocaleString()}
									</span>
								</div>
								<Progress value={progress} className="h-2" />
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div>
									<p className="text-sm text-gray-600">Investors</p>
									<div className="flex items-center">
										<Users className="h-4 w-4 text-gold-500 mr-1" />
										<span className="font-semibold text-navy-800">{props.total_investors}</span>
									</div>
								</div>

								<div>
									<p className="text-sm text-gray-600">Min Investment</p>
									<div className="flex items-center">
										<CircleDollarSign className="h-4 w-4 text-gold-500 mr-1" />
										<span className="font-semibold text-navy-800">
											{props.currency.symbol} {props?.minimum_investment?.toLocaleString()}
										</span>
									</div>
								</div>

								<div>
									<p className="text-sm text-gray-600">Target Return</p>
									<div className="flex items-center">
										<Percent className="h-4 w-4 text-gold-500 mr-1" />
										<span className="font-semibold text-navy-800">
											{props.expected_roi}% Annually
										</span>
									</div>
								</div>

								<div>
									<p className="text-sm text-gray-600">Investment Term</p>
									<div className="flex items-center">
										<Calendar className="h-4 w-4 text-gold-500 mr-1" />
										<span className="font-semibold text-navy-800">5 Years</span>
									</div>
								</div>
							</div>

							<Button
								className="w-full bg-navy-800 hover:bg-navy-700 text-white"
								onClick={handleInvestClick}
							>
								Invest Now
							</Button>

							<p className="text-xs text-gray-500 text-center">
								{progress < 100
									? `${(100 - progress).toFixed(1)}% still available. Closing soon.`
									: "This offering is fully funded."}
							</p>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardContent className="p-6">
						<h3 className="font-semibold text-navy-800 mb-3">Have Questions?</h3>
						<p className="text-gray-700 text-sm mb-4">
							Our team is available to answer any questions about this investment opportunity.
						</p>
						<Button
							variant="outline"
							className="w-full border-navy-600 text-navy-700 hover:bg-navy-50"
							asChild
						>
							<Link to={`mailto:${variables.CONTACTS.support_email}`}>Contact Us</Link>
						</Button>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
