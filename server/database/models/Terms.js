const { DataTypes } = require('sequelize');
const { sequelize } = require('../config');

const TermsSection = sequelize.define('TermsSection', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  lang_code: {
    type: DataTypes.STRING(2),
    allowNull: false
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  sort_order: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
}, {
  tableName: 'terms_sections',
  timestamps: true,
  indexes: [
    {
      fields: ['lang_code', 'sort_order']
    }
  ]
});

module.exports = TermsSection;
