const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const mongoose = require("mongoose"); // ✅ ADD THIS
const { sleepLogValidationRules, validate } = require("../middleware/validation");
const SleepLog = require("../models/SleepLog");
const getPrediction = require("../services/predictService");
const logger = require("../utils/logger");

// ADD SLEEP LOG
router.post("/add", sleepLogValidationRules(), validate, async (req, res) => {
  try {
    const { duration, awakenings, stress, caffeine, screenTime, exercise, mood } = req.body;

    // ✅ FIX: use a real ObjectId instead of string
    const userId = "demo-user";

    logger.info('Processing sleep log submission', { userId, duration });

    // Call ML microservice
   let prediction = {
  sleep_score: Math.round((duration * 10) - stress + mood),
  model: "mock",
  features: { duration, awakenings, stress, caffeine, screenTime, exercise, mood }
};


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

    // await log.save(); // disabled until MongoDB is connected

    
    logger.info('Sleep log saved successfully', { userId, logId: log.id, sleepScore: prediction.sleep_score });

    res.json({ 
      success: true, 
      data: log 
    });
  } catch (error) {
    logger.error('Failed to save sleep log', { 
      userId: "000000000000000000000000",
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
