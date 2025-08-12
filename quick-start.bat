@echo off
echo 🌡️ IoT Dashboard - Quick Start
echo.

echo 📊 Starting backend server...
start "Backend" cmd /k "npm run dev"

echo ⏳ Waiting for backend to start...
timeout /t 3 /nobreak >nul

echo 🌐 Starting React frontend...
start "Frontend" cmd /k "cd client && npm start"

echo.
echo ✅ IoT Dashboard is starting!
echo.
echo 🌐 Frontend: http://localhost:3000
echo 📊 Backend API: http://localhost:5000
echo.
echo 📱 The dashboard will open automatically in your browser
echo.
pause
