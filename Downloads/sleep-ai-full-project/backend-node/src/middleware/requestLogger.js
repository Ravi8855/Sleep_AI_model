const logger = require('../utils/logger');

// Request logging middleware
const requestLogger = (req, res, next) => {
  // Skip logging for health checks or static assets
  if (req.url.includes('/health') || req.url.includes('/static')) {
    return next();
  }
  
  // Log incoming request
  logger.info('Incoming request', {
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    userId: req.user ? req.user.id : 'Not authenticated',
    body: req.body  // Log request body for debugging
  });
  
  // Capture start time for response duration
  const start = Date.now();
  
  // Override res.end to capture response details
  const oldEnd = res.end;
  
  res.end = function(chunk, encoding) {
    const duration = Date.now() - start;
    
    // Log response
    logger.info('Outgoing response', {
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      userId: req.user ? req.user.id : 'Not authenticated'
    });
    
    // Restore original method and continue
    res.end = oldEnd;
    return res.end(chunk, encoding);
  };
  
  next();
};

module.exports = requestLogger;