import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Loading IoT Dashboard</h2>
        <p className="text-gray-500">Connecting to sensors...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
