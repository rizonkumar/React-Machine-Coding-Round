export interface TheaterData {
  id: string;
  name: string;
  screen: {
    id: string;
    name: string;
  };
  seatLayout: SeatLayout;
  showtime: {
    id: string;
    startTime: string;
    endTime: string;
  };
}

export interface SeatLayout {
  rows: number;
  columns: number;
  rowLabels: string[]; // A, B, C, etc.
  columnLabels: number[]; // 1, 2, 3, etc.
  seats: Seat[][];
  categories: SeatCategory[];
}

export enum SeatStatus {
  AVAILABLE = "AVAILABLE",
  SELECTED = "SELECTED",
  BOOKED = "BOOKED",
  BLOCKED = "BLOCKED", // For maintenance or other reasons
  NOT_A_SEAT = "NOT_A_SEAT", // For gaps in layout where seats don't exist
}

export interface Seat {
  id: string;
  row: number; // Row index
  column: number; // Column index
  rowLabel: string; // A, B, C, etc.
  columnLabel: number; // 1, 2, 3, etc.
  status: SeatStatus;
  categoryId: string;
  price: number;
  isGap?: boolean;
  isAisle?: boolean;
}

export interface SeatCategory {
  id: string;
  name: string; // Premium, Standard, etc.
  color: string; // Color code for UI representation
  price: number; // Base price for this category
}

export interface Selection {
  seats: Seat[];
  totalPrice: number;
  validationErrors: string[];
}
