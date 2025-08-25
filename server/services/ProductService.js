const ProductRepository = require('../repositories/ProductRepository');
const { validateProduct, validateProductField, sanitizeProductData } = require('../utils/validation');
const { handleValidationError } = require('../utils/errorHandler');

/**
 * Product Service
 * Handles business logic for product operations
 */
class ProductService {
  /**
   * Get all products
   * @returns {Promise<Object>} Products with metadata
   */
  async getAllProducts() {
    try {
      const products = await ProductRepository.findAll();
      const count = await ProductRepository.count();
      
      return {
        products,
        count,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get product by ID
   * @param {number} id - Product ID
   * @returns {Promise<Object>} Product
   */
  async getProductById(id) {
    try {
      return await ProductRepository.findById(id);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Create new product
   * @param {Object} productData - Product data
   * @returns {Promise<Object>} Created product
   */
  async createProduct(productData) {
    try {
      // Validate product data
      const validation = validateProduct(productData);
      if (!validation.isValid) {
        throw handleValidationError(validation.errors);
      }

      // Sanitize product data
      const sanitizedData = sanitizeProductData(productData);

      // Create product
      const product = await ProductRepository.create(sanitizedData);
      
      return product;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update product
   * @param {number} id - Product ID
   * @param {Object} productData - Product data
   * @returns {Promise<Object>} Updated product
   */
  async updateProduct(id, productData) {
    try {
      // Validate product data
      const validation = validateProduct(productData);
      if (!validation.isValid) {
        throw handleValidationError(validation.errors);
      }

      // Sanitize product data
      const sanitizedData = sanitizeProductData(productData);

      // Update product
      const product = await ProductRepository.update(id, sanitizedData);
      
      return product;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update single product field
   * @param {number} id - Product ID
   * @param {string} field - Field name
   * @param {any} value - Field value
   * @returns {Promise<Object>} Updated product
   */
  async updateProductField(id, field, value) {
    try {
      // Validate field update
      const validation = validateProductField(field, value);
      if (!validation.isValid) {
        throw handleValidationError(validation.errors);
      }

      // Sanitize value based on field type
      let sanitizedValue = value;
      if (field === 'price' || field === 'in_price') {
        sanitizedValue = value ? parseFloat(value) : null;
      } else if (field === 'in_stock') {
        sanitizedValue = value ? parseInt(value) : null;
      } else if (typeof value === 'string') {
        sanitizedValue = value.trim() || null;
      }

      // Update product field
      const product = await ProductRepository.updateField(id, field, sanitizedValue);
      
      return product;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Delete product
   * @param {number} id - Product ID
   * @returns {Promise<boolean>} Success status
   */
  async deleteProduct(id) {
    try {
      return await ProductRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Search products
   * @param {Object} searchCriteria - Search criteria
   * @returns {Promise<Object>} Search results with metadata
   */
  async searchProducts(searchCriteria) {
    try {
      const products = await ProductRepository.findBySearch(searchCriteria);
      const count = products.length;
      
      return {
        products,
        count,
        searchCriteria,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get product statistics
   * @returns {Promise<Object>} Product statistics
   */
  async getProductStats() {
    try {
      const totalProducts = await ProductRepository.count();
      const products = await ProductRepository.findAll();
      
      // Calculate statistics
      const totalValue = products.reduce((sum, product) => {
        return sum + (product.price * (product.in_stock || 0));
      }, 0);

      const averagePrice = products.length > 0 
        ? products.reduce((sum, product) => sum + product.price, 0) / products.length 
        : 0;

      const inStockProducts = products.filter(product => product.in_stock > 0).length;
      
      return {
        totalProducts,
        totalValue: parseFloat(totalValue.toFixed(2)),
        averagePrice: parseFloat(averagePrice.toFixed(2)),
        inStockProducts,
        outOfStockProducts: totalProducts - inStockProducts,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Bulk update products
   * @param {Array} updates - Array of update objects
   * @returns {Promise<Array>} Updated products
   */
  async bulkUpdateProducts(updates) {
    try {
      const results = [];
      
      for (const update of updates) {
        try {
          const { id, field, value } = update;
          const product = await this.updateProductField(id, field, value);
          results.push({ success: true, product });
        } catch (error) {
          results.push({ 
            success: false, 
            id: update.id, 
            error: error.message 
          });
        }
      }
      
      return results;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new ProductService();
