import pandas as pd
import numpy as np

rows = 5000
np.random.seed(42)
duration = np.random.uniform(4, 10, rows)
awakenings = np.random.randint(0, 6, rows)
stress = np.random.randint(1, 11, rows)
caffeine = np.random.randint(0, 301, rows)
screen_time = np.random.randint(0, 181, rows)
exercise = np.random.randint(0, 121, rows)
mood = np.random.randint(1, 6, rows)

sleep_score = (
    duration * 8
    - awakenings * 5
    - stress * 2
    - (caffeine / 10)
    - (screen_time / 6)
    + (exercise / 4)
    + mood * 4
    + np.random.normal(0, 5, rows)
)

sleep_score = np.clip(sleep_score, 0, 100)

df = pd.DataFrame({
    "duration": duration,
    "awakenings": awakenings,
    "stress": stress,
    "caffeine": caffeine,
    "screen_time": screen_time,
    "exercise": exercise,
    "mood": mood,
    "sleep_score": sleep_score
})

df.to_csv("sleep_dataset.csv", index=False)
print("Dataset created: sleep_dataset.csv")
