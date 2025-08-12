const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection - Using in-memory storage for demo if MongoDB is not available
let isMongoConnected = false;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/iot-dashboard';

// Try to connect to MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
})
.then(() => {
  console.log('✅ Connected to MongoDB');
  isMongoConnected = true;
})
.catch(err => {
  console.log('⚠️ MongoDB not available, using in-memory storage for demo');
  console.log('💡 To use MongoDB, create a .env file with: MONGODB_URI=your_connection_string');
  isMongoConnected = false;
});

// IoT Data Schema
const iotDataSchema = new mongoose.Schema({
  temperature: {
    type: Number,
    required: true
  },
  humidity: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  deviceId: {
    type: String,
    default: 'sensor-001'
  }
});

const IoTData = mongoose.model('IoTData', iotDataSchema);

// In-memory storage for demo when MongoDB is not available
let inMemoryData = [];

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'IoT Dashboard API is running!' });
});

// Get all IoT data
app.get('/api/data', async (req, res) => {
  try {
    if (isMongoConnected) {
      const data = await IoTData.find().sort({ timestamp: -1 }).limit(100);
      res.json(data);
    } else {
      // Use in-memory data
      const data = inMemoryData.slice(0, 100);
      res.json(data);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

// Get latest data
app.get('/api/data/latest', async (req, res) => {
  try {
    if (isMongoConnected) {
      const data = await IoTData.findOne().sort({ timestamp: -1 });
      res.json(data);
    } else {
      // Use in-memory data
      const data = inMemoryData[0] || null;
      res.json(data);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch latest data' });
  }
});

// Post new IoT data
app.post('/api/data', async (req, res) => {
  try {
    const { temperature, humidity, deviceId } = req.body;
    
    if (isMongoConnected) {
      const newData = new IoTData({
        temperature,
        humidity,
        deviceId: deviceId || 'sensor-001',
        timestamp: new Date()
      });
      const savedData = await newData.save();
      io.emit('newData', savedData);
      res.status(201).json(savedData);
    } else {
      // Use in-memory storage
      const newData = {
        _id: Date.now().toString(),
        temperature,
        humidity,
        deviceId: deviceId || 'sensor-001',
        timestamp: new Date()
      };
      inMemoryData.unshift(newData);
      if (inMemoryData.length > 100) {
        inMemoryData = inMemoryData.slice(0, 100);
      }
      io.emit('newData', newData);
      res.status(201).json(newData);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to save data' });
  }
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('🔌 New client connected:', socket.id);
  
  socket.on('disconnect', () => {
    console.log('🔌 Client disconnected:', socket.id);
  });
});

// Simulate IoT sensor data (for demo purposes)
function simulateSensorData() {
  const temperature = Math.random() * 30 + 10; // 10-40°C
  const humidity = Math.random() * 60 + 20; // 20-80%
  
  if (isMongoConnected) {
    const newData = new IoTData({
      temperature: parseFloat(temperature.toFixed(1)),
      humidity: parseFloat(humidity.toFixed(1)),
      deviceId: 'sensor-001',
      timestamp: new Date()
    });
    
    newData.save()
      .then(savedData => {
        console.log('📊 New sensor data:', savedData);
        io.emit('newData', savedData);
      })
      .catch(err => {
        console.error('❌ Error saving sensor data:', err.message);
      });
  } else {
    // Use in-memory storage
    const newData = {
      _id: Date.now().toString(),
      temperature: parseFloat(temperature.toFixed(1)),
      humidity: parseFloat(humidity.toFixed(1)),
      deviceId: 'sensor-001',
      timestamp: new Date()
    };
    inMemoryData.unshift(newData);
    if (inMemoryData.length > 100) {
      inMemoryData = inMemoryData.slice(0, 100);
    }
    console.log('📊 New sensor data (in-memory):', newData);
    io.emit('newData', newData);
  }
}

// Start sensor simulation every 5 seconds
setInterval(simulateSensorData, 5000);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 IoT Dashboard API: http://localhost:${PORT}`);
  console.log(`🔌 Socket.IO ready for real-time updates`);
});
