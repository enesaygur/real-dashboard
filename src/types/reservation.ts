export interface Reservation {
  id: number;
  guestName: string;
  roomNumber: string;
  checkIn: string;
  checkOut: string;
  status: "Pending" | "Confirmed" | "Cancelled";
}
