import { http, HttpResponse } from "msw";
import { INITIAL_USERS } from "./data";
import { INITIAL_ROOMS } from "./roomData";
import { INITIAL_RESERVATIONS } from "./reservationData";

let users = structuredClone(INITIAL_USERS);
let rooms = structuredClone(INITIAL_ROOMS);
let reservations = structuredClone(INITIAL_RESERVATIONS);

export const handlers = [
  http.get("/users", ({ request }) => {
    const url = new URL(request.url);

    const page = Number(url.searchParams.get("page") ?? "1");
    const limit = Number(url.searchParams.get("limit") ?? "3");

    const start = (page - 1) * limit;
    const end = start + limit;

    return HttpResponse.json({
      data: users.slice(start, end),
      total: users.length,
    });
  }),

  http.post("/users", async ({ request }) => {
    const body = (await request.json()) as Omit<(typeof users)[number], "id">;
    const newUser = {
      id: users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1,
      ...body,
    };
    users.push(newUser);
    return HttpResponse.json(newUser, { status: 201 });
  }),

  http.put("/users/:id", async ({ params, request }) => {
    const id = Number(params.id);
    const body = (await request.json()) as Omit<(typeof users)[number], "id">;
    const index = users.findIndex((u) => u.id === id);

    if (index === -1) {
      return HttpResponse.json({ message: "User not found" }, { status: 404 });
    }
    users[index] = { id, ...body };
    return HttpResponse.json(users[index]);
  }),

  http.delete("/users/:id", ({ params }) => {
    const id = Number(params.id);
    const index = users.findIndex((u) => u.id === id);
    if (index === -1) {
      return HttpResponse.json({ message: "User not found" }, { status: 404 });
    }
    users.splice(index, 1);
    return HttpResponse.json({ success: true });
  }),

  http.get("/dashboard/stats", () => {
    return HttpResponse.json({
      users: users.length,
      rooms: rooms.length,
      bookings: 87,
      revenue: 18500,
    });
  }),
  // *** Rooms ***
  http.get("/rooms", ({ request }) => {
    const url = new URL(request.url);

    const page = Number(url.searchParams.get("page") ?? "1");
    const limit = Number(url.searchParams.get("limit") ?? "5");

    const start = (page - 1) * limit;
    const end = start + limit;

    return HttpResponse.json({
      data: rooms.slice(start, end),
      total: rooms.length,
    });
  }),

  http.post("/rooms", async ({ request }) => {
    const body = (await request.json()) as Omit<(typeof rooms)[number], "id">;
    const newRoom = {
      id: rooms.length ? Math.max(...rooms.map((room) => room.id)) + 1 : 1,
      ...body,
    };
    rooms.push(newRoom);
    return HttpResponse.json(newRoom, { status: 201 });
  }),

  http.put("/rooms/:id", async ({ params, request }) => {
    const id = Number(params.id);
    const body = (await request.json()) as Omit<(typeof rooms)[number], "id">;
    const index = rooms.findIndex((room) => room.id === id);
    if (index === -1) {
      return HttpResponse.json({ message: "Room not found" }, { status: 404 });
    }

    rooms[index] = { id, ...body };
    return HttpResponse.json(rooms[index]);
  }),
  http.delete("/rooms/:id", ({ params }) => {
    const id = Number(params.id);
    const index = rooms.findIndex((room) => room.id === id);
    if (index === -1) {
      return HttpResponse.json({ message: "Room not found" }, { status: 404 });
    }
    rooms.splice(index, 1);
    return HttpResponse.json({ success: true });
  }),
  // *** Reservations ***
  http.get("/reservations", ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page") ?? "1");
    const limit = Number(url.searchParams.get("limit") ?? "5");
    const start = (page - 1) * limit;
    const end = start + limit;
    return HttpResponse.json({
      data: reservations.slice(start, end),
      total: reservations.length,
    });
  }),
];
