// Mock environment variables
process.env.JWT_SECRET = 'test-secret-key';
process.env.MONGO_URI = 'mongodb://localhost:27017/test';

// Mock console.error to reduce test noise
console.error = jest.fn();