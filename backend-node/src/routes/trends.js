const express = require("express");
const router = express.Router();
const SleepLog = require("../models/SleepLog");

router.get("/weekly", async (req, res) => {
  try {
    // If DB is not connected, return empty safely
    if (SleepLog.db.readyState !== 1) {
      return res.json({ success: true, data: [] });
    }

    const logs = await SleepLog.find({ userId: "demo-user-id" })
      .sort({ date: -1 })
      .limit(14);

    if (!logs.length) {
      return res.json({ success: true, data: [] });
    }

    const data = logs.map(l => ({
      date: l.date,
      duration: l.duration,
      score: l.prediction?.sleep_score || 0
    }));

    res.json({ success: true, data });

  } catch (err) {
    console.error("Weekly trends error:", err.message);
    res.status(500).json({
      success: false,
      message: "Failed to load weekly trends"
    });
  }
});

module.exports = router;
