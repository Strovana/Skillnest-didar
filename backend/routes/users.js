const express = require('express');
const User = require('../models/User');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

// GET /api/users/dashboard - User dashboard data
router.get('/dashboard', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('enrolledCourses');
    res.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        enrolledCourses: user.enrolledCourses,
        createdAt: user.createdAt
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/users - All users (admin only)
router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json({ users });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/users/stats - Admin stats
router.get('/stats', protect, adminOnly, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalAdmins = await User.countDocuments({ role: 'admin' });
    res.json({ totalUsers, totalAdmins });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
