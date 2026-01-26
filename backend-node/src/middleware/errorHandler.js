const logger = require('../utils/logger');

// Centralized error handling middleware
const errorHandler = (err, req, res, next) => {
  // Log the error with request context
  logger.error('Unhandled error occurred', {
    error: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    userId: req.user ? req.user.id : 'Not authenticated'
  });
  
  // Also log to console for debugging
  console.error('UNHANDLED ERROR:', err.message);
  console.error('STACK:', err.stack);
  
  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    logger.warn('Invalid ObjectId', { 
      id: err.value, 
      url: req.originalUrl 
    });
    return res.status(400).json({
      success: false,
      message: 'Resource not found'
    });
  }
  
  // Mongoose duplicate key
  if (err.code === 11000) {
    logger.warn('Duplicate key error', { 
      keyValue: err.keyValue, 
      url: req.originalUrl 
    });
    return res.status(400).json({
      success: false,
      message: 'Duplicate field value entered'
    });
  }
  
  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    logger.warn('Validation error', { 
      errors: message, 
      url: req.originalUrl 
    });
    return res.status(400).json({
      success: false,
      message: message
    });
  }
  
  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    logger.warn('Invalid JWT token', { 
      url: req.originalUrl 
    });
    return res.status(401).json({
      success: false,
      message: 'Not authorized, token failed'
    });
  }
  
  if (err.name === 'TokenExpiredError') {
    logger.warn('Expired JWT token', { 
      url: req.originalUrl 
    });
    return res.status(401).json({
      success: false,
      message: 'Not authorized, token expired'
    });
  }
  
  // Log unexpected errors
  logger.error('Unexpected server error', {
    error: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method
  });
  
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Server Error'
  });
};

module.exports = errorHandler;