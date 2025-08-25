/**
 * Error handling utilities for server-side error management
 */

/**
 * Custom error class for API errors
 */
class APIError extends Error {
  constructor(message, statusCode = 500, details = null) {
    super(message);
    this.name = 'APIError';
    this.statusCode = statusCode;
    this.details = details;
  }
}

/**
 * Handle database errors
 * @param {Error} error - Database error
 * @returns {APIError} Formatted API error
 */
const handleDatabaseError = (error) => {
  if (error.name === 'SequelizeValidationError') {
    return new APIError('Validation error', 400, error.errors);
  }
  
  if (error.name === 'SequelizeUniqueConstraintError') {
    return new APIError('Duplicate entry', 409, error.errors);
  }
  
  if (error.name === 'SequelizeForeignKeyConstraintError') {
    return new APIError('Foreign key constraint error', 400, error.message);
  }
  
  return new APIError('Database error', 500, error.message);
};

/**
 * Handle validation errors
 * @param {Array} errors - Validation errors
 * @returns {APIError} Formatted API error
 */
const handleValidationError = (errors) => {
  return new APIError('Validation failed', 400, errors);
};

/**
 * Handle not found errors
 * @param {string} resource - Resource name
 * @param {string} id - Resource ID
 * @returns {APIError} Formatted API error
 */
const handleNotFoundError = (resource, id) => {
  return new APIError(`${resource} with id ${id} not found`, 404);
};

/**
 * Global error handler middleware
 * @param {Error} error - Error object
 * @param {Object} request - Fastify request object
 * @param {Object} reply - Fastify reply object
 */
const globalErrorHandler = (error, request, reply) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Internal server error';
  
  // Log error for debugging
  request.log.error({
    error: error.message,
    stack: error.stack,
    url: request.url,
    method: request.method
  });

  // Send error response
  reply.status(statusCode).send({
    error: message,
    statusCode,
    timestamp: new Date().toISOString(),
    path: request.url
  });
};

/**
 * Async error wrapper for route handlers
 * @param {Function} fn - Route handler function
 * @returns {Function} Wrapped function with error handling
 */
const asyncHandler = (fn) => {
  return async (request, reply) => {
    try {
      return await fn(request, reply);
    } catch (error) {
      if (error instanceof APIError) {
        reply.status(error.statusCode).send({
          error: error.message,
          details: error.details
        });
      } else {
        globalErrorHandler(error, request, reply);
      }
    }
  };
};

module.exports = {
  APIError,
  handleDatabaseError,
  handleValidationError,
  handleNotFoundError,
  globalErrorHandler,
  asyncHandler
};
