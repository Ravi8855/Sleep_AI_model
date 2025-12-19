const express = require("express");
const router = express.Router();
const SleepLog = require("../models/SleepLog");
const logger = require("../utils/logger");

// WEEKLY TREND - for demo purposes, use a dummy user ID
router.get("/weekly", async (req, res) => {
  try {
    logger.info('Fetching weekly trends', { userId: "demo-user-id" });
    
    // For demo purposes, use a dummy user ID
    const logs = await SleepLog.find({ userId: "demo-user-id" })
      .sort({ date: -1 })
      .limit(7);

    const weekly = logs.map(log => ({
      _id: log._id,
      date: log.date,
      duration: log.duration,
      score: log.prediction?.sleep_score ?? 0,
      awakenings: log.awakenings,
      stress: log.stress,
      caffeine: log.caffeine,
      screenTime: log.screenTime,
      exercise: log.exercise,
      mood: log.mood,
      prediction: log.prediction
    }));

    logger.info('Weekly trends fetched successfully', { userId: "demo-user-id", count: logs.length });

    res.json({ 
      success: true,
      data: weekly 
    });
  } catch (err) {
    logger.error('Failed to load trend data', { 
      userId: "demo-user-id",
      error: err.message, 
      stack: err.stack 
    });
    res.status(500).json({ 
      success: false,
      message: "Failed to load trend data" 
    });
  }
});

module.exports = router;
