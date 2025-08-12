import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SensorCard from './SensorCard';
import Chart from './Chart';
import DataTable from './DataTable';

const Dashboard = ({ socket }) => {
  const [latestData, setLatestData] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load initial data
    const loadData = async () => {
      try {
        const [latestRes, historicalRes] = await Promise.all([
          axios.get('/api/data/latest'),
          axios.get('/api/data')
        ]);
        
        setLatestData(latestRes.data);
        setHistoricalData(historicalRes.data);
        setLoading(false);
      } catch (error) {
        console.error('Error loading data:', error);
        setLoading(false);
      }
    };

    loadData();

    // Listen for real-time updates
    socket.on('newData', (newData) => {
      setLatestData(newData);
      setHistoricalData(prev => [newData, ...prev.slice(0, 99)]); // Keep last 100 readings
    });

    return () => {
      socket.off('newData');
    };
  }, [socket]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
          <div className="h-96 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Title */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Sensor Dashboard</h2>
        <p className="text-gray-600">Monitor real-time temperature and humidity data from IoT sensors</p>
      </div>

      {/* Sensor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <SensorCard
          title="Temperature"
          value={latestData?.temperature || 0}
          unit="°C"
          icon="🌡️"
          color="red"
          range={{ min: 0, max: 50 }}
        />
        <SensorCard
          title="Humidity"
          value={latestData?.humidity || 0}
          unit="%"
          icon="💧"
          color="blue"
          range={{ min: 0, max: 100 }}
        />
      </div>

      {/* Chart Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Real-time Data Chart</h3>
        <Chart data={historicalData} />
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Readings</h3>
        <DataTable data={historicalData.slice(0, 20)} />
      </div>
    </div>
  );
};

export default Dashboard;
