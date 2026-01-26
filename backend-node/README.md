# SleepAI - Node.js Backend

The backend service for SleepAI is built with Node.js and Express, providing a RESTful API for sleep tracking and user management.

## 🏗️ Architecture

- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT-based authentication
- **Validation**: express-validator
- **Security**: Helmet, CORS, Rate Limiting
- **Logging**: Winston
- **Error Handling**: Centralized error handling middleware

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+)
- MongoDB (local or Atlas)
- Python microservice running (for ML predictions)

### Installation

1. **Clone the repository**
   ```bash
   cd sleep-ai-full-project/backend-node
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

## ⚙️ Environment Variables

Create a `.env` file based on `.env.example`:

```env
NODE_ENV=development
PORT=4000
MONGO_URI=mongodb://localhost:27017/sleep_ai
JWT_SECRET=your_jwt_secret_key
PYTHON_PREDICT_URL=http://localhost:5000/predict
FRONTEND_URL=http://localhost:5173
```

## 🔧 API Endpoints

### Authentication

- `POST /api/auth/register` - User registration
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword"
  }
  ```

- `POST /api/auth/login` - User login
  ```json
  {
    "email": "john@example.com",
    "password": "securepassword"
  }
  ```

### Sleep Tracking

- `POST /api/sleep/add` - Add sleep log entry (requires authentication)
  ```json
  {
    "duration": 7.5,
    "awakenings": 1,
    "stress": 3,
    "caffeine": 100,
    "screenTime": 60,
    "exercise": 30,
    "mood": 7
  }
  ```

- `GET /api/trends/weekly` - Get weekly sleep trends (requires authentication)

## 🛡️ Security Features

- JWT-based authentication
- Input validation and sanitization
- Rate limiting to prevent abuse
- Security headers with Helmet
- CORS configuration
- Password hashing with bcrypt

## 📊 Logging

The application uses Winston for comprehensive logging:

- Request/response logging
- Error logging with stack traces
- Performance monitoring
- Log rotation to prevent disk overflow

Logs are stored in the `logs/` directory:
- `combined.log` - All log entries
- `error.log` - Error-level entries only

## 🧪 Testing

Run the test suite:
```bash
npm test
```

## 📦 Dependencies

Key dependencies include:
- express - Web framework
- mongoose - MongoDB ODM
- jsonwebtoken - JWT implementation
- bcryptjs - Password hashing
- express-validator - Input validation
- winston - Logging
- helmet - Security headers
- express-rate-limit - Rate limiting

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## 📄 License

This project is licensed under the MIT License.
