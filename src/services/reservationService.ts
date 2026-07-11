import { apiClient } from "../api/client";

export async function fectReservations(page: number, limit: number) {
  const response = await apiClient.get("/reservations", {
    params: {
      page,
      limit,
    },
  });
  return response.data;
}
