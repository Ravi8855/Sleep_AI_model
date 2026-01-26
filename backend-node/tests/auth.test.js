const request = require('supertest');
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const authRoutes = require('../src/routes/auth');
const User = require('../src/models/User');

// Mock User model
jest.mock('../src/models/User');

// Create express app for testing
const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);

describe('Auth Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user successfully', async () => {
      const mockUserData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      };

      User.findOne.mockResolvedValue(null);
      User.prototype.save = jest.fn().mockResolvedValue({
        id: 'user123',
        ...mockUserData,
        password: 'hashedPassword'
      });

      bcrypt.hash = jest.fn().mockResolvedValue('hashedPassword');

      const response = await request(app)
        .post('/api/auth/register')
        .send(mockUserData)
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('token');
      expect(User.findOne).toHaveBeenCalledWith({ email: mockUserData.email });
      expect(bcrypt.hash).toHaveBeenCalledWith(mockUserData.password, 10);
    });

    it('should return error if user already exists', async () => {
      const mockUserData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      };

      User.findOne.mockResolvedValue({ email: mockUserData.email });

      const response = await request(app)
        .post('/api/auth/register')
        .send(mockUserData)
        .expect(400);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('message', 'User already exists');
    });

    it('should return validation errors for invalid input', async () => {
      const invalidData = {
        name: 'T',
        email: 'invalid-email',
        password: '123'
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(invalidData)
        .expect(400);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('message', 'Validation failed');
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login user successfully', async () => {
      const mockUserData = {
        id: 'user123',
        email: 'test@example.com',
        password: 'hashedPassword'
      };

      User.findOne.mockResolvedValue(mockUserData);
      bcrypt.compare = jest.fn().mockResolvedValue(true);
      jwt.sign = jest.fn().mockReturnValue('fake-jwt-token');

      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password123'
        })
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('token');
      expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
      expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword');
      expect(jwt.sign).toHaveBeenCalled();
    });

    it('should return error for invalid credentials', async () => {
      User.findOne.mockResolvedValue(null);

      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'password123'
        })
        .expect(400);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('message', 'Invalid credentials');
    });

    it('should return error for wrong password', async () => {
      const mockUserData = {
        id: 'user123',
        email: 'test@example.com',
        password: 'hashedPassword'
      };

      User.findOne.mockResolvedValue(mockUserData);
      bcrypt.compare = jest.fn().mockResolvedValue(false);

      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'wrongpassword'
        })
        .expect(400);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('message', 'Invalid credentials');
    });
  });
});