const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const SleepLog = require("../models/SleepLog");

router.get("/weekly", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const logs = await SleepLog.find({ userId })
      .sort({ date: -1 })
      .limit(14);

    if (!logs.length) {
      return res.json({ success: true, data: [] });
    }

    const data = logs.map(log => ({
      date: log.date,
      duration: log.duration,
      score: log.prediction?.sleep_score || 0
    }));

    res.json({ success: true, data });

  } catch (err) {
    console.error("Weekly trend error:", err.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch weekly trends"
    });
  }
});

module.exports = router;
