const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  article_no: {
    type: DataTypes.STRING,
    allowNull: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name_sv: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Swedish name for the product'
  },
  in_price: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: true,
    defaultValue: 0.00
  },
  price: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false,
    defaultValue: 0.00
  },
  unit: {
    type: DataTypes.STRING,
    allowNull: true
  },
  in_stock: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  description_sv: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Swedish description for the product'
  }
}, {
  tableName: 'products',
  timestamps: true,
  indexes: [
    { fields: ['article_no'] },
    { fields: ['name'] }
  ]
});

module.exports = Product;
