const mongoose = require("mongoose");
require("dotenv").config();
const logger = require('../utils/logger');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    logger.info(`MongoDB connected`, { host: conn.connection.host });
  } catch (error) {
    logger.error("MongoDB connection error", { error: error.message });
    
    // Retry connection after 5 seconds
    setTimeout(connectDB, 5000);
  }
};

// Handle disconnection events
mongoose.connection.on('disconnected', () => {
  logger.warn('MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
  logger.error('MongoDB connection error', { error: err.message });
});

// Gracefully close connection on process termination
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  logger.info('MongoDB connection closed through app termination');
  process.exit(0);
});

module.exports = connectDB;
