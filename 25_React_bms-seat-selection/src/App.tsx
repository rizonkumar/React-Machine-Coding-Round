import { useState } from "react";
import TheaterLayout from "./components/SeatSelection/TheaterLayout";
import { theaterData } from "./data/theaterData";
import { Seat } from "./types";

const App = () => {
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);

  const handleSelectionConfirm = (seats: Seat[]) => {
    console.log("Selected seats:", seats);
    alert(`Booking confirmed for ${seats.length} seats!`);
    setSelectedSeats([]);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-indigo-800">
          Movie Ticket Booking
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pb-4 border-b border-gray-200">
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                Avengers: Endgame
              </h2>
              <p className="text-gray-600">
                PVR Cinemas • Screen 3 • March 25, 2025 • 6:00 PM
              </p>
            </div>

            <div className="mt-4 md:mt-0 flex items-center">
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                U/A
              </span>
              <span className="ml-2 text-sm text-gray-600">
                3h 2m • English
              </span>
            </div>
          </div>

          <TheaterLayout
            theaterData={theaterData.seatLayout}
            maxSelectableSeats={6}
            onSelectionConfirm={handleSelectionConfirm}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
