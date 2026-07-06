import { http, HttpResponse } from "msw";
import { users } from "./data";

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
];
