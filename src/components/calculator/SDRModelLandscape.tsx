
import React from 'react';
import { Mountain, Trees, ChartBar, Grid2x2, MapPin, StretchHorizontal } from 'lucide-react';

interface SDRModelLandscapeProps {
  channelEfficiency: {
    email: number;
    linkedIn: number;
    coldCalling: number;
  };
}

export const SDRModelLandscape: React.FC<SDRModelLandscapeProps> = ({ 
  channelEfficiency 
}) => {
  return (
    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-800">In-House SDR Model Landscape</h3>
        <StretchHorizontal className="text-red-500" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Email Channel */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Email Outreach</span>
            <ChartBar className="text-blue-500" />
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full" 
              style={{ width: `${channelEfficiency.email * 100}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Efficiency: {(channelEfficiency.email * 100).toFixed(0)}%
          </p>
        </div>

        {/* LinkedIn Channel */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">LinkedIn Outreach</span>
            <Grid2x2 className="text-green-500" />
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-green-600 h-2.5 rounded-full" 
              style={{ width: `${channelEfficiency.linkedIn * 100}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Efficiency: {(channelEfficiency.linkedIn * 100).toFixed(0)}%
          </p>
        </div>

        {/* Cold Calling Channel */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Cold Calling</span>
            <Trees className="text-red-500" />
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-red-600 h-2.5 rounded-full" 
              style={{ width: `${channelEfficiency.coldCalling * 100}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Efficiency: {(channelEfficiency.coldCalling * 100).toFixed(0)}%
          </p>
        </div>
      </div>

      <div className="mt-4 bg-red-50 border border-red-200 p-3 rounded-lg">
        <p className="text-sm text-red-700">
          <Mountain className="inline-block mr-2 text-red-500" />
          Multi-channel management significantly reduces individual channel performance
        </p>
      </div>
    </div>
  );
};
