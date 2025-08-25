import { apiCache } from '../utils/cache.js';

// Environment-based API configuration
// Development: Use VITE_API_BASE_URL from .env
// Production: Empty VITE_API_BASE_URL = relative URLs (works with any domain)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
const API_ENDPOINT = `${API_BASE_URL}/api/pricelist`;

/**
 * Products API service
 * Handles all product-related API calls with caching and error handling
 */
export class ProductsAPI {
  /**
   * Fetch all products
   * @returns {Promise<Array>} Array of products
   */
  static async fetchProducts() {
    try {
      const cacheKey = 'products';
      const cachedData = apiCache.get(cacheKey);
      
      if (cachedData) {
        return cachedData;
      }

      const response = await fetch(API_ENDPOINT);
      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      const products = data.products || [];
      
      // Cache the result
      apiCache.set(cacheKey, products);
      return products;
    } catch (error) {
      console.error('Error fetching products:', error);
      // Return empty array as fallback instead of throwing
      return [];
    }
  }

  /**
   * Update a single product field
   * @param {number} productId - Product ID
   * @param {string} field - Field name to update
   * @param {any} value - New value
   * @returns {Promise<Object>} Updated product
   */
  static async updateProductField(productId, field, value) {
    try {
      const response = await fetch(`${API_ENDPOINT}/${productId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          field: field,
          value: value
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update product: ${response.status} ${response.statusText}`);
      }

      // Invalidate cache
      apiCache.invalidate('products');
      
      const result = await response.json();
      return result.product || result;
    } catch (error) {
      console.error('Error updating product field:', error);
      throw error;
    }
  }

  /**
   * Create a new product
   * @param {Object} productData - Product data
   * @returns {Promise<Object>} Created product
   */
  static async createProduct(productData) {
    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error(`Failed to create product: ${response.status} ${response.statusText}`);
      }

      // Invalidate cache
      apiCache.invalidate('products');
      
      const result = await response.json();
      return result.product || result;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }

  /**
   * Update entire product
   * @param {number} productId - Product ID
   * @param {Object} productData - Complete product data
   * @returns {Promise<Object>} Updated product
   */
  static async updateProduct(productId, productData) {
    try {
      const response = await fetch(`${API_ENDPOINT}/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error(`Failed to update product: ${response.status} ${response.statusText}`);
      }

      // Invalidate cache
      apiCache.invalidate('products');
      
      const result = await response.json();
      return result.product || result;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  }

  /**
   * Delete product
   * @param {number} productId - Product ID
   * @returns {Promise<void>}
   */
  static async deleteProduct(productId) {
    try {
      const response = await fetch(`${API_ENDPOINT}/${productId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Failed to delete product: ${response.status} ${response.statusText}`);
      }

      // Invalidate cache
      apiCache.invalidate('products');
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }

  /**
   * Search products
   * @param {Object} searchCriteria - Search criteria
   * @returns {Promise<Array>} Array of matching products
   */
  static async searchProducts(searchCriteria) {
    try {
      const params = new URLSearchParams();
      if (searchCriteria.articleNo) params.append('articleNo', searchCriteria.articleNo);
      if (searchCriteria.name) params.append('name', searchCriteria.name);

      const response = await fetch(`${API_ENDPOINT}/search?${params}`);
      if (!response.ok) {
        throw new Error(`Failed to search products: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      return data.products || [];
    } catch (error) {
      console.error('Error searching products:', error);
      return [];
    }
  }

  /**
   * Get product statistics
   * @returns {Promise<Object>} Product statistics
   */
  static async getProductStats() {
    try {
      const response = await fetch(`${API_ENDPOINT}/stats`);
      if (!response.ok) {
        throw new Error(`Failed to get product stats: ${response.status} ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error getting product stats:', error);
      return { count: 0, totalValue: 0 };
    }
  }

  /**
   * Clear API cache
   */
  static clearCache() {
    apiCache.clear();
  }
}
