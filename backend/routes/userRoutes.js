import express from 'express';
import { signup, login } from '../controllers/authController.js';
import { body, validationResult } from 'express-validator';
import rateLimit from 'express-rate-limit';

const router = express.Router();

// Rate Limiting for Authentication Routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per window
  message: 'Too many login/signup attempts, please try again later.',
});

// Validation Middleware
const validateSignup = [
  body('email').isEmail().withMessage('Invalid email'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  body('name').notEmpty().withMessage('Name is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateLogin = [
  body('email').isEmail().withMessage('Invalid email'),
  body('password').notEmpty().withMessage('Password is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Routes
router.post('/signup', authLimiter, validateSignup, signup);
router.post('/login', authLimiter, validateLogin, login);

export default router;
