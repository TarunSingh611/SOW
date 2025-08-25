const Product = require('../database/models/Product');
const { handleDatabaseError, handleNotFoundError } = require('../utils/errorHandler');

/**
 * Product Repository
 * Handles all database operations for products
 */
class ProductRepository {
  /**
   * Get all products
   * @returns {Promise<Array>} Array of products
   */
  async findAll() {
    try {
      return await Product.findAll({
        order: [['id', 'ASC']]
      });
    } catch (error) {
      throw handleDatabaseError(error);
    }
  }

  /**
   * Find product by ID
   * @param {number} id - Product ID
   * @returns {Promise<Object|null>} Product or null
   */
  async findById(id) {
    try {
      const product = await Product.findByPk(id);
      if (!product) {
        throw handleNotFoundError('Product', id);
      }
      return product;
    } catch (error) {
      if (error.name === 'APIError') {
        throw error;
      }
      throw handleDatabaseError(error);
    }
  }

  /**
   * Create new product
   * @param {Object} productData - Product data
   * @returns {Promise<Object>} Created product
   */
  async create(productData) {
    try {
      return await Product.create(productData);
    } catch (error) {
      throw handleDatabaseError(error);
    }
  }

  /**
   * Update product by ID
   * @param {number} id - Product ID
   * @param {Object} productData - Product data
   * @returns {Promise<Object>} Updated product
   */
  async update(id, productData) {
    try {
      const product = await this.findById(id);
      await product.update(productData);
      await product.reload();
      return product;
    } catch (error) {
      if (error.name === 'APIError') {
        throw error;
      }
      throw handleDatabaseError(error);
    }
  }

  /**
   * Update single field of product
   * @param {number} id - Product ID
   * @param {string} field - Field name
   * @param {any} value - Field value
   * @returns {Promise<Object>} Updated product
   */
  async updateField(id, field, value) {
    try {
      const product = await this.findById(id);
      await product.update({ [field]: value });
      await product.reload();
      return product;
    } catch (error) {
      if (error.name === 'APIError') {
        throw error;
      }
      throw handleDatabaseError(error);
    }
  }

  /**
   * Delete product by ID
   * @param {number} id - Product ID
   * @returns {Promise<boolean>} Success status
   */
  async delete(id) {
    try {
      const product = await this.findById(id);
      await product.destroy();
      return true;
    } catch (error) {
      if (error.name === 'APIError') {
        throw error;
      }
      throw handleDatabaseError(error);
    }
  }

  /**
   * Find products by search criteria
   * @param {Object} searchCriteria - Search criteria
   * @returns {Promise<Array>} Array of matching products
   */
  async findBySearch(searchCriteria) {
    try {
      const { Op } = require('sequelize');
      const whereClause = {};

      if (searchCriteria.articleNo) {
        whereClause.article_no = {
          [Op.iLike]: `%${searchCriteria.articleNo}%`
        };
      }

      if (searchCriteria.name) {
        whereClause[Op.or] = [
          { name: { [Op.iLike]: `%${searchCriteria.name}%` } },
          { name_sv: { [Op.iLike]: `%${searchCriteria.name}%` } },
          { description: { [Op.iLike]: `%${searchCriteria.name}%` } },
          { description_sv: { [Op.iLike]: `%${searchCriteria.name}%` } }
        ];
      }

      return await Product.findAll({
        where: whereClause,
        order: [['id', 'ASC']]
      });
    } catch (error) {
      throw handleDatabaseError(error);
    }
  }

  /**
   * Count total products
   * @returns {Promise<number>} Total count
   */
  async count() {
    try {
      return await Product.count();
    } catch (error) {
      throw handleDatabaseError(error);
    }
  }
}

module.exports = new ProductRepository();
