const express = require('express');
const router = express.Router();
const { register, login, getMe } = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth.middleware');
const {
  registerValidation,
  loginValidation,
} = require('../middleware/validation.middleware');
const { handleValidationErrors } = require('../utils/handleValidation');

router.post('/register', registerValidation, handleValidationErrors, register);
router.post('/login', loginValidation, handleValidationErrors, login);
router.get('/me', protect, getMe);

module.exports = router;
