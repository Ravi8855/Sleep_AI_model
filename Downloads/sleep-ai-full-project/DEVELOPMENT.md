# SleepAI - Development Guide

This guide provides comprehensive information for developers working on the SleepAI project.

## 📁 Project Structure

```
sleep-ai-full-project/
├── backend-node/          # Node.js REST API
│   ├── src/
│   │   ├── config/        # Database configuration
│   │   ├── middleware/    # Express middleware
│   │   ├── models/        # Mongoose models
│   │   ├── routes/        # API routes
│   │   ├── services/      # Business logic
│   │   ├── utils/         # Utility functions
│   │   └── index.js       # Application entry point
│   ├── logs/              # Application logs
│   ├── .env.example       # Environment variables template
│   ├── Dockerfile         # Docker configuration
│   └── package.json       # Node.js dependencies
├── microservice-predict/  # Python ML microservice
│   ├── predict_service.py # Flask application
│   ├── requirements.txt   # Python dependencies
│   └── Dockerfile         # Docker configuration
├── sleep-ai-frontend/     # React frontend
│   ├── src/
│   │   ├── api/           # API client
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── store/         # State management
│   │   ├── App.jsx        # Main application
│   │   └── main.jsx       # Entry point
│   ├── index.html         # HTML template
│   └── package.json       # Frontend dependencies
├── dataset/               # Data generation and model training
│   ├── generate_dataset.py # Synthetic data generator
│   ├── train_model.py     # Model training script
│   └── requirements.txt   # Dataset dependencies
├── infra/                 # Infrastructure
│   └── docker-compose.yml # Docker Compose configuration
├── Makefile               # Project automation
├── README.md              # Main documentation
└── LICENSE                # License information
```

## 🛠️ Development Environment Setup

### Prerequisites

1. **Node.js** (v16+)
2. **Python** (v3.8+)
3. **Docker** (optional but recommended)
4. **MongoDB** (local or Atlas)
5. **Git**

### Initial Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sleep-ai-full-project
   ```

2. **Set up backend**
   ```bash
   cd backend-node
   npm install
   cp .env.example .env
   # Edit .env with your configuration
   cd ..
   ```

3. **Set up frontend**
   ```bash
   cd sleep-ai-frontend-clean-premium
   npm install
   cd ..
   ```

4. **Set up ML service**
   ```bash
   cd microservice-predict
   python -m venv venv
   source venv/bin/activate  # Linux/macOS
   # venv\Scripts\activate   # Windows
   pip install -r requirements.txt
   cd ..
   ```

5. **Generate and train model**
   ```bash
   cd dataset
   pip install -r requirements.txt
   python generate_dataset.py
   python train_model.py
   mv sleep_model.pkl ../microservice-predict/
   cd ..
   ```

## ▶️ Running the Application

### Development Mode

1. **Start MongoDB** (if using local instance)
   ```bash
   # If using Docker
   docker run -d -p 27017:27017 --name mongodb mongo:6
   ```

2. **Start ML service**
   ```bash
   cd microservice-predict
   python predict_service.py
   ```

3. **Start backend**
   ```bash
   cd backend-node
   npm run dev
   ```

4. **Start frontend**
   ```bash
   cd sleep-ai-frontend-clean-premium
   npm run dev
   ```

### Docker Mode (Recommended)

```bash
# Start all backend services
make up

