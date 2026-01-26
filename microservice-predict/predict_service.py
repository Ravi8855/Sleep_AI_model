from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import joblib
import os

# Load model on startup if it exists
MODEL_PATH = 'sleep_model.pkl'
model = None
if os.path.exists(MODEL_PATH):
    try:
        model = joblib.load(MODEL_PATH)
        print(f"Loaded model from {MODEL_PATH}")
    except Exception as e:
        print(f"Failed to load model: {e}")
else:
    print(f"Model file {MODEL_PATH} not found, using built-in formula")

app = Flask(__name__)
CORS(app)

FEATURE_ORDER = ['duration','awakenings','stress','caffeine','screen_time','exercise','mood']

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json() or {}

    # Extract features
    try:
        x = [float(data.get(f, 0)) for f in FEATURE_ORDER]
    except Exception as e:
        return jsonify({"error": "Invalid data", "details": str(e)}), 400

    # Use ML model if available, otherwise fall back to formula
    if model is not None:
        try:
            # Make prediction using ML model
            prediction = model.predict([x])[0]
            score = float(max(0, min(100, prediction)))
            model_used = "random_forest"
        except Exception as e:
            print(f"ML prediction failed: {e}")
            # Fallback to built-in formula
            score = calculate_sleep_score(x)
            model_used = "built_in_formula_fallback"
    else:
        # Use built-in formula
        score = calculate_sleep_score(x)
        model_used = "built_in_formula"

    return jsonify({
        "sleep_score": round(score, 2),
        "model": model_used,
        "features": dict(zip(FEATURE_ORDER, x))
    })

@app.route('/train', methods=['POST'])
def train_model():
    global model
    try:
        # Get training data from request
        data = request.get_json() or {}
        
        # Validate data
        if 'features' not in data or 'target' not in data:
            return jsonify({"error": "Missing features or target data"}), 400
        
        # Convert to numpy arrays
        X = np.array(data['features'])
        y = np.array(data['target'])
        
        # Train model
        from sklearn.ensemble import RandomForestRegressor
        model = RandomForestRegressor(n_estimators=100, max_depth=10, random_state=42)
        model.fit(X, y)
        
        # Save model
        joblib.dump(model, MODEL_PATH)
        
        return jsonify({
            "success": True,
            "message": "Model trained and saved successfully"
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

def calculate_sleep_score(x):
    duration, awakenings, stress, caffeine, screen_time, exercise, mood = x

    score = (
        duration * 10
        - awakenings * 5
        - stress * 2
        - caffeine * 1.5
        - screen_time * 0.2
        + exercise * 0.1
        + mood * 4
    )

    return float(max(0, min(100, score)))

import os

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)

