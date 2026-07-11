import type { Reservation } from "../types/reservation";

export const INITIAL_RESERVATIONS: Reservation[] = [
  {
    id: 1,
    guestName: "John Doe",
    roomNumber: "101",
    checkIn: "2026-05-01",
    checkOut: "2026-05-05",
    status: "Confirmed",
  },
  {
    id: 2,
    guestName: "Jane Smith",
    roomNumber: "203",
    checkIn: "2026-05-10",
    checkOut: "2026-05-12",
    status: "Pending",
  },
  {
    id: 3,
    guestName: "Mike Brown",
    roomNumber: "302",
    checkIn: "2026-05-15",
    checkOut: "2026-05-20",
    status: "Cancelled",
  },
];
