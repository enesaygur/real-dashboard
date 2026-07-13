import type { Reservation } from "../types/reservation";

let ALL_RESERVATIONS: Reservation[] = [
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

export function getReservation(page: number, limit: number) {
  return new Promise<{ data: Reservation[]; total: number }>((resolve) => {
    setTimeout(() => {
      const start = (page - 1) * limit;
      const end = start + limit;
      resolve({
        data: ALL_RESERVATIONS.slice(start, end),
        total: ALL_RESERVATIONS.length,
      });
    }, 500);
  });
}

export function createReservation(reservation: Omit<Reservation, "id">) {
  return new Promise<Reservation>((resolve) => {
    setTimeout(() => {
      const newReservation: Reservation = {
        id: Date.now(),
        ...reservation,
      };
      ALL_RESERVATIONS.push(newReservation);
      resolve(newReservation);
    }, 500);
  });
}

export function deleteReservation(id: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      ALL_RESERVATIONS = ALL_RESERVATIONS.filter(
        (reservation) => reservation.id !== id,
      );
      resolve();
    }, 500);
  });
}

export function updateReservation(
  id: number,
  updatedReservation: Omit<Reservation, "id">,
) {
  return new Promise<Reservation>((resolve) => {
    setTimeout(() => {
      const index = ALL_RESERVATIONS.findIndex(
        (reservation) => reservation.id === id,
      );
      ALL_RESERVATIONS[index] = { id, ...updatedReservation };
      resolve(ALL_RESERVATIONS[index]);
    }, 500);
  });
}

