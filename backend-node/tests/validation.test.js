const request = require('supertest');
const express = require('express');
const { sleepLogValidationRules, validate } = require('../src/middleware/validation');

// Create express app for testing validation middleware
const app = express();
app.use(express.json());

// Create a test route that uses validation
app.post('/test-validation', sleepLogValidationRules(), validate, (req, res) => {
  res.status(200).json({ success: true, message: 'Validation passed' });
});

describe('Validation Middleware', () => {
  describe('Sleep Log Validation', () => {
    it('should pass validation for valid sleep log data', async () => {
      const validData = {
        duration: 7.5,
        awakenings: 2,
        stress: 5,
        caffeine: 100,
        screenTime: 60,
        exercise: 30,
        mood: 7
      };

      const response = await request(app)
        .post('/test-validation')
        .send(validData)
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('message', 'Validation passed');
    });

    it('should fail validation for invalid duration', async () => {
      const invalidData = {
        duration: 25, // Invalid: should be <= 24
        awakenings: 2,
        stress: 5,
        caffeine: 100,
        screenTime: 60,
        exercise: 30,
        mood: 7
      };

      const response = await request(app)
        .post('/test-validation')
        .send(invalidData)
        .expect(400);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('message', 'Validation failed');
    });

    it('should fail validation for negative awakenings', async () => {
      const invalidData = {
        duration: 7.5,
        awakenings: -1, // Invalid: should be >= 0
        stress: 5,
        caffeine: 100,
        screenTime: 60,
        exercise: 30,
        mood: 7
      };

      const response = await request(app)
        .post('/test-validation')
        .send(invalidData)
        .expect(400);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('message', 'Validation failed');
    });

    it('should fail validation for invalid stress level', async () => {
      const invalidData = {
        duration: 7.5,
        awakenings: 2,
        stress: 15, // Invalid: should be <= 10
        caffeine: 100,
        screenTime: 60,
        exercise: 30,
        mood: 7
      };

      const response = await request(app)
        .post('/test-validation')
        .send(invalidData)
        .expect(400);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('message', 'Validation failed');
    });

    it('should fail validation for missing required fields', async () => {
      const invalidData = {
        duration: 7.5
        // Missing other required fields
      };

      const response = await request(app)
        .post('/test-validation')
        .send(invalidData)
        .expect(400);

      expect(response.body).toHaveProperty('success', false);
    });
  });
});