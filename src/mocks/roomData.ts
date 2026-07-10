import type { Room } from "../types/rooms";

export const INITIAL_ROOMS: Room[] = [
  {
    id: 1,
    number: "101",
    type: "Single",
    price: 120,
    status: "Available",
  },
  {
    id: 2,
    number: "102",
    type: "Double",
    price: 180,
    status: "Occupied",
  },
  {
    id: 3,
    number: "201",
    type: "Suite",
    price: 350,
    status: "Available",
  },
];
