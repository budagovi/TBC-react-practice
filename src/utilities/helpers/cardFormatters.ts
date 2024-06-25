// formatters.js

/**
 * Format the expiry date input.
 * @param {string} value - The input value.
 * @returns {string} - The formatted expiry date (MM/YY).
 */
export const formatExpiryDate = (value: string): string => {
  // Remove all non-digit characters
  const digits = value.replace(/\D/g, '');

  // Get the month and year parts
  const month = digits.slice(0, 2);
  const year = digits.slice(2, 4);

  // Return the formatted date
  return `${month}${year ? '/' + year : ''}`;
};

/**
 * Format the card number input.
 * @param {string} value - The input value.
 * @returns {string} - The formatted card number with only digits.
 */
export const formatCardNumber = (value: string): string => {
  return value.replace(/\D/g, '');
};

/**
 * Format the CVC input.
 * @param {string} value - The input value.
 * @returns {string} - The formatted CVC with only digits.
 */
export const formatCVC = (value: string): string => {
  return value.replace(/\D/g, '');
};
