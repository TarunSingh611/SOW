/**
 * Validation utilities for server-side validation
 */

/**
 * Validate product data
 * @param {Object} productData - Product data to validate
 * @returns {Object} Validation result with isValid and errors
 */
const validateProduct = (productData) => {
  const errors = [];

  if (!productData.name || productData.name.trim() === '') {
    errors.push('Product name is required');
  }

  if (!productData.price || isNaN(parseFloat(productData.price))) {
    errors.push('Valid price is required');
  }

  if (productData.price && parseFloat(productData.price) < 0) {
    errors.push('Price cannot be negative');
  }

  if (productData.in_price && isNaN(parseFloat(productData.in_price))) {
    errors.push('In price must be a valid number');
  }

  if (productData.in_stock && isNaN(parseInt(productData.in_stock))) {
    errors.push('In stock must be a valid number');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Validate product field update
 * @param {string} field - Field name
 * @param {any} value - Field value
 * @returns {Object} Validation result with isValid and errors
 */
const validateProductField = (field, value) => {
  const errors = [];

  const allowedFields = [
    'article_no', 'name', 'name_sv', 'in_price', 
    'price', 'unit', 'in_stock', 'description', 'description_sv'
  ];

  if (!allowedFields.includes(field)) {
    errors.push('Invalid field name');
  }

  if (field === 'price' && (isNaN(parseFloat(value)) || parseFloat(value) < 0)) {
    errors.push('Price must be a valid positive number');
  }

  if (field === 'in_price' && value && (isNaN(parseFloat(value)) || parseFloat(value) < 0)) {
    errors.push('In price must be a valid positive number');
  }

  if (field === 'in_stock' && value && (isNaN(parseInt(value)) || parseInt(value) < 0)) {
    errors.push('In stock must be a valid positive number');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Sanitize product data
 * @param {Object} productData - Product data to sanitize
 * @returns {Object} Sanitized product data
 */
const sanitizeProductData = (productData) => {
  return {
    article_no: productData.article_no?.trim() || null,
    name: productData.name?.trim() || '',
    name_sv: productData.name_sv?.trim() || null,
    in_price: productData.in_price ? parseFloat(productData.in_price) : null,
    price: parseFloat(productData.price) || 0,
    unit: productData.unit?.trim() || null,
    in_stock: productData.in_stock ? parseInt(productData.in_stock) : null,
    description: productData.description?.trim() || null,
    description_sv: productData.description_sv?.trim() || null
  };
};

module.exports = {
  validateProduct,
  validateProductField,
  sanitizeProductData
};
