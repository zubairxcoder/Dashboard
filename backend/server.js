const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// ======================
// Middleware
// ======================
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ======================
// Static Uploads Folder
// ======================
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ======================
// API Routes
// ======================
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/tasks', require('./routes/tasks'));
app.use('/api/clients', require('./routes/clients'));
app.use('/api/team', require('./routes/team'));
app.use('/api/finance', require('./routes/finance'));
app.use('/api/activity', require('./routes/activity'));
app.use('/api/dashboard', require('./routes/dashboard'));

// ======================
// Health Check Route
// ======================
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: '✅ DevOps Dashboard API Running'
  });
});

// ======================
// 404 Route Handler
// ======================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route Not Found'
  });
});

// ======================
// MongoDB Connection
// ======================
const startServer = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/devops_dashboard'
    );

    console.log('✅ MongoDB Connected');

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

startServer();

module.exports = app;