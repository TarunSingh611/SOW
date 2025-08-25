const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const Language = sequelize.define('Language', {
  code: {
    type: DataTypes.STRING(2),
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'languages',
  timestamps: false
});

module.exports = Language;
