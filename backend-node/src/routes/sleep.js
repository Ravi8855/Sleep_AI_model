const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const mongoose = require("mongoose"); // ✅ ADD THIS
const { sleepLogValidationRules, validate } = require("../middleware/validation");
const SleepLog = require("../models/SleepLog");
const getPrediction = require("../services/predictService");
const logger = require("../utils/logger");

// ADD SLEEP LOG
router.post("/add", authMiddleware, sleepLogValidationRules(), validate, async (req, res) => {
  try {
    const { duration, awakenings, stress, caffeine, screenTime, exercise, mood, date } = req.body;
    const userId = req.user.id;

    logger.info('Processing sleep log submission', { userId, duration });

    // Call ML microservice
    let prediction = await getPrediction({
      duration: Number(duration),
      awakenings: Number(awakenings),
      stress: Number(stress),
      caffeine: Number(caffeine),
      screen_time: Number(screenTime),
      exercise: Number(exercise),
      mood: Number(mood)
    }).catch(err => {
      logger.warn('ML service call failed, using fallback', { error: err.message });
      return {
        sleep_score: Math.round((duration * 10) - stress + mood),
        model: "fallback_formula",
        features: { duration, awakenings, stress, caffeine, screenTime, exercise, mood }
      };
    });

    logger.info('ML prediction completed', { userId, sleepScore: prediction.sleep_score, model: prediction.model });

    // Save MongoDB log
    const log = new SleepLog({
      userId,
      date: date || new Date(),
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

    logger.info('Sleep log saved successfully', { userId, logId: log._id, sleepScore: prediction.sleep_score });

    res.json({ 
      success: true, 
      data: log 
    });
  } catch (error) {
    logger.error('Failed to save sleep log', { 
      userId: req.user?.id || "unknown",
      error: error.message, 
      stack: error.stack 
    });
    res.status(500).json({ 
      success: false,
      message: "Failed to save sleep log",
      error: error.message 
    });
  }
});

module.exports = router;
