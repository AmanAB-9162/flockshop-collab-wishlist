const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Mock Signup
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  const user = new User({ email, password });
  await user.save();
  res.json(user);
});

// Mock Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  user ? res.json(user) : res.status(401).json({ msg: 'Unauthorized' });
});

module.exports = router;