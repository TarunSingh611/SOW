const fastify = require('fastify')({ logger: true });
const path = require('path');
const { globalErrorHandler } = require('./utils/errorHandler');
const { sequelize, testConnection } = require('./database/config');
require('dotenv').config();

// Use environment variable for port with fallback
const PORT = process.env.PORT || 3001;

// Register global error handler
fastify.setErrorHandler(globalErrorHandler);

// Register CORS
fastify.register(require('@fastify/cors'), {
  origin: true,
  credentials: true
});

// Register routes
fastify.register(require('./routes/pricelist'), { prefix: '/api/pricelist' });

// Health check endpoint with database status
fastify.get('/health', async (request, reply) => {
  try {
    // Test database connection
    await sequelize.authenticate();
    return { 
      status: 'OK', 
      timestamp: new Date().toISOString(),
      database: 'connected'
    };
  } catch (error) {
    request.log.error('Health check failed:', error);
    return reply.status(503).send({ 
      status: 'ERROR', 
      timestamp: new Date().toISOString(),
      database: 'disconnected',
      error: error.message
    });
  }
});

// Serve static files and handle client-side routing
fastify.get('/*', async (request, reply) => {
  // Skip API routes
  if (request.url.startsWith('/api/') || request.url.startsWith('/health')) {
    return reply.callNotFound();
  }
  
  const fs = require('fs');
  const requestedPath = request.url;
  const publicPath = path.join(__dirname, 'public', requestedPath);
  
  // Check if the requested file exists
  if (fs.existsSync(publicPath) && fs.statSync(publicPath).isFile()) {
    // Serve the static file
    const content = fs.readFileSync(publicPath);
    const ext = path.extname(publicPath);
    
    // Set appropriate content type
    const contentType = {
      '.html': 'text/html',
      '.css': 'text/css',
      '.js': 'application/javascript',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.gif': 'image/gif',
      '.svg': 'image/svg+xml',
      '.ico': 'image/x-icon'
    }[ext] || 'application/octet-stream';
    
    return reply.type(contentType).send(content);
  } else {
    // Serve index.html for client-side routing
    const indexPath = path.join(__dirname, 'public', 'index.html');
    
    if (fs.existsSync(indexPath)) {
      const content = fs.readFileSync(indexPath, 'utf8');
      return reply.type('text/html').send(content);
    } else {
      return reply.status(404).send({ error: 'index.html not found' });
    }
  }
});

const start = async () => {
  try {
    // Test database connection with retry logic
    await testConnection();

    // Sync database models (in development)
    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ alter: true });
      console.log('Database models synchronized.');
    }

    // Start the server
    await fastify.listen({ port: PORT, host: '0.0.0.0' });
    console.log(`Server is running on http://localhost:${PORT}`);
  } catch (err) {
    fastify.log.error('Failed to start server:', err);
    process.exit(1);
  }
};

// Graceful shutdown handling
const gracefulShutdown = async (signal) => {
  console.log(`Received ${signal}. Starting graceful shutdown...`);
  
  try {
    // Close Fastify server
    await fastify.close();
    console.log('Fastify server closed.');
    
    // Close database connection
    await sequelize.close();
    console.log('Database connection closed.');
    
    console.log('Graceful shutdown completed.');
    process.exit(0);
  } catch (error) {
    console.error('Error during graceful shutdown:', error);
    process.exit(1);
  }
};

// Handle different shutdown signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  gracefulShutdown('uncaughtException');
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  gracefulShutdown('unhandledRejection');
});

start();
