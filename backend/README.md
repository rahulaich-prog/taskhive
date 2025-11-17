# TaskHive Backend API

A comprehensive backend API for TaskHive - a student marketplace and AI-powered study planner platform built with Node.js, Express, and MongoDB.

## 🚀 Features

### Core Features
- **Authentication & Authorization**: JWT-based auth with role-based access control
- **Marketplace**: Service listings, categories, search, and filtering
- **Study Planner**: AI-powered study plans, progress tracking, and chat interface
- **User Management**: Profiles, dashboards, and seller capabilities
- **Security**: Rate limiting, CORS, input validation, and security headers

### API Capabilities
- RESTful API design with consistent response format
- Comprehensive error handling and logging
- Input validation and sanitization
- File upload support (ready for Cloudinary integration)
- Real-time capabilities (Socket.io ready)
- Payment processing (Stripe ready)

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/          # Configuration files
│   │   ├── database.js  # MongoDB connection
│   │   └── cors.js      # CORS configuration
│   ├── controllers/     # Request handlers
│   │   ├── authController.js
│   │   ├── marketplaceController.js
│   │   ├── studyPlannerController.js
│   │   └── userController.js
│   ├── middleware/      # Custom middleware
│   │   ├── auth.js      # Authentication middleware
│   │   ├── errorHandler.js
│   │   └── rateLimiting.js
│   ├── models/          # Mongoose schemas
│   │   ├── User.js
│   │   ├── Service.js
│   │   ├── StudyPlan.js
│   │   ├── Order.js
│   │   ├── Category.js
│   │   └── index.js
│   ├── routes/          # API routes
│   │   ├── auth.js
│   │   ├── marketplace.js
│   │   ├── studyPlanner.js
│   │   └── users.js
│   ├── utils/           # Utility functions
│   └── server.js        # Main server file
├── package.json
├── .env.example
└── README.md
```

## 🛠 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### 1. Clone and Install
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install
```

### 2. Environment Configuration
```bash
# Copy environment template
cp .env.example .env

# Edit .env file with your configuration
```

Required environment variables:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskhive
JWT_SECRET=your_super_secret_jwt_key_here
JWT_REFRESH_SECRET=your_refresh_token_secret_here
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

### 3. Database Setup
Ensure MongoDB is running locally or update `MONGODB_URI` with your cloud database connection string.

### 4. Start the Server
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The server will start at `http://localhost:5000`

## 📚 API Documentation

### Base URL
- Development: `http://localhost:5000/api`
- Production: `https://your-domain.com/api`

### Quick Links
- API Status: `GET /api/status`
- Health Check: `GET /health`
- Full Documentation: `GET /api/docs`

### Authentication Endpoints
```
POST /api/auth/register       # Register new user
POST /api/auth/login          # Login user
POST /api/auth/refresh        # Refresh access token
POST /api/auth/logout         # Logout user
GET  /api/auth/me            # Get current user info
PUT  /api/auth/password      # Update password
POST /api/auth/forgot-password # Request password reset
PUT  /api/auth/reset-password/:token # Reset password
```

### Marketplace Endpoints
```
GET    /api/marketplace/services     # Get all services
GET    /api/marketplace/services/:id # Get single service
POST   /api/marketplace/services     # Create service (Tutor)
PUT    /api/marketplace/services/:id # Update service (Tutor)
DELETE /api/marketplace/services/:id # Delete service (Tutor)
GET    /api/marketplace/categories   # Get categories
GET    /api/marketplace/stats        # Get marketplace stats
GET    /api/marketplace/search       # Search services
GET    /api/marketplace/featured     # Get featured services
```

### Study Planner Endpoints
```
GET    /api/study-planner/plans              # Get user's study plans
GET    /api/study-planner/plans/:id          # Get single study plan
POST   /api/study-planner/plans              # Create study plan
PUT    /api/study-planner/plans/:id          # Update study plan
DELETE /api/study-planner/plans/:id          # Delete study plan
POST   /api/study-planner/plans/:id/ai-interaction # Add AI chat
GET    /api/study-planner/plans/:id/chat-history   # Get chat history
POST   /api/study-planner/plans/:id/study-session  # Record study session
PUT    /api/study-planner/plans/:id/tasks/:taskId  # Update task
GET    /api/study-planner/templates          # Get plan templates
GET    /api/study-planner/stats              # Get study statistics
```

