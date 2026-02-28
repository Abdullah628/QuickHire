const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

const authRoutes = require('./routes/auth.routes');
const jobRoutes = require('./routes/job.routes');
const applicationRoutes = require('./routes/application.routes');
const { errorHandler, notFound } = require('./middleware/error.middleware');

const app = express();

// Security middleware
app.use(helmet());

// CORS
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
}));

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Logging (dev only)
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'QuickHire API is running' });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

module.exports = app;
