@echo off
echo 🌡️ Starting IoT Dashboard...
echo.

echo 📦 Installing backend dependencies...
call npm install

echo 📦 Installing frontend dependencies...
cd client
call npm install
cd ..

echo.
echo 🚀 Starting the application...
echo.
echo 📊 Backend will run on: http://localhost:5000
echo 🌐 Frontend will run on: http://localhost:3000
echo.
echo Press Ctrl+C to stop all services
echo.

start "Backend" cmd /k "npm run dev"
timeout /t 3 /nobreak >nul
start "Frontend" cmd /k "cd client && npm start"
timeout /t 3 /nobreak >nul
start "IoT Simulator" cmd /k "node iot-simulator.js"

echo ✅ All services started!
echo.
echo 🌐 Open your browser and go to: http://localhost:3000
echo.
pause
