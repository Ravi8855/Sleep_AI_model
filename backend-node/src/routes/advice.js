const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const SleepLog = require('../models/SleepLog');

router.post('/', auth, async (req, res) => {
  const userId = req.user.id;
  const { useLast } = req.body;
  let source;
  try {
    if (useLast) {
      source = await SleepLog.findOne({ userId }).sort({ date: -1 });
      if (!source) return res.status(400).json({ msg: 'No logs' });
    } else {
      source = req.body;
    }

    const features = {
      duration: source.duration,
      awakenings: source.awakenings,
      stress: source.stress,
      caffeine: source.caffeine,
      screen_time: source.screenTime || source.screen_time,
      exercise: source.exercise,
      mood: source.mood
    };

    const score = source.sleepScore ?? 50;
    const advice = (function (features) {
      const issues = [];
      if ((features.stress ?? 0) >= 7) issues.push('High stress — try relaxation before bed.');
      if ((features.caffeine ?? 0) > 100) issues.push('Reduce caffeine intake.');
      if ((features.screen_time ?? 0) > 60) issues.push('Reduce screen time before sleep.');
      if ((features.awakenings ?? 0) >= 2) issues.push('Avoid heavy meals/alcohol near bedtime.');
      if ((features.exercise ?? 0) < 20) issues.push('Add light exercise earlier in day.');
      if (issues.length === 0) return 'Keep up the good habits!';
      return issues.slice(0,3).join(' ');
    })(features);

    res.json({ advice });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
