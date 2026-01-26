const express = require("express");
const router = express.Router();
const SleepLog = require("../models/SleepLog");
const logger = require("../utils/logger");

// For demo purposes, use a dummy user ID
const DEMO_USER_ID = "demo-user-id";

// GET all goals for a user
router.get("/", async (req, res) => {
  try {
    logger.info('Fetching sleep goals', { userId: DEMO_USER_ID });
    
    // For demo, return mock goals
    const goals = [
      {
        id: 1,
        userId: DEMO_USER_ID,
        targetHours: 8,
        bedtime: '22:00',
        wakeTime: '06:00',
        consistencyDays: 7,
        startDate: new Date('2025-12-01'),
        progress: 65,
        streak: 3,
        status: 'active',
        createdAt: new Date()
      }
    ];

    logger.info('Sleep goals fetched successfully', { userId: DEMO_USER_ID, count: goals.length });
    
    res.json({ 
      success: true,
      data: goals 
    });
  } catch (err) {
    logger.error('Failed to fetch sleep goals', { 
      userId: DEMO_USER_ID,
      error: err.message, 
      stack: err.stack 
    });
    res.status(500).json({ 
      success: false,
      message: "Failed to fetch sleep goals" 
    });
  }
});

// CREATE a new goal
router.post("/", async (req, res) => {
  try {
    const { targetHours, bedtime, wakeTime, consistencyDays, startDate } = req.body;
    
    logger.info('Creating new sleep goal', { userId: DEMO_USER_ID, targetHours, consistencyDays });
    
    // Validate input
    if (!targetHours || !consistencyDays || !startDate) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      });
    }
    
    // For demo, just return success
    const newGoal = {
      id: Date.now(),
      userId: DEMO_USER_ID,
      targetHours,
      bedtime,
      wakeTime,
      consistencyDays,
      startDate: new Date(startDate),
      progress: 0,
      streak: 0,
      status: 'active',
      createdAt: new Date()
    };

    logger.info('Sleep goal created successfully', { userId: DEMO_USER_ID, goalId: newGoal.id });
    
    res.status(201).json({ 
      success: true,
      data: newGoal 
    });
  } catch (err) {
    logger.error('Failed to create sleep goal', { 
      userId: DEMO_USER_ID,
      error: err.message, 
      stack: err.stack 
    });
    res.status(500).json({ 
      success: false,
      message: "Failed to create sleep goal" 
    });
  }
});

// UPDATE a goal
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    logger.info('Updating sleep goal', { userId: DEMO_USER_ID, goalId: id });
    
    // For demo, just return success
    res.json({ 
      success: true,
      message: "Goal updated successfully"
    });
  } catch (err) {
    logger.error('Failed to update sleep goal', { 
      userId: DEMO_USER_ID,
      error: err.message, 
      stack: err.stack 
    });
    res.status(500).json({ 
      success: false,
      message: "Failed to update sleep goal" 
    });
  }
});

// DELETE a goal
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    
    logger.info('Deleting sleep goal', { userId: DEMO_USER_ID, goalId: id });
    
    // For demo, just return success
    res.json({ 
      success: true,
      message: "Goal deleted successfully"
    });
  } catch (err) {
    logger.error('Failed to delete sleep goal', { 
      userId: DEMO_USER_ID,
      error: err.message, 
      stack: err.stack 
    });
    res.status(500).json({ 
      success: false,
      message: "Failed to delete sleep goal" 
    });
  }
});

module.exports = router;