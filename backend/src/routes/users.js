import express from 'express';
import { body, query } from 'express-validator';
import {
  getProfile,
  updateProfile,
  updateSellerProfile,
  getDashboard,
  getUserOrders,
  getUserReviews,
  getNotifications,
  updateAvatar,
  getPublicProfile
} from '../controllers/userController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// Profile validation rules
const profileValidation = [
  body('firstName')
    .optional()
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters')
    .trim(),
  body('lastName')
    .optional()
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters')
    .trim(),
  body('bio')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Bio cannot exceed 500 characters'),
  body('phone')
    .optional()
    .matches(/^[+]?[\d\s\-()]+$/)
    .withMessage('Please provide a valid phone number'),
  body('institution')
    .optional()
    .isLength({ max: 100 })
    .withMessage('Institution name cannot exceed 100 characters')
    .trim(),
  body('course')
    .optional()
    .isLength({ max: 100 })
    .withMessage('Course name cannot exceed 100 characters')
    .trim(),
  body('year')
    .optional()
    .isInt({ min: 1, max: 10 })
    .withMessage('Year must be between 1 and 10'),
  body('subjects')
    .optional()
    .isArray()
    .withMessage('Subjects must be an array'),
  body('location.country')
    .optional()
    .isLength({ max: 50 })
    .withMessage('Country name cannot exceed 50 characters'),
  body('location.state')
    .optional()
    .isLength({ max: 50 })
    .withMessage('State name cannot exceed 50 characters'),
  body('location.city')
    .optional()
    .isLength({ max: 50 })
    .withMessage('City name cannot exceed 50 characters')
];

// Seller profile validation rules
const sellerProfileValidation = [
  body('skills')
    .optional()
    .isArray()
    .withMessage('Skills must be an array'),
  body('skills.*')
    .optional()
    .isLength({ min: 2, max: 50 })
    .withMessage('Each skill must be between 2 and 50 characters'),
  body('hourlyRate')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Hourly rate must be a positive number'),
  body('availability')
    .optional()
    .isIn(['available', 'busy', 'unavailable'])
    .withMessage('Availability must be available, busy, or unavailable')
];

// Query validation
const queryValidation = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('Limit must be between 1 and 50')
];

// Public routes
router.get('/:id/public', getPublicProfile);

// Protected routes - Authentication required
router.use(authenticate);

// Profile management
router.get('/profile', getProfile);
router.put('/profile', profileValidation, updateProfile);
router.put('/seller-profile', authorize(['tutor', 'admin']), sellerProfileValidation, updateSellerProfile);
router.put('/avatar', 
  body('avatar').isURL().withMessage('Avatar must be a valid URL'),
  updateAvatar
);

// Dashboard and user data
router.get('/dashboard', getDashboard);
router.get('/orders', queryValidation, getUserOrders);
router.get('/reviews', queryValidation, getUserReviews);
router.get('/notifications', queryValidation, getNotifications);

export default router;