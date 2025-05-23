export default function sanitizeText(
	text: string,
	textCase: "UPPERCASE" | "LOWERCASE" = "LOWERCASE"
) {
	if (!text) return text;
	if (textCase === "UPPERCASE") return text.trim().toUpperCase();
	return text.trim().toLocaleLowerCase();
}
