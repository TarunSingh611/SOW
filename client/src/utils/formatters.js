/**
 * Format price to 2 decimal places
 * @param {number|string} price - Price to format
 * @returns {string} Formatted price
 */
export const formatPrice = (price) => {
  if (!price) return '-';
  return parseFloat(price).toFixed(2);
};

/**
 * Format currency with locale
 * @param {number|string} amount - Amount to format
 * @param {string} locale - Locale for formatting
 * @param {string} currency - Currency code
 * @returns {string} Formatted currency
 */
export const formatCurrency = (amount, locale = 'en-US', currency = 'USD') => {
  if (!amount) return '-';
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency
  }).format(amount);
};

/**
 * Capitalize first letter of string
 * @param {string} str - String to capitalize
 * @returns {string} Capitalized string
 */
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 50) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};
