import express from 'express';
import { body, query } from 'express-validator';
import {
  getStudyPlans,
  getStudyPlan,
  createStudyPlan,
  updateStudyPlan,
  deleteStudyPlan,
  addAIInteraction,
  getChatHistory,
  addStudySession,
  updateTaskStatus,
  getStudyPlanTemplates,
  getStudyStats
} from '../controllers/studyPlannerController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Study plan validation rules
const studyPlanValidation = [
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 5, max: 200 })
    .withMessage('Title must be between 5 and 200 characters')
    .trim(),
  body('duration.value')
    .isInt({ min: 1 })
    .withMessage('Duration value must be a positive integer'),
  body('duration.unit')
    .isIn(['days', 'weeks', 'months'])
    .withMessage('Duration unit must be days, weeks, or months'),
  body('startDate')
    .isISO8601()
    .withMessage('Start date must be a valid date'),
  body('endDate')
    .isISO8601()
    .withMessage('End date must be a valid date')
    .custom((endDate, { req }) => {
      if (new Date(endDate) <= new Date(req.body.startDate)) {
        throw new Error('End date must be after start date');
      }
      return true;
    }),
  body('subjects')
    .isArray({ min: 1 })
    .withMessage('At least one subject is required'),
  body('subjects.*.name')
    .notEmpty()
    .withMessage('Subject name is required')
    .trim(),
  body('subjects.*.priority')
    .optional()
    .isIn(['high', 'medium', 'low'])
    .withMessage('Subject priority must be high, medium, or low'),
  body('goals')
    .optional()
    .isArray()
    .withMessage('Goals must be an array'),
  body('template')
    .optional()
    .isIn(['exam-prep', 'semester-plan', 'skill-building', 'research-project', 'custom'])
    .withMessage('Invalid template type')
];

// AI interaction validation
const aiInteractionValidation = [
  body('userMessage')
    .notEmpty()
    .withMessage('User message is required')
    .isLength({ max: 2000 })
    .withMessage('Message cannot exceed 2000 characters'),
  body('aiResponse')
    .notEmpty()
    .withMessage('AI response is required')
    .isLength({ max: 5000 })
    .withMessage('Response cannot exceed 5000 characters'),
  body('context')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Context cannot exceed 500 characters'),
  body('suggestions')
    .optional()
    .isArray()
    .withMessage('Suggestions must be an array')
];

// Study session validation
const studySessionValidation = [
  body('subject')
    .notEmpty()
    .withMessage('Subject is required')
    .trim(),
  body('hours')
    .isFloat({ min: 0.1, max: 24 })
    .withMessage('Hours must be between 0.1 and 24'),
  body('notes')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Notes cannot exceed 1000 characters')
];

// Task status validation
const taskStatusValidation = [
  body('status')
    .isIn(['pending', 'in-progress', 'completed', 'overdue'])
    .withMessage('Invalid task status'),
  body('actualHours')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Actual hours must be a positive number'),
  body('notes')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Notes cannot exceed 500 characters')
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
router.get('/templates', getStudyPlanTemplates);

// Protected routes - Authentication required
router.use(authenticate);

// Study plan CRUD
router.get('/plans', queryValidation, getStudyPlans);
router.get('/plans/:id', getStudyPlan);
router.post('/plans', studyPlanValidation, createStudyPlan);
router.put('/plans/:id', studyPlanValidation, updateStudyPlan);
router.delete('/plans/:id', deleteStudyPlan);

// AI interactions and chat
router.post('/plans/:id/ai-interaction', aiInteractionValidation, addAIInteraction);
router.get('/plans/:id/chat-history', queryValidation, getChatHistory);

// Progress tracking
router.post('/plans/:id/study-session', studySessionValidation, addStudySession);
router.put('/plans/:id/tasks/:taskId', taskStatusValidation, updateTaskStatus);

// User statistics
router.get('/stats', getStudyStats);

export default router;