import { apiClient } from "../api/client";
import type { Room } from "../types/rooms";

export async function fetchRooms(page: number, limit: number) {
  const response = await apiClient.get("/rooms", {
    params: {
      page,
      limit,
    },
  });
  return response.data;
}

export async function addRoom(room: Omit<Room, "id">) {
  const response = await apiClient.post("/rooms", room);
  return response.data;
}

export async function editRoom(id: number, room: Omit<Room, "id">) {
  const response = await apiClient.put(`/rooms/${id}`, room);
  return response.data;
}

export async function removeRoom(id: number) {
  const response = await apiClient.delete(`/rooms/${id}`);
  return response.data;
}
