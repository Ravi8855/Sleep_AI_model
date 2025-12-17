const axios = require('axios');
const getPrediction = require('../src/services/predictService');

// Mock axios
jest.mock('axios');

describe('Predict Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should make a successful prediction request', async () => {
    const mockData = {
      duration: 7.5,
      awakenings: 1,
      stress: 3,
      caffeine: 100,
      screen_time: 60,
      exercise: 30,
      mood: 7
    };

    const mockResponse = {
      data: {
        sleep_score: 85.5,
        model: 'random_forest'
      }
    };

    axios.post.mockResolvedValue(mockResponse);

    const result = await getPrediction(mockData);

    expect(result).toEqual(mockResponse.data);
    expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:5000/predict',
      mockData,
      { timeout: 5000 }
    );
  });

  it('should return fallback prediction when request fails', async () => {
    const mockData = {
      duration: 7.5,
      awakenings: 1,
      stress: 3,
      caffeine: 100,
      screen_time: 60,
      exercise: 30,
      mood: 7
    };

    axios.post.mockRejectedValue(new Error('Network error'));

    const result = await getPrediction(mockData);

    expect(result).toEqual({ sleep_score: 50 });
    expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:5000/predict',
      mockData,
      { timeout: 5000 }
    );
  });

  it('should use environment variable for prediction URL', async () => {
    const originalEnv = process.env.PYTHON_PREDICT_URL;
    process.env.PYTHON_PREDICT_URL = 'http://custom-service:5000/predict';

    const mockData = { duration: 7.5 };
    const mockResponse = { data: { sleep_score: 80 } };

    axios.post.mockResolvedValue(mockResponse);

    const result = await getPrediction(mockData);

    expect(result).toEqual(mockResponse.data);
    expect(axios.post).toHaveBeenCalledWith(
      'http://custom-service:5000/predict',
      mockData,
      { timeout: 5000 }
    );

    // Restore original environment
    process.env.PYTHON_PREDICT_URL = originalEnv;
  });
});