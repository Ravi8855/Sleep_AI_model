const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const { sleepLogValidationRules, validate } = require("../middleware/validation");
const SleepLog = require("../models/SleepLog");
const getPrediction = require("../services/predictService");
const logger = require("../utils/logger");

// ADD SLEEP LOG
router.post("/add", authMiddleware, sleepLogValidationRules(), validate, async (req, res) => {
  try {
    const { duration, awakenings, stress, caffeine, screenTime, exercise, mood } = req.body;

    const userId = req.user.id;

    logger.info('Processing sleep log submission', { userId, duration });

    // Call ML microservice
    const prediction = await getPrediction({
      duration,
      awakenings,
      stress,
      caffeine,
      screen_time: screenTime,
      exercise,
      mood,
    });

    logger.info('ML prediction completed', { userId, sleepScore: prediction.sleep_score, model: prediction.model });

    // Save MongoDB log
    const log = new SleepLog({
      userId,
      date: new Date(),
      duration,
      awakenings,
      stress,
      caffeine,
      screenTime,
      exercise,
      mood,
      prediction,
    });

    await log.save();
    
    logger.info('Sleep log saved successfully', { userId, logId: log.id, sleepScore: prediction.sleep_score });

    res.json({ 
      success: true, 
      data: log 
    });
  } catch (error) {
    logger.error('Failed to save sleep log', { 
      userId: req.user.id,
      error: error.message, 
      stack: error.stack 
    });
    res.status(500).json({ 
      success: false,
      message: "Failed to save sleep log" 
    });
  }
});

module.exports = router;
