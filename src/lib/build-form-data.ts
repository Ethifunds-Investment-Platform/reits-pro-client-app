import { NewProject, NewProjectUpdate } from "@/types/project.types";

/**
 * Converts project form data to FormData for multipart/form-data submission
 */
export function buildProjectFormData(data: NewProject): FormData {
	const formData = new FormData();

	// Add simple string/number fields
	formData.append("name", data.name);
	formData.append("developer_id", data.developer_id);
	formData.append("description", data.description);
	formData.append("type", data.type);
	formData.append("paystack_product_url", data.paystack_product_url);
	formData.append("currency_id", data.currency_id);
	formData.append("funding_goal", data.funding_goal.toString());
	formData.append("expected_roi", data.expected_roi.toString());
	formData.append("minimum_investment", data.minimum_investment.toString());
	formData.append("tenor_unit", data.tenor_unit);
	formData.append("tenor_value", data.tenor_value.toString());
	formData.append("distribution_frequency", data.distribution_frequency);

	// Add optional number field
	if (data.maximum_investment) {
		formData.append("maximum_investment", data.maximum_investment.toString());
	}

	// Add optional string/file fields
	if (data.funding_deadline) {
		formData.append("funding_deadline", data.funding_deadline);
	}
	if (data.project_memo) {
		if (data.project_memo instanceof File) {
			formData.append("project_memo", data.project_memo);
		} else {
			formData.append("project_memo", data.project_memo);
		}
	}
	if (data.developer_track_record) {
		if (data.developer_track_record instanceof File) {
			formData.append("developer_track_record", data.developer_track_record);
		} else {
			formData.append("developer_track_record", data.developer_track_record);
		}
	}
	if (data.market_analysis) {
		if (data.market_analysis instanceof File) {
			formData.append("market_analysis", data.market_analysis);
		} else {
			formData.append("market_analysis", data.market_analysis);
		}
	}
	if (data.financial_projections) {
		if (data.financial_projections instanceof File) {
			formData.append("financial_projections", data.financial_projections);
		} else {
			formData.append("financial_projections", data.financial_projections);
		}
	}

	// Add location object as nested fields
	formData.append("location.country", data.location.country);
	formData.append("location.state", data.location.state);
	if (data.location.fullAddress) {
		formData.append("location.fullAddress", data.location.fullAddress);
	}

	// Add array fields as JSON strings (backend can parse these)
	formData.append("risk_factors", JSON.stringify(data.risk_factors));
	formData.append("property_highlights", JSON.stringify(data.property_highlights));

	// Add file fields
	formData.append("display_image", data.display_image);

	// Add additional images if they exist
	if (data.images && data.images.length > 0) {
		data.images.forEach((file, index) => {
			formData.append(`images[${index}]`, file);
		});
	}

	
	console.log("=== FormData Contents ===");
	for (const [key, value] of formData.entries()) {
		// Check if the value is a File object
		if (value instanceof File) {
			console.log(`Key: ${key}`);
			console.log("--- File Details ---");
			console.log(`File Name: ${value.name}`); // Example: "document.pdf"
			console.log(`File Size: ${value.size} bytes`); // Example: 51235
			console.log(`File Type: ${value.type}`); // Example: "application/pdf"
			console.log(`Last Modified: ${new Date(value.lastModified).toLocaleString()}`);
			console.log("--- End File Details ---");
		} else {
			console.log(`Key: ${key}, Value: ${value}`);
		}
	}
	console.log("=== End FormData Contents ===");

	return formData;
}

/**
 * Converts project update form data to FormData for multipart/form-data submission
 */
export function buildProjectUpdateFormData(data: NewProjectUpdate): FormData {
	const formData = new FormData();

	// Add simple fields
	formData.append("project_id", data.project_id);
	formData.append("title", data.title);
	formData.append("content", data.content);

	// Add images if they exist
	if (data.images && data.images.length > 0) {
		data.images.forEach((file, index) => {
			formData.append(`images[${index}]`, file);
		});
	}

	return formData;
}
