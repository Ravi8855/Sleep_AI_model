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
    userId: req.user ? req.user.id : 'Not authenticated'
  });
  
  // Capture response data
  const start = Date.now();
  
  // Override res.end to capture response details
  const oldWrite = res.write;
  const oldEnd = res.end;
  let chunks = [];
  
  res.write = function(chunk) {
    chunks.push(chunk);
    return oldWrite.apply(res, arguments);
  };
  
  res.end = function(chunk) {
    if (chunk) {
      chunks.push(chunk);
    }
    
    const duration = Date.now() - start;
    
    // Try to parse response body for logging
    let responseBody = {};
    try {
      const body = Buffer.concat(chunks).toString('utf8');
      if (body && body.startsWith('{')) {
        responseBody = JSON.parse(body);
      }
    } catch (e) {
      // Ignore parsing errors
    }
    
    // Log response
    logger.info('Outgoing response', {
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      userId: req.user ? req.user.id : 'Not authenticated',
      responseSize: Buffer.concat(chunks).length
    });
    
    // Restore original methods
    res.write = oldWrite;
    res.end = oldEnd;
    
    // Continue with original end
    return oldEnd.apply(res, arguments);
  };
  
  next();
};

module.exports = requestLogger;