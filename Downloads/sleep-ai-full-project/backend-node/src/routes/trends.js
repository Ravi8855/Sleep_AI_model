const express = require("express");
const router = express.Router();
const SleepLog = require("../models/SleepLog");
const authMiddleware = require("../middleware/auth");
const logger = require("../utils/logger");

// WEEKLY TREND
router.get("/weekly", authMiddleware, async (req, res) => {
  try {
    logger.info('Fetching weekly trends', { userId: req.user.id });
    
    const logs = await SleepLog.find({ userId: req.user.id })
      .sort({ date: -1 })
      .limit(7);

    const weekly = logs.map(log => ({
      date: log.date,
      score: log.prediction?.sleep_score ?? 0,
    }));

    logger.info('Weekly trends fetched successfully', { userId: req.user.id, count: logs.length });

    res.json({ 
      success: true,
      data: weekly 
    });
  } catch (err) {
    logger.error('Failed to load trend data', { 
      userId: req.user.id,
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
