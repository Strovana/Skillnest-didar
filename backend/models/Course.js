const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Course title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  instructor: {
    type: String,
    required: [true, 'Instructor name is required']
  },
  category: {
    type: String,
    required: true,
    enum: ['Design', 'Development', 'Marketing', 'Business', 'Data Science', 'Photography', 'Music', 'Other']
  },
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner'
  },
  duration: {
    type: String,
    required: true // e.g. "4 weeks", "12 hours"
  },
  price: {
    type: Number,
    default: 0
  },
  thumbnail: {
    type: String,
    default: ''
  },
  tags: [String],
  enrolledStudents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  isPublished: {
    type: Boolean,
    default: true
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  lessons: [{
    title: String,
    duration: String
  }]
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
