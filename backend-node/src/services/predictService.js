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

// Improved fallback formula for sleep score calculation
function calculateSleepScore(data) {
  const {
    duration = 7,
    awakenings = 0,
    stress = 3,
    caffeine = 0,
    screen_time = 0,
    exercise = 0,
    mood = 5
  } = data;

  // Base score: optimal sleep is 7-9 hours = 85-100
  let score = 0;
  
  // Duration scoring (max 85 points)
  if (duration >= 7 && duration <= 9) {
    score += 85 + ((8 - Math.abs(duration - 8)) * 5); // Peak at 8 hours
  } else if (duration >= 6 && duration < 7) {
    score += 70 + (duration - 6) * 15; // Good but not ideal
  } else if (duration > 9 && duration <= 10) {
    score += 80 + ((10 - duration) * 5); // Still good
  } else if (duration >= 10 && duration <= 11) {
    score += 75 + ((11 - duration) * 5); // Getting excessive
  } else if (duration > 11) {
    score += 60; // Too much sleep
  } else {
    score += 40 + (duration * 10); // Less than 6 hours
  }

  // Awakenings penalty (max -30 points)
  score -= Math.min(30, awakenings * 5);

  // Stress adjustment (max -20 points)
  // stress scale: 1-5 (1=relaxed, 5=very stressed)
  score -= Math.min(20, (stress - 2) * 5);

  // Caffeine penalty (max -15 points)
  // caffeine: mg consumed (typical: 0-400)
  score -= Math.min(15, (caffeine / 100) * 5);

  // Screen time penalty (max -20 points)
  // screen_time in minutes before bed
  score -= Math.min(20, (screen_time / 60) * 10);

  // Exercise bonus (max +15 points)
  // exercise: minutes of exercise
  score += Math.min(15, (exercise / 30) * 10);

  // Mood adjustment (positive mood helps)
  // mood scale: 1-5 (1=very bad, 5=excellent)
  score += (mood - 3) * 5;

  // Ensure score is between 0-100
  return Math.min(100, Math.max(0, Math.round(score)));
}

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
    logger.warn("ML service unavailable, using fallback formula", { 
      error: error.message, 
      url: process.env.PYTHON_PREDICT_URL || "http://localhost:5000/predict" 
    });
    
    // Use improved fallback formula
    const sleepScore = calculateSleepScore(data);
    return { 
      sleep_score: sleepScore, 
      model: "fallback_improved_formula",
      features: data
    };
  }
}

module.exports = getPrediction;
