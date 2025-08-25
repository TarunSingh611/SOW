import { ProductsAPI } from '../api/products.js';
import { throttle, debounce } from '../utils/throttle.js';
import { formatPrice } from '../utils/formatters.js';

/**
 * Product Service
 * Handles business logic for product operations
 */
export class ProductService {
  constructor() {
    // Initialize throttled functions
    this.throttledFetch = throttle(this._fetchProducts.bind(this), 1000);
    this.throttledSave = throttle(this._saveProductField.bind(this), 500);
    this.throttledAdd = throttle(this._addProduct.bind(this), 1000);
    this.throttledEdit = throttle(this._editProduct.bind(this), 1000);
    this.throttledDelete = throttle(this._deleteProduct.bind(this), 1000);
    this.throttledPrint = throttle(this._print.bind(this), 1000);
    
    // Initialize debounced functions
    this.debouncedSearch = debounce(this._filterProducts.bind(this), 300);
  }

  /**
   * Fetch products with loading state management
   * @param {Function} setLoading - Loading state setter
   * @param {Function} setError - Error state setter
   * @returns {Promise<Array>} Array of products
   */
  async fetchProducts(setLoading, setError) {
    try {
      setLoading(true);
      setError(null);
      return await this.throttledFetch();
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  /**
   * Save product field with optimistic updates
   * @param {number} productId - Product ID
   * @param {string} field - Field name
   * @param {any} value - New value
   * @param {Function} setProducts - Products state setter
   * @returns {Promise<void>}
   */
  async saveProductField(productId, field, value, setProducts) {
    try {
      // Optimistic update
      setProducts(prevProducts => 
        prevProducts.map(product => 
          product.id === productId 
            ? { ...product, [field]: value }
            : product
        )
      );

      await this.throttledSave(productId, field, value);
    } catch (error) {
      // Revert optimistic update on error
      await this.refreshProducts(setProducts);
      throw error;
    }
  }

  /**
   * Add new product
   * @param {Object} productData - Product data
   * @param {Function} setProducts - Products state setter
   * @returns {Promise<Object>} Created product
   */
  async addProduct(productData, setProducts) {
    try {
      const addedProduct = await this.throttledAdd(productData);
      setProducts(prevProducts => [...prevProducts, addedProduct]);
      return addedProduct;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Edit product
   * @param {number} productId - Product ID
   * @param {Object} productData - Product data
   * @param {Function} setProducts - Products state setter
   * @returns {Promise<void>}
   */
  async editProduct(productId, productData, setProducts) {
    try {
      await this.throttledEdit(productId, productData);
      setProducts(prevProducts => 
        prevProducts.map(product => 
          product.id === productId 
            ? { ...product, ...productData }
            : product
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * Delete product
   * @param {number} productId - Product ID
   * @param {Function} setProducts - Products state setter
   * @returns {Promise<void>}
   */
  async deleteProduct(productId, setProducts) {
    try {
      await this.throttledDelete(productId);
      setProducts(prevProducts => 
        prevProducts.filter(product => product.id !== productId)
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * Filter products based on search criteria
   * @param {Array} products - All products
   * @param {string} searchArticleNo - Article number search
   * @param {string} searchProduct - Product name search
   * @returns {Array} Filtered products
   */
  filterProducts(products, searchArticleNo, searchProduct) {
    // For immediate filtering, use the direct method
    // Debounced search is only for search input changes
    return this._filterProducts(products, searchArticleNo, searchProduct);
  }

  /**
   * Print pricelist
   */
  printPricelist() {
    this.throttledPrint();
  }

  /**
   * Refresh products cache and data
   * @param {Function} setProducts - Products state setter
   * @returns {Promise<void>}
   */
  async refreshProducts(setProducts) {
    try {
      ProductsAPI.clearCache();
      const products = await this.throttledFetch();
      setProducts(products);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Format product data for display
   * @param {Object} product - Product object
   * @param {string} language - Current language
   * @returns {Object} Formatted product
   */
  formatProductForDisplay(product, language) {
    return {
      ...product,
      displayName: language === 'sv' && product.name_sv ? product.name_sv : product.name,
      displayDescription: language === 'sv' && product.description_sv ? product.description_sv : product.description,
      formattedPrice: formatPrice(product.price),
      formattedInPrice: formatPrice(product.in_price)
    };
  }

  // Private methods for throttled operations
  async _fetchProducts() {
    return await ProductsAPI.fetchProducts();
  }

  async _saveProductField(productId, field, value) {
    return await ProductsAPI.updateProductField(productId, field, value);
  }

  async _addProduct(productData) {
    return await ProductsAPI.createProduct(productData);
  }

  async _editProduct(productId, productData) {
    return await ProductsAPI.updateProduct(productId, productData);
  }

  async _deleteProduct(productId) {
    return await ProductsAPI.deleteProduct(productId);
  }

  _print() {
    window.print();
  }

  _filterProducts(products, searchArticleNo, searchProduct) {
    let filtered = products;

    if (searchArticleNo.trim()) {
      filtered = filtered.filter(product => 
        product.article_no?.toLowerCase().includes(searchArticleNo.toLowerCase())
      );
    }

    if (searchProduct.trim()) {
      filtered = filtered.filter(product => 
        product.name?.toLowerCase().includes(searchProduct.toLowerCase()) ||
        product.name_sv?.toLowerCase().includes(searchProduct.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchProduct.toLowerCase()) ||
        product.description_sv?.toLowerCase().includes(searchProduct.toLowerCase())
      );
    }

    return filtered;
  }
}

// Export singleton instance
export const productService = new ProductService();
