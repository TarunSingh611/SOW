const ProductService = require('../services/ProductService');
const { asyncHandler } = require('../utils/errorHandler');

/**
 * Product Controller
 * Handles HTTP requests for product operations
 */
class ProductController {
  /**
   * Get all products
   * @param {Object} request - Fastify request object
   * @param {Object} reply - Fastify reply object
   */
  async getAllProducts(request, reply) {
    const result = await ProductService.getAllProducts();
    return reply.send(result);
  }

  /**
   * Get product by ID
   * @param {Object} request - Fastify request object
   * @param {Object} reply - Fastify reply object
   */
  async getProductById(request, reply) {
    const { id } = request.params;
    const product = await ProductService.getProductById(parseInt(id));
    return reply.send({ product });
  }

  /**
   * Create new product
   * @param {Object} request - Fastify request object
   * @param {Object} reply - Fastify reply object
   */
  async createProduct(request, reply) {
    const productData = request.body;
    const product = await ProductService.createProduct(productData);
    return reply.code(201).send(product);
  }

  /**
   * Update product
   * @param {Object} request - Fastify request object
   * @param {Object} reply - Fastify reply object
   */
  async updateProduct(request, reply) {
    const { id } = request.params;
    const productData = request.body;
    const product = await ProductService.updateProduct(parseInt(id), productData);
    return reply.send({ product });
  }

  /**
   * Update single product field
   * @param {Object} request - Fastify request object
   * @param {Object} reply - Fastify reply object
   */
  async updateProductField(request, reply) {
    const { id } = request.params;
    const { field, value } = request.body;
    const product = await ProductService.updateProductField(parseInt(id), field, value);
    return reply.send({ product });
  }

  /**
   * Delete product
   * @param {Object} request - Fastify request object
   * @param {Object} reply - Fastify reply object
   */
  async deleteProduct(request, reply) {
    const { id } = request.params;
    await ProductService.deleteProduct(parseInt(id));
    return reply.code(204).send();
  }

  /**
   * Search products
   * @param {Object} request - Fastify request object
   * @param {Object} reply - Fastify reply object
   */
  async searchProducts(request, reply) {
    const { articleNo, name } = request.query;
    const searchCriteria = {};
    
    if (articleNo) searchCriteria.articleNo = articleNo;
    if (name) searchCriteria.name = name;
    
    const result = await ProductService.searchProducts(searchCriteria);
    return reply.send(result);
  }

  /**
   * Get product statistics
   * @param {Object} request - Fastify request object
   * @param {Object} reply - Fastify reply object
   */
  async getProductStats(request, reply) {
    const stats = await ProductService.getProductStats();
    return reply.send(stats);
  }

  /**
   * Bulk update products
   * @param {Object} request - Fastify request object
   * @param {Object} reply - Fastify reply object
   */
  async bulkUpdateProducts(request, reply) {
    const { updates } = request.body;
    const results = await ProductService.bulkUpdateProducts(updates);
    return reply.send({ results });
  }
}

// Create controller instance
const productController = new ProductController();

// Export wrapped methods with error handling
module.exports = {
  getAllProducts: asyncHandler(productController.getAllProducts.bind(productController)),
  getProductById: asyncHandler(productController.getProductById.bind(productController)),
  createProduct: asyncHandler(productController.createProduct.bind(productController)),
  updateProduct: asyncHandler(productController.updateProduct.bind(productController)),
  updateProductField: asyncHandler(productController.updateProductField.bind(productController)),
  deleteProduct: asyncHandler(productController.deleteProduct.bind(productController)),
  searchProducts: asyncHandler(productController.searchProducts.bind(productController)),
  getProductStats: asyncHandler(productController.getProductStats.bind(productController)),
  bulkUpdateProducts: asyncHandler(productController.bulkUpdateProducts.bind(productController))
};
