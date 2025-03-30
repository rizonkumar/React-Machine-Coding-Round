import React from "react";
import { Seat, SeatStatus } from "../../types";

interface SeatGridProps {
  seatData: Seat[][];
  selectedSeats: Seat[];
  onSeatClick: (seat: Seat) => void;
}

const SeatGrid: React.FC<SeatGridProps> = ({
  seatData,
  selectedSeats,
  onSeatClick,
}) => {
  // Early return if no data
  if (!seatData || !seatData.length) {
    return (
      <div className="text-center text-gray-500">Loading seat layout...</div>
    );
  }

  // Get unique row labels for displaying on the side
  const rowLabels = [
    ...new Set(seatData.flatMap((row) => row.map((seat) => seat.rowLabel))),
  ];

  // Get unique column labels for the top header
  const columnLabels = [
    ...new Set(seatData.flatMap((row) => row.map((seat) => seat.columnLabel))),
  ];

  // Helper to determine if a seat is selected
  const isSeatSelected = (seatId: string): boolean => {
    return selectedSeats.some((seat) => seat.id === seatId);
  };

  // Helper to get appropriate classes based on seat status and category
  const getSeatClasses = (seat: Seat): string => {
    const baseClasses =
      "flex items-center justify-center w-8 h-8 m-1 text-xs font-medium rounded-md transition-colors duration-200";

    // If it's not a seat, render an empty space
    if (seat.status === SeatStatus.NOT_A_SEAT) {
      return `${baseClasses} invisible`;
    }

    // For aisles, render a gap
    if (seat.isAisle) {
      return `${baseClasses} invisible`;
    }

    if (seat.status === SeatStatus.BOOKED) {
      return `${baseClasses} bg-gray-300 text-gray-500 cursor-not-allowed`;
    }

    if (seat.status === SeatStatus.BLOCKED) {
      return `${baseClasses} bg-gray-400 text-gray-500 cursor-not-allowed`;
    }

    // For available seats, color varies by category
    const categoryColorClass =
      seat.categoryId === "premium"
        ? "bg-yellow-100 hover:bg-yellow-200 text-yellow-800"
        : "bg-blue-100 hover:bg-blue-200 text-blue-800";

    // If seat is selected, highlight it
    if (isSeatSelected(seat.id)) {
      return `${baseClasses} bg-green-500 hover:bg-green-600 text-white cursor-pointer`;
    }

    return `${baseClasses} ${categoryColorClass} cursor-pointer`;
  };

  return (
    <div className="overflow-x-auto pb-4">
      <div className="flex flex-col items-center">
        {/* Column headers */}
        <div className="flex mb-2">
          {/* Empty cell for row label column */}
          <div className="w-8 h-8 flex items-center justify-center"></div>

          {/* Column numbers */}
          {columnLabels.map((colLabel, index) => (
            <div
              key={`col-${index}`}
              className="w-8 h-8 flex items-center justify-center text-xs text-gray-600 font-medium"
            >
              {colLabel}
            </div>
          ))}
        </div>

        {/* Seat rows */}
        {seatData.map((row, rowIndex) => (
          <div key={`row-${rowIndex}`} className="flex items-center">
            {/* Row label */}
            <div className="w-8 h-8 flex items-center justify-center text-xs text-gray-600 font-medium">
              {rowLabels[rowIndex]}
            </div>

            {/* Seats in this row */}
            {row.map((seat, colIndex) => (
              <div
                key={`seat-${rowIndex}-${colIndex}`}
                className={getSeatClasses(seat)}
                onClick={() =>
                  seat.status !== SeatStatus.BOOKED &&
                  seat.status !== SeatStatus.BLOCKED &&
                  seat.status !== SeatStatus.NOT_A_SEAT &&
                  onSeatClick(seat)
                }
              >
                {seat.status !== SeatStatus.NOT_A_SEAT &&
                  !seat.isAisle &&
                  seat.columnLabel}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeatGrid;
