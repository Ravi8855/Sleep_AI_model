const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const logger = require('../utils/logger');

// Validation middleware for registration
const registerValidation = [
  body('name')
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
];

// POST /auth/register
router.post('/register', registerValidation, async (req, res) => {
  try {
    // Log the incoming request body for debugging
    logger.info('Registration request received', { 
      body: req.body,
      email: req.body.email 
    });
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.warn('Registration validation failed', { 
        errors: errors.array(),
        email: req.body.email 
      });
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      logger.warn('Registration attempt with existing email', { email });
      return res.status(400).json({ 
        success: false, 
        message: 'User already exists' 
      });
    }

    const hashed = await bcrypt.hash(password, 10);
    user = new User({ name, email, password: hashed });
    await user.save();
    
    logger.info('User registered successfully', { userId: user.id, email });

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.json({ 
      success: true,
      token 
    });
  } catch (err) {
    logger.error('Registration error', { 
      error: err.message, 
      stack: err.stack,
      email: req.body.email 
    });
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Validation middleware for login
const loginValidation = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .exists()
    .withMessage('Password is required')
];

// POST /auth/login
router.post('/login', loginValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.warn('Login validation failed', { 
        errors: errors.array(),
        email: req.body.email 
      });
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      logger.warn('Login attempt with non-existent email', { email });
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      logger.warn('Login attempt with invalid password', { email });
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }
    
    logger.info('User logged in successfully', { userId: user.id, email });

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.json({ 
      success: true,
      token 
    });
  } catch (err) {
    logger.error('Login error', { 
      error: err.message, 
      stack: err.stack,
      email: req.body.email 
    });
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;
