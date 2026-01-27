const mongoose = require('mongoose');

const SleepLogSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: false
  },
  date: { 
    type: Date, 
    required: true 
  },
  duration: { 
    type: Number, 
    min: 0, 
    max: 24,
    required: true
  },
  startTime: String,
  endTime: String,
  awakenings: { 
    type: Number, 
    min: 0, 
    max: 20 
  },
  stress: { 
    type: Number, 
    min: 1, 
    max: 10 
  },
  caffeine: { 
    type: Number, 
    min: 0, 
    max: 500 
  },
  screenTime: { 
    type: Number, 
    min: 0, 
    max: 180 
  },
  exercise: { 
    type: Number, 
    min: 0, 
    max: 120 
  },
  mood: { 
    type: Number, 
    min: 1, 
    max: 10 
  },
  prediction: {
    sleep_score: Number,
    model: String,
    features: Object
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('SleepLog', SleepLogSchema);
