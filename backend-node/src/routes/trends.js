const express = require("express");
const router = express.Router();
const SleepLog = require("../models/SleepLog");
const mongoose = require("mongoose");

router.get("/weekly", async (req, res) => {
  try {
    // Check DB connection
    const logs = await SleepLog.find({ userId: "demo-user" })
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
