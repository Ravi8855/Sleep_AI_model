const axios = require("axios");
require("dotenv").config();
const winston = require('winston');

// Create a logger for this service
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}] [PredictService]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console()
  ]
});

async function getPrediction(data) {
  try {
    const url = process.env.PYTHON_PREDICT_URL || "http://localhost:5000/predict";
    logger.info(`Making prediction request to ${url}`);
    
    const res = await axios.post(url, data, {
      timeout: 5000 // 5 second timeout
    });
    
    logger.info(`Prediction successful`, { 
      sleepScore: res.data.sleep_score, 
      model: res.data.model 
    });
    
    return res.data;
  } catch (error) {
    logger.error("Prediction error", { 
      error: error.message, 
      url: process.env.PYTHON_PREDICT_URL || "http://127.0.0.1:5000/predict" 
    });
    return { sleep_score: 50 }; // fallback
  }
}

module.exports = getPrediction;