# Start frontend separately
cd sleep-ai-frontend-clean-premium
npm run dev
```

## 🔧 Development Workflow

### Backend Development

#### Adding New Routes

1. Create a new route file in `backend-node/src/routes/`
2. Define validation rules if needed
3. Implement business logic in services
4. Add error handling
5. Update documentation

#### Database Models

1. Define schemas in `backend-node/src/models/`
2. Add proper validation and indexes
3. Include timestamps where appropriate

#### Middleware

1. Create middleware in `backend-node/src/middleware/`
2. Ensure proper error handling
3. Add logging where appropriate

### Frontend Development

#### Component Structure

1. Create reusable components in `sleep-ai-frontend-clean-premium/src/components/`
2. Create page components in `sleep-ai-frontend-clean-premium/src/pages/`
3. Follow consistent naming conventions
4. Use TypeScript for type safety

#### State Management

1. Use Zustand for global state
2. Keep component state local when possible
3. Follow the principle of least state

#### Styling

1. Use Tailwind CSS utility classes
2. Define custom styles in `index.css`
3. Maintain consistent design system

### ML Service Development

#### Model Updates

1. Update data generation in `dataset/generate_dataset.py`
2. Retrain model with `dataset/train_model.py`
3. Test new model thoroughly
4. Update fallback algorithm if needed

#### API Extensions

1. Add new endpoints in `microservice-predict/predict_service.py`
2. Implement proper error handling
3. Add logging for debugging
4. Update documentation

## 🧪 Testing

### Backend Testing

1. **Unit Tests**
   ```bash
   cd backend-node
   npm test
   ```

2. **API Testing**
   ```bash
   # Test registration
   curl -X POST http://localhost:4000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
   ```

### Frontend Testing

1. **Component Tests**
   ```bash
   cd sleep-ai-frontend-clean-premium
   npm test
   ```

2. **End-to-End Tests**
   ```bash
   npm run test:e2e
   ```

### ML Service Testing

1. **Model Testing**
   ```bash
   cd microservice-predict
   python -c "import joblib; model = joblib.load('sleep_model.pkl'); print('Model loaded successfully')"
   ```

2. **API Testing**
   ```bash
   curl -X POST http://localhost:5000/predict \
     -H "Content-Type: application/json" \
     -d '{"duration":7.5,"awakenings":1,"stress":3,"caffeine":100,"screen_time":60,"exercise":30,"mood":7}'
   ```

## 📊 Logging and Monitoring

### Backend Logging

Logs are written to:
- `backend-node/logs/combined.log` - All logs
- `backend-node/logs/error.log` - Error logs only

### ML Service Logging

Console output includes:
- Request information
- Prediction results
- Error messages

### Frontend Logging

Browser console includes:
- API request/response logs
- Error messages
- Debug information

## 🔒 Security Considerations

### Backend Security

1. **Authentication**
   - JWT tokens with expiration
   - Secure password hashing
   - Token refresh mechanisms

2. **Input Validation**
   - Server-side validation
   - Sanitization of user input
   - Rate limiting

3. **Data Protection**
   - Environment variables for secrets
   - HTTPS in production
   - Database encryption where appropriate

### Frontend Security

1. **Client-Side Security**
   - XSS prevention
   - CSRF protection
   - Secure storage of tokens

2. **API Security**
   - Proper error handling
   - No exposure of sensitive information
   - Input validation

## 🚀 Deployment

### Production Checklist

1. **Environment Variables**
   - Set `NODE_ENV=production`
   - Use secure JWT secret
   - Configure production database

2. **Performance Optimization**
   - Enable compression
   - Optimize database queries
   - Use CDN for static assets

3. **Monitoring**
   - Set up error tracking
   - Implement health checks
   - Configure alerts

4. **Backup Strategy**
   - Regular database backups
   - Model version control
   - Configuration backups

### CI/CD Pipeline

1. **Testing**
   - Run all test suites
   - Security scanning
   - Performance testing

2. **Building**
   - Create optimized builds
   - Containerize services
   - Version artifacts

3. **Deployment**
   - Blue-green deployment
   - Rollback strategy
   - Health monitoring

## 🤝 Contributing

### Code Style

1. **JavaScript/Node.js**
   - Follow Airbnb JavaScript style guide
   - Use ESLint for linting
   - Maintain consistent naming conventions

2. **Python**
   - Follow PEP 8 style guide
   - Use Black for formatting
   - Add type hints where appropriate

3. **React**
   - Use functional components
   - Implement proper error boundaries
   - Optimize performance with memoization

### Git Workflow

1. **Branching Strategy**
   - `main` - Production code
   - `develop` - Development code
   - Feature branches for new features
   - Hotfix branches for urgent fixes

2. **Commit Messages**
   - Use conventional commits
   - Be descriptive but concise
   - Reference issues when applicable

3. **Pull Requests**
   - Review code thoroughly
   - Ensure tests pass
   - Update documentation
   - Squash commits when merging

## 🆘 Troubleshooting

### Common Issues

1. **Database Connection Errors**
   - Check MongoDB is running
   - Verify connection string
   - Check firewall settings

2. **ML Service Not Responding**
   - Ensure Python service is running
   - Check model file exists
   - Verify port configuration

3. **Frontend API Errors**
   - Check backend is running
   - Verify CORS configuration
   - Check network tab in browser dev tools

4. **Authentication Issues**
   - Verify JWT secret consistency
   - Check token expiration settings
   - Validate user credentials

### Debugging Tips

1. **Enable Debug Logging**
   ```bash
   # Backend
   DEBUG=* npm run dev
   
   # ML Service
   export FLASK_ENV=development
   python predict_service.py
   ```

2. **Check Docker Logs**
   ```bash
   make logs
   ```

3. **Use Development Tools**
   - Postman for API testing
   - Browser dev tools for frontend debugging
   - MongoDB Compass for database inspection

## 📚 Resources

### Documentation

- [Node.js Documentation](https://nodejs.org/en/docs/)
- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Flask Documentation](https://flask.palletsprojects.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)

### Learning Resources

- [REST API Design](https://restfulapi.net/)
- [Machine Learning with Scikit-learn](https://scikit-learn.org/stable/)
- [Modern CSS with Tailwind](https://tailwindcss.com/docs)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.