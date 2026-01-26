const { body, validationResult } = require('express-validator');

// Validation rules for sleep log data
const sleepLogValidationRules = () => {
  return [
    body('duration')
      .isFloat({ min: 0, max: 24 })
      .withMessage('Duration must be between 0 and 24 hours'),
    body('awakenings')
      .isInt({ min: 0, max: 20 })
      .withMessage('Awakenings must be between 0 and 20 times'),
    body('stress')
      .isInt({ min: 1, max: 10 })
      .withMessage('Stress level must be between 1 and 10'),
    body('caffeine')
      .isInt({ min: 0, max: 500 })
      .withMessage('Caffeine intake must be between 0 and 500 mg'),
    body('screenTime')
      .isInt({ min: 0, max: 180 })
      .withMessage('Screen time must be between 0 and 180 minutes'),
    body('exercise')
      .isInt({ min: 0, max: 120 })
      .withMessage('Exercise time must be between 0 and 120 minutes'),
    body('mood')
      .isInt({ min: 1, max: 10 })
      .withMessage('Mood level must be between 1 and 10')
  ];
};

// Validation result handler
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

module.exports = {
  sleepLogValidationRules,
  validate
};