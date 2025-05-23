export const figureConverter = (
	figure: number,
	options?: {
		currency?: string;
		precision?: number;
		showCurrency?: boolean;
	}
) => {
	const { currency = "", precision = 1, showCurrency = true } = options || {};

	// Handle zero or invalid values
	if (!figure || isNaN(figure)) return showCurrency ? `${currency}0` : "0";

	// For thousands (1K - 999K)
	if (figure < 1000000) {
		const inThousands = figure / 1000;
		if (inThousands < 1) {
			// For values less than 1000, just format the number with commas
			return showCurrency ? `${currency}${figure.toLocaleString()}` : figure.toLocaleString();
		}
		// Format to K with specified precision
		const formatted = inThousands.toFixed(precision);
		return showCurrency ? `${currency}${formatted}K` : `${formatted}K`;
	}

	// For millions (1M+)
	const inMillions = figure / 1000000;
	const formatted = inMillions.toFixed(precision);
	return showCurrency ? `${currency}${formatted}M` : `${formatted}M`;
};
