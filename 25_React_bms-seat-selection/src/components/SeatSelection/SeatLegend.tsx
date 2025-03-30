import React from "react";

const SeatLegend: React.FC = () => {
  return (
    <div className="border-t border-gray-200 pt-4">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Seat Legend</h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Available - Premium */}
        <div className="flex items-center">
          <div className="w-6 h-6 bg-yellow-100 rounded-md border border-yellow-200 flex items-center justify-center text-xs text-yellow-800">
            1
          </div>
          <span className="ml-2 text-sm text-gray-600">Premium (₹350)</span>
        </div>

        {/* Available - Standard */}
        <div className="flex items-center">
          <div className="w-6 h-6 bg-blue-100 rounded-md border border-blue-200 flex items-center justify-center text-xs text-blue-800">
            1
          </div>
          <span className="ml-2 text-sm text-gray-600">Standard (₹250)</span>
        </div>

        {/* Selected */}
        <div className="flex items-center">
          <div className="w-6 h-6 bg-green-500 rounded-md flex items-center justify-center text-xs text-white">
            1
          </div>
          <span className="ml-2 text-sm text-gray-600">Selected</span>
        </div>

        {/* Booked */}
        <div className="flex items-center">
          <div className="w-6 h-6 bg-gray-300 rounded-md flex items-center justify-center text-xs text-gray-500">
            1
          </div>
          <span className="ml-2 text-sm text-gray-600">Unavailable</span>
        </div>
      </div>
    </div>
  );
};

export default SeatLegend;
