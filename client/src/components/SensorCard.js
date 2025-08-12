import React from 'react';

const SensorCard = ({ title, value, unit, icon, color, range }) => {
  const getColorClass = (color) => {
    const colors = {
      red: 'bg-red-500',
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      yellow: 'bg-yellow-500'
    };
    return colors[color] || 'bg-gray-500';
  };

  const getStatusColor = (value, range) => {
    const percentage = ((value - range.min) / (range.max - range.min)) * 100;
    if (percentage < 30) return 'text-green-600';
    if (percentage < 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusText = (value, range) => {
    const percentage = ((value - range.min) / (range.max - range.min)) * 100;
    if (percentage < 30) return 'Normal';
    if (percentage < 70) return 'Warning';
    return 'Critical';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <span className="text-2xl mr-3">{icon}</span>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        <div className={`w-3 h-3 rounded-full ${getColorClass(color)} animate-pulse`}></div>
      </div>
      
      <div className="mb-4">
        <div className="flex items-baseline">
          <span className="text-4xl font-bold text-gray-900">{value}</span>
          <span className="text-xl text-gray-500 ml-2">{unit}</span>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex-1 bg-gray-200 rounded-full h-2 mr-4">
          <div 
            className={`h-2 rounded-full ${getColorClass(color)} transition-all duration-300`}
            style={{ 
              width: `${Math.min(100, Math.max(0, ((value - range.min) / (range.max - range.min)) * 100))}%` 
            }}
          ></div>
        </div>
        <span className={`text-sm font-medium ${getStatusColor(value, range)}`}>
          {getStatusText(value, range)}
        </span>
      </div>
      
      <div className="mt-3 text-xs text-gray-500">
        Range: {range.min}{unit} - {range.max}{unit}
      </div>
    </div>
  );
};

export default SensorCard;
