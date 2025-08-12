#!/bin/bash

echo "🌡️ Starting IoT Dashboard..."
echo

echo "📦 Installing backend dependencies..."
npm install

echo "📦 Installing frontend dependencies..."
cd client
npm install
cd ..

echo
echo "🚀 Starting the application..."
echo
echo "📊 Backend will run on: http://localhost:5000"
echo "🌐 Frontend will run on: http://localhost:3000"
echo
echo "Press Ctrl+C to stop all services"
echo

# Start backend
npm run dev &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

# Start frontend
cd client && npm start &
FRONTEND_PID=$!

# Wait a moment for frontend to start
sleep 3

# Start IoT simulator
cd .. && node iot-simulator.js &
SIMULATOR_PID=$!

echo "✅ All services started!"
echo
echo "🌐 Open your browser and go to: http://localhost:3000"
echo

# Function to cleanup on exit
cleanup() {
    echo
    echo "🛑 Stopping all services..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    kill $SIMULATOR_PID 2>/dev/null
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Wait for user to stop
wait
