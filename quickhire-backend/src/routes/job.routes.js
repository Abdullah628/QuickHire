const express = require('express');
const router = express.Router();
const {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  getCategoryStats,
} = require('../controllers/job.controller');
const { protect, authorize } = require('../middleware/auth.middleware');
const { createJobValidation } = require('../middleware/validation.middleware');
const { handleValidationErrors } = require('../utils/handleValidation');

// Public routes
router.get('/categories/stats', getCategoryStats);
router.get('/', getJobs);
router.get('/:id', getJobById);

// Admin routes
router.post(
  '/',
  protect,
  authorize('admin'),
  createJobValidation,
  handleValidationErrors,
  createJob
);

router.put('/:id', protect, authorize('admin'), updateJob);

router.delete('/:id', protect, authorize('admin'), deleteJob);

module.exports = router;
