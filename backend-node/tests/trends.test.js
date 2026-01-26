const request = require('supertest');
const express = require('express');
const trendsRoutes = require('../src/routes/trends');
const SleepLog = require('../src/models/SleepLog');

// Mock dependencies
jest.mock('../src/models/SleepLog');

// Mock auth middleware
jest.mock('../src/middleware/auth', () => (req, res, next) => {
  req.user = { id: 'test-user-id' };
  next();
});

// Create express app for testing
const app = express();
app.use(express.json());
app.use('/api/trends', trendsRoutes);

describe('Trends Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/trends/weekly', () => {
    it('should return weekly trends successfully', async () => {
      const mockSleepLogs = [
        {
          date: new Date('2023-01-01'),
          prediction: { sleep_score: 85 }
        },
        {
          date: new Date('2023-01-02'),
          prediction: { sleep_score: 78 }
        }
      ];

      SleepLog.find = jest.fn().mockReturnValue({
        sort: jest.fn().mockReturnValue({
          limit: jest.fn().mockResolvedValue(mockSleepLogs)
        })
      });

      const response = await request(app)
        .get('/api/trends/weekly')
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data');
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(SleepLog.find).toHaveBeenCalledWith({ userId: 'test-user-id' });
    });

    it('should handle empty trends data', async () => {
      SleepLog.find = jest.fn().mockReturnValue({
        sort: jest.fn().mockReturnValue({
          limit: jest.fn().mockResolvedValue([])
        })
      });

      const response = await request(app)
        .get('/api/trends/weekly')
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data');
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data).toHaveLength(0);
    });

    it('should return error when database query fails', async () => {
      SleepLog.find = jest.fn().mockReturnValue({
        sort: jest.fn().mockReturnValue({
          limit: jest.fn().mockRejectedValue(new Error('Database error'))
        })
      });

      const response = await request(app)
        .get('/api/trends/weekly')
        .expect(500);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('message', 'Failed to load trend data');
    });
  });
});