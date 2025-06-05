import { useQuery } from "@tanstack/react-query";
import getProperties from "@/services/properties/get-properties";
import useCustomNavigation from "@/hooks/use-navigation";
import { useMemo } from "react";

type FilterState = {
	searchQuery: string;
	propertyType: string;
	minInvestment: number;
	expectedReturn: number;
};

export default function useProperties() {
	const { queryParams } = useCustomNavigation();
	// Extract values from URL parameters with proper fallbacks
	const searchQuery = queryParams.get("search") || "";
	const propertyType = queryParams.get("type") || "all";
	const page = Number(queryParams.get("page")) || 1;
	const developer_id = queryParams.get("developer_id") || "";

	// Parse numeric values safely with fallbacks
	const minInvestmentStr = queryParams.get("minInvestment");
	const minInvestment = minInvestmentStr ? parseInt(minInvestmentStr, 10) : 0;

	const expectedReturnStr = queryParams.get("expectedReturn");
	const expectedReturn = expectedReturnStr ? parseInt(expectedReturnStr, 10) : 0;

	// Read filters from URL params
	const filters = useMemo<FilterState>(() => {
		return {
			searchQuery,
			propertyType,
			minInvestment: isNaN(minInvestment) ? 0 : minInvestment,
			expectedReturn: isNaN(expectedReturn) ? 0 : expectedReturn,
		};
	}, [searchQuery, propertyType, minInvestment, expectedReturn]);

	// Query properties with filters
	const { data, isFetching, isError, error, refetch } = useQuery({
		queryKey: [
			"properties",
			page,
			developer_id,
			filters.searchQuery,
			filters.propertyType,
			filters.minInvestment,
			filters.expectedReturn,
		],
		queryFn: () =>
			getProperties({
				page,
				search: filters.searchQuery || undefined,
				property_type: filters.propertyType !== "all" ? filters.propertyType : undefined,
				min_investment: filters.minInvestment > 0 ? filters.minInvestment : undefined,
				expected_return: filters.expectedReturn > 0 ? filters.expectedReturn : undefined,
				developer_id: developer_id,
			}),
	});

	// Calculate total pages
	const totalPages = data?.totalPages || 1;

	// Update filter functions
	const updateSearchQuery = (value: string) => {
		if (value) {
			queryParams.set("search", value);
		} else {
			queryParams.delete("search");
		}
		// Reset to page 1 when changing filters
		queryParams.set("page", "1");
	};

	const updatePropertyType = (value: string) => {
		if (value && value !== "all") {
			queryParams.set("type", value);
		} else {
			queryParams.delete("type");
		}
		// Reset to page 1 when changing filters
		queryParams.set("page", "1");
	};

	const updateMinInvestment = (value: number[]) => {
		if (value[0] > 0) {
			queryParams.set("minInvestment", value[0].toString());
		} else {
			queryParams.delete("minInvestment");
		}
		// Reset to page 1 when changing filters
		queryParams.set("page", "1");
	};

	const updateExpectedReturn = (value: number[]) => {
		if (value[0] > 0) {
			queryParams.set("expectedReturn", value[0].toString());
		} else {
			queryParams.delete("expectedReturn");
		}
		// Reset to page 1 when changing filters
		queryParams.set("page", "1");
	};

	const clearFilters = () => {
		queryParams.delete("search");
		queryParams.delete("type");
		queryParams.delete("minInvestment");
		queryParams.delete("expectedReturn");
		// Reset to page 1 when clearing filters
		queryParams.set("page", "1");
	};

	// Handle page change
	const handlePageChange = (newPage: number) => {
		queryParams.set("page", newPage.toString());
	};

	return {
		// Data and loading states
		properties: data?.docs || [],
		totalCount: data?.totalDocs || 0,
		isLoading: isFetching,
		isError,
		error,

		// Pagination
		currentPage: page,
		totalPages,
		onPageChange: handlePageChange,

		// Current filter values
		filters,

		// Filter update methods
		updateSearchQuery,
		updatePropertyType,
		updateMinInvestment,
		updateExpectedReturn,
		clearFilters,

		// Query methods
		refetch,
	};
}
