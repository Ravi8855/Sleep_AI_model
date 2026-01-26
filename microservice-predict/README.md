# SleepAI - Python ML Prediction Microservice

The machine learning microservice for SleepAI provides sleep quality predictions using a trained RandomForest model.

## 🏗️ Architecture

- **Framework**: Flask
- **ML Library**: Scikit-learn
- **Serialization**: Joblib
- **Data Processing**: Pandas, NumPy
- **CORS**: Flask-CORS
- **Environment**: python-dotenv

## 🚀 Getting Started

### Prerequisites

- Python 3.8+
- Virtual environment tool (venv or conda)

### Installation

1. **Navigate to the microservice directory**
   ```bash
   cd sleep-ai-full-project/microservice-predict
   ```

2. **Create and activate a virtual environment**
   ```bash
   # Using venv
   python -m venv venv
   source venv/bin/activate   # Linux/macOS
   # venv\Scripts\activate   # Windows
   
   # Or using conda
   conda create -n sleepai python=3.8
   conda activate sleepai
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Place the trained model**
   Ensure `sleep_model.pkl` (trained RandomForest model) is in this folder.
   
   If you don't have a model, you can generate one:
   ```bash
   cd ../dataset
   python generate_dataset.py
   python train_model.py
   mv sleep_model.pkl ../microservice-predict/
   ```

5. **Start the service**
   ```bash
   python predict_service.py
   ```

## 🔧 API Endpoints

### Predict Sleep Quality

- **Endpoint**: `POST /predict`
- **Description**: Predict sleep quality based on input features
- **Request Body**:
  ```json
  {
    "duration": 7.5,
    "awakenings": 1,
    "stress": 3,
    "caffeine": 100,
    "screen_time": 60,
    "exercise": 30,
    "mood": 7
  }
  ```
- **Response**:
  ```json
  {
    "sleep_score": 78.5,
    "model": "random_forest",
    "features": {
      "duration": 7.5,
      "awakenings": 1,
      "stress": 3,
      "caffeine": 100,
      "screen_time": 60,
      "exercise": 30,
      "mood": 7
    }
  }
  ```

### Train Model (Development Only)

- **Endpoint**: `POST /train`
- **Description**: Train a new model with provided data
- **Request Body**:
  ```json
  {
    "features": [[7.5, 1, 3, 100, 60, 30, 7], [6.0, 2, 5, 200, 120, 0, 4]],
    "target": [78.5, 45.2]
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Model trained and saved successfully"
  }
  ```

## 🤖 Machine Learning Model

The service uses a RandomForest regressor trained on synthetic sleep data. The model considers the following features:

- **duration**: Sleep duration in hours (0-24)
- **awakenings**: Number of times awakened during sleep (0-20)
- **stress**: Stress level (1-10)
- **caffeine**: Caffeine intake in mg (0-500)
- **screen_time**: Screen time before bed in minutes (0-180)
- **exercise**: Exercise duration in minutes (0-120)
- **mood**: Mood level (1-10)

### Fallback Algorithm

If no trained model is available, the service falls back to a rule-based algorithm:

```python
score = (
    duration * 10
    - awakenings * 5
    - stress * 2
    - caffeine * 1.5
    - screen_time * 0.2
    + exercise * 0.1
    + mood * 4
)
score = max(0, min(100, score))
```

## 📦 Dependencies

Key dependencies include:
- flask - Web framework
- scikit-learn - Machine learning library
- joblib - Model serialization
- pandas - Data processing
- numpy - Numerical computing
- flask-cors - Cross-origin resource sharing
- python-dotenv - Environment variables

## 🧪 Testing

Test the service with curl:
```bash
# Test prediction
curl -X POST http://localhost:5000/predict \
  -H "Content-Type: application/json" \
  -d '{"duration": 7.5, "awakenings": 1, "stress": 3, "caffeine": 100, "screen_time": 60, "exercise": 30, "mood": 7}'
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## 📄 License

This project is licensed under the MIT License.
