const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// Mongo Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Mongo Connected'))
  .catch((err) => console.log(err));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/tasks', require('./routes/tasks'));
app.use('/api/clients', require('./routes/clients'));
app.use('/api/team', require('./routes/team'));
app.use('/api/finance', require('./routes/finance'));
app.use('/api/activity', require('./routes/activity'));
app.use('/api/dashboard', require('./routes/dashboard'));

// Health
app.get('/api/health', (req, res) => {
  res.json({ success: true });
});

module.exports = app;