import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';

// Import configurations
import connectDB from './config/database.js';
import { corsMiddleware, corsErrorHandler } from './config/cors.js';

// Import middleware
import { 
  errorHandler, 
  notFound, 
  securityHeaders, 
  requestLogger 
} from './middleware/errorHandler.js';
import { 
  generalLimiter, 
  authLimiter, 
  apiLimiter 
} from './middleware/rateLimiting.js';

// Import routes
import authRoutes from './routes/auth.js';
import marketplaceRoutes from './routes/marketplace.js';
import studyPlannerRoutes from './routes/studyPlanner.js';
import userRoutes from './routes/users.js';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Trust proxy if behind reverse proxy (for rate limiting)
app.set('trust proxy', 1);

// Connect to MongoDB
connectDB();

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
  },
  crossOriginEmbedderPolicy: false
}));

// CORS middleware
app.use(corsMiddleware);
app.use(corsErrorHandler);

// Compression middleware
app.use(compression());

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Security headers
app.use(securityHeaders);

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  app.use(requestLogger);
} else {
  app.use(morgan('combined'));
}

// Rate limiting middleware
app.use(generalLimiter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is healthy',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    version: process.env.npm_package_version || '1.0.0'
  });
});

// API status endpoint
app.get('/api/status', (req, res) => {
  res.json({
    success: true,
    message: 'TaskHive API is running',
    version: '1.0.0',
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
    endpoints: {
      auth: '/api/auth',
      marketplace: '/api/marketplace',
      studyPlanner: '/api/study-planner',
      users: '/api/users'
    }
  });
});

// API Documentation endpoint
app.get('/api/docs', (req, res) => {
  res.json({
    success: true,
    message: 'TaskHive API Documentation',
    version: '1.0.0',
    baseUrl: `${req.protocol}://${req.get('host')}/api`,
    endpoints: {
      authentication: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        refresh: 'POST /api/auth/refresh',
        logout: 'POST /api/auth/logout',
        me: 'GET /api/auth/me',
        forgotPassword: 'POST /api/auth/forgot-password',
        resetPassword: 'PUT /api/auth/reset-password/:token'
      },
      marketplace: {
        getServices: 'GET /api/marketplace/services',
        getService: 'GET /api/marketplace/services/:id',
        createService: 'POST /api/marketplace/services',
        updateService: 'PUT /api/marketplace/services/:id',
        deleteService: 'DELETE /api/marketplace/services/:id',
        getCategories: 'GET /api/marketplace/categories',
        getStats: 'GET /api/marketplace/stats',
        search: 'GET /api/marketplace/search',
        featured: 'GET /api/marketplace/featured'
      },
      studyPlanner: {
        getPlans: 'GET /api/study-planner/plans',
        getPlan: 'GET /api/study-planner/plans/:id',
        createPlan: 'POST /api/study-planner/plans',
        updatePlan: 'PUT /api/study-planner/plans/:id',
        deletePlan: 'DELETE /api/study-planner/plans/:id',
        addInteraction: 'POST /api/study-planner/plans/:id/ai-interaction',
        getChatHistory: 'GET /api/study-planner/plans/:id/chat-history',
        addStudySession: 'POST /api/study-planner/plans/:id/study-session',
        updateTask: 'PUT /api/study-planner/plans/:id/tasks/:taskId',
        getTemplates: 'GET /api/study-planner/templates',
        getStats: 'GET /api/study-planner/stats'
      },
      users: {
        getProfile: 'GET /api/users/profile',
        updateProfile: 'PUT /api/users/profile',
        updateSellerProfile: 'PUT /api/users/seller-profile',
        getDashboard: 'GET /api/users/dashboard',
        getOrders: 'GET /api/users/orders',
        getReviews: 'GET /api/users/reviews',
        getNotifications: 'GET /api/users/notifications',
        updateAvatar: 'PUT /api/users/avatar',
        getPublicProfile: 'GET /api/users/:id/public'
      }
    }
  });
});

// API Routes
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/marketplace', apiLimiter, marketplaceRoutes);
app.use('/api/study-planner', apiLimiter, studyPlannerRoutes);
app.use('/api/users', apiLimiter, userRoutes);

// Welcome message for root path
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to TaskHive API',
    version: '1.0.0',
    environment: process.env.NODE_ENV,
    documentation: '/api/docs',
    health: '/health',
    status: '/api/status'
  });
});

// Handle 404 errors
app.use(notFound);

// Global error handler
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`
🚀 TaskHive API Server is running!
📍 Environment: ${process.env.NODE_ENV || 'development'}
🌐 Server: http://localhost:${PORT}
📚 API Docs: http://localhost:${PORT}/api/docs
❤️  Health: http://localhost:${PORT}/health
  `);
});

// Graceful shutdown
const gracefulShutdown = (signal) => {
  console.log(`\n${signal} received. Starting graceful shutdown...`);
  
  server.close(() => {
    console.log('HTTP server closed.');
    
    // Close database connection
    process.exit(0);
  });
  
  // Force close after 10 seconds
  setTimeout(() => {
    console.error('Forcing shutdown after 10 seconds...');
    process.exit(1);
  }, 10000);
};

// Handle shutdown signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  gracefulShutdown('UNCAUGHT_EXCEPTION');
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.error('Unhandled Promise Rejection:', err);
  gracefulShutdown('UNHANDLED_REJECTION');
});

export default app;