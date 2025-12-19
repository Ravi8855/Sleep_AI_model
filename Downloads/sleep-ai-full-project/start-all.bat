@echo off
echo Starting SleepAI Application...

echo Starting Backend Service...
start "Backend" cmd /k "cd c:\Users\Admin\Downloads\sleep-ai-full-project\backend-node && npm start"

timeout /t 5 /nobreak >nul

echo Starting ML Prediction Service...
start "ML Service" cmd /k "cd c:\Users\Admin\Downloads\sleep-ai-full-project\microservice-predict && python predict_service.py"

timeout /t 5 /nobreak >nul

echo Starting Frontend Service...
start "Frontend" cmd /k "cd c:\Users\Admin\Downloads\sleep-ai-full-project\sleep-ai-frontend-clean-premium && npm run dev"

echo All services started!
echo.
echo Access the application at: http://localhost:5173
echo Backend API at: http://localhost:4000
echo ML Service at: http://localhost:5000
pause