const express = require('express');
const router = express.Router();
const {
  createApplication,
  getApplications,
  getApplicationById,
  deleteApplication,
} = require('../controllers/application.controller');
const { protect, authorize } = require('../middleware/auth.middleware');
const {
  createApplicationValidation,
} = require('../middleware/validation.middleware');
const { handleValidationErrors } = require('../utils/handleValidation');

// Public - submit application
router.post(
  '/',
  createApplicationValidation,
  handleValidationErrors,
  createApplication
);

// Admin routes
router.get('/', protect, authorize('admin'), getApplications);
router.get('/:id', protect, authorize('admin'), getApplicationById);
router.delete('/:id', protect, authorize('admin'), deleteApplication);

module.exports = router;
