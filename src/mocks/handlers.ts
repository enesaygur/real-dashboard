import { http, HttpResponse } from "msw";
import { INITIAL_USERS } from "./data";
import { INITIAL_ROOMS } from "./roomData";

let users = structuredClone(INITIAL_USERS);
let rooms = structuredClone(INITIAL_ROOMS);

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
];
