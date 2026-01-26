# SleepAI - Dataset Generation and Model Training

This directory contains scripts for generating synthetic sleep data and training the machine learning model used in the SleepAI application.

## 📁 Contents

- `generate_dataset.py` - Script to generate synthetic sleep data
- `train_model.py` - Script to train the RandomForest model
- `sleep_dataset.csv` - Generated dataset (created by generate_dataset.py)
- `sleep_model.pkl` - Trained model (created by train_model.py)

## 🚀 Getting Started

### Prerequisites

- Python 3.8+
- Virtual environment tool (venv or conda)

### Installation

1. **Navigate to the dataset directory**
   ```bash
   cd sleep-ai-full-project/dataset
   ```

2. **Create and activate a virtual environment**
   ```bash
   # Using venv
   python -m venv venv
   source venv/bin/activate   # Linux/macOS
   # venv\Scripts\activate   # Windows
   
   # Or using conda
   conda create -n sleepai-dataset python=3.8
   conda activate sleepai-dataset
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

## 📊 Dataset Generation

The `generate_dataset.py` script creates a synthetic dataset of sleep records for training the machine learning model.

### Features Included

- **duration**: Sleep duration in hours (4-10 hours)
- **awakenings**: Number of times awakened during sleep (0-5 times)
- **stress**: Stress level (1-10 scale)
- **caffeine**: Caffeine intake in mg (0-300 mg)
- **screen_time**: Screen time before bed in minutes (0-180 minutes)
- **exercise**: Exercise duration in minutes (0-120 minutes)
- **mood**: Mood level (1-5 scale)
- **sleep_score**: Calculated sleep quality score (0-100)

### Generation Process

The script generates 5000 synthetic sleep records with realistic distributions and correlations.

### Running the Script

```bash
python generate_dataset.py
```

This creates `sleep_dataset.csv` with 5000 records.

## 🤖 Model Training

The `train_model.py` script trains a RandomForest regressor on the generated dataset.

### Algorithm

- **Model**: RandomForestRegressor
- **Estimators**: 200 trees
- **Max Depth**: 12
- **Evaluation**: Mean Absolute Error (MAE)

### Training Process

1. Loads the dataset from `sleep_dataset.csv`
2. Splits data into training (80%) and testing (20%) sets
3. Trains the RandomForest model
4. Evaluates model performance
5. Saves the trained model as `sleep_model.pkl`

### Running the Script

```bash
python train_model.py
```

This creates `sleep_model.pkl` which can be moved to the microservice directory.

## 📈 Model Evaluation

The training script outputs the Mean Absolute Error (MAE) to evaluate model performance. Lower MAE values indicate better performance.

## 🧪 Testing the Model

After training, you can test the model with sample data:

```python
import joblib
import numpy as np

# Load the model
model = joblib.load('sleep_model.pkl')

# Sample data [duration, awakenings, stress, caffeine, screen_time, exercise, mood]
sample_data = np.array([[7.5, 1, 3, 100, 60, 30, 4]])

# Make prediction
prediction = model.predict(sample_data)
print(f"Predicted sleep score: {prediction[0]:.2f}")
```

## 🔄 Regenerating Data and Retraining

To regenerate the dataset and retrain the model:

```bash
# Remove existing files
rm sleep_dataset.csv sleep_model.pkl

# Generate new dataset
python generate_dataset.py

# Train new model
python train_model.py

# Move model to microservice
mv sleep_model.pkl ../microservice-predict/
```

## 📦 Dependencies

Key dependencies include:
- pandas - Data manipulation
- numpy - Numerical computing
- scikit-learn - Machine learning
- joblib - Model serialization

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## 📄 License

This project is licensed under the MIT License.