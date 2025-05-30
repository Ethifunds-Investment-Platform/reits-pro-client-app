type FigureConverterOptions = {
	currency?: string;
	precision?: number;
	compact?: boolean;
};

export function figureConverter(value: number, options: FigureConverterOptions = {}): string {
	const { currency = "", precision = 0, compact = true } = options;
	const formatOptions: Intl.NumberFormatOptions = {
		style: currency ? "currency" : "decimal",
		currency: currency || undefined,
		notation: compact ? "compact" : "standard",
		maximumFractionDigits: precision,
	};
	const formatter = new Intl.NumberFormat("en-US", formatOptions);

	return formatter.format(value);
}
