const { body, param, query } = require('express-validator');

// Auth validations
const registerValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ max: 100 })
    .withMessage('Name cannot exceed 100 characters'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
];

const loginValidation = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
];

// Job validations
const createJobValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Job title is required')
    .isLength({ max: 150 })
    .withMessage('Title cannot exceed 150 characters'),
  body('company')
    .trim()
    .notEmpty()
    .withMessage('Company name is required'),
  body('location')
    .trim()
    .notEmpty()
    .withMessage('Location is required'),
  body('category')
    .trim()
    .notEmpty()
    .withMessage('Category is required')
    .isIn([
      'Design',
      'Sales',
      'Marketing',
      'Finance',
      'Technology',
      'Engineering',
      'Business',
      'Human Resource',
    ])
    .withMessage('Invalid category'),
  body('type')
    .optional()
    .isIn(['Full-Time', 'Part-Time', 'Contract', 'Internship'])
    .withMessage('Invalid job type'),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Job description is required')
    .isLength({ max: 5000 })
    .withMessage('Description cannot exceed 5000 characters'),
];

// Application validations
const createApplicationValidation = [
  body('job')
    .notEmpty()
    .withMessage('Job ID is required')
    .isMongoId()
    .withMessage('Invalid job ID'),
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ max: 100 })
    .withMessage('Name cannot exceed 100 characters'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email'),
  body('resumeLink')
    .trim()
    .notEmpty()
    .withMessage('Resume link is required')
    .isURL({ protocols: ['http', 'https'] })
    .withMessage('Resume link must be a valid URL'),
  body('coverNote')
    .trim()
    .notEmpty()
    .withMessage('Cover note is required')
    .isLength({ max: 2000 })
    .withMessage('Cover note cannot exceed 2000 characters'),
];

module.exports = {
  registerValidation,
  loginValidation,
  createJobValidation,
  createApplicationValidation,
};
