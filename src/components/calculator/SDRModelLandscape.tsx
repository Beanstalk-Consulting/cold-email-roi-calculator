
import React from 'react';
import { AlertTriangle } from 'lucide-react';

export const SDRModelLandscape: React.FC = () => {
  return (
    <div className="bg-red-50 p-4 rounded-lg border border-red-200">
      <div className="flex items-center gap-2">
        <AlertTriangle className="text-red-500 h-5 w-5" />
        <p className="text-sm text-red-700">
          Multi-channel management significantly reduces individual channel performance:
        </p>
      </div>
      <ul className="mt-2 ml-7 list-disc text-sm text-red-700 space-y-1">
        <li>Email capacity reduced by 50%</li>
        <li>LinkedIn outreach efficiency decreased by 50%</li>
        <li>Cold calling performance drops by 50%</li>
      </ul>
    </div>
  );
};
