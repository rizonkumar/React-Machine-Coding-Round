import React from "react";

const ScreenIndicator: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center mb-8">
      <div className="w-4/5 h-8 bg-gradient-to-b from-gray-400 to-gray-300 rounded-t-lg shadow-md flex items-center justify-center">
        <span className="text-xs text-gray-600 font-medium uppercase tracking-wider">
          Screen
        </span>
      </div>
      <div className="w-2/3 h-1 bg-gray-400 rounded-b-3xl shadow-inner"></div>
      <p className="mt-2 text-sm text-gray-500">All eyes this way</p>
    </div>
  );
};

export default ScreenIndicator;
