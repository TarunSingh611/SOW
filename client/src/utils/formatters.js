
export const formatPrice = (price) => {
  if (!price) return '-';
  return parseFloat(price).toFixed(2);
};


export const formatCurrency = (amount, locale = 'en-US', currency = 'USD') => {
  if (!amount) return '-';
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency
  }).format(amount);
};


export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};


export const truncateText = (text, maxLength = 50) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};
