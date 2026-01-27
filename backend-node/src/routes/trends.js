const express = require("express");
const router = express.Router();
const SleepLog = require("../models/SleepLog");
const mongoose = require("mongoose");

router.get("/weekly", async (req, res) => {
  try {
    // Check DB connection
    if (mongoose.connection.readyState !== 1) {
      return res.json({
        success: true,
        data: [
          { date: "2026-01-01", duration: 7, score: 80 },
          { date: "2026-01-02", duration: 6, score: 72 }
        ],
        note: "DB not connected, using mock data"
      });
    }

    const logs = await SleepLog.find({ userId: "demo-user-id" })
      .sort({ date: -1 })
      .limit(7);

    res.json({
      success: true,
      data: logs
    });

  } catch (err) {
    res.json({
      success: true,
      data: [
        { date: "2026-01-01", duration: 7, score: 80 },
        { date: "2026-01-02", duration: 6, score: 72 }
      ],
      error: err.message
    });
  }
});

module.exports = router;
