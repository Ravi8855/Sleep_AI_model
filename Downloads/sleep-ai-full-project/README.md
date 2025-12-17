# SleepAI - Intelligent Sleep Quality Tracker

![SleepAI Dashboard](https://placehold.co/800x400.png?text=SleepAI+Dashboard)

SleepAI is a comprehensive sleep tracking application that uses machine learning to analyze sleep patterns and provide personalized recommendations for better sleep quality. The application combines a modern React frontend with a robust Node.js backend and a Python-based machine learning microservice.

## 🌟 Features

- **Sleep Tracking**: Log your sleep patterns with detailed metrics
- **AI-Powered Insights**: Machine learning model provides personalized sleep quality scores
- **Data Visualization**: Interactive charts to track sleep trends over time
- **Personalized Recommendations**: Actionable advice based on your sleep data
- **User Authentication**: Secure login and registration system
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🏗️ Architecture

The application is structured as a microservices architecture:

```
├── backend-node/          # Express.js REST API with MongoDB
├── microservice-predict/  # Flask ML service for sleep quality predictions
├── sleep-ai-frontend/     # React + Vite frontend with Tailwind CSS
├── dataset/               # Scripts for generating training data and model training
├── infra/                 # Docker Compose configurations
└── Makefile               # Project automation commands
```

## 🚀 Quick Start

### Prerequisites

- Docker Desktop (recommended)
- Node.js (v16+)
- Python (v3.8+)
- MongoDB (or MongoDB Atlas)

### Option 1: Docker Setup (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sleep-ai-full-project
   ```

2. **(Optional) Train the ML model**
   ```bash
   cd dataset
   python -m venv venv
   source venv/bin/activate  # Linux/macOS
   # venv\Scripts\activate  # Windows
   pip install -r requirements.txt
   python generate_dataset.py
   python train_model.py
   mv sleep_model.pkl ../microservice-predict/
   cd ..
   ```

3. **Start all services**
   ```bash
   make up
   ```

4. **Start the frontend**
   ```bash
   cd sleep-ai-frontend-clean-premium
   npm install
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:4000
   - ML Service: http://localhost:5000

### Option 2: Manual Setup

Refer to individual component READMEs:
- [Backend Setup](backend-node/README.md)
- [Frontend Setup](sleep-ai-frontend-clean-premium/README.md)
- [ML Service Setup](microservice-predict/README.md)

## 🛠️ Development

### Project Structure

#### Backend (Node.js + Express)
- RESTful API design
- MongoDB with Mongoose ODM
- JWT-based authentication
- Input validation with express-validator
- Comprehensive logging with Winston
- Security enhancements with Helmet and rate limiting

#### ML Service (Python + Flask)
- Flask REST API
- Scikit-learn RandomForest model
- Fallback to rule-based algorithm
- Model training scripts

#### Frontend (React + Vite)
- Component-based architecture
- React Router for navigation
- Zustand for state management
- Recharts for data visualization
- Tailwind CSS for styling

### Available Commands

```bash
# Docker Compose commands
make up      # Start all services
make down    # Stop all services
make logs    # View service logs
make ps      # List running containers
make clean   # Clean all containers, images, and volumes

# Development commands
make build   # Build Docker images
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Sleep Data
- `POST /api/sleep/add` - Add sleep log entry
- `GET /api/trends/weekly` - Get weekly sleep trends

## 📊 Machine Learning

The sleep quality prediction model uses a RandomForest algorithm trained on synthetic sleep data. Features include:
- Sleep duration
- Number of awakenings
- Stress levels
- Caffeine intake
- Screen time before bed
- Exercise duration
- Mood levels

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Thanks to all contributors who have helped shape this project
- Inspired by the importance of quality sleep for overall health and wellbeing

