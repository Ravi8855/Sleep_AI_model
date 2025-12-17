const request = require('supertest');
const express = require('express');
const sleepRoutes = require('../src/routes/sleep');
const SleepLog = require('../src/models/SleepLog');
const getPrediction = require('../src/services/predictService');

// Mock dependencies
jest.mock('../src/models/SleepLog');
jest.mock('../src/services/predictService');

// Mock auth middleware
jest.mock('../src/middleware/auth', () => (req, res, next) => {
  req.user = { id: 'test-user-id' };
  next();
});

// Mock validation middleware
jest.mock('../src/middleware/validation', () => ({
  sleepLogValidationRules: () => (req, res, next) => next(),
  validate: (req, res, next) => next()
}));

// Create express app for testing
const app = express();
app.use(express.json());
app.use('/api/sleep', sleepRoutes);

describe('Sleep Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/sleep/add', () => {
    it('should add a sleep log successfully', async () => {
      const mockSleepData = {
        duration: 7.5,
        awakenings: 1,
        stress: 3,
        caffeine: 100,
        screenTime: 60,
        exercise: 30,
        mood: 7
      };

      const mockPrediction = {
        sleep_score: 85.5,
        model: 'random_forest'
      };

      const mockSavedLog = {
        id: 'log123',
        userId: 'test-user-id',
        ...mockSleepData,
        prediction: mockPrediction,
        date: new Date()
      };

      getPrediction.mockResolvedValue(mockPrediction);
      const mockSleepLogInstance = {
        save: jest.fn().mockResolvedValue(mockSavedLog)
      };
      SleepLog.mockImplementation(() => mockSleepLogInstance);

      const response = await request(app)
        .post('/api/sleep/add')
        .send(mockSleepData)
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(getPrediction).toHaveBeenCalledWith({
        duration: 7.5,
        awakenings: 1,
        stress: 3,
        caffeine: 100,
        screen_time: 60,
        exercise: 30,
        mood: 7
      });
      expect(SleepLog.prototype.save).toHaveBeenCalled();
    });

    it('should return error when prediction service fails', async () => {
      const mockSleepData = {
        duration: 7.5,
        awakenings: 1,
        stress: 3,
        caffeine: 100,
        screenTime: 60,
        exercise: 30,
        mood: 7
      };

      getPrediction.mockRejectedValue(new Error('Prediction service error'));

      const response = await request(app)
        .post('/api/sleep/add')
        .send(mockSleepData)
        .expect(500);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('message', 'Failed to save sleep log');
    });

    it('should return error when database save fails', async () => {
      const mockSleepData = {
        duration: 7.5,
        awakenings: 1,
        stress: 3,
        caffeine: 100,
        screenTime: 60,
        exercise: 30,
        mood: 7
      };

      const mockPrediction = {
        sleep_score: 85.5,
        model: 'random_forest'
      };

      getPrediction.mockResolvedValue(mockPrediction);
      SleepLog.prototype.save = jest.fn().mockRejectedValue(new Error('Database error'));

      const response = await request(app)
        .post('/api/sleep/add')
        .send(mockSleepData)
        .expect(500);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('message', 'Failed to save sleep log');
    });
  });
});