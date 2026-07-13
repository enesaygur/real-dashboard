import { apiClient } from "../api/client";
import type { Reservation } from "../types/reservation";

export async function fectReservations(page: number, limit: number) {
  const response = await apiClient.get("/reservations", {
    params: {
      page,
      limit,
    },
  });
  return response.data;
}

export async function addReservation(reservation: Omit<Reservation, "id">) {
  const response = await apiClient.post("/reservations", reservation);
  return response.data;
}

export async function editReservation(
  id: number,
  reservation: Omit<Reservation, "id">,
) {
  const response = await apiClient.put(`/reservations/${id}`, reservation);
  return response.data;
}

export async function removeReservation(id: number) {
  const response = await apiClient.delete(`/reservations/${id}`);
  return response.data;
}
