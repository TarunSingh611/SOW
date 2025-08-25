const ProductController = require('../controllers/ProductController');

/**
 * Product routes
 * @param {Object} fastify - Fastify instance
 * @param {Object} options - Route options
 */
async function productRoutes(fastify, options) {
  // Get all products
  fastify.get('/', ProductController.getAllProducts);

  // Get product by ID
  fastify.get('/:id', ProductController.getProductById);

  // Create new product
  fastify.post('/', ProductController.createProduct);

  // Update entire product
  fastify.put('/:id', ProductController.updateProduct);

  // Update single product field
  fastify.patch('/:id', ProductController.updateProductField);

  // Delete product
  fastify.delete('/:id', ProductController.deleteProduct);

  // Search products
  fastify.get('/search', ProductController.searchProducts);

  // Get product statistics
  fastify.get('/stats', ProductController.getProductStats);

  // Bulk update products
  fastify.post('/bulk-update', ProductController.bulkUpdateProducts);
}

module.exports = productRoutes;
