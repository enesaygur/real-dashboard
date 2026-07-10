import { apiClient } from "../api/client";

export async function fetchRooms(page: number, limit: number) {
  const response = await apiClient.get("/rooms", {
    params: {
      page,
      limit,
    },
  });
  return response.data;
}
