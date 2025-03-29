import { TheaterData, Seat, SeatStatus } from "../types";

// Helper function to generate a realistic seat layout
function generateSeatLayout(): Seat[][] {
  const layout: Seat[][] = [];
  const rowLabels = ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K"];
  const columns = 15;

  for (let r = 0; r < rowLabels.length; r++) {
    const row: Seat[] = [];

    for (let c = 0; c < columns; c++) {
      // Create aisles after 3rd and 12th seat
      const isAisle = c === 3 || c === 12;

      if (isAisle) {
        row.push({
          id: `${rowLabels[r]}${c + 1}`,
          row: r,
          column: c,
          rowLabel: rowLabels[r],
          columnLabel: c + 1,
          status: SeatStatus.NOT_A_SEAT,
          categoryId: "",
          price: 0,
          isAisle: true,
        });
      } else {
        // Create some random patterns of booked seats
        let status = SeatStatus.AVAILABLE;

        // Make some seats already booked
        if (
          // Create some realistic booking patterns
          (r === 2 && c >= 5 && c <= 10) || // Middle seats in 3rd row
          (r === 5 && c >= 8 && c <= 10) || // Some seats in 6th row
          (r === 7 && c >= 4 && c <= 6) || // Some seats in 8th row
          (r === 9 && c >= 7 && c <= 9) || // Some seats in last row
          Math.random() < 0.1 // Random 10% of other seats
        ) {
          status = SeatStatus.BOOKED;
        }

        // Determine category based on row
        const categoryId = r < 3 ? "premium" : "standard";
        const price = categoryId === "premium" ? 350 : 250;

        row.push({
          id: `${rowLabels[r]}${c + 1}`,
          row: r,
          column: c,
          rowLabel: rowLabels[r],
          columnLabel: c + 1,
          status: status,
          categoryId: categoryId,
          price: price,
          isAisle: false,
        });
      }
    }

    layout.push(row);
  }

  return layout;
}

export const theaterData: TheaterData = {
  id: "theater-123",
  name: "PVR Cinemas",
  screen: {
    id: "screen-456",
    name: "Screen 3",
  },
  showtime: {
    id: "showtime-789",
    startTime: "2025-03-25T18:00:00Z",
    endTime: "2025-03-25T20:30:00Z",
  },
  seatLayout: {
    rows: 10,
    columns: 15,
    rowLabels: ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K"], // Skip I to avoid confusion with 1
    columnLabels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    categories: [
      {
        id: "premium",
        name: "Premium",
        color: "#FFD700",
        price: 350,
      },
      {
        id: "standard",
        name: "Standard",
        color: "#C0C0C0",
        price: 250,
      },
    ],
    seats: generateSeatLayout(),
  },
};

// Export a function to get the selected seats for the current user session
export const getCurrentSelection = (): Seat[] => {
  return []; // Start with empty selection
};

// Simulate seat locking for 5 minutes
export const lockSeat = (seatId: string) => {
  // In a real app, this would interact with a backend API
  console.log(`Locking seat ${seatId} for 5 minutes`);
  return { success: true, expiresAt: new Date(Date.now() + 5 * 60 * 1000) };
};

// Simulate seat unlocking
export const unlockSeat = (seatId: string) => {
  // In a real app, this would interact with a backend API
  console.log(`Unlocking seat ${seatId}`);
  return { success: true };
};

// Simulate booking verification
export const verifyBooking = (seatIds: string[]) => {
  // In a real app, this would check with the backend if seats are still available
  console.log(`Verifying seats: ${seatIds.join(", ")}`);
  return {
    success: true,
    unavailableSeats: [], // If any seats became unavailable, they would be listed here
  };
};
