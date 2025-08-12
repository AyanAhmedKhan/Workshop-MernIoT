const axios = require('axios');

// Configuration
const API_URL = 'http://localhost:5000/api/data';
const SENSOR_ID = 'sensor-001';
const INTERVAL = 3000; // 3 seconds

// Simulate realistic sensor data
function generateSensorData() {
  // Base values with some realistic variation
  const baseTemp = 22; // Base temperature in Celsius
  const baseHumidity = 45; // Base humidity percentage
  
  // Add some realistic variation
  const tempVariation = (Math.random() - 0.5) * 10; // ±5°C variation
  const humidityVariation = (Math.random() - 0.5) * 20; // ±10% variation
  
  // Add some trend (simulating day/night cycle)
  const hour = new Date().getHours();
  const dayCycle = Math.sin((hour - 6) * Math.PI / 12) * 3; // ±3°C day/night cycle
  
  const temperature = Math.max(10, Math.min(40, baseTemp + tempVariation + dayCycle));
  const humidity = Math.max(20, Math.min(80, baseHumidity + humidityVariation));
  
  return {
    temperature: parseFloat(temperature.toFixed(1)),
    humidity: parseFloat(humidity.toFixed(1)),
    deviceId: SENSOR_ID,
    timestamp: new Date()
  };
}

// Send data to the API
async function sendSensorData() {
  try {
    const data = generateSensorData();
    const response = await axios.post(API_URL, data);
    
    console.log(`📊 [${new Date().toLocaleTimeString()}] Sensor data sent:`, {
      temperature: `${data.temperature}°C`,
      humidity: `${data.humidity}%`,
      deviceId: data.deviceId
    });
    
    return response.data;
  } catch (error) {
    console.error('❌ Error sending sensor data:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

// Main simulation loop
function startSimulation() {
  console.log('🚀 Starting IoT Sensor Simulation...');
  console.log(`📡 API URL: ${API_URL}`);
  console.log(`🆔 Sensor ID: ${SENSOR_ID}`);
  console.log(`⏱️  Interval: ${INTERVAL}ms`);
  console.log('='.repeat(50));
  
  // Send initial data
  sendSensorData();
  
  // Set up periodic data sending
  setInterval(sendSensorData, INTERVAL);
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Stopping IoT Sensor Simulation...');
  process.exit(0);
});

// Start the simulation
startSimulation();
