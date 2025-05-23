import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import useAppSelector from "@/store/hooks";
type FilterState = {
	searchQuery: string;
	propertyType: string;
	minInvestment: number;
	expectedReturn: number;
};

type PropertyFilterProps = {
	filters: FilterState;
	onUpdateSearchQuery: (value: string) => void;
	onUpdatePropertyType: (value: string) => void;
	onUpdateMinInvestment: (value: number[]) => void;
	onUpdateExpectedReturn: (value: number[]) => void;
	onClearFilters: () => void;
};

const PropertyFilter = ({
	filters,
	onUpdateSearchQuery,
	onUpdatePropertyType,
	onUpdateMinInvestment,
	onUpdateExpectedReturn,
	onClearFilters,
}: PropertyFilterProps) => {
	const { activeCurrency } = useAppSelector("init");
	const [showFilters, setShowFilters] = useState(false);

	const toggleFilters = () => {
		setShowFilters(!showFilters);
	};

	const hasActiveFilters =
		filters.propertyType !== "all" || filters.minInvestment > 0 || filters.expectedReturn > 0;

	const symbol = activeCurrency?.symbol ?? "";
	return (
		<>
			{/* Desktop filter sidebar */}
			<div className="hidden lg:block w-64 shrink-0">
				<div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm sticky top-24">
					<h2 className="text-lg font-semibold mb-4 text-navy-800">Filters</h2>

					<div className="space-y-6">
						<div>
							<label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
								Search
							</label>
							<div className="relative">
								<Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
								<Input
									id="search"
									placeholder="Search properties..."
									value={filters.searchQuery}
									onChange={(e) => onUpdateSearchQuery(e.target.value)}
									className="pl-8"
								/>
							</div>
						</div>

						<div>
							<label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
								Property Type
							</label>
							<Select value={filters.propertyType} onValueChange={onUpdatePropertyType}>
								<SelectTrigger id="type">
									<SelectValue placeholder="All Types" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all">All Types</SelectItem>
									<SelectItem value="development">Development</SelectItem>
									<SelectItem value="completed">Completed</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div>
							<label
								htmlFor="min-investment"
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								Minimum Investment
							</label>
							<div className="pt-6 px-2">
								<Slider
									id="min-investment"
									defaultValue={[0]}
									max={100000}
									step={5000}
									value={[filters.minInvestment]}
									onValueChange={onUpdateMinInvestment}
								/>
								<div className="mt-2 text-sm text-gray-600">
									{symbol}{filters.minInvestment.toLocaleString()} or more
								</div>
							</div>
						</div>

						<div>
							<label htmlFor="return" className="block text-sm font-medium text-gray-700 mb-1">
								Expected Return
							</label>
							<div className="pt-6 px-2">
								<Slider
									id="return"
									defaultValue={[0]}
									max={20}
									step={0.5}
									value={[filters.expectedReturn]}
									onValueChange={onUpdateExpectedReturn}
								/>
								<div className="mt-2 text-sm text-gray-600">
									{filters.expectedReturn}% or higher
								</div>
							</div>
						</div>

						<Button
							variant="outline"
							className="w-full border-navy-600 text-navy-600 hover:bg-navy-50"
							onClick={onClearFilters}
						>
							Clear All Filters
						</Button>
					</div>
				</div>
			</div>

			{/* Mobile filters button and search */}
			<div className="lg:hidden flex flex-col gap-4 mb-6">
				<div className="relative">
					<Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
					<Input
						placeholder="Search properties..."
						value={filters.searchQuery}
						onChange={(e) => onUpdateSearchQuery(e.target.value)}
						className="pl-8"
					/>
				</div>

				<Button
					variant="outline"
					className="flex items-center justify-center gap-2 border-navy-600 text-navy-600"
					onClick={toggleFilters}
				>
					<SlidersHorizontal className="h-4 w-4" />
					Filters
					{hasActiveFilters && <Badge className="ml-2 bg-navy-600">Active</Badge>}
				</Button>

				{/* Mobile filters panel */}
				{showFilters && (
					<div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
						<div className="flex justify-between items-center mb-4">
							<h2 className="text-lg font-semibold text-navy-800">Filters</h2>
							<Button
								variant="ghost"
								size="sm"
								onClick={toggleFilters}
								className="text-gray-500 hover:text-navy-700"
							>
								<X className="h-4 w-4" />
							</Button>
						</div>

						<div className="space-y-6">
							<div>
								<label
									htmlFor="mobile-type"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									Property Type
								</label>
								<Select value={filters.propertyType} onValueChange={onUpdatePropertyType}>
									<SelectTrigger id="mobile-type">
										<SelectValue placeholder="All Types" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="all">All Types</SelectItem>
										<SelectItem value="development">Development</SelectItem>
										<SelectItem value="completed">Completed</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<div>
								<label
									htmlFor="mobile-investment"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									Minimum Investment
								</label>
								<div className="pt-6 px-2">
									<Slider
										id="mobile-investment"
										defaultValue={[0]}
										max={100000}
										step={5000}
										value={[filters.minInvestment]}
										onValueChange={onUpdateMinInvestment}
									/>
									<div className="mt-2 text-sm text-gray-600">
										${filters.minInvestment.toLocaleString()} or more
									</div>
								</div>
							</div>

							<div>
								<label
									htmlFor="mobile-return"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									Expected Return
								</label>
								<div className="pt-6 px-2">
									<Slider
										id="mobile-return"
										defaultValue={[0]}
										max={20}
										step={0.5}
										value={[filters.expectedReturn]}
										onValueChange={onUpdateExpectedReturn}
									/>
									<div className="mt-2 text-sm text-gray-600">
										{filters.expectedReturn}% or higher
									</div>
								</div>
							</div>

							<div className="flex gap-2">
								<Button
									variant="outline"
									className="flex-1 border-navy-600 text-navy-600 hover:bg-navy-50"
									onClick={onClearFilters}
								>
									Clear All
								</Button>
								<Button
									className="flex-1 bg-navy-800 hover:bg-navy-700 text-white"
									onClick={toggleFilters}
								>
									Apply Filters
								</Button>
							</div>
						</div>
					</div>
				)}
			</div>

		</>
	);
};

export default PropertyFilter;
