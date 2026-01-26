const express = require("express");
const router = express.Router();
const SleepLog = require("../models/SleepLog");
const logger = require("../utils/logger");

// Base route so /api/trends works
router.get("/", (req, res) => {
  return res.redirect("/api/trends/weekly");
});

// WEEKLY TREND
router.get("/weekly", async (req, res) => {
  try {
    logger.info("Fetching weekly trends", { userId: "demo-user-id" });

    const logs = await SleepLog.find({ userId: "demo-user-id" })
      .sort({ date: -1 })
      .limit(7);

    const weekly = logs.map(log => ({
      _id: log._id,
     router.get("/weekly", (req, res) => {
  res.json({
    success: true,
    data: [
      { date: "2026-01-01", duration: 7, score: 80 },
      { date: "2026-01-02", duration: 6, score: 72 }
    ]
  });
});

    }));

    logger.info("Weekly trends fetched successfully", {
      userId: "demo-user-id",
      count: logs.length
    });

    res.json({
      success: true,
      data: weekly
    });
  } catch (err) {
    logger.error("Failed to load trend data", {
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
