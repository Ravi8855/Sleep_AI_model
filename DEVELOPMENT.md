# SleepAI Development Guide

This guide provides comprehensive instructions for setting up, running, and contributing to the SleepAI project.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **Python** (v3.8 or higher)
- **MongoDB** (v4.4 or higher) or MongoDB Atlas account
- **Git**
- **Docker** (optional, for containerized deployment)
- **npm** or **yarn**

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd sleep-ai-full-project
```

### 2. Install Dependencies
```bash
# Install root dependencies
npm install

# Install all service dependencies
npm run install:all
```

### 3. Configure Environment Variables
Each service requires specific environment variables:

#### Backend (.env in backend-node/)
```env
PORT=4000
MONGO_URI=mongodb://localhost:27017/sleep_ai
JWT_SECRET=your_jwt_secret_key
PYTHON_PREDICT_URL=http://localhost:5000/predict
FRONTEND_URL=http://localhost:5173
```

### 4. Start All Services
```bash
# Using npm script
npm start

# Using Makefile
make dev

# Or start individually
npm run start:backend
npm run start:ml
npm run start:frontend
```

## 🏗️ Project Structure

### Root Directory
```
sleep-ai-full-project/
├── backend-node/                 # Node.js backend service
├── microservice-predict/         # Python ML prediction service
├── sleep-ai-frontend-clean-premium/  # React frontend
├── dataset/                      # Data generation and model training
├── infra/                        # Docker configurations
├── Makefile                      # Build automation
├── package.json                  # Root project configuration
└── README.md                     # Project documentation
```

## 🐳 Docker Development

### Building and Running with Docker
```bash
# Build all services
make build

# Start all services
make up

# View logs
make logs

# Stop services
make down
```

### Docker Configuration
The `infra/docker-compose.yml` file defines three services:
1. **mongo** - MongoDB database
2. **node** - Node.js backend API
3. **python** - Python ML prediction service

## 🧪 Testing

### Backend Testing
```bash
cd backend-node
npm test

# Watch mode
npm run test:watch
```

### Test Structure
- Unit tests for individual functions
- Integration tests for API endpoints
- Mock database connections for isolated testing

## 📊 Machine Learning Development

### Retraining the Model
```bash
cd dataset
python generate_dataset.py
python train_model.py
```

### Model Components
- `generate_dataset.py` - Creates synthetic sleep data
- `train_model.py` - Trains the Random Forest model
- `sleep_model.pkl` - Serialized trained model

## 🎨 Frontend Development

### Component Structure
```
src/
├── api/                  # API client configuration
├── components/           # Reusable UI components
├── pages/                # Page components
├── store/                # State management
└── App.jsx              # Main application component
```

### Styling
- Tailwind CSS for utility-first styling
- Custom CSS variables for theme consistency
- Responsive design for all device sizes

## 🔧 API Documentation

### Base URLs
- **Development**: http://localhost:4000/api
- **Production**: https://your-domain.com/api

### Authentication Endpoints
```
POST /api/auth/register
POST /api/auth/login
```

### Sleep Tracking Endpoints
```
POST /api/sleep/add
GET /api/sleep/logs
```

### Trends Endpoints
```
GET /api/trends/weekly
GET /api/trends/monthly
```

## 🛡️ Security Best Practices

### Authentication
- JWT tokens with expiration
- Password hashing with bcrypt
- Secure cookie settings

### Data Protection
- Input validation and sanitization
- Rate limiting to prevent abuse
- CORS configuration for controlled access

### Environment Variables
Never commit sensitive information to version control. Use `.env` files and add them to `.gitignore`.

## 📈 Performance Optimization

### Backend
- Connection pooling for MongoDB
- Caching strategies for frequent requests
- Efficient database indexing

### Frontend
- Code splitting for faster initial loads
- Lazy loading for non-critical components
- Image optimization techniques

## 🌍 Internationalization (i18n)

The application supports multiple languages through:
- JSON translation files
- Context-based language switching
- RTL language support

## 🐛 Debugging Tips

### Common Issues and Solutions

1. **Port Conflicts**
   ```bash
   # Kill processes on specific ports
   lsof -ti:4000 | xargs kill -9
   lsof -ti:5000 | xargs kill -9
   lsof -ti:5173 | xargs kill -9
   ```

2. **Database Connection Issues**
   - Verify MongoDB is running
   - Check connection string in .env
   - Ensure network access to database

3. **CORS Errors**
   - Verify FRONTEND_URL in backend .env
   - Check CORS configuration in src/index.js

### Logging
All services include comprehensive logging:
- Backend: Winston logger with timestamp and level
- Frontend: Console logging with context
- ML Service: Standard Python logging

## 🤝 Contributing

### Git Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style
- Follow existing code patterns
- Use meaningful variable and function names
- Include JSDoc comments for functions
- Write unit tests for new functionality

### Pull Request Guidelines
- Describe the changes in detail
- Include screenshots for UI changes
- Reference related issues
- Ensure all tests pass

## 🚨 Troubleshooting

### Services Won't Start
1. Check if required ports are available
2. Verify all dependencies are installed
3. Confirm environment variables are set
4. Check service-specific logs

### Data Not Displaying
1. Verify API endpoints are returning data
2. Check browser console for JavaScript errors
3. Confirm database connections
4. Validate data format between services

### Performance Issues
1. Monitor resource usage
2. Check database query performance
3. Review network latency between services
4. Optimize frontend bundle size

## 📚 Additional Resources

### Documentation
- [Node.js Express Documentation](https://expressjs.com/)
- [React Documentation](https://reactjs.org/)
- [Scikit-learn Documentation](https://scikit-learn.org/)
- [MongoDB Documentation](https://docs.mongodb.com/)

### Tools
- **Postman** - API testing
- **MongoDB Compass** - Database GUI
- **Docker Desktop** - Container management
- **Chrome DevTools** - Frontend debugging

## 📞 Support

For issues not covered in this guide:
1. Check existing GitHub issues
2. Create a new issue with detailed information
3. Include error messages and steps to reproduce
4. Specify your development environment

## 🔄 Version Updates

When pulling updates from the repository:
```bash
git pull origin main
npm run install:all
```

Check CHANGELOG.md for breaking changes and migration steps.