const { Sequelize } = require('sequelize');
require('dotenv').config();

// Use environment variable for database URL with fallback
const DATABASE_URL = process.env.DATABASE_URL;

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: 'postgres',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    },
    // Add connection timeout
    connectTimeout: 60000,
    // Add query timeout
    query_timeout: 30000
  },
  pool: {
    max: 10, // Increased from 5
    min: 2,  // Increased from 0
    acquire: 60000, // Increased from 30000
    idle: 30000,    // Increased from 10000
    // Add eviction settings
    evict: 60000,
    // Add validation query
    validate: async (connection) => {
      try {
        await connection.query('SELECT 1');
        return true;
      } catch (error) {
        return false;
      }
    }
  },
  // Add retry configuration
  retry: {
    max: 3,
    backoffBase: 1000,
    backoffExponent: 1.5
  },
  // Add hooks for connection management
  hooks: {
    beforeConnect: async (config) => {
      console.log('Attempting database connection...');
    },
    afterConnect: async (connection) => {
      console.log('Database connection established');
    },
    beforeDisconnect: async (connection) => {
      console.log('Disconnecting from database...');
    }
  }
});

// Test connection function with retry logic
const testConnection = async (maxRetries = 5) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      await sequelize.authenticate();
      console.log('Database connection test successful');
      return true;
    } catch (error) {
      console.error(`Database connection attempt ${i + 1} failed:`, error.message);
      if (i === maxRetries - 1) {
        throw error;
      }
      // Wait before retrying (exponential backoff)
      const delay = Math.pow(2, i) * 1000;
      console.log(`Retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
};

module.exports = { sequelize, testConnection };
