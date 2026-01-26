const request = require('supertest');
const express = require('express');
const errorHandler = require('../src/middleware/errorHandler');

// Mock logger to reduce test noise
jest.mock('../src/utils/logger', () => ({
  error: jest.fn(),
  warn: jest.fn()
}));

// Create express app for testing error handler
const app = express();

// Create a route that throws specific errors for testing
app.get('/cast-error', (req, res, next) => {
  const error = new Error('Cast error');
  error.name = 'CastError';
  error.value = 'invalid-id';
  next(error);
});

app.get('/duplicate-error', (req, res, next) => {
  const error = new Error('Duplicate error');
  error.code = 11000;
  error.keyValue = { email: 'test@example.com' };
  next(error);
});

app.get('/validation-error', (req, res, next) => {
  const error = new Error('Validation error');
  error.name = 'ValidationError';
  error.errors = {
    email: { message: 'Invalid email' },
    password: { message: 'Password too short' }
  };
  next(error);
});

app.get('/jwt-error', (req, res, next) => {
  const error = new Error('JWT error');
  error.name = 'JsonWebTokenError';
  next(error);
});

app.get('/token-expired', (req, res, next) => {
  const error = new Error('Token expired');
  error.name = 'TokenExpiredError';
  next(error);
});

app.get('/generic-error', (req, res, next) => {
  const error = new Error('Generic error');
  error.statusCode = 500;
  next(error);
});

// Use the error handler middleware
app.use(errorHandler);

describe('Error Handler Middleware', () => {
  it('should handle CastError', async () => {
    const response = await request(app)
      .get('/cast-error')
      .expect(400);

    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('message', 'Resource not found');
  });

  it('should handle duplicate key error', async () => {
    const response = await request(app)
      .get('/duplicate-error')
      .expect(400);

    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('message', 'Duplicate field value entered');
  });

  it('should handle validation error', async () => {
    const response = await request(app)
      .get('/validation-error')
      .expect(400);

    expect(response.body).toHaveProperty('success', false);
    expect(Array.isArray(response.body.message)).toBe(true);
    expect(response.body.message).toContain('Invalid email');
    expect(response.body.message).toContain('Password too short');
  });

  it('should handle JWT error', async () => {
    const response = await request(app)
      .get('/jwt-error')
      .expect(401);

    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('message', 'Not authorized, token failed');
  });

  it('should handle token expired error', async () => {
    const response = await request(app)
      .get('/token-expired')
      .expect(401);

    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('message', 'Not authorized, token expired');
  });

  it('should handle generic errors', async () => {
    const response = await request(app)
      .get('/generic-error')
      .expect(500);

    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('message', 'Generic error');
  });

  it('should handle unknown routes', async () => {
    const response = await request(app)
      .get('/unknown-error')
      .expect(404);

    // Express returns HTML for 404 by default, so we just check status
    expect(response.status).toBe(404);
  });
});