### User Management Endpoints
```
GET  /api/users/profile           # Get user profile
PUT  /api/users/profile           # Update user profile
PUT  /api/users/seller-profile    # Update seller profile (Tutor)
GET  /api/users/dashboard         # Get dashboard data
GET  /api/users/orders            # Get user orders
GET  /api/users/reviews           # Get user reviews
GET  /api/users/notifications     # Get notifications
PUT  /api/users/avatar           # Update avatar
GET  /api/users/:id/public       # Get public profile
```

## 🔒 Authentication

The API uses JWT (JSON Web Tokens) for authentication:

1. **Register/Login**: Get access and refresh tokens
2. **Include Token**: Add `Authorization: Bearer <token>` header to requests
3. **Refresh**: Use refresh token to get new access tokens
4. **Logout**: Invalidate refresh tokens

### Example Authorization Header
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 🛡 Security Features

- **Rate Limiting**: Different limits for various endpoints
- **CORS**: Configurable cross-origin resource sharing
- **Helmet**: Security headers for common vulnerabilities
- **Input Validation**: Comprehensive request validation
- **Error Handling**: Secure error responses without sensitive data
- **JWT Security**: Secure token generation and validation

## 📊 Response Format

All API responses follow a consistent format:

### Success Response
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {
    // Response data
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "code": "ERROR_CODE", // Optional
  "errors": [] // Validation errors (optional)
}
```

### Pagination
```json
{
  "success": true,
  "data": {
    "items": [...],
    "pagination": {
      "current": 1,
      "pages": 5,
      "total": 50,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
```

## 🔧 Development

### Available Scripts
```bash
npm run dev      # Start with nodemon (auto-reload)
npm start        # Start production server
npm run lint     # Run ESLint
npm run lint:fix # Fix ESLint issues
npm test         # Run tests (when implemented)
```

### Code Structure Guidelines
- **Controllers**: Handle request/response logic
- **Models**: Define data schemas and business logic
- **Middleware**: Reusable request processing functions
- **Routes**: Define API endpoints and validation
- **Utils**: Helper functions and utilities

## 🚀 Deployment

### Environment Variables for Production
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskhive
JWT_SECRET=your_production_jwt_secret_very_long_and_random
JWT_REFRESH_SECRET=your_production_refresh_secret
CORS_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

### Docker Support (Optional)
Create a `Dockerfile` for containerized deployment:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

## 🧪 Testing

Testing framework is ready to be implemented:
- Unit tests for models and utilities
- Integration tests for API endpoints
- Authentication and authorization tests
- Database operation tests

## 📈 Monitoring & Logging

- Request/response logging with Morgan
- Error tracking and stack traces
- Performance monitoring ready
- Health check endpoint for uptime monitoring

## 🤝 Contributing

1. Follow the established code structure
2. Add proper error handling
3. Include input validation
4. Write clear documentation
5. Test your changes thoroughly

## 📄 License

This project is licensed under the MIT License.

---

## 🔮 Future Enhancements

### Planned Features
- [ ] WebSocket integration for real-time features
- [ ] File upload with Cloudinary
- [ ] Email notifications
- [ ] Payment processing with Stripe
- [ ] Advanced search with Elasticsearch
- [ ] Caching with Redis
- [ ] Comprehensive test suite
- [ ] API versioning
- [ ] GraphQL support
- [ ] Microservices architecture

### Integration Ready
- **AI Services**: OpenAI API integration for study planner
- **Payment**: Stripe payment processing
- **Email**: Nodemailer with various providers
- **File Storage**: Cloudinary for images and documents
- **Real-time**: Socket.io for chat and notifications

---

**Need help?** Check the API documentation at `/api/docs` or contact the development team.