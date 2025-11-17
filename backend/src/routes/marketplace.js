import express from 'express';
import { body, query } from 'express-validator';
import {
  getServices,
  getService,
  createService,
  updateService,
  deleteService,
  getCategories,
  getMarketplaceStats,
  searchServices,
  getFeaturedServices,
  getMyServices
} from '../controllers/marketplaceController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// Service validation rules
const serviceValidation = [
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 5, max: 100 })
    .withMessage('Title must be between 5 and 100 characters')
    .trim(),
  body('description')
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ min: 50, max: 2000 })
    .withMessage('Description must be between 50 and 2000 characters'),
  body('category')
    .notEmpty()
    .withMessage('Category is required')
    .isIn([
      'Tutoring',
      'Assignment Help',
      'Study Resources',
      'Research Services',
      'Design & Creative',
      'Programming',
      'Writing & Translation',
      'Language Learning',
      'Test Preparation',
      'Other'
    ])
    .withMessage('Invalid category'),
  body('pricing.type')
    .isIn(['fixed', 'hourly', 'package'])
    .withMessage('Pricing type must be fixed, hourly, or package'),
  body('pricing.basePrice')
    .isFloat({ min: 0 })
    .withMessage('Base price must be a positive number'),
  body('deliveryTime')
    .isInt({ min: 1 })
    .withMessage('Delivery time must be at least 1 day'),
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array'),
  body('tags.*')
    .optional()
    .isLength({ min: 2, max: 30 })
    .withMessage('Each tag must be between 2 and 30 characters')
];

// Query validation for services list
const servicesQueryValidation = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('Limit must be between 1 and 50'),
  query('minPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Minimum price must be a positive number'),
  query('maxPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Maximum price must be a positive number'),
  query('rating')
    .optional()
    .isFloat({ min: 0, max: 5 })
    .withMessage('Rating must be between 0 and 5'),
  query('deliveryTime')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Delivery time must be a positive integer')
];

// Public routes
router.get('/services', servicesQueryValidation, getServices);
router.get('/services/:id', getService);
router.get('/categories', getCategories);
router.get('/stats', getMarketplaceStats);
router.get('/search', searchServices);
router.get('/featured', getFeaturedServices);

// Protected routes - Authentication required
router.use(authenticate);

// Seller routes
router.get('/my-services', authorize(['tutor', 'admin']), getMyServices);
router.post('/services', authorize(['tutor', 'admin']), serviceValidation, createService);
router.put('/services/:id', authorize(['tutor', 'admin']), serviceValidation, updateService);
router.delete('/services/:id', authorize(['tutor', 'admin']), deleteService);

export default router;