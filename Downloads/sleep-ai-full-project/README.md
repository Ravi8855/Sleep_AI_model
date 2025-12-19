# SleepAI - Professional Sleep Tracking & Analysis Platform

![SleepAI Dashboard](./sleep-ai-frontend-clean-premium/public/sleep-ai-dashboard.png)

SleepAI is a comprehensive sleep tracking and analysis platform that uses machine learning to provide personalized sleep quality predictions and recommendations. Built with modern web technologies, it offers a professional-grade solution for individuals looking to improve their sleep patterns.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- Python (v3.8 or higher)
- MongoDB (v4.4 or higher)

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd sleep-ai-full-project

# Install dependencies
npm run install:all
```

### Running the Application
```bash
# Start all services simultaneously
npm start

# Or use the Makefile
make dev

# Or run the Windows batch script
start-all.bat
```

### Access the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:4000
- **ML Service**: http://localhost:5000

## 🌟 Key Features

### Core Functionality
- **User Registration & Login**: Secure authentication system with JWT tokens
- **Sleep Data Tracking**: Comprehensive form for logging sleep habits and environmental factors
- **Sleep Quality Predictions**: Machine learning-powered sleep score predictions
- **Trend Visualization**: Interactive charts showing sleep patterns over time
- **Personalized Sleep Recommendations**: AI-generated insights for better sleep
- **Multi-language Support**: Internationalization-ready architecture

### Professional Enhancements
- **Security Features**: 
  - JWT-based authentication
  - Rate limiting protection
  - Input validation and sanitization
  - Helmet.js security headers
- **Modern UI/UX Design**: 
  - Responsive Tailwind CSS implementation
  - Intuitive dashboard layout
  - Interactive data visualizations
- **Comprehensive Logging**: 
  - Winston logging for all operations
  - Detailed error tracking
- **Error Handling**: 
  - Graceful error responses
  - User-friendly error messages
- **Docker-Ready Configuration**: 
  - Containerized services
  - Easy deployment setup

## 🏗️ Architecture

### Backend (Node.js + Express)
- RESTful API design
- MongoDB with Mongoose ODM
- Express-validator for input validation
- Winston for logging
- Helmet for security headers
- Rate limiting middleware

### Machine Learning Microservice (Python + Flask)
- Scikit-learn Random Forest model
- REST API for predictions
- Dockerized deployment
- Model persistence with pickle

### Frontend (React + Vite)
- Component-based architecture
- React Router for navigation
- Recharts for data visualization
- Axios for API communication
- Tailwind CSS for styling

## 📁 Project Structure

```
sleep-ai-full-project/
├── backend-node/                 # Node.js backend service
│   ├── src/
│   │   ├── config/               # Database configuration
│   │   ├── middleware/           # Custom middleware (auth, validation, etc.)
│   │   ├── models/               # Mongoose models
│   │   ├── routes/               # API route handlers
│   │   ├── services/             # Business logic services
│   │   ├── utils/                # Utility functions
│   │   └── index.js              # Application entry point
│   └── tests/                    # Unit and integration tests
├── microservice-predict/         # Python ML prediction service
│   ├── predict_service.py        # Flask prediction API
│   └── sleep_model.pkl           # Trained ML model
├── sleep-ai-frontend-clean-premium/  # React frontend
│   ├── src/
│   │   ├── api/                  # API client configuration
│   │   ├── components/           # Reusable UI components
│   │   ├── pages/                # Page components
│   │   ├── store/                # State management
│   │   └── App.jsx               # Main application component
│   └── tailwind.config.cjs       # Tailwind CSS configuration
├── dataset/                      # Data generation and model training scripts
│   ├── generate_dataset.py       # Synthetic data generator
│   └── train_model.py            # Model training script
├── infra/                        # Infrastructure as Code
│   └── docker-compose.yml        # Multi-container orchestration
└── docs/                         # Documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Python (v3.8 or higher)
- MongoDB (v4.4 or higher)
- Docker (optional, for containerized deployment)

### Installation

1. **Clone the repository:**
```bash
git clone <repository-url>
cd sleep-ai-full-project
```

2. **Backend Setup:**
```bash
cd backend-node
npm install
cp .env.example .env
# Update .env with your MongoDB connection string
```

3. **Frontend Setup:**
```bash
cd ../sleep-ai-frontend-clean-premium
npm install
```

4. **ML Service Setup:**
```bash
cd ../microservice-predict
pip install -r requirements.txt
```

### Running the Application

#### Option 1: Manual Startup
```bash
# Terminal 1: Start ML Service
cd microservice-predict
python predict_service.py

# Terminal 2: Start Backend
cd ../backend-node
npm start

# Terminal 3: Start Frontend
cd ../sleep-ai-frontend-clean-premium
npm run dev
```

#### Option 2: Docker Deployment
```bash
cd infra
docker-compose up
```

### Accessing the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:4000
- **ML Service**: http://localhost:5000

## 🔧 API Documentation

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Sleep Tracking
- `POST /api/sleep/add` - Add sleep log
- `GET /api/sleep/logs` - Get sleep logs

### Trends & Analytics
- `GET /api/trends/weekly` - Weekly sleep trends
- `GET /api/trends/monthly` - Monthly sleep trends

### ML Predictions
- `POST /predict` - Sleep quality prediction

## 🛡️ Security Features

- **JWT Authentication**: Secure token-based authentication
- **Rate Limiting**: Protection against brute-force attacks
- **Input Validation**: Sanitization and validation of all user inputs
- **CORS Protection**: Controlled cross-origin resource sharing
- **Helmet.js**: Security headers to protect against common vulnerabilities
- **MongoDB Injection Prevention**: Proper query sanitization

## 📊 Data Model

### User
- email (String, unique)
- password (String, hashed)
- createdAt (Date)

### SleepLog
- userId (ObjectId, reference)
- date (Date)
- duration (Number)
- awakenings (Number)
- stress (Number)
- caffeine (Number)
- screenTime (Number)
- exercise (Number)
- mood (Number)
- prediction (Object)
  - sleep_score (Number)
  - model (String)
  - features (Object)
- createdAt (Date)

## 🧪 Testing

### Backend Tests
```bash
cd backend-node
npm test
```

### Test Coverage
- Unit tests for routes and middleware
- Integration tests for API endpoints
- Validation tests for input handling
- Error handling tests

## 📈 Machine Learning

### Model Training
The application uses a Random Forest Regressor trained on synthetic sleep data. The model considers factors such as:
- Sleep duration
- Number of awakenings
- Stress levels
- Caffeine intake
- Screen time before bed
- Exercise duration
- Mood

### Feature Engineering
- Data normalization
- Feature scaling
- Cross-validation
- Hyperparameter tuning

## 🌍 Internationalization

The application supports multiple languages through a flexible i18n system:
- English (default)
- Spanish
- French
- German
- Chinese

## 🐳 Docker Support

The application includes Docker configurations for easy deployment:
- `Dockerfile` for backend service
- `Dockerfile` for ML service
- `docker-compose.yml` for multi-container orchestration

## 📚 Development Guidelines

### Coding Standards
- ESLint for JavaScript code quality
- Prettier for code formatting
- Consistent naming conventions
- Modular code organization

### Git Workflow
- Feature branching strategy
- Pull request reviews
- Semantic versioning
- CHANGELOG maintenance

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- **SleepAI Team** - *Initial work*

## 🙏 Acknowledgments

- Thanks to all contributors who have helped shape this project
- Inspired by the importance of quality sleep for overall health and wellbeing