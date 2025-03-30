import React, { useMemo } from "react";
import { Seat } from "../../types";

interface CategoryBreakdown {
  name: string;
  count: number;
  totalPrice: number;
}

interface SelectionSummaryProps {
  selectedSeats: Seat[];
  onConfirm: () => void;
  maxSeats: number;
}

const SelectionSummary: React.FC<SelectionSummaryProps> = ({
  selectedSeats,
  onConfirm,
  maxSeats,
}) => {
  // Calculate total price of selected seats
  const totalPrice = useMemo(() => {
    return selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
  }, [selectedSeats]);

  // Format seat identifiers (e.g., "A1, A2, A3")
  const formattedSeats = useMemo(() => {
    return selectedSeats
      .sort((a, b) => {
        if (a.rowLabel === b.rowLabel) {
          return a.columnLabel - b.columnLabel;
        }
        return a.rowLabel.localeCompare(b.rowLabel);
      })
      .map((seat) => `${seat.rowLabel}${seat.columnLabel}`)
      .join(", ");
  }, [selectedSeats]);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">
        Your Selection
      </h3>

      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Selected Seats:</span>
          <span className="text-gray-800 font-medium">
            {selectedSeats.length} / {maxSeats}
          </span>
        </div>

        {selectedSeats.length > 0 ? (
          <div className="bg-gray-50 rounded p-2 text-sm">{formattedSeats}</div>
        ) : (
          <div className="bg-gray-50 rounded p-2 text-sm text-gray-500 italic">
            No seats selected
          </div>
        )}
      </div>

      {selectedSeats.length > 0 && (
        <div className="mb-4">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Total Price:</span>
            <span className="text-gray-800 font-medium">
              ₹{totalPrice.toFixed(2)}
            </span>
          </div>

          <div className="text-xs text-gray-500 mb-2">
            Includes all taxes and booking fees
          </div>

          {/* Breakdown by seat category */}
          {getCategoryBreakdown(selectedSeats).map((category, index) => (
            <div key={index} className="text-xs flex justify-between">
              <span>
                {category.name} ({category.count} seats)
              </span>
              <span>₹{category.totalPrice.toFixed(2)}</span>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 flex justify-between space-x-3">
        <button
          className="flex-1 py-2 px-4 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-200"
          onClick={() => window.history.back()}
        >
          Back
        </button>

        <button
          className={`
            flex-1 py-2 px-4 rounded-md transition-colors duration-200
            ${
              selectedSeats.length > 0
                ? "bg-indigo-600 text-white hover:bg-indigo-700"
                : "bg-indigo-300 text-white cursor-not-allowed"
            }
          `}
          onClick={() => selectedSeats.length > 0 && onConfirm()}
          disabled={selectedSeats.length === 0}
        >
          Proceed
        </button>
      </div>
    </div>
  );
};

// Helper function to group seats by category and calculate totals
const getCategoryBreakdown = (selectedSeats: Seat[]): CategoryBreakdown[] => {
  const categoryMap: Record<string, CategoryBreakdown> = selectedSeats.reduce(
    (acc, seat) => {
      const category = seat.categoryId;
      if (!acc[category]) {
        acc[category] = {
          name: seat.categoryId === "premium" ? "Premium" : "Standard",
          count: 0,
          totalPrice: 0,
        };
      }

      acc[category].count += 1;
      acc[category].totalPrice += seat.price;

      return acc;
    },
    {} as Record<string, CategoryBreakdown>
  );

  return Object.values(categoryMap);
};

export default SelectionSummary;
