# 🌡️ Real-time IoT Data Dashboard

A modern, real-time IoT data dashboard built with the MERN stack (MongoDB, Express, React, Node.js) featuring live temperature and humidity monitoring with beautiful visualizations.

## 🚀 Features

- **Real-time Data Updates**: Live sensor data using Socket.IO
- **Beautiful UI**: Modern dashboard with Tailwind CSS
- **Interactive Charts**: Chart.js powered visualizations
- **Responsive Design**: Works on desktop and mobile
- **MongoDB Storage**: Persistent data storage
- **RESTful API**: Clean API endpoints
- **IoT Simulation**: Built-in sensor data generator

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Frontend│    │  Express Backend│    │   MongoDB Atlas │
│   (Port 3000)   │◄──►│   (Port 5000)   │◄──►│   (Database)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │
         │              ┌─────────────────┐
         └──────────────►│  Socket.IO     │
                        │  (Real-time)   │
                        └─────────────────┘
```

## 📦 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## 🛠️ Installation & Setup

### 1. Clone and Install Dependencies

```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..
```

### 2. MongoDB Setup

**Option A: Local MongoDB**
```bash
# Install MongoDB locally or use Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

**Option B: MongoDB Atlas (Recommended)**
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get your connection string
4. Create a `.env` file in the root directory:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/iot-dashboard
PORT=5000
NODE_ENV=development
```

### 3. Start the Application

**Terminal 1 - Backend:**
```bash
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm start
```

**Terminal 3 - IoT Simulator (Optional):**
```bash
node iot-simulator.js
```

## 🌐 Access the Application

- **Frontend Dashboard**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/api/health

## 📊 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/data` | Get all sensor data |
| GET | `/api/data/latest` | Get latest sensor reading |
| POST | `/api/data` | Add new sensor data |

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
MONGODB_URI=mongodb://localhost:27017/iot-dashboard
PORT=5000
NODE_ENV=development
```

### IoT Simulator Configuration

Edit `iot-simulator.js` to customize:
- `API_URL`: Backend API endpoint
- `SENSOR_ID`: Device identifier
- `INTERVAL`: Data sending frequency

## 📈 Dashboard Features

### Real-time Monitoring
- Live temperature and humidity readings
- Connection status indicator
- Real-time chart updates

### Data Visualization
- Interactive line charts with Chart.js
- Color-coded status indicators
- Progress bars for sensor values

### Data Management
- Recent readings table
- Timestamp formatting
- Status badges (Normal/Warning/Critical)

## 🎯 Learning Objectives

This project demonstrates:

1. **MERN Stack Development**
   - MongoDB schema design
   - Express.js API development
   - React component architecture
   - Node.js backend setup

2. **Real-time Communication**
   - Socket.IO implementation
   - WebSocket connections
   - Live data updates

3. **Data Visualization**
   - Chart.js integration
   - Real-time chart updates
   - Responsive design

4. **IoT Concepts**
   - Sensor data simulation
   - Data persistence
   - Real-time monitoring

## 🚀 Deployment

### Heroku Deployment

1. Create a Heroku account
2. Install Heroku CLI
3. Deploy:

```bash
heroku create your-app-name
git add .
git commit -m "Initial commit"
git push heroku main
```

### Environment Variables on Heroku

```bash
heroku config:set MONGODB_URI=your_mongodb_atlas_uri
heroku config:set NODE_ENV=production
```

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Check your connection string
   - Ensure MongoDB is running
   - Verify network connectivity

2. **Port Already in Use**
   - Change PORT in .env file
   - Kill existing processes

3. **Socket.IO Connection Issues**
   - Check CORS settings
   - Verify frontend proxy configuration

### Debug Mode

```bash
# Backend with debug logging
DEBUG=* npm run dev

# Frontend with React DevTools
REACT_APP_DEBUG=true npm start
```

## 📚 Additional Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Guide](https://expressjs.com/)
- [React Documentation](https://reactjs.org/)
- [Socket.IO Documentation](https://socket.io/)
- [Chart.js Documentation](https://www.chartjs.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built for IoT workshop and learning purposes
- Uses modern web technologies
- Designed for scalability and real-world applications

---

**Happy Coding! 🚀**
