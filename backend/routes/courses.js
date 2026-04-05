const express = require('express');
const Course = require('../models/Course');
const User = require('../models/User');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

// GET /api/courses - Get all published courses
router.get('/', async (req, res) => {
  try {
    const { category, level, search } = req.query;
    const filter = { isPublished: true };

    if (category) filter.category = category;
    if (level) filter.level = level;
    if (search) filter.title = { $regex: search, $options: 'i' };

    const courses = await Course.find(filter).select('-enrolledStudents');
    res.json({ courses });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/courses/:id - Single course
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json({ course });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/courses - Create course (admin only)
router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json({ course });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/courses/:id - Update course (admin only)
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json({ course });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/courses/:id - Delete course (admin only)
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json({ message: 'Course deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/courses/:id/enroll - Enroll in course
router.post('/:id/enroll', protect, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    const user = await User.findById(req.user._id);

    if (user.enrolledCourses.includes(course._id)) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    user.enrolledCourses.push(course._id);
    await user.save();

    course.enrolledStudents.push(user._id);
    await course.save();

    res.json({ message: 'Enrolled successfully', enrolledCourses: user.enrolledCourses });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/courses/admin/all - All courses for admin
router.get('/admin/all', protect, adminOnly, async (req, res) => {
  try {
    const courses = await Course.find({});
    res.json({ courses });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
