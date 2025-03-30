import React, { useState } from "react";
import { SeatLayout, Seat, SeatStatus } from "../../types";
import SeatGrid from "./SeatGrid";
import ScreenIndicator from "./ScreenIndicator";
import SeatLegend from "./SeatLegend";
import SelectionSummary from "./SelectionSummary";

interface TheaterLayoutProps {
  theaterData: SeatLayout;
  maxSelectableSeats: number;
  onSelectionConfirm: (seats: Seat[]) => void;
}

const TheaterLayout: React.FC<TheaterLayoutProps> = ({
  theaterData,
  maxSelectableSeats = 6,
  onSelectionConfirm,
}) => {
  // State to track selected seats
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  // State to track validation errors
  const [validationError, setValidationError] = useState<string | null>(null);

  // Handle seat selection/deselection
  const handleSeatClick = (seat: Seat) => {
    // If seat is already booked, do nothing
    if (seat.status === SeatStatus.BOOKED) return;

    // Check if this seat is already selected
    const isSelected = selectedSeats.some((s) => s.id === seat.id);

    if (isSelected) {
      // Deselect the seat
      setSelectedSeats(selectedSeats.filter((s) => s.id !== seat.id));
      setValidationError(null);
    } else {
      // Check if max selection limit reached
      if (selectedSeats.length >= maxSelectableSeats) {
        setValidationError(
          `You can select a maximum of ${maxSelectableSeats} seats.`
        );
        return;
      }

      // Select the seat
      setSelectedSeats([...selectedSeats, seat]);
      setValidationError(null);
    }
  };

  // Handle confirmation of selection
  const handleConfirmSelection = () => {
    if (selectedSeats.length > 0) {
      onSelectionConfirm(selectedSeats);
    } else {
      setValidationError("Please select at least one seat.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Select Your Seats
      </h2>

      <div className="flex flex-col items-center mb-8">
        <ScreenIndicator />

        <div className="mt-8 w-full">
          <SeatGrid
            seatData={theaterData.seats}
            selectedSeats={selectedSeats}
            onSeatClick={handleSeatClick}
          />
        </div>
      </div>

      <div className="mt-6">
        <SeatLegend />
      </div>

      {validationError && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
          {validationError}
        </div>
      )}

      <div className="mt-6">
        <SelectionSummary
          selectedSeats={selectedSeats}
          onConfirm={handleConfirmSelection}
          maxSeats={maxSelectableSeats}
        />
      </div>
    </div>
  );
};

export default TheaterLayout;
