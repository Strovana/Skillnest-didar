const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');
const Course = require('./models/Course');

const courses = [
  {
    title: 'UI/UX Design Fundamentals',
    description: 'Master the principles of user interface and user experience design. Learn Figma, design systems, prototyping, and usability testing from scratch.',
    instructor: 'Priya Sharma',
    category: 'Design',
    level: 'Beginner',
    duration: '6 weeks',
    price: 999,
    rating: 4.8,
    tags: ['figma', 'ui', 'ux', 'design'],
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80',
    lessons: [
      { title: 'Introduction to UI/UX', duration: '45 min' },
      { title: 'Color Theory & Typography', duration: '60 min' },
      { title: 'Wireframing Basics', duration: '90 min' },
      { title: 'Figma Essentials', duration: '120 min' },
      { title: 'Prototyping & Testing', duration: '75 min' }
    ]
  },
  {
    title: 'Full Stack Web Development with MERN',
    description: 'Build production-ready web applications with MongoDB, Express, React, and Node.js. Covers REST APIs, authentication, deployment, and more.',
    instructor: 'Arjun Mehta',
    category: 'Development',
    level: 'Intermediate',
    duration: '12 weeks',
    price: 2499,
    rating: 4.9,
    tags: ['react', 'node', 'mongodb', 'javascript'],
    thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=600&q=80',
    lessons: [
      { title: 'JavaScript ES6+ Refresher', duration: '60 min' },
      { title: 'React Fundamentals', duration: '90 min' },
      { title: 'Node.js & Express', duration: '90 min' },
      { title: 'MongoDB & Mongoose', duration: '75 min' },
      { title: 'JWT Authentication', duration: '60 min' },
      { title: 'Deployment on Render & Vercel', duration: '45 min' }
    ]
  },
  {
    title: 'Digital Marketing Mastery',
    description: 'From SEO to social media advertising, learn the complete digital marketing toolkit. Real campaigns, real results.',
    instructor: 'Neha Kapoor',
    category: 'Marketing',
    level: 'Beginner',
    duration: '4 weeks',
    price: 799,
    rating: 4.6,
    tags: ['seo', 'social media', 'ads', 'marketing'],
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
    lessons: [
      { title: 'SEO Fundamentals', duration: '60 min' },
      { title: 'Google Ads Basics', duration: '75 min' },
      { title: 'Social Media Strategy', duration: '60 min' },
      { title: 'Email Marketing', duration: '45 min' }
    ]
  },
  {
    title: 'Data Science with Python',
    description: 'Analyze data, build ML models, and create powerful visualizations using Python, Pandas, NumPy, and Scikit-learn.',
    instructor: 'Dr. Ravi Kumar',
    category: 'Data Science',
    level: 'Intermediate',
    duration: '10 weeks',
    price: 1999,
    rating: 4.7,
    tags: ['python', 'pandas', 'ml', 'data'],
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
    lessons: [
      { title: 'Python for Data Science', duration: '90 min' },
      { title: 'Data Cleaning with Pandas', duration: '75 min' },
      { title: 'Data Visualization', duration: '60 min' },
      { title: 'Machine Learning Basics', duration: '120 min' }
    ]
  },
  {
    title: 'Business Communication & Leadership',
    description: 'Develop professional communication skills, leadership presence, and strategic thinking to advance your career.',
    instructor: 'Sana Mirza',
    category: 'Business',
    level: 'Beginner',
    duration: '3 weeks',
    price: 599,
    rating: 4.5,
    tags: ['communication', 'leadership', 'business'],
    thumbnail: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80',
    lessons: [
      { title: 'Effective Communication', duration: '45 min' },
      { title: 'Leadership Principles', duration: '60 min' },
      { title: 'Team Management', duration: '45 min' }
    ]
  },
  {
    title: 'Mobile Photography & Editing',
    description: 'Transform your smartphone into a professional camera. Learn composition, lighting, and editing with Lightroom Mobile.',
    instructor: 'Karan Singh',
    category: 'Photography',
    level: 'Beginner',
    duration: '2 weeks',
    price: 399,
    rating: 4.4,
    tags: ['photography', 'editing', 'lightroom', 'mobile'],
    thumbnail: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&q=80',
    lessons: [
      { title: 'Smartphone Camera Settings', duration: '30 min' },
      { title: 'Composition Rules', duration: '45 min' },
      { title: 'Lightroom Mobile Editing', duration: '60 min' }
    ]
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Course.deleteMany({});
    console.log('Cleared existing data');

    // Create admin user
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@skillnest.com',
      password: 'admin123',
      role: 'admin'
    });

    // Create test user
    const testUser = await User.create({
      name: 'John Student',
      email: 'student@skillnest.com',
      password: 'student123',
      role: 'user'
    });

    console.log('✅ Users created');
    console.log('   Admin: admin@skillnest.com / admin123');
    console.log('   Student: student@skillnest.com / student123');

    // Create courses
    const createdCourses = await Course.insertMany(courses);
    console.log(`✅ ${createdCourses.length} courses created`);

    // Enroll test user in first 2 courses
    testUser.enrolledCourses = [createdCourses[0]._id, createdCourses[1]._id];
    await testUser.save();

    createdCourses[0].enrolledStudents.push(testUser._id);
    createdCourses[1].enrolledStudents.push(testUser._id);
    await createdCourses[0].save();
    await createdCourses[1].save();

    console.log('✅ Test enrollments created');
    console.log('\n🎉 Seed complete! Run: npm run dev');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seed();
