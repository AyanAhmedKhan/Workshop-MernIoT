import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import LoadingSpinner from './components/LoadingSpinner';

const socket = io('http://localhost:5000');

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Socket connection status
    socket.on('connect', () => {
      console.log('🔌 Connected to server');
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      console.log('🔌 Disconnected from server');
      setIsConnected(false);
    });

    // Test API connection
    const testConnection = async () => {
      try {
        await axios.get('/api/health');
        setLoading(false);
      } catch (err) {
        setError('Failed to connect to server. Make sure the backend is running on port 5000.');
        setLoading(false);
      }
    };

    testConnection();

    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <div className="text-center">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Connection Error</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Retry Connection
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isConnected={isConnected} />
      <Dashboard socket={socket} />
    </div>
  );
}

export default App;
