import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Sanitizes and formats input to ensure it's a valid number
 * @param value The input value to sanitize
 * @param allowDecimal Whether to allow decimal points (default: true)
 * @param allowNegative Whether to allow negative numbers (default: false)
 * @returns The sanitized value as a string
 */
export function sanitizeNumInput(
  value: string, 
  allowDecimal: boolean = true,
  allowNegative: boolean = false
): string {
  // Handle empty or undefined input
  if (!value) return '';
  
  // Allow only one decimal point if decimals are permitted
  if (allowDecimal) {
    // Remove all characters except digits, the decimal point, and minus sign
    let sanitized = value.replace(/[^\d.-]/g, '');
    
    // Ensure only one decimal point
    const decimalPoints = sanitized.match(/\./g);
    if (decimalPoints && decimalPoints.length > 1) {
      // Keep only the first decimal point
      const firstDecimalIndex = sanitized.indexOf('.');
      sanitized = 
        sanitized.substring(0, firstDecimalIndex + 1) + 
        sanitized.substring(firstDecimalIndex + 1).replace(/\./g, '');
    }
    
    // Handle negative numbers if allowed
    if (!allowNegative) {
      sanitized = sanitized.replace(/-/g, '');
    } else {
      // Ensure minus sign is only at the beginning
      if (sanitized.indexOf('-') !== 0) {
        sanitized = sanitized.replace(/-/g, '');
      }
    }
    
    return sanitized;
  } else {
    // Integer only mode
    let sanitized = value.replace(/[^\d-]/g, '');
    
    // Handle negative numbers
    if (!allowNegative) {
      sanitized = sanitized.replace(/-/g, '');
    } else {
      // Ensure minus sign is only at the beginning
      if (sanitized.indexOf('-') !== 0) {
        sanitized = sanitized.replace(/-/g, '');
      }
    }
    
    return sanitized;
  }
}

/**
 * Converts a sanitized string value to a number
 * @param value The string value to convert
 * @param defaultValue The default value to return if parsing fails
 * @returns The parsed number or default value
 */
export function parseNumericInput(value: string, defaultValue: number = 0): number {
  // Return default value for empty strings
  if (!value) return defaultValue;
  
  const parsed = parseFloat(value);
  return isNaN(parsed) ? defaultValue : parsed;
}
