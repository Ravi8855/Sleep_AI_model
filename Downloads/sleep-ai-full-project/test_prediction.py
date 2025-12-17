import requests
import json

# Test data
test_data = {
    "duration": 7,
    "awakenings": 2,
    "stress": 5,
    "caffeine": 100,
    "screen_time": 60,
    "exercise": 30,
    "mood": 7
}

# Send request to prediction service
response = requests.post(
    "http://localhost:5000/predict",
    headers={"Content-Type": "application/json"},
    data=json.dumps(test_data)
)

print("Status Code:", response.status_code)
print("Response:", response.json